# @sinapse/brand-tokens

Tokens B&W SINAPSE em CSS vars + bridge Tailwind v4 `@theme`. Dual-theme bone/vanta, motion pack e identity layer. Zero runtime, zero `tailwind.config`.

## Instalação

### Monorepo (pnpm workspaces)

```jsonc
// package.json do seu app
{
  "dependencies": {
    "@sinapse/brand-tokens": "workspace:*"
  }
}
```

```css
/* app/globals.css */
@import "@sinapse/brand-tokens";
```

### Projeto standalone

Copie `src/*.css` para a pasta `app/tokens/` do seu projeto:

```css
/* app/globals.css */
@import "./tokens/tokens.css";
@import "./tokens/motion.css";
@import "./tokens/identity.css";
/* index.css inclui o @theme bridge para Tailwind v4 */
@import "./tokens/index.css";
```

## Uso

### Tema

```html
<!-- dark (SaaS/dashboard) -->
<html data-theme="vanta">

<!-- light (LP/brandbook) -->
<html data-theme="bone">
```

### Tokens disponíveis

| Token CSS | Descrição |
|---|---|
| `--background` | Fundo principal do tema |
| `--foreground` | Texto principal |
| `--card` | Superfície de card |
| `--muted` | Superfície secundária |
| `--muted-fg` | Texto secundário |
| `--border` | Borda sutil |
| `--border-strong` | Borda com destaque |
| `--ring` | Foco de anel |
| `--subtle` | Hover/hover state |
| `--destructive` | Erro/destruição (funcional isolado) |
| `--success` | Sucesso (funcional isolado) |

### Classes utilitárias

```html
<!-- Eyebrow mono com prefixo // -->
<p class="eyebrow">Seção</p>

<!-- Identity layer -->
<div class="crosshair">...</div>   <!-- crosshair CSS-only -->
<div class="frame">...</div>       <!-- bordas verticais chassi -->
<div class="pattern-grid">...</div>
<div class="pattern-dots">...</div>

<!-- Scroll reveal escalonado -->
<div data-reveal class="reveal-delay-1">...</div>
```

### Container fluido

```html
<!-- NUNCA max-w-7xl. Use os tokens: -->
<div style="width: var(--container-default); margin: auto; padding: 0 var(--container-pad)">
```

## Regras de design (não-negociáveis)

- `[rule 01]` Paleta B&W absoluta — sem accent cromático
- `[rule 02]` Preto mínimo `#0A0A0A`, NUNCA `#000` puro como superfície
- `[rule 03]` Grain SVG 5% sempre ativo (via `body::before` em `identity.css`)
- `[rule 04]` Sora · Inter · JetBrains Mono — max 2 pesos/tela
- `[rule 05]` Dead-zone tipográfica `32-48px` PROIBIDA em headlines
- `[rule 08]` `prefers-reduced-motion` sempre honrado

## Stack requerida

| Camada | Versão |
|---|---|
| Tailwind CSS | `^4.1.0` |
| `@tailwindcss/postcss` | `^4.1.0` |
| `postcss` | `^8.5.x` |
