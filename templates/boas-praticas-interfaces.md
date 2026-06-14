# Boas Práticas + Anti-Padrões de Construção de Interfaces — SINAPSE

> Documento-mestre forense, derivado da análise de ~30 repositórios reais (caio__* e soier__*).
> Cada regra cita o repo onde o acerto ou o erro foi observado. Não é genérico: é o que já
> aconteceu no nosso código e o que não pode repetir.
>
> **Lei de fundo (brandbook SINAPSE):** preto mínimo `#0A0A0A` nunca `#000` ([rule 02]);
> headline nunca na faixa 32-48px ([rule 05]); identity layer sempre ativo, mínimo 2 camadas
> ([rule 03/11]); assimetria sobre simetria trivial ([rule 06]); `prefers-reduced-motion`
> sempre honrado ([rule 08]); menos componentes, mais lei ([rule 10]); se parece template
> genérico, refaz ([rule 12]).

---

## Parte 1 — Princípios gerais (valem para TODO arquétipo)

### 1.1 Tokens: uma fonte da verdade, semântica, em CSS vars

**SEMPRE**
- Definir os tokens em **um único** `globals.css` (Tailwind v4 CSS-first `@theme`). O Tailwind
  só **referencia** a var — nunca redefine o valor. Padrão limpo confirmado em `caio__sinapse-crm`,
  `caio__sinapse-club`, `soier__colegio-modulo`, `soier__vascularte-site`.
- Camadas: primitivo grayscale (13 steps de `#FAFAF7` a `#0A0A0A`) → semântico
  (`--background`/`--foreground`/`--card`/`--muted`/`--border`) → funcional isolado. Modelo em
  `caio__sinapse-brand`.
- Bordas e superfícies por **opacity sobre fg**: `--border rgba(245,245,240,0.1)`,
  `--border-strong 0.2`, `--ring 0.3` (padrão `sinapse-crm`).
- Multi-cliente: tematizar por `[data-brand]` reescrevendo as CSS vars — 1 codebase, N clientes,
  zero fork. Mecanismo oficial, provado em `soier__central-plastica`.

**NUNCA**
- Manter **duas** fontes da verdade conflitantes: `tailwind.config.ts` com os mesmos hex que o
  `globals.css` (`caio__astro-saas-dev` — já divergem; mudar uma cor exige editar 2 lugares),
  ou keyframes/easings duplicados CSS × Tailwind (`caio__sinapse-brand`, com `shimmer`/`marquee`
  divergentes).
- Referenciar **token fantasma** que nunca foi definido: `--color-muted-foreground` em
  `caio__sinapse-crm` (3×), `--color-bg-base` em `caio__astro-saas-dev` (o nome real era
  `--color-bg-page`), `--text-primary-rgb` em `caio__design-system-astro` (sempre cai no fallback).
  Renderiza cor inválida/herdada silenciosamente.
- Declarar token e nunca usar: `--void:#000`, `--success`, `--error` em
  `soier__claude-code-push-guide`; `success/warning/error` em `caio__carrosseis-lab`.

### 1.2 Cor: B&W por intensidade, jamais `#000` puro

**SEMPRE**
- Diferenciar por **intensidade/opacity**, não por hue. Estados `ok/warn/critical` todos
  `#F5F5F0` variando opacity/peso (`caio__sinapse-crm`, `soier__snps`). Funcionais ficam isolados
  (`--destructive #FF3A2D`, `--success #00C853`) — nunca viram accent decorativo.
- Preto mínimo `#0A0A0A`; off-white quente `#F5F5F0` (bone) / `#FAFAF7` em cards.
- Cliente mantém o accent dele como **arquétipo separado** (Módulo magenta `#ED145B`, Vascularte
  petróleo `#3E6991`, Mindloop cobalt `#2E4BFF`) — nunca contaminar o DS SINAPSE.

