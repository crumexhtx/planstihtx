import { useEffect, useState } from 'react';
import type { Destination } from '../types';
import type { CatalogImage } from '../data/catalogImage';
import { culturalIcons } from '../data/culturalIcons';
import destinationMedia from '../data/destinationMedia.json';
import { destinationExplore } from '../data/destinationExplore';
import {
  getDestinationItemMedia,
  resolveCatalogImage,
} from '../utils/itemMedia';
import { MediaCredit, MediaPlaceholder } from './CatalogMedia';

interface DestinationSnapshotProps {
  destination: Destination;
  forecastDays?: 1 | 5;
}

interface ForecastDay {
  date: string;
  maxF: number | null;
  minF: number | null;
  weatherCode: number | null;
}

interface Snapshot {
  images: CatalogImage[];
  temperatureF: number | null;
  weatherCode: number | null;
  forecast: ForecastDay[];
}

const GALLERY_SLOTS = 4;

function describeWeather(code: number | null): string {
  if (code === null) return '';
  if (code === 0) return 'Clear';
  if (code <= 3) return 'Partly cloudy';
  if (code <= 48) return 'Foggy';
  if (code <= 67) return 'Rain';
  if (code <= 77) return 'Snow';
  if (code <= 82) return 'Rain showers';
  return 'Thunderstorms';
}

function normalizeImageText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function imageFileName(url: string): string {
  try {
    return normalizeImageText(
      decodeURIComponent(new URL(url).pathname.split('/').at(-1) ?? '')
        .replace(/^\d+px-/, ''),
    );
  } catch {
    return normalizeImageText(url);
  }
}

