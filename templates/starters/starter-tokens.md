# starter-tokens (core — `@sinapse/brand-tokens`)

> A dependência de TODOS os outros starters. Tokens B&W SINAPSE em CSS vars + bridge Tailwind v4 `@theme`, dual-theme bone/vanta, motion pack e identity layer. Zero runtime, zero `tailwind.config`.
>
> **Base forense:** `caio__sinapse-brand` (globals.css de 1157 linhas, PODADO) + `caio__sinapse-crm` (tokens dark-first) + `soier__claude-code-push-guide` (versão inline B&W 100% fiel).
> **Correções aplicadas vs. fonte:** removido `void #000` como superfície, deduplicados keyframes/easings (CSS x Tailwind), removidas utilities mortas `auto-*`/`hud-*`, removidos tokens órfãos (`--color-muted-foreground`, `--text-primary-rgb`).

---

## 1. Stack exata e versões

| Camada | Versão | Nota |
|---|---|---|
| Tailwind CSS | `4.1.x` | CSS-first via `@theme`, sem `tailwind.config.js` |
| `@tailwindcss/postcss` | `4.1.x` | único plugin PostCSS |
| `postcss` | `8.5.x` | |
| (opcional) `next/font` | via Next 16 | Sora · Inter · JetBrains Mono variable |

Zero JS de runtime. É um pacote de **3 arquivos CSS** consumível por qualquer projeto (Next, Astro, Vite ou HTML estático inline).

---

## 2. Estrutura de pastas

```
@sinapse/brand-tokens/
├── package.json
├── src/
│   ├── index.css            # entrypoint: @import dos 3 + @theme bridge
│   ├── tokens.css           # grayscale 13-step + semânticos bone/vanta + funcionais isolados
│   ├── motion.css           # easings + durations + keyframes + prefers-reduced-motion
│   └── identity.css         # grain SVG + crosshair + frame + patterns
├── doc/                     # kit Bb* (opcional, gera brandbook navegável)
│   ├── ColorSwatch.tsx
│   ├── TokenRow.tsx
│   ├── TypeScaleRow.tsx
│   └── token-export.tsx
└── README.md
```

---

## 3. `package.json`

```json
{
  "name": "@sinapse/brand-tokens",
  "version": "1.0.0",
  "type": "module",
  "exports": {
    ".": "./src/index.css",
    "./tokens": "./src/tokens.css",
    "./motion": "./src/motion.css",
    "./identity": "./src/identity.css"
  },
  "files": ["src", "doc"],
  "peerDependencies": {
    "tailwindcss": "^4.1.0"
  }
}
```

---

## 4. Arquivos-base essenciais

### 4.1 `src/tokens.css` — fundação B&W (grayscale + semânticos + dual-theme)

