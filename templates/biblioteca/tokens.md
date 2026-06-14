# tokens — `@sinapse/tokens` (B&W bone/vanta)

## Propósito
Pacote único de CSS vars que é o **coração da biblioteca**: todos os outros componentes consomem `var(--color-*)` e nunca hex hardcoded. Resolve a divergência de N globals.css que hoje duplicam/divergem tokens entre repos. Grayscale 13-step + semânticos por opacity + dual-theme bone (light) / vanta (dark) por `data-theme` + funcionais isolados fora do brand.

**Lei inegociável:** preto mínimo `#0A0A0A` (nunca `#000` puro — rule 02). Off-white quente `#F5F5F0` como foreground. Diferenciação por **intensidade/opacity, não por hue**.

## API (data-theme)
Tema = atributo no `<html>`:
```html
<html data-theme="bone">   <!-- LIGHT default: guias, LP, brandbook -->
<html data-theme="vanta">  <!-- DARK: SaaS app, dashboard -->
```
Ambos são o **mesmo token-set invertido**. Bridge Tailwind v4: `@theme` só referencia `var(--…)`, **nunca redefine valor** (evita o drift CSS×config visto em sinapse-brand v3).

## Tokens canônicos

### Cor — semânticos (vanta default, do sinapse-crm)
```css
@theme {
  /* VANTA edition (dark) — confirmado em sinapse-crm globals.css */
  --color-background: #0a0a0a;       /* nunca #000 */
  --color-surface:    #141414;
  --color-surface-2:  #1a1a1a;
  --color-surface-3:  #1f1f1f;
  --color-foreground: #f5f5f0;       /* bone quente */
  --color-muted:      rgba(245, 245, 240, 0.55);
  --color-subtle:     rgba(245, 245, 240, 0.08);
  --color-border:        rgba(245, 245, 240, 0.1);
  --color-border-strong: rgba(245, 245, 240, 0.2);
  --color-input:         rgba(245, 245, 240, 0.14);
  --color-ring:          rgba(245, 245, 240, 0.3);
  --color-overlay:       rgba(0, 0, 0, 0.7);   /* scrim — usar token, nunca bg-black/60 solto */

  /* Estados — B&W absoluto, diferenciação por INTENSIDADE/peso */
  --color-state-ok:       #f5f5f0;
  --color-state-warn:     #f5f5f0;
  --color-state-critical: #f5f5f0;
}
```

### Cor — tema bone (light, do sinapse-brand)
```css
[data-theme="bone"] {   /* DEFAULT light */
  --color-background: #F5F5F0;
  --color-foreground: #0A0A0A;
  --color-surface:    #FAFAF7;   /* card; nunca #FFFFFF puro */
  --color-surface-2:  #EFEFEB;
  --color-muted:      rgba(10, 10, 10, 0.55);
  --color-border:     rgba(0, 0, 0, 0.1);
  --color-input:      rgba(0, 0, 0, 0.12);
  --color-ring:       rgba(0, 0, 0, 0.3);
}
```

### Grayscale primitivo (13-step, de sinapse-brand)
```
#FAFAF7 → #F5F5F0 → #EFEFEB → #EBEBE5 → #D4D4CE → #999992
→ #5C5C58 → #2E2E2B → #1F1F1F → #141414 → #0A0A0A
```

### Funcionais isolados (FORA do brand — nunca como accent decorativo)
```css
--destructive: #FF3A2D;
--success:     #00C853;
```

### Radius (confirmado brand/crm)
```css
--radius-xs:  0.25rem;   /* 4px  */
--radius-sm:  0.375rem;  /* 6px  */
--radius-md:  0.5rem;    /* 8px  — inputs */
--radius-lg:  0.75rem;   /* 12px — buttons */
--radius-xl:  1rem;      /* 16px — cards */
--radius-2xl: 1.25rem;   /* 20px — modais */
--radius-pill: 9999px;   /* badges */
```
> HARD-CAP: radius >12px em cards de **dashboard** é anti-pattern. Cards de LP/marketing podem ir a 16-24px.

### Fontes (3 famílias canônicas via next/font variable + display swap)
```css
--font-display: 'Sora', 'Inter', system-ui, sans-serif;        /* weights 300/400/500 */
--font-sans:    'Inter', system-ui, sans-serif;                /* 400/500 */
--font-mono:    'JetBrains Mono', 'Geist Mono', ui-monospace, monospace;  /* 400 */
```

### Tipografia — escala fluida que PULA a dead-zone (modelo colegio-modulo)
```css
/* Lei rule 05: headline NUNCA na faixa 32-48px. Faixas válidas: 11-14px OU 60-180px */
--text-eyebrow: 11px;                          /* mono, tracking 0.22em, uppercase */
--text-meta:    10px;                          /* labels/kbd */
--text-body:    clamp(0.8125rem, 1vw, 0.9375rem);  /* 13-15px Inter */
--text-h2:      clamp(1.75rem, 4vw, 2.5rem);   /* 28→40px... salta a faixa por construção */
--text-h1:      clamp(2.25rem, 5vw, 3.5rem);   /* 36→56px */
--text-display: clamp(3.75rem, 11vw, 11rem);   /* 60→176px — hero */
```
> `tabular-nums` obrigatório em KPI/tabelas/valores monetários.

## Variantes
| Variante | data-theme | Default por arquétipo |
|----------|-----------|----------------------|
| **bone** (light) | `bone` | guias, LP, brandbook |
| **vanta** (dark) | `vanta` | SaaS app, dashboard |

Cliente troca paleta por `[data-brand="X"]` reescrevendo `--color-*` (padrão de central-plastica) — mecanismo oficial de white-label, **nunca fork de tokens inline**.

## Aparece em
`caio__sinapse-brand` (fonte da verdade bone/vanta), `caio__sinapse-crm` (vanta), `caio__sinapse-club`, `soier__claude-code-push-guide` (`--vanta`/`--bone` inline), `soier__colegio-modulo` (escala anti-dead-zone), e — como **divergência a consolidar** — snps (3 regimes), sayuri (`--pdr-*` clone), todos os globals.css.

## Dívidas a corrigir antes de promover
- Remover `--void #000` / `#000000` puro de qualquer superfície (vira só primitivo de máscara).
- Eliminar tokens fantasma referenciados-mas-não-definidos: `--color-muted-foreground` (crm), `--color-bg-base` (astro-saas), `--text-primary-rgb` (design-system-astro).
- Podar `globals.css` monolito (brand 1157 linhas) — extrair só tokens+motion+identity.
- Container fluido vive aqui também: ver [`section-header.md`](./section-header.md) (`Container` narrow/default/wide).
