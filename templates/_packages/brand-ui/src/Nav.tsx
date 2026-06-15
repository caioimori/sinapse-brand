"use client";

import { useEffect, useState } from "react";
import { cn } from "./lib/cn";

/**
 * Nav — Barra de navegação fixa com scroll-spy.
 * Requer ambiente browser (use client).
 *
 * links: NavLink[] — cada link pode ter `sectionId` para scroll-spy
 * logoSrc: URL da logo (opcional, mostra texto se omitido)
 * ctaHref + ctaLabel: botão de ação primária
 */

export interface NavLink {
  href: string;
  label: string;
  sectionId?: string;
}

export interface NavProps {
  links?: NavLink[];
  logoText?: string;
  logoSrc?: string;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
}

export function Nav({
  links = [],
  logoText = "[ SNPS ]",
  ctaHref,
  ctaLabel,
  className,
}: NavProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });

    const sectionIds = links
      .map((l) => l.sectionId)
      .filter(Boolean) as string[];

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [links]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border] duration-[var(--dur-base)]",
        scrolled &&
          "border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-xl",
        className
      )}
    >
      <nav
        className="mx-auto flex h-14 items-center justify-between px-[var(--container-pad,clamp(1.5rem,4vw,5rem))]"
        style={{ width: "var(--container-default)" }}
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <a
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground"
          aria-label="Página inicial"
        >
          {logoText}
        </a>

        {/* Links */}
        {links.length > 0 && (
          <ul className="hidden items-center gap-6 md:flex" role="list">
            {links.map((link) => {
              const isActive =
                link.sectionId ? activeId === link.sectionId : false;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "relative font-mono text-[11px] uppercase tracking-wider transition-colors",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-[var(--dur-base)]",
                      isActive
                        ? "text-foreground after:scale-x-100"
                        : "text-[var(--muted-fg)] hover:text-foreground hover:after:scale-x-100"
                    )}
                    {...(link.href.startsWith("#")
                      ? {}
                      : { rel: "noopener noreferrer" })}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        {/* CTA */}
        {ctaHref && ctaLabel && (
          <a
            href={ctaHref}
            className={cn(
              "hidden md:inline-flex items-center gap-2",
              "rounded-[var(--radius-pill)] bg-foreground text-background",
              "pl-5 pr-2 h-9 font-medium text-sm",
              "transition-transform duration-[var(--dur-fast)] hover:-translate-y-0.5",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            )}
          >
            {ctaLabel}
          </a>
        )}
      </nav>
    </header>
  );
}
