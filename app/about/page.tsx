import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
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
  title: `About — ${restaurant.name}`,
  description: `${restaurant.name} is an inviting choice for family meals, group dining and special occasions in ${siteConfig.location.label}, serving North Indian and Mughlai cuisine.`,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About ${restaurant.name}`,
    description: restaurant.legalDescription,
    url: '/about',
  },
};

export default function AboutPage() {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
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
            eyebrow="About us"
            title="An inviting choice for family meals, group dining, and special occasions."
            description={restaurant.category}
            as="h1"
          />
        </div>
      </header>

      <section className="section-tight">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
            <div className="flex flex-col gap-6">
              {restaurant.introduction.map((paragraph, index) => (
                <Reveal key={paragraph} delay={index * 0.05}>
                  <p className="prose-body">{paragraph}</p>
                </Reveal>
              ))}

              <Reveal delay={0.2} className="mt-4 flex flex-wrap gap-3">
                <Link href="/menu" className="btn btn-primary group">
                  Explore the Menu
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
                  />
                </Link>
                <Link href="/location" className="btn btn-ghost">
                  Find us
                </Link>
              </Reveal>

              {/* Cuisine */}
              <Reveal delay={0.1} className="mt-10">
                <section id="cuisine" className="scroll-mt-28">
                  <h2 className="font-display text-[1.6rem] text-ivory">What we cook</h2>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {restaurant.cuisineHighlights.map((highlight) => (
                      <li
                        key={highlight.label}
                        className="flex items-center justify-between gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-5 py-4"
                      >
                        <span className="text-[0.9375rem] text-ivory">{highlight.label}</span>
                        <span className="tag tag-gold">
                          {highlight.verification === 'verified' ? 'Verified' : 'Supplied'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            </div>

            {/* Side rail */}
            <aside className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--nav-height)+2rem)] lg:self-start">
              <Reveal delay={0.1}>
                <figure>
                  <PhotoFrame
                    image={restaurant.heroImage}
                    sizes="(max-width: 1024px) 100vw, 24rem"
                    className="aspect-[4/5] w-full rounded-card"
                  />
                  <figcaption className="mt-4">
                    <IllustrativeNote />
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="rounded-card border border-[var(--line)] bg-[var(--surface)] p-6">
                  <h2 className="text-[0.75rem] uppercase tracking-[0.2em] text-[var(--muted-dim)]">
                    At a glance
                  </h2>
                  <dl className="mt-4 flex flex-col gap-3 text-[0.9375rem]">
                    <div className="flex justify-between gap-4">
                      <dt className="text-[var(--muted)]">Category</dt>
                      <dd className="text-right text-ivory">{restaurant.category}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[var(--muted)]">Cuisine</dt>
                      <dd className="text-right text-ivory">North Indian &amp; Mughlai</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[var(--muted)]">Known for</dt>
                      <dd className="text-right text-ivory">Group dining</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[var(--muted)]">Location</dt>
                      <dd className="text-right text-ivory">
                        {restaurant.address.locality}, {restaurant.address.region}
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            </aside>
          </div>
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