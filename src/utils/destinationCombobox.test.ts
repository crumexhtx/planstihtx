import { describe, expect, it } from 'vitest';
import { filterDestinations } from '../components/DestinationCombobox';
import type { Destination } from '../types';

const sample: Destination[] = [
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    lat: 0,
    lng: 0,
    dailyBudget: 100,
    seasonality: { best: [], cheapest: [], busiest: [] },
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    lat: 0,
    lng: 0,
    dailyBudget: 100,
    seasonality: { best: [], cheapest: [], busiest: [] },
  },
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

  it('returns the full list for an empty query', () => {
    expect(filterDestinations(sample, ' ').map((item) => item.id)).toEqual([
      'tokyo',
      'paris',
    ]);
  });
});
