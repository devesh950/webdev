/**
 * RESTAURANT DATA — the single source of truth for this site.
 *
 * ── Verification policy ────────────────────────────────────────────────────
 * This is a dedicated website for one business: THE TAJ MULTICUISINE
 * RESTAURANT. Only two facts about it are confirmed:
 *
 *   • its name, and
 *   • its Google Maps listing.
 *
 * Everything else was supplied as starting content and is tagged:
 *
 *   `verified`    — confirmed against a source we can cite.
 *   `supplied`    — provided by the restaurant, not independently checked.
 *   `unavailable` — we do not have it. Rendered as a designed "coming soon"
 *                   state, never as a guess.
 *
 * There are intentionally NO invented phone numbers, emails, opening hours,
 * prices, ratings, reviews or menu items in this file. Publishing a menu here
 * without the restaurant supplying it would misrepresent its prices.
 */

import type { PhotoAsset } from '@/lib/images';
import { foodPhoto, type FoodPhotoKey } from '@/lib/images';

export type Verification = 'verified' | 'supplied' | 'unavailable';

export type CuisineHighlight = {
  label: string;
  verification: Verification;
};

export type SignatureDish = {
  name: string;
  detail: string;
  verification: Verification;
};

export type Restaurant = {
  name: string;
  /** Short descriptor used on cards and in the browser tab. */
  category: string;
  /** Full name for document titles and structured data. */
  legalDescription: string;
  /** One-line editorial hook shown in the hero. */
  kicker: string;
  /** Hero + meta description copy. Supplied. */
  summary: string;
  /** About-page copy. */
  introduction: string[];
  cuisineHighlights: CuisineHighlight[];
  /**
   * Dishes the restaurant is publicly known for. These are NOT an official
   * menu: no prices are attached, and the menu page states plainly that
   * nothing has been published by the restaurant yet.
   */
  signatureDishes: SignatureDish[];
  googleMaps: {
    /** The listing supplied for this restaurant. */
    listingUrl: string;
    /** Maps' own directions endpoint, derived from the listing. */
    directionsUrl: string;
  };
  contact: {
    phone: string | null;
    whatsapp: string | null;
    email: string | null;
  };
  social: {
    website: string | null;
    instagram: string | null;
    facebook: string | null;
  };
  address: {
    street: string | null;
    locality: string;
    city: string;
    region: string;
    country: string;
  };
  openingHours: { days: string; opens: string; closes: string }[] | null;
  priceRange: string | null;
  heroImage: PhotoAsset;
  gallery: PhotoAsset[];
  /** Rendered wherever something is not yet published. */
  pendingNote: string;
};

/**
 * Google's `data=!` listing URLs carry the place in a `!1s<placeId>` segment,
 * which the standard directions endpoint understands. Deriving it here means we
 * only ever store the listing we were given.
 */
function buildDirectionsUrl(listingUrl: string): string {
  const match = /!1s([^!]+)/.exec(listingUrl);
  if (!match?.[1]) return listingUrl;
  return `https://www.google.com/maps/search/?api=1&query_place_id=${encodeURIComponent(
    match[1],
  )}`;
}

const GOOGLE_MAPS_LISTING =
  'https://www.google.com/maps/place/THE%20TAJ%20MULTICUISINE%20RESTAURANT/data=!4m2!3m1!1s0x39ed5d4fbc25374d:0xe1f4ffcae966b18e';

type RestaurantSeed = Omit<Restaurant, 'googleMaps'> & {
  googleMaps: { listingUrl: string };
};

const seed: RestaurantSeed = {
  name: 'The Taj Multicuisine Restaurant',
  category: 'Family Dining / Multicuisine',
  legalDescription:
    'Family dining and multicuisine restaurant in Hajipur, Bihar, serving North Indian and Mughlai cuisine.',
  kicker: 'For long tables and longer evenings',
  summary:
    'An inviting choice for family meals, group dining, and special occasions.',
  introduction: [
    'The Taj Multicuisine Restaurant was built for the kind of meal that happens when a whole family is in one place. Generations share a table, conversations run long, and nobody wants the evening to end. That is the occasion this restaurant exists for.',
    'The name promises more than a single kitchen, and the kitchen delivers on it. North Indian gravies and Mughlai-leaning plates run through the menu, which is exactly the combination that works when a large group has to agree on dinner.',
    'Whether it is a Sunday lunch, a birthday, or an evening with colleagues, the room is arranged so that the whole table is served together. Come hungry, and take your time.',
  ],
  cuisineHighlights: [
    { label: 'North Indian', verification: 'supplied' },
    { label: 'Mughlai', verification: 'supplied' },
    { label: 'Multicuisine', verification: 'supplied' },
    { label: 'Family dining', verification: 'supplied' },
    { label: 'Group dining', verification: 'supplied' },
  ],
  signatureDishes: [
    {
      name: 'North Indian gravies',
      detail:
        'Rich, slow-built sauces served with breads and rice — the backbone of a full family meal here.',
      verification: 'supplied',
    },
    {
      name: 'Mughlai platters',
      detail:
        'Built for sharing across a large table rather than eating alone.',
      verification: 'supplied',
    },
  ],
  googleMaps: { listingUrl: GOOGLE_MAPS_LISTING },
  contact: { phone: null, whatsapp: null, email: null },
  social: { website: null, instagram: null, facebook: null },
  address: {
    street: null,
    locality: 'Hajipur',
    city: 'Hajipur',
    region: 'Bihar',
    country: 'India',
  },
  openingHours: null,
  priceRange: null,
  heroImage: foodPhoto('diningHall'),
  gallery: [
    foodPhoto('mughlaiPlatter'),
    foodPhoto('northIndianCurry'),
    foodPhoto('tandooriChicken'),
    foodPhoto('warmInterior'),
    foodPhoto('tableSetting'),
    foodPhoto('indianThali'),
  ],
  pendingNote:
    'Published once confirmed directly by the restaurant.',
};

export const restaurant: Restaurant = {
  ...seed,
  googleMaps: {
    listingUrl: seed.googleMaps.listingUrl,
    directionsUrl: buildDirectionsUrl(seed.googleMaps.listingUrl),
  },
};

/** True when the restaurant has a contact route we may actually display. */
export function hasVerifiedContact(): boolean {
  const { phone, whatsapp, email } = restaurant.contact;
  return Boolean(phone || whatsapp || email);
}

export type { PhotoAsset };