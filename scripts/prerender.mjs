/**
 * Post-build prerender: writes per-route HTML with unique meta, JSON-LD,
 * and crawlable static content so city pages can rank before JS runs.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { resolveSiteUrl } from './resolveSiteUrl.mjs';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const siteUrl = resolveSiteUrl();

const defaultSocialImage = `${siteUrl}/og/plansti-social-preview.png`;
const defaultSocialImageAlt = 'Plansti — Explore more. Spend smarter.';

const MONTH_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function formatMonthList(months) {
  const labels = (months ?? [])
    .map((month) => MONTH_LABELS[month - 1])
    .filter(Boolean);
  if (labels.length === 0) return '';
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(', ')}, and ${labels[labels.length - 1]}`;
}

function formatSeasonalityHtml(destination) {
  const best = formatMonthList(destination.seasonality?.best);
  const cheapest = formatMonthList(destination.seasonality?.cheapest);
  const busiest = formatMonthList(destination.seasonality?.busiest);
  if (!best && !cheapest && !busiest) return '';

  const variants = [
    `Aim for ${best || 'shoulder months'} if you want the best overall window. ${cheapest ? `${cheapest} usually bring lower trip costs` : 'Off-peak dates usually cost less'}, while ${busiest || 'peak months'} draw the biggest crowds.`,
    `Travelers chasing value often prefer ${cheapest || 'quieter months'}, but the sweet spot for conditions is typically ${best || 'the shoulder season'}. Expect denser crowds in ${busiest || 'peak season'}.`,
    `Plan around ${best || 'balanced months'} for a smoother visit. Budget-minded trips lean toward ${cheapest || 'low season'}, and ${busiest || 'high season'} is when demand—and often fares—spike.`,
  ];
  const index =
    Math.abs(
      String(destination.id)
        .split('')
        .reduce((sum, char) => sum + char.charCodeAt(0), 0),
    ) % variants.length;

  return `<h2>Best time to visit ${escapeHtml(destination.name)}</h2><p>${escapeHtml(variants[index])}</p>`;
}

/** Matches calculateTripCost for 7 days / 2 travelers / 6 nights. */
function weekGroundTotal(destination) {
  const daily = Number(destination.dailyBudget) || 0;
  const lodging = daily * 0.38 * 6;
  const food = daily * 0.28 * 7 * 2;
  const localTransport = daily * 0.14 * 7 * 2;
  const activities = daily * 0.14 * 7 * 2;
  const contingency = daily * 0.06 * 7 * 2;
  return Math.round((lodging + food + localTransport + activities + contingency) * 100) / 100;
}

function formatCostSnapshotHtml(destination, mustTry) {
  const week = weekGroundTotal(destination);
  const cheapest = formatMonthList(destination.seasonality?.cheapest);
  const busiest = formatMonthList(destination.seasonality?.busiest);
  const samples = (mustTry ?? [])
    .slice(0, 3)
    .map(
      (dish) =>
        `<li><strong>${escapeHtml(dish.name)}</strong> — avg $${Number(dish.averagePriceUsd).toFixed(2)} USD</li>`,
    )
    .join('');
  return `<h2>How much does a trip to ${escapeHtml(destination.name)} cost?</h2>
    <p>A practical midrange budget for ${escapeHtml(destination.name)} is about $${destination.dailyBudget} USD per traveler per day. For a 7-day trip for two people, ground costs land around $${Math.round(week).toLocaleString('en-US')} USD before long-haul flights${cheapest ? `—usually cheapest in ${escapeHtml(cheapest)}` : ''}.</p>
    <ul>
      <li>Daily budget baseline: $${destination.dailyBudget} USD / traveler</li>
      <li>7 days for 2 people: ~$${Math.round(week).toLocaleString('en-US')} USD ground costs</li>
      <li>Usually cheapest: ${escapeHtml(cheapest || 'Varies')}</li>
      <li>Busiest months: ${escapeHtml(busiest || 'Varies')}</li>
    </ul>
    ${samples ? `<h3>Sample food prices</h3><ul>${samples}</ul>` : ''}
    <p>Ground-cost planning assumptions dated July 2026. Use the calculator to personalize origin, dates, and group size.</p>`;
}

