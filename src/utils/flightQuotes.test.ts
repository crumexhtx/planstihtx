import { describe, expect, it } from 'vitest';
import {
  flightCacheKey,
  normalizeIata,
  parseFlightSearchRequest,
} from './flightQuotes';

describe('flight quote helpers', () => {
  it('normalizes IATA codes', () => {
    expect(normalizeIata('hou')).toBe('HOU');
    expect(normalizeIata('NY')).toBeNull();
  });

  it('parses a valid round-trip search request', () => {
    const result = parseFlightSearchRequest({
      originIata: 'hou',
      destinationIata: 'TYO',
      departureDate: '2026-09-01',
      returnDate: '2026-09-10',
      adults: 2,
    });
    expect(result).toEqual({
      success: true,
      data: {
        originIata: 'HOU',
        destinationIata: 'TYO',
        departureDate: '2026-09-01',
        returnDate: '2026-09-10',
        adults: 2,
      },
    });
    if (result.success) {
      expect(flightCacheKey(result.data)).toBe('HOU:TYO:2026-09-01:2026-09-10:2');
    }
  });

  it('rejects invalid date order and passenger counts', () => {
    expect(
      parseFlightSearchRequest({
        originIata: 'HOU',
        destinationIata: 'TYO',
        departureDate: '2026-09-10',
        returnDate: '2026-09-01',
        adults: 2,
      }).success,
    ).toBe(false);
    expect(
      parseFlightSearchRequest({
        originIata: 'HOU',
        destinationIata: 'TYO',
        departureDate: '2026-09-01',
        returnDate: '2026-09-10',
        adults: 0,
      }).success,
    ).toBe(false);
  });
});
