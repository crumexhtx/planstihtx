import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  mergeExchangeRates,
  planningExchangeRates,
} from '../src/utils/exchangeRates';
import { checkRateLimit, pruneRateLimits } from './_lib/rateLimit';
import { readFxCache, writeFxCache } from './_lib/fxCache';

const FRANKFURTER_URL = 'https://api.frankfurter.dev/v1/latest?base=USD';
const FETCH_TIMEOUT_MS = 4_000;
const RATE_LIMIT = 60;
const RATE_WINDOW_MS = 15 * 60 * 1_000;

export const config = {
  maxDuration: 10,
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  response.setHeader('X-Content-Type-Options', 'nosniff');

  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const clientKey = clientRateLimitKey(request);
  pruneRateLimits();
  const rate = checkRateLimit(`fx:${clientKey}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!rate.allowed) {
    response.setHeader('Retry-After', String(rate.retryAfterSeconds));
    return response.status(429).json({ error: 'Too many requests' });
  }

  const cached = readFxCache();
  if (cached) {
    response.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400',
    );
    return response.status(200).json(cached);
  }

  try {
    const live = await fetchFrankfurterRates();
    writeFxCache(live);
    response.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400',
    );
    return response.status(200).json({ ...live, source: 'live' });
  } catch (error) {
    console.error(
      'FX fetch failed:',
      error instanceof Error ? error.name : 'UnknownError',
    );
    const fallback = planningExchangeRates();
    response.setHeader('Cache-Control', 'public, s-maxage=60');
    return response.status(200).json(fallback);
  }
}

async function fetchFrankfurterRates() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const upstream = await fetch(FRANKFURTER_URL, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!upstream.ok) {
      throw new Error(`FrankfurterHTTP${upstream.status}`);
    }

    const payload = (await upstream.json()) as {
      base?: string;
      date?: string;
      rates?: Record<string, number>;
    };

    if (
      payload.base !== 'USD' ||
      typeof payload.date !== 'string' ||
      !payload.rates ||
      typeof payload.rates !== 'object'
    ) {
      throw new Error('FrankfurterInvalidPayload');
    }

    return mergeExchangeRates(payload.rates, payload.date, 'live');
  } finally {
    clearTimeout(timer);
  }
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
