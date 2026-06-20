# SINAPSE CANON — fonte da verdade de marca (AI-first)

> **Para quem é este documento:** uma IA que vai gerar QUALQUER interface ou peça SINAPSE
> (LP, app, dashboard, hero, proposta, contrato, deck, carrossel) lê isto ANTES de produzir.
> É enxuto de propósito — só o que toda interface realmente usa. Sem poluição, sem demo que
> não vira nada. Cada valor é real e validado na fonte (06/2026).
>
> **Regra mestra:** o branding SINAPSE é sempre **congruente**. Em conflito, este documento vence.
> Tokens-máquina: `tokens.canon.json`. CSS de fonte única: `app/globals.css`.
> Âncora: o token set real do **hub.snps.ai** (Tailwind v4 + shadcn). Detalhe/pesquisa:
> `../_design-system-master/` (arquivo de extração — não é a lei).

**DNA em uma frase:** B&W absoluto, dark-first, premium silencioso — "terminal/IDE encontra editorial".
Hierarquia nasce de **cinza + opacidade**, nunca de cor. Se parece template genérico, está errado.

---

## 0. Variantes oficiais (núcleo + 4 superfícies)

Tudo abaixo é o **núcleo**. 4 superfícies herdam o núcleo e só desviam onde declarado (§11).

| Variante | Tema | Fonte | Textura | Cor extra |
|---|---|---|---|---|
| **App/Hub** (referência) | dark-first | Sora·Inter·JetBrains | grain | só `/ads` |
| **Institucional** (snps.ai, /growth) | dark | + Audiowide (marca) | grain+glass | — |
| **Club** (sinapse.club) | light-first | Inter (sem Sora) | glass | cor funcional social/gamificação |
| **Educacional** (snps.ai/educacional) | dark | Geist/Geist Mono | glass+órbitas | — |

---

## 1. Tipografia

| Papel | Família | Var | Pesos | Uso |
|---|---|---|---|---|
| Display | **Sora** | `--font-display` | 300/400/500/600 | Headlines, hero, números |
| Corpo/UI | **Inter** | `--font-sans` | 400/500/600 | Texto, UI, parágrafos |
| Mono | **JetBrains Mono** | `--font-mono` | 400/500 | Eyebrow, badge, dados, eixo de chart |
| Wordmark | **Audiowide** | `--font-wordmark` | 400 | Só marca/logo |

- **Máx 2 pesos por tela** (lei 04). Feature settings Inter: `"cv01","ss03"`. Letter-spacing global: `-0.011em`.
- **Escala UI** (corpo/componentes): `--text-xs .75rem` · `sm .875` · `base 1` · `lg 1.125` · `xl 1.25` · `2xl 1.5` · `3xl 1.875` · `4xl 2.25` · `5xl 3rem`.
- **Escala DISPLAY (headline de marca — salta a dead-zone):**
  `.display-hero` `clamp(3.75rem,11vw,11rem)` (60–176px, peso 300) · `.display-xl` `clamp(2.75rem,6vw,5rem)` · `.display-lg` `clamp(3.25rem,5vw,4.5rem)`.
- **NUNCA** headline de marca em **32–48px** (dead-zone). Faixas válidas: 11–14px OU 60–180px.
- **Eyebrow/kicker:** mono, uppercase, `tracking .14em`, 11–13px. Delimitadores: cru · `[ colchetes ]` · `// barra dupla`.
- Headline tracking negativo apertado (`-0.02` a `-0.035em`).

## 2. Paleta de cores

**Primitivos (rampa neutra):** `--vanta #0A0A0A` · `--bone #F5F5F0` · `--void #000000` (só máscara) ·
`--gray-00 #FFFFFF` → `05 #FAFAFA` · `10 #F5F5F0` · `15 #EBEBE6` · `20 #D4D4D0` · `30 #A3A39F` ·
`40 #737370` · `50 #525250` · `60 #404040` · `70 #2A2A2A` · `80 #1A1A1A` · `90 #141414` · `100 #0A0A0A`.

