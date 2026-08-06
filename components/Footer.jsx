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
            <img
              src="/icon/android/mipmap-xxxhdpi/ic_launcher.png"
              alt="Social Status"
              className="h-9 w-9 rounded-xl object-cover shadow-lg shadow-blue-500/30"
            />
            <span className="text-lg font-bold text-slate-900 dark:text-white">{t.appName}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {t.footerTagline}
          </p>
        </div>

        <nav aria-label="Footer quick links">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
            {t.footerQuickLinks}
          </h2>
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
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
            {t.footerCategories}
          </h2>
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
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-center text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:px-6">
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
              className="text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            >
              pabelprfb@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
