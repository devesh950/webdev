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
  biryani: photo('photo-1563379091339-03b21ab4a4f8'),
  dessert: photo('photo-1551024709-8f23befc6f87'),
  mocktail: photo('photo-1513558161293-cdaf765ed2fd'),
  chineseDish: photo('photo-1541832676-9b763b0239ab'),
  banquetHall: photo('photo-1519167758481-83f550bb49b3'),
  paneerTikka: photo('photo-1599488615731-7e5c2823ff28'),
  butterChickenCopper: photo('photo-1588166524941-3bf61a9c41db'),
  garlicNaan: photo('photo-1626074353765-517a681e40be'),
  modernInterior: photo('photo-1550966871-3ed3cdb5ed0c'),
} as const;

export type FoodPhotoKey = keyof typeof foodPhotos;

const ALT_TEXT: Record<FoodPhotoKey, string> = {
  diningHall: 'A warmly lit dining room with neatly set tables at The Taj.',
  mughlaiPlatter: 'A Mughlai-style meat platter arranged for royal sharing.',
  northIndianCurry: 'A rich North Indian butter curry served in a traditional copper bowl.',
  tandooriChicken: 'Tandoori chicken with charred edges, lemon wedges and spice glaze.',
  warmInterior: 'An intimate restaurant interior in warm evening golden light.',
  tableSetting: 'A laid table with cutlery and glassware ready for service.',
  indianThali: 'A grand multicuisine Indian thali with several bowls and accompaniments.',
  currySpread: 'A spread of aromatic curries and breads laid out for sharing.',
  kebabSkewer: 'Charcoal-grilled kebab skewers resting on a steel tray.',
  chefPass: 'The kitchen pass during service, with sizzling plates being finished.',
  moodyInterior: 'A darker, atmospheric dining and celebration space.',
  biryani: 'Aromatic Dum Biryani with long-grain basmati rice, tender pieces and fried onions.',
  dessert: 'Decadent warm dessert served with rich rabri and garnishes.',
  mocktail: 'Vibrant signature cooler mocktail garnished with fresh mint and citrus.',
  chineseDish: 'Wok-tossed Indo-Chinese specialty noodles and sizzling chilli paneer.',
  banquetHall: 'Spacious banquet and party celebration space decorated for family events.',
  paneerTikka: 'Charcoal-grilled Paneer Tikka cubes with crunchy bell peppers and mint chutney.',
  butterChickenCopper: 'Velvety Murgh Makhani butter chicken in authentic royal copper handi.',
  garlicNaan: 'Clay-tandoor blistered butter garlic naan brushed with ghee and fresh cilantro.',
  modernInterior: 'Modern dining room with warm wood slatted ceilings and comfortable blue booth seating.',
};

export function foodPhoto(key: FoodPhotoKey): PhotoAsset {
  return {
    src: foodPhotos[key],
    alt: ALT_TEXT[key],
    credit: UNSPLASH_CREDIT,
  };
}