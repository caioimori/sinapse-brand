---
status: CHECKPOINT — ready to resume
last_session: 2026-04-19
trigger_on_resume: usuário diz "voltei"
next_action: executar crawl completo das 10 refs via chrome-devtools MCP e refinar extraction doc, depois executar FASE A
---

# SESSION RESUME — SINAPSE Brand

> **Quando o usuário disser "voltei" em nova sessão, leia este arquivo COMPLETO antes de qualquer coisa. Ele te traz de volta ao ponto exato.**

---

## 1. Onde paramos (última ação concluída)

1. Refatorei toda a home, quebrou com cache webpack, limpei `.next`, recuperou
2. Criei 10 páginas navegáveis reais (Guidelines, Foundations+Typography+Color+Spacing, Logo, Icons, Effects, Motion, Token Export)
3. Footer completo aiox-style com sitemap decimal (4 colunas: Brandbook · Design System · Socials)
4. Criei `docs/ORCHESTRATION-PLAN-V2.md` — plano mestre pro próximo passo
5. WebFetch das 10 refs → criei `docs/research/references-extraction.md` com 30 padrões identificados (80% confidence — animações inferidas por limitação SPA sem JS render)
6. Chrome-devtools MCP **desconectou** no meio da sessão → não voltou sem restart do Claude Code
7. Chrome debug port 9222 confirmado **UP** (user rodou `chrome-ensure`)
8. Usuário vai fechar Claude Code e abrir nova sessão — quando voltar, MCP reconecta e eu tenho que executar o crawl visual completo

---

## 2. ESTADO DO REPO

### Rotas funcionando (build verde)
```
/
/brandbook/0.0-guidelines           (visual — 12 princípios + filosofia + contrast + functional isolation)
/brandbook/2.0-foundations          (índice 6 cards)
/brandbook/2.1-typography           (3 famílias + scale + alfabeto + rules)
/brandbook/2.2-color                (13 steps + semantic + functional + rules)
/brandbook/2.3-spacing              (14-step + named + radius + z-stack + breakpoints)
/brandbook/3.0-logo                 (MDX placeholder — precisa virar visual FASE B)
/brandbook/4.0-icons                (30 glyphs Lucide + 4 sizes + 6 rules)
/brandbook/11.0-effects             (patterns + frames + dividers + interactions)
/brandbook/14.0-motion              (easings + durations + 9 animations + reduced-motion)
/brandbook/token-export             (killer — CSS vars Bone/Vanta + Tailwind preset + Copy)
```

### Componentes shared em `components/brand/`
`container · nav · footer · meta · page-header · copy-button`

### Stack
Next.js 15 + React 19 + TS + Tailwind + MDX + Sora + Inter + JetBrains Mono + Lucide

### CSS patterns disponíveis em `app/globals.css`
`pattern-grid · pattern-dots · pattern-crosshair · grain-overlay · hud-frame · hud-frame-full · frame-tech · frame-tech-lg · frame-notch · hazard-stripes · divider-tech · scanlines · crosshair-deco · giant-number · magnet · link-reveal · reveal · draw-line · marquee · symbol-hero · float-rotate`

### Dev server
- Rodando em `http://localhost:3000`
- Se der runtime error após sessão nova → `taskkill //F //IM node.exe; rm -rf .next; npx next dev`

---

## 3. DECISÕES LOCKED (não negociar)

- **Paleta**: B&W radical (Vanta `#0A0A0A` + Bone `#F5F5F0`), zero accent cromático
- **Funcionais**: `--destructive #FF3A2D` + `--success #00C853` (FORA do brand)
- **Tipografia**: Sora (display) · Inter (sans) · JetBrains Mono (mono)
- **Edições**: Bone default + Vanta opcional via `[data-theme="vanta"]`
- **Light-first** (90% das LPs SINAPSE são light)
- **Persona-mentor**: Rick Rubin
- **Arquétipo**: Magician 45% + Sovereign 35% + Creator 20%
- **ICP**: empresários médios/grandes com estrutura consolidada
- **Logo contrast rule**: bg claro → logo vanta · bg escuro → logo bone. Vale pra tudo.

