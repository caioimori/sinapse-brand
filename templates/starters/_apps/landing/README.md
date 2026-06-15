# starter-landing

Boilerplate de LP/site institucional SINAPSE — tema bone (light-first), tokens B&W, suíte de blocos `lp-*` modulares.

## Setup

```bash
pnpm install   # ou npm install
pnpm dev       # http://localhost:3000
pnpm build
pnpm typecheck
```

## Estrutura

```
app/
  tokens/          # Brand-tokens self-contained (cópia local)
  layout.tsx       # html[data-theme="bone"] + Sora/Inter/JetBrains
  globals.css      # @import ./tokens/index.css
  page.tsx         # monta os blocos lp-*
  robots.ts        # SEO
  sitemap.ts       # SEO
  llms.txt/route.ts # GEO first-class

components/
  ui/              # Container, SectionHeader, Button (variant cta), Reveal
  lp/              # LpNav, LpHero, LpPricing, LpFaq, LpFooter

lib/
  cn.ts            # clsx + tailwind-merge
  content.ts       # copy/dados data-driven (PLANS, FAQS)
```

## Blocos disponíveis

| Bloco | Descrição |
|---|---|
| `LpNav` | Scroll-spy + backdrop-blur sticky |
| `LpHero` | Hero display assimétrico + pattern-grid |
| `LpPricing` | 3 planos, popular invertido B&W |
| `LpFaq` | Accordion zero-JS via `<details>` |
| `LpFooter` | Rodapé minimalista |

Para adicionar blocos: crie `components/lp/lp-{nome}.tsx` e importe em `app/page.tsx`.

## Customizar copy

Edite `lib/content.ts` — planos e FAQs são data-driven, sem hardcode nos componentes.

## Regras de design (não-negociáveis)

- B&W absoluto — sem accent cromático (rule 01)  
- Preto mínimo `#0A0A0A`, nunca `#000` puro (rule 02)  
- Grain SVG 5% ativo via `identity.css` (rule 03)  
- Headlines fora da dead-zone 32-48px (rule 05)  
- Container fluido via `--container-*` tokens  
- `prefers-reduced-motion` honrado (rule 08)  
- UM mecanismo de reveal (`Reveal` via `IntersectionObserver`)  
- CTA como variant `"cta"` no Button — nunca string copiada  