const destinations = require(path.join(root, 'src/data/destinations.json'));
const destinationById = new Map(destinations.map((destination) => [destination.id, destination]));
const descriptions = await loadTsObjectExport(
  path.join(root, 'src/data/destinationDescriptions.ts'),
  'destinationDescriptions',
);
const explore = await loadTsObjectExport(
  path.join(root, 'src/data/destinationExplore.ts'),
  'destinationExplore',
);
const dishes = await loadTsObjectExport(
  path.join(root, 'src/data/destinationDishes.ts'),
  'destinationDishes',
);
const culturalIcons = await loadTsObjectExport(
  path.join(root, 'src/data/culturalIcons.ts'),
  'culturalIcons',
);
const comparisons = await loadTsCollectionExport(
  path.join(root, 'src/data/comparisons.ts'),
  'cityComparisons',
);

const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

const staticRoutes = [
  {
    routePath: '/',
    filePath: path.join(distDir, 'index.html'),
    title: '✈️ Plansti Value Travel — Free Trip Cost Calculator | Plansti',
    description:
      'See how expensive a trip will be before you book. Estimate flights, stays, food, and daily spend with Plansti’s free trip cost calculator.',
    body: homeBody(),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Plansti',
      url: siteUrl,
    },
  },
  {
    routePath: '/destinations',
    filePath: path.join(distDir, 'destinations', 'index.html'),
    title:
      '🌍 City Trip Cost Guides — How Expensive Is Each Destination? | Plansti',
    description:
      'Browse city trip cost guides and find out how expensive each destination is. Compare daily budgets, attractions, food prices, and trip cost calculators.',
    body: destinationsIndexBody(),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'City Trip Cost Guides',
      url: `${siteUrl}/destinations`,
    },
  },
  {
    routePath: '/compare',
    filePath: path.join(distDir, 'compare', 'index.html'),
    title: 'City Trip Cost Comparisons — Plansti',
    description:
      'Compare trip costs between popular city pairs, with 7-day ground estimates for two travelers and links to each city calculator.',
    body: compareIndexBody(),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'City Trip Cost Comparisons',
      url: `${siteUrl}/compare`,
    },
  },
  {
    routePath: '/about',
    filePath: path.join(distDir, 'about', 'index.html'),
    title: 'About — Plansti',
    description:
      'Learn how Plansti helps travelers estimate trip costs before booking.',
    body: `<main class="seo-static__panel"><h1>About Plansti</h1><p>We help travelers estimate trip costs before they book.</p></main>`,
    jsonLd: null,
  },
  {
    routePath: '/contact',
    filePath: path.join(distDir, 'contact', 'index.html'),
    title: 'Contact — Plansti',
    description:
      'Contact Plansti with feedback, destination suggestions, or questions about trip estimates.',
    body: `<main class="seo-static__panel"><h1>Contact</h1><p>Partner and traveler inquiries are welcome.</p></main>`,
    jsonLd: null,
  },
  {
    routePath: '/privacy',
    filePath: path.join(distDir, 'privacy', 'index.html'),
    title: 'Privacy — Plansti',
    description:
      'Learn what information Plansti processes and which service providers support the site.',
    body: `<main class="seo-static__panel"><h1>Privacy notice</h1><p>Learn how Plansti handles contact messages, browser preferences, hosting data, and third-party travel services.</p></main>`,
    jsonLd: null,
  },
  {
    routePath: '/partners',
    filePath: path.join(distDir, 'partners', 'index.html'),
    title: 'Partners — Plansti',
    description:
      'Advertise and affiliate with Plansti. Reach travelers who are actively estimating trip costs.',
    body: `<main class="seo-static__panel"><h1>Partners</h1><p>Plansti offers affiliate placements, sponsored city guides, and newsletter sponsorships for travel brands.</p><p>Email <a href="mailto:partners@plansti.com">partners@plansti.com</a> to talk inventory.</p></main>`,
    jsonLd: null,
  },
];

const notFoundRoute = {
  routePath: '/404',
  filePath: path.join(distDir, '404.html'),
  title: 'Page Not Found — Plansti',
  description: 'The Plansti page you requested could not be found.',
  body: `<main class="seo-static__panel"><p class="cost-summary__eyebrow">404 error</p><h1>That page could not be found</h1><p>The address may be incorrect, or the page may have moved.</p><p><a href="/">Open the calculator</a> or <a href="/destinations">browse city guides</a>.</p></main>`,
  jsonLd: null,
  canonical: false,
  noIndex: true,
};

