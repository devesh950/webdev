'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  Flame,
  MapPin,
  Sparkles,
  Star,
  Utensils,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { restaurant } from '@/data/restaurant';
import { foodPhotos } from '@/lib/images';

const showcaseSlides = [
  {
    id: 'ambiance',
    tabLabel: 'Ambiance',
    title: 'Warm Timber & Royal Blue Booths',
    subtitle: '2nd Floor Dining Hall · Above HDFC Bank',
    tag: 'Fine Dining Atmosphere',
    image: foodPhotos.diningHall,
    alt: 'The Taj Hajipur warm wood dining hall and comfortable seating',
    quote: '“Aesthetic interiors, very clean and family-friendly ambiance.” — Google Review',
  },
  {
    id: 'biryani',
    tabLabel: 'Royal Dum Biryani',
    title: 'Taj Special Dum Mutton Biryani',
    subtitle: 'Aged basmati slow-steamed in copper handi',
    tag: 'Chef Signature · ₹420',
    image: foodPhotos.biryani,
    alt: 'Awadhi Dum Biryani in royal copper handi with Burani raita',
    quote: '“The Dum Biryani is unmatched in Hajipur. Fragrant and tender meat!” — Google Review',
  },
  {
    id: 'tandoor',
    tabLabel: 'Live Charcoal Tandoor',
    title: 'Murgh Malai & Paneer Tikka',
    subtitle: 'Smoked over glowing natural wood charcoal',
    tag: 'Clay Oven Fresh · From ₹280',
    image: foodPhotos.paneerTikka,
    alt: 'Charcoal grilled tandoori tikka with crisp peppers and mint dip',
    quote: '“Melts in your mouth! Sizzling hot kebabs and crisp garlic naan.” — Google Review',
  },
];

