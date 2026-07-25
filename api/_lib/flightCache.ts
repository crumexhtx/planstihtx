import type { FlightQuote } from '../../src/utils/flightQuotes';
import { FLIGHT_CACHE_TTL_MS } from '../../src/utils/flightQuotes';

interface CacheEntry {
  quote: FlightQuote;
  expiresAt: number;
}

const memoryCache = new Map<string, CacheEntry>();

export function readFlightCache(
  key: string,
  now = Date.now(),
): FlightQuote | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (entry.expiresAt <= now) {
    memoryCache.delete(key);
    return null;
  }
  return entry.quote;
}

export function writeFlightCache(
  key: string,
  quote: FlightQuote,
  now = Date.now(),
  ttlMs = FLIGHT_CACHE_TTL_MS,
) {
  memoryCache.set(key, {
    quote: {
      ...quote,
      source: 'cached',
    },
    expiresAt: now + ttlMs,
  });
}

export function clearFlightCache() {
  memoryCache.clear();
}
