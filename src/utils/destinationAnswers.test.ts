import { describe, expect, it } from 'vitest';
import { destinations } from './tripHelpers';
import {
  buildCostSnapshot,
  buildMustTryFoodAnswer,
  buildTripCostAnswer,
} from './destinationAnswers';

describe('destination answer-first copy', () => {
  it('builds cost answers and snapshots for every destination', () => {
    destinations.forEach((destination) => {
      const answer = buildTripCostAnswer(destination);
      const snapshot = buildCostSnapshot(destination);

      expect(answer).toContain(destination.name);
      expect(answer).toContain(`$${destination.dailyBudget}`);
      expect(snapshot.dailyBudget).toBe(destination.dailyBudget);
      expect(snapshot.weekForTwoTotal).toBeGreaterThan(0);
      expect(snapshot.asOf).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it('varies cost copy across the catalog', () => {
    const copies = destinations.map((destination) =>
      buildTripCostAnswer(destination),
    );
    expect(new Set(copies).size).toBeGreaterThan(1);
  });

  it('builds must-try food answers that mention the city', () => {
    destinations.forEach((destination) => {
      expect(buildMustTryFoodAnswer(destination)).toContain(destination.name);
    });
  });
});
