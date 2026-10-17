'use client';

import { motion } from 'framer-motion';
import { ChefHat, Flame, MessageSquare, Search, Sparkles, UtensilsCrossed } from 'lucide-react';
import { useMemo, useState } from 'react';

import { restaurant, type MenuItem } from '@/data/restaurant';

const categories = [
  'All Items',
  'Chef Specials',
  'Tandoor & Starters',
  'Main Course Curries',
  'Royal Biryani & Rice',
  'Indo-Chinese Wok',
  'Tandoori Breads',
  'Mocktails & Desserts',
];

export function MenuExplorer() {
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return restaurant.menu.filter((item) => {
      // Category filter
      if (selectedCategory === 'Chef Specials' && !item.isChefSpecial) {
        return false;
      }
      if (
        selectedCategory !== 'All Items' &&
        selectedCategory !== 'Chef Specials' &&
        item.category !== selectedCategory
      ) {
        return false;
      }

      // Dietary filter
      if (dietaryFilter !== 'all' && item.dietary !== dietaryFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      return true;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  const handleOrderWhatsApp = (dish: MenuItem) => {
    const text = `Hello The Taj Restaurant! I would like to order or enquire about: *${dish.name}* (₹${dish.price}). Could you confirm availability for dine-in / delivery?`;
    window.open(
      `https://wa.me/${restaurant.contact.whatsapp}?text=${encodeURIComponent(text)}`,
      '_blank',
    );
  };

  return (
    <div className="w-full">
      {/* Controls Bar */}
      <div className="flex flex-col gap-6 rounded-card border border-[var(--line)] bg-[var(--surface-raised)] p-5 sm:p-6 shadow-xl">
        {/* Search & Dietary Toggle */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-3.5 text-[var(--muted-dim)]" />
            <input
              type="text"
              placeholder="Search dishes (e.g., Biryani, Butter Chicken, Paneer...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[var(--line)] bg-[var(--charcoal)] py-2.5 pl-10 pr-4 text-sm text-ivory placeholder-[var(--muted-dim)] focus:border-[var(--gold)] focus:outline-none transition-colors"
            />
          </div>

          {/* Dietary Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[var(--muted-dim)] mr-1">
              Diet:
            </span>
            <button
              onClick={() => setDietaryFilter('all')}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                dietaryFilter === 'all'
                  ? 'bg-[var(--gold)] text-white font-semibold shadow-md'
                  : 'border border-[var(--line)] bg-white text-[var(--muted)] hover:text-stone-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                dietaryFilter === 'veg'
                  ? 'bg-emerald-600 text-white font-semibold shadow-md'
                  : 'border border-emerald-600/30 bg-white text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
              Pure Veg
            </button>
            <button
              onClick={() => setDietaryFilter('non-veg')}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                dietaryFilter === 'non-veg'
                  ? 'bg-rose-600 text-white font-semibold shadow-md'
                  : 'border border-rose-600/30 bg-white text-rose-700 hover:bg-rose-50'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-rose-500 inline-block" />
              Non-Veg
            </button>
          </div>
        </div>

        {/* Category Horizontal Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                selectedCategory === category
                  ? 'border border-[var(--gold)] bg-[rgba(200,169,107,0.15)] text-[var(--gold)] shadow-sm'
                  : 'border border-[var(--line)] bg-[var(--charcoal)] text-[var(--muted)] hover:text-ivory hover:border-[rgba(200,169,107,0.3)]'
              }`}
            >
              {category === 'Chef Specials' && <Sparkles size={12} className="inline mr-1.5 text-[var(--gold)]" />}
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="mt-8 flex items-center justify-between text-xs text-[var(--muted)] px-1">
        <span>
          Showing <strong className="text-ivory">{filteredItems.length}</strong> delicacies in{' '}
          <span className="text-[var(--gold)]">{selectedCategory}</span>
        </span>
        <span className="hidden sm:inline">Prices inclusive of local taxes · Chef prepared to order</span>
      </div>

      {/* Dish Grid */}
      {filteredItems.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((dish) => (
            <motion.div
              key={dish.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="group relative flex flex-col justify-between rounded-card border border-[var(--line)] bg-[var(--surface)] p-6 transition-all duration-300 hover:border-[rgba(200,169,107,0.45)] hover:bg-[var(--surface-raised)] hover:shadow-xl"
            >
              {/* Header Badges */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Dietary badge */}
                    <span
                      title={dish.dietary === 'veg' ? 'Pure Vegetarian' : 'Non-Vegetarian'}
                      className={`grid h-4 w-4 place-items-center rounded-sm border ${
                        dish.dietary === 'veg'
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-rose-600 bg-rose-50'
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          dish.dietary === 'veg' ? 'bg-emerald-600' : 'bg-rose-600'
                        }`}
                      />
                    </span>

                    {dish.isChefSpecial && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-600/30 bg-amber-50 px-2.5 py-0.5 text-[0.6875rem] font-medium text-amber-800">
                        <ChefHat size={11} />
                        Chef’s Pick
                      </span>
                    )}

                    {dish.isPopular && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-orange-500/30 bg-orange-50 px-2 py-0.5 text-[0.6875rem] font-medium text-orange-700">
                        <Flame size={11} />
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <span className="font-display text-lg font-medium text-[var(--gold)]">
                    ₹{dish.price}
                  </span>
                </div>

                {/* Title */}
                <h4 className="mt-3 font-display text-[1.125rem] text-ivory group-hover:text-[var(--gold-soft)] transition-colors">
                  {dish.name}
                </h4>

                {/* Description */}
                <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
                  {dish.description}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 flex items-center justify-between border-t border-[var(--line)] pt-4 text-xs text-[var(--muted-dim)]">
                <span>{dish.portion ?? dish.category}</span>
                <button
                  onClick={() => handleOrderWhatsApp(dish)}
                  className="flex items-center gap-1.5 text-xs text-[var(--gold)] font-medium hover:text-amber-900 transition-colors"
                >
                  <MessageSquare size={13} />
                  <span>Enquire / Order</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-card border border-[var(--line)] bg-[var(--surface)] p-12 text-center">
          <UtensilsCrossed size={36} className="mx-auto text-[var(--muted-dim)]" />
          <h4 className="mt-4 font-display text-lg text-ivory">No dishes match your filter</h4>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Try resetting your search query or selecting &quot;All Items&quot;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All Items');
              setDietaryFilter('all');
              setSearchQuery('');
            }}
            className="btn btn-ghost mt-5 text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