**Semânticos (light / dark — invertem):**

| Token | Light | Dark |
|---|---|---|
| background | `#F5F5F0` | `#0A0A0A` |
| foreground | `#0A0A0A` | `#F5F5F0` |
| card / popover | `#FFFFFF` | `#141414` |
| primary | `#0A0A0A` | `#F5F5F0` |
| primary-foreground | `#F5F5F0` | `#0A0A0A` |
| secondary/muted/accent | `#EBEBE6` | `#1A1A1A` |
| muted-foreground | `#525250` | `rgba(245,245,240,.55)` |
| border / input | `rgba(10,10,10,.10)` | `rgba(245,245,240,.10)` |
| ring | `rgba(10,10,10,.30)` | `rgba(245,245,240,.30)` |

- **Preto de marca = `#0A0A0A`. NUNCA `#000`** como superfície. Off-white = `#F5F5F0`.
- **Charts (mono):** light `#0A0A0A→#2A2A2A→#525250→#A3A39F→#D4D4D0`; dark inverte (`#F5F5F0→…→#404040`).
- **Cor funcional (ÚNICA exceção ao B&W):** `--error #FF3A2D` · `--success #00C853` · `--warning #F59E0B` · `--info #3B82F6`. Só estado/feedback — nunca decoração.
- **Exceção `/ads` (só nessa superfície):** `--meta #0866FF` · `--whatsapp #25D366` · `--google #4285F4` + canais traffic/engagement/awareness/app.

## 3. Skeletons / templates de interface (arquétipos)

Toda interface nova parte de um destes esqueletos (ordem de blocos). Referência viva:
`../_design-system-master/extractions/03-cross-account-canonico.md` + `_ui-forensics/output/starters/`.

| Arquétipo | Tema | Esqueleto (ordem de blocos) |
|---|---|---|
| **Landing page** | dark/light | Nav fina → Hero display assimétrico (eyebrow+display+sub+CTA) → prova/logos → seções com divisória hairline → pricing → FAQ → footer |
| **SaaS / App (Hub)** | dark | Sidebar (8 tokens) + topbar → page header (kicker+título) → **stat-grid metálico** (`grid gap-px bg-border`) → tabelas/cards → empty states |
| **Dashboard** | dark | Page header → linha de KPIs (stat-grid) → charts mono (recharts) → tabela densa → filtros mono |
| **Proposta** (cliente) | dark + gold opcional | Capa display → diagnóstico → escopo → ancoragem de preço (premium primeiro) → prova → CTA único |
| **Guia / docs** | B&W | Header numerado `[ x.x ]` → conteúdo em coluna fluida → blocos de código mono → next-section |
| **Link-bio** | dark | Símbolo → lista de links pill → footer mínimo |
| **Canvas/cliente** | via `[data-brand]` | Herda núcleo, troca tokens por cliente |

**Regras de esqueleto (sempre):** assimetria (lei 06) · container fluido (§6) · 2+ camadas (base + grain/textura) · divisórias hairline `rgba(fg,.08–.10)` no lugar de caixas pesadas.

## 4. Animações / motion

- **Defaults:** duração `.15s` · easing `cubic-bezier(.4,0,.2,1)`. Tokens: `--duration-fast .15s` · `base .25s` · `slow .4s`. Easings extra: `--ease-out (0,0,.2,1)`, `--ease-pulse (.4,0,.6,1)`.
- **Keyframes núcleo:** `fadeUp` (entrada padrão), `spin`, `pulse`. (tailwindcss-animate cobre enter/exit.)
- **Padrões reusáveis:** reveal `fadeUp` no scroll · hover lift sutil (translateY -1/-2px) · link underline reveal · stat-grid hairline · cursor mono blink (terminal).
- **Lei 07 (reversível):** tudo que entra, sai igual no scroll reverso. **Lei 08:** `prefers-reduced-motion` desliga tudo não-essencial (override global → `0.01ms`). Obrigatório.
- Superfícies ricas (educacional) podem ter orbit/smoke/chat — desvio de variante, não núcleo.

