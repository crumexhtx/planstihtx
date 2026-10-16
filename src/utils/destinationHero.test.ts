import { describe, expect, it } from 'vitest';
import { getDestinationHero } from './destinationHero';

describe('getDestinationHero', () => {
  it('returns a sized photo for catalog destinations', () => {
    const hero = getDestinationHero('tokyo');
    expect(hero).not.toBeNull();
    expect(hero?.url).toMatch(/https?:\/\//);
    expect(hero?.alt.length).toBeGreaterThan(0);
  });

  it('returns null for unknown destinations', () => {
    expect(getDestinationHero('not-a-city')).toBeNull();
  });
});
