# SINAPSE SI — QA / edição 04

## Resultado observado

209 verificações automáticas passaram: 57 contratos de artwork, duas regressões de palavra inteira, 108 verificações de fonte/mestres/assinaturas/alpha e 42 verificações dos novos cantos, uniões e incorporação dos dois mestres. TypeScript passou pelo gate.

36 amostras de navegador em 320, 390, 700, 768, 1000 e 1440 px. Dark Mode e Light Mode conferidos; sem overflow de texto/controles, scroll horizontal de página ou imagem essencial quebrada nas amostras. Estados de anatomia, filtro School e página 14 do leitor foram observados após a hidratação.

Quatro verificações adicionais do editor: Fluxo selecionado, texto editado e ida/volta entre quadros em 320/390/768/1440. A prévia acompanha a edição no desktop; o pai usa overflow:clip para preservar sticky. PNG chegou ao estado de exportação concluída em 1080 × 1350. A sequência preservou o texto e a família do quadro 1.

Acentos e cedilhas em três linhas conferidos em 390 e 1440. Entrelinha da composição display ampliada para separar os extremos de acento e cedilha. A fonte possui 196 glifos; minúsculas usam o desenho maiúsculo.

## Documento e recursos

PDF de 55 páginas, todas 1920 × 1080, com 19.872 caracteres de texto nativo. Manrope Regular e Semibold têm nomes distintos; SNPS Display e JetBrains estão incorporadas. Helvetica aparece como recurso padrão sem uso de texto. Nenhum texto informativo excedeu a página.

Folha de contato integral e páginas ampliadas revisadas. Corrigidos contraste em pranchas claras, nomes dos pesos Manrope, margens de rodapé, centragem dos avatares e enquadramento dos três pôsteres no ambiente. Fotografias e pranchas de material são imagens; mestres, anatomia e ícones mantêm vetores.

72 assinaturas; 49 templates; 12 aplicações vetoriais, três pranchas de tipografia e um tríptico; 12 ícones Signals 04. PNG/WebP portátil com alpha preservado. 199 imagens dos seis cases permanecem em cache privado ignorado, fora do kit público.

Seis recursos servidos no localhost retornaram 200 e SHA-256 idêntico ao arquivo verificado: OTF, TTF, WOFF2, pôster SVG, PNG transparente e PDF. Kit 04 tem 263 arquivos e CRC conferido; o manifesto guarda SHA-256.

## Limites reais

Build de produção local não executado: gate registrou 2,8 GiB livres de RAM para mínimo de 4. Não repetir sem mudança de condição, não reduzir o limite e não encerrar processos de outras tarefas. O build da revisão 03 não valida o código novo. Lint/CI remoto anteriores possuem problemas de infraestrutura já registrados; este lote não altera workflows, hooks ou autenticação.

Primeira coleta de controles era prematura, antes da hidratação, e foi descartada. A coleta final espera o marcador de interface pronta e confere o estado resultante; nenhum novo erro de console apareceu nessa rodada.

Novos glifos são extensões propostas. Fotos de material, papelaria, ambiente e roupa são estudos gerados; não comprovam fabricação. Dois vídeos Buff foram identificados, sem análise temporal. Sem produção, DNS, postagem ou fabricação.

Evidências: qa/v4-browser-check.json, qa/v4-editor-check.json, qa/v4-geometry-check.json, qa/v4-pdf-native-check.json, qa/v4-resource-check.json e qa/v4-contact-sheet.jpg. Capturas detalhadas ficam no qa-local/v4 ignorado.
