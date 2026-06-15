# starter-saas-app

Boilerplate de dashboard autenticado SINAPSE — tema vanta (dark-first), tokens B&W, AppShell com sidebar colapsável + topbar + Cmd+K.

## Setup

```bash
# instalar dependências
pnpm install   # ou npm install

# desenvolvimento
pnpm dev       # abre em http://localhost:3000

# build
pnpm build

# typecheck
pnpm typecheck
```

## Estrutura

```
app/
  tokens/          # Cópia local dos brand-tokens (self-contained)
  layout.tsx       # html[data-theme="vanta"] + Sora/Inter/JetBrains
  globals.css      # @import ./tokens/index.css
  (app)/           # rotas autenticadas com AppShell
    layout.tsx     # Sidebar + Topbar
    page.tsx       # Dashboard com MetricCards + StatusPills
  (auth)/          # rotas de autenticação
    login/page.tsx

components/
  shell/           # AppShell, Sidebar, Topbar, CommandMenu (Cmd+K)
  brand/           # Button, Card, MetricCard, StatusPill, Skeleton, EmptyState
  theme-provider   # toggle vanta/bone persistido em localStorage

lib/
  cn.ts            # clsx + tailwind-merge
  nav.ts           # itens de navegação
  status-map.ts    # mapa único de status (B&W por intensidade)
```

## Tokens de design

Os tokens ficam em `app/tokens/` (cópia self-contained do `@sinapse/brand-tokens`).

Em monorepo com o pacote publicado, substitua por:
```css
/* app/globals.css */
@import "@sinapse/brand-tokens";
```

## Tema

```html
<!-- dark (padrão) -->
<html data-theme="vanta">

<!-- light -->
<html data-theme="bone">
```

O `ThemeProvider` persiste a escolha em `localStorage` e aplica via `data-theme` no `<html>`.

## Regras de design (não-negociáveis)

- B&W absoluto — sem accent cromático (rule 01)
- Preto mínimo `#0A0A0A`, nunca `#000` puro (rule 02)
- Grain SVG 5% ativo via `identity.css` (rule 03)
- Headlines fora da dead-zone 32-48px (rule 05)
- Container fluido via `--container-*` tokens (sem `max-w-7xl`)
- `prefers-reduced-motion` honrado (rule 08)
