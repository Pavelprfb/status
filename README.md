# StatusBox

একটি আধুনিক, responsive Facebook Status ওয়েব অ্যাপ — Next.js (App Router) + Tailwind CSS দিয়ে তৈরি। **৭২টি ভাষায়** emoji-সহ **২৫৫০+** স্ট্যাটাস খুঁজুন, কপি করুন ও পছন্দ (favorite) করে রাখুন। দেশ অনুযায়ী ভাষা স্বয়ংক্রিয়ভাবে সনাক্ত হয়।

A modern, responsive status web app built with Next.js (App Router) and Tailwind CSS. Browse **2550+** emoji-rich statuses in **72 languages** — search, copy and favorite them with one tap. The language is auto-detected from the user's country.

## Features

- **2550+ original statuses** (English + Bangla, hand-written) auto-translated into **70 more languages** (Hindi, Urdu, Arabic, Spanish, French, German, Chinese, Japanese, Russian…)
- 17 categories: Love / ভালোবাসা, Friendship / বন্ধুত্ব, Sad / কষ্ট, Motivation / অনুপ্রেরণা, Islamic / ইসলামিক, Funny / মজার, Life / জীবন, Attitude / অ্যাটিটিউড, Success & Hustle / সফলতা, Breakup / ব্রেকআপ, Happy / আনন্দ, Alone / একাকীত্ব, Nature / প্রকৃতি, Birthday / জন্মদিন, Political / রাজনীতি, Foodie / খাবারপ্রেমী, Travel / ভ্রমণ — all UI text translated too
- **Dedicated category pages** (`/categories/love`, etc.) — statically generated with SEO metadata
- **Dedicated country pages** (`/country/bangladesh`, `/country/india`, …) — 195 statically generated pages, each rendering the whole site in that country's primary language with its own SEO metadata
- **Countries dropdown** in the navbar (desktop + mobile) — searchable list of all 195 country pages
- **Auto language detection by country** — IP lookup (cached) maps 195 countries to their primary language (Bangladesh → বাংলা, India → हिन्दी, USA/UK → English, France → Français, Saudi Arabia → العربية…) with browser-locale fallback
- **Language dropdown** (hover or click) with all 72 languages, flags and a search box — the choice applies instantly to the whole site (session-only, never persisted)
- Light / Dark theme toggle (Light default) — saved in `localStorage`, no flash on load
- Search box — searches status text and category names in the active language, English and Bangla
- Copy to clipboard (Clipboard API + fallback) with "Copied!" toast
- Favorite (heart) button — saved in `localStorage`
- Two tabs: All Statuses / Favorites, with live counts
- **Load More** button (24 cards per batch) for smooth performance with 2500+ statuses
- Navbar with categories dropdown + countries dropdown + language dropdown + mobile menu; Footer with quick links and developer credit
- Pages: Home, Category pages, Country pages, **About**, **Contact**
- Developer: **Pabel Islam** · pabelprfb@gmail.com
- SEO: per-page metadata, Open Graph, JSON-LD, semantic HTML, sitemap-ready static routes
- Fully responsive: mobile, tablet and desktop

## Tech Stack

- Next.js 16 (App Router, Turbopack, static generation)
- React 19
- Tailwind CSS v4 (class-based dark mode)
- JavaScript (no TypeScript)

## Project Structure

