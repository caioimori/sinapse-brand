# STORY FOUNDATION — MOTION/PATTERNS/EFFECTS deep extraction

## STACK DE ANIMAÇÃO
- **Next.js + Tailwind 100%** (transforms via CSS vars `--tw-*`)
- **tailwindcss-animate** (Radix UI compat — `enter`/`exit` keyframes com vars)
- **Lenis** ✅ (smooth scroll, `html.lenis`)
- **SplitType** ✅
- **Group/named groups** Tailwind 3+ (`group/article`, `group/navlink`, `group/navtrigger`)
- **Radix UI data-state** anims (`group[data-state="open"]:rotate-180`)
- **2 canvases**: 960×455 (decorative) + **1440×1440** (HUGE — `protocol-canvas`, ring graph IP visualization)
- **NO GSAP** — provavelmente Framer Motion ou animations Tailwind nativas

## EASINGS (7 — biblioteca completa Tailwind)
| Curve | Equivalente | Uso |
|---|---|---|
| `cubic-bezier(0.4, 0, 0.2, 1)` | ease (Material) | default |
| `cubic-bezier(0.4, 0, 0.6, 1)` | ease-in-out | pulse |
| `cubic-bezier(0.45, 0, 0.55, 1)` | ease-in-out-quad | reveals |
| `cubic-bezier(0.16, 1, 0.3, 1)` | ease-out-expo | hero entrance |
| `cubic-bezier(0.33, 1, 0.68, 1)` | ease-out-quad | UI |
| `cubic-bezier(0.5, 1, 0.89, 1)` | ease-out-quad | subtle |
| `cubic-bezier(0.25, 1, 0.5, 1)` | ease-out-quart | smooth |

**Tailwind defaults** + custom `0.16, 1, 0.3, 1` (in/out-expo style) é o "luxury easing" 2026 — quase imperceptível, mas tudo flui.

## PADRÃO #1 — KEYFRAMES SISTEMA `enter`/`exit` (tailwindcss-animate)

```css
@keyframes enter {
  0% {
    opacity: var(--tw-enter-opacity, 1);
    transform: translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0)
               scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1))
               rotate(var(--tw-enter-rotate, 0));
  }
}
@keyframes exit { /* mirror with --tw-exit-* vars */ }
```

**Genius:** 1 keyframe configurável via CSS vars. Todo Radix `<DialogContent>`, `<DropdownMenu>`, `<Popover>` usa essa fórmula. Você define em CSS quanto vai translatar/rotar/escalar via `--tw-enter-*` data attrs.

**Lição pra SINAPSE:** já temos `tailwindcss-animate` se usarmos shadcn/ui. Aproveitar essas 2 keyframes pra TODO componente que entra/sai de tela.

## PADRÃO #2 — `mask-fade-top` (gradient fade)
```css
.mask-fade-top { mask-image: linear-gradient(transparent 0px, rgb(0,0,0)); }
```
Aplica fade-out no topo de elementos. Usado em listas longas, marquees, hero. Trivial.

**Variants pra SINAPSE:**
```css
.mask-fade-top    { mask-image: linear-gradient(180deg, transparent, black 12%); }
.mask-fade-bottom { mask-image: linear-gradient(0deg, transparent, black 12%); }
.mask-fade-x     { mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); }
```

## PADRÃO #3 — GROUP HOVER SISTEMA (Tailwind 3+)

```html
<article class="group/article">
  <img class="transition-transform group-hover/article:scale-105">
  <h3 class="group-hover/article:translate-x-1">Título</h3>
</article>

<a class="group/navlink">
  <span class="block w-0 group-hover/navlink:scale-x-100 origin-left transition-transform"></span>
</a>
```

- `group/{name}` cria contexto nomeado
- Children usam `group-hover/{name}:utility`
- Permite **múltiplos groups aninhados** (article DENTRO de navlink, ambos com hover independente)
- Mata hand-rolled hover state JS

**Pra SINAPSE:** adotar nomenclatura `group/card`, `group/link`, `group/cta`, `group/badge`. Reescrever todos hover states via essa convenção.

## PADRÃO #4 — RADIX DATA-STATE ANIMATIONS

```css
group[data-state="open"]:rotate-180   /* chevron flip ao abrir accordion */
group[data-state="open"]:scale-x-100  /* underline expand ao open */
```

Ao invés de JS toggle classes, Radix UI já expõe `data-state="open|closed"` em todo trigger. Style direto via Tailwind.

## PADRÃO #5 — `transform-gpu` (force GPU compositing)
```css
.transform-gpu { transform: translate3d(...); }
```
Força layer GPU pra transforms 3D. Performance crítica em scroll-heavy pages.

**Pra SINAPSE:** adicionar `transform-gpu` em todos elements que terão transforms animadas.

## PADRÃO #6 — KEYFRAMES `scroll` (marquee)
```css
@keyframes scroll {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}
```
Marquee CSS-only (sem GSAP). Trivial.

## PADRÃO #7 — CANVAS 1440×1440 (Protocol Visualization)

`.protocol-canvas > div` confirma que tem um WebGL canvas SUPERGRANDE (1440×1440 = 2MP) renderizando a "IP graph" / ring rings concêntricos da Story Foundation.

**Implicação:** alta-fidelidade requer canvas, não SVG. Para SINAPSE quando precisarmos de "data visualization signature" (ex: rings de skills/agents/squads), considerar canvas WebGL via three.js ou ogl.

## VIEWBOX SVG SAMPLE (variedade)
- `0 0 24 24` × 10 — icon system (Lucide-like)
- `0 0 200 100` × 4 — wide infographic shapes
- `0 0 401 92` × 2 — logo
- `0 0 512 512` × multiplas — Font Awesome tier
- `0 0 41 41` × 1 — square decorative

## SCREENSHOTS PROGRESSIVOS
- `scroll-00.webp` — hero "AI-native Infrastructure for IP" + canvas/rings inicial
- `scroll-25.webp` — segundo state
- `scroll-50.webp` — middle (provável protocol-canvas grande)
- `scroll-75.webp` — pré-footer

## LIÇÕES ACIONÁVEIS PRA SINAPSE

### A. Adotar `tailwindcss-animate` plugin
```bash
npm i tailwindcss-animate
```
```js
// tailwind.config.ts
plugins: [require('tailwindcss-animate')]
```
Ganha automaticamente: `animate-in`, `animate-out`, `fade-in`, `slide-in-from-top`, `zoom-in`, etc. Sintaxe declarativa pra entrance/exit.

### B. Mask gradients sistema (`.mask-fade-*`)
Adicionar a `globals.css` ou criar plugin:
```css
@layer utilities {
  .mask-fade-t { mask-image: linear-gradient(180deg, transparent, #000 12%); }
  .mask-fade-b { mask-image: linear-gradient(0deg, transparent, #000 12%); }
  .mask-fade-l { mask-image: linear-gradient(90deg, transparent, #000 8%); }
  .mask-fade-r { mask-image: linear-gradient(270deg, transparent, #000 8%); }
  .mask-fade-x { mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
  .mask-fade-y { mask-image: linear-gradient(180deg, transparent, #000 8%, #000 92%, transparent); }
}
```
Aplicar em hero videos, marquees, listas longas. Polish enorme com 6 utilities.

### C. Convenção `group/{name}`
Refatorar nosso `magnet`, `link-reveal` pra usar group named:
```html
<a class="group/link">
  <span class="group-hover/link:translate-x-1 transition-transform duration-300">→</span>
  <span class="absolute -bottom-px h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:scale-x-100"></span>
</a>
```

### D. Radix UI + data-state anims
Toda vez que SINAPSE usar Accordion/Dialog/Popover/Dropdown:
```css
.chevron { @apply transition-transform group-data-[state=open]:rotate-180; }
.underline-anim { @apply origin-left scale-x-0 transition-transform group-data-[state=open]:scale-x-100; }
```

### E. `transform-gpu` em todo motion element
Adicionar à classe base:
```html
<div class="transform-gpu transition-transform">...</div>
```

### F. Sistema de easings 3-tier (escolher)
Não copiar 7 easings da Story. Escolher 3:
```js
transitionTimingFunction: {
  smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',     // default — out-expo luxury
  swift: 'cubic-bezier(0.4, 0, 0.2, 1)',        // Material UI
  back: 'cubic-bezier(0.34, 1.56, 0.64, 1)',    // overshoot
}
```

### G. Considerar Framer Motion (ou Motion One)
Para animations declarativas em React Server Components (Next.js 15):
- Framer Motion 11+ com `motion()` em SC funciona
- Alternativa lightweight: Motion One (~3kb)
- Alternativa free: GSAP (já recomendado na NYO)

**Decisão:** se SINAPSE for muito declarativo + componentizado → **Framer Motion 11**. Se hero/landing-heavy → **GSAP + ScrollTrigger**.
