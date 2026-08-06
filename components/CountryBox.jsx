"use client";

import Link from "next/link";
import usePreferences, { PreferencesProvider } from "@/hooks/usePreferences";
import { interpolate, countryName } from "@/lib/i18n";
import { statuses } from "@/data/statuses";
import { LANGUAGES } from "@/lib/languages";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StatusFeed from "./StatusFeed";

function flagEmoji(code) {
  return code
    .toUpperCase()
    .replace(/./g, (ch) => String.fromCodePoint(127397 + ch.charCodeAt(0)));
}

function CountryHero({ country }) {
  const { t } = usePreferences();
  const langInfo = LANGUAGES.find((l) => l.code === country.lang) || LANGUAGES[0];
  const name = countryName(t, country.code, country.name);
  const desc = interpolate(interpolate(t.countryStatusesDesc, name), langInfo.native);

  return (
    <section className="mb-8 text-center">
      <nav aria-label="Breadcrumb" className="mb-6 text-left">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
            <path d="m12 19-7-7 7-7M19 12H5" />
          </svg>
          {t.backToAll}
        </Link>
      </nav>

      <span
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-3xl shadow-lg shadow-blue-500/30"
        aria-hidden="true"
      >
        {flagEmoji(country.code)}
      </span>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        {interpolate(t.countryStatusesTitle, name)}
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400 sm:text-base">
        {desc}
      </p>
      <p className="mt-2 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
        {interpolate(t.statusCount, statuses.length)}
      </p>
    </section>
  );
}

export default function CountryBox({ country }) {
  return (
    <PreferencesProvider initialLang={country.lang} autoDetect={false}>
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
          <CountryHero country={country} />
          <StatusFeed statuses={statuses} withTabs withCategoryFilter />
        </main>
        <Footer />
      </div>
    </PreferencesProvider>
  );
}
