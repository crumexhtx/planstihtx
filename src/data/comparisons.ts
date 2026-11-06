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
  {
    slug: 'budapest-vs-prague',
    aId: 'budapest',
    bId: 'prague',
    theme: 'Central Europe value capitals',
    summary:
      'Budapest is the cheaper day-to-day pick at a $50 baseline versus Prague’s $70, so the same midrange week usually stretches further along the Danube than in the Czech capital.',
    pickA:
      'Pick Budapest for ruin bars, thermal baths, and a lower on-the-ground daily burn.',
    pickB:
      'Pick Prague for compact Old Town walks and a denser castle-and-bridge itinerary.',
    verdict:
      'Choose Budapest when value leads; choose Prague when the classic skyline is the point.',
  },
  {
    slug: 'budapest-vs-vienna',
    aId: 'budapest',
    bId: 'vienna',
    theme: 'Danube city break',
    summary:
      'Budapest is markedly cheaper day to day ($50 vs Vienna’s $125), so a Danube city break costs less on the Hungarian side even before you add cafes and concerts.',
    pickA:
      'Pick Budapest for baths, river views, and a lower lodging-and-food baseline.',
    pickB:
      'Pick Vienna for palaces, museums, and a more polished café culture.',
    verdict:
      'Budapest wins on daily cost; Vienna wins when imperial museums are the trip.',
  },
  {
    slug: 'prague-vs-vienna',
    aId: 'prague',
    bId: 'vienna',
    theme: 'Central Europe classics',
    summary:
      'Prague is the cheaper classic at $70 a day versus Vienna’s $125, so a Central Europe capital week usually costs less in Prague.',
    pickA:
      'Pick Prague for a walkable historic core and stronger midrange value.',
    pickB:
      'Pick Vienna for grand palaces, museums, and a more formal café-and-concert rhythm.',
    verdict:
      'Prague is the value classic; Vienna is the pick for a higher-polish capital.',
  },
  {
    slug: 'boston-vs-new-york',
    aId: 'boston',
    bId: 'new-york',
    theme: 'Northeast city weekend',
    summary:
      'Boston is cheaper day to day at $145 versus New York’s $180, so a Northeast weekend usually costs less in Boston before you add shows or long-haul trains.',
    pickA:
      'Pick Boston for a compact history-and-campus walk and a lower daily baseline.',
    pickB:
      'Pick New York for denser museums, neighborhoods, and a no-car big-city grid.',
    verdict:
      'Boston is the lower-cost weekend; New York is the pick when scale is the point.',
  },
  {
    slug: 'boston-vs-philadelphia',
    aId: 'boston',
    bId: 'philadelphia',
    theme: 'US history trip',
    summary:
      'Boston and Philadelphia share the same $145 daily baseline, so the cheaper city comes down to flights and how you spend days, not the on-the-ground rate.',
    pickA:
      'Pick Boston for Freedom Trail walks, harbor views, and a tighter historic core.',
    pickB:
      'Pick Philadelphia for Independence Hall, market food, and an easy East Coast rail weekend.',
    verdict:
      'Daily cost is a draw; pick Boston for a coastal history walk and Philadelphia for a founding-city food weekend.',
  },
  {
    slug: 'copenhagen-vs-stockholm',
    aId: 'copenhagen',
    bId: 'stockholm',
    theme: 'Scandinavian capitals',
    summary:
      'Copenhagen is slightly cheaper day to day at $145 versus Stockholm’s $150, so the on-the-ground gap is small and the choice is more about islands versus bikes.',
    pickA:
      'Pick Copenhagen for bikeable neighborhoods and a compact harbor capital.',
    pickB:
      'Pick Stockholm for an archipelago setting and spread-out island neighborhoods.',
    verdict:
      'Copenhagen edges the daily baseline; Stockholm wins if you want a multi-island capital.',
  },
  {
    slug: 'copenhagen-vs-amsterdam',
    aId: 'copenhagen',
    bId: 'amsterdam',
    theme: 'Canal-city break',
    summary:
      'Amsterdam is cheaper day to day at $125 versus Copenhagen’s $145, so a canal-city break usually costs less in the Netherlands on Plansti’s baselines.',
    pickA:
      'Pick Copenhagen for Scandinavian design, harbors, and a bike-first capital with a higher daily rate.',
    pickB:
      'Pick Amsterdam for compact canals, museums, and a lower daily baseline.',
    verdict:
      'Amsterdam is the value canal city; Copenhagen is the pick for a Nordic harbor feel.',
  },
  {
    slug: 'austin-vs-nashville',
    aId: 'austin',
    bId: 'nashville',
    theme: 'Live-music weekend',
    summary:
      'Austin and Nashville share the same $145 daily baseline, so a live-music weekend is a wash on day-to-day cost and turns on which scene you want.',
    pickA:
      'Pick Austin for outdoor shows, food trailers, and a warmer Hill Country base.',
    pickB:
      'Pick Nashville for Broadway honky-tonks and a denser country-music strip.',
    verdict:
      'Daily cost matches; choose Austin for patio-and-outdoors music, Nashville for a walkable honky-tonk core.',
  },
  {
    slug: 'austin-vs-san-antonio',
    aId: 'austin',
    bId: 'san-antonio',
    theme: 'Texas Hill Country trip',
    summary:
      'San Antonio is cheaper day to day at $120 versus Austin’s $145, so a Texas Hill Country trip usually costs less if you base in San Antonio.',
    pickA:
      'Pick Austin for live music, food trailers, and a younger nightlife scene.',
    pickB:
      'Pick San Antonio for the River Walk, missions, and a lower daily baseline.',
    verdict:
      'San Antonio is the value Texas base; Austin is the pick when the music calendar leads.',
  },
  {
    slug: 'houston-vs-dallas',
    aId: 'houston',
    bId: 'dallas',
    theme: 'Texas big-city trip',
    summary:
      'Houston is slightly cheaper day to day at $135 versus Dallas’s $140, so the on-the-ground gap is small for a Texas big-city week.',
    pickA:
      'Pick Houston for museums, a broader food scene, and a marginally lower daily rate.',
    pickB:
      'Pick Dallas for a tighter downtown-and-arts district weekend.',
    verdict:
      'Houston edges daily cost; Dallas is the pick for a more compact urban weekend.',
  },
  {
    slug: 'santorini-vs-mykonos',
    aId: 'santorini',
    bId: 'mykonos',
    theme: 'Greek island choice',
    summary:
      'Santorini is cheaper day to day at $150 versus Mykonos’s $160, so the caldera island is the lower baseline of these two Greek island trips.',
    pickA:
      'Pick Santorini for caldera views, village walks, and a slightly lower daily rate.',
    pickB:
      'Pick Mykonos for beach-club energy and a livelier nightlife island.',
    verdict:
      'Santorini edges cost and views; Mykonos wins when beaches and nightlife matter more.',
  },
  {
    slug: 'lisbon-vs-porto',
    aId: 'lisbon',
    bId: 'porto',
    theme: 'Portugal city choice',
    summary:
      'Lisbon is cheaper day to day at $55 versus Porto’s $95, so a Portugal city week usually costs less in the capital on Plansti’s baselines.',
    pickA:
      'Pick Lisbon for miradouros, tram hills, and the stronger daily-value baseline.',
    pickB:
      'Pick Porto for riverfront wine lodges and a smaller, walkable historic core.',
    verdict:
      'Lisbon is the value pick; Porto is the pick for a tighter Douro-city break.',
  },
  {
    slug: 'hanoi-vs-ho-chi-minh-city',
    aId: 'hanoi',
    bId: 'ho-chi-minh-city',
    theme: 'Vietnam north vs south',
    summary:
      'Hanoi is cheaper day to day at $35 versus Ho Chi Minh City’s $40, so a Vietnam city base usually costs a little less in the north.',
    pickA:
      'Pick Hanoi for Old Quarter walks, coffee culture, and the lower daily burn.',
    pickB:
      'Pick Ho Chi Minh City for a bigger southern hub, nightlife, and easier Mekong day trips.',
    verdict:
      'Hanoi edges value; Ho Chi Minh City edges southern scale and onward connections.',
  },
  {
    slug: 'bangkok-vs-chiang-mai',
    aId: 'bangkok',
    bId: 'chiang-mai',
    theme: 'Thailand city vs mountains',
    summary:
      'Bangkok and Chiang Mai share the same $40 daily baseline, so the cheaper Thailand city is a toss-up on paper and depends on city energy versus a mountain-town pace.',
    pickA:
      'Pick Bangkok for markets, nightlife, and a connected regional hub.',
    pickB:
      'Pick Chiang Mai for temples, a slower old-city loop, and nearby mountain days.',
    verdict:
      'Daily cost matches; choose Bangkok for density and Chiang Mai for a calmer north-Thailand base.',
  },
  {
    slug: 'bangkok-vs-phuket',
    aId: 'bangkok',
    bId: 'phuket',
    theme: 'Thailand city vs beach',
    summary:
      'Bangkok is cheaper day to day at $40 versus Phuket’s $55, so a Thailand trip costs less as a city base than as a beach-island week.',
    pickA:
      'Pick Bangkok for street food, transit, and a lower daily baseline.',
    pickB:
      'Pick Phuket when beaches and island days are the trip, accepting a higher daily rate.',
    verdict:
      'Bangkok wins on daily cost; Phuket wins when swimming time is non-negotiable.',
  },
  {
    slug: 'tokyo-vs-kyoto',
    aId: 'tokyo',
    bId: 'kyoto',
    theme: 'Japan first trip',
    summary:
      'Kyoto is cheaper day to day at $105 versus Tokyo’s $110, so a first Japan trip is only slightly less expensive if you spend more nights in Kyoto.',
    pickA:
      'Pick Tokyo for neighborhoods, transit convenience, and a bigger-city first impression.',
    pickB:
      'Pick Kyoto for temples, lanes, and a modestly lower daily baseline.',
    verdict:
      'Kyoto edges daily cost and tradition; Tokyo is the pick for a first mega-city Japan week.',
  },
  {
    slug: 'kyoto-vs-osaka',
    aId: 'kyoto',
    bId: 'osaka',
    theme: 'Kansai base',
    summary:
      'Osaka is cheaper day to day at $95 versus Kyoto’s $105, so a Kansai base usually costs less if you sleep in Osaka and day-trip the temples.',
    pickA:
      'Pick Kyoto for temples, gardens, and a quieter historic core.',
    pickB:
      'Pick Osaka for food streets, nightlife, and the lower daily baseline.',
    verdict:
      'Osaka is the value Kansai sleep; Kyoto is the pick when you want to wake up next to the temples.',
  },
  {
    slug: 'rome-vs-florence',
    aId: 'rome',
    bId: 'florence',
    theme: 'Italy art and history',
    summary:
      'Rome is cheaper day to day at $100 versus Florence’s $140, so an Italy art-and-history week usually costs less in the capital.',
    pickA:
      'Pick Rome for ancient sites, a larger city scale, and a lower daily baseline.',
    pickB:
      'Pick Florence for a walkable Renaissance core and concentrated gallery days.',
    verdict:
      'Rome wins on daily cost and breadth; Florence wins for a tighter art-city stay.',
  },
  {
    slug: 'barcelona-vs-madrid',
    aId: 'barcelona',
    bId: 'madrid',
    theme: 'Spain city break',
    summary:
      'Barcelona is slightly cheaper day to day at $95 versus Madrid’s $100, so the on-the-ground gap is small for a Spain city break.',
    pickA:
      'Pick Barcelona for beach access, architecture walks, and a marginally lower daily rate.',
    pickB:
      'Pick Madrid for museums, a central-Spain hub, and late-night dining.',
    verdict:
      'Barcelona edges cost and coast; Madrid is the pick for a museum-first inland capital.',
  },
  {
    slug: 'cancun-vs-tulum',
    aId: 'cancun',
    bId: 'tulum',
    theme: 'Riviera Maya beach base',
    summary:
      'Tulum is cheaper day to day at $85 versus Cancún’s $110, so a Riviera Maya beach week usually costs less if you base in Tulum on these baselines.',
    pickA:
      'Pick Cancún for easier resort logistics, a bigger airport hub, and Caribbean swimming.',
    pickB:
      'Pick Tulum for ruins-and-beach pairing and the lower daily baseline.',
    verdict:
      'Tulum is the value beach base here; Cancún wins when flights and resort ease come first.',
  },
  {
    slug: 'montreal-vs-quebec-city',
    aId: 'montreal',
    bId: 'quebec-city',
    theme: 'French Canada weekend',
    summary:
      'Montreal and Quebec City share the same $120 daily baseline, so a French Canada weekend is a wash on day-to-day cost.',
    pickA:
      'Pick Montreal for neighborhoods, food, and a larger bilingual city weekend.',
    pickB:
      'Pick Quebec City for a compact fortified old town and a smaller historic core.',
    verdict:
      'Daily cost matches; choose Montreal for city energy and Quebec City for a walkable old-town weekend.',
  },
  {
    slug: 'seattle-vs-portland',
    aId: 'seattle',
    bId: 'portland',
    theme: 'Pacific Northwest trip',
    summary:
      'Portland is cheaper day to day at $145 versus Seattle’s $160, so a Pacific Northwest city week usually costs less in Portland.',
    pickA:
      'Pick Seattle for water-and-mountain views, ferries, and a bigger tech-city base.',
    pickB:
      'Pick Portland for a more compact food-and-neighborhood trip and a lower daily baseline.',
    verdict:
      'Portland is the value PNW city; Seattle is the pick for bay-and-mountain scenery.',
  },
  {
    slug: 'san-francisco-vs-los-angeles',
    aId: 'san-francisco',
    bId: 'los-angeles',
    theme: 'California city trip',
    summary:
      'Los Angeles is cheaper day to day at $160 versus San Francisco’s $180, so a California city trip usually costs less in LA on these baselines.',
    pickA:
      'Pick San Francisco for a walkable, transit-friendly grid and a denser hill-and-bay city.',
    pickB:
      'Pick Los Angeles for weather, neighborhoods, and the lower daily baseline if you accept more car time.',
    verdict:
      'LA edges daily cost; San Francisco wins when you want a no-car California city.',
  },
  {
    slug: 'dubrovnik-vs-split',
    aId: 'dubrovnik',
    bId: 'split',
    theme: 'Croatian coast base',
    summary:
      'Split is cheaper day to day at $100 versus Dubrovnik’s $130, so a Croatian coast week usually costs less if you base in Split.',
    pickA:
      'Pick Dubrovnik for walls, a dramatic old town, and island boats from a premium baseline.',
    pickB:
      'Pick Split for a living palace-town, easier mainland trips, and a lower daily rate.',
    verdict:
      'Split is the value Dalmatian base; Dubrovnik is the pick for the postcard old town.',
  },
  {
    slug: 'berlin-vs-munich',
    aId: 'berlin',
    bId: 'munich',
    theme: 'Germany city break',
    summary:
      'Berlin is cheaper day to day at $110 versus Munich’s $140, so a Germany city break usually costs less in the capital.',
    pickA:
      'Pick Berlin for neighborhoods, museums, and a lower daily baseline.',
    pickB:
      'Pick Munich for Alpine day trips, a more polished old town, and beer-hall pacing.',
    verdict:
      'Berlin wins on daily cost; Munich wins when Bavaria and mountain day trips lead.',
  },
  {
    slug: 'reykjavik-vs-oslo',
    aId: 'reykjavik',
    bId: 'oslo',
    theme: 'Nordic splurge',
    summary:
      'Reykjavík is cheaper day to day at $180 versus Oslo’s $190, so both are high-cost Nordic trips with Reykjavík the slightly lower baseline.',
    pickA:
      'Pick Reykjavík as a launch point for Golden Circle and thermal days.',
    pickB:
      'Pick Oslo for museums, a harbor capital, and easy Norway-in-a-nutshell rail days.',
    verdict:
      'Reykjavík edges the daily rate; Oslo is the pick for a mainland Nordic capital.',
  },
  {
    slug: 'marrakech-vs-fes',
    aId: 'marrakech',
    bId: 'fes',
    theme: 'Morocco imperial cities',
    summary:
      'Marrakech is slightly cheaper day to day at $42 versus Fes’s $45, so the on-the-ground gap is small between these imperial cities.',
    pickA:
      'Pick Marrakech for squares, gardens, and easier tourist logistics.',
    pickB:
      'Pick Fes for a denser medina and a more traditional artisan core.',
    verdict:
      'Marrakech edges daily cost and access; Fes wins for a deeper medina stay.',
  },
  {
    slug: 'seville-vs-granada',
    aId: 'seville',
    bId: 'granada',
    theme: 'Andalusia trip',
    summary:
      'Granada is cheaper day to day at $85 versus Seville’s $100, so an Andalusia trip usually costs less if you spend more nights in Granada.',
    pickA:
      'Pick Seville for a larger historic core, plazas, and a fuller Andalusian capital.',
    pickB:
      'Pick Granada for the Alhambra, a compact old town, and a lower daily baseline.',
    verdict:
      'Granada is the value Andalusian base; Seville is the pick for a bigger-city south-Spain week.',
  },
  {
    slug: 'miami-vs-orlando',
    aId: 'miami',
    bId: 'orlando',
    theme: 'Florida vacation',
    summary:
      'Orlando is cheaper day to day at $140 versus Miami’s $160, so a Florida vacation usually costs less in Orlando on the city baseline—before theme-park tickets.',
    pickA:
      'Pick Miami for beaches, neighborhoods, and a denser coastal city trip.',
    pickB:
      'Pick Orlando for a theme-park base and the lower daily baseline.',
    verdict:
      'Orlando edges daily cost as a park base; Miami is the pick when the beach city is the trip. Park tickets are extra either way.',
  },
];

export function getComparisonBySlug(slug: string): CityComparison | undefined {
  return cityComparisons.find((comparison) => comparison.slug === slug);
}
