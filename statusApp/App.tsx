import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, StatusBar, StyleSheet, View } from "react-native";
import mobileAds from "react-native-google-mobile-ads";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PreferencesProvider, usePreferences } from "./src/context/Preferences";
import { themes, type ThemeName } from "./src/theme";
import { LANGUAGES } from "./src/lib/languages";
import { preloadInterstitial } from "./src/lib/ads";
import AppHeader from "./src/components/AppHeader";
import LanguagePicker from "./src/components/LanguagePicker";
import Toast from "./src/components/Toast";
import HomeScreen from "./src/screens/HomeScreen";
import CategoryScreen from "./src/screens/CategoryScreen";

type Screen =
  | { name: "home" }
  | { name: "category"; slug: string };

function AppContent() {
  const { lang, theme: themeName, t, setLanguage, toggleTheme } = usePreferences();
  const [screen, setScreen] = useState<Screen>({ name: "home" });
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    mobileAds()
      .initialize()
      .then(() => {
        preloadInterstitial();
      })
      .catch(err => {
        console.log(`[AdMob] initialize failed: ${err?.message ?? err}`);
        preloadInterstitial();
      });
  }, []);

  const theme = themes[themeName as ThemeName];
  const langInfo = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];
  const isDark = themeName === "dark";

  const navigateCategory = useCallback((slug: string) => {
    setScreen({ name: "category", slug });
  }, []);

  const goHome = useCallback(() => setScreen({ name: "home" }), []);

  React.useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (langOpen) {
        setLangOpen(false);
        return true;
      }
      if (screen.name === "category") {
        goHome();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [langOpen, screen, goHome]);

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      {screen.name === "home" ? (
        <>
          <AppHeader
            title={String(t.appName)}
            subtitle={String(t.tagline)}
            onOpenLanguages={() => setLangOpen(true)}
            onToggleTheme={toggleTheme}
            langNative={langInfo.native}
            isDark={isDark}
            theme={theme}
          />
          <HomeScreen theme={theme} onOpenCategory={navigateCategory} />
        </>
      ) : (
        <>
          <AppHeader
            title={String(t[`cat_${screen.slug}`] ?? screen.slug)}
            subtitle={String(t.tagline)}
            showBack
            onBack={goHome}
            onOpenLanguages={() => setLangOpen(true)}
            onToggleTheme={toggleTheme}
            langNative={langInfo.native}
            isDark={isDark}
            theme={theme}
          />
          <CategoryScreen slug={screen.slug} theme={theme} />
        </>
      )}

      <LanguagePicker
        visible={langOpen}
        current={lang}
        theme={theme}
        searchLabel={String(t.searchLanguage)}
        onSelect={code => {
          setLanguage(code);
          setLangOpen(false);
        }}
        onClose={() => setLangOpen(false)}
      />

      <ToastHost />
    </View>
  );
}

function ToastHost() {
  const { toast, theme: themeName } = usePreferences();
  return <Toast toast={toast} theme={themes[themeName as ThemeName]} />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PreferencesProvider>
        <AppContent />
      </PreferencesProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
