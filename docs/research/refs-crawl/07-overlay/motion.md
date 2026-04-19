# OVERLAY — MOTION/PATTERNS/EFFECTS deep extraction

## STACK
- **GSAP** + **Lenis** + **SplitType** + **Splide** (carousel)
- **6 canvases** (1 WebGL hero 1920×681 + 3× 300×150 WebGL2 small shaders + 2× 2d render)

## EASINGS (2 luxury)
- `cubic-bezier(0.075, 0.82, 0.165, 1)` — ease-out-circ
- `cubic-bezier(0.215, 0.61, 0.355, 1)` — ease-out-cubic

## PADRÕES

### #1 — 3 underline variants (lr/rl/cs)
```css
.hover-underline-lr::after { transform-origin: 0 50%; transform: scaleX(0); transition: transform 0.4s cubic-bezier(0.215,0.61,0.355,1); }
.hover-underline-lr:hover::after { transform: scaleX(1); }
/* + rl com origin: 100% 50%, + cs com origin: 50% 50% */
```
3 direções de reveal — cabe em SINAPSE como variantes do `.link-reveal`.

### #2 — 3D perspective cards
```css
.vision-block__card { transform: perspective(800px); }
```
Aplicar perspective base; JS adiciona rotateX/Y on mousemove → tilt 3D.

### #3 — Progress bar 4s (similar ao TheGrid 12s)
```css
.hiw-progress.is-animating::before { transition: width 4s linear; }
```

### #4 — `hideAfter5s` / `showAfter5s` (state via animation)
```css
@keyframes hideAfter5s { 0%,99.99%{display:block} 100%{display:none} }
```
Genius hack: usar `animation` pra criar delay sem JS timeout. Útil pra success messages, form states.

### #5 — Color blocks com diagonal offset
```css
.style-guide__home-hero.is--yellow { transform: translate(25%, 25%); }
.style-guide__home-hero.is--blue   { transform: translate(-25%, -25%); }
```
Blocos de cor sobrepostos em diagonal (yellow desce-direita, blue sobe-esquerda) = composição abstrata estática.

### #6 — Video scale 1.05 (subtle zoom)
```css
.vision-block__pixel-embed video { transform: scale(1.05); }
```
Vídeo levemente zoom = elimina edge artifacts + dá sensação de "respiração".

## SCREENSHOTS
- `scroll-00.webp` — hero
- `scroll-40.webp` — middle (vision blocks)

## LIÇÕES SINAPSE
- Adotar 3 underline variants como utility (`link-lr`, `link-rl`, `link-cs`)
- 3D perspective cards via `perspective(800px)` + JS mousemove tilt
- Progress timed bars (4-12s) pra accordion/sections auto-rotate
- `hideAfter*s` keyframes hack pra UI state transitions sem JS timer
