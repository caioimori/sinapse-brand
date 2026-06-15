"use client";

import { useState, useEffect } from "react";
import { cn } from "./lib/cn";

/**
 * AppShell — Layout raiz de aplicação SaaS.
 * Requer ambiente browser (use client) para estado de colapso da sidebar.
 *
 * Composição: Sidebar (248px ↔ 64px) + Topbar (h-14) + main.
 * Sidebar colapsa com persistência em localStorage.
 * main tem pattern-grid como fundo decorativo.
 */

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface NavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
}

export interface AppShellOrg {
  name: string;
  plan?: string;
}

export interface AppShellMember {
  name: string;
  role?: string;
}

export interface AppShellProps {
  children: React.ReactNode;
  nav?: NavItem[];
  org?: AppShellOrg;
  member?: AppShellMember;
  topbarTitle?: string;
  topbarBreadcrumb?: string[];
  topbarRight?: React.ReactNode;
  preview?: boolean;
  signOutAction?: () => void;
  sidebarLogo?: React.ReactNode;
  className?: string;
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({
  nav = [],
  org,
  collapsed,
  onToggle,
  sidebarLogo,
}: {
  nav: NavItem[];
  org?: AppShellOrg;
  collapsed: boolean;
  onToggle: () => void;
  sidebarLogo?: React.ReactNode;
}) {
  return (
    <aside
      className={cn(
        "frame flex h-screen shrink-0 flex-col",
        "border-r border-[var(--border)] bg-card",
        "transition-[width] duration-[var(--dur-base)] ease-[var(--ease-smooth)]",
        collapsed ? "w-[64px]" : "w-[248px]"
      )}
    >
      {/* Header da sidebar */}
      <div className="flex h-14 shrink-0 items-center px-4">
        <button
          onClick={onToggle}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground"
          aria-label={collapsed ? "Expandir menu" : "Colapsar menu"}
          aria-expanded={!collapsed}
        >
          {sidebarLogo ?? (collapsed ? "[ S ]" : "[ SNPS ]")}
        </button>
      </div>

      {/* Navegação */}
      <nav className="flex-1 overflow-y-auto px-2 py-2" aria-label="Menu principal">
        {nav.map((item, idx) => (
          <a
            key={`${item.href}-${idx}`}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-sm",
              "transition-colors duration-[var(--dur-fast)]",
              item.active
                ? "bg-[var(--subtle)] text-foreground"
                : "text-[var(--muted-fg)] hover:text-foreground hover:bg-[var(--subtle)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            )}
            aria-current={item.active ? "page" : undefined}
          >
            {item.icon && (
              <span className="shrink-0 w-4 h-4 flex items-center justify-center" aria-hidden>
                {item.icon}
              </span>
            )}
            {!collapsed && <span>{item.label}</span>}
          </a>
        ))}
      </nav>

      {/* Footer da sidebar */}
      {org && !collapsed && (
        <div className="shrink-0 border-t border-[var(--border)] p-4">
          <p
            className="font-mono uppercase tracking-[0.18em] text-[var(--muted-fg)]"
            style={{ fontSize: "10px" }}
          >
            {org.name}
          </p>
          {org.plan && (
            <p
              className="mt-0.5 font-mono uppercase tracking-[0.15em] text-[var(--muted-fg)] opacity-50"
              style={{ fontSize: "10px" }}
            >
              {org.plan}
            </p>
          )}
        </div>
      )}
    </aside>
  );
}

// ─── Topbar ──────────────────────────────────────────────────────────────────

function Topbar({
  title,
  breadcrumb,
  right,
  preview,
  signOutAction,
  member,
}: {
  title?: string;
  breadcrumb?: string[];
  right?: React.ReactNode;
  preview?: boolean;
  signOutAction?: () => void;
  member?: AppShellMember;
}) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border)] bg-card px-6">
      {/* Breadcrumb / título */}
      <div className="flex items-center gap-2">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5">
              {breadcrumb.map((crumb, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-1.5 font-mono text-[var(--muted-fg)]"
                  style={{ fontSize: "11px" }}
                >
                  {idx > 0 && <span aria-hidden>/</span>}
                  <span
                    className={
                      idx === breadcrumb.length - 1
                        ? "text-foreground uppercase tracking-[0.18em]"
                        : "uppercase tracking-[0.18em]"
                    }
                  >
                    {crumb}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        ) : title ? (
          <p
            className="font-mono uppercase tracking-[0.22em] text-foreground"
            style={{ fontSize: "11px" }}
          >
            {title}
          </p>
        ) : null}
        {preview && (
          <span
            className="rounded-[var(--radius-pill)] border border-dashed border-[var(--border-strong)] px-2 py-0.5 font-mono uppercase tracking-[0.15em] text-[var(--muted-fg)]"
            style={{ fontSize: "10px" }}
          >
            Preview
          </span>
        )}
      </div>

      {/* Slot direito */}
      <div className="flex items-center gap-3">
        {right}
        {member && (
          <span
            className="font-mono uppercase tracking-[0.18em] text-[var(--muted-fg)]"
            style={{ fontSize: "10px" }}
          >
            {member.name}
          </span>
        )}
        {signOutAction && (
          <button
            onClick={signOutAction}
            className={cn(
              "grid h-8 w-8 place-items-center rounded-[var(--radius-md)]",
              "text-[var(--muted-fg)] transition-colors hover:bg-[var(--subtle)] hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            )}
            aria-label="Sair"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}

// ─── AppShell ─────────────────────────────────────────────────────────────────

export function AppShell({
  children,
  nav = [],
  org,
  member,
  topbarTitle,
  topbarBreadcrumb,
  topbarRight,
  preview,
  signOutAction,
  sidebarLogo,
  className,
}: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(localStorage.getItem("sb-collapsed") === "1");
  }, []);

  const handleToggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sb-collapsed", next ? "1" : "0");
  };

  return (
    <div className={cn("flex h-screen overflow-hidden bg-[var(--background)]", className)}>
      <Sidebar
        nav={nav}
        org={org}
        collapsed={collapsed}
        onToggle={handleToggle}
        sidebarLogo={sidebarLogo}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          title={topbarTitle}
          breadcrumb={topbarBreadcrumb}
          right={topbarRight}
          preview={preview}
          signOutAction={signOutAction}
          member={member}
        />

        {/* main com pattern-grid decorativo */}
        <main className="relative flex-1 overflow-y-auto">
          <div
            className="pattern-grid pointer-events-none absolute inset-0 opacity-50"
            aria-hidden
          />
          <div className="relative z-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
