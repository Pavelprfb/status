import React, { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Status } from "../types";
import type { Theme } from "../theme";

interface Props {
  status: Status;
  text: string;
  categoryLabel: string;
  categoryEmoji: string;
  isFavorite: boolean;
  theme: Theme;
  t: Record<string, string | string[]>;
  onCopy: (status: Status) => void;
  onToggleFavorite: (id: number) => void;
}

function StatusCard({
  status,
  text,
  categoryLabel,
  categoryEmoji,
  isFavorite,
  theme,
  t,
  onCopy,
  onToggleFavorite,
}: Props) {
  return (
    <View
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
    >
      <View style={styles.topRow}>
        <View style={[styles.badge, { backgroundColor: theme.accentSoft }]}>
          <Text numberOfLines={1} style={styles.badgeText}>
            {categoryEmoji} {categoryLabel}
          </Text>
        </View>
        <Pressable
          onPress={() => onToggleFavorite(status.id)}
          hitSlop={8}
          accessibilityLabel={
            isFavorite ? String(t.removeFavorite) : String(t.addFavorite)
          }
          style={({ pressed }) => [styles.heartBtn, pressed && styles.pressed]}
        >
          <Text style={{ fontSize: 20, color: isFavorite ? theme.heartOn : theme.heartOff }}>
            {isFavorite ? "❤️" : "🤍"}
          </Text>
        </Pressable>
      </View>

      <Text style={[styles.body, { color: theme.text }]}>{text}</Text>

      <Pressable
        onPress={() => onCopy(status)}
        style={({ pressed }) => [
          styles.copyBtn,
          { backgroundColor: theme.accent },
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.copyBtnText}>⧉ {String(t.copy)}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexShrink: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2563eb",
  },
  heartBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
  },
  copyBtn: {
    marginTop: 16,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
  },
  copyBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
});

export default memo(StatusCard);
