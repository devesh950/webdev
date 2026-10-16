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
              <stop offset="0%" stopColor="#2A3B4A" />
              <stop offset="100%" stopColor="#161F28" />
            </linearGradient>
            <radialGradient id="hf-halo">
              <stop offset="0%" stopColor="#C8A96B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C8A96B" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g stroke="rgba(247,243,235,0.045)" strokeWidth="1">
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
            fill="rgba(143,169,139,0.5)"
            fontSize="10"
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
            stroke="rgba(200,169,107,0.5)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <text
            x="120"
            y="278"
            fill="rgba(200,169,107,0.55)"
            fontSize="10"
            letterSpacing="0.26em"
            fontFamily="var(--font-sans)"
          >
            HIGHWAY CORRIDOR
          </text>
          <path
            d="M300 -20 C 320 140, 268 300, 300 560"
            fill="none"
            stroke="rgba(247,243,235,0.16)"
            strokeWidth="3"
          />
          <path
            d="M700 -20 C 660 160, 740 320, 690 560"
            fill="none"
            stroke="rgba(247,243,235,0.16)"
            strokeWidth="3"
          />
          <path
            d="M-20 150 C 240 200, 480 90, 980 140"
            fill="none"
            stroke="rgba(247,243,235,0.09)"
            strokeWidth="2"
          />

          <rect
            x="196"
            y="238"
            width="300"
            height="130"
            rx="10"
            fill="rgba(247,243,235,0.022)"
            stroke="rgba(247,243,235,0.07)"
            strokeDasharray="5 6"
          />
          <text
            x="346"
            y="382"
            fill="rgba(247,243,235,0.22)"
            fontSize="10"
            letterSpacing="0.3em"
            textAnchor="middle"
            fontFamily="var(--font-sans)"
          >
            CITY CENTRE
          </text>

          {/* Single pin */}
          <g transform="translate(452, 236)" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
            <motion.circle
              r="54"
              fill="url(#hf-halo)"
              animate={reduceMotion ? undefined : { scale: [0.92, 1.14, 0.92], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <circle
              r="16"
              fill="rgba(10,10,9,0.85)"
              stroke="#C8A96B"
              strokeWidth="1.8"
              fillOpacity={active ? 0.32 : 1}
            />
            <circle r="5" fill="#C8A96B" />
            <text
              y="-34"
              fill="#F7F3EB"
              fontSize="12"
              letterSpacing="0.18em"
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontWeight="500"
            >
              THE TAJ
            </text>
            <text
              y="46"
              fill="rgba(168,163,155,0.7)"
              fontSize="11"
              textAnchor="middle"
              fontFamily="var(--font-sans)"
            >
              Multicuisine Restaurant
            </text>
          </g>
        </svg>

        <div className="border-t border-[var(--line)] p-5">
          <p className="flex items-start gap-2 text-[0.75rem] leading-relaxed text-[var(--muted-dim)]">
            <Info size={13} className="mt-0.5 shrink-0 text-[var(--gold)]/70" aria-hidden="true" />
            <span>
              This is a stylised diagram of Hajipur, not a photograph or a survey-accurate
              map. The pin shows the restaurant’s general area, not an exact street address.
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
            {restaurant.address.locality}, {restaurant.address.region}
            <br />
            {restaurant.address.country}
          </address>

          <p className="mt-3 text-[0.8125rem] leading-relaxed text-[var(--muted-dim)]">
            A street-level address has not been published by the restaurant yet. The Google
            Maps record below carries the exact location.
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

        <div className="rounded-card border border-dashed border-[var(--line-strong)] bg-[rgba(247,243,235,0.02)] p-5">
          <p className="text-[0.8125rem] leading-relaxed text-[var(--muted)]">
            Looking for something else?{' '}
            <Link
              href="/menu"
              className="text-[var(--gold)] underline underline-offset-4"
            >
              See what we cook
            </Link>{' '}
            or{' '}
            <Link
              href="/contact"
              className="text-[var(--gold)] underline underline-offset-4"
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