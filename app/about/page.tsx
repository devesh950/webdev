import type { Metadata } from 'next';
import { ArrowRight, Award, CheckCircle2, MapPin, Phone, ShieldCheck, Sparkles, Star, Users, Utensils } from 'lucide-react';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand } from '@/components/cta-band';
import { IllustrativeNote } from '@/components/illustrative-note';
import { PhotoFrame } from '@/components/photo-frame';
import { ReservationButton } from '@/components/reservation-button';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { restaurant } from '@/data/restaurant';
import { siteConfig } from '@/lib/site';
import { breadcrumbStructuredData, jsonLdScript } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: `About Us — ${restaurant.name}`,
  description: `Discover the story and royal hospitality of ${restaurant.name} on Lower Dakbunglow Road, Hajipur, Bihar. Authentic North Indian, Mughlai and multicuisine dining for families and grand celebrations.`,
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
          className="absolute inset-0 -z-10 bg-[radial-gradient(56rem_30rem_at_30%_0%,rgba(200,169,107,0.15),transparent_62%)]"
        />
        <div className="shell">
          <Breadcrumbs trail={trail} />
          <SectionHeading
            className="mt-8"
            eyebrow="Our Heritage &amp; Passion"
            title="Royal Flavours &amp; Warm Family Hospitality in Hajipur"
            description={restaurant.tagline}
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

              {/* Our Pillars */}
              <Reveal delay={0.15} className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-[rgba(200,169,107,0.12)] text-[var(--gold)]">
                      <Utensils size={18} />
                    </span>
                    <h3 className="mt-3 font-display text-base text-ivory">From-Scratch Cooking</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                      Slow-roasted whole spices, authentic clay tandoor grilling, and velvety tomato gravies simmered to royal consistency.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-[rgba(200,169,107,0.12)] text-[var(--gold)]">
                      <ShieldCheck size={18} />
                    </span>
                    <h3 className="mt-3 font-display text-base text-ivory">Hygiene &amp; Quality</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                      Freshly sourced cottage cheese, choice cuts of meat, and dedicated pure vegetarian preparation stations.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2} className="mt-4 flex flex-wrap gap-3.5">
                <ReservationButton>Reserve a Table</ReservationButton>
                <Link href="/menu" className="btn btn-ghost group">
                  Explore Full Menu
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
                  />
                </Link>
                <Link href="/location" className="btn btn-ghost">
                  Get Directions
                </Link>
              </Reveal>

              {/* Cuisine Highlights */}
              <Reveal delay={0.1} className="mt-10">
                <section id="cuisine" className="scroll-mt-28">
                  <p className="eyebrow">Our Kitchen</p>
                  <h2 className="mt-2 font-display text-[1.6rem] text-ivory">What We Specialize In</h2>
                  <div className="mt-6 flex flex-col gap-4">
                    {restaurant.cuisineHighlights.map((highlight) => (
                      <div
                        key={highlight.label}
                        className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 transition-colors hover:border-[rgba(200,169,107,0.35)]"
                      >
                        <h3 className="font-display text-lg text-[var(--gold)]">{highlight.label}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                          {highlight.description}
                        </p>
                      </div>
                    ))}
                  </div>
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
                    className="aspect-[4/5] w-full rounded-card shadow-xl"
                  />
                  <figcaption className="mt-4">
                    <IllustrativeNote />
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="rounded-card border border-[rgba(200,169,107,0.35)] bg-[var(--surface-raised)] p-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-medium">
                      At a Glance
                    </h2>
                    <span className="flex items-center gap-1 text-xs text-[var(--gold)]">
                      <Star size={12} fill="currentColor" />
                      4.3 (500+ Reviews)
                    </span>
                  </div>

                  <dl className="mt-4 flex flex-col gap-3.5 text-xs">
                    <div>
                      <dt className="text-[var(--muted-dim)]">Address</dt>
                      <dd className="mt-0.5 text-ivory font-medium">
                        {restaurant.address.line1}, {restaurant.address.landmark}, {restaurant.address.city}
                      </dd>
                    </div>

                    <div className="border-t border-[var(--line)] pt-2.5">
                      <dt className="text-[var(--muted-dim)]">Operating Hours</dt>
                      <dd className="mt-0.5 text-ivory font-medium">
                        11:00 AM – 10:30 PM (Mon – Sun)
                      </dd>
                    </div>

                    <div className="border-t border-[var(--line)] pt-2.5">
                      <dt className="text-[var(--muted-dim)]">Cuisine Style</dt>
                      <dd className="mt-0.5 text-ivory font-medium">
                        North Indian, Mughlai, Tandoor &amp; Indo-Chinese
                      </dd>
                    </div>

                    <div className="border-t border-[var(--line)] pt-2.5">
                      <dt className="text-[var(--muted-dim)]">Average Cost</dt>
                      <dd className="mt-0.5 text-ivory font-medium">
                        {restaurant.averageCostForTwo} for two
                      </dd>
                    </div>

                    <div className="border-t border-[var(--line)] pt-2.5">
                      <dt className="text-[var(--muted-dim)]">Helpline &amp; WhatsApp</dt>
                      <dd className="mt-0.5 text-ivory font-medium">
                        <a href={`tel:${restaurant.contact.phone}`} className="text-[var(--gold)] hover:underline">
                          {restaurant.contact.phoneFormatted}
                        </a>
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6 border-t border-[var(--line)] pt-5">
                    <ReservationButton className="w-full justify-center">
                      Book a Table
                    </ReservationButton>
                  </div>
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