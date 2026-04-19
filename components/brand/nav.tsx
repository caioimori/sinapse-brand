"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "./container";
import { LOGO } from "./logo";
import { ThemeLogo } from "./theme-logo";
import { directLinks, navigation, type NavItem } from "@/lib/navigation";

export { LOGO };

export function Nav() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpenIdx(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenIdx(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenIdx(null);
        setMobileOpen(false);
      }
    }
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Active section highlight
  const activeSection = navigation.findIndex((g) => {
    const base = g.href.split("#")[0];
    return base !== "/" && pathname.startsWith(base);
  });

  return (
    <header
      data-smart-nav
      className="border-b border-border sticky top-0 bg-background/85 backdrop-blur-md z-[var(--layer-nav)]"
    >
      <Container className="h-[60px] flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 group/logo" aria-label="Home">
          <ThemeLogo
            variant="lockup"
            width={140}
            height={22}
            priority
            className="h-[20px] sm:h-[22px] w-auto transition-transform duration-base ease-smooth group-hover/logo:translate-x-0.5"
          />
        </Link>

        {/* Desktop nav: direct links + dropdown triggers */}
        <nav ref={ref} className="hidden lg:flex items-center gap-5 xl:gap-7 relative">
          {directLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-[10px] tracking-[0.25em] link-reveal whitespace-nowrap ${active ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
              >
                {link.label.toUpperCase()}
              </Link>
            );
          })}

          {navigation.map((group, i) => {
            const active = activeSection === i;
            const isOpen = openIdx === i;
            return (
              <div key={group.title} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  onMouseEnter={() => setOpenIdx(i)}
                  aria-expanded={isOpen}
                  className={`font-mono text-[10px] tracking-[0.25em] whitespace-nowrap inline-flex items-center gap-2 transition-opacity duration-base ease-smooth ${active ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
                >
                  {group.title.toUpperCase()}
                  <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className={`transition-transform duration-base ease-smooth ${isOpen ? "rotate-180" : ""}`}>
                    <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            );
          })}
        </nav>

        {/* Right: theme + mobile */}
        <div className="hidden lg:flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.25em] opacity-50">THEME</span>
          <ThemeToggle />
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Open menu"
          className="lg:hidden font-mono text-[10px] tracking-[0.25em] opacity-80 hover:opacity-100 inline-flex items-center gap-2"
        >
          {mobileOpen ? "CLOSE" : "MENU"}
          <span className="inline-flex flex-col gap-[3px]">
            <span className={`w-4 h-px bg-current transition-transform duration-base ease-smooth ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`w-4 h-px bg-current transition-transform duration-base ease-smooth ${mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </Container>

      {/* Mega dropdown panel — Astro-style absolute under nav */}
      {openIdx !== null && navigation[openIdx] && (
        <div
          ref={ref}
          onMouseLeave={() => setOpenIdx(null)}
          className="hidden lg:block absolute left-0 right-0 top-full bg-background border-b border-border shadow-2xl shadow-black/5 animate-fade-in"
        >
          <Container className="py-8">
            {navigation[openIdx].columns ? (
              <div className="grid grid-cols-2 gap-12">
                {navigation[openIdx].columns!.map((col, ci) => (
                  <div key={ci} className="flex flex-col gap-1.5">
                    {col.map((item) => (
                      <NavCell key={`${ci}-${item.label}-${item.href}`} item={item} active={pathname === item.href} />
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-1.5 max-w-md">
                {navigation[openIdx].items.map((item) => (
                  <NavCell key={`${item.label}-${item.href}`} item={item} active={pathname === item.href} />
                ))}
              </div>
            )}
          </Container>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in max-h-[calc(100vh-60px)] overflow-y-auto">
          <Container className="py-6">
            <div className="space-y-6">
              <div className="space-y-1.5">
                {directLinks.map((l) => {
                  const active = pathname.startsWith(l.href);
                  return (
                    <Link key={l.href} href={l.href} className={`block py-2 font-display text-base tracking-tight ${active ? "opacity-100" : "opacity-75"}`}>
                      {l.label}
                    </Link>
                  );
                })}
              </div>
              {navigation.map((group) => (
                <div key={group.title}>
                  <div className="eyebrow mb-3">[{group.title}]</div>
                  <div className="grid grid-cols-1 gap-1">
                    {(group.columns ? [...group.columns[0], ...group.columns[1]] : group.items).map((i) =>
                      i.category ? (
                        <div key={`m-${i.label}`} className="font-mono text-[10px] tracking-[0.22em] opacity-40 uppercase mt-3 mb-1">
                          {i.label}
                        </div>
                      ) : (
                        <Link key={`m-${i.href}-${i.label}`} href={i.href} className="block py-1.5 font-sans text-sm opacity-75">
                          {i.label}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="eyebrow">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

function NavCell({ item, active }: { item: NavItem; active: boolean }) {
  if (item.category) {
    return (
      <div className="font-mono text-[10px] tracking-[0.22em] opacity-40 uppercase pt-3 first:pt-0 pb-1">
        {item.label}
      </div>
    );
  }
  return (
    <Link
      href={item.href}
      className={`font-mono text-[11px] tracking-[0.18em] uppercase py-1 transition-opacity duration-base ease-smooth ${active ? "opacity-100" : "opacity-65 hover:opacity-100"}`}
    >
      {item.label}
    </Link>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"bone" | "vanta">("bone");
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
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors duration-base ease-smooth"
    >
      {theme === "bone" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
