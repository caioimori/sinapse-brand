"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmartScroll — provider global de:
 *  - Lenis smooth scroll (Off+Brand, NYO, Story, TheGrid)
 *  - Scroll progress (--scroll-p 0..1 em document)
 *  - Smart nav hide-on-scroll-down (TheGrid)
 *  - Honors prefers-reduced-motion
 *
 * Mount uma única vez no layout.
 */
export function SmartScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = reduce
      ? null
      : new Lenis({
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

    document.documentElement.classList.add("lenis");

    let raf = 0;
    let lastY = 0;
    let lastDir = 0;

    function tick(time: number) {
      lenis?.raf(time);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      document.documentElement.style.setProperty("--scroll-p", p.toFixed(3));

      const dir = y > lastY ? 1 : y < lastY ? -1 : lastDir;
      if (dir !== lastDir) {
        document.body.dataset.navHidden = dir === 1 && y > 200 ? "true" : "false";
        lastDir = dir;
      }
      lastY = y;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return null;
}
