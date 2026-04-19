"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * BrandHUD — overlay persistente 4-cantos (Off+Brand pattern).
 * - TL: brand wordmark micro
 * - TR: theme toggle
 * - BL: scroll progress bar (driven via --scroll-p)
 * - BR: hora local + GMT (NYO)
 *
 * Mount no layout. mix-blend-mode: difference em todos elementos
 * faz inverter cor sob seções claras/escuras automaticamente.
 */
export function BrandHUD() {
  const [time, setTime] = useState("");
  const [theme, setTheme] = useState<"bone" | "vanta">("bone");

  useEffect(() => {
    const t = setInterval(() => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      const ss = d.getSeconds().toString().padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    }, 1000);
    setTime(new Date().toTimeString().slice(0, 8));
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const stored = (localStorage.getItem("sinapse-theme") as "bone" | "vanta" | null) ?? "bone";
    setTheme(stored);
    document.documentElement.dataset.theme = stored;
  }, []);

  function toggle() {
    const next = theme === "bone" ? "vanta" : "bone";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("sinapse-theme", next);
  }

  return (
    <div className="hud-w is-dif">
      {/* TL — brand */}
      <div className="hud-corner tl">
        <Link href="/" className="opacity-80 hover:opacity-100 transition-opacity duration-base ease-smooth">
          //SINAPSE/BRAND
        </Link>
      </div>

      {/* TR — theme + edition */}
      <div className="hud-corner tr">
        <span className="opacity-50">[{theme === "bone" ? "BONE" : "VANTA"}]</span>
        <button
          type="button"
          onClick={toggle}
          className="opacity-80 hover:opacity-100 transition-opacity duration-base ease-smooth"
          aria-label="Toggle theme"
        >
          ⌕ SWITCH_
        </button>
      </div>

      {/* BL — scroll progress */}
      <div className="hud-corner bl">
        <div className="hud-scroll">
          <span className="opacity-60">SCROLL</span>
          <div className="hud-scroll__track">
            <div className="hud-scroll__bar" />
          </div>
        </div>
      </div>

      {/* BR — local time */}
      <div className="hud-corner br">
        <span className="opacity-50">LOCAL</span>
        <span className="opacity-80">{time}</span>
        <span className="opacity-50">[GMT-3]</span>
        <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
      </div>
    </div>
  );
}
