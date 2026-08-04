import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Clipboard from "@react-native-clipboard/clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import { getTranslation, interpolate } from "../lib/i18n";
import { SUPPORTED_LANG_CODES } from "../lib/languages";
import { translations } from "../data";
import { preloadInterstitial, showInterstitial } from "../lib/ads";
import type { Status } from "../types";
import type { ThemeName } from "../theme";

const THEME_KEY = "sb-theme";
const FAVORITES_KEY = "sb-favorites";
const LANG_KEY = "sb-lang";

interface ToastState {
  message: string;
  hint: string;
}

interface PreferencesValue {
  lang: string;
  theme: ThemeName;
  t: Record<string, string | string[]>;
  favorites: number[];
  toast: ToastState | null;
  statusText: (status: Status) => string;
  setLanguage: (code: string) => void;
  toggleTheme: () => void;
  toggleFavorite: (id: number) => void;
  handleCopy: (status: Status) => Promise<void>;
}

const PreferencesContext = createContext<PreferencesValue | null>(null);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState<ThemeName>("light");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userChoseTheme = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const [savedTheme, savedFav, savedLang] = await Promise.all([
          AsyncStorage.getItem(THEME_KEY),
          AsyncStorage.getItem(FAVORITES_KEY),
          AsyncStorage.getItem(LANG_KEY),
        ]);
        if (savedTheme === "light" || savedTheme === "dark") {
          userChoseTheme.current = true;
          setTheme(savedTheme);
        }
        if (savedFav) setFavorites(JSON.parse(savedFav));
        if (savedLang && SUPPORTED_LANG_CODES.has(savedLang)) setLang(savedLang);
      } catch {
        // ignore storage errors
      }
    })();
  }, []);

  // সিস্টেম থিম ফলো করুন — যতক্ষণ ব্যবহারকারী নিজে থিম বাছাই করেননি
  useEffect(() => {
    if (!userChoseTheme.current) {
      setTheme(systemScheme === "dark" ? "dark" : "light");
    }
  }, [systemScheme]);

  useEffect(() => {
    AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)).catch(() => {});
  }, [favorites]);

  useEffect(() => {
    AsyncStorage.setItem(LANG_KEY, lang).catch(() => {});
  }, [lang]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const t = useMemo(() => getTranslation(lang), [lang]);

  const statusText = useCallback(
    (status: Status) => {
      if (status.text[lang as keyof typeof status.text]) return status.text[lang as "en"];
      const map = translations[lang];
      if (map && typeof map === "object" && map[status.id] != null) {
        return String(map[status.id]);
      }
      return status.text.en;
    },
    [lang]
  );

  const showToast = useCallback((message: string, hint: string) => {
    setToast({ message, hint });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2000);
  }, []);

  const setLanguage = useCallback((code: string) => {
    if (!SUPPORTED_LANG_CODES.has(code)) return;
    setLang(code);
  }, []);

  const toggleTheme = useCallback(() => {
    userChoseTheme.current = true;
    setTheme(prev => {
      const next = prev === "light" ? "dark" : "light";
      AsyncStorage.setItem(THEME_KEY, next).catch(() => {});
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  }, []);

  const handleCopy = useCallback(
    async (status: Status) => {
      const text = statusText(status);
      await Clipboard.setString(text);
      showToast(String(t.copied), String(t.copiedHint));
      if (!showInterstitial()) {
        preloadInterstitial();
      }
    },
    [statusText, showToast, t]
  );

  const value = useMemo<PreferencesValue>(
    () => ({
      lang,
      theme,
      t,
      favorites,
      toast,
      statusText,
      setLanguage,
      toggleTheme,
      toggleFavorite,
      handleCopy,
    }),
    [lang, theme, t, favorites, toast, statusText, setLanguage, toggleTheme, toggleFavorite, handleCopy]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences(): PreferencesValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used inside PreferencesProvider");
  return ctx;
}

export { interpolate };
