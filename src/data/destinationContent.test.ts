import { describe, expect, it } from 'vitest';
import { destinations } from '../utils/tripHelpers';
import {
  buildBestTimeMetaPhrase,
  buildBestTimeToVisitCopy,
} from '../utils/seasonalityCopy';
import { destinationBeverages } from './destinationBeverages';
import { destinationDescriptions } from './destinationDescriptions';
import { destinationDishes } from './destinationDishes';
import { destinationExplore } from './destinationExplore';

const WAVE_A = [
  'tokyo',
  'paris',
  'bali',
  'bangkok',
  'london',
  'rome',
  'new-york',
  'mexico-city',
] as const;

const LEADING_ORDINAL = /^\d+\.\s/;

describe('destination food and beverage content', () => {
  it('covers every destination with 4–5 dishes, a drink, and a beer pick', () => {
    const destinationIds = destinations.map((destination) => destination.id);

    expect(Object.keys(destinationDishes).sort()).toEqual(
      [...destinationIds].sort(),
    );
    expect(Object.keys(destinationBeverages).sort()).toEqual(
      [...destinationIds].sort(),
    );

    destinationIds.forEach((destinationId) => {
      const dishCount = destinationDishes[destinationId].length;
      expect(dishCount).toBeGreaterThanOrEqual(4);
      expect(dishCount).toBeLessThanOrEqual(5);
      expect(destinationBeverages[destinationId]).toBeDefined();
    });
  });

  it('uses complete, positive planning values', () => {
    destinations.forEach((destination) => {
      const picks = [
        ...destinationDishes[destination.id],
        destinationBeverages[destination.id].localDrink,
        destinationBeverages[destination.id].beer,
      ];

      picks.forEach((pick) => {
        expect(pick.name.trim()).not.toBe('');
        expect(pick.blurb.trim()).not.toBe('');
        expect(pick.averagePriceUsd).toBeGreaterThan(0);
      });
    });
  });
});

describe('destination guide copy', () => {
  it('has a unique description and explore block for every destination', () => {
    const destinationIds = destinations.map((destination) => destination.id);

    expect(Object.keys(destinationDescriptions).sort()).toEqual(
      [...destinationIds].sort(),
    );
    expect(Object.keys(destinationExplore).sort()).toEqual(
      [...destinationIds].sort(),
    );

    const descriptions = destinationIds.map(
      (destinationId) => destinationDescriptions[destinationId],
    );
    expect(new Set(descriptions).size).toBe(descriptions.length);

    destinationIds.forEach((destinationId) => {
      expect(destinationDescriptions[destinationId].trim().length).toBeGreaterThan(
        40,
      );
      expect(
        destinationExplore[destinationId].topAttractions.length,
      ).toBeGreaterThanOrEqual(5);
    });
  });

  it('keeps attraction names free of baked-in ordinal prefixes', () => {
    destinations.forEach((destination) => {
      destinationExplore[destination.id].topAttractions.forEach((attraction) => {
        expect(attraction.name).not.toMatch(LEADING_ORDINAL);
      });
    });
  });

  it('surfaces seasonality with varied best-time copy', () => {
    const copies = destinations.map((destination) =>
      buildBestTimeToVisitCopy(destination),
    );

    destinations.forEach((destination, index) => {
      expect(destination.seasonality.best.length).toBeGreaterThan(0);
      expect(copies[index]).toContain(destination.name);
      expect(buildBestTimeMetaPhrase(destination)).toMatch(/^Best time to visit /);
    });

    expect(new Set(copies).size).toBeGreaterThan(1);
  });

  it('gives Wave A cities deeper trip-cost intros', () => {
    WAVE_A.forEach((destinationId) => {
      expect(
        destinationDescriptions[destinationId].trim().length,
      ).toBeGreaterThanOrEqual(280);
    });
  });
});
