---
status: 100% confidence — chrome-devtools live extraction
date: 2026-04-19
sources: 9 refs deep-crawled (CSS rules, keyframes, easings, libs, canvases, scroll states)
purpose: catálogo acionável de animations/patterns/effects/motions/artistic capabilities pra fonte da verdade SINAPSE
---

# CATÁLOGO MESTRE — Motion · Patterns · Effects · Shaders

## ÍNDICE

- [§1 STACK CANÔNICO](#1-stack-canônico-recomendado)
- [§2 EASINGS DISCIPLINADOS](#2-easings-disciplinados-3-curves-no-mais)
- [§3 PADRÕES DE MOTION](#3-30-padrões-de-motion-confirmados)
- [§4 SISTEMAS ARQUITETURAIS](#4-sistemas-arquiteturais)
- [§5 SHADER WALLPAPERS](#5-shader-wallpapers-webgl-capability)
- [§6 CHECKLIST PRA FASE A](#6-checklist-pra-fase-a)

---

## 1. STACK CANÔNICO RECOMENDADO

Análise revelou o stack 2026 padrão entre os tier-S (Off+Brand, NYO, Story, TheGrid, Stripe, Overlay):

| Layer | Lib | Adoção entre refs |
|---|---|---|
| **Smooth scroll** | **Lenis** | 6/9 (Off+Brand, NYO, Story, TheGrid, Overlay, Flagship) |
| **Animations** | **GSAP + ScrollTrigger** | 4/9 (Off+Brand, NYO, Overlay, +) |
| **Text fragmentation** | **SplitType** | 6/9 |
| **Carousels** | **Swiper** ou **Splide** | 3/9 |
| **Component anims** | **tailwindcss-animate** (Radix-compat) | Story Foundation |
| **WebGL shaders** | Custom + WebGL2 / Three.js / OGL | Stripe (1392×768), Overlay (3× 300×150), Off+Brand (914×914), NYO (2 canvases), Story (1440×1440), TheGrid (1) |

### Decisão SINAPSE
```bash
npm i lenis gsap split-type
npm i tailwindcss-animate
# opcional pra shader wallpapers:
npm i three  # ou ogl (mais leve)
```

**Anti-pattern:** Webflow IX2 puro (Off+Brand) ou Qode framework (Flagship) = vendor lock-in. Manter Next.js + libs open.

---

## 2. EASINGS DISCIPLINADOS (3 curves no máximo)

Análise comparativa:

| Ref | # easings | Disciplina |
|---|---|---|
| Off+Brand | 2 | ⭐⭐⭐ Excelente |
| NYO | 3 | ⭐⭐⭐ Excelente |
| TheGrid | 3 (2 idênticos!) | ⭐⭐⭐ Excelente |
| Overlay | 2 | ⭐⭐⭐ Excelente |
| Story | 7 | ⭐⭐ Bom (Tailwind defaults) |
| Stripe | (CORS) | — |
| AbacatePay | 15+ | ⭐ DaisyUI bagunça |
| Flagship | **50+** | ❌ Anti-pattern Qode |

### Sistema canônico SINAPSE — 3 easings finais

```ts
// tailwind.config.ts
transitionTimingFunction: {
  // 90% das transitions
  smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',      // ease-out-expo (Story luxury)

  // overshoots ocasionais
  back: 'cubic-bezier(0.34, 1.56, 0.64, 1)',     // ease-out-back

  // snappy data UI (hover stroke-width, ticker)
  swift: 'cubic-bezier(0.4, 0, 0.2, 1)',         // Material standard
}
```

Banir `ease`, `ease-in-out` defaults. Usar APENAS `smooth | back | swift`.

---

## 3. 30 PADRÕES DE MOTION CONFIRMADOS

### TIPOGRAFIA / TEXT

| # | Padrão | Origem | Implementação |
|---|---|---|---|
| 1 | **SplitType char-by-char reveal** | Off+Brand, NYO, Overlay | `gsap.from('.char', { y:50, opacity:0, stagger:0.02 })` |
| 2 | **Highlight sweep marker** | Flagship | `bg-size 0%→100% horizontal` em palavra-chave |
| 3 | **Underline reverse-and-play** | Flagship | scaleX 1→0 [37%], swap origin, 0→1 [100%] |
| 4 | **Underline 3 variants (lr/rl/cs)** | Overlay | 3 transform-origin diferentes |
| 5 | **Underline 0.8s slow** | TheGrid | duration 800ms = luxury feel |
| 6 | **`//` prefix + `MENU_` underscore** | NYO + TheGrid | system pra eyebrows/CTAs |

### CURSOR / POINTER

| # | Padrão | Origem | Implementação |
|---|---|---|---|
| 7 | **Mix-blend-mode: difference cursor** | Off+Brand | div fixed + JS mousemove + blend difference |
| 8 | **`.is-dif` modifier em labels** | NYO | aplica blend difference em tags/badges (sem custom cursor) |
| 9 | **Magnetic button (compress + overlay explode)** | NYO | `:hover { scale 0.85 }` + child `{ scale 1.4 }` |

### SCROLL / SECTIONS

| # | Padrão | Origem | Implementação |
|---|---|---|---|
| 10 | **Smart nav hide-on-scroll-down** | TheGrid | toggle `.is--hidden { translateY(-120%) }` |
| 11 | **Sticky title + cards trocando** | NYO | `.sticky-title-wrapper` + `.is-sticky` |
| 12 | **Sticky progress bar horizontal** | NYO | `.sticky-features__progress { scaleX(var(--p)) }` |
| 13 | **Auto-play accordion (TOC video player)** | TheGrid | progress bar fills 12s, advance to next |
| 14 | **Lenis smooth scroll** | Off+Brand, NYO, Story, TheGrid, Overlay | `new Lenis({ duration: 1.2 })` |
| 15 | **Scroll-pin sections** | NYO (sticky) | GSAP ScrollTrigger pin |
| 16 | **MWG_effect016 (horizontal scroll-driven)** | NYO | translate-X media on vertical scroll |

### HUD / NAVIGATION SYSTEM

| # | Padrão | Origem | Implementação |
|---|---|---|---|
| 17 | **HUD persistente 4-cantos** | Off+Brand | `.hud-w fixed inset-0 z-1000` + brand/nav/scroll/menu |
| 18 | **Corner border brackets (4 rotates)** | NYO | 1 SVG L-shape + rotate 0/90/180/-90 nos 4 cantos |
| 19 | **Menu lateral slide from right** | TheGrid | `transform: translate(120%)` → 0 |
| 20 | **Hamburger lines bezier overshoot** | Off+Brand | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` |

### DATA / DECORATIVE

| # | Padrão | Origem | Implementação |
|---|---|---|---|
| 21 | **Hora local + GMT vivo** | NYO | `setInterval` updating clock display |
| 22 | **Diagonal divider rotated 15°** | NYO | `.divider { transform: rotate(15deg) }` em stat rows |
| 23 | **SVG border-draw (stroke-dashoffset)** | Flagship | `stroke-dashoffset: 0 → length` no scroll |
| 24 | **Pattern desaturated (`grayscale + brightness 0.7`)** | TheGrid | filter em background patterns |
| 25 | **3D perspective cards** | Overlay | `perspective(800px)` + JS mousemove tilt |

### MASKS / EFFECTS

| # | Padrão | Origem | Implementação |
|---|---|---|---|
| 26 | **`mask-fade-{t/b/l/r/x/y}` utilities** | Story | `mask-image: linear-gradient(...)` 6 directions |
| 27 | **Video gradient fade lateral** | NYO | mask-image em hero videos pra "flutuar" |
| 28 | **Subtle video scale 1.05** | Overlay | elimina edge artifacts + respiração |

### MICRO-INTERACTIONS

| # | Padrão | Origem | Implementação |
|---|---|---|---|
| 29 | **Group/{name} hover system** | Story | Tailwind 3+ named groups |
| 30 | **`hideAfter5s` keyframes hack** | Overlay | UI state via animation delay, sem JS timer |

---

## 4. SISTEMAS ARQUITETURAIS

### 4.1 — `mix-blend-mode: difference` SISTEMA (NYO)
```css
.tag, .badge, .eyebrow, .meta-label {
  &.is-dif { mix-blend-mode: difference; color: white; }
}
.navbar.is-dif { mix-blend-mode: difference; }
```
Aplica blend em labels/tags/nav. Conforme scroll passa sobre Vanta vs Bone, labels invertem cor automaticamente. **Mata theme toggle pros labels.**

### 4.2 — Corner Bracket System (NYO)
```css
.corner-bracket { /* L-shape SVG */ }
.corner-bracket.tr { transform: rotate(90deg); }
.corner-bracket.bl { transform: rotate(-90deg); }
.corner-bracket.br { transform: rotate(180deg); }
```
Aesthetic HUD/scope. Aplicar em cards, modal containers, hero do brandbook.

### 4.3 — HUD Persistente (Off+Brand)
```html
<div class="hud-w fixed inset-0 z-1000 pointer-events-none">
  <div class="hud-brand-w pointer-events-auto">{logo}</div>
  <div class="hud-nav-w pointer-events-auto">{nav}</div>
  <div class="hud-scroll-w">{progress indicator}</div>
  <div class="hud-menu-w pointer-events-auto">{menu trigger}</div>
</div>
```

### 4.4 — Sistema de Easings (3-tier disciplinado)
Definido §2.

### 4.5 — `mask-fade-*` Utilities (Story)
```css
@layer utilities {
  .mask-fade-t  { mask-image: linear-gradient(180deg, transparent, #000 12%); }
  .mask-fade-b  { mask-image: linear-gradient(0deg, transparent, #000 12%); }
  .mask-fade-l  { mask-image: linear-gradient(90deg, transparent, #000 8%); }
  .mask-fade-r  { mask-image: linear-gradient(270deg, transparent, #000 8%); }
  .mask-fade-x  { mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
  .mask-fade-y  { mask-image: linear-gradient(180deg, transparent, #000 8%, #000 92%, transparent); }
}
```

### 4.6 — Sistema `.is--hidden` BEM modifier (TheGrid)
```css
.menu          { transform: translate(0); transition: transform 0.6s smooth; }
.menu.is--hidden { transform: translate(120%); }
```
Default = visible, modifier = hidden. Mais legível que `.menu.open` ou `.menu--active`.

---

## 5. SHADER WALLPAPERS WEBGL CAPABILITY

### Por que adicionar à fonte da verdade

User flagged: existe skill no Claude Design pra criar **shader wallpapers interativos** (mouse/click responsive). Análise dos sites confirma: **TODOS os tier-S premium usam WebGL canvases**:

| Site | Canvases WebGL detectados |
|---|---|
| Stripe | 1392×768 (WebGL2 — gradient hero famoso) |
| Story Foundation | 1440×1440 (canvas — protocol viz) + 960×455 |
| Overlay | 1920×681 (WebGL hero) + 3× 300×150 (WebGL2 small shaders) |
| NYO | 1920×911 + 604×884 |
| Off+Brand | 914×914 |
| TheGrid | 837×1007 |

**Conclusão:** WebGL fragment shaders são o "wallpaper signature" 2026. SINAPSE precisa dessa capability na fonte da verdade.

### Plano: 5 shader wallpapers SINAPSE B&W

Criar `app/brandbook/13.0-shaders/` com 5 wallpapers interativos cada um inspirado no DNA SINAPSE (B&W, sem accent cromático):

| # | Wallpaper | Interação | Inspiração |
|---|---|---|---|
| 1 | **Vanta Noise Field** | mouse → distorts noise pattern | Stripe gradient B&W |
| 2 | **Bone Grid Ripple** | click → ripple expanding circular wave | classic shader demo |
| 3 | **Sora Flow Field** | mouse → particles flow toward cursor | flow field navigation |
| 4 | **Ascii Matrix Rain** | scroll → rain speed | The Matrix homage B&W |
| 5 | **HUD Crosshair Live** | mouse → crosshair tracks + ring expands | Off+Brand HUD aesthetic |

### Arquitetura técnica

```
app/brandbook/13.0-shaders/
├── page.tsx                    # gallery dos 5
├── components/
│   ├── ShaderCanvas.tsx        # base canvas WebGL2 + uniforms (mouse, time, resolution)
│   ├── shaders/
│   │   ├── noise-field.glsl
│   │   ├── grid-ripple.glsl
│   │   ├── flow-field.glsl
│   │   ├── ascii-rain.glsl
│   │   └── hud-crosshair.glsl
│   └── useMouseUniform.ts
└── README.md                   # como aplicar wallpaper em qualquer page SINAPSE
```

**Lib base:** Three.js OU OGL (~5KB minified, mais leve). OGL preferido pra performance B&W shaders sem 3D.

```bash
npm i ogl
```

```tsx
// ShaderCanvas.tsx (estrutura mínima)
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import fragShader from './shaders/noise-field.glsl';

export function ShaderCanvas({ shader }: { shader: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const renderer = new Renderer({ canvas: ref.current!, dpr: 2 });
    const gl = renderer.gl;
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: '#version 300 es\nin vec2 position; void main() { gl_Position = vec4(position, 0.0, 1.0); }',
      fragment: shader,
      uniforms: {
        uTime: { value: 0 }, uMouse: { value: [0, 0] },
        uResolution: { value: [innerWidth, innerHeight] }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });
    function loop(t: number) {
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    window.addEventListener('mousemove', e => {
      program.uniforms.uMouse.value = [e.clientX / innerWidth, 1 - e.clientY / innerHeight];
    });
  }, [shader]);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}
```

### Reutilização: Shader como background de qualquer page

```tsx
// app/brandbook/page.tsx
<ShaderCanvas shader={noiseFieldShader} />
<div className="relative z-10">
  {/* conteúdo brandbook */}
</div>
```

Wallpaper vira **prop opcional de `<PageLayout>`** — qualquer página SINAPSE pode adotar shader bg via 1 linha.

### Documento dedicado a criar próximo

`docs/research/refs-crawl/SHADER-WALLPAPERS-PLAN.md` — spec detalhado dos 5 shaders + exemplos GLSL completos. **Escopo separado pra não inflar essa fonte da verdade.**

---

## 6. CHECKLIST PRA FASE A (atualizado pós-motion-crawl)

### Originais já planejados (do plano v2)
- ✅ Loading counter 00→100→SINAPSE (NYO style)
- ✅ Custom cursor blend difference (Off+Brand)
- ✅ Símbolos `+ ● △ ⁂` em meta labels
- ✅ Hora local + LIVE no footer (NYO)
- ✅ Scroll progress bar superior
- ✅ `.pattern-plus` + `.pattern-rings`
- ✅ Patterns opacity 2x em Bone

### Novos adicionados pós-motion-crawl
- ⭐ **Lenis smooth scroll** (`npm i lenis` + raf loop) — 5min, mudança qualitativa enorme
- ⭐ **3 easings disciplinados** (`smooth | back | swift`) — refator tailwind config
- ⭐ **`.is-dif` modifier** em labels/tags (NYO mix-blend system)
- ⭐ **Corner bracket system** (4 rotates de 1 SVG)
- ⭐ **Smart nav hide-on-scroll-down** (TheGrid)
- ⭐ **HUD persistente 4-cantos** (Off+Brand) — estrutural
- ⭐ **`mask-fade-*` utilities** (6 direções)
- ⭐ **`group/{name}` Tailwind 3+** — refator hover states
- ⭐ **`MENU_` underscore + `//` prefix** em CTAs/eyebrows
- ⭐ **Magnetic button (compress + overlay explode)**
- ⭐ **Diagonal divider 15deg** em stat rows
- ⭐ **SplitType char reveals** em headings principais

### Novos sistemas pra FASE B+ (não FASE A — bigger lift)
- 🔵 **Auto-play accordion progress** (TheGrid) — pra `/metodologia`
- 🔵 **Sticky title + cards trocando** (NYO) — pra `/components`
- 🔵 **3D perspective cards** (Overlay) — pra cards principais
- 🔵 **Highlight sweep marker** (Flagship) — em manifesto/quotes
- 🔵 **SVG border-draw** (logo entrance + frame reveals)
- 🔵 **5 Shader Wallpapers WebGL** — `/brandbook/13.0-shaders` nova rota

---

## DOCUMENTOS RELACIONADOS

| Doc | Propósito |
|---|---|
| `00-SYNTHESIS.md` | Síntese geral 10 refs (typography/color decisions) |
| `MOTION-PATTERNS-CATALOG.md` | **Este doc** — motion/patterns/effects catalog |
| `01-sp3/data.md` ... `10-thegrid/data.md` | Dados visuais por site |
| `04-itsoffbrand/motion.md` ... `09-story-foundation/motion.md` | Motion deep extraction por site |
| `SHADER-WALLPAPERS-PLAN.md` (próximo) | Spec dos 5 shaders SINAPSE |
