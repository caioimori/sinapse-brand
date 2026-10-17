# SINAPSE SI — handoff / edição 05

Branch feat/sinapse-si-brandbook-20261016. PR https://github.com/caioimori/sinapse-brand/pull/11 . Issue #10. Checkout knowledge/sinapse-si-brandbook. Preservar CANON modificado no checkout principal.

Pedido vigente: todas as assinaturas em uma linha, preferindo SNPS SI quando útil; corrigir K, J, F, W e Z; preservar H; trocar o símbolo entre ideia e ação; ampliar roupas com estampas minimalistas de maior presença. Mestres originais e preto/branco preservados.

Implementado: 80 assinaturas com complemento na mesma altura e baseline, incluindo SNPS SI. Fonte 1.200, 196 glifos; novas proporções e contornos nas cinco letras. H intacto. Nome completo também não quebra no FontLab. Fonte, templates e aplicações regenerados.

Passagem: dois trilhos paralelos substituem o símbolo isolado do House, com versão vetorial e estudo em vidro. Novo ambiente de campanha. Collection 02: oito camisetas e quatro moletons em seis pares fotográficos, 12 estampas exatas em curvas/fundo transparente, filtros e ampliação. Renders anteriores rejeitados ficam no acervo, fora do kit atual.

Brandbook 05 de 60 páginas 1920×1080, PDF nativo, leitor e kit 05 com 297 arquivos. QA: TypeScript, 250 verificações, 27 amostras responsivas e controles reais. PDF sem texto informativo fora da página; 11 recursos HTTP 200 com SHA idêntico; CRC e exclusões do kit verificados. Sem novos erros de console na leitura final. Detalhes em docs/SINAPSE-SI-V5-QA.md.

Servidor http://127.0.0.1:3256/ . /book, /studio/wear, /studio/identity, /studio/typography e /studio/downloads. Reutilizar aba/porta. Pipeline atual no README; utilitários prepare/export v3 e assets v4 são compartilhados. Não rodar books/consolidadores históricos sobre o sistema atual.

Build de produção novo não executado: RAM observada abaixo do piso de 4 GiB. Não reduzir limite ou parar processos alheios. Fila de testes inicialmente ocupada liberou; contratos e TypeScript passaram depois. CI anterior: lint interativo e scanner sem histórico Git suficiente; infraestrutura preservada.

Novas letras, grafismo e roupas aguardam revisão estética. Fotografias geradas não comprovam fabricação. Sem produção, DNS, redes, fabricação ou alterações de autenticação/CI. Recuperação: edição 04 em fd288e8, edição 03 em cfe9c41; originais em public/brand/logo.
