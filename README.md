# SINAPSE — Brand Source of Truth

> **A fonte da verdade da marca SINAPSE.** Design system, brandbook e referência central pra toda construção visual do ecossistema.

🔗 **Live:** https://source-of-truth-eta.vercel.app
📘 **Guidelines:** https://source-of-truth-eta.vercel.app/brandbook/0.0-guidelines

---

## O que é

Repo único com **tudo** que governa a identidade SINAPSE: princípios, tokens, componentes, tipografia, cor, motion, patterns, templates, showcase.

Construído em Next.js 15 + Tailwind + shadcn, renderizado como site navegável. Quem for produzir qualquer peça visual do SINAPSE (LP, slide, carrossel, app) abre aqui primeiro.

## Quick start

```bash
git clone https://github.com/caioimori/sinapse-brand.git
cd sinapse-brand
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Estrutura

```
app/
├── brandbook/          # Brand rules (guidelines, foundations, logo, icons, moodboard)
│   ├── 0.0-guidelines  # Os 12 princípios NON-NEGOTIABLE
│   ├── 1.0-movimento   # Posicionamento + manifesto
│   ├── 2.0-foundations # Tokens: type, color, space, surface, motion, semantic
│   ├── 3.0-logo        # Sistema de logo + contraste
│   ├── 4.0-icons       # Biblioteca de ícones
│   ├── 5.0-moodboard   # Referências visuais
│   ├── 6.0-estrategia  # Estratégia de marca
│   ├── 11.0-effects    # VFX, blend modes, distortion
│   ├── 12.0-components # Catálogo de componentes
│   ├── 13.0-shaders    # GLSL shaders
│   ├── 14.0-motion     # Animações, transitions
│   ├── 15.0-templates  # Templates (carrosseis, pitch, LPs)
│   └── 16.0-showcase   # Showcase de aplicações
├── visual/             # Uso aplicado (context, grids, imagery, nav, SEO)
├── design-system/      # DS técnico
├── editorial/          # Conteúdo editorial
├── pitch/              # Sistema de pitch
├── voice-tone/         # Voz e tom
└── workspace/          # Downloads

components/brand/       # Componentes React reutilizáveis
content/brandbook/      # MDX complementar
public/brand/           # Assets (logos SVG, fontes)
```

## Como usar como Source of Truth

**Para humanos:**
1. Abre `/brandbook/0.0-guidelines` antes de qualquer output visual
2. Lê os 12 princípios — se o conceito já viola 1, refaz
3. Usa `/brandbook/2.0-foundations` pra tokens
4. Usa `/brandbook/12.0-components` pra reusar componente existente

**Para Claude Code (em qualquer projeto):**
Fala "usa o DS do sinapse" ou "fonte da verdade" e o Claude puxa os 12 princípios antes de gerar.

## Os 12 Princípios (resumo)

1. Paleta B&W absoluta — zero cor cromática
2. Preto mínimo `#0A0A0A` — nunca `#000` em bg
3. Grain SVG 5% sempre ativo
4. Sora · Inter · JetBrains — máx 2 pesos/tela
5. Tipografia: 11–14px ou 60–180px (32–48px proibido)
6. Assimetria obrigatória — zero layout simétrico centrado
7. Motion reversível
8. Respeita `prefers-reduced-motion`
9. Semantic tokens, nunca primitives diretos
10. Menos componentes, mais lei (Vignelli)
11. Grain · crosshair · frame em camadas sutis
12. Se parece padrão genérico, refaz

Detalhe completo em [`/brandbook/0.0-guidelines`](https://source-of-truth-eta.vercel.app/brandbook/0.0-guidelines).

## Stack

- **Framework:** Next.js 15 (App Router, RSC)
- **Styling:** Tailwind CSS v4
- **Fonts:** Sora · Inter · JetBrains Mono
- **Components:** shadcn/ui + custom brand components
- **MDX:** next-mdx-remote
- **Deploy:** Vercel

## Contribuição

Governado pelos 12 princípios. PRs que violam são refeitos.

Workflow:
1. Branch: `caio/feat/...` ou `soier/feat/...`
2. Implementa respeitando os princípios
3. PR citando a regra (`[rule 05] hero 180px`)
4. Review: Caio merge direto · Soier → Caio aprova

## Mantido por

**Caio Imori** ([@caioimori](https://github.com/caioimori)) · **Matheus Soier** ([@Matheus-soier](https://github.com/Matheus-soier))

---

*SINAPSE · A IA não é o herói. O sistema é.*
