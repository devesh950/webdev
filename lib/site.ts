/**
 * Central site configuration.
 *
 * Anything that a business owner may want to change lives here so that
 * content edits never require touching presentation code.
 */

function envUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/+$/, '');
  if (process.env.NODE_ENV === 'production') {
    // Keep production URLs absolute so canonical tags and OG tags stay valid.
    return 'https://hajipur-food.vercel.app';
  }
  return 'http://localhost:3000';
}

/**
 * Public-facing enquiry address. Configure with `NEXT_PUBLIC_ENQUIRY_EMAIL`.
 * While it is unset we deliberately fall back to the in-site enquiry form
 * rather than displaying a contact address that nobody monitors.
 */
function enquiryEmail(): string | null {
  const value = process.env.NEXT_PUBLIC_ENQUIRY_EMAIL?.trim();
  if (!value) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : null;
}

export const siteConfig = {
  name: 'Hajipur Food',
  shortName: 'Hajipur Food',
  tagline: 'Discover the Flavours of Hajipur.',
  supportingTagline:
    'Local favourites. Memorable flavours. Exceptional experiences.',
  description:
    'A premium local food discovery platform for Hajipur, Bihar — explore restaurants, cuisines and memorable meals, and discover how professional websites help local restaurants grow.',
  url: envUrl(),
  locale: 'en_IN',
  location: {
    city: 'Hajipur',
    region: 'Bihar',
    regionCode: 'BR',
    country: 'India',
    countryCode: 'IN',
    label: 'Hajipur, Bihar',
  },
  enquiryEmail: enquiryEmail(),
  social: [] as { label: string; href: string }[],
  primaryNav: [
    { label: 'Restaurants', href: '/restaurants' },
    { label: 'Cuisines', href: '/restaurants#cuisines' },
    { label: 'Map', href: '/map' },
    { label: 'Services', href: '/services' },
  ],
  footerNav: [
    {
      title: 'Discover',
      links: [
        { label: 'All Restaurants', href: '/restaurants' },
        { label: 'Family Dining', href: '/restaurants?category=Family%20Dining' },
        { label: 'Biryani', href: '/restaurants?category=Biryani' },
        { label: 'Vegetarian', href: '/restaurants?category=Vegetarian' },
        { label: 'Quick Bites', href: '/restaurants?category=Quick%20Bites' },
      ],
    },
    {
      title: 'For Restaurants',
      links: [
        { label: 'Website Services', href: '/services' },
        { label: 'Request a Consultation', href: '/partner' },
        { label: 'Free Consultation', href: '/partner#consultation' },
        { label: 'Service enquiry', href: '/partner' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Hajipur Food', href: '/about' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Map', href: '/map' },
        { label: 'Partner With Us', href: '/partner' },
      ],
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;