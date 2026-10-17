'use client';

import { Clock, ExternalLink, Instagram, Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import Link from 'next/link';

import { restaurant } from '@/data/restaurant';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative border-t border-stone-200/80 bg-[#FAF7F2] text-stone-900">
      {/* Top Banner with Frosted Glass Quick Actions */}
      <div className="border-b border-stone-200/80 bg-white/80 py-8 backdrop-blur-xl">
        <div className="shell flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-2xl font-bold text-stone-900">
              Join us for a dining experience like no other.
            </p>
            <p className="text-xs text-stone-600 mt-1 font-medium">
              {restaurant.address.landmark} · Hajipur, Bihar
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${restaurant.contact.phone}`}
              className="btn btn-ghost text-xs uppercase tracking-wider font-semibold"
            >
              <Phone size={13} className="text-amber-700" />
              Call: {restaurant.contact.phoneFormatted}
            </a>

            <a
              href={`https://wa.me/${restaurant.contact.whatsapp}?text=${encodeURIComponent(
                'Hello The Taj! I would like to enquire about table availability / booking in Hajipur.',
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-xs uppercase tracking-wider"
            >
              <MessageCircle size={14} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-display text-3xl font-bold tracking-tight text-stone-900">
                {restaurant.name}
              </span>
              <span className="block mt-1 text-[0.625rem] uppercase tracking-[0.28em] font-bold text-amber-800">
                Royal Awadhi &amp; Multicuisine
              </span>
            </Link>

            <p className="mt-4 text-xs leading-relaxed text-stone-600">
              {restaurant.summary}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={restaurant.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-sm transition-colors hover:border-amber-600 hover:text-amber-800"
              >
                <Instagram size={15} />
              </a>
              <a
                href={restaurant.googleMaps.listingUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps Listing"
                className="grid h-9 w-9 place-items-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-sm transition-colors hover:border-amber-600 hover:text-amber-800"
              >
                <MapPin size={15} />
              </a>
              <a
                href={`mailto:${restaurant.contact.email}`}
                aria-label="Email"
                className="grid h-9 w-9 place-items-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-sm transition-colors hover:border-amber-600 hover:text-amber-800"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Address & Landmark */}
          <div>
            <h3 className="text-[0.6875rem] font-bold uppercase tracking-[0.24em] text-amber-800">
              Address &amp; Landmark
            </h3>

            <address className="mt-4 text-xs not-italic leading-relaxed text-stone-700 space-y-1.5">
              <p className="text-sm font-semibold text-stone-900">{restaurant.name}</p>
              <p>{restaurant.address.line1}</p>
              <p className="text-amber-800 font-medium">{restaurant.address.landmark}</p>
              <p>{restaurant.address.city}, {restaurant.address.region} – {restaurant.address.postalCode}</p>
            </address>

            <div className="mt-5 flex flex-col gap-2">
              <a
                href={restaurant.googleMaps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 hover:underline"
              >
                <Navigation size={13} />
                Get GPS Directions
              </a>
              <a
                href={restaurant.googleMaps.listingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-stone-600 hover:text-stone-900"
              >
                <ExternalLink size={13} />
                View Google Verified Profile
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-[0.6875rem] font-bold uppercase tracking-[0.24em] text-amber-800">
              Opening Hours
            </h3>

            <div className="mt-4 text-xs space-y-3.5 text-stone-700">
              <div className="border-b border-stone-200/80 pb-3">
                <p className="font-semibold text-stone-900">Monday – Sunday</p>
                <p className="mt-1 flex items-center gap-2 text-amber-800 font-medium">
                  <Clock size={13} />
                  11:00 AM – 10:30 PM
                </p>
                <p className="mt-1 text-[0.6875rem] text-stone-500">
                  Continuous service for lunch, high tea &amp; dinner
                </p>
              </div>

              <div>
                <p className="font-semibold text-stone-900">Kitchen Last Order</p>
                <p className="mt-0.5 text-xs text-stone-600">10:00 PM every night</p>
              </div>
            </div>
          </div>

          {/* Google Maps Embed in Glass Card */}
          <div>
            <h3 className="text-[0.6875rem] font-bold uppercase tracking-[0.24em] text-amber-800">
              Hajipur Location Map
            </h3>

            <div className="mt-4 overflow-hidden rounded-2xl border border-stone-300 bg-white shadow-md">
              <iframe
                title="The Taj Multicuisine Restaurant Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.790938446215!2d85.2078!3d25.6888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58f70e000001%3A0x1!2sThe%20Taj%20Multicuisine%20Restaurant!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="160"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-95 hover:opacity-100 transition-opacity"
              />

              <div className="p-3 text-center bg-stone-50 border-t border-stone-200">
                <a
                  href={restaurant.googleMaps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-950"
                >
                  <MapPin size={12} />
                  <span>Open Full Directions in Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-stone-200/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {currentYear} {restaurant.name}, Hajipur. All rights reserved.</p>

          <p className="text-center md:text-right font-medium">
            Authentic North Indian &amp; Awadhi Fine Dining · 2nd Floor Above HDFC Bank
          </p>
        </div>
      </div>
    </footer>
  );
}