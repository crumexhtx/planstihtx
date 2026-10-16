import { describe, expect, it } from 'vitest';
import { destinations } from '../utils/tripHelpers';
import { getDestinationRegion } from './regions';

describe('destination regions', () => {
  it('maps every destination country to a region', () => {
    destinations.forEach((destination) => {
      expect(getDestinationRegion(destination)).toBeTruthy();
    });
  });

  it('places Serbia, Romania, Estonia, and Malta in Europe', () => {
    ['Serbia', 'Romania', 'Estonia', 'Malta'].forEach((country) => {
      const destination = destinations.find((entry) => entry.country === country);
      expect(destination, country).toBeDefined();
      expect(getDestinationRegion(destination!)).toBe('Europe');
    });
  });

  it('throws for an unmapped country instead of defaulting to Asia', () => {
    expect(() =>
      getDestinationRegion({
        ...destinations[0],
        country: 'Atlantis',
      }),
    ).toThrow(/Atlantis/);
  });
});
