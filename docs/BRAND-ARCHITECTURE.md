---
status: SOURCE OF TRUTH — estrutura definitiva
date: 2026-04-19
mirror: brand.aioxsquad.ai (decimal hierarchy + 4 pillars)
visual_dna: B&W radical (Vanta + Bone), zero accent cromático
---

# SINAPSE BRAND — ARCHITECTURE

## 4 PILARES NAVEGÁVEIS (footer + nav)

1. **Brandbook** (estratégia + manifesto)
2. **Foundations** (tokens primitivos)
3. **Design System** (componentes + patterns)
4. **Showcase** (provas + templates)

---

## ESTRUTURA DECIMAL COMPLETA

### 0.0 — Guidelines (manifesto + filosofia visual)
- 0.0 Guidelines · Manifesto B&W radical · 12 princípios · contrast rule · functional isolation

### 1.0 — Movimento (estratégia narrativa)
- 1.0 Movimento — manifesto estratégico SINAPSE (por que B&W · persona-mentor · arquétipo · big idea)

### 2.0 — Foundations (tokens primitivos) · CARDS HUB
- 2.0 Foundations index (6 cards: typography · color · spacing · surfaces · motion · semantic)
- 2.1 Typography (Sora · Inter · JetBrains Mono · scale · alfabeto · rules)
- 2.2 Color (13 steps Vanta/Bone · semantic · functional · rules · contrast)
- 2.3 Spacing (14-step + named + radius + z-stack + breakpoints)
- 2.4 Surfaces (cards · elevations · borders · radii)
- 2.5 Motion Tokens (3 easings · durations · keyframes nomeados)
- 2.6 Semantic Tokens (aliases shadcn-mapping)

### 3.0 — Logo (visual completo)
- 3.0 Logo · Primary · Variants · Clear space · Usage rules · Color contexts

### 4.0 — Icons
- 4.0 Icons · 30+ glyphs Lucide · 4 sizes · 6 rules · color variants

### 5.0 — Moodboard
- 5.0 Moodboard · referências visuais · texture wall · cinematic stills

### 6.0 — Estratégia (brandbook profundo) · ÍNDICE
- 6.0 Estratégia index
- 6.1 Propósito & Valores
- 6.2 Arquétipo (Magician 45% · Sovereign 35% · Creator 20%)
- 6.3 Posicionamento
- 6.4 BrandScript (StoryBrand framework)
- 6.5 Truelines (frases-matriz)
- 6.6 Naming
- 6.7 Vocabulário (allow/block words)
- 6.8 Traits (5 dimensões bipolares de tom)
- 6.9 Jornada do herói + depoimentos
- 6.10 Contrato bilateral
- 6.11 Fundadores

### 11.0 — Effects (CSS class library)
- 11.0 Effects · patterns · frames · dividers · interactions · ticker · badges · glow

### 12.0 — Design System Components (hub)
- 12.0 Components index
- 12.1 Buttons
- 12.2 Cards
- 12.3 Forms
- 12.4 Feedback (toast, modal, alert)
- 12.5 States (loading, empty, error)
- 12.6 Tables
- 12.7 Lists
- 12.8 Navigation patterns

### 13.0 — Shaders (WebGL wallpapers) · NOVA CAPABILITY ✨
- 13.0 Shaders index (gallery 5)
- 13.1 Vanta Noise Field
- 13.2 Bone Grid Ripple
- 13.3 Sora Flow Field
- 13.4 Ascii Matrix Rain
- 13.5 HUD Crosshair Live

### 14.0 — Motion (animation vocabulary nomeado)
- 14.0 Motion · 8 animations nomeadas · easings · durations · reduced-motion

### 15.0 — Templates (page shells)
- 15.0 Templates index
- 15.1 Landing Page Shell
- 15.2 Bento Dashboard
- 15.3 Auto-fit Content Grid
- 15.4 Proposta 9-slides
- 15.5 Contrato shell
- 15.6 Carrossel IG

### 16.0 — Showcase (provas em uso)
- 16.0 Showcase index
- 16.1 LP exemplos
- 16.2 Carrosséis
- 16.3 Decks

### Bonus
- token-export — KILLER FEATURE (CSS vars + Tailwind preset + Copy)

---

