# DESIGN.md — E-commerce (storefront + admin)

> Reference: `soier__sayuri-store`. **Reusar ARQUITETURA, descartar a camada visual.**
> Repos: `soier__sayuri-store`, `soier__sayuri-ecommerce`.
> A identidade da Sayuri e CLONE 1:1 declarado da Pandora (risco de marca/legal) — a camada visual nao e promovida. Default neutro premium re-skinavel por cliente.

## O que define este arquetipo

Esqueleto completo de loja (home/PLP/PDP/cart drawer/busca/conta/admin) + SEO/GEO forte (jsonld/sitemap/robots/llms.txt). Tokenizacao em 2 camadas (primitivo + alias de marca) facil de re-skin. ProductCard com swatches por gradiente, mega-menu acessivel, hero split, trust bar.

## Cor — 2 camadas, neutro premium default

A arquitetura de 2 camadas e o que vale herdar; o conteudo dela e neutro, nao o clone:
- **Primitivo (neutro premium):** `ink #0A0A0A` (substitui `--pdr-black #000000`, era preto puro — viola rule 02), `paper #FAFAF7`, `line rgba(10,10,10,0.10)`.
- **Alias de marca:** `accent` default = `ink` (neutro). **Cliente troca SO o alias** pra re-skin. A Sayuri apontaria pro rosa `#DA1F4C`, mas como era clone, nao se promove.
- **`#000000` banido** — todo o texto dominante migra pra `#0A0A0A`.
- `sale #FF3A2D` funcional pra badge de desconto.

### Rationale
Loja precisa re-skinar por cliente sem fork. As 2 camadas (primitivo + alias) fazem isso trocando ~5 aliases. O default neutro premium evita o risco legal do clone e da uma base honesta. O mecanismo oficial de tematizacao e `[data-brand]` reescrevendo as vars.

## Tipografia — sem px de scrape, sem dead-zone

A divida do sayuri: tamanhos em px decimais herdados de DevTools scrape (`13.6px`, `12.5px`, `26.4px`) e H2 de secao em 24-40px (dead-zone no breakpoint largo). Corrigido:

| Papel | Tamanho |
|---|---|
| Hero/banner | `clamp(3.5rem, 6vw, 5.5rem)` = 56-88px |
| H2 secao | `clamp(3rem, 5vw, 4rem)` = 48-64px (**fora da dead-zone**) |
| Product title | `clamp(1.125rem, 1.5vw, 1.375rem)` |
| Eyebrow | 11px mono, tracking `0.18em` |
| Body / price | 13-15px |

`var(--font-serif)` mentiroso (apontava pra Montserrat sans) eliminado — familia display nomeada honestamente.

## Layout e radius — UM token cada

- **Container:** `min(94vw, 1600px)` (+ narrow `min(94vw, 1024px)` pra PDP). Substitui os `1600/1400/1280/1180/920/800px` soltos por pagina.
- **Radius:** escala unica sm 6 / md 8 / lg 12 / badge pill. Substitui os `4/8/6/2px` soltos que ignoravam a escala `--radius` do shadcn.

## Motion
Carousel hero CSS-only (opacity/dots), cart drawer slide, hover scale no produto. `prefers-reduced-motion` honrado.

## Componentes
- **ProductCard:** swatches por gradiente (sem imagem) + heart wishlist.
- **Mega-menu** acessivel (`<details>`/`<summary>`).
- **Trust bar** 4 col (garantia/frete/pix/parcelas).
- **SEO/GEO module:** jsonld + sitemap + robots + llms.txt + metadata template.

## Anti-padroes graves a descartar
- **Clone 1:1 da Pandora** — descartar pandora.css inteiro, nao reusar a camada visual.
- **CSS monolito 3-5k linhas** (pandora.css 3146 + overrides 1777) — modularizar.
- **`#000` puro** (`--pdr-black`) — forcar `#0A0A0A`.
- **Dois DS desconectados** (shadcn tokens vs pandora.css sem ponte) — unificar via 2 camadas.

## Como reusar
Esqueleto de rotas (home/PLP/PDP/cart/busca/conta/admin) = starter Next + Supabase + shadcn. Stack SEO/GEO plug-and-play. ProductCard com swatches gradiente reutilizavel. **Descartar o pandora.css; paleta neutra premium default; cliente troca alias.**
