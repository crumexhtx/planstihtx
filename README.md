# Plansti

[![CI](https://github.com/crumexhtx/planstihtx/actions/workflows/ci.yml/badge.svg)](https://github.com/crumexhtx/planstihtx/actions/workflows/ci.yml)

Live site: [plansti.com](https://plansti.com)

Plansti is a trip cost planner for people who want a realistic total before they open a dozen booking tabs. Travelers pick an origin and destination, then get one planning estimate for transport, lodging, food, local transit, activities, and a contingency buffer.

![Plansti social preview](public/og/plansti-social-preview.png)

## The problem

Trip cost is usually scattered across flight search, hotel sites, food blogs, and a spreadsheet. Plansti turns that into a single, shareable planning number—with the caveat that it is an estimate, not a live fare quote.

Try the sample walkthrough: a Houston → Tokyo week for two travelers, then [Tokyo vs Seoul](https://plansti.com/compare/tokyo-vs-seoul).

## What it does

- Single-city and multi-city trip estimates
- Destination guides with seasonal airfare windows, attractions, and food prices
- Side-by-side city comparisons
- Currency conversion using ECB reference rates, with labeled planning fallbacks
- Shareable planner URLs (`origin`, `destination`, `days`, `travelers`)

## Stack

- React 19, TypeScript, Vite
- React Router for city, compare, and static pages
- MapLibre for the destination map
- Vercel Functions for `/api/contact` (Resend) and `/api/fx` (Frankfurter / ECB)
- Vitest for unit tests, Playwright for the sample-trip path
- Vercel Analytics and optional Sentry, with no session replay and no contact PII in events

## Architecture

The browser owns the planner. Destination baselines, group size, room sharing, dates, and transport distance go through a cost engine in `src/utils/costEngine.ts`. City and comparison routes are prerendered after `vite build` so search engines get real HTML, canonical tags, Open Graph data, JSON-LD, `robots.txt`, and `sitemap.xml`.

Server work stays small:

- `GET /api/fx` loads ECB rates, caches them in memory for six hours, and falls back to built-in planning rates
- `POST /api/contact` validates input, rate-limits, and sends email through Resend

Unknown URLs return a real 404 document. There is no SPA catch-all rewrite.

## Design decisions

- **Estimates over live booking.** Totals are planning figures. The UI says so, including FX source labels.
- **Prerender plus a client planner.** City pages need to rank; the calculator still has to feel interactive.
- **Group size is not linear.** Lodging is priced per room (two travelers share). Food, transit, activities, and contingency scale per person.
- **Share the query string, not a backend trip record.** A URL like `/destinations/tokyo?origin=houston&days=7&travelers=2` is enough to reopen a plan.
- **Fail visibly.** Maps, weather, FX, and contact each have an explicit fallback or error state.

## Tests

```sh
npm test
npm run test:e2e
```

Unit tests cover the cost engine, FX cache, contact validation, SEO helpers, and planner query parsing. Playwright covers the homepage “Try a sample trip” path into the Tokyo calculator.

CI runs `npm test`, `npm run build`, and the Playwright spec on every push and pull request.

## Local development

```sh
npm install
npx playwright install chromium
npm run dev
```

`VITE_SITE_URL` is optional in development and defaults to `http://localhost:5173`. Copy `.env.example` to `.env.local` when you need to override it or configure other optional integrations.

Local `vite` does not emulate Vercel Functions. The currency converter calls Frankfurter directly when `/api/fx` is missing. Use `vercel dev` with the contact environment variables to test email delivery.

## Production and Vercel

Canonical URLs, Open Graph URLs, `robots.txt`, and `sitemap.xml` are built from the live origin `https://plansti.com`. Preview deployments use their own `VERCEL_URL` so they never claim the live domain as canonical. Set `VITE_SITE_URL` to override either default.

1. Import the repository into Vercel.
2. Point `plansti.com` at the project as the primary domain and redirect `www.plansti.com` to it.
3. Configure contact delivery:
   - `RESEND_API_KEY`: a Resend API key allowed to send from your domain.
   - `CONTACT_TO_EMAIL`: the mailbox that receives contact messages.
   - `CONTACT_FROM_EMAIL`: a sender on a domain verified in Resend.
4. Optionally configure Sentry:
   - `VITE_SENTRY_DSN`: browser DSN (2% traces, no default PII, no session replay).
   - `SENTRY_DSN`: server DSN for unexpected `/api/contact` failures.
5. Enable Web Analytics in the Vercel project.
6. Deploy. `vercel.json` runs `npm run build` and publishes `dist`; Vercel also deploys TypeScript functions under `/api`.

Before promoting to production, open the preview URL, confirm canonical and Open Graph URLs, submit the contact form, and check Sentry.

### Verify after deploy

Replace `<preview-url>` with the Vercel preview origin (no trailing slash):

```sh
curl -i https://<preview-url>/api/fx
curl -i -X GET https://<preview-url>/api/contact
```

`/api/fx` should return **200** with a JSON body (`source` of `live`, `cached`, or `estimate`). `GET /api/contact` should return **405**, not 500.

Custom analytics cover destination selection, estimate engagement, currency converter use, and contact outcomes. Events contain only coarse metadata such as destination IDs, currency codes, status codes, and planner mode.

To verify a production build locally in PowerShell:

```powershell
npm run build
```
