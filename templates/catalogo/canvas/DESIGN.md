# DESIGN.md — Canvas / Diagrama interativo

> Reference: `soier__modulo-fluxo-2027`. **Tokens proprios do cliente** (white-label via `[data-brand]`, modelo `central-plastica`).
> Repos: `soier__modulo-fluxo-2027`, `soier__central-plastica`, `soier__orquestrador-sp3`.
> Default neutro; cliente troca o alias (central-plastica brown `#5B2C1E`, modulo magenta `#ED145B`).

## O que define este arquetipo

Render data-driven de `NODES[]`/`EDGES[]`/`CLUSTERS[]` (vanilla pan/zoom/minimap OU React Flow + dagre auto-layout). Edge router (bezier auto-roteado por geometria de portas) + node card variantes por estado. Engine de canvas (pan via `translate3d`, zoom focal no cursor, fitToScreen por bbox) reutilizavel ~250 linhas.

## Cor — UM token set, edge por token

A divida #1 do arquetipo: **dois arquivos com `:root` duplicado e DIVERGENTE** — mesmo nome de token, valores diferentes (`--success #059669` vs `#00E96B`; `--hot #DC2626` vs `#ED145B`). Aqui, UM token set canonico:
- `bg #0A0A0A` (era `#000`/`--kimi-bg` em variantes), `surface #141414`, `line rgba(245,245,240,0.12)`, `fg #F5F5F0`.
- **Edge colors por TOKEN** (`default`/`active`/`hot`/`warm`/`cold`) — nao hex literal na mao (central-plastica tinha `#814D3F`, `#128C7E` etc cravados).
- **Node-state por UM mapa** (`todo`/`active`/`done`/`error`) via border-left.
- **Alias de marca** trocavel por `[data-brand]`. `#0A0A0A`, nunca `#000`.

### Rationale
Diagrama de cliente precisa de white-label sem fork — `[data-brand]` reescrevendo vars (modelo central-plastica) serve N clientes com 1 codebase. UM `:root` elimina a manutencao em dois lugares e o drift de valores.

## Tipografia — canvas-h1 fora da dead-zone

`linear.html` tinha `h1.title` em `clamp(2rem, 4vw, 3.5rem)` = 32-56px, atravessando a dead-zone exatamente onde a maioria das viewports cai. Corrigido pra `clamp(3rem, 5vw, 4.5rem)` = 48-72px.

| Papel | Tamanho |
|---|---|
| Canvas H1 | `clamp(3rem, 5vw, 4.5rem)` = 48-72px |
| Node title | 15px |
| Node sub | 12px |
| Tag | 11px mono |

Tri-fonte com papeis claros: Sora/Space Grotesk (titles), Inter (body), JetBrains Mono (tags/labels tecnicos/teclas).

## Layout — auto-layout, nao px na mao

A divida: **coordenadas absolutas em px pra 36 nodes** (modulo-fluxo) e magic numbers no JS (`apexY=1580`, `FUNNEL_BAND_GAP=240`, `tw = label.length * 6.5`). Aqui: **gaps relativos + dagre/config**, coordenadas relativas. Qualquer reflow nao exige recalcular x/y na mao.

- node min-w 200px, padding 16px, minimap 180px.
- radius: node 12px, tag 6px.

## Motion
node cardEnter, pan via `translate3d` + will-change, zoom focal no cursor (clamp 0.1-2.5x), fitToScreen por bbox. `prefers-reduced-motion` honrado.

## Engine (~250 linhas, o ativo mais valioso)
Pan + zoom focal + minimap sincronizado + fitToScreen + atalhos teclado (F/R/0/+/-). Edge router SVG (`pickPorts` + `makeBezier` + markers por cor + loop arc). Vanilla (entregavel cliente) OU React Flow + dagre (app).

## Anti-padroes a evitar (do blueprint)
- `:root` duplicado divergente entre arquivos — **UM token set.**
- Coordenadas px na mao — **auto-layout.**
- README desatualizado citando arquivos inexistentes — **doc gerada contra o codigo real.**
- `!important` fragil em override de brand — **`[data-brand]` reescrevendo vars.**

## Como reusar
Canvas engine vanilla = modulo standalone pra qualquer fluxograma/mapa de cliente. Edge router SVG como utilitario de diagramas. `.node` data-driven (tag/title/sub/mono + variantes de estado) como card de diagrama/kanban. Padrao "flow de campanha" (colunas + clusters tintados + tiers hot/warm/cold) como template de pitch/handoff de funil.
