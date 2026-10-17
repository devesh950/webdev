'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, ExternalLink, MapPin, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { restaurant } from '@/data/restaurant';
import { foodPhotos } from '@/lib/images';

type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  category: 'Ambiance' | 'Food' | 'Celebration';
  span?: string;
};

const galleryImages: GalleryImage[] = [
  {
    src: foodPhotos.modernInterior,
    alt: 'The Taj Hajipur Dining Room with Timber Slats & Blue Booths',
    caption: 'Modern dining room with warm vertical timber slats and luxurious royal blue booth seating',
    category: 'Ambiance',
    span: 'col-span-1 sm:col-span-2 row-span-2',
  },
  {
    src: foodPhotos.biryani,
    alt: 'Shahi Dum Biryani in Copper Handi',
    caption: 'Aged basmati Dum Mutton Biryani sealed in copper handi with mint Burani raita',
    category: 'Food',
  },
  {
    src: foodPhotos.paneerTikka,
    alt: 'Charcoal Roasted Paneer Tikka',
    caption: 'Tandoor-charred cottage cheese skewers with spiced marinade and crunchy peppers',
    category: 'Food',
  },
  {
    src: foodPhotos.banquetHall,
    alt: 'Celebration Banquet & Party Hall',
    caption: 'Spacious air-conditioned celebration hall for birthdays, reunions, and family parties',
    category: 'Celebration',
  },
  {
    src: foodPhotos.butterChickenCopper,
    alt: 'Velvety Murgh Makhani Butter Chicken',
    caption: 'Slow-simmered butter chicken served in royal brass tableware with fresh cream swirl',
    category: 'Food',
  },
  {
    src: foodPhotos.mocktail,
    alt: 'Taj Signature Blue Curacao Mojito Cooler',
    caption: 'Electric Blue Curacao cooler with fresh mint, lime, and sparkling soda',
    category: 'Food',
  },
  {
    src: foodPhotos.garlicNaan,
    alt: 'Clay Oven Butter Garlic Naan',
    caption: 'Freshly baked tandoori garlic naan brushed with desi ghee and cilantro',
    category: 'Food',
    span: 'col-span-1 sm:col-span-2',
  },
];

export function MasonryGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const close = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(() => {
    setLightboxIndex((curr) => (curr === null ? null : (curr + 1) % filteredImages.length));
  }, [filteredImages.length]);
  const prev = useCallback(() => {
    setLightboxIndex((curr) =>
      curr === null ? null : (curr - 1 + filteredImages.length) % filteredImages.length,
    );
  }, [filteredImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxIndex, close, next, prev]);

  const activeImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <section id="gallery" className="relative bg-[#F4EFE8] py-24 sm:py-32">
      <div className="shell">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-amber-600" />
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.28em] text-amber-800">
              Visual Impressions
            </p>
            <span className="h-px w-6 bg-amber-600" />
          </div>

          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-stone-900">
            Ambiance, Celebrations &amp; Plates
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-stone-700">
            From our warm wood-slatted dining hall and illuminated celebration backdrop to bubbling handis of Awadhi biryani.
          </p>

          {/* Category Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {['All', 'Ambiance', 'Food', 'Celebration'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'border border-amber-600 bg-amber-600 text-white shadow-md'
                    : 'border border-white/80 bg-white/70 text-stone-700 hover:border-amber-500/40 hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid with Frosted Glass Panels */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredImages.map((image, idx) => (
            <motion.div
              key={image.src + idx}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setLightboxIndex(idx)}
              className={`group relative overflow-hidden rounded-3xl border border-white/90 bg-white/80 p-3 shadow-md backdrop-blur-xl transition-all duration-500 hover:border-amber-500/40 hover:shadow-2xl hover:-translate-y-1 cursor-pointer ${
                image.span ?? ''
              }`}
            >
              <div className="relative aspect-[4/3] w-full h-full min-h-[220px] overflow-hidden rounded-2xl bg-stone-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Glassmorphic Category Tag */}
                <div className="absolute top-3 left-3 rounded-full border border-white/80 bg-white/90 px-2.5 py-0.5 text-[0.625rem] font-bold text-amber-900 uppercase tracking-wider backdrop-blur-md shadow-sm">
                  {image.category}
                </div>

                {/* Hover Caption Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="font-display text-sm font-semibold text-white leading-snug">
                    {image.caption}
                  </p>
                  <span className="mt-1 text-[0.6875rem] text-amber-300 font-medium">
                    Click to enlarge photo ↗
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Maps Real Photos Link Callout */}
        <div className="mt-12 text-center">
          <a
            href={restaurant.googleMaps.listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/85 px-6 py-2.5 text-xs font-semibold text-stone-800 shadow-sm transition-all hover:border-amber-600 hover:text-amber-800 hover:shadow-md backdrop-blur-md"
          >
            <Camera size={14} className="text-amber-700" />
            <span>Browse 540+ Verified Customer Photos on Google Maps</span>
            <ExternalLink size={12} className="text-stone-400" />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close photo preview"
              className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <ChevronRight size={22} />
            </button>

            <motion.figure
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full max-h-[75vh] overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  quality={85}
                  sizes="90vw"
                  className="object-cover"
                />
              </div>

              <figcaption className="mt-4 rounded-xl border border-white/20 bg-black/60 px-5 py-2.5 text-center backdrop-blur-md">
                <p className="font-display text-base font-semibold text-white">{activeImage.caption}</p>
                <p className="text-xs text-stone-300 mt-0.5">
                  Image {(lightboxIndex ?? 0) + 1} of {filteredImages.length} · The Taj Multicuisine Hajipur
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
