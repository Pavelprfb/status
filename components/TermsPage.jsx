"use client";

import usePreferences from "@/hooks/usePreferences";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { interpolate } from "@/lib/i18n";
import { CONTACT_EMAIL, FOUNDER_NAME } from "@/lib/site";

const LAST_UPDATED = "August 6, 2026";

export default function TermsPage() {
  const { t } = usePreferences();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {t.termsTitle}
        </h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          {interpolate(t.termsUpdated, LAST_UPDATED)}
        </p>
        <div className="mt-8 space-y-8">
          {t.termsSections.map((s) => (
            <section key={s.title}>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
                {interpolate(s.body, CONTACT_EMAIL)}
              </p>
            </section>
          ))}
        </div>
        <p className="mt-10 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {interpolate(interpolate(t.legalOwnerNote, FOUNDER_NAME), CONTACT_EMAIL)}
        </p>
      </main>
      <Footer />
    </div>
  );
}