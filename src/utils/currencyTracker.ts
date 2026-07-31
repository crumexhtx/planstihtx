import { PLANNING_USD_RATES } from './pricingAssumptions';
import type { UsdRateTable } from './exchangeRates';

/** Broader currency set for the conversion tracker (USD is the base). */
export type TrackerCurrency = keyof typeof PLANNING_USD_RATES;

/** Fallback planning table — prefer live rates from ExchangeRatesProvider. */
export const TRACKER_USD_RATES: Record<TrackerCurrency, number> =
  PLANNING_USD_RATES;

export const TRACKER_CURRENCY_LABELS: Record<TrackerCurrency, string> = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  CAD: 'Canadian Dollar',
  AUD: 'Australian Dollar',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  VND: 'Vietnamese Dong',
  MXN: 'Mexican Peso',
  HUF: 'Hungarian Forint',
  MAD: 'Moroccan Dirham',
  TRY: 'Turkish Lira',
  AED: 'UAE Dirham',
  IDR: 'Indonesian Rupiah',
  BRL: 'Brazilian Real',
  ARS: 'Argentine Peso',
  ZAR: 'South African Rand',
  EGP: 'Egyptian Pound',
  CZK: 'Czech Koruna',
  DKK: 'Danish Krone',
  NZD: 'New Zealand Dollar',
  TWD: 'New Taiwan Dollar',
  HKD: 'Hong Kong Dollar',
  PEN: 'Peruvian Sol',
  INR: 'Indian Rupee',
  SEK: 'Swedish Krona',
  ISK: 'Icelandic Króna',
  PLN: 'Polish Złoty',
  CHF: 'Swiss Franc',
  COP: 'Colombian Peso',
  CLP: 'Chilean Peso',
  MYR: 'Malaysian Ringgit',
  CNY: 'Chinese Yuan',
};

/** Default local currency for a destination when available. */
export const DESTINATION_LOCAL_CURRENCY: Record<string, TrackerCurrency> = {
  lisbon: 'EUR',
  bangkok: 'THB',
  'mexico-city': 'MXN',
  budapest: 'HUF',
  hanoi: 'VND',
  marrakech: 'MAD',
  paris: 'EUR',
  london: 'GBP',
  rome: 'EUR',
  barcelona: 'EUR',
  amsterdam: 'EUR',
  istanbul: 'TRY',
  dubai: 'AED',
  tokyo: 'JPY',
  seoul: 'KRW',
  singapore: 'SGD',
  bali: 'IDR',
  'new-york': 'USD',
  'los-angeles': 'USD',
  orlando: 'USD',
  cancun: 'MXN',
  'rio-de-janeiro': 'BRL',
  'buenos-aires': 'ARS',
  'cape-town': 'ZAR',
  cairo: 'EGP',
  sydney: 'AUD',

  prague: 'CZK',
  vienna: 'EUR',
  berlin: 'EUR',
  athens: 'EUR',
  madrid: 'EUR',
  dublin: 'EUR',
  edinburgh: 'GBP',
  copenhagen: 'DKK',
  vancouver: 'CAD',
  toronto: 'CAD',
  'san-francisco': 'USD',
  miami: 'USD',
  honolulu: 'USD',
  melbourne: 'AUD',
  auckland: 'NZD',
  kyoto: 'JPY',
  osaka: 'JPY',
  taipei: 'TWD',
  'hong-kong': 'HKD',
  'chiang-mai': 'THB',
  phuket: 'THB',
  'ho-chi-minh-city': 'VND',
  lima: 'PEN',
  delhi: 'INR',
  florence: 'EUR',
  venice: 'EUR',
  porto: 'EUR',
  seville: 'EUR',
  munich: 'EUR',
  stockholm: 'SEK',
  reykjavik: 'ISK',
  krakow: 'PLN',
  dubrovnik: 'EUR',
  zurich: 'CHF',
  chicago: 'USD',
  boston: 'USD',
  'las-vegas': 'USD',
  montreal: 'CAD',
  cusco: 'PEN',
  cartagena: 'COP',
  santiago: 'CLP',
  'kuala-lumpur': 'MYR',
  shanghai: 'CNY',
  mumbai: 'INR',

  'washington-dc': 'USD',
  seattle: 'USD',
  'san-diego': 'USD',
  'new-orleans': 'USD',
  nashville: 'USD',
  austin: 'USD',
  denver: 'USD',
  philadelphia: 'USD',
  atlanta: 'USD',
  portland: 'USD',
  phoenix: 'USD',
  charleston: 'USD',
  savannah: 'USD',
  dallas: 'USD',
  houston: 'USD',
  'key-west': 'USD',

};

function rateFor(
  currency: TrackerCurrency,
  rates: UsdRateTable = TRACKER_USD_RATES,
): number {
  const rate = rates[currency] ?? TRACKER_USD_RATES[currency];
  return typeof rate === 'number' && Number.isFinite(rate) && rate > 0
    ? rate
    : 1;
}

export function convertCurrency(
  amount: number,
  from: TrackerCurrency,
  to: TrackerCurrency,
  rates: UsdRateTable = TRACKER_USD_RATES,
): number {
  if (!Number.isFinite(amount)) return 0;
  const usd = amount / rateFor(from, rates);
  return Math.round(usd * rateFor(to, rates) * 100) / 100;
}

export function formatTrackerAmount(
  amount: number,
  currency: TrackerCurrency,
): string {
  const zeroDecimal = new Set([
    'JPY',
    'KRW',
    'VND',
    'HUF',
    'IDR',
    'ISK',
    'CLP',
    'COP',
  ]);
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: zeroDecimal.has(currency) ? 0 : 2,
  }).format(amount);
}
