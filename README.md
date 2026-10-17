# SINAPSE SI — edição 05

Prévia local: http://127.0.0.1:3256/ . Estudo atual de símbolo: /studio/symbol . Brandbook: /book . Construção da fonte: /studio/typography . Referências: /studio/research . Arquivos: /studio/downloads .

Sinal contínuo: os dois logos originais permanecem. Assinaturas sempre em uma linha, incluindo SNPS SI. A extensão SNPS Display 1.200 revê K, J, F, W e Z, preservando H e os mestres. A direção editorial deriva da análise de 199 pranchas em seis cases, principalmente OXA AI e Buff.

60 páginas 1920 × 1080; texto nativo e fontes incorporadas. 80 assinaturas, 49 templates, 18 composições de aplicação/anatomia, 12 ícones Signals 04, fonte OTF/TTF/WOFF2 e estudos fotográficos identificados. Collection 02: 12 propostas de roupas com estampas em curvas. Passagem foi rejeitado; livro/kit 05 permanecem como acervo, com aviso no leitor.

Novo recorte: três propostas preenchidas e conectadas (Nexo, Síntese SN, Pulso), sem adoção automática. Síntese SN é a recomendação. Estudo próprio de dez páginas, seis SVGs e laboratório de comparação/redução/materiais. Gerar com python scripts/build-symbol-study.py e python scripts/build-symbol-study-pdf.py. Verificação: python scripts/test-symbol-study.py. Pesquisa e limites em docs/SINAPSE-ESTUDO-SIMBOLO.md; QA em docs/SINAPSE-ESTUDO-SIMBOLO-QA.md.

Fonte vigente: CANON.md, brand-system.json, components/si-v2, data/si, lib/si e public/si-v2. O endereço si-v2 permanece para preservar os links. A revisão corrente é 05.

Reutilizar o servidor 3256. Instalação: npm ci. Desenvolvimento: npm run dev -- --hostname 127.0.0.1 --port 3256.

Gerar em ordem:

1. python scripts/build-snps-display.py
2. python scripts/prepare-si-v3.py
3. node scripts/export-si-v3.mjs
4. python scripts/build-si-v5-wear.py
5. python scripts/build-si-v5-book.py
6. python scripts/consolidate-si-v5.py
7. python scripts/package-si-v5.py

Os dois utilitários com nome v3 continuam compartilhados. Não rodar geradores históricos de book/consolidação sobre o estudo atual: o consolidator 05 reintroduz status anteriores de Passagem. Renders existentes são o fallback canônico quando as saídas locais de geração não estão disponíveis.

Verificações: npm run typecheck; node scripts/test-si-artwork.mjs; python scripts/test-snps-display.py; python scripts/test-si-v5-geometry.py. Comandos de build/suíte respeitam C:/rrq/tools/gate.mjs. Build isolado: SI_BUILD_DIR=.next-verify, mínimo de 4 GiB livres de RAM e 10 GB em C:.

Evidências: docs/SINAPSE-SI-V5-QA.md e qa/v5-*.json. PR #11 / issue #10. Branch de proposta, sem produção, DNS, redes ou fabricação.
