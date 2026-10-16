/**
 * Detail-page side-rail cards.
 *
 * The "Contact Restaurant" button only renders when the restaurant has a
 * verified phone / WhatsApp / email on file. There is no fallback button and
 * no placeholder link — an unimplemented contact route would be worse than an
 * absent one.
 */

import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

import type { Restaurant } from '@/data/restaurants';
import { hasVerifiedContact } from '@/data/restaurants';

function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

export function DirectionsCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="rounded-card border border-[var(--line)] bg-[var(--surface)] p-6">
      <h2 className="text-[0.75rem] uppercase tracking-[0.2em] text-[var(--muted-dim)]">
        Visit
      </h2>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
        {restaurant.address.locality ?? restaurant.address.city},{' '}
        {restaurant.address.region}
      </p>

      <div className="mt-5 flex flex-col gap-2.5">
        <ExternalLink
          href={restaurant.googleMaps.directionsUrl}
          className="btn btn-primary w-full"
        >
          <MapPin size={15} aria-hidden="true" />
          Get Directions
        </ExternalLink>

        <ExternalLink
          href={restaurant.googleMaps.listingUrl}
          className="btn btn-ghost w-full"
        >
          View Google Listing
          <ArrowUpRight size={14} aria-hidden="true" />
        </ExternalLink>
      </div>

      <p className="mt-4 text-[0.75rem] leading-relaxed text-[var(--muted-dim)]">
        Opens the confirmed Google Maps record for this restaurant in a new tab.
      </p>
    </div>
  );
}

export function ContactCard({ restaurant }: { restaurant: Restaurant }) {
  const { phone, whatsapp, email } = restaurant.contact;
  const contactable = hasVerifiedContact(restaurant);

  if (!contactable) {
    return (
      <div className="rounded-card border border-dashed border-[var(--line-strong)] bg-[rgba(247,243,235,0.02)] p-6">
        <h2 className="text-[0.75rem] uppercase tracking-[0.2em] text-[var(--muted-dim)]">
          Contact
        </h2>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
          No verified phone number or email has been supplied for this restaurant yet. The
          Google Maps listing is the best way to reach them.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-[var(--line)] bg-[var(--surface)] p-6">
      <h2 className="text-[0.75rem] uppercase tracking-[0.2em] text-[var(--muted-dim)]">
        Contact Restaurant
      </h2>
      <div className="mt-4 flex flex-col gap-2.5">
        {phone ? (
          <a href={`tel:${phone.replace(/\s/g, '')}`} className="btn btn-ghost w-full">
            <Phone size={15} aria-hidden="true" />
            Call {phone}
          </a>
        ) : null}
        {whatsapp ? (
          <ExternalLink
            href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
            className="btn btn-ghost w-full"
          >
            <MessageCircle size={15} aria-hidden="true" />
            WhatsApp
          </ExternalLink>
        ) : null}
        {email ? (
          <a
            href={`mailto:${email}?subject=${encodeURIComponent(`Enquiry: ${restaurant.name}`)}`}
            className="btn btn-ghost w-full"
          >
            <Mail size={15} aria-hidden="true" />
            Email
          </a>
        ) : null}
      </div>
    </div>
  );
}