---
status: LOCKED (v1)
date: 2026-04-18
locked_by: Caio Imori
authority: este doc vence qualquer contradição em outros docs
---

# Decisões Fundadoras — SINAPSE Brand

## 1. Estrutura
✅ Clonar 22 "roubos" estruturais do aiox (ver `docs/research/aiox-full-crawl/00-MASTER-FINDINGS.md` §"Os 10 maiores roubos").

## 2. Filosofia visual
**Minimalismo brutal como base + ativação por motion/efeitos.**
UX/UI minimalistas → potencializados por animações, patterns, micro-interactions, efeitos. Interface artística que fisga.

## 3. Persona-mentor
**Rick Rubin** — minimalismo radical · ofício obsessivo · escala sem tocar instrumento · presença calada que comanda · workaholic sem hype. SINAPSE = Rick Rubin da operação do cliente.
**Paleta mantida 100% B&W** (Rick Rubin é referência de ATITUDE, não de cor).

## 4. Edições
**BONE** (light) DEFAULT + **VANTA** (dark) opcional via `[data-theme="vanta"]`. Light-first porque 90% das LPs SINAPSE são light mode.

## 5. Cor funcional (FORA da paleta primary)
Marca é **exclusivamente B&W**. Cores funcionais nunca aparecem em hero/brand/accent. Reservadas pra:
- `--color-error: #FF3A2D` — vermelho, só erro/destructive/critical
- `--color-success: #00C853` — verde, só success/confirmação

Qualquer uso dessas cores em copy, carrossel, post, LP = VIOLAÇÃO.

## 6. Domínio
Irrelevante agora. Focar na source-of-truth. Comprar depois.

## 7. Repo
`sinapse-brand` ✅

## 8. Tipografia v2 (ajuste pós-feedback — casa com logo)
- Display/Hero: **Sora** (OSS, geometric premium, escolha final após type-lab comparativo — vibe tech corporativo moderno, casa com roundness do logo)

**v3 LOCKED** — tipografia fechada. Histórico:
- v1 Fraunces (descartada — serif editorial não casava com logo)
- v2 Unbounded (descartada — wide quirky demais pra ICP empresário)
- v3 Space Grotesk (descartada no lab — comparado contra Sora)
- v3 **Sora** ✓
- Sans/Body/UI: **Inter** (OSS, já usado em sinapse.club/forum — consistência com LPs existentes)
- Mono: **JetBrains Mono** (OSS, tech/dev aesthetic, labels)

**v1 descartada** (Fraunces+Geist): serif editorial não batia com logo geométrico rounded.
**Referência real**: forum.sinapse.club h1 = Inter 72px 700 tracking -4%.

## 9. Arquétipo (mix ponderado)
```
Magician   45%  — "transformamos sua estrutura em escala via IA"
Sovereign  35%  — "domínio, controle, escala sem inflar folha"
Creator    20%  — "autoral, minimalista, fora do padrão"
```

## 10. Truelines draft (refinar depois)
- "Escale sua operação sem aumentar sua folha."
- "Arquitetando empresas que operam com IA."
- "Levando empresas ao próximo nível pela lente da IA."
- "Escalando empresas com funcionários que não dormem, não têm emoções e não sentem fome."

Vibe: **corporativa premium** pra ICP de empresários médios e grandes.

## 11. Valores da empresa SINAPSE
⚠️ **PENDENTE** — a criar na FASE 2 (brandbook estratégico).
Os valores mencionados no brief (fome+humildade, workaholic, autodidatismo, zero vitimismo, minimalismo agressivo, diferenciação default) são **pessoais de Caio+Soier**, não da empresa.

## 12. ICP
Empresários médios e grandes com **estrutura consolidada** que querem aplicar IA pra **escalar sem aumentar folha** (ou reduzindo).

## 13. Positioning draft
**Categoria**: Orquestração de IA pra operação empresarial
**Promessa**: Escalar operação mantendo (ou reduzindo) folha
**Diferencial**: Arquitetura + execução integrada, estética premium, zero hype

## 14. Scope FASE 0 aprovado
Scaffold do repo `sinapse-brand` com Next.js 15 + Tailwind + shadcn + Style Dictionary + MDX + estrutura de pastas (brandbook/design-system/showcase) + tokens Vanta preliminares + deploy Vercel preview.
