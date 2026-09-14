/**
 * Self-contained FX helpers for the Vercel function.
 * Kept under api/ so the serverless bundle does not depend on ../src imports
 * (a common cause of FUNCTION_INVOCATION_FAILED on Vite + type:module apps).
 */

export type FxSource = 'live' | 'cached' | 'estimate';

export interface ExchangeRatesSnapshot {
  base: 'USD';
  rates: Record<string, number>;
  asOf: string;
  asOfLabel: string;
  source: FxSource;
  fallbackCurrencies: string[];
}

/** Approximate planning rates versus 1 USD — mirrors src/utils/pricingAssumptions. */
export const PLANNING_USD_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.86,
  GBP: 0.75,
  CAD: 1.37,
  AUD: 1.52,
  JPY: 157.2,
  KRW: 1385,
  SGD: 1.28,
  THB: 33.1,
  VND: 25450,
  MXN: 18.4,
  HUF: 345,
  MAD: 9.15,
  TRY: 40.2,
  AED: 3.67,
  IDR: 16250,
  BRL: 5.55,
  ARS: 1180,
  ZAR: 18.1,
  EGP: 49.5,
  CZK: 21.5,
  DKK: 6.45,
  NZD: 1.68,
  TWD: 31.2,
  HKD: 7.82,
  PEN: 3.72,
  INR: 85.5,
  SEK: 10.85,
  ISK: 138,
  PLN: 3.72,
  CHF: 0.81,
  COP: 4100,
  CLP: 940,
  MYR: 4.3,
  CNY: 7.2,
  NOK: 10.5,
  PHP: 57.0,
  NPR: 135.0,
  ILS: 3.7,
  QAR: 3.64,
  JOD: 0.71,
  KES: 129.0,
  TZS: 2500.0,
  CRC: 505.0,
  DOP: 59.0,
  UYU: 40.0,
  BSD: 1.0,
  JMD: 157.0,
  RON: 4.55,
  RSD: 108.0,
};

export const PLANNING_DATA_AS_OF = '2026-07-01';
export const PLANNING_DATA_AS_OF_LABEL = 'July 2026';
export const FX_CACHE_TTL_MS = 6 * 60 * 60 * 1_000;

export function planningExchangeRates(): ExchangeRatesSnapshot {
  return {
    base: 'USD',
    rates: { ...PLANNING_USD_RATES },
    asOf: PLANNING_DATA_AS_OF,
    asOfLabel: PLANNING_DATA_AS_OF_LABEL,
    source: 'estimate',
    fallbackCurrencies: Object.keys(PLANNING_USD_RATES),
  };
}

function formatFxAsOfLabel(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate;
  const date = new Date(`${isoDate}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function mergeExchangeRates(
  liveRates: Record<string, number>,
  asOf: string,
  source: Exclude<FxSource, 'estimate'>,
): ExchangeRatesSnapshot {
  const rates: Record<string, number> = { ...PLANNING_USD_RATES, USD: 1 };
  const fallbackCurrencies: string[] = [];

  for (const [code, planningRate] of Object.entries(PLANNING_USD_RATES)) {
    const live = liveRates[code];
    if (
      code !== 'USD' &&
      typeof live === 'number' &&
      Number.isFinite(live) &&
      live > 0
    ) {
      rates[code] = live;
    } else if (code !== 'USD') {
      rates[code] = planningRate;
      fallbackCurrencies.push(code);
    }
  }

  for (const [code, live] of Object.entries(liveRates)) {
    if (
      !(code in rates) &&
      typeof live === 'number' &&
      Number.isFinite(live) &&
      live > 0
    ) {
      rates[code] = live;
    }
  }

  return {
    base: 'USD',
    rates,
    asOf,
    asOfLabel: formatFxAsOfLabel(asOf),
    source,
    fallbackCurrencies,
  };
}
