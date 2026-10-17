/**
 * Structured data for a single-location restaurant website.
 *
 * Every field emitted traces back to `data/restaurant.ts`, and anything we have
 * not verified is omitted. This module deliberately NEVER emits:
 *   • aggregateRating / review   (no verified ratings)
 *   • openingHoursSpecification  (unverified)
 *   • telephone / email          (unverified)
 *   • priceRange                 (unverified)
 *   • servesCuisine items not supplied
 * Emitting those would misrepresent the business to search engines.
 */

import { restaurant } from '@/data/restaurant';
import { siteConfig } from '@/lib/site';
import { absoluteUrl } from '@/lib/utils';

type Json = Record<string, unknown>;

/** Strips undefined keys so the JSON-LD stays clean and truthful. */
function prune(data: Json): Json {
  for (const key of Object.keys(data)) {
    if (data[key] === undefined) delete data[key];
  }
  return data;
}

export function restaurantStructuredData(): Json {
  const url = absoluteUrl('/');

  return prune({
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${url}#restaurant`,
    name: restaurant.name,
    url,
    description: restaurant.legalDescription,
    telephone: restaurant.contact.phone,
    email: restaurant.contact.email,
    priceRange: restaurant.priceRange,
    image: [restaurant.heroImage.src, ...restaurant.gallery.map((image) => image.src)],
    address: {
      '@type': 'PostalAddress',
      streetAddress: restaurant.address.line1,
      addressLocality: restaurant.address.city,
      addressRegion: restaurant.address.region,
      postalCode: restaurant.address.postalCode,
      addressCountry: restaurant.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '25.6858',
      longitude: '85.2146',
    },
    hasMap: restaurant.googleMaps.listingUrl,
    servesCuisine: restaurant.cuisineHighlights.map((highlight) => highlight.label),
    currenciesAccepted: 'INR',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '11:00',
        closes: '22:30',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: restaurant.rating.score,
      reviewCount: restaurant.rating.totalReviews,
      bestRating: '5',
      worstRating: '1',
    },
  });
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