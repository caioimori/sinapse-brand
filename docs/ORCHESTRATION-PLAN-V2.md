---
status: draft — awaiting approval
version: 2.0
date: 2026-04-19
authority: overrides earlier plans
trigger: user request — "crie plano de orquestração fodido"
references:
  visual: astro-brand-studio/design-system-astro, brand.aioxsquad.ai
  motion: sp3company, abacatepay, stripe.br, itsoffbrand, nyo.ia.br, digitalflagship, overlay, euclidpower, story.foundation, thegrid.ai
---

# SINAPSE Brand — Orchestration Plan v2

## 0. Diagnóstico do estado atual

**Problemas identificados:**
1. Navegação deficiente — só footer funciona bem, header mínima. Precisa sidebar fixa + header.
2. Patterns muito sutis (opacity 5-10%) — invisíveis em bg Bone.
3. Páginas text-heavy onde deveriam ser visual-first (logo, cores, spacing).
4. Zero scroll-driven animations, zero custom cursor, zero auto-playing visuals.
5. Performance: scroll janky (provável causa: grain overlay pesado + múltiplos animated patterns simultâneos sem `will-change`).
6. Logo page cobre só texto — precisa demonstrar TODAS as variantes (wordmark, lockup, símbolo, favicon, aplicações em bg diferentes).
7. Falta personalidade visual: ausência de elementos que chamem atenção (kinetic typography, magnet cursors, shader-style backgrounds).

**Veredicto:** a fonte da verdade precisa virar **obra artística navegável**, não documentação.

---

## 1. Artistic Direction Manifesto

### Princípio-âncora
**"Minimalismo ativado por camadas."** B&W absoluto é a base. Cada camada acima (tipografia, motion, patterns, cursor, layout) adiciona voltagem sem sair da paleta.

### 4 forças estéticas

| Força | Tradução visual |
|---|---|
| **Restrição** | Vignelli + Rams — 1 tipo display, paleta B&W, radius pequenos, zero gradiente cromático |
| **Precisão técnica** | aiox + Stripe — meta labels mono uppercase, numeração decimal, HUD frames, clipped polygons |
| **Vitalidade orgânica** | itsoffbrand + nyo.ia — grão sempre ativo, cursor custom, símbolo animado constante, marquees infinitos |
| **Densidade editorial** | story.foundation + euclidpower — tipografia gigantesca quebrando em serifa/sans, grid editorial assimétrico |

### O que NÃO somos
- Fluffy (gradientes, glow neon, glass morphism saturado)
- Corporate SaaS média (raios 12px+, azul brand, arredondado por arredondado)
- Agência criativa aleatória (cores piscando, typography desordenada)

---

## 2. Nova Arquitetura de Navegação

### 2.1 Header global (sticky, altura 60px)
```
[LOGO LOCKUP]      Brandbook · Foundations · System · Showcase      [THEME] [⌘K]
```
- Search overlay (⌘K) pra saltar entre páginas
- ThemeToggle (Bone ⇄ Vanta)
- Nav em 4 categorias (não todas as páginas)

### 2.2 Sidebar fixa esquerda (desktop md+)
Estilo astro-brand-studio: sticky à esquerda com scroll próprio, mostrando TODA a numeração decimal da seção atual.

```
SIDEBAR (220px, sticky, left)
┌────────────────────┐
│ BRANDBOOK          │
│  0.0 Guidelines    │
│  1.0 Movimento     │
│  2.0 Foundations ▼ │
│    2.1 Typography  │
│    2.2 Color       │
│    2.3 Spacing     │
│    2.4 Surfaces    │
│    2.5 Motion-tok  │
│    2.6 Semantic    │
│    2.X Token Exp   │
│  3.0 Logo          │
│  4.0 Icons         │
│  5.0 Moodboard     │
│  6.0 Estratégia    │
│                    │
│ DESIGN SYSTEM      │
│  0.0 Components    │
│  1.0 Buttons       │
│  2.0 Cards         │
│  ...               │
│  11.0 Effects      │
│  12.0 Patterns     │
│  13.0 Templates    │
│  14.0 Motion       │
│  15.0 SEO          │
│  16.0 VFX          │
│                    │
│ SHOWCASE           │
│  0.0 Index         │
│  1.0 Editorial     │
└────────────────────┘
```

