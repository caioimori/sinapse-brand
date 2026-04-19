---
project: sinapse-source-of-truth
status: draft — awaiting validation
version: 0.1
date: 2026-04-18
owners: Caio Imori, Matheus Soier
model-reference: aiox squad (brand.aioxsquad.ai) — modelo estrutural, não visual
philosophy: Vignelli + Rams + Aesop + Geist — restrição radical B&W
---

# PRD — SINAPSE Source-of-Truth

## 1. Visão

Fonte-da-verdade única, viva e navegável da marca SINAPSE — brandbook estratégico + design system executável + showcase editorial — hospedada em domínio dedicado, modelada na arquitetura aiox squad, com identidade visual radicalmente B&W e princípios de restrição nível Vignelli/Rams.

## 2. Problema

Hoje a SINAPSE cria muito conteúdo visual sem base unificada: tipografia não conversa com logo, zero iconografia autoral, sem paleta formal, sem sistema de animação, sem templates de proposta/apresentação/contrato/imagem-IA. Cada entrega reinventa a roda e corre risco de incongruência. Sem fonte-da-verdade, escala é impossível e qualidade vira sorte.

## 3. Meta

Entregar uma infraestrutura de marca que permita **criar qualquer interface visual SINAPSE em <30min** com coerência absoluta — website, landing, apresentação, proposta, post, carrossel, SaaS, imagem IA — sem decisão ad-hoc.

## 4. Pilares (o que a source-of-truth cobre)

| # | Pilar | Deliverables |
|---|---|---|
| 1 | **Brandbook estratégico** | Manifesto, propósito, valores, arquétipo ponderado, posicionamento, contraste, jornada, contrato, truelines |
| 2 | **Identidade verbal** | Naming, vocabulário allow/block, tom quadri-axial, voice DNA cascade (brand → squad → agente) |
| 3 | **Identidade visual core** | Logotipo (variações + clear space + usos), iconografia autoral, patterns, moodboard |
| 4 | **Design tokens (DTCG)** | Typography, color (B&W radical + 1 funcional), spacing 14-step, surfaces, motion, semantic (shadcn mappings) |
| 5 | **Component library** | shadcn/ui + Radix, copy-paste, 18 componentes P0+P1 |
| 6 | **Motion system** | Vocabulary nomeado (hero-shader-noise, cursor-blend, img-displacement-hover...) + helpers (`<Grain>`, `<Magnetic>`, `<ShaderCanvas>`, `<CursorProvider>`, `<SplitReveal>`) |
| 7 | **Templates web** | Landing hero/feature/cta, SaaS dashboard shell, forum, docs |
| 8 | **Templates apresentação** | Proposta comercial 9-slides (Hormozi Grand Slam), deck genérico, pitch |
| 9 | **Templates contrato** | Layout Contractbook-style B&W + typography hierarchy + assinatura digital |
| 10 | **Copy/Criativos** | TOFU/MOFU/BOFU mapeado × formato (ad, orgânico, carrossel, reel). CRAFT roteiro. 13 hook patterns. |
| 11 | **Imagem IA padronizada** | Prompt template Higgsfield/Midjourney B&W consistente + regras de marca |
| 12 | **Posts/carrossel Instagram** | Grid templates, tipografia em post, anti "cara de IA" |
| 13 | **Showcase editorial** | Prova de uso real do sistema — vive junto como pilar |
| 14 | **Governance** | RFC 1-pager + SemVer + tzar decisor (Caio) + changelog automático |

## 5. Não-escopo (v1)

- Multi-marca (só SINAPSE; Colégio Módulo e @caioimori ficam em repos próprios)
- Impressão/signage (deixa pra quando abrir loja física)
- Mobile-native (web-first)

## 6. Princípios Non-Negotiable

Ver `docs/research/00-consolidated-insights.md §3`. Resumo:
1. B&W radical — 13 steps gray + 1 cor funcional (error) — ZERO brand accent cromático
2. Grain SVG sempre ativo (4-8% opacity)
3. Mix-blend-mode difference no cursor
4. Tamanhos extremos tipográficos (14px ou 180px)
5. Assimetria obrigatória
6. Motion reversível + prefers-reduced-motion honor
7. Preto absoluto proibido (`#0A0A0A` mín)
8. 2 pesos tipográficos máx por tela
9. Loading = hero (preloader como show)
10. Vignelli doctrine: menos componentes, mais lei

## 7. Arquitetura Modelo (aiox, 3 pilares)

```
brand.sinapse.{dominio}/
├── brandbook/       (por quê / quem)
├── design-system/   (como / o quê)
└── showcase/        (prova de uso)
```

Numeração decimal hierárquica (0.0, 1.0...) cita-bilidade estilo spec técnico. Detalhes em `docs/ARCHITECTURE.md`.

## 8. Stack Técnico

| Camada | Escolha |
|---|---|
| Site | Next.js 15 + React 19 + TS (App Router) |
| Styling | Tailwind + CSS vars |
| Components | shadcn/ui + Radix Primitives |
| Tokens | W3C DTCG JSON + Style Dictionary → CSS/TS/Tailwind/Figma |
| Docs | MDX + Velite ou Contentlayer |
| Fonts | self-host (Geist Sans + Geist Mono OU par TBD — decisão FASE 1) |
| Motion | Framer Motion + GSAP ScrollTrigger + Lenis + three.js + R3F + drei |
| Dark/Light | `next-themes` + tokens semânticos |
| Hosting | Vercel (Soier tem conta) |
| Versionamento | changesets + SemVer |

## 9. Critérios de Sucesso

- Tempo pra criar uma landing SINAPSE coerente: <2h (hoje: 2+ dias)
- Tempo pra proposta comercial: <30min (hoje: 3-5h)
- Tempo pra gerar imagem IA on-brand: <5min (hoje: tentativa-e-erro)
- 100% das interfaces visuais SINAPSE consumindo tokens do sistema
- Acessibilidade AA em todos componentes (validação CI)
- Changelog público + SemVer rigoroso

## 10. Roadmap

Detalhado em `docs/ROADMAP.md` — modular, cada fase entregável e usável antes da próxima começar.

## 11. Riscos

| Risco | Mitigação |
|---|---|
| Escopo gigante vira "saiu cagado" | Modularização estrita — 1 fase validada antes da próxima |
| Inconsistência logo ↔ tipografia | Fase 1 resolve primeiro (crítico) |
| Over-engineering de tokens | DTCG 2 tiers (skip component tier) |
| Motion sobreengenheirado mata perf | Performance budget: LCP<2s, 1 WebGL/viewport, reduced-motion honor |
| Decisão em loop | Caio = tzar único, Soier review async |
| Drift visual em IA | Prompt template fixo + negative prompts rigorosos |