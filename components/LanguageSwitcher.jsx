"use client";

import { useEffect, useRef, useState } from "react";
import { LANGUAGES } from "@/lib/languages";

function Flag({ code, alt, className = "h-4 w-6 rounded-sm object-cover" }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

export default function LanguageSwitcher({ lang, onSelect, t }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
  const q = query.trim().toLowerCase();
  const filtered = q
    ? LANGUAGES.filter((l) =>
        `${l.name} ${l.native}`.toLowerCase().includes(q)
      )
    : LANGUAGES;

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-10 items-center gap-2 rounded-full border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 transition-all hover:border-blue-400 hover:text-blue-600 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
      >
        <Flag code={current.flag} alt={current.name} />
        <span className="hidden sm:inline">{current.native}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900">
          <div className="border-b border-slate-100 p-2 dark:border-slate-800">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchLanguage}
              className="w-full rounded-full border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>
          <ul
            role="listbox"
            className="max-h-72 overflow-y-auto p-1.5"
            aria-label="Languages"
          >
            {filtered.map((l) => {
              const isActive = l.code === lang;
              return (
                <li key={l.code} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(l.code);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    }`}
                  >
                    <Flag code={l.flag} alt={l.name} />
                    <span className="flex-1 truncate">
                      {l.native}
                      <span className="ml-1.5 text-xs text-slate-400 dark:text-slate-500">
                        {l.name}
                      </span>
                    </span>
                    {isActive && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
            {filtered.length === 0 && (
              <li className="px-3 py-4 text-center text-sm text-slate-400">
                {t.noResults}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
