"use client";

export default function Tabs({ activeTab, onChange, t, allCount, favoritesCount }) {
  const tabs = [
    { id: "all", label: t.tabAll, count: allCount, icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
        <path d="M4 6h16M4 12h16M4 18h10" />
      </svg>
    ) },
    { id: "favorites", label: t.tabFavorites, count: favoritesCount, icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ) },
  ];

  return (
    <div className="inline-flex rounded-full bg-slate-200/70 p-1 dark:bg-slate-800">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-pressed={isActive}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all sm:px-5 ${
              isActive
                ? "bg-white text-blue-600 shadow dark:bg-slate-900 dark:text-blue-400"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            {tab.icon}
            <span className="whitespace-nowrap">{tab.label}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                isActive
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                  : "bg-slate-300/70 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
