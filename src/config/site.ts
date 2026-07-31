/** Public site config used for SEO, sitemap, and affiliate attribution. */
export const SITE_NAME = 'Plansti';
export const SITE_TAGLINE = 'Estimate your trip cost before you book';

const envSiteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim();

if (import.meta.env.PROD && !envSiteUrl) {
  throw new Error(
    'VITE_SITE_URL is required for production builds. Set it to the deployed site origin.',
  );
}

export const SITE_URL = (envSiteUrl || 'http://localhost:5173').replace(/\/$/, '');

export const DEFAULT_DESCRIPTION =
  'See how expensive a trip will be before you book. Estimate flights, stays, food, and daily spend with Plansti’s free trip cost calculator.';

export const DEFAULT_SOCIAL_IMAGE_PATH = '/og/plansti-social-preview.png';
export const DEFAULT_SOCIAL_IMAGE_URL = `${SITE_URL}${DEFAULT_SOCIAL_IMAGE_PATH}`;
export const DEFAULT_SOCIAL_IMAGE_WIDTH = 1200;
export const DEFAULT_SOCIAL_IMAGE_HEIGHT = 630;
export const DEFAULT_SOCIAL_IMAGE_ALT =
  'Plansti — Explore more. Spend smarter.';
