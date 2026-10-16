import type { Metadata } from 'next';
import { ArrowRight, Clock3, MapPin, Utensils } from 'lucide-react';
import Link from 'next/link';

import { CtaBand } from '@/components/cta-band';
import { Hero } from '@/components/hero';
import { IllustrativeNote } from '@/components/illustrative-note';
import { Reveal, RevealGroup, RevealItem } from '@/components/reveal';
import { RestaurantCard } from '@/components/restaurant-card';
import { SectionHeading } from '@/components/section-heading';
import { ServiceCards } from '@/components/service-cards';
import { categories, getFeaturedRestaurants, restaurants } from '@/data/restaurants';
import { foodPhotos } from '@/lib/images';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description:
    'Discover local restaurants, memorable meals and the flavours that bring Hajipur, Bihar together. Plus professional restaurant website design for local businesses.',
  alternates: { canonical: '/' },
};

const principles = [
  {
    icon: MapPin,
    title: 'Verified before published',
    body: 'A restaurant only appears here with a confirmed Google Maps listing. Anything we cannot verify is labelled instead of invented.',
  },
  {
    icon: Utensils,
    title: 'Cuisine, not clutter',
    body: 'No filler listings, no invented menus. Just the places, what they are known for, and how to reach them.',
  },
  {
    icon: Clock3,
    title: 'Built for dinner-time phones',
    body: 'Every page is designed for a mid-range Android on mobile data — the way most of Hajipur actually browses.',
  },
];

export default function HomePage() {
  const featured = getFeaturedRestaurants();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Restaurants in Hajipur, Bihar',
    description:
      'A curated selection of restaurants in Hajipur, Bihar, each with a verified Google Maps listing.',
    numberOfItems: restaurants.length,
    itemListElement: featured.map((restaurant, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteConfig.url}/restaurants/${restaurant.slug}`,
      name: restaurant.name,
    })),
  };

  return (
    <>
      <Hero />

      {/* ================================================== featured */}
      <section id="featured" className="section">
        <div className="shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="The Collection"
              title={
                <>
                  Restaurants worth the<br className="hidden sm:block" /> walk across town
                </>
              }
              description="Five kitchens, one food city. Each listing is anchored to its confirmed Google Maps presence, so the directions you get are the directions that work."
            />

            <Reveal delay={0.1}>
              <Link
                href="/restaurants"
                className="btn btn-ghost group shrink-0"
              >
                View all restaurants
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((restaurant, index) => (
              <RevealItem key={restaurant.slug} className="h-full">
                <RestaurantCard
                  restaurant={restaurant}
                  index={index}
                  priority={index < 3}
                />
              </RevealItem>
            ))}

            {/* Invitation card — also carries the "growing list" honesty note. */}
            <RevealItem className="h-full">
              <div className="relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-card border border-dashed border-[var(--line-strong)] bg-[rgba(200,169,107,0.03)] p-7">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage: `url(${foodPhotos.indianThali})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)] via-[var(--charcoal)]/85 to-[var(--charcoal)]/60"
                />

                <div className="relative">
                  <p className="text-[0.6875rem] uppercase tracking-[0.22em] text-[var(--gold)]">
                    More every month
                  </p>
                  <h3 className="mt-4 font-display text-[1.5rem] leading-snug text-ivory">
                    Know a Hajipur kitchen we have missed?
                  </h3>
                </div>

                <div className="relative">
                  <p className="text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                    This collection is deliberately small. We would rather list five places
                    properly than fifty placeholders.
                  </p>
                  <Link
                    href="/restaurants"
                    className="btn btn-ghost mt-6 group"
                  >
                    Browse the directory
                    <ArrowRight
                      size={15}
                      aria-hidden="true"
                      className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </RevealItem>
          </RevealGroup>

          <Reveal delay={0.15} className="mt-10">
            <IllustrativeNote />
          </Reveal>
        </div>
      </section>

      {/* ================================================== categories */}
      <section id="cuisines" className="section section-alt">
        <div className="shell">
          <SectionHeading
            eyebrow="Browse by craving"
            title="Find the mood you’re in"
            description="Jump straight to a style of eating. Every chip below filters the live directory."
          />

          <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-card border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category, index) => {
              const count = restaurants.filter((restaurant) =>
                restaurant.categories.includes(category),
              ).length;

              return (
                <RevealItem key={category}>
                  <Link
                    href={`/restaurants?category=${encodeURIComponent(category)}`}
                    className="group flex h-full flex-col justify-between gap-10 bg-[var(--surface)] p-6 transition-colors duration-500 hover:bg-[var(--surface-raised)]"
                  >
                    <span className="text-[0.6875rem] tracking-[0.2em] text-[var(--muted-dim)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <span className="block font-display text-[1.3rem] text-ivory transition-colors duration-300 group-hover:text-[var(--gold)]">
                        {category}
                      </span>
                      <span className="mt-2 block text-[0.8125rem] text-[var(--muted)]">
                        {count} {count === 1 ? 'restaurant' : 'restaurants'}
                      </span>
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ================================================== principles */}
      <section className="section">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Reveal>
              <SectionHeading
                eyebrow="Why this guide"
                title="Fewer listings. Better information."
                description="Most food directories in smaller towns are padded with guesses. We took the opposite approach: publish only what can be confirmed, and be clear about the rest."
              />

              <ul className="mt-9 flex flex-col gap-6">
                {principles.map((principle, index) => {
                  const Icon = principle.icon;
                  return (
                    <Reveal key={principle.title} delay={index * 0.08}>
                      <li className="flex gap-5">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--gold)]">
                          <Icon size={17} aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="font-display text-[1.15rem] text-ivory">
                            {principle.title}
                          </h3>
                          <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                            {principle.body}
                          </p>
                        </div>
                      </li>
                    </Reveal>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <figure className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-[var(--line)] sm:aspect-[4/3] lg:aspect-[4/5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={foodPhotos.tableSetting}
                    alt="An illustrative stock photograph of a laid dining table, not a photograph of a specific Hajipur restaurant."
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[rgba(16,16,16,0.9)] via-transparent to-transparent"
                  />
                </div>
                <figcaption className="mt-4">
                  <IllustrativeNote />
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================== services */}
      <section className="section section-alt">
        <div className="shell">
          <SectionHeading
            eyebrow="Website services"
            title={
              <>
                A website your restaurant<br className="hidden sm:block" /> can actually use
              </>
            }
            description="We build branded restaurant websites, digital menus and local search foundations for businesses across Hajipur and Bihar."
          />

          <div className="mt-14">
            <ServiceCards compact />
          </div>

          <Reveal delay={0.15} className="mt-12 flex justify-center">
            <Link href="/services" className="btn btn-ghost group">
              See how the process works
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />

      {/* JSON-LD for the featured list */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </>
  );
}