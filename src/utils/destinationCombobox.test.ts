import { describe, expect, it } from 'vitest';
import { filterDestinations } from '../components/DestinationCombobox';
import type { Destination } from '../types';

function city(
  id: string,
  name: string,
  country: string,
  dailyBudget = 100,
): Destination {
  return {
    id,
    name,
    country,
    lat: 0,
    lng: 0,
    dailyBudget,
    seasonality: { best: [], cheapest: [], busiest: [] },
  };
}

const sample: Destination[] = [
  city('tokyo', 'Tokyo', 'Japan'),
  city('kyoto', 'Kyoto', 'Japan'),
  city('osaka', 'Osaka', 'Japan'),
  city('sapporo', 'Sapporo', 'Japan'),
  city('bogota', 'Bogotá', 'Colombia'),
  city('paris', 'Paris', 'France'),
];

describe('filterDestinations', () => {
  it('filters by city or country', () => {
    expect(filterDestinations(sample, 'tok').map((item) => item.id)).toEqual([
      'tokyo',
    ]);
    expect(filterDestinations(sample, 'france').map((item) => item.id)).toEqual(
      ['paris'],
    );
  });

  it('matches accent-insensitive city and country names', () => {
    expect(filterDestinations(sample, 'Bogota').map((item) => item.id)).toEqual([
      'bogota',
    ]);
    expect(filterDestinations(sample, 'Japan').map((item) => item.id)).toEqual([
      'tokyo',
      'kyoto',
      'osaka',
      'sapporo',
    ]);
  });

  it('caps results when a limit is provided', () => {
    expect(filterDestinations(sample, 'Japan', 2).map((item) => item.id)).toEqual(
      ['tokyo', 'kyoto'],
    );
  });

  it('returns the full list for an empty query', () => {
    expect(filterDestinations(sample, ' ').map((item) => item.id)).toEqual(
      sample.map((item) => item.id),
    );
  });
});
