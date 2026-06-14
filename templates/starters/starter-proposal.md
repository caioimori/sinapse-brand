# starter-proposal (deck / proposta interativa de cliente)

> Engine de slides fluida (reveal.js com `disableLayout` + 100dvh, OU nav vanilla teclado+swipe+progress) com slides **DATA-DRIVEN** (cliente/preço/copy em config, não hardcoded). Kit: pricing-card invertido, flow-canvas de funil, browser-mockup, stat/kpi. Paleta troca por cliente via `data-brand`.
>
> **Base forense:** `soier__riana-roma-proposal` (referência — reveal.js fluido) + `caio__proposta-igor-advocacia` + `soier__vascularte-apresentacao`.
> **Correção central vs. fonte:** conteúdo dos 20 slides era 100% hardcoded inline (1058 linhas JSX). Aqui é parametrizado via `proposal.config.ts` — o sistema é reaproveitável, o deck também.

---

## 1. Stack exata e versões

| Variante A (Next + reveal.js) | Versão |
|---|---|
| `next` | `16.2.x` (App Router) |
| `react` / `react-dom` | `19.2.x` |
| `reveal.js` | `5.1.x` (override fluido) |
| `tailwindcss` + `@tailwindcss/postcss` | `4.1.x` |
| `@sinapse/brand-tokens` | `1.0.0` |

| Variante B (single-file vanilla) | |
|---|---|
| HTML + CSS + JS vanilla | nav teclado/swipe/progress, ~50 linhas |

Use **A** quando precisa de RSC/dados/auth; **B** para entrega rápida zero-build a cliente.

---

## 2. Estrutura de pastas (variante A)

```
starter-proposal/
├── app/
│   ├── globals.css           # @import "@sinapse/brand-tokens" + reveal override
│   ├── layout.tsx
│   └── page.tsx              # <Deck config={proposal} />
├── components/
│   ├── deck.tsx              # shell reveal (load dinâmico + cleanup)
│   ├── slides/
│   │   ├── cover-slide.tsx
│   │   ├── pricing-slide.tsx
│   │   ├── flow-slide.tsx    # flow-canvas funil
│   │   └── mockup-slide.tsx  # browser-mockup
│   └── kit/
│       ├── pricing-card.tsx
│       ├── flow-canvas.tsx
│       ├── browser-mockup.tsx
│       └── stat.tsx
├── proposal.config.ts        # DADOS: cliente, preço, copy, slides[]
├── postcss.config.mjs
└── package.json
```

---

## 3. Dependências (`package.json` relevante)

```json
{
  "name": "starter-proposal",
  "scripts": { "dev": "next dev --turbopack", "build": "next build" },
  "dependencies": {
    "next": "16.2.0",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "@sinapse/brand-tokens": "workspace:*",
    "reveal.js": "^5.1.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.0",
    "tailwindcss": "^4.1.0",
    "@types/reveal.js": "^5.0.3",
    "typescript": "^5.7.0"
  }
}
```

---

## 4. Arquivos-base essenciais (snippets reais)

### 4.1 `proposal.config.ts` (DADOS — fim do hardcode)

```ts
export interface ProposalConfig {
  client: string;
  brand: string;                 // data-brand pra swap de paleta
  slides: Slide[];
  pricing: { name: string; price: string; popular: boolean; items: string[] }[];
  funnel: { id: string; label: string }[];
}
type Slide =
  | { type: "cover"; title: string; subtitle: string }
  | { type: "pricing" }
  | { type: "flow" }
  | { type: "mockup"; src: string; url: string };

export const proposal: ProposalConfig = {
  client: "Riana Roma",
  brand: "riana",
  slides: [
    { type: "cover", title: "Empilhamento de funil", subtitle: "Proposta SINAPSE" },
    { type: "flow" },
    { type: "pricing" },
  ],
  pricing: [
    { name: "Camada 1", price: "R$ 4k", popular: false, items: ["Setup", "Tráfego"] },
    { name: "Operação", price: "R$ 10k/mês", popular: true, items: ["Funil completo", "CRM", "Automações"] },
  ],
  funnel: [
    { id: "topo", label: "Topo" }, { id: "meio", label: "Meio" }, { id: "fundo", label: "Fundo" },
  ],
};
```

### 4.2 `app/globals.css` (reveal override fluido — disableLayout + 100dvh)

```css
@import "@sinapse/brand-tokens";
@import "reveal.js/dist/reveal.css";

/* OVERRIDE: abandona o auto-scale do reveal, usa layout fluido real */
.reveal .slides {
  width: 100vw !important; height: 100dvh !important;
  inset: 0 !important; transform: none !important;
  text-align: left !important;
}
.reveal .slides > section {
  width: 100vw !important; height: 100dvh !important;
  padding: clamp(2rem, 6vw, 6rem) !important;
  display: flex !important; flex-direction: column; justify-content: center;
  top: 0 !important;
}
/* color-inheritance tree: seção clara reescreve toda a árvore pra dark text */
.reveal section.bone { background: var(--bone, #F5F5F0); }
.reveal section.bone * { color: var(--vanta, #0A0A0A); }
```

