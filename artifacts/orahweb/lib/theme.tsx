"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "amoled" | "yellow-night";

export const THEMES: { id: Theme; label: string; bg: string; border: string; icon: string }[] = [
  { id: "light",       label: "Light",       bg: "#ffffff", border: "#e2e8f0", icon: "☀️" },
  { id: "dark",        label: "Dark",        bg: "#1e293b", border: "#334155", icon: "🌙" },
  { id: "amoled",      label: "Amoled",      bg: "#000000", border: "#1a1a1a", icon: "⚫" },
  { id: "yellow-night",label: "Night",       bg: "#1a1400", border: "#d97706", icon: "🌕" },
];

interface ThemeCtx {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeCtx>({ theme: "light", setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const saved = (localStorage.getItem("orahweb-theme") as Theme) || "light";
    apply(saved);
  }, []);

  function apply(t: Theme) {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("orahweb-theme", t);
    setThemeState(t);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: apply }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
