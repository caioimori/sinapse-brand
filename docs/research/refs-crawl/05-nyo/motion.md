# NYO — MOTION/PATTERNS/EFFECTS deep extraction

## STACK DE ANIMAÇÃO
- **GSAP** ✅ (motion principal — NÃO Webflow IX2 puro)
- **Lenis** ✅ (smooth scroll)
- **SplitType** ✅ (text fragmentation)
- **Swiper** ✅ (carousels)
- **2 canvases**: 1920×911 (hero WebGL/canvas) + 604×884 (decorative FX)
- **121 SVGs** inline
- **536 unique custom classes** — sistema robusto

## EASINGS (3 curves disciplinadas)
| Curve | Equivalente | Uso |
|---|---|---|
| `cubic-bezier(0.625, 0.05, 0, 1)` | heavy ease-in-out | buttons (transition 0.475s), motion principal |
| `cubic-bezier(0.34, 1.64, 0.64, 1)` | ease-out-back | overshoot suave reveals |
| `cubic-bezier(0.215, 0.61, 0.355, 1)` | ease-out-cubic | UI subtle |

## PADRÃO #1 — `mix-blend-mode: difference` SISTEMA (14+ classes)

Não é elemento isolado, é SISTEMA. NYO criou modifier `.is-dif` que aplica difference blend em TUDO:
- `.tag.is-dif`
- `.action-tag`, `.action-tag.is-dif`
- `.main-tag.is-dif`
- `.tab-tag`, `.tab-tag.is-dif`
- `.big-heading-tag.is-dif`, `.big-heading-tag-2.is-dif`, `.big-heading-tag-3.is-dif`
- `.card-tag.is-dif`
- `.preload-tag-2`
- `.agent_modal-tag-text`
- `.navbar` (navbar inteira!)

**Lição:** Em vez de cursor com blend, NYO aplica blend nas LABELS/TAGS. Conforme você scrolla, tags ficam com cor invertida sobre cards diferentes. Inteligentíssimo: navbar invisível em fundo claro + visível como branco em fundo escuro = nav adapta sozinha sem theme switch.

## PADRÃO #2 — CORNER BORDER SYSTEM (signature visual)

Aplicado em 4 contextos: `.nav_border`, `.features_border`, `.agent_border`, `.overlay-corner`. Cada um tem 4 variants:

```css
.{ctx}_border             { /* default top-left, no rotation */ }
.{ctx}_border.righ-top    { transform: rotate(90deg); }
.{ctx}_border.left-bot    { transform: rotate(-90deg); }
.{ctx}_border.right-bot   { transform: rotate(180deg); }
```

**Anatomia:** 1 SVG/div em formato de "L" (linha top + linha left), reutilizada nos 4 cantos via rotate. Cria moldura "scope reticle" / "terminal frame" / HUD targeting brackets visualmente assinatura.

**Bonus:** `.overlay-corner.{position}` — 4 cantos overlay sobre cards/sections.

## PADRÃO #3 — STICKY SCROLL HERO/SECTIONS (massivo)

Stack de classes sticky:
- `.hero_sticky`, `.is-hero`
- `.solution_sticky`, `.solution_sticky-view`
- `.sticky-features__wrap`, `.sticky-features__progress-bar` (com `transform: scale3d(0,1,1)` — progress bar horizontal scale-X de 0→1)
- `.row_transitions-sticky`
- `.big-heading_sticky`, `.is-sticky`
- `.sticky-title-wrapper / -container / -inner / -el` — title fica grudado enquanto cards atrás trocam (clássico Apple-style)

**Lição:** sticky scroll é sistema. Cada section longa tem um "anchor" sticky + progress bar horizontal abaixo + cards/títulos trocando.

## PADRÃO #4 — MAGNETIC BUTTON (button comprime, overlay explode)

```css
.button, .button-overlay {
  transition: transform 0.475s cubic-bezier(0.625, 0.05, 0, 1),
              opacity 0.475s cubic-bezier(0.625, 0.05, 0, 1);
}
.button:hover { transform: scale(0.85); }
.button:hover .button-overlay { transform: scale(1.4); }
```

Botão **encolhe** + overlay (provável bg) **explode** = sensação de profundidade/feedback tátil.

E o `.button-default.is-blocky-boogie .button-default__background` usa CSS variables `var(--speed) var(--ease)` = sistema configurável por componente.

## PADRÃO #5 — MARQUEE ADVANCED (92 elementos)

```
.marquee-advanced
└── .marquee-advanced__scroll
    └── .marquee-advanced__collection
        └── .marquee-advanced__item-width × N
```

Não é simples scroll horizontal. "Advanced" sugere bidirectional, pause-on-hover, ou drag-to-scroll. Provável GSAP-driven.

## PADRÃO #6 — DIAGONAL DIVIDERS

```css
.count-row-divider { transform: rotate(15deg); }
```

Em row de stats/numbers, dividers entre os números são **rotacionados 15°** = quebra do grid ortogonal, dá energia/movimento.

## PADRÃO #7 — MWG_EFFECT016 (Codrops scroll-driven horizontal)

```css
.mwg_effect016 .scroll      { transform: translate(-50%, -50%); }
.mwg_effect016 .container   { transform: translate(-50%, -50%); }
.mwg_effect016 .media       { transform: translate(60vw, 0px); }
```

