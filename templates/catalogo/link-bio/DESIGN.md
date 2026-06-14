# DESIGN.md — Link-bio mobile

> Reference: `soier__eusoier-link-bio`. **Tokens proprios do creator** (dark premium re-skinavel).
> Repos: `soier__eusoier-link-bio`, `soier__allegra-elevate-site`.
> Projeto pessoal (`@eusoier` = Matheus), nao SINAPSE — mas a disciplina de token vale. Creator troca alias via `[data-brand]`.

## O que define este arquetipo

Coluna unica `max-w-[430px]` mobile-first, header com banner/video full-bleed + logo circular sobreposto. Conteudo desacoplado em data file (profile + socials + cards tipados) — re-skin por creator. LinkButton/card pattern (imagem + CTA full-width + hover scale) + kit de icones SVG `currentColor`. Tracking de performance (UTM capture + webhook n8n) embutido para link de ads.

## Cor — dark premium, reconciliado com o render

A divida #1 do eusoier: **drift token vs render.** O `@theme` definia navy `#020617` + 4 accents neon, mas o componente hardcodava `#0a0a0a`/`#1a1a1a`/`#111`/`#2a2a2a` inline 6x — os tokens eram letra morta. Corrigido:
- `bg #0A0A0A` (UM valor, era navy no token + #0a0a0a no inline; e era preto puro em alguns cards), `surface #151515`, `surface-2 #1F1F1F`, `line rgba(245,245,240,0.12)`, `fg #F5F5F0`.
- **Alias de marca:** `accent` default neutro (os 4 accents neon eram orfaos). Creator troca SO o alias.
- **`#0A0A0A`, nunca `#000`.**
- Cards de marca (Rocketseat `#8257e5`, etc.) viram tokens nomeados num mapa, nao magic colors inline.

### Rationale
Link-bio re-skina por creator — token reconciliado com render e a unica forma de trocar a paleta editando 1 lugar, nao 6. Dark premium com vídeo grayscale + gradiente da o look caro com 1 asset.

## Tipografia — fontes que carregam de fato

A divida #2: Space Grotesk/Cormorant referenciadas via `var(--font-...)` no `@theme` mas **nunca carregadas** (sem `next/font` no layout) -> site no system fallback. **Corrigido: Sora/Inter carregadas via `next/font`.**

| Papel | Tamanho |
|---|---|
| Nome | `clamp(1.25rem, 5vw, 1.5rem)` |
| Link label | 15px |
| Bio | 14px |
| CTA card ("Acesso ao site") | 13px |

## Layout

- **Coluna:** `430px` mobile-first.
- **Avatar:** `96px` circular sobreposto ao banner.
- **LinkButton:** full-width `56px`, `stack-gap 12px`, `page-padding 16px`.
- **Radius:** card 16px, avatar pill.

## Motion
Hover scale `1.04` no LinkButton, easing `smooth`. `prefers-reduced-motion` zera.

## Componentes
- **LinkButton EXTRAIDO** (nao copy-paste 6x): `<LinkButton {image, label, href, bg}>` mapeado sobre os dados, nao markup repetido.
- **Header:** banner/video full-bleed grayscale + gradiente + logo circular + nome + verified badge.
- **Icones sociais** SVG `currentColor` (Instagram/YouTube/WhatsApp/X/Discord).

## Data layer + tracking
- Conteudo: `{ profile, socials[], cards[] }` tipado (`LinkBioItem`/`Social`/`Post`). Re-skin por creator.
- Tracking: UTM capture + webhook n8n embutido pra link de ads.

## Anti-padroes a evitar (do blueprint)
- Token vs render drift — **reconciliado.**
- Fontes que nunca carregam — **importadas.**
- LinkButton copy-paste 6x — **extraido e mapeado.**
- `cn()` util criado e nunca usado / data orfao — **removido.**

## Como reusar
Starter link-bio completo parametrizavel por data file. `<LinkCard>` recebendo `{image, label, href, bg}`. `lib/linktree-content.ts` como contrato de dados. `brand-icons.tsx` como pacote de icones sociais. Lead-tracking kit (UTM + n8n) plug-and-play.
