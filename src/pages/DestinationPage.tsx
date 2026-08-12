import { Link, useParams } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { DestinationGuide } from '../components/DestinationGuide';
import { BestTimeToVisit } from '../components/BestTimeToVisit';
import { NotableEvents } from '../components/NotableEvents';
import { DestinationCostSnapshot } from '../components/DestinationCostSnapshot';
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
import { cityComparisons } from '../data/comparisons';
import { destinationPageMeta } from '../utils/pageMetaCopy';

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
  const meta = destinationPageMeta(
    destination.name,
    destination.country,
    description,
    bestTimePhrase,
  );

  const relatedComparisons = cityComparisons.filter(
    (comparison) =>
      comparison.aId === destination.id || comparison.bId === destination.id,
  );

  return (
    <>
      <PageMeta
        title={meta.title}
        description={meta.description}
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
            <a className="explore-button" href="#trip-calculator">
              Jump to calculator
            </a>
            <Link
              className="explore-button explore-button--secondary"
              to="/destinations"
            >
              All cities
            </Link>
            <Link
              className="explore-button explore-button--secondary"
              to="/#trip-planner"
            >
              General calculator
            </Link>
          </nav>
        </header>

        <DestinationCostSnapshot destination={destination} />

        <BestTimeToVisit destination={destination} />

        <NotableEvents destination={destination} />

        <DestinationGuide
          destination={destination}
          showIntro={false}
          showRecommendations
        />

        {relatedComparisons.length > 0 && (
          <section className="planner-panel" aria-label="Related comparisons">
            <p className="cost-summary__eyebrow">Compare</p>
            <h2>Compare {destination.name} with similar trips</h2>
            <ul className="compare-page__related">
              {relatedComparisons.map((comparison) => {
                const otherId =
                  comparison.aId === destination.id
                    ? comparison.bId
                    : comparison.aId;
                const other = getDestinationById(otherId);
                if (!other) return null;
                return (
                  <li key={comparison.slug}>
                    <Link to={`/compare/${comparison.slug}`}>
                      {destination.name} vs {other.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <CurrencyTracker
          destinationId={destination.id}
          destinationName={destination.name}
        />

        <section
          id="trip-calculator"
          className="destination-page__calculator"
          aria-label={`${destination.name} trip calculator`}
        >
          <div className="planner-panel">
            <p className="cost-summary__eyebrow">City calculator</p>
            <h2>Estimate your {destination.name} trip</h2>
            <p className="answer-lead">
              Personalize the {destination.name} estimate with your origin,
              dates, group size, and transport. The snapshot above is a baseline;
              this calculator updates the full trip total.
            </p>
          </div>
          <TripPlanner
            mode="city"
            lockedDestination={destination}
            theme={theme}
            showDestinationSnapshot={false}
            showCityGuideRecommendations={false}
          />
        </section>
      </article>
    </>
  );
}

export default DestinationPage;
