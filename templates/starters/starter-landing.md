# starter-landing (LP / site institucional — bone-first)

> Suíte modular de 14 blocos `lp-*` (hero → problema → solução → comparativo → pricing → garantia → faq → cta → footer), nav scroll-spy, SectionHeader canônico, CtaPill como **variant** (não string copiada 6x), FAQ zero-JS, scroll-reveal de UM mecanismo, módulo SEO/GEO.
>
> **Base forense:** `caio__sinapse-club` (referência) + `caio__sinapse-lp-mindloop` + `soier__snps` + `soier__smart-plastica-sp` + `soier__colegio-modulo`.
> **Correções aplicadas vs. fonte:** H2 de seção fora da dead-zone (escala fluida que pula 32-48px); CTA como variant `cta` no `buttonVariants`, não string longa copiada em hero/nav/pricing/cta; UM mecanismo de reveal (não 2 engines); container fluido, sem `max-w-7xl`.

---

## 1. Stack exata e versões

| Pacote | Versão | Papel |
|---|---|---|
| `next` | `16.2.x` | App Router, RSC |
| `react` / `react-dom` | `19.2.x` | |
| `tailwindcss` + `@tailwindcss/postcss` | `4.1.x` | CSS-first |
| `@sinapse/brand-tokens` | `1.0.0` | tokens (**bone** default) |
| `framer-motion` | `12.x` | text-reveal, entrada |
| `lenis` | `1.3.x` | smooth scroll desktop-only (opcional) |
| `class-variance-authority` | `0.7.x` | CtaPill variant |
| `clsx` + `tailwind-merge` | `2.x` | `cn()` |
| `lucide-react` | `0.4xx` | ícones |

---

## 2. Estrutura de pastas

```
starter-landing/
├── app/
│   ├── globals.css            # @import "@sinapse/brand-tokens"
│   ├── layout.tsx             # <html data-theme="bone"> + fonts
│   ├── page.tsx               # monta a suíte lp-*
│   ├── robots.ts
│   ├── sitemap.ts
│   └── llms.txt/route.ts
├── components/
│   ├── lp/
│   │   ├── lp-nav.tsx         # scroll-spy + backdrop-blur
│   │   ├── lp-hero.tsx
│   │   ├── lp-problema.tsx
│   │   ├── lp-solucao.tsx
│   │   ├── lp-comparativo.tsx
│   │   ├── lp-pricing.tsx     # plano popular invertido
│   │   ├── lp-garantia.tsx
│   │   ├── lp-faq.tsx         # <details> zero-JS
│   │   ├── lp-cta.tsx
│   │   └── lp-footer.tsx
│   └── ui/
│       ├── button.tsx         # cva c/ variant "cta"
│       ├── section-header.tsx
│       ├── container.tsx
│       └── reveal.tsx         # UM mecanismo
├── lib/
│   ├── cn.ts
│   ├── content.ts             # copy/dados data-driven
│   └── seo.ts                 # jsonld helper
├── next.config.ts
├── postcss.config.mjs
└── package.json
```

---

## 3. Dependências (`package.json` relevante)

```json
{
  "name": "starter-landing",
  "scripts": { "dev": "next dev --turbopack", "build": "next build", "start": "next start" },
  "dependencies": {
    "next": "16.2.0",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "@sinapse/brand-tokens": "workspace:*",
    "framer-motion": "^12.0.0",
    "lenis": "^1.3.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "lucide-react": "^0.469.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.7.0"
  }
}
```

---

## 4. Arquivos-base essenciais (snippets reais)

### 4.1 `app/layout.tsx` (bone default)

```tsx
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-jetbrains", display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="bone" className={`${sora.variable} ${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### 4.2 `components/ui/button.tsx` (variant `cta` — fim do CTA copiado 6x)

```tsx
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 font-medium transition-all duration-[var(--dur-fast)] ease-[var(--ease-smooth)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
  {
    variants: {
      variant: {
        primary: "rounded-[var(--radius)] bg-foreground text-background px-5 h-11 hover:-translate-y-0.5",
        outline: "rounded-[var(--radius)] border border-[var(--border-strong)] px-5 h-11 hover:bg-[var(--subtle)]",
        // CTA assinatura: pill com chip-seta group-hover:rotate-45 — UMA fonte
        cta: "rounded-[var(--radius-pill)] bg-foreground text-background pl-6 pr-2 h-12 hover:-translate-y-0.5",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, children, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant }), className)} {...props}>
    {children}
    {variant === "cta" && (
      <span className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-background/15 transition-transform duration-[var(--dur-fast)] group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </span>
    )}
  </button>
));
Button.displayName = "Button";
```

### 4.3 `components/ui/section-header.tsx` (canônico — H2 pula dead-zone)

```tsx
export function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-[42ch]">
      <p className="eyebrow">{eyebrow}</p>
      {/* var(--text-h2) = clamp(1.75rem,4.5vw,3.25rem) — topo escapa 32-48px */}
      <h2 className="mt-3 font-display font-light tracking-[-0.02em] text-balance"
          style={{ fontSize: "var(--text-h2)", lineHeight: 1.05 }}>
        {title}
      </h2>
      {description && <p className="mt-4 text-[var(--muted-fg)]" style={{ fontSize: "var(--text-body)" }}>{description}</p>}
    </div>
  );
}
```

### 4.4 `components/ui/container.tsx` (3 variants fluidos)

```tsx
import { cn } from "@/lib/cn";
const widths = {
  narrow:  "w-[var(--container-narrow)]",
  default: "w-[var(--container-default)]",
  wide:    "w-[var(--container-wide)]",
} as const;
export function Container({ size = "default", className, children }:
  { size?: keyof typeof widths; className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto px-[var(--container-pad)]", widths[size], className)}>{children}</div>;
}
```

### 4.5 `components/ui/reveal.tsx` (UM mecanismo — IntersectionObserver)

```tsx
"use client";
import { useEffect, useRef } from "react";
export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("is-visible"); io.unobserve(el); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} data-reveal style={{ animationDelay: `${delay}s` }}>{children}</div>;
}
```

### 4.6 `components/lp/lp-nav.tsx` (scroll-spy + backdrop-blur)

```tsx
"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const SECTIONS = ["hero", "problema", "solucao", "pricing", "faq"];

export function LpNav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    SECTIONS.forEach((id) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);
  return (
    <header className={cn(
      "fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--dur-base)]",
      scrolled && "border-b border-[var(--border)] bg-background/70 backdrop-blur-lg"
    )}>
      <nav className="mx-auto flex h-14 w-[var(--container-default)] items-center justify-between px-[var(--container-pad)]">
        <span className="eyebrow">[ SNPS ]</span>
        <ul className="flex gap-6">
          {SECTIONS.map((s) => (
            <li key={s}>
              <a href={`#${s}`} className={cn(
                "relative font-mono text-[var(--text-meta)] uppercase tracking-wider transition-colors",
                active === s ? "text-foreground" : "text-[var(--muted-fg)]"
              )}>{s}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

