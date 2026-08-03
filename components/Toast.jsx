"use client";

export default function Toast({ message, hint }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-toast-in"
    >
      <div className="flex items-center gap-3 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 dark:bg-white dark:text-slate-900">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <span>{message}</span>
        {hint && <span className="hidden font-normal text-slate-400 dark:text-slate-500 sm:inline">· {hint}</span>}
      </div>
    </div>
  );
}
