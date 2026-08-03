"use client";

import { categories, categoryDots } from "@/data/categories";

export default function CategoryFilter({ activeCategory, onChange, t }) {
  const chips = [
    {
      id: "all",
      label: t.all,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
    },
    ...Object.entries(categories).map(([id]) => ({
      id,
      label: t[`cat_${id}`],
      icon: <span className={`h-2.5 w-2.5 rounded-full ${categoryDots[id]}`} aria-hidden="true" />,
    })),
  ];

  return (
    <div>
      <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {t.categoriesLabel}
      </p>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {chips.map((chip) => {
          const isActive = activeCategory === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => onChange(chip.id)}
              aria-pressed={isActive}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
                isActive
                  ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/25"
                  : "border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
              }`}
            >
              {chip.icon}
              <span className="whitespace-nowrap">{chip.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
