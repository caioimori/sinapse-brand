# starter-saas-app (dashboard autenticado — vanta-first)

> Casca de qualquer app autenticado SINAPSE: AppShell (Sidebar colapsável + Topbar + Cmd+K) + bloco de dashboard (MetricCard + chart temado) + estados de primeira classe (empty + skeleton) + StatusPill data-driven + multi-brand `[data-brand]`.
>
> **Base forense:** `caio__sinapse-crm` (referência) + `caio__sinapse-club` + `soier__central-plastica` (multi-brand) + `soier__soier-spaces` (StatusPill).
> **Correções aplicadas vs. fonte:** headlines fora da dead-zone 32-48px; sem token fantasma (`--color-muted-foreground`); ThemeProvider montado de verdade (não dark-mode morto); cor de status via token map, não hardcoded.

---

## 1. Stack exata e versões

| Pacote | Versão | Papel |
|---|---|---|
| `next` | `16.2.x` | App Router, RSC, Turbopack |
| `react` / `react-dom` | `19.2.x` | |
| `tailwindcss` + `@tailwindcss/postcss` | `4.1.x` | CSS-first, sem config |
| `@sinapse/brand-tokens` | `1.0.0` | tokens (vanta default) |
| `@supabase/ssr` + `@supabase/supabase-js` | `0.6.x` / `2.x` | auth SSR |
| `class-variance-authority` | `0.7.x` | variants de Button/Pill |
| `clsx` + `tailwind-merge` | `2.x` / `2.x` | `cn()` |
| `lucide-react` | `0.4xx` | sistema único de ícones |
| `recharts` | `3.x` | data viz temada por var (opcional) |
| `@xyflow/react` + `dagre` | `12.x` | canvas/fluxo (opcional) |
| `cmdk` | `1.x` | command palette |
| `zod` | `4.x` | |
| `vitest` + `@playwright/test` | — | testes |

Package manager: **pnpm**.

---

## 2. Estrutura de pastas

```
starter-saas-app/
├── app/
│   ├── globals.css            # @import "@sinapse/brand-tokens"
│   ├── layout.tsx             # <html data-theme="vanta"> + ThemeProvider
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── layout.tsx
│   └── (app)/
│       ├── layout.tsx         # AppShell (Sidebar + Topbar)
│       ├── page.tsx           # dashboard
│       ├── leads/page.tsx
│       └── pipeline/page.tsx
├── components/
│   ├── shell/
│   │   ├── app-shell.tsx
│   │   ├── sidebar.tsx        # 248px colapsável, persistido
│   │   ├── topbar.tsx         # 56px sticky
│   │   └── command-menu.tsx   # Cmd+K
│   ├── brand/
│   │   ├── button.tsx         # cva
│   │   ├── card.tsx
│   │   ├── metric-card.tsx    # KPI tabular-nums
│   │   ├── sparkline.tsx
│   │   ├── status-pill.tsx    # data-driven
│   │   ├── empty-state.tsx
│   │   └── skeleton.tsx
│   └── theme-provider.tsx
├── lib/
│   ├── cn.ts
│   ├── status-map.ts          # ÚNICO mapa de status
│   ├── nav.ts                 # nav role-based
│   └── supabase/{client,server}.ts
├── next.config.ts             # security headers
├── postcss.config.mjs
├── package.json
└── tsconfig.json
```

---

## 3. Dependências (`package.json` relevante)

```json
{
  "name": "starter-saas-app",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "test": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "next": "16.2.0",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "@sinapse/brand-tokens": "workspace:*",
    "@supabase/ssr": "^0.6.1",
    "@supabase/supabase-js": "^2.47.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "lucide-react": "^0.469.0",
    "recharts": "^3.0.0",
    "cmdk": "^1.0.4",
    "zod": "^4.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.7.0",
    "vitest": "^3.0.0",
    "@playwright/test": "^1.50.0"
  }
}
```

