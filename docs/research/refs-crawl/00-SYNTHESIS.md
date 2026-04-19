---
status: 100% confidence — dados ao vivo via chrome-devtools MCP
date: 2026-04-19
sources: 10 refs crawladas (CSS computed, fonts loaded, screenshots full-page)
supersedes: docs/research/references-extraction.md (80% WebFetch)
---

# SÍNTESE REFINADA — 10 Refs Crawladas

## TL;DR — 5 padrões CONFIRMADOS que mudam decisões

| # | Padrão | Confirmação | Impacto SINAPSE |
|---|---|---|---|
| 1 | **H1 weight 400 em display gigante** | Off+Brand 137px/400 · Story 88px/400 · NYO 79px/400 · TheGrid 65px/400 · Stripe 44px/300 | **MUDAR Sora display de 700→400.** Hierarquia por TAMANHO, não por WEIGHT. |
| 2 | **Single-family system (display+mono mesma família)** | Off+Brand (Ataero único) · Story (Diatype+DiatypeMono) · Euclid (Roobert+RoobertSemiMono) · TheGrid (r+d+dm custom) | **Substituir Sora+Inter+JetBrains por par único** — recomendação: **Geist + Geist Mono** (Vercel, OFL, free). |
| 3 | **`//` prefix + `MENU_` underscore** | NYO (`//SOLUÇÃO`, `//FAQ` ubíquo) · TheGrid (`MENU_`) | **Adotar `//` em TODOS eyebrows/section labels SINAPSE.** Não decoração — sistema. |
| 4 | **Off-white quente para "Bone"** | Off+Brand `#E5E4E0` · Overlay `#FBF9FB` · Story `#FFF` puro · TheGrid `#F0F3F5` cold | **Nosso Bone `#F5F5F0` está alinhado.** Considerar variant `cold` (`#F0F3F5`) e `pure` (`#FFF`). |
| 5 | **Vanta entre `#000` e `#1D1D1D`** | NYO `#000` puro · TheGrid `#0A0D0F` · Off+Brand `#1D1D1D` · DigitalFlagship `#060616` midnight | **Nosso Vanta `#0A0A0A` está exatamente no meio do espectro.** Manter. Adicionar variant `pure-black` (`#000`) e `midnight` (`#060616`). |

---

## TABELA COMPLETA — 10 refs lado a lado

| Ref | Bg | Text | H1 | Display Font | Body Font | Mono | Single-family? | Padrão único |
|---|---|---|---|---|---|---|---|---|
| 1. sp3 | #FFF | #020817 | 48/700 | sans system | sans system | — | ❌ shadcn template | workflow card animado |
| 2. abacatepay | #EFF1E7 | OKLCH dark | 68/600 Fustat | Inter Tight | Inter | ❌ DaisyUI | calculadora interativa |
| 3. stripe | #FFF | #000 | 44/**300** | sohne-var | sohne-var | SourceCodePro | ✅ sohne única | weight 300 + canvas hero |
| 4. **off+brand** ⭐ | #1D1D1D | #E5E4E0 | **137**/400 | Ataero | Ataero | — | ✅ Ataero única | grid de + + size hierarchy |
| 5. **nyo** ⭐ | #000 | #FFF | 79/400 | Sequel Sans | Sequel Sans | Geist Mono | ✅ Sequel única | `//` prefix + clock vivo |
| 6. flagship | #060616 | #FFF | **480**/900 | Rama Gothic | Helvetica | — | ❌ 3 fontes | display 480px + condensed |
| 7. overlay | #FBF9FB | #2E2F53 | 72/400 | PP Editorial | Roboto Flex | Geist Mono 300/400/500 | ❌ serif+sans+mono | AVIF + 14 SVGs |
| 8. euclid | #FFF | #07091B | 64/**500** | Roobert | Roobert | **Roobert SemiMono** | ✅ Roobert única | sans+mono mesma família |
| 9. **story** ⭐ | #FFF | #000 | 88/400 | ABC Diatype | Diatype | Diatype Mono | ✅ Diatype única | 56 SVGs + Next.js fontopt |
| 10. **thegrid** ⭐ | #0A0D0F | #F0F3F5 | 65/400 | r (custom) | d (custom) | dm (custom) | ✅ família custom | `MENU_` + 5 videos bg |

---

## DECISÕES TIPOGRÁFICAS — recomendações concretas

