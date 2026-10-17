'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { IllustrativeNote } from '@/components/illustrative-note';
import type { PhotoAsset } from '@/lib/images';
import { cn } from '@/lib/utils';

export function RestaurantGallery({ images }: { images: PhotoAsset[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((current) => (current === null ? null : (current + 1) % images.length)),
    [images.length],
  );
  const previous = useCallback(
    () =>
      setIndex((current) =>
        current === null ? null : (current - 1 + images.length) % images.length,
      ),
    [images.length],
  );

  // Keyboard controls while the lightbox is open.
  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') previous();
    };
    window.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, close, next, previous]);

  const active = index === null ? null : images[index];

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, imageIndex) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setIndex(imageIndex)}
              className={cn(
                'group relative block w-full overflow-hidden rounded-card border border-[var(--line)] bg-[var(--surface-sunken)]',
                imageIndex === 0 && 'sm:col-span-2 lg:col-span-2',
              )}
              aria-label={`Open image ${imageIndex + 1} of ${images.length}: ${image.alt}`}
            >
              <span className="relative block aspect-[16/10] w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  quality={80}
                  className="object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.05]"
                />
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[rgba(16,16,16,0.25)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="credit-chip absolute bottom-3 left-3">
                {image.credit}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* A <div>, not a <p>: IllustrativeNote renders its own <p>, and a <p> inside
          a <p> is invalid HTML that React reports as a hydration error. */}
      <div className="mt-5">
        <IllustrativeNote />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(8,8,7,0.94)] p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close image viewer"
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/60 text-white transition-colors duration-300 hover:border-amber-400 hover:text-amber-400 backdrop-blur-md"
            >
              <X size={18} />
            </button>

            <motion.figure
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-5xl"
            >
              <span className="relative block aspect-[16/10] w-full overflow-hidden rounded-card shadow-2xl">
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 64rem"
                  quality={85}
                  className="object-cover"
                />
              </span>
              <figcaption className="mt-4 flex flex-col gap-1 text-center">
                <p className="text-base font-medium text-white">{active.alt}</p>
                <p className="text-xs text-stone-300">
                  {active.credit} · {(index ?? 0) + 1} of {images.length}
                </p>
              </figcaption>
            </motion.figure>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    previous();
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/70 text-white transition-colors duration-300 hover:border-amber-400 hover:text-amber-400 sm:left-6 backdrop-blur-md"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    next();
                  }}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/70 text-white transition-colors duration-300 hover:border-amber-400 hover:text-amber-400 sm:right-6 backdrop-blur-md"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}