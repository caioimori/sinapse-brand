# SINAPSE SI / edição visual 07 / 19.10.2026

Implementado: /book passa a ser uma apresentação visual, com capa de material, símbolo em contraste, assinaturas, seleção de materiais, espécime tipográfico interativo, aplicações ampliáveis, referências visuais creditadas e roupas com frente e costas. Leitor PDF completo fica em uma seção recolhida. /studio/symbol mostra a versão circular fina existente. Downloads apontam para edição 07.

Collection 04: seis folhas fotográficas geradas, quatro vistas por folha, total de 24 vistas e 12 peças. Frente com S circular discreto; frases e SNPS SI nas costas. As oito camisetas usam corte regular. Todos os arquivos foram inspecionados visualmente: vistas pareadas, texto, posição de estampa, tecido, costuras, gola/punhos e coerência de corte. Caveat, estampas anteriores aceitas e mestres SNPS/SINAPSE preservados byte a byte. Fontes novas continuam propostas.

Símbolo: encontrado na página 8 de Idv_SNPS.pdf; PDF sem desenhos vetoriais, imagem incorporada de 7680 × 4321. Extração do contorno com simplificação de 0,8 pixel e suavização quadrática; exterior circular analítico. Sobreposição binária da silhueta: 99,478%; abertura S: 98,580%. É recuperação da imagem, não obtenção do Bézier original nem aprovação óptica automática.

PDF: 40 páginas 1920 × 1080; 5,639 caracteres nativos, contra 21.124 da edição 06. Dado exato em qa/v8-pdf-native-check.json. Zero texto fora da página; fontes incorporadas e arte em curvas onde pertinente. Fotos e materiais são raster. Contact sheet e páginas ampliadas inspecionadas. Stories usam seis arquivos t04-story em sequência.

Testes executados: TypeScript sem erros; 112 verificações em scripts/test-si-v8.py, incluindo sobreposição do símbolo, bytes dos mestres/fonte/Caveat/estampas, assinatura exata, limites das artes e presença das doze peças no PDF. Script não substitui revisão visual.

Limitação web: a aba /studio/wear ficou no documento interno de erro (protocolo data:) e a ferramenta recusou observação pela política de URL. Não foi usada outra superfície para contornar a recusa. Caio tentou recarregar e navegar diretamente para /book, informando conexão recusada nas duas vezes. Servidor local no 127.0.0.1:3256 observado como escutando, log Ready e requisição HTTP 200 para /studio/wear. Isso não prova acesso do navegador.

Portanto NÃO verificados: layout em 320/390/768/1440 px, Dark/Light, pausa/reduced-motion, seleção de materiais/palavras, zoom, filtros e diálogos desta revisão. Não reaproveitar QA responsiva anterior como evidência desta mudança estrutural. A prévia não é declarada pronta.

Build de produção não iniciado por RAM livre abaixo de 4 GiB. Não houve produção, DNS, postagem ou fabricação. Novo material aguarda revisão; preservar o histórico. Próximo passo necessário: carregar /book na prévia, testar controles e tamanhos e revisar os estados afetados.
