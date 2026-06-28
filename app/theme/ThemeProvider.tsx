"use client";

import { useEffect } from "react";

export type ThemeName = "royal";

const THEME: ThemeName = "royal";

/** Applies the single brand theme (CSS variables via `data-theme`). */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", THEME);
    window.localStorage.setItem("hpaa-theme", THEME);
  }, []);

  return children;
}

/** Kept for compatibility — only the brand theme is available. */
export function useTheme() {
  return {
    theme: THEME,
    setTheme: () => {},
    themes: [THEME] as ThemeName[],
  };
}
