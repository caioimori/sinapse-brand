# SINAPSE SI — Brand System

Proposta de evolução 1.0 para revisão de Caio, preparada em 16/10/2026. Site de marca, sistema editorial, aplicações e arquivos para School, House e Growth.

## Abrir e executar

Prévia local desta tarefa: http://127.0.0.1:3256/ . O domínio pretendido é branding.sinapse.si; produção e DNS não foram alterados.

```powershell
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3256
npm run typecheck
node scripts/test-si-artwork.mjs
```

## O que existe

Portal com 14 capítulos; pesquisa com fontes; estratégia e arquitetura; logo preservado e variantes em curvas; tipografia, materiais, ícones e movimento; Template Studio com seis formatos e exportação PNG/SVG/JSON; avatares, capas e vestuário; PDF nativo de 47 páginas e kit.

Comece por [CANON.md](CANON.md). Conteúdo em `data/si/brand.ts`, `brand-system.json` e `public/si/tokens.json`. Interface em `components/si` e `lib/si`; arquivos distribuíveis em `public/si`.

## Gerar arquivos

```powershell
node scripts/prepare-si.mjs
python scripts/prepare-si-assets.py
node scripts/export-si-templates.mjs
python scripts/build-si-book.py
python scripts/package-si-kit.py
python scripts/consolidate-si.py
```

Os scripts usam as bibliotecas locais existentes, fontes abertas e os arquivos do briefing quando necessários. Não instalam serviços nem publicam.

## Evidência e limites

[QA](docs/SINAPSE-SI-QA.md), [escopo](docs/SINAPSE-SI-ESCOPO.md) e [handoff](docs/SINAPSE-SI-HANDOFF.md). O build local foi impedido pelo gate de RAM; typecheck, lint proporcional e testes do exportador foram executados.

O repositório existente é público. Fontes privadas, transcrições, downloads e evidência temporária permanecem ignorados. O histórico visual está em `docs/archive` e as rotas anteriores continuam disponíveis. Nenhuma identidade ou ativo de outra marca foi reutilizado.