### 4.7 `components/lp/lp-pricing.tsx` (plano popular invertido B&W)

```tsx
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { Container } from "@/components/ui/container";
import { PLANS } from "@/lib/content";
import { cn } from "@/lib/cn";

export function LpPricing() {
  return (
    <section id="pricing" className="py-24">
      <Container>
        <SectionHeader eyebrow="Planos" title="Escolha seu plano" />
        <div className="mt-12 grid gap-px bg-[var(--border)] sm:grid-cols-3 rounded-[var(--radius-xl)] overflow-hidden">
          {PLANS.map((p) => (
            <div key={p.name} className={cn(
              "flex flex-col p-8",
              p.popular ? "bg-foreground text-background" : "bg-card"
            )}>
              {p.popular && <span className="eyebrow !text-background/60">Mais popular</span>}
              <h3 className="mt-2 font-display text-2xl font-light">{p.name}</h3>
              <p className="mt-4 font-display font-light tabular-nums" style={{ fontSize: "clamp(3rem,5vw,4rem)" }}>{p.price}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0" /> {f}</li>
                ))}
              </ul>
              <Button variant={p.popular ? "outline" : "cta"} className="mt-8 w-full">Assinar</Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

### 4.8 `components/lp/lp-faq.tsx` (zero-JS `<details>`)

```tsx
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FAQS } from "@/lib/content";

export function LpFaq() {
  return (
    <section id="faq" className="py-24">
      <Container size="narrow">
        {FAQS.map((f) => (
          <details key={f.q} className="group border-b border-[var(--border)] py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-light">
              {f.q}
              <Plus size={18} className="transition-transform group-open:rotate-45" />
            </summary>
            <p className="mt-3 text-[var(--muted-fg)]" style={{ fontSize: "var(--text-body)" }}>{f.a}</p>
          </details>
        ))}
      </Container>
    </section>
  );
}
```

### 4.9 `lib/content.ts` (data-driven — copy desacoplada)

```ts
export const PLANS = [
  { name: "Start", price: "R$ 97", popular: false, features: ["Até 3 projetos", "Suporte por e-mail"] },
  { name: "Pro",   price: "R$ 297", popular: true,  features: ["Projetos ilimitados", "Suporte prioritário", "Automações"] },
  { name: "Scale", price: "Sob consulta", popular: false, features: ["SLA dedicado", "Onboarding white-glove"] },
] as const;

export const FAQS = [
  { q: "Posso cancelar quando quiser?", a: "Sim, sem multa e sem fidelidade." },
  { q: "Tem período de teste?", a: "7 dias de garantia incondicional." },
] as const;
```

### 4.10 `app/page.tsx` + `app/llms.txt/route.ts`

```tsx
import { LpNav } from "@/components/lp/lp-nav";
import { LpHero } from "@/components/lp/lp-hero";
import { LpPricing } from "@/components/lp/lp-pricing";
import { LpFaq } from "@/components/lp/lp-faq";
import { LpFooter } from "@/components/lp/lp-footer";

export default function Page() {
  return (
    <main>
      <LpNav /><LpHero /><LpPricing /><LpFaq /><LpFooter />
    </main>
  );
}
```
```ts
// app/llms.txt/route.ts — GEO first-class
export function GET() {
  return new Response(`# SINAPSE\n> Plataforma X.\n\n## Planos\n- Start, Pro, Scale\n`, {
    headers: { "Content-Type": "text/plain" },
  });
}
```

---

## 5. Comando de scaffold

```bash
pnpm create next-app starter-landing --ts --app --no-tailwind --use-pnpm
cd starter-landing
pnpm add @tailwindcss/postcss tailwindcss framer-motion lenis \
  class-variance-authority clsx tailwind-merge lucide-react
# @sinapse/brand-tokens (workspace) + @import no globals.css
# setar <html data-theme="bone">; criar postcss.config.mjs
pnpm dev
```
