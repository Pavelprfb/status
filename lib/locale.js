// Language & country auto-detection (browser only).
// StatusBox supports 72 languages (English, Bangla + 70 machine-translated).
// Detection strategy (in order of reliability):
//   1. IP-based country lookup (in-memory session cache only, never persisted)
//   2. Browser locale (navigator.language) => language prefix match
//   3. English (default)
// Nothing about auto-detection is saved to localStorage — the language is
// re-detected on every page load. The user's manual choice lasts for the
// current session only.

import { COUNTRY_LANGUAGE } from "./countries";
import { SUPPORTED_LANG_CODES } from "./languages";

let cachedCountry = null;

const LOCALE_ALIASES = {
  fil: "tl",
  nb: "no",
  nn: "no",
  cnr: "sr",
  "zh-hans": "zh",
  "zh-hant": "zh",
  "zh-hk": "zh",
  "pt-pt": "pt",
  "pt-br": "pt",
  "es-419": "es",
};

export function localeToLanguage(locale) {
  const loc = (locale || "").toLowerCase();
  if (LOCALE_ALIASES[loc]) return LOCALE_ALIASES[loc];
  if (loc.startsWith("zh")) return "zh";
  const two = loc.slice(0, 2);
  return SUPPORTED_LANG_CODES.has(two) ? two : null;
}

export function detectLanguageFromLocale() {
  try {
    const locales = [navigator.language, ...(navigator.languages || [])];
    for (const loc of locales) {
      const lang = localeToLanguage(loc);
      if (lang) return lang;
    }
  } catch {
    /* ignore */
  }
  try {
    const loc = Intl.DateTimeFormat().resolvedOptions().locale || "";
    const lang = localeToLanguage(loc);
    if (lang) return lang;
  } catch {
    /* ignore */
  }
  return "en";
}

// Pure server-safe version of detectLanguageFromLocale that parses the
// Accept-Language request header so the initial SSR render matches the
// language the visitor will use after hydration (prevents a client-side
// text swap that would repaint the Largest Contentful Paint element late).
export function languageFromAcceptLanguage(acceptLanguage) {
  if (!acceptLanguage) return null;
  for (const part of acceptLanguage.split(",")) {
    const [tag] = part.trim().split(";");
    const lang = localeToLanguage(tag);
    if (lang) return lang;
  }
  return null;
}

export function languageFromCountry(countryCode) {
  const code = String(countryCode || "").toUpperCase();
  return COUNTRY_LANGUAGE[code] || "en";
}

export async function fetchCountry() {
  if (cachedCountry) return cachedCountry;

  const providers = [
    { url: "https://ipwho.is/", get: (d) => d && d.country_code },
  ];

  for (const provider of providers) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(provider.url, { signal: controller.signal });
      clearTimeout(timer);
      if (!res.ok) continue;
      const data = await res.json();
      const code = provider.get(data);
      if (typeof code === "string" && code.length === 2) {
        cachedCountry = code;
        return code;
      }
    } catch {
      /* try next provider */
    }
  }
  return null;
}
