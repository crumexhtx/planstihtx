import { afterEach, describe, expect, it } from 'vitest';
import {
  clearFlightCache,
  readFlightCache,
  writeFlightCache,
} from '../../api/_lib/flightCache';
import type { FlightQuote } from '../utils/flightQuotes';

const sampleQuote: FlightQuote = {
  source: 'live',
  available: true,
  amountUsd: 812.5,
  currency: 'USD',
  asOf: '2026-07-25T12:00:00.000Z',
  label: 'Live round-trip from UA',
  carrier: 'UA',
  originIata: 'HOU',
  destinationIata: 'TYO',
  departureDate: '2026-09-01',
  returnDate: '2026-09-10',
  adults: 2,
  configured: true,
  provider: 'amadeus',
};

describe('flight memory cache', () => {
  afterEach(() => {
    clearFlightCache();
  });

  it('returns cached quotes before expiry and marks source as cached', () => {
    writeFlightCache('HOU:TYO:1', sampleQuote, 1_000, 5_000);
    const cached = readFlightCache('HOU:TYO:1', 2_000);
    expect(cached?.source).toBe('cached');
    expect(cached?.amountUsd).toBe(812.5);
    expect(readFlightCache('HOU:TYO:1', 7_000)).toBeNull();
  });
});