### 2.3 Mobile
- Header fixo 56px
- Botão "menu" abre drawer (mesma estrutura da sidebar)
- Bottom bar flutuante com prev/next

### 2.4 Dentro de cada página
- Breadcrumb no header da página
- Prev/Next fixo no bottom-right flutuante (já existe, refinar)
- Scroll progress indicator top (1px lime sobre bg)
- Cursor custom com blend mode difference

---

## 3. Animation Library — Vocabulary completo

### 3.1 Scroll-driven (novas a construir)
| Nome | Técnica | Uso |
|---|---|---|
| `scroll-reveal` | `IntersectionObserver + opacity + translateY` | Seções ao entrarem no viewport |
| `scroll-pin-section` | `position: sticky + scroll progress` | Hero pin até próxima section |
| `scroll-text-stagger` | Palavras revelam por word/char ao scrollar | Manifestos, H1 gigantes |
| `scroll-parallax` | `translate3d` em background/foreground | Símbolo que se move diferente do texto |
| `scroll-horizontal` | Vertical scroll vira horizontal em trecho | Gallery de logos, showcase |
| `scroll-number-count` | Contador que incrementa ao entrar viewport | Stats (04, 13, 02, 100%) |
| `scroll-progress-bar` | Top horizontal bar escalando 0→100% | Indicador global |

### 3.2 Cursor
| Nome | Efeito |
|---|---|
| `cursor-dot` | Dot pequeno seguindo mouse (linear + spring) |
| `cursor-blend` | Círculo grande com `mix-blend-mode: difference` |
| `cursor-magnet` | Atrai em direção a botões/links |
| `cursor-label` | Vira texto ao entrar em zonas ("view", "drag", "copy") |
| `cursor-scale` | Escala ao hover em imagens |

### 3.3 Auto-playing (idle)
| Nome | Efeito |
|---|---|
| `symbol-orbit` | ✓ já existe — rotação lenta 28s |
| `grain-shift` | ✓ já existe — ruído animado |
| `pattern-grid-pan` | ✓ já existe — grid rolando 60s |
| `marquee-infinite` | ✓ já existe — ticker |
| `kinetic-title` | Título que expande/contrai respirando |
| `typing-loop` | "[SINAPSE/BRAND]" re-typando como terminal |
| `glitch-pulse` | Glitch sutil em logos a cada 8-12s |
| `floating-particles` | Pontos flutuando no bg (low density, 8-12 pontos) |

### 3.4 Hover / Interaction
| Nome | Efeito |
|---|---|
| `magnet-lift` | ✓ já existe |
| `link-reveal` | ✓ já existe — underline |
| `image-zoom-mask` | Hover em thumbnail → imagem escala dentro de mask |
| `hover-invert` | Botão: fill invert em hover |
| `card-tilt-3d` | Card tilt leve 3D com `perspective` |
| `text-scramble` | Texto randomiza chars por 0.4s (power words) |
| `split-reveal` | Cada letra de H1 entra em delay staggered |

### 3.5 Page transitions
| Nome | Efeito |
|---|---|
| `curtain-wipe` | Dois painéis verticais fecham/abrem |
| `mask-reveal` | SVG mask revela próxima página |
| `fade-through` | Fade out → fade in (default) |

---

## 4. Pattern Intensity Upgrade

### Problema atual
Opacity dos patterns (5-10%) invisível em bg Bone `#F5F5F0` — precisa subir pra 15-25% mantendo o equilíbrio.

### Solução
```
Pattern         Opacity Bone   Opacity Vanta
grid            0.06 → 0.12    0.06 → 0.08
dots            0.10 → 0.18    0.12 → 0.14
crosshair       0.15 → 0.22    0.18 → 0.18
grain           0.05 → 0.10    0.05 → 0.06
scanlines       0.035 → 0.06   0.05 → 0.06
hazard          0.10 → 0.15    — (same)
```

