---
status: draft
version: 0.1
date: 2026-04-18
---

# Arquitetura — SINAPSE Source-of-Truth

Modelada em aiox squad (brand.aioxsquad.ai). Três pilares navegáveis com numeração decimal.

## 1. Estrutura de Alto Nível

```
source-of-truth/
├── apps/
│   └── brand/                      # Next.js site navegável (brand.sinapse.X)
│       ├── app/
│       │   ├── brandbook/[...slug]/
│       │   ├── design-system/[...slug]/
│       │   └── showcase/[...slug]/
│       └── components/
├── packages/
│   ├── tokens/                     # W3C DTCG JSON source
│   │   ├── primitives/
│   │   │   ├── color.json          # gray-0..12 (B&W radical)
│   │   │   ├── typography.json
│   │   │   ├── spacing.json        # 14-step
│   │   │   ├── motion.json
│   │   │   ├── radius.json
│   │   │   └── surfaces.json
│   │   ├── semantic/
│   │   │   ├── light.json
│   │   │   ├── dark.json
│   │   │   └── shared.json
│   │   └── build/                  # Style Dictionary outputs (CSS/TS/Tailwind)
│   ├── ui/                         # shadcn/ui + Radix primitives + SINAPSE overrides
│   ├── motion/                     # helpers: Grain, Magnetic, ShaderCanvas, CursorProvider, SplitReveal
│   ├── icons/                      # iconografia autoral
│   ├── patterns/                   # patterns visuais (SVG, shaders)
│   ├── shaders/                    # glsl + lygia snippets
│   └── templates/                  # landing, proposta, deck, contrato, post
├── content/                        # MDX — o conteúdo documental
│   ├── brandbook/
│   │   ├── 0.0-guidelines.mdx
│   │   ├── 1.0-movimento.mdx       # manifesto · propósito · valores · arquétipo · posicionamento · contraste · jornada · contrato · truelines
│   │   ├── 2.0-foundations.mdx     # ponte com design-system
│   │   ├── 3.0-logo.mdx
│   │   ├── 4.0-icons.mdx
│   │   ├── 5.0-moodboard.mdx
│   │   └── 6.0-estrategia.mdx
│   ├── design-system/
│   │   ├── 0.0-components.mdx
│   │   ├── 1.0-buttons.mdx
│   │   ├── 2.0-cards.mdx
│   │   ├── 3.0-forms.mdx
│   │   ├── 4.0-feedback.mdx
│   │   ├── 5.0-states.mdx
│   │   ├── 6.0-tables.mdx
│   │   ├── 7.0-lists.mdx
│   │   ├── 8.0-charts.mdx
│   │   ├── 9.0-sections.mdx
│   │   ├── 10.0-advanced.mdx
│   │   ├── 11.0-effects.mdx
│   │   ├── 12.0-patterns.mdx
│   │   ├── 13.0-templates.mdx      # landing, proposta 9-slides, contrato, deck
│   │   ├── 14.0-motion.mdx         # vocabulary nomeado + helpers
│   │   ├── 15.0-seo.mdx
│   │   └── 16.0-vfx.mdx
│   ├── showcase/
│   │   ├── 0.0-index.mdx
│   │   └── 1.0-editorial.mdx       # cases reais
│   ├── copy/                       # módulo copy (TOFU/MOFU/BOFU)
│   │   ├── 0.0-overview.mdx
│   │   ├── 1.0-funil.mdx           # matriz completa paid × organico × carrossel × reel
│   │   ├── 2.0-frameworks.mdx      # AIDA, PAS, BAB, Hook-Story-Offer, Hormozi, StoryBrand
│   │   ├── 3.0-hooks.mdx           # 13 hook patterns
│   │   ├── 4.0-roteiros.mdx        # CRAFT
│   │   ├── 5.0-proposta.mdx        # 9 slides
│   │   ├── 6.0-contrato.mdx        # princípios visuais
│   │   └── 7.0-metricas.mdx        # Hook Rate, Hold Rate, CTR, ROAS
│   └── ai-imagery/
│       ├── 0.0-overview.mdx
│       ├── 1.0-prompt-template.mdx
│       ├── 2.0-regras-marca.mdx
│       └── 3.0-variacoes.mdx       # hero, retrato, produto, lifestyle
├── docs/                           # este PRD + architecture + roadmap + research
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── ROADMAP.md
│   ├── research/
│   └── rfcs/                       # RFC-0001-title.md ...
└── tooling/
    ├── style-dictionary.config.js
    └── scripts/
```

## 2. Camadas de Token (DTCG, 2 tiers)

```
primitives/    → valores crus (gray-0: #FFFFFF, gray-12: #0A0A0A, space-1: 4px...)
     ↓ alias
semantic/      → intenção (color.text.primary, bg.surface, motion.ease.standard)
     ↓ shadcn mapping
componentes    → consomem semantic (nunca primitives)
```

Build Style Dictionary → `tokens.css` (CSS vars), `tokens.ts` (TS types), `tailwind.preset.js`, `tokens.json` (Figma Tokens Studio).

## 3. Grid de Spacing (14-step)

`0, 1, 2, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128` (px). Base 4px. Componentes usam `space-N`, não valores.

## 4. Camadas de Motion

- **duration**: `instant 0ms · fast 150ms · base 250ms · slow 400ms · deliberate 600ms`
- **easing**: `standard cubic-bezier(0.2,0,0,1) · entrance cubic-bezier(0,0,0,1) · exit cubic-bezier(0.4,0,1,1)`
- **reduced-motion**: todo componente tem fallback sem motion

## 5. Voice DNA Cascade

```
brand/voice-axes.md (4 eixos)
  ↓
squads/{nome}/voice.md (deriva os 4 eixos + sotaque)
  ↓
agents/{nome}/voice.md (final, com exemplos before/after)
```

## 6. Governance

- RFCs em `docs/rfcs/RFC-XXXX-title.md`
- SemVer rigoroso em `packages/*`
- Changesets automatiza changelog
- Caio = tzar decisor, Soier = async reviewer
- PR template com checklist de tokens, a11y, motion, docs

## 7. Distribuição

shadcn-style copy-paste (não pacote npm fechado). Projetos SINAPSE consomem via:
1. `npx sinapse-brand add <component>` (CLI a construir)
2. Tailwind preset importado
3. Tokens CSS importado no root

## 8. CI

- Lint (ESLint + Stylelint + markdownlint)
- Build tokens (Style Dictionary)
- Contrast AA validation (axe-core)
- Visual regression (Chromatic ou Percy — decisão FASE 5)
- Typecheck + tests (Vitest)
