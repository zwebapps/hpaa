"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ThemeName = "royal" | "ocean" | "sunset";

const THEME_STORAGE_KEY = "hpaa-theme";
const THEMES: ThemeName[] = ["royal", "ocean", "sunset"];

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themes: ThemeName[];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isThemeName(value: string | null): value is ThemeName {
  return Boolean(value) && THEMES.includes(value as ThemeName);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Keep first client render identical to SSR to avoid hydration mismatch.
  const [theme, setTheme] = useState<ThemeName>("royal");

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemeName(stored) && stored !== "royal") {
      // Defer update to the next frame so hydration completes first.
      window.requestAnimationFrame(() => setTheme(stored));
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      themes: THEMES,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
