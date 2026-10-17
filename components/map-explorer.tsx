'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Info, MapPin, Navigation } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { restaurant } from '@/data/restaurant';

/**
 * A stylised locator, not a survey-accurate map.
 *
 * We have not published an exact street address for this restaurant, so the pin
 * sits on an abstract diagram of Hajipur around the Gandaki/Ganges confluence.
 * Every action links out to the verified Google Maps record, which is where
 * real navigation happens.
 */
export function MapExplorer() {
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_0.5fr]">
      {/* ------------------------------------------------------- diagram */}
      <div className="relative overflow-hidden rounded-card border border-[var(--line)] bg-[var(--surface-sunken)]">
        <svg
          viewBox="0 0 960 540"
          role="img"
          aria-label="Stylised locator diagram of Hajipur showing where The Taj Multicuisine Restaurant sits"
          className="block h-auto w-full"
        >
          <defs>
            <linearGradient id="hf-river" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <radialGradient id="hf-halo">
              <stop offset="0%" stopColor="#d97706" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid lines */}
          <g stroke="rgba(120,53,15,0.08)" strokeWidth="1">
            <path d="M0 120H960M0 260H960M0 400H960M180 0V540M420 0V540M700 0V540" fill="none" />
          </g>

          {/* River */}
          <path
            d="M-20 452 C 140 430, 210 500, 360 470 S 620 400, 980 424"
            fill="none"
            stroke="url(#hf-river)"
            strokeWidth="34"
            strokeLinecap="round"
          />
          <text
            x="470"
            y="508"
            fill="#0369a1"
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.28em"
            textAnchor="middle"
            fontFamily="var(--font-sans)"
          >
            GANDAKI · CONFLUENCE
          </text>

          {/* Roads */}
          <path
            d="M-20 300 C 200 286, 380 330, 560 296 S 820 250, 980 262"
            fill="none"
            stroke="#d97706"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <text
            x="120"
            y="278"
            fill="#92400e"
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.26em"
            fontFamily="var(--font-sans)"
          >
            HIGHWAY CORRIDOR (LOWER DAKBUNGLOW RD)
          </text>
          <path
            d="M300 -20 C 320 140, 268 300, 300 560"
            fill="none"
            stroke="rgba(120,53,15,0.18)"
            strokeWidth="3.5"
          />
          <path
            d="M700 -20 C 660 160, 740 320, 690 560"
            fill="none"
            stroke="rgba(120,53,15,0.18)"
            strokeWidth="3.5"
          />
          <path
            d="M-20 150 C 240 200, 480 90, 980 140"
            fill="none"
            stroke="rgba(120,53,15,0.14)"
            strokeWidth="2.5"
          />

          <rect
            x="196"
            y="238"
            width="320"
            height="130"
            rx="12"
            fill="rgba(217,119,6,0.08)"
            stroke="rgba(180,83,9,0.3)"
            strokeDasharray="6 6"
          />
          <text
            x="356"
            y="382"
            fill="#78350f"
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.3em"
            textAnchor="middle"
            fontFamily="var(--font-sans)"
          >
            HAJIPUR CITY COMMERCIAL HUB
          </text>

          {/* Single pin */}
          <g transform="translate(452, 236)" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
            <motion.circle
              r="58"
              fill="url(#hf-halo)"
              animate={reduceMotion ? undefined : { scale: [0.92, 1.14, 0.92], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* White card background behind text for guaranteed contrast */}
            <rect
              x="-80"
              y="-52"
              width="160"
              height="30"
              rx="15"
              fill="#ffffff"
              stroke="#b45309"
              strokeWidth="1.5"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
            />
            <text
              y="-32"
              fill="#1c1917"
              fontSize="12"
              letterSpacing="0.16em"
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontWeight="800"
            >
              ★ THE TAJ
            </text>

            <circle
              r="17"
              fill="#d97706"
              stroke="#ffffff"
              strokeWidth="3"
            />
            <circle r="6" fill="#ffffff" />

            <rect
              x="-90"
              y="32"
              width="180"
              height="24"
              rx="12"
              fill="#ffffff"
              stroke="rgba(180,83,9,0.3)"
              strokeWidth="1"
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.08))"
            />
            <text
              y="48"
              fill="#78350f"
              fontSize="10"
              fontWeight="700"
              textAnchor="middle"
              fontFamily="var(--font-sans)"
            >
              2nd Floor, Above HDFC Bank
            </text>
          </g>
        </svg>

        <div className="border-t border-[var(--line)] bg-white p-5">
          <p className="flex items-start gap-2 text-xs leading-relaxed text-stone-700">
            <Info size={15} className="mt-0.5 shrink-0 text-amber-700" aria-hidden="true" />
            <span>
              <strong className="text-stone-900 font-semibold">Hajipur Locator:</strong> Situated on the 2nd Floor, Above HDFC Bank, Lower Dakbunglow Road. Click &quot;Get Directions&quot; for instant GPS turn-by-turn navigation on Google Maps.
            </span>
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------- panel */}
      <div className="flex flex-col gap-3">
        <div className="rounded-card border border-[var(--line)] bg-[var(--surface)] p-6">
          <h2 className="flex items-center gap-2 font-display text-[1.15rem] text-ivory">
            <MapPin size={16} className="text-[var(--gold)]" aria-hidden="true" />
            The Taj Multicuisine Restaurant
          </h2>

          <address className="mt-4 text-[0.9375rem] not-italic leading-relaxed text-[var(--muted)]">
            <strong className="text-ivory block font-medium">{restaurant.address.line1}</strong>
            {restaurant.address.landmark}
            <br />
            {restaurant.address.city}, {restaurant.address.region} – {restaurant.address.postalCode}
          </address>

          <p className="mt-3 text-[0.8125rem] leading-relaxed text-[var(--gold)]">
            ★ Landmark: Directly above HDFC Bank. Easy road connectivity from Hajipur Junction and Ramashis Chowk.
          </p>

          <div className="mt-5 flex flex-col gap-2.5">
            <a
              href={restaurant.googleMaps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full"
            >
              <Navigation size={15} aria-hidden="true" />
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

        <div className="rounded-card border border-dashed border-[var(--line-strong)] bg-white p-5">
          <p className="text-[0.8125rem] leading-relaxed text-stone-700">
            Looking for something else?{' '}
            <Link
              href="/menu"
              className="text-[var(--gold)] font-medium underline underline-offset-4 hover:text-amber-900"
            >
              See what we cook
            </Link>{' '}
            or{' '}
            <Link
              href="/contact"
              className="text-[var(--gold)] font-medium underline underline-offset-4 hover:text-amber-900"
            >
              get in touch
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}