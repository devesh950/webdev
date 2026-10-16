import type { Metadata } from 'next';

import { MapExplorer } from '@/components/map-explorer';
import { SectionHeading } from '@/components/section-heading';
import { getRestaurants } from '@/data/restaurants';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Restaurant Map — Hajipur, Bihar',
  description:
    'A stylised locator for restaurants across Hajipur, Bihar, with directions to each confirmed Google Maps listing.',
  alternates: { canonical: '/map' },
};

export default function MapPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-[var(--line)] pb-16 pt-[calc(var(--nav-height)+4rem)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(56rem_30rem_at_30%_0%,rgba(200,169,107,0.12),transparent_62%)]"
        />
        <div className="shell">
          <SectionHeading
            eyebrow="Locator"
            title="Restaurants across Hajipur"
            description="A stylised overview of where each listed kitchen sits in town, with a direct route to its Google Maps record."
            as="h1"
          />
        </div>
      </header>

      <section className="section-tight">
        <div className="shell">
          <MapExplorer restaurants={getRestaurants()} />
        </div>
      </section>
    </>
  );
}