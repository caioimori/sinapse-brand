# DESIGN.md — Proposta / Deck interativo de cliente

> Reference: `soier__riana-roma-proposal`. **Tokens proprios do cliente** (Riana Roma).
> Repos: `soier__riana-roma-proposal`, `caio__proposta-igor-advocacia`, `soier__vascularte-apresentacao`.
> Paleta swap por cliente via `[data-brand]`. Aqui exemplificada com a marca Riana (semi-joia, gold sobre ink).

## O que define este arquetipo

Deck/proposta com DS local inline (~12 tokens `:root`), tipografia 100% clamp, sem `max-w-7xl`. Engine de slides: reveal.js com `disableLayout` + layout fluido `100dvh`, OU nav vanilla (teclado + swipe + progress). Kit reutilizavel: pricing-card escuro invertido, flow-canvas de funil, browser-mockup, stat/kpi, grid utils.

## Cor — tokens do cliente (Riana)

Diferente do DS SINAPSE B&W: este arquetipo carrega a marca do cliente. Riana Roma = gold sobre ink:
- `ink` `#0A0A0A` (background), `cream` `#F5F1E8` (foreground), `gold` `#C4B37B` (accent — marcadores, KPI, highlights), `gold-deep` `#A8965E`.
- **`ink #0A0A0A`, nunca `#000` puro** (alinhado a rule 02, mesmo em projeto de cliente).
- **Color-inheritance tree:** secoes `cream`/`bone` reescrevem toda a arvore (`.reveal *`) pra dark text. Inverte sem refactor por elemento.
- **Trocar cliente = trocar o bloco `brand` via `[data-brand]`.** Vascularte (azul petroleo `#3E6991`), Igor (clean light), etc.

### Rationale
Proposta vende a marca do cliente, nao a SINAPSE — entao a paleta e do cliente. O gold sobre ink da o luxe editorial da semi-joia. Mas a disciplina SINAPSE permanece: `#0A0A0A` minimo, clamp em tudo, container fluido.

## Tipografia — 100% fluida, zero dead-zone por design

Todo tamanho e `clamp()` em `:root`. Zero pixel fixo em headline.

| Papel | Tamanho |
|---|---|
| Display (capa) | `clamp(4rem, 9vw, 9rem)` = 64-144px |
| H1 | `clamp(3.25rem, 7vw, 6rem)` = 52-96px |
| H2 | `clamp(2.75rem, 5.5vw, 4.5rem)` = 44-72px |
| KPI | `clamp(3rem, 6vw, 5rem)` tabular |
| Eyebrow | `clamp(0.7rem, 0.9vw, 0.85rem)`, tracking `0.2em` |

Familia display = Cormorant Garamond (editorial luxe do cliente) + Inter no body.

## Layout — fluido, sem max-w-7xl

`slide-wrap` = `min(92vw, 1440px)`. `slide-height` = `100dvh`. reveal.js com `disableLayout: true` abandona o auto-scale chato e usa layout fluido real — slides responsivos de verdade (degradacao graceful 7->4->3->1 col).

## Motion
Fade entre slides 400ms, easing `smooth`. Nav vanilla: setas/Home/End + swipe touch + progress bar. `prefers-reduced-motion` honrado (esconde controls em touch).

## Kit de slides
- **pricing-card** escuro invertido (foreground bg, savings badge, features com Check, valor clamp, CTA bottom-aligned com min-h reservado).
- **flow-canvas** de funil (flow-node variantes + legend).
- **browser-mockup** (bar + dots + url + content).
- **stat/kpi** grid.

## Divida central a corrigir — data layer

O anti-pattern do arquetipo: **conteudo 100% hardcoded no markup** (riana = 1058 linhas inline; igor com cliente/preco repetidos 6x). **Parametrizar via data layer:** `{ cliente, preco, copy, slides[] }` em config. O sistema e reaproveitavel, o deck nao — separar shell de conteudo torna ambos reusaveis.

## Como reusar
`globals.css` (bloco reveal-override: disableLayout + 100dvh + fade + color-inheritance tree) = starter de deck fluido. Primitivos tipograficos clamp (`.display/.h1/.h2/.eyebrow/.kpi`) portaveis. flow-canvas vira componente de diagrama de funil. `Deck.tsx` (loader reveal dinamico + cleanup) = shell — slides data-driven e a evolucao natural.
