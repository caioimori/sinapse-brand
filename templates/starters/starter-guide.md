# starter-guide (documentação single-file — B&W SINAPSE)

> HTML estático single-file, tokens `:root` inline, zero build, deploy GitHub Pages/Vercel trivial. Chassi frame + topbar/footer mono + steps numerados (counter CSS) + code-block invertido (`data-lang`) + tag pill com colchetes + grain/crosshair + install-box copiável.
>
> **Base forense:** `soier__claude-code-push-guide` (único 100% fiel B&W) + `soier__sinapse-setup-guide` (install-box, mas derrapa pra teal — DESCARTADO) + `caio__caioimori-pages`.
> **Correções aplicadas vs. fonte:** removidos tokens mortos (`--void:#000`, `--success`, `--error` nunca usados); container fluido em vez de `max-width:1280px` travado; hero mantém `clamp()` no mobile (não cai pra px fixo).

> **Nota de stack:** este é o ÚNICO starter fora do Next 16. Para guias o single-file é a escolha certa (deploy trivial, zero supply chain). Se o projeto já é Next, use `starter-landing` com uma rota `/guia`.

---

## 1. Stack exata

| Camada | Versão | Nota |
|---|---|---|
| HTML5 | — | single-file `index.html` |
| CSS | inline no `<head>` | tokens `:root` herdados de `starter-tokens` |
| JS | vanilla, ~15 linhas | só copy-to-clipboard |
| Fontes | Google Fonts CDN | Sora · Inter · JetBrains Mono |
| Deploy | GitHub Pages / Vercel | zero build |

---

## 2. Estrutura de pastas

```
starter-guide/
├── index.html          # tudo aqui: tokens :root + chassi + conteúdo
├── .nojekyll           # GitHub Pages
└── README.md
```

---

## 3. Dependências

Nenhuma. Zero `package.json`, zero npm. Único request externo: Google Fonts (substituível por self-host).

---

## 4. Arquivo-base essencial — `index.html` (snippets reais)

### 4.1 `<head>` — tokens `:root` B&W inline (herdados de starter-tokens, sem mortos)

```html
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Guia · SINAPSE</title>
<meta name="description" content="Guia passo a passo." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet" />
<style>
  :root {
    --vanta: #0A0A0A;        /* preto mínimo, rule 02 */
    --bone:  #F5F5F0;
    --rule:        rgba(245,245,240,0.10);
    --rule-strong: rgba(245,245,240,0.20);
    --muted:       rgba(245,245,240,0.55);
    --ease-smooth: cubic-bezier(0.16,1,0.3,1);
    --container:   min(92vw, 1024px);   /* fluido — NÃO 1280px travado */
  }
  * { box-sizing: border-box; margin: 0; }
  body {
    background: var(--vanta); color: var(--bone);
    font-family: "Inter", system-ui, sans-serif;
    font-size: 15px; line-height: 1.6;
  }
  /* GRAIN identity layer (rule 03/11) */
  body::before {
    content: ""; position: fixed; inset: 0; z-index: 9999; pointer-events: none;
    opacity: 0.05; mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before { animation: none !important; transition: none !important; }
  }
</style>
</head>
```

### 4.2 Chassi — frame + topbar mono + hero `clamp()`

