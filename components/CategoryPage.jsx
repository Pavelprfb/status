"use client";

import Link from "next/link";
import usePreferences from "@/hooks/usePreferences";
import { interpolate } from "@/lib/i18n";
import { categories } from "@/data/categories";
import { statuses } from "@/data/statuses";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StatusFeed from "./StatusFeed";

export default function CategoryPage({ slug }) {
  const { t } = usePreferences();
  const cat = categories[slug];
  const catStatuses = statuses.filter((s) => s.category === slug);

  if (!cat) return null;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
        <nav aria-label="Breadcrumb" className="mb-6">
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

        <section className="mb-8 text-center">
          <span
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-3xl shadow-lg shadow-blue-500/30`}
            aria-hidden="true"
          >
            {cat.emoji}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t[`cat_${slug}`]}{" "}
            <span className="text-slate-400 dark:text-slate-500">
              {interpolate(t.statusCount, catStatuses.length)}
            </span>
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400 sm:text-base">
            {interpolate(t.catBrowse, t[`cat_${slug}`])}
          </p>
        </section>

        <StatusFeed statuses={catStatuses} />
      </main>

      <Footer />
    </div>
  );
}