## 5. Botões + border radius

**Radius (base 6px):** `--radius 6px` → `sm/md 4` · `lg 6` · `xl 10` · `2xl 14` · `xs .125rem` · pill `9999px`.
Aplicação: **botão `6` (lg)** · **input `4` (md)** · **card `10` (xl)** · modal `14` (2xl) · badge/avatar pill.

| Botão | Estilo |
|---|---|
| **Primário** | fill `--primary` (bone no dark / vanta no light), texto `--primary-foreground`, radius 6, hover `opacity .9` |
| **Outline** | transparente, borda `--border`, hover `bg --accent` |
| **Ghost** | transparente, texto `--muted-foreground`, hover `--accent` |
| **CTA mono** (institucional) | `font-mono uppercase tracking-[.14em]`, borda `--foreground`, hover invertido |

Estados: focus ring (§8) · disabled `opacity .5` · alvo de toque ≥ 44px no mobile.

## 6. Espaçamentos + grid/layout

- **Base spacing `0.25rem` (4px).** Escala = `calc(base * n)`.
- **Container de página:** fluido — `max-width 1200px` + `--pad-x: clamp(20px,4vw,56px)`. **NUNCA `max-w-7xl` cru.**
- **Containers nomeados:** xs 20rem → 6xl 72rem.
- **Breakpoints:** sm 40rem · md 48rem · lg 64rem · xl 80rem · 2xl 96rem (+ guard 767px mobile).
- **Grid:** ≥12 col, gutters ≥24px no desktop. Divisórias por **borda hairline**, não por sombra/caixa.
- **Responsivo:** grids multi-coluna colapsam pra 1 col no mobile; zero overflow horizontal de 320px a 1920px.

## 7. Logotipo + utilização

- **Logo oficial = lockup vetorial "símbolo + SNPS"** (`public/brand/logo/{vanta,bone}/snps-lockup.svg`, viewBox 489.2×113.46). **NUNCA "SINAPSE" por extenso como logo.**
- **Contraste (lei de uso):** bg claro (Bone) → logo **vanta/escuro** (`#1a1b1b`); bg escuro (Vanta) → logo **bone/branco** (`#fff`). Troca automática por tema no componente `ThemeLogo`.
- **Símbolo isolado** (`sinapse-symbol.svg`, ratio ~1.41:1): usar em favicon, footer, app icon, espaços apertados.
- **Sub-marcas** (lockups próprios, mesmo símbolo): `sinapse-club-lockup.svg`, `sinapse-ai-lockup.svg`.
- **NUNCA:** recolorir fora de bone/vanta · distorcer · adicionar sombra/contorno · usar o wordmark "SINAPSE" sozinho · colocar sobre fundo de baixo contraste sem a camada certa.
- Clear space mínimo ≈ altura do símbolo. Tamanho mínimo do lockup ≈ 16px de altura.

## 8. Efeitos

- **Grain (textura do núcleo):** SVG feTurbulence, `opacity .05`, blend `overlay`, fixo `inset 0`, `z 9999`. Sempre ativo (lei 03).
- **Glass (variante Club/educacional):** `backdrop-blur 12–20px + saturate(1.4–1.8)` + inner-highlight. Não é núcleo — é desvio declarado.
- **Sombras (discretas):** xs `0 1px 2px #0000000d` · sm · md · lg · 2xl `0 25px 50px -12px #00000040`. Doutrina: preferir borda hairline + grain a sombra pesada.
- **Blur:** `--blur-sm 8px` · `--blur-md 12px`.
- **Focus ring:** `outline 2px solid transparent` + `color-mix(in oklab, var(--foreground) 40%, transparent)` (destructive 20%).
- **Frames/texturas sutis:** crosshair, HUD corners, hairline dividers, grid pattern — micro-detalhe que ativa o minimalismo (lei 11). Usar com parcimônia.

