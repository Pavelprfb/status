import React, { memo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { Theme } from "../theme";

interface Props {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  onOpenLanguages: () => void;
  onToggleTheme: () => void;
  langNative: string;
  isDark: boolean;
  theme: Theme;
}

function AppHeader({
  title,
  subtitle,
  showBack,
  onBack,
  onOpenLanguages,
  onToggleTheme,
  langNative,
  isDark,
  theme,
}: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: theme.headerBg,
          borderBottomColor: theme.border,
          paddingTop: insets.top + 8,
        },
      ]}
    >
      <View style={styles.row}>
        {showBack ? (
          <Pressable
            onPress={onBack}
            hitSlop={8}
            style={({ pressed }) => [styles.iconBtn, { borderColor: theme.border }, pressed && styles.pressed]}
            accessibilityLabel="Back"
          >
            <Text style={[styles.iconText, { color: theme.text }]}>‹</Text>
          </Pressable>
        ) : (
          <View style={styles.logoWrap}>
            <Image source={require("../assets/app-icon.png")} style={styles.logo} />
          </View>
        )}

        <View style={styles.titleWrap}>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          {subtitle ? (
            <Text style={[styles.subtitle, { color: theme.muted }]} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        <Pressable
          onPress={onOpenLanguages}
          hitSlop={8}
          style={({ pressed }) => [styles.iconBtn, { borderColor: theme.border }, pressed && styles.pressed]}
          accessibilityLabel="Languages"
        >
          <Text style={[styles.iconText, { color: theme.text }]}>🌐</Text>
          <Text style={[styles.langLabel, { color: theme.text }]} numberOfLines={1}>
            {langNative}
          </Text>
        </Pressable>

        <Pressable
          onPress={onToggleTheme}
          hitSlop={8}
          style={({ pressed }) => [styles.iconBtn, { borderColor: theme.border }, pressed && styles.pressed]}
          accessibilityLabel={isDark ? "Light mode" : "Dark mode"}
        >
          <Text style={styles.iconText}>{isDark ? "☀️" : "🌙"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 7,
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 12,
    marginTop: 1,
  },
  iconBtn: {
    minHeight: 36,
    paddingHorizontal: 10,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  iconText: {
    fontSize: 16,
  },
  langLabel: {
    fontSize: 13,
    fontWeight: "600",
    maxWidth: 72,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default memo(AppHeader);
