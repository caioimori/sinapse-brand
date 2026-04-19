---
status: draft
version: 0.1
date: 2026-04-18
source: 5/5 benchmarks completos (motion, design-systems, copy, saas, aiox squad)
---

# Insights Consolidados — Benchmark SINAPSE Source-of-Truth

## 1. Princípios Transversais (aparecem em 3+ benchmarks)

| Princípio | Origem | Aplicação SINAPSE |
|---|---|---|
| **Restrição como identidade** | Vignelli, Rams, Aesop, Geist, Linear | B&W radical + 1 tipo + constraints publicados |
| **Tokens em camadas (primitives → semantic)** | Carbon, Primer, Radix, Style Dictionary | 2 tiers (skip component tier pra enxugar) |
| **W3C DTCG + Style Dictionary** | Salesforce, Adobe, Shopify, Atlassian | JSON source → CSS/TS/Tailwind/Figma outputs |
| **Documentação = produto** | Carbon, Polaris, Atlassian | MDX vivos, versionados, especímens reais |
| **Governance minimalista mas formal** | Vignelli (Unimark), Rams (Braun), Primer | RFCs 1-pager + SemVer + 1 tzar decisor |
| **Keyboard-first / cmd+k** | Linear, Raycast, Arc, Superhuman | cmd+k é feature-zero em qualquer SaaS SINAPSE |
| **Hook Loop intencional** | Eyal, Linear, Superhuman | Trigger → Action → Variable Reward → Investment |
| **Accessibility baked-in** | Carbon, Radix, Spectrum | AA baseline, AAA aspiracional, validação CI |

## 2. Decisões Técnicas Consolidadas

| Área | Decisão | Alternativa descartada |
|---|---|---|
| Framework web | Next.js 15 + React 19 + TS | Astro (ok pra sites estáticos só) |
| Styling | Tailwind + CSS vars | styled-components, MUI, Chakra |
| Components | shadcn/ui copy-paste + Radix headless | Pacote npm proprio |
| Tokens format | W3C DTCG JSON | SCSS vars, JS objects |
| Tokens build | Style Dictionary | Theo (deprecated) |
| Tipografia | Geist Sans + Geist Mono (OSS, dev-aesthetic) | Inter puro (neutro demais) |
| Motion | Framer Motion (90%) + GSAP ScrollTrigger + Lenis + three.js/R3F + drei + glsl | Lottie (cores indesejadas) |
| Dark mode | `next-themes` + semantic tokens | Inverter light manualmente |
| Fonts | self-host + variable | CDN Google Fonts |
| Icons | Lucide base + overrides SINAPSE autorais | Material, Feather puro |
| Forms | react-hook-form + zod | Formik, uncontrolled |
| Tables | TanStack Table | ag-Grid |
| Toasts | Sonner | Radix Toast |

## 3. Decisões Visuais Non-Negotiable (B&W Radical)

1. **Preto absoluto proibido** — sempre `#0A0A0A` ou `#111`
2. **Grain SVG turbulence sempre ativo** — opacity 4-8%, overlay global
3. **UMA cor acento por página (ou zero)** — usada em máx 3 pontos
4. **Tipografia carrega o peso** — Inter neutro proibido em hero
5. **Tamanhos extremos** — 14px ou 180px, nada de 32-48px SaaS-médio
6. **Assimetria obrigatória** — zero layout centralizado simétrico
7. **Mix-blend-mode difference no cursor**
8. **Loading = hero** — preloader com counter+scramble vira show
9. **Motion reversível** — entra/sai igual no scroll
10. **prefers-reduced-motion** desliga tudo não-essencial
11. **Paleta: 13 steps gray + 1 funcional (error)** — zero brand accent cromático
12. **2 pesos tipográficos máx por tela**

## 4. Motion Vocabulary (nomes reusáveis)

Squad usa por nome, não por descrição:
- **Hero**: `hero-shader-noise`, `hero-ascii-morph`, `hero-type-mask`, `hero-orbit-3d`
- **Scroll**: `scroll-pin-reveal`, `scroll-horizontal`, `scroll-image-sequence`, `scroll-text-stagger`, `scroll-svg-draw`
- **Cursor**: `cursor-blend`, `cursor-magnetic`, `cursor-trail`, `cursor-label`
- **Image**: `img-displacement-hover`, `img-duotone-mask`, `img-reveal-clip`, `img-grain-overlay`, `img-ascii-filter`
- **Text**: `text-split-stagger`, `text-scramble`, `text-marquee-infinite`, `text-kinetic`
- **Transition**: `transition-curtain`, `transition-mask-wipe`, `transition-flip`

