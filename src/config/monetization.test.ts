import { describe, expect, it } from 'vitest';
import {
  AFFILIATES_LIVE,
  HOME_PARTNER_OFFERS,
  getDestinationOffers,
} from '../config/monetization';

describe('monetization gating', () => {
  it('keeps affiliate CTAs disabled until AFFILIATES_LIVE is turned on', () => {
    expect(AFFILIATES_LIVE).toBe(false);
    expect(HOME_PARTNER_OFFERS).toEqual([]);
    expect(getDestinationOffers('tokyo', 'Tokyo')).toEqual([]);
  });
});
