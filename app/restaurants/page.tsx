import type { Metadata } from 'next';
import { Suspense } from 'react';

import { RestaurantDirectory } from '@/components/restaurant-directory';
import { SectionHeading } from '@/components/section-heading';
import { DirectorySkeleton } from '@/components/skeletons';
import { categories, restaurants } from '@/data/restaurants';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Restaurants in Hajipur, Bihar',
  description:
    'Search and filter restaurants across Hajipur, Bihar by name, cuisine and category. Family dining, North Indian, biryani, vegetarian and quick bites — with directions to each.',
  alternates: { canonical: '/restaurants' },
  openGraph: {
    title: `Restaurants in ${siteConfig.location.label} · ${siteConfig.name}`,
    description:
      'Search and filter restaurants across Hajipur by name, cuisine and category.',
    url: '/restaurants',
  },
};

export default function RestaurantsPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-[var(--line)] pb-12 pt-[calc(var(--nav-height)+3rem)] sm:pb-14">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(56rem_30rem_at_20%_0%,rgba(200,169,107,0.12),transparent_62%)]"
        />
        <div className="shell">
          <SectionHeading
            eyebrow="Directory"
            title="Explore restaurants in Hajipur"
            description="Search by name, filter by the kind of meal you are planning, and open any listing for cuisine highlights, signature dishes and directions."
            as="h1"
          />
        </div>
      </header>

      <section id="cuisines" className="scroll-mt-24 pb-16 pt-8 sm:pt-10">
        <div className="shell">
          {/* useSearchParams needs a Suspense boundary to stay prerenderable. */}
          <Suspense fallback={<DirectorySkeleton />}>
            <RestaurantDirectory restaurants={restaurants} categories={categories} />
          </Suspense>
        </div>
      </section>
    </>
  );
}