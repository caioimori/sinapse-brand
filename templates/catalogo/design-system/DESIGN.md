# DESIGN.md — Design System / Brandbook (fonte da verdade)

> Arquetipo canonico SINAPSE. Repo de referencia: `caio__sinapse-brand`.
> Repos do arquetipo: `caio__sinapse-brand`, `caio__design-system-astro`, `caio__caioimori-pages`.
> **Estes tokens sao a fonte da verdade B&W. Todos os outros arquetipos herdam daqui.**

## O que define este arquetipo

Um repo cujo PRODUTO e o proprio Design System: tokens em CSS vars + bridge Tailwind v4 `@theme` + brandbook navegavel. Tokens em camadas (primitivo grayscale -> semantico) com dual-theme bone/vanta por `data-theme`. Inclui catalogo de patterns/texturas e o kit `Bb*` de documentacao (swatch/token-row/type-scale/token-export).

## Cor — B&W absoluto por intensidade

A regra inegociavel: **diferenciacao por INTENSIDADE/opacity, nunca por hue.** Estados ok/warn/critical sao todos `#F5F5F0`, separados por opacity e peso.

- **Tema bone (default, light-first):** background `#F5F5F0`, foreground `#0A0A0A`, card `#FAFAF7`, muted `#EFEFEB`.
- **Tema vanta (dark, opt-in):** background `#0A0A0A`, card `#141414`, surface-2 `#1A1A1A`, surface-3 `#1F1F1F`, foreground `#F5F5F0`.
- **Preto minimo `#0A0A0A` (rule 02).** `#000000` existe so como primitivo `void` de mascara/catalogo — **banido como superficie.**
- **Off-white quente `#F5F5F0`** como fg sobre dark. Nunca `#FFFFFF` puro em texto.
- **Grayscale 13-step:** `#FAFAF7 -> #F5F5F0 -> #EFEFEB -> #EBEBE5 -> #D4D4CE -> #999992 -> #5C5C58 -> #2E2E2B -> #1F1F1F -> #141414 -> #0A0A0A`.
- **Bordas por opacity sobre fg:** border `0.10`, border-strong `0.20`, input `0.14`, ring `0.30`, subtle `0.08`.
- **Accent cromatico PROIBIDO.** Funcionais (`destructive #FF3A2D`, `success #00C853`) ficam isolados, nunca como accent decorativo.

### Rationale
O B&W por opacity da identidade de marca coerente sem custo de paleta e mantem data-viz legivel em grayscale. A camada semantica desacopla tema do componente: trocar `data-theme` reskina o app inteiro sem refactor. Bone e vanta sao o MESMO token-set invertido.

## Tipografia — fluida, fora da dead-zone

3 familias canonicas via `next/font` variable + display swap. **Max 2 pesos por familia por tela (rule 04).**

| Papel | Familia | Pesos | Tamanho |
|---|---|---|---|
| Display/hero | Sora | 300/400/500 | `clamp(3.75rem, 11vw, 11rem)` = 60-176px |
| H1 | Sora | 300 | `clamp(3.5rem, 8vw, 6.5rem)` = 56-104px |
| H2 secao | Sora | 400 | `clamp(3rem, 6vw, 4.5rem)` = 48-72px |
| Body | Inter | 400/500 | 13-15px |
| Eyebrow/meta | JetBrains Mono | 400 | 10-11px, tracking `0.22em`, uppercase, prefixo `//` |

**Lei: headline NUNCA na dead-zone 32-48px (rule 05).** A escala salta de h2 (48px piso) direto pro display — a faixa proibida nao existe na escala por construcao. Hero: `font-light`, `leading 0.92`, `tracking -0.035em`, `text-balance`, max-w em `ch`. `tabular-nums` obrigatorio em KPI/valores.

## Spacing, radius e container

- **Radius:** sm 6 / md 8 (inputs) / lg 10 (buttons) / xl 16 (cards) / 2xl 20 (modais) / badge `9999px`.
- **Container fluido sempre:** narrow ~1024px / default ~1440px / wide `min(92vw, 1680px)`. **NUNCA `max-w-7xl`.**
- **Padding container:** `clamp(1.5rem, 4vw, 5rem)`.
- **Cuidado:** nao redefinir a escala Tailwind pra px absolutos (quebra `h-9`/`gap-2` do shadcn).

## Motion — nomeado e reutilizavel

- **Easings:** `smooth` cubic-bezier(0.16,1,0.3,1) [DEFAULT] / `apple` (0.32,0.72,0,1) / `back` (0.34,1.56,0.64,1) overshoot / `swift`.
- **Durations:** fast 150ms / base 250ms / slow 400ms (cap ~500ms; 800ms+ e anti-pattern).
- **Keyframes:** fadeUp/reveal escalonado (delay 1..5 a 0.08s), grainShift 8s steps(10), statusPulse, link-reveal underline.
- **`prefers-reduced-motion` SEMPRE honrado (rule 08)** — zera animations/transitions.

## Identity layer (rule 03/11)

Sempre ativo, min 2 camadas, nunca fundo liso: grain SVG inline data-uri (feTurbulence) ~5-6% + crosshair CSS-only + frame de bordas verticais.

## Divida tipica a corrigir antes de promover
- `globals.css` monolito (~1157 linhas) com utilities mortas (`auto-*`) e keyframes duplicados CSS x Tailwind.
- `void #000` na paleta — manter so como primitivo, nunca aplicar.
- Spacing scale custom que quebra defaults Tailwind (`space-4` = 15px nao 16px).

## Como reusar
Extrair `globals.css` como pacote `@sinapse/tokens.css`: grayscale + semanticos bone/vanta + funcionais isolados + bridge `@theme` Tailwind sem redefinir valor. E a dependencia de todos os outros starters.
