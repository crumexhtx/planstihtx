import { SITE_NAME } from '../config/site';

/**
 * Shared SEO copy aligned to top Search Console queries:
 * "how expensive is {city}", "{city} trip cost", "cost of {city} trip",
 * and brand searches like "plansti value travel".
 */

export const HOME_META = {
  title: `✈️ Plansti Value Travel — Free Trip Cost Calculator | ${SITE_NAME}`,
  description:
    'See how expensive a trip will be before you book. Estimate flights, stays, food, and daily spend with Plansti’s free trip cost calculator.',
} as const;

export const DESTINATIONS_INDEX_META = {
  title: `🌍 City Trip Cost Guides — How Expensive Is Each Destination? | ${SITE_NAME}`,
  description:
    'Browse city trip cost guides and find out how expensive each destination is. Compare daily budgets, attractions, food prices, and trip cost calculators.',
} as const;

export function truncateAtWord(text: string, max = 155): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) return normalized;
  const slice = normalized.slice(0, Math.max(0, max - 1));
  const lastSpace = slice.lastIndexOf(' ');
  const trimmed = (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).trimEnd();
  return `${trimmed}…`;
}

export function destinationPageMeta(
  name: string,
  country: string,
  description: string,
  bestTimePhrase = '',
) {
  const base = `Find the cost of a ${name}, ${country} trip. See how expensive it is to visit, estimate daily spend, and plan flights, food, and attractions with Plansti’s trip cost calculator.`;
  const combined = [base, bestTimePhrase, description]
    .filter(Boolean)
    .join(' ');

  return {
    title: `💰 How Expensive Is ${name}? Trip Cost & Budget Calculator | ${SITE_NAME}`,
    description: truncateAtWord(combined, 155),
  };
}
