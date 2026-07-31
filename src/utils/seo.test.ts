import { describe, expect, it } from 'vitest';
import {
  DEFAULT_SOCIAL_IMAGE_ALT,
  DEFAULT_SOCIAL_IMAGE_HEIGHT,
  DEFAULT_SOCIAL_IMAGE_PATH,
  DEFAULT_SOCIAL_IMAGE_URL,
  DEFAULT_SOCIAL_IMAGE_WIDTH,
  SITE_URL,
} from '../config/site';
import { cityComparisons } from '../data/comparisons';
import { destinations, getDestinationById } from './tripHelpers';
import {
  buildCompareJsonLd,
  buildDestinationJsonLd,
  buildWebsiteJsonLd,
} from './seo';

describe('SEO structured data', () => {
  it('builds a valid website entity without advertising nonexistent search', () => {
    const schema = buildWebsiteJsonLd();

    expect(schema['@type']).toBe('WebSite');
    expect(schema.name).toBe('Plansti');
    expect(schema).not.toHaveProperty('potentialAction');
  });

  it('configures an absolute, correctly sized default social preview', () => {
    expect(DEFAULT_SOCIAL_IMAGE_PATH).toBe(
      '/og/plansti-social-preview.png',
    );
    expect(DEFAULT_SOCIAL_IMAGE_URL).toBe(
      `${SITE_URL}${DEFAULT_SOCIAL_IMAGE_PATH}`,
    );
    expect(DEFAULT_SOCIAL_IMAGE_WIDTH).toBe(1200);
    expect(DEFAULT_SOCIAL_IMAGE_HEIGHT).toBe(630);
    expect(DEFAULT_SOCIAL_IMAGE_ALT).toContain('Plansti');
  });

  it('builds destination geo, country, page, and offer data', () => {
    const destination = destinations[0];
    if (!destination) throw new Error('Expected at least one destination');

    const schema = buildDestinationJsonLd(destination);
    expect(schema['@type']).toBe('TouristDestination');
    expect(schema.geo).toMatchObject({
      '@type': 'GeoCoordinates',
      latitude: destination.lat,
      longitude: destination.lng,
    });
    expect(schema.containedInPlace.name).toBe(destination.country);
    expect(schema.subjectOf.url).toContain(`/destinations/${destination.id}`);
    expect(schema.makesOffer.length).toBeGreaterThan(0);
    expect(schema.makesOffer.every((offer) => offer.priceCurrency === 'USD')).toBe(
      true,
    );
  });

  it('builds comparison page structured data for valid city pairs', () => {
    const comparison = cityComparisons[0];
    const a = getDestinationById(comparison.aId);
    const b = getDestinationById(comparison.bId);
    if (!a || !b) throw new Error('Expected comparison cities');

    const schema = buildCompareJsonLd(comparison, a, b);
    expect(schema['@type']).toBe('WebPage');
    expect(schema.url).toContain(`/compare/${comparison.slug}`);
    expect(schema.about).toHaveLength(2);
    expect(schema.mainEntity.itemListElement).toHaveLength(2);
  });
});
