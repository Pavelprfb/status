import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { categories } from "../data";
import { usePreferences } from "../context/Preferences";
import StatusCard from "./StatusCard";
import type { Status } from "../types";
import type { Theme } from "../theme";

const PAGE_SIZE = 30;

interface Props {
  items: Status[];
  emptyTitle: string;
  emptyHint: string;
  theme: Theme;
  onToggleFavorite: (id: number) => void;
}

export default function StatusList({ items, emptyTitle, emptyHint, theme, onToggleFavorite }: Props) {
  const { t, statusText, favorites, handleCopy } = usePreferences();
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [items.length]);

  const renderItem = useCallback(
    ({ item }: { item: Status }) => (
      <StatusCard
        status={item}
        text={statusText(item)}
        categoryLabel={String(t[`cat_${item.category}`] ?? categories[item.category]?.en ?? item.category)}
        categoryEmoji={categories[item.category]?.emoji ?? "💬"}
        isFavorite={favorites.includes(item.id)}
        theme={theme}
        t={t}
        onCopy={handleCopy}
        onToggleFavorite={onToggleFavorite}
      />
    ),
    [statusText, t, favorites, theme, handleCopy, onToggleFavorite]
  );

  const visibleItems = items.slice(0, visible);

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={[styles.emptyTitle, { color: theme.subtext }]}>{emptyTitle}</Text>
        <Text style={[styles.emptyHint, { color: theme.muted }]}>{emptyHint}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={visibleItems}
      keyExtractor={item => String(item.id)}
      renderItem={renderItem}
      onEndReached={() => setVisible(v => Math.min(v + PAGE_SIZE, items.length))}
      onEndReachedThreshold={0.5}
      contentContainerStyle={styles.list}
      ListFooterComponent={
        visible < items.length ? (
          <Pressable
            onPress={() => setVisible(v => Math.min(v + PAGE_SIZE, items.length))}
            style={({ pressed }) => [
              styles.loadMore,
              { borderColor: theme.border },
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.loadMoreText, { color: theme.accent }]}>{String(t.loadMore)}</Text>
          </Pressable>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 12,
    flexGrow: 1,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    textAlign: "center",
  },
  emptyHint: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
  },
  loadMore: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 999,
    borderWidth: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  loadMoreText: {
    fontSize: 14,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.7,
  },
});
