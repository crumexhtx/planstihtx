import { describe, expect, it } from 'vitest';
import { COUNTRY_FLAG_CODES } from '../pages/DestinationsIndexPage';
import { destinations } from './tripHelpers';
import { formatUsd } from './formatUsd';

describe('formatUsd', () => {
  it('formats with a thousands separator', () => {
    expect(formatUsd(1521.84)).toBe('$1,521.84');
    expect(formatUsd(14)).toBe('$14.00');
  });
});

describe('country flags', () => {
  it('has a flag code for every destination country', () => {
    const countries = [...new Set(destinations.map((destination) => destination.country))];
    countries.forEach((country) => {
      expect(COUNTRY_FLAG_CODES[country], country).toMatch(/^[a-z]{2}$/);
    });
  });
});