Padrão Codrops Manuel Wieser: scroll vertical da página dispara translate-X horizontal de medias internas. Vale procurar "mwg_effect016 codrops" no Google pra ver demo.

## PADRÃO #8 — KEYFRAMES MINIMAIS (motion via GSAP)

Apenas 2 @keyframes CSS:
```css
@keyframes spin { 0%→360deg }
@keyframes blocky-boogie-background {
  0% { opacity: 0; }
  40% { opacity: 1; }
  100% { opacity: 0; }
}
```

`blocky-boogie` = pulse/breath em background de buttons. Resto da motion 100% GSAP.

## PADRÃO #9 — HERO COM FADE LATERAL EM AGENT VIDEOS

Classes:
- `.hero_agente-wrap`
- `.hero_agent-fade-left` + `.hero_agent-fade-right`
- `.hero_agente-video`

Hero exibe agent videos com **gradient mask nas bordas L+R** = vídeo "flutua" sem corte hard. Trivial implementar:
```css
mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
```

## PADRÃO #10 — GRID-BG (linha por linha visível)

`.grid-bg`, `.grid-block` — pattern de grid visível como background (provavelmente lines hairline 1px). Confirma nosso `.pattern-grid` mas mais denso.

## SCREENSHOTS PROGRESSIVOS
- `scroll-00.webp` — hero (clock + tags + agent video com fade)
- `scroll-15.webp` — solution sticky inicial
- `scroll-35.webp` — solution sticky meio
- `scroll-55.webp` — agents marquee
- `scroll-80.webp` — depoimentos / footer aproach

## LIÇÕES ACIONÁVEIS PRA SINAPSE

### A. Adotar SISTEMA `.is-dif` em TODAS labels/tags
```css
.tag, .badge, .eyebrow, .meta-label {
  &.is-dif { mix-blend-mode: difference; color: white; }
}
```
Aplicar em meta labels SINAPSE: `//FOUNDATIONS`, `//MOTION`, etc. Quando scrollar sobre cards diferentes (Vanta/Bone), labels invertem cor automaticamente. **Mata theme toggle pros labels** — adapta sozinho.

### B. Implementar Corner Border System em SINAPSE
Já temos `.frame-tech` no CSS. Refatorar pra:
```css
.corner-bracket {
  /* 1 SVG L-shape, repete via 4 children rotacionados */
}
.corner-bracket.tr { transform: rotate(90deg); }
.corner-bracket.bl { transform: rotate(-90deg); }
.corner-bracket.br { transform: rotate(180deg); }
```
Aplicar em cards principais brandbook, hero do site, modal containers.

### C. Sticky scroll com horizontal progress bar
Cada section longa SINAPSE (Foundations, Brandbook, Components):
```html
<section class="sticky-stage">
  <div class="sticky-progress" style="--p: 0.3"></div>
  <h2 class="sticky-title">FOUNDATIONS</h2>
  <div class="sticky-cards"><!-- conteúdo grande --></div>
</section>
```
Title fica sticky no topo, cards abaixo correm, progress bar embaixo do title preenche conforme `IntersectionObserver` percentage. CSS:
```css
.sticky-progress { transform: scaleX(var(--p)); transform-origin: 0 50%; }
```

### D. Magnetic button (mesma técnica)
```css
.btn { transition: transform 475ms cubic-bezier(0.625, 0.05, 0, 1); }
.btn:hover { transform: scale(0.85); }
.btn:hover .btn-bg { transform: scale(1.4); }
```
Já temos `.magnet`. Reescrever pra essa fórmula scale(0.85)+scale(1.4).

### E. Marquee advanced sistema
Substituir nosso `.marquee` simples por sistema com:
- `.marquee-track` (container)
- `.marquee-collection` (clones-friendly)
- `.marquee-item` (auto-width)
- pause-on-hover
- direction reverse via prop

### F. Diagonal dividers em stats rows
Em sections de números (50+ clientes, +300%, etc.):
```html
<div class="stat">50+</div>
<span class="stat-divider"></span>
<div class="stat">+300%</div>
```
```css
.stat-divider { width: 1px; height: 80%; background: currentColor; transform: rotate(15deg); }
```
Adiciona movimento/energia. Diferencia dramaticamente.

### G. Hero video com gradient mask lateral
Para hero SINAPSE com video bg ou agent showcase:
```css
.hero-media {
  mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
}
```
Bordas fade out = vídeo "flutua" sem corte agressivo.

### H. Disciplina de 3 easings (não mais que isso)
Adicionar a `tailwind.config.ts`:
```js
transitionTimingFunction: {
  'in-out-expo': 'cubic-bezier(0.625, 0.05, 0, 1)',     /* default motion */
  'out-back': 'cubic-bezier(0.34, 1.64, 0.64, 1)',      /* overshoot */
  'out-cubic': 'cubic-bezier(0.215, 0.61, 0.355, 1)'    /* subtle UI */
}
```
Forbid usar `ease`/`ease-in-out` defaults.

### I. Adicionar GSAP + ScrollTrigger
```bash
npm i gsap
```
NYO + Off+Brand + Story + TheGrid TODOS usam GSAP. Lenis + GSAP é o stack 2026 padrão pra sites desse calibre. JetBrains Mono fica obsoleto comparado a Geist Mono — mesma lógica.
