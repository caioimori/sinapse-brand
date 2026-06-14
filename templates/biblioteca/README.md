# Biblioteca de Componentes Compartilhados — SINAPSE UI

Fonte da verdade dos componentes recorrentes nos 28 repos auditados. Cada ficha traz **propósito, props/API, variantes, snippet React+Tailwind de referência (extraído do código real)** e **em quais repos já aparece**.

A regra que governa tudo: **tokens semânticos em CSS vars + bridge Tailwind v4 `@theme`, B&W por intensidade, tipografia 100% `clamp()` que pula a dead-zone 32-48px, container fluido (nunca `max-w-7xl`), identity layer sempre ativo, motion nomeado + `prefers-reduced-motion`.**

---

## Índice (ordenado por recorrência / prioridade de extração)

| # | Componente | Ficha | Aparece em (repos) | Prioridade |
|---|-----------|-------|--------------------|-----------|
| 00 | **tokens** (bone/vanta B&W) | [`tokens.md`](./tokens.md) | brand, crm, club, guias, todos | P0 — coração da lib |
| 01 | **motion-pack** (easings/durations/keyframes) | [`motion-pack.md`](./motion-pack.md) | crm, brand, club, apse-os, modulo | P0 |
| 02 | **identity-layer** (grain/crosshair/frame/patterns) | [`identity-layer.md`](./identity-layer.md) | brand, crm, carrosseis, guias, modulo | P0 |
| 03 | **Button** (cva variants × sizes) | [`button.md`](./button.md) | crm, club, modulo, central, soier-spaces, vascularte | P0 — 6+ repos |
| 04 | **Card + MetricCard** | [`card.md`](./card.md) | crm, club, central, soier-spaces, apse-os | P0 — 5+ repos |
| 05 | **AppShell** (Sidebar + Topbar + Cmd+K) | [`app-shell.md`](./app-shell.md) | crm, astro-saas, central, soier-spaces, sp3 | P0 |
| 06 | **SectionHeader + Eyebrow + Container** | [`section-header.md`](./section-header.md) | brand, vascularte, smart-plastica, modulo, snps | P1 — extrair 1º |
| 07 | **Nav** (scroll-spy + backdrop-blur) | [`nav.md`](./nav.md) | club, lp-mindloop, modulo, vascularte, snps | P1 |
| 08 | **Hero** (assimétrico, headline display) | [`hero.md`](./hero.md) | crm, club, brand, lp-mindloop, modulo | P1 |
| 09 | **Pricing card** (popular invertido) | [`pricing-card.md`](./pricing-card.md) | club, lp-mindloop, snps, proposta-igor, vascularte-apre | P1 |
| 10 | **StatusPill** (data-driven por token map) | [`status-pill.md`](./status-pill.md) | apse-os, soier-spaces, central, orquestrador, sayuri | P1 — mata 131 cores hardcoded |
| 11 | **FAQ accordion** (zero-JS `<details>`) | [`faq-accordion.md`](./faq-accordion.md) | proposta-igor, smart-plastica, snps, sayuri, modulo | P1 |
| 12 | **Input + Label + Form field** | [`input.md`](./input.md) | crm, club, modulo, vascularte, sayuri | P2 |
| 13 | **Modal / Dialog** (com overlay tokenizado) | [`modal.md`](./modal.md) | club, soier-spaces, central, sayuri | P2 |
| 14 | **DashboardTable** (densa, tabular-nums) | [`dashboard-table.md`](./dashboard-table.md) | crm, central, soier-spaces, apse-os | P2 |
| 15 | **Badge** (eyebrow pill mono) | [`badge.md`](./badge.md) | crm, club, modulo, snps, guias | P2 |
| 16 | **Footer** (mono, frame de bordas) | [`footer.md`](./footer.md) | club, brand, modulo, snps, vascularte | P2 |
| 17 | **Guide chassi** (single-file B&W) | [`guide-chassi.md`](./guide-chassi.md) | claude-code-push-guide, sinapse-setup-guide, caioimori-pages | P2 |

> Total: **18 fichas**. O grupo P0 (00-05) é a espinha dorsal: tokens → motion → identity → button → card → shell. Os demais dependem desses três primeiros.

---

## Estratégia de distribuição: copy-paste vs pacote

A biblioteca tem **dois regimes**, divididos pela natureza do componente. Não existe "uma resposta" — cada camada distribui de um jeito.

### Camada 1 — Fundação (tokens + motion + identity): **PACOTE NPM** `@sinapse/tokens`

