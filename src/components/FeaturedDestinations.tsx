import { Link } from 'react-router-dom';
import type { Destination } from '../types';
import { culturalIcons } from '../data/culturalIcons';
import destinationMedia from '../data/destinationMedia.json';

interface FeaturedDestinationsProps {
  destinations: Destination[];
  onSelect?: (destinationId: string) => void;
}

const mediaLookup = destinationMedia as Record<
  string,
  { url: string; pageUrl?: string; alt?: string } | undefined
>;

export function FeaturedDestinations({
  destinations,
  onSelect,
}: FeaturedDestinationsProps) {
  return (
    <section className="featured-destinations" aria-labelledby="featured-heading">
      <div className="featured-destinations__header">
        <h2 id="featured-heading">Popular city guides</h2>
        <p>Open a dedicated city page with calculator, attractions, and food picks.</p>
      </div>
      <div className="featured-destinations__grid">
        {destinations.map((destination) => {
          const imageUrl =
            culturalIcons[destination.id]?.imageUrl ??
            mediaLookup[destination.id]?.url;
          const content = (
            <>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt=""
                  width={400}
                  height={150}
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="featured-destination__placeholder" />
              )}
              <span className="featured-destination__label">
                <strong>{destination.name}</strong>
                <small>{destination.country}</small>
              </span>
            </>
          );

          if (onSelect) {
            return (
              <button
                key={destination.id}
                type="button"
                className="featured-destination"
                onClick={() => onSelect(destination.id)}
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={destination.id}
              className="featured-destination"
              to={`/destinations/${destination.id}`}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default FeaturedDestinations;
