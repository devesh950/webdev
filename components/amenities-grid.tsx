'use client';

import { MapPin, PartyPopper, ShieldCheck, Truck, Wifi, Wind } from 'lucide-react';

import { restaurant } from '@/data/restaurant';

const iconMap = {
  Wind,
  PartyPopper,
  MapPin,
  ShieldCheck,
  Truck,
  Wifi,
};

export function AmenitiesGrid() {
  return (
    <section className="section">
      <div className="shell">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">The Experience</p>
          <h2 className="mt-4 text-display-md text-ivory">
            Crafted for Comfort &amp; Celebration
          </h2>
          <p className="mt-3 text-[1rem] leading-relaxed text-[var(--muted)]">
            Everything in our dining hall and banquet zone has been planned so that every member of the family feels completely at home.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurant.amenities.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || ShieldCheck;
            return (
              <div
                key={item.name}
                className="flex items-start gap-4 rounded-card border border-[var(--line)] bg-[var(--surface)] p-6 transition-colors hover:border-[rgba(200,169,107,0.35)] hover:bg-[var(--surface-raised)]"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[rgba(200,169,107,0.35)] bg-[rgba(200,169,107,0.1)] text-[var(--gold)]">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-ivory">{item.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
