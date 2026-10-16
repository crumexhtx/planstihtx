import { describe, expect, it } from 'vitest';
import { destinations } from '../utils/tripHelpers';
import { isRejectedImageUrl } from './catalogImage';
import { culturalIcons } from './culturalIcons';
import { destinationBeverages } from './destinationBeverages';
import { destinationDishes } from './destinationDishes';
import { destinationExplore } from './destinationExplore';
import destinationMedia from './destinationMedia.json';
import itemMediaJson from './itemMedia.json';
import type { CatalogImage, DestinationItemMedia } from './catalogImage';

const itemMedia = itemMediaJson as Record<string, DestinationItemMedia>;
const heroes = destinationMedia as Record<string, CatalogImage | undefined>;

/** Upper bound from the first verified prefetch; report the actual null count in the phase summary. */
const MAX_NULL_ITEMS = 750;

function itemNamesFor(destinationId: string) {
  const explore = destinationExplore[destinationId];
  const dishes = destinationDishes[destinationId] ?? [];
  const beverages = destinationBeverages[destinationId];
  return {
    attractions: explore?.topAttractions.map((item) => item.name) ?? [],
    dishes: dishes.map((item) => item.name),
    drink: beverages?.localDrink.name,
    beer: beverages?.beer.name,
  };
}

function collectUrls(): string[] {
  const urls: string[] = [];
  Object.values(heroes).forEach((image) => {
    if (image?.url) urls.push(image.url);
  });
  Object.values(culturalIcons).forEach((icon) => {
    if (icon.imageUrl) urls.push(icon.imageUrl);
  });
  Object.values(itemMedia).forEach((entry) => {
    entry.gallery?.forEach((image) => urls.push(image.url));
    Object.values(entry.attractions ?? {}).forEach((image) => {
      if (image?.url) urls.push(image.url);
    });
    Object.values(entry.dishes ?? {}).forEach((image) => {
      if (image?.url) urls.push(image.url);
    });
    if (entry.drink?.url) urls.push(entry.drink.url);
    if (entry.beer?.url) urls.push(entry.beer.url);
  });
  return urls;
}

describe('destination hero and item media catalog', () => {
  it('gives every destination a hero in destinationMedia or a pinned cultural icon', () => {
    destinations.forEach((destination) => {
      const hero = heroes[destination.id]?.url || culturalIcons[destination.id]?.imageUrl;
      expect(hero, `${destination.id} is missing a hero image`).toMatch(/^https:\/\//);
    });
  });

  it('does not store logo, flag, map, or svg files', () => {
    collectUrls().forEach((url) => {
      expect(isRejectedImageUrl(url), url).toBe(false);
    });
  });

  it('keys the item catalog to real destinations and item names', () => {
    const destinationIds = new Set(destinations.map((destination) => destination.id));
    expect(Object.keys(itemMedia).sort()).toEqual([...destinationIds].sort());

    Object.entries(itemMedia).forEach(([destinationId, entry]) => {
      const names = itemNamesFor(destinationId);
      expect(Object.keys(entry.attractions).sort()).toEqual(
        [...names.attractions].sort(),
      );
      expect(Object.keys(entry.dishes).sort()).toEqual([...names.dishes].sort());
      expect(names.drink).toBeDefined();
      expect(names.beer).toBeDefined();
    });
  });

  it('leaves fewer than the agreed null budget for item images', () => {
    let nullCount = 0;
    Object.values(itemMedia).forEach((entry) => {
      Object.values(entry.attractions ?? {}).forEach((image) => {
        if (image === null) nullCount += 1;
      });
      Object.values(entry.dishes ?? {}).forEach((image) => {
        if (image === null) nullCount += 1;
      });
      if (entry.drink === null) nullCount += 1;
      if (entry.beer === null) nullCount += 1;
    });
    expect(nullCount).toBeLessThan(MAX_NULL_ITEMS);
  });
});
