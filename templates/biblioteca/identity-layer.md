# identity-layer — grain + crosshair + frame + patterns

## Propósito
Camada de identidade SINAPSE que resolve o requisito **"nunca fundo liso, mínimo 2 camadas"** (rule 03/11/12). Assinatura de marca sem custo de asset: grain SVG inline data-uri (feTurbulence) ~5-6% sempre ativo + crosshair CSS-only + frame de bordas verticais + lib de patterns (grid/dots/crosshair/plus/rings/circuit) + texturas editoriais (topo/blueprint/halftone/hatch). Tudo `data-uri`, zero request externo.

## API
Classes plug-and-play aplicadas em containers:
```html
<body class="grain-overlay">           <!-- grain global -->
<main class="pattern-grid">             <!-- textura de fundo -->
<div class="frame">…</div>              <!-- bordas verticais -->
<span class="crosshair"></span>         <!-- ornamento -->
```

## Snippet de referência (extraído de sinapse-crm globals.css)

### Grain overlay (sempre ativo)
```css
.grain-overlay::after {
  content: ''; position: fixed; inset: -50%;
  pointer-events: none; z-index: 9999; opacity: 0.06;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='280' height='280'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  animation: grainShift 8s steps(10) infinite;   /* keyframe em motion-pack */
  mix-blend-mode: overlay;
}
```

### Patterns (vanta-tuned)
```css
.pattern-grid {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' shape-rendering='crispEdges'><path d='M40 0 L0 0 0 40' fill='none' stroke='white' stroke-opacity='0.06' stroke-width='1'/></svg>");
  background-size: 40px 40px;
}
.pattern-dots {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><circle cx='1' cy='1' r='1' fill='white' fill-opacity='0.24'/></svg>");
  background-size: 16px 16px;
}
.pattern-crosshair {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' shape-rendering='crispEdges'><path d='M30 24 L30 36 M24 30 L36 30' stroke='white' stroke-opacity='0.20' stroke-width='1' fill='none'/></svg>");
  background-size: 60px 60px;
}
```
> No tema bone, trocar `stroke='white'` por `stroke='black'` via `[data-theme="bone"] .pattern-*` (já existe no sinapse-brand).

### Crosshair CSS-only (ornamento, do guia claude-code-push)
```css
.crosshair { position: relative; }
.crosshair::before, .crosshair::after { content: ''; position: absolute; background: var(--color-foreground); }
.crosshair::before { left: 50%; top: 0; bottom: 0; width: 1px;  transform: translateX(-50%); }
.crosshair::after  { top: 50%; left: 0; right: 0; height: 1px; transform: translateY(-50%); }
```

### Frame (bordas verticais — chassi de documento)
```css
.frame { border-left: 1px solid var(--color-border); border-right: 1px solid var(--color-border); }
```

### Uso em React (AppShell main, do sinapse-crm)
```tsx
<main className="flex-1 overflow-x-hidden relative">
  <div className="absolute inset-0 pattern-grid opacity-50 pointer-events-none" />
  <div className="relative z-10">{children}</div>
</main>
```

## Variantes
| Classe | Uso |
|--------|-----|
| `pattern-grid` | fundo de app/dashboard (sutil, opacity-50) |
| `pattern-dots` | hero, seções editoriais |
| `pattern-crosshair` | acento técnico |
| `pattern-plus/rings/circuit` | catálogo brandbook |
| Texturas editoriais (carrosseis-lab): `bg-topo/blueprint/halftone/hatch` | peças editoriais/carrossel |

## Aparece em
`caio__sinapse-brand` (catálogo completo + variantes vanta), `caio__sinapse-crm`, `caio__carrosseis-lab` (texturas 3 intensidades + lib editorial), `soier__claude-code-push-guide` (grain + crosshair CSS-only), `soier__colegio-modulo` (`.texture-paper` 3% + `.texture-grid-lines`).

## Dívidas a corrigir antes de promover
- Ausência de identity layer = "cheira a template" (astro-saas, snps que declara "no grain", sp3site, fdconcept, eusoier). Forçar mínimo 2 camadas.
- Consolidar a lib de texturas do carrosseis-lab (hoje copiada byte-a-byte nos HTMLs) em `identity.css` compartilhado — é o ativo mais valioso daquele repo.
