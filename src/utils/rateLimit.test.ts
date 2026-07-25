import { describe, expect, it } from 'vitest';
import { checkRateLimit, pruneRateLimits } from '../../api/_lib/rateLimit';

describe('contact rate limit', () => {
  it('allows traffic under the limit and blocks once exceeded', () => {
    const key = `test-${Math.random()}`;
    const now = 2_000_000_000_000;

    expect(checkRateLimit(key, 2, 60_000, now)).toEqual({
      allowed: true,
      retryAfterSeconds: 0,
    });
    expect(checkRateLimit(key, 2, 60_000, now + 1)).toEqual({
      allowed: true,
      retryAfterSeconds: 0,
    });
    expect(checkRateLimit(key, 2, 60_000, now + 2)).toEqual({
      allowed: false,
      retryAfterSeconds: 60,
    });
  });

  it('resets after the window and prunes expired buckets', () => {
    const key = `test-${Math.random()}`;
    const now = 2_100_000_000_000;

    expect(checkRateLimit(key, 1, 1_000, now).allowed).toBe(true);
    expect(checkRateLimit(key, 1, 1_000, now + 10).allowed).toBe(false);
    expect(checkRateLimit(key, 1, 1_000, now + 1_001).allowed).toBe(true);

    pruneRateLimits(now + 5_000);
    expect(checkRateLimit(key, 1, 1_000, now + 5_000).allowed).toBe(true);
  });
});