**NUNCA**
- `#000`/`#000000` puro como superfície: visto em `soier__snps` (growth + body), `soier__sayuri-store`
  (`--pdr-black`), `soier__soier-spaces` (dark bg), `soier__fdconcept` (`--background`),
  `soier__orquestrador-sp3` (`--kimi-bg` + `body bg-black`), `caio__carrosseis-lab` (`body{background:#000}`).
  Força `#0A0A0A` no token de fundo.
- Cor hardcoded furando a camada semântica. Casos reais a não repetir:
  `soier__soier-spaces` (**131 ocorrências** `bg-slate/blue/amber` em 26 arquivos, 4 mapas de status
  duplicados), `caio__sinapse-club` (`#ef4444` na xp-progress-bar), `soier__vascularte-site`
  (`border-[#dbe5ee]`, `bg-[#3e6991]`), `caio__sinapse-lp-mindloop` (`#FFFFFF` em ~6 botões),
  `soier__eusoier-link-bio` (6 cards com `bg-[#1a1a1a]` inline).
- Declarar uma cor e usar outra: `soier__snps` (`styles.css` diz "No green. No blue." e usa
  `#22c55e`); `caio__carrosseis-lab` (`#2e4bff` literal ignorando o `var(--brand-blue)` do próprio arquivo).

### 1.3 Tipografia: 100% fluida, pulando a dead-zone por construção

**SEMPRE**
- `clamp()` em **toda** headline. Faixas válidas: **11-14px** (meta/labels) **OU 60-180px** (display).
  Hero canônico: `clamp(3.75rem, 11vw, 11rem)` = 60-176px, font-light, leading 0.92, tracking -0.035em,
  `text-balance`, max-w em `ch` (`caio__sinapse-crm`, `caio__sinapse-brand`).
- Construir a escala para **saltar** a dead-zone: `--text-h2 1.75→2.5rem` pula direto para
  `--text-h1 2.25→3.5rem`, sem nenhum literal 32-48px no codebase. **Melhor modelo: `soier__colegio-modulo`.**
- 3 famílias: Sora (display), Inter (body), JetBrains Mono (meta/eyebrow/kbd), via `next/font`
  variable + `display:swap`. Máximo 2 pesos por família por tela ([rule 04]).
- `tabular-nums` obrigatório em KPI, tabelas e valores monetários.

**NUNCA**
- Headline na **dead-zone 32-48px** — é a violação #1, presente em quase todos:
  `caio__sinapse-crm` (empty H1 `clamp(2rem,3.5vw,3rem)`, funnel H1, MetricCard value
  `clamp(2rem,...,2.75rem)`), `caio__sinapse-club` (section H2 `text-4xl`=36px no mobile, 8/8 seções),
  `soier__vascularte-site` (hero `text-4xl`), `soier__sp3site` (H1 `text-4xl/5xl`, H2 `text-3xl/4xl`),
  `soier__smart-plastica-sp` (hero até `2.75rem`=44px), `soier__snps` (mobile fixo 32-40px),
  `caio__apse-os` (page-title 32px, KPI 40px). Só o hero principal costuma escapar.
- Renderizar em system font porque a fonte de marca nunca carregou: `caio__astro-saas-dev`
  (Helvetica/Arial em display=heading=body), `soier__eusoier-link-bio` (Space Grotesk/Cormorant
  referenciadas no `@theme` mas **nunca importadas** via `next/font`), `soier__fdconcept`
  (Playfair declarada e nunca usada).
- `style={{ fontSize: 'clamp(...)' }}` espalhado inline: `caio__sinapse-lp-mindloop` (praticamente
  toda cor/tamanho inline), `soier__riana-roma-proposal`, `soier__colegio-modulo` (heroes).

### 1.4 Layout e espaçamento: container fluido, radius controlado

**SEMPRE**
- Container com variants fluidos: narrow ~860-1024px / default ~1280-1440px / wide
  `max-w-screen-2xl` ou `min(92vw, 1680px)`. Correto em `caio__sinapse-brand`, `caio__sinapse-crm`,
  `soier__colegio-modulo` (site), `soier__riana-roma-proposal`.
