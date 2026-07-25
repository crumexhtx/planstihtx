import {
  PLANNING_DATA_AS_OF,
  PLANNING_DATA_AS_OF_LABEL,
  PLANNING_USD_RATES,
} from './pricingAssumptions';

/** Units of each currency per 1 USD. */
export type UsdRateTable = Record<string, number>;

export type FxSource = 'live' | 'cached' | 'estimate';

export interface ExchangeRatesSnapshot {
  base: 'USD';
  rates: UsdRateTable;
  asOf: string;
  asOfLabel: string;
  source: FxSource;
  /** Currencies filled from planning data when the live feed omits them. */
  fallbackCurrencies: string[];
}

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

export function formatFxAsOfLabel(isoDate: string): string {
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

/**
 * Overlay live provider rates onto planning rates so unsupported tickers
 * (e.g. AED, VND) still resolve.
 */
export function mergeExchangeRates(
  liveRates: UsdRateTable,
  asOf: string,
  source: Exclude<FxSource, 'estimate'>,
): ExchangeRatesSnapshot {
  const planning = PLANNING_USD_RATES;
  const rates: UsdRateTable = { ...planning, USD: 1 };
  const fallbackCurrencies: string[] = [];

  for (const [code, planningRate] of Object.entries(planning)) {
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

  // Keep any extra live tickers we might display later.
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

export function isExchangeRatesSnapshot(
  value: unknown,
): value is ExchangeRatesSnapshot {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<ExchangeRatesSnapshot>;
  return (
    candidate.base === 'USD' &&
    typeof candidate.asOf === 'string' &&
    typeof candidate.asOfLabel === 'string' &&
    (candidate.source === 'live' ||
      candidate.source === 'cached' ||
      candidate.source === 'estimate') &&
    !!candidate.rates &&
    typeof candidate.rates === 'object' &&
    Array.isArray(candidate.fallbackCurrencies)
  );
}
