---
status: crawl completo
crawl_date: 2026-04-18
pages_crawled: 11 críticas (token-export, foundations, typography, movimento, guidelines, logo, spacing-layout, semantic-tokens, patterns, effects, templates, icons, motion, home)
pages_skipped: 20+ (components/variations já cobertos pelos primitivos)
completeness: ~95% do modelo estrutural
---

# aiox Brand System — MASTER FINDINGS

## Veredito

O aiox squad é um sistema **DARK-FIRST com accent cromático forte (Lime #D1FF00 OU Gold #DDD1BB)**, distribuído em **31 páginas decimais** sob `brand.aioxsquad.ai`. Estruturalmente é o melhor modelo que encontramos pra clonar — visualmente é o OPOSTO do SINAPSE (B&W radical sem accent).

**SINAPSE = aiox estrutural + Vignelli visual.**

## Os 10 maiores "roubos" estruturais (clonar)

### 1. Domínio dedicado
`brand.sinapse.{tld}` — brand é produto, não tab do marketing site.

### 2. Numeração decimal hierárquica
`0.0 · 1.0 · 2.0 ... 16.0` em toda seção. Cria autoridade e cita-bilidade ("ver 2.0 Foundations · Color").

### 3. 3 pilares navegáveis no footer
Brandbook (estratégia) · Design System (execução) · Showcase (prova). Cada um com nav própria.

### 4. Página `/token-export` — KILLER FEATURE
Toggle tema (Lime/Gold) + CSS variables prontas em hex + botão "Copy CSS". Compat com Tailwind v3/v4 + shadcn + Lovable. Sem dependência oklch.
**SINAPSE**: replicar com nossos 2 temas B&W (ex.: Edition 01 "Void" + Edition 02 "Cream").

### 5. Shadcn mapping explícito
Ponte declarada: `--background → --bb-dark → #050505`. Torna o sistema imediatamente consumível.

### 6. 14-step numeric spacing
Não T-shirt sizes — escala numérica precisa 0/4/8/12/15/20/30/40/60/80/90/120/150/180.

### 7. 5 tier named spacing paralelo
xs/sm/md/lg/xl como atalhos semânticos + escala numérica pra precisão.

### 8. Categorização de uso de spacing
space 0-3 micro · 4-6 components · 7-11 section · 12-13 editorial — guia decisão.

### 9. Layer Z-stack nomeado
nav 100 · dropdown 200 · overlay 300 · modal 400 · toast 500. Evita conflitos.

### 10. 13 seções do brandbook estratégico
Manifesto · Propósito & Valores · Valores Corporativos · Arquétipo (%) · Posicionamento · Contraste · BrandScript · Truelines · Naming · Vocabulário · Traits · Jornada · Depoimentos · Visual · Contrato · Fundadores.

### 11. Arquétipo ponderado em %
Não categórico — mix explícito (Outlaw 50% + Magician 35% + Explorer 15%) com analogia cultural ("Morpheus em Matrix").

### 12. Dual Voice
Voz do produto (institucional) vs voz do fundador (humana). Regra: "Alan atrai. AIOX retém e entrega."

### 13. Vocabulário allow/block
Lista concreta de power words + palavras banidas. Não é "tom de voz abstrato".

### 14. 5 dimensões do tom (bipolar)
Formal↔Informal · Sério↔Divertido · Técnico↔Acessível · Distante↔Próximo · Arrogante↔Humilde

### 15. Jornada do Herói com depoimentos REAIS por fase
Não é narrativa fictícia — cada fase tem quote real do cliente.

### 16. Contrato da Marca bilateral
"Nossas promessas" + "o que exigimos do cliente" + manifesto juramento em 1ª pessoa.

### 17. Motion vocabulary nomeado
8 animações com NOME + duração + contexto de uso (Orchestration Pulse · Speed Lines · Particle Orbit · Logo Dissolve · Morphing Square · Glitch Reveal · Stagger Letters · Brand Reveal).

### 18. 6 categorias de pattern como CSS classes
Grid (8 variants) · HUD Frames (8 variants) · Hazard · Circuit · Textures · Dividers. Classe CSS reusável, não componente React pesado.

### 19. Templates como shells copy-paste
Page Shell · Bento Dashboard · Auto-fit Content Grid. Snippet HTML pronto.

### 20. Icon system minimalista
4 tamanhos canônicos (16/24/32/48) · stroke 2px · viewBox 24x24 · round caps · fill none · currentColor · 44px touch target.

### 21. Dark Cockpit philosophy frase-matriz
Uma frase justifica todas decisões de token ("zero distração, foco total na informação — cockpit de aviação").

### 22. Stats como prova no homepage
60+ componentes · 27 páginas · 4 pilares · 100% tokens — métricas exibidas como credencial.

## Diferenças SINAPSE vs aiox (mantemos o nosso caminho)

| Dimensão | aiox | SINAPSE |
|---|---|---|
| Filosofia | Dark Cockpit (cockpit de aviação) | B&W Radical (Vignelli/Rams restrição) |
| Cor acento | Lime #D1FF00 OU Gold #DDD1BB | ZERO brand accent cromático |
| Temas | 2 edições Lime + Gold | 2 edições B&W (Void + Cream? a decidir) |
| Cor funcional | Blue #0099FF + Flare #ED4609 + Error #EF4444 | Error #EF4444 único |
| Fonte display | TASA Orbiter 800 | TBD (candidatos: PP Editorial, PP Neue Montreal, Söhne, nossa autoral) |
| Fonte sans | Geist | TBD (Geist ou Inter) |
| Fonte mono | Roboto Mono 500 | Geist Mono ou JetBrains Mono |
| Patterns | Tech-heavy (HUD, PCB, scanlines, hazard) | Editorial (grain, grid tipográfico, ornamentos sutis) |
| Arquétipo | Outlaw/Magician/Explorer (Morpheus) | TBD (decidir Caio+Soier) |
| Persona-mentor | Morpheus (Matrix) | TBD (qual nossa figura?) |
| Posicionamento | Devolver poder de criar | TBD |

## Token-export SINAPSE — proposta draft (B&W)

```css
/* SINAPSE Brand — Void Edition (Dark) */
:root {
  --background: #0A0A0A;
  --foreground: #F5F5F0;
  --primary: #F5F5F0;       /* branco quente = brand */
  --primary-foreground: #0A0A0A;
  --card: #141414;
  --card-foreground: #F5F5F0;
  --muted: #1F1F1F;
  --muted-foreground: rgba(245,245,240,0.45);
  --accent: rgba(245,245,240,0.08);
  --accent-foreground: #F5F5F0;
  --destructive: #EF4444;
  --destructive-foreground: #FFFFFF;
  --border: rgba(255,255,255,0.1);
  --input: rgba(255,255,255,0.14);
  --ring: rgba(255,255,255,0.3);
  --radius: 0.25rem;        /* mais restritivo que aiox (0.5rem) */

  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --font-display: "PP Editorial New", serif;  /* tentativa */

  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-decel: cubic-bezier(0, 0, 0.2, 1);
}

/* SINAPSE Brand — Cream Edition (Light) */
/* paleta invertida — cream background #F5F5F0, foreground #0A0A0A */
```

## Próximo passo recomendado

1. Caio/Soier decidirem:
   - Nome das 2 edições (Void/Cream? Graphite/Paper? outro?)
   - Fonte display (exige licenciar ou self-host — TASA é paga, PP Editorial é paga; alternativa OSS: Space Grotesk, Fraunces, Redaction)
   - Fonte sans (Geist vs Inter)
   - Mix de arquétipo SINAPSE (3 personalidades + %)
   - Persona-mentor cultural (SINAPSE = quem em que filme/livro?)

2. Atualizar PRD + ARCHITECTURE + ROADMAP com correções descobertas (sumário no próximo doc)

3. Iniciar FASE 0 (scaffold do repo `sinapse-brand`)

## Inventário de páginas do aiox (completo)

### Brandbook (estratégia)
- `/brandbook/guidelines` ✓ crawleada
- `/brandbook/movimento` ✓ crawleada (13 seções completas)
- `/brandbook/foundations` ✓ crawleada (índice)
- `/brandbook/logo` ✓ crawleada
- `/brandbook/icons` ✓ crawleada
- `/brandbook/moodboard` — skipped
- `/brandbook/typography` ✓ crawleada
- `/brandbook/color-tokens` — skipped (coberto por semantic + export)
- `/brandbook/spacing-layout` ✓ crawleada
- `/brandbook/surfaces` — skipped
- `/brandbook/semantic-tokens` ✓ crawleada
- `/brandbook/token-export` ✓ crawleada (KILLER)

### Design System (componentes)
- `/brandbook/components` — skipped (index)
- `/brandbook/buttons` · `/cards` · `/forms` · `/feedback` · `/states` · `/tables` · `/lists` · `/charts` · `/sections` · `/lp-sections` · `/navigation` · `/flow-diagram` · `/advanced` · `/vfx` · `/seo` — skipped (variações de primitivos)
- `/brandbook/effects` ✓ crawleada
- `/brandbook/patterns` ✓ crawleada
- `/brandbook/templates` ✓ crawleada
- `/brandbook/motion` ✓ crawleada

### Showcase (prova)
- `/brandbook/editorial` · `/brandbook/showcase/mockups` · `/apparel` · `/outfits` · `/jackets` · `/sneakers` · `/avatars` · `/calc-squad` · `/slides` — skipped (aplicações físicas/mockups, não estrutura)

### Outros
- `/pitch-deck/pitch-overview` — skipped
- `/workspace` — skipped
- `/brandbook/brownfield-discovery` — skipped
