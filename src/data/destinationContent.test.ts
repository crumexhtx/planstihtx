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
import {
  destinationEvents,
  getDestinationEvents,
} from './destinationEvents';
import destinationMedia from './destinationMedia.json';

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
      expect(buildBestTimeMetaPhrase(destination)).toMatch(
        /^When is the best time to visit /,
      );
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

  it('never lists a month in more than one seasonality bucket', () => {
    destinations.forEach((destination) => {
      const { cheapest, best, busiest } = destination.seasonality;
      const seen = new Map<number, string>();

      (
        [
          ['cheapest', cheapest],
          ['best', best],
          ['busiest', busiest],
        ] as const
      ).forEach(([bucket, months]) => {
        months.forEach((month) => {
          const existingBucket = seen.get(month);
          expect(
            existingBucket,
            `${destination.id}: month ${month} is in both "${existingBucket}" and "${bucket}"`,
          ).toBeUndefined();
          seen.set(month, bucket);
        });
      });
    });
  });

  it('only attaches notable events to real destinations, with approximate timing', () => {
    const destinationIds = new Set(destinations.map((destination) => destination.id));

    expect(Object.keys(destinationEvents).length).toBeGreaterThan(0);
    expect(Object.keys(destinationEvents).length).toBeLessThan(
      destinations.length,
    );

    Object.entries(destinationEvents).forEach(([destinationId, events]) => {
      expect(destinationIds.has(destinationId)).toBe(true);
      expect(events.length).toBeGreaterThan(0);
      events.forEach((event) => {
        expect(event.name.trim().length).toBeGreaterThan(2);
        expect(event.typicalTiming.toLowerCase()).toMatch(/typical/);
        expect(event.crowdCostNote.trim().length).toBeGreaterThan(40);
      });
    });

    expect(getDestinationEvents('munich')?.[0]?.name).toBe('Oktoberfest');
    expect(getDestinationEvents('paris')).toBeUndefined();
  });

  it('bakes Wikipedia thumbnails for most destinations', () => {
    const destinationIds = new Set(destinations.map((destination) => destination.id));
    const media = destinationMedia as Record<
      string,
      { url: string; pageUrl: string; alt: string } | undefined
    >;

    expect(Object.keys(media).length).toBeGreaterThan(destinations.length * 0.6);
    Object.entries(media).forEach(([destinationId, image]) => {
      expect(destinationIds.has(destinationId)).toBe(true);
      expect(image?.url).toMatch(/^https:\/\//);
      expect(image?.alt?.length).toBeGreaterThan(1);
    });
  });
});
