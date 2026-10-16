/**
 * Illustrative photography catalogue.
 *
 * IMPORTANT — HONESTY RULE FOR THIS PROJECT
 * -----------------------------------------
 * Every image in this catalogue is *illustrative stock food photography*.
 * It is NOT a photograph of the restaurant it sits next to, and the UI always
 * labels it as such (see `components/illustrative-image-note.tsx`).
 *
 * To replace these with a restaurant's own authorised photography, drop files
 * into `/public/images/<slug>/` and point `gallery` / `heroImage` in
 * `data/restaurants.ts` at them. Each entry carries its own `credit` string so
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
    w: String(opts.width ?? 1400),
    q: String(opts.quality ?? 80),
  });
  if (opts.height) params.set('h', String(opts.height));
  return `${UNSPLASH}/${id}?${params.toString()}`;
}

export type PhotoAsset = {
  src: string;
  alt: string;
  credit: string;
  focalPoint?: string;
};

export const UNSPLASH_CREDIT = 'Illustrative image · Unsplash';

export const foodPhotos = {
  northIndianCurry: photo('photo-1585937421612-70a008356fbe', { width: 1600 }),
  MughlaiPlatter: photo('photo-1603894584373-5ac82b2ae398', { width: 1600 }),
  tandooriChicken: photo('photo-1596797038530-2c107229654b', { width: 1600 }),
  biryaniHandi: photo('photo-1631515243349-e0cb75fb8d3a', { width: 1600 }),
  biryaniPlate: photo('photo-1563379091339-03b21ab4a4f8', { width: 1600 }),
  kebabSkewer: photo('photo-1555939594-58d7cb561ad1', { width: 1600 }),
  noodlesBowl: photo('photo-1569718212165-3a8278d5f624', { width: 1600 }),
  paneerDish: photo('photo-1546833999-b9f581a1996d', { width: 1600 }),
  soyaChaap: photo('photo-1601050690117-94f5f6fa8bd7', { width: 1600 }),
  indianThali: photo('photo-1567188040759-fb8a883dc6d8', { width: 1600 }),
  currySpread: photo('photo-1631452180519-c014fe946bc7', { width: 1600 }),
  diningHall: photo('photo-1517248135467-4c7edcad34c4', { width: 1600 }),
  warmInterior: photo('photo-1414235077428-338989a2e8c0', { width: 1600 }),
  moodyInterior: photo('photo-1552566626-52f8b828add9', { width: 1600 }),
  tableSetting: photo('photo-1590846406792-0adc7f938f1d', { width: 1600 }),
  chefPass: photo('photo-1559339352-11d035aa65de', { width: 1600 }),
} as const;

export type FoodPhotoKey = keyof typeof foodPhotos;

export function foodPhoto(key: FoodPhotoKey): PhotoAsset {
  const meta: Record<FoodPhotoKey, string> = {
    northIndianCurry: 'A rich North Indian curry served in a traditional bowl.',
    MughlaiPlatter: 'A Mughlai-style meat platter arranged for sharing.',
    tandooriChicken: 'Tandoori chicken with charred edges and spice glaze.',
    biryaniHandi: 'Biryani served straight from a handi, saffron grains visible.',
    biryaniPlate: 'A plate of biryani with raita and salad alongside.',
    kebabSkewer: 'Charcoal-grilled kebab skewers resting on a steel tray.',
    noodlesBowl: 'A bowl of stir-fried noodles, glossy and peppery.',
    paneerDish: 'A rich paneer preparation in a spiced gravy.',
    soyaChaap: 'Soya chaap in a creamy, pale gravy.',
    indianThali: 'An Indian thali with several bowls and accompaniments.',
    currySpread: 'A spread of curries laid out for sharing.',
    diningHall: 'A warmly lit dining room with neatly set tables.',
    warmInterior: 'An intimate restaurant interior in warm evening light.',
    moodyInterior: 'A darker, atmospheric dining space.',
    tableSetting: 'A laid table with cutlery and glassware ready for service.',
    chefPass: 'A kitchen pass during service, plates being finished.',
  };

  return { src: foodPhotos[key], alt: meta[key], credit: UNSPLASH_CREDIT };
}