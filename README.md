# SINAPSE SI — revisão 03

Portal http://127.0.0.1:3256/ . Leitor /book . Fonte própria /studio/typography . Downloads /studio/downloads . Prévia local, sem produção.

Preservados SNPS, preto e branco, abertura, gradiente de dimensão, vidro, prata e sólido. Novos: fonte SNPS Display, I recuperado, 72 SVGs, materiais compartilhados, catálogo de ferramentas e roupas baseadas em produtos específicos Coinbase.

Fonte atual: CANON.md, brand-system.json, components/si-v2, data/si, lib/si/artwork.ts, public/si-v2. A pasta mantém o endereço para preservar links; a revisão corrente é 03.

Reutilizar o servidor 3256. Nova instalação: npm ci; npm run dev -- --hostname 127.0.0.1 --port 3256.

Verificar: npm run typecheck; node scripts/test-si-artwork.mjs; python scripts/test-snps-display.py.

Gerar em ordem: python scripts/build-snps-display.py; python scripts/prepare-si-v3.py; node scripts/export-si-v3.mjs; python scripts/build-si-v3-book.py; python scripts/consolidate-si-v3.py; python scripts/package-si-v3.py. Não executar os geradores v2 sobre o sistema atual.

Materiais usam os renders locais indicados no script, preservando origens. Não gerar substitutos silenciosamente. Kit e PDF: public/si-v2/SINAPSE-SI-Kit-03.zip e SINAPSE-SI-Brandbook-03.pdf. OTF/TTF/WOFF2 e licença em fonts/.

Build isolado: definir SI_BUILD_DIR=.next-verify; node C:/rrq/tools/gate.mjs --min-gb 4 --wait-min 0 -- node node_modules/next/dist/bin/next build.

QA e limites: docs/SINAPSE-SI-V3-QA.md. PR #11 / issue #10. Infraestrutura de CI e autenticação não alteradas. Produção, DNS, redes e fabricação não executados.
