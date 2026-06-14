# DESIGN.md — Landing Page / Site Institucional

> Reference: `caio__sinapse-club`. Default **bone** (light-first).
> Repos: `caio__sinapse-club`, `caio__sinapse-lp-mindloop`, `soier__colegio-modulo`, `soier__vascularte-site`, `soier__snps`, `soier__smart-plastica-sp`, `soier__sp3site`, `soier__fdconcept`, `soier__claude-code-push-guide`, `soier__sinapse-setup-guide`, `caio__caioimori-pages`.
> Herda os tokens canonicos SINAPSE (B&W). Clientes trocam o alias via `[data-brand]`.

## O que define este arquetipo

Suite modular de blocos `lp-*`: hero -> problema -> solucao -> comparativo -> pricing -> garantia -> faq -> cta -> footer. Nav com scroll-spy (IntersectionObserver) + backdrop-blur on scroll + underline animado. `SectionHeader` canonico (eyebrow mono + H2 fluido clamp + descricao) e `CtaPill` assinatura repetido. Motion: reveal on-scroll + smooth scroll (Lenis/GSAP) opcional desktop-only + `prefers-reduced-motion`.

## Cor — bone default

Fundacao SINAPSE em light-first:
- background `#F5F5F0`, foreground `#0A0A0A`, card `#FAFAF7`, muted `#EFEFEB`.
- **`--overlay` tokenizado** (`rgba(10,10,10,0.55)`) — substitui os `bg-black/10..60` espalhados em dialogs/sheets/modais do club.
- Preto minimo `#0A0A0A`. Nunca `#000` puro como superficie (corrige snps/growth, carrosseis body).
- Accent cromatico fica no cliente, via `[data-brand]`, nunca no DS SINAPSE.

### Rationale
LP institucional respira melhor em light premium quente; bone da leveza editorial e contraste forte pra CTAs invertidos (foreground bg). O mesmo token-set vira vanta por `data-theme` quando a marca pede dark.

## Tipografia — H2 fora da dead-zone

A divida #1 do arquetipo: H2 de secao em `text-4xl` (36px) no mobile, dentro da dead-zone. Corrigido:

| Papel | Tamanho |
|---|---|
| Hero | `clamp(3.5rem, 9vw, 8rem)` = 56-128px |
| H2 secao | `clamp(3rem, 6vw, 5rem)` = 48-80px (**nunca 36px**) |
| Lead/descricao | `clamp(1.125rem, 2vw, 1.375rem)` |
| Eyebrow | 11px mono, tracking `0.22em`, `//` prefix |
| Body | 15px Inter |

## Spacing, container e radius

- **Container:** narrow 896px (max-w-4xl) / default 1152px (max-w-6xl) / wide `min(92vw, 1680px)`. **NUNCA `max-w-7xl`/1280 travado.**
- **Section rhythm:** `clamp(5rem, 12vw, 10rem)` vertical entre blocos.
- **Radius:** cards de LP/marketing podem ir a 16-24px; CtaPill = pill.

## CtaPill — variant, nao string

O CTA premium (`bg-foreground text-background ... pill ... chip-seta group-hover:rotate-45 ... hover -translate-y-0.5`) aparece em hero/nav/pricing/cta-final. **No DS atual e string copiada 6x** (smart-plastica, club, lp-mindloop). Aqui vira **`variant: "cta"`** no buttonVariants. Uma definicao, N usos.

## Motion

- **Reveal on-scroll padronizado em UM mecanismo:** `data-reveal` via IntersectionObserver. Eliminar a divergencia de 2 engines (crm vs mindloop usavam classes CSS + hook inline conflitantes).
- Easings `smooth` (default) / `craft` (0.65,0.05,0,1, split-line) / `back`.
- Smooth scroll Lenis opcional, **so desktop fine-pointer** (`hover:hover`/`pointer:fine`).
- `prefers-reduced-motion` zera reveal/clip-path/cursor.

## Blocos lp-* (suite de 14)

nav scroll-spy, hero, problema, solucao, comparativo, pricing (plano popular invertido B&W), garantia, faq (`<details>` zero-JS), cta-final, footer. Trocam so copy/dados. **Pricing card:** plano popular invertido (foreground bg), savings badge, features com Check, valor clamp display, CTA bottom-aligned com `min-h` reservado; grid 3 col `gap-px` hairline.

## Identity layer
Grain SVG ~5% (adicionar — club roda quase liso, so grid + glow) + crosshair. Resolve "nunca fundo liso".

## Como reusar
Suite `landing/` (14 lp-*) = template de LP completo trocando copy. `lp-nav` scroll-spy plug-and-play. `lp-pricing` PlanCard reutilizavel. Tokens de motion + keyframes portaveis. SEO/GEO module (jsonld + sitemap/robots + llms.txt) e lead-tracking kit (UTM + n8n) opcionais.
