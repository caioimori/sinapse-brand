# Story — Refatorar a FUNDAÇÃO do brandbook ao Design Canon

**Status:** Ready
**Tipo:** refactor (fundação / design system)
**Epic:** Alinhamento do brandbook SINAPSE "source-of-truth" ao Design Canon v1

---

## Objetivo

Alinhar 100% a **fundação** do brandbook (`source-of-truth/`, Next.js) ao novo
**Design Canon v1** (`_design-system-master/CANON/`), sem quebrar a compilação
(dev server em localhost:3001). Este incremento cobre **só a fundação** — tokens,
fontes e logo. As páginas `app/brandbook/*` ficam para o próximo incremento.

Fonte da verdade: `CANON/globals.canon.css`, `CANON/tokens.canon.json`,
`CANON/00-SINAPSE-CANON.md`. Auditoria: `extractions-deep/00-brandbook-atual-AUDITORIA.md`.

---

## Escopo

### IN
1. **Story** (este arquivo) — documentação-primeiro.
2. **`app/globals.css`** — alinhar os VALORES do bloco de tokens (`:root` light/Bone e
   `[data-theme="vanta"]` dark) ao canon, preservando o mecanismo de tema e toda a
   biblioteca de utilitários/motion (~900 linhas) intacta:
   - Radius base `6px` + derivados/semânticos do canon.
   - Semânticos light e dark com os hexes do canon.
   - Tokens funcionais completos (`--success`, `--warning`, `--info`, `--destructive`).
   - Chart tokens (`--chart-1..5`) light e dark.
   - Manter easings/durations/shadows/z-index existentes.
3. **Escala display** (anti dead-zone) — `.display-hero/.display-xl/.display-lg` no globals.
4. **`app/layout.tsx`** — Sora só `300/400/500/600` (era 8 pesos, viola rule 04).
   Inter e JetBrains Mono mantidos. 3 (agora 4, com Audiowide do wordmark) font vars ligadas.
5. **Logo = símbolo + "SNPS"** — wordmark/lockup atuais escrevem "SINAPSE" por extenso;
   trocar para **símbolo + texto "SNPS"** num componente reutilizável, com troca de cor por tema.

### OUT (próximo incremento)
- Páginas `app/brandbook/*` (2.1-typography, 2.2-color, etc.) — não tocar.
- `tokens.json` paralelo, `tailwind.config.ts` spacing, páginas declarativas/catálogos.
- Pipeline style-dictionary.

---

## Critérios de aceite (Given / When / Then)

1. **Tokens = canon.**
   Given o bloco de tokens em `globals.css`,
   When comparado a `CANON/globals.canon.css`,
   Then radius base = `6px`; light/dark semânticos batem com o canon (bg/fg/card/primary/
   secondary/muted/accent/border/input/ring); `--success/--warning/--info/--destructive`
   presentes; `--chart-1..5` presentes em light e dark.

2. **Fontes ≤ 4 pesos Sora.**
   Given `layout.tsx`,
   When a fonte Sora é carregada,
   Then `weight: ["300","400","500","600"]` (não mais 8 pesos); Inter e JetBrains Mono
   mantidos; vars de fonte continuam ligadas no `<html>`.

3. **Escala display anti dead-zone.**
   Given `globals.css`,
   Then existem `.display-hero` (clamp 3.75rem→11rem, weight 300), `.display-xl`
   (clamp 2.75rem→5rem, weight 400) e `.display-lg` (clamp 3.25rem→4.5rem). Headline
   de marca nunca em 32–48px.

4. **Logo = símbolo + SNPS.**
   Given nav e footer,
   When a marca é renderizada,
   Then aparece o **símbolo** + o wordmark **"SNPS"** (não "SINAPSE" por extenso),
   com cor trocando por tema (bone/vanta).

5. **Compilação intacta.**
   Given o dev server (localhost:3001),
   Then nenhum erro de tipo/import; a biblioteca de utilitários/motion do globals
   permanece intacta.

---

## Notas de implementação

- Edição cirúrgica (`Edit`) no `globals.css` — não reescrever o arquivo inteiro.
- Não existe asset "SNPS" em `public/brand/logo/` → compor via markup
  (símbolo SVG + `<span>` "SNPS" na fonte de marca/Audiowide, tracking apertado).
- `--radius-2xl: 14px` (canon) substitui o `20px` legado.
