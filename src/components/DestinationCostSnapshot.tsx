import { Link } from 'react-router-dom';
import type { Destination } from '../types';
import { buildCostSnapshot } from '../utils/destinationAnswers';

export interface DestinationCostSnapshotProps {
  destination: Destination;
}

export function DestinationCostSnapshot({
  destination,
}: DestinationCostSnapshotProps) {
  const snapshot = buildCostSnapshot(destination);

  return (
    <section
      id="trip-cost"
      className="planner-panel cost-snapshot"
      aria-labelledby="cost-snapshot-heading"
    >
      <p className="cost-summary__eyebrow">Cost breakdown</p>
      <h2 id="cost-snapshot-heading">
        How much does a trip to {destination.name} cost?
      </h2>
      <p className="answer-lead">{snapshot.answer}</p>

      <dl className="cost-snapshot__grid">
        <div>
          <dt>Daily budget baseline</dt>
          <dd>${snapshot.dailyBudget} USD / traveler</dd>
        </div>
        <div>
          <dt>7 days for 2 people</dt>
          <dd>
            ~${Math.round(snapshot.weekForTwoTotal).toLocaleString('en-US')} USD
            ground costs
          </dd>
          <small>2nd traveler ≈ 62% of daily rate (shared room)</small>
        </div>
        <div>
          <dt>Usually cheapest</dt>
          <dd>{snapshot.cheapest || 'Varies'}</dd>
        </div>
        <div>
          <dt>Busiest months</dt>
          <dd>{snapshot.busiest || 'Varies'}</dd>
        </div>
      </dl>

      {snapshot.sampleDishes.length > 0 && (
        <div className="cost-snapshot__dishes">
          <h3>Sample food prices</h3>
          <ul>
            {snapshot.sampleDishes.map((dish) => (
              <li key={dish.name}>
                <strong>{dish.name}</strong>
                <span>${dish.averagePriceUsd.toFixed(2)} USD avg</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="cost-snapshot__footnote">
        Ground-cost planning assumptions dated{' '}
        <time dateTime={snapshot.asOf}>{snapshot.asOfLabel}</time>. Totals
        exclude long-haul flights—use the calculator below to personalize dates,
        origin, and group size. See{' '}
        <Link to="/about#group-size-cost">how group size affects cost</Link>.{' '}
        <Link to="#trip-calculator">Jump to calculator</Link>
      </p>
    </section>
  );
}

export default DestinationCostSnapshot;