`postcss.config.mjs`:
```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

---

## 4. Arquivos-base essenciais (snippets reais)

### 4.1 `app/globals.css`

```css
@import "@sinapse/brand-tokens";   /* tokens + motion + identity + @theme bridge */

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}
```

### 4.2 `app/layout.tsx` (layout raiz — fonts + tema vanta + ThemeProvider)

```tsx
import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = { title: "SINAPSE App", description: "Painel autenticado" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="vanta" className={`${sora.variable} ${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### 4.3 `components/theme-provider.tsx` (toggle vanta/bone REAL — não código morto)

```tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "vanta" | "bone";
const Ctx = createContext<{ theme: Theme; toggle: () => void }>({ theme: "vanta", toggle: () => {} });

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
```

### 4.4 `lib/cn.ts`

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

### 4.5 `components/brand/button.tsx` (cva — variants x sizes)

```tsx
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium rounded-[var(--radius)] transition-[transform,background] duration-[var(--dur-fast)] ease-[var(--ease-smooth)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:     "bg-foreground text-background hover:bg-foreground/90",
        ghost:       "bg-transparent text-foreground hover:bg-[var(--subtle)]",
        outline:     "border border-[var(--border-strong)] text-foreground hover:bg-[var(--subtle)]",
        subtle:      "bg-[var(--muted)] text-foreground hover:bg-[var(--surface-2)]",
        destructive: "bg-[var(--destructive)] text-white hover:opacity-90",
      },
      size: {
        xs:  "h-7 px-2.5 text-xs",
        sm:  "h-8 px-3 text-sm",
        md:  "h-9 px-4 text-sm",
        lg:  "h-11 px-6 text-base",
        icon:"h-9 w-9 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";
export { buttonVariants };
```

### 4.6 `components/brand/metric-card.tsx` (KPI — valor FORA da dead-zone)

```tsx
import { cn } from "@/lib/cn";

interface MetricCardProps {
  eyebrow: string;
  value: string;
  delta?: { value: string; positive: boolean };
  className?: string;
}

export function MetricCard({ eyebrow, value, delta, className }: MetricCardProps) {
  return (
    <div className={cn("rounded-[var(--radius-xl)] border border-[var(--border)] bg-card p-5", className)}>
      <p className="eyebrow">{eyebrow}</p>
      {/* valor display: clamp(3rem,5vw,4rem) = 48-64px — escapa a dead-zone */}
      <p className="mt-3 font-display font-light tabular-nums leading-none"
         style={{ fontSize: "clamp(3rem, 5vw, 4rem)" }}>
        {value}
      </p>
      {delta && (
        <span className={cn(
          "mt-2 inline-block font-mono text-[var(--text-meta)] tracking-wider",
          delta.positive ? "text-foreground" : "text-[var(--muted-fg)] border-b border-dashed"
        )}>
          {delta.positive ? "↑" : "↓"} {delta.value}
        </span>
      )}
    </div>
  );
}
```

### 4.7 `lib/status-map.ts` + `components/brand/status-pill.tsx` (ÚNICO mapa)

```ts
// lib/status-map.ts — substitui os 4 mapas duplicados + 131 cores hardcoded
import { Circle, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export const STATUS_MAP = {
  ok:       { label: "Ativo",     intensity: "100", Icon: CheckCircle2 },
  pending:  { label: "Pendente",  intensity: "55",  Icon: Circle },
  warn:     { label: "Atenção",   intensity: "70",  Icon: AlertTriangle },
  critical: { label: "Crítico",   intensity: "100", Icon: XCircle },
} as const;
export type StatusKey = keyof typeof STATUS_MAP;
```

```tsx
// components/brand/status-pill.tsx — B&W diferencia por INTENSIDADE, não hue
import { STATUS_MAP, type StatusKey } from "@/lib/status-map";

export function StatusPill({ status }: { status: StatusKey }) {
  const { label, intensity, Icon } = STATUS_MAP[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-[var(--border)] px-2.5 py-0.5 font-mono text-[var(--text-meta)] uppercase tracking-wider"
      style={{ color: `rgba(245,245,240,0.${intensity === "100" ? "95" : intensity})` }}
    >
      <Icon size={11} aria-hidden /> {label}
    </span>
  );
}
```

### 4.8 `components/shell/sidebar.tsx` (248px colapsável, persistido)

```tsx
"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NAV } from "@/lib/nav";
import { cn } from "@/lib/cn";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => { setCollapsed(localStorage.getItem("sb-collapsed") === "1"); }, []);
  const toggle = () => { const n = !collapsed; setCollapsed(n); localStorage.setItem("sb-collapsed", n ? "1" : "0"); };

  return (
    <aside className={cn(
      "frame flex h-screen flex-col border-r border-[var(--border)] bg-card transition-[width] duration-[var(--dur-base)] ease-[var(--ease-smooth)]",
      collapsed ? "w-[64px]" : "w-[248px]"
    )}>
      <div className="flex h-14 items-center px-4">
        <button onClick={toggle} className="eyebrow" aria-label="Colapsar menu">[ SNPS ]</button>
      </div>
      <nav className="flex-1 px-2 py-2">
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href}
              className={cn(
                "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-sm transition-colors",
                active ? "bg-[var(--subtle)] text-foreground" : "text-[var(--muted-fg)] hover:text-foreground"
              )}>
              <Icon size={16} aria-hidden />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
```

### 4.9 `app/(app)/page.tsx` (página exemplo — dashboard)

```tsx
import { MetricCard } from "@/components/brand/metric-card";
import { StatusPill } from "@/components/brand/status-pill";

export default function DashboardPage() {
  return (
    <div className="mx-auto w-[var(--container-default)] px-[var(--container-pad)] py-10">
      <header className="mb-8">
        <p className="eyebrow">Visão geral</p>
        {/* H1 display 52-88px — fora da dead-zone */}
        <h1 className="mt-2 font-display font-light tracking-[-0.035em]"
            style={{ fontSize: "var(--text-h1)", lineHeight: 0.92 }}>
          Painel
        </h1>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard eyebrow="Receita" value="R$ 84,2k" delta={{ value: "12%", positive: true }} />
        <MetricCard eyebrow="Leads"   value="1.284"    delta={{ value: "3%",  positive: true }} />
        <MetricCard eyebrow="Churn"   value="2,1%"     delta={{ value: "0,4%", positive: false }} />
        <MetricCard eyebrow="MRR"     value="R$ 31,9k" delta={{ value: "8%",  positive: true }} />
      </section>

      <div className="mt-6 flex items-center gap-3">
        <StatusPill status="ok" />
        <StatusPill status="warn" />
        <StatusPill status="critical" />
      </div>
    </div>
  );
}
```

### 4.10 `next.config.ts` (security headers)

```ts
import type { NextConfig } from "next";
const config: NextConfig = {
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },
};
export default config;
```

---

## 5. Comando de scaffold

```bash
pnpm create next-app starter-saas-app --ts --app --no-tailwind --use-pnpm
cd starter-saas-app
pnpm add @tailwindcss/postcss tailwindcss @supabase/ssr @supabase/supabase-js \
  class-variance-authority clsx tailwind-merge lucide-react recharts cmdk zod
pnpm add -D vitest @playwright/test
# adicionar @sinapse/brand-tokens (workspace) e @import no globals.css
# criar postcss.config.mjs; setar <html data-theme="vanta">
pnpm dev
```

---

## 6. Multi-brand `[data-brand]` (de central-plastica)

```css
/* re-skin por cliente sem fork: 1 codebase, N clientes */
[data-brand="cliente-a"] { --foreground: #F5F5F0; /* override só os tokens de marca */ }
```
```tsx
<html data-theme="vanta" data-brand="cliente-a">
```
