import type { Metadata } from 'next';
import { Clock3, ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { IllustrativeNote } from '@/components/illustrative-note';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { restaurant } from '@/data/restaurant';
import { breadcrumbStructuredData, jsonLdScript } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: `Contact — ${restaurant.name}`,
  description: `Contact and find ${restaurant.name} in ${restaurant.address.city}, ${restaurant.address.region}. Directions, address and opening hours.`,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contact · ${restaurant.name}`,
    description: `Contact and find ${restaurant.name} in ${restaurant.address.city}, ${restaurant.address.region}.`,
    url: '/contact',
  },
};

export default function ContactPage() {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];

  const { phone, whatsapp, email } = restaurant.contact;
  const hasContact = Boolean(phone || whatsapp || email);

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
            eyebrow="Contact"
            title="Get in touch"
            description="Find us, get directions, and reach the restaurant."
            as="h1"
          />
        </div>
      </header>

      <section className="section-tight">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Location + directions */}
            <Reveal>
              <div className="flex h-full flex-col rounded-card border border-[var(--line)] bg-[var(--surface)] p-7">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(200,169,107,0.35)] bg-[rgba(200,169,107,0.08)] text-[var(--gold)]">
                  <MapPin size={18} aria-hidden="true" />
                </span>

                <h2 className="mt-6 font-display text-[1.35rem] text-ivory">
                  {restaurant.name}
                </h2>

                <address className="mt-4 text-[0.9375rem] not-italic leading-relaxed text-[var(--muted)]">
                  {restaurant.address.locality}, {restaurant.address.region}
                  <br />
                  {restaurant.address.country}
                </address>

                <p className="mt-3 text-[0.8125rem] leading-relaxed text-[var(--muted-dim)]">
                  A street-level address has not been published by the restaurant yet. The
                  Google Maps listing carries the exact location.
                </p>

                <div className="mt-auto flex flex-col gap-2.5 pt-7">
                  <a
                    href={restaurant.googleMaps.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full"
                  >
                    Get Directions
                  </a>
                  <a
                    href={restaurant.googleMaps.listingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost w-full"
                  >
                    View Google Listing
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Direct contact */}
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-card border border-[var(--line)] bg-[var(--surface)] p-7">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(200,169,107,0.35)] bg-[rgba(200,169,107,0.08)] text-[var(--gold)]">
                  <MessageCircle size={18} aria-hidden="true" />
                </span>

                <h2 className="mt-6 font-display text-[1.35rem] text-ivory">
                  Contact details
                </h2>

                {hasContact ? (
                  <div className="mt-5 flex flex-col gap-3">
                    {phone ? (
                      <a
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="btn btn-ghost w-full"
                      >
                        <Phone size={15} aria-hidden="true" />
                        {phone}
                      </a>
                    ) : null}
                    {whatsapp ? (
                      <a
                        href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost w-full"
                      >
                        <MessageCircle size={15} aria-hidden="true" />
                        WhatsApp
                      </a>
                    ) : null}
                    {email ? (
                      <a
                        href={`mailto:${email}?subject=${encodeURIComponent(
                          `Enquiry: ${restaurant.name}`,
                        )}`}
                        className="btn btn-ghost w-full"
                      >
                        <Mail size={15} aria-hidden="true" />
                        {email}
                      </a>
                    ) : null}
                  </div>
                ) : (
                  <>
                    <p className="mt-5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                      No direct phone number or email has been published for this restaurant
                      yet. We would rather show you nothing than show you a number that does
                      not work.
                    </p>
                    <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                      In the meantime the Google Maps listing is the fastest and most
                      reliable way to reach us — it carries our current phone number and
                      messaging options.
                    </p>

                    <a
                      href={restaurant.googleMaps.listingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost mt-6 w-full"
                    >
                      <ExternalLink size={15} aria-hidden="true" />
                      Contact via Google Maps
                    </a>
                  </>
                )}
              </div>
            </Reveal>
          </div>

          {/* Opening hours */}
          <Reveal delay={0.12} className="mt-6">
            <div className="rounded-card border border-dashed border-[var(--line-strong)] bg-[rgba(247,243,235,0.02)] p-7">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--muted)]">
                <Clock3 size={18} aria-hidden="true" />
              </span>

              <h2 className="mt-6 font-display text-[1.25rem] text-ivory">Opening hours</h2>

              <p className="mt-3 max-w-[58ch] text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                Not published yet. Please check the Google Maps listing for current hours
                before travelling — it is the most up-to-date source we can point you to.
              </p>
            </div>
          </Reveal>

          {/* Helpful links */}
          <Reveal
            delay={0.16}
            className="mt-12 flex flex-wrap items-center gap-3 border-t border-[var(--line)] pt-10"
          >
            <p className="mr-2 text-[0.875rem] text-[var(--muted)]">
              Looking for something else?
            </p>
            <Link href="/menu" className="btn btn-ghost min-h-[42px] text-[0.8125rem]">
              See the menu
            </Link>
            <Link href="/location" className="btn btn-ghost min-h-[42px] text-[0.8125rem]">
              Location
            </Link>
            <Link href="/about" className="btn btn-ghost min-h-[42px] text-[0.8125rem]">
              About us
            </Link>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbStructuredData(trail)) }}
      />
    </>
  );
}