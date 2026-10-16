import { culturalIcons } from '../data/culturalIcons';
import destinationMedia from '../data/destinationMedia.json';

type MediaEntry = {
  url: string;
  alt?: string;
};

export function getDestinationHero(
  destinationId: string,
): { url: string; alt: string } | null {
  const icon = culturalIcons[destinationId];
  const media = (destinationMedia as Record<string, MediaEntry | undefined>)[
    destinationId
  ];
  const url = icon?.imageUrl ?? media?.url;
  if (!url) return null;
  return {
    url,
    alt: icon?.label ?? media?.alt ?? '',
  };
}