### Patterns a adicionar
- `pattern-wireframe-perspective` — 3D grid com vanishing point
- `pattern-circuit` — traços PCB decorativos em separadores
- `pattern-topographic` — contornos topográficos (referência: sp3company)

---

## 5. Performance Optimization

### Causas do scroll janky
1. `grain-overlay` 200% × 200% cobrindo full viewport + animado → repaint expensive
2. `pattern-grid` com animation infinite sem `will-change`
3. Symbol hero com orbit loop sem isolamento de layer
4. Hydration mismatch (fonts loading)
5. Multiple `backdrop-blur-md` empilhados

### Correções
- Isolate animated elements em layers (`will-change: transform`, `contain: paint`)
- Grain: reduzir scope pra `vh + 200px` em vez de full
- `transform: translateZ(0)` em elementos animados (GPU layer)
- Defer heavy patterns abaixo do fold
- `prefers-reduced-motion` já tá ok
- Remover `backdrop-blur-md` onde não for essencial

---

## 6. Estrutura de Páginas — COMPLETA

### 🔴 BRANDBOOK (estratégia + identidade)

| # | Página | Status | Foco visual |
|---|---|---|---|
| 0.0 | **Guidelines** | ✓ refinar | 12 princípios em grid. Cada princípio com **mini-demo visual** (não texto). Ex: "Preto absoluto proibido" mostra swatch `#000` riscado vs `#0A0A0A` aprovado. |
| 1.0 | **Movimento** | ⬜ criar | Brandbook estratégico 13 seções (aiox-modelo). Hero = manifesto gigante. Arquétipo em pie chart visual. Voz quadri-axial em diagrama. |
| 2.0 | **Foundations** | ✓ ok | Índice |
| 2.1 | **Typography** | ✓ upgrade | Specimen interativo (change weight on hover). Type tester (digita, vê mudança). Alfabeto gigante animado. |
| 2.2 | **Color** | ✓ upgrade | 13 swatches em grid sensível a hover (expandem). Contrast checker interativo. Applications cards (logo em cada). |
| 2.3 | **Spacing** | ✓ upgrade | Sliders interativos mostrando cada step. Radius rotatable previews. |
| 2.4 | **Surfaces** | ⬜ criar | Elevation ladder (cards em z-depth crescente). Glass demo. |
| 2.5 | **Motion Tokens** | ⬜ criar | Easing curves rendered como linhas animadas. Duration demo side-by-side. |
| 2.6 | **Semantic** | ⬜ criar | Flow diagram: primitive → semantic → component. Shadcn mapping table. |
| 2.X | **Token Export** | ✓ | Killer feature, stays. |
| 3.0 | **Logo System** | ⬜ **recriar visual** | **TODAS as variantes** (wordmark · lockup · symbol) × **2 edições** (Vanta · Bone) × **aplicações** (favicon, avatar, signage). Clear space visual. Proibições visuais (logo distorcido ❌). Animação do logo orbit. |
| 4.0 | **Icons** | ✓ ok | 30 glyphs. Upgrade: hover scales + outline preview. |
| 5.0 | **Moodboard** | ⬜ criar | Grid masonry de imagens/refs (Vignelli · Rams · Aesop · itsoffbrand · nyo). Lightbox on click. |
| 6.0 | **Estratégia de Marca** | ⬜ criar | Posicionamento · ICP · contraste competitivo · truelines. Visual: tabela comparativa + SWOT visual. |

### 🟡 DESIGN SYSTEM (execução)

