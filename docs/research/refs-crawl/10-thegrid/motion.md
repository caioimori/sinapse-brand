# THE GRID — MOTION/PATTERNS/EFFECTS deep extraction

## STACK DE ANIMAÇÃO
- **Vue.js / Nuxt** (`data-v-{hash}` scoped attrs em todas regras)
- **Lenis** ✅ (smooth scroll)
- NO GSAP, NO Framer (Vue native transitions + CSS transitions)
- **5 videos** Supabase Storage (loop autoplay muted) — hero/sections
- **1 canvas** 837×1007 (provavelmente HUD/dashboard visualization)
- **72 SVGs**

## EASINGS (3 — 2 quase idênticos!)
| Curve | Equivalente | Uso |
|---|---|---|
| `cubic-bezier(0.17, 0.84, 0.44, 1)` | ease-out-quart | **DEFAULT — usado em 90% transitions** |
| `cubic-bezier(0.165, 0.84, 0.44, 1)` | ease-out-quart (variant 1 dígito!) | image fade |
| `cubic-bezier(0.4, 0, 0.2, 1)` | Material ease | scroll bg lines hover |

**Lição:** TheGrid escolheu UM easing primário (`0.17, 0.84, 0.44, 1`) e usa em quase tudo. Disciplina.

## PADRÃO #1 — HEADER HIDE ON SCROLL DOWN
```css
#header {
  transition: transform 0.6s cubic-bezier(0.17, 0.84, 0.44, 1);
}
#header.is--hidden {
  transform: translateY(-120%);
}
```
JS adiciona/remove `.is--hidden` baseado em scroll direction. Header esconde scrollando pra baixo, aparece scrollando pra cima. Padrão "smart nav".

## PADRÃO #2 — MENU SLIDE FROM RIGHT
```css
.menu {
  transition: transform 0.6s cubic-bezier(0.17, 0.84, 0.44, 1),
              background-color 0.3s cubic-bezier(0.17, 0.84, 0.44, 1);
}
.menu.is--hidden { transform: translate(120%); }
```
Menu lateral entra pela direita 0.6s. Estado hidden translate 120% (fora do viewport com folga).

## PADRÃO #3 — AUTO-PLAY ACCORDION (TOC video player aesthetic)

```css
.accordion-item__progress {
  transform: scaleX(0);
  transform-origin: 0 50%;
}
.accordion-item__progress.is--playing {
  animation: progress-fill var(--progress-duration, 12s) linear forwards;
}
@keyframes progress-fill {
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}
```

**Genius:** accordion abre, progress bar enche em 12s, depois passa pro próximo item. Funciona como auto-rotate carousel/TOC. Tempo configurável via CSS var `--progress-duration`.

Bonus: linhas top/bottom do item separam quando abre:
```css
.accordion-item__line--top    { transform: translateY(-50%); }  /* sobe */
.accordion-item__line--bottom { transform: translateY(50%); }   /* desce */
```
Ao abrir, linhas se afastam revelando conteúdo (efeito "abrir cortina").

## PADRÃO #4 — LINK UNDERLINE REVEAL (clean)
```css
.link:not(.btn):not(button)::before {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 100%; height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: 0 50%;
  transition: transform 0.8s cubic-bezier(0.17, 0.84, 0.44, 1);
}
.link:hover::before { transform: scaleX(1); }
```
Underline animado via pseudo-element + scaleX. **0.8s** de duração = devagar/luxury (não 200ms snappy). Confirma nosso `.link-reveal` e propõe duration mais lenta.

## PADRÃO #5 — BUTTON FILL VIA `::before`
```css
.btn { transition: color 0.3s, background-color 0.3s; }
.btn::before { transition: background-color 0.3s; }
```
Padrão clássico: button tem pseudo-element absolute inset-0 que vira o background "fill" no hover. Vue scoped por `[data-v-]`.

## PADRÃO #6 — DASHBOARD/SCROLL BG WITH LINES (TRADING TICKER)
```css
.scroll .bg                                  { transform: translate(-50%, -50%); }
.scroll .bg line {
  transition: opacity 0.15s, stroke-width 0.15s;
}
```
SVG background com `<line>` elements. JS provavelmente faz hover/scroll-driven mudança de stroke-width das linhas individuais → efeito "data ticker" / "trading chart" responsivo ao mouse. **0.15s = MUITO rápido** (snappy data feel).

## PADRÃO #7 — DASHBOARD DOTS DESATURATED
```css
.dashboard__dots { filter: grayscale() brightness(0.7); }
```
Pattern de dots com filter pra dessaturar — pattern fica como "low-fi background texture" ao invés de competir visualmente.

