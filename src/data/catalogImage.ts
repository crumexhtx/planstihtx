/** Reject maps, logos, flags, and other non-photograph files. */
export const REJECT_IMAGE_FILE =
  /(logo|flag_of|coat_of_arms|map|locator|location|marker|seal_of|\.svg)/i;

export function isRejectedImageUrl(url: string): boolean {
  try {
    const filename = decodeURIComponent(new URL(url).pathname.split('/').at(-1) ?? '');
    return /\.gif$/i.test(filename) || REJECT_IMAGE_FILE.test(filename);
  } catch {
    return REJECT_IMAGE_FILE.test(url);
  }
}

export interface CatalogImage {
  url: string;
  pageUrl: string;
  alt: string;
  author?: string;
  license?: string;
}

export interface DestinationItemMedia {
  gallery: CatalogImage[];
  attractions: Record<string, CatalogImage | null>;
  dishes: Record<string, CatalogImage | null>;
  drink: CatalogImage | null;
  beer: CatalogImage | null;
}
