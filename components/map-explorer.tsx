'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Info, MapPin, Navigation } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import type { Restaurant } from '@/data/restaurants';
import { cn } from '@/lib/utils';

/**
 * A stylised locator, not a survey-accurate map.
 *
 * We do not publish real coordinates for these businesses, so the pins sit on
 * an abstract diagram of Hajipur around the Gandaki/Ganges confluence. Every
 * pin links out to the verified Google Maps record, which is where real
 * navigation happens.
 */
export function MapExplorer({ restaurants }: { restaurants: Restaurant[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  // Abstract relative placement, deliberately not geographic coordinates.
  const placements: Record<string, { x: number; y: number }> = {
    'the-taj-multicuisine-restaurant': { x: 300, y: 128 },
    'desi-zaika-restaurant': { x: 774, y: 262 },
    'golden-bowl': { x: 452, y: 236 },
    'biryani-paradise': { x: 196, y: 392 },
    'tcg-the-chaap-guru': { x: 686, y: 398 },
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_0.5fr]">
      {/* ------------------------------------------------------- diagram */}
      <div className="relative overflow-hidden rounded-card border border-[var(--line)] bg-[var(--surface-sunken)]">
        <svg
          viewBox="0 0 960 540"
          role="img"
          aria-label="Stylised locator diagram of Hajipur with one pin per listed restaurant"
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

          {/* Pins */}
          {restaurants.map((restaurant) => {
            const point = placements[restaurant.slug];
            if (!point) return null;
            const isActive = activeSlug === restaurant.slug;

            return (
              <g
                key={restaurant.slug}
                transform={`translate(${point.x}, ${point.y})`}
                onMouseEnter={() => setActiveSlug(restaurant.slug)}
                onMouseLeave={() => setActiveSlug(null)}
              >
                <motion.circle
                  r="52"
                  fill="url(#hf-halo)"
                  animate={
                    reduceMotion ? undefined : { scale: [0.92, 1.14, 0.92], opacity: [0.5, 1, 0.5] }
                  }
                  transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <circle
                  r="15"
                  fill="rgba(10,10,9,0.85)"
                  stroke="#C8A96B"
                  strokeWidth="1.6"
                  style={{ transition: 'fill .3s ease' }}
                  fillOpacity={isActive ? 0.3 : 1}
                />
                <circle r="5" fill="#C8A96B" />
                <text
                  y="-32"
                  fill="#F7F3EB"
                  fontSize="11.5"
                  letterSpacing="0.16em"
                  textAnchor="middle"
                  fontFamily="var(--font-sans)"
                  fontWeight="500"
                >
                  {restaurant.name.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="border-t border-[var(--line)] p-5">
          <p className="flex items-start gap-2 text-[0.75rem] leading-relaxed text-[var(--muted-dim)]">
            <Info size={13} className="mt-0.5 shrink-0 text-[var(--gold)]/70" aria-hidden="true" />
            <span>
              This is a stylised diagram of Hajipur, not a photograph or a survey-accurate
              map. Pin positions are illustrative and are not exact addresses.
            </span>
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------- list */}
      <div className="flex flex-col gap-3">
        <ul className="flex flex-col gap-3">
          {restaurants.map((restaurant, index) => (
            <li key={restaurant.slug}>
              {/*
                A stretched overlay carries the navigation while the real
                content sits above it. The directions link must stay OUTSIDE
                that anchor — nesting one <a> inside another is invalid HTML
                and causes a hydration error.
              */}
              <div
                onMouseEnter={() => setActiveSlug(restaurant.slug)}
                onMouseLeave={() => setActiveSlug(null)}
                className={cn(
                  'group relative flex h-full gap-4 rounded-card border bg-[var(--surface)] p-5 transition-[border-color,transform,background-color] duration-500 ease-editorial',
                  activeSlug === restaurant.slug
                    ? '-translate-y-0.5 border-[rgba(200,169,107,0.4)] bg-[var(--surface-raised)]'
                    : 'border-[var(--line)] hover:border-[rgba(200,169,107,0.3)]',
                )}
              >
                <span
                  aria-hidden="true"
                  className="font-display text-[0.875rem] text-[rgba(200,169,107,0.6)]"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="flex flex-1 flex-col gap-1.5">
                  <h3 className="font-display text-[1.05rem] text-ivory transition-colors duration-300 group-hover:text-[var(--gold)]">
                    {restaurant.name}
                  </h3>

                  <p className="text-[0.8125rem] text-[var(--muted)]">
                    {restaurant.category}
                  </p>

                  <a
                    href={restaurant.googleMaps.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex w-fit items-center gap-1.5 text-[0.75rem] text-[var(--muted-dim)] underline-offset-4 hover:text-[var(--gold)] hover:underline"
                    aria-label={`Get directions to ${restaurant.name} on Google Maps`}
                  >
                    <Navigation size={11} aria-hidden="true" />
                    Directions
                    <ExternalLink size={10} aria-hidden="true" />
                  </a>
                </div>

                {/* Whole-card click target, sitting under the visible content. */}
                <Link
                  href={`/restaurants/${restaurant.slug}`}
                  className="absolute inset-0 rounded-card"
                  tabIndex={-1}
                  aria-hidden="true"
                />
              </div>
            </li>
          ))}
        </ul>

        <p className="flex items-start gap-2.5 rounded-card border border-dashed border-[var(--line-strong)] p-5 text-[0.8125rem] leading-relaxed text-[var(--muted)]">
          <MapPin size={14} className="mt-0.5 shrink-0 text-[var(--gold)]" aria-hidden="true" />
          <span>
            This diagram shows relative areas of Hajipur, not exact addresses. For turn-by-turn
            navigation, use the Google Maps link on any listing.
          </span>
        </p>
      </div>
    </div>
  );
}