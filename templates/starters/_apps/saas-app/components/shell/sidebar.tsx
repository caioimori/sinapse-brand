"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NAV } from "@/lib/nav";
import { cn } from "@/lib/cn";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(localStorage.getItem("sb-collapsed") === "1");
  }, []);

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sb-collapsed", next ? "1" : "0");
  };

  return (
    <aside
      className={cn(
        "frame flex h-screen flex-col border-r border-[var(--border)] bg-card transition-[width] duration-[var(--dur-base)] ease-[var(--ease-smooth)]",
        collapsed ? "w-[64px]" : "w-[248px]"
      )}
    >
      <div className="flex h-14 items-center px-4">
        <button
          onClick={toggle}
          className="eyebrow"
          aria-label="Colapsar menu"
        >
          {collapsed ? "[ S ]" : "[ SNPS ]"}
        </button>
      </div>
      <nav className="flex-1 px-2 py-2">
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-[var(--subtle)] text-foreground"
                  : "text-[var(--muted-fg)] hover:text-foreground"
              )}
            >
              <Icon size={16} aria-hidden />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
