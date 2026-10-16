import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { TripPlanner } from '../components/TripPlanner';
import { BudgetDestinationMatcher } from '../components/BudgetDestinationMatcher';
import { CurrencyFooter } from '../components/CurrencyFooter';
import { HeroGlobe } from '../components/HeroGlobe';
import { HOME_META } from '../utils/pageMetaCopy';
import { SAMPLE_TRIP_LOCATION } from '../utils/plannerQuery';

export interface HomePageProps {
  theme: 'light' | 'dark';
}

export function HomePage({ theme }: HomePageProps) {
  return (
    <>
      <PageMeta
        title={HOME_META.title}
        description={HOME_META.description}
        canonicalPath="/"
      />
      <section className="travel-hero">
        <div className="travel-hero__content">
          <p className="travel-hero__eyebrow">Explore more. Spend smarter.</p>
          <h1>Discover your next trip</h1>
          <p>
            Pick where you are starting, choose a destination, and get a quick
            planning estimate for flights, stays, food, and local experiences.
          </p>
          <div className="travel-hero__actions">
            <Link className="travel-hero__cta" to={SAMPLE_TRIP_LOCATION}>
              Try a sample trip
            </Link>
            <a className="travel-hero__cta travel-hero__cta--secondary" href="#trip-planner">
              Start planning
            </a>
            <a className="travel-hero__cta travel-hero__cta--secondary" href="#currency-converter">
              Currency converter
            </a>
          </div>
          <p className="travel-hero__demo">
            Opens a Houston to Tokyo week with 2 travelers. Then compare{' '}
            <Link to="/compare/tokyo-vs-seoul">Tokyo vs Seoul</Link>.
          </p>
        </div>
        <div className="travel-hero__art" aria-hidden="true">
          <HeroGlobe />
        </div>
      </section>
      <BudgetDestinationMatcher />
      <div id="trip-planner">
        <TripPlanner mode="general" theme={theme} />
      </div>
      <CurrencyFooter />
    </>
  );
}

export default HomePage;
