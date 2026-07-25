export type FlightQuoteSource = 'live' | 'cached' | 'estimate' | 'unavailable';

export interface FlightQuote {
  source: FlightQuoteSource;
  available: boolean;
  amountUsd: number;
  currency: 'USD';
  asOf: string;
  label: string;
  carrier?: string;
  originIata: string;
  destinationIata: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  outboundStops?: number;
  returnStops?: number;
  provider?: 'amadeus';
  /** True when Amadeus credentials are not configured on the server. */
  configured?: boolean;
  message?: string;
}

export interface FlightSearchRequest {
  originIata: string;
  destinationIata: string;
  departureDate: string;
  returnDate: string;
  adults: number;
}

export const FLIGHT_CACHE_TTL_MS = 45 * 60 * 1_000;
export const FLIGHT_MAX_ADULTS = 9;

const IATA_PATTERN = /^[A-Z]{3}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function normalizeIata(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const code = value.trim().toUpperCase();
  return IATA_PATTERN.test(code) ? code : null;
}

export function normalizeFlightDate(value: unknown): string | null {
  if (typeof value !== 'string' || !DATE_PATTERN.test(value)) return null;
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  return value;
}

export function parseFlightSearchRequest(
  input: unknown,
): { success: true; data: FlightSearchRequest } | { success: false; error: string } {
  if (!input || typeof input !== 'object') {
    return { success: false, error: 'Invalid body' };
  }
  const body = input as Record<string, unknown>;
  const originIata = normalizeIata(body.originIata);
  const destinationIata = normalizeIata(body.destinationIata);
  const departureDate = normalizeFlightDate(body.departureDate);
  const returnDate = normalizeFlightDate(body.returnDate);
  const adultsRaw = Number(body.adults);

  if (!originIata || !destinationIata) {
    return { success: false, error: 'Origin and destination IATA codes are required' };
  }
  if (originIata === destinationIata) {
    return { success: false, error: 'Origin and destination must differ' };
  }
  if (!departureDate || !returnDate) {
    return { success: false, error: 'Departure and return dates are required' };
  }
  if (returnDate < departureDate) {
    return { success: false, error: 'Return date must be on or after departure' };
  }
  if (
    !Number.isFinite(adultsRaw) ||
    adultsRaw < 1 ||
    adultsRaw > FLIGHT_MAX_ADULTS ||
    !Number.isInteger(adultsRaw)
  ) {
    return { success: false, error: 'Adults must be an integer from 1 to 9' };
  }

  return {
    success: true,
    data: {
      originIata,
      destinationIata,
      departureDate,
      returnDate,
      adults: adultsRaw,
    },
  };
}

export function flightCacheKey(request: FlightSearchRequest): string {
  return [
    request.originIata,
    request.destinationIata,
    request.departureDate,
    request.returnDate,
    request.adults,
  ].join(':');
}

export function isFlightQuote(value: unknown): value is FlightQuote {
  if (!value || typeof value !== 'object') return false;
  const quote = value as Partial<FlightQuote>;
  return (
    typeof quote.source === 'string' &&
    typeof quote.available === 'boolean' &&
    typeof quote.amountUsd === 'number' &&
    quote.currency === 'USD' &&
    typeof quote.asOf === 'string' &&
    typeof quote.label === 'string' &&
    typeof quote.originIata === 'string' &&
    typeof quote.destinationIata === 'string'
  );
}
