import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { usePreferences } from "../context/Preferences";
import { categories, categoryOrder, statuses } from "../data";
import StatusList from "../components/StatusList";
import type { Theme } from "../theme";

interface Props {
  theme: Theme;
  onOpenCategory: (slug: string) => void;
}

export default function HomeScreen({ theme, onOpenCategory }: Props) {
  const { t, favorites, statusText, toggleFavorite } = usePreferences();
  const [tab, setTab] = useState<"all" | "fav">("all");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return statuses.filter(s => {
      if (tab === "fav" && !favorites.includes(s.id)) return false;
      if (category !== "all" && s.category !== category) return false;
      if (!q) return true;
      const catLabel = String(t[`cat_${s.category}`] ?? "").toLowerCase();
      return (
        statusText(s).toLowerCase().includes(q) ||
        catLabel.includes(q) ||
        categories[s.category].en.toLowerCase().includes(q)
      );
    });
  }, [tab, query, category, favorites, t, statusText]);

  const count = useMemo(
    () => String(tab === "fav" ? t.favoritesCount : t.statusCount).replace(/\{[^}]+\}/, String(items.length)),
    [tab, items.length, t]
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={[styles.searchWrap, { backgroundColor: theme.inputBg, borderColor: theme.border }]}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={String(t.searchPlaceholder)}
          placeholderTextColor={theme.muted}
          style={[styles.searchInput, { color: theme.text }]}
        />
      </View>

      <View style={styles.tabs}>
        {(["all", "fav"] as const).map(key => {
          const active = tab === key;
          return (
            <Pressable
              key={key}
              onPress={() => setTab(key)}
              style={[
                styles.tab,
                {
                  backgroundColor: active ? theme.accent : theme.chipBg,
                  borderColor: active ? theme.accent : theme.chipBorder,
                },
              ]}
            >
              <Text style={[styles.tabText, { color: active ? "#fff" : theme.subtext }]}>
                {key === "all" ? String(t.tabAll) : String(t.tabFavorites)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsScroll}
        contentContainerStyle={styles.chipsContent}
      >
        {["all", ...categoryOrder].map(slug => {
          const active = category === slug;
          return (
            <Pressable
              key={slug}
              onPress={() => setCategory(slug)}
              style={[
                styles.chip,
                {
                  backgroundColor: active ? theme.accent : theme.chipBg,
                  borderColor: active ? theme.accent : theme.chipBorder,
                },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[styles.chipText, { color: active ? "#fff" : theme.subtext }]}
              >
                {slug === "all" ? `✨ ${String(t.all)}` : `${categories[slug].emoji} ${String(t[`cat_${slug}`] ?? categories[slug].en)}`}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Text style={[styles.count, { color: theme.muted }]}>{count}</Text>

      <StatusList
        items={items}
        emptyTitle={String(tab === "fav" ? t.noFavorites : t.noResults)}
        emptyHint={String(tab === "fav" ? t.noFavoritesHint : t.noResultsHint)}
        theme={theme}
        onToggleFavorite={toggleFavorite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchWrap: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  searchInput: {
    paddingVertical: 10,
    fontSize: 15,
  },
  tabs: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 12,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
  },
  tabText: {
    fontSize: 13,
    fontWeight: "700",
  },
  chipsScroll: {
    flexGrow: 0,
    flexShrink: 0,
    marginVertical: 9,
  },
  chipsContent: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    minHeight: 38,
    justifyContent: "center",
  },
  chipText: {
    fontSize: 14,
    fontWeight: "600",
  },
  count: {
    marginHorizontal: 16,
    marginBottom: 4,
    fontSize: 12,
    fontWeight: "600",
  },
});
