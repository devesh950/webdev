import type { Metadata } from 'next';
import { ArrowRight, Clock3, MapPin } from 'lucide-react';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand } from '@/components/cta-band';
import { IllustrativeNote } from '@/components/illustrative-note';
import { PhotoFrame } from '@/components/photo-frame';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { restaurant } from '@/data/restaurant';
import { siteConfig } from '@/lib/site';
import { breadcrumbStructuredData, jsonLdScript } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: `Menu — ${restaurant.name}`,
  description: `North Indian gravies and Mughlai platters at ${restaurant.name} in ${siteConfig.location.label}. The official menu and prices are published once confirmed by the restaurant.`,
  alternates: { canonical: '/menu' },
  openGraph: {
    title: `Menu · ${restaurant.name}`,
    description: restaurant.legalDescription,
    url: '/menu',
  },
};

/**
 * HONESTY NOTE — read before editing this page.
 *
 * No menu items or prices appear here because the restaurant has not supplied
 * them. Publishing a plausible-looking menu would mean inventing the prices of
 * a real business, so instead this page states plainly what is known for and
 * says the rest is coming.
 */
export default function MenuPage() {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
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
            eyebrow="Menu"
            title="What we are known for"
            description="The dishes The Taj is discussed for. Our full menu and prices are published here as soon as the restaurant confirms them."
            as="h1"
          />
        </div>
      </header>

      <section className="section-tight">
        <div className="shell">
          {/* Coming-soon notice — designed, not apologetic */}
          <Reveal>
            <div className="flex flex-col gap-4 rounded-card border border-[rgba(200,169,107,0.4)] bg-[rgba(200,169,107,0.05)] p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[rgba(200,169,107,0.45)] bg-[rgba(200,169,107,0.1)] text-[var(--gold)]">
                <Clock3 size={18} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-[1.25rem] text-ivory">
                  The full menu is on its way
                </h2>
                <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                  We have not published dishes and prices on this page because the
                  restaurant has not supplied them yet — and guessing at what a real
                  business charges is not something we will do. Until then, the
                  Google Maps listing is the most reliable source for current dishes
                  and prices.
                </p>
              </div>
              <a
                href={restaurant.googleMaps.listingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost shrink-0"
              >
                <MapPin size={15} aria-hidden="true" className="text-[var(--gold)]" />
                View listing
              </a>
            </div>
          </Reveal>

          {/* Signature dishes */}
          <div className="mt-14">
            <SectionHeading
              eyebrow="Known for"
              title="The dishes people talk about"
              description="Drawn from the restaurant’s own description, not from an assumed menu."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {restaurant.signatureDishes.map((dish, index) => (
                <Reveal key={dish.name} delay={index * 0.07}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-[var(--line)] bg-[var(--surface)] transition-[transform,border-color] duration-700 ease-editorial hover:-translate-y-1.5 hover:border-[rgba(200,169,107,0.4)]">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <PhotoFrame
                        image={restaurant.gallery[index] ?? restaurant.gallery[0]!}
                        sizes="(max-width: 768px) 100vw, 40vw"
                        zoom
                        creditPosition="top-right"
                        className="absolute inset-0 h-full w-full"
                      />
                      <span className="image-veil" aria-hidden="true" />
                      <span className="absolute inset-x-6 bottom-5 font-display text-[1.45rem] text-ivory">
                        {dish.name}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
                      <p className="text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                        {dish.detail}
                      </p>
                      <div className="mt-auto border-t border-[var(--line)] pt-5">
                        <p className="text-[0.75rem] leading-relaxed text-[var(--muted-dim)]">
                          No price is shown here. {restaurant.pendingNote}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15} className="mt-8">
              <IllustrativeNote />
            </Reveal>
          </div>

          {/* Cuisine summary */}
          <Reveal delay={0.1} className="mt-16">
            <div className="rounded-card border border-[var(--line)] bg-[var(--surface)] p-7 sm:p-9">
              <h2 className="font-display text-[1.45rem] text-ivory">Across the menu</h2>
              <p className="mt-3 max-w-[60ch] text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                A multicuisine kitchen built around North Indian gravies and Mughlai-style
                platters, arranged for full-table dining rather than quick solo meals.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {restaurant.cuisineHighlights.map((highlight) => (
                  <li key={highlight.label} className="tag tag-gold">
                    {highlight.label}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/about" className="btn btn-ghost group">
                  More about us
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
                  />
                </Link>
                <Link href="/location" className="btn btn-ghost">
                  Find us
                </Link>
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
