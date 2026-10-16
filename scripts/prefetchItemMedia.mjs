/**
 * Build-time Wikipedia pageimage lookup for destination heroes, galleries,
 * attractions, dishes, and drinks. Uses exact titles only — no free-text search
 * and no bare city-name fallback.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destinations = require(path.join(root, 'src/data/destinations.json'));
const USER_AGENT =
  'PlanstiBot/1.0 (https://plansti.com; destination image prefetch for static pages)';
const REJECT_FILE =
  /(logo|flag_of|coat_of_arms|map|locator|location|marker|seal_of|\.svg)/i;
const API = 'https://en.wikipedia.org/w/api.php';

const stats = {
  resolved: 0,
  rejected: 0,
  missing: 0,
  reasons: {},
};

function countReason(reason) {
  stats.reasons[reason] = (stats.reasons[reason] ?? 0) + 1;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stripHtml(value) {
  return String(value ?? '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function fileNameFromUrl(url) {
  try {
    const decoded = decodeURIComponent(new URL(url).pathname);
    const base = decoded.split('/').at(-1) ?? '';
    return base.replace(/^\d+px-/, '');
  } catch {
    return url;
  }
}

function isRejectedFilename(filename) {
  if (!filename) return true;
  const lower = filename.toLowerCase();
  return lower.endsWith('.gif') || REJECT_FILE.test(filename);
}

function isPersonPage(categories = []) {
  return categories.some((category) => {
    const title = String(category.title ?? '').toLowerCase();
    return (
      title.includes('living people') ||
      title.includes('births') ||
      title.includes('deaths')
    );
  });
}

async function loadTsObjectExport(filePath, exportName, fallback = '{}') {
  const source = await readFile(filePath, 'utf8');
  const marker = `export const ${exportName}`;
  const start = source.indexOf(marker);
  if (start === -1) return Function(`"use strict"; return (${fallback});`)();
  const after = source.slice(start + marker.length);
  const eq = after.indexOf('=');
  let body = after.slice(eq + 1).trim();
  const openIndex = body.search(/[\[{]/);
  if (openIndex === -1) return Function(`"use strict"; return (${fallback});`)();
  body = body.slice(openIndex);
  const open = body[0];
  const close = open === '[' ? ']' : '}';
  let depth = 0;
  let end = body.length - 1;
  for (let i = 0; i < body.length; i += 1) {
    if (body[i] === open) depth += 1;
    if (body[i] === close) {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  return Function(`"use strict"; return (${body.slice(0, end + 1)});`)();
}

const requestTimes = [];

async function wikipediaGet(params) {
  const url = new URL(API);
  url.search = new URLSearchParams({
    format: 'json',
    formatversion: '2',
    origin: '*',
    ...params,
  }).toString();

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const elapsed = Date.now() - (requestTimes.at(-1) ?? 0);
    if (elapsed < 350) await sleep(350 - elapsed);
    requestTimes.push(Date.now());

    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
      signal: AbortSignal.timeout(12000),
    });

    if (response.status === 429) {
      const retryAfter = Number(response.headers.get('retry-after')) || 2 ** attempt;
      console.warn(`429 for ${params.titles}; waiting ${retryAfter}s`);
      await sleep(retryAfter * 1000);
      continue;
    }
    if (!response.ok) {
      throw new Error(`Wikipedia ${response.status} for ${params.titles}`);
    }
    return response.json();
  }
  throw new Error(`Wikipedia 429 retries exhausted for ${params.titles}`);
}

async function mapPool(items, limit, mapper) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await mapper(items[index], index);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker),
  );
  return results;
}

async function lookupTitle(title) {
  const data = await wikipediaGet({
    action: 'query',
    redirects: '1',
    titles: title,
    prop: 'pageimages|pageprops|categories|info',
    inprop: 'url',
    pithumbsize: '1200',
    pilicense: 'any',
    cllimit: '50',
  });
  const page = data?.query?.pages?.[0];
  if (!page || page.missing || page.invalid) {
    return { image: null, reason: 'missing' };
  }
  if (page.pageprops && 'disambiguation' in page.pageprops) {
    return { image: null, reason: 'disambiguation' };
  }
  if (isPersonPage(page.categories)) {
    return { image: null, reason: 'person-category' };
  }
  const thumb = page.thumbnail?.source;
  const filename = page.pageimage || (thumb ? fileNameFromUrl(thumb) : '');
  if (!thumb || isRejectedFilename(filename)) {
    return { image: null, reason: 'rejected-file' };
  }

  let author = 'Wikimedia Commons';
  let license = 'Wikipedia';
  let pageUrl =
    page.fullurl ?? `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title)}`;
  let url = thumb;

  if (filename) {
    try {
      const fileData = await wikipediaGet({
        action: 'query',
        titles: `File:${filename}`,
        prop: 'imageinfo',
        iiprop: 'url|extmetadata|mime',
        iiurlwidth: '1200',
      });
      const filePage = fileData?.query?.pages?.[0];
      const info = filePage?.imageinfo?.[0];
      if (info?.mime && (info.mime === 'image/svg+xml' || info.mime === 'image/gif')) {
        return { image: null, reason: 'rejected-file' };
      }
      if (info?.thumburl || info?.url) {
        url = info.thumburl ?? info.url;
      }
      if (info?.descriptionurl) pageUrl = info.descriptionurl;
      const meta = info?.extmetadata ?? {};
      const artist = stripHtml(meta.Artist?.value);
      const credit = stripHtml(meta.Credit?.value);
      author = artist || credit || author;
      license = stripHtml(meta.LicenseShortName?.value) || license;
    } catch {
      // Thumbnail from pageimages is still usable without credits.
    }
  }

  if (isRejectedFilename(fileNameFromUrl(url))) {
    return { image: null, reason: 'rejected-file' };
  }

  return {
    image: {
      url,
      pageUrl,
      alt: page.title,
      author,
      license,
    },
    reason: 'ok',
  };
}

async function resolveExactTitles(titles, context) {
  const seen = new Set();
  for (const title of titles) {
    const trimmed = String(title ?? '').trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    const { image, reason } = await lookupTitle(trimmed);
    if (image) {
      stats.resolved += 1;
      return image;
    }
    stats.rejected += 1;
    countReason(`${context}:${reason}`);
  }
  stats.missing += 1;
  countReason(`${context}:missing`);
  return null;
}

function itemTitles(item, cityName) {
  const name = item?.name ?? '';
  const wikiTitle = item?.wikiTitle;
  return [
    wikiTitle || name,
    name && cityName ? `${name}, ${cityName}` : '',
    name && cityName ? `${name} (${cityName})` : '',
  ];
}

const explore = await loadTsObjectExport(
  path.join(root, 'src/data/destinationExplore.ts'),
  'destinationExplore',
);
const dishes = await loadTsObjectExport(
  path.join(root, 'src/data/destinationDishes.ts'),
  'destinationDishes',
);
const beverages = await loadTsObjectExport(
  path.join(root, 'src/data/destinationBeverages.ts'),
  'destinationBeverages',
);
const culturalIcons = await loadTsObjectExport(
  path.join(root, 'src/data/culturalIcons.ts'),
  'culturalIcons',
);

const destinationMedia = {};
const itemMedia = {};

console.log(`Prefetching media for ${destinations.length} destinations…`);

await mapPool(destinations, 2, async (destination) => {
  const icon = culturalIcons[destination.id];
  const info = explore[destination.id] ?? { topAttractions: [] };
  const cityDishes = dishes[destination.id] ?? [];
  const drinks = beverages[destination.id];

  let hero = null;
  if (icon?.imageUrl) {
    hero = {
      url: icon.imageUrl,
      pageUrl: icon.imagePageUrl ?? icon.imageUrl,
      alt: icon.label ?? destination.name,
      author: 'Wikimedia Commons',
      license: 'CC BY-SA',
    };
    stats.resolved += 1;
  } else {
    hero = await resolveExactTitles(
      [icon?.title, `${destination.name}, ${destination.country}`].filter(Boolean),
      `hero:${destination.id}`,
    );
  }
  if (hero) {
    destinationMedia[destination.id] = {
      url: hero.url,
      pageUrl: hero.pageUrl,
      alt: hero.alt,
    };
  }

  const gallery = [];
  const cityPhoto = await resolveExactTitles(
    [
      `${destination.name}, ${destination.country}`,
      icon?.title && icon.title !== destination.name ? icon.title : '',
    ].filter(Boolean),
    `gallery:${destination.id}`,
  );
  if (cityPhoto && cityPhoto.url !== hero?.url) {
    gallery.push(cityPhoto);
  }

  const attractions = {};
  for (const attraction of info.topAttractions ?? []) {
    attractions[attraction.name] = await resolveExactTitles(
      itemTitles(attraction, destination.name),
      `attraction:${destination.id}|${attraction.name}`,
    );
  }

  const dishImages = {};
  for (const dish of cityDishes) {
    dishImages[dish.name] = await resolveExactTitles(
      itemTitles(dish, destination.name),
      `dish:${destination.id}|${dish.name}`,
    );
  }

  const drink = drinks?.localDrink
    ? await resolveExactTitles(
        itemTitles(drinks.localDrink, destination.name),
        `drink:${destination.id}|${drinks.localDrink.name}`,
      )
    : null;
  const beer = drinks?.beer
    ? await resolveExactTitles(
        itemTitles(drinks.beer, destination.name),
        `beer:${destination.id}|${drinks.beer.name}`,
      )
    : null;

  itemMedia[destination.id] = {
    gallery,
    attractions,
    dishes: dishImages,
    drink,
    beer,
  };

  const resolvedItems = [
    ...Object.values(attractions),
    ...Object.values(dishImages),
    drink,
    beer,
    ...gallery,
  ].filter(Boolean).length;
  console.log(
    `  ${destination.id}: hero ${hero ? 'yes' : 'no'}, gallery ${gallery.length}, items ${resolvedItems}`,
  );
});

const mediaPath = path.join(root, 'src/data/destinationMedia.json');
const itemPath = path.join(root, 'src/data/itemMedia.json');
await writeFile(mediaPath, `${JSON.stringify(destinationMedia, null, 2)}\n`, 'utf8');
await writeFile(itemPath, `${JSON.stringify(itemMedia, null, 2)}\n`, 'utf8');

console.log('\nWrote destination heroes and item catalog.');
console.log(
  `Summary: ${stats.resolved} resolved, ${stats.rejected} rejected lookups, ${stats.missing} missing after fallbacks`,
);
console.log('Reject / miss reasons:');
for (const [reason, count] of Object.entries(stats.reasons).sort(
  (a, b) => b[1] - a[1],
)) {
  console.log(`  ${count}\t${reason}`);
}
console.log(
  `Files → ${path.relative(root, mediaPath)}, ${path.relative(root, itemPath)}`,
);
