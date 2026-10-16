interface CulturalIcon {
  title: string;
  label: string;
  imageUrl?: string;
  imagePageUrl?: string;
}

export const culturalIcons: Record<string, CulturalIcon> = {
  lisbon: { title: 'Belém Tower', label: 'Belém Tower' },
  bangkok: { title: 'Wat Arun', label: 'Wat Arun' },
  'mexico-city': {
    title: 'Palacio de Bellas Artes',
    label: 'Palacio de Bellas Artes',
  },
  budapest: {
    title: 'Hungarian Parliament Building',
    label: 'Hungarian Parliament Building',
  },
  hanoi: { title: 'Temple of Literature, Hanoi', label: 'Temple of Literature' },
  marrakech: { title: 'Kutubiyya Mosque', label: 'Koutoubia Mosque' },
  paris: {
    title: 'Eiffel Tower',
    label: 'Eiffel Tower',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Eiffel_Tower_in_2022_02.jpg/960px-Eiffel_Tower_in_2022_02.jpg',
    imagePageUrl:
      'https://commons.wikimedia.org/wiki/File:Eiffel_Tower_in_2022_02.jpg',
  },
  london: { title: 'Big Ben', label: 'Big Ben' },
  rome: { title: 'Colosseum', label: 'Colosseum' },
  barcelona: { title: 'Sagrada Família', label: 'Sagrada Família' },
  amsterdam: { title: 'Rijksmuseum', label: 'Rijksmuseum' },
  istanbul: { title: 'Hagia Sophia', label: 'Hagia Sophia' },
  dubai: { title: 'Burj Khalifa', label: 'Burj Khalifa' },
  tokyo: { title: 'Sensō-ji', label: 'Sensō-ji' },
  seoul: { title: 'Gyeongbokgung', label: 'Gyeongbokgung Palace' },
  singapore: { title: 'Merlion', label: 'Merlion' },
  bali: { title: 'Tanah Lot', label: 'Tanah Lot' },
  'new-york': { title: 'Statue of Liberty', label: 'Statue of Liberty' },
  'los-angeles': { title: 'Hollywood Sign', label: 'Hollywood Sign' },
  orlando: {
    title: 'Cinderella Castle',
    label: 'Cinderella Castle',
  },
  cancun: { title: 'Chichen Itza', label: 'Chichén Itzá' },
  'rio-de-janeiro': {
    title: 'Christ the Redeemer (statue)',
    label: 'Christ the Redeemer',
  },
  'buenos-aires': {
    title: 'Obelisco de Buenos Aires',
    label: 'Obelisk of Buenos Aires',
  },
  'cape-town': { title: 'Table Mountain', label: 'Table Mountain' },
  cairo: { title: 'Great Sphinx of Giza', label: 'Great Sphinx of Giza' },
  sydney: { title: 'Sydney Opera House', label: 'Sydney Opera House' },

  prague: { title: 'Prague Castle', label: 'Prague Castle' },
  vienna: { title: 'Schönbrunn Palace', label: 'Schönbrunn Palace' },
  berlin: { title: 'Brandenburg Gate', label: 'Brandenburg Gate' },
  athens: { title: 'Acropolis of Athens', label: 'Acropolis' },
  madrid: { title: 'Museo del Prado', label: 'Prado Museum' },
  dublin: { title: 'Trinity College Dublin', label: 'Trinity College' },
  edinburgh: { title: 'Edinburgh Castle', label: 'Edinburgh Castle' },
  copenhagen: { title: 'Nyhavn', label: 'Nyhavn' },
  vancouver: {
    title: 'Stanley Park',
    label: 'Stanley Park',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Vancouver_skyline_from_Stanley_Park.jpg/1200px-Vancouver_skyline_from_Stanley_Park.jpg',
    imagePageUrl:
      'https://commons.wikimedia.org/wiki/File:Vancouver_skyline_from_Stanley_Park.jpg',
  },
  toronto: {
    title: 'CN Tower',
    label: 'CN Tower',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/CN_Tower_Toronto.jpg/1200px-CN_Tower_Toronto.jpg',
    imagePageUrl: 'https://commons.wikimedia.org/wiki/File:CN_Tower_Toronto.jpg',
  },
  'san-francisco': { title: 'Golden Gate Bridge', label: 'Golden Gate Bridge' },
  miami: { title: 'Ocean Drive (South Beach)', label: 'South Beach' },
  honolulu: { title: 'Waikiki Beach', label: 'Waikiki Beach' },
  melbourne: { title: 'Federation Square', label: 'Federation Square' },
  auckland: { title: 'Sky Tower', label: 'Sky Tower' },
  kyoto: { title: 'Fushimi Inari-taisha', label: 'Fushimi Inari' },
  osaka: { title: 'Osaka Castle', label: 'Osaka Castle' },
  taipei: {
    title: 'Taipei 101',
    label: 'Taipei 101',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Night_in_Taipei_101_20071226.jpg/1200px-Night_in_Taipei_101_20071226.jpg',
    imagePageUrl:
      'https://commons.wikimedia.org/wiki/File:Night_in_Taipei_101_20071226.jpg',
  },
  'hong-kong': { title: 'Victoria Peak', label: 'Victoria Peak' },
  'chiang-mai': { title: 'Wat Phra That Doi Suthep', label: 'Doi Suthep' },
  phuket: { title: 'Phuket Big Buddha', label: 'Big Buddha' },
  'ho-chi-minh-city': { title: 'Notre-Dame Cathedral Basilica of Saigon', label: 'Notre-Dame Cathedral' },
  lima: { title: 'Historic Centre of Lima', label: 'Lima Historic Center' },
  delhi: { title: 'Red Fort', label: 'Red Fort' },
  florence: { title: 'Florence Cathedral', label: 'Florence Cathedral' },
  venice: { title: 'St Mark\'s Basilica', label: 'St. Mark’s Basilica' },
  porto: { title: 'Dom Luís I Bridge', label: 'Dom Luís I Bridge' },
  seville: { title: 'Seville Cathedral', label: 'Seville Cathedral' },
  munich: { title: 'Marienplatz', label: 'Marienplatz' },
  stockholm: { title: 'Stockholm City Hall', label: 'Stockholm City Hall' },
  reykjavik: { title: 'Hallgrímskirkja', label: 'Hallgrímskirkja' },
  krakow: { title: 'Wawel Castle', label: 'Wawel Castle' },
  dubrovnik: { title: 'Walls of Dubrovnik', label: 'Dubrovnik City Walls' },
  zurich: { title: 'Grossmünster', label: 'Grossmünster' },
  chicago: { title: 'Cloud Gate', label: 'Cloud Gate' },
  boston: { title: 'Massachusetts State House', label: 'Massachusetts State House' },
  'las-vegas': { title: 'Welcome to Fabulous Las Vegas sign', label: 'Las Vegas Welcome Sign' },
  montreal: { title: 'Notre-Dame Basilica (Montreal)', label: 'Notre-Dame Basilica' },
  cusco: { title: 'Sacsayhuamán', label: 'Sacsayhuamán' },
  cartagena: {
    title: 'Walls of Cartagena, Colombia',
    label: 'Cartagena City Walls',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Murallas_de_Cartagena_de_Indias.jpg/1200px-Murallas_de_Cartagena_de_Indias.jpg',
    imagePageUrl:
      'https://commons.wikimedia.org/wiki/File:Murallas_de_Cartagena_de_Indias.jpg',
  },
  santiago: { title: 'San Cristóbal Hill', label: 'Cerro San Cristóbal' },
  'kuala-lumpur': {
    title: 'Petronas Towers',
    label: 'Petronas Twin Towers',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Petronas_Twin_Towers%2C_Kuala_Lumpur.jpg/1200px-Petronas_Twin_Towers%2C_Kuala_Lumpur.jpg',
    imagePageUrl:
      'https://commons.wikimedia.org/wiki/File:Petronas_Twin_Towers,_Kuala_Lumpur.jpg',
  },
  shanghai: { title: 'The Bund', label: 'The Bund' },
  mumbai: { title: 'Gateway of India', label: 'Gateway of India' },


  'washington-dc': { title: 'U.S. Capitol', label: 'U.S. Capitol' },
  seattle: { title: 'Space Needle', label: 'Space Needle' },
  'san-diego': {
    title: 'Hotel del Coronado',
    label: 'Hotel del Coronado',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Hotel_del_Coronado.jpg/1200px-Hotel_del_Coronado.jpg',
    imagePageUrl:
      'https://commons.wikimedia.org/wiki/File:Hotel_del_Coronado.jpg',
  },
  'new-orleans': {
    title: 'St. Louis Cathedral',
    label: 'St. Louis Cathedral',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Cathedral_new_orleans.jpg/1200px-Cathedral_new_orleans.jpg',
    imagePageUrl:
      'https://commons.wikimedia.org/wiki/File:Cathedral_new_orleans.jpg',
  },
  nashville: {
    title: 'Country Music Hall of Fame and Museum',
    label: 'Country Music Hall of Fame',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Country_Music_Hall_of_Fame_Nashville.jpg/1200px-Country_Music_Hall_of_Fame_Nashville.jpg',
    imagePageUrl:
      'https://commons.wikimedia.org/wiki/File:Country_Music_Hall_of_Fame_Nashville.jpg',
  },
  austin: { title: 'Texas State Capitol', label: 'Texas State Capitol' },
  denver: { title: 'Red Rocks Amphitheatre', label: 'Red Rocks Amphitheatre' },
  philadelphia: { title: 'Liberty Bell', label: 'Liberty Bell' },
  atlanta: { title: 'Georgia State Capitol', label: 'Georgia State Capitol' },
  portland: {
    title: 'International Rose Test Garden',
    label: 'Portland Rose Garden',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Portland_International_Rose_Test_Garden_-_HCP_-_October_15%2C_2022_-_006.jpg/1200px-Portland_International_Rose_Test_Garden_-_HCP_-_October_15%2C_2022_-_006.jpg',
    imagePageUrl:
      'https://commons.wikimedia.org/wiki/File:Portland_International_Rose_Test_Garden_-_HCP_-_October_15,_2022_-_006.jpg',
  },
  phoenix: { title: 'Camelback Mountain', label: 'Camelback Mountain' },
  charleston: {
    title: 'Rainbow Row',
    label: 'Rainbow Row',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Rainbow_Row.jpg/1200px-Rainbow_Row.jpg',
    imagePageUrl: 'https://commons.wikimedia.org/wiki/File:Rainbow_Row.jpg',
  },
  savannah: {
    title: 'Forsyth Park',
    label: 'Forsyth Park Fountain',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Forsyth_fountain_2019.jpeg/1200px-Forsyth_fountain_2019.jpeg',
    imagePageUrl: 'https://commons.wikimedia.org/wiki/File:Forsyth_fountain_2019.jpeg',
  },
  dallas: { title: 'Reunion Tower', label: 'Reunion Tower' },
  houston: { title: 'Space Center Houston', label: 'Space Center Houston' },
  'key-west': { title: 'Southernmost Point Buoy', label: 'Southernmost Point' },

  milan: { title: 'Milan Cathedral', label: 'Milan Cathedral' },
  naples: { title: 'Mount Vesuvius', label: 'Mount Vesuvius' },
  nice: { title: 'Promenade des Anglais', label: 'Promenade des Anglais' },
  lyon: { title: 'Basilica of Notre-Dame de Fourvière', label: 'Basilica of Fourvière' },
  marseille: { title: 'Notre-Dame de la Garde', label: 'Notre-Dame de la Garde' },
  brussels: { title: 'Grand Place', label: 'Grand Place' },
  bruges: { title: 'Belfry of Bruges', label: 'Belfry of Bruges' },
  warsaw: { title: 'Warsaw Old Town Market Place', label: 'Warsaw Old Town' },
  ljubljana: { title: 'Ljubljana Castle', label: 'Ljubljana Castle' },
  santorini: {
    title: 'Oia, Santorini',
    label: 'Oia village, Santorini',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Oia%2C_Santorini%2C_Greece.jpg/1200px-Oia%2C_Santorini%2C_Greece.jpg',
    imagePageUrl:
      'https://commons.wikimedia.org/wiki/File:Oia,_Santorini,_Greece.jpg',
  },
  mykonos: { title: 'Mykonos windmills', label: 'Mykonos windmills' },
  oslo: { title: 'Oslo Opera House', label: 'Oslo Opera House' },
  helsinki: { title: 'Helsinki Cathedral', label: 'Helsinki Cathedral' },
  valencia: {
    title: 'City of Arts and Sciences',
    label: 'City of Arts and Sciences',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Ciudad_de_las_Artes_y_las_Ciencias.jpg/1200px-Ciudad_de_las_Artes_y_las_Ciencias.jpg',
    imagePageUrl:
      'https://commons.wikimedia.org/wiki/File:Ciudad_de_las_Artes_y_las_Ciencias.jpg',
  },
  salzburg: { title: 'Hohensalzburg Fortress', label: 'Hohensalzburg Fortress' },
  interlaken: { title: 'Jungfraujoch', label: 'Jungfraujoch' },
  beijing: { title: 'Forbidden City', label: 'Forbidden City' },
  chengdu: { title: 'Giant panda, Chengdu', label: 'Giant panda at Chengdu base' },
  manila: { title: 'Fort Santiago, Manila', label: 'Fort Santiago' },
  cebu: { title: 'Magellan’s Cross', label: 'Magellan’s Cross' },
  'siem-reap': { title: 'Angkor Wat', label: 'Angkor Wat' },
  'phnom-penh': { title: 'Royal Palace, Phnom Penh', label: 'Royal Palace' },
  kathmandu: { title: 'Boudhanath Stupa', label: 'Boudhanath Stupa' },
  jaipur: { title: 'Hawa Mahal', label: 'Hawa Mahal' },
  goa: { title: 'Basilica of Bom Jesus', label: 'Basilica of Bom Jesus' },
  busan: { title: 'Gamcheon Culture Village', label: 'Gamcheon Culture Village' },
  sapporo: { title: 'Sapporo Clock Tower', label: 'Sapporo Clock Tower' },
  yogyakarta: { title: 'Borobudur', label: 'Borobudur' },
  'tel-aviv': { title: 'Old Jaffa', label: 'Old Jaffa' },
  jerusalem: { title: 'Western Wall', label: 'Western Wall' },
  doha: { title: 'Museum of Islamic Art, Doha', label: 'Museum of Islamic Art' },
  amman: { title: 'Amman Citadel', label: 'Amman Citadel' },
  nairobi: { title: 'Giraffe Centre, Nairobi', label: 'Rothschild giraffe, Nairobi' },
  zanzibar: {
    title: 'Stone Town',
    label: 'Stone Town',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Zanzibar_sultan_palace.jpg/1200px-Zanzibar_sultan_palace.jpg',
    imagePageUrl:
      'https://commons.wikimedia.org/wiki/File:Zanzibar_sultan_palace.jpg',
  },
  fes: { title: 'Chouara Tannery, Fes', label: 'Chouara Tannery' },
  'sao-paulo': { title: 'MASP, São Paulo', label: 'São Paulo Museum of Art' },
  salvador: {
    title: 'Historic Center of Salvador',
    label: 'Pelourinho',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Centro_Hist%C3%B3rico_Salvador_Vista_A%C3%A9rea_2021-0933.jpg/1200px-Centro_Hist%C3%B3rico_Salvador_Vista_A%C3%A9rea_2021-0933.jpg',
    imagePageUrl:
      'https://commons.wikimedia.org/wiki/File:Centro_Hist%C3%B3rico_Salvador_Vista_A%C3%A9rea_2021-0933.jpg',
  },
  medellin: { title: 'Comuna 13, Medellín', label: 'Comuna 13' },
  quito: { title: 'Quito Old Town', label: 'Quito Old Town' },
  'san-jose-costa-rica': { title: 'National Theatre of Costa Rica', label: 'National Theatre of Costa Rica' },
  'punta-cana': { title: 'Bavaro Beach, Punta Cana', label: 'Bavaro Beach' },
  montevideo: {
    title: 'Palacio Salvo',
    label: 'Palacio Salvo',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Palacio_Salvo%2C_Montevideo.jpg/1200px-Palacio_Salvo%2C_Montevideo.jpg',
    imagePageUrl:
      'https://commons.wikimedia.org/wiki/File:Palacio_Salvo,_Montevideo.jpg',
  },
  'panama-city': {
    title: 'Casco Viejo, Panama City',
    label: 'Casco Viejo',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Casco_Viejo%2C_Panama_City.jpg/1200px-Casco_Viejo%2C_Panama_City.jpg',
    imagePageUrl:
      'https://commons.wikimedia.org/wiki/File:Casco_Viejo,_Panama_City.jpg',
  },
  nassau: {
    title: "Queen's Staircase",
    label: 'Queen’s Staircase',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Queen%27s_staircase%2C_Nassau%2C_Bahamas.jpg/1200px-Queen%27s_staircase%2C_Nassau%2C_Bahamas.jpg',
    imagePageUrl:
      'https://commons.wikimedia.org/wiki/File:Queen%27s_staircase,_Nassau,_Bahamas.jpg',
  },
  'montego-bay': { title: 'Doctor’s Cave Beach', label: 'Doctor’s Cave Beach' },
  queenstown: {
    title: 'Lake Wakatipu',
    label: 'Lake Wakatipu',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/LakeWakatipuNov172024_02.jpg/1200px-LakeWakatipuNov172024_02.jpg',
    imagePageUrl:
      'https://commons.wikimedia.org/wiki/File:LakeWakatipuNov172024_02.jpg',
  },
  'gold-coast': {
    title: 'Surfers Paradise',
    label: 'Surfers Paradise',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Surfers_Paradise%2C_QLD_skyline.jpg/1200px-Surfers_Paradise%2C_QLD_skyline.jpg',
    imagePageUrl:
      'https://commons.wikimedia.org/wiki/File:Surfers_Paradise,_QLD_skyline.jpg',
  },
  'quebec-city': { title: 'Château Frontenac', label: 'Château Frontenac' },
  calgary: { title: 'Calgary Tower', label: 'Calgary Tower' },
  'san-antonio': { title: 'The Alamo', label: 'The Alamo' },
  bogota: { title: 'Monserrate', label: 'Monserrate' },
  oaxaca: { title: 'Monte Albán', label: 'Monte Albán' },
  'puerto-vallarta': {
    title: 'Church of Our Lady of Guadalupe (Puerto Vallarta)',
    label: 'Our Lady of Guadalupe Church',
  },
  tulum: { title: 'Tulum', label: 'Tulum Ruins' },
  casablanca: { title: 'Hassan II Mosque', label: 'Hassan II Mosque' },
  johannesburg: { title: 'Nelson Mandela Bridge', label: 'Nelson Mandela Bridge' },
  granada: { title: 'Alhambra', label: 'Alhambra' },
  split: { title: "Diocletian's Palace", label: "Diocletian's Palace" },
  belgrade: { title: 'Church of Saint Sava', label: 'Church of Saint Sava' },
  bucharest: { title: 'Palace of the Parliament', label: 'Palace of the Parliament' },
  tallinn: {
    title: 'Alexander Nevsky Cathedral, Tallinn',
    label: 'Alexander Nevsky Cathedral',
  },
  geneva: { title: "Jet d'Eau", label: "Jet d'Eau" },
  bologna: { title: 'Two Towers, Bologna', label: 'Two Towers' },
  valletta: { title: "Saint John's Co-Cathedral", label: "Saint John's Co-Cathedral" },
  antalya: { title: 'Yivli Minaret Mosque', label: 'Yivli Minaret' },
  'da-nang': { title: 'Dragon Bridge (Da Nang)', label: 'Dragon Bridge' },
  'hoi-an': {
    title: 'Japanese Bridge',
    label: 'Japanese Covered Bridge',
  },
  brisbane: { title: 'Story Bridge', label: 'Story Bridge' },
  wellington: {
    title: 'Museum of New Zealand Te Papa Tongarewa',
    label: 'Te Papa',
  },
  'xi-an': { title: 'Terracotta Army', label: 'Terracotta Army' },

};
