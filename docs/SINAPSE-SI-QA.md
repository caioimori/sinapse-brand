# SINAPSE SI — verificação da proposta 1.0

Consulta e execução: 16/10/2026. Prévia local: http://127.0.0.1:3256/. Refs #10.

## Evidência observada
- Quinze páginas em 390, 768 e 1440 px: 45 leituras de DOM, sem overflow horizontal, título ausente ou imagem quebrada; conferência repetida após consolidar as fontes locais.
- Home inspecionada visualmente em 320, 390, 768 e 1440 px. Título mantém duas linhas em 320 px, sem palavra isolada. Menu móvel abre, navega e fecha após selecionar o capítulo ou pressionar Escape.
- Assinaturas: alternância principal/símbolo e Vanta/Bone observadas. Vetores originais mantidos; descritores novos convertidos em curvas.
- Template Studio: texto alterado, tema invertido, formato story selecionado e tela 6 carregada. PNG baixado e aberto em 1080 × 1350, com texto e assinatura legíveis.
- Vestuário: troca de camiseta/moletom, família manifesto e edição branca observadas. Fonte é uma ilustração técnica; mockups recebidos aparecem separados.
- Coassinatura: leitura de PNG local, controle de escala óptica até 200% e exportação de avatar 1080 × 1080 conferidos. O arquivo permanece no navegador.
- Exportador: 54 contratos passaram, cobrindo formatos, XML, textos longos, área de segurança e inserção de logo.
- SVG com fonte incorporada e JSON de 10 telas baixados e lidos; a edição da primeira tela foi preservada.
- Movimento: órbita selecionada e pausada; estado computado `animation-play-state: paused` confirmado.
- PDF: 47 páginas 1920 × 1080; 21.228 caracteres nativos; fontes incorporadas; lettering preservado em curvas; prancha de contato inteira e páginas ampliadas inspecionadas. Medição do gerador não detectou texto fora da página.
- Typecheck passou. ESLint executado diretamente no código novo com as configurações Next/TypeScript: zero erros e quatro avisos de imagem nativa.

## Limites
- O gate impediu o build local: 3,2 GiB de RAM livres, mínimo de 4. O comando de build não foi executado e não foi repetido sem mudança de condição.
- O script histórico `npm run lint` pede configuração interativa e não fornece evidência de lint. A verificação acima usa configuração temporária em qa-local, sem mudar CI.
- O vínculo antigo da Vercel aponta para um time indisponível. A conta autenticada atual não encontrou o projeto source-of-truth ou o repositório sinapse-brand no time SINAPSE AI PROJECTS. Não foi criado outro projeto ou alterada autenticação.
- O token GitHub não tem read:project; board indisponível. A issue e o PR preservam o acompanhamento sem mudar permissões.
- A revisão visual do kit usa exemplos representativos e o documento; integridade e contratos de arquivo são conferidos programaticamente. Não equivale a prova física, aprovação comercial ou aprovação de postagem.
- SVGs de movimento são editáveis para web. O lote não entrega filmes MP4, uma fonte tipográfica original completa ou um arquivo Figma vinculado à conta do usuário.

## Fontes e publicação
As seis páginas públicas atuais, 41 páginas de PDFs, cinco áudios e 23 arquivos do Drive foram consultados com os limites descritos no capítulo Pesquisa. Nenhum formulário foi enviado e nenhuma rede, DNS ou produção foi alterada.

Transcrições, links temporários de downloads e pesquisas privadas permanecem em pastas ignoradas. As rotas históricas e o CANON anterior ficam preservados; o checkout principal não recebeu alterações deste lote.

## Readback do PR #11

A CI do commit dce3f3c falhou em dois pontos da configuração existente: o lint interrompeu na pergunta interativa de configuração; o Gitleaks recebeu uma revisão Git indisponível no checkout raso e informou leitura de zero bytes. Não é uma varredura de segurança concluída.

Logs: https://github.com/caioimori/sinapse-brand/actions/runs/38981568604 . O lote não alterou workflow, hooks, permissões ou branch protection. A verificação local de padrões de credenciais e os hashes dos arquivos staged passaram.

Também foram conferidos movimento reduzido (animação computada como none), larguras 320/619/621/849/851/1151/1440 e 99 URLs de download, todas com resposta 200. As fontes do portal são servidas localmente para corresponder aos arquivos do sistema.
