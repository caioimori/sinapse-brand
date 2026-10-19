# Edição 06 — ajustes solicitados em 19/10/2026

Passagem ainda aparecia em imagens incorporadas ao PDF 05, embora a aplicação web já tivesse sido alterada. A edição 06 substitui capa, página 24 e campanha; o pôster House também ficou sem o grafismo central. Nenhum novo símbolo foi adotado. O acervo continua recuperável, fora do kit atual.

## Assinaturas

Espaço entre o logo original e SI/School/House/Growth: 33,28 → 46,90 unidades, aumento de 40,925%. Os 64 arquivos de descritores, em quatro materiais e dois temas, mantêm altura e baseline. Os dois mestres e OTF/TTF/WOFF2 corporativos passaram em comparação byte a byte com o HEAD anterior.

## Referências de roupa

Fontes consultadas em 19/10/2026: [Nude Project — camisetas](https://nude-project.com/collections/t-shirts), [moletons](https://nude-project.com/collections/hoodies), [Beast Zip Up](https://nude-project.com/products/beast-zipper-new-color-artworks), [Coinbase Shop](https://coinbaseshop.com/), [Coin Logo Tee](https://coinbaseshop.com/products/coin-logo-tee), [In Math We Trust](https://coinbaseshop.com/products/in-math-we-trust-t-shirt).

Nude orienta corte amplo, ombro deslocado, tipografia como estampa e contraste editorial/gestual. Coinbase orienta frases de pertencimento à cultura de tecnologia. Não foi copiada arte de roupa. Referências e catálogos de terceiros ficam em qa-local, excluídos de Git e kit.

Collection 03: oito camisetas e quatro moletons em seis pares. Frase sugerida pelo usuário em camiseta e moletom; Superintelligence, Still human., humor e imaginação. Quatro famílias de expressão, com licenças OFL: Cormorant Garamond Italic, Caveat, Anton e Fraunces Italic. Fontes oficiais e hashes em wear-v6/fonts/sources.json.

Os seis mockups foram gerados com pranchas exatas das novas estampas e referência de caimento/tecido. Inspeção individual: frases, lado frente/costas, gola, mangas, costuras, capuz e bolso; sem arte de terceiros. O SVG mantém a geometria exata; imagem gerada não é prova de impressão, bordado ou modelagem física. Prompts e origem em wear-v6/provenance.json.

## Verificação

- TypeScript: passou pelo gate.
- 101 verificações: espaço real exportado, altura/baseline, limites das curvas, preservação dos mestres e fontes, 12 estampas nativas, conteúdo e referências do livro atual.
- PDF nativo: 60 páginas 1920 × 1080, 21.034 caracteres e nenhum texto fora dos limites. Contato completo revisado; páginas 1, 24, 43 e 47 inspecionadas ampliadas.
- Navegador existente: roupas em 320, 390, 700, 768, 1000 e 1440 px; identidade em 320, 390, 768 e 1440. Sem rolagem horizontal ou imagens quebradas. Dark e Light; filtros com oito camisetas e quatro moletons; abertura/fechamento da consulta e links da primeira/última estampa.
- Livro atual: página 24 ampliada e seleção de coleção no leitor. Download atual aponta para PDF 06; kit 06 tem CRC e SHA de cada arquivo conferidos. Nove recursos responderam HTTP 200; todos os seis arquivos estáticos testados têm SHA igual ao arquivo local.

Build de produção não executado neste lote: RAM disponível observada aproximadamente entre 0,3 e 1,7 GiB, abaixo do piso de 4 GiB. TypeScript, geração do PDF e testes finitos passaram com gate de 1 GiB quando liberado. Sem reparos na infraestrutura ou interrupção de processos alheios. CI histórico tem lint interativo e scanner sem revisão Git; não foi alterado.

Prévia local e proposta estética para revisão. Sem produção, DNS, postagem, contratação ou fabricação.