Tudo em `docs/DECISIONS.md`.

---

## 4. PLANO v2 (docs/ORCHESTRATION-PLAN-V2.md)

**8 fases modulares (~30h):**

- **FASE A** Infra crítica: header + sidebar + custom cursor + scroll progress + patterns 2x opacity + scroll-driven reveals (3-4h)
- **FASE B** Logo 3.0 visual completo com aplicações (2h)
- **FASE C** Brandbook faltante: 1.0 Movimento, 2.4 Surfaces, 2.5 Motion Tokens, 2.6 Semantic, 5.0 Moodboard, 6.0 Estratégia (4-5h)
- **FASE D** Design System core: 0.0 Components, Buttons, Cards, Forms, Feedback, States, Tables, etc (6-8h)
- **FASE E** Templates: Landing + Dashboard + Proposta 9-slides + Contrato + Carrossel IG + Deck (4-5h)
- **FASE F** Módulos SINAPSE: Copy Lab + AI Prompts + Social Kit (5-6h)
- **FASE G** Showcase (2h)
- **FASE H** Polish + Deploy Vercel (2-3h)

**Ordem recomendada MVP**: A → B → C (só 1.0 + 5.0) → D (só 0.0, 1.0, 2.0) → E (só hub) → G → depois iterar.

### 5 decisões do usuário pendentes (plano v2 §Sign-off)

1. Escopo completo ok ou corta?
2. Executar A→H seguido ou pausa em cada fase?
3. Theme toggle real funcional ou Bone-only v1?
4. Templates comerciais priorizar FASE C/E? (alto valor $)
5. Módulos SINAPSE v1 ou v2?

---

## 5. REFS — o que fazer quando voltar

### Arquivo chave
`docs/research/references-extraction.md` — 30 padrões mapeados via WebFetch (80% confidence)

### As 10 refs (URLs)
```
1.  https://sp3company.com/               (healthcare growth — signal baixo)
2.  https://www.abacatepay.com/           (Next.js · AI chat · testimonials carousel)
3.  https://stripe.com/br                 (bento · carrossel infinito · acordeão · fotografias conceituais)
4.  https://www.itsoffbrand.com/          ⭐ B&W alto contraste · WebGL+Rive · símbolos decorativos · grid de +
5.  https://nyo.ia.br/                    ⭐ // prefix · loading counter · hora local dinâmica · tabela comparativa
6.  https://digitalflagship.com/          (Shopify partner · cards 650x650 · sem animações ambiciosas)
7.  https://www.overlay.com/              (timeline diacrônica · SVG frames · AVIF gradients · robotics)
8.  https://www.euclidpower.com/          (5-step Chaos→Clarity · numbers como design · minimal corporate)
9.  https://www.story.foundation/         ⭐ rings concêntricos · IP graphs · data-driven minimal
10. https://thegrid.ai/                   (video bg loops · MENU_ dropdown · trading aesthetic)
```

### Os 30 padrões a absorver (resumo)
**Visual/Layout (10):** hero full-bleed · light/dark alternance · bento grid · cards lockup · tabela A-vs-B · narrativa 5-passos · logos carousel · portfolio cards grandes · timeline diacrônica · rings concêntricos

**Animações (10):** loading counter · custom cursor · scroll-pin · video bg loops · accordion rich · hora local · carrossel auto-rotate · magnetic hover · image transitions · image masks/reveals

**Tipografia/Micro (7):** `//` prefix · símbolos ● △ ⁂ → · números grandes decorativos · maiúsculas em H2 · line breaks estratégicos · grid de símbolos repetidos · ring SVG decorativo

**Avançadas (3):** WebGL/Rive moments · gradientes AVIF · CDN optimization

