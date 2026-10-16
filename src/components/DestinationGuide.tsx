import type { Destination } from '../types';
import { destinationDescriptions } from '../data/destinationDescriptions';
import { destinationExplore } from '../data/destinationExplore';
import { destinationDishes } from '../data/destinationDishes';
import { destinationBeverages } from '../data/destinationBeverages';
import { DESTINATION_LOCAL_CURRENCY } from '../utils/currencyTracker';
import { buildMustTryFoodAnswer } from '../utils/destinationAnswers';
import {
  getDestinationItemMedia,
  resolveCatalogImage,
} from '../utils/itemMedia';
import { MediaCredit, MediaPlaceholder } from './CatalogMedia';

export interface DestinationGuideProps {
  destination: Destination;
  showIntro?: boolean;
  showRecommendations?: boolean;
  onAddAdditionalCost?: (name: string, amountUsd?: number) => void;
}

function AttractionImage({
  attractionName,
  destinationId,
}: {
  attractionName: string;
  destinationId: string;
}) {
  const catalog =
    getDestinationItemMedia(destinationId)?.attractions?.[attractionName];
  const image = resolveCatalogImage(destinationId, attractionName, catalog);

  if (!image) {
    return (
      <MediaPlaceholder
        name={attractionName}
        className="attraction-gallery__image"
      />
    );
  }

  return (
    <span className="attraction-gallery__media">
      <a
        className="attraction-gallery__image"
        href={image.pageUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`View image source for ${attractionName}`}
      >
        <img
          src={image.url}
          alt={image.alt}
          width={800}
          height={450}
          loading="lazy"
          decoding="async"
        />
      </a>
      <MediaCredit image={image} />
    </span>
  );
}

function GuideItemImage({
  name,
  destinationId,
  kind,
}: {
  name: string;
  destinationId: string;
  kind: 'food' | 'drink' | 'beer';
}) {
  const media = getDestinationItemMedia(destinationId);
  const catalog =
    kind === 'food'
      ? media?.dishes?.[name]
      : kind === 'drink'
        ? media?.drink
        : media?.beer;
  const image = resolveCatalogImage(destinationId, name, catalog);

  if (!image) {
    return <MediaPlaceholder name={name} className="dish-card__image" />;
  }

  return (
    <span className="dish-card__media">
      <a
        className="dish-card__image"
        href={image.pageUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`View image source for ${name}`}
      >
        <img
          src={image.url}
          alt={image.alt}
          width={800}
          height={450}
          loading="lazy"
          decoding="async"
        />
      </a>
      <MediaCredit image={image} />
    </span>
  );
}

