'use client';

import { motion } from 'framer-motion';
import { Flame, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';

import { foodPhotos } from '@/lib/images';

type SignatureDish = {
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  alt: string;
  dietary: 'veg' | 'non-veg';
  badge?: string;
  spicyLevel?: number;
};

const signatureItems: SignatureDish[] = [
  {
    name: 'Taj Dum Mutton Biryani',
    category: 'Royal Dum Pukht',
    price: 420,
    description:
      'Long-grain basmati sealed in copper handis with succulent cuts of goat meat, saffron milk, caramelized onions, and Burani raita.',
    image: foodPhotos.biryani,
    alt: 'Taj Dum Mutton Biryani in traditional royal copper handi',
    dietary: 'non-veg',
    badge: 'Most Popular',
    spicyLevel: 2,
  },
  {
    name: 'Murgh Makhani (Butter Chicken)',
    category: 'Royal Gravies',
    price: 360,
    description:
      'Charcoal-tandoor roasted chicken simmered in an unctuous, velvety tomato-butter reduction with fresh cream and hand-crushed kasuri methi.',
    image: foodPhotos.butterChickenCopper,
    alt: 'Murgh Makhani butter chicken in authentic royal copper handi',
    dietary: 'non-veg',
    badge: 'Chef Signature',
    spicyLevel: 1,
  },
  {
    name: 'Paneer Tikka Shashlik',
    category: 'Clay Tandoor',
    price: 280,
    description:
      'Fresh malai cottage cheese cubes steeped in mustard oil, ajwain, and spiced yogurt, grilled over glowing wood charcoal with crisp peppers.',
    image: foodPhotos.paneerTikka,
    alt: 'Charcoal grilled Paneer Tikka cubes with bell peppers',
    dietary: 'veg',
    badge: 'Tandoor Special',
    spicyLevel: 2,
  },
  {
    name: 'Butter Garlic Naan & Dal Makhani',
    category: 'Heritage Clay Oven',
    price: 320,
    description:
      'Whole black urad lentils slow-simmered for 18 hours with white butter, served alongside hot, blistered tandoori garlic naan brushed with ghee.',
    image: foodPhotos.garlicNaan,
    alt: 'Clay-tandoor blistered butter garlic naan and Dal Makhani',
    dietary: 'veg',
    badge: 'Crowd Favorite',
    spicyLevel: 1,
  },
];

export function SignatureDishes() {
  return (
    <section id="dishes" className="relative bg-[#F4EFE8] py-24 sm:py-32">
      {/* Background radial accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60rem_35rem_at_85%_20%,rgba(217,119,6,0.08),transparent_70%)]"
      />

      <div className="shell">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-amber-600" />
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.28em] text-amber-800">
              Chef’s Signatures
            </p>
            <span className="h-px w-6 bg-amber-600" />
          </div>

          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-stone-900">
            Dishes that define our craft
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-stone-700">
            Praised by hundreds of diners on Google Maps — slow-cooked Awadhi gravies, charcoal-roasted skewers, and piping hot clay-oven breads.
          </p>

          <div className="my-6 mx-auto h-px w-16 bg-amber-600/40" />
        </div>

        {/* 4 Frosted Glassmorphism Cards Grid */}
        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {signatureItems.map((dish, index) => (
            <motion.article
              key={dish.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-white/90 bg-white/80 p-5 shadow-lg backdrop-blur-2xl transition-all duration-500 hover:border-amber-500/40 hover:bg-white/95 hover:shadow-2xl hover:-translate-y-1.5"
            >
              {/* Card Photo with Slow Zoom on Hover */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 shadow-sm">
                <Image
                  src={dish.image}
                  alt={dish.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Dietary Pill (Glassmorphic) */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-2.5 py-1 text-[0.625rem] font-bold tracking-wider uppercase text-stone-800 shadow-sm backdrop-blur-md">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      dish.dietary === 'veg' ? 'bg-emerald-600' : 'bg-rose-600'
                    }`}
                  />
                  <span>{dish.dietary === 'veg' ? 'Veg' : 'Non-Veg'}</span>
                </div>

                {dish.badge && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-amber-600/30 bg-amber-500/95 px-2.5 py-1 text-[0.625rem] font-bold text-white shadow-sm backdrop-blur-md uppercase tracking-wider">
                    <Sparkles size={11} />
                    <span>{dish.badge}</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col pt-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[0.6875rem] font-semibold text-amber-800 uppercase tracking-wider">
                      {dish.category}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold leading-snug text-stone-900 transition-colors duration-300 group-hover:text-amber-800">
                      {dish.name}
                    </h3>
                  </div>
                  <span className="font-serif text-lg font-bold text-amber-900 shrink-0">
                    ₹{dish.price}
                  </span>
                </div>

                <p className="mt-2.5 flex-1 text-xs leading-relaxed text-stone-600">
                  {dish.description}
                </p>

                <div className="mt-5 border-t border-stone-200/80 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[0.6875rem] text-stone-500">
                    <Flame size={12} className="text-amber-600" />
                    <span>Clay Oven Fresh</span>
                  </div>
                  <a
                    href="#reservation"
                    className="inline-flex items-center text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-amber-800 transition-colors duration-300 hover:text-amber-950"
                  >
                    Order / Reserve →
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