```html
<body>
<div class="frame">
  <header class="topbar">
    <span class="tag">guia</span>
    <span class="meta">SINAPSE · v1.0</span>
  </header>

  <main>
    <section class="hero">
      <h1>Como publicar<br>seu primeiro deploy</h1>
      <p class="lede">Passo a passo, do zero ao ar.</p>
    </section>

    <!-- STEPS com counter CSS -->
    <ol class="steps">
      <li><h3>Instale a CLI</h3><p>Rode o comando abaixo no terminal.</p>
        <div class="install-box">
          <code>npm i -g @sinapse/cli</code>
          <button onclick="copy(this)" aria-label="Copiar">copiar</button>
        </div>
      </li>
      <li><h3>Autentique</h3><p>Conecte sua conta.</p>
        <pre class="code" data-lang="bash"><code>snps login</code></pre>
      </li>
    </ol>
  </main>

  <footer class="footer"><span class="meta">© 2026 SINAPSE</span></footer>
</div>

<style>
  .frame {
    max-width: var(--container); margin: 0 auto; min-height: 100vh;
    border-left: 1px solid var(--rule); border-right: 1px solid var(--rule);
  }
  .topbar, .footer {
    display: flex; align-items: center; justify-content: space-between;
    height: 56px; padding: 0 clamp(1.5rem,4vw,4rem);
    border-bottom: 1px solid var(--rule);
  }
  .footer { border-bottom: 0; border-top: 1px solid var(--rule); }
  .meta { font-family: "JetBrains Mono", monospace; font-size: 10px;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
  /* TAG pill com colchetes ::before/::after (rule 11) */
  .tag { font-family: "JetBrains Mono", monospace; font-size: 11px;
         letter-spacing: 0.18em; text-transform: uppercase; }
  .tag::before { content: "[ "; opacity: 0.5; }
  .tag::after  { content: " ]"; opacity: 0.5; }

  .hero { padding: clamp(3rem,9vw,7rem) clamp(1.5rem,4vw,4rem); }
  /* clamp() FLUIDO — mantém no mobile, não cai pra px fixo */
  .hero h1 { font-family: "Sora", sans-serif; font-weight: 300;
             font-size: clamp(3rem, 8vw, 5.9rem); line-height: 0.95;
             letter-spacing: -0.03em; text-wrap: balance; }
  .lede { margin-top: 1.5rem; color: var(--muted); max-width: 42ch; }

  /* STEPS — counter CSS, index Sora 64px */
  .steps { counter-reset: step; list-style: none; padding: 0 clamp(1.5rem,4vw,4rem) 4rem; }
  .steps li { position: relative; padding: 2rem 0 2rem 5rem; border-top: 1px solid var(--rule); }
  .steps li::before {
    counter-increment: step; content: counter(step, decimal-leading-zero);
    position: absolute; left: 0; top: 1.5rem;
    font-family: "Sora", sans-serif; font-weight: 300; font-size: 64px;
    line-height: 1; color: var(--rule-strong);
  }
  .steps h3 { font-family: "Sora", sans-serif; font-weight: 400; font-size: 1.25rem; }

  /* CODE-BLOCK invertido com data-lang (DRY via attr) */
  .code { position: relative; margin-top: 1rem; padding: 1.25rem 1.5rem;
          background: var(--bone); color: var(--vanta); border-radius: 10px;
          font-family: "JetBrains Mono", monospace; font-size: 13px; overflow-x: auto; }
  .code::before { content: attr(data-lang); position: absolute; top: 8px; right: 12px;
                  font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.5; }

  .install-box { display: flex; align-items: center; gap: 1rem; margin-top: 1rem;
                 padding: 0.75rem 0.75rem 0.75rem 1.25rem; border: 1px solid var(--rule-strong);
                 border-radius: 10px; }
  .install-box code { flex: 1; font-family: "JetBrains Mono", monospace; font-size: 13px; }
  .install-box button { font-family: "JetBrains Mono", monospace; font-size: 10px;
                        text-transform: uppercase; letter-spacing: 0.12em; cursor: pointer;
                        padding: 0.5rem 0.9rem; border: 0; border-radius: 6px;
                        background: var(--bone); color: var(--vanta);
                        transition: opacity var(--ease-smooth) 150ms; }
  .install-box button:hover { opacity: 0.85; }

  @media (max-width: 768px) {
    .steps li { padding-left: 0; padding-top: 4.5rem; }
    .steps li::before { font-size: 48px; }
  }
</style>

<script>
  function copy(btn) {
    const code = btn.previousElementSibling.textContent.trim();
    navigator.clipboard.writeText(code).then(() => {
      const t = btn.textContent; btn.textContent = "copiado!";
      setTimeout(() => (btn.textContent = t), 1500);
    });
  }
</script>
</body>
</html>
```

---

## 5. Comando de scaffold

```bash
mkdir starter-guide && cd starter-guide
touch index.html .nojekyll
# colar o HTML acima em index.html

# deploy GitHub Pages:
git init && git add -A && git commit -m "guide" && git push
# Settings > Pages > deploy from main

# OU Vercel: vercel --prod  (detecta estático, zero config)
```

---

## 6. Checklist de validação

- [ ] `--vanta #0A0A0A` (nunca `#000`) — rule 02
- [ ] Zero token morto no `:root` (só o que é usado)
- [ ] Hero `clamp()` fluido inclusive no mobile (rule 05)
- [ ] Grain + frame + tag-colchetes presentes (identity layer, rule 03/11)
- [ ] Container fluido `min(92vw, 1024px)` — não largura travada
- [ ] `prefers-reduced-motion` honrado (rule 08)
- [ ] PT-BR com acentuação correta no conteúdo
