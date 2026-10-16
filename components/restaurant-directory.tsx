'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MapPin, Search, SlidersHorizontal, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';

import { RestaurantCard } from '@/components/restaurant-card';
import type { CategorySlug, Restaurant } from '@/data/restaurants';

type DirectoryProps = {
  restaurants: Restaurant[];
  categories: CategorySlug[];
};

type SortOption = 'curated' | 'name';

export function RestaurantDirectory({ restaurants, categories }: DirectoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();

  const initialQuery = searchParams.get('q') ?? '';
  const initialCategory = searchParams.get('category') ?? '';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string>(
    categories.includes(initialCategory as CategorySlug) ? initialCategory : '',
  );
  const [sort, setSort] = useState<SortOption>('curated');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);
  const deferredQuery = useDeferredValue(query);

  /**
   * Keeps the URL shareable. `router.replace` with a scroll:false option avoids
   * the page jumping while someone is typing.
   */
  const syncUrl = useCallback(
    (nextQuery: string, nextCategory: string) => {
      const params = new URLSearchParams();
      if (nextQuery.trim()) params.set('q', nextQuery.trim());
      if (nextCategory) params.set('category', nextCategory);
      const queryString = params.toString();
      router.replace(queryString ? `?${queryString}` : '?', { scroll: false });
    },
    [router],
  );

  useEffect(() => {
    syncUrl(query, category);
    // Only re-sync when the controlled values change, not on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredQuery, category]);

  const results = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();
    const filtered = restaurants.filter((restaurant) => {
      const matchesCategory = !category || restaurant.categories.includes(category as CategorySlug);
      if (!matchesCategory) return false;
      if (!needle) return true;

      const haystack = [
        restaurant.name,
        restaurant.category,
        restaurant.summary,
        restaurant.kicker,
        ...restaurant.cuisineHighlights.map((highlight) => highlight.label),
        ...restaurant.categories,
      ]
        .join(' ')
        .toLowerCase();

      return needle.split(/\s+/).every((token) => haystack.includes(token));
    });

    if (sort === 'name') {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
    return [...filtered].sort((a, b) => a.position - b.position);
  }, [deferredQuery, category, restaurants, sort]);

  const isFiltered = Boolean(query.trim()) || Boolean(category);
  const activeCount = (query.trim() ? 1 : 0) + (category ? 1 : 0);

  const reset = () => {
    setQuery('');
    setCategory('');
    searchRef.current?.focus();
  };

  return (
    <div>
      {/* ---------------------------------------------------------- controls */}
      <div className="sticky top-[var(--nav-height)] z-30 -mx-[var(--gutter)] border-y border-[var(--line)] bg-[rgba(16,16,16,0.9)] px-[var(--gutter)] py-4 backdrop-blur-xl">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <label htmlFor="restaurant-search" className="sr-only">
                Search restaurants by name, cuisine or category
              </label>
              <Search
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-dim)]"
              />
              <input
                id="restaurant-search"
                ref={searchRef}
                type="search"
                inputMode="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name or cuisine…"
                autoComplete="off"
                aria-describedby="search-result-count"
                className="field-input pl-11 pr-11"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    searchRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-[var(--muted-dim)] transition-colors duration-300 hover:bg-[rgba(247,243,235,0.08)] hover:text-ivory"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              ) : null}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:flex-none">
                <label htmlFor="restaurant-sort" className="sr-only">
                  Sort restaurants
                </label>
                <select
                  id="restaurant-sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortOption)}
                  className="field-input min-h-[50px] sm:w-[190px]"
                >
                  <option value="curated">Curated order</option>
                  <option value="name">Name A–Z</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setFiltersOpen((open) => !open)}
                aria-expanded={filtersOpen}
                aria-controls="category-filters"
                className="btn btn-ghost min-h-[50px] shrink-0 lg:hidden"
              >
                <SlidersHorizontal size={15} aria-hidden="true" />
                Filters
                {activeCount > 0 ? (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[var(--gold)] px-1 text-[0.625rem] font-semibold text-[#14100a]">
                    {activeCount}
                  </span>
                ) : null}
              </button>
            </div>
          </div>

          {/* Category chips */}
          <div
            id="category-filters"
            className={[
              'no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)]',
              filtersOpen ? 'flex' : 'hidden',
              'lg:mx-0 lg:flex lg:px-0',
            ].join(' ')}
          >
            <button
              type="button"
              onClick={() => setCategory('')}
              aria-pressed={category === ''}
              className="chip"
            >
              All
              <span className="text-[0.6875rem] opacity-70">{restaurants.length}</span>
            </button>
            {categories.map((option) => {
              const count = restaurants.filter((restaurant) =>
                restaurant.categories.includes(option),
              ).length;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCategory(category === option ? '' : option)}
                  aria-pressed={category === option}
                  className="chip"
                >
                  {option}
                  <span className="text-[0.6875rem] opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ results */}
      <div className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p id="search-result-count" aria-live="polite" className="text-[0.875rem] text-[var(--muted)]">
            Showing <span className="text-ivory">{results.length}</span> of{' '}
            {restaurants.length} restaurants
            {category ? (
              <>
                {' '}
                in <span className="text-[var(--gold)]">{category}</span>
              </>
            ) : null}
            {query.trim() ? (
              <>
                {' '}
                matching <span className="text-[var(--gold)]">“{query.trim()}”</span>
              </>
            ) : null}
          </p>

          {isFiltered ? (
            <button
              type="button"
              onClick={reset}
              className="btn btn-quiet text-[0.8125rem]"
            >
              <X size={14} aria-hidden="true" />
              Reset filters
            </button>
          ) : null}
        </div>

        {results.length > 0 ? (
          <motion.ul
            layout={!reduceMotion}
            className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {results.map((restaurant, index) => (
                <motion.li
                  key={restaurant.slug}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.98 }}
                  transition={{
                    duration: 0.55,
                    delay: Math.min(index, 4) * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full"
                >
                  <RestaurantCard restaurant={restaurant} index={index} priority={index < 3} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
          <EmptyResults query={query} category={category} onReset={reset} />
        )}
      </div>
    </div>
  );
}

function EmptyResults({
  query,
  category,
  onReset,
}: {
  query: string;
  category: string;
  onReset: () => void;
}) {
  return (
    <div className="mt-8 flex flex-col items-center rounded-card border border-dashed border-[var(--line-strong)] bg-[rgba(247,243,235,0.02)] px-6 py-20 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--gold)]">
        <Search size={20} aria-hidden="true" />
      </span>
      <h2 className="mt-6 font-display text-[1.5rem] text-ivory">
        No restaurants match that search
      </h2>
      <p className="mt-3 max-w-[46ch] text-[0.9375rem] text-[var(--muted)]">
        {query.trim() && category ? (
          <>
            Nothing matches “{query.trim()}” in <span className="text-ivory">{category}</span>{' '}
            right now. Our directory is growing, so try a broader term.
          </>
        ) : query.trim() ? (
          <>We could not find anything for “{query.trim()}”. Try “biryani”, “paneer” or a restaurant name.</>
        ) : (
          <>
            There is nothing listed under{' '}
            <span className="text-ivory">{category}</span> yet. Try another category.
          </>
        )}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={onReset} className="btn btn-primary">
          Show all restaurants
        </button>
        <a
          href="/map"
          className="btn btn-ghost"
        >
          <MapPin size={15} aria-hidden="true" />
          Browse on the map
        </a>
      </div>
    </div>
  );
}