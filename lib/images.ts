/**
 * Photography for The Taj Multicuisine Restaurant.
 *
 * IMPORTANT — HONESTY RULE FOR THIS PROJECT
 * -----------------------------------------
 * Every image here is *illustrative stock food photography*. It is NOT a
 * photograph of this restaurant, and the UI always labels it as such (see
 * `components/illustrative-note.tsx`).
 *
 * To replace these with the restaurant's own authorised photography, drop files
 * into `public/images/` and point `heroImage` / `gallery` in
 * `data/restaurant.ts` at them. Each entry carries its own `credit` string so
 * licensing stays attached to the asset.
 */

const UNSPLASH = 'https://images.unsplash.com';

/** Builds an optimised Unsplash URL. Kept in one place for easy swapping. */
export function photo(
  id: string,
  opts: { width?: number; height?: number; quality?: number } = {},
): string {
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'crop',
    w: String(opts.width ?? 1600),
    q: String(opts.quality ?? 80),
  });
  if (opts.height) params.set('h', String(opts.height));
  return `${UNSPLASH}/${id}?${params.toString()}`;
}

export type PhotoAsset = {
  src: string;
  alt: string;
  credit: string;
};

export const UNSPLASH_CREDIT = 'Illustrative image · Unsplash';

/**
 * Keys describe the *subject* of each photograph so the alt text stays accurate.
 * All IDs below were verified to resolve before being committed.
 */
export const foodPhotos = {
  diningHall: photo('photo-1517248135467-4c7edcad34c4'),
  mughlaiPlatter: photo('photo-1603894584373-5ac82b2ae398'),
  northIndianCurry: photo('photo-1585937421612-70a008356fbe'),
  tandooriChicken: photo('photo-1596797038530-2c107229654b'),
  warmInterior: photo('photo-1414235077428-338989a2e8c0'),
  tableSetting: photo('photo-1590846406792-0adc7f938f1d'),
  indianThali: photo('photo-1567188040759-fb8a883dc6d8'),
  currySpread: photo('photo-1631452180519-c014fe946bc7'),
  kebabSkewer: photo('photo-1555939594-58d7cb561ad1'),
  chefPass: photo('photo-1559339352-11d035aa65de'),
  moodyInterior: photo('photo-1552566626-52f8b828add9'),
} as const;

export type FoodPhotoKey = keyof typeof foodPhotos;

const ALT_TEXT: Record<FoodPhotoKey, string> = {
  diningHall: 'A warmly lit dining room with neatly set tables.',
  mughlaiPlatter: 'A Mughlai-style meat platter arranged for sharing.',
  northIndianCurry: 'A rich North Indian curry served in a traditional bowl.',
  tandooriChicken: 'Tandoori chicken with charred edges and a spice glaze.',
  warmInterior: 'An intimate restaurant interior in warm evening light.',
  tableSetting: 'A laid table with cutlery and glassware ready for service.',
  indianThali: 'An Indian thali with several bowls and accompaniments.',
  currySpread: 'A spread of curries laid out for sharing.',
  kebabSkewer: 'Charcoal-grilled kebab skewers resting on a steel tray.',
  chefPass: 'A kitchen pass during service, with plates being finished.',
  moodyInterior: 'A darker, atmospheric dining space.',
};

export function foodPhoto(key: FoodPhotoKey): PhotoAsset {
  return {
    src: foodPhotos[key],
    alt: ALT_TEXT[key],
    credit: UNSPLASH_CREDIT,
  };
}