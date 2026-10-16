/**
 * RESTAURANT DATA — the single source of truth for the directory.
 *
 * ── Verification policy ────────────────────────────────────────────────────
 * This project ships with a deliberately small set of *confirmed* facts per
 * restaurant: its name and its Google Maps listing. Everything else was
 * supplied as starting content and is therefore tagged:
 *
 *   `verified`    — confirmed against a source we can cite.
 *   `supplied`    — provided to us, not independently checked. Shown with a
 *                   visible disclosure label in the UI.
 *   `unavailable` — we do not have it. Rendered as a designed empty state,
 *                   never as a guess.
 *
 * There are intentionally NO invented phone numbers, opening hours, prices,
 * ratings, reviews, awards or menus in this file. Adding one means adding a
 * `verifiedBy` note explaining where it came from.
 *
 * Adding a sixth restaurant should require no changes anywhere else.
 */

import type { PhotoAsset } from '@/lib/images';
import { foodPhoto, type FoodPhotoKey } from '@/lib/images';

export type CategorySlug =
  | 'Family Dining'
  | 'North Indian'
  | 'Biryani'
  | 'Vegetarian'
  | 'Quick Bites';

export type Verification = 'verified' | 'supplied' | 'unavailable';

export type SignatureDish = {
  name: string;
  detail: string;
  verification: Verification;
};

export type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  verification: Verification;
  source: 'restaurant' | 'community';
};

export type OpeningHour = {
  days: string;
  opens: string;
  closes: string;
};

export type Address = {
  /** Only include fields that have been verified. */
  street?: string;
  locality?: string;
  city: string;
  region: string;
  postalCode?: string;
  country: string;
};

