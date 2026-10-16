import { describe, expect, it } from 'vitest';
import { toSocialImageUrl } from './socialImage';

describe('toSocialImageUrl', () => {
  it('upgrades Wikimedia thumbnail widths to 1200px', () => {
    expect(
      toSocialImageUrl(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Eiffel.jpg/330px-Eiffel.jpg',
      ),
    ).toBe(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Eiffel.jpg/1200px-Eiffel.jpg',
    );
    expect(
      toSocialImageUrl(
        'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Tower.jpg/1280px-Tower.jpg',
      ),
    ).toBe(
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Tower.jpg/1200px-Tower.jpg',
    );
  });

  it('leaves default social images unchanged', () => {
    expect(
      toSocialImageUrl('https://plansti.com/og/plansti-social-preview.png'),
    ).toBe('https://plansti.com/og/plansti-social-preview.png');
  });
});