## NAVEGAÇÃO (footer 4 colunas — espelho aiox)

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│  BRANDBOOK      │  FOUNDATIONS    │  DESIGN SYSTEM  │  SHOWCASE       │
├─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ 0.0 Guidelines  │ 2.0 Index       │ 11.0 Effects    │ 16.0 Index      │
│ 1.0 Movimento   │ 2.1 Typography  │ 12.0 Components │ 16.1 LP         │
│ 3.0 Logo        │ 2.2 Color       │ 13.0 Shaders ✨ │ 16.2 Carrossel  │
│ 4.0 Icons       │ 2.3 Spacing     │ 14.0 Motion     │ 16.3 Decks      │
│ 5.0 Moodboard   │ 2.4 Surfaces    │ 15.0 Templates  │                 │
│ 6.0 Estratégia  │ 2.5 Motion Tok. │                 │ token-export    │
│                 │ 2.6 Semantic    │                 │                 │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

---

## VISUAL/MOTION SYSTEM aplicado em TODAS as pages

### Persistente (HUD)
- **BrandHUD** — overlay fixed 4-cantos: brand TL · nav TR · scroll indicator BL · menu trigger BR
- **CustomCursor** — div fixed mix-blend-difference, scale on link hover
- **Lenis smooth scroll** — RAF loop providers
- **Grain overlay** — animado (já existe)

### Section-level (motion vocabulary)
- **CornerBrackets** — 4 rotates de 1 SVG (envolve cards/sections importantes)
- **MagneticButton** — compress 0.85 + overlay scale 1.4
- **LinkReveal** — variants lr/rl/cs com duration 0.8s
- **MaskFade** — utilities `.mask-fade-{t/b/l/r/x/y}`
- **`.is-dif` modifier** — tags/labels mix-blend-mode difference
- **DiagonalDivider 15°** — em rows de stats
- **CharReveal SplitType** — headings principais

### Background (ambient)
- **ShaderCanvas** — opcional via prop (5 shaders disponíveis)
- **Patterns** — grid · dots · crosshair (já existe)

---

## REGRAS NON-NEGOTIABLE

1. **Tudo B&W** — animations transformadas pra Vanta/Bone (zero cromático)
2. **3 easings disciplinados** — `smooth | back | swift` (banir defaults)
3. **HUD sempre visível** — em todas pages
4. **Prefers-reduced-motion respeitado** — sempre
5. **Numeração decimal** — em toda label de section (`/0.0`, `/2.4`, `/13.0`)
6. **`//` prefix em eyebrows** — sistema NYO/TheGrid
7. **Single typeface system** — Sora (display) + Sora regular (body) + JetBrains Mono (mono)

---

## ROADMAP DE EXECUÇÃO (esta sessão)

### ✅ Fase 0 — Foundation (infra)
- [x] Plano mestre (este doc)
- [ ] Install libs: lenis · gsap · split-type · tailwindcss-animate · ogl
- [ ] Tailwind config: 3 easings + plugin
- [ ] globals.css upgrade (+ mask-fade + corner-bracket + .is-dif + magnetic)

### ✅ Fase 1 — Core components
- [ ] BrandHUD persistente
- [ ] SmartNav (Lenis + hide-on-scroll)
- [ ] CustomCursor mix-blend
- [ ] CornerBrackets sistema 4-rotates
- [ ] ShaderCanvas + Vanta Noise Field

### ✅ Fase 2 — Navigation reorg
- [ ] Refactor Nav (sticky + Lenis-aware)
- [ ] Refactor Footer (4 colunas full decimal)
- [ ] Route stubs faltantes (1.0 Movimento, 2.4 Surfaces, 2.5 Motion Tokens, 2.6 Semantic, 5.0 Moodboard, 6.0 Estratégia, 12.0 Components, 13.0 Shaders, 15.0 Templates, 16.0 Showcase)

### ✅ Fase 3 — Visual refactor exemplar (2 pages)
- [ ] 0.0 Guidelines (full HUD + cursor + brackets + cinema)
- [ ] 2.0 Foundations index (6 cards visual com motion)

### ✅ Fase 4 — Build verification
- [ ] Dev server up sem regressions
- [ ] Type check + lint pass

### ⏭️ Pós-sessão (próximas iterações)
- Refactor cada page individual com motion treatment
- Implementar 4 shaders restantes
- Build out 15.0 templates copy-paste
- 6.0 Estratégia profundo (10 sub-pages)
