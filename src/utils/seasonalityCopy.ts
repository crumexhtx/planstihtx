import type { Destination } from '../types';

const FULL_MONTH_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export function formatMonthList(months: number[]): string {
  const labels = months
    .map((month) => FULL_MONTH_LABELS[month - 1])
    .filter((label): label is (typeof FULL_MONTH_LABELS)[number] =>
      Boolean(label),
    );

  if (labels.length === 0) return '';
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(', ')}, and ${labels[labels.length - 1]}`;
}

function templateIndex(destinationId: string): number {
  return (
    Math.abs(
      destinationId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0),
    ) % 3
  );
}

/** Varied copy so city pages don’t share one near-identical boilerplate sentence. */
export function buildBestTimeToVisitCopy(destination: Destination): string {
  const best = formatMonthList(destination.seasonality.best);
  const cheapest = formatMonthList(destination.seasonality.cheapest);
  const busiest = formatMonthList(destination.seasonality.busiest);
  const city = destination.name;

  const variants = [
    `The best time to visit ${city} is typically ${best}. ${cheapest} tend to be cheapest for trip costs, while ${busiest} are the busiest with travelers.`,
    `For ${city}, aim for ${best} if you want the strongest overall window. Budget-minded trips often favor ${cheapest}, and ${busiest} usually bring the densest crowds.`,
    `Plan a ${city} trip around ${best} for balanced conditions. Lower fares and softer daily costs show up more often in ${cheapest}, whereas ${busiest} are peak demand months.`,
  ];

  return variants[templateIndex(destination.id)];
}

export function buildBestTimeMetaPhrase(destination: Destination): string {
  const best = formatMonthList(destination.seasonality.best);
  if (!best) return '';
  return `Best time to visit ${destination.name}: ${best}.`;
}
