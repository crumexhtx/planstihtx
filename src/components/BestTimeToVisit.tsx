import type { Destination } from '../types';
import {
  buildBestTimeToVisitCopy,
  formatMonthList,
} from '../utils/seasonalityCopy';

export interface BestTimeToVisitProps {
  destination: Destination;
}

export function BestTimeToVisit({ destination }: BestTimeToVisitProps) {
  const copy = buildBestTimeToVisitCopy(destination);

  return (
    <section
      id="best-time"
      className="planner-panel best-time-panel"
      aria-labelledby="best-time-heading"
    >
      <p className="cost-summary__eyebrow">Seasonality</p>
      <h2 id="best-time-heading">
        When is the best time to visit {destination.name}?
      </h2>
      <p className="answer-lead">{copy}</p>
      <dl className="best-time-panel__grid">
        <div>
          <dt>Best overall</dt>
          <dd>{formatMonthList(destination.seasonality.best)}</dd>
        </div>
        <div>
          <dt>Usually cheapest</dt>
          <dd>{formatMonthList(destination.seasonality.cheapest)}</dd>
        </div>
        <div>
          <dt>Busiest</dt>
          <dd>{formatMonthList(destination.seasonality.busiest)}</dd>
        </div>
      </dl>
    </section>
  );
}

export default BestTimeToVisit;
