# aiox — Páginas-chave adicionais (condensado)

## `/brandbook/logo` — Logo System (5 blocos)
01 Primary Logo (dark/light backgrounds)
02 Variants (Horizontal H-AIOX-SQUAD · Compact · Favicon)
03 Clear Space: 1x height of "X" em cada lado
04 Usage Rules: tabela correct/incorrect (approved colors only · mono on brand bg / never non-brand colors · never rotate/distort)
05 Color Contexts: On Black #000 · On Surface #0F0F11 · On Cream · On Lime

## `/brandbook/spacing-layout` — Spacing completo

### Named scale (semantic)
`--spacing-xs 8px · -sm 16px · -md 32px · -lg 48px · -xl 64px`

### Numeric 14-step
`0 · 4 · 8 · 12 · 15 · 20 · 30 · 40 · 60 · 80 · 90 · 120 · 150 · 180`

### Categorização de uso
- `space 0-3` → micro UI (inline gaps, icon padding)
- `space 4-6` → components (card padding, form gaps)
- `space 7-11` → section/layout
- `space 12-13` → editorial (hero spacing)

### Breakpoints
`--bp-mobile 767px · --bp-tablet 768px · --bp-desktop 1200px`

### Z-index (layer stack)
`nav 100 · dropdown 200 · overlay 300 · modal 400 · toast 500`

## `/brandbook/semantic-tokens` — Aliases completos

### Semantic backgrounds
`--color-bg-void #000000 · -base #050505 · -surface #0F0F11 · -surface-alt #1C1E19 · -elevated (alias) · -overlay rgba(61,61,61,0.5)`

### Semantic text
`--color-text-base rgb(244,244,232) · -secondary alpha 0.7 · -tertiary 0.55 · -muted 0.4`

### Glow & Neon (5 tokens)
`--neon #D1FF00 · -dim 0.15 · -glow 0.4 · --lime-glow 0.25 · --lime-glow-soft 0.1`

### Interactive states
`--focus-brand #D1FF00 · -neutral #BDBDBD · --selection-bg #050505 · -fg #D1FF00 · --warning-bg/-border`

### Font weights (7 steps)
`thin 300 · regular 400 · medium 500 · semibold 600 · bold 700 · extrabold 800 · black 900`

### shadcn mapping (ponte explícita — CLONAR)
```
--background    → --bb-dark          #050505
--foreground    → --bb-cream         rgb(244,244,232)
--card          → --bb-surface       #0F0F11
--primary       → --bb-lime          #D1FF00
--primary-fg    → --bb-dark          #050505
--accent        → --bb-lime          #D1FF00
--muted         → --bb-gray-charcoal #3D3D3D
--muted-fg      → --bb-gray-dim      #696969
--destructive   → --bb-error         #EF4444
--ring          → --bb-lime          #D1FF00
--radius        →                    0.5rem
```

## `/brandbook/patterns` — 6 categorias de pattern

### 01 Grid Patterns (8 variants)
`dot-grid 16px · dot-grid--dense 8px · dot-grid--sparse 32px · crosshair-grid 80px · crosshair-grid--tight 40px · wireframe-perspective 60px · symbol-grid (X marks) · plus-grid`

### 02 HUD Frames (8 variants) — assinatura visual
`frame-bracket (corner brackets) · frame-bracket--full · frame-tech (clipped polygon 12px) · frame-tech--sm 8px · frame-tech--lg 20px · frame-notch-tr · frame-notch-bl · frame-notch-both`

### 03 Hazard/Warning
`pattern-hazard (10px diagonal stripes) · --thin 5px · --subtle 15% opacity · bar-warning (solid banner)`

### 04 Circuit Traces (PCB decorative)
`pattern-circuit-h · pattern-circuit-board (80px tile)`

### 05 Textures
`scanlines 2px 15% · scanlines--heavy 1px 25% · pattern-noise (fractal SVG 4% overlay blend) · pattern-data-rain (matrix) · pattern-industrial (brushed metal)`

### 06 Dividers
`divider-tech (gradient fade) · divider-arrow · divider-dashed · divider-double`

**Insight SINAPSE**: Patterns são NOMEADOS em CSS classes reusáveis. Cada um tem descrição curta + uso recomendado. Biblioteca enxuta mas expressiva. Clonar este modelo (CSS class library, não componentes React pesados).

## `/brandbook/effects` — atalhos visuais
Ticker Strip (scrolling horizontal) · Badge variants (Lime/Blue/Error/Surface/Solid) · Glow & Pulse (Neon Glow/Spin/Pulse) · Hover Effects (nomeados por caso: Automation, Intelligence, Orchestration, Integration)

## `/brandbook/templates` — 3 shells fundamentais
01 **Standard Page Shell**: sticky nav → page header → section dividers → footer
02 **Bento Dashboard 4-col**: grid assimétrico span-2 + span-3
03 **Auto-fit Content Grid**: `repeat(auto-fit, minmax(340px, 1fr))`

Cada template vem com snippet HTML copy-paste. Clonar.

## `/brandbook/icons` — sistema de iconografia
### Tamanhos canônicos
16px (inline) · 24px (default/UI) · 32px (cards) · 48px (hero)

### Usage rules (6)
1. Stroke 2px em todos tamanhos
2. Round caps + round joins (`stroke-linecap: round; stroke-linejoin: round`)
3. viewBox 24x24 canônico
4. Stroke only, no fills (`fill: none`)
5. currentColor pra herdar do parent
6. Minimum touch target 44x44px

### Color variants
Default/Cream · Brand/Lime · Muted/Dim · Error/Destructive · Info/Blue · Warning/Flare

## `/brandbook/motion` — 8 animações nomeadas (GPU-accelerated, Framer Motion)
| Nome | Duração | Uso |
|---|---|---|
| Orchestration Pulse | 3.5s | Hero/Splash — seed + stagger + speed lines + glow ring |
| Speed Lines | 2s | Emphasis — slide + stagger |
| Particle Orbit | loop | Agents — spring + 4 orbital particles |
| Logo Dissolve | 3s | Exit/Fade — letters flicker dissolve |
| Morphing Square | 3.5s loop | Shape shift — square→rounded→circle |
| Glitch Reveal | 2s | Tech/Hacker — scanlines + skew + hue-rotate |
| Stagger Letters | 1.5s | Navbar/Footer — spring + rotateX 3D |
| Brand Reveal | 3s | Landing hero — blinds slide + scale + glow |

**Insight**: cada animação tem **nome proprio** + **duração** + **contexto de uso**. É o motion vocabulary que propusemos mas deles.

## Páginas não crawleadas (baixa prioridade pra nosso modelo)
moodboard, flow-diagram, buttons, cards, forms, feedback, states, tables, lists, charts, sections, lp-sections, navigation, advanced, vfx, seo, editorial, showcase/*, pitch-deck/*, workspace, brownfield-discovery

Essas são executions/variações dos primitivos já mapeados. Suficiente pro modelo.