### FASE A já planejada com absorções
**8 adições**: loading counter 00→100→SINAPSE · cursor blend · símbolos em meta labels · hora local + LIVE no footer · scroll progress bar · `.pattern-plus` + `.pattern-rings` novos · patterns opacity 2x

---

## 6. QUANDO O USUÁRIO DISSER "VOLTEI"

### Passo 1 — valida infra
```bash
curl -sf http://127.0.0.1:9222/json/version
```
Se retornar JSON → Chrome up. Se não → `"C:/Users/Caio Imori/.sinapse/bin/chrome-ensure"`.

### Passo 2 — confirma MCP online
```
ToolSearch: select:mcp__chrome-devtools__new_page,mcp__chrome-devtools__navigate_page,mcp__chrome-devtools__take_screenshot,mcp__chrome-devtools__evaluate_script,mcp__chrome-devtools__wait_for
```
Se aparecer → seguir. Se não aparecer → pedir pro user reiniciar Claude Code (Chrome já up, reconecta de primeira).

### Passo 3 — crawl das 10 refs
Pra CADA ref (navega + wait + screenshot + evaluate CSS vars + scroll inspection):

```js
await navigate(url);
await wait(3000);

// Fonts + root CSS vars
evaluate: `
  const root = getComputedStyle(document.documentElement);
  const body = getComputedStyle(document.body);
  const h1 = getComputedStyle(document.querySelector('h1'));
  return {
    body_font: body.fontFamily,
    bg: body.backgroundColor,
    h1_font: h1.fontFamily,
    h1_size: h1.fontSize,
    h1_weight: h1.fontWeight,
    tokens: [...Object.keys(root)].filter(k=>k.startsWith('--')),
    scroll_height: document.documentElement.scrollHeight
  }
`;

// Screenshots
take_screenshot full-page

// Scroll through to capture animated states
for (let y of [0, 25%, 50%, 75%, 100%]) { scroll; screenshot; }
```

Salvar TUDO em `docs/research/refs-crawl/` (uma subpasta por ref + consolidado).

### Passo 4 — refinar extraction doc
Atualizar `docs/research/references-extraction.md` com dados CONFIRMADOS (fontes exatas, hex exatos, animações observadas via scroll shots).

### Passo 5 — apresentar síntese refinada + pedir decisões pendentes (5 questões do plano v2)

### Passo 6 — executar FASE A após aprovação

---

## 7. ARTEFATOS IMPORTANTES

| Arquivo | Propósito |
|---|---|
| `docs/DECISIONS.md` | Decisões travadas |
| `docs/PRD.md` | Visão original |
| `docs/ARCHITECTURE.md` | Estrutura de pastas + tokens |
| `docs/ROADMAP.md` | Fases antigas (superado pelo v2) |
| `docs/ORCHESTRATION-PLAN-V2.md` | **Plano mestre atual** |
| `docs/SESSION-CHECKPOINT.md` | Checkpoint anterior (sessão 1) |
| `docs/SESSION-RESUME.md` | Este arquivo — resume a nova sessão |
| `docs/research/references-extraction.md` | Extração WebFetch das 10 refs (80% confidence) |
| `docs/research/aiox-full-crawl/` | Crawl completo aiox via chrome-devtools (100% confidence) |
| `docs/research/00-consolidated-insights.md` | Benchmarks originais |

---

## 8. LEMBRETES CRÍTICOS

- **NÃO rodar `npx next build` com dev server rodando** — corrompe `.next` cache (aconteceu 2x na sessão anterior)
- **Story files precisam `status: "Ready"` COM ASPAS** pra hook `enforce-story-gate.cjs` não bloquear (bug regex greedy)
- **Logo contrast regra**: bg claro → vanta/* · bg escuro → bone/* (invertido)
- **Patterns opacity sobe 2x em Bone** (sem isso invisível)
- **Performance**: evitar múltiplos `backdrop-blur` + animações simultâneas sem `will-change`

---

## FIM — ready to resume quando user disser "voltei"
