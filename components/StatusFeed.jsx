"use client";

import { useEffect, useMemo, useState } from "react";
import { categories, categoryDots } from "@/data/categories";
import { interpolate } from "@/lib/i18n";
import usePreferences from "@/hooks/usePreferences";
import Tabs from "./Tabs";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import StatusCard from "./StatusCard";
import EmptyState from "./EmptyState";
import Toast from "./Toast";

const PAGE_SIZE = 24;

export default function StatusFeed({
  statuses,
  withTabs = false,
  withCategoryFilter = false,
  initialStatuses = null,
  totalCount = null,
}) {
  const { lang, t, favorites, toggleFavorite, handleCopy, toast, statusText } = usePreferences();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [fullStatuses, setFullStatuses] = useState(null);

  useEffect(() => {
    if (!initialStatuses) return;
    let cancelled = false;
    import("@/data/statuses")
      .then((mod) => {
        if (!cancelled) setFullStatuses(mod.statuses || []);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [initialStatuses]);

  const allStatuses = fullStatuses || initialStatuses || statuses;
  const statusTotal = totalCount || statuses.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, activeCategory, activeTab]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allStatuses.filter((status) => {
      if (activeTab === "favorites" && !favorites.includes(status.id)) return false;
      if (activeCategory !== "all" && status.category !== activeCategory) return false;
      if (query) {
        const cat = categories[status.category];
        const haystack = [
          statusText(status),
          status.text.en,
          status.text.bn,
          t[`cat_${status.category}`],
          cat.en,
          cat.bn,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [allStatuses, activeTab, activeCategory, search, favorites, statusText, t, lang]);

  const shown = filtered.slice(0, visibleCount);
  const favoritesCount = useMemo(
    () => allStatuses.filter((s) => favorites.includes(s.id)).length,
    [allStatuses, favorites]
  );

  return (
    <>
      <section className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        {withTabs ? (
          <Tabs
            activeTab={activeTab}
            onChange={setActiveTab}
            t={t}
            allCount={statusTotal}
            favoritesCount={favoritesCount}
          />
        ) : (
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {interpolate(t.statusCount, filtered.length)}
          </p>
        )}
        <div className="w-full max-w-sm">
          <SearchBar value={search} onChange={setSearch} placeholder={t.searchPlaceholder} />
        </div>
      </section>

      {withCategoryFilter && (
        <section className="mb-8">
          <CategoryFilter
            activeCategory={activeCategory}
            onChange={setActiveCategory}
            t={t}
          />
        </section>
      )}

      <section aria-label="Statuses list">
        {shown.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((status) => (
                <StatusCard
                  key={status.id}
                  status={status}
                  categoryLabel={t[`cat_${status.category}`]}
                  categoryDot={categoryDots[status.category]}
                  text={statusText(status)}
                  isFavorite={favorites.includes(status.id)}
                  onCopy={handleCopy}
                  onToggleFavorite={toggleFavorite}
                  t={t}
                />
              ))}
            </div>
            {filtered.length > visibleCount && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                  className="rounded-full border border-blue-200 bg-white px-8 py-3 text-sm font-bold text-blue-600 shadow-sm transition-all hover:border-blue-400 hover:bg-blue-50 active:scale-95 dark:border-blue-500/30 dark:bg-slate-900 dark:text-blue-400 dark:hover:bg-blue-500/10"
                >
                  {t.loadMore}
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            variant={activeTab === "favorites" ? "favorites" : "search"}
            title={activeTab === "favorites" ? t.noFavorites : t.noResults}
            hint={activeTab === "favorites" ? t.noFavoritesHint : t.noResultsHint}
          />
        )}
      </section>

      {toast && <Toast message={toast.message} hint={toast.hint} />}
    </>
  );
}