export type Restaurant = {
  slug: string;
  name: string;
  /** Short category line shown on cards, e.g. "Biryani / Takeaway". */
  category: string;
  /** Machine-readable categories used by the directory filters. */
  categories: CategorySlug[];
  /** One-line editorial hook. */
  kicker: string;
  /** Card + hero copy. Supplied starting content. */
  summary: string;
  /** Longer introduction used on the detail page. */
  introduction: string[];
  cuisineHighlights: { label: string; verification: Verification }[];
  signatureDishes: SignatureDish[];
  googleMaps: {
    /** The listing we were given. */
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
  address: Address;
  openingHours: OpeningHour[] | null;
  priceRange: string | null;
  /** Verified menu items only. Empty means "no published menu yet". */
  menu: MenuItem[];
  heroImage: PhotoAsset;
  gallery: PhotoAsset[];
  /** Short note rendered on the detail page. */
  contentNote: string;
  featured: boolean;
  /** Order on the home page and directory. */
  position: number;
};

const BASE_ADDRESS: Address = {
  locality: 'Hajipur',
  city: 'Hajipur',
  region: 'Bihar',
  country: 'India',
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

type RestaurantSeed = Omit<Restaurant, 'googleMaps'> & {
  googleMaps: { listingUrl: string };
};

const seed: RestaurantSeed[] = [
  {
    slug: 'the-taj-multicuisine-restaurant',
    name: 'The Taj Multicuisine Restaurant',
    category: 'Family Dining / Multicuisine',
    categories: ['Family Dining', 'North Indian'],
    kicker: 'For long tables and longer evenings',
    summary:
      'An inviting choice for family meals, group dining, and special occasions.',
    introduction: [
      'The Taj Multicuisine Restaurant sits in our directory as Hajipur’s answer to the long family lunch: the table where cousins, colleagues and old friends end up eating for two hours without anyone checking the time.',
      'Its name promises more than one kitchen, and the supplied description backs that up — North Indian gravies and Mughlai-leaning plates are what this place is discussed for, which is exactly the kind of meal that works when a whole group has to agree on dinner.',
      'We have kept the detail page honest: no menu, no price list and no phone number is published here, because we have not verified them. The Google Maps listing below is the reliable way to reach the restaurant today.',
    ],
    cuisineHighlights: [
      { label: 'North Indian', verification: 'supplied' },
      { label: 'Mughlai', verification: 'supplied' },
      { label: 'Multicuisine', verification: 'supplied' },
    ],
    signatureDishes: [
      {
        name: 'North Indian gravies',
        detail: 'Rich, slow-built sauces that are the reason groups keep choosing this table.',
        verification: 'supplied',
      },
      {
        name: 'Mughlai platters',
        detail: 'Built for sharing across a large table rather than eating alone.',
        verification: 'supplied',
      },
    ],
    googleMaps: {
      listingUrl:
        'https://www.google.com/maps/place/THE%20TAJ%20MULTICUISINE%20RESTAURANT/data=!4m2!3m1!1s0x39ed5d4fbc25374d:0xe1f4ffcae966b18e',
    },
    contact: { phone: null, whatsapp: null, email: null },
    social: { website: null, instagram: null, facebook: null },
    address: { ...BASE_ADDRESS },
    openingHours: null,
    priceRange: null,
    menu: [],
    heroImage: foodPhoto('diningHall'),
    gallery: [foodPhoto('MughlaiPlatter'), foodPhoto('northIndianCurry'), foodPhoto('warmInterior')],
    contentNote:
      'Description and cuisine highlights were supplied as starting content and have not been independently verified.',
    featured: true,
    position: 1,
  },
  {
    slug: 'desi-zaika-restaurant',
    name: 'Desi Zaika Restaurant',
    category: 'North Indian / Casual Dining',
    categories: ['North Indian', 'Family Dining'],
    kicker: 'Generous plates, no fuss',
    summary:
      'A casual dining option for satisfying meals and North Indian favourites.',
    introduction: [
      'Desi Zaika Restaurant is the kind of place Hajipur eats at when the priority is a genuinely filling North Indian meal rather than an occasion. No ceremony, large plates, familiar flavours.',
      'The supplied description points to chicken dishes and tandoori specialities, which is the core of what this kitchen is known for locally. It suits both a quick stop and a table of friends who want to order generously.',
      'We have not verified an official menu, price list or contact number for this restaurant, so we show the Google Maps listing instead of guessing.',
    ],
    cuisineHighlights: [
      { label: 'North Indian', verification: 'supplied' },
      { label: 'Tandoori', verification: 'supplied' },
      { label: 'Casual dining', verification: 'supplied' },
    ],
    signatureDishes: [
      {
        name: 'Chicken dishes',
        detail: 'North Indian chicken preparations, the centre of the supplied description.',
        verification: 'supplied',
      },
      {
        name: 'Tandoori specialities',
        detail: 'Charcoal-grilled specialities typically ordered as a table favourite.',
        verification: 'supplied',
      },
    ],
    googleMaps: {
      listingUrl:
        'https://www.google.com/maps/place/Desi%20Zaika%20Restaurant/data=!4m2!3m1!1s0x39ed5dac859fb603:0x716b3d703a526a15',
    },
    contact: { phone: null, whatsapp: null, email: null },
    social: { website: null, instagram: null, facebook: null },
    address: { ...BASE_ADDRESS },
    openingHours: null,
    priceRange: null,
    menu: [],
    heroImage: foodPhoto('tandooriChicken'),
    gallery: [foodPhoto('kebabSkewer'), foodPhoto('currySpread'), foodPhoto('tableSetting')],
    contentNote:
      'Description and cuisine highlights were supplied as starting content and have not been independently verified.',
    featured: true,
    position: 2,
  },
  {
    slug: 'golden-bowl',
    name: 'Golden Bowl',
    category: 'Casual Dining / Quick Bites',
    categories: ['Quick Bites'],
    kicker: 'Contemporary, relaxed, easy-going',
    summary:
      'A casual destination for quick bites, group outings, and relaxed food experiences.',
    introduction: [
      'Golden Bowl covers a very different mood from the rest of this list: quicker, brighter and more contemporary. It reads as an easy destination for a group of friends who want to eat without committing an evening to it.',
      'The supplied highlights — noodles, chicken lollipop and paneer dishes — give it broad appeal across different preferences, which is why it works as a group default when nobody can agree on a cuisine.',
      'No official menu, pricing or contact details have been verified for this listing yet, so we direct you to the confirmed Google Maps listing.',
    ],
    cuisineHighlights: [
      { label: 'Quick Bites', verification: 'supplied' },
      { label: 'Noodles', verification: 'supplied' },
      { label: 'Paneer', verification: 'supplied' },
    ],
    signatureDishes: [
      {
        name: 'Chicken lollipop',
        detail: 'Named as one of the three highlights of the supplied description.',
        verification: 'supplied',
      },
      {
        name: 'Noodles',
        detail: 'A quick, shareable option for relaxed group outings.',
        verification: 'supplied',
      },
      {
        name: 'Paneer dishes',
        detail: 'Vegetarian options alongside the non-vegetarian highlights.',
        verification: 'supplied',
      },
    ],
    googleMaps: {
      listingUrl:
        'https://www.google.com/maps/place/Golden%20bowl/data=!4m2!3m1!1s0x39ed5dc813f44495:0x36d3173ca11152cc',
    },
    contact: { phone: null, whatsapp: null, email: null },
    social: { website: null, instagram: null, facebook: null },
    address: { ...BASE_ADDRESS },
    openingHours: null,
    priceRange: null,
    menu: [],
    heroImage: foodPhoto('noodlesBowl'),
    gallery: [foodPhoto('paneerDish'), foodPhoto('moodyInterior'), foodPhoto('chefPass')],
    contentNote:
      'Description and cuisine highlights were supplied as starting content and have not been independently verified.',
    featured: true,
    position: 3,
  },
  {
    slug: 'biryani-paradise',
    name: 'Biryani Paradise',
    category: 'Biryani / Takeaway',
    categories: ['Biryani', 'Quick Bites'],
    kicker: 'Biryani first, everything else second',
    summary:
      'A convenient discovery for diners looking for biryani and hearty meals.',
    introduction: [
      'Biryani Paradise is included here for a narrow, confident reason: when someone in Hajipur says they want biryani, this is the listing that comes up.',
      'The supplied description centres on biryani and kebabs, and frames the restaurant around convenient, hearty eating — which is a takeaway-shaped proposition rather than a long-dinner one.',
      'We have not verified a menu, price range or contact number for this restaurant. The Google Maps listing below is the accurate way to find and reach it.',
    ],
    cuisineHighlights: [
      { label: 'Biryani', verification: 'supplied' },
      { label: 'Kebabs', verification: 'supplied' },
      { label: 'Takeaway', verification: 'supplied' },
    ],
    signatureDishes: [
      {
        name: 'Biryani',
        detail: 'The defining speciality named in the supplied description.',
        verification: 'supplied',
      },
      {
        name: 'Kebabs',
        detail: 'The accompaniment most diners add to a biryani order.',
        verification: 'supplied',
      },
    ],
    googleMaps: {
      listingUrl:
        'https://www.google.com/maps/place/BIRYANI%20PARADISE/data=!4m2!3m1!1s0x39ed5d3f78c8c1e9:0x37d5e8fdaeb1faa6',
    },
    contact: { phone: null, whatsapp: null, email: null },
    social: { website: null, instagram: null, facebook: null },
    address: { ...BASE_ADDRESS },
    openingHours: null,
    priceRange: null,
    menu: [],
    heroImage: foodPhoto('biryaniHandi'),
    gallery: [foodPhoto('biryaniPlate'), foodPhoto('kebabSkewer'), foodPhoto('indianThali')],
    contentNote:
      'Description and cuisine highlights were supplied as starting content and have not been independently verified.',
    featured: true,
    position: 4,
  },
  {
    slug: 'tcg-the-chaap-guru',
    name: 'TCG — The Chaap Guru',
    category: 'Vegetarian / Soya Chaap',
    categories: ['Vegetarian'],
    kicker: 'Vegetarian, and confident about it',
    summary:
      'A casual food destination for vegetarian diners exploring soya chaap specialities.',
    introduction: [
      'TCG — The Chaap Guru earns its place on this list by being specific. Rather than trying to be everything to everyone, it is a destination for soya chaap, and a welcome answer for vegetarian diners in Hajipur who want more than a side dish.',
      'The supplied description centres on malai chaap and other chaap varieties, which gives it a clear identity in a town where the vegetarian option is often an afterthought.',
      'No official menu, pricing or contact details have been verified for this restaurant yet, so please use the Google Maps listing for accurate details.',
    ],
    cuisineHighlights: [
      { label: 'Vegetarian', verification: 'supplied' },
      { label: 'Soya chaap', verification: 'supplied' },
      { label: 'Malai chaap', verification: 'supplied' },
    ],
    signatureDishes: [
      {
        name: 'Malai chaap',
        detail: 'The headline speciality named in the supplied description.',
        verification: 'supplied',
      },
      {
        name: 'Other chaap varieties',
        detail: 'Additional soya chaap preparations across the menu.',
        verification: 'supplied',
      },
    ],
    googleMaps: {
      listingUrl:
        'https://www.google.com/maps/place/TCG%20-%20The%20Chaap%20Guru/data=!4m2!3m1!1s0x39ed5d3babe60629:0x290fee35e60e5263',
    },
    contact: { phone: null, whatsapp: null, email: null },
    social: { website: null, instagram: null, facebook: null },
    address: { ...BASE_ADDRESS },
    openingHours: null,
    priceRange: null,
    menu: [],
    heroImage: foodPhoto('soyaChaap'),
    gallery: [foodPhoto('paneerDish'), foodPhoto('indianThali'), foodPhoto('moodyInterior')],
    contentNote:
      'Description and cuisine highlights were supplied as starting content and have not been independently verified.',
    featured: true,
    position: 5,
  },
];

/** Final, direction-ready restaurant records. */
export const restaurants: Restaurant[] = seed.map((restaurant) => ({
  ...restaurant,
  googleMaps: {
    listingUrl: restaurant.googleMaps.listingUrl,
    directionsUrl: buildDirectionsUrl(restaurant.googleMaps.listingUrl),
  },
}));

export const categories: CategorySlug[] = [
  'Family Dining',
  'North Indian',
  'Biryani',
  'Vegetarian',
  'Quick Bites',
];

export function getRestaurant(slug: string): Restaurant | undefined {
  return restaurants.find((restaurant) => restaurant.slug === slug);
}

export function getRestaurants(): Restaurant[] {
  return [...restaurants].sort((a, b) => a.position - b.position);
}

export function getFeaturedRestaurants(): Restaurant[] {
  return getRestaurants().filter((restaurant) => restaurant.featured);
}

export function getRelatedRestaurants(
  restaurant: Restaurant,
  limit = 2,
): Restaurant[] {
  return getRestaurants()
    .filter((candidate) => candidate.slug !== restaurant.slug)
    .map((candidate) => ({
      candidate,
      overlap: candidate.categories.filter((category) =>
        restaurant.categories.includes(category),
      ).length,
    }))
    .sort((a, b) => b.overlap - a.overlap || a.candidate.position - b.candidate.position)
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export type RestaurantIndexEntry = {
  slug: string;
  name: string;
  category: string;
  categories: CategorySlug[];
  summary: string;
  heroImage: PhotoAsset;
  googleMapsUrl: string;
  directionsUrl: string;
  hasContact: boolean;
};

export function toSearchIndex(
  restaurant: Restaurant,
): RestaurantIndexEntry {
  return {
    slug: restaurant.slug,
    name: restaurant.name,
    category: restaurant.category,
    categories: restaurant.categories,
    summary: restaurant.summary,
    heroImage: restaurant.heroImage,
    googleMapsUrl: restaurant.googleMaps.listingUrl,
    directionsUrl: restaurant.googleMaps.directionsUrl,
    hasContact: Boolean(
      restaurant.contact.phone ?? restaurant.contact.email ?? restaurant.contact.whatsapp,
    ),
  };
}

/** Convenience: does this restaurant have any contact route we can show? */
export function hasVerifiedContact(restaurant: Restaurant): boolean {
  return Boolean(
    restaurant.contact.phone ||
      restaurant.contact.whatsapp ||
      restaurant.contact.email,
  );
}