- Padding fluido: `clamp(1.5rem, 4vw, 5rem)`.
- Radius canônico: `sm 6px / md 8px (inputs) / lg 10px (buttons) / xl 16px (cards) / 2xl 20px
  (modais) / badge 9999px`. Hard-cap: **radius >12px em card de dashboard é anti-pattern** (`caio__apse-os`);
  cards de marketing podem ir a 16-24px.

**NUNCA**
- `max-w-7xl` ou container fixo `1280/1600px` hardcoded: `soier__vascularte-site` (`max-w-[1280px]`),
  `soier__smart-plastica-sp` (`max-w-7xl` universal em todas as seções), `soier__fdconcept`,
  `caio__proposta-igor-advocacia` (`1200px`), `soier__sayuri-store` (1600/1400/1280 soltos por página),
  `soier__colegio-modulo` (**regressão no dashboard**: `max-w-7xl` no layout, enquanto o site usa
  `--container-width`).
- Redefinir a escala Tailwind para px absolutos — quebra `h-9`/`gap-2` do shadcn que esperam rem
  (`caio__sinapse-brand`: `space-4`=15px não 16px; `caio__astro-saas-dev`).

### 1.5 Motion: nomeado, deduplicado, com reduced-motion

**SEMPRE**
- Easings nomeados: `--ease-smooth cubic-bezier(0.16,1,0.3,1)` (default), `--ease-apple (0.32,0.72,0,1)`,
  `--ease-back (0.34,1.56,0.64,1)`. Durations: `--dur-fast 150ms / base 250ms / slow 400ms` (cap ~500ms;
  800ms+ é anti-pattern). Confirmado `caio__sinapse-brand`, `caio__sinapse-crm`.
- Reveal on-scroll em **UM** mecanismo (`data-reveal` + IntersectionObserver, ou hook GSAP — não os dois).
- `@media (prefers-reduced-motion)` zerando animations/transitions. Exemplar: `soier__colegio-modulo`
  (global + por componente, aria-live nos heroes rotativos).

**NUNCA**
- Duas engines de reveal divergentes: `caio__sinapse-lp-mindloop` (classes `.reveal--*` no CSS **e**
  hook `useRevealOnEnter` que reescreve via inline style, ignorando as classes); `caio__sinapse-crm`.
- Esquecer reduced-motion: `soier__vascularte-apresentacao` (deck se gaba de a11y mas não tem),
  `soier__smart-plastica-sp` (selo gira infinito 20s), `soier__sinapse-setup-guide` (orb float sempre ativo).
- Dead code de motion empilhado: `caio__sinapse-lp-mindloop` tem `PreloaderV3` e `CustomCursorV3`
  totalmente construídos e **nunca importados** (o cursor ainda usa `MutationObserver` no body inteiro).

### 1.6 Identity layer: nunca fundo liso

**SEMPRE**
- Grain SVG inline data-uri (`feTurbulence`) 5-6% + crosshair CSS-only + frame de bordas verticais.
  Resolve "mínimo 2 camadas". Canônico em `caio__sinapse-brand`, `caio__sinapse-crm`,
  `soier__claude-code-push-guide` (cita `[rule 03/11]` no CSS), `soier__colegio-modulo`
  (`.texture-paper` + `.texture-grid-lines` documentados como mandatórios).

**NUNCA**
- Entregar shadcn cru / clone Linear / flat dark — "cheira a template": `caio__astro-saas-dev`,
  `soier__snps` (declara explicitamente "no grain — clean canvas"), `soier__sp3site`, `soier__fdconcept`,
  `soier__eusoier-link-bio` (corpo flat dark estilo Linktree). Viola [rule 12].

### 1.7 Conteúdo data-driven, estados de primeira classe, doc honesta

**SEMPRE**
- Desacoplar conteúdo do JSX em `constants.ts`/data file tipado: `soier__smart-plastica-sp`,
  `soier__colegio-modulo`, `soier__eusoier-link-bio`, `soier__vascularte-site` (multi-unidade).