export function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through the showcase slides every 6 seconds unless user is hovering
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % showcaseSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentSlide = showcaseSlides[activeTab] ?? showcaseSlides[0]!;

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center justify-center overflow-hidden px-4 py-8 pt-24 sm:pt-28"
    >
      {/* Background Photography with Warm Alabaster Glassmorphic Veil */}
      <div aria-hidden="true" className="absolute inset-0 -z-30 overflow-hidden">
        <Image
          src={foodPhotos.modernInterior}
          alt={`${restaurant.name} dining room ambiance`}
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center scale-105 opacity-40 blur-[1px]"
        />
      </div>

      {/* Luminous Light Glass Overlays with Soft Warm Radial Accents */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-b from-[#FAF7F2]/90 via-[#FAF7F2]/95 to-[#FAF7F2]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60rem_40rem_at_75%_25%,rgba(217,119,6,0.12),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50rem_35rem_at_25%_75%,rgba(180,83,9,0.08),transparent_65%)]"
      />

      <div className="shell relative z-10 w-full">
        {/* Main Cohesive Glassmorphic Pavilion */}
        <div className="mx-auto rounded-3xl border border-white/90 bg-white/80 p-6 sm:p-9 lg:p-12 shadow-2xl backdrop-blur-2xl">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Brand Story, Typography & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Top Trust Pills */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={restaurant.googleMaps.listingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-amber-600/30 bg-amber-50/90 px-3.5 py-1 text-xs font-semibold text-amber-950 shadow-sm backdrop-blur-md transition-all hover:bg-amber-100 hover:border-amber-600/50"
                >
                  <div className="flex items-center gap-1 text-amber-600">
                    <Star size={13} fill="currentColor" />
                    <span className="font-bold">{restaurant.rating.score}</span>
                  </div>
                  <span className="text-stone-300">|</span>
                  <span className="text-stone-700 font-medium">
                    {restaurant.rating.totalReviews}+ Google Reviews
                  </span>
                  <ExternalLink size={11} className="text-amber-800 transition-transform group-hover:translate-x-0.5" />
                </a>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/30 bg-emerald-50/90 px-3 py-1 text-xs font-semibold text-emerald-900 shadow-sm backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Open Today · 11am – 10:30pm</span>
                </div>
              </div>

              {/* Title & Kicker */}
              <div className="mt-4 sm:mt-5">
                <p className="flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.26em] text-amber-800">
                  <span className="h-px w-5 bg-amber-600" />
                  <span>Royal Awadhi &amp; Modern Indian Dining</span>
                </p>

                <h1 className="mt-2.5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.08]">
                  The Taj Multicuisine <br />
                  <span className="font-serif italic font-normal text-amber-800">Restaurant</span>
                </h1>
              </div>

              {/* Tagline & Location */}
              <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-stone-700">
                Hajipur’s favourite destination for slow-dum biryanis, smoky tandoori kebabs, and family celebrations in refined, wood-paneled elegance.
              </p>

              <div className="mt-3 flex items-center gap-2 text-xs font-medium text-stone-600">
                <MapPin size={14} className="shrink-0 text-amber-700" />
                <span>2nd Floor, Above HDFC Bank · Lower Dakbunglow Road, Hajipur</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <a
                  href="#reservation"
                  className="btn btn-primary px-7 py-3 text-xs uppercase tracking-[0.16em] shadow-lg shadow-amber-900/10"
                >
                  <Calendar size={14} />
                  <span>Reserve a Table</span>
                </a>

                <a
                  href="#menu"
                  className="btn btn-ghost px-7 py-3 text-xs uppercase tracking-[0.16em]"
                >
                  <Utensils size={14} className="text-amber-700" />
                  <span>View Menu</span>
                </a>

                <a
                  href={restaurant.googleMaps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-stone-600 transition-colors hover:text-amber-800"
                >
                  <span>Get Directions</span>
                  <ChevronRight size={14} />
                </a>
              </div>

              {/* Bottom Feature Badges Bar */}
              <div className="mt-7 grid grid-cols-3 gap-2.5 border-t border-stone-200/80 pt-5 text-left">
                <div className="rounded-xl border border-white/80 bg-white/70 p-2.5 shadow-sm backdrop-blur-md">
                  <p className="text-[0.625rem] font-bold uppercase tracking-wider text-amber-800">Origins</p>
                  <p className="text-xs font-semibold text-stone-900 mt-0.5">Awadhi &amp; Tandoor</p>
                  <p className="text-[0.625rem] text-stone-500">Pure Veg &amp; Non-Veg</p>
                </div>

                <div className="rounded-xl border border-white/80 bg-white/70 p-2.5 shadow-sm backdrop-blur-md">
                  <p className="text-[0.625rem] font-bold uppercase tracking-wider text-amber-800">Banquet</p>
                  <p className="text-xs font-semibold text-stone-900 mt-0.5">Private AC Hall</p>
                  <p className="text-[0.625rem] text-stone-500">Up to 70 Guests</p>
                </div>

                <div className="rounded-xl border border-white/80 bg-white/70 p-2.5 shadow-sm backdrop-blur-md">
                  <p className="text-[0.625rem] font-bold uppercase tracking-wider text-amber-800">Average Cost</p>
                  <p className="text-xs font-semibold text-stone-900 mt-0.5">{restaurant.averageCostForTwo}</p>
                  <p className="text-[0.625rem] text-stone-500">For two persons</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Visual Showcase Frame */}
            <div
              className="lg:col-span-5"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Interactive Tabs Header */}
              <div className="flex items-center justify-between gap-1.5 rounded-2xl border border-stone-200/90 bg-stone-100/90 p-1.5 backdrop-blur-md">
                {showcaseSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className={`flex-1 rounded-xl px-2.5 py-1.5 text-center text-xs font-semibold transition-all ${
                      activeTab === index
                        ? 'border border-amber-600/20 bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {slide.tabLabel}
                  </button>
                ))}
              </div>

              {/* Main Photo Showcase Card */}
              <div className="relative mt-3.5 aspect-[4/3] sm:aspect-[14/11] w-full overflow-hidden rounded-2xl border border-white/90 bg-white shadow-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45 }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={currentSlide.image}
                      alt={currentSlide.alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />

                    {/* Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

                    {/* Top Floating Tag */}
                    <div className="absolute top-3.5 right-3.5">
                      <span className="rounded-full border border-white/30 bg-black/50 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-wider text-amber-300 backdrop-blur-md">
                        {currentSlide.tag}
                      </span>
                    </div>

                    {/* Bottom Slide Info Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                      <h3 className="font-display text-lg sm:text-xl font-bold leading-tight text-white">
                        {currentSlide.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-stone-200 font-medium">
                        {currentSlide.subtitle}
                      </p>

                      {/* Google Review Quote */}
                      <p className="mt-2.5 rounded-xl border border-white/20 bg-black/40 px-3 py-1.5 text-[0.6875rem] italic text-amber-100 backdrop-blur-sm">
                        {currentSlide.quote}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slide Counter / Indicators */}
              <div className="mt-3 flex items-center justify-between px-1 text-xs text-stone-500">
                <span className="text-[0.6875rem]">Hover to pause · Auto-cycles Google Maps highlights</span>
                <div className="flex gap-1.5">
                  {showcaseSlides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveTab(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeTab === i ? 'w-6 bg-amber-600' : 'w-1.5 bg-stone-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}