## 9. Modelos harvest (documentos institucionais reutilizáveis)

Catálogo de modelos prontos — a IA parte daqui, não reinventa. Caminhos reais:

| Modelo | Caminho | Notas |
|---|---|---|
| **Contrato BLINDADO** | `Workspace/sinapse/contratos/template-contrato.astro` + `GUIA-CONTRATO-BLINDADO.md` | 14 cláusulas, 20 blindagens jurídicas. Copiar por cliente. |
| **Proposta** | `Workspace/sinapse/contratos/_template-proposta.astro` | Premium primeiro, sem promessas. |
| **LP de proposta** | `Workspace/sinapse/propostas/_template-lp-proposta/` (`index.template.html` + `HARVEST.md` + `brand/`) | 1 página, DS escuro, ancoragem de preço, sem checkout. |
| **Pacote Growth (cliente)** | `Workspace/sinapse/clientes/_template-growth/` | Estrutura de entrega de cliente Growth. |
| **Apresentação/Deck** | *(harvest pendente de consolidar — decks atuais são client-branded)* | Regra: slide = âncora da fala, minimalista, premium mono-acento. |

**Regras de documento institucional:** B&W núcleo (gold só em proposta de cliente, variante), tipografia do §1, sem em-dash em peças Módulo, copy alinhada à Fonte da Verdade de Comunicação (`Workspace/sinapse/brand/fonte-da-verdade-comunicacao.md`).

## 10. Outros (essenciais que faltavam)

- **Iconografia:** **lucide-react**, default `size-4` (16px), stroke 2. Sem icon-font, sem mistura de bibliotecas.
- **Charts:** **recharts**, séries mono `--chart-1..5`, tooltip `--card`/`--border`, eixo em JetBrains Mono.
- **Estados (todo componente):** default · hover · focus-visible (ring §8) · active · disabled (`opacity .5`) · loading (skeleton shimmer `--muted`→`--accent`). Badge/status diferenciado por **opacidade/borda**, não por cor.
- **Acessibilidade:** contraste WCAG AA mínimo (AAA na copy principal) · focus visível sempre · alvo ≥44px mobile · `prefers-reduced-motion` respeitado · `aria-label` em ícones/logos.
- **Responsividade:** validar SEMPRE desktop (≥1280) + mobile (390) antes de "pronto"; zero overflow horizontal; grids colapsam.
- **Tom de voz / copy:** segue `Workspace/sinapse/brand/fonte-da-verdade-comunicacao.md` (conceito-mãe "Prova, não promessa"; IA sempre pela lente de growth; sem promessa vazia). Headlines sem numeral por extenso.
- **Componentes base (shadcn new-york):** button, card, badge, input, select, dialog, table, tabs, avatar, checkbox, dropdown-menu, popover, sheet, separator, textarea, label, form, sonner. Menos componentes, mais lei (Vignelli).

---

## 11. Desvios permitidos por variante (resumo)

- **App/Hub:** referência viva do núcleo. Exceção cromática só em `/ads`.
- **Institucional:** wordmark Audiowide; glass + sombras Apple; gradientes cromados; hero no topo da escala display.
- **Club:** light-first forçado; glass no lugar de grain; cor funcional liberada (social/gamificação); heading em Inter; cards com `ring-1 ring-foreground/10`.
- **Educacional:** stack Geist/Geist Mono; motion rico (orbit/smoke/chat); glows radiais.

> Qualquer coisa fora deste documento e dos desvios acima é **bug de congruência**, não estilo. Refaz.

---

*Máquina: `tokens.canon.json` · `app/globals.css`. Pesquisa/extração: `../_design-system-master/`.*
*v1 · 2026-06-18 · âncora hub.snps.ai · AI-first, institucional, congruente.*
