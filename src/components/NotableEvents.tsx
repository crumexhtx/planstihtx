import type { Destination } from '../types';
import { getDestinationEvents } from '../data/destinationEvents';

export interface NotableEventsProps {
  destination: Destination;
}

export function NotableEvents({ destination }: NotableEventsProps) {
  const events = getDestinationEvents(destination.id);
  if (!events) return null;

  return (
    <section
      className="planner-panel notable-events-panel"
      aria-labelledby="notable-events-heading"
    >
      <p className="cost-summary__eyebrow">Calendar</p>
      <h2 id="notable-events-heading">
        Notable events in {destination.name}
      </h2>
      <p>
        Recurring festivals and peak weekends that often explain busy or pricey
        months on this page. Dates shift year to year — treat timing as a
        planning window, not a fixed calendar.
      </p>
      <ul className="notable-events-panel__list">
        {events.map((event) => (
          <li key={event.name}>
            <h3>{event.name}</h3>
            <p className="notable-events-panel__timing">{event.typicalTiming}</p>
            <p>{event.crowdCostNote}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default NotableEvents;
