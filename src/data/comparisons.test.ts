import { describe, expect, it } from 'vitest';
import { cityComparisons, getComparisonBySlug } from './comparisons';
import { getDestinationById } from '../utils/tripHelpers';

describe('city comparisons', () => {
  it('covers the priority backlog pairs with valid cities', () => {
    expect(cityComparisons).toHaveLength(10);

    const slugs = cityComparisons.map((comparison) => comparison.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    cityComparisons.forEach((comparison) => {
      expect(comparison.slug).toMatch(/^[a-z0-9-]+-vs-[a-z0-9-]+$/);
      expect(getDestinationById(comparison.aId)).toBeDefined();
      expect(getDestinationById(comparison.bId)).toBeDefined();
      expect(comparison.summary.trim().length).toBeGreaterThan(40);
      expect(comparison.pickA.trim().length).toBeGreaterThan(20);
      expect(comparison.pickB.trim().length).toBeGreaterThan(20);
      expect(comparison.verdict.trim().length).toBeGreaterThan(20);
      expect(getComparisonBySlug(comparison.slug)?.slug).toBe(comparison.slug);
    });
  });
});
