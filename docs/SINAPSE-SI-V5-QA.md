# Edição 05 — verificação

Pedido: assinaturas horizontais, SNPS SI, correção de K/J/F/W/Z, preservação de H e dos mestres, troca do símbolo House e roupas minimalistas com mais presença.

80 SVGs, 196 glifos em OTF/TTF/WOFF2, 12 estampas em curvas, seis novos pares fotográficos de roupas, Passagem em vetor/vidro e campanha em ambiente atualizada. Os antigos renders de roupas, escultura e ambiente foram preservados como acervo e excluídos do kit vigente.

TypeScript passou. 250 verificações passaram pelo gate: 117 de fonte/mestres/espaçamento/assinaturas/transparência, 74 de geometria incluindo alinhamento horizontal e H intacto, 57 contratos de artwork e duas regressões de integridade de palavras.

27 amostras de navegador: identidade, fonte, livro, coleção, home e pôster House em 320/390/768/1440; coleção clara também em 700/768/1000. Filtros, estados reais, ampliação e fechamento de estampas, seleção e ampliação de páginas conferidos. Sem overflow horizontal ou imagens quebradas na coleta.

O seletor SINAPSE SCHOOL mantém o nome inteiro em um SVG de uma linha, também no laboratório. A nova coleção filtra quatro pares de camisetas e dois pares de moletons. Capturas detalhadas estão em qa-local/v5, ignorado.

PDF: 60 páginas 1920×1080, 21.222 caracteres nativos e nenhum texto informativo fora da página. Manrope Regular/Semibold, SNPS Display e JetBrains incorporados. Folha de contato integral e páginas afetadas ampliadas revisadas; fotos são estudos gerados, mestres e anatomia preservam vetores.

Houve erros transitórios de compilação ao mudar a importação antes de gerar book-v5.json. Arquivo gerado, TypeScript e leitor conferidos depois. Os logs históricos ficam distinguidos da leitura final no relatório de navegador.

Build de produção desta edição não executado: RAM observada abaixo do piso de 4 GiB; nenhum processo alheio encerrado e nenhum limite reduzido. A fila local inicialmente ocupada liberou, permitindo typecheck e contratos. CI anterior tinha lint interativo e scanner sem histórico suficiente; infraestrutura não alterada neste lote.

Evidências: qa/v5-browser-check.json, qa/v5-geometry-check.json, qa/v5-pdf-native-check.json, qa/v5-contact-sheet.jpg e qa/v5-resource-check.json. Kit verifica CRC e manifesto SHA-256.

Proposta local para revisão estética. Sem produção, DNS, redes ou fabricação. Recuperação no commit fd288e8 da edição 04.

CI remoto em a0c7458: o lint parou na configuração interativa do ESLint; o scanner falhou por revisão Git ausente no checkout raso, sem achado de credencial. Execução: https://github.com/caioimori/sinapse-brand/actions/runs/39004871179 .
