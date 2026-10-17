'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Flame, Sparkles } from 'lucide-react';
import { useState } from 'react';

type DishItem = {
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  isSpicy?: boolean;
  isChefSpecial?: boolean;
};

const menuData: Record<'Starters' | 'Mains' | 'Desserts' | 'Drinks', DishItem[]> = {
  Starters: [
    {
      name: 'Mutton Galouti Kebab',
      description: 'Lucknowi melt-in-mouth lamb medallions slow-cooked on mahi tawa with royal potli spices.',
      price: 390,
      isVeg: false,
      isSpicy: false,
      isChefSpecial: true,
    },
    {
      name: 'Murgh Malai Tikka',
      description: 'Charcoal-grilled tender chicken steeped in condensed milk, cashew cream, and cardamom.',
      price: 320,
      isVeg: false,
      isSpicy: false,
    },
    {
      name: 'Afghani Tangdi Kebab',
      description: 'Whole chicken drumsticks roasted over clay embers with crushed black peppercorns and rich cream.',
      price: 340,
      isVeg: false,
      isSpicy: false,
    },
    {
      name: 'Paneer Tikka Shashlik',
      description: 'Artisanal malai paneer cubes cured with hung yogurt, roasted ajwain, and char-grilled bell peppers.',
      price: 280,
      isVeg: true,
      isSpicy: false,
      isChefSpecial: true,
    },
    {
      name: 'Dahi Ke Kebab',
      description: 'Golden fried crispy croquettes filled with spiced hung curd, fresh mint, and chopped coriander.',
      price: 250,
      isVeg: true,
      isSpicy: false,
    },
    {
      name: 'Chilli Paneer Wok Tossed',
      description: 'Hand-cut paneer tossed in high flame wok with fiery green chillies, garlic, and dark soy.',
      price: 260,
      isVeg: true,
      isSpicy: true,
    },
  ],
  Mains: [
    {
      name: 'Murgh Makhani (Butter Chicken)',
      description: 'Tandoor-roasted shredded chicken in a silken, slow-simmered tomato and white butter velvet gravy.',
      price: 360,
      isVeg: false,
      isSpicy: false,
      isChefSpecial: true,
    },
    {
      name: 'Taj Handi Gosht',
      description: 'Tender goat meat slow-braised in a sealed earthen pot with whole garam masalas and roasted onions.',
      price: 440,
      isVeg: false,
      isSpicy: true,
      isChefSpecial: true,
    },
    {
      name: 'Kadai Murgh Lazeez',
      description: 'Succulent chicken pieces braised in an iron kadai with coarsely ground coriander seeds and dry red chillies.',
      price: 340,
      isVeg: false,
      isSpicy: true,
    },
    {
      name: 'Dal Makhani Bukhara',
      description: 'Whole black lentils and kidney beans slow-simmered for 18 hours with hand-churned butter and pure cream.',
      price: 240,
      isVeg: true,
      isSpicy: false,
      isChefSpecial: true,
    },
    {
      name: 'Paneer Lababdar',
      description: 'Cottage cheese steeped in an opulent tomato-onion reduction enriched with grated khoya and cream.',
      price: 290,
      isVeg: true,
      isSpicy: false,
    },
    {
      name: 'Taj Dum Mutton Biryani',
      description: 'Layered aged basmati rice and marinated goat meat steamed in a sealed dough handi. Served with Burani raita.',
      price: 420,
      isVeg: false,
      isSpicy: false,
      isChefSpecial: true,
    },
    {
      name: 'Awadhi Veg Dum Biryani',
      description: 'Fragrant basmati layered with garden vegetables, saffron milk, caramelized shallots, and kewra essence.',
      price: 250,
      isVeg: true,
      isSpicy: false,
    },
    {
      name: 'Butter Garlic Naan',
      description: 'Refined flour leavened bread with minced roasted garlic, baked on the blistering clay tandoor wall.',
      price: 80,
      isVeg: true,
      isSpicy: false,
    },
  ],
  Desserts: [
    {
      name: 'Shahi Tukda with Zafrani Rabri',
      description: 'Crisp ghee-toasted brioche steeped in saffron sugar syrup and smothered in thick condensed milk rabri.',
      price: 160,
      isVeg: true,
      isSpicy: false,
      isChefSpecial: true,
    },
    {
      name: 'Warm Gulab Jamun with Rabri',
      description: 'Handcrafted khoya spheres warm from sugar syrup, crowned with a dollop of chilled kesar rabri.',
      price: 120,
      isVeg: true,
      isSpicy: false,
    },
    {
      name: 'Sizzling Chocolate Brownie',
      description: 'Dark cocoa walnut sponge served over a sizzling cast iron platter with vanilla bean gelato and warm ganache.',
      price: 190,
      isVeg: true,
      isSpicy: false,
    },
    {
      name: 'Royal Zafrani Kheer',
      description: 'Slow-simmered aromatic basmati rice pudding infused with pure Kashmiri saffron, green cardamom, and almonds.',
      price: 130,
      isVeg: true,
      isSpicy: false,
    },
  ],
  Drinks: [
    {
      name: 'Taj Saffron & Almond Lassi',
      description: 'Thick churned creamy yogurt infused with threads of pure saffron, crushed green cardamom, and slivered almonds.',
      price: 140,
      isVeg: true,
      isSpicy: false,
      isChefSpecial: true,
    },
    {
      name: 'Signature Blue Curacao Mojito',
      description: 'Chilled sparkling cooler with muddled mint leaves, fresh lime wedges, botanical syrup, and citrus soda.',
      price: 140,
      isVeg: true,
      isSpicy: false,
    },
    {
      name: 'Masala Shikanji Cooler',
      description: 'Traditional spiced lemonade with freshly squeezed lime, roasted cumin seeds, black salt, and sparkling water.',
      price: 90,
      isVeg: true,
      isSpicy: false,
    },
    {
      name: 'Virgin Coconut & Pineapple Colada',
      description: 'Pressed tropical pineapple nectar blended silky smooth with sweet coconut cream and shaved ice.',
      price: 160,
      isVeg: true,
      isSpicy: false,
    },
  ],
};

