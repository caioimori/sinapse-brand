# aiox Token Export — Complete (copy-paste ready)

Source: `https://brand.aioxsquad.ai/brandbook/token-export`
Crawl date: 2026-04-18

## Distribuição model (GENIAL — replicar)

> Copy · Paste · Ship
> Pick a theme below — Lime or Gold
> Click Copy CSS to copy the full variable block
> Paste into your project's index.css (or globals.css)
> All shadcn/ui components will automatically adopt the AIOX visual
> Compatible with Tailwind CSS v3 + v4, shadcn/ui, and Lovable. Values are plain hex/rgba — no oklch dependency.

**Insight SINAPSE**: o sistema tem uma página dedicada a **exportar tokens prontos pra colar em qualquer projeto**, com toggle de tema. Valores em hex/rgba (sem dependência oklch pra compat). Replicar 100%.

---

## LIME THEME — Dark Cockpit

```css
/* AIOX Design System — Lime (Dark Cockpit) */
@layer base {
  :root {
    /* Palette */
    --background: #050505;
    --foreground: #F4F4E8;
    --primary: #D1FF00;
    --primary-foreground: #050505;
    --card: #0F0F11;
    --card-foreground: #F4F4E8;
    --popover: #0F0F11;
    --popover-foreground: #F4F4E8;
    --secondary: #1C1E19;
    --secondary-foreground: #F4F4E8;
    --muted: #111113;
    --muted-foreground: rgba(245, 244, 231, 0.4);
    --accent: rgba(209, 255, 0, 0.1);
    --accent-foreground: #D1FF00;
    --destructive: #EF4444;
    --destructive-foreground: #FFFFFF;
    --border: rgba(156, 156, 156, 0.15);
    --input: rgba(156, 156, 156, 0.2);
    --ring: rgba(209, 255, 0, 0.4);
    --radius: 0.5rem;

    /* Extended Palette */
    --surface: #0F0F11;
    --surface-alt: #1C1E19;
    --dim: rgba(245, 244, 231, 0.4);
    --blue: #0099FF;
    --flare: #ED4609;
    --error: #EF4444;
    --warning: #F59E0B;

    /* Font Stack */
    --font-sans: "Geist", "Inter", system-ui, sans-serif;
    --font-mono: "Geist Mono", "Roboto Mono", monospace;

    /* Motion */
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
    --ease-decel: cubic-bezier(0, 0, 0.2, 1);
  }
}
```

**Topos:**
- Accent: `#D1FF00` (lime-yellow)
- Surface: `#0F0F11`
- Text: `#F4F4E8`
- Border: `#9C9C9C26`

---

## GOLD THEME — Golden Guideline

```css
/* AIOX Design System — Gold (Golden Guideline) */
@layer base {
  :root {
    /* Palette */
    --background: #09090A;
    --foreground: #F4F4F4;
    --primary: #DDD1BB;
    --primary-foreground: #121213;
    --card: #151517;
    --card-foreground: #F4F4F4;
    --popover: #151517;
    --popover-foreground: #F4F4F4;
    --secondary: #1D1D20;
    --secondary-foreground: #F4F4F4;
    --muted: #18181B;
    --muted-foreground: rgba(244, 244, 244, 0.52);
    --accent: rgba(221, 209, 187, 0.1);
    --accent-foreground: #DDD1BB;
    --destructive: #EF4444;
    --destructive-foreground: #FFFFFF;
    --border: rgba(255, 255, 255, 0.09);
    --input: rgba(255, 255, 255, 0.12);
    --ring: rgba(221, 209, 187, 0.4);
    --radius: 0.5rem;

    /* Extended Palette */
    --surface: #151517;
    --surface-alt: #1D1D20;
    --dim: rgba(244, 244, 244, 0.52);
    --blue: #0099FF;
    --flare: #C4B7A2;
    --error: #EF4444;
    --warning: #F59E0B;

    /* Font Stack */
    --font-sans: "Geist", "Inter", system-ui, sans-serif;
    --font-mono: "Geist Mono", "Roboto Mono", monospace;

    /* Motion */
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
    --ease-decel: cubic-bezier(0, 0, 0.2, 1);
  }
}
```

**Topos:**
- Accent: `#DDD1BB` (beige/gold)
- Surface: `#151517`
- Text: `#F4F4F4`
- Border: `#FFFFFF17`

---

## Decisões confirmadas aiox (pra confrontar com SINAPSE)

| Dimensão | aiox |
|---|---|
| Fonte sans | Geist → Inter fallback |
| Fonte mono | Geist Mono → Roboto Mono fallback |
| Fonte display (home/hero) | **TASA Orbiter Display** (via fonts.cdnfonts.com) — não no export; é custom extra |
| Easings | 3 canônicos: spring (overshoot), smooth (ease-in-out), decel (out-only) |
| Durações | Não publicadas no export (provavelmente Tailwind defaults) |
| Raio default | 0.5rem (8px) |
| Dark-first 100% | Sim — não tem light mode |
| Themes | 2 (Lime + Gold) — ambos dark |
| Error/Warning | `#EF4444` / `#F59E0B` (Tailwind defaults) |
| Blue funcional | `#0099FF` (info?) |

## Implicação pro SINAPSE

Modelo do aiox é **dark-first com accent cromático forte** (lime ou gold). Diferente do que você quer (B&W radical sem accent). **Mas a ARQUITETURA do token-export é perfeita**: uma página que permite copiar tokens prontos em hex pra colar em qualquer projeto shadcn/Tailwind. Clonar essa mecânica pra SINAPSE — com nossas cores B&W.

**Decisão reforçada**: SINAPSE = radicalmente diferente do aiox visualmente (eles: dark+accent cromático; nós: B&W puro). Mas clonamos a ESTRUTURA (token export, numeração decimal, 3 pilares, voice cascade).