| # | Página | Foco visual |
|---|---|---|
| 0.0 | **Components** | Índice com preview cards |
| 1.0 | **Buttons** | 7+ variantes em demo live, hover states visíveis |
| 2.0 | **Cards** | Tipos diferentes renderizados |
| 3.0 | **Forms** | Inputs, selects, checkboxes interativos |
| 4.0 | **Feedback** | Toasts, alerts, dialogs (disparáveis) |
| 5.0 | **States** | Empty, loading, error, success |
| 6.0 | **Tables** | Sortable, filterable mock |
| 7.0 | **Lists** | Ordered, unordered, stacked |
| 8.0 | **Charts** | 4-6 tipos B&W mínimos |
| 9.0 | **Sections** | Hero, feature, CTA, testimonial |
| 10.0 | **Navigation** | Header, sidebar, breadcrumb, tabs |
| 11.0 | **Effects** | ✓ existe, upgrade: demos mais visuais, patterns animados visíveis |
| 12.0 | **Patterns** | Biblioteca CSS com copy-code |
| 13.0 | **Templates** | ⬜ **criar** — Landing template + Dashboard SaaS + Proposta comercial 9 slides + Contrato B&W + Carrossel IG + Apresentação deck |
| 14.0 | **Motion** | ✓ existe, upgrade: demos em loop + copy-code |
| 15.0 | **SEO** | Meta patterns, OG image template |
| 16.0 | **VFX** | Particle system, displacement shader demos |

### 🟢 SHOWCASE
| # | Página | Foco visual |
|---|---|---|
| 0.0 | **Index** | Grid de cases SINAPSE (sinapse.club, MindLoop, caioimori) |
| 1.0 | **Editorial** | Long-form com articles |

### 🔵 MÓDULOS SINAPSE (nossos, fora do aiox)
| Página | Foco |
|---|---|
| **Copy Lab** | TOFU/MOFU/BOFU matrix · 13 hook patterns · CRAFT roteiro · scorecard |
| **Proposal Template** | 9-slides Hormozi grand slam — deck interativo preview |
| **Contract Template** | Layout SINAPSE pra contratos (editável) |
| **AI Image Prompts** | Template Higgsfield/MJ B&W · variações (hero · retrato · produto · lifestyle) |
| **Social Kit** | Carrossel IG · static post · reel cover |

---

## 7. Logo System Page — Spec detalhada (3.0)

**Estrutura:**

### Section 01 · Architecture
Diagrama visual: 1 símbolo + 3 formas × 2 edições = 6 arquivos primários + 6 sub-marks (AI/CLUB).

### Section 02 · The Symbol
- Hero visual: símbolo gigante animado (orbit + pulse sutil)
- Construction grid: símbolo em grid matemático
- Proportions breakdown

### Section 03 · Wordmark
- "SINAPSE" em tamanhos crescentes (demo escala)
- Análise letter-by-letter (S-I-N-A-P-S-E com notas sobre ligaduras custom)

### Section 04 · Lockup
- Lockup em dark + light side-by-side
- Clear space overlay (mostra 1× altura X)

### Section 05 · Variants
- Mosaico: vanta wordmark, bone wordmark, vanta lockup, bone lockup, vanta symbol, bone symbol — cada uma em seu contexto apropriado

### Section 06 · Applications
- **Favicon** (32×32 preview)
- **Avatar social** (1:1 com padding)
- **Meta image OG** (1200×630)
- **Print letterhead** (A4 mock)
- **Apparel** (t-shirt mock com símbolo)
- **Signage** (fachada mock)

### Section 07 · Color contexts
Grid 2×4: logo em cada contexto (Vanta · Bone · Card · Muted · sobre pattern-grid · sobre foto · sobre gradient-permitido-zero · sobre lime-permitido-zero)

### Section 08 · DO / DON'T
- ❌ Rotacionar
- ❌ Distorcer
- ❌ Aplicar cor fora da paleta
- ❌ Outline/sombra/gradient
- ❌ Redesenhar manualmente
- ❌ Usar wordmark < 90px
- Cada um com exemplo VISUAL (logo errado riscado)

### Section 09 · Animation
Logo-orbit loop + logo-split-reveal + logo-glitch (3 animações nomeadas).

