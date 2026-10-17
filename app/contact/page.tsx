import type { Metadata } from 'next';
import { Calendar, Clock3, ExternalLink, Mail, MapPin, MessageCircle, Navigation, Phone, Sparkles, Utensils } from 'lucide-react';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { ReservationButton } from '@/components/reservation-button';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { restaurant } from '@/data/restaurant';
import { breadcrumbStructuredData, jsonLdScript } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: `Contact & Reservations — ${restaurant.name}`,
  description: `Get in touch with ${restaurant.name} in Hajipur, Bihar. Phone: ${restaurant.contact.phoneFormatted}. Address: 2nd Floor, Above HDFC Bank, Lower Dakbunglow Road. Opening hours: 11:00 AM – 10:30 PM daily.`,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contact & Reservations · ${restaurant.name}`,
    description: `Contact and find ${restaurant.name} on Lower Dakbunglow Road, Hajipur, Bihar.`,
    url: '/contact',
  },
};

export default function ContactPage() {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
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
            eyebrow="Contact &amp; Reservations"
            title="We’d Love to Host You"
            description="Find our exact location, call our helpline, or reserve a table for your family feast or banquet celebration."
            as="h1"
          />
        </div>
      </header>

      <section className="section-tight">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* 1. Location Card */}
            <Reveal>
              <div className="flex h-full flex-col rounded-card border border-[var(--line)] bg-[var(--surface)] p-7 transition-colors hover:border-[rgba(200,169,107,0.4)]">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-[rgba(200,169,107,0.35)] bg-[rgba(200,169,107,0.1)] text-[var(--gold)]">
                  <MapPin size={20} aria-hidden="true" />
                </span>

                <h2 className="mt-6 font-display text-[1.35rem] text-ivory">
                  Restaurant Location
                </h2>

                <address className="mt-4 text-[0.9375rem] not-italic leading-relaxed text-[var(--muted)]">
                  <strong className="text-ivory block">{restaurant.name}</strong>
                  {restaurant.address.line1}
                  <br />
                  {restaurant.address.landmark}
                  <br />
                  {restaurant.address.city}, {restaurant.address.region} – {restaurant.address.postalCode}
                </address>

                <p className="mt-4 text-[0.8125rem] leading-relaxed text-[var(--gold)]">
                  ★ Landmark: Directly above HDFC Bank branch. 5 minutes from Hajipur Railway Station.
                </p>

                <div className="mt-auto flex flex-col gap-2.5 pt-7">
                  <a
                    href={restaurant.googleMaps.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full justify-center"
                  >
                    <Navigation size={15} />
                    Get Directions
                  </a>
                  <a
                    href={restaurant.googleMaps.listingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost w-full justify-center"
                  >
                    <ExternalLink size={14} />
                    View on Google Maps
                  </a>
                </div>
              </div>
            </Reveal>

            {/* 2. Direct Contacts & Ordering */}
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-card border border-[var(--line)] bg-[var(--surface)] p-7 transition-colors hover:border-[rgba(200,169,107,0.4)]">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-[rgba(200,169,107,0.35)] bg-[rgba(200,169,107,0.1)] text-[var(--gold)]">
                  <Phone size={20} aria-hidden="true" />
                </span>

                <h2 className="mt-6 font-display text-[1.35rem] text-ivory">
                  Direct Helpline
                </h2>

                <p className="mt-4 text-xs leading-relaxed text-[var(--muted)]">
                  Reach out for instant table booking, takeaway orders, home delivery dispatch, or banquet hall reservations.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={`tel:${restaurant.contact.phone}`}
                    className="btn btn-primary w-full justify-center"
                  >
                    <Phone size={15} />
                    Call: {restaurant.contact.phoneFormatted}
                  </a>

                  <a
                    href={`https://wa.me/${restaurant.contact.whatsapp}?text=${encodeURIComponent(
                      restaurant.contact.whatsappMessage,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost w-full justify-center border-emerald-600/40 text-emerald-800 font-semibold hover:bg-emerald-50"
                  >
                    <MessageCircle size={16} className="text-emerald-600" />
                    WhatsApp Us Directly
                  </a>

                  <a
                    href={`mailto:${restaurant.contact.email}?subject=${encodeURIComponent(
                      `Enquiry: ${restaurant.name} Hajipur`,
                    )}`}
                    className="btn btn-ghost w-full justify-center text-xs text-[var(--muted)]"
                  >
                    <Mail size={14} />
                    {restaurant.contact.email}
                  </a>
                </div>

                <div className="mt-auto pt-7">
                  <ReservationButton className="w-full justify-center">
                    Online Table Booking
                  </ReservationButton>
                </div>
              </div>
            </Reveal>

            {/* 3. Opening Hours & Banquet Info */}
            <Reveal delay={0.16}>
              <div className="flex h-full flex-col rounded-card border border-[var(--line)] bg-[var(--surface)] p-7 transition-colors hover:border-[rgba(200,169,107,0.4)]">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-[rgba(200,169,107,0.35)] bg-[rgba(200,169,107,0.1)] text-[var(--gold)]">
                  <Clock3 size={20} aria-hidden="true" />
                </span>

                <h2 className="mt-6 font-display text-[1.35rem] text-ivory">
                  Hours &amp; Banquets
                </h2>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-2.5">
                    <span className="text-[var(--muted)]">Monday – Sunday</span>
                    <span className="font-semibold text-ivory">11:00 AM – 10:30 PM</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-2.5">
                    <span className="text-[var(--muted)]">Lunch Service</span>
                    <span className="text-ivory">11:00 AM – 04:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-2.5">
                    <span className="text-[var(--muted)]">High Tea &amp; Snacks</span>
                    <span className="text-ivory">04:00 PM – 07:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-2.5">
                    <span className="text-[var(--muted)]">Dinner Service</span>
                    <span className="text-ivory">07:00 PM – 10:30 PM</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[var(--muted)]">Kitchen Last Call</span>
                    <span className="text-[var(--gold)]">10:00 PM</span>
                  </div>
                </div>

                <div className="mt-auto pt-7 rounded-lg border border-[var(--line)] bg-[var(--surface-raised)] p-4 text-xs">
                  <p className="font-semibold text-ivory flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[var(--gold)]" />
                    Banquets &amp; Private Parties
                  </p>
                  <p className="mt-1 text-[var(--muted)] leading-relaxed">
                    Host up to 70 guests in our dedicated air-conditioned celebration hall.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Quick FAQ Strip */}
          <div className="mt-12 rounded-card border border-[rgba(200,169,107,0.3)] bg-[var(--surface-raised)] p-8">
            <h3 className="font-display text-xl text-ivory">Visiting Tips</h3>
            <div className="mt-4 grid gap-6 sm:grid-cols-3 text-xs leading-relaxed text-[var(--muted)]">
              <div>
                <p className="font-semibold text-ivory">🚘 Parking &amp; Access</p>
                <p className="mt-1">
                  Ground-level parking space available along Lower Dakbunglow Road with convenient stair and elevator access up to the 2nd Floor.
                </p>
              </div>
              <div>
                <p className="font-semibold text-ivory">🌱 Dietary Options</p>
                <p className="mt-1">
                  Extensive pure vegetarian selections prepared with strict culinary separation alongside rich Mughlai and non-vegetarian delicacies.
                </p>
              </div>
              <div>
                <p className="font-semibold text-ivory">📦 Home Delivery &amp; Takeaway</p>
                <p className="mt-1">
                  Enjoy hot curries, tandoori breads, and dum biryani packed fresh in tamper-proof thermal packaging delivered across Hajipur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbStructuredData(trail)) }}
      />
    </>
  );
}