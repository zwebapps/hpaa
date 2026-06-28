"use client";

import { useEffect } from "react";

const THEME = "royal";

/** Applies the single brand theme (CSS variables via `data-theme`). */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", THEME);
    window.localStorage.setItem("hpaa-theme", THEME);
  }, []);

  return children;
}
