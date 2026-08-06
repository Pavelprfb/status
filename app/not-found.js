"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import usePreferences from "@/hooks/usePreferences";

export default function NotFound() {
  const { t } = usePreferences();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <p className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-8xl font-black tracking-tight text-transparent sm:text-9xl">
          404
        </p>
        <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
          Sorry, the page you are looking for does not exist, was moved or is
          temporarily unavailable.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-95"
          >
            {t.navHome}
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
          >
            {t.navContact}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}