- Empty-state opinativo + skeleton (nunca spinner) + status pill: `caio__sinapse-crm`,
  `soier__soier-spaces` (skeleton em todos os blocos), `caio__apse-os`, `soier__orquestrador-sp3`.
- DS documentado **contra o código real**: rule file no repo (`.claude/rules/*-design-system.md` em
  `caio__caioimori-pages`; `AGENTS.md` em `soier__central-plastica`).

**NUNCA**
- Doc do DS mentindo sobre o código: `soier__soier-spaces` (CLAUDE.md diz roxo `#8B5CF6`/amarelo,
  realidade é B&W+verde), `soier__orquestrador-sp3` (declara `--kimi-*` que ninguém consome),
  `soier__modulo-fluxo-2027` (README cita `canvas.html`/`preview-full.png` inexistentes).
- Conteúdo 100% hardcoded no markup: `soier__riana-roma-proposal` (20 slides, 1058 linhas inline),
  `caio__proposta-igor-advocacia` (cliente "Igor e sócios" em 6 pontos, `wa.me` em 4),
  `soier__modulo-fluxo-2027` (36 nodes com coordenadas px na mão).
- Dark mode morto: código pago sem retorno. `caio__sinapse-club` (`forcedTheme='light'`, ~60 linhas
  `.dark` nunca executam), `caio__astro-saas-dev` e `soier__eusoier-link-bio` (definem `.dark` mas
  **nunca montam ThemeProvider**). Regra: ou liga o toggle, ou remove o bloco.

---

## Parte 2 — Por arquétipo

### 2.1 Dashboard / SaaS App autenticado
*Referência: `caio__sinapse-crm`. Também: `sinapse-club`, `astro-saas-dev`, `apse-os`, `central-plastica`, `soier-spaces`, `orquestrador-sp3`.*

**SEMPRE**
- AppShell = Sidebar 240-248px colapsável (persistir via `useSyncExternalStore`+localStorage) +
  Topbar 56px sticky + main scrollável + Cmd+K. Provado em `central-plastica` e `sinapse-crm`.
  Dashboard é full-bleed: **sem** `max-w-7xl` (correto em `soier__soier-spaces`).
- Bloco de dashboard: MetricCard = eyebrow mono + valor display `tabular-nums` (FORA da dead-zone) +
  delta badge + Sparkline/Recharts **temado por CSS var** (`var(--color-*)` propaga até o tooltip —
  `astro-saas-dev`, `central-plastica`).
- StatusPill **data-driven** por um único token map (`status → {label, intensidade, ícone}`).
- Multi-brand por `[data-brand]` (`central-plastica`).

**NUNCA**
- KPI/page-title na dead-zone: `apse-os` (page 32px, KPI 40px), `sinapse-crm` (MetricCard
  `clamp(2rem,...,2.75rem)`), `central-plastica` (h1 `text-3xl`, sem `text-balance`).
- 4 mapas de status duplicados + cor hardcoded: `soier__soier-spaces` (131 ocorrências),
  `soier__orquestrador-sp3` (`#4A97DE` const duplicada em 2 arquivos + `bg-[#0A0A0A]` em ~30 lugares).
  **BUG real a evitar:** em `orquestrador-sp3` o `tailwind.config` referencia `hsl(var(--primary))`
  etc. **nunca definidos** — todos os utilitários shadcn resolvem vazio e o Button precisa de
  `style={{backgroundColor}}` inline pra aparecer.
- `<button>` cru misturado com `<Button>` do DS (`central-plastica` toolbar); `!important` em pilha
  para forçar brand (`central-plastica` linhas 189-251, ~30 regras + `aside * { color:#fff !important }`).
- Glyphs unicode como ícones (`sinapse-crm`: `◇◎◫⌖`) — frágil cross-platform. Adotar **lucide**.
- Radius >12px em card de dashboard (`apse-os` hard-cap).

### 2.2 Site institucional
*Referência: `soier__colegio-modulo`. Também: `vascularte-site`, `sp3site`, `fdconcept`.*

