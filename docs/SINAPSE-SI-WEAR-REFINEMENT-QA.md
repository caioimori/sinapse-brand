# Roupas — corte regular, fonte aprovada e assinatura

Pedido de 19/10/2026: camisetas normais; preservar a fonte de Born Curious / Still Human; testar novas fontes no restante; retirar Superintelligence / Sinapse abaixo do SNPS. A direção estética anterior continua recuperável, fora dos downloads atuais.

## Aplicação

Oito camisetas de corte regular e quatro moletons. Nas fotos, corpo mais comprido que largo, ombros no lugar, mangas curtas convencionais, costuras e barra visíveis. Sem proporção boxy ou ombro caído. Os seis pares foram inspecionados individualmente; textos, frente/costas e assinatura conferidos.

Caveat preservada: mesmo arquivo de fonte e mesmos contornos de Born Curious e Still Human. Novos testes: [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) e [Space Mono](https://fonts.google.com/specimen/Space+Mono). Aprovação dessas alternativas continua pendente. Arquivos oficiais e licenças OFL em wear-v7/fonts/sources.json.

SNPS SI usa os vetores existentes na mesma linha. Nenhum microtexto abaixo da assinatura. O gerador e as 12 estampas foram atualizados; seis novos mockups gerados a partir dessas pranchas. Prompts e origem em wear-v7/provenance.json. Fotografias são conceitos gerados; o SVG é a referência exata para prova física.

Página, downloads, livro 06 e kit 06 apontam para wear-v7. As imagens e fontes anteriores permanecem em wear-v6 como acervo; não entram no kit atual. Preto/branco, logo, fonte corporativa e espaçamento das assinaturas foram preservados.

## Evidência

- 78 verificações pelo gate: fonte Caveat e frases aprovadas idênticas, SNPS SI exato, mesma linha e intervalo, remoção do microtexto, curvas contidas, transparência e quantidade de peças.
- TypeScript passou pelo CLI direto. Dois arquivos temporários de montagem foram renomeados para .draft após o compilador incluí-los indevidamente; a falha foi corrigida e a execução repetida passou.
- Prévia inspecionada em 320, 390, 768 e 1440 px; sem overflow ou imagens quebradas. Filtros com oito camisetas e quatro moletons; consulta e link da estampa Born Curious, abrir/fechar e Dark/Light.
- PDF: 60 páginas 1920 × 1080, 21.124 caracteres nativos e nenhum texto fora dos limites. Páginas 44 e 48 inspecionadas ampliadas. Kit com CRC e SHA de cada arquivo conferidos.

Fila compartilhada inicialmente ocupada; os comandos finitos foram executados quando liberou, sem alterar lock ou processos alheios. Build de produção não executado neste refinamento por RAM abaixo do piso de 4 GiB. Sem produção, DNS, postagem, contratação ou fabricação.
