import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  flightCacheKey,
  parseFlightSearchRequest,
} from '../src/utils/flightQuotes';
import { searchAmadeusRoundTrip } from './_lib/amadeusFlights';
import { readFlightCache, writeFlightCache } from './_lib/flightCache';
import { checkRateLimit, pruneRateLimits } from './_lib/rateLimit';

const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 15 * 60 * 1_000;

export const config = {
  maxDuration: 15,
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const clientKey = clientRateLimitKey(request);
  pruneRateLimits();
  const limited = checkRateLimit(
    `flights:${clientKey}`,
    RATE_LIMIT,
    RATE_WINDOW_MS,
  );
  if (!limited.allowed) {
    response.setHeader('Retry-After', String(limited.retryAfterSeconds));
    return response.status(429).json({ error: 'Too many requests' });
  }

  const contentType = firstHeader(request.headers['content-type']);
  if (!contentType?.toLowerCase().includes('application/json')) {
    return response.status(415).json({ error: 'Unsupported media type' });
  }

  let body: unknown;
  try {
    body = parseBody(request.body);
  } catch {
    return response.status(400).json({ error: 'Invalid JSON body' });
  }

  const parsed = parseFlightSearchRequest(body);
  if (!parsed.success) {
    return response.status(400).json({ error: parsed.error });
  }

  const cacheKey = flightCacheKey(parsed.data);
  const cached = readFlightCache(cacheKey);
  if (cached) {
    return response.status(200).json(cached);
  }

  try {
    const quote = await searchAmadeusRoundTrip(parsed.data);
    if (quote.source === 'live' && quote.available) {
      writeFlightCache(cacheKey, quote);
    }
    return response.status(200).json(quote);
  } catch (error) {
    console.error(
      'Flight search failed:',
      error instanceof Error ? error.name : 'UnknownError',
    );
    return response.status(200).json({
      source: 'unavailable',
      available: false,
      amountUsd: 0,
      currency: 'USD',
      asOf: new Date().toISOString(),
      label: 'Live fare search failed',
      originIata: parsed.data.originIata,
      destinationIata: parsed.data.destinationIata,
      departureDate: parsed.data.departureDate,
      returnDate: parsed.data.returnDate,
      adults: parsed.data.adults,
      configured: true,
      provider: 'amadeus',
      message: 'Using the planning transport estimate instead.',
    });
  }
}

function parseBody(body: unknown): unknown {
  if (typeof body === 'string') return JSON.parse(body);
  if (Buffer.isBuffer(body)) return JSON.parse(body.toString('utf8'));
  return body;
}

function clientRateLimitKey(request: VercelRequest): string {
  const forwarded = firstHeader(request.headers['x-forwarded-for']);
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return firstHeader(request.headers['x-real-ip']) ?? 'unknown';
}

function firstHeader(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
