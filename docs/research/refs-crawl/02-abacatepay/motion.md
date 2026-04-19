# ABACATEPAY — MOTION/PATTERNS/EFFECTS (quick)

## STACK
- Next.js + Tailwind + **DaisyUI** (CSS vars OKLCH)
- Sem GSAP/Lenis/Framer detectados
- 0 canvases · 0 videos
- 3 marquees CSS-only

## PADRÕES NOTÁVEIS (DaisyUI built-in)

### #1 — `animate-marquee` + `animate-marquee-reverse`
```css
.animate-marquee         { animation: 30s linear infinite marquee; }
.animate-marquee-reverse { animation: 30s linear infinite marquee-reverse; }
```
Bidirectional marquee 30s linear — testimonials Twitter cards.

### #2 — DaisyUI keyframes ÚTEIS (componentes prontos)
```css
@keyframes button-pop      { 0%{scale .98} 40%{scale 1.02} 100%{scale 1} }
@keyframes modal-pop       { 0%{opacity 0} }
@keyframes toast-pop       { 0%{scale .9 opacity 0} → scale 1 }
@keyframes skeleton        { bg-position 150% → -50% }  /* shimmer loader */
@keyframes checkmark       { bg-position-y 5px→-2px→0 }  /* checkbox tick */
@keyframes radiomark       { box-shadow inset transition */
@keyframes rating-pop      { translateY -0.125em→0 }  /* star rating */
@keyframes progress-loading{ bg-position-x 50%→-115% }
```

**Lição:** DaisyUI tem componentes prontos com micro-interactions já assinadas. Se SINAPSE usar shadcn/ui (mais provável), criar **library de keyframes equivalentes**.

## LIÇÕES SINAPSE
- Skeleton shimmer loader (background-position trick) — adicionar como utility
- Toast-pop / modal-pop / button-pop — micro-interactions padrão pra UI feedback
- Bidirectional marquee 30s — confirmar formato pra testimonials/logos carousel
