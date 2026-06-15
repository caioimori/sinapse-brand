"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "vanta" | "bone";

const Ctx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "vanta",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("vanta");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme) || "vanta";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggle = () => {
    const next = theme === "vanta" ? "bone" : "vanta";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
