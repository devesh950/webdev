'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import { restaurant } from '@/data/restaurant';
import { foodPhotos } from '@/lib/images';
import { siteConfig } from '@/lib/site';

const headline = [
  { text: 'Family meals,', accent: false },
  { text: 'memorable', accent: true },
  { text: 'evenings.', accent: false },
];

/**
 * Cinematic hero.
 *
 * The entrance animation is pure CSS (`.anim-rise` / `.anim-fade-up`) rather
 * than framer-motion. That is deliberate: motion components ship an inline
 * `opacity:0` during SSR, which means a slow or failed bundle leaves the most
 * important content on the site invisible. CSS animations degrade to "visible".
 *
 * Scroll parallax is framer-motion and is purely additive — it enhances the
 * layout and hides nothing if it never runs.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '26%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-16 pt-[calc(var(--nav-height)+2rem)] sm:pb-20"
    >
      {/* Background photography ------------------------------------------ */}
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: imageY }}
        className="absolute inset-0 -z-20"
      >
        <Image
          src={foodPhotos.diningHall}
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Cinematic veils: keeps the headline legible on any photograph. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,10,9,0.86)_0%,rgba(10,10,9,0.62)_38%,rgba(16,16,16,0.94)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_78%_18%,rgba(200,169,107,0.16),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-[var(--charcoal)] to-transparent"
      />

      {/* Content --------------------------------------------------------- */}
      <motion.div
        style={reduceMotion ? undefined : { y: copyY, opacity: fade }}
        className="shell-wide relative"
      >
        <p
          className="anim-fade-up flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.34em] text-[var(--gold)]"
          style={{ animationDelay: '150ms' }}
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--gold)]" />
          {siteConfig.location.label}, India
        </p>

        <h1 className="mt-7 max-w-[16ch] text-display-xl text-ivory">
          {headline.map((line, index) => (
            <span key={line.text} className="block overflow-hidden pb-[0.06em]">
              <span
                className={
                  line.accent
                    ? 'anim-rise block font-display italic gold-gradient-text'
                    : 'anim-rise block font-display'
                }
                style={{ animationDelay: `${200 + index * 130}ms` }}
              >
                {line.text}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="anim-fade-up mt-8 max-w-[52ch] text-[1.0625rem] leading-relaxed text-[var(--muted)] sm:text-[1.125rem]"
          style={{ animationDelay: '620ms' }}
        >
          {restaurant.category} in {siteConfig.location.label}. {restaurant.summary}
        </p>

        <div
          className="anim-fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: '750ms' }}
        >
          <Link href="/menu" className="btn btn-primary group">
            Explore the Menu
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
            />
          </Link>
          <a
            href={restaurant.googleMaps.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost group"
          >
            <MapPin size={15} aria-hidden="true" className="text-[var(--gold)]" />
            Get Directions
          </a>
        </div>

        <a
          href="#welcome"
          className="anim-fade-up mt-14 hidden items-center gap-3 text-[0.6875rem] uppercase tracking-[0.26em] text-[var(--muted-dim)] transition-colors duration-300 hover:text-[var(--gold)] sm:inline-flex"
          style={{ animationDelay: '1100ms' }}
        >
          <span className="relative block h-10 w-px overflow-hidden bg-[rgba(247,243,235,0.14)]">
            <span className="absolute inset-x-0 top-0 block h-4 bg-[var(--gold)] animate-scroll-hint" />
          </span>
          Scroll to explore
          <ArrowDown size={13} aria-hidden="true" />
        </a>
      </motion.div>
    </section>
  );
}