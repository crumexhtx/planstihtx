export const DESTINATION_SOCIAL_IMAGE_HEIGHT = 800;

/** Prefer a 1200px Wikimedia thumb when the source uses a sized thumbnail. */
export function toSocialImageUrl(url: string): string {
  return url.replace(/\/\d+px-/g, '/1200px-');
}
