"use client";

import { useState } from "react";
import usePreferences from "@/hooks/usePreferences";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CONTACT_EMAIL = "pabelprfb@gmail.com";

export default function ContactPage() {
  const { t } = usePreferences();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("StatusBox message");
    const body = encodeURIComponent(
      `Name: ${name || "Anonymous"}\n\n${message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <section className="text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t.contactTitle}
          </h1>
          <p className="mt-2 text-base font-semibold text-blue-600 dark:text-blue-400">
            {t.contactLead}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            {t.contactParagraph}
          </p>
        </section>

        <section className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <h2 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
              {t.contactEmailLabel}
            </h2>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-1 break-all text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </span>
            <h2 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
              {t.contactResponseTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t.contactResponseText}
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {t.contactFormTitle}
          </h2>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                {t.contactName}
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                {t.contactMessage}
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-[0.98]"
            >
              {t.contactSend}
            </button>
            <p className="text-center text-xs text-slate-400 dark:text-slate-500">
              {t.contactNote}
            </p>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
