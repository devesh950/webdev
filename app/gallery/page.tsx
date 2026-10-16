import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand } from '@/components/cta-band';
import { IllustrativeNote } from '@/components/illustrative-note';
import { Reveal } from '@/components/reveal';
import { RestaurantGallery } from '@/components/restaurant-gallery';
import { SectionHeading } from '@/components/section-heading';
import { restaurant } from '@/data/restaurant';
import { siteConfig } from '@/lib/site';
import { breadcrumbStructuredData, jsonLdScript } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: `Gallery — ${restaurant.name}`,
  description: `A look at the dining room, dishes and atmosphere at ${restaurant.name} in ${siteConfig.location.label}.`,
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: `Gallery · ${restaurant.name}`,
    description: `A look at the dining room, dishes and atmosphere at ${restaurant.name}.`,
    url: '/gallery',
  },
};

export default function GalleryPage() {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
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
          <SectionHeading
            className="mt-8"
            eyebrow="Gallery"
            title="The room, the food, the mood"
            description="A look at what you can expect before you arrive."
            as="h1"
          />
        </div>
      </header>

      <section className="section-tight">
        <div className="shell">
          <Reveal>
            <RestaurantGallery images={restaurant.gallery} />
          </Reveal>

          <Reveal delay={0.15} className="mt-10">
            <div className="rounded-card border border-dashed border-[var(--line-strong)] bg-[rgba(247,243,235,0.02)] p-7">
              <h2 className="font-display text-[1.25rem] text-ivory">
                Photography of the restaurant itself
              </h2>
              <p className="mt-3 max-w-[64ch] text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                The photographs on this page are licensed stock images used to convey the
                kind of food and atmosphere we serve. They are <strong className="font-medium text-ivory">not</strong>{' '}
                photographs of this restaurant. Photography of our actual dining room, by
                our own team, will be published here once it is produced.
              </p>
              <div className="mt-5">
                <IllustrativeNote />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbStructuredData(trail)) }}
      />
    </>
  );
}