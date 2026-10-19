# SINAPSE SI / edição 08 / QA vigente

Pedido: R com diagonal contínua a partir do traço superior, mesmo S sem círculo, apresentação visual refinada e perfil/feed/destaques/posts. O escopo é prévia e arquivos para revisão; sem publicação em produção ou Instagram.

## Fidelidade e arquivos

311 verificações em scripts/test-si-v9.py, relatório qa/v9-fidelity-check.json. Mestres SNPS e SINAPSE preservados byte a byte; apenas R/r e acentos R mudam na SNPS Display 1.300, com avanços intactos. Diagonal sobrepõe a barra do bojo desde a borda superior; raiz reta. Variante S livre reutiliza o contorno interno exato de symbol-circle/source.json, não um novo desenho. Arquivo de origem continua raster da página 8 de Idv_SNPS.pdf, sem Bézier original.

12 peças em duas aplicações do símbolo, com frente + costas: 8 camisetas regulares e 4 moletons. Todas as seis novas folhas fotográficas foram inspecionadas como arquivos locais, nas quatro vistas. Mockups gerados são conceitos; impressão, material e caimento exigem amostra física. Costas nativas, assinatura SNPS SI e Caveat preservadas.

9 posts, três carrosséis de cinco telas, cinco destaques de quatro Stories, cinco capas, dois avatares e duas pranchas: 50 artes SVG/PNG/WebP. Contato atual em qa/v9-social-contact.jpg. Cores de ferramentas aparecem no conteúdo pertinente. Sem métricas de seguidores, curtidas ou depoimentos inventados. Exportações escolhidas para projeto, sem alegação de verificação integral das especificações vigentes da Meta; consulta oficial retornou 429.

PDF 08: 53 páginas 1920 × 1080; 7.252 caracteres informativos nativos; zero texto fora dos limites. Fontes incorporadas. Identidade e artes individuais em curvas; fotos raster. As duas pranchas compostas de perfil/posts usam o PNG nativo para manter recortes e gradientes que o conversor SVG não reproduz corretamente; os SVGs editáveis das pranchas estão no kit. Perfil corrigido conferido novamente em tamanho integral, além do contato geral e páginas de R, carrossel e destaque.

## Navegador atual

Conexão recuperada nesta revisão. IAB existente, mesma aba local. Revisão visual em 320, 390, 768 e 1440 px; também 600, 760, 1000 e 1001 px nos breakpoints afetados. Sem rolagem horizontal da página. Barra de capítulos tem rolagem interna intencional em telas pequenas. CONSTRUIR cabe em 320 e 1440, com fonte correta.

Dark/Light, símbolo circular/livre, avatares, filtro Repertório, carrossel de cinco telas, destaque de quatro Stories, setas, último avanço desativado, Escape, legenda expandida, restauração de foco, materiais, pausa, filtros de roupas 8/4, SVG frente/costas, seletor do leitor e ampliação conferidos. Story móvel refinado: navegação antes do texto e cabeçalho fixo no diálogo. Repertório mostra Figma/Obsidian/Supabase nas cores nativas. Reduced motion do sistema não foi emulado; CSS específico inspecionado. OTF baixado via navegador e hash igual à fonte local.

## Validação e entrega

TypeScript passou; build Next de produção passou com 104 páginas e saída 0, isolado em .next-verify para preservar dev. Depois houve apenas ajuste de links/metadata, ativos e documentação, com novo TypeScript. Browserslist informou base de navegadores antiga; dependências não alteradas.

Pacotes 08 conferidos por CRC e SHA de cada entrada, incluindo PDF e fontes, em qa/v9-kit-check.json. 151 rotas e assets locais responderam HTTP 200; fonte OTF baixada pelo navegador com SHA igual. Scan focado de 134 arquivos novos/alterados, cinco padrões de segredos, zero achados; não equivale à auditoria completa do Gitleaks. Assets e metadados sincronizados pelo consolidator atual. O validator branding confere esquema, referências e hashes; não substitui QA visual.

CI anterior da PR #11: Quality Gates falhou porque next lint pede configuração interativa; Security Audit falhou por revisão Git ausente no checkout da action (scan parcial de zero bytes). Evidência: run 39212785558. Isso não comprova aprovação do lint nem varredura de segredos; não foi alterada infraestrutura de CI neste lote. Um scan local focado do novo conteúdo também é registrado na revisão de entrega. Estado remoto após push deve ser lido novamente.

Branch feat/sinapse-si-brandbook-20261016, PR #11, recuperação anterior bbc6e6c. Nenhum merge, produção, DNS, rede social ou fabricação.
