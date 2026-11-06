import { describe, expect, it } from 'vitest';
import { cityComparisons, getComparisonBySlug } from './comparisons';
import { getDestinationById } from '../utils/tripHelpers';

describe('city comparisons', () => {
  it('covers the priority backlog pairs with valid cities', () => {
    expect(cityComparisons.length).toBeGreaterThanOrEqual(39);

    const slugs = cityComparisons.map((comparison) => comparison.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    cityComparisons.forEach((comparison) => {
      expect(comparison.slug).toMatch(/^[a-z0-9-]+-vs-[a-z0-9-]+$/);
      expect(comparison.aId).not.toBe(comparison.bId);
      expect(getDestinationById(comparison.aId)).toBeDefined();
      expect(getDestinationById(comparison.bId)).toBeDefined();
      expect(comparison.summary.trim().length).toBeGreaterThan(40);
      expect(comparison.pickA.trim().length).toBeGreaterThan(20);
      expect(comparison.pickB.trim().length).toBeGreaterThan(20);
      expect(comparison.verdict.trim().length).toBeGreaterThan(20);
      expect(getComparisonBySlug(comparison.slug)?.slug).toBe(comparison.slug);
    });
  });

  it('does not repeat a pair in either order', () => {
    const pairKeys = cityComparisons.map((comparison) =>
      [comparison.aId, comparison.bId].sort().join('|'),
    );
    expect(new Set(pairKeys).size).toBe(pairKeys.length);
  });
});
