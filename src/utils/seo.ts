import type { Destination } from '../types';
import type { CityComparison } from '../data/comparisons';
import { destinationDescriptions } from '../data/destinationDescriptions';
import { destinationExplore } from '../data/destinationExplore';
import { destinationDishes } from '../data/destinationDishes';
import { SITE_NAME, SITE_URL } from '../config/site';
import { calculateTripCost } from './costEngine';

export function buildDestinationJsonLd(destination: Destination) {
  const explore = destinationExplore[destination.id];
  const dishes = destinationDishes[destination.id] ?? [];
  const description =
    destinationDescriptions[destination.id] ??
    `Trip cost estimate for ${destination.name}, ${destination.country}.`;

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    description,
    url: `${SITE_URL}/destinations/${destination.id}`,
    touristType: explore?.bestFor,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: destination.lat,
      longitude: destination.lng,
    },
    containedInPlace: {
      '@type': 'Country',
      name: destination.country,
    },
    makesOffer: dishes.map((dish) => ({
      '@type': 'Offer',
      name: dish.name,
      description: dish.blurb,
      price: dish.averagePriceUsd,
      priceCurrency: 'USD',
    })),
    subjectOf: {
      '@type': 'WebPage',
      name: `${destination.name} Trip Cost Estimate — ${SITE_NAME}`,
      url: `${SITE_URL}/destinations/${destination.id}`,
    },
  };
}

export function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function buildCompareJsonLd(
  comparison: CityComparison,
  a: Destination,
  b: Destination,
) {
  const week = (destination: Destination) =>
    calculateTripCost({
      destination,
      numberOfDays: 7,
      groupSize: 2,
      numberOfNights: 6,
    }).grandTotal;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${a.name} vs ${b.name} Trip Cost — ${SITE_NAME}`,
    description: comparison.summary,
    url: `${SITE_URL}/compare/${comparison.slug}`,
    about: [
      {
        '@type': 'TouristDestination',
        name: a.name,
        url: `${SITE_URL}/destinations/${a.id}`,
      },
      {
        '@type': 'TouristDestination',
        name: b.name,
        url: `${SITE_URL}/destinations/${b.id}`,
      },
    ],
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: `${a.name} 7-day ground cost for 2`,
          description: `About $${Math.round(week(a))} USD`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: `${b.name} 7-day ground cost for 2`,
          description: `About $${Math.round(week(b))} USD`,
        },
      ],
    },
  };
}
