# Origem do traço — revisão após rejeição

Caio rejeitou Nexo, Síntese SN e Pulso por falta de congruência com os logos existentes. As três opções deixam de ser recomendadas. Nenhum novo símbolo foi aprovado.

O erro foi tratar traço e cantos como detalhes isolados, enquanto mudavam a proporção e a distribuição de massa. O S original tem relação largura/altura de 1,987. As silhuetas anteriores eram compactas: Nexo 1,077; Síntese SN 1,156; Pulso 1,000. Isso não transfere a construção horizontal do S.

O estudo atual extrai o primeiro S diretamente de public/brand/logo/bone/snps-lockup.svg e sinapse-wordmark.svg. O atributo d é idêntico nos dois mestres e foi copiado inteiro, sem normalização, reconstrução ou alteração de comandos. O enquadramento aplica apenas uma translação.

Medidas do S: largura 93,18; altura 46,90; traço 9,38; retorno 4,69; terminais abertos com radius zero. A diagonal do N não pertence ao S. O N tem outras funções de canto: ombro externo 9,38 e retorno interno 2,54. Não generalizar um radius único para todo o lettering.

O S isolado é uma base construtiva e um teste de uso, não um novo ícone aprovado. Não se atribui ao S uma síntese inventada de três conceitos. A estratégia continua orientando o símbolo definitivo; sua geometria precisa preservar proporção, terminais, retornos e ritmo reconhecíveis da marca.

O laboratório em /studio/symbol mostra origem nos dois nomes, medidas, enquadramento circular, assinatura SNPS SI preservada e redução em áreas de 24/32/64/150 pixels. Os acabamentos sólido, prata, vidro e vitrificado usam o mesmo path; iluminação e borda ficam recortadas por dentro da silhueta.

Gerador: scripts/build-symbol-origin.py. Saídas em public/si-v2/symbol-origin; dados em data/si/symbol-origin.json. Kit independente com 16 SVGs, JSON de origem, manifesto e PDF nativo de cinco páginas 1920×1080. Os estudos rejeitados continuam recuperáveis no histórico e no acervo.

Verificação: TypeScript passou pelo gate, executando diretamente o CLI do TypeScript. Build de produção isolado em .next-verify passou pelo gate com piso de 4 GiB, gerando 104 páginas. As alterações automáticas de next-env.d.ts e tsconfig.json foram restauradas ao estado anterior; servidor e infraestrutura foram preservados.

Trinta e quatro verificações passaram: identidade dos mestres em bytes, path exato, proporção intrínseca/viewBox, dez amostras de conectividade, ausência de imagens embutidas e contenção dos materiais no contorno. A prova de recorte usa Sharp/libvips, já utilizado no projeto, com tolerância de um pixel de antialias.

PDF: cinco páginas, 1.838 caracteres nativos, Manrope Regular/Semibold e JetBrains incorporadas, nenhum texto fora dos limites. Folha de contato completa revisada; formatos de viewport dos vetores corrigidos para evitar redução indevida das assinaturas. Sólido, prata e vidro inspecionados em rasterizações locais dos SVGs.

A política de segurança do navegador negou o acesso à aba existente de localhost nesta sessão. Nenhuma outra superfície, CDP ou leitura indireta da página foi usada para contornar o bloqueio. A interface foi implementada e compilada, mas a inspeção visual responsiva e os controles atuais permanecem não verificados. Não apresentar evidência de navegador da revisão anterior como validação desta.

Evidências: qa/symbol-origin-geometry.json, qa/symbol-origin-pdf.json e qa/symbol-origin-checks.json. Hashes dos 18 recursos locais e os 19 arquivos do ZIP conferidos, com CRC válido. HTTP da nova revisão não conferido. Capturas internas de ativos em qa-local/symbol-origin. Sem merge, produção, DNS, postagem ou fabricação.
