export type CategoryKey = "coffee" | "tea" | "breakfast" | "pastry" | "cold" | "brunch";

export interface MenuItem {
  id: string;
  category: CategoryKey;
  name: { fa: string; en: string };
  desc: { fa: string; en: string };
  price: number; // Toman
  popular?: boolean;
  vegetarian?: boolean;
  isNew?: boolean;
  /**
   * images.unsplash.com photo ID, present only for the handful of items
   * where a real, accurately-matching, freely-licensed photo was found.
   */
  unsplashId?: string;
  /** Path under /public for a user-supplied photo of this exact dish, e.g. "/menu-photos/mirza.jpg". */
  localPhoto?: string;
}

export const categoryOrder: CategoryKey[] = [
  "coffee",
  "tea",
  "cold",
  "breakfast",
  "brunch",
  "pastry",
];

export const menuItems: MenuItem[] = [
  {
    id: "espresso",
    category: "coffee",
    name: { fa: "اسپرسو", en: "Espresso" },
    desc: { fa: "دولوچ اتیوپی، تک‌خاستگاه", en: "Single-origin Ethiopian Doluch" },
    price: 65000,
    popular: true,
    vegetarian: true,
    localPhoto: "/menu-photos/espresso.webp",
  },
  {
    id: "cortado",
    category: "coffee",
    name: { fa: "کورتادو", en: "Cortado" },
    desc: { fa: "اسپرسو با شیر بخارداده به نسبت برابر", en: "Equal parts espresso and steamed milk" },
    price: 95000,
    popular: true,
    vegetarian: true,
    localPhoto: "/menu-photos/cortado.webp",
  },
  {
    id: "flat-white",
    category: "coffee",
    name: { fa: "فلت وایت", en: "Flat White" },
    desc: { fa: "دو شات ریسترتو با میکروفوم مخملی", en: "Double ristretto, velvety microfoam" },
    price: 105000,
    vegetarian: true,
    localPhoto: "/menu-photos/flat-white.webp",
  },
  {
    id: "turkish",
    category: "coffee",
    name: { fa: "قهوه‌ی دیوان", en: "Divan Coffee" },
    desc: { fa: "دم‌آوری سنتی روی شن داغ، امضای دیوان", en: "Traditional hot-sand brew, Divan signature" },
    price: 90000,
    isNew: true,
    vegetarian: true,
    unsplashId: "1576685880864-50b3b35f1c55",
  },
  {
    id: "pour-over",
    category: "coffee",
    name: { fa: "دم‌آوری V60", en: "V60 Pour-Over" },
    desc: { fa: "انتخاب هفتگی رست‌مستر", en: "Roastmaster's weekly single-origin" },
    price: 120000,
    vegetarian: true,
    localPhoto: "/menu-photos/pour-over.webp",
  },
  {
    id: "cold-brew",
    category: "cold",
    name: { fa: "کلد برو", en: "Cold Brew" },
    desc: { fa: "دم‌آوری ۱۸ ساعته، یخ کند-آب‌شونده", en: "18-hour steep, slow-melt ice" },
    price: 98000,
    popular: true,
    vegetarian: true,
    localPhoto: "/menu-photos/cold-brew.webp",
  },
  {
    id: "iced-shekar",
    category: "cold",
    name: { fa: "شکرقهوه یخ", en: "Iced Shekar Coffee" },
    desc: { fa: "اسپرسو، شیر بادام، شکر سوخته", en: "Espresso, almond milk, burnt sugar" },
    price: 108000,
    isNew: true,
    vegetarian: true,
    localPhoto: "/menu-photos/iced-shekar.webp",
  },
  {
    id: "sekanjabin-fizz",
    category: "cold",
    name: { fa: "سکنجبین فیز", en: "Sekanjabin Fizz" },
    desc: { fa: "سکنجبین خانگی، سودا، برگ نعنا", en: "House sekanjabin syrup, soda, mint" },
    price: 88000,
    vegetarian: true,
    localPhoto: "/menu-photos/sekanjabin-fizz.webp",
  },
  {
    id: "saffron-latte",
    category: "tea",
    name: { fa: "دمنوش زعفران و هل", en: "Saffron Cardamom Infusion" },
    desc: { fa: "زعفران قاینات، هل، عسل کوهستان", en: "Qaenat saffron, cardamom, mountain honey" },
    price: 92000,
    popular: true,
    vegetarian: true,
    localPhoto: "/menu-photos/saffron-latte.webp",
  },
  {
    id: "chai-bahar",
    category: "tea",
    name: { fa: "چای بهارنارنج", en: "Bitter Orange Blossom Tea" },
    desc: { fa: "چای لاهیجان با گلاب بهارنارنج", en: "Lahijan black tea with orange blossom water" },
    price: 70000,
    vegetarian: true,
    localPhoto: "/menu-photos/chai-bahar.webp",
  },
  {
    id: "sohan-latte",
    category: "tea",
    name: { fa: "دمنوش زنجبیل و دارچین", en: "Ginger Cinnamon Infusion" },
    desc: { fa: "زنجبیل تازه، دارچین سیلان، لیموعمانی", en: "Fresh ginger, Ceylon cinnamon, dried lime" },
    price: 75000,
    vegetarian: true,
    localPhoto: "/menu-photos/sohan-latte.webp",
  },
  {
    id: "eggs-kuku",
    category: "breakfast",
    name: { fa: "کوکو سبزی و تخم‌مرغ عسلی", en: "Herb Kuku & Honeyed Eggs" },
    desc: { fa: "با نان بربری تازه و کره‌ی محلی", en: "Served with warm barbari and local butter" },
    price: 175000,
    popular: true,
    vegetarian: true,
    localPhoto: "/menu-photos/eggs-kuku.webp",
  },
  {
    id: "panir-sabzi",
    category: "breakfast",
    name: { fa: "سفره‌ی پنیر و سبزی", en: "Cheese & Herb Spread" },
    desc: { fa: "پنیر لیقوان، گردو، سبزی خوردن، مربای به", en: "Lighvan cheese, walnuts, herbs, quince jam" },
    price: 165000,
    vegetarian: true,
    localPhoto: "/menu-photos/panir-sabzi.webp",
  },
  {
    id: "shakshuka",
    category: "breakfast",
    name: { fa: "شکشوکای دیوان", en: "Divan Shakshuka" },
    desc: { fa: "تخم‌مرغ در سس گوجه و فلفل دودی", en: "Eggs poached in smoky pepper-tomato sauce" },
    price: 195000,
    isNew: true,
    vegetarian: true,
    localPhoto: "/menu-photos/shakshuka.webp",
  },
  {
    id: "kalam-polo",
    category: "brunch",
    name: { fa: "کلم‌پلو با کوفته‌ی خانگی", en: "Cabbage Rice with House Meatballs" },
    desc: { fa: "دستور خانگی مادربزرگ سرآشپز", en: "The chef's grandmother's recipe" },
    price: 320000,
    popular: true,
    localPhoto: "/menu-photos/kalam-polo.webp",
  },
  {
    id: "zeytoon-koofte",
    category: "brunch",
    name: { fa: "کوفته زیتون گیلانی", en: "Gilani Olive Kufteh" },
    desc: { fa: "گوشت گوسفندی، زیتون، آلو، آب‌نارنج", en: "Lamb, olives, sour plum, bitter orange" },
    price: 340000,
    localPhoto: "/menu-photos/zeytoon-koofte.webp",
  },
  {
    id: "mirza",
    category: "brunch",
    name: { fa: "میرزاقاسمی با نان تست", en: "Mirza Ghasemi with Toast" },
    desc: { fa: "بادمجان دودی، گوجه، تخم‌مرغ", en: "Smoked eggplant, tomato, egg" },
    price: 245000,
    vegetarian: true,
    localPhoto: "/menu-photos/mirza.webp",
  },
  {
    id: "baklava",
    category: "pastry",
    name: { fa: "باقلوای دیوان", en: "Divan Baklava" },
    desc: { fa: "پسته اصفهان، عسل، گلاب", en: "Isfahan pistachio, honey, rosewater" },
    price: 78000,
    popular: true,
    vegetarian: true,
    unsplashId: "1702745284711-fc5668288afa",
  },
  {
    id: "saffron-croissant",
    category: "pastry",
    name: { fa: "کروسان زعفرانی", en: "Saffron Croissant" },
    desc: { fa: "خمیر لایه‌ای با فیلینگ زعفران و خامه", en: "Laminated dough, saffron cream filling" },
    price: 95000,
    isNew: true,
    vegetarian: true,
    unsplashId: "1668446377138-c763c16e99f0",
  },
  {
    id: "walnut-cake",
    category: "pastry",
    name: { fa: "کیک گردو و خرما", en: "Walnut Date Cake" },
    desc: { fa: "بدون شکر تصفیه‌شده، با کارامل خرما", en: "No refined sugar, date caramel" },
    price: 85000,
    vegetarian: true,
    localPhoto: "/menu-photos/walnut-cake.webp",
  },
];