```
.
├── app/
│   ├── layout.js                  # Root layout, SEO metadata, JSON-LD, no-flash script
│   ├── page.js                    # Home page (search, tabs, categories, all statuses)
│   ├── about/page.js              # About page
│   ├── contact/page.js            # Contact page
│   ├── categories/[slug]/page.js  # Category pages (SSG + metadata)
│   ├── country/[slug]/page.js     # Country pages (SSG, forced language + metadata)
│   └── globals.css                # Tailwind import, dark variant, custom utilities
├── components/
│   ├── Navbar.jsx                 # Logo, links, categories + countries dropdowns, mobile menu, theme toggle
│   ├── LanguageSwitcher.jsx       # Language dropdown (72 languages, flags, search)
│   ├── CountriesMenu.jsx          # Searchable list of 195 country pages
│   ├── CountryBox.jsx             # Country page container (pins the country's language)
│   ├── Footer.jsx                 # Quick links, categories, developer credit
│   ├── StatusBox.jsx              # Home container
│   ├── CategoryPage.jsx           # Category container
│   ├── StatusFeed.jsx             # Search + tabs + filter + load-more + toast
│   ├── StatusCard.jsx             # Category badge, text, copy + heart buttons
│   ├── Tabs.jsx                   # All Statuses / Favorites tabs
│   ├── SearchBar.jsx              # Search input
│   ├── CategoryFilter.jsx         # Category chips
│   ├── EmptyState.jsx             # No results / no favorites UI
│   ├── Toast.jsx                  # Copy success toast
│   ├── AboutPage.jsx              # About content (developer info)
│   └── ContactPage.jsx            # Contact form (mailto) + email card
├── data/
│   ├── statuses.js                # AUTO-GENERATED: 2550 statuses EN+BN (do not edit by hand)
│   ├── countries.js               # AUTO-GENERATED: 195 countries (code, name, slug, lang)
│   ├── categories.js              # Category names, emojis, colors
│   ├── i18n-langs.js              # AUTO-GENERATED: UI translations for 70 languages
│   └── translations/              # AUTO-GENERATED: per-language status maps + loader index
├── hooks/
│   └── usePreferences.js          # Context provider: language, theme, favorites, toast, copy
├── lib/
│   ├── i18n.js                    # EN/BN translations + merge of generated languages, countryName()
│   ├── languages.js               # 72 supported languages (code, names, flags)
│   ├── countries.js               # 195 countries -> primary language
│   └── locale.js                  # Country/language auto-detection (IP + browser locale)
└── scripts/
    ├── generate-statuses.mjs      # Regenerates data/statuses.js (deterministic seed)
    ├── generate-countries.mjs     # Regenerates data/countries.js (195 countries + slugs)
    └── translate-statuses.mjs     # Regenerates data/translations/* and data/i18n-langs.js
```

## Getting Started

Requirements: Node.js 20.9+

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm run start
```

### Regenerating the status data

```bash
node scripts/generate-statuses.mjs
```

The generator uses a fixed seed, so output is reproducible. Each category targets 150 unique bilingual statuses (2550 total across 17 categories).

### Re-translating (72 languages)

```bash
node scripts/translate-statuses.mjs
```

Translates every unique English status text + UI string (including category and country names) into 70 machine-translated languages (Bangla is hand-written). The script is **incremental and resumable** — languages whose map already contains every current source string are skipped; otherwise only the missing delta is translated and merged in. English and Bangla always remain the fallback.

### Regenerating the countries data

```bash
node scripts/generate-countries.mjs
```

Builds `data/countries.js` (195 countries with SEO slugs) from the `lib/countries.js` language map.

## How It Works

- **Language auto-detection on every load**: the language is auto-detected on each page load — instantly from the browser locale (`navigator.language`), then refined with a free IP lookup (`ipapi.co` → `ipwho.is` fallback, in-memory session cache only — **never saved to localStorage**) mapped through `lib/countries.js` — each of 195 countries maps to its primary/official language (when that language is not translatable — e.g. Dzongkha for Bhutan — a close supported language or English is used). Nothing about auto-detection is persisted.
- **Manual switch**: the language dropdown in the header (hover or click) lists all 72 languages with flags and a search box. Choosing one switches the whole site instantly for the current session; a page reload re-runs auto-detection. Only theme and favorites are persisted in `localStorage`.
- **Country pages**: every one of the 195 countries has a static page (`/country/<slug>`) rendered entirely in that country's primary language — the page's `PreferencesProvider` receives an `initialLang` prop, so SEO bots and visitors get country-appropriate content without JavaScript. The language dropdown still works on those pages.
- **Statuses in 72 languages**: English and Bangla texts are embedded in the status data. The other 70 languages are stored as `EN string → translation` maps in `data/translations/` and lazy-loaded only when that language is active, so the main bundle stays small.
- **Everything is translated**: UI text (buttons, tabs, placeholders, About/Contact pages, category names, country names) comes from `lib/i18n.js` + `data/i18n-langs.js`.
- Language and theme preferences are applied before first paint (inline script in `app/layout.js`), so there is no flash of the wrong theme/language.
- Favorites are stored as a JSON array of status IDs under the `sb-favorites` key.
- Copy uses `navigator.clipboard.writeText()` with a `document.execCommand("copy")` fallback.
- All interactive components use `"use client"`. Category pages are statically generated with `generateStaticParams` for fast loading and SEO.
- The contact form opens the visitor's email app with a pre-filled message to `pabelprfb@gmail.com` (no backend required).

## Credits

Developed by **Pabel Islam** — [pabelprfb@gmail.com](mailto:pabelprfb@gmail.com)
