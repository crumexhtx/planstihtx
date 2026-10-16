import { describe, expect, it } from 'vitest';
import { destinationPageMeta, truncateAtWord } from './pageMetaCopy';

describe('truncateAtWord', () => {
  it('returns short text unchanged', () => {
    expect(truncateAtWord('Short description.', 155)).toBe('Short description.');
  });

  it('cuts at a word boundary and adds an ellipsis', () => {
    const text =
      'Find the cost of a Lisbon, Portugal trip. See how expensive it is to visit, estimate daily spend, and plan flights, food, and attractions with Plansti’s trip cost calculator.';
    const truncated = truncateAtWord(text, 155);
    expect(truncated.endsWith('…')).toBe(true);
    expect(truncated.length).toBeLessThanOrEqual(155);
    expect(truncated).toMatch(/\S…$/);
  });
});

describe('destinationPageMeta', () => {
  it('keeps destination descriptions around 155 characters', () => {
    const meta = destinationPageMeta(
      'Lisbon',
      'Portugal',
      'Sunny viewpoints, tiled streets, seafood, and easy coastal day trips.',
      'When is the best time to visit Lisbon? Typically March, April, and May.',
    );
    expect(meta.description.length).toBeLessThanOrEqual(155);
    expect(meta.description.endsWith('…')).toBe(true);
  });
});
