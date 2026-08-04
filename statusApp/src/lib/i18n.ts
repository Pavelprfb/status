import langExtras from "../data/i18n-langs.js";

const en = {
  appName: "StatusBox",
  tagline: "Beautiful statuses for every platform — copy, share, express yourself",
  tabAll: "All Statuses",
  tabFavorites: "Favorites",
  searchPlaceholder: "Search status or category...",
  categoriesLabel: "Categories",
  all: "All",
  copy: "Copy",
  copied: "Copied!",
  copiedHint: "Status copied to clipboard",
  addFavorite: "Add to favorites",
  removeFavorite: "Remove from favorites",
  noResults: "No statuses found",
  noResultsHint: "Try a different search term or category.",
  noFavorites: "No favorites yet",
  noFavoritesHint: "Tap the heart icon on any status to save it here.",
  statusCount: "{count} statuses",
  favoritesCount: "{count} favorites",
  switchToLight: "Switch to light mode",
  switchToDark: "Switch to dark mode",
  searchLanguage: "Search language...",
  loadMore: "Load More",
  backToAll: "All Statuses",
  cat_love: "Love",
  cat_friendship: "Friendship",
  cat_sad: "Sad",
  cat_motivation: "Motivation",
  cat_islamic: "Islamic",
  cat_funny: "Funny",
  cat_life: "Life",
  cat_attitude: "Attitude",
  cat_success: "Success & Hustle",
  cat_breakup: "Breakup",
  cat_happy: "Happy & Positive",
  cat_alone: "Alone & Lonely",
  cat_nature: "Nature & Aesthetic",
  cat_birthday: "Birthday & Special Day",
  cat_political: "Political & Social",
  cat_foodie: "Foodie",
  cat_travel: "Travel",
};

const bn = {
  appName: "StatusBox",
  tagline: "সকল প্ল্যাটফর্মের জন্য সুন্দর স্ট্যাটাস — কপি করুন, শেয়ার করুন, নিজেকে প্রকাশ করুন",
  tabAll: "সকল স্ট্যাটাস",
  tabFavorites: "পছন্দের",
  searchPlaceholder: "স্ট্যাটাস বা বিভাগ খুঁজুন...",
  categoriesLabel: "বিভাগ",
  all: "সব",
  copy: "কপি",
  copied: "কপি হয়েছে!",
  copiedHint: "স্ট্যাটাস ক্লিপবোর্ডে কপি হয়েছে",
  addFavorite: "পছন্দে যোগ করুন",
  removeFavorite: "পছন্দ থেকে মুছুন",
  noResults: "কোনো স্ট্যাটাস পাওয়া যায়নি",
  noResultsHint: "অন্য কোনো শব্দ বা বিভাগ দিয়ে খোঁজার চেষ্টা করুন।",
  noFavorites: "এখনো কোনো পছন্দ নেই",
  noFavoritesHint: "যেকোনো স্ট্যাটাসে হার্ট আইকনে চাপ দিয়ে এখানে সংরক্ষণ করুন।",
  statusCount: "{count}টি স্ট্যাটাস",
  favoritesCount: "{count}টি পছন্দ",
  switchToLight: "লাইট মোডে যান",
  switchToDark: "ডার্ক মোডে যান",
  searchLanguage: "ভাষা খুঁজুন...",
  loadMore: "আরও দেখুন",
  backToAll: "সকল স্ট্যাটাস",
  cat_love: "ভালোবাসা",
  cat_friendship: "বন্ধুত্ব",
  cat_sad: "কষ্ট",
  cat_motivation: "অনুপ্রেরণা",
  cat_islamic: "ইসলামিক",
  cat_funny: "মজার",
  cat_life: "জীবন",
  cat_attitude: "অ্যাটিটিউড",
  cat_success: "সফলতা ও পরিশ্রম",
  cat_breakup: "ব্রেকআপ",
  cat_happy: "আনন্দ ও ইতিবাচকতা",
  cat_alone: "একাকীত্ব",
  cat_nature: "প্রকৃতি ও নান্দনিকতা",
  cat_birthday: "জন্মদিন ও বিশেষ দিন",
  cat_political: "রাজনীতি ও সামাজিক",
  cat_foodie: "খাবারপ্রেমী",
  cat_travel: "ভ্রমণ",
};

export const translations: Record<string, Record<string, string | string[]>> = {
  en,
  bn,
  ...langExtras,
};

for (const lang of Object.keys(translations)) {
  translations[lang].appName = "Social Status";
}

export function getTranslation(lang: string): Record<string, string | string[]> {
  return translations[lang] || translations.en;
}

export function interpolate(template: string, value: string): string {
  return String(template).replace(/\{[^}]+\}/, String(value));
}
