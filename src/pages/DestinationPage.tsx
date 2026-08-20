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
import { destinationExplore } from '../data/destinationExplore';
import { getDestinationEvents } from '../data/destinationEvents';
import { culturalIcons } from '../data/culturalIcons';
import destinationMedia from '../data/destinationMedia.json';
import { buildDestinationJsonLd } from '../utils/seo';
import { buildBestTimeMetaPhrase } from '../utils/seasonalityCopy';
import { cityComparisons } from '../data/comparisons';
import { destinationPageMeta } from '../utils/pageMetaCopy';

export interface DestinationPageProps {
  theme: 'light' | 'dark';
}

function shortLead(text: string): string {
  const trimmed = text.trim();
  const match = trimmed.match(/^[^.!?]+[.!?]/);
  return match?.[0]?.trim() || trimmed;
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
  const explore = destinationExplore[destination.id];
  const events = getDestinationEvents(destination.id);
  const heroLead = explore?.highlights
    ? shortLead(explore.highlights)
    : shortLead(description);
  const bestTimePhrase = buildBestTimeMetaPhrase(destination);
  const meta = destinationPageMeta(
    destination.name,
    destination.country,
    description,
    bestTimePhrase,
  );

  const icon = culturalIcons[destination.id];
  const media = (
    destinationMedia as Record<
      string,
      { url: string; pageUrl?: string; alt?: string } | undefined
    >
  )[destination.id];
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
        image={icon?.imageUrl ?? media?.url}
        imageAlt={
          icon || media
            ? `${icon?.label ?? media?.alt ?? destination.name} in ${destination.name}`
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
            <span>, {destination.country}</span>
          </h1>
          <p>{heroLead}</p>
          <DestinationSnapshot destination={destination} />
          <nav
            className="destination-page__toc"
            aria-label={`On this ${destination.name} guide`}
          >
            <a href="#trip-cost">How much does a trip cost?</a>
            <a href="#best-time">When is the best time to visit?</a>
            <a href="#attractions">What are the top things to do?</a>
            <a href="#food-dining">What&apos;s the food and dining like?</a>
            {events && (
              <a href="#notable-events">What notable events happen?</a>
            )}
            <a href="#trip-calculator">Estimate your trip</a>
          </nav>
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

        <DestinationGuide
          destination={destination}
          showIntro={false}
          showRecommendations
        />

        <NotableEvents destination={destination} />

        {relatedComparisons.length > 0 && (
          <section className="planner-panel" aria-label="Related comparisons">
            <p className="cost-summary__eyebrow">Compare</p>
            <h2>How does {destination.name} compare with similar trips?</h2>
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
            <h2>How do I estimate my {destination.name} trip?</h2>
            <p className="answer-lead">
              Personalize the {destination.name} estimate with your origin,
              dates, group size, and transport. The cost section above is a
              baseline; this calculator updates the full trip total.
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