**SEMPRE**
- Atomic design (`ui/molecules/organisms/templates/segments`) com route-groups isolando temas
  (`(marketing)/(dev)/dashboard/blog` em `colegio-modulo` — `.dashboard-root` escopa tema claro sem vazar).
- SEO/GEO first-class: jsonld + sitemap/robots dinâmicos + `llms.txt` + compliance bar quando regulado
  (`MedicalComplianceBar` CFM em `vascularte-site`; metadata/canonical/keywords por página em `colegio-modulo`).
- `SectionTitle`/`SectionHeader` com `clamp()` fluido (modelo `vascularte-site`); `buttonStyles.ts`
  como fonte única de variantes (`vascularte-site`).
- Sistema multi-unidade data-driven (`Unit` type + templates) — escala por filial sem duplicar página.

**NUNCA**
- Hero centrado simétrico trivial com blobs blur (`soier__sp3site`, `soier__fdconcept` — text-center +
  mx-auto em toda seção). Viola [rule 06].
- Hero não herdar o padrão fluido do `SectionTitle` (`vascularte-site`: SectionTitle usa clamp, mas o
  Hero h1 ficou em `text-4xl` — inconsistência interna).
- Hex hardcoded em ~20 organisms (`colegio-modulo`: `header.tsx color:#25DBEF`,
  `background:#ED145B` em vez de `var(--color-primary-500)`); `!important` em CTA (`vascularte-site`).
- 50-58 primitivos shadcn instalados pra usar ~1 (`sp3site`, `fdconcept`) — bloat de bundle.

### 2.3 Landing Page
*Referência: `caio__sinapse-club`. Também: `sinapse-lp-mindloop`, `snps`, `smart-plastica-sp`.*

**SEMPRE**
- Suíte modular de 14 blocos `lp-*`: nav scroll-spy → hero → problema → solução → comparativo →
  pricing → garantia → faq → cta → footer. Troca só copy/dados (`sinapse-club` é o template).
- Nav com scroll-spy (IntersectionObserver) + backdrop-blur on scroll + underline animado (`sinapse-club`).
- CtaPill como **variant** (pill com chip-seta `group-hover:rotate-45`).
- PlanCard "popular" invertido para B&W sólido (`foreground` bg) + savings badge + CTA bottom-aligned
  com `min-h` reservado (`sinapse-club`, `snps`); grid 3 colunas `gap-px` hairline.
- FAQ accordion zero-JS `<details>/<summary>` (`smart-plastica-sp`, `snps`).

**NUNCA**
- CTA premium copiado como string longa 6× em vez de virar variant: `soier__smart-plastica-sp`
  (CtaPill idêntico em hero/header/procedures/differentials/faq), `caio__sinapse-club` (string
  `bg-foreground text-background ...` em cada `lp-*`), `caio__sinapse-lp-mindloop`. Viola DRY do próprio DS.
- Section H2 no piso da dead-zone (`sinapse-club` `text-4xl`; `snps` `clamp(32px,4.5vw,48px)` e mobile
  fixo 32px).
- Renderizar os N cards "na mão" (`DIFFERENTIALS[0..5]` hardcoded) em vez de `.map()` sobre o array
  que o próprio repo já tem (`smart-plastica-sp`).
- 3 regimes de token no mesmo projeto (`soier__snps`: `styles.css` Sora vs `/educacional` Geist vs
  `growth` `#000`) com CSS inline de ~400 linhas duplicado por página.

### 2.4 E-commerce (storefront + admin)
*Referência: `soier__sayuri-store`. Também: `sayuri-ecommerce`.*

**SEMPRE**
- Esqueleto completo de rotas (home/PLP/PDP/cart drawer/busca/conta/admin) — alto valor anti-retrabalho.
- Tokenização em 2 camadas (primitivo + alias de marca re-skinável) para trocar a marca trocando só o alias.
- SEO/GEO forte (jsonld/sitemap/robots/llms.txt — raro em loja, presente em `sayuri-store`).
- ProductCard com swatches por gradiente (sem imagem), mega-menu acessível `<details>`, trust bar.

