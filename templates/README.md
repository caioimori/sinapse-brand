# Templates de Interface SINAPSE — Biblioteca anti-retrabalho

> Biblioteca forense derivada da análise de **28 repositórios reais** de interface das contas
> `caioimori` e `Matheus-soier` (dashboards, sites, landing pages, e-commerce, propostas, guias).
> Objetivo: nunca mais começar uma interface do zero nem repetir as dívidas que já cometemos.
>
> Cada regra, token e componente aqui é **rastreável a um repo real** — não é teoria, é o que
> funcionou e o que falhou no nosso próprio código.

## Como esta biblioteca está organizada

| Pasta | O que é | Quando abrir |
|---|---|---|
| **[`boas-praticas-interfaces.md`](./boas-praticas-interfaces.md)** | Documento-mestre: o que SEMPRE fazer e o que NUNCA repetir, por arquétipo, com checklist pré-entrega | Antes de construir qualquer interface |
| **[`starters/`](./starters/README.md)** | 8 starter kits scaffoldáveis (Next 16 + React 19 + Tailwind v4) — a casca pronta com as dívidas já corrigidas | Ao iniciar um projeto novo |
| **[`catalogo/`](./catalogo/README.md)** | `tokens.json` (DTCG) + `DESIGN.md` por arquétipo — a fonte da verdade de cor, tipo, spacing, motion | Ao definir o visual de um projeto |
| **[`biblioteca/`](./biblioteca/README.md)** | 18 componentes compartilhados (AppShell, Button, Card, Hero, StatusPill, etc) com API + snippet de referência | Ao montar telas |

## Os 8 arquétipos mapeados

1. **Design System / Brandbook** — fonte da verdade (ref: `sinapse-brand`)
2. **SaaS App autenticado** — shell + dashboard, vanta-first (ref: `sinapse-crm`)
3. **Landing Page / Site institucional** — bone-first (ref: `colegio-modulo`)
4. **Guia / Documentação single-file** — B&W, zero build (ref: `sinapse-setup-guide`)
5. **Proposta / Deck interativo** — swap por `data-brand` (ref: `riana-roma-proposal`)
6. **E-commerce** — storefront + admin (ref: `sayuri-store`)
7. **Link-bio mobile** — dark + tracking (ref: `eusoier-link-bio`)
8. **Canvas / Diagrama interativo** — fluxo/funil (ref: `central-plastica`, `modulo-fluxo-2027`)

## Princípio central: 1 coração de tokens, N marcas

Todos os arquétipos consomem o **mesmo token-set B&W bone/vanta** do brandbook SINAPSE.
Clientes (Módulo magenta, Vascularte petróleo, Mindloop cobalt) entram como **arquétipos
separados** via `[data-brand]` reescrevendo só as CSS vars de marca — 1 codebase, N clientes,
zero fork. Nunca contaminar o DS SINAPSE com accent de cliente.

## As 11 dívidas que os starters já corrigem de fábrica

Dead-zone tipográfica 32-48px · `#000` puro como superfície · cor de status hardcoded ·
`max-w-7xl` travado · CTA copiado N vezes · token fantasma órfão · dark mode declarado mas morto ·
2 engines de reveal · keyframes duplicados CSS×Tailwind · conteúdo hardcoded no markup ·
clone de identidade de terceiro.

---

*Gerado pela orquestração UI Forensics — 28 repos, análise paralela, síntese e materialização.
Fonte bruta da análise: `Workspace/sinapse/_ui-forensics/`.*
