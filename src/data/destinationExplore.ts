export interface Attraction {
  name: string;
  blurb: string;
}

export interface DestinationExploreInfo {
  highlights: string;
  bestFor: string;
  topAttractions: Attraction[];
}

export const destinationExplore: Record<string, DestinationExploreInfo> = {
  lisbon: {
    highlights:
      'Sunny viewpoints, tiled streets, seafood, and easy coastal day trips.',
    bestFor: 'Walkable city breaks and first-time Europe trips',
    topAttractions: [
      { name: 'Belém Tower', blurb: 'Iconic riverside fortress and Age of Discovery landmark.' },
      { name: 'Alfama District', blurb: 'Winding alleys, viewpoints, and classic Fado nights.' },
      { name: 'Tram 28', blurb: 'Historic tram ride through the city’s steep neighborhoods.' },
      { name: 'LX Factory', blurb: 'Creative warehouses with shops, cafés, and street art.' },
      { name: 'Time Out Market', blurb: 'One-stop tasting hall for Portuguese food favorites.' },
    ],
  },
  bangkok: {
    highlights:
      'Temples, street food, river ferries, and late-night markets.',
    bestFor: 'Food-focused city travel on a flexible budget',
    topAttractions: [
      { name: 'Grand Palace', blurb: 'Ornate royal complex and a must-see historic site.' },
      { name: 'Wat Arun', blurb: 'Riverside temple with striking porcelain-covered spires.' },
      { name: 'Chatuchak Weekend Market', blurb: 'Enormous market for crafts, clothes, and snacks.' },
      { name: 'Chao Phraya River', blurb: 'Ferry hops between old-town temples and neighborhoods.' },
      { name: 'Yaowarat Road', blurb: 'Chinatown street-food strip that comes alive after dark.' },
    ],
  },
  'mexico-city': {
    highlights:
      'World-class museums, neighborhoods, markets, and nearby ruins.',
    bestFor: 'Culture, food, and urban exploration',
    topAttractions: [
      { name: 'Zócalo & Historic Center', blurb: 'Cathedral, Aztec ruins, and grand plazas.' },
      { name: 'Frida Kahlo Museum', blurb: 'Casa Azul in leafy Coyoacán.' },
      { name: 'Chapultepec Park', blurb: 'Castle views, museums, and a huge green escape.' },
      { name: 'Teotihuacan', blurb: 'Day trip to towering pyramids outside the city.' },
      { name: 'Roma & Condesa', blurb: 'Tree-lined streets packed with cafés and galleries.' },
    ],
  },
  budapest: {
    highlights:
      'Thermal baths, ruin bars, river views, and grand architecture.',
    bestFor: 'Affordable European city breaks',
    topAttractions: [
      { name: 'Széchenyi Thermal Bath', blurb: 'Iconic outdoor baths in City Park.' },
      { name: 'Buda Castle', blurb: 'Hilltop palace district with panoramic Danube views.' },
      { name: 'Parliament Building', blurb: 'Neo-Gothic landmark best seen from the river.' },
      { name: 'Ruin Bars of District VII', blurb: 'Courtyard bars set in restored old buildings.' },
      { name: 'Central Market Hall', blurb: 'Paprika, pastries, and classic Hungarian snacks.' },
    ],
  },
  hanoi: {
    highlights:
      'Old Quarter energy, lakeside walks, coffee, and noodle culture.',
    bestFor: 'Food and culture on a tight budget',
    topAttractions: [
      { name: 'Hoan Kiem Lake', blurb: 'Central lake with a scenic evening stroll.' },
      { name: 'Old Quarter', blurb: 'Dense streets of shops, cafés, and street food.' },
      { name: 'Temple of Literature', blurb: 'Vietnam’s historic temple of learning.' },
      { name: 'Train Street', blurb: 'Narrow trackside cafés for a unique city moment.' },
      { name: 'West Lake', blurb: 'Quieter waterfront area for temples and cafés.' },
    ],
  },
  marrakech: {
    highlights:
      'Souks, palaces, courtyards, and Atlas Mountain day trips.',
    bestFor: 'Sensory city travel and short desert escapes',
    topAttractions: [
      { name: 'Jemaa el-Fnaa', blurb: 'Main square with food stalls, music, and night energy.' },
      { name: 'Bahia Palace', blurb: 'Intricate palace rooms and shaded courtyards.' },
      { name: 'Majorelle Garden', blurb: 'Cobalt-blue villa garden and calm oasis.' },
      { name: 'Medina Souks', blurb: 'Labyrinth markets for spices, leather, and crafts.' },
      { name: 'Atlas Mountains', blurb: 'Day-trip villages and valley views outside the city.' },
    ],
  },
  paris: {
    highlights:
      'Museums, cafés, river walks, and landmark neighborhoods.',
    bestFor: 'Classic first-time Europe itineraries',
    topAttractions: [
      { name: 'Eiffel Tower', blurb: 'City icon best enjoyed at golden hour or after dark.' },
      { name: 'Louvre Museum', blurb: 'Vast art collection from antiquity to the 19th century.' },
      { name: 'Notre-Dame & Île de la Cité', blurb: 'Historic heart of Paris along the Seine.' },
      { name: 'Montmartre', blurb: 'Hilltop village vibes, Sacré-Cœur, and café streets.' },
      { name: 'Musée d’Orsay', blurb: 'Impressionist masterpieces in a grand former station.' },
    ],
  },
  london: {
    highlights:
      'Museums, parks, theater, markets, and distinct neighborhoods.',
    bestFor: 'Culture-packed city trips with easy transit',
    topAttractions: [
      { name: 'British Museum', blurb: 'Free world history collection in Bloomsbury.' },
      { name: 'Tower of London', blurb: 'Fortress, Crown Jewels, and Thames-side views.' },
      { name: 'West End', blurb: 'Theater district for musicals and big stage shows.' },
      { name: 'Borough Market', blurb: 'Food hall favorite near London Bridge.' },
      { name: 'Hyde Park & Kensington', blurb: 'Green space plus museums and palace grounds.' },
    ],
  },
  rome: {
    highlights:
      'Ancient ruins, piazzas, gelato, and dense historic streets.',
    bestFor: 'History-first city breaks',
    topAttractions: [
      { name: 'Colosseum', blurb: 'Ancient amphitheater and Rome’s signature landmark.' },
      { name: 'Roman Forum', blurb: 'Ruins of the political heart of ancient Rome.' },
      { name: 'Vatican Museums & St. Peter’s', blurb: 'Art-filled galleries and the famous basilica.' },
      { name: 'Trevi Fountain', blurb: 'Baroque fountain and classic coin-toss stop.' },
      { name: 'Trastevere', blurb: 'Evening neighborhood for trattorias and cobbled lanes.' },
    ],
  },
  barcelona: {
    highlights:
      'Gaudí architecture, beaches, markets, and Catalan food.',
    bestFor: 'City + beach combinations',
    topAttractions: [
      { name: 'Sagrada Família', blurb: 'Gaudí’s unfinished basilica and skyline icon.' },
      { name: 'Park Güell', blurb: 'Colorful hillside park with city views.' },
      { name: 'Gothic Quarter', blurb: 'Medieval streets, plazas, and tapas bars.' },
      { name: 'La Boqueria', blurb: 'Famous market just off La Rambla.' },
      { name: 'Barceloneta Beach', blurb: 'Urban beach for a quick Mediterranean break.' },
    ],
  },
  amsterdam: {
    highlights:
      'Canals, bikes, museums, and compact neighborhood wandering.',
    bestFor: 'Short, walkable city trips',
    topAttractions: [
      { name: 'Rijksmuseum', blurb: 'Dutch Masters and national treasures.' },
      { name: 'Van Gogh Museum', blurb: 'Major collection dedicated to Van Gogh.' },
      { name: 'Canal Belt', blurb: 'UNESCO canals best seen by bike or boat.' },
      { name: 'Anne Frank House', blurb: 'Powerful historic museum—book ahead.' },
      { name: 'Jordaan', blurb: 'Charming streets with cafés, courtyards, and shops.' },
    ],
  },
  istanbul: {
    highlights:
      'Mosques, bazaars, Bosphorus views, and layered history.',
    bestFor: 'East-meets-West city discovery',
    topAttractions: [
      { name: 'Hagia Sophia', blurb: 'Monumental landmark spanning Byzantine and Ottoman eras.' },
      { name: 'Blue Mosque', blurb: 'Cascade of domes and cascading courtyards.' },
      { name: 'Grand Bazaar', blurb: 'Vast covered market for crafts and spices.' },
      { name: 'Bosphorus Cruise', blurb: 'Waterfront views between Europe and Asia.' },
      { name: 'Topkapi Palace', blurb: 'Ottoman palace complex above the old city.' },
    ],
  },
  dubai: {
    highlights:
      'Skyline views, beaches, desert trips, and modern landmarks.',
    bestFor: 'Short luxury-leaning city breaks',
    topAttractions: [
      { name: 'Burj Khalifa', blurb: 'Observation decks over the modern skyline.' },
      { name: 'Dubai Marina', blurb: 'Waterfront walks, boats, and evening lights.' },
      { name: 'Old Dubai & Creek', blurb: 'Souks, abras, and heritage neighborhoods.' },
      { name: 'Desert Safari', blurb: 'Dunes, sunset views, and desert camps.' },
      { name: 'Museum of the Future', blurb: 'Striking architecture and immersive exhibits.' },
    ],
  },
  tokyo: {
    highlights:
      'Neighborhoods, food, transit ease, and shrine-to-skyscraper contrast.',
    bestFor: 'First-time Japan city travel',
    topAttractions: [
      { name: 'Senso-ji', blurb: 'Tokyo’s oldest temple in atmospheric Asakusa.' },
      { name: 'Shibuya Crossing', blurb: 'Iconic scramble and neon neighborhood energy.' },
      { name: 'Meiji Shrine', blurb: 'Forest-wrapped shrine near Harajuku.' },
      { name: 'teamLab Planets/Borderless', blurb: 'Immersive digital art experiences.' },
      { name: 'Tsukiji Outer Market', blurb: 'Seafood snacks and morning market browsing.' },
    ],
  },
  seoul: {
    highlights:
      'Palaces, nightlife, hiking, markets, and modern neighborhoods.',
    bestFor: 'Food, culture, and city energy',
    topAttractions: [
      { name: 'Gyeongbokgung Palace', blurb: 'Grand Joseon palace with changing of the guard.' },
      { name: 'Bukchon Hanok Village', blurb: 'Traditional houses and hillside views.' },
      { name: 'Hongdae', blurb: 'Youthful streets for cafés, shops, and nightlife.' },
      { name: 'N Seoul Tower', blurb: 'City panorama above Namsan Park.' },
      { name: 'Gwangjang Market', blurb: 'Classic spot for bindaetteok, mayak gimbap, and more.' },
    ],
  },
  singapore: {
    highlights:
      'Hawker food, gardens, waterfronts, and efficient transit.',
    bestFor: 'Easy short-stop city trips',
    topAttractions: [
      { name: 'Gardens by the Bay', blurb: 'Supertrees, conservatories, and night light shows.' },
      { name: 'Marina Bay Sands', blurb: 'SkyPark views over the bay.' },
      { name: 'Chinatown & Maxwell Hawker', blurb: 'Heritage streets plus essential local eats.' },
      { name: 'Sentosa', blurb: 'Beaches, rides, and a breezy island break.' },
      { name: 'Kampong Glam', blurb: 'Colorful Haji Lane shops and the Sultan Mosque.' },
    ],
  },
  bali: {
    highlights:
      'Temples, rice terraces, beaches, and wellness escapes.',
    bestFor: 'Beach + culture island trips',
    topAttractions: [
      { name: 'Ubud Monkey Forest', blurb: 'Temple paths through a dense sanctuary.' },
      { name: 'Tegallalang Rice Terraces', blurb: 'Classic emerald terraces near Ubud.' },
      { name: 'Tanah Lot', blurb: 'Sea temple perched on a rocky outcrop.' },
      { name: 'Uluwatu Temple', blurb: 'Cliffside temple with sunset and kecak dance.' },
      { name: 'Seminyak / Canggu beaches', blurb: 'Beach clubs, surf, and café culture.' },
    ],
  },
  'new-york': {
    highlights:
      'Museums, skyline views, neighborhoods, and late-night food.',
    bestFor: 'Dense, walkable big-city itineraries',
    topAttractions: [
      { name: 'Central Park', blurb: 'Green core for walks, boats, and people-watching.' },
      { name: 'The Metropolitan Museum of Art', blurb: 'Encyclopedic museum on Museum Mile.' },
      { name: 'Statue of Liberty & Ellis Island', blurb: 'Harbor icons and immigration history.' },
      { name: 'Broadway', blurb: 'World-famous theater district shows.' },
      { name: 'High Line & Chelsea', blurb: 'Elevated park walk into galleries and markets.' },
    ],
  },
  'los-angeles': {
    highlights:
      'Beaches, viewpoints, studios, and spread-out neighborhoods.',
    bestFor: 'Sun, food, and scenic day trips',
    topAttractions: [
      { name: 'Griffith Observatory', blurb: 'City and Hollywood Sign views above Los Feliz.' },
      { name: 'Santa Monica Pier', blurb: 'Classic beachfront boardwalk and Pacific sunset.' },
      { name: 'Getty Center', blurb: 'Art, gardens, and architecture in the hills.' },
      { name: 'Venice Beach', blurb: 'Boardwalk energy, murals, and oceanfront bikes.' },
      { name: 'Griffith / Hollywood hikes', blurb: 'Trail viewpoints over the basin.' },
    ],
  },
  orlando: {
    highlights:
      'Theme parks, resorts, and family entertainment corridors.',
    bestFor: 'Theme-park focused trips',
    topAttractions: [
      { name: 'Walt Disney World', blurb: 'Multi-park resort complex and classic attractions.' },
      { name: 'Universal Orlando', blurb: 'Movie-world parks and immersive lands.' },
      { name: 'ICON Park', blurb: 'International Drive entertainment and The Wheel.' },
      { name: 'Kennedy Space Center', blurb: 'Day trip for space history and launches.' },
      { name: 'Winter Park', blurb: 'Quieter town for museums, boats, and dining.' },
    ],
  },
  cancun: {
    highlights:
      'Caribbean beaches, reef snorkels, and Maya day trips.',
    bestFor: 'Beach resort escapes',
    topAttractions: [
      { name: 'Hotel Zone Beaches', blurb: 'Turquoise water and long sand stretches.' },
      { name: 'Isla Mujeres', blurb: 'Ferry day trip for snorkeling and beach clubs.' },
      { name: 'Chichen Itza', blurb: 'Major Maya ruins reachable as a long day trip.' },
      { name: 'Cenotes', blurb: 'Freshwater sinkholes for swimming and cooling off.' },
      { name: 'Puerto Morelos / reef snorkel', blurb: 'Easier reef access than the busiest beaches.' },
    ],
  },
  'rio-de-janeiro': {
    highlights:
      'Beaches, viewpoints, samba, and dramatic coastal scenery.',
    bestFor: 'Scenic city-and-beach trips',
    topAttractions: [
      { name: 'Christ the Redeemer', blurb: 'Hilltop statue with sweeping city views.' },
      { name: 'Sugarloaf Mountain', blurb: 'Cable-car ride to a dramatic granite peak.' },
      { name: 'Copacabana Beach', blurb: 'Famous crescent beach and promenade.' },
      { name: 'Ipanema', blurb: 'Stylish beach neighborhood and sunset hangouts.' },
      { name: 'Santa Teresa', blurb: 'Hilltop streets with art, bars, and views.' },
    ],
  },
  'buenos-aires': {
    highlights:
      'Tango, cafés, steak culture, and elegant neighborhoods.',
    bestFor: 'Food and nightlife city breaks',
    topAttractions: [
      { name: 'La Boca & Caminito', blurb: 'Colorful streets and tango photo stops.' },
      { name: 'Recoleta Cemetery', blurb: 'Ornate mausoleums in a grand district.' },
      { name: 'San Telmo Market', blurb: 'Sunday antiques, street music, and browsing.' },
      { name: 'Teatro Colón', blurb: 'One of the world’s great opera houses.' },
      { name: 'Palermo', blurb: 'Parks, boutiques, and some of the best dining.' },
    ],
  },
  'cape-town': {
    highlights:
      'Mountains, beaches, vineyards, and coastal drives.',
    bestFor: 'Outdoor scenery with strong food culture',
    topAttractions: [
      { name: 'Table Mountain', blurb: 'Cable car or hike to the city’s signature plateau.' },
      { name: 'V&A Waterfront', blurb: 'Harborfront dining, shops, and ferry access.' },
      { name: 'Cape Peninsula', blurb: 'Scenic drive to beaches, cliffs, and wildlife.' },
      { name: 'Bo-Kaap', blurb: 'Bright houses and Cape Malay food heritage.' },
      { name: 'Stellenbosch Winelands', blurb: 'Day-trip vineyards outside the city.' },
    ],
  },
  cairo: {
    highlights:
      'Pyramids, museums, Nile views, and Islamic Cairo.',
    bestFor: 'History-focused first visits to Egypt',
    topAttractions: [
      { name: 'Pyramids of Giza', blurb: 'The essential plateau of pyramids and the Sphinx.' },
      { name: 'Egyptian Museum / GEM', blurb: 'Pharaonic treasures and iconic artifacts.' },
      { name: 'Khan el-Khalili', blurb: 'Historic bazaar for tea, crafts, and atmosphere.' },
      { name: 'Islamic Cairo', blurb: 'Mosques, gates, and dense medieval streets.' },
      { name: 'Nile Felucca Ride', blurb: 'Sunset sail through the center of the city.' },
    ],
  },
  sydney: {
    highlights:
      'Harbor icons, beaches, coastal walks, and outdoor dining.',
    bestFor: 'Harbor-city trips with easy day trips',
    topAttractions: [
      { name: 'Sydney Opera House', blurb: 'Harbor landmark for tours or a performance.' },
      { name: 'Bondi to Coogee Walk', blurb: 'Cliffside coastal walk between beaches.' },
      { name: 'Sydney Harbour Bridge', blurb: 'Climb or walk for classic skyline views.' },
      { name: 'The Rocks', blurb: 'Historic waterfront lanes and weekend markets.' },
      { name: 'Manly Ferry', blurb: 'Scenic harbor crossing to a beach suburb.' },
    ],
  },

  prague: {
    highlights:
      'Castle views, Old Town square, and affordable city breaks.',
    bestFor: 'First-time Central Europe trips',
    topAttractions: [
      { name: 'Charles Bridge', blurb: 'Iconic stone bridge lined with statues and sunrise views.' },
      { name: 'Prague Castle', blurb: 'Hilltop complex with cathedral courtyards and city panoramas.' },
      { name: 'Old Town Square', blurb: 'Astronomical Clock, gothic towers, and café terraces.' },
      { name: 'Jewish Quarter', blurb: 'Historic synagogues and a powerful cemetery walk.' },
      { name: 'Letná Park', blurb: 'Beer garden views over the Vltava and rooftops.' },
    ],
  },
  vienna: {
    highlights:
      'Palaces, coffee culture, and polished museum quarters.',
    bestFor: 'Culture-heavy city breaks',
    topAttractions: [
      { name: 'Schönbrunn Palace', blurb: 'Baroque palace and gardens on Vienna’s edge.' },
      { name: 'St. Stephen’s Cathedral', blurb: 'Gothic landmark in the historic center.' },
      { name: 'Belvedere Palace', blurb: 'Baroque complex with Klimt’s famous works.' },
      { name: 'Hofburg', blurb: 'Imperial palace halls and museum collections.' },
      { name: 'Naschmarkt', blurb: 'Food market for snacks, spices, and people-watching.' },
    ],
  },
  berlin: {
    highlights:
      'History sites, nightlife, and independent food scenes.',
    bestFor: 'Flexible urban explorers',
    topAttractions: [
      { name: 'Brandenburg Gate', blurb: 'Neoclassical symbol of the city and German reunification.' },
      { name: 'East Side Gallery', blurb: 'Open-air murals on a remaining stretch of the Wall.' },
      { name: 'Museum Island', blurb: 'Cluster of major museums in the river Spree.' },
      { name: 'Reichstag Dome', blurb: 'Glass dome with parliament views—book ahead.' },
      { name: 'Tempelhofer Feld', blurb: 'Former airport turned vast public park.' },
    ],
  },
  athens: {
    highlights:
      'Acropolis views, plazas, and island day-trip access.',
    bestFor: 'History and food city breaks',
    topAttractions: [
      { name: 'Acropolis', blurb: 'Parthenon and hilltop temples above the city.' },
      { name: 'Acropolis Museum', blurb: 'Modern museum for sculptures from the rock.' },
      { name: 'Plaka', blurb: 'Historic lanes under the Acropolis.' },
      { name: 'Ancient Agora', blurb: 'Ruins of the civic heart of classical Athens.' },
      { name: 'Mount Lycabettus', blurb: 'Panorama over Athens and the sea.' },
    ],
  },
  madrid: {
    highlights:
      'World-class art, tapas crawls, and park afternoons.',
    bestFor: 'Food and culture trips',
    topAttractions: [
      { name: 'Prado Museum', blurb: 'Masterpieces from Spain’s golden age and beyond.' },
      { name: 'Retiro Park', blurb: 'Boats, gardens, and a peaceful city escape.' },
      { name: 'Royal Palace', blurb: 'Lavish rooms and courtyards in the city center.' },
      { name: 'Plaza Mayor', blurb: 'Historic square for people-watching.' },
      { name: 'Gran Vía', blurb: 'Lights, shops, and theaters through the evening.' },
    ],
  },
  dublin: {
    highlights:
      'Pubs, museums, and easy day trips along the coast.',
    bestFor: 'Short city breaks with nightlife',
    topAttractions: [
      { name: 'Trinity College', blurb: 'Historic campus and the Book of Kells.' },
      { name: 'Temple Bar', blurb: 'Lively nightlife and music district.' },
      { name: 'Guinness Storehouse', blurb: 'Brewery experience with rooftop views.' },
      { name: 'St. Stephen’s Green', blurb: 'Central park for an easy pause.' },
      { name: 'Howth', blurb: 'Coastal village day trip with cliff walks.' },
    ],
  },
  edinburgh: {
    highlights:
      'Castle skyline, Old Town lanes, and festival energy.',
    bestFor: 'Scenic city breaks',
    topAttractions: [
      { name: 'Edinburgh Castle', blurb: 'Fortress above the Royal Mile.' },
      { name: 'Royal Mile', blurb: 'Historic street linking castle and palace.' },
      { name: 'Arthur’s Seat', blurb: 'Hill hike with panoramic city views.' },
      { name: 'Holyrood Palace', blurb: 'Official Scottish residence of the monarch.' },
      { name: 'Calton Hill', blurb: 'Monuments and sunset viewpoints.' },
    ],
  },
  copenhagen: {
    highlights:
      'Bike lanes, waterfronts, and New Nordic food.',
    bestFor: 'Design and food city trips',
    topAttractions: [
      { name: 'Nyhavn', blurb: 'Colorful harborfront houses and boats.' },
      { name: 'Tivoli Gardens', blurb: 'Historic amusement park in the center.' },
      { name: 'Christiania', blurb: 'Alternative neighborhood with murals and paths.' },
      { name: 'The Little Mermaid', blurb: 'Harbor statue and waterfront walk.' },
      { name: 'SMK', blurb: 'National gallery for Danish and European art.' },
    ],
  },
  vancouver: {
    highlights:
      'Seawall walks, mountains, and diverse dining.',
    bestFor: 'City plus outdoors trips',
    topAttractions: [
      { name: 'Stanley Park', blurb: 'Seawall paths, beaches, and forest trails.' },
      { name: 'Granville Island', blurb: 'Public market and waterfront studios.' },
      { name: 'Capilano Suspension Bridge', blurb: 'Forest bridge experience near the city.' },
      { name: 'Gastown', blurb: 'Brick streets, steam clock, and boutiques.' },
      { name: 'Grouse Mountain', blurb: 'Cable-car views above North Vancouver.' },
    ],
  },
  toronto: {
    highlights:
      'Skyline icons, diverse food, and lake walks.',
    bestFor: 'Urban food and culture trips',
    topAttractions: [
      { name: 'CN Tower', blurb: 'Observation decks over the skyline and lake.' },
      { name: 'Toronto Islands', blurb: 'Ferry escape with bikes and beaches.' },
      { name: 'Distillery District', blurb: 'Brick lanes with shops and cafés.' },
      { name: 'ROM', blurb: 'Major museum of art, culture, and nature.' },
      { name: 'Kensington Market', blurb: 'Eclectic streets for snacks and browsing.' },
    ],
  },
  'san-francisco': {
    highlights:
      'Iconic views, neighborhoods, and food markets.',
    bestFor: 'Short high-energy city trips',
    topAttractions: [
      { name: 'Golden Gate Bridge', blurb: 'Walk or viewpoint stops over the bay.' },
      { name: 'Alcatraz Island', blurb: 'Ferry trip to the famous former prison.' },
      { name: 'Fisherman’s Wharf', blurb: 'Waterfront piers and seafood stalls.' },
      { name: 'Painted Ladies', blurb: 'Classic Victorian houses near Alamo Square.' },
      { name: 'Chinatown', blurb: 'Historic streets, bakeries, and shops.' },
    ],
  },
  miami: {
    highlights:
      'Beaches, nightlife, and Cuban-influenced food.',
    bestFor: 'Beach-and-city weekends',
    topAttractions: [
      { name: 'South Beach', blurb: 'Art Deco hotels and lively shoreline.' },
      { name: 'Wynwood Walls', blurb: 'Outdoor street-art district.' },
      { name: 'Vizcaya Museum', blurb: 'Waterfront villa and gardens.' },
      { name: 'Little Havana', blurb: 'Cafecito, cigars, and Calle Ocho energy.' },
      { name: 'Bayside Marketplace', blurb: 'Harborfront shopping and boat views.' },
    ],
  },
  honolulu: {
    highlights:
      'Beaches, viewpoints, and easy island day trips.',
    bestFor: 'Beach vacations with light culture',
    topAttractions: [
      { name: 'Waikiki Beach', blurb: 'Classic swim-and-sunset shoreline.' },
      { name: 'Diamond Head', blurb: 'Crater hike with coastal views.' },
      { name: 'Pearl Harbor', blurb: 'Historic memorials and museums.' },
      { name: 'Hanauma Bay', blurb: 'Snorkel cove with clear water.' },
      { name: 'Iolani Palace', blurb: 'Former royal residence in downtown Honolulu.' },
    ],
  },
  melbourne: {
    highlights:
      'Coffee culture, laneways, and coastal drives.',
    bestFor: 'Food-focused city trips',
    topAttractions: [
      { name: 'Federation Square', blurb: 'Central arts plaza by the Yarra.' },
      { name: 'Laneways', blurb: 'Street art, cafés, and hidden bars.' },
      { name: 'Royal Botanic Gardens', blurb: 'Green escape beside the river.' },
      { name: 'Queen Victoria Market', blurb: 'Produce, souvenirs, and local bites.' },
      { name: 'Great Ocean Road', blurb: 'Iconic coastal day trip from the city.' },
    ],
  },
  auckland: {
    highlights:
      'Harbor views, island ferries, and short hikes.',
    bestFor: 'Gateway NZ city breaks',
    topAttractions: [
      { name: 'Sky Tower', blurb: 'Observation decks over the isthmus.' },
      { name: 'Waiheke Island', blurb: 'Ferry day trip for beaches and vineyards.' },
      { name: 'Auckland Domain', blurb: 'Parkland and museum near the center.' },
      { name: 'Viaduct Harbour', blurb: 'Waterfront dining and boat watching.' },
      { name: 'Rangitoto Island', blurb: 'Volcanic island hike with city views.' },
    ],
  },
  kyoto: {
    highlights:
      'Temples, geisha districts, and seasonal scenery.',
    bestFor: 'Culture-first Japan trips',
    topAttractions: [
      { name: 'Fushimi Inari Shrine', blurb: 'Thousands of vermilion torii gates.' },
      { name: 'Arashiyama Bamboo Grove', blurb: 'Iconic bamboo path on Kyoto’s west side.' },
      { name: 'Kiyomizu-dera', blurb: 'Hillside temple with wooden terrace views.' },
      { name: 'Gion', blurb: 'Historic streets known for tea houses.' },
      { name: 'Nijo Castle', blurb: 'Shogun palace with nightingale floors.' },
    ],
  },
  osaka: {
    highlights:
      'Street food, nightlife, and castle parks.',
    bestFor: 'Food-driven Japan city trips',
    topAttractions: [
      { name: 'Osaka Castle', blurb: 'Landmark castle in a broad park.' },
      { name: 'Dotonbori', blurb: 'Neon canal district packed with food.' },
      { name: 'Shinsekai', blurb: 'Retro neighborhood and Tsutenkaku Tower.' },
      { name: 'Universal Studios Japan', blurb: 'Major theme park on the bay.' },
      { name: 'Kuromon Market', blurb: 'Market stalls for snacks and seafood.' },
    ],
  },
  taipei: {
    highlights:
      'Night markets, temples, and easy day hikes.',
    bestFor: 'Food-focused city travel',
    topAttractions: [
      { name: 'Taipei 101', blurb: 'Skyscraper observation floors and mall.' },
      { name: 'Shilin Night Market', blurb: 'Classic night-market snacks and stalls.' },
      { name: 'Chiang Kai-shek Memorial', blurb: 'Monument plaza and cultural venues.' },
      { name: 'Jiufen', blurb: 'Hillside old street day trip with teahouses.' },
      { name: 'Beitou Hot Springs', blurb: 'Thermal baths north of the city.' },
    ],
  },
  'hong-kong': {
    highlights:
      'Skyline vistas, markets, and island escapes.',
    bestFor: 'Short high-energy stopovers',
    topAttractions: [
      { name: 'Victoria Peak', blurb: 'Tram ride and harbor panoramas.' },
      { name: 'Star Ferry', blurb: 'Classic harbor crossing between shores.' },
      { name: 'Temple Street Night Market', blurb: 'Evening stalls and street snacks.' },
      { name: 'Big Buddha', blurb: 'Giant Buddha day trip on Lantau.' },
      { name: 'Tsim Sha Tsui Promenade', blurb: 'Waterfront walk facing Hong Kong Island.' },
    ],
  },
  'chiang-mai': {
    highlights:
      'Temples, cafés, and affordable slow travel.',
    bestFor: 'Relaxed SE Asia city stays',
    topAttractions: [
      { name: 'Old City Temples', blurb: 'Wat Phra Singh and neighboring wats.' },
      { name: 'Sunday Night Market', blurb: 'Walking street market through the old town.' },
      { name: 'Doi Suthep', blurb: 'Hilltop temple with city views.' },
      { name: 'Old City Moat', blurb: 'Walkable historic core and cafés.' },
      { name: 'Elephant Nature Park', blurb: 'Ethical elephant sanctuary day trip.' },
    ],
  },
  phuket: {
    highlights:
      'Beaches, island hops, and seafood dinners.',
    bestFor: 'Beach vacations',
    topAttractions: [
      { name: 'Patong Beach', blurb: 'Busy beach strip with nightlife nearby.' },
      { name: 'Old Phuket Town', blurb: 'Sino-Portuguese streets and cafés.' },
      { name: 'Big Buddha', blurb: 'Hilltop Buddha statue with views.' },
      { name: 'Phi Phi Islands', blurb: 'Popular boat-day destination offshore.' },
      { name: 'Promthep Cape', blurb: 'Sunset viewpoint at the island’s tip.' },
    ],
  },
  'ho-chi-minh-city': {
    highlights:
      'Street food, markets, and wartime history.',
    bestFor: 'Food and city exploration',
    topAttractions: [
      { name: 'Ben Thanh Market', blurb: 'Central market for souvenirs and snacks.' },
      { name: 'Notre-Dame Cathedral', blurb: 'Colonial-era landmark in District 1.' },
      { name: 'War Remnants Museum', blurb: 'Powerful modern-history museum.' },
      { name: 'Cu Chi Tunnels', blurb: 'Day trip to historic tunnel network.' },
      { name: 'Nguyen Hue Walking Street', blurb: 'Evening plaza for strolling and photos.' },
    ],
  },
  lima: {
    highlights:
      'World-class dining and coastal neighborhoods.',
    bestFor: 'Food-focused South America trips',
    topAttractions: [
      { name: 'Historic Center', blurb: 'Plaza Mayor and colonial architecture.' },
      { name: 'Miraflores', blurb: 'Clifftop parks and shopping streets.' },
      { name: 'Barranco', blurb: 'Bohemian district with bridges and bars.' },
      { name: 'Larco Museum', blurb: 'Pre-Columbian art in a beautiful villa.' },
      { name: 'Huaca Pucllana', blurb: 'Adobe pyramid in the middle of Miraflores.' },
    ],
  },
  delhi: {
    highlights:
      'Monuments, markets, and neighborhood food crawls.',
    bestFor: 'First-time India city travel',
    topAttractions: [
      { name: 'Red Fort', blurb: 'Mughal fortress in Old Delhi.' },
      { name: 'Qutub Minar', blurb: 'Towering minaret complex in the south.' },
      { name: 'India Gate', blurb: 'War memorial and central vista.' },
      { name: 'Humayun’s Tomb', blurb: 'Garden tomb that inspired later Mughal design.' },
      { name: 'Chandni Chowk', blurb: 'Dense Old Delhi market lanes.' },
    ],
  },
  florence: {
    highlights:
      'Galleries, piazzas, and Tuscan food.',
    bestFor: 'Art and culture city breaks',
    topAttractions: [
      { name: 'Uffizi Gallery', blurb: 'World-class Renaissance painting collection.' },
      { name: 'Duomo complex', blurb: 'Cathedral, dome climb, and baptistery.' },
      { name: 'Ponte Vecchio', blurb: 'Historic bridge lined with shops.' },
      { name: 'Accademia Gallery', blurb: 'Home of Michelangelo’s David.' },
      { name: 'Piazzale Michelangelo', blurb: 'Hilltop sunset view over the city.' },
    ],
  },
  venice: {
    highlights:
      'Canals, islands, and lagoon views.',
    bestFor: 'Unique city exploration',
    topAttractions: [
      { name: 'St. Mark’s Square', blurb: 'Basilica, campanile, and the city’s main plaza.' },
      { name: 'Rialto Bridge', blurb: 'Famous arched bridge over the Grand Canal.' },
      { name: 'Doge’s Palace', blurb: 'Gothic palace with bridge-of-sighs views.' },
      { name: 'Murano', blurb: 'Island known for historic glass workshops.' },
      { name: 'Burano', blurb: 'Colorful fishing island for a quieter lagoon day.' },
    ],
  },
  porto: {
    highlights:
      'Riverfront walks and port tasting.',
    bestFor: 'Food and wine city breaks',
    topAttractions: [
      { name: 'Ribeira district', blurb: 'Historic riverside lanes and viewpoints.' },
      { name: 'Dom Luís I Bridge', blurb: 'Double-deck iron bridge over the Douro.' },
      { name: 'Livraria Lello', blurb: 'Ornate bookstore with a famous staircase.' },
      { name: 'Port wine cellars', blurb: 'Cross to Vila Nova de Gaia for lodge tastings.' },
      { name: 'Clérigos Tower', blurb: 'Baroque tower with city-wide views.' },
    ],
  },
  seville: {
    highlights:
      'Alcázar, tapas, and flamenco nights.',
    bestFor: 'Culture and food trips',
    topAttractions: [
      { name: 'Real Alcázar', blurb: 'Royal palace complex with lush gardens.' },
      { name: 'Seville Cathedral', blurb: 'Gothic cathedral and Giralda tower climb.' },
      { name: 'Plaza de España', blurb: 'Grand semicircular plaza in María Luisa Park.' },
      { name: 'Triana', blurb: 'Neighborhood known for ceramics and tapas.' },
      { name: 'Metropol Parasol', blurb: 'Modern timber structure with rooftop views.' },
    ],
  },
  munich: {
    highlights:
      'Parks, museums, and beer gardens.',
    bestFor: 'City plus Alps side trips',
    topAttractions: [
      { name: 'Marienplatz', blurb: 'Central square with the Glockenspiel.' },
      { name: 'Englischer Garten', blurb: 'Vast park with river surfing and beer gardens.' },
      { name: 'Nymphenburg Palace', blurb: 'Baroque palace and formal gardens.' },
      { name: 'Deutsches Museum', blurb: 'Huge science and technology museum.' },
      { name: 'BMW Museum / Welt', blurb: 'Car culture campus near Olympiapark.' },
    ],
  },
  stockholm: {
    highlights:
      'Islands, design, and waterfront walks.',
    bestFor: 'Scandinavian city exploration',
    topAttractions: [
      { name: 'Gamla Stan', blurb: 'Cobblestone old town with palace and alleys.' },
      { name: 'Vasa Museum', blurb: 'Intact 17th-century warship in a dramatic hall.' },
      { name: 'Djurgården', blurb: 'Green island of museums and parkland.' },
      { name: 'Fotografiska', blurb: 'Contemporary photography museum with a view.' },
      { name: 'City Hall', blurb: 'Brick landmark known for Nobel banquet halls.' },
    ],
  },
  reykjavik: {
    highlights:
      'Day trips to springs and waterfalls.',
    bestFor: 'Nature-based trip planning',
    topAttractions: [
      { name: 'Hallgrímskirkja', blurb: 'Iconic church tower with city views.' },
      { name: 'Harpa', blurb: 'Glass concert hall on the waterfront.' },
      { name: 'Sun Voyager', blurb: 'Sculptural steel boat on the shoreline.' },
      { name: 'Blue Lagoon', blurb: 'Geothermal spa day trip from the city.' },
      { name: 'Golden Circle', blurb: 'Classic loop of geysers, falls, and parkland.' },
    ],
  },
  krakow: {
    highlights:
      'Old Town, Kazimierz, and day trips.',
    bestFor: 'Affordable European culture trips',
    topAttractions: [
      { name: 'Main Market Square', blurb: 'One of Europe’s largest medieval plazas.' },
      { name: 'Wawel Castle', blurb: 'Royal complex above the Vistula River.' },
      { name: 'Kazimierz', blurb: 'Historic Jewish Quarter with cafés and synagogues.' },
      { name: 'St. Mary’s Basilica', blurb: 'Gothic church with the famous altarpiece.' },
      { name: 'Wieliczka Salt Mine', blurb: 'Underground chapel day trip from the city.' },
    ],
  },
  dubrovnik: {
    highlights:
      'City walls and Adriatic island hops.',
    bestFor: 'Coastal summer city breaks',
    topAttractions: [
      { name: 'City Walls walk', blurb: 'Circuit above rooftops and the harbor.' },
      { name: 'Old Town Stradun', blurb: 'Main limestone promenade through the center.' },
      { name: 'Cable car to Mount Srđ', blurb: 'Panoramic lookout above the bay.' },
      { name: 'Lokrum Island', blurb: 'Short boat hop for gardens and swimming.' },
      { name: 'Fort Lovrijenac', blurb: 'Sea cliff fortress with dramatic views.' },
    ],
  },
  zurich: {
    highlights:
      'Lake walks, museums, and day trips.',
    bestFor: 'Efficient Switzerland trip bases',
    topAttractions: [
      { name: 'Old Town (Altstadt)', blurb: 'Lindenhof views and riverside lanes.' },
      { name: 'Lake Zurich promenade', blurb: 'Waterfront path for swimming and sunsets.' },
      { name: 'Kunsthaus Zürich', blurb: 'Major art museum with a strong modern collection.' },
      { name: 'Bahnhofstrasse', blurb: 'Polished shopping avenue from the main station.' },
      { name: 'Uetliberg', blurb: 'Local mountain viewpoint above the city.' },
    ],
  },
  chicago: {
    highlights:
      'Architecture, museums, and deep-dish debates.',
    bestFor: 'Big-city U.S. culture trips',
    topAttractions: [
      { name: 'Millennium Park', blurb: 'Cloud Gate and lakefront parkland.' },
      { name: 'Art Institute of Chicago', blurb: 'Major museum on Michigan Avenue.' },
      { name: 'Architecture River Cruise', blurb: 'Best introduction to the skyline.' },
      { name: 'Navy Pier', blurb: 'Lakefront pier with rides and views.' },
      { name: '360 CHICAGO', blurb: 'Observation deck on the Magnificent Mile.' },
    ],
  },
  boston: {
    highlights:
      'Freedom Trail, campuses, and seafood.',
    bestFor: 'History and food city breaks',
    topAttractions: [
      { name: 'Freedom Trail', blurb: 'Marked walk linking key Revolutionary sites.' },
      { name: 'Boston Common & Public Garden', blurb: 'Central green spaces for an easy stroll.' },
      { name: 'Fenway Park', blurb: 'Historic ballpark tours even without a game.' },
      { name: 'Museum of Fine Arts', blurb: 'Major art museum near the Fenway.' },
      { name: 'Harborwalk', blurb: 'Waterfront path with skyline and ferry views.' },
    ],
  },
  'las-vegas': {
    highlights:
      'Strip spectacle and desert day trips.',
    bestFor: 'Entertainment-focused getaways',
    topAttractions: [
      { name: 'Las Vegas Strip', blurb: 'Resort corridor of hotels, fountains, and neon.' },
      { name: 'Fremont Street Experience', blurb: 'Downtown canopy light show and casinos.' },
      { name: 'Bellagio Fountains', blurb: 'Choreographed water show on the Strip.' },
      { name: 'Red Rock Canyon', blurb: 'Scenic loop drive west of the city.' },
      { name: 'Hoover Dam', blurb: 'Engineering landmark day trip on the Colorado River.' },
    ],
  },
  montreal: {
    highlights:
      'Old Montreal, festivals, and food.',
    bestFor: 'Culture and food city trips',
    topAttractions: [
      { name: 'Old Montreal', blurb: 'Cobblestone waterfront district with plazas.' },
      { name: 'Mount Royal Park', blurb: 'Hilltop park with skyline lookouts.' },
      { name: 'Notre-Dame Basilica', blurb: 'Ornate Gothic Revival church interior.' },
      { name: 'Jean-Talon Market', blurb: 'Large public market for local produce and snacks.' },
      { name: 'Underground City', blurb: 'Indoor pedestrian network useful in winter.' },
    ],
  },
  cusco: {
    highlights:
      'Inca sites and Sacred Valley trips.',
    bestFor: 'Machu Picchu trip planning',
    topAttractions: [
      { name: 'Plaza de Armas', blurb: 'Main square framed by churches and arcades.' },
      { name: 'Sacsayhuamán', blurb: 'Massive Inca stone fortress above town.' },
      { name: 'Qorikancha', blurb: 'Temple of the Sun beneath a colonial convent.' },
      { name: 'San Blas', blurb: 'Artisan neighborhood of steep lanes and viewpoints.' },
      { name: 'Sacred Valley / Machu Picchu', blurb: 'Core day-trip and multi-day route from Cusco.' },
    ],
  },
  cartagena: {
    highlights:
      'Old Town walls and island days.',
    bestFor: 'Caribbean city-and-beach trips',
    topAttractions: [
      { name: 'Walled Old Town', blurb: 'Colorful streets, plazas, and boutique hotels.' },
      { name: 'Castillo San Felipe', blurb: 'Hilltop fortress overlooking the city.' },
      { name: 'Getsemaní', blurb: 'Street-art neighborhood with nightlife.' },
      { name: 'Rosario Islands', blurb: 'Boat-day beaches and snorkeling offshore.' },
      { name: 'Clock Tower Gate', blurb: 'Main entrance into the historic center.' },
    ],
  },
  santiago: {
    highlights:
      'Andes views, wine valleys, and museums.',
    bestFor: 'South America city hubs',
    topAttractions: [
      { name: 'Cerro San Cristóbal', blurb: 'Hilltop park with a city and Andes panorama.' },
      { name: 'Plaza de Armas', blurb: 'Historic center square and cathedral.' },
      { name: 'La Chascona', blurb: 'Pablo Neruda house museum in Bellavista.' },
      { name: 'Sky Costanera', blurb: 'Observation decks in South America’s tall tower.' },
      { name: 'Maipo Valley', blurb: 'Nearby wine valley for tasting day trips.' },
    ],
  },
  'kuala-lumpur': {
    highlights:
      'Towers, hawkers, and city parks.',
    bestFor: 'Food-focused Southeast Asia hubs',
    topAttractions: [
      { name: 'Petronas Twin Towers', blurb: 'Iconic skyline pair with a skybridge visit.' },
      { name: 'Batu Caves', blurb: 'Limestone temple caves just outside the city.' },
      { name: 'Merdeka Square', blurb: 'Historic field and colonial landmarks.' },
      { name: 'KL Tower', blurb: 'Observation deck with broad city views.' },
      { name: 'Jalan Alor', blurb: 'Night street-food strip in Bukit Bintang.' },
    ],
  },
  shanghai: {
    highlights:
      'Bund views, neighborhoods, and museums.',
    bestFor: 'First-time China megacity trips',
    topAttractions: [
      { name: 'The Bund', blurb: 'Waterfront promenade facing Pudong towers.' },
      { name: 'Yu Garden', blurb: 'Classical garden beside busy bazaar streets.' },
      { name: 'Shanghai Tower / Lujiazui', blurb: 'Skyscraper district observation decks.' },
      { name: 'French Concession', blurb: 'Tree-lined streets, cafés, and boutiques.' },
      { name: 'Shanghai Museum', blurb: 'Strong collection of Chinese art and bronzes.' },
    ],
  },
  mumbai: {
    highlights:
      'Seafront walks and street-food crawls.',
    bestFor: 'Big-city India trips',
    topAttractions: [
      { name: 'Gateway of India', blurb: 'Harbor monument and boat departure point.' },
      { name: 'Marine Drive', blurb: 'Curving seafront promenade at sunset.' },
      { name: 'Chhatrapati Shivaji Terminus', blurb: 'Victorian-Gothic railway landmark.' },
      { name: 'Elephanta Caves', blurb: 'Island cave temples by harbor ferry.' },
      { name: 'Colaba Causeway', blurb: 'Shopping street near the southern tip.' },
    ],
  },


  'washington-dc': {
    highlights:
      'Monuments, free museums, and Mall walks.',
    bestFor: 'History-focused U.S. city trips',
    topAttractions: [
      { name: 'National Mall', blurb: 'Monument-lined park connecting major museums.' },
      { name: 'Smithsonian museums', blurb: 'Free museum campuses along the Mall.' },
      { name: 'U.S. Capitol', blurb: 'Iconic dome and Capitol Hill grounds.' },
      { name: 'Lincoln Memorial', blurb: 'Reflecting Pool views at the Mall’s west end.' },
      { name: 'Georgetown', blurb: 'Historic neighborhood of shops and waterfront paths.' },
    ],
  },
  seattle: {
    highlights:
      'Waterfront views, coffee, and mountain day trips.',
    bestFor: 'Pacific Northwest city breaks',
    topAttractions: [
      { name: 'Pike Place Market', blurb: 'Historic market with seafood, crafts, and views.' },
      { name: 'Space Needle', blurb: 'Observation tower above Seattle Center.' },
      { name: 'Chihuly Garden and Glass', blurb: 'Striking glass art next to the Needle.' },
      { name: 'Ferry to Bainbridge', blurb: 'Short ride with skyline views across the Sound.' },
      { name: 'Museum of Pop Culture', blurb: 'Music and pop-culture exhibits at Seattle Center.' },
    ],
  },
  'san-diego': {
    highlights:
      'Beaches, Balboa Park, and easy coastal days.',
    bestFor: 'Sunny Southern California trips',
    topAttractions: [
      { name: 'Balboa Park', blurb: 'Museum cluster and gardens in the city core.' },
      { name: 'La Jolla Cove', blurb: 'Clifftop views, seals, and clear water.' },
      { name: 'Gaslamp Quarter', blurb: 'Historic downtown dining and nightlife district.' },
      { name: 'Coronado Beach', blurb: 'Broad sandy beach by the Hotel del Coronado.' },
      { name: 'USS Midway Museum', blurb: 'Aircraft-carrier museum on the Embarcadero.' },
    ],
  },
  'new-orleans': {
    highlights:
      'Jazz, Creole food, and historic quarters.',
    bestFor: 'Music and food city getaways',
    topAttractions: [
      { name: 'French Quarter', blurb: 'Historic streets, balconies, and live music.' },
      { name: 'Garden District', blurb: 'Streetcar-accessible mansions and oak canopies.' },
      { name: 'Jackson Square', blurb: 'Plaza framed by St. Louis Cathedral.' },
      { name: 'National WWII Museum', blurb: 'Major museum on the American war effort.' },
      { name: 'Mardi Gras World', blurb: 'Float workshop tours year-round.' },
    ],
  },
  nashville: {
    highlights:
      'Live music, Southern food, and downtown energy.',
    bestFor: 'Music-focused weekend trips',
    topAttractions: [
      { name: 'Broadway honky-tonks', blurb: 'Live-country corridor in downtown Nashville.' },
      { name: 'Country Music Hall of Fame', blurb: 'Museum covering artists, instruments, and history.' },
      { name: 'Ryman Auditorium', blurb: 'Historic stage known as the Mother Church of Country.' },
      { name: 'Parthenon', blurb: 'Full-scale replica in Centennial Park.' },
      { name: 'Grand Ole Opry', blurb: 'Famous country music stage and tours.' },
    ],
  },
  austin: {
    highlights:
      'Live music, food trucks, and outdoor swims.',
    bestFor: 'Music and outdoor city trips',
    topAttractions: [
      { name: 'Congress Avenue Bridge bats', blurb: 'Evening bat emergence in warm months.' },
      { name: 'Lady Bird Lake Trail', blurb: 'Lakeside path for walks and skyline views.' },
      { name: 'Texas State Capitol', blurb: 'Pink-granite capitol and grounds downtown.' },
      { name: 'Barton Springs Pool', blurb: 'Spring-fed swimming hole in Zilker Park.' },
      { name: 'South Congress', blurb: 'Shops, murals, and casual dining strip.' },
    ],
  },
  denver: {
    highlights:
      'Craft beer, parks, and mountain day trips.',
    bestFor: 'Rocky Mountain trip bases',
    topAttractions: [
      { name: 'Red Rocks Park & Amphitheatre', blurb: 'Iconic outdoor venue in the foothills.' },
      { name: 'Denver Art Museum', blurb: 'Major collection with a striking downtown campus.' },
      { name: 'Union Station', blurb: 'Restored transit hub with shops and restaurants.' },
      { name: 'LoDo / Larimer Square', blurb: 'Historic warehouse district for dining and nightlife.' },
      { name: 'Mount Evans / Echo Lake day trip', blurb: 'High-alpine scenery west of the city.' },
    ],
  },
  philadelphia: {
    highlights:
      'Independence history, murals, and sandwiches.',
    bestFor: 'History and food city breaks',
    topAttractions: [
      { name: 'Independence Hall', blurb: 'Birthplace of the Declaration and Constitution.' },
      { name: 'Liberty Bell', blurb: 'Iconic cracked bell beside Independence Mall.' },
      { name: 'Philadelphia Museum of Art', blurb: 'Major museum known for the Rocky steps.' },
      { name: 'Reading Terminal Market', blurb: 'Indoor market for local snacks and produce.' },
      { name: 'Old City', blurb: 'Cobblestone streets and early American landmarks.' },
    ],
  },
  atlanta: {
    highlights:
      'Civil rights history, parks, and food.',
    bestFor: 'Southern city culture trips',
    topAttractions: [
      { name: 'Martin Luther King Jr. National Historical Park', blurb: 'Birth home, church, and memorial sites.' },
      { name: 'Georgia Aquarium', blurb: 'Large aquarium in the downtown tourist core.' },
      { name: 'Centennial Olympic Park', blurb: 'Open downtown park from the 1996 Games.' },
      { name: 'Atlanta BeltLine', blurb: 'Multi-use trail linking neighborhoods and murals.' },
      { name: 'World of Coca-Cola', blurb: 'Brand museum and tasting experience downtown.' },
    ],
  },
  portland: {
    highlights:
      'Food carts, bridges, and waterfall day trips.',
    bestFor: 'Food and outdoors Pacific Northwest trips',
    topAttractions: [
      { name: 'Powell’s City of Books', blurb: 'Vast independent bookstore in the Pearl District.' },
      { name: 'Washington Park', blurb: 'Zoo, rose garden, and forested parkland.' },
      { name: 'Pearl District', blurb: 'Warehouses turned galleries, cafés, and shops.' },
      { name: 'International Rose Test Garden', blurb: 'Hillside roses with city views.' },
      { name: 'Columbia River Gorge', blurb: 'Waterfall corridor for an easy day trip.' },
    ],
  },
  phoenix: {
    highlights:
      'Desert sun, resorts, and canyon day trips.',
    bestFor: 'Warm-weather Southwest getaways',
    topAttractions: [
      { name: 'Desert Botanical Garden', blurb: 'Native plant trails in Papago Park.' },
      { name: 'Heard Museum', blurb: 'Native American art and culture museum.' },
      { name: 'Camelback Mountain', blurb: 'Popular hike with valley views.' },
      { name: 'Musical Instrument Museum', blurb: 'Global instrument collection north of downtown.' },
      { name: 'Old Town Scottsdale', blurb: 'Nearby dining, galleries, and resort energy.' },
    ],
  },
  charleston: {
    highlights:
      'Pastel streets, harbor views, and Lowcountry food.',
    bestFor: 'Historic Southern coastal weekends',
    topAttractions: [
      { name: 'Historic District walking streets', blurb: 'Rainbow Row and antebellum architecture.' },
      { name: 'Waterfront Park', blurb: 'Harbor promenade with the pineapple fountain.' },
      { name: 'Fort Sumter', blurb: 'Harbor fort reached by boat tour.' },
      { name: 'Charleston City Market', blurb: 'Crafts and sweetgrass baskets downtown.' },
      { name: 'Angel Oak', blurb: 'Massive live oak on Johns Island.' },
    ],
  },
  savannah: {
    highlights:
      'Oak-lined squares and riverfront evenings.',
    bestFor: 'Historic Southern city strolls',
    topAttractions: [
      { name: 'Forsyth Park', blurb: 'Large square with a landmark fountain.' },
      { name: 'River Street', blurb: 'Cobblestone waterfront of shops and restaurants.' },
      { name: 'Historic District squares', blurb: 'Grid of shaded parks and townhomes.' },
      { name: 'Cathedral Basilica of St. John the Baptist', blurb: 'Twin-spired landmark near Lafayette Square.' },
      { name: 'Bonaventure Cemetery', blurb: 'Scenic riverside cemetery of mossy oaks.' },
    ],
  },
  dallas: {
    highlights:
      'Arts districts, skyline views, and dining.',
    bestFor: 'Big-city Texas weekends',
    topAttractions: [
      { name: 'Dallas Arts District', blurb: 'Museums and performance halls downtown.' },
      { name: 'Reunion Tower', blurb: 'Observation deck with city panorama.' },
      { name: 'Sixth Floor Museum', blurb: 'JFK history exhibit in Dealey Plaza.' },
      { name: 'Dallas Arboretum', blurb: 'Gardens on White Rock Lake.' },
      { name: 'Deep Ellum', blurb: 'Murals, live music, and nightlife east of downtown.' },
    ],
  },
  houston: {
    highlights:
      'Museums, space history, and diverse food.',
    bestFor: 'Culture and food city trips',
    topAttractions: [
      { name: 'Space Center Houston', blurb: 'Official NASA visitor center for space history.' },
      { name: 'Museum District', blurb: 'Cluster of major museums near Hermann Park.' },
      { name: 'Buffalo Bayou Park', blurb: 'Greenway with skyline trails and bridges.' },
      { name: 'Minute Maid Park / downtown', blurb: 'Sports and skyline core for an urban day.' },
      { name: 'Kemah Boardwalk', blurb: 'Nearby waterfront amusement and dining day trip.' },
    ],
  },
  'key-west': {
    highlights:
      'Sunset piers, pastel streets, and island pace.',
    bestFor: 'Relaxed Florida Keys getaways',
    topAttractions: [
      { name: 'Duval Street', blurb: 'Main strip of shops, bars, and galleries.' },
      { name: 'Mallory Square sunset', blurb: 'Evening pier gathering for sunset and street acts.' },
      { name: 'Southernmost Point buoy', blurb: 'Photo landmark at the island’s tip.' },
      { name: 'Fort Zachary Taylor', blurb: 'Historic fort with a popular beach.' },
      { name: 'Ernest Hemingway Home', blurb: 'Writer’s house museum known for its polydactyl cats.' },
    ],
  },

};
