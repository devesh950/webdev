'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Award, Camera, Heart, MapPin, Sparkles, Users } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

import { restaurant } from '@/data/restaurant';
import { foodPhotos } from '@/lib/images';

export function StorySection() {
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      ref={containerRef}
      id="story"
      className="relative overflow-hidden bg-[#FAF7F2] py-24 sm:py-32"
    >
      {/* Background Soft Ambient Meshes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60rem_40rem_at_15%_25%,rgba(217,119,6,0.08),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50rem_35rem_at_85%_75%,rgba(180,83,9,0.06),transparent_65%)]"
      />

      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* Left Column: Brand Story & Authentic Experience */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 rounded-3xl border border-white/90 bg-white/80 p-8 sm:p-12 shadow-xl backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-amber-600" />
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.28em] text-amber-800">
                Heritage &amp; Ambiance
              </p>
            </div>

            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] text-stone-900">
              Where Hajipur celebrates life&apos;s special moments
            </h2>

            {/* Thin Amber Divider */}
            <div className="my-6 h-px w-20 bg-gradient-to-r from-amber-600 to-transparent" />

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-stone-700">
              <p>
                Perched on the 2nd Floor above HDFC Bank on Lower Dakbunglow Road,{' '}
                <strong className="text-stone-900 font-semibold">{restaurant.name}</strong> has grown into Hajipur’s premier destination for family banquets, weekend dinners, and landmark celebrations.
              </p>
              <p>
                Step inside to an ambiance defined by warm vertical timber slats, comfortable royal blue booth seating, and subtle recessed golden lighting. Our iconic illuminated{' '}
                <span className="font-semibold text-amber-900">&ldquo;THE TAJ&rdquo;</span> photo wall is a beloved community backdrop where countless birthdays, anniversaries, and family reunions are captured.
              </p>
              <p>
                Our master chefs slow-simmer gravies in heavy brass handis, roast fresh cuts over natural wood charcoal, and toss fiery wok specialties with authentic craft.
              </p>
            </div>

            {/* Key Experience Highlights */}
            <div className="mt-8 grid grid-cols-2 gap-3.5 border-t border-stone-200/80 pt-6 text-xs">
              <div className="rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur-md">
                <div className="flex items-center gap-2 text-amber-800 font-bold uppercase tracking-wider text-[0.6875rem]">
                  <Heart size={14} className="text-rose-500 fill-rose-500" />
                  <span>Celebration Wall</span>
                </div>
                <p className="mt-1.5 font-medium text-stone-700">
                  Signature illuminated photo zone for unforgettable memories.
                </p>
              </div>

              <div className="rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur-md">
                <div className="flex items-center gap-2 text-amber-800 font-bold uppercase tracking-wider text-[0.6875rem]">
                  <Users size={14} />
                  <span>Family Banquet</span>
                </div>
                <p className="mt-1.5 font-medium text-stone-700">
                  Spacious air-conditioned seating for groups up to 70 guests.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#reservation"
                className="btn btn-primary text-xs uppercase tracking-[0.16em] font-semibold"
              >
                Book Your Celebration
              </a>

              <a
                href={restaurant.googleMaps.listingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-amber-800"
              >
                <MapPin size={13} className="text-amber-700" />
                <span>View Google Business Profile</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Multi-Image Google Maps Ambiance Mosaic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Image 1: Warm Dining Room */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-white/90 shadow-xl">
                <motion.div
                  style={reduceMotion ? undefined : { y: photoY }}
                  className="relative h-[112%] w-full -top-[6%]"
                >
                  <Image
                    src={foodPhotos.warmInterior}
                    alt="Warm wood and modern lighting at The Taj Hajipur"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-black/50 px-3 py-1.5 text-white backdrop-blur-md text-[0.6875rem] font-medium">
                  Warm Wood &amp; Blue Booths
                </div>
              </div>

              {/* Image 2: Celebration / Party Hall & Tandoori skewer */}
              <div className="space-y-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/90 shadow-xl">
                  <Image
                    src={foodPhotos.paneerTikka}
                    alt="Charcoal grilled Paneer Tikka at The Taj"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 rounded-full bg-amber-500/90 px-2.5 py-0.5 text-[0.5625rem] font-bold text-white uppercase tracking-wider backdrop-blur-sm">
                    Live Charcoal
                  </div>
                </div>

                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/90 shadow-xl">
                  <Image
                    src={foodPhotos.banquetHall}
                    alt="Private banquet celebrations at The Taj Hajipur"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-black/50 px-3 py-1.5 text-white backdrop-blur-md text-[0.6875rem] font-medium">
                    Private Celebration Hall
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Google Maps Verified Badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-4 rounded-2xl border border-white/90 bg-white/95 px-5 py-3 shadow-2xl backdrop-blur-xl flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <Award size={20} />
              </div>
              <div>
                <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-amber-800">
                  Google Maps Verified
                </p>
                <p className="text-xs font-bold text-stone-900">
                  4.3 ★ Rating · 540+ Local Diners
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