export function DestinationGuide({
  destination,
  showIntro = true,
  showRecommendations = true,
  onAddAdditionalCost,
}: DestinationGuideProps) {
  const explore = destinationExplore[destination.id];
  const dishes = destinationDishes[destination.id] ?? [];
  const beverages = destinationBeverages[destination.id];
  const description =
    destinationDescriptions[destination.id] ??
    `${destination.name} is a popular destination in ${destination.country}.`;
  const localCurrency = DESTINATION_LOCAL_CURRENCY[destination.id] ?? 'USD';
  const attractions = explore?.topAttractions.slice(0, 5) ?? [];

  return (
    <div className="destination-guide">
      {showIntro && (
        <section className="planner-panel destination-guide__intro">
          <p className="cost-summary__eyebrow">Destination guide</p>
          <h2>
            {destination.name}
            <span>, {destination.country}</span>
          </h2>
          <p>{description}</p>
          <div className="explore-modal__facts">
            <div>
              <span>Daily budget baseline</span>
              <strong>${destination.dailyBudget} USD</strong>
            </div>
            <div>
              <span>Local currency</span>
              <strong>{localCurrency}</strong>
            </div>
            <div>
              <span>Best for</span>
              <strong>{explore?.bestFor ?? 'Flexible city travel'}</strong>
            </div>
          </div>
          {explore?.highlights && (
            <p className="planner-help">{explore.highlights}</p>
          )}
        </section>
      )}

      {showRecommendations && (
        <>
          <section id="attractions" className="planner-panel">
            <p className="cost-summary__eyebrow">Things to do</p>
            <h2 id="attractions-heading">
              What are the top things to do in {destination.name}?
            </h2>
            <p className="answer-lead">
              The top things to do in {destination.name} for most first-time
              visitors start with{' '}
              {attractions
                .slice(0, 3)
                .map((item) => item.name)
                .join(', ')}
              {attractions.length > 3 ? ', and the stops below' : ''}. Use this
              shortlist to sketch a realistic day plan before you add ticket
              costs to your estimate.
            </p>
            {attractions.length > 0 ? (
              <ul className="explore-modal__attractions attraction-gallery">
                {attractions.map((attraction, index) => (
                  <li key={attraction.name}>
                    <AttractionImage
                      attractionName={attraction.name}
                      destinationId={destination.id}
                    />
                    <div className="attraction-gallery__content">
                      <span className="explore-modal__rank">{index + 1}</span>
                      <div>
                        <strong>{attraction.name}</strong>
                        <p>{attraction.blurb}</p>
                        {onAddAdditionalCost && (
                          <button
                            type="button"
                            className="recommendation-add-button"
                            onClick={() =>
                              onAddAdditionalCost(
                                `${attraction.name} admission`,
                              )
                            }
                          >
                            Add to additional cost
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="planner-help">Attraction details coming soon.</p>
            )}
          </section>

          <section id="food-dining" className="planner-panel">
            <p className="cost-summary__eyebrow">Food & dining</p>
            <h2 id="food-dining-heading">
              What&apos;s the food and dining like in {destination.name}?
            </h2>
            <p className="answer-lead">
              {buildMustTryFoodAnswer(destination)}
            </p>
            <p className="planner-help">
              Local dishes and drinks with typical serving prices for budgeting.
              Alcohol laws and availability vary by destination.
            </p>
            <div className="dish-grid">
              {dishes.map((dish) => (
                <article key={dish.name} className="dish-card">
                  <GuideItemImage
                    name={dish.name}
                    destinationId={destination.id}
                    kind="food"
                  />
                  <div className="dish-card__body">
                    <p className="cost-summary__eyebrow">Local dish</p>
                    <h3>{dish.name}</h3>
                    <p>{dish.blurb}</p>
                    <strong>Avg. ${dish.averagePriceUsd.toFixed(2)} USD</strong>
                    {onAddAdditionalCost && (
                      <button
                        type="button"
                        className="recommendation-add-button"
                        onClick={() =>
                          onAddAdditionalCost(
                            dish.name,
                            dish.averagePriceUsd,
                          )
                        }
                      >
                        Add to additional cost
                      </button>
                    )}
                  </div>
                </article>
              ))}
              {beverages &&
                ([
                  ['Local drink', beverages.localDrink, 'drink'],
                  ['Beer pick', beverages.beer, 'beer'],
                ] as const).map(([label, beverage, kind]) => (
                  <article key={`${kind}-${beverage.name}`} className="dish-card">
                    <GuideItemImage
                      name={beverage.name}
                      destinationId={destination.id}
                      kind={kind}
                    />
                    <div className="dish-card__body">
                      <p className="cost-summary__eyebrow">{label}</p>
                      <h3>{beverage.name}</h3>
                      <p>{beverage.blurb}</p>
                      <strong>
                        Avg. ${beverage.averagePriceUsd.toFixed(2)} USD
                      </strong>
                      {onAddAdditionalCost && (
                        <button
                          type="button"
                          className="recommendation-add-button"
                          onClick={() =>
                            onAddAdditionalCost(
                              beverage.name,
                              beverage.averagePriceUsd,
                            )
                          }
                        >
                          Add to additional cost
                        </button>
                      )}
                    </div>
                  </article>
                ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default DestinationGuide;
