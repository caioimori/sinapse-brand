# story.foundation — crawl ⭐⭐ (paradigma single-family)

**Stack:** Next.js (font optimization).
**Fontes:** **`ABC Diatype` (display+body, pesos 200/400/600) + `ABC Diatype Mono` (400)**. **Single-family system genuíno: mesma família serif neutra + variant mono.** Mesma lição do Roobert mas mais limpa.
**Tema:** Bg `#FFFFFF` puro + text `#000` puro. **Light + B&W puro como SINAPSE.**
**H1:** ABC Diatype 88px / **400 (Regular)** — confirma padrão "weight 400 em display gigante" (Off+Brand 137px/400, NYO 79px/400, Story 88px/400). **Padrão consolidado: display em 400, NUNCA bold.**
**56 SVGs** — provável origem dos "rings concêntricos / IP graphs" mencionados na extraction (não detectados como `<circle>`, devem ser `<path>` ou `<g>`).
**Media:** has_video + has_canvas. **Scroll:** 10146px. Sections via div (não `<section>`).

## Sinal pro SINAPSE
**MÁXIMO — referência DNA #3** (light variant).

**Absorvíveis CRÍTICOS:**
1. **Single-family ABC Diatype + Diatype Mono** — confirma terceira vez (Off+Brand, Roobert, Diatype). **Decisão arquitetural: SINAPSE deve adotar par display+mono da MESMA família.** Opções:
   - **Geist + Geist Mono** (Vercel, free, OFL) ⭐ recomendação
   - ABC Diatype (paga, $)
   - Roobert + Roobert Semi Mono (paga, $)
2. **H1 88px / weight 400** — confirma "weight 400 em display = signature 2026". Nosso Sora atual em SemiBold é trend velha.
3. **B&W puro `#000` + `#FFF`** — Story usa preto puro em LIGHT. Nosso Vanta `#0A0A0A` (escuro) e Bone `#F5F5F0` (claro) podem ser MAIS sutis que necessário. Considerar variant "pure" `#000`/`#FFF` pra contextos high-tech.
4. **56 SVGs** — alta densidade visual via SVG inline. Prepara `.frame-tech-svg` system robusto.
5. **Sections via `<div>` ao invés de `<section>`** — sem semantic obvio porque o site é app-like.

## Screenshot
`full.webp`
