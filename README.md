# SINAPSE SI — Brand world 02

Dark First + Light Mode, SNPS preservado, novas assinaturas, ícones, materiais ópticos, ferramentas coloridas e mockups fotográficos de vestuário.

Prévia: http://127.0.0.1:3256/ . Domínio pretendido: branding.sinapse.si; produção não publicada.

Executar: npm ci; npm run dev -- --hostname 127.0.0.1 --port 3256.
Conferir: npm run typecheck; node scripts/test-si-artwork.mjs.

Fontes: CANON.md, brand-system.json, components/si-v2, data/si/brand.ts, lib/si/artwork.ts e public/si-v2.

Gerar, em ordem: python scripts/prepare-si-v2.py; node scripts/export-si-v2.mjs; python scripts/build-si-v2-book.py; python scripts/consolidate-si-v2.py; python scripts/package-si-v2.py.

Documento e kit: public/si-v2/SINAPSE-SI-Brandbook-02.pdf e SINAPSE-SI-Kit-02.zip.
QA e limites: docs/SINAPSE-SI-V2-QA.md. PR #11 / issue #10.

Build local de produção sem RAM para o gate. CI anterior com lint interativo e scanner sem histórico Git suficiente. Workflow, autenticação e permissões não foram alterados. Sem migração de dados.
