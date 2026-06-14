# DESIGN.md — SaaS App autenticado (shell + dashboard)

> Reference: `caio__sinapse-crm`. Default **vanta** (dark-first, "vanta edition").
> Repos: `caio__sinapse-crm`, `caio__sinapse-club`, `caio__astro-saas-dev`, `caio__apse-os`, `soier__central-plastica`, `soier__soier-spaces`, `soier__orquestrador-sp3`.
> Herda os tokens canonicos SINAPSE (B&W), **invertidos pra dark-first.**

## O que define este arquetipo

`AppShell` = Sidebar colapsavel (240-248px) + Topbar (56px) + main scrollavel + Cmd+K. Tokens semanticos em `globals.css` (CSS-first `@theme` Tailwind v4) com dark mode por inversao. Bloco de dashboard: KPI/MetricCard (eyebrow mono + valor tabular-nums + delta) + grafico (Sparkline/Recharts temado por var). Estados de primeira classe: empty-state opinativo + skeleton (nunca spinner) + status pill.

## Cor — vanta default, B&W por intensidade

Mesma fundacao SINAPSE, tema dark como padrao:
- background `#0A0A0A`, card `#141414`, surface-2 `#1A1A1A`, surface-3 `#1F1F1F`, foreground `#F5F5F0`.
- **`--muted` (ex `--color-muted-foreground`) DEFINIDO** como `rgba(245,245,240,0.55)`. No CRM original esse token era referenciado mas nunca definido (renderizava invalido) — corrigido aqui.
- **Status em B&W por intensidade:** ok/warn/critical sao a mesma off-white, separados por opacity/peso. Diferenca up/down em data-viz vem de peso + glyph (seta), nao de hue. `destructive`/`success` ficam isolados, nunca decorativos.
- Toda cor de status vive num `<StatusPill>` data-driven por token map. Zero hex hardcoded furando a camada semantica.

### Rationale
Dashboard pede leitura rapida em ambiente escuro; vanta-first reduz fadiga e da contraste alto com off-white quente. B&W por opacity mantem a data-viz coerente sem inventar paleta. Bone permanece disponivel via `data-theme` — e o mesmo token-set.

## Tipografia — CORRIGIDA pra fora da dead-zone

A divida recorrente do arquetipo: KPI value e page-title caindo em 32-48px. Aqui:

| Papel | Tamanho | Nota |
|---|---|---|
| KPI value | `clamp(3rem, 4vw, 3.75rem)` = 48-60px | tabular-nums. Era 32-44px (dead-zone) |
| Page title | `clamp(3rem, 5vw, 4rem)` = 48-64px | empty/funnel H1 corrigidos |
| Hero | `clamp(3.75rem, 11vw, 11rem)` = 60-176px | unico que ja respeitava |
| Eyebrow | 11px mono, tracking `0.22em`, uppercase | // prefix |
| Body | 13-15px Inter | |

`tabular-nums` obrigatorio em KPI, tabelas e valores monetarios.

## Shell e layout

- **Sidebar:** 248px, colapsa pra 64px. Estado persistido (`useSyncExternalStore` + localStorage). Nav role-based, active via pathname. Mobile via Sheet.
- **Topbar:** 56px sticky com breadcrumb + Cmd+K + signout.
- **Container:** `min(92vw, 1680px)` (max-w-screen-2xl). Substitui os `max-w-[1680px]`/`max-w-[1280px]` espalhados nas views.

## Radius — cap 12px

sm 6 / md 8 (inputs) / lg 10 (buttons) / **xl 12 (cards dashboard — HARD-CAP)** / badge pill. Radius >12px em card de dashboard e anti-pattern (apse-os).

## Motion

Easings `smooth`/`apple`/`swift`, durations fast 150 / base 250 / slow 400. Keyframes: reveal escalonado, statusPulse (status-dot), link-reveal underline, `active:scale(0.98)`. `prefers-reduced-motion` honrado.

## Identity layer
Grain SVG ~6% sempre ativo + pattern-grid sutil no shell. Resolve "nunca fundo liso, min 2 camadas".

## Dividas recorrentes a evitar (do blueprint)
- Headline na dead-zone 32-48px — **corrigido nesta escala.**
- Token fantasma (`--color-muted-foreground`) — **definido.**
- Dark mode morto (sem ThemeProvider) — **montar o ThemeProvider** ou remover o bloco dark.
- Cor de status hardcoded furando a camada semantica — usar StatusPill data-driven.
- Icones glyph unicode (`◇◎◫`) — adotar lucide como sistema unico.

## Como reusar
`globals.css` inteiro = starter de DS dark-first. AppShell + Sidebar + Topbar + Cmd+K copiavel direto. MetricCard + Sparkline + DashboardEmptyView = bloco "dashboard analitico". Multi-brand por `[data-brand]` (de central-plastica) pra servir N clientes.