## 5. Copy Framework (TOFU/MOFU/BOFU consolidado)

Funil × Formato × Framework-base:
- **TOFU**: Hook Rate >30%, CPM baixo → PAS/4U/Hook-Story-Offer (só Hook+Story)
- **MOFU**: CTR >1.5%, Hold >50% → BAB/FAB/StoryBrand completo
- **BOFU**: ROAS, CPA → Hormozi Grand Slam (core+bônus+garantia+urgência)

**Estrutura CRAFT de roteiro de criativo**: 0-3s HOOK → 3-10s CONTEXTO → 10-25s MECANISMO → 25-35s PROVA → 35-45s CTA

**13 hook patterns** catalogados (contraintuitivo, callout nicho, erro comum, resultado específico, confissão, revelação, pergunta provocativa, pattern interrupt, antes/depois, comparação, autoridade, urgência, números).

**Proposta comercial SINAPSE** = 9 slides: Capa → Diagnóstico → Problema Real (reframe) → Solução/Método → Prova → Escopo → Oferta (Hormozi) → Garantia → Próximo Passo.

**Prompt template IA (Higgsfield/Midjourney)** B&W consistente: Subject + Action + Environment (minimalist studio) + Lighting (chiaroscuro 45°) + Camera (85mm f/2.8) + Style (editorial mono, Lindbergh, analog grain) + Palette (pure black + off-white + 5% warm grey, zero saturação) + Negative (no color, no neon, no cartoon).

## 6. SaaS Hook Loop Canônico SINAPSE

```
TRIGGER externo: "{squad} terminou task" (email/push/in-app)
  ↓
AÇÃO: cmd+k → comando (1 atalho)
  ↓
REWARD variável: output IA, métrica, logs
  ↓
INVESTMENT: template salvo, integration, workspace, atalho custom
  ↓ (loop)
TRIGGER interno: ansiedade/curiosidade → abre SINAPSE espontaneamente
```

**Onboarding golden path**: aha <60s, primeiro valor <3min. Workspace pré-populado. Zero tour. Empty state que convida.

## 7. aiox squad — Modelo Estrutural a Clonar (não copiar)

**Domínio dedicado** (`brand.aioxsquad.ai`) — brand = produto, não tab. SPA navegável com **numeração decimal** (0.0, 1.0...) que cria autoridade e cita-bilidade.

### Arquitetura de 3 pilares (modelo)

```
brand.sinapse.{dominio}/
├── brandbook/       ← por quê / quem (estratégia + verbal)
├── design-system/   ← como / o quê (execução visual)
└── showcase/        ← prova de uso (editorial)
```

### Brandbook (7 seções decimais)
`0.0 guidelines · 1.0 movimento · 2.0 foundations (ponte) · 3.0 logo · 4.0 icons · 5.0 moodboard · 6.0 estratégia`

Conceitos autorais nomeados (clonar estruturalmente, renomear):
- **Truelines** (tagline system), **BrandScript** (StoryBrand adaptado), **Contraste** (o que NÃO somos), **Contrato da Marca**, **Jornada do Herói**
- **Arquétipo ponderado em %** (ex: Outlaw 50% + Magician 35% + Explorer 15%), não categórico
- **Vocabulário allow-list + block-list** (power words vs banidos)
- **Tom de voz quadri-axial** (Formal↔Informal, Sério↔Divertido, Técnico↔Acessível, Distante↔Próximo)

### Design System (17 seções decimais)
`0.0 components · 1.0 buttons · 2.0 cards · 3.0 forms · 4.0 feedback · 5.0 states · 6.0 tables · 7.0 lists · 8.0 charts · 9.0 sections · 10.0 advanced · 11.0 effects · 12.0 patterns · 13.0 templates · 14.0 motion · 15.0 SEO · 16.0 VFX`

Foundations com 6 categorias: **Typography · Color · Spacing · Surfaces · Motion · Semantic (mapping shadcn)**. Multi-edição de paleta desde dia 1. Glass effects como categoria.

### Voice DNA cascade (chave)
brand → squad → agente — cada nível herda tokens de voz. Replicar direto no SINAPSE-AI.

### Gaps técnicos (pra capturar hex/fontes exatas)
Benchmark via WebFetch pegou só shell SPA. Pra 100% precisaria crawl headless (Playwright) em `:root` CSS vars.