```css
/* ─────────────────────────────────────────────────────────────
   PRIMITIVOS — grayscale 13-step. Diferenciação por INTENSIDADE,
   nunca por hue. REGRA 02: preto mínimo #0A0A0A, NUNCA #000 puro.
   ───────────────────────────────────────────────────────────── */
:root {
  --gray-0:  #FAFAF7;  /* off-white card */
  --gray-1:  #F5F5F0;  /* bone — fg sobre dark / bg light */
  --gray-2:  #EFEFEB;
  --gray-3:  #EBEBE5;
  --gray-4:  #D4D4CE;
  --gray-5:  #999992;
  --gray-6:  #5C5C58;
  --gray-7:  #2E2E2B;
  --gray-8:  #1F1F1F;  /* surface-3 */
  --gray-9:  #1A1A1A;  /* surface-2 */
  --gray-10: #141414;  /* card vanta */
  --gray-11: #0A0A0A;  /* vanta — preto mínimo */

  /* FUNCIONAIS isolados — NUNCA como accent decorativo (rule 01) */
  --destructive: #FF3A2D;
  --success:     #00C853;

  /* RADIUS canônico */
  --radius-sm:   6px;
  --radius-md:   8px;   /* inputs */
  --radius-lg:   10px;  /* buttons — base */
  --radius-xl:   16px;  /* cards */
  --radius-2xl:  20px;  /* modais */
  --radius-pill: 9999px;

  /* CONTAINER fluido — NUNCA max-w-7xl hardcoded */
  --container-narrow:  min(92vw, 1024px);
  --container-default: min(92vw, 1440px);
  --container-wide:    min(92vw, 1680px);
  --container-pad: clamp(1.5rem, 4vw, 5rem);
}

/* ─────────────────────────────────────────────────────────────
   TEMA BONE (light-first) — default. Para guias/LP/brandbook.
   ───────────────────────────────────────────────────────────── */
:root,
[data-theme="bone"] {
  --background:     var(--gray-1);   /* #F5F5F0 */
  --foreground:     var(--gray-11);  /* #0A0A0A */
  --card:           var(--gray-0);   /* #FAFAF7 */
  --muted:          var(--gray-2);   /* #EFEFEB */
  --surface-2:      var(--gray-3);

  --border:         rgba(10, 10, 10, 0.10);
  --border-strong:  rgba(10, 10, 10, 0.20);
  --input:          rgba(10, 10, 10, 0.14);
  --ring:           rgba(10, 10, 10, 0.30);
  --muted-fg:       rgba(10, 10, 10, 0.55);
  --subtle:         rgba(10, 10, 10, 0.08);
}

/* ─────────────────────────────────────────────────────────────
   TEMA VANTA (dark-first) — default p/ SaaS app/dashboard.
   MESMO token-set, invertido.
   ───────────────────────────────────────────────────────────── */
[data-theme="vanta"] {
  --background:     var(--gray-11);  /* #0A0A0A */
  --foreground:     var(--gray-1);   /* #F5F5F0 */
  --card:           var(--gray-10);  /* #141414 */
  --muted:          var(--gray-9);   /* #1A1A1A */
  --surface-2:      var(--gray-8);   /* #1F1F1F */

  --border:         rgba(245, 245, 240, 0.10);
  --border-strong:  rgba(245, 245, 240, 0.20);
  --input:          rgba(245, 245, 240, 0.14);
  --ring:           rgba(245, 245, 240, 0.30);
  --muted-fg:       rgba(245, 245, 240, 0.55);
  --subtle:         rgba(245, 245, 240, 0.08);
}
```

### 4.2 `src/motion.css` — easings + durations + keyframes (deduplicado)

```css
:root {
  /* EASINGS nomeados canônicos */
  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);   /* DEFAULT */
  --ease-apple:  cubic-bezier(0.32, 0.72, 0, 1);
  --ease-back:   cubic-bezier(0.34, 1.56, 0.64, 1); /* overshoot */
  --ease-swift:  cubic-bezier(0.4, 0, 0.2, 1);

  /* DURATIONS nomeadas (cap ~500ms; 800ms+ é anti-pattern) */
  --dur-fast: 150ms;
  --dur-base: 250ms;
  --dur-slow: 400ms;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes grainShift {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -5%); } 30% { transform: translate(3%, -8%); }
  50% { transform: translate(-4%, 4%); }  70% { transform: translate(6%, 2%); }
  90% { transform: translate(-2%, 6%); }
}
@keyframes statusPulse {
  0%, 100% { opacity: 1; }  50% { opacity: 0.4; }
}
@keyframes linkReveal {
  from { transform: scaleX(0); transform-origin: left; }
  to   { transform: scaleX(1); transform-origin: left; }
}

/* reveal escalonado: data-reveal + delay tokens */
[data-reveal] { opacity: 0; transform: translateY(16px); }
[data-reveal].is-visible {
  animation: fadeUp var(--dur-slow) var(--ease-smooth) forwards;
}
.reveal-delay-1 { animation-delay: 0.08s; }
.reveal-delay-2 { animation-delay: 0.16s; }
.reveal-delay-3 { animation-delay: 0.24s; }
.reveal-delay-4 { animation-delay: 0.32s; }
.reveal-delay-5 { animation-delay: 0.40s; }

/* REGRA 08 — sempre honrado */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  [data-reveal] { opacity: 1; transform: none; }
}
```

### 4.3 `src/identity.css` — grain + crosshair + frame + patterns

