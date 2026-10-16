import { ArrowUpRight, Clock3, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

import { restaurant } from '@/data/restaurant';
import { siteConfig } from '@/lib/site';

export function SiteFooter() {
  const email = siteConfig.enquiryEmail;
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--line)] bg-[var(--charcoal-deep)]">
      <div className="shell-wide py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_2fr]">
          {/* Identity */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(200,169,107,0.4)] bg-[rgba(200,169,107,0.08)]"
              >
                <svg viewBox="0 0 40 40" className="h-5 w-5" fill="none" stroke="var(--gold)" strokeWidth="2.4" strokeLinecap="round">
                  <circle cx="20" cy="20" r="13" />
                  <path d="M7 20h26" />
                </svg>
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[1.15rem] text-ivory">The Taj</span>
                <span className="mt-1 text-[0.56rem] uppercase tracking-[0.3em] text-[var(--gold)]">
                  Multicuisine Restaurant
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-[34ch] font-display text-[1.35rem] italic leading-snug text-[var(--gold-soft)]">
              {restaurant.summary}
            </p>

            <ul className="mt-8 flex flex-col gap-3 text-[0.875rem] text-[var(--muted)]">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-[var(--gold)]" aria-hidden="true" />
                <span>
                  {restaurant.address.locality}, {restaurant.address.region},{' '}
                  {restaurant.address.country}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock3 size={15} className="mt-0.5 shrink-0 text-[var(--gold)]" aria-hidden="true" />
                <span>Opening hours — {restaurant.pendingNote.toLowerCase()}</span>
              </li>
              {email ? (
                <li className="flex items-start gap-2.5">
                  <Mail size={15} className="mt-0.5 shrink-0 text-[var(--gold)]" aria-hidden="true" />
                  <a
                    href={`mailto:${email}`}
                    className="transition-colors duration-300 hover:text-[var(--gold)]"
                  >
                    {email}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          {/* Navigation */}
          <div className="grid gap-10 sm:grid-cols-3">
            {siteConfig.footerNav.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-[0.6875rem] uppercase tracking-[0.24em] text-[var(--gold)]">
                  {column.title}
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {column.links.map((link) => {
                    const external = 'external' in link && link.external;
                    const classes =
                      'group inline-flex items-center gap-1 text-[0.875rem] text-[var(--muted)] transition-colors duration-300 hover:text-ivory';

                    return (
                      <li key={link.href + link.label}>
                        {external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes}
                          >
                            {link.label}
                            <ArrowUpRight size={13} className="opacity-60" aria-hidden="true" />
                          </a>
                        ) : (
                          <Link href={link.href} className={classes}>
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <hr className="hairline my-12" />

        <div className="flex flex-col gap-5 text-[0.75rem] text-[var(--muted-dim)] md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {restaurant.name}. All rights reserved.
          </p>
          <p className="max-w-[62ch] leading-relaxed">
            Photography on this site is illustrative stock imagery and is not a photograph of
            this restaurant. Menu, opening hours and contact details are published once
            confirmed directly by the restaurant.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors duration-300 hover:text-ivory">
              Privacy Policy
            </Link>
            <a
              href={restaurant.googleMaps.listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-ivory"
            >
              Google Maps
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}