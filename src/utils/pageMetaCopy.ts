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

export function destinationPageMeta(
  name: string,
  country: string,
  description: string,
  bestTimePhrase = '',
) {
  const base = `Find the cost of a ${name}, ${country} trip. See how expensive it is to visit, estimate daily spend, and plan flights, food, and attractions with Plansti’s trip cost calculator.`;
  const combined = [base, bestTimePhrase, description]
    .filter(Boolean)
    .join(' ')
    .slice(0, 300);

  return {
    title: `💰 How Expensive Is ${name}? Trip Cost & Budget Calculator | ${SITE_NAME}`,
    description: combined,
  };
}