```css
/* GRAIN SVG inline data-uri (feTurbulence) ~5-6% — sempre ativo (rule 03/11) */
body::before {
  content: "";
  position: fixed; inset: 0;
  z-index: 9999; pointer-events: none;
  opacity: 0.055;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: grainShift 8s steps(10) infinite;
}

/* CROSSHAIR CSS-only (rule 11) */
.crosshair { position: relative; }
.crosshair::before, .crosshair::after {
  content: ""; position: absolute;
  background: var(--border-strong);
}
.crosshair::before { top: 50%; left: -6px; width: 12px; height: 1px; }
.crosshair::after  { left: 50%; top: -6px; width: 1px; height: 12px; }

/* FRAME de bordas verticais (chassi de documento) */
.frame {
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
}

/* PATTERNS — grid/dots/crosshair/plus/rings/circuit */
.pattern-grid {
  background-image:
    linear-gradient(var(--subtle) 1px, transparent 1px),
    linear-gradient(90deg, var(--subtle) 1px, transparent 1px);
  background-size: 64px 64px;
}
.pattern-dots {
  background-image: radial-gradient(var(--subtle) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

### 4.4 `src/index.css` — entrypoint + bridge `@theme` Tailwind v4

> O `@theme` apenas **referencia** os tokens — NUNCA redefine valor. Isto elimina o drift CSS x Tailwind visto em `sinapse-brand`.

```css
@import "tailwindcss";
@import "./tokens.css";
@import "./motion.css";
@import "./identity.css";

@theme inline {
  /* COR — só referencia var(), zero hex */
  --color-background:    var(--background);
  --color-foreground:    var(--foreground);
  --color-card:          var(--card);
  --color-muted:         var(--muted);
  --color-muted-fg:      var(--muted-fg);
  --color-border:        var(--border);
  --color-ring:          var(--ring);
  --color-destructive:   var(--destructive);
  --color-success:       var(--success);

  /* TIPOGRAFIA — 3 famílias canônicas (rule 04) */
  --font-display: var(--font-sora), "Sora", system-ui, sans-serif;
  --font-sans:    var(--font-inter), "Inter", system-ui, sans-serif;
  --font-mono:    var(--font-jetbrains), "JetBrains Mono", monospace;

  /* ESCALA FLUIDA — PULA a dead-zone 32-48px por construção (rule 05).
     Modelo colegio-modulo: h2 salta direto pra h1, nunca cai em 32-48px. */
  --text-eyebrow: 0.6875rem;                          /* 11px */
  --text-meta:    0.625rem;                            /* 10px */
  --text-body:    0.9375rem;                           /* 15px */
  --text-h3:      clamp(1.25rem, 2vw, 1.625rem);       /* 20-26px */
  --text-h2:      clamp(1.75rem, 4.5vw, 3.25rem);      /* 28-52px (escapa dead-zone no topo) */
  --text-h1:      clamp(3.25rem, 7vw, 5.5rem);         /* 52-88px */
  --text-display: clamp(3.75rem, 11vw, 11rem);         /* 60-176px */

  /* RADIUS / MOTION bridge */
  --radius:        var(--radius-lg);
  --ease-smooth:   var(--ease-smooth);
  --ease-apple:    var(--ease-apple);
}

/* Eyebrow mono assinatura — prefixo // */
.eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-eyebrow);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted-fg);
}
.eyebrow::before { content: "// "; opacity: 0.5; }
```

---

## 5. Comando de scaffold

```bash
# como pacote local de workspace (pnpm)
mkdir -p packages/brand-tokens/src && cd packages/brand-tokens
pnpm init
# criar src/{index,tokens,motion,identity}.css com o conteúdo acima

# consumir em qualquer app do monorepo:
#   app/globals.css  ->  @import "@sinapse/brand-tokens";
#   <html data-theme="vanta">  (ou "bone")
```

Para projeto único sem monorepo: copiar `src/*.css` para `app/` e `@import "./tokens.css"` no topo do `globals.css`.

---

## 6. Checklist de validação (gate)

- [ ] Nenhum `#000` puro como superfície — mínimo `#0A0A0A` (rule 02)
- [ ] Nenhuma headline em 32-48px (rule 05) — escala pula a faixa
- [ ] `@theme` só referencia `var()`, nunca redefine hex (sem drift)
- [ ] Grain ativo no `body` (identity layer, rule 03)
- [ ] `prefers-reduced-motion` honrado (rule 08)
- [ ] Container fluido — sem `max-w-7xl`
- [ ] Accent cromático ausente (B&W absoluto, rule 01)
