import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { usePreferences } from "../context/Preferences";
import { statuses } from "../data";
import StatusList from "../components/StatusList";
import type { Theme } from "../theme";

interface Props {
  slug: string;
  theme: Theme;
}

export default function CategoryScreen({ slug, theme }: Props) {
  const { t, toggleFavorite } = usePreferences();

  const items = useMemo(
    () => statuses.filter(s => s.category === slug),
    [slug]
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusList
        items={items}
        emptyTitle={String(t.noResults)}
        emptyHint={String(t.noResultsHint)}
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
});
