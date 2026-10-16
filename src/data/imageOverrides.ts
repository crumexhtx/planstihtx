import type { CatalogImage } from './catalogImage';

export type ImageOverride = CatalogImage | null;

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
  'paris|Musée d’Orsay': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Mus%C3%A9e_d%27Orsay%2C_North-West_view%2C_Paris_7e_140402.jpg/1200px-Mus%C3%A9e_d%27Orsay%2C_North-West_view%2C_Paris_7e_140402.jpg',
    pageUrl:
      'https://commons.wikimedia.org/wiki/File:Mus%C3%A9e_d%27Orsay,_North-West_view,_Paris_7e_140402.jpg',
    alt: "Musée d'Orsay",
  },
  'cartagena|Walled Old Town': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Murallas_de_Cartagena_de_Indias.jpg/1200px-Murallas_de_Cartagena_de_Indias.jpg',
    pageUrl:
      'https://commons.wikimedia.org/wiki/File:Murallas_de_Cartagena_de_Indias.jpg',
    alt: 'Walled City of Cartagena',
  },
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
