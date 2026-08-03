"use client";

import Link from "next/link";
import usePreferences from "@/hooks/usePreferences";
import { categories } from "@/data/categories";

export default function Footer() {
  const { t } = usePreferences();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">{t.appName}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {t.footerTagline}
          </p>
        </div>

        <nav aria-label="Footer quick links">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
            {t.footerQuickLinks}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/" className="text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                {t.navHome}
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                {t.navAbout}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                {t.navContact}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer categories">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
            {t.footerCategories}
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
            {Object.entries(categories).map(([slug, cat]) => (
              <li key={slug}>
                <Link
                  href={`/categories/${slug}`}
                  className="text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  {t[`cat_${slug}`]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-slate-200 py-5 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-center text-xs text-slate-400 dark:text-slate-500 sm:flex-row sm:px-6">
          <p>
            © {year} {t.appName}. {t.footerRights}
          </p>
          <p>
            {t.footerDeveloper}{" "}
            <a
              href="mailto:pabelprfb@gmail.com"
              className="font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Pabel Islam
            </a>{" "}
            ·{" "}
            <a
              href="mailto:pabelprfb@gmail.com"
              className="text-slate-400 transition-colors hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400"
            >
              pabelprfb@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
