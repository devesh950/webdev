import type { MetadataRoute } from 'next';

import { getRestaurants } from '@/data/restaurants';
import { siteConfig } from '@/lib/site';

type StaticRoute = {
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
};

const staticRoutes: StaticRoute[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/restaurants', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/map', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/partner', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const restaurants: MetadataRoute.Sitemap = getRestaurants().map((restaurant) => ({
    url: `${base}/restaurants/${restaurant.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...pages, ...restaurants];
}