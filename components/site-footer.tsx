import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

import { siteConfig } from '@/lib/site';

export function SiteFooter() {
  const email = siteConfig.enquiryEmail;

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
                <span className="font-display text-[1.15rem] text-ivory">Hajipur Food</span>
                <span className="mt-1 text-[0.56rem] uppercase tracking-[0.34em] text-[var(--gold)]">
                  {siteConfig.location.label}
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-[34ch] font-display text-[1.35rem] italic leading-snug text-[var(--gold-soft)]">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 max-w-[40ch] text-[0.875rem] leading-relaxed text-[var(--muted)]">
              {siteConfig.supportingTagline}
            </p>

            <div className="mt-7 flex flex-col gap-3 text-[0.875rem] text-[var(--muted)]">
              <p className="flex items-center gap-2.5">
                <MapPin size={15} className="shrink-0 text-[var(--gold)]" aria-hidden="true" />
                <span>{siteConfig.location.label}, {siteConfig.location.country}</span>
              </p>
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="flex w-fit items-center gap-2.5 transition-colors duration-300 hover:text-[var(--gold)]"
                >
                  <Mail size={15} className="shrink-0 text-[var(--gold)]" aria-hidden="true" />
                  <span>{email}</span>
                </a>
              ) : (
                <Link
                  href="/partner"
                  className="flex w-fit items-center gap-2.5 transition-colors duration-300 hover:text-[var(--gold)]"
                >
                  <Mail size={15} className="shrink-0 text-[var(--gold)]" aria-hidden="true" />
                  <span>Send a website enquiry</span>
                </Link>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="grid gap-10 sm:grid-cols-3">
            {siteConfig.footerNav.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-[0.6875rem] uppercase tracking-[0.24em] text-[var(--gold)]">
                  {column.title}
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-[0.875rem] text-[var(--muted)] transition-colors duration-300 hover:text-ivory"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={13}
                          className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <hr className="hairline my-12" />

        <div className="flex flex-col gap-5 text-[0.75rem] text-[var(--muted-dim)] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="max-w-[60ch] leading-relaxed">
            Restaurant photography on this site is illustrative stock imagery and is not a
            photograph of the restaurant shown. Details are published where verified and
            labelled where not.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors duration-300 hover:text-ivory">
              Privacy Policy
            </Link>
            <Link href="/partner" className="transition-colors duration-300 hover:text-ivory">
              Build My Restaurant Website
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}