export const popularItems = menuItems.filter((item) => item.popular);

/** Number of menu items per category, derived from menuItems so it can never go stale. */
export const categoryCounts: Record<CategoryKey, number> = categoryOrder.reduce(
  (acc, key) => {
    acc[key] = menuItems.filter((item) => item.category === key).length;
    return acc;
  },
  {} as Record<CategoryKey, number>
);

export interface AmbianceFeature {
  key: "interior" | "courtyard" | "roastery" | "library";
}

export type SpaceKey = AmbianceFeature["key"];

export const ambianceFeatures: SpaceKey[] = [
  "interior",
  "courtyard",
  "roastery",
  "library",
];

export interface SpacePhoto {
  /** images.unsplash.com photo ID — Unsplash License, free for commercial use. */
  unsplashId?: string;
  /** Path under /public for a user-supplied photo. */
  localPhoto?: string;
}

/**
 * Photos for each physical space, shown on its detail page. Currently one
 * per space (reused from the homepage gallery); designed to hold several
 * once more angles are supplied.
 */
export const spacePhotos: Record<SpaceKey, SpacePhoto[]> = {
  interior: [{ localPhoto: "/gallery-photos/interior.webp" }],
  courtyard: [{ localPhoto: "/gallery-photos/courtyard.webp" }],
  roastery: [{ localPhoto: "/gallery-photos/roastery.webp" }],
  library: [{ localPhoto: "/gallery-photos/library.webp" }],
};

