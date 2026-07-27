import { Link, useParams } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { DestinationGuide } from '../components/DestinationGuide';
import { BestTimeToVisit } from '../components/BestTimeToVisit';
import { TripPlanner } from '../components/TripPlanner';
import { DestinationSnapshot } from '../components/DestinationSnapshot';
import { CurrencyTracker } from '../components/CurrencyTracker';
import { JsonLd } from '../components/JsonLd';
import { NotFoundPage } from './NotFoundPage';
import { getDestinationById } from '../utils/tripHelpers';
import { destinationDescriptions } from '../data/destinationDescriptions';
import { culturalIcons } from '../data/culturalIcons';
import { buildDestinationJsonLd } from '../utils/seo';
import { buildBestTimeMetaPhrase } from '../utils/seasonalityCopy';

export interface DestinationPageProps {
  theme: 'light' | 'dark';
}

export function DestinationPage({ theme }: DestinationPageProps) {
  const { destinationId = '' } = useParams();
  const destination = getDestinationById(destinationId);

  if (!destination) {
    return <NotFoundPage />;
  }

  const description =
    destinationDescriptions[destination.id] ??
    `Estimate trip costs for ${destination.name}, ${destination.country}.`;
  const bestTimePhrase = buildBestTimeMetaPhrase(destination);
  const metaDescription = [
    `Plan a trip to ${destination.name}: cost calculator, top attractions, must-try dishes, and currency conversion.`,
    bestTimePhrase,
    description,
  ]
    .filter(Boolean)
    .join(' ')
    .slice(0, 300);

  return (
    <>
      <PageMeta
        title={`${destination.name} Trip Cost Estimate — Plansti`}
        description={metaDescription}
        canonicalPath={`/destinations/${destination.id}`}
        image={culturalIcons[destination.id]?.imageUrl}
        imageAlt={
          culturalIcons[destination.id]?.imageUrl
            ? `${culturalIcons[destination.id].label} in ${destination.name}`
            : undefined
        }
      />
      <JsonLd
        id={`destination-${destination.id}`}
        data={buildDestinationJsonLd(destination)}
      />

      <article className="destination-page">
        <header className="destination-page__hero planner-panel">
          <p className="cost-summary__eyebrow">City guide</p>
          <h1>
            {destination.name}
            <span> trip cost estimate</span>
          </h1>
          <p>{description}</p>
          <DestinationSnapshot destination={destination} />
          <nav
            className="destination-page__actions"
            aria-label="Destination page actions"
          >
            <Link className="explore-button" to="/">
              ← Back to calculator
            </Link>
            <Link
              className="explore-button explore-button--secondary"
              to="/destinations"
            >
              All cities
            </Link>
          </nav>
        </header>

        <BestTimeToVisit destination={destination} />

        <DestinationGuide
          destination={destination}
          showRecommendations={false}
        />

        <CurrencyTracker
          destinationId={destination.id}
          destinationName={destination.name}
        />

        <section
          className="destination-page__calculator"
          aria-label={`${destination.name} trip calculator`}
        >
          <div className="planner-panel">
            <p className="cost-summary__eyebrow">City calculator</p>
            <h2>Estimate your {destination.name} trip</h2>
            <p className="planner-help">
              Destination is locked to {destination.name}. Change origin, dates,
              group size, and transport to update the total.
            </p>
          </div>
          <TripPlanner
            mode="city"
            lockedDestination={destination}
            theme={theme}
            showDestinationSnapshot={false}
          />
        </section>
      </article>
    </>
  );
}

export default DestinationPage;
