/**
 * Resolve the public site origin used for canonical URLs, Open Graph tags,
 * robots.txt, and sitemap.xml.
 */
export const PRODUCTION_SITE_URL = 'https://plansti.com';

export function resolveSiteUrl(env = process.env) {
  const configured = env.VITE_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, '');

  // Preview deployments should reference themselves, not the live domain.
  const deploymentHost = env.VERCEL_URL?.trim();
  if (env.VERCEL_ENV && env.VERCEL_ENV !== 'production' && deploymentHost) {
    return `https://${deploymentHost.replace(/\/$/, '')}`;
  }

  return PRODUCTION_SITE_URL;
}
