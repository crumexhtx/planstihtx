import { describe, expect, it } from 'vitest';
import { addDays, createTrip, dateRangeDays } from './tripHelpers';
import {
  SAMPLE_TRIP,
  SAMPLE_TRIP_HREF,
  applyPlannerQuery,
  createTripFromQuery,
  parsePlannerQuery,
  plannerQueriesEqual,
  serializePlannerQuery,
} from './plannerQuery';

describe('planner query', () => {
  it('parses a valid sample-trip query and ignores unknown values', () => {
    const query = parsePlannerQuery(
      new URLSearchParams(
        'origin=houston&destination=tokyo&days=7&travelers=2&currency=EUR&transport=train&bogus=1',
      ),
    );

    expect(query).toEqual({
      originId: 'houston',
      destinationId: 'tokyo',
      days: 7,
      travelers: 2,
      currency: 'EUR',
      transport: 'train',
    });
    expect(parsePlannerQuery(new URLSearchParams('origin=atlantis')).originId).toBeUndefined();
    expect(parsePlannerQuery(new URLSearchParams('days=99')).days).toBe(30);
    expect(parsePlannerQuery(new URLSearchParams('travelers=0')).travelers).toBe(1);
  });

  it('applies query fields onto a new trip without changing a locked city', () => {
    const trip = applyPlannerQuery(
      createTrip('paris'),
      parsePlannerQuery(
        new URLSearchParams(
          'origin=new-york&destination=tokyo&days=10&travelers=3&currency=GBP',
        ),
      ),
      'paris',
    );

    expect(trip.originId).toBe('new-york');
    expect(trip.legs[0]?.destinationId).toBe('paris');
    expect(trip.groupSize).toBe(3);
    expect(trip.displayCurrency).toBe('GBP');
    expect(dateRangeDays(trip.startDate, trip.endDate)).toBe(10);
    expect(trip.endDate).toBe(addDays(trip.startDate, 9));
  });

  it('round-trips shareable planner params in a stable order', () => {
    const trip = createTripFromQuery(
      new URLSearchParams(
        'origin=houston&destination=tokyo&days=7&travelers=2',
      ),
    );
    const serialized = serializePlannerQuery(trip, { includeDestination: true });

    expect(serialized.toString()).toBe(
      'origin=houston&destination=tokyo&days=7&travelers=2',
    );
    expect(
      plannerQueriesEqual(
        serialized,
        new URLSearchParams('travelers=2&origin=houston&destination=tokyo&days=7'),
      ),
    ).toBe(true);
  });

  it('keeps the sample trip href pointed at the Tokyo calculator', () => {
    expect(SAMPLE_TRIP.originId).toBe('houston');
    expect(SAMPLE_TRIP.destinationId).toBe('tokyo');
    expect(SAMPLE_TRIP_HREF).toBe(
      '/destinations/tokyo?origin=houston&days=7&travelers=2#trip-calculator',
    );
  });
});
