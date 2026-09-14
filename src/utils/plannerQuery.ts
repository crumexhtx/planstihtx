import type { CurrencyCode, TransportMode, TripPlan } from '../types';
import {
  addDays,
  alignLegsToDateRange,
  createTrip,
  currencies,
  dateRangeDays,
  destinations,
  origins,
  transportModes,
} from './tripHelpers';

export const PLANNER_QUERY_KEYS = [
  'origin',
  'destination',
  'days',
  'travelers',
  'currency',
  'transport',
] as const;

export const SAMPLE_TRIP = {
  originId: 'houston',
  destinationId: 'tokyo',
  days: 7,
  travelers: 2,
} as const;

export const SAMPLE_TRIP_LOCATION = {
  pathname: `/destinations/${SAMPLE_TRIP.destinationId}`,
  search: `?origin=${SAMPLE_TRIP.originId}&days=${SAMPLE_TRIP.days}&travelers=${SAMPLE_TRIP.travelers}`,
  hash: '#trip-calculator',
} as const;

export const SAMPLE_TRIP_HREF = `${SAMPLE_TRIP_LOCATION.pathname}${SAMPLE_TRIP_LOCATION.search}${SAMPLE_TRIP_LOCATION.hash}`;

export interface PlannerQuery {
  originId?: string;
  destinationId?: string;
  days?: number;
  travelers?: number;
  currency?: CurrencyCode;
  transport?: TransportMode;
}

const MIN_DAYS = 1;
const MAX_DAYS = 30;
const MIN_TRAVELERS = 1;
const MAX_TRAVELERS = 8;

function parseClampedInt(
  value: string | null,
  min: number,
  max: number,
): number | undefined {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return undefined;
  return Math.min(max, Math.max(min, parsed));
}

export function parsePlannerQuery(searchParams: URLSearchParams): PlannerQuery {
  const originId = searchParams.get('origin') ?? undefined;
  const destinationId = searchParams.get('destination') ?? undefined;
  const currency = searchParams.get('currency') ?? undefined;
  const transport = searchParams.get('transport') ?? undefined;

  return {
    originId:
      originId && origins.some((origin) => origin.id === originId)
        ? originId
        : undefined,
    destinationId:
      destinationId &&
      destinations.some((destination) => destination.id === destinationId)
        ? destinationId
        : undefined,
    days: parseClampedInt(searchParams.get('days'), MIN_DAYS, MAX_DAYS),
    travelers: parseClampedInt(
      searchParams.get('travelers'),
      MIN_TRAVELERS,
      MAX_TRAVELERS,
    ),
    currency: currencies.includes(currency as CurrencyCode)
      ? (currency as CurrencyCode)
      : undefined,
    transport: transportModes.some((mode) => mode.value === transport)
      ? (transport as TransportMode)
      : undefined,
  };
}

export function applyPlannerQuery(
  trip: TripPlan,
  query: PlannerQuery,
  lockedDestinationId = '',
): TripPlan {
  const destinationId = lockedDestinationId || query.destinationId;
  const next: TripPlan = {
    ...trip,
    originId: query.originId ?? trip.originId,
    groupSize: query.travelers ?? trip.groupSize,
    displayCurrency: query.currency ?? trip.displayCurrency,
    transportMode: query.transport ?? trip.transportMode,
    legs: trip.legs.map((leg) => ({ ...leg })),
  };

  if (destinationId && next.legs[0]) {
    next.legs[0] = { ...next.legs[0], destinationId };
  }

  if (query.days) {
    next.endDate = addDays(next.startDate, query.days - 1);
    next.legs = alignLegsToDateRange(next.legs, query.days);
  }

  return next;
}

export function createTripFromQuery(
  searchParams: URLSearchParams,
  lockedDestinationId = '',
): TripPlan {
  return applyPlannerQuery(
    createTrip(lockedDestinationId),
    parsePlannerQuery(searchParams),
    lockedDestinationId,
  );
}

export function serializePlannerQuery(
  trip: TripPlan,
  options: { includeDestination: boolean },
): URLSearchParams {
  const params = new URLSearchParams();
  params.set('origin', trip.originId);

  const destinationId = trip.legs[0]?.destinationId;
  if (options.includeDestination && destinationId) {
    params.set('destination', destinationId);
  }

  params.set('days', String(dateRangeDays(trip.startDate, trip.endDate)));
  params.set('travelers', String(trip.groupSize));

  if (trip.displayCurrency !== 'USD') {
    params.set('currency', trip.displayCurrency);
  }
  if (trip.transportMode !== 'flight') {
    params.set('transport', trip.transportMode);
  }

  return params;
}

export function plannerQueriesEqual(
  a: URLSearchParams,
  b: URLSearchParams,
): boolean {
  return serializePlannerKeys(a) === serializePlannerKeys(b);
}

function serializePlannerKeys(params: URLSearchParams): string {
  const next = new URLSearchParams();
  for (const key of PLANNER_QUERY_KEYS) {
    const value = params.get(key);
    if (value) next.set(key, value);
  }
  return next.toString();
}
