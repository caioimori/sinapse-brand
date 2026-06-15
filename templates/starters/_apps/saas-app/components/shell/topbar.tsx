"use client";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";

export function Topbar() {
  const { theme, toggle } = useTheme();
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border)] bg-card px-6">
      <p className="eyebrow">SINAPSE</p>
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          aria-label="Alternar tema"
          className="grid h-8 w-8 place-items-center rounded-[var(--radius-md)] text-[var(--muted-fg)] transition-colors hover:bg-[var(--subtle)] hover:text-foreground"
        >
          {theme === "vanta" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </header>
  );
}
