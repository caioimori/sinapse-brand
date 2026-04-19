# OFF+BRAND — MOTION/PATTERNS/EFFECTS deep extraction

## STACK DE ANIMAÇÃO
- **Lenis** (smooth scroll) — `html.lenis` confirmado
- **SplitType** (text → chars/words p/ stagger reveals)
- **Webflow base** (interactions IX2)
- **Custom WebGL canvas 914x914** (provável shader hero)
- **14 video clips MP4** loop infinito autoplay muted (carrossel/grid de showreels, 800x514 each)

## EASINGS (apenas DUAS, sistema disciplinado)
| Curve | Uso | Equivalente |
|---|---|---|
| `cubic-bezier(0.165, 0.84, 0.44, 1)` | menu transitions, hud reveals | **ease-out-quart** (smooth deceleration) |
| `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | hud-menu-line | **ease-back overshoot** (popping) |

**Lição:** sistema enxuto = 2 easings, nunca mais. Aplicar em SINAPSE.

## SISTEMA HUD (48 elementos `[class*="hud"]`!)

HUD = overlay fixo z-1000 sobre toda página. Anatomia:

```
.hud-w (fixed inset 0, z-1000)
├── .hud-brand-w   (top-left abs, overflow hidden — logo slot)
├── .hud-nav-w     (top-right abs, overflow hidden — nav links)
│   └── .hud-nav-flex (column-gap 1rem, flex)
├── .hud-scroll-w  (bottom-left abs)
│   └── .hud-scroll-inner
│       ├── .hud-scroll-line-top (1px×6em, scaleY(0)→1, transform-origin 50% 100%)
│       ├── .hud-scroll-dot (0.7em circle, var(--black))
│       └── .hud-scroll-line-btm (1px×4em)
└── .hud-menu-w    (bottom-right abs, transition transform 0.6s ease-out-quart)
    └── .hud-menu-c
        └── .hud-menu-line × N (1.5em × 2px, transition 0.4s ease-back)
```

**Ouro pro SINAPSE:**
- HUD persistente é a "cinta" do brand — sempre visível, sempre orientando
- Scroll indicator com line + dot na esquerda (alternativa ao progress bar superior)
- Menu hamburger custom com lines animadas (bezier overshoot ao abrir/fechar)

## CUSTOM CURSOR (mix-blend-mode: difference)
```css
.cursor-w {
  z-index: 2000;
  mix-blend-mode: difference;     /* INVERTE cor sob cursor */
  position: fixed;
}
.cursor-dot {
  background: rgba(255,255,255,0.6);
  width: 2em; height: 2em;
  transition: background-color 0.4s;
}
```
- Cursor branco semi-transparente
- `mix-blend-mode: difference` faz ele virar preto sob fundo branco e vice-versa
- Width/height variável (provável JS escala em hover de links)

## ORB SYSTEM (decorative blob fixo)
```css
.orb-w  { position: fixed; inset: 0; z-index: -2; display: flex; align-items: center; justify-content: center; }
.orb    { width: 80vh; height: 80vh; border-radius: 100%; z-index: -1; }
.orb.is-pre { width: 3.3em; transform: translate(8em, 8.1em); }
```
- Blob circular gigante (80vh) atrás de tudo, fixo no centro do viewport
- Variants `.is-pre` ficam pré-posicionados (small + offset)
- 8 elementos `.orb*` no DOM = múltiplos blobs decorativos
- Provável: gradient ou solid, com motion via JS (Lenis link?) gerando paralax sutil

## GRID 12-COL (sistema rigoroso)
```css
.grid-main { grid-template-columns: repeat(12, 1fr); gap: 1.25em; }
.grid-main.is-home-hero { grid-template-rows: 1fr min-content 1fr min-content 1fr min-content 1fr; }
.grid-main.hg-grid { grid-template-columns: repeat(8, 1fr); transform: scale(1); }
```
- 13 instâncias de `.grid-main` na página
- Variants: 12-col padrão, 8-col, 7-col footer, etc.
- `.is-home-hero` usa rows alternadas `1fr / min-content` = espaçamento ritmado vertical

## DECORATIVE ELEMENTS COUNT
| Tipo | Qtd |
|---|---|
| `.hud-*` | 48 |
| `.orb-*` | 8 |
| `[class*="line"]` | **195** (!) — dividers, borders, decorative lines em todo lugar |
| `.grid-main` | 13 |
| `.cursor-*` | 2 |

## KEYFRAMES (apenas 3 puros — resto é transition + JS)
```css
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes loopGradient { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } }
@keyframes pulse { 0%,100% { transform: scale3d(1,0,1); } 50% { transform: scale3d(1,1,1); opacity: 1; } }
```
- `loopGradient`: pulsar opacity (provável use no orb ou hud-line)
- `pulse`: scale-Y zero→full→zero (efeito de batimento/respiração vertical) — usar em loading/CTA
- Resto da motion vem via Webflow IX2 + Lenis + JS scroll listeners

## SCREENSHOTS PROGRESSIVOS
- `scroll-00.webp` — hero (orb central + HUD em todos cantos + cursor visível)
- `scroll-15.webp` — primeira seção pós-hero
- `scroll-30.webp` — meio superior
- `scroll-50.webp` — meio
- `scroll-70.webp` — meio inferior  
- `scroll-90.webp` — pré-footer

## LIÇÕES ACIONÁVEIS PRA SINAPSE

### 1. Adotar sistema HUD persistente
Criar componente `<BrandHUD />` que paira sobre todas pages com:
- Top-left: logo SINAPSE
- Top-right: nav minimal (3-4 links + theme toggle)
- Bottom-left: scroll indicator (line + dot animado conforme scroll Y)
- Bottom-right: menu trigger
- z-index 1000, fixed, mix-blend-mode awareness

### 2. Custom cursor com mix-blend-mode: difference
Trivial em CSS + JS de 30 linhas. Já no plano FASE A — confirmar implementação:
```js
window.addEventListener('mousemove', e => {
  cursor.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
});
```

### 3. Sistema de easings disciplinado (2 curves)
Adicionar a `tailwind.config.ts`:
```js
transitionTimingFunction: {
  'out-quart': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  'back-overshoot': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
}
```
Banir `ease`, `ease-in-out` defaults. Apenas as duas.

### 4. Adicionar Lenis (smooth scroll)
```bash
npm i lenis
```
```js
const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
```
Mudança qualitativa enorme em todas pages. ROI altíssimo.

### 5. Orb decorativo (já temos `.float-rotate`, expandir)
- Criar `.orb-deco` 80vh circular fixed atrás de tudo
- Variants `.orb-pure-black`, `.orb-bone`, etc.
- Sutil opacity 0.05-0.15 com mix-blend-mode

### 6. SplitType para text reveals
```bash
npm i split-type
```
```js
import SplitType from 'split-type';
const split = new SplitType('h1', { types: 'chars' });
gsap.from('.char', { y: 50, opacity: 0, stagger: 0.02 });
```
Headings revelando char-by-char no scroll = signature animation.

### 7. Grid de 195 lines decorativas
Não é exagero — é sistema. Cada section tem `<hr class="divider-tech" />` ou borders sutis. Usar variáveis:
```css
--line-hairline: 1px solid color-mix(in srgb, currentColor 8%, transparent);
```

### 8. Carrossel de 14 videos clips loop em hero
Padrão "showreel grid" — 14 videos rodando simultaneamente em mosaico. Cabe em hero do brandbook tipo "applications gallery". Considerar pra `/brandbook/showcase`.
