"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getTranslation } from "@/lib/i18n";
import { SUPPORTED_LANG_CODES } from "@/lib/languages";
import {
  detectLanguageFromLocale,
  languageFromCountry,
  fetchCountry,
} from "@/lib/locale";
import translationLoaders from "@/data/translations/index.js";

const THEME_KEY = "sb-theme";
const FAVORITES_KEY = "sb-favorites";

const PreferencesContext = createContext(null);

export function PreferencesProvider({ children, initialLang = null }) {
  const [lang, setLang] = useState(initialLang || "en");
  const [theme, setTheme] = useState("light");
  const [favorites, setFavorites] = useState([]);
  const [transMap, setTransMap] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const userChoseRef = useRef(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    let savedFavorites = [];
    try {
      savedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    } catch {
      savedFavorites = [];
    }
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
    setFavorites(savedFavorites);

    if (initialLang) {
      // Country pages pin a language, though the switcher still works.
      setLang(initialLang);
      return;
    }

    // The language is always auto-detected on every page load — the user's
    // manual choice is session-only and never persisted in localStorage.
    setLang(detectLanguageFromLocale());
    let cancelled = false;
    (async () => {
      const country = await fetchCountry();
      if (cancelled || !country) return;
      if (userChoseRef.current) return; // user picked meanwhile
      setLang(languageFromCountry(country));
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Lazy-load the EN -> translation map for the active machine-translated
  // language. English and Bangla are embedded in the status data itself.
  useEffect(() => {
    if (lang === "en" || lang === "bn") {
      setTransMap(null);
      return;
    }
    let cancelled = false;
    const loader = translationLoaders[lang];
    (loader ? loader() : Promise.reject(new Error("no loader")))
      .then((mod) => {
        if (!cancelled) setTransMap(mod.default || {});
      })
      .catch(() => {
        if (!cancelled) setTransMap({});
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const t = useMemo(() => getTranslation(lang), [lang]);

  const statusText = useCallback(
    (status) => {
      if (status.text[lang]) return status.text[lang];
      return (transMap && transMap[status.text.en]) || status.text.en;
    },
    [lang, transMap]
  );

  const showToast = useCallback((message, hint) => {
    setToast({ message, hint });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2000);
  }, []);

  const setLanguage = useCallback((code) => {
    if (!SUPPORTED_LANG_CODES.has(code)) return;
    userChoseRef.current = true;
    setLang(code);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  }, []);

  const handleCopy = useCallback(
    async (status) => {
      const text = statusText(status);
      try {
        await navigator.clipboard.writeText(text);
        showToast(t.copied, t.copiedHint);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        showToast(t.copied, t.copiedHint);
      }
      setTimeout(() => {
        window.open(
          "https://welcomingexpulsion.com/bqr0ww70a?key=93a942816b667574bfb9c03daa56b8c0",
          "_blank"
        );
      }, 1000);
    },
    [statusText, showToast, t.copied, t.copiedHint]
  );

  const value = useMemo(
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

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export default function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used inside PreferencesProvider");
  return ctx;
}