for (const destination of destinations) {
  const info = explore[destination.id] ?? {};
  const description =
    descriptions[destination.id] ??
    `Estimate trip costs for ${destination.name}, ${destination.country}.`;
  const topAttractions = (info.topAttractions ?? []).slice(0, 5);
  const mustTry = dishes[destination.id] ?? [];

  const bestMonths = (destination.seasonality?.best ?? [])
    .map((month) => MONTH_LABELS[month - 1])
    .filter(Boolean);
  const bestTimePhrase =
    bestMonths.length > 0
      ? `Best time to visit ${destination.name}: ${formatMonthList(destination.seasonality.best)}.`
      : '';
  const metaDescription = [
    `Find the cost of a ${destination.name}, ${destination.country} trip. See how expensive it is to visit with Plansti’s trip cost calculator.`,
    bestTimePhrase,
    description,
  ]
    .filter(Boolean)
    .join(' ')
    .slice(0, 300);

  staticRoutes.push({
    routePath: `/destinations/${destination.id}`,
    filePath: path.join(distDir, 'destinations', destination.id, 'index.html'),
    title: `💰 How Expensive Is ${destination.name}? Trip Cost & Budget Calculator | Plansti`,
    description: metaDescription,
    body: destinationBody(destination, description, info, topAttractions, mustTry),
    image: culturalIcons[destination.id]?.imageUrl,
    imageAlt: culturalIcons[destination.id]?.imageUrl
      ? `${culturalIcons[destination.id].label} in ${destination.name}`
      : undefined,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      name: destination.name,
      description,
      url: `${siteUrl}/destinations/${destination.id}`,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: destination.lat,
        longitude: destination.lng,
      },
    },
  });
}

