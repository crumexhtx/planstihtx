export interface CityComparison {
  slug: string;
  aId: string;
  bId: string;
  theme: string;
  /** Answer-first summary for the H1 support paragraph. */
  summary: string;
  pickA: string;
  pickB: string;
  verdict: string;
}

/** Priority comparison pages from the traffic backlog. */
export const cityComparisons: CityComparison[] = [
  {
    slug: 'tokyo-vs-seoul',
    aId: 'tokyo',
    bId: 'seoul',
    theme: 'East Asia first-timer costs',
    summary:
      'Tokyo and Seoul are both excellent first East Asia trips, but Seoul usually stretches a midrange budget further while Tokyo costs more for lodging and sit-down meals.',
    pickA:
      'Pick Tokyo if you want unmatched transit convenience, iconic neighborhoods, and are comfortable with a higher daily spend.',
    pickB:
      'Pick Seoul if you want dense food scenes, palace-and-neighborhood days, and a lower on-the-ground daily baseline.',
    verdict:
      'Choose Seoul for value; choose Tokyo when the experience premium is worth the extra daily budget.',
  },
  {
    slug: 'paris-vs-rome',
    aId: 'paris',
    bId: 'rome',
    theme: 'Classic Europe city break',
    summary:
      'Paris and Rome both deliver landmark-heavy European trips; Paris tends to run pricier day to day, while Rome often feels better value for food and shoulder-season stays.',
    pickA:
      'Pick Paris for museums, polished neighborhoods, and a first grand European capital experience.',
    pickB:
      'Pick Rome for ancient sites, stronger casual dining value, and warmer shoulder seasons.',
    verdict:
      'Rome usually wins on food value; Paris wins if museums and atmosphere are the priority.',
  },
  {
    slug: 'bali-vs-bangkok',
    aId: 'bali',
    bId: 'bangkok',
    theme: 'Warm-weather budget trip',
    summary:
      'Bali suits beach-and-retreat pacing with scooter days and villas, while Bangkok is a cheaper, busier city base with elite street-food value and easy regional flights.',
    pickA:
      'Pick Bali for beaches, rice terraces, and a slower island rhythm.',
    pickB:
      'Pick Bangkok for nightlife, markets, and a lower daily food-and-transit burn.',
    verdict:
      'Bangkok is the sharper budget city play; Bali is better when downtime and coastline matter more than density.',
  },
  {
    slug: 'london-vs-amsterdam',
    aId: 'london',
    bId: 'amsterdam',
    theme: 'Short Europe break',
    summary:
      'London offers bigger-city scale and museum depth at a higher daily cost; Amsterdam is more compact, bikeable, and often cheaper for a short break.',
    pickA:
      'Pick London for world-class museums, theater, and a major-hub itinerary.',
    pickB:
      'Pick Amsterdam for walkable canals, shorter transfer times, and a smaller trip footprint.',
    verdict:
      'Amsterdam usually fits a long weekend budget better; London is worth the premium for a fuller cultural checklist.',
  },
  {
    slug: 'mexico-city-vs-cancun',
    aId: 'mexico-city',
    bId: 'cancun',
    theme: 'Mexico city vs beach',
    summary:
      'Mexico City is a culture-and-food capital with strong value dining, while Cancún is a beach-resort trip where lodging location and package pacing drive the total.',
    pickA:
      'Pick Mexico City for neighborhoods, museums, and food-focused days.',
    pickB:
      'Pick Cancún for beaches, easy resort logistics, and Caribbean swimming.',
    verdict:
      'Mexico City wins for food and culture per dollar; Cancún wins when beach time is non-negotiable.',
  },
  {
    slug: 'new-york-vs-los-angeles',
    aId: 'new-york',
    bId: 'los-angeles',
    theme: 'US coasts',
    summary:
      'New York concentrates attractions into a walk/transit grid at a steep daily rate; Los Angeles spreads the trip out, so transport time and car decisions shape both cost and pacing.',
    pickA:
      'Pick New York for walkable density, museums, and a no-car city trip.',
    pickB:
      'Pick Los Angeles for weather, neighborhoods, and coastal day trips if you accept more transit friction.',
    verdict:
      'New York costs more per day but wastes less time; LA can feel cheaper on food but needs a clearer transport plan.',
  },
  {
    slug: 'lisbon-vs-barcelona',
    aId: 'lisbon',
    bId: 'barcelona',
    theme: 'Sunny Europe value',
    summary:
      'Lisbon often offers better midrange value for food and stays, while Barcelona pairs beach access with a bigger big-city draw—and a higher daily baseline.',
    pickA:
      'Pick Lisbon for hills, miradouros, and strong value on a sunny European break.',
    pickB:
      'Pick Barcelona for beach + city energy, architecture icons, and a larger nightlife scene.',
    verdict:
      'Lisbon is the value pick; Barcelona is the pick when beach and scale matter more than price.',
  },
  {
    slug: 'dubai-vs-singapore',
    aId: 'dubai',
    bId: 'singapore',
    theme: 'Hub-city luxury-leaning',
    summary:
      'Dubai and Singapore are polished hub cities with efficient transit and higher average spends; Singapore is more compact and food-diverse, Dubai leans harder into spectacle and desert day trips.',
    pickA:
      'Pick Dubai for modern skyline experiences and desert excursions.',
    pickB:
      'Pick Singapore for hawker food value inside a premium city, gardens, and easy walkability.',
    verdict:
      'Singapore usually delivers more food value inside a high-cost city; Dubai wins for desert-and-skyline spectacle.',
  },
  {
    slug: 'hanoi-vs-bangkok',
    aId: 'hanoi',
    bId: 'bangkok',
    theme: 'Southeast Asia backpacker',
    summary:
      'Hanoi and Bangkok are both strong backpacker-and-food bases; Hanoi often runs cheaper day to day, while Bangkok offers bigger-city energy and simpler onward flight connections.',
    pickA:
      'Pick Hanoi for Old Quarter walks, coffee culture, and a lower daily burn.',
    pickB:
      'Pick Bangkok for scale, nightlife, and a more connected regional hub.',
    verdict:
      'Hanoi edges value; Bangkok edges convenience and big-city variety.',
  },
  {
    slug: 'cape-town-vs-cairo',
    aId: 'cape-town',
    bId: 'cairo',
    theme: 'Africa highlight trip',
    summary:
      'Cape Town mixes city, coast, and mountain days with a midrange daily budget; Cairo is a denser antiquity-focused trip where site pacing and guides shape both cost and energy.',
    pickA:
      'Pick Cape Town for outdoors, wine valleys, and a scenic city base.',
    pickB:
      'Pick Cairo for pyramids, museums, and a history-first itinerary.',
    verdict:
      'Cape Town fits a scenery-and-lifestyle trip; Cairo fits a monument-heavy highlight reel.',
  },
];

export function getComparisonBySlug(slug: string): CityComparison | undefined {
  return cityComparisons.find((comparison) => comparison.slug === slug);
}
