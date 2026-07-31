import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { destinations } from '../utils/tripHelpers';
import {
  getCountriesForRegion,
  getDestinationRegion,
  REGIONS,
  type Region,
} from '../data/regions';
import { DESTINATIONS_INDEX_META } from '../utils/pageMetaCopy';

const COUNTRY_FLAG_CODES: Record<string, string> = {
  Portugal: 'pt',
  Thailand: 'th',
  Mexico: 'mx',
  Hungary: 'hu',
  Vietnam: 'vn',
  Morocco: 'ma',
  France: 'fr',
  'United Kingdom': 'gb',
  Italy: 'it',
  Spain: 'es',
  Netherlands: 'nl',
  Türkiye: 'tr',
  'United Arab Emirates': 'ae',
  Japan: 'jp',
  'South Korea': 'kr',
  Singapore: 'sg',
  Indonesia: 'id',
  'United States': 'us',
  Brazil: 'br',
  Argentina: 'ar',
  'South Africa': 'za',
  Egypt: 'eg',
  Australia: 'au',
  'Czech Republic': 'cz',
  Austria: 'at',
  Germany: 'de',
  Greece: 'gr',
  Ireland: 'ie',
  Denmark: 'dk',
  Canada: 'ca',
  'New Zealand': 'nz',
  Taiwan: 'tw',
  China: 'cn',
  Peru: 'pe',
  India: 'in',
  Sweden: 'se',
  Iceland: 'is',
  Poland: 'pl',
  Croatia: 'hr',
  Switzerland: 'ch',
  Colombia: 'co',
  Chile: 'cl',
  Malaysia: 'my',
};

function flagCodeFor(destinationId: string, country: string): string {
  if (destinationId === 'hong-kong') return 'hk';
  return COUNTRY_FLAG_CODES[country] ?? 'un';
}

export function DestinationsIndexPage() {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState<Region | ''>('');
  const [country, setCountry] = useState('');

  const countries = useMemo(() => {
    const fromRegion = getCountriesForRegion(region);
    const present = new Set(destinations.map((destination) => destination.country));
    return fromRegion.filter((entry) => present.has(entry));
  }, [region]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return destinations
      .filter((destination) => {
        if (region && getDestinationRegion(destination) !== region) return false;
        if (country && destination.country !== country) return false;
        if (!normalizedQuery) return true;

        const haystack = `${destination.name} ${destination.country} ${getDestinationRegion(destination)}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [query, region, country]);

  return (
    <>
      <PageMeta
        title={DESTINATIONS_INDEX_META.title}
        description={DESTINATIONS_INDEX_META.description}
        canonicalPath="/destinations"
      />
      <main className="static-page destinations-index">
        <p className="cost-summary__eyebrow">City guides</p>
        <h1>Explore destinations</h1>
        <p>
          Each city page includes a dedicated trip cost calculator, currency
          tracker, top attractions, and must-try dishes with average prices.
        </p>

        <div className="destinations-index__filters" role="search">
          <label className="destinations-index__search">
            <span>Search cities</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by city or country"
              autoComplete="off"
            />
          </label>
          <label>
            <span>Region</span>
            <select
              value={region}
              onChange={(event) => {
                const next = event.target.value as Region | '';
                setRegion(next);
                setCountry('');
              }}
            >
              <option value="">All regions</option>
              {REGIONS.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Country</span>
            <select
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            >
              <option value="">All countries</option>
              {countries.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="destinations-index__count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'city' : 'cities'}
          {(query || region || country) && ' matching your filters'}
        </p>

        {filtered.length === 0 ? (
          <p className="destinations-index__empty">
            No cities match that search. Try another city name, region, or
            country.
          </p>
        ) : (
          <ul className="destinations-index__list">
            {filtered.map((destination) => (
              <li key={destination.id}>
                <Link to={`/destinations/${destination.id}`}>
                  <img
                    className="destinations-index__flag"
                    src={`https://flagcdn.com/w320/${flagCodeFor(destination.id, destination.country)}.png`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                  />
                  <strong>{destination.name}</strong>
                  <span>
                    {destination.country} · {getDestinationRegion(destination)}
                  </span>
                  <small>From ${destination.dailyBudget}/day baseline</small>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <p className="destinations-index__action">
          <Link className="explore-button" to="/">
            Open the calculator
          </Link>
        </p>
      </main>
    </>
  );
}

export default DestinationsIndexPage;
