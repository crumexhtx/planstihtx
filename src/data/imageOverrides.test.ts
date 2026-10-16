import { describe, expect, it } from 'vitest';
import { destinations } from '../utils/tripHelpers';
import { destinationBeverages } from './destinationBeverages';
import { destinationDishes } from './destinationDishes';
import { destinationExplore } from './destinationExplore';
import { IMAGE_OVERRIDES, imageOverrideKey } from './imageOverrides';

function itemNamesFor(destinationId: string): string[] {
  const attractions =
    destinationExplore[destinationId]?.topAttractions.map(
      (attraction) => attraction.name,
    ) ?? [];
  const dishes = (destinationDishes[destinationId] ?? []).map(
    (dish) => dish.name,
  );
  const beverages = destinationBeverages[destinationId];
  return [
    ...attractions,
    ...dishes,
    ...(beverages
      ? [beverages.localDrink.name, beverages.beer.name]
      : []),
  ];
}

describe('IMAGE_OVERRIDES', () => {
  it('keys every override to a real destination and item name', () => {
    const destinationIds = new Set(destinations.map((destination) => destination.id));

    Object.keys(IMAGE_OVERRIDES).forEach((key) => {
      const separator = key.indexOf('|');
      expect(separator).toBeGreaterThan(0);
      const destinationId = key.slice(0, separator);
      const itemName = key.slice(separator + 1);

      expect(destinationIds.has(destinationId)).toBe(true);
      expect(itemNamesFor(destinationId)).toContain(itemName);
      expect(key).toBe(imageOverrideKey(destinationId, itemName));
    });
  });

  it('blocks the critical unsafe Wikipedia matches', () => {
    const blocked = [
      'denver|Mount Evans / Echo Lake day trip',
      'naples|Pompeii',
      'los-angeles|Acai or smoothie bowl',
      'los-angeles|Golden Road 329 Lager',
      'dubai|Heineken 0.0',
      'gold-coast|Flat white',
      'johannesburg|Bunny chow',
      'montego-bay|Festival',
      'montego-bay|Hip Strip',
      'key-west|Key West Sunset Ale',
      'bucharest|Mici',
      'bucharest|Sarmale',
      'montreal|La Fin du Monde',
      'oslo|Vigeland Sculpture Park',
      'xi-an|Xi’an City Wall',
    ];

    blocked.forEach((key) => {
      expect(IMAGE_OVERRIDES).toHaveProperty(key);
      expect(IMAGE_OVERRIDES[key]).toBeNull();
    });
  });
});