**NUNCA** (anti-padrão grave compartilhado)
- **Clone 1:1 declarado da Pandora** ("capturado pixel-by-pixel") em `sayuri-store`/`sayuri-ecommerce` —
  risco de marca/legal + identidade própria zero. **Reusar a ARQUITETURA, descartar a camada visual.**
- CSS monolito 3-5k linhas global (`pandora.css` 3.146 + `sayuri-overrides.css` 1.777; `sayuri.css` 3.138).
- `#000000` puro como texto dominante (`--pdr-black` em topbar/footer/body/`a:link`).
- Dois DS desconectados sem ponte (shadcn tokens vs `pandora.css`); alias mentiroso (`--font-serif`
  aponta pra Montserrat sans; `--sayuri-gold` aponta pra `--pdr-pink`); px decimais herdados de scrape
  (13.6px, 26.4px); `!important` pra vencer cascata frágil.

### 2.5 Link-bio mobile
*Referência: `soier__eusoier-link-bio`. Também: `allegra-elevate-site`.*

**SEMPRE**
- Coluna única `max-w-[430px]` mobile-first; header com banner/vídeo full-bleed grayscale + gradiente +
  logo circular com anel sobreposto (`eusoier-link-bio`).
- Conteúdo desacoplado em data file tipado (`lib/linktree-content.ts`: profile + socials + cards) —
  re-skin por creator.
- `LinkButton` **extraído** como componente `{image, label, href, bg}` + `.map()` sobre os dados.
- Lead-tracking embutido (UTM capture + webhook n8n) para link de ads (`allegra-elevate-site`:
  `trackingService.ts` + `useUTMCapture`).

**NUNCA**
- Drift token × render: `eusoier-link-bio` define paleta navy no `@theme` mas hardcoda `#1a1a1a`/`#111`
  inline em 6 cards copy-paste (tokens são letra morta); `allegra-elevate-site` (página final usa
  `from-gray-50`/`text-gray-600` em vez de `bg-background`/`text-muted-foreground`).
- `LinkButton` repetido como string longa 3-6× em vez de componente (`allegra`).
- Webhook hardcoded versionado no client (`allegra`: `https://n8n-webhook.../allegrabd`); OG image ainda
  no placeholder `lovable.dev`; 49 componentes shadcn instalados pra usar ~1 (Button).

### 2.6 Proposta / Deck interativo
*Referência: `soier__riana-roma-proposal`. Também: `proposta-igor-advocacia`, `vascularte-apresentacao`.*

**SEMPRE**
- DS local inline enxuto (~12 tokens `:root`), tipografia 100% `clamp()`, sem `max-w-7xl`
  (`riana-roma-proposal`, `proposta-igor-advocacia`).
- Engine de slides: reveal.js com `disableLayout:true` + layout fluido 100dvh (abandona o auto-scale
  chato — `riana-roma-proposal`, com color-inheritance tree por contexto de seção), OU nav vanilla
  (teclado + swipe touch + progress bar em ~50 linhas — `vascularte-apresentacao`).
- Kit reutilizável: pricing-card escuro invertido, flow-canvas de funil, browser-mockup, stat/kpi.

**NUNCA**
- Conteúdo 100% hardcoded (cliente/preço/copy): `riana-roma-proposal` (1058 linhas, só o último slide
  usa `.map`), `proposta-igor-advocacia` (preços `R$ 6.000/2.000/8.000` e nome do cliente inline).
  **O sistema é reaproveitável; o deck não — parametrizar via data layer.**
- Esquecer `prefers-reduced-motion` (`vascularte-apresentacao`).
- `slide-title clamp(24px,3.5vw,42px)` na dead-zone (`vascularte-apresentacao`); em-dash como marcador
  de bullet (`riana-roma-proposal` — proibido se virar projeto Módulo, [guard C8]).

