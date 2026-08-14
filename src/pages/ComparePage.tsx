import { Link, useParams } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { JsonLd } from '../components/JsonLd';
import { NotFoundPage } from './NotFoundPage';
import { getComparisonBySlug, cityComparisons } from '../data/comparisons';
import { getDestinationById } from '../utils/tripHelpers';
import { calculateTripCost } from '../utils/costEngine';
import {
  PLANNING_DATA_AS_OF,
  PLANNING_DATA_AS_OF_LABEL,
} from '../utils/pricingAssumptions';
import { formatMonthList } from '../utils/seasonalityCopy';
import { buildCompareJsonLd } from '../utils/seo';
import type { Destination } from '../types';

function weekGroundTotal(destination: Destination): number {
  return calculateTripCost({
    destination,
    numberOfDays: 7,
    groupSize: 2,
    numberOfNights: 6,
  }).grandTotal;
}

export function CompareIndexPage() {
  return (
    <>
      <PageMeta
        title="City Trip Cost Comparisons — Plansti"
        description="Compare trip costs between popular city pairs, with 7-day ground estimates for two travelers and links to each city calculator."
        canonicalPath="/compare"
      />
      <main className="static-page compare-index">
        <p className="cost-summary__eyebrow">Comparisons</p>
        <h1>City trip cost comparisons</h1>
        <p className="answer-lead">
          Side-by-side planning estimates for popular city pairs—daily budgets,
          7-day ground costs for two travelers, and when to pick each city.
        </p>
        <ul className="destinations-index__list">
          {cityComparisons.map((comparison) => {
            const a = getDestinationById(comparison.aId);
            const b = getDestinationById(comparison.bId);
            if (!a || !b) return null;
            return (
              <li key={comparison.slug}>
                <Link to={`/compare/${comparison.slug}`}>
                  <span>{comparison.theme}</span>
                  <strong>
                    {a.name} vs {b.name}
                  </strong>
                  <small>
                    From ${Math.min(a.dailyBudget, b.dailyBudget)}/day baseline
                  </small>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}

export function ComparePage() {
  const { slug = '' } = useParams();
  const comparison = getComparisonBySlug(slug);
  const a = comparison ? getDestinationById(comparison.aId) : undefined;
  const b = comparison ? getDestinationById(comparison.bId) : undefined;

  if (!comparison || !a || !b) {
    return <NotFoundPage />;
  }

  const aWeek = weekGroundTotal(a);
  const bWeek = weekGroundTotal(b);
  const cheaper = aWeek <= bWeek ? a : b;
  const metaDescription =
    `${a.name} vs ${b.name} trip cost: compare daily budgets and 7-day ground estimates for two travelers. ${comparison.summary}`.slice(
      0,
      300,
    );

  return (
    <>
      <PageMeta
        title={`${a.name} vs ${b.name} Trip Cost — Plansti`}
        description={metaDescription}
        canonicalPath={`/compare/${comparison.slug}`}
      />
      <JsonLd
        id={`compare-${comparison.slug}`}
        data={buildCompareJsonLd(comparison, a, b)}
      />

      <article className="destination-page compare-page">
        <header className="destination-page__hero planner-panel">
          <p className="cost-summary__eyebrow">{comparison.theme}</p>
          <h1>
            {a.name}
            <span> vs </span>
            {b.name}
            <span> trip cost</span>
          </h1>
          <p className="answer-lead">{comparison.summary}</p>
        </header>

        <section
          className="planner-panel cost-snapshot"
          aria-labelledby="compare-cost-heading"
        >
          <p className="cost-summary__eyebrow">7-day estimate</p>
          <h2 id="compare-cost-heading">
            Ground costs for 2 travelers, 7 days
          </h2>
          <p className="answer-lead">
            Using Plansti midrange baselines, {a.name} comes to about $
            {Math.round(aWeek).toLocaleString('en-US')} USD and {b.name} about $
            {Math.round(bWeek).toLocaleString('en-US')} USD for two people over
            7 days of lodging, food, local transport, and activities—before
            long-haul flights. {cheaper.name} is the lower ground-cost option on
            this snapshot.
          </p>

          <div className="compare-page__table-wrap">
            <table className="compare-page__table">
              <thead>
                <tr>
                  <th scope="col">Planning metric</th>
                  <th scope="col">{a.name}</th>
                  <th scope="col">{b.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Daily budget / traveler</th>
                  <td>${a.dailyBudget} USD</td>
                  <td>${b.dailyBudget} USD</td>
                </tr>
                <tr>
                  <th scope="row">7 days for 2 people</th>
                  <td>~${Math.round(aWeek).toLocaleString('en-US')} USD</td>
                  <td>~${Math.round(bWeek).toLocaleString('en-US')} USD</td>
                </tr>
                <tr>
                  <th scope="row">Usually cheapest</th>
                  <td>{formatMonthList(a.seasonality.cheapest)}</td>
                  <td>{formatMonthList(b.seasonality.cheapest)}</td>
                </tr>
                <tr>
                  <th scope="row">Best overall</th>
                  <td>{formatMonthList(a.seasonality.best)}</td>
                  <td>{formatMonthList(b.seasonality.best)}</td>
                </tr>
                <tr>
                  <th scope="row">Busiest</th>
                  <td>{formatMonthList(a.seasonality.busiest)}</td>
                  <td>{formatMonthList(b.seasonality.busiest)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="cost-snapshot__footnote">
            Ground-cost planning assumptions dated{' '}
            <time dateTime={PLANNING_DATA_AS_OF}>
              {PLANNING_DATA_AS_OF_LABEL}
            </time>
            . The 2-traveler, 7-day totals above assume one shared room and 6
            lodging nights. Flights vary by origin and season.
          </p>
        </section>

        <section className="planner-panel" aria-labelledby="compare-pick-heading">
          <p className="cost-summary__eyebrow">Decision guide</p>
          <h2 id="compare-pick-heading">When to pick each city</h2>
          <div className="compare-page__picks">
            <div>
              <h3>Choose {a.name}</h3>
              <p>{comparison.pickA}</p>
              <Link
                className="explore-button"
                to={`/destinations/${a.id}`}
              >
                Open {a.name} calculator
              </Link>
            </div>
            <div>
              <h3>Choose {b.name}</h3>
              <p>{comparison.pickB}</p>
              <Link
                className="explore-button"
                to={`/destinations/${b.id}`}
              >
                Open {b.name} calculator
              </Link>
            </div>
          </div>
        </section>

        <section className="planner-panel" aria-labelledby="compare-verdict-heading">
          <p className="cost-summary__eyebrow">Verdict</p>
          <h2 id="compare-verdict-heading">
            {a.name} vs {b.name}: the short call
          </h2>
          <p className="answer-lead">{comparison.verdict}</p>
          <nav className="destination-page__actions" aria-label="Compare actions">
            <Link className="explore-button" to="/">
              Start a custom estimate
            </Link>
            <Link
              className="explore-button explore-button--secondary"
              to="/compare"
            >
              All comparisons
            </Link>
          </nav>
        </section>
      </article>
    </>
  );
}

export default ComparePage;