### 4.3 `components/deck.tsx` (shell — load dinâmico + cleanup, guard double-init)

```tsx
"use client";
import { useEffect, useRef } from "react";
import type { ProposalConfig } from "@/proposal.config";
import { CoverSlide } from "./slides/cover-slide";
import { PricingSlide } from "./slides/pricing-slide";
import { FlowSlide } from "./slides/flow-slide";

export function Deck({ config }: { config: ProposalConfig }) {
  const ref = useRef<HTMLDivElement>(null);
  const deckRef = useRef<any>(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const Reveal = (await import("reveal.js")).default;
      if (!mounted || !ref.current || deckRef.current) return;   // guard double-init
      const deck = new Reveal(ref.current, {
        disableLayout: true, hash: false, controls: true, progress: true,
        transition: "fade", embedded: false,
      });
      await deck.initialize();
      deckRef.current = deck;
    })();
    return () => { mounted = false; deckRef.current?.destroy?.(); deckRef.current = null; };  // cleanup
  }, []);

  return (
    <div className="reveal" ref={ref} data-brand={config.brand}>
      <div className="slides">
        {config.slides.map((s, i) => {
          if (s.type === "cover")   return <CoverSlide key={i} {...s} client={config.client} />;
          if (s.type === "pricing") return <PricingSlide key={i} plans={config.pricing} />;
          if (s.type === "flow")    return <FlowSlide key={i} nodes={config.funnel} />;
          return null;
        })}
      </div>
    </div>
  );
}
```

### 4.4 `components/slides/cover-slide.tsx` (tipografia 100% clamp)

```tsx
export function CoverSlide({ title, subtitle, client }: { title: string; subtitle: string; client: string }) {
  return (
    <section>
      <p className="eyebrow">{subtitle}</p>
      <h1 className="font-display font-light tracking-[-0.035em] text-balance"
          style={{ fontSize: "clamp(3.75rem, 9vw, 9rem)", lineHeight: 0.92 }}>
        {title}
      </h1>
      <p className="mt-6 font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--muted-fg)]">
        Para {client}
      </p>
    </section>
  );
}
```

### 4.5 `components/kit/browser-mockup.tsx` (mostrar tela de produto sem screenshot)

```tsx
export function BrowserMockup({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--border)] overflow-hidden bg-card">
      <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[var(--border-strong)]" />
        <span className="h-3 w-3 rounded-full bg-[var(--border-strong)]" />
        <span className="h-3 w-3 rounded-full bg-[var(--border-strong)]" />
        <span className="ml-3 font-mono text-[var(--text-meta)] text-[var(--muted-fg)]">{url}</span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
```

### 4.6 `components/kit/flow-canvas.tsx` (funil de processo)

```tsx
export function FlowCanvas({ nodes }: { nodes: { id: string; label: string }[] }) {
  return (
    <div className="flex items-center gap-4">
      {nodes.map((n, i) => (
        <div key={n.id} className="flex items-center gap-4">
          <div className="rounded-[var(--radius-lg)] border-l-2 border-foreground bg-card px-5 py-4">
            <span className="font-mono text-[var(--text-meta)] text-[var(--muted-fg)]">0{i + 1}</span>
            <p className="mt-1 font-display font-light">{n.label}</p>
          </div>
          {i < nodes.length - 1 && <span className="text-[var(--muted-fg)]">→</span>}
        </div>
      ))}
    </div>
  );
}
```

### 4.7 `app/page.tsx`

```tsx
import { Deck } from "@/components/deck";
import { proposal } from "@/proposal.config";
export default function Page() { return <Deck config={proposal} />; }
```

---

## 5. Comando de scaffold

```bash
# Variante A (Next + reveal.js)
pnpm create next-app starter-proposal --ts --app --no-tailwind --use-pnpm
cd starter-proposal
pnpm add @tailwindcss/postcss tailwindcss reveal.js
pnpm add -D @types/reveal.js
# @import "@sinapse/brand-tokens" + reveal override no globals.css
# preencher proposal.config.ts com dados do cliente
pnpm dev

# Variante B (single-file): copiar template HTML com nav vanilla
#   (setas teclado Home/End + swipe touch + progress bar)
```

---

## 6. Para nova proposta de cliente

Editar **só** `proposal.config.ts` (client/brand/slides/pricing/funnel) e o `data-brand` aplica a paleta. Zero código tocado no shell ou nos slides.
