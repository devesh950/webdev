/**
 * Central site configuration.
 *
 * Anything a restaurant owner may want to change lives here so that content
 * edits never require touching presentation code.
 */

import { restaurant } from '@/data/restaurant';

function envUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/+$/, '');
  if (process.env.NODE_ENV === 'production') {
    // Keep production URLs absolute so canonical tags and OG tags stay valid.
    return 'https://the-taj-hajipur.vercel.app';
  }
  return 'http://localhost:3000';
}

/**
 * Public-facing enquiry address. Configure with `NEXT_PUBLIC_ENQUIRY_EMAIL`.
 * While it is unset we deliberately fall back to routing visitors to the
 * restaurant's Google Maps listing rather than showing an address nobody
 * monitors.
 */
function enquiryEmail(): string | null {
  const value = process.env.NEXT_PUBLIC_ENQUIRY_EMAIL?.trim();
  if (!value) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : null;
}

export const siteConfig = {
  name: restaurant.name,
  shortName: 'The Taj',
  tagline: restaurant.tagline,
  description: `${restaurant.name} is Hajipur’s premier destination for family dining, royal dum biryani, sizzling tandoor, and authentic multicuisine feasts on Lower Dakbunglow Road, Bihar.`,
  url: envUrl(),
  locale: 'en_IN',
  phone: restaurant.contact.phoneFormatted,
  address: restaurant.address.fullFormatted,
  location: {
    city: restaurant.address.city,
    region: restaurant.address.region,
    regionCode: 'BR',
    country: restaurant.address.country,
    countryCode: 'IN',
    label: `${restaurant.address.city}, ${restaurant.address.region}`,
  },
  enquiryEmail: enquiryEmail() ?? restaurant.contact.email,
  primaryNav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Menu', href: '/menu' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Location', href: '/location' },
    { label: 'Contact', href: '/contact' },
  ],
  footerNav: [
    {
      title: 'The Restaurant',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Menu', href: '/menu' },
        { label: 'Gallery', href: '/gallery' },
      ],
    },
    {
      title: 'Visit Us',
      links: [
        { label: 'Location', href: '/location' },
        { label: 'Get Directions', href: restaurant.googleMaps.directionsUrl, external: true },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Information',
      links: [
        { label: 'Cuisine', href: '/about#cuisine' },
        { label: 'Known For', href: '/menu' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Google Maps listing', href: restaurant.googleMaps.listingUrl, external: true },
      ],
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;