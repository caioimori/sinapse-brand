# motion-pack — easings + durations + keyframes

## Propósito
Sistema de movimento nomeado e reutilizável: 4 easings + 3 durations + keyframes canônicos (fadeUp, reveal escalonado, grainShift, statusPulse, link-reveal). Um único arquivo, **deduplicado de CSS × Tailwind** (a auditoria achou keyframes/easings duplicados e divergentes em sinapse-brand). `prefers-reduced-motion` embutido (rule 08, sempre honrado).

## API (tokens)
Consumido via classe utilitária ou arbitrary value: `transition duration-[var(--dur-base)] ease-[var(--ease-apple)]`.

## Tokens canônicos (confirmados sinapse-brand/crm)
```css
@theme {
  /* EASINGS */
  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);    /* DEFAULT — out-expo luxury */
  --ease-apple:  cubic-bezier(0.32, 0.72, 0, 1);   /* Apple iOS spring */
  --ease-back:   cubic-bezier(0.34, 1.56, 0.64, 1);/* overshoot */
  --ease-swift:  cubic-bezier(0.4, 0, 0.2, 1);     /* Material — snappy data UI */

  /* DURATIONS (cap ~500ms; 800ms+ é anti-pattern) */
  --dur-fast: 150ms;
  --dur-base: 250ms;
  --dur-slow: 400ms;
}
```

## Keyframes canônicos
```css
/* fadeUp / reveal escalonado — reveal-delay-1..5 a 0.08s */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.reveal-delay-1 { animation-delay: 0.08s; }
.reveal-delay-2 { animation-delay: 0.16s; }
.reveal-delay-3 { animation-delay: 0.24s; }
.reveal-delay-4 { animation-delay: 0.32s; }
.reveal-delay-5 { animation-delay: 0.40s; }

/* text-reveal — hero headline (blur + translate) */
@keyframes text-reveal {
  from { opacity: 0; transform: translateY(20px); filter: blur(8px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
}

/* grainShift — grain SVG, steps(10), 8s (ver identity-layer) */
@keyframes grainShift {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-2%, -1%); }  30% { transform: translate(-1%, -2%); }
  50% { transform: translate(-2%,  2%); }  70% { transform: translate(-1%,  1%); }
  90% { transform: translate(-2%, 0); }
}

/* statusPulse — status-dot */
@keyframes statusPulse {
  0%, 100% { opacity: 1; }   50% { opacity: 0.35; }
}
.status-dot {
  width: 6px; height: 6px; border-radius: 9999px;
  background: var(--color-foreground);
  animation: statusPulse 2s var(--ease-swift) infinite;
}
```

## Microinteração-assinatura: link-reveal (underline origin-flip)
```css
/* underline que cresce da esquerda no hover, encolhe pra direita no leave */
.link-reveal { position: relative; }
.link-reveal::after {
  content: ''; position: absolute; left: 0; bottom: -2px;
  width: 100%; height: 1.5px; background: var(--color-foreground);
  transform: scaleX(0); transform-origin: right;
  transition: transform var(--dur-slow) var(--ease-smooth);
}
.link-reveal:hover::after { transform: scaleX(1); transform-origin: left; }
```

## prefers-reduced-motion (sempre embutido)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Uso em componente (Button, do sinapse-crm)
```tsx
'transition-[background,opacity,border-color,transform] duration-[var(--dur-base)] ease-[var(--ease-apple)]',
'active:scale-[0.98] active:duration-100',
```

## Aparece em
`caio__sinapse-crm`, `caio__sinapse-brand`, `caio__sinapse-club` (`--ease-craft/spring`, `--duration-*`), `caio__apse-os` (ADR-008 `--ease-swift`), `soier__colegio-modulo` (`--ease-brand`/`--ease-out-expo`).

## Dívidas a corrigir antes de promover
- **Deduplicar** keyframes/easings entre CSS e tailwind.config (drift em sinapse-brand v3).
- Eliminar easings legados back-compat (`--ease-spring`/`--ease-decel` apontando pra outros).
- Padronizar reveal on-scroll em **UM** mecanismo (ver [`nav.md`](./nav.md) / scroll-reveal): hoje há 2 engines divergentes em crm e lp-mindloop.