### Opção A — Manter Sora (low-risk)
- Sora 400 (display gigante hero) — **NÃO 700**
- Sora 400 (body 16px)
- Sora 600 (UI buttons/labels — quando precisar peso)
- Inter 400/500 — **REMOVER** (redundância com Sora)
- JetBrains Mono 400 — manter

### Opção B — Adotar single-family Geist (recomendada) ⭐
- **Geist Variable** 100-900 — display + body + UI (uma fonte só)
- **Geist Mono** 100-900 — mono accent + code
- **Eliminar Sora + Inter + JetBrains**
- Ganho: coesão visual extrema (paradigma Off+Brand/Story/Euclid), license OFL free, performance (1 family = 2 font files variable)
- Custo: refator brandbook 2.1 + globals.css + tailwind config (3-4h)

### Opção C — ABC Diatype (paga)
- Premium feel mas $$$ por seat. Pular.

---

## DECISÕES CROMÁTICAS — sistema expandido

| Token | Hex atual | Nova proposta | Uso |
|---|---|---|---|
| `--vanta` | `#0A0A0A` | manter | dark default |
| `--vanta-pure` | — | `#000000` | high-tech contexts (NYO style) |
| `--vanta-midnight` | — | `#060616` | luxury/noturno (Flagship style) |
| `--bone` | `#F5F5F0` | manter | light default warm |
| `--bone-pure` | — | `#FFFFFF` | minimal contexts (Story style) |
| `--bone-cold` | — | `#F0F3F5` | tech contexts (TheGrid style) |
| `--ink` | atual | manter | text dark on light |
| `--paper` | atual | manter | text light on dark |

---

## ANIMATIONS/TÉCNICAS confirmadas

| Técnica | Onde vimos | Implementar em SINAPSE |
|---|---|---|
| Hora local + GMT vivo | NYO `01:54:29 AM [GMT -3]` | ✅ FASE A já planejado |
| Data dinâmica | NYO `04/19/2026` | adicionar junto da clock |
| `//` prefix em labels | NYO ubíquo | ✅ FASE A — adicionar em meta labels |
| `MENU_` / `START_` underscore | TheGrid | adicionar em CTAs |
| Video bg loops 5x simultâneos | TheGrid | usar com cuidado em hero |
| Marquee testimonials | AbacatePay (X cards) | aplicar em /social-proof |
| Calculadora interativa | AbacatePay | aplicar em /pricing |
| 5-step Chaos→Clarity | Euclid | aplicar em /metodologia |
| AVIF format | Overlay | adotar como primary |
| 56 SVGs inline | Story | preparar `.frame-tech-svg` system |
| Workflow card pipeline | sp3 | aplicar em case study |
| Display 480px | Flagship | hero principal palavra-chave |
| H2 > H1 (inversão) | TheGrid | considerar pra brandbook experimental |

---

## REFS POR TIER DE INSPIRAÇÃO

**Tier S (DNA core — copiar paradigma):**
- ⭐⭐⭐ Off+Brand — single typeface + size hierarchy + `+` decorativo + B&W radical
- ⭐⭐⭐ NYO — `//` prefix + clock vivo + AI tone alinhado
- ⭐⭐ Story Foundation — single-family Diatype + light B&W puro
- ⭐⭐ TheGrid — `MENU_` + dark trading aesthetic

**Tier A (técnicas absorvíveis):**
- Stripe — weight 300 + canvas gradient + tipografia variable
- Euclid — par sans+mono mesma família + serif acento
- Flagship — display 480px + tipografia condensada

**Tier B (ideias específicas):**
- Overlay — AVIF + 14 SVGs frames + serif editorial
- AbacatePay — marquee X-cards + calculadora interativa

**Tier C (signal baixo, pular):**
- sp3company — shadcn template convencional

---

## PRÓXIMO PASSO

Antes de FASE A, decisões PENDENTES (do plano v2):

### 5 decisões para Caio aprovar:
1. **Tipografia: Opção A (manter Sora) ou Opção B (Geist single-family)?** ⚠️ alta inércia se mudar
2. **Bg: manter `#0A0A0A` Vanta + `#F5F5F0` Bone OU adicionar 4 variantes (pure/midnight/cold)?**
3. **Theme toggle real funcional na v1 ou Bone-only?**
4. **Templates comerciais (FASE E) prioritários ou só após D?**
5. **Módulos SINAPSE (FASE F) v1 ou v2?**

Após sign-off → executar FASE A com os 8 absorvíveis já planejados + 3 novos confirmados (data dinâmica, `MENU_` em CTAs, par variant Bone/Vanta).
