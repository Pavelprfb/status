import React, { useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LANGUAGES } from "../lib/languages";
import type { Theme } from "../theme";

interface Props {
  visible: boolean;
  current: string;
  theme: Theme;
  searchLabel: string;
  onSelect: (code: string) => void;
  onClose: () => void;
}

export default function LanguagePicker({
  visible,
  current,
  theme,
  searchLabel,
  onSelect,
  onClose,
}: Props) {
  const [query, setQuery] = React.useState("");
  const inputRef = useRef<TextInput>(null);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setQuery("");
      Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: true }).start();
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [visible, opacity]);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? LANGUAGES.filter(l => `${l.name} ${l.native}`.toLowerCase().includes(q))
    : LANGUAGES;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={[styles.backdrop, { backgroundColor: theme.overlay }]} onPress={onClose}>
        <Animated.View
          style={[
            styles.sheet,
            { backgroundColor: theme.card, borderColor: theme.border, opacity },
          ]}
        >
          <View style={[styles.searchWrap, { backgroundColor: theme.inputBg }]}>
            <TextInput
              ref={inputRef}
              value={query}
              onChangeText={setQuery}
              placeholder={searchLabel}
              placeholderTextColor={theme.muted}
              style={[styles.searchInput, { color: theme.text }]}
            />
          </View>
          <View style={styles.listWrap}>
            {filtered.map(l => {
              const active = l.code === current;
              return (
                <Pressable
                  key={l.code}
                  onPress={() => onSelect(l.code)}
                  style={({ pressed }) => [
                    styles.row,
                    active && { backgroundColor: theme.accentSoft },
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={[styles.native, { color: theme.text }]}>{l.native}</Text>
                  <Text style={[styles.name, { color: theme.muted }]}>{l.name}</Text>
                  {active && <Text style={{ color: theme.accent, fontSize: 16 }}>✔</Text>}
                </Pressable>
              );
            })}
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    maxHeight: "80%",
    paddingTop: 16,
    paddingBottom: 32,
  },
  searchWrap: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 16,
  },
  searchInput: {
    paddingVertical: 10,
    fontSize: 15,
  },
  listWrap: {
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
  },
  native: {
    fontSize: 15,
    fontWeight: "600",
  },
  name: {
    fontSize: 12,
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
});
