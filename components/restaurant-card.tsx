import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';

import { PhotoFrame } from '@/components/photo-frame';
import type { Restaurant } from '@/data/restaurants';
import { hasVerifiedContact } from '@/data/restaurants';

/**
 * Discovery card. Deliberately shows no rating, review count, price band or
 * "open now" badge — we have not verified any of those, and inventing them
 * would misrepresent these businesses.
 */
export function RestaurantCard({
  restaurant,
  index,
  priority = false,
}: {
  restaurant: Restaurant;
  index?: number;
  priority?: boolean;
}) {
  const contactable = hasVerifiedContact(restaurant);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-[var(--line)] bg-[var(--surface)] transition-[transform,border-color,box-shadow] duration-700 ease-editorial hover:-translate-y-1.5 hover:border-[rgba(200,169,107,0.4)] hover:shadow-lift">
      {/* Image */}
      <Link
        href={`/restaurants/${restaurant.slug}`}
        className="relative block aspect-[4/3] overflow-hidden sm:aspect-[16/10]"
        tabIndex={-1}
        aria-hidden="true"
      >
        <PhotoFrame
          image={restaurant.heroImage}
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          zoom
          className="absolute inset-0 h-full w-full"
        />
        <span className="image-veil" aria-hidden="true" />

        {/* Index sits top-left, the editorial kicker top-right, and the image
            credit bottom-left (rendered by PhotoFrame) — so nothing collides. */}
        <span className="absolute left-4 top-4">
          {typeof index === 'number' ? (
            <span className="rounded-full border border-[var(--line-strong)] bg-[rgba(10,10,9,0.6)] px-2.5 py-1 text-[0.625rem] tracking-[0.2em] text-ivory backdrop-blur-md">
              {String(index + 1).padStart(2, '0')}
            </span>
          ) : null}
        </span>

        <span className="absolute right-4 top-4 max-w-[60%] text-right text-[0.625rem] uppercase leading-tight tracking-[0.18em] text-[var(--gold-soft)]">
          {restaurant.kicker}
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--muted-dim)]">
          <MapPin size={12} className="text-[var(--gold)]" aria-hidden="true" />
          {restaurant.address.city}, {restaurant.address.region}
        </p>

        <h3 className="mt-3 font-display text-[1.45rem] leading-tight text-ivory">
          <Link
            href={`/restaurants/${restaurant.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {restaurant.name}
          </Link>
        </h3>

        <p className="mt-1.5 text-[0.75rem] uppercase tracking-[0.14em] text-[var(--gold)]">
          {restaurant.category}
        </p>

        <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
          {restaurant.summary}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Cuisine highlights">
          {restaurant.cuisineHighlights.slice(0, 3).map((highlight) => (
            <li key={highlight.label} className="tag">
              {highlight.label}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-5">
          <span className="inline-flex items-center gap-2 text-[0.875rem] text-ivory transition-colors duration-300 group-hover:text-[var(--gold)]">
            Explore Restaurant
            <ArrowRight
              size={15}
              className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>

          {/* An external link is shown only when a verified route exists. */}
          {contactable ? (
            <a
              href={restaurant.googleMaps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 text-[0.75rem] text-[var(--muted-dim)] underline-offset-4 hover:text-[var(--gold)] hover:underline"
              onClick={(event) => event.stopPropagation()}
            >
              Directions
            </a>
          ) : (
            <span className="text-[0.75rem] text-[var(--muted-dim)]">Google Maps</span>
          )}
        </div>
      </div>
    </article>
  );
}