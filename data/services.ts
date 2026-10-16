/**
 * Website development services offered to Hajipur restaurants.
 * Copy here is deliberately free of ranking, revenue and lead-volume promises.
 */

export type ServiceIcon = 'monitor' | 'utensils' | 'search';

export type Service = {
  slug: string;
  icon: ServiceIcon;
  title: string;
  summary: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: 'restaurant-website',
    icon: 'monitor',
    title: 'Restaurant Website',
    summary:
      'A professionally branded website with restaurant information, menu presentation, gallery, location, and contact details.',
    deliverables: [
      'Branded design built for your cuisine and locality',
      'Menu presentation that is readable on a phone',
      'Photo gallery and location section',
      'Contact details and enquiry actions',
    ],
  },
  {
    slug: 'digital-menu',
    icon: 'utensils',
    title: 'Digital Menu & Direct Enquiries',
    summary:
      'A mobile-friendly menu experience with clear contact actions and convenient enquiry options.',
    deliverables: [
      'Mobile-first digital menu layout',
      'WhatsApp and call enquiry actions',
      'Fast-loading images on slow connections',
      'Easy future menu updates',
    ],
  },
  {
    slug: 'local-seo',
    icon: 'search',
    title: 'Local SEO & Online Presence',
    summary:
      'A technical foundation for search visibility, structured business information, and a stronger local digital presence.',
    deliverables: [
      'LocalBusiness structured data on your pages',
      'Accurate map and business information',
      'Search-friendly page titles and descriptions',
      'Performance and mobile optimisation',
    ],
  },
];

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Free consultation',
    description:
      'A short call to understand your menu, your customers and what you want the website to do.',
  },
  {
    step: '02',
    title: 'Design direction',
    description:
      'A visual direction drawn from your own food and setting, shared before anything is built.',
  },
  {
    step: '03',
    title: 'Build and review',
    description:
      'Pages are built for phone use first, then reviewed with you and adjusted.',
  },
  {
    step: '04',
    title: 'Launch and handover',
    description:
      'Your site goes live, your menu and details are live with it, and you get the keys.',
  },
];