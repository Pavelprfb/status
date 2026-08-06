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
import uiTranslationLoaders from "@/data/i18n/index.js";

const THEME_KEY = "sb-theme";
const FAVORITES_KEY = "sb-favorites";

const PreferencesContext = createContext(null);

export function PreferencesProvider({ children, initialLang = null, autoDetect = true }) {
  const [lang, setLang] = useState(initialLang || "en");
  const [theme, setTheme] = useState("auto");
  const [systemDark, setSystemDark] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [transMap, setTransMap] = useState(null);
  const [uiTrans, setUiTrans] = useState(null);
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
    if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "auto")
      setTheme(savedTheme);
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    if (!autoDetect) return;
    // The language is always auto-detected on every page load — the user's
    // manual choice is session-only and never persisted in localStorage.
    setLang(detectLanguageFromLocale());
    let cancelled = false;
    (async () => {
      try {
        const country = await fetchCountry();
        if (cancelled || !country) return;
        if (userChoseRef.current) return; // user picked meanwhile
        setLang(languageFromCountry(country));
      } catch {
        /* keep detected locale language */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [autoDetect]);

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
    if (lang === "en" || lang === "bn") {
      setUiTrans(null);
      return;
    }
    let cancelled = false;
    const loader = uiTranslationLoaders[lang];
    (loader ? loader() : Promise.reject(new Error("no loader")))
      .then((mod) => {
        if (!cancelled) setUiTrans(mod.default || {});
      })
      .catch(() => {
        if (!cancelled) setUiTrans({});
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setSystemDark(e.matches);
    setSystemDark(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const effectiveTheme = theme === "auto" ? (systemDark ? "dark" : "light") : theme;

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.classList.toggle("dark", effectiveTheme === "dark");
  }, [theme, effectiveTheme]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const t = useMemo(() => getTranslation(lang, uiTrans), [lang, uiTrans]);

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
    setTheme(effectiveTheme === "dark" ? "light" : "dark");
  }, [effectiveTheme]);

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
      theme: effectiveTheme,
      t,
      favorites,
      toast,
      statusText,
      setLanguage,
      toggleTheme,
      toggleFavorite,
      handleCopy,
    }),
    [lang, effectiveTheme, t, favorites, toast, statusText, setLanguage, toggleTheme, toggleFavorite, handleCopy]
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
