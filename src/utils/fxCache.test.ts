import { afterEach, describe, expect, it } from 'vitest';
import { clearFxCache, readFxCache, writeFxCache } from '../../api/_lib/fxCache';
import { planningExchangeRates } from '../utils/exchangeRates';

describe('fx memory cache', () => {
  afterEach(() => {
    clearFxCache();
  });

  it('returns null when empty or expired', () => {
    expect(readFxCache()).toBeNull();
    const snapshot = planningExchangeRates();
    writeFxCache(snapshot, 1_000, 100);
    expect(readFxCache(1_050)).not.toBeNull();
    expect(readFxCache(1_200)).toBeNull();
  });

  it('stores a cached-source copy of the snapshot', () => {
    const live = {
      ...planningExchangeRates(),
      source: 'live' as const,
      asOf: '2026-07-24',
      asOfLabel: 'July 24, 2026',
      fallbackCurrencies: ['AED'],
    };
    writeFxCache(live, 1_000, 10_000);
    const cached = readFxCache(1_500);
    expect(cached?.source).toBe('cached');
    expect(cached?.asOf).toBe('2026-07-24');
    expect(cached?.rates.EUR).toBe(live.rates.EUR);
  });
});
