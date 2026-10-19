# Revisão 03 — verificação

17/10/2026. Fonte, I, assinaturas, materiais, ferramentas, roupas e leitor. Edição local; sem publicação em produção.

108 verificações: OTF/TTF/WOFF2, ASCII, português, incorporação, altura, comparação raster das seis letras originais, avanço, 72 assinaturas e alpha do PNG. Evidência: qa/v3-font-check.json.

57 contratos do editor passaram; duas regressões acrescentadas para manter DIMENSÃO inteira e impedir O isolado. Dimensões, XML, cliente, guias e escala continuam cobertos.

PDF: 41 páginas 1920 × 1080, 12.111 caracteres nativos, fontes incorporadas e nenhuma caixa de texto fora da página. SNPS Display é texto nativo nos espécimes. Contato geral e páginas ampliadas conferidos.

O gerador converte WebP incorporado para PNG antes de compor o PDF, pois MuPDF não aceita esse data URI. Transparência e gradientes são preservados. Evidência: qa/v3-pdf-native-check.json e qa/v3-contact-sheet.jpg.

72 combinações verificadas: nove rotas em 320, 390, 768 e 1440 px, Dark e Light. Sem overflow da página, campos/títulos fora da largura ou imagens quebradas. Regiões afetadas conferidas visualmente.

Controles: palavra/material/fundo da fonte; bases e assinaturas; troca de roupa; SNPS 3D sobre fundo claro; páginas, ampliação e fechamento; tema; navegação do editor preservando título, fonte e material.

Exportação real do navegador: PNG 1080 × 1350 e SVG. Corrigidos dois defeitos encontrados no PNG: espaço virava interrogação; DIMENSÃO isolava O na linha seguinte. A exportação corrigida foi conferida.

Build isolado passou (103 rotas). Após ajuste final do download do lettering, TypeScript e navegador passaram; repetição do build bloqueada pelo gate com 3,5 GiB livres e mínimo de 4. CI anterior tem lint interativo e Gitleaks sem intervalo Git disponível. Workflows, hooks, autenticação e permissões não foram alterados.

Novos glifos e mockups são propostas estéticas. Raster tem reflexos fixos; roupa precisa de protótipo físico. Condições T04 precisam de conferência antes de postar. Sem Vercel/DNS em produção.
