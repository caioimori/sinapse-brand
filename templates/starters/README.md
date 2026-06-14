# Starter Kits SINAPSE — Índice

> 8 starters scaffoldáveis derivados da forense de 35 repos (UI Forensics). Cada um é uma casca pronta, com as dívidas recorrentes já corrigidas por construção. Todos consomem o mesmo coração de tokens.
>
> **Stack dominante:** Next 16 + React 19 + Tailwind v4 (CSS-first `@theme`, sem `tailwind.config`). Exceções single-file (guia/proposta/canvas variante A) documentadas em cada ficha.

---

## Mapa rápido — qual usar

| Starter | Quando usar | `data-theme` default | Stack |
|---|---|---|---|
| **[starter-tokens](./starter-tokens.md)** | SEMPRE — é a dependência de todos os outros. Pacote de tokens B&W bone/vanta + motion + identity layer | — (define ambos) | CSS vars + Tailwind v4 `@theme` |
| **[starter-saas-app](./starter-saas-app.md)** | App autenticado com shell + dashboard (CRM, painel, admin interno) | vanta (dark) | Next 16 + React 19 + Tailwind v4 + Supabase |
| **[starter-landing](./starter-landing.md)** | LP de venda ou site institucional (hero→pricing→faq→cta) | bone (light) | Next 16 + Tailwind v4 + framer-motion |
| **[starter-guide](./starter-guide.md)** | Guia/documentação single-file deployável em GitHub Pages | vanta (B&W) | HTML estático, zero build |
| **[starter-proposal](./starter-proposal.md)** | Deck/proposta interativa de cliente | swap por `data-brand` | Next + reveal.js (OU single-file vanilla) |
| **[starter-ecommerce](./starter-ecommerce.md)** | Loja completa (storefront + admin) | bone/neutro | Next 16 + Supabase (OU Hydrogen) |
| **[starter-linkbio](./starter-linkbio.md)** | Link-bio mobile de creator + tracking de ads | vanta | Next 16 + Tailwind v4 |
| **[starter-canvas](./starter-canvas.md)** | Diagrama/fluxo interativo (funil, arquitetura, kanban-mapa) | vanta | React Flow + dagre (OU vanilla) |

---

## Árvore de decisão

```
O entregável é...
├── um pacote de design tokens?              → starter-tokens (sempre primeiro)
├── um app que loga e mostra dados?          → starter-saas-app (vanta-first)
├── uma página de venda / institucional?     → starter-landing (bone-first)
├── uma loja com carrinho?                    → starter-ecommerce
├── uma proposta/deck pra fechar cliente?    → starter-proposal
├── um link na bio (mobile, 1 coluna)?       → starter-linkbio
├── um fluxograma/mapa interativo?           → starter-canvas
└── um guia/tutorial pra mandar por DM?      → starter-guide (single-file)
```

---

## Dependência comum (não-negociável)

Todos os starters de app (saas, landing, ecommerce, linkbio, proposal-A, canvas-B) consomem **`@sinapse/brand-tokens`** (starter-tokens):

```css
/* app/globals.css de qualquer starter */
@import "@sinapse/brand-tokens";
```
```html
<html data-theme="vanta">   <!-- ou "bone" conforme arquétipo -->
```

Os single-file (guia, proposta-B, canvas-A) **herdam os mesmos valores** inline no `:root`, mantendo congruência visual sem build.

---

## Default de tema por arquétipo (resolve a divergência bone vs vanta)

A forense achou os dois regimes no mesmo token-set invertido. Regra fechada:

| Arquétipo | Default |
|---|---|
| Guia · LP · brandbook · proposta clara | **bone** (light-first) |
| SaaS app · dashboard · linkbio · canvas | **vanta** (dark-first) |

Ambos são o MESMO token-set — trocar `data-theme` inverte sem refactor.

---

## Dívidas que TODO starter já corrige (por construção)

Estes anti-patterns recorrentes da forense estão eliminados de fábrica em cada kit:

1. **Dead-zone 32-48px** — escala fluida que PULA a faixa (h2 salta direto pra h1). Nenhuma headline cai em 32-48px.
2. **`#000` puro** — preto mínimo `#0A0A0A` no token de fundo. `void #000` banido como superfície.
3. **Cor de status hardcoded** — UM `<StatusPill>` data-driven por token map único (não 131 `bg-slate/blue` espalhados).
4. **`max-w-7xl` travado** — Container com 3 variants fluidos (`narrow`/`default`/`wide=screen-2xl`).
5. **CTA copiado 6x** — variant `cta` no `buttonVariants`, não string longa em cada bloco.
6. **Token fantasma** — `@theme` só referencia `var()` definidas; nada de `--color-muted-foreground` órfão.
7. **Dark mode morto** — ou monta o ThemeProvider de verdade, ou não declara o bloco. Sem código pago sem retorno.
8. **2 engines de reveal** — UM mecanismo (`data-reveal` + IntersectionObserver).
9. **Keyframes/easings duplicados CSS x Tailwind** — vivem em UM `motion.css`, Tailwind só referencia.
10. **Conteúdo hardcoded no markup** — data layer tipado (`content.ts`/`config.ts`); re-skin e i18n triviais.
11. **Clone de identidade de terceiro** — descartado (ecommerce): neutro premium default, cliente constrói a própria marca via `[data-brand]`.

---

## Multi-brand (mecanismo oficial)

Tematização por cliente via `[data-brand]` reescrevendo CSS vars (padrão de `central-plastica`): 1 codebase, N clientes, zero fork. Aplicável em saas-app, ecommerce, proposal e canvas.

```css
[data-brand="cliente-x"] { --foreground: #...; /* só os tokens de marca */ }
```

---

## Ordem de adoção recomendada

1. Scaffold **starter-tokens** como pacote de workspace (`packages/brand-tokens`).
2. Scaffold o starter do arquétipo-alvo, apontando para o pacote de tokens.
3. Setar `data-theme` conforme a tabela acima.
4. Preencher o data layer (`content.ts` / `config.ts` / `diagram.ts`).
5. Rodar o checklist de validação da ficha (gate B&W / dead-zone / fluido / motion).

---

## Conformidade com o brandbook (rules citadas)

Cada starter cita as regras SINAPSE que respeita: rule 01 (B&W absoluto), 02 (`#0A0A0A` mínimo), 03/11 (identity layer grain/crosshair/frame), 04 (Sora·Inter·JetBrains, max 2 pesos), 05 (sem dead-zone), 06 (assimetria), 08 (`prefers-reduced-motion`), 09 (semantic sobre primitive), 10 (menos componente, mais lei), 12 (se parece template genérico, refaz).
