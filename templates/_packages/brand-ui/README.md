# @sinapse/brand-ui

Biblioteca de componentes React para o ecossistema SINAPSE. Consome `@sinapse/brand-tokens` e materializa as specs da `templates/biblioteca/`.

## Estratégia de distribuição

| Camada | O quê | Uso |
|--------|-------|-----|
| Pacote workspace | Primitivos (Button, Card, Input, Badge...) | `import { Button } from "@sinapse/brand-ui"` |
| Copy-paste | Blocos compostos (Hero, Nav, Footer...) | Copie de `src/` para seu projeto |
| CSS puro | Tokens, motion, identity layer | `@sinapse/brand-tokens` |

## Instalação (monorepo workspace)

```jsonc
// package.json do seu app
{
  "dependencies": {
    "@sinapse/brand-tokens": "workspace:*",
    "@sinapse/brand-ui": "workspace:*"
  }
}
```

Importe os tokens CSS no entry point do app:

```ts
// app/layout.tsx ou main.tsx
import "@sinapse/brand-tokens";
```

## Componentes

### Primitivos

| Componente | API resumida |
|-----------|-------------|
| `Button` | `variant?: primary\|ghost\|outline\|subtle\|destructive\|cta` · `size?: xs\|sm\|md\|lg\|icon` |
| `Card` | `hover?: boolean` · `padding?: none\|sm\|md\|lg` |
| `MetricCard` | `label: string` · `value: string` · `delta?: {direction, text, positive}` |
| `Badge` | `variant?: outline\|solid\|subtle\|bracket` · `size?: sm\|md` |
| `StatusPill` | `status: string` · `map?: Record<string,StatusDef>` · `size?: sm\|md` |
| `Input` | `error?: boolean` — todos props nativos do `<input>` |
| `Label` | wrapper de `<label>` com mono uppercase 11px |
| `FormField` | `label?` · `error?` · `children` · `htmlFor?` |
| `Skeleton` | `className` para dimensões |

### Layout

| Componente | API resumida |
|-----------|-------------|
| `Container` | `size?: narrow\|default\|wide` · `as?: ElementType` |
| `Eyebrow` | `prefix?: '//'\|'[]'\|'none'` · `as?: ElementType` |
| `SectionHeader` | `eyebrow?` · `title` · `description?` · `align?: left\|center` |

### Blocos compostos

| Componente | API resumida |
|-----------|-------------|
| `Nav` | `links?: NavLink[]` · `logoText?` · `ctaHref?` · `ctaLabel?` |
| `Hero` | `eyebrow?` · `title` · `subtitle?` · `primaryCta?` · `secondaryCta?` · `variant?: asymmetric\|centered\|split` |
| `PricingCard` | `plan: PricingPlan` (id, label, monthlyPrice, features, popular...) |
| `FaqAccordion` | `items: FaqItem[]` · `singleOpen?` · `variant?: static\|animated` |
| `Footer` | `columns?: FooterColumn[]` · `tagline?` · `copyright?` · `social?` |
| `DashboardTable` | `columns: Column<T>[]` · `rows: T[]` · `onRowClick?` · `dense?` |

### Shell (use client)

| Componente | API resumida |
|-----------|-------------|
| `AppShell` | `nav?: NavItem[]` · `org?` · `topbarTitle?` · `topbarRight?` · `signOutAction?` |
| `Modal` | `open` · `onClose` · `title?` · `size?: sm\|md\|lg` · `footer?` |

## Regras de design (não-negociáveis)

- B&W absoluto — nunca hex hardcoded nos componentes, sempre `var(--*)`
- Preto mínimo `#0A0A0A` — nunca `#000` puro
- Headlines fora da dead-zone 32-48px (tokens `--text-display`, `--text-h1`, `--text-h2`, `--text-h3`)
- Container fluido — `--container-*` vars, nunca `max-w-7xl`
- A11y: `focus-visible` com `--ring`, `aria-*` onde aplicável, target ≥ 44px
- `prefers-reduced-motion` respeitado via `@sinapse/brand-tokens/motion`

## Server vs Client

Componentes são server-friendly por padrão. Marcados `"use client"` apenas quando necessário:

| Componente | Motivo |
|-----------|--------|
| `Nav` | IntersectionObserver + scroll listener |
| `FaqAccordion` (variant=animated) | Estado de abertura |
| `AppShell` | localStorage (sidebar collapse) |
| `Modal` | Estado open/close + foco |

## STATUS_MAP customizado

```tsx
import { StatusPill, STATUS_MAP } from "@sinapse/brand-ui";

const meuMap = {
  ...STATUS_MAP,
  publicado: { label: "Publicado", intensity: "ok" as const },
  rascunho:  { label: "Rascunho",  intensity: "neutral" as const },
};

<StatusPill status="publicado" map={meuMap} />
```
