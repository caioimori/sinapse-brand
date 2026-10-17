# SINAPSE SI — edição 04

Prévia local: http://127.0.0.1:3256/ . Brandbook: /book . Construção da fonte: /studio/typography . Referências: /studio/research . Arquivos: /studio/downloads .

Sinal contínuo: os dois logos originais permanecem. A extensão SNPS Display 1.100 distingue terminais retos, retornos, ombros e interiores. A direção editorial deriva da análise de 199 pranchas em seis cases, principalmente OXA AI e Buff.

55 páginas 1920 × 1080; texto nativo e fontes incorporadas. 72 assinaturas, 49 templates, 16 composições de aplicação/anatomia, 12 ícones Signals 04, fonte OTF/TTF/WOFF2 e estudos fotográficos identificados.

Fonte vigente: CANON.md, brand-system.json, components/si-v2, data/si, lib/si e public/si-v2. O endereço si-v2 permanece para preservar os links. A revisão corrente é 04.

Reutilizar o servidor 3256. Instalação: npm ci. Desenvolvimento: npm run dev -- --hostname 127.0.0.1 --port 3256.

Gerar em ordem:

1. python scripts/build-snps-display.py
2. python scripts/prepare-si-v3.py
3. node scripts/export-si-v3.mjs
4. python scripts/build-si-v4-assets.py
5. python scripts/build-si-v4-book.py
6. python scripts/consolidate-si-v4.py
7. python scripts/package-si-v4.py

Os dois utilitários com nome v3 continuam compartilhados. Não rodar os geradores históricos de book/consolidação v2/v3 sobre o sistema atual. Renders existentes são o fallback canônico quando as saídas locais de geração não estão disponíveis.

Verificações: npm run typecheck; node scripts/test-si-artwork.mjs; python scripts/test-snps-display.py; python scripts/test-si-v4-geometry.py. Comandos de build/suíte respeitam C:/rrq/tools/gate.mjs. Build isolado: SI_BUILD_DIR=.next-verify, mínimo de 4 GiB livres de RAM e 10 GB em C:.

Evidências: docs/SINAPSE-SI-V4-QA.md e qa/v4-*.json. PR #11 / issue #10. Branch de proposta, sem produção, DNS, redes ou fabricação.
