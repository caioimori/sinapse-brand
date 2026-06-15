"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const SECTIONS = ["hero", "problema", "solucao", "pricing", "faq"];

export function LpNav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      el && io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--dur-base)]",
        scrolled &&
          "border-b border-[var(--border)] bg-background/70 backdrop-blur-lg"
      )}
    >
      <nav
        className="mx-auto flex h-14 items-center justify-between px-[var(--container-pad)]"
        style={{ width: "var(--container-default)" }}
      >
        <span className="eyebrow">[ SNPS ]</span>
        <ul className="flex gap-6">
          {SECTIONS.map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                className={cn(
                  "relative font-mono text-[var(--text-meta)] uppercase tracking-wider transition-colors",
                  active === s
                    ? "text-foreground"
                    : "text-[var(--muted-fg)]"
                )}
              >
                {s}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
