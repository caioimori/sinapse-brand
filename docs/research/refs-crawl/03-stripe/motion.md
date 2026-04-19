# STRIPE — MOTION/PATTERNS/EFFECTS deep extraction

## STACK DE ANIMAÇÃO
- **CSS rules CORS-blocked** (Stripe usa stylesheets com cross-origin protection)
- **2 canvases WebGL2** confirmados:
  - **1392×768 WebGL2** — hero "Stripe gradient wallpaper" (LEGENDÁRIO — fragment shader animado)
  - **300×150 WebGL2** — secundário (provável demo/feature card)
- **185 SVGs** inline
- **0 videos** (toda motion vem de WebGL + SVG + CSS)

## INSIGHT CRÍTICO — STRIPE GRADIENT É UM SHADER WEBGL2

O famoso "Stripe gradient" (curvas coloridas fluidas no hero) NÃO é CSS gradient nem GIF — é um **fragment shader WebGL2** rodando em canvas 1392×768.

Source público: o gradient é open-source, escrito por Kevin Hufnagl. Repo: github.com/kevinhufnagl/stripe-gradient — usa `whatamesh.js` (~2KB).

```js
import { Gradient } from './stripe-gradient.js';
const g = new Gradient();
g.initGradient('#gradient-canvas');
```

Mais 7 colors via CSS vars:
```html
<canvas id="gradient-canvas" data-transition-in
  style="--gradient-color-1: #ef008f;
         --gradient-color-2: #6ec3f4;
         --gradient-color-3: #7038ff;
         --gradient-color-4: #ffba27;">
</canvas>
```

**Para SINAPSE**: shader B&W com noise + grain animado seria o "wallpaper signature" do brandbook. Não cor, mas TEXTURA viva.

## SCREENSHOTS PROGRESSIVOS
- `scroll-00.webp` — hero gradient WebGL
- `scroll-20.webp` — bento cards
- `scroll-50.webp` — middle (carrossel produtos)

## LIÇÕES ACIONÁVEIS PRA SINAPSE

### A. **WALLPAPER SHADER WEBGL2** — CAPABILITY MASTER
Adicionar à fonte da verdade: skill de criar shader wallpapers interativos (mouse-responsive, click-responsive, scroll-responsive). Ver `docs/research/refs-crawl/SHADER-WALLPAPERS-PLAN.md` (próximo doc).

### B. Variable font weights extremos
sohne-var 1-1000 disponíveis. Stripe usa H1 weight 300. Nosso Sora variable: explorar pesos micro (380, 420, 480) ao invés de 400/700.

### C. SVG ao invés de imagens raster
185 SVGs = quase tudo é vetorial. SINAPSE deve ter brandbook 100% SVG (icons, illustrations, decoratives).
