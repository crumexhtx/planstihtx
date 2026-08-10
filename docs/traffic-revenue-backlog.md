# Plansti — 5-Month Traffic & Revenue Backlog

Goal: grow organic traffic hard for ~5 months, then turn on live affiliate monetization.

North-star metrics (track weekly):
- Organic sessions (total + by city page)
- Email signups
- City-page engagement (scroll / calculator starts)
- Affiliate CTA click-through (even before commissions)

---

## Phase 1 — Foundation (Month 1)

### Technical SEO (do first)
- [ ] Ship prerender/revenue branch to production domain
- [x] Canonical origin set to `https://plansti.com`
- [x] Fix stale `bugetroamers.example` public robots/sitemap placeholders
- [x] Wire `/partners` route + Plansti partner email
- [x] Gate placeholder affiliate `/out` CTAs until live programs are ready
- [ ] Submit `sitemap.xml` in Google Search Console + Bing Webmaster
- [ ] Verify mobile layout + page speed on top 5 city pages
- [x] Add basic analytics (Vercel Analytics + CTA/interaction events)

### City page content quality (existing catalog)
Upgrade each page beyond template feel: unique intro, budget notes, seasonal tips.

**Wave A — publish/polish first (highest traffic potential)**
1. `tokyo` — deeper intro shipped
2. `paris` — deeper intro shipped
3. `bali` — deeper intro shipped
4. `bangkok` — deeper intro shipped
5. `london` — deeper intro shipped
6. `rome` — deeper intro shipped
7. `new-york` — deeper intro shipped
8. `mexico-city` — deeper intro shipped

**Wave B — next**
9. `barcelona`
10. `lisbon`
11. `dubai`
12. `seoul`
13. `amsterdam`
14. `istanbul`
15. `cancun`
16. `singapore`

**Wave C — finish catalog**
17. `hanoi`
18. `budapest`
19. `marrakech`
20. `cairo`
21. `sydney`
22. `los-angeles`
23. `rio-de-janeiro`
24. `buenos-aires`
25. `cape-town`
26. `orlando`

Definition of done per city:
- Unique 150–300 word intro (not generic)
- Top 5 attractions feel specific
- 2 dishes + realistic average prices
- Clear “who this trip is for” line
- Working calculator + currency tracker
- Title/meta include “trip cost” intent

---

## Phase 2 — Traffic engine (Months 2–3)

### Comparison pages to build (high SEO value)
Create `/compare/:slug` pages that link into both city calculators.

Priority comparisons:
1. `tokyo-vs-seoul` — East Asia first-timer costs
2. `paris-vs-rome` — classic Europe
3. `bali-vs-bangkok` — warm-weather budget trip
4. `london-vs-amsterdam` — short Europe break
5. `mexico-city-vs-cancun` — Mexico city vs beach
6. `new-york-vs-los-angeles` — US coasts
7. `lisbon-vs-barcelona` — sunny Europe value
8. `dubai-vs-singapore` — hub-city luxury-leaning
9. `hanoi-vs-bangkok` — SE Asia backpacker
10. `cape-town-vs-cairo` — Africa highlight trip

Each comparison page should include:
- 7-day cost estimate range for 2 travelers
- When to pick A vs B
- Links to both city calculators
- One CTA block (flights/stays) after the verdict

### Content cadence
- 2 city upgrades / week until Wave A+B done
- 1 comparison page / week
- 1 distribution post / week (Shorts/TikTok/Pinterest) pointing to a city URL

### Distribution hooks that work for this product
- “This 7-day Tokyo trip costs about $X for 2 people”
- “Paris looks expensive — here’s the midrange breakdown”
- “Bali vs Bangkok: same dates, different totals”

---

## Phase 3 — Demand capture (Month 4)

- [ ] Wire newsletter to a real provider (Beehiiv/ConvertKit/Mailchimp)
- [ ] Add lead magnet: “Free 7-day budget template” PDF or checklist
- [ ] Email sequence: welcome → how to use calculator → featured city → seasonal deal issue
- [ ] Internal linking pass: homepage → Wave A cities → comparisons → partners

### Light partnerships (traffic, not revenue yet)
- Guest posts / newsletter swaps with budget-travel creators
- Reddit/forum answers with genuine breakdowns + link to relevant city page
- One collab calculator embed pitch (optional)

---

## Phase 4 — Monetization enablement (Month 5)

Only after Wave A pages get consistent organic traffic:

### Affiliate setup
- [ ] Join programs: flights, stays, activities, insurance
- [ ] Replace placeholders in `src/config/monetization.ts`
- [ ] Confirm tracking params (`utm_` + partner click IDs)
- [ ] Place strongest CTAs **after** estimate results

### Sponsorship inventory
- [ ] Offer 2–4 sponsored city guides from Wave A
- [ ] Package newsletter sponsorship once list is growing
- [ ] Keep disclosure copy on all partner modules

### Launch checklist
- [ ] CTA analytics dashboard
- [ ] First paid conversion test on Tokyo + Paris + Bali
- [ ] Kill/move underperforming offer slots quickly

---

## Suggested weekly operating rhythm

**Mon:** ship 1 city polish or comparison page  
**Wed:** distribution content for last shipped URL  
**Fri:** review Search Console queries + update titles/meta for pages getting impressions but weak CTR  
**Monthly:** pick next 4 cities from backlog based on impressions, not gut feel

---

## Repo touchpoints

| Area | Where |
|---|---|
| City content | `src/data/destinationDescriptions.ts`, `destinationExplore.ts`, `destinationDishes.ts` |
| Affiliate CTAs | `src/config/monetization.ts` |
| Prerender/SEO | `scripts/prerender.mjs`, `src/utils/seo.ts` |
| Newsletter | `src/components/NewsletterSignup.tsx` + `VITE_NEWSLETTER_ENDPOINT` |
| Partners sales page | `src/pages/PartnersPage.tsx` |

---

## Out of scope for this 5-month push

- Building a full booking engine
- Heavy paid ads before organic proof
- Dozens of thin city pages with duplicate copy
- Monetizing before Wave A has measurable traffic
