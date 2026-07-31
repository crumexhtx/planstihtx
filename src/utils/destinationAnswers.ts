import type { Destination } from '../types';
import { destinationDishes } from '../data/destinationDishes';
import {
  PLANNING_DATA_AS_OF,
  PLANNING_DATA_AS_OF_LABEL,
} from './pricingAssumptions';
import { calculateTripCost } from './costEngine';
import { formatMonthList } from './seasonalityCopy';

function templateIndex(destinationId: string, modulo: number): number {
  return (
    Math.abs(
      destinationId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0),
    ) % modulo
  );
}

/** Answer-first copy for trip-cost intent. */
export function buildTripCostAnswer(destination: Destination): string {
  const city = destination.name;
  const budget = destination.dailyBudget;
  const cheapest = formatMonthList(destination.seasonality.cheapest);
  const weekForTwo = calculateTripCost({
    destination,
    numberOfDays: 7,
    groupSize: 2,
    numberOfNights: 6,
  }).grandTotal;

  const variants = [
    `A practical midrange budget for ${city} is about $${budget} USD per traveler per day. For a 7-day trip for two people, ground costs (lodging, food, local transport, activities) land around $${Math.round(weekForTwo).toLocaleString('en-US')} USD before long-haul flights—usually cheapest in ${cheapest}.`,
    `${city} trip costs typically start from a $${budget}/day planning baseline per person. Two travelers for a week should expect roughly $${Math.round(weekForTwo).toLocaleString('en-US')} USD in on-the-ground spend; ${cheapest} tend to be the softer months for overall trip cost.`,
    `Plan about $${budget} USD per person per day in ${city}. That works out near $${Math.round(weekForTwo).toLocaleString('en-US')} USD for two people over 7 days of ground costs, with ${cheapest} often the better window for value.`,
  ];

  return variants[templateIndex(destination.id, variants.length)];
}

/** Answer-first copy for must-try food intent. */
export function buildMustTryFoodAnswer(destination: Destination): string {
  const dishes = destinationDishes[destination.id] ?? [];
  const city = destination.name;
  if (dishes.length === 0) {
    return `Local dishes in ${city} are a useful budgeting line—sample prices below help you plan meals before you go.`;
  }

  const names = dishes.slice(0, 3).map((dish) => dish.name);
  const nameList =
    names.length === 1
      ? names[0]
      : names.length === 2
        ? `${names[0]} and ${names[1]}`
        : `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
  const avg =
    dishes.reduce((sum, dish) => sum + dish.averagePriceUsd, 0) / dishes.length;

  const variants = [
    `Must-try food in ${city} usually includes ${nameList}. Typical plates on this guide average about $${avg.toFixed(0)} USD each—use the prices below to build a daily food line into your trip estimate.`,
    `If you are planning what to eat in ${city}, start with ${nameList}. Average serving prices here run near $${avg.toFixed(0)} USD, so you can budget meals instead of guessing.`,
    `${city} food budgeting is clearer when you price local favorites first: ${nameList} are reliable picks, with sample averages around $${avg.toFixed(0)} USD per serving on this page.`,
  ];

  return variants[templateIndex(destination.id, variants.length)];
}

export function buildCostSnapshot(destination: Destination) {
  const dishes = (destinationDishes[destination.id] ?? []).slice(0, 3);
  const weekForTwo = calculateTripCost({
    destination,
    numberOfDays: 7,
    groupSize: 2,
    numberOfNights: 6,
  });

  return {
    dailyBudget: destination.dailyBudget,
    weekForTwoTotal: weekForTwo.grandTotal,
    best: formatMonthList(destination.seasonality.best),
    cheapest: formatMonthList(destination.seasonality.cheapest),
    busiest: formatMonthList(destination.seasonality.busiest),
    sampleDishes: dishes,
    asOf: PLANNING_DATA_AS_OF,
    asOfLabel: PLANNING_DATA_AS_OF_LABEL,
    answer: buildTripCostAnswer(destination),
  };
}
