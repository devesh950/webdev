import type { Metadata } from 'next';
import { ArrowRight, MapPin, Users } from 'lucide-react';
import Link from 'next/link';

import { CtaBand } from '@/components/cta-band';
import { Hero } from '@/components/hero';
import { IllustrativeNote } from '@/components/illustrative-note';
import { PhotoFrame } from '@/components/photo-frame';
import { Reveal, RevealGroup, RevealItem } from '@/components/reveal';
import { RestaurantGallery } from '@/components/restaurant-gallery';
import { SectionHeading } from '@/components/section-heading';
import { restaurant } from '@/data/restaurant';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: `${restaurant.name} — ${restaurant.category} in ${siteConfig.location.label}`,
  description: siteConfig.description,
  alternates: { canonical: '/' },
};

const reasons = [
  {
    icon: Users,
    title: 'Made for full tables',
    body: 'This is a group dining restaurant first. Everything is arranged so a whole party eats together rather than in shifts.',
  },
  {
    icon: MapPin,
    title: 'In the heart of Hajipur',
    body: 'Easy to find and easy to reach from anywhere in Hajipur. Get turn-by-turn directions straight to our door.',
  },
  {
    icon: ArrowRight,
    title: 'North Indian & Mughlai',
    body: 'Rich gravies, slow-built sauces and Mughlai-leaning platters — the food a family meal is built around.',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ================================================== welcome */}
      <section id="welcome" className="section">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Welcome"
                title="A table worth gathering around"
                description={restaurant.summary}
              />

              <div className="mt-7 flex flex-col gap-5">
                {restaurant.introduction.slice(0, 2).map((paragraph) => (
                  <p key={paragraph} className="prose-body">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/about" className="btn btn-ghost group">
                  More about us
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <figure>
                <PhotoFrame
                  image={restaurant.heroImage}
                  sizes="(max-width: 1024px) 100vw, 34rem"
                  className="aspect-[4/5] w-full rounded-card sm:aspect-[4/3] lg:aspect-[4/5]"
                />
                <figcaption className="mt-4">
                  <IllustrativeNote />
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================== known for */}
      <section className="section section-alt">
        <div className="shell">
          <SectionHeading
            eyebrow="Known for"
            title="What brings people in"
            description="Two things The Taj is discussed for. Prices and the full menu are published once the restaurant confirms them."
          />

          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2">
            {restaurant.signatureDishes.map((dish, index) => (
              <RevealItem key={dish.name}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-[var(--line)] bg-[var(--surface)] transition-[transform,border-color] duration-700 ease-editorial hover:-translate-y-1.5 hover:border-[rgba(200,169,107,0.4)]">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <PhotoFrame
                      image={restaurant.gallery[index] ?? restaurant.gallery[0]!}
                      sizes="(max-width: 768px) 100vw, 40vw"
                      zoom
                      creditPosition="top-right"
                      className="absolute inset-0 h-full w-full"
                    />
                    <span className="image-veil" aria-hidden="true" />
                    <span className="absolute inset-x-5 bottom-4 font-display text-[1.35rem] text-ivory">
                      {dish.name}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
                    <p className="text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                      {dish.detail}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--line)] pt-5">
                      <span className="text-[0.75rem] uppercase tracking-[0.14em] text-[var(--muted-dim)]">
                        From supplied description
                      </span>
                      <Link
                        href="/menu"
                        className="inline-flex items-center gap-1.5 text-[0.875rem] text-ivory transition-colors duration-300 hover:text-[var(--gold)]"
                      >
                        Menu
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-10">
            <IllustrativeNote />
          </Reveal>
        </div>
      </section>

      {/* ================================================== cuisine */}
      <section className="section">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Reveal>
              <figure>
                <PhotoFrame
                  image={restaurant.gallery[2] ?? restaurant.gallery[0]!}
                  sizes="(max-width: 1024px) 100vw, 34rem"
                  className="aspect-[4/5] w-full rounded-card sm:aspect-[16/10] lg:aspect-[4/5]"
                />
                <figcaption className="mt-4">
                  <IllustrativeNote />
                </figcaption>
              </figure>
            </Reveal>

            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="Cuisine"
                  title="North Indian and Mughlai, under one roof"
                  description="A multicuisine kitchen, but one with a clear centre of gravity: rich North Indian gravies and Mughlai-style platters."
                />
              </Reveal>

              <RevealGroup className="mt-10 grid gap-3 sm:grid-cols-2">
                {restaurant.cuisineHighlights.map((highlight) => (
                  <RevealItem key={highlight.label}>
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-5 py-4 transition-colors duration-500 hover:border-[rgba(200,169,107,0.3)]">
                      <span className="text-[0.9375rem] text-ivory">{highlight.label}</span>
                      <span className="tag tag-gold">
                        {highlight.verification === 'verified' ? 'Verified' : 'Supplied'}
                      </span>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>

              <Reveal delay={0.2} className="mt-9">
                <ul className="flex flex-col gap-5 border-t border-[var(--line)] pt-8">
                  {reasons.map((reason) => {
                    const Icon = reason.icon;
                    return (
                      <li key={reason.title} className="flex gap-5">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[rgba(200,169,107,0.35)] bg-[rgba(200,169,107,0.08)] text-[var(--gold)]">
                          <Icon size={17} aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="font-display text-[1.1rem] text-ivory">
                            {reason.title}
                          </h3>
                          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                            {reason.body}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== gallery */}
      <section className="section section-alt">
        <div className="shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Gallery"
              title="A look at the room"
              description="The atmosphere you can expect before you arrive."
            />
            <Reveal delay={0.1}>
              <Link href="/gallery" className="btn btn-ghost group shrink-0">
                See the full gallery
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-12">
            <RestaurantGallery images={restaurant.gallery.slice(0, 3)} />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
