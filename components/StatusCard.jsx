"use client";

const badgeStyles = {
  love: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  friendship: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  sad: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  motivation: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  islamic: "bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300",
  funny: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  life: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
};

export default function StatusCard({
  status,
  categoryLabel,
  categoryEmoji,
  text,
  isFavorite,
  onCopy,
  onToggleFavorite,
  t,
}) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700">
      <div className="mb-3 flex items-center justify-between">
        <span
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${badgeStyles[status.category]}`}
        >
          {categoryEmoji && <span aria-hidden="true">{categoryEmoji}</span>}
          {categoryLabel}
        </span>
        <button
          type="button"
          onClick={() => onToggleFavorite(status.id)}
          aria-label={isFavorite ? t.removeFavorite : t.addFavorite}
          aria-pressed={isFavorite}
          className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all active:scale-90 ${
            isFavorite
              ? "border-rose-200 bg-rose-50 text-rose-500 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400"
              : "border-slate-200 text-slate-400 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500 dark:border-slate-700 dark:text-slate-500 dark:hover:border-rose-500/40 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>

      <p className="flex-1 text-[15px] leading-relaxed text-slate-800 dark:text-slate-100">
        {text}
      </p>

      <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
        <button
          type="button"
          onClick={() => onCopy(status)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-95"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          {t.copy}
        </button>
      </div>
    </article>
  );
}