### Section 10 · Download
Grid de botões: `svg · png@2x · png@3x · pdf · figma-link` por variante.

---

## 8. Execução Modular — Fases

### FASE A: Infra crítica (3-4h)
- [ ] Header global com search ⌘K + theme toggle
- [ ] Sidebar fixa esquerda (desktop) + drawer mobile
- [ ] Scroll progress bar top
- [ ] Custom cursor (dot + blend mode)
- [ ] Performance: `will-change`, `contain`, layer isolation
- [ ] Pattern opacity upgrade (15-25%)
- [ ] Scroll-driven reveal observer (IntersectionObserver global)

### FASE B: Logo 3.0 visual (2h)
- [ ] Recriar `/brandbook/3.0-logo/page.tsx` com 10 seções
- [ ] Todos os 14 SVGs em demos contextuais
- [ ] Favicon + OG + avatar mockups
- [ ] DO/DON'T visuais (não texto)

### FASE C: Páginas faltantes brandbook (4-5h)
- [ ] 1.0 Movimento (13 seções aiox-modelo)
- [ ] 2.4 Surfaces
- [ ] 2.5 Motion Tokens
- [ ] 2.6 Semantic
- [ ] 5.0 Moodboard (masonry grid)
- [ ] 6.0 Estratégia de Marca

### FASE D: Design system core (6-8h)
- [ ] 0.0 Components índice
- [ ] 1.0 Buttons (7 variantes live)
- [ ] 2.0 Cards
- [ ] 3.0 Forms
- [ ] 4.0 Feedback
- [ ] 5.0 States
- [ ] 6-10 demais

### FASE E: Templates (4-5h)
- [ ] 13.0 Templates hub
- [ ] Landing template preview
- [ ] Dashboard SaaS preview
- [ ] Proposta comercial deck
- [ ] Contrato template
- [ ] Carrossel IG
- [ ] Apresentação deck

### FASE F: Módulos SINAPSE (5-6h)
- [ ] Copy Lab (TOFU/MOFU/BOFU)
- [ ] AI Image Prompts
- [ ] Social Kit

### FASE G: Showcase (2h)
- [ ] Editorial long-form
- [ ] Cases index

### FASE H: Polish final (2-3h)
- [ ] Animation library completa (todos nomes das seções 3.1-3.5)
- [ ] Page transitions
- [ ] Performance audit (Lighthouse 95+)
- [ ] Deploy Vercel
- [ ] Domínio próprio

**Total estimado: 28-36h** modularizadas, cada fase entregável + testável.

---

## 9. Ordem recomendada de execução

Sugiro **A → B → C (só 1.0 Movimento + 5.0 Moodboard) → D (só 0.0, 1.0, 2.0) → E (só Templates hub) → G** como MVP v1 navegável completo.

Depois iteramos em ondas: mais componentes, mais templates, módulos SINAPSE.

---

## 10. Critérios de sucesso

1. Navegação é feita pela sidebar/header — ninguém toca o footer
2. Todo scroll está fluido (60fps)
3. Toda página tem pelo menos 3 elementos animados (pattern + symbol + reveals)
4. Cursor custom ativo em todas páginas
5. Logo page mostra 100% das variantes com aplicação real
6. Todas as páginas têm prev/next + breadcrumb
7. Copy-paste de qualquer demo é trivial
8. Lighthouse: Performance > 90, Accessibility > 95
9. Mobile não quebra nada
10. "Parece aiox, mas mais artístico"

---

## Sign-off requerido

**Caio — aprovar/ajustar antes de iniciar FASE A.**

Pontos que precisam decisão sua:
1. Todo o escopo está aprovado? Cortamos algo?
2. Executar TUDO de A→H seguido, ou parar em cada fase pra você ver antes?
3. Dark mode (Vanta) vira real (toggle funcional) ou fica só opt-in?
4. Templates comerciais (propostas/contratos) priorizamos? — alto valor comercial imediato
5. Módulos SINAPSE (Copy Lab etc) entram nessa rodada ou ficam pra v2?
