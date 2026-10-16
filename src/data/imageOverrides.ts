import type { WikimediaImage } from '../utils/wikimediaImages';

export type ImageOverride = WikimediaImage | null;

/** `${destinationId}|${itemName}` → pinned image, or null to skip Wikipedia search. */
export const IMAGE_OVERRIDES: Record<string, ImageOverride> = {
  'denver|Mount Evans / Echo Lake day trip': null,
  'naples|Pompeii': null,
  'los-angeles|Acai or smoothie bowl': null,
  'los-angeles|Golden Road 329 Lager': null,
  'dubai|Heineken 0.0': null,
  'gold-coast|Flat white': null,
  'johannesburg|Bunny chow': null,
  'montego-bay|Festival': null,
  'montego-bay|Hip Strip': null,
  'key-west|Key West Sunset Ale': null,
  'bucharest|Mici': null,
  'bucharest|Sarmale': null,
  'montreal|La Fin du Monde': null,
  'oslo|Vigeland Sculpture Park': null,
  'xi-an|Xi’an City Wall': null,
};

export function imageOverrideKey(
  destinationId: string,
  itemName: string,
): string {
  return `${destinationId}|${itemName}`;
}

export function getImageOverride(
  destinationId: string,
  itemName: string,
): ImageOverride | undefined {
  const key = imageOverrideKey(destinationId, itemName);
  if (Object.prototype.hasOwnProperty.call(IMAGE_OVERRIDES, key)) {
    return IMAGE_OVERRIDES[key];
  }
  return undefined;
}
