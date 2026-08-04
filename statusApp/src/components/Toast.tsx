import React, { memo, useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import type { Theme } from "../theme";

interface Props {
  toast: { message: string; hint: string } | null;
  theme: Theme;
}

function Toast({ toast, theme }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toast) {
      Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    } else {
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }).start();
    }
  }, [toast, opacity]);

  if (!toast) return null;

  return (
    <Animated.View
      style={[styles.toast, { backgroundColor: theme.accent, opacity }]}
      pointerEvents="none"
    >
      <Text style={styles.message}>{toast.message}</Text>
      {toast.hint ? <Text style={styles.hint}>{toast.hint}</Text> : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  message: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  hint: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    marginTop: 2,
  },
});

export default memo(Toast);
