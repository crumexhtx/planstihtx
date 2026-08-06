import type { Destination } from '../types';

/** Broad travel regions used for destination filtering. */
export const REGIONS = [
  'North America',
  'Europe',
  'Asia',
  'Latin America',
  'Middle East & Africa',
  'Oceania',
] as const;

export type Region = (typeof REGIONS)[number];

const REGION_BY_COUNTRY: Record<string, Region> = {
  'United States': 'North America',
  Canada: 'North America',
  Mexico: 'Latin America',
  Portugal: 'Europe',
  France: 'Europe',
  'United Kingdom': 'Europe',
  Italy: 'Europe',
  Spain: 'Europe',
  Netherlands: 'Europe',
  Hungary: 'Europe',
  'Czech Republic': 'Europe',
  Austria: 'Europe',
  Germany: 'Europe',
  Greece: 'Europe',
  Ireland: 'Europe',
  Denmark: 'Europe',
  Thailand: 'Asia',
  Vietnam: 'Asia',
  Japan: 'Asia',
  'South Korea': 'Asia',
  Singapore: 'Asia',
  Indonesia: 'Asia',
  Taiwan: 'Asia',
  China: 'Asia',
  India: 'Asia',
  Morocco: 'Middle East & Africa',
  Türkiye: 'Middle East & Africa',
  'United Arab Emirates': 'Middle East & Africa',
  Egypt: 'Middle East & Africa',
  'South Africa': 'Middle East & Africa',
  Brazil: 'Latin America',
  Argentina: 'Latin America',
  Peru: 'Latin America',
  Colombia: 'Latin America',
  Chile: 'Latin America',
  Australia: 'Oceania',
  'New Zealand': 'Oceania',
  Sweden: 'Europe',
  Iceland: 'Europe',
  Poland: 'Europe',
  Croatia: 'Europe',
  Switzerland: 'Europe',
  Malaysia: 'Asia',
  Belgium: 'Europe',
  Slovenia: 'Europe',
  Norway: 'Europe',
  Finland: 'Europe',
  Philippines: 'Asia',
  Cambodia: 'Asia',
  Nepal: 'Asia',
  Israel: 'Middle East & Africa',
  Qatar: 'Middle East & Africa',
  Jordan: 'Middle East & Africa',
  Kenya: 'Middle East & Africa',
  Tanzania: 'Middle East & Africa',
  Ecuador: 'Latin America',
  'Costa Rica': 'Latin America',
  'Dominican Republic': 'Latin America',
  Uruguay: 'Latin America',
  Panama: 'Latin America',
  Bahamas: 'Latin America',
  Jamaica: 'Latin America',
};

export function getDestinationRegion(destination: Destination): Region {
  return REGION_BY_COUNTRY[destination.country] ?? 'Asia';
}

export function getCountriesForRegion(region: Region | ''): string[] {
  const countries = Object.entries(REGION_BY_COUNTRY)
    .filter(([, value]) => !region || value === region)
    .map(([country]) => country);
  return [...new Set(countries)].sort((a, b) => a.localeCompare(b));
}