### 2.7 Guia / Documentação single-file (B&W)
*Referência: `soier__claude-code-push-guide` (único 100% fiel B&W). Também: `sinapse-setup-guide`, `caioimori-pages`.*

**SEMPRE**
- HTML estático single-file, tokens `:root` inline, zero build, deploy GitHub Pages/Vercel trivial.
- Chassi: frame com bordas verticais + topbar/footer mono + steps numerados (counter CSS) +
  code-block invertido (`attr(data-lang)` para a label — DRY) + tag pill com colchetes via `::before/::after`.
- Fiel ao brandbook: grain SVG inline, crosshair CSS-only, Sora/Inter/JetBrains, hero assimétrico
  `clamp(72px,14vw,180px)`, citar `[rule NN]` no CSS (`claude-code-push-guide`).

**NUNCA**
- Derrapar para DS paralelo: `soier__sinapse-setup-guide` usa accent teal `#00D4AA` e `--bg #0a0a0f`
  (azulado, não o `#0A0A0A` neutro), h2 `2rem`=32px na dead-zone, hero centrado simétrico — viola
  [rule 01/05/06]. É variante, não default.
- Acumular 3 DS num arquivo só (`caioimori-pages` `guide.css` ~1317 linhas: base+claude+mythos, dead CSS
  provável — 26/27 páginas são `claude`); `!important` no CTA por especificidade mal resolvida; 27 HTMLs
  repetindo a casca inteira sem partials.

### 2.8 Canvas / Diagrama interativo
*Referência: `soier__modulo-fluxo-2027`. Também: `central-plastica`, `orquestrador-sp3`.*

**SEMPRE**
- Render data-driven de `NODES[]`/`EDGES[]`/`CLUSTERS[]` (forEach). Trocar o diagrama = editar dados.
- Engine reutilizável (~250 linhas): pan via `translate3d`, zoom focal no cursor, `fitToScreen` por
  bbox real, minimap sincronizado (`modulo-fluxo-2027`). Para app: React Flow + dagre auto-layout por
  banda isolada + drag-persist debounced (`central-plastica`).
- Edge router bezier auto-roteado por geometria de portas (`pickPorts`+`makeBezier`) — evita cruzamentos
  sem posicionar setas na mão.

**NUNCA**
- `:root` duplicado e **divergente** entre arquivos (`modulo-fluxo-2027` index vs linear:
  `--success #059669` vs `#00E96B`, `--hot #DC2626` vs `#ED145B`); coordenadas px na mão para 36 nodes
  (qualquer reflow exige recalcular x/y); medir texto por chute (`label.length * 6.5` em vez de `getBBox`).
- `!important` frágil em override de brand (`central-plastica` edges hex `#814D3F` + minimap hardcoded).
- Conteúdo confidencial (financeiro, contrato) versionado protegido só por `noindex`, sem auth
  (`modulo-fluxo-2027`).

---

## Parte 3 — Tabela-resumo de tokens canônicos

| Camada | Valor canônico | Fonte |
|---|---|---|
| Fundo bone | `--background #F5F5F0` / `--card #FAFAF7` / `--muted #EFEFEB` | `sinapse-brand` |
| Fundo vanta | `--background #0A0A0A` / `--card #141414` / `--surface-2 #1A1A1A` | `sinapse-crm` |
| FG / preto | fg `#F5F5F0`; preto mínimo `#0A0A0A` — **nunca `#000`** | [rule 02] |
| Bordas | opacity sobre fg: `border 0.1` / strong `0.2` / ring `0.3` | `sinapse-crm` |
| Funcionais isolados | `--destructive #FF3A2D` / `--success #00C853` | `sinapse-crm` |
| Display | `clamp(3.75rem, 11vw, 11rem)`, light, leading 0.92, tracking -0.035em | `sinapse-crm` |
| Eyebrow mono | 11px, tracking 0.22em, uppercase, prefixo `//` ou `[ ]` | `claude-code-push-guide` |
| Radius | sm 6 / md 8 / lg 10 / xl 16 / 2xl 20 / badge 9999 (cap 12 em dashboard) | `sinapse-brand` |
| Container | narrow ~860-1024 / default ~1280-1440 / wide `max-w-screen-2xl` | `sinapse-crm` |
| Easings | smooth `(0.16,1,0.3,1)` / apple `(0.32,0.72,0,1)` / back `(0.34,1.56,0.64,1)` | `sinapse-brand` |
| Durations | fast 150 / base 250 / slow 400 (cap ~500) | `sinapse-brand` |
| Identity | grain SVG 5-6% + crosshair + frame, sempre ativo | [rule 03/11] |

