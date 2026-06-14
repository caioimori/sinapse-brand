# Catalogo de Tokens por Arquetipo

> Gerado a partir do blueprint forense de 36 repos (`_ui-forensics`).
> Cada arquetipo tem um par de arquivos: `tokens.json` (DTCG-like, valores reais) + `DESIGN.md` (spec + rationale).
> **Fonte da verdade B&W:** `design-system/`. Os demais herdam dela; clientes carregam tokens proprios via `[data-brand]`.

## Mapa dos arquetipos

| Pasta | Arquetipo | Reference | Tema default | Paleta |
|---|---|---|---|---|
| `design-system/` | Design System / Brandbook (fonte da verdade) | `caio__sinapse-brand` | bone (light) | B&W canonico SINAPSE |
| `saas-app/` | SaaS App autenticado (shell + dashboard) | `caio__sinapse-crm` | vanta (dark) | B&W canonico SINAPSE |
| `landing-page/` | Landing Page / Site Institucional | `caio__sinapse-club` | bone (light) | B&W canonico SINAPSE |
| `guia/` | Guia / Documentacao single-file (B&W) | `soier__claude-code-push-guide` | B&W documento | B&W canonico SINAPSE |
| `proposta/` | Proposta / Deck interativo de cliente | `soier__riana-roma-proposal` | ink dark | cliente (Riana gold `#C4B37B`) |
| `ecommerce/` | E-commerce (storefront + admin) | `soier__sayuri-store` | paper light | neutro premium (clone Pandora descartado) |
| `link-bio/` | Link-bio mobile | `soier__eusoier-link-bio` | dark | cliente (neutro re-skinavel) |
| `canvas/` | Canvas / Diagrama interativo | `soier__modulo-fluxo-2027` | dark | cliente white-label `[data-brand]` |

## Os dois regimes de paleta

1. **B&W canonico SINAPSE** (`design-system`, `saas-app`, `landing-page`, `guia`): a mesma fundacao invertida entre bone e vanta. Diferenciacao por **intensidade/opacity, nunca por hue**. Accent cromatico proibido. Preto minimo `#0A0A0A` (rule 02) — `#000` puro banido como superficie.

2. **Tokens proprios de cliente** (`proposta`, `ecommerce`, `link-bio`, `canvas`): cada projeto carrega a marca do cliente, trocada via `[data-brand]` reescrevendo CSS vars (modelo `central-plastica`). A disciplina SINAPSE permanece: `#0A0A0A` minimo, clamp em tudo, container fluido, sem `max-w-7xl`.

## Leis transversais (todos os arquetipos)

| Lei | Regra |
|---|---|
| Preto minimo | `#0A0A0A`, nunca `#000` puro como superficie (rule 02) |
| Dead-zone tipografica | Headlines NUNCA em 32-48px (rule 05). Escala salta a faixa por construcao |
| Container fluido | `min(92vw, 1680px)` / clamp. Nunca `max-w-7xl` hardcoded |
| Tipografia fluida | `clamp()` em toda headline. 3 familias: Sora / Inter / JetBrains Mono, max 2 pesos/tela (rule 04) |
| Motion nomeado | Easings + durations tokenizados. `prefers-reduced-motion` SEMPRE honrado (rule 08) |
| Identity layer | min 2 camadas: grain SVG ~5-6% + crosshair/frame. Nunca fundo liso (rule 03/11) |
| Tematizacao | `[data-brand]` reescrevendo vars — 1 codebase, N clientes |

## Correcoes aplicadas vs os repos originais

Os tokens deste catalogo nao copiam os repos crus — corrigem as dividas recorrentes do blueprint:

- **Dead-zone:** KPI value, page-title, H2 de secao, canvas-h1 empurrados pra `>=48px`.
- **Token fantasma:** `--color-muted-foreground` (crm), `--color-bg-base` (astro-saas) definidos.
- **`#000` puro:** substituido por `#0A0A0A` em e-commerce (`--pdr-black`), link-bio, canvas (`--kimi-bg`).
- **Drift token vs render:** link-bio reconciliado; fontes que nunca carregavam agora importadas.
- **Status hardcoded:** unificado em token map / StatusPill data-driven (saas-app, canvas).
- **CTA copiado 6x:** virou `variant: "cta"` (landing-page).
- **`:root` divergente entre arquivos:** UM token set (canvas).
- **Clone visual de terceiro:** descartado; paleta neutra premium default (ecommerce).
- **Conteudo hardcoded:** data layer parametrizado (proposta, link-bio, canvas).

## Como consumir

1. Escolha o arquetipo pela pasta.
2. Leia `DESIGN.md` pro rationale e as leis especificas.
3. Use `tokens.json` (DTCG-like) como fonte de valores — bridge pra CSS vars + `@theme` Tailwind v4 sem redefinir valor.
4. Pra cliente: troque o bloco `brand` / `brand-alias` via `[data-brand]`; nunca forke o token set.
