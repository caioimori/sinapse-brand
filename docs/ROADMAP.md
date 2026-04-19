---
status: draft
version: 0.1
date: 2026-04-18
principle: cada fase entregável + usável antes da próxima. Evita "tudo de uma vez → saiu cagado". Usa a própria evolução pra construir melhor a próxima.
---

# Roadmap Modular — SINAPSE Source-of-Truth

8 fases. Cada uma tem: **escopo**, **deliverable**, **teste de uso real** (usa em projeto vivo antes de seguir), **gate** pra próxima.

---

## FASE 0 — Fundação do Repo (1-2 dias)

**Escopo**: scaffold Next.js + Tailwind + shadcn + Style Dictionary + MDX + estrutura de pastas conforme `ARCHITECTURE.md`.

**Deliverable**: repo rodando com rota `/brandbook/0.0-guidelines` servindo MDX placeholder.

**Teste de uso**: build limpo, deploy Vercel preview.

**Gate → Fase 1**: site no ar + CI básica + estrutura validada.

---

## FASE 1 — Foundations Visuais Core (3-5 dias) [BLOQUEANTE — resolve gap crítico]

**Escopo**:
- Paleta B&W 13 steps (primitives) + 1 cor funcional (error)
- Sistema tipográfico: escolher par (recomendação: Geist Sans + Geist Mono OU custom a definir) + escala 7 tamanhos + 2 pesos
- Spacing 14-step + radius + surfaces + motion tokens base
- Grid + breakpoints
- Logo system: variações, clear space, usos, no-go
- Ligação logotipo ↔ tipografia (primeiro fechar essa ponta)

**Deliverable**: `packages/tokens/` com primitives + semantic (light/dark). Style Dictionary gerando CSS/TS/Tailwind. Páginas MDX `2.0-foundations` + `3.0-logo` + `5.0-moodboard` publicadas.

**Teste de uso**: migrar `sinapse.club` home page pra consumir tokens novos. Se funciona lá, tá aprovado.

**Gate → Fase 2**: tokens em produção + logo/tipografia congruentes validados por Caio.

---

## FASE 2 — Brandbook Estratégico (3-4 dias)

**Escopo**:
- `1.0-movimento.mdx`: manifesto, propósito, valores, arquétipo ponderado (%), posicionamento, contraste, jornada, contrato, truelines
- Identidade verbal: naming, vocabulário allow-list/block-list, tom quadri-axial
- Voice DNA cascade (brand → squad → agente) — primeiro rascunho
- `6.0-estrategia.mdx`: BrandScript completo

**Deliverable**: brandbook navegável em `/brandbook/*`.

**Teste de uso**: escrever 1 copy de landing SINAPSE-AI usando APENAS o vocabulário aprovado. Cronometrar.

**Gate → Fase 3**: brand verbal documentada + Caio valida tom.

---

## FASE 3 — Iconografia + Patterns (4-6 dias)

**Escopo**:
- Biblioteca de 30-50 ícones autorais SVG (stroke-based, alinhados ao logo)
- 5-8 patterns visuais (grids, texturas, ornamentos B&W)
- Grain SVG turbulence helper
- `4.0-icons.mdx` + `12.0-patterns.mdx`

**Deliverable**: `packages/icons/` + `packages/patterns/` exportando componentes React.

**Teste de uso**: criar 1 carrossel Instagram usando só ícones/patterns novos.

**Gate → Fase 4**: identidade visual core completa.

---

## FASE 4 — Motion System (5-7 dias)

**Escopo**:
- `packages/motion/` helpers: `<Grain>`, `<Magnetic>`, `<ShaderCanvas>`, `<CursorProvider>`, `<SplitReveal>`, `<Marquee>`, `<ScrollSection>`
- Motion vocabulary catalogado em `14.0-motion.mdx` com exemplo vivo por padrão nomeado
- three.js + R3F + drei setup
- glsl shaders base (noise, displacement, gradient B&W)
- prefers-reduced-motion respeitado

**Deliverable**: playground `/design-system/14.0-motion` demonstrando cada padrão.

**Teste de uso**: refazer hero de `sinapse.club` usando `hero-shader-noise` + `text-split-stagger`.

**Gate → Fase 5**: motion system usável por projetos reais.

---

## FASE 5 — Component Library (SaaS) (6-8 dias)

**Escopo**:
- 18 componentes P0+P1 (Button, Input, Command/cmd+k, Dialog, Sheet, Toast, Dropdown, Tooltip, Tabs, Table, Form, Avatar, Badge, Skeleton, Kbd, Switch, Sidebar, Nav)
- shadcn/ui copy com tokens SINAPSE aplicados
- Empty state + Kbd cheatsheet
- Dark/light paridade
- Onboarding golden path documentado
- Hook loop canônico documentado

**Deliverable**: `packages/ui/` + docs `/design-system/0.0-16.0` com anatomy + tokens + a11y + exemplos.

**Teste de uso**: scaffold de nova feature SaaS SINAPSE usando `npx sinapse-brand add`.

**Gate → Fase 6**: library pronta pra qualquer plataforma SINAPSE.

---

## FASE 6 — Templates (Web + Docs) (5-7 dias)

**Escopo**:
- Landing template: hero/feature/pricing/cta com motion pré-cabeado
- SaaS dashboard shell (sidebar + cmd+k + topbar)
- Forum template (base sinapse.club)
- Docs template (este próprio site como base)
- `13.0-templates.mdx`

**Deliverable**: `packages/templates/` + demos vivos.

**Teste de uso**: fork de cada template + adaptação em <30min.

**Gate → Fase 7**: qualquer LP/SaaS SINAPSE parte de template, não do zero.

---

## FASE 7 — Copy + Criativos + IA Imagery (4-6 dias)

**Escopo**:
- `content/copy/*`: TOFU/MOFU/BOFU × formato, 13 hook patterns, CRAFT roteiro
- Proposta comercial 9-slides (template React/Figma)
- Contrato template (Contractbook-style)
- `content/ai-imagery/*`: prompt template Higgsfield/MJ + regras + variações
- Post/carrossel Instagram templates

**Deliverable**: módulos navegáveis + templates baixáveis.

**Teste de uso**: gerar 1 proposta real (MindLoop?) + 1 anúncio TOFU + 3 imagens IA on-brand.

**Gate → Fase 8**: cobertura total dos 14 pilares.

---

## FASE 8 — Governance + Showcase (3-4 dias)

**Escopo**:
- Changesets + SemVer automatizado
- RFC template + workflow
- CI: a11y AA + contrast + visual regression (Chromatic)
- `showcase/1.0-editorial`: primeiros cases documentados
- PR template + CODEOWNERS
- Versão 1.0.0 freeze + release público

**Deliverable**: governance rodando + showcase com 3+ cases reais.

**Teste de uso**: fazer 1 RFC de mudança + mergear + release automático.

**Gate → v1.0 público**.

---

## Pós-v1 (alimentação contínua)

- Headless browser crawl do aiox pra capturar tokens exatos (comparação)
- Voice DNA expandida pra cada orqx do SINAPSE-AI
- Showcase cresce orgânico por projeto entregue
- RFCs abertos pra Matheus contribuir

---

## Total estimado

~35-50 dias de trabalho efetivo modularizado. Cada fase **usável** antes da próxima — zero risco de "saiu tudo cagado".

## Prioridade de fase pra valor imediato

FASE 1 resolve o gargalo crítico (logo ↔ tipografia). FASE 4 resolve o "animações diferenciadas". FASE 5 destrava SaaS SINAPSE. FASE 7 destrava vendas (propostas + criativos). Fases 2/3/6/8 são amplificadoras.
