# Guide chassi (single-file B&W)

## Propósito
Chassi de documento/guia HTML estático single-file (zero build, deploy GitHub Pages/Vercel trivial): frame com bordas verticais + topbar/footer mono + steps numerados (counter CSS) + code-block invertido (`data-lang`) + tag pill `[colchetes]` + grain/crosshair. 100% fiel ao brandbook B&W. O `claude-code-push-guide` é o único 100% fiel — usar como referência (não o setup-guide que derrapa pra teal).

## API
Não é React — é estrutura HTML + CSS inline `:root`. Tokens herdados de `@sinapse/tokens` colados inline.

## Snippet de referência (extraído de soier__claude-code-push-guide/index.html)

### Tokens + base
```css
:root {
  --vanta: #0A0A0A;   /* nunca #000 */
  --bone:  #F5F5F0;
  --rule:  rgba(10,10,10,0.1);
  --rule-strong: rgba(10,10,10,0.2);
  --muted: rgba(10,10,10,0.55);
}
body { background: var(--bone); color: var(--vanta); font-family: 'Inter', system-ui, sans-serif; }
a { border-bottom: 1px solid var(--rule); }
a:hover { border-color: var(--vanta); }
```

### Hero fluido (escapa a dead-zone)
```css
.hero h1 { font-family: 'Sora', sans-serif; font-weight: 300; font-size: clamp(72px,14vw,180px); line-height: 0.92; letter-spacing: -0.04em; }
/* crosshair ornamento CSS-only — ver identity-layer.md */
```

### Step numerado (counter CSS, Sora 64px)
```css
section.step .index {
  font-family: 'Sora', sans-serif; font-weight: 300;
  font-size: 64px; line-height: 1; letter-spacing: -0.03em; color: var(--vanta);
}
section.step h2 { font-family: 'Sora', sans-serif; font-weight: 400; font-size: clamp(1.75rem,4vw,2.5rem); line-height: 1.15; letter-spacing: -0.01em; }
```
```html
<section class="step">
  <div class="index">01</div>
  <div class="body">
    <span class="tag">setup</span>
    <h2>Instale o CLI</h2>
    <p>…</p>
  </div>
</section>
```

### Code block invertido (data-lang label)
```css
pre {
  font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.7;
  background: var(--vanta); color: var(--bone);
  padding: 24px 28px; margin: 24px 0; overflow-x: auto; position: relative;
  border: 1px solid var(--vanta);
}
pre::before {
  content: attr(data-lang);
  position: absolute; top: 8px; right: 14px;
  font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(245,245,240,0.4);
}
```
```html
<pre data-lang="bash"><code>npm i -g @sinapse/cli</code></pre>
```

### Tag pill [colchetes] + note callout + install-box copiável
```css
.tag { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--vanta); }
.tag::before { content: "[ "; } .tag::after { content: " ]"; }
.note { border-left: 2px solid var(--vanta); padding: 8px 0 8px 20px; margin: 24px 0; font-size: 14px; color: rgba(10,10,10,0.7); }
```
> `install-box` copiável (comando + botão copy) herdado do sinapse-setup-guide — ótimo pra LP de produto CLI.

## Variantes / componentes do chassi
| Componente | uso |
|-----------|-----|
| frame (bordas verticais) | container do documento |
| step numerado (counter) | walkthrough/onboarding |
| code-block `data-lang` | docs técnicas |
| tag `[colchetes]` | label mono |
| note callout | aviso |
| comparison table `.yes/.partial/.no` | tabela de features |

## Aparece em
`soier__claude-code-push-guide` (referência 100% B&W fiel), `soier__sinapse-setup-guide` (deriva pra teal `#00D4AA` — **não** usar como default), `caio__caioimori-pages` (variante claude isolada + rule file de DS).

## Dívidas a corrigir antes de promover
- O setup-guide usa accent teal `#00D4AA` e `#0a0a0f` azulado — **descartar**, manter B&W puro do push-guide.
- Remover tokens mortos (`--void #000`, `--success`, `--error` declarados e nunca usados).
- Frame fixo `max-width:1280px` → trocar por `min(92vw, 1280px)` ou container fluido.
- Honrar `prefers-reduced-motion` (setup-guide não honra — orb sempre animado).
