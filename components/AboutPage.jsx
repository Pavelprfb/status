"use client";

import { useState } from "react";
import usePreferences from "@/hooks/usePreferences";
import Navbar from "./Navbar";
import Footer from "./Footer";

const DEVELOPER = {
  name: "Pabel Islam",
  email: "pabelprfb@gmail.com",
  role: "Full-stack Web Developer",
  founder: "Founder of StatusBox",
  location: "Bangladesh",
};

function DeveloperAvatar({ lang }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-extrabold text-white shadow-lg shadow-blue-500/30">
        {lang === "bn" ? "পিআই" : "PI"}
      </div>
    );
  }
  return (
    <img
      src="/admin/admin.jpg"
      alt={DEVELOPER.name}
      onError={() => setFailed(true)}
      className="h-20 w-20 shrink-0 rounded-2xl border border-slate-200 object-cover shadow-lg shadow-blue-500/30 dark:border-slate-700"
    />
  );
}

function AboutPageInner() {
  const { t, lang } = usePreferences();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <section className="text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
            </svg>
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t.aboutTitle}
          </h1>
          <p className="mt-2 text-base font-semibold text-blue-600 dark:text-blue-400">
            {t.aboutLead}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            {t.aboutParagraph}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t.aboutFeaturesTitle}
          </h2>
          <ul className="mt-4 space-y-3">
            {t.aboutFeatures.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-300">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t.aboutDeveloperTitle}
          </h2>
          <div className="mt-4 flex flex-col items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-start dark:border-slate-800 dark:bg-slate-900">
            <DeveloperAvatar lang={lang} />
            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {lang === "bn" ? "পাবেল ইসলাম" : DEVELOPER.name}
              </p>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {DEVELOPER.role}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {DEVELOPER.founder} · {DEVELOPER.location}
              </p>
              <a
                href={`mailto:${DEVELOPER.email}`}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {DEVELOPER.email}
              </a>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center dark:border-blue-500/25 dark:bg-blue-500/10">
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">{t.aboutCta}</p>
          <a
            href="/contact"
            className="mt-3 inline-block rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-95"
          >
            {t.aboutCtaLink}
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function AboutPage() {
  return <AboutPageInner />;
}
