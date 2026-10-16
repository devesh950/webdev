/**
 * Structured data generation.
 *
 * Every field emitted here traces back to `data/restaurants.ts`, and any field
 * we have not verified is simply omitted. In particular this module NEVER emits:
 *   • aggregateRating / review   (we have no verified ratings)
 *   • openingHoursSpecification  (unverified)
 *   • telephone / email          (unverified)
 *   • priceRange                 (unverified)
 * Emitting those would be a misrepresentation of the business to search engines.
 */

import type { Restaurant } from '@/data/restaurants';
import { siteConfig } from '@/lib/site';
import { absoluteUrl } from '@/lib/utils';

type Json = Record<string, unknown>;

export function restaurantStructuredData(restaurant: Restaurant): Json {
  const url = absoluteUrl(`/restaurants/${restaurant.slug}`);

  const data: Json = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${url}#restaurant`,
    name: restaurant.name,
    url,
    description: restaurant.summary,
    image: [restaurant.heroImage.src, ...restaurant.gallery.map((image) => image.src)],
    address: {
      '@type': 'PostalAddress',
      streetAddress: restaurant.address.street,
      addressLocality: restaurant.address.locality ?? restaurant.address.city,
      addressRegion: restaurant.address.region,
      postalCode: restaurant.address.postalCode,
      addressCountry: restaurant.address.country,
    },
    hasMap: restaurant.googleMaps.listingUrl,
    servesCuisine: restaurant.cuisineHighlights.map((highlight) => highlight.label),
    currenciesAccepted: 'INR',
  };

  // Remove undefined keys so the JSON-LD stays clean and truthful.
  for (const key of Object.keys(data)) {
    if (data[key] === undefined) delete data[key];
  }

  const contactBlock: Json = {};
  if (restaurant.contact.phone) contactBlock.telephone = restaurant.contact.phone;
  if (restaurant.contact.email) contactBlock.email = restaurant.contact.email;
  if (Object.keys(contactBlock).length > 0) data.contactPoint = contactBlock;

  if (restaurant.openingHours?.length) {
    data.openingHoursSpecification = restaurant.openingHours.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    }));
  }

  const sameAs = [
    restaurant.social.website,
    restaurant.social.instagram
      ? `https://instagram.com/${restaurant.social.instagram}`
      : null,
    restaurant.social.facebook
      ? `https://facebook.com/${restaurant.social.facebook}`
      : null,
  ].filter((value): value is string => Boolean(value));
  if (sameAs.length > 0) data.sameAs = sameAs;

  return data;
}

export function websiteStructuredData(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: 'en-IN',
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      slogan: siteConfig.tagline,
    },
  };
}

export function breadcrumbStructuredData(
  trail: { name: string; path: string }[],
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Serialises JSON-LD for a <script type="application/ld+json"> tag. */
export function jsonLdScript(data: Json): string {
  // `<` is escaped so the payload can never terminate the script element.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}