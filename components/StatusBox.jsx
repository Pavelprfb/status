"use client";

import usePreferences from "@/hooks/usePreferences";
import { interpolate } from "@/lib/i18n";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StatusFeed from "./StatusFeed";

export default function StatusBox({ initialStatuses, totalCount }) {
  const { t } = usePreferences();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
        <section className="mb-8 text-center">
          <h1 className="flex items-center justify-center gap-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            <img
              src="/icon/android/mipmap-xxxhdpi/ic_launcher.png"
              alt=""
              fetchPriority="high"
              className="h-10 w-10 rounded-2xl object-cover shadow-lg shadow-blue-500/30 sm:h-12 sm:w-12"
            />
            {t.appName}
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400 sm:text-base">
            {t.tagline}
          </p>
          <p className="mt-2 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            {interpolate(t.statusCount, totalCount)}
          </p>
        </section>

        <StatusFeed
          initialStatuses={initialStatuses}
          totalCount={totalCount}
          withTabs
          withCategoryFilter
        />
      </main>

      <Footer />
    </div>
  );
}
