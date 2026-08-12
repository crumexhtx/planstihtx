/**
 * Well-known recurring events that help explain seasonality and trip cost.
 * Only destinations with a genuinely famous annual event are listed —
 * most cities intentionally have no entry.
 *
 * Timing is approximate on purpose: festival calendars shift year to year.
 */
export interface DestinationEvent {
  name: string;
  /** Rough annual window, e.g. "Typically mid-September to early October". */
  typicalTiming: string;
  /** One line on crowds / prices during the event. */
  crowdCostNote: string;
}

export const destinationEvents: Record<string, DestinationEvent[]> = {
  munich: [
    {
      name: 'Oktoberfest',
      typicalTiming: 'Typically mid-September to early October',
      crowdCostNote:
        'Expect higher hotel rates and heavy booking pressure across the city — lock lodging early if your dates overlap.',
    },
  ],
  'rio-de-janeiro': [
    {
      name: 'Carnival',
      typicalTiming: 'Typically February or early March (movable with the church calendar)',
      crowdCostNote:
        'One of the year’s busiest and priciest windows — flights and hotels spike, and street parties can reshape nightly plans.',
    },
  ],
  edinburgh: [
    {
      name: 'Edinburgh Festival Fringe',
      typicalTiming: 'Typically August',
      crowdCostNote:
        'August fills with performers and visitors — central stays sell out and nightly rates climb well above the shoulder months.',
    },
    {
      name: 'Hogmanay',
      typicalTiming: 'Typically late December into New Year’s Day',
      crowdCostNote:
        'New Year crowds pack the Old Town; rooms near the celebrations book early and price accordingly.',
    },
  ],
  venice: [
    {
      name: 'Carnival of Venice',
      typicalTiming: 'Typically February (ending on Shrove Tuesday)',
      crowdCostNote:
        'Costume crowds and premium lodging demand push costs up — nearby mainland bases can soften the bill.',
    },
  ],
  'new-orleans': [
    {
      name: 'Mardi Gras',
      typicalTiming: 'Typically February or early March (ends on Fat Tuesday)',
      crowdCostNote:
        'Parade season drives sold-out French Quarter rooms and higher nightly rates — book early or stay a short streetcar ride away.',
    },
  ],
  amsterdam: [
    {
      name: 'King’s Day (Koningsdag)',
      typicalTiming: 'Typically 27 April (26 April when the 27th falls on a Sunday)',
      crowdCostNote:
        'The city turns into an orange street party overnight — expect crowded transit, loud evenings, and a one-day lodging premium.',
    },
  ],
  dublin: [
    {
      name: 'St. Patrick’s Festival',
      typicalTiming: 'Typically mid-March around 17 March',
      crowdCostNote:
        'Parade weekend fills central hotels and pubs — prices jump for a short window compared with quiet March midweeks.',
    },
  ],
  seville: [
    {
      name: 'Semana Santa',
      typicalTiming: 'Typically March or April (Holy Week; movable)',
      crowdCostNote:
        'Processions pack the old town; rooms near the cathedral book out and rates rise for the week.',
    },
    {
      name: 'Feria de Abril',
      typicalTiming: 'Typically two weeks after Easter',
      crowdCostNote:
        'Late nights and fairground crowds keep Seville busy — lodging stays elevated right after Semana Santa.',
    },
  ],
  valencia: [
    {
      name: 'Las Fallas',
      typicalTiming: 'Typically mid-March, peaking around 15–19 March',
      crowdCostNote:
        'Fireworks, street sculptures, and crowds push hotel rates up — the busiest nights are usually mid-March.',
    },
  ],
  calgary: [
    {
      name: 'Calgary Stampede',
      typicalTiming: 'Typically early to mid-July (about 10 days)',
      crowdCostNote:
        'Rodeo week is the city’s peak travel window — downtown hotels and short-term stays price for the surge.',
    },
  ],
  sapporo: [
    {
      name: 'Sapporo Snow Festival',
      typicalTiming: 'Typically early to mid-February',
      crowdCostNote:
        'Ice sculpture crowds fill Odori Park lodging — winter rates stay high for the festival week.',
    },
  ],
  kyoto: [
    {
      name: 'Gion Matsuri',
      typicalTiming: 'Typically July, with peak parade days mid-month',
      crowdCostNote:
        'Parade nights draw heavy foot traffic in Gion and downtown — nearby ryokan and hotels book early.',
    },
  ],
  nice: [
    {
      name: 'Nice Carnival',
      typicalTiming: 'Typically February to early March',
      crowdCostNote:
        'Promenade parades and parties lift lodging demand along the coast for about two weeks.',
    },
  ],
  sydney: [
    {
      name: 'New Year’s Eve fireworks',
      typicalTiming: 'Typically 31 December into 1 January',
      crowdCostNote:
        'Harbour-view rooms and CBD stays command a sharp premium — book months ahead or stay inland and transit in.',
    },
  ],
  'hong-kong': [
    {
      name: 'Chinese New Year',
      typicalTiming: 'Typically late January or February (lunar calendar)',
      crowdCostNote:
        'Family travel and fireworks weekends raise hotel rates; some smaller shops close for the holiday stretch.',
    },
  ],
  barcelona: [
    {
      name: 'La Mercè',
      typicalTiming: 'Typically around 24 September (several festival days)',
      crowdCostNote:
        'Free concerts and street events pack the city center — midrange lodging near Ciutat Vella rises for the week.',
    },
  ],
};

export function getDestinationEvents(
  destinationId: string,
): DestinationEvent[] | undefined {
  const events = destinationEvents[destinationId];
  return events?.length ? events : undefined;
}
