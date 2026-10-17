'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

import { restaurant } from '@/data/restaurant';

export function ReviewsSection() {
  return (
    <section className="section section-alt">
      <div className="shell">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="eyebrow">Guest Impressions</p>
            <h2 className="mt-4 text-display-md text-ivory">
              Loved by families across Hajipur
            </h2>
            <p className="mt-3 max-w-xl text-[1rem] leading-relaxed text-[var(--muted)]">
              From grand milestone birthdays to peaceful Sunday family lunches, discover what our diners experience at The Taj.
            </p>
          </div>

          {/* Rating Summary Badge */}
          <div className="flex items-center gap-4 rounded-xl border border-[rgba(200,169,107,0.3)] bg-[var(--surface-raised)] p-4 shadow-lg shrink-0">
            <div className="flex flex-col items-center justify-center border-r border-[var(--line)] pr-4">
              <span className="font-display text-3xl font-semibold text-[var(--gold)]">
                {restaurant.rating.score}
              </span>
              <div className="mt-1 flex text-[var(--gold)]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>
            </div>
            <div className="text-xs">
              <p className="font-medium text-ivory">Google & Local Verified</p>
              <p className="text-[var(--muted)]">{restaurant.rating.totalReviews}+ Happy Diners</p>
              <a
                href={restaurant.googleMaps.listingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-[var(--gold)] hover:underline"
              >
                Read all reviews →
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {restaurant.reviews.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col justify-between rounded-card border border-[var(--line)] bg-[var(--surface)] p-6 transition-all duration-300 hover:border-[rgba(200,169,107,0.4)] hover:bg-[var(--surface-raised)] hover:shadow-xl"
            >
              <div>
                <Quote size={24} className="text-[var(--gold)] opacity-50" />
                <div className="mt-3 flex gap-1 text-[var(--gold)]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ivory)] italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 border-t border-[var(--line)] pt-3 text-xs">
                <p className="font-semibold text-ivory">{rev.author}</p>
                <div className="mt-0.5 flex items-center justify-between text-[var(--muted-dim)]">
                  <span>{rev.source}</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
