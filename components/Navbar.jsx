"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import usePreferences from "@/hooks/usePreferences";
import { categories } from "@/data/categories";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { lang, theme, t, setLanguage, toggleTheme } = usePreferences();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLinkClass = (href) =>
    `rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
      isActive(href)
        ? "bg-blue-600 text-white shadow-sm shadow-blue-600/25"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
    }`;

  const dropdownLinkClass = (active) =>
    `flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
      active
        ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6" aria-label="Main navigation">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="flex items-center gap-2.5" aria-label="StatusBox home">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </span>
            <span className="text-lg font-bold leading-tight text-slate-900 dark:text-white">
              {t.appName}
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-1 lg:flex">
          <Link href="/" className={navLinkClass("/")}>
            {t.navHome}
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setCatOpen((v) => !v)}
              aria-expanded={catOpen}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                isActive("/categories")
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/25"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              {t.navCategories}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 transition-transform ${catOpen ? "rotate-180" : ""}`} aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {catOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900">
                {Object.entries(categories).map(([slug, cat]) => (
                  <Link
                    key={slug}
                    href={`/categories/${slug}`}
                    onClick={() => setCatOpen(false)}
                    className={dropdownLinkClass(isActive(`/categories/${slug}`))}
                  >
                    <span aria-hidden="true">{cat.emoji}</span>
                    <span>{t[`cat_${slug}`]}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/about" className={navLinkClass("/about")}>
            {t.navAbout}
          </Link>
          <Link href="/contact" className={navLinkClass("/contact")}>
            {t.navContact}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} onSelect={setLanguage} t={t} />

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "light" ? t.switchToDark : t.switchToLight}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-all hover:border-blue-400 hover:text-blue-600 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-amber-300 dark:hover:border-blue-500 dark:hover:text-amber-400"
          >
            {theme === "light" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 lg:hidden"
          >
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
          <div className="flex flex-col gap-1">
            <Link href="/" onClick={() => setMobileOpen(false)} className={dropdownLinkClass(isActive("/"))}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <path d="M9 22V12h6v10" />
              </svg>
              {t.navHome}
            </Link>
            <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              {t.navCategories}
            </p>
            {Object.entries(categories).map(([slug, cat]) => (
              <Link
                key={slug}
                href={`/categories/${slug}`}
                onClick={() => setMobileOpen(false)}
                className={dropdownLinkClass(isActive(`/categories/${slug}`))}
              >
                <span aria-hidden="true">{cat.emoji}</span>
                <span>{t[`cat_${slug}`]}</span>
              </Link>
            ))}
            <Link href="/about" onClick={() => setMobileOpen(false)} className={dropdownLinkClass(isActive("/about"))}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              {t.navAbout}
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className={dropdownLinkClass(isActive("/contact"))}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              {t.navContact}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
