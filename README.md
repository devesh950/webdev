# The Taj Multicuisine Restaurant

A dedicated website for **The Taj Multicuisine Restaurant**, Hajipur, Bihar.

Built with Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion
and Lucide. Deployable to Vercel with no additional infrastructure.

---

## Table of contents

1. [What this is](#what-this-is)
2. [Quick start](#quick-start)
3. [Pages](#pages)
4. [Environment variables](#environment-variables)
5. [Content policy](#content-policy)
6. [Adding restaurant details later](#adding-restaurant-details-later)
7. [Project structure](#project-structure)
8. [Design system](#design-system)
9. [Accessibility](#accessibility)
10. [SEO](#seo)
11. [Deployment](#deployment)
12. [Verification performed](#verification-performed)

---

## What this is

A single-location restaurant website: cinematic hero, editorial dark design
system, and six content sections — **Home, About, Menu, Gallery, Location,
Contact**.

Earlier versions of this project were a multi-restaurant directory with a
website-services lead funnel. That is gone: this is one restaurant's website.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000 (or 3001 if 3000 is taken)
```

Production:

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # eslint, zero warnings tolerated
npm run build
npm run start
```

> **Node 18.18+** required. Developed against Node 24.
>
> ⚠️ Do not run `npm run dev` and `npm run build` at the same time — they share
> the `.next` directory and will corrupt each other's output.

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint, fails on any warning |
| `npm run typecheck` | TypeScript, no emit |
| `node scripts/make-favicon.mjs` | Regenerate `public/favicon.ico` |

**Runs with zero configuration.** No API keys, database or backend is required.

---

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Cinematic hero, welcome, known-for dishes, cuisine, gallery preview |
| `/about` | Full story, cuisine breakdown, at-a-glance facts |
| `/menu` | Known-for dishes + honest "menu coming soon" state |
| `/gallery` | Full gallery with keyboard-accessible lightbox |
| `/location` | Stylised Hajipur locator + turn-by-turn directions |
| `/contact` | Address, directions, contact status, opening hours status |
| `/privacy` | Privacy policy |
| `404` | Not-found page |

Every route carries its own title, meta description, canonical URL, Open Graph
tags and breadcrumb structured data.

---

## Environment variables

Copy `.env.example` to `.env.local`.

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | `http://localhost:3000` | Canonical origin for canonical URLs, Open Graph, `sitemap.xml`, JSON-LD. **Inlined at build time** — set it before building. |
| `NEXT_PUBLIC_ENQUIRY_EMAIL` | No | *unset* | Restaurant email address. When unset the footer hides it rather than showing an unmonitored inbox. |

There is no API key, database or secret anywhere in this project — nothing is
collected, stored or transmitted.

---

## Content policy

The single most important rule in this project:

> **Publish only what the restaurant has confirmed. Never guess.**

Only two facts about The Taj are confirmed: its **name** and its **Google Maps
listing**.

Everything else is tagged in `data/restaurant.ts`:

| Tag | Meaning |
| --- | --- |
| `verified` | Confirmed against a source we can cite |
| `supplied` | Provided by the restaurant, not independently checked |
| `unavailable` / `null` | We do not have it |

### What the site refuses to invent

| Missing data | What the visitor sees |
| --- | --- |
| **Menu items and prices** | `/menu` leads with "The full menu is on its way" and explains why, then shows the two dishes the restaurant is *known for* — explicitly labelled "from the restaurant's own description, not from an assumed menu". No prices anywhere. |
| **Phone / email / WhatsApp** | `/contact` states plainly that no direct number has been published, and routes visitors to the Google Maps listing instead. **No phone button is rendered at all.** |
| **Opening hours** | Dashed "Not published yet" panel pointing to Google Maps. |
| **Street address** | "Hajipur, Bihar, India" plus a note that the Maps listing carries the exact location. |
| **Prices** | Never shown, anywhere. |

### Photography

All imagery is licensed stock food photography and is **not** a photograph of
this restaurant. This is disclosed:

- on every image, via a credit chip
- in the footer of every page
- on `/gallery`, in a dedicated panel
- in the alt-text-free decorative hero (background art is `alt=""`)

### Structured data

`lib/structured-data.ts` emits `Restaurant` JSON-LD. It deliberately **never**
emits `aggregateRating`, `review`, `openingHoursSpecification`, `telephone` or
`priceRange`, because those are unverified and emitting them would
misrepresent the business to search engines.

There are **no fake reviews, ratings, awards or testimonials** anywhere.

---

## Adding restaurant details later

Everything lives in one file: **`data/restaurant.ts`**.

To publish the real menu, phone number, hours and address:

```ts
contact: {
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  email: null,
},
openingHours: [
  { days: 'Monday – Sunday', opens: '12:00', closes: '23:00' },
],
address: {
  street: '123, Main Road',
  locality: 'Hajipur',
  city: 'Hajipur',
  region: 'Bihar',
  country: 'India',
},
```

The site then **automatically**:
- renders real call / WhatsApp / email buttons on `/contact`
- renders a real opening-hours table instead of the "not published" panel
- shows the street address in the footer, `/location` and JSON-LD
- adds `telephone` and `openingHoursSpecification` to the structured data

### Publishing the actual menu

Currently `/menu` is written as a coming-soon page. To publish a real menu:

1. Add the items to a `menu: MenuItem[]` array in `data/restaurant.ts`.
2. Replace the "coming soon" panel in `app/menu/page.tsx` with a price list
   rendered from that array.

The page has a comment block explaining this — read it before editing, and do
not hand-write dishes into the JSX. Prices must come from the restaurant.

### Swapping in real photography

1. Drop authorised images into `public/images/`.
2. Point `heroImage` / `gallery` at them, keeping each entry's `credit`:

```ts
heroImage: {
  src: '/images/hero.jpg',
  alt: 'The dining room at The Taj, photographed in the evening.',
  credit: 'Photo by <photographer>',
},
```

Because each entry carries its own `credit`, the disclosure chip updates
automatically. When genuine photos arrive, remove the "not a photograph of this
restaurant" wording from `/gallery` and the footer.

---

## Project structure

```
app/
  layout.tsx                  Fonts, metadata, nav, footer, JSON-LD
  page.tsx                    Home
  about/  menu/  gallery/
  location/  contact/  privacy/
  error.tsx  not-found.tsx  not-found-art.tsx
  opengraph-image.tsx         Generated OG card (edge runtime)
  robots.ts  sitemap.ts
  globals.css                 Design tokens + component classes

components/
  site-nav.tsx        Sticky nav, scroll progress, mobile drawer
  site-footer.tsx     Identity, address, navigation, disclosure
  hero.tsx            Cinematic hero with CSS entrance animations
  cta-band.tsx        Reusable "Visit us" band
  map-explorer.tsx    Stylised Hajipur locator
  restaurant-gallery.tsx  Gallery + keyboard lightbox
  photo-frame.tsx     next/image wrapper with credit chip
  illustrative-note.tsx  "Not a photograph of this restaurant" notice
  unverified-panel.tsx   Designed "coming soon" panel
  section-heading.tsx  breadcrumbs.tsx  reveal.tsx

data/
  restaurant.ts             ← ALL restaurant content lives here

lib/
  site.ts             Central config (name, nav, location)
  images.ts           Photography catalogue + Unsplash URL builder
  structured-data.ts  JSON-LD builders
  types.ts  utils.ts

public/favicon.ico
scripts/make-favicon.mjs
```

---

## Design system

CSS custom properties in `app/globals.css`, Tailwind tokens in
`tailwind.config.ts`.

| Token | Value |
| --- | --- |
| Deep charcoal | `#101010` |
| Warm ivory | `#F7F3EB` |
| Champagne gold | `#C8A96B` |
| Muted bronze | `#8B6B3F` |
| Soft white | `#FFFFFF` |
| Muted text | `#A8A39B` |

- **Display type:** Fraunces (variable, `SOFT` + `WONK` axes)
- **Body / UI:** Inter
- Both via `next/font` — self-hosted, `display: swap`, no layout shift.

Component classes: `.shell`, `.shell-wide`, `.btn-primary`, `.btn-ghost`,
`.chip`, `.field-input`, `.tag`, `.credit-chip`, `.surface-card`, `.eyebrow`,
`.section`, `.section-alt`, `.anim-rise`, `.anim-fade-up`.

### Motion policy

Restrained by design: short fades, small drifts, one-shot entrances.

- **Above the fold is CSS-animated, not JS-animated.** Framer Motion ships
  inline `opacity:0` during SSR, which would leave the hero invisible if the
  bundle were slow or blocked. `.anim-rise` / `.anim-fade-up` degrade to
  "visible" when animations never run.
- **Below the fold** uses `Reveal`, animating on scroll via IntersectionObserver.
  When scripting is unavailable, CSS restores every reveal via
  `@media (scripting: none)` plus a `<noscript>` rule for legacy browsers.
  > An earlier version toggled a `no-js` class with an inline `<head>` script.
  > That mutated `<html>` before React hydrated and caused a hydration
  > mismatch. Detect "no JS" in CSS — never by mutating the DOM React owns.
- **There is no root `loading.tsx`.** One wraps every route in a Suspense
  boundary that never resolves without JavaScript, so the whole site would show
  "Loading…" forever to non-JS visitors.
- Scroll parallax is additive and hides nothing.
- `prefers-reduced-motion: reduce` disables animation, smooth scrolling and the
  film grain.

---

## Accessibility

- Skip-to-content link; `<main>` is focusable.
- Semantic landmarks and exactly one `<h1>` per page.
- Every image has descriptive alt text; decorative art is `alt=""`.
- Visible 2px gold focus ring, never removed.
- The gallery lightbox supports Escape / ← / → and is a labelled `role="dialog"`.
- Interactive targets are at least 44px tall.
- Body `maximumScale` is 5 — pinch zoom is not disabled.
- No `<a>` nested in `<a>`, no `<p>` nested in `<p>` (both caused real hydration
  errors when this site was first built; both are now checked in CI-style audits).

---

## SEO

- Unique title and description per route, via `title.template`.
- Canonical URL on every page; `metadataBase` from `NEXT_PUBLIC_SITE_URL`.
- Generated Open Graph image on the edge — never a stock photo presented as
  the restaurant.
- `Restaurant` and `BreadcrumbList` JSON-LD with verified fields only.
- `sitemap.xml` (7 routes) and `robots.txt`.
- Unknown routes return a real HTTP 404.
- Below-the-fold images lazy-load; the hero image is `priority`.
- AVIF/WebP via `next/image` with explicit `sizes`.

---

## Deployment

### Vercel

1. Push to Git, import at [vercel.com/new](https://vercel.com/new) — the
   Next.js preset is detected automatically.
2. Set `NEXT_PUBLIC_SITE_URL` to your real domain (it is baked in at build).
3. Deploy. No other configuration is required.

### Any Node host

```bash
npm ci && npm run build && npm run start
```

---

## Verification performed

Run against the production build:

- `npm run typecheck`, `npm run lint` (`--max-warnings=0`), `npm run build` — all clean.
- **12 routes** prerendered; 103 kB shared First Load JS.
- **Every route returns 200**; unknown paths return **404** — including the
  removed `/restaurants`, `/partner`, `/services` and `/map` routes.
- **No trace of the four removed restaurants** anywhere in the rendered HTML of
  any route, or in the sitemap.
- **Zero hydration errors** and zero console errors across all routes.
- **No invalid HTML nesting** (`<a>` in `<a>`, `<p>` in `<p>`).
- **No horizontal overflow** at 360 / 390 / 768 / 1024 / 1440 — verified on all
  8 routes at all 5 widths (40 combinations).
- **No broken images**; every image has an `alt` attribute.
- **Works with JavaScript fully disabled**: each route still renders its `<h1>`
  and all scroll-reveal sections are visible.
- Google Maps links on every page resolve to The Taj's supplied listing, and the
  derived directions URL resolves too.

---

## Licence

Photography is licensed stock imagery from Unsplash and is illustrative only.
Replace it with the restaurant's own authorised photography before launch — see
[Adding restaurant details later](#adding-restaurant-details-later).