import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';

import { Reveal } from '@/components/reveal';
import { restaurant } from '@/data/restaurant';

/**
 * The recurring call to action. Used at the natural end of each section so the
 * next step is always obvious without the page feeling pushy.
 */
export function CtaBand({
  eyebrow = 'Reserve & Visit',
  title = 'A table is waiting for your family.',
  description = 'Centrally situated on Lower Dakbunglow Road above HDFC Bank in Hajipur. Join us for lunch, dinner or book in advance for celebrations.',
  primaryLabel = 'Get Directions',
  primaryHref = restaurant.googleMaps.directionsUrl,
  secondaryLabel = 'Contact & Timings',
  secondaryHref = '/contact',
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  const primaryIsExternal = primaryHref.startsWith('http');

  return (
    <section className="section-tight relative overflow-hidden border-block border-[var(--line)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_28rem_at_50%_0%,rgba(200,169,107,0.13),transparent_65%)]"
      />

      <div className="shell">
        <Reveal className="relative mx-auto max-w-[54rem] text-center">
          <span className="hairline mx-auto mb-8 block w-16" aria-hidden="true" />

          <p className="eyebrow justify-center">{eyebrow}</p>

          <h2 className="mt-6 text-display-md text-ivory">{title}</h2>

          <p className="mx-auto mt-6 max-w-[52rem] text-[1.0625rem] leading-relaxed text-[var(--muted)]">
            {description}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {primaryIsExternal ? (
              <a
                href={primaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary group w-full sm:w-auto"
              >
                {primaryLabel}
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
                />
              </a>
            ) : (
              <Link href={primaryHref} className="btn btn-primary group w-full sm:w-auto">
                {primaryLabel}
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
                />
              </Link>
            )}
            <Link href={secondaryHref} className="btn btn-ghost w-full sm:w-auto">
              <MapPin size={15} aria-hidden="true" className="text-[var(--gold)]" />
              {secondaryLabel}
            </Link>
          </div>

          <p className="mt-7 text-[0.8125rem] text-[var(--muted-dim)]">
            {restaurant.address.fullFormatted} · Helpline: {restaurant.contact.phoneFormatted}
          </p>
        </Reveal>
      </div>
    </section>
  );
}