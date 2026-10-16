import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand } from '@/components/cta-band';
import { MapExplorer } from '@/components/map-explorer';
import { Reveal } from '@/components/reveal';
import { restaurant } from '@/data/restaurant';
import { siteConfig } from '@/lib/site';
import { breadcrumbStructuredData, jsonLdScript } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: `Location — ${restaurant.name}`,
  description: `Find ${restaurant.name} in ${siteConfig.location.label}, Bihar. Turn-by-turn directions and an overview of the area.`,
  alternates: { canonical: '/location' },
  openGraph: {
    title: `Location · ${restaurant.name}`,
    description: `Find ${restaurant.name} in ${siteConfig.location.label}, Bihar.`,
    url: '/location',
  },
};

export default function LocationPage() {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Location', path: '/location' },
  ];

  return (
    <>
      <header className="relative overflow-hidden border-b border-[var(--line)] pb-14 pt-[calc(var(--nav-height)+3.5rem)] sm:pb-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(56rem_30rem_at_30%_0%,rgba(200,169,107,0.12),transparent_62%)]"
        />
        <div className="shell">
          <Breadcrumbs trail={trail} />
          <div className="mt-8 max-w-[52ch]">
            <p className="eyebrow">Location</p>
            <h1 className="mt-5 text-display-md text-ivory">
              Find us in {restaurant.address.locality}
            </h1>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-[var(--muted)]">
              {restaurant.name} is in {restaurant.address.city},{' '}
              {restaurant.address.region}, {restaurant.address.country}. Get directions
              straight to our door from the Google Maps listing below.
            </p>
          </div>
        </div>
      </header>

      <section className="section-tight">
        <div className="shell">
          <Reveal>
            <MapExplorer />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Ready when you are."
        description="For tables of any size, the fastest way to reach us is Google Maps — it carries our exact location and turn-by-turn directions."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbStructuredData(trail)) }}
      />
    </>
  );
}