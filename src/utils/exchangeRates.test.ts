import { describe, expect, it } from 'vitest';
import {
  formatFxAsOfLabel,
  mergeExchangeRates,
  planningExchangeRates,
} from './exchangeRates';
import { PLANNING_USD_RATES } from './pricingAssumptions';

describe('exchange rate helpers', () => {
  it('builds a planning fallback snapshot', () => {
    const snapshot = planningExchangeRates();
    expect(snapshot.source).toBe('estimate');
    expect(snapshot.rates.USD).toBe(1);
    expect(snapshot.rates.EUR).toBe(PLANNING_USD_RATES.EUR);
  });

  it('overlays live rates and keeps unsupported tickers on planning values', () => {
    const snapshot = mergeExchangeRates(
      { EUR: 0.9, GBP: 0.8, JPY: 160 },
      '2026-07-24',
      'live',
    );

    expect(snapshot.source).toBe('live');
    expect(snapshot.asOf).toBe('2026-07-24');
    expect(snapshot.asOfLabel).toBe(formatFxAsOfLabel('2026-07-24'));
    expect(snapshot.rates.EUR).toBe(0.9);
    expect(snapshot.rates.GBP).toBe(0.8);
    expect(snapshot.rates.JPY).toBe(160);
    expect(snapshot.rates.AED).toBe(PLANNING_USD_RATES.AED);
    expect(snapshot.fallbackCurrencies).toContain('AED');
    expect(snapshot.fallbackCurrencies).not.toContain('EUR');
  });

  it('formats ISO FX dates for display', () => {
    expect(formatFxAsOfLabel('2026-07-24')).toBe('July 24, 2026');
  });
});
