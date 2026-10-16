# Hajipur Food

**Discover the Flavours of Hajipur.**

A premium restaurant discovery platform for Hajipur, Bihar, paired with website
development services for local food businesses.

Built with Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion
and Lucide. Deployable to Vercel with no additional infrastructure.

---

## Table of contents

1. [What this is](#what-this-is)
2. [Quick start](#quick-start)
3. [Environment variables](#environment-variables)
4. [Lead delivery](#lead-delivery)
5. [Adding a restaurant](#adding-a-restaurant)
6. [The verification policy](#the-verification-policy)
7. [Project structure](#project-structure)
8. [Design system](#design-system)
9. [Accessibility](#accessibility)
10. [SEO](#seo)
11. [Deployment](#deployment)
12. [Verification performed](#verification-performed)
13. [Deliberately not built](#deliberately-not-built)

---

## What this is

Two things sharing one codebase:

- **A discovery site** — search and filter restaurants, read cuisine highlights
  and signature dishes, get directions to the verified Google Maps listing.
- **An acquisition site** — a services page and a lead-capture form aimed at
  restaurant owners who need a professional website.

The design goal was a hospitality publication, not a directory template:
cinematic hero, editorial serif type, restrained gold accents, generous spacing.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # optional for local dev — see below
npm run dev                    # http://localhost:3000
```

Production build:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint, zero warnings tolerated
npm run build       # next build
npm run start
```

> **Node 18.18+** is required. Developed against Node 24.

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint, fails on any warning |
| `npm run typecheck` | TypeScript, no emit |
| `node scripts/make-favicon.mjs` | Regenerate `public/favicon.ico` |

**Local development works with zero configuration.** With no environment
variables set, the enquiry form validates, rate-limits and stores every
submission to `.data/enquiries.jsonl` in the project root.

---

## Environment variables

Copy `.env.example` to `.env.local`. All of these are **server-side** except
the two `NEXT_PUBLIC_` ones.

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | `http://localhost:3000` | Canonical origin for canonical URLs, Open Graph, `sitemap.xml`, JSON-LD. No trailing slash. |
| `NEXT_PUBLIC_ENQUIRY_EMAIL` | No | *unset* | Public enquiry address. When unset the footer links to the enquiry form instead of showing an unmonitored address. |
| `LEAD_DELIVERY` | No | auto | `webhook` or `file`. Auto-selects `webhook` when `LEAD_WEBHOOK_URL` is set, otherwise `file`. |
| `LEAD_WEBHOOK_URL` | Production | *unset* | Endpoint that receives enquiries. See below. |
| `LEAD_WEBHOOK_BEARER_TOKEN` | No | *unset* | Sent as `Authorization: Bearer <token>` so only your endpoint accepts leads. |
| `RATE_LIMIT_MAX` | No | `5` | Enquiries allowed per client per window. |
| `RATE_LIMIT_WINDOW_MS` | No | `900000` | Window length (15 minutes). |

> No secret is ever referenced from a client component. `LEAD_WEBHOOK_URL` and
> `LEAD_WEBHOOK_BEARER_TOKEN` are read only inside `lib/leads/store.ts`, which
> is imported exclusively by the server route handler.

---

## Lead delivery

`POST /api/enquiry` → validate → rate limit → deliver. The UI only shows
success **after** the delivery function resolves, so it can never claim a lead
was received when it was not.

### Two drivers

**`webhook` (recommended for production)**

The enquiry is POSTed to `LEAD_WEBHOOK_URL`:

```json
{
  "source": "hajipur-food-website",
  "id": "hf_mvb2y73d_63459453",
  "submittedAt": "2026-10-16T14:45:45.194Z",
  "enquiry": {
    "id": "hf_mvb2y73d_63459453",
    "submittedAt": "2026-10-16T14:45:45.194Z",
    "name": "Ramesh Kumar",
    "restaurantName": "The Taj Multicuisine Restaurant",
    "phone": "9876543210",
    "email": "ramesh@example.com",
    "websiteStatus": "existing-website",
    "services": ["website", "digital-menu"],
    "budget": "15k-40k",
    "message": "We want a proper site with our menu.",
    "source": "website-partner-form"
  }
}
```

Point it at a Make.com / Zapier / n8n scenario, a serverless function, or your
own CRM endpoint and the lead lands in your business inbox. Set
`LEAD_WEBHOOK_BEARER_TOKEN` so the endpoint rejects anyone else.

**`file` (zero-config fallback)**

Appends to `.data/enquiries.jsonl`. This directory is git-ignored. In
production without a webhook configured the server logs a loud warning on every
delivery, and `/partner` shows an operator notice — a misconfigured deployment
should be obvious before leads start going missing.

> ⚠️ On a serverless host the filesystem is ephemeral. Use `webhook` in production.

### Abuse protection

| Layer | Behaviour |
| --- | --- |
| Honeypot | A hidden `companyWebsite` input. Filled submissions get a fake OK response and are never stored. |
| Timing check | A form completed in under 2.5 s is rejected — a strong machine signal. |
| Rate limit | Fixed window per IP + user-agent. Default 5 per 15 minutes. |
| Payload cap | Malformed JSON, oversized bodies and unknown shapes are rejected by the Zod schema. |

### Swapping in a database

`lib/leads/store.ts` has a single async function, `deliverEnquiry(record)`, and
one status helper. To store leads in Postgres, Supabase, Airtable or a CRM,
add a driver alongside `deliverToWebhook` and register it in `resolveDriver()`.
Nothing else changes.

### Rate limiting at scale

`lib/rate-limit.ts` holds counters in process memory. That is correct for a
single Node instance and for low-traffic single-region deployments. On a
platform running many concurrent instances the limit becomes per-instance. To
fix, keep the `checkRateLimit(key, options) => { allowed, remaining, ... }`
interface and back it with Redis (Upstash works well on Vercel):

```ts
import { Redis } from '@upstash/redis';
const redis = Redis.fromEnv();

export async function checkRateLimit(key: string) {
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, WINDOW_SECONDS);
  return { allowed: count <= MAX, remaining: Math.max(0, MAX - count), /* … */ };
}
```

---

## Adding a restaurant

Everything lives in `data/restaurants.ts`. Adding a sixth listing should not
require touching a single component.

```ts
{
  slug: 'my-new-restaurant',          // URL-safe, unique
  name: 'My New Restaurant',
  category: 'North Indian / Casual Dining',
  categories: ['North Indian'],       // must be a CategorySlug
  kicker: 'One line of editorial copy',
  summary: 'One sentence for cards and meta descriptions.',
  introduction: ['Paragraph one.', 'Paragraph two.'],
  cuisineHighlights: [{ label: 'North Indian', verification: 'supplied' }],
  signatureDishes: [{ name: '…', detail: '…', verification: 'supplied' }],
  googleMaps: { listingUrl: 'https://www.google.com/maps/place/…' },
  contact: { phone: null, whatsapp: null, email: null },
  social: { website: null, instagram: null, facebook: null },
  address: { locality: 'Hajipur', city: 'Hajipur', region: 'Bihar', country: 'India' },
  openingHours: null,
  priceRange: null,
  menu: [],
  heroImage: foodPhoto('northIndianCurry'),
  gallery: [foodPhoto('mughlaiPlatter')],
  contentNote: 'Description supplied as starting content and not independently verified.',
  featured: true,
  position: 6,
}
```

The `directionsUrl` is derived automatically from the listing URL, so you only
ever store the link you were given.

Static routes, sitemap entries, Open Graph cards, JSON-LD and the "related
restaurants" block all follow automatically.

### Swapping in real photography

1. Drop authorised images into `public/images/<slug>/`.
2. Point `heroImage` and `gallery` at them:

```ts
heroImage: {
  src: '/images/my-new-restaurant/hero.jpg',
  alt: 'The dining room at My New Restaurant, photographed in the evening.',
  credit: 'Photo by <photographer>',
},
```

Because the object carries its own `credit` and `alt`, the disclosure chip
updates with it automatically.

---

## The verification policy

This project publishes **only what can be confirmed**, and says so out loud.

**Confirmed for every listing:** the restaurant's name and its Google Maps
listing.

**Labelled, not hidden:** descriptions and cuisine highlights, which arrived as
supplied starting content. Every detail page carries a visible
`contentNote`, and each dish is tagged *Verified* or *From supplied description*.

**Designed empty states, never guesses:**

| Missing data | What the user sees |
| --- | --- |
| Menu | "No verified menu published yet" panel linking to the Maps listing |
| Opening hours | "Not verified" note in the side rail |
| Phone / email | "No verified phone number or email has been supplied" — **no** contact button is rendered |
| Street address | Locality and region only, with an explicit note |
| Price range | Not displayed |

**Photography** is licensed stock imagery and is *never* presented as a
photograph of the restaurant. A credit chip sits on every image and a full
sentence appears in the footer, on the home page and on each detail page.

**Structured data** (`lib/structured-data.ts`) emits `Restaurant` JSON-LD with
only verified fields. It deliberately never emits `aggregateRating`, `review`,
`openingHoursSpecification`, `telephone` or `priceRange` when those are
unverified, because that would misrepresent the business to search engines.

**No fake social proof** anywhere: no review counts, no star ratings, no
awards, no testimonials, no "trusted by N restaurants".

**No ranking promises.** `/services` has an explicit "What we will not do"
panel: no guaranteed #1 ranking, no guaranteed sales, no guaranteed lead volume.

---

## Project structure

```
app/
  layout.tsx                  Fonts, metadata, nav, footer, site JSON-LD
  page.tsx                    Home
  loading.tsx / error.tsx / not-found.tsx
  opengraph-image.tsx         Generated OG card (edge)
  robots.ts / sitemap.ts
  restaurants/
    page.tsx                  Directory (search + filters)
    [slug]/
      page.tsx                Detail template
      opengraph-image.tsx     Per-restaurant OG card
      _components.tsx         Directions + contact side rail
  services/page.tsx
  partner/page.tsx            Lead form
  map/page.tsx
  about/page.tsx
  privacy/page.tsx
  api/enquiry/route.ts        Server-side validation + delivery

components/                   18 presentational / interactive components
data/
  restaurants.ts              All listing content + helpers
  services.ts                 Service copy + process steps
lib/
  site.ts                     Central config (name, nav, location, email)
  images.ts                   Photography catalogue + Unsplash URL builder
  validation/enquiry.ts       Zod schema shared by client and server
  leads/store.ts              Lead delivery drivers
  rate-limit.ts               Abuse protection
  structured-data.ts          JSON-LD builders
components/
  hero.tsx  site-nav.tsx  site-footer.tsx
  restaurant-card.tsx  restaurant-directory.tsx  restaurant-gallery.tsx
  map-explorer.tsx  enquiry-form.tsx  service-cards.tsx  cta-band.tsx
  reveal.tsx  photo-frame.tsx  breadcrumbs.tsx  section-heading.tsx
  illustrative-note.tsx  unverified-panel.tsx  skeletons.tsx
scripts/make-favicon.mjs      Generates public/favicon.ico
prototype/                    Earlier static prototype, archived, unused
```

---

## Design system

Defined as CSS custom properties in `app/globals.css` and Tailwind tokens in
`tailwind.config.ts`.

| Token | Value |
| --- | --- |
| Deep charcoal | `#101010` |
| Warm ivory | `#F7F3EB` |
| Champagne gold | `#C8A96B` |
| Muted bronze | `#8B6B3F` |
| Soft white | `#FFFFFF` |
| Muted text | `#A8A39B` |

- **Display type:** Fraunces (variable, with `SOFT` and `WONK` axes)
- **Body / UI:** Inter
- Loaded through `next/font` — self-hosted, `display: swap`, no layout shift.

Component classes worth knowing: `.shell`, `.btn-primary`, `.btn-ghost`,
`.chip`, `.field-input`, `.tag`, `.credit-chip`, `.surface-card`,
`.eyebrow`, `.section`, `.section-alt`, `.anim-rise`, `.anim-fade-up`.

### Motion policy

Motion is restrained by design: short fades, small drifts, one-shot entrances.

- **Above the fold is CSS-animated, not JS-animated.** Framer Motion ships
  inline `opacity:0` during SSR, which would leave the hero invisible if the
  bundle were slow or blocked. `.anim-rise` / `.anim-fade-up` degrade to
  "visible" when animations never run.
- **Below the fold** uses `Reveal`, which animates on scroll via
  IntersectionObserver. When scripting is unavailable, CSS restores every
  reveal to its final state via two JS-free mechanisms:
  `@media (scripting: none)` in `globals.css`, and a matching `<noscript>`
  rule in `layout.tsx` for legacy browsers.
  > An earlier version toggled a `no-js` class with an inline `<head>` script.
  > That mutated `<html>` before React hydrated and caused a hydration
  > mismatch. Detect "no JS" in CSS instead — never by mutating the DOM React
  > owns.
- **There is no root `loading.tsx`.** A root loading file wraps every route in
  a Suspense boundary that never resolves without JavaScript, so the entire
  site showed "Loading…" forever for those visitors. Skeletons are used only
  where they are genuinely scoped, inside `/restaurants`.
- Scroll parallax is purely additive and hides nothing.
- `prefers-reduced-motion: reduce` disables animation, smooth scrolling and the
  film grain entirely.

---

## Accessibility

- Skip-to-content link; `<main>` is focusable.
- Real semantic landmarks and one `<h1>` per page.
- Every image has descriptive alt text. Hero background art is `alt=""`.
- All form fields have `<label htmlFor>`; errors use `role="alert"` and
  `aria-describedby`, and `aria-invalid` marks the control.
- Validation errors move focus to the first invalid field.
- The result count is an `aria-live="polite"` region, so filtering is announced.
- Filter chips use `aria-pressed`; the mobile drawer traps nothing it should not
  and closes on Escape.
- The image lightbox supports Escape / ← / → and is a labelled `role="dialog"`.
- Visible 2px gold focus ring on everything, never removed.
- Body `maximumScale` is 5 — pinch zoom is not disabled.
- Interactive controls are at least 44px tall.
- Colour choices meet WCAG AA against the dark surface for body text.

---

## SEO

- Unique title and meta description per route; `title.template` applied.
- Canonical URL on every page; `metadataBase` from `NEXT_PUBLIC_SITE_URL`.
- Open Graph and Twitter cards, with **generated** OG images per restaurant
  rendered on the edge (no stock photo masquerading as a listing).
- `Restaurant` and `BreadcrumbList` JSON-LD, verified fields only.
- `sitemap.xml` (7 static routes + one per restaurant) and `robots.txt`;
  `/api/` and `/admin/` disallowed.
- `noindex` returned for unknown restaurant slugs, which also return a real
  HTTP 404 via `dynamicParams = false`.
- Local copy names Hajipur and Bihar naturally without stuffing.
- Below-the-fold images lazy-load; the hero image is `priority`.
- Images served as AVIF/WebP through `next/image` with explicit `sizes`.

---

## Deployment

### Vercel (recommended)

1. Push to a Git repository.
2. Import in Vercel — the framework preset is detected automatically.
3. Add environment variables under **Settings → Environment Variables**:

   ```
   NEXT_PUBLIC_SITE_URL      = https://your-domain.com
   NEXT_PUBLIC_ENQUIRY_EMAIL = you@your-domain.com
   LEAD_DELIVERY             = webhook
   LEAD_WEBHOOK_URL          = https://…
   LEAD_WEBHOOK_BEARER_TOKEN = (optional)
   RATE_LIMIT_MAX            = 5
   RATE_LIMIT_WINDOW_MS      = 900000
   ```

4. Deploy.

**Configure `LEAD_WEBHOOK_URL` before your first real enquiry.** Without it the
site still captures leads, but to an ephemeral file.

### Any Node host

```bash
npm ci && npm run build && npm run start
```

Needs `NEXT_PUBLIC_SITE_URL` set at **build** time (it is inlined into
canonical tags). `PORT` is respected.

---

## Verification performed

Run against the production build (`next build && next start`):

- `npm run typecheck` — clean.
- `npm run lint` — clean, `--max-warnings=0`.
- `npm run build` — 18 routes; 103 kB shared First Load JS.
- **All 11 routes** return the correct status at 360 / 390 / 768 / 1024 / 1440.
  Unknown restaurant slugs correctly return HTTP 404.
- **No horizontal overflow** at any breakpoint. `documentElement.scrollWidth`
  equals `clientWidth` on all 50 route/width combinations. No overlapping
  content.
- **No broken images.** All 16 Unsplash assets were fetched and confirmed; one
  dead ID was found and replaced.
- **Zero hydration errors** across all 9 routes on the production build
  (console + `pageerror` captured while scrolling each page).
- **No invalid HTML nesting** (`<a>` inside `<a>`, `<p>` inside `<p>`) on any
  route. Two real cases were found and fixed this way.
- **Works with JavaScript fully disabled**: every route still renders its
  `<h1>` and all scroll-reveal sections are visible.
- Exactly one `<h1>` per page; every image has an `alt` attribute.
- All five supplied Google Maps URLs return HTTP 200, as do the five derived
  directions URLs.
- Enquiry API exercised end to end:
  - valid submission → `201`, lead written / webhook received with bearer token
  - `+91 98765 43210`, `091-…`, `098765-…`, `9123456789` all accepted
  - `12345`, `1234567890`, `+1 555…`, 14-digit input all rejected
  - honeypot → fake OK, nothing stored
  - sub-2.5 s submission → `429`
  - 6th submission inside the window → `429` with `Retry-After`
- Scroll reveals verified to fire for all 23 elements on the home page.

---

## Deliberately not built

**An internal lead-management dashboard** (section 10 of the brief) is not
included. The brief allows deferring it where it would complicate launch, and
it needs authentication plus a database — a meaningful security surface that
should not be bolted on before lead delivery is proven. The data model it needs
is already defined in `EnquiryRecord` (`lib/leads/store.ts`), so the dashboard
becomes a read layer over an existing store rather than a redesign.

Other deliberate omissions:

- No third-party analytics, tracking pixels or ad scripts.
- No cookie banner, because nothing sets a cookie.
- No database client, because a webhook needs none.

## Licence

Photography is licensed stock imagery from Unsplash and is illustrative only.
Replace it with each restaurant's own authorised photography before launch —
see [Adding a restaurant](#adding-a-restaurant).