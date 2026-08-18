/**
 * Build-time Wikipedia thumbnail fetch so destination images can be prerendered
 * and painted with reserved dimensions instead of loading after hydration.
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

function loadCulturalIcons(source) {
  const marker = 'export const culturalIcons';
  const start = source.indexOf(marker);
  const after = source.slice(start + marker.length);
  const body = after.slice(after.indexOf('=') + 1).trim();
  const literal = body.slice(body.search(/[{]/));
  let depth = 0;
  let end = 0;
  for (let i = 0; i < literal.length; i += 1) {
    if (literal[i] === '{') depth += 1;
    if (literal[i] === '}') {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  return Function(`"use strict"; return (${literal.slice(0, end + 1)});`)();
}

async function fetchSummary(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) return null;
  return response.json();
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
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

const culturalIcons = loadCulturalIcons(
  await readFile(path.join(root, 'src/data/culturalIcons.ts'), 'utf8'),
);

const media = {};
let fetched = 0;
let reused = 0;
let missed = 0;

await mapPool(destinations, 6, async (destination) => {
  const icon = culturalIcons[destination.id];
  if (icon?.imageUrl) {
    media[destination.id] = {
      url: icon.imageUrl,
      pageUrl: icon.imagePageUrl ?? icon.imageUrl,
      alt: icon.label ?? destination.name,
    };
    reused += 1;
    return;
  }
  const title = icon?.title ?? destination.name;
  try {
    const summary = await fetchSummary(title);
    const url = summary?.thumbnail?.source ?? summary?.originalimage?.source;
    if (!url) {
      missed += 1;
      return;
    }
    media[destination.id] = {
      url,
      pageUrl: summary?.content_urls?.desktop?.page ?? url,
      alt: icon?.label ?? destination.name,
    };
    fetched += 1;
  } catch {
    missed += 1;
  }
});

const outPath = path.join(root, 'src/data/destinationMedia.json');
await writeFile(outPath, `${JSON.stringify(media, null, 2)}\n`, 'utf8');
console.log(
  `Wrote ${Object.keys(media).length} destination images (${reused} bundled, ${fetched} fetched, ${missed} missed) → ${path.relative(root, outPath)}`,
);
