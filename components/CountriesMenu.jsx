"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { COUNTRIES } from "@/data/countries";
import { LANGUAGES } from "@/lib/languages";

function Flag({ code, alt }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt={alt}
      loading="lazy"
      className="h-4 w-6 rounded-sm object-cover"
      onError={() => setFailed(true)}
    />
  );
}

const langNames = new Map(LANGUAGES.map((l) => [l.code, l.name]));
const langNatives = new Map(LANGUAGES.map((l) => [l.code, l.native]));

export default function CountriesMenu({ t, onNavigate }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? COUNTRIES.filter((c) => {
        const native = langNatives.get(c.lang) || "";
        return (
          c.name.toLowerCase().includes(q) ||
          native.toLowerCase().includes(q) ||
          (langNames.get(c.lang) || "").toLowerCase().includes(q)
        );
      })
    : COUNTRIES;

  return (
    <div className="flex flex-col">
      <div className="border-b border-slate-100 p-2 dark:border-slate-800">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchCountry}
          className="w-full rounded-full border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
        />
      </div>
      <ul role="listbox" className="max-h-80 overflow-y-auto p-1.5" aria-label={t.navCountries}>
        {filtered.map((c) => (
          <li key={c.code}>
            <Link
              href={`/country/${c.slug}`}
              onClick={onNavigate}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Flag code={c.code.toLowerCase()} alt={c.name} />
              <span className="flex-1 truncate">{c.name}</span>
              <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
                {langNatives.get(c.lang) || langNames.get(c.lang) || c.lang}
              </span>
            </Link>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="px-3 py-4 text-center text-sm text-slate-400">
            {t.noResults}
          </li>
        )}
      </ul>
    </div>
  );
}
