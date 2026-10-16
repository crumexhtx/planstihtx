import type { CatalogImage, DestinationItemMedia } from '../data/catalogImage';
import { getImageOverride } from '../data/imageOverrides';
import itemMediaJson from '../data/itemMedia.json';

const catalog = itemMediaJson as Record<string, DestinationItemMedia>;

export function getDestinationItemMedia(
  destinationId: string,
): DestinationItemMedia | undefined {
  return catalog[destinationId];
}

export function resolveCatalogImage(
  destinationId: string,
  itemName: string,
  catalogImage: CatalogImage | null | undefined,
): CatalogImage | null {
  const override = getImageOverride(destinationId, itemName);
  if (override) return override;
  return catalogImage ?? override ?? null;
}