## PADRÃO #8 — LAYER ROTATIONS (4 corners pattern)
```css
.dashboard__layer--bottom-right { transform: rotate(180deg); }
```
Mesma ideia do NYO corner brackets — 1 SVG de layer, replicado em 4 cantos via rotate.

## PADRÃO #9 — `.fiber-label` (data label flutuante)
```css
.label-container .fiber-label {
  transform: translate(-50%, -50%);
  transition: color 0.2s, background 0.2s;
}
```
Label centralizada absolute com transition de cor e background. "fiber" sugere conexões em network visualization — provavelmente hover sobre nodes mostra label de dados.

## PADRÃO #10 — FOOTER PATTERN INVERTED
```css
.footer__compact .pattern { transform: translateY(-50%); }
```
Pattern decorativo translateY -50% (provavelmente clipa metade) — efeito de "pattern cortado pelo limite do footer", criando fade visual.

## PADRÃO #11 — MENU POPUP HOVER SCALE
```css
.menu-popup__social {
  transition: background, color, transform 0.3s;
}
.menu-popup__social:hover { transform: scale(1.08); }
```
Social icons no menu fazem scale 1.08 on hover. Subtle but effective.

## PADRÃO #12 — IMAGE FADE LONG (0.8s)
```css
.utility .cn .im .img {
  transition: opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}
```
Imagens fade in 0.8s = devagar, premium.

## SCREENSHOTS PROGRESSIVOS
- `scroll-00.webp` — hero "You build. We handle supply." + MENU_
- `scroll-20.webp` — 1ª section após hero
- `scroll-45.webp` — middle (provável dashboard/scroll bg ticker)
- `scroll-70.webp` — pré-footer

## LIÇÕES ACIONÁVEIS PRA SINAPSE

### A. Smart nav (hide-on-scroll-down)
```js
// hooks/useSmartNav.ts
let lastY = 0;
window.addEventListener('scroll', () => {
  const dir = window.scrollY > lastY ? 'down' : 'up';
  document.body.classList.toggle('nav-hidden', dir === 'down' && window.scrollY > 200);
  lastY = window.scrollY;
});
```
```css
header { transition: transform 0.6s cubic-bezier(0.17, 0.84, 0.44, 1); }
.nav-hidden header { transform: translateY(-120%); }
```
Polish massivo. Já cabe em FASE A.

### B. Auto-play accordion com progress bar
Para sections "Como funciona / Etapas":
```html
<details class="acc-item is--playing" style="--progress-duration: 12s">
  <summary>01. Diagnóstico</summary>
  <div class="acc-item__progress"></div>
  <div class="acc-item__content">...</div>
</details>
```
JS rotaciona `.is--playing` entre items. Visual: progress bar horizontal embaixo de cada item enche, depois passa pro próximo. **MUITO mais engajante que accordion estático.**

### C. Single easing system (`0.17, 0.84, 0.44, 1` ou `0.16, 1, 0.3, 1`)
**Eleger UM easing primário** para 90% das transitions. Disciplina = signature. Adicionar 1 alternativa pra overshoot e pronto.

### D. Link underline 0.8s (não 200ms)
Reescrever `.link-reveal` com **duration 800ms** ao invés de 300ms. Sensação luxury vs cheap.

### E. Button fill via `::before` pseudo
Padronizar:
```css
.btn { position: relative; overflow: hidden; }
.btn::before {
  content: ''; position: absolute; inset: 0;
  background: currentColor; opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.17, 0.84, 0.44, 1);
  z-index: -1;
}
.btn:hover::before { opacity: 1; }
```

### F. Dashboard/scroll bg com SVG lines + JS hover
Para hero ou section "Why SINAPSE": SVG full-bleed atrás com `<line>` elements:
```html
<svg class="scroll-bg">
  {Array.from({length: 50}).map(i => <line x1="0" y1={i*20} x2="100%" y2={i*20} />)}
</svg>
```
JS escuta mouse + adiciona stroke-width 2 nas lines próximas. Cria efeito "ticker" trading.

### G. Pattern com `filter: grayscale() brightness(0.7)`
Para nossos `.pattern-grid`, `.pattern-dots`: aplicar filter quando background pra dessaturar. Pattern vira textura, não foco.

### H. Image fade 0.8s
```css
.img-reveal { transition: opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1); }
.img-reveal.is-loaded { opacity: 1; }
```

### I. Menu lateral slide com `is--hidden` modifier
Em vez de toggling `.open` confuso, usar BEM-style `.menu` (default visible) + `.menu.is--hidden` (translate 120%). Estado positivo + modifier negativo = mais clean.
