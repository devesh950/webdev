import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand } from '@/components/cta-band';
import { IllustrativeNote } from '@/components/illustrative-note';
import { PhotoFrame } from '@/components/photo-frame';
import { Reveal } from '@/components/reveal';
import { RestaurantCard } from '@/components/restaurant-card';
import { RestaurantGallery } from '@/components/restaurant-gallery';
import { SectionHeading } from '@/components/section-heading';
import { UnverifiedPanel } from '@/components/unverified-panel';
import { getRelatedRestaurants, getRestaurant, restaurants } from '@/data/restaurants';
import { siteConfig } from '@/lib/site';
import {
  breadcrumbStructuredData,
  jsonLdScript,
  restaurantStructuredData,
} from '@/lib/structured-data';
import { absoluteUrl } from '@/lib/utils';

import { ContactCard, DirectionsCard } from './_components';

type PageProps = { params: Promise<{ slug: string }> };

/**
 * The listing set is closed and data-driven: anything not returned by
 * `generateStaticParams` is a genuine 404 rather than an on-demand render.
 * This also guarantees a correct HTTP status for missing slugs.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return restaurants.map((restaurant) => ({ slug: restaurant.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = getRestaurant(slug);

  if (!restaurant) {
    return {
      title: 'Restaurant not found',
      description: 'This restaurant is not listed on Hajipur Food.',
      robots: { index: false, follow: true },
    };
  }

  const url = `/restaurants/${restaurant.slug}`;

  return {
    title: `${restaurant.name} — ${restaurant.category} in Hajipur`,
    description: `${restaurant.summary} View cuisine highlights, signature dishes and directions to ${restaurant.name} in ${siteConfig.location.label}.`,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title: `${restaurant.name} · ${siteConfig.name}`,
      description: restaurant.summary,
      url,
      images: [
        {
          url: restaurant.heroImage.src,
          width: 1400,
          height: 1000,
          alt: restaurant.heroImage.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${restaurant.name} · ${siteConfig.name}`,
      description: restaurant.summary,
    },
  };
}

export default async function RestaurantDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const restaurant = getRestaurant(slug);

  if (!restaurant) notFound();

  const related = getRelatedRestaurants(restaurant, 3);
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: restaurant.name, path: `/restaurants/${restaurant.slug}` },
  ];

  const hasMenu = restaurant.menu.length > 0;
  const hasHours = Boolean(restaurant.openingHours?.length);

  return (
    <>
      {/* ================================================== hero */}
      <header className="relative">
        <div className="relative h-[62svh] min-h-[420px] w-full overflow-hidden sm:h-[70svh]">
          <PhotoFrame
            image={restaurant.heroImage}
            priority
            sizes="100vw"
            showCredit={false}
            className="absolute inset-0 h-full w-full"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,9,0.82)_0%,rgba(10,10,9,0.35)_40%,rgba(16,16,16,0.96)_100%)]"
          />
          <div className="credit-chip absolute bottom-4 left-[var(--gutter)] z-10">
            {restaurant.heroImage.credit}
          </div>
        </div>

        <div className="shell relative -mt-40 pb-8 sm:-mt-48">
          <Breadcrumbs trail={trail} />

          <div className="mt-7 max-w-[24ch]">
            <p className="text-[0.6875rem] uppercase tracking-[0.24em] text-[var(--gold)]">
              {restaurant.category}
            </p>
            <h1 className="mt-4 text-display-lg text-ivory">{restaurant.name}</h1>
            <p className="mt-5 max-w-[54ch] text-[1.0625rem] leading-relaxed text-[var(--muted)] sm:text-[1.125rem]">
              {restaurant.summary}
            </p>
          </div>
        </div>
      </header>

      {/* ================================================== body */}
      <section className="section-tight">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_0.5fr] lg:gap-16">
            {/* ---------------------------------------- main column */}
            <div className="flex flex-col gap-14">
              <Reveal>
                <div>
                  <p className="eyebrow">Introduction</p>
                  <div className="mt-6 flex flex-col gap-5">
                    {restaurant.introduction.map((paragraph) => (
                      <p key={paragraph} className="prose-body">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Cuisine highlights */}
              <Reveal>
                <section aria-labelledby="cuisine-heading">
                  <h2 id="cuisine-heading" className="font-display text-[1.6rem] text-ivory">
                    Cuisine highlights
                  </h2>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {restaurant.cuisineHighlights.map((highlight) => (
                      <li
                        key={highlight.label}
                        className="flex items-center justify-between gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-5 py-4"
                      >
                        <span className="text-[0.9375rem] text-ivory">
                          {highlight.label}
                        </span>
                        <span className="tag tag-muted">
                          {highlight.verification === 'verified' ? 'Verified' : 'Supplied'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              {/* Signature dishes */}
              <Reveal>
                <section aria-labelledby="dishes-heading">
                  <h2 id="dishes-heading" className="font-display text-[1.6rem] text-ivory">
                    Known for
                  </h2>
                  <ul className="mt-6 flex flex-col gap-4">
                    {restaurant.signatureDishes.map((dish) => (
                      <li
                        key={dish.name}
                        className="group rounded-card border border-[var(--line)] bg-[var(--surface)] p-6 transition-colors duration-500 hover:border-[rgba(200,169,107,0.35)]"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h3 className="font-display text-[1.2rem] text-ivory">
                            {dish.name}
                          </h3>
                          <span className="tag tag-muted">
                            {dish.verification === 'verified'
                              ? 'Verified'
                              : 'From supplied description'}
                          </span>
                        </div>
                        <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                          {dish.detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              {/* Menu — only ever rendered from verified items */}
              <Reveal>
                <section aria-labelledby="menu-heading">
                  <h2 id="menu-heading" className="font-display text-[1.6rem] text-ivory">
                    Menu
                  </h2>
                  <div className="mt-6">
                    {hasMenu ? (
                      <ul className="flex flex-col gap-2">
                        {restaurant.menu.map((item) => (
                          <li
                            key={item.name}
                            className="flex items-baseline justify-between gap-6 border-b border-[var(--line)] py-4"
                          >
                            <span>
                              <span className="text-[1rem] text-ivory">{item.name}</span>
                              {item.description ? (
                                <span className="mt-1 block text-[0.875rem] text-[var(--muted)]">
                                  {item.description}
                                </span>
                              ) : null}
                            </span>
                            {item.price ? (
                              <span className="shrink-0 font-display text-[1.05rem] text-[var(--gold)]">
                                {item.price}
                              </span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <UnverifiedPanel
                        title="No verified menu published yet"
                        description={`${restaurant.name} has not shared an official menu or price list with us, and we will never present an invented one as official. The Google Maps listing below is the most reliable source for current dishes and prices.`}
                        action={
                          <a
                            href={restaurant.googleMaps.listingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost"
                          >
                            View listing on Google Maps
                          </a>
                        }
                      />
                    )}
                  </div>
                </section>
              </Reveal>

              {/* Gallery */}
              <Reveal>
                <section aria-labelledby="gallery-heading">
                  <h2 id="gallery-heading" className="font-display text-[1.6rem] text-ivory">
                    Gallery
                  </h2>
                  <p className="mt-2 text-[0.875rem] text-[var(--muted-dim)]">
                    Licensed stock imagery for atmosphere. Restaurant photography is not yet
                    available for this listing.
                  </p>
                  <div className="mt-6">
                    <RestaurantGallery images={restaurant.gallery} />
                  </div>
                </section>
              </Reveal>

              {/* Honesty notice */}
              <Reveal>
                <div className="rounded-card border border-[var(--line)] bg-[rgba(247,243,235,0.02)] p-6">
                  <h2 className="text-[0.75rem] uppercase tracking-[0.2em] text-[var(--gold)]">
                    About this listing
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                    {restaurant.contentNote}
                  </p>
                  <div className="mt-4">
                    <IllustrativeNote />
                  </div>
                  {siteConfig.enquiryEmail ? (
                    <p className="mt-4 text-[0.875rem] text-[var(--muted)]">
                      Corrections welcome — write to{' '}
                      <a
                        href={`mailto:${siteConfig.enquiryEmail}?subject=${encodeURIComponent(
                          `Listing correction: ${restaurant.name}`,
                        )}`}
                        className="text-[var(--gold)] underline underline-offset-4"
                      >
                        {siteConfig.enquiryEmail}
                      </a>
                      .
                    </p>
                  ) : null}
                </div>
              </Reveal>
            </div>

            {/* ---------------------------------------- side rail */}
            <aside className="lg:sticky lg:top-[calc(var(--nav-height)+2rem)] lg:self-start">
              <div className="flex flex-col gap-6">
                <DirectionsCard restaurant={restaurant} />
                <ContactCard restaurant={restaurant} />

                {/* Info that we do not have */}
                {!hasHours ? (
                  <div className="rounded-card border border-dashed border-[var(--line-strong)] bg-[rgba(247,243,235,0.02)] p-6">
                    <h2 className="text-[0.75rem] uppercase tracking-[0.2em] text-[var(--muted-dim)]">
                      Opening hours
                    </h2>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                      Not verified. Check the Google Maps listing for current hours before
                      travelling.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-card border border-[var(--line)] bg-[var(--surface)] p-6">
                    <h2 className="text-[0.75rem] uppercase tracking-[0.2em] text-[var(--muted-dim)]">
                      Opening hours
                    </h2>
                    <dl className="mt-4 flex flex-col gap-2">
                      {restaurant.openingHours?.map((slot) => (
                        <div key={slot.days} className="flex justify-between gap-4 text-[0.875rem]">
                          <dt className="text-[var(--muted)]">{slot.days}</dt>
                          <dd className="text-ivory">
                            {slot.opens} – {slot.closes}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                <div className="rounded-card border border-[var(--line)] bg-[var(--surface)] p-6">
                  <h2 className="text-[0.75rem] uppercase tracking-[0.2em] text-[var(--muted-dim)]">
                    Location
                  </h2>
                  <address className="mt-3 text-[0.9375rem] not-italic leading-relaxed text-[var(--muted)]">
                    {restaurant.address.street ? (
                      <>
                        {restaurant.address.street}
                        <br />
                      </>
                    ) : null}
                    {restaurant.address.locality ?? restaurant.address.city},{' '}
                    {restaurant.address.region}
                    <br />
                    {restaurant.address.country}
                  </address>
                  <p className="mt-3 text-[0.8125rem] text-[var(--muted-dim)]">
                    Street-level address not published by the restaurant yet.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ================================================== related */}
      {related.length > 0 ? (
        <section className="section section-alt">
          <div className="shell">
            <SectionHeading
              eyebrow="Keep exploring"
              title="You might also like"
              description="More places across Hajipur, grouped by the kind of meal they suit."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((item, index) => (
                <RestaurantCard key={item.slug} restaurant={item} index={index} />
              ))}
            </div>
            <Reveal className="mt-10 flex justify-center">
              <Link href="/restaurants" className="btn btn-ghost">
                Back to all restaurants
              </Link>
            </Reveal>
          </div>
        </section>
      ) : null}

      <CtaBand
        eyebrow="Own a restaurant?"
        title="A website like this one, built for your tables."
        description="If you run a restaurant in Hajipur and want your own branded site with a menu, gallery, location and enquiry form, we build it."
        primaryLabel="Build My Restaurant Website"
        primaryHref="/partner"
        secondaryLabel="Request a Free Website Consultation"
        secondaryHref="/partner#consultation"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(restaurantStructuredData(restaurant)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbStructuredData(trail)) }}
      />
    </>
  );
}