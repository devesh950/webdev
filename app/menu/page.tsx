import type { Metadata } from 'next';
import { ChefHat, Clock, MessageSquare, Phone, Sparkles, Utensils } from 'lucide-react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CtaBand } from '@/components/cta-band';
import { IllustrativeNote } from '@/components/illustrative-note';
import { MenuExplorer } from '@/components/menu-explorer';
import { ReservationButton } from '@/components/reservation-button';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { restaurant } from '@/data/restaurant';
import { siteConfig } from '@/lib/site';
import { breadcrumbStructuredData, jsonLdScript } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: `Menu & Pricing — ${restaurant.name}`,
  description: `Explore the complete multicuisine menu of ${restaurant.name} in Hajipur, Bihar. Authentic North Indian curries, Mughlai platters, slow-dum biryanis, tandoori starters, breads and mocktails with transparent prices.`,
  alternates: { canonical: '/menu' },
  openGraph: {
    title: `Digital Menu · ${restaurant.name}`,
    description: `Explore the complete culinary menu of ${restaurant.name} in Hajipur.`,
    url: '/menu',
  },
};

export default function MenuPage() {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
  ];

  return (
    <>
      {/* Header */}
      <header className="relative overflow-hidden border-b border-[var(--line)] pb-14 pt-[calc(var(--nav-height)+3.5rem)] sm:pb-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(56rem_30rem_at_30%_0%,rgba(200,169,107,0.15),transparent_65%)]"
        />
        <div className="shell">
          <Breadcrumbs trail={trail} />
          <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading
              eyebrow="Our Culinary Repertoire"
              title="The Complete Menu &amp; Prices"
              description="From sizzling charcoal kebabs to rich slow-dum biryanis and velvety gravies. Freshly prepared to order."
              as="h1"
            />
            <div className="flex flex-wrap gap-3 shrink-0">
              <ReservationButton>Reserve a Table</ReservationButton>
              <a
                href={`tel:${restaurant.contact.phone}`}
                className="btn btn-ghost"
              >
                <Phone size={14} className="text-[var(--gold)]" />
                Order Takeaway
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Highlight Banners */}
      <section className="section-tight border-b border-[var(--line)] bg-[var(--surface-sunken)]">
        <div className="shell">
          <div className="grid gap-4 sm:grid-cols-3 text-xs text-[var(--muted)]">
            <div className="flex items-center gap-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[rgba(200,169,107,0.12)] text-[var(--gold)]">
                <ChefHat size={18} />
              </span>
              <div>
                <p className="font-semibold text-ivory">Authentic Recipes</p>
                <p>Awadhi &amp; North Indian masalas ground in-house</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[rgba(200,169,107,0.12)] text-[var(--gold)]">
                <Sparkles size={18} />
              </span>
              <div>
                <p className="font-semibold text-ivory">Pure Hygiene Protocol</p>
                <p>Strict segregation for pure vegetarian &amp; non-vegetarian</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[rgba(200,169,107,0.12)] text-[var(--gold)]">
                <Clock size={18} />
              </span>
              <div>
                <p className="font-semibold text-ivory">Served Hot &amp; Fresh</p>
                <p>Available daily from 11:00 AM to 10:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Menu Section */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <MenuExplorer />
          </Reveal>

          <Reveal delay={0.15} className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 rounded-xl border border-[rgba(200,169,107,0.3)] bg-[var(--surface-raised)] p-6 text-sm">
              <div className="text-left">
                <p className="font-display text-base text-ivory">Looking for Custom Party / Banquet Catering?</p>
                <p className="text-xs text-[var(--muted)]">
                  We create tailored fixed-price buffet packages for groups of 20 to 70 guests.
                </p>
              </div>
              <a
                href={`https://wa.me/${restaurant.contact.whatsapp}?text=${encodeURIComponent(
                  'Hello! I would like to enquire about party catering / bulk menu packages at The Taj Hajipur.',
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary text-xs shrink-0"
              >
                <MessageSquare size={14} />
                Discuss Banquet Menu
              </a>
            </div>
          </Reveal>

          <div className="mt-8">
            <IllustrativeNote />
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to taste the royal flavours?"
        description="Join us today on the 2nd Floor, Above HDFC Bank, Lower Dakbunglow Road, Hajipur. Walk-ins welcome; table reservations recommended for large groups."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbStructuredData(trail)) }}
      />
    </>
  );
}