export interface GalleryPhoto {
  id: string;
  captionKey: string;
  /** images.unsplash.com photo ID — Unsplash License, free for commercial use. */
  unsplashId?: string;
  /** Path under /public for a user-supplied photo. */
  localPhoto?: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  { id: "g1", captionKey: "ambiance.features.interior.title", localPhoto: "/gallery-photos/interior.webp" },
  { id: "g2", captionKey: "ambiance.features.courtyard.title", localPhoto: "/gallery-photos/courtyard.webp" },
  { id: "g3", captionKey: "ambiance.features.roastery.title", localPhoto: "/gallery-photos/roastery.webp" },
  { id: "g4", captionKey: "ambiance.features.library.title", localPhoto: "/gallery-photos/library.webp" },
  { id: "g5", captionKey: "categories.items.coffee.name", unsplashId: "1426174840074-541ae41efdb9" },
  { id: "g6", captionKey: "categories.items.pastry.name", localPhoto: "/gallery-photos/pastry.webp" },
];

export const stats = [
  { key: "cups", value: 120000, suffix: "+", decimals: 0 },
  { key: "beans", value: 3, suffix: "", decimals: 0 },
  { key: "rating", value: 4.9, suffix: "", decimals: 1 },
  { key: "years", value: 4, suffix: "+", decimals: 0 },
] as const;
