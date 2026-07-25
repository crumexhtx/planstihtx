# Plansti
Trip planning and cost estimation website.

## Local development

```sh
npm install
npm run dev
```

`VITE_SITE_URL` is optional in development and defaults to
`http://localhost:5173`. Copy `.env.example` to `.env.local` when you need to
override it or configure other optional integrations.

## Production and Vercel

Canonical URLs, Open Graph URLs, `robots.txt`, and `sitemap.xml` are built from
the live origin `https://www.plansti.com`, which is the default for production
builds. Preview deployments use their own `VERCEL_URL` so they never claim the
live domain as canonical. Set `VITE_SITE_URL` to override either default.

1. Import the repository into Vercel.
2. Point the `www.plansti.com` domain at the project and redirect the apex
   `plansti.com` to it, so live URLs match the canonical tags.
3. Configure contact delivery:
   - `RESEND_API_KEY`: a Resend API key allowed to send from your domain.
   - `CONTACT_TO_EMAIL`: the mailbox that receives contact messages.
   - `CONTACT_FROM_EMAIL`: a sender on a domain verified in Resend, such as
     `Plansti <contact@example.com>`.
4. Optionally configure Sentry:
   - `VITE_SENTRY_DSN`: the public browser DSN. When present, Sentry initializes
     with a 2% traces sample rate, no default PII, and no session replay.
   - `SENTRY_DSN`: the server DSN used for unexpected `/api/contact` failures.
     Contact field values are not attached to those reports.
5. Enable Web Analytics in the Vercel project to receive page views and custom
   events from `@vercel/analytics`.
6. Deploy. `vercel.json` runs `npm run build` and publishes `dist`; Vercel also
   deploys TypeScript functions under `/api` (`/api/contact`, `/api/fx`,
   `/api/flights/search`).

Currency conversion calls same-origin `GET /api/fx`, which loads ECB reference
rates from Frankfurter, caches them in-memory on the function instance for six
hours, and falls back to built-in planning rates if the upstream feed fails.
No FX API key is required.

Optional live round-trip flight search uses Amadeus:
- `AMADEUS_CLIENT_ID` / `AMADEUS_CLIENT_SECRET` (required to enable live fares)
- `AMADEUS_API_HOST` (optional; defaults to `https://test.api.amadeus.com`)

When credentials are missing or the search fails, the planner keeps the
distance-based transport estimate. Live fares currently apply to single-city
round trips only.

Before promoting to production, open the Vercel preview URL, confirm canonical
and Open Graph URLs point at the preview origin, verify the social preview image
and analytics events, submit the contact form, and confirm the message is
actually delivered by Resend. Check both browser and server Sentry projects for
a clean preview run.

The build prerenders every supported route, creates `dist/404.html`, and
generates `dist/robots.txt` and `dist/sitemap.xml`. Vercel serves those files
directly; there is intentionally no catch-all rewrite to `index.html`, so
unknown URLs return the real 404 document instead of a soft 404.

The contact form sends same-origin JSON to `/api/contact`. It does not store
submissions in the browser. Local `vite` development does not emulate Vercel
Functions; use `vercel dev` with the three server-side contact variables when
testing end-to-end email delivery locally. In `npm run dev`, the currency
converter falls back to calling Frankfurter directly when `/api/fx` is absent.

Custom analytics cover destination selection and estimate engagement, currency
converter use, and contact submission outcomes. Events contain only coarse
interaction metadata such as destination IDs, currency codes, status codes, and
planner mode. Names, email addresses, message contents, exact budgets, converted
amounts, and expense details are not sent.

To verify a production build locally in PowerShell:

```powershell
npm run build
```