for (const comparison of comparisons) {
  const a = destinationById.get(comparison.aId);
  const b = destinationById.get(comparison.bId);
  if (!a || !b) continue;
  const metaDescription =
    `${a.name} vs ${b.name} trip cost: compare daily budgets and 7-day ground estimates for two travelers. ${comparison.summary}`.slice(
      0,
      300,
    );
  staticRoutes.push({
    routePath: `/compare/${comparison.slug}`,
    filePath: path.join(distDir, 'compare', comparison.slug, 'index.html'),
    title: `${a.name} vs ${b.name} Trip Cost — Plansti`,
    description: metaDescription,
    body: compareBody(comparison, a, b),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${a.name} vs ${b.name} Trip Cost`,
      description: comparison.summary,
      url: `${siteUrl}/compare/${comparison.slug}`,
    },
  });
}

for (const route of staticRoutes) {
  await mkdir(path.dirname(route.filePath), { recursive: true });
  await writeFile(route.filePath, renderHtml(route), 'utf8');
}

await writeFile(notFoundRoute.filePath, renderHtml(notFoundRoute), 'utf8');
await writeFile(
  path.join(distDir, 'sitemap.xml'),
  buildSitemap(staticRoutes.map((route) => route.routePath)),
  'utf8',
);
await writeFile(
  path.join(distDir, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
  'utf8',
);

console.log(`Prerendered ${staticRoutes.length} routes → dist/`);

function renderHtml(route) {
  const canonical =
    route.canonical === false
      ? null
      : `${siteUrl}${route.routePath === '/' ? '/' : route.routePath}`;
  let html = template;
  const socialImage = route.image ?? defaultSocialImage;
  const socialImageAlt = route.imageAlt ?? defaultSocialImageAlt;
  html = replaceTag(
    html,
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(route.title)}</title>`,
  );
  html = upsertMeta(html, 'name', 'description', route.description);
  html = upsertMeta(html, 'property', 'og:title', route.title);
  html = upsertMeta(html, 'property', 'og:description', route.description);
  html = upsertMeta(html, 'property', 'og:type', 'website');
  html = upsertMeta(html, 'property', 'og:site_name', 'Plansti');
  html = upsertMeta(
    html,
    'property',
    'og:url',
    canonical ?? `${siteUrl}${route.routePath}`,
  );
  html = upsertMeta(html, 'property', 'og:image', socialImage);
  if (!route.image) {
    html = upsertMeta(html, 'property', 'og:image:width', '1200');
    html = upsertMeta(html, 'property', 'og:image:height', '630');
  }
  html = upsertMeta(html, 'property', 'og:image:alt', socialImageAlt);
  html = upsertMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = upsertMeta(html, 'name', 'twitter:title', route.title);
  html = upsertMeta(html, 'name', 'twitter:description', route.description);
  html = upsertMeta(html, 'name', 'twitter:image', socialImage);
  html = upsertMeta(html, 'name', 'twitter:image:alt', socialImageAlt);
  if (canonical) {
    html = upsertLink(html, 'canonical', canonical);
  }
  if (route.noIndex) {
    html = upsertMeta(html, 'name', 'robots', 'noindex, nofollow');
  }

  const jsonLd = route.jsonLd
    ? `<script type="application/ld+json">${JSON.stringify(route.jsonLd)}</script>`
    : '';
  const seoBlock = `
    <div id="seo-static" class="seo-static">
      ${route.body}
      <p class="seo-static__app-note">Loading the interactive trip planner…</p>
    </div>
    ${jsonLd}
  `;

  if (html.includes('<div id="root"></div>')) {
    html = html.replace(
      '<div id="root"></div>',
      `${seoBlock}<div id="root"></div>`,
    );
  } else {
    html = html.replace('</body>', `${seoBlock}</body>`);
  }
  return html;
}

function homeBody() {
  const cards = destinations
    .slice(0, 8)
    .map(
      (destination) =>
        `<li><a href="/destinations/${destination.id}">${escapeHtml(destination.name)}, ${escapeHtml(destination.country)}</a></li>`,
    )
    .join('');
  return `<main class="seo-static__panel"><h1>Estimate your trip cost before you book</h1><p>Use the general calculator or open a city guide with attractions, dishes, and a dedicated cost estimate.</p><h2>Popular destinations</h2><ul>${cards}</ul></main>`;
}

function destinationsIndexBody() {
  const cards = destinations
    .map(
      (destination) =>
        `<li><a href="/destinations/${destination.id}"><strong>${escapeHtml(destination.name)}</strong> — ${escapeHtml(destination.country)} (from $${destination.dailyBudget}/day)</a></li>`,
    )
    .join('');
  return `<main class="seo-static__panel"><h1>City trip cost guides</h1><ul>${cards}</ul></main>`;
}

function destinationBody(destination, description, info, topAttractions, mustTry) {
  const attractions = topAttractions
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.name)}</strong> — ${escapeHtml(item.blurb)}</li>`,
    )
    .join('');
  const food = mustTry
    .map(
      (dish) =>
        `<li><strong>${escapeHtml(dish.name)}</strong> — ${escapeHtml(dish.blurb)} (avg $${Number(dish.averagePriceUsd).toFixed(2)})</li>`,
    )
    .join('');
  const seasonality = formatSeasonalityHtml(destination);
  const costSnapshot = formatCostSnapshotHtml(destination, mustTry);
  const foodLead =
    mustTry.length > 0
      ? `<p>Must-try food in ${escapeHtml(destination.name)} usually includes ${escapeHtml(
          mustTry
            .slice(0, 3)
            .map((dish) => dish.name)
            .join(', '),
        )}. Typical plates below help you budget meals before you go.</p>`
      : '';
  return `<main class="seo-static__panel">
    <h1>${escapeHtml(destination.name)} trip cost estimate</h1>
    <p>${escapeHtml(description)}</p>
    <p>Daily budget baseline: $${destination.dailyBudget} USD. ${escapeHtml(info.bestFor ?? '')}</p>
    ${costSnapshot}
    ${seasonality}
    <h2>Top attractions in ${escapeHtml(destination.name)}</h2>
    <ol>${attractions || '<li>Coming soon</li>'}</ol>
    <h2>Must-try food in ${escapeHtml(destination.name)}</h2>
    ${foodLead}
    <ul>${food || '<li>Coming soon</li>'}</ul>
    <p><a href="/destinations/${destination.id}#trip-calculator">Jump to the ${escapeHtml(destination.name)} calculator</a> or <a href="/">open the general calculator</a></p>
  </main>`;
}

function compareIndexBody() {
  const cards = (comparisons ?? [])
    .map((comparison) => {
      const a = destinationById.get(comparison.aId);
      const b = destinationById.get(comparison.bId);
      if (!a || !b) return '';
      return `<li><a href="/compare/${comparison.slug}"><strong>${escapeHtml(a.name)} vs ${escapeHtml(b.name)}</strong> — ${escapeHtml(comparison.theme)}</a></li>`;
    })
    .join('');
  return `<main class="seo-static__panel"><h1>City trip cost comparisons</h1><p>Side-by-side planning estimates for popular city pairs.</p><ul>${cards}</ul></main>`;
}

function compareBody(comparison, a, b) {
  const aWeek = weekGroundTotal(a);
  const bWeek = weekGroundTotal(b);
  return `<main class="seo-static__panel">
    <h1>${escapeHtml(a.name)} vs ${escapeHtml(b.name)} trip cost</h1>
    <p>${escapeHtml(comparison.summary)}</p>
    <h2>Ground costs for 2 travelers, 7 days</h2>
    <ul>
      <li>${escapeHtml(a.name)}: $${a.dailyBudget}/day baseline · ~$${Math.round(aWeek).toLocaleString('en-US')} USD for 7 days</li>
      <li>${escapeHtml(b.name)}: $${b.dailyBudget}/day baseline · ~$${Math.round(bWeek).toLocaleString('en-US')} USD for 7 days</li>
    </ul>
    <h2>When to pick each city</h2>
    <p><strong>Choose ${escapeHtml(a.name)}:</strong> ${escapeHtml(comparison.pickA)}</p>
    <p><strong>Choose ${escapeHtml(b.name)}:</strong> ${escapeHtml(comparison.pickB)}</p>
    <h2>Verdict</h2>
    <p>${escapeHtml(comparison.verdict)}</p>
    <p><a href="/destinations/${a.id}">${escapeHtml(a.name)} calculator</a> · <a href="/destinations/${b.id}">${escapeHtml(b.name)} calculator</a></p>
  </main>`;
}

function buildSitemap(routes) {
  const urls = routes
    .map(
      (routePath) =>
        `  <url><loc>${siteUrl}${routePath === '/' ? '/' : routePath}</loc></url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function upsertMeta(html, attr, key, content) {
  const pattern = new RegExp(
    `<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`,
    'i',
  );
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function upsertLink(html, rel, href) {
  const pattern = new RegExp(`<link\\s+rel="${rel}"\\s+href="[^"]*"\\s*/?>`, 'i');
  const tag = `<link rel="${rel}" href="${escapeAttr(href)}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function replaceTag(html, pattern, next) {
  return pattern.test(html)
    ? html.replace(pattern, next)
    : html.replace('</head>', `${next}</head>`);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("'", '&#39;');
}

async function loadTsObjectExport(filePath, exportName) {
  return loadTsCollectionExport(filePath, exportName, '{}');
}

async function loadTsCollectionExport(filePath, exportName, fallback = '[]') {
  const source = await readFile(filePath, 'utf8');
  const marker = `export const ${exportName}`;
  const start = source.indexOf(marker);
  if (start === -1) return Function(`"use strict"; return (${fallback});`)();
  const after = source.slice(start + marker.length);
  const eq = after.indexOf('=');
  let body = after.slice(eq + 1).trim();
  // Skip TypeScript type annotations: `: Type[] =` already consumed at `=`.
  const openIndex = body.search(/[\[{]/);
  if (openIndex === -1) return Function(`"use strict"; return (${fallback});`)();
  body = body.slice(openIndex);
  const end = findMatchingBracket(body);
  const literal = body.slice(0, end + 1);
  try {
    return Function(`"use strict"; return (${literal});`)();
  } catch (error) {
    console.warn(`Failed to parse ${exportName} from ${filePath}`, error);
    return Function(`"use strict"; return (${fallback});`)();
  }
}

function findMatchingBracket(text) {
  const open = text[0];
  const close = open === '[' ? ']' : '}';
  let depth = 0;
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === open) depth += 1;
    if (text[i] === close) {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return text.length - 1;
}