**Default por arquétipo:** guias / LP / brandbook = **bone-first**; SaaS app / dashboard = **vanta-first**.
É o mesmo token-set invertido por `data-theme` — não dois sistemas.

---

## Parte 4 — Checklist pré-entrega

Rode antes de marcar qualquer UI como pronta. Qualquer ❌ bloqueia a entrega.

**Tokens & cor**
- [ ] Uma única fonte da verdade de tokens (globals.css). Tailwind só referencia, nunca redefine valor.
- [ ] Zero hex hardcoded em componente — tudo via `var(--color-*)`. (grep por `#`, `bg-[#`, `bg-slate/blue/amber`)
- [ ] Nenhum `#000`/`#000000` como superfície. Preto mínimo `#0A0A0A`.
- [ ] Nenhum token fantasma (referenciado e não definido). Nenhum token morto (definido e não usado).
- [ ] Cor de status via `<StatusPill>` data-driven, não mapa duplicado nem cor inline.

**Tipografia**
- [ ] Nenhuma headline na faixa 32-48px. Escala salta a dead-zone por construção.
- [ ] Hero/display em 60-180px com `clamp()` + `text-balance`. Meta/labels em 11-14px.
- [ ] Fontes de marca (Sora/Inter/JetBrains) realmente carregam via `next/font`. Máx 2 pesos/família/tela.
- [ ] `tabular-nums` em KPI/tabela/valor monetário.

**Layout**
- [ ] Container fluido (`max-w-screen-2xl`/clamp). Nenhum `max-w-7xl` ou `1280/1600px` fixo.
- [ ] Radius dentro da escala; ≤12px em card de dashboard.
- [ ] Mobile testado em 375px e desktop em 1440px.

**Motion & identidade**
- [ ] Easings/durations nomeados, deduplicados (sem drift CSS × Tailwind).
- [ ] `prefers-reduced-motion` honrado (zera animations/transitions).
- [ ] Um único mecanismo de reveal on-scroll.
- [ ] Identity layer presente (grain + crosshair/frame, mínimo 2 camadas). Não cheira a template.

**Estrutura & estados**
- [ ] Conteúdo (copy/preço/cliente/coordenadas) em data layer, não hardcoded no JSX.
- [ ] Empty-state opinativo + skeleton (não spinner) + status.
- [ ] CTA/elementos repetidos são variant/componente, não string copiada.
- [ ] Dark mode: ou o toggle está montado (ThemeProvider), ou o bloco `.dark` foi removido.
- [ ] Sem dead code (componentes construídos e não importados, libs instaladas e não usadas).

**A11y & higiene**
- [ ] `focus-visible` ring acessível; `aria-label`/`aria-hidden` corretos; `lang="pt-BR"`.
- [ ] Sem `!important` para vencer cascata; sem `dangerouslySetInnerHTML` não sanitizado.
- [ ] Doc do DS (CLAUDE.md/README/rule file) bate com o `globals.css` real.
- [ ] PT-BR com acentuação correta. Em-dash banido em projeto Módulo ([guard C8]).
- [ ] SEO/GEO (jsonld + sitemap/robots/llms.txt) presente em projeto comercial.

---

*Arquétipos cobertos: dashboard, site institucional, landing page, e-commerce, link-bio, proposta,
guia, canvas. Fonte: análise forense de ~30 repos. Regra de ouro — se uma decisão de UI já causou
retrabalho em algum repo acima, ela está banida aqui.*