function isDuplicateImage(
  candidate: CatalogImage,
  existing: CatalogImage,
): boolean {
  const candidatePage = candidate.pageUrl.split(/[?#]/)[0].toLowerCase();
  const existingPage = existing.pageUrl.split(/[?#]/)[0].toLowerCase();
  return (
    candidatePage === existingPage ||
    imageFileName(candidate.url) === imageFileName(existing.url) ||
    normalizeImageText(candidate.alt) === normalizeImageText(existing.alt)
  );
}

function catalogImagesFor(destination: Destination): CatalogImage[] {
  const culturalIcon = culturalIcons[destination.id];
  const baked = (destinationMedia as Record<string, CatalogImage | undefined>)[
    destination.id
  ];
  const itemMedia = getDestinationItemMedia(destination.id);
  const images: CatalogImage[] = [];
  const heroUrl = culturalIcon?.imageUrl ?? baked?.url;
  if (heroUrl) {
    images.push({
      url: heroUrl,
      pageUrl: culturalIcon?.imagePageUrl ?? baked?.pageUrl ?? heroUrl,
      alt: culturalIcon?.label ?? baked?.alt ?? destination.name,
      author: baked?.author,
      license: baked?.license,
    });
  }
  const extras = [
    ...(itemMedia?.gallery ?? []),
    ...(destinationExplore[destination.id]?.topAttractions ?? []).map(
      (attraction) =>
        resolveCatalogImage(
          destination.id,
          attraction.name,
          itemMedia?.attractions?.[attraction.name],
        ),
    ),
  ].filter((image): image is CatalogImage => image !== null);

  extras.forEach((image) => {
    if (
      images.length < GALLERY_SLOTS &&
      !images.some((candidate) => isDuplicateImage(image, candidate))
    ) {
      images.push(image);
    }
  });
  return images;
}

export function DestinationSnapshot({
  destination,
  forecastDays = 1,
}: DestinationSnapshotProps) {
  const culturalIcon = culturalIcons[destination.id];
  const galleryImages = catalogImagesFor(destination);
  const [snapshot, setSnapshot] = useState<Snapshot>(() => ({
    images: galleryImages,
    temperatureF: null,
    weatherCode: null,
    forecast: [],
  }));
  const [failed, setFailed] = useState(false);
  const [weatherReady, setWeatherReady] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const images = catalogImagesFor(destination);
    setSnapshot({
      images,
      temperatureF: null,
      weatherCode: null,
      forecast: [],
    });
    setFailed(false);
    setWeatherReady(false);

    const weatherUrl =
      `https://api.open-meteo.com/v1/forecast?latitude=${destination.lat}` +
      `&longitude=${destination.lng}` +
      '&current=temperature_2m,weather_code' +
      (forecastDays === 5
        ? '&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=5'
        : '') +
      '&temperature_unit=fahrenheit&timezone=auto';

    fetch(weatherUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Weather request failed');
        return response.json() as Promise<{
          current?: { temperature_2m?: number; weather_code?: number };
          daily?: {
            time?: string[];
            temperature_2m_max?: number[];
            temperature_2m_min?: number[];
            weather_code?: number[];
          };
        }>;
      })
      .then((weather) => {
        if (controller.signal.aborted) return;
        setSnapshot({
          images,
          temperatureF: weather?.current?.temperature_2m ?? null,
          weatherCode: weather?.current?.weather_code ?? null,
          forecast: (weather?.daily?.time ?? [])
            .slice(0, 5)
            .map((date, index) => ({
              date,
              maxF: weather?.daily?.temperature_2m_max?.[index] ?? null,
              minF: weather?.daily?.temperature_2m_min?.[index] ?? null,
              weatherCode: weather?.daily?.weather_code?.[index] ?? null,
            })),
        });
        setWeatherReady(true);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setFailed(true);
        setWeatherReady(true);
      });

    return () => controller.abort();
  }, [destination, forecastDays]);

  const galleryItems = Array.from({ length: GALLERY_SLOTS }, (_, index) => {
    return snapshot.images[index] ?? null;
  });
  const hasAnyImage = snapshot.images.length > 0;

  return (
    <div className="destination-snapshot">
      <div className="destination-snapshot__gallery" aria-busy={false}>
        {galleryItems.map((image, index) =>
          image ? (
            <figure key={image.url} className="destination-snapshot__figure">
              <a
                href={image.pageUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View source for ${destination.name} image ${index + 1}`}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  width={640}
                  height={360}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </a>
              <figcaption>
                <MediaCredit image={image} />
              </figcaption>
            </figure>
          ) : (
            <MediaPlaceholder
              key={`slot-${index}`}
              name={destination.name}
              className="destination-snapshot__placeholder"
            />
          ),
        )}
      </div>
      <small className="destination-snapshot__caption">
        {hasAnyImage && culturalIcon
          ? `Featuring ${culturalIcon.label} and city landmarks`
          : failed
            ? 'Live weather is temporarily unavailable.'
            : '\u00a0'}
      </small>
      {forecastDays === 5 ? (
        <div
          className="destination-snapshot__forecast"
          aria-label={`Five-day weather forecast for ${destination.name}`}
          aria-live="polite"
        >
          {snapshot.forecast.length > 0
            ? snapshot.forecast.map((day) => (
                <div key={day.date}>
                  <span>
                    {new Intl.DateTimeFormat('en-US', {
                      weekday: 'short',
                      timeZone: 'UTC',
                    }).format(new Date(`${day.date}T12:00:00Z`))}
                  </span>
                  <strong>
                    {day.maxF === null ? '—' : `${Math.round(day.maxF)}°`}
                  </strong>
                  <small>
                    Low {day.minF === null ? '—' : `${Math.round(day.minF)}°`}
                  </small>
                  <small>{describeWeather(day.weatherCode)}</small>
                </div>
              ))
            : Array.from({ length: 5 }, (_, index) => (
                <div key={`forecast-slot-${index}`}>
                  <span>{weatherReady ? '—' : '…'}</span>
                  <strong>—</strong>
                  <small>Low —</small>
                  <small>
                    {failed || weatherReady
                      ? 'Unavailable'
                      : 'Loading forecast'}
                  </small>
                </div>
              ))}
        </div>
      ) : (
        <p className="destination-snapshot__weather" aria-live="polite">
          <span>Current temperature</span>
          <strong>
            {!weatherReady
              ? '—'
              : snapshot.temperatureF === null
                ? 'Unavailable'
                : `${Math.round(snapshot.temperatureF)}°F`}
          </strong>
          <small>
            {!weatherReady
              ? 'Loading weather'
              : describeWeather(snapshot.weatherCode) || 'Weather unavailable'}
          </small>
          <small className="destination-snapshot__weather-source">
            {!weatherReady
              ? '\u00a0'
              : snapshot.temperatureF === null
                ? 'Live weather unavailable — not a cached estimate'
                : 'Live forecast via Open-Meteo'}
          </small>
        </p>
      )}
    </div>
  );
}

export default DestinationSnapshot;
