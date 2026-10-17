'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

import { restaurant } from '@/data/restaurant';

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const reviews = restaurant.reviews;

  const next = () => setCurrent((c) => (c + 1) % reviews.length);
  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);

  // Auto-advance slowly
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const activeReview = reviews[current] ?? reviews[0]!;

  return (
    <section id="testimonials" className="relative bg-[#FAF7F2] py-24 sm:py-32">
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.06),transparent_65%)]"
      />

      <div className="shell max-w-4xl">
        {/* Section Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-amber-600" />
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.28em] text-amber-800">
              Diner Words
            </p>
            <span className="h-px w-6 bg-amber-600" />
          </div>

          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-stone-900">
            Experiences Cherished
          </h2>

          <div className="my-6 mx-auto h-px w-16 bg-amber-600/40" />
        </div>

        {/* Frosted Glassmorphism Carousel Card */}
        <div className="relative mt-12 rounded-3xl border border-white/90 bg-white/80 p-8 sm:p-14 shadow-2xl backdrop-blur-2xl flex flex-col items-center justify-center text-center">
          <Quote
            size={38}
            className="text-amber-600/40 mb-6"
            aria-hidden="true"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center max-w-3xl px-2"
            >
              {/* Star Rating */}
              <div className="flex gap-1.5 text-amber-500 mb-6">
                {[...Array(activeReview.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              {/* Quote Body */}
              <p className="font-serif text-xl sm:text-2xl md:text-3xl font-normal italic leading-relaxed text-stone-800">
                &ldquo;{activeReview.comment}&rdquo;
              </p>

              {/* Author & Verification */}
              <div className="mt-8 flex flex-col items-center">
                <p className="font-display text-lg font-bold text-stone-900">
                  {activeReview.author}
                </p>
                <p className="text-xs text-amber-800 mt-1 tracking-wider uppercase font-semibold">
                  {activeReview.source} · Verified Hajipur Diner ({activeReview.date})
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="grid h-10 w-10 place-items-center rounded-full border border-stone-200 bg-white/80 text-stone-800 shadow-sm transition-colors hover:border-amber-600 hover:text-amber-800"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === i ? 'w-8 bg-amber-600 shadow-sm' : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="grid h-10 w-10 place-items-center rounded-full border border-stone-200 bg-white/80 text-stone-800 shadow-sm transition-colors hover:border-amber-600 hover:text-amber-800"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Direct Google Maps Reviews Link */}
          <div className="mt-8 text-center">
            <a
              href={restaurant.googleMaps.listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-amber-600/30 bg-amber-50/90 px-5 py-2 text-xs font-semibold text-amber-950 shadow-sm backdrop-blur-md transition-all hover:bg-amber-100"
            >
              <Star size={13} fill="currentColor" className="text-amber-500" />
              <span>Rated 4.3 ★ on Google Maps (540+ Reviews) · Read or Write a Review →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
