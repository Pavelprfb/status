"use client";

export default function EmptyState({ variant, title, hint }) {
  const isFavorite = variant === "favorites";
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900/50">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-blue-500 dark:bg-slate-800 dark:text-blue-400">
        {isFavorite ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden="true">
            <path d="m12.35 19.82 5.66-5.66a6.36 6.36 0 1 0-9-9l-2.5 2.5a6.36 6.36 0 0 0 9 9l1.75-1.76M4.5 19.5l4.5-4.5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-slate-500 dark:text-slate-400">{hint}</p>
      {isFavorite && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-4 h-6 w-6 text-rose-400"
          aria-hidden="true"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      )}
    </div>
  );
}
