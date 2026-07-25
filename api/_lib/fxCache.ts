import type { ExchangeRatesSnapshot } from '../../src/utils/exchangeRates';
import { FX_CACHE_TTL_MS } from '../../src/utils/exchangeRates';

interface CacheEntry {
  snapshot: ExchangeRatesSnapshot;
  expiresAt: number;
}

let memoryCache: CacheEntry | null = null;

export function readFxCache(now = Date.now()): ExchangeRatesSnapshot | null {
  if (!memoryCache) return null;
  if (memoryCache.expiresAt <= now) {
    memoryCache = null;
    return null;
  }
  return memoryCache.snapshot;
}

export function writeFxCache(
  snapshot: ExchangeRatesSnapshot,
  now = Date.now(),
  ttlMs = FX_CACHE_TTL_MS,
) {
  memoryCache = {
    snapshot: {
      ...snapshot,
      source: 'cached',
      rates: { ...snapshot.rates },
      fallbackCurrencies: [...snapshot.fallbackCurrencies],
    },
    expiresAt: now + ttlMs,
  };
}

export function clearFxCache() {
  memoryCache = null;
}