Os 3 arquivos da fundação (00, 01, 02) **devem virar um pacote versionado**, porque:

- São CSS puro (zero runtime, zero React) — funcionam em Next, Astro, Vite e HTML single-file.
- São consumidos por **100% dos projetos** — atualização central propaga pra todos.
- Hoje vivem duplicados/divergentes em N globals.css (a auditoria achou keyframes/easings duplicados CSS×Tailwind, `#000` puro, tokens fantasma). Um pacote único elimina o drift.

Distribuição:
```
@sinapse/tokens
├── tokens.css      ← grayscale 13-step + semânticos bone/vanta por data-theme + funcionais isolados
├── motion.css      ← easings + durations + keyframes + prefers-reduced-motion
├── identity.css    ← grain SVG + crosshair + frame + patterns + textures
└── theme.css       ← bridge @theme Tailwind v4 (só referencia, nunca redefine valor)
```
Uso: `@import '@sinapse/tokens/tokens.css';` no globals.css do projeto. Tema = trocar `data-theme="bone|vanta"`.

### Camada 2 — Primitivos React (Button, Card, Input, Badge, Modal, StatusPill, Container, Eyebrow): **PACOTE NPM** `@sinapse/ui`

Componentes React acoplados aos tokens da camada 1. Viram um segundo pacote porque:

- A maioria já é `cva`/`forwardRef` — API estável, baixo churn.
- Consumidos pelos arquétipos **SaaS app** e **LP/site** (10+ repos).
- Garante que todo Button tenha o mesmo `active:scale-[0.98]`, focus-ring acessível e variant `cta`/`hero` (hoje copiada como string 6×).

Distribuição: `npm i @sinapse/ui` → `import { Button, Card, StatusPill } from '@sinapse/ui'`. Depende de `@sinapse/tokens` como peer.

### Camada 3 — Blocos compostos (AppShell, Nav, Hero, Pricing, LP suite, FAQ, DashboardTable, Footer): **COPY-PASTE via starter / registry**

Blocos de página **não viram pacote** — viram **starters scaffoldáveis** (estilo shadcn registry). Porque:

- Cada projeto customiza copy, layout e dados — um componente "fechado" engessaria.
- Devem ser **owned pelo projeto** (editáveis), não dependência externa.
- Já existem como `starter-saas-app`, `starter-landing`, `starter-guide` no blueprint.

Distribuição: o time roda o scaffold do arquétipo (ex.: starter-landing) que **traz os blocos como código no repo**, consumindo `@sinapse/ui` + `@sinapse/tokens`. O dev edita à vontade. Atualização de bloco = re-scaffold opcional, nunca forçado.

### Camada 4 — Guias / single-file (Guide chassi): **TEMPLATE HTML standalone**

O arquétipo guia (17) não usa React nem build. Distribui como **1 arquivo HTML template** com os tokens inline (herdados de `@sinapse/tokens` colados no `:root`). Copy-paste puro, deploy GitHub Pages.

---

## Tabela-resumo da distribuição

| Camada | O quê | Como distribui | Mutabilidade |
|--------|-------|----------------|--------------|
| 1 — Fundação | tokens, motion, identity | **Pacote** `@sinapse/tokens` (CSS) | Imutável no consumidor; só atualiza versão |
| 2 — Primitivos | Button, Card, Input, Badge, Modal, StatusPill, Container, Eyebrow | **Pacote** `@sinapse/ui` (React) | Imutável; customiza via props/className |
| 3 — Blocos | AppShell, Nav, Hero, Pricing, LP suite, FAQ, Table, Footer | **Copy-paste** via starter/registry | Owned pelo projeto, editável |
| 4 — Guias | Guide chassi single-file | **Template HTML** standalone | Owned, editável |

**Regra de ouro:** o que é **invariante de marca** (cor, motion, identidade, comportamento de primitivo) vira **pacote** — atualiza no centro, propaga sem refactor. O que é **conteúdo/layout específico do projeto** vira **copy-paste** — o time é dono e edita. Nunca o contrário (não copy-paste de token; não pacote fechado de hero).

---

## Como ler cada ficha

Cada `<componente>.md` segue a estrutura:
1. **Propósito** — o que resolve e por que existe
2. **Props / API** — assinatura tipada
3. **Variantes** — opções e quando usar cada
4. **Snippet de referência** — código real extraído/consolidado dos repos
5. **Aparece em** — repos onde o padrão já existe
6. **Dívidas a corrigir antes de promover** — quando aplicável (dead-zone, hardcode, drift)