const categories = ['Starters', 'Mains', 'Desserts', 'Drinks'] as const;

export function TabbedMenu() {
  const [activeCategory, setActiveCategory] = useState<'Starters' | 'Mains' | 'Desserts' | 'Drinks'>('Starters');

  return (
    <section id="menu" className="relative bg-[#FAF7F2] py-24 sm:py-32">
      {/* Background Ambient Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,119,6,0.06),transparent_60%)]"
      />

      <div className="shell max-w-5xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-amber-600" />
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.28em] text-amber-800">
              The Culinary Repertoire
            </p>
            <span className="h-px w-6 bg-amber-600" />
          </div>

          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-stone-900">
            Our Dining Menu
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-stone-700">
            Artisanally crafted from ancient royal recipes, served hot from the deg and clay tandoor.
          </p>

          <div className="my-6 mx-auto h-px w-16 bg-amber-600/40" />
        </div>

        {/* Master Frosted Glass Card Container */}
        <div className="mt-12 rounded-3xl border border-white/90 bg-white/80 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
          {/* Glass Tab Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 border-b border-stone-200/80 pb-5">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'border border-stone-200 bg-white/70 text-stone-700 hover:bg-white hover:text-stone-900'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Dietary Legend */}
          <div className="mt-6 flex flex-wrap items-center justify-end gap-5 text-[0.6875rem] uppercase tracking-wider text-stone-600 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              Vegetarian
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-600" />
              Non-Vegetarian
            </span>
            <span className="flex items-center gap-1.5">
              <Flame size={12} className="text-amber-600" />
              Spiced / Piquant
            </span>
          </div>

          {/* Menu Items with Dotted Leaders */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-8 grid gap-x-12 gap-y-7 md:grid-cols-2"
            >
              {menuData[activeCategory].map((dish) => (
                <div
                  key={dish.name}
                  className="group flex flex-col justify-between border-b border-stone-200/60 pb-5"
                >
                  {/* Title Line with Dotted Leader & Price */}
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-center gap-2">
                      {/* Veg / Non-Veg dot */}
                      <span
                        title={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                        className={`h-2 w-2 rounded-full shrink-0 ${
                          dish.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                        }`}
                      />

                      <h3 className="font-display text-lg sm:text-xl font-bold text-stone-900 transition-colors duration-300 group-hover:text-amber-800">
                        {dish.name}
                      </h3>

                      {dish.isSpicy && (
                        <span title="Spicy">
                          <Flame size={13} className="text-amber-600 shrink-0" />
                        </span>
                      )}

                      {dish.isChefSpecial && (
                        <span title="Chef’s Special Recommendation">
                          <Sparkles size={12} className="text-amber-600 shrink-0" />
                        </span>
                      )}
                    </div>

                    {/* Dotted Leader */}
                    <span className="dotted-leader" />

                    {/* Price */}
                    <span className="font-serif text-base sm:text-lg font-bold text-amber-800 shrink-0">
                      ₹{dish.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-2 text-xs leading-relaxed text-stone-600 pl-4">
                    {dish.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Footer Note */}
          <div className="mt-12 border-t border-stone-200/80 pt-6 text-center">
            <p className="text-xs text-stone-500 font-medium">
              All preparations are cooked fresh to order · Local taxes inclusive · Private banquet tasting menus arranged on request
            </p>
            <div className="mt-5">
              <a
                href="#reservation"
                className="btn btn-primary text-xs uppercase tracking-[0.16em]"
              >
                Book a Table for Tasting
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
