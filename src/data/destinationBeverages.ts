export interface BeveragePick {
  name: string;
  blurb: string;
  /** Typical serving price in USD for planning. */
  averagePriceUsd: number;
}

export interface LocalDrinkPick extends BeveragePick {}

export interface BeerPick extends BeveragePick {}

export interface DestinationBeveragePair {
  localDrink: LocalDrinkPick;
  beer: BeerPick;
}

/** One locally recognizable non-beer drink and one beer pick per destination. */
export const destinationBeverages: Record<string, DestinationBeveragePair> = {
  lisbon: {
    localDrink: { name: 'Galão', blurb: 'Portuguese espresso served with plenty of steamed milk.', averagePriceUsd: 2.5 },
    beer: { name: 'Sagres', blurb: 'Crisp Portuguese pale lager named for the Algarve town.', averagePriceUsd: 3.5 },
  },
  bangkok: {
    localDrink: { name: 'Cha yen', blurb: 'Strong Thai tea sweetened with condensed milk and served over ice.', averagePriceUsd: 1.5 },
    beer: { name: 'Singha', blurb: 'Long-established Thai pale lager found throughout Bangkok.', averagePriceUsd: 3 },
  },
  'mexico-city': {
    localDrink: { name: 'Agua de jamaica', blurb: 'Tart hibiscus agua fresca served cold in markets and fondas.', averagePriceUsd: 1.5 },
    beer: { name: 'Modelo Especial', blurb: 'Mexican pilsner-style lager commonly served with lime.', averagePriceUsd: 3 },
  },
  budapest: {
    localDrink: { name: 'Fröccs', blurb: 'Hungarian wine spritzer mixed in several traditional proportions.', averagePriceUsd: 3 },
    beer: { name: 'Dreher Gold', blurb: 'Budapest-brewed golden lager from the historic Kőbánya brewery.', averagePriceUsd: 3 },
  },
  hanoi: {
    localDrink: { name: 'Cà phê trứng', blurb: 'Hanoi egg coffee topped with whipped egg yolk and condensed milk.', averagePriceUsd: 2 },
    beer: { name: 'Bia Hà Nội', blurb: 'Light lager closely associated with Hanoi and northern Vietnam.', averagePriceUsd: 1.5 },
  },
  marrakech: {
    localDrink: { name: 'Moroccan mint tea', blurb: 'Green tea steeped with fresh mint and traditionally served sweet.', averagePriceUsd: 2 },
    beer: { name: 'Casablanca', blurb: 'Moroccan lager available mainly at licensed hotels, bars, and restaurants; alcohol is restricted and not a general cultural staple.', averagePriceUsd: 7 },
  },
  paris: {
    localDrink: { name: 'Café crème', blurb: 'French café coffee softened with steamed milk or cream.', averagePriceUsd: 5 },
    beer: { name: 'Kronenbourg 1664', blurb: 'French pale lager commonly poured in Paris cafés and bars.', averagePriceUsd: 7 },
  },
  london: {
    localDrink: { name: 'English breakfast tea', blurb: 'Robust black-tea blend usually served with milk.', averagePriceUsd: 4 },
    beer: { name: 'Fuller’s London Pride', blurb: 'London-brewed amber ale with a long association with the capital.', averagePriceUsd: 7 },
  },
  rome: {
    localDrink: { name: 'Espresso', blurb: 'Short, concentrated coffee commonly taken standing at a Roman bar.', averagePriceUsd: 1.5 },
    beer: { name: 'Peroni Nastro Azzurro', blurb: 'Italian pale lager widely available in Roman restaurants and bars.', averagePriceUsd: 5 },
  },
  barcelona: {
    localDrink: { name: 'Vermut de Reus', blurb: 'Catalan aromatized wine traditionally enjoyed as a pre-lunch aperitif.', averagePriceUsd: 4 },
    beer: { name: 'Estrella Damm', blurb: 'Barcelona lager brewed locally since the nineteenth century.', averagePriceUsd: 4 },
  },
  amsterdam: {
    localDrink: { name: 'Jenever', blurb: 'Dutch juniper spirit traditionally served in a small tulip-shaped glass.', averagePriceUsd: 5 },
    beer: { name: 'Heineken', blurb: 'Pale lager founded and first brewed in Amsterdam.', averagePriceUsd: 5 },
  },
  istanbul: {
    localDrink: { name: 'Çay', blurb: 'Strong black tea served in a small tulip-shaped glass.', averagePriceUsd: 1.5 },
    beer: { name: 'Bomonti', blurb: 'Turkish lager with historic Istanbul roots; alcohol is legal but regulated and absent from many conservative venues.', averagePriceUsd: 5 },
  },
  dubai: {
    localDrink: { name: 'Karak chai', blurb: 'Sweet, spiced milk tea popular at cafeterias across the UAE.', averagePriceUsd: 1.5 },
    beer: { name: 'Heineken 0.0', blurb: 'Genuinely alcohol-free lager sold in Dubai; alcoholic beer is restricted to licensed venues and is not a local cultural staple.', averagePriceUsd: 3 },
  },
  tokyo: {
    localDrink: { name: 'Matcha', blurb: 'Powdered Japanese green tea whisked with hot water.', averagePriceUsd: 5 },
    beer: { name: 'Asahi Super Dry', blurb: 'Japanese dry lager widely poured in Tokyo izakaya.', averagePriceUsd: 5 },
  },
  seoul: {
    localDrink: { name: 'Sikhye', blurb: 'Sweet Korean rice drink made with malted barley.', averagePriceUsd: 2.5 },
    beer: { name: 'Cass Fresh', blurb: 'Light South Korean lager commonly paired with fried chicken.', averagePriceUsd: 4 },
  },
  singapore: {
    localDrink: { name: 'Kopi', blurb: 'Robust coffee brewed through a cloth filter and usually sweetened.', averagePriceUsd: 1.5 },
    beer: { name: 'Tiger Beer', blurb: 'Singapore-founded pale lager brewed since 1932.', averagePriceUsd: 7 },
  },
  bali: {
    localDrink: { name: 'Jamu kunyit asam', blurb: 'Indonesian turmeric-and-tamarind herbal drink served chilled.', averagePriceUsd: 2 },
    beer: { name: 'Bintang Pilsener', blurb: 'Indonesian lager widely sold in tourist-oriented Bali; alcohol availability is more restricted elsewhere in Muslim-majority Indonesia.', averagePriceUsd: 3 },
  },
  'new-york': {
    localDrink: { name: 'New York egg cream', blurb: 'Soda-fountain drink of milk, seltzer, and chocolate syrup, despite containing no egg.', averagePriceUsd: 4 },
    beer: { name: 'Brooklyn Lager', blurb: 'Amber lager produced by Brooklyn Brewery and closely identified with the borough.', averagePriceUsd: 7 },
  },
  'los-angeles': {
    localDrink: { name: 'Horchata', blurb: 'Cinnamon rice drink central to Los Angeles’s Mexican food culture.', averagePriceUsd: 3 },
    beer: { name: 'Golden Road 329 Lager', blurb: 'Easy-drinking lager from a brewery founded in Los Angeles.', averagePriceUsd: 7 },
  },
  orlando: {
    localDrink: { name: 'Florida orange juice', blurb: 'Fresh citrus juice made from the fruit most associated with Florida.', averagePriceUsd: 4 },
    beer: { name: 'Cigar City Jai Alai IPA', blurb: 'Tampa-brewed IPA that is a recognizable craft pick across central Florida.', averagePriceUsd: 7 },
  },
  cancun: {
    localDrink: { name: 'Agua de chaya', blurb: 'Yucatán drink blending leafy chaya with water and citrus.', averagePriceUsd: 2.5 },
    beer: { name: 'Montejo', blurb: 'Yucatán-founded Mexican lager commonly found around Cancún.', averagePriceUsd: 4 },
  },
  'rio-de-janeiro': {
    localDrink: { name: 'Mate gelado', blurb: 'Sweet iced mate traditionally sold by beach vendors in Rio.', averagePriceUsd: 2 },
    beer: { name: 'Brahma Chopp', blurb: 'Brazilian lager commonly served very cold in Rio bars.', averagePriceUsd: 3 },
  },
  'buenos-aires': {
    localDrink: { name: 'Mate', blurb: 'Yerba mate infusion shared from a gourd through a metal straw.', averagePriceUsd: 3 },
    beer: { name: 'Quilmes Clásica', blurb: 'Argentine lager from Quilmes in greater Buenos Aires.', averagePriceUsd: 3 },
  },
  'cape-town': {
    localDrink: { name: 'Rooibos tea', blurb: 'Naturally caffeine-free red-bush infusion native to South Africa’s Western Cape.', averagePriceUsd: 2.5 },
    beer: { name: 'Castle Lager', blurb: 'Long-running South African pale lager widely available in Cape Town.', averagePriceUsd: 4 },
  },
  cairo: {
    localDrink: { name: 'Karkade', blurb: 'Deep-red hibiscus infusion served hot or cold in Egypt.', averagePriceUsd: 1.5 },
    beer: { name: 'Stella', blurb: 'Historic Egyptian lager sold through licensed shops, hotels, and restaurants; availability is restricted and it is not a general cultural staple.', averagePriceUsd: 3 },
  },
  sydney: {
    localDrink: { name: 'Flat white', blurb: 'Australian espresso drink with steamed milk and a thin layer of microfoam.', averagePriceUsd: 4 },
    beer: { name: 'Tooheys New', blurb: 'New South Wales lager long associated with Sydney pubs.', averagePriceUsd: 7 },
  },
  prague: {
    localDrink: { name: 'Kofola', blurb: 'Czech herbal cola created in former Czechoslovakia.', averagePriceUsd: 2.5 },
    beer: { name: 'Pilsner Urquell', blurb: 'Original Czech pilsner from nearby Plzeň, ubiquitous in Prague pubs.', averagePriceUsd: 3 },
  },
  vienna: {
    localDrink: { name: 'Wiener Melange', blurb: 'Viennese coffee topped with steamed milk and foam.', averagePriceUsd: 5 },
    beer: { name: 'Ottakringer Helles', blurb: 'Pale lager brewed in Vienna’s Ottakring district.', averagePriceUsd: 5 },
  },
  berlin: {
    localDrink: { name: 'Apfelschorle', blurb: 'Sparkling water mixed with apple juice, a common German refresher.', averagePriceUsd: 3 },
    beer: { name: 'Berliner Kindl Jubiläums Pilsener', blurb: 'Crisp pilsner from a historic Berlin beer brand.', averagePriceUsd: 4 },
  },
  athens: {
    localDrink: { name: 'Greek coffee', blurb: 'Finely ground coffee simmered unfiltered in a small briki pot.', averagePriceUsd: 3 },
    beer: { name: 'FIX Hellas', blurb: 'Historic Greek lager whose brewery originated in Athens.', averagePriceUsd: 4 },
  },
  madrid: {
    localDrink: { name: 'Vermut de grifo', blurb: 'Red vermouth served on tap as a classic Madrid aperitif.', averagePriceUsd: 4 },
    beer: { name: 'Mahou Cinco Estrellas', blurb: 'Madrid-founded lager closely associated with the city’s bars.', averagePriceUsd: 4 },
  },
  dublin: {
    localDrink: { name: 'Irish breakfast tea', blurb: 'Strong black-tea blend conventionally served with milk.', averagePriceUsd: 4 },
    beer: { name: 'Guinness Draught', blurb: 'Dry stout brewed at Dublin’s St James’s Gate.', averagePriceUsd: 7 },
  },
  edinburgh: {
    localDrink: { name: 'Irn-Bru', blurb: 'Bright-orange Scottish carbonated soft drink.', averagePriceUsd: 2.5 },
    beer: { name: 'Innis & Gunn Scottish Lager', blurb: 'Scottish lager from an Edinburgh-founded brewery.', averagePriceUsd: 7 },
  },
  copenhagen: {
    localDrink: { name: 'Hyldeblomstsaft', blurb: 'Danish elderflower cordial diluted with still or sparkling water.', averagePriceUsd: 4 },
    beer: { name: 'Carlsberg Pilsner', blurb: 'Copenhagen-founded lager first brewed in the city in 1847.', averagePriceUsd: 7 },
  },
  vancouver: {
    localDrink: { name: 'London Fog', blurb: 'Earl Grey tea latte widely credited to Vancouver café culture.', averagePriceUsd: 5 },
    beer: { name: 'Granville Island English Bay Pale Ale', blurb: 'Pale ale from a brewery founded on Vancouver’s Granville Island.', averagePriceUsd: 6 },
  },
  toronto: {
    localDrink: { name: 'Caesar', blurb: 'Canadian cocktail of vodka, clamato, spices, and a savory garnish.', averagePriceUsd: 10 },
    beer: { name: 'Steam Whistle Pilsner', blurb: 'Pilsner brewed in Toronto’s historic Roundhouse.', averagePriceUsd: 7 },
  },
  'san-francisco': {
    localDrink: { name: 'Irish coffee', blurb: 'Whiskey coffee capped with cream, popularized in San Francisco at the Buena Vista.', averagePriceUsd: 12 },
    beer: { name: 'Fort Point KSA', blurb: 'Kölsch-style ale brewed by a San Francisco brewery.', averagePriceUsd: 8 },
  },
  miami: {
    localDrink: { name: 'Cafecito', blurb: 'Sweet, concentrated Cuban espresso central to Miami café culture.', averagePriceUsd: 2 },
    beer: { name: 'La Rubia', blurb: 'Blonde ale from Wynwood Brewing, Miami’s first production craft brewery.', averagePriceUsd: 7 },
  },
  honolulu: {
    localDrink: { name: 'POG juice', blurb: 'Hawaiian blend of passion fruit, orange, and guava juices.', averagePriceUsd: 4 },
    beer: { name: 'Kona Longboard Island Lager', blurb: 'Hawaiian-branded lager originating from Kona on the island of Hawaiʻi.', averagePriceUsd: 7 },
  },
  melbourne: {
    localDrink: { name: 'Flat white', blurb: 'Espresso with velvety steamed milk, embedded in Melbourne café culture.', averagePriceUsd: 4 },
    beer: { name: 'Victoria Bitter', blurb: 'Long-running Victorian lager commonly known as VB.', averagePriceUsd: 7 },
  },
  auckland: {
    localDrink: { name: 'L&P', blurb: 'New Zealand lemon soft drink originally made in Paeroa.', averagePriceUsd: 3 },
    beer: { name: 'Steinlager Classic', blurb: 'New Zealand lager first produced in Auckland.', averagePriceUsd: 7 },
  },
  kyoto: {
    localDrink: { name: 'Uji matcha', blurb: 'Whisked green tea from Uji, immediately south of Kyoto.', averagePriceUsd: 6 },
    beer: { name: 'Kizakura Kyoto Beer Kölsch', blurb: 'Kölsch-style beer made by Kyoto sake brewer Kizakura.', averagePriceUsd: 6 },
  },
  osaka: {
    localDrink: { name: 'Osaka mixed juice', blurb: 'Thick café drink blending milk with banana and other fruit.', averagePriceUsd: 4 },
    beer: { name: 'Asahi Super Dry', blurb: 'Dry Japanese lager from a company whose original brewery opened in Osaka.', averagePriceUsd: 5 },
  },
  taipei: {
    localDrink: { name: 'Bubble milk tea', blurb: 'Taiwanese milk tea shaken with chewy tapioca pearls.', averagePriceUsd: 3 },
    beer: { name: 'Taiwan Beer Gold Medal', blurb: 'Flagship Taiwanese lager widely served in Taipei.', averagePriceUsd: 3 },
  },
  'hong-kong': {
    localDrink: { name: 'Hong Kong milk tea', blurb: 'Strong black tea strained through cloth and mixed with evaporated milk.', averagePriceUsd: 3 },
    beer: { name: 'Gweilo Pale Ale', blurb: 'Citrusy pale ale produced by a Hong Kong craft brewery.', averagePriceUsd: 7 },
  },
  'chiang-mai': {
    localDrink: { name: 'Northern Thai coffee', blurb: 'Coffee grown in northern Thailand and served hot or over ice in Chiang Mai cafés.', averagePriceUsd: 2.5 },
    beer: { name: 'Singha', blurb: 'Established Thai pale lager widely available in Chiang Mai.', averagePriceUsd: 3 },
  },
  phuket: {
    localDrink: { name: 'Cha yen', blurb: 'Iced Thai tea sweetened with condensed milk.', averagePriceUsd: 2 },
    beer: { name: 'Chalawan Pale Ale', blurb: 'Tropical pale ale from Phuket-based Full Moon Brewworks.', averagePriceUsd: 5 },
  },
  'ho-chi-minh-city': {
    localDrink: { name: 'Cà phê sữa đá', blurb: 'Strong Vietnamese coffee with condensed milk poured over ice.', averagePriceUsd: 2 },
    beer: { name: 'Bia Saigon Special', blurb: 'Saigon-branded lager strongly associated with southern Vietnam.', averagePriceUsd: 2 },
  },
  lima: {
    localDrink: { name: 'Chicha morada', blurb: 'Peruvian purple-corn drink flavored with fruit and warm spices.', averagePriceUsd: 2 },
    beer: { name: 'Cusqueña Dorada', blurb: 'Peruvian golden lager commonly available in Lima.', averagePriceUsd: 3 },
  },
  delhi: {
    localDrink: { name: 'Masala chai', blurb: 'Black tea simmered with milk, sugar, and aromatic spices.', averagePriceUsd: 1 },
    beer: { name: 'Kingfisher Premium', blurb: 'Indian lager widely stocked in licensed Delhi restaurants and shops.', averagePriceUsd: 4 },
  },
  florence: {
    localDrink: { name: 'Espresso', blurb: 'Short, strong coffee served standing at the bar.', averagePriceUsd: 1.5 },
    beer: { name: 'Moretti', blurb: 'Italian pale lager widely poured in Florence bars.', averagePriceUsd: 5 },
  },
  venice: {
    localDrink: { name: 'Spritz', blurb: 'Aperol or Select spritz served with cicchetti.', averagePriceUsd: 6 },
    beer: { name: 'Birra Moretti', blurb: 'Easy-drinking Italian lager common in bacari.', averagePriceUsd: 5 },
  },
  porto: {
    localDrink: { name: 'White port and tonic', blurb: 'Refreshing Porto aperitif with tonic and citrus.', averagePriceUsd: 5 },
    beer: { name: 'Super Bock', blurb: 'Northern Portuguese lager strongly tied to Porto.', averagePriceUsd: 3 },
  },
  seville: {
    localDrink: { name: 'Tinto de verano', blurb: 'Red wine mixed with lemon soda over ice.', averagePriceUsd: 4 },
    beer: { name: 'Cruzcampo', blurb: 'Andalusian lager closely associated with Seville.', averagePriceUsd: 3.5 },
  },
  munich: {
    localDrink: { name: 'Apfelschorle', blurb: 'Apple juice mixed with sparkling water.', averagePriceUsd: 3.5 },
    beer: { name: 'Augustiner Helles', blurb: 'Classic Munich lager from a historic local brewery.', averagePriceUsd: 5 },
  },
  stockholm: {
    localDrink: { name: 'Filter coffee for fika', blurb: 'Strong drip coffee central to Swedish fika culture.', averagePriceUsd: 3.5 },
    beer: { name: 'Norrlands Guld', blurb: 'Popular Swedish lager found across Stockholm.', averagePriceUsd: 6 },
  },
  reykjavik: {
    localDrink: { name: 'Coffee', blurb: 'Strong café coffee from Reykjavík’s dense coffee scene.', averagePriceUsd: 5 },
    beer: { name: 'Gull', blurb: 'Mainstream Icelandic lager widely available in the capital.', averagePriceUsd: 9 },
  },
  krakow: {
    localDrink: { name: 'Kompot', blurb: 'House-made fruit drink served with many Polish meals.', averagePriceUsd: 2 },
    beer: { name: 'Żywiec', blurb: 'Popular Polish pale lager common in Kraków pubs.', averagePriceUsd: 3 },
  },
  dubrovnik: {
    localDrink: { name: 'Rakija', blurb: 'Fruit brandy often offered as a welcome drink.', averagePriceUsd: 4 },
    beer: { name: 'Ožujsko', blurb: 'Widely available Croatian pale lager.', averagePriceUsd: 4 },
  },
  zurich: {
    localDrink: { name: 'Rivella', blurb: 'Swiss whey soft drink found throughout Zurich.', averagePriceUsd: 3.5 },
    beer: { name: 'Calanda', blurb: 'Swiss lager commonly stocked in Zurich bars.', averagePriceUsd: 7 },
  },
  chicago: {
    localDrink: { name: 'Malört and soda', blurb: 'Bitter Chicago herbal liqueur often tried as a local rite.', averagePriceUsd: 7 },
    beer: { name: 'Goose Island 312', blurb: 'Wheat ale named for Chicago’s area code.', averagePriceUsd: 7 },
  },
  boston: {
    localDrink: { name: 'Dunkin’ iced coffee', blurb: 'Ubiquitous New England iced coffee run.', averagePriceUsd: 4 },
    beer: { name: 'Samuel Adams Boston Lager', blurb: 'Amber lager long associated with the city.', averagePriceUsd: 7 },
  },
  'las-vegas': {
    localDrink: { name: 'Frozen cocktail on the Strip', blurb: 'Giant yard-style mixed drink sold along the Strip.', averagePriceUsd: 18 },
    beer: { name: 'Tenaya Creek IPA', blurb: 'Local craft IPA from a Las Vegas brewery.', averagePriceUsd: 8 },
  },
  montreal: {
    localDrink: { name: 'Maple latte', blurb: 'Coffee sweetened with local maple syrup.', averagePriceUsd: 5 },
    beer: { name: 'La Fin du Monde', blurb: 'Belgian-style strong ale from Unibroue in Quebec.', averagePriceUsd: 8 },
  },
  cusco: {
    localDrink: { name: 'Coca tea', blurb: 'Mild herbal tea commonly used while acclimatizing.', averagePriceUsd: 1.5 },
    beer: { name: 'Cusqueña', blurb: 'Peruvian lager branded for the Cusco region.', averagePriceUsd: 3 },
  },
  cartagena: {
    localDrink: { name: 'Limonada de coco', blurb: 'Icy coconut-lime drink sold throughout the city.', averagePriceUsd: 3 },
    beer: { name: 'Águila', blurb: 'Colombian pale lager common on the Caribbean coast.', averagePriceUsd: 2.5 },
  },
  santiago: {
    localDrink: { name: 'Mote con huesillo', blurb: 'Sweet dried-peach drink with wheat mote.', averagePriceUsd: 2.5 },
    beer: { name: 'Kunstmann Torobayo', blurb: 'Amber ale from a well-known Chilean brewery.', averagePriceUsd: 5 },
  },
  'kuala-lumpur': {
    localDrink: { name: 'Teh tarik', blurb: 'Pulled milk tea poured for a frothy top.', averagePriceUsd: 1.5 },
    beer: { name: 'Tiger Beer', blurb: 'Regional lager widely available in Kuala Lumpur.', averagePriceUsd: 4 },
  },
  shanghai: {
    localDrink: { name: 'Soy milk with youtiao', blurb: 'Warm breakfast soy milk with fried dough.', averagePriceUsd: 2 },
    beer: { name: 'Tsingtao', blurb: 'Nationwide Chinese lager easy to find in Shanghai.', averagePriceUsd: 3 },
  },
  mumbai: {
    localDrink: { name: 'Cutting chai', blurb: 'Strong, small glass of milky spiced tea.', averagePriceUsd: 0.5 },
    beer: { name: 'Kingfisher Premium', blurb: 'Indian lager commonly available in licensed venues.', averagePriceUsd: 4 },
  },


  'washington-dc': {
    localDrink: { name: 'Cherry blossom lemonade', blurb: 'Seasonal pink lemonade tied to spring bloom festivals.', averagePriceUsd: 5 },
    beer: { name: 'DC Brau Public Ale', blurb: 'Local pale ale from a District brewery.', averagePriceUsd: 7 },
  },
  seattle: {
    localDrink: { name: 'Cafe latte', blurb: 'Classic Seattle espresso drink from the city’s coffee culture.', averagePriceUsd: 5 },
    beer: { name: 'Georgetown Manny’s Pale Ale', blurb: 'Widely poured Seattle pale ale.', averagePriceUsd: 7 },
  },
  'san-diego': {
    localDrink: { name: 'Horchata', blurb: 'Cinnamon rice drink common with local Mexican meals.', averagePriceUsd: 3.5 },
    beer: { name: 'Karl Strauss Red Trolley Ale', blurb: 'San Diego amber ale from a hometown brewery.', averagePriceUsd: 7 },
  },
  'new-orleans': {
    localDrink: { name: 'Café au lait with chicory', blurb: 'Chicory coffee with steamed milk, often with beignets.', averagePriceUsd: 4 },
    beer: { name: 'Abita Amber', blurb: 'Louisiana amber lager common around New Orleans.', averagePriceUsd: 6 },
  },
  nashville: {
    localDrink: { name: 'Sweet tea', blurb: 'Southern iced tea served very sweet.', averagePriceUsd: 3 },
    beer: { name: 'Yazoo Pale Ale', blurb: 'Nashville craft pale ale from Yazoo Brewing.', averagePriceUsd: 7 },
  },
  austin: {
    localDrink: { name: 'Frozen margarita', blurb: 'Icy tequila classic common on Austin patios.', averagePriceUsd: 10 },
    beer: { name: 'Austin Beerworks Pearl-Snap', blurb: 'Crisp German-style pilsner from Austin.', averagePriceUsd: 6 },
  },
  denver: {
    localDrink: { name: 'Colorado iced tea', blurb: 'Refreshing iced tea common after mountain days.', averagePriceUsd: 3.5 },
    beer: { name: 'Great Divide Titan IPA', blurb: 'Bold Denver IPA from Great Divide.', averagePriceUsd: 7 },
  },
  philadelphia: {
    localDrink: { name: 'Water ice', blurb: 'Italian ice treat sold throughout Philly summers.', averagePriceUsd: 4 },
    beer: { name: 'Victory Prima Pils', blurb: 'Crisp Pennsylvania pilsner widely available in Philly.', averagePriceUsd: 7 },
  },
  atlanta: {
    localDrink: { name: 'Coca-Cola (fountain)', blurb: 'Hometown soft drink tasting stop in Atlanta.', averagePriceUsd: 3 },
    beer: { name: 'SweetWater 420', blurb: 'Atlanta pale ale long associated with the city.', averagePriceUsd: 6 },
  },
  portland: {
    localDrink: { name: 'Stumptown cold brew', blurb: 'Portland-roasted cold brew coffee.', averagePriceUsd: 5 },
    beer: { name: 'Deschutes Fresh Squeezed IPA', blurb: 'Oregon IPA commonly poured in Portland.', averagePriceUsd: 7 },
  },
  phoenix: {
    localDrink: { name: 'Prickly pear lemonade', blurb: 'Cactus-fruit lemonade popular in the desert Southwest.', averagePriceUsd: 5 },
    beer: { name: 'Four Peaks Kilt Lifter', blurb: 'Scottish-style ale from an Arizona brewery.', averagePriceUsd: 6 },
  },
  charleston: {
    localDrink: { name: 'Sweet tea', blurb: 'Iced Southern sweet tea with Lowcountry meals.', averagePriceUsd: 3 },
    beer: { name: 'Holy City Pluff Mud Porter', blurb: 'Dark local porter from a Charleston brewery.', averagePriceUsd: 7 },
  },
  savannah: {
    localDrink: { name: 'Sweet tea', blurb: 'House sweet tea served across Savannah restaurants.', averagePriceUsd: 3 },
    beer: { name: 'Service Brewing IPA', blurb: 'Savannah craft IPA from a local brewery.', averagePriceUsd: 7 },
  },
  dallas: {
    localDrink: { name: 'Big Red soda', blurb: 'Texas cream soda often paired with barbecue.', averagePriceUsd: 3 },
    beer: { name: 'Deep Ellum IPA', blurb: 'Dallas craft IPA from Deep Ellum Brewing.', averagePriceUsd: 7 },
  },
  houston: {
    localDrink: { name: 'Mexican Coke', blurb: 'Bottle Coke with cane sugar common in Houston taquerías.', averagePriceUsd: 3 },
    beer: { name: 'Saint Arnold Fancy Lawnmower', blurb: 'Light Houston lager from Texas’s oldest craft brewery.', averagePriceUsd: 6 },
  },
  'key-west': {
    localDrink: { name: 'Key lime mojito', blurb: 'Mojito brightened with Key lime instead of plain lime.', averagePriceUsd: 12 },
    beer: { name: 'Key West Sunset Ale', blurb: 'Local Keys ale easy to find on Duval Street.', averagePriceUsd: 7 },
  },

  milan: {
    localDrink: { name: 'Aperol Spritz', blurb: 'Bright orange aperitif poured all over Milan’s bars.', averagePriceUsd: 8 },
    beer: { name: 'Birra Menabrea', blurb: 'Crisp Italian lager brewed in the Alps foothills.', averagePriceUsd: 6 },
  },
  naples: {
    localDrink: { name: 'Caffè sospeso', blurb: 'Espresso tradition of paying it forward for a stranger.', averagePriceUsd: 1.5 },
    beer: { name: 'Peroni Napoli', blurb: 'Southern Italian pale lager.', averagePriceUsd: 5 },
  },
  nice: {
    localDrink: { name: 'Citron pressé', blurb: 'Freshly squeezed lemonade mixed at the table.', averagePriceUsd: 4 },
    beer: { name: '1664', blurb: 'Widely poured French lager along the Riviera.', averagePriceUsd: 6 },
  },
  lyon: {
    localDrink: { name: 'Diabolo menthe', blurb: 'Mint syrup and lemonade favorite in local cafés.', averagePriceUsd: 3.5 },
    beer: { name: 'Brasserie Georges', blurb: 'House lager from Lyon’s historic brasserie.', averagePriceUsd: 6 },
  },
  marseille: {
    localDrink: { name: 'Pastis', blurb: 'Anise-flavored aperitif mixed with water over ice.', averagePriceUsd: 6 },
    beer: { name: 'La Cagole', blurb: 'Marseille-brewed pale lager.', averagePriceUsd: 6 },
  },
  brussels: {
    localDrink: { name: 'Belgian hot chocolate', blurb: 'Thick drinking chocolate from a chocolatier café.', averagePriceUsd: 5 },
    beer: { name: 'Trappist ale', blurb: 'Monastery-brewed abbey ale, a Belgian specialty.', averagePriceUsd: 7 },
  },
  bruges: {
    localDrink: { name: 'Hot spiced wine', blurb: 'Warm mulled wine sold at canal-side stalls.', averagePriceUsd: 5 },
    beer: { name: 'Brugse Zot', blurb: 'Bruges’s own city beer, brewed downtown.', averagePriceUsd: 6 },
  },
  warsaw: {
    localDrink: { name: 'Kompot', blurb: 'Traditional lightly sweet fruit drink.', averagePriceUsd: 2 },
    beer: { name: 'Żywiec', blurb: 'Widely poured Polish lager.', averagePriceUsd: 3 },
  },
  ljubljana: {
    localDrink: { name: 'Elderflower cordial', blurb: 'Homemade-style syrup drink common in cafés.', averagePriceUsd: 3 },
    beer: { name: 'Union', blurb: 'Ljubljana’s own city-brewed lager.', averagePriceUsd: 4 },
  },
  santorini: {
    localDrink: { name: 'Vinsanto', blurb: 'Sweet amber wine made from sun-dried Santorini grapes.', averagePriceUsd: 6 },
    beer: { name: 'Yellow Donkey', blurb: 'Craft lager brewed on the island.', averagePriceUsd: 6 },
  },
  mykonos: {
    localDrink: { name: 'Rakomelo', blurb: 'Warm raki sweetened with honey and spices.', averagePriceUsd: 6 },
    beer: { name: 'Mykonos Brewery lager', blurb: 'Craft beer made on the island.', averagePriceUsd: 7 },
  },
  oslo: {
    localDrink: { name: 'Solo', blurb: 'Norway’s classic citrus soda.', averagePriceUsd: 4 },
    beer: { name: 'Ringnes', blurb: 'Norway’s most common lager.', averagePriceUsd: 9 },
  },
  helsinki: {
    localDrink: { name: 'Glögi', blurb: 'Warm spiced Nordic mulled wine.', averagePriceUsd: 5 },
    beer: { name: 'Karhu', blurb: 'Popular Finnish lager.', averagePriceUsd: 8 },
  },
  valencia: {
    localDrink: { name: 'Horchata de chufa', blurb: 'Iced tiger-nut milk sipped with fartons pastry.', averagePriceUsd: 3 },
    beer: { name: 'Estrella Levante', blurb: 'Regional Spanish lager.', averagePriceUsd: 4 },
  },
  salzburg: {
    localDrink: { name: 'Almdudler', blurb: 'Austrian herbal soda served everywhere.', averagePriceUsd: 3 },
    beer: { name: 'Stiegl', blurb: 'Salzburg’s own long-brewed lager.', averagePriceUsd: 6 },
  },
  interlaken: {
    localDrink: { name: 'Rivella', blurb: 'Swiss soda made from milk whey.', averagePriceUsd: 4 },
    beer: { name: 'Rugenbräu', blurb: 'Local Interlaken-brewed lager.', averagePriceUsd: 7 },
  },
  beijing: {
    localDrink: { name: 'Suanmeitang', blurb: 'Sweet-and-sour smoked plum drink.', averagePriceUsd: 2 },
    beer: { name: 'Yanjing', blurb: 'Beijing’s own everyday lager.', averagePriceUsd: 3 },
  },
  chengdu: {
    localDrink: { name: 'Sour plum juice', blurb: 'Cooling drink to offset the local spice.', averagePriceUsd: 2 },
    beer: { name: 'Snow Beer', blurb: 'China’s best-selling light lager.', averagePriceUsd: 2.5 },
  },
  manila: {
    localDrink: { name: 'Calamansi juice', blurb: 'Tart Filipino citrus drink.', averagePriceUsd: 1.5 },
    beer: { name: 'San Miguel', blurb: 'The Philippines’ iconic pale pilsen.', averagePriceUsd: 2 },
  },
  cebu: {
    localDrink: { name: 'Buko juice', blurb: 'Fresh coconut water served straight from the shell.', averagePriceUsd: 1.5 },
    beer: { name: 'Red Horse', blurb: 'Strong Filipino lager popular island-wide.', averagePriceUsd: 2 },
  },
  'siem-reap': {
    localDrink: { name: 'Sugarcane juice', blurb: 'Pressed fresh at street carts around town.', averagePriceUsd: 1 },
    beer: { name: 'Angkor Beer', blurb: 'Cambodia’s most popular lager.', averagePriceUsd: 1.5 },
  },
  'phnom-penh': {
    localDrink: { name: 'Iced Cambodian coffee', blurb: 'Strong coffee with sweetened condensed milk.', averagePriceUsd: 1.5 },
    beer: { name: 'Cambodia Beer', blurb: 'Popular budget-friendly local lager.', averagePriceUsd: 1 },
  },
  kathmandu: {
    localDrink: { name: 'Masala chai', blurb: 'Spiced milk tea sold at every corner stall.', averagePriceUsd: 0.5 },
    beer: { name: 'Everest Beer', blurb: 'Nepal’s popular local lager.', averagePriceUsd: 3 },
  },
  jaipur: {
    localDrink: { name: 'Masala chai', blurb: 'Spiced milk tea from street stalls.', averagePriceUsd: 0.5 },
    beer: { name: 'Kingfisher', blurb: 'India’s most widely available lager.', averagePriceUsd: 3 },
  },
  goa: {
    localDrink: { name: 'Feni', blurb: 'Goa’s own cashew or coconut spirit.', averagePriceUsd: 3 },
    beer: { name: 'Kings Beer', blurb: 'Popular local Goan lager.', averagePriceUsd: 2.5 },
  },
  busan: {
    localDrink: { name: 'Sikhye', blurb: 'Sweet fermented rice punch.', averagePriceUsd: 2 },
    beer: { name: 'Cass', blurb: 'South Korea’s best-selling lager.', averagePriceUsd: 4 },
  },
  sapporo: {
    localDrink: { name: 'Hokkaido milk', blurb: 'Rich, famously creamy Hokkaido dairy milk.', averagePriceUsd: 3 },
    beer: { name: 'Sapporo Classic', blurb: 'Hokkaido-only draft version of Sapporo beer.', averagePriceUsd: 6 },
  },
  yogyakarta: {
    localDrink: { name: 'Wedang uwuh', blurb: 'Spiced herbal tea from Yogyakarta.', averagePriceUsd: 1.5 },
    beer: { name: 'Bintang', blurb: 'Indonesia’s most popular lager.', averagePriceUsd: 3 },
  },
  'tel-aviv': {
    localDrink: { name: 'Fresh pomegranate juice', blurb: 'Hand-pressed juice sold at market stalls.', averagePriceUsd: 4 },
    beer: { name: 'Goldstar', blurb: 'Israel’s classic dark lager.', averagePriceUsd: 6 },
  },
  jerusalem: {
    localDrink: { name: 'Sahlab', blurb: 'Warm, thick milk drink with cinnamon.', averagePriceUsd: 3 },
    beer: { name: 'Taybeh', blurb: 'Palestine’s own craft lager.', averagePriceUsd: 6 },
  },
  doha: {
    localDrink: { name: 'Karak chai', blurb: 'Strong, sweet spiced milk tea.', averagePriceUsd: 1 },
    beer: { name: 'Imported lager (hotel bars only)', blurb: 'Alcohol is limited to licensed hotel venues.', averagePriceUsd: 12 },
  },
  amman: {
    localDrink: { name: 'Fresh mint lemonade', blurb: 'Blended lemon-mint drink found citywide.', averagePriceUsd: 3 },
    beer: { name: 'Petra Beer', blurb: 'Jordan’s own locally brewed lager.', averagePriceUsd: 6 },
  },
  nairobi: {
    localDrink: { name: 'Dawa cocktail', blurb: 'Honey-lime vodka drink, Swahili for ’medicine’.', averagePriceUsd: 6 },
    beer: { name: 'Tusker', blurb: 'Kenya’s iconic safari-branded lager.', averagePriceUsd: 3 },
  },
  zanzibar: {
    localDrink: { name: 'Fresh coconut water', blurb: 'Served straight from the coconut at beach stalls.', averagePriceUsd: 1 },
    beer: { name: 'Kilimanjaro', blurb: 'Tanzania’s popular pale lager.', averagePriceUsd: 3 },
  },
  fes: {
    localDrink: { name: 'Moroccan mint tea', blurb: 'Sweet green tea poured from height, a daily ritual.', averagePriceUsd: 2 },
    beer: { name: 'Casablanca Beer', blurb: 'Morocco’s most common lager.', averagePriceUsd: 4 },
  },
  'sao-paulo': {
    localDrink: { name: 'Caipirinha', blurb: 'Brazil’s cachaça, lime, and sugar cocktail.', averagePriceUsd: 6 },
    beer: { name: 'Brahma', blurb: 'Widely poured Brazilian pilsner.', averagePriceUsd: 3 },
  },
  salvador: {
    localDrink: { name: 'Caipirinha de cupuaçu', blurb: 'Amazonian fruit twist on Brazil’s classic cocktail.', averagePriceUsd: 6 },
    beer: { name: 'Skol', blurb: 'Everyday light Brazilian lager.', averagePriceUsd: 3 },
  },
  medellin: {
    localDrink: { name: 'Colombian tinto', blurb: 'Small strong black coffee sold by street vendors.', averagePriceUsd: 0.5 },
    beer: { name: 'Club Colombia', blurb: 'Colombia’s well-regarded national lager.', averagePriceUsd: 3 },
  },
  quito: {
    localDrink: { name: 'Canelazo', blurb: 'Warm cinnamon-spiced sugarcane drink.', averagePriceUsd: 3 },
    beer: { name: 'Pilsener', blurb: 'Ecuador’s most popular everyday lager.', averagePriceUsd: 2.5 },
  },
  'san-jose-costa-rica': {
    localDrink: { name: 'Agua dulce', blurb: 'Warm drink made from raw sugarcane blocks.', averagePriceUsd: 2 },
    beer: { name: 'Imperial', blurb: 'Costa Rica’s iconic eagle-branded lager.', averagePriceUsd: 3 },
  },
  'punta-cana': {
    localDrink: { name: 'Morir Soñando', blurb: 'Orange juice and condensed milk blended drink.', averagePriceUsd: 3 },
    beer: { name: 'Presidente', blurb: 'The Dominican Republic’s iconic lager.', averagePriceUsd: 4 },
  },
  montevideo: {
    localDrink: { name: 'Mate', blurb: 'Shared herbal tea sipped from a gourd, a daily ritual.', averagePriceUsd: 2 },
    beer: { name: 'Pilsen', blurb: 'Uruguay’s most common everyday lager.', averagePriceUsd: 4 },
  },
  'panama-city': {
    localDrink: { name: 'Chicha de frutas', blurb: 'Fresh fruit juices blended with water and sugar.', averagePriceUsd: 2 },
    beer: { name: 'Balboa', blurb: 'Panama’s classic national lager.', averagePriceUsd: 3 },
  },
  nassau: {
    localDrink: { name: 'Sky Juice', blurb: 'Coconut water, gin, and condensed milk drink.', averagePriceUsd: 8 },
    beer: { name: 'Kalik', blurb: 'The Bahamas’ own island-brewed lager.', averagePriceUsd: 5 },
  },
  'montego-bay': {
    localDrink: { name: 'Sorrel drink', blurb: 'Spiced hibiscus drink, especially around the holidays.', averagePriceUsd: 3 },
    beer: { name: 'Red Stripe', blurb: 'Jamaica’s iconic national lager.', averagePriceUsd: 4 },
  },
  queenstown: {
    localDrink: { name: 'Central Otago pinot noir', blurb: 'Regionally famous wine from nearby vineyards.', averagePriceUsd: 9 },
    beer: { name: 'Speight’s', blurb: 'Popular South Island New Zealand lager.', averagePriceUsd: 7 },
  },
  'gold-coast': {
    localDrink: { name: 'Flat white', blurb: 'Australia’s smooth, strong espresso-milk coffee.', averagePriceUsd: 4.5 },
    beer: { name: 'XXXX Gold', blurb: 'Popular Queensland lager.', averagePriceUsd: 7 },
  },
  'quebec-city': {
    localDrink: { name: 'Caribou', blurb: 'Warming Québécois mix of red wine and whisky.', averagePriceUsd: 6 },
    beer: { name: 'Unibroue Blanche de Chambly', blurb: 'Well-known Quebec craft wheat beer.', averagePriceUsd: 7 },
  },
  calgary: {
    localDrink: { name: 'Caesar cocktail', blurb: 'Canadian brunch classic with clamato juice and vodka.', averagePriceUsd: 9 },
    beer: { name: 'Big Rock Traditional Ale', blurb: 'Well-known Calgary-brewed craft ale.', averagePriceUsd: 7 },
  },
  'san-antonio': {
    localDrink: { name: 'Micheladas', blurb: 'Spiced beer cocktail popular along the River Walk.', averagePriceUsd: 8 },
    beer: { name: 'Shiner Bock', blurb: 'Iconic Texas amber lager.', averagePriceUsd: 5 },
  },

};
