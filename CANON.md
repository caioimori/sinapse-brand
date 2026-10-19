# SINAPSE SI / edição 08 / vigente em 19.10.2026

Pedido atual: corrigir a origem da perna do R, disponibilizar o mesmo S sem círculo e refinar a formatação visual do brandbook com perfil, feed, destaques e posts. Mestres SNPS/SINAPSE e decisões anteriores preservados. Preto e branco, Dark First + Light, descritores em uma linha e espaço de uma altura de letra.

SNPS Display 1.300: somente R/r e formas acentuadas de R mudam. A diagonal começa na borda superior da barra do bojo, sobreposta ao traço, sem raiz arredondada. Demais curvas e avanços intactos. S sem círculo usa exatamente o contorno interno de symbol-circle/source.json como preenchimento positivo; original raster da página 8, não Bézier original. O círculo segue disponível.

Collection 04 tem 12 peças com frente/costas, duas versões de símbolo e 12 folhas fotográficas. Fonte/data atual: data/si/wear-v9.json. Costas nativas e Caveat preservadas. Seis edições fotográficas novas em wear-v9 mudam apenas os dois símbolos de frente por folha; todos os mockups são conceituais. Conferir amostra física antes de fabricar.

Edição 08: 53 páginas, 7.252 caracteres informativos nativos, zero texto fora dos limites. Navegação por capítulos, galeria de aplicações em colunas com arte completa, perfil com dois avatares, nove posts, três carrosséis de cinco telas e cinco destaques de quatro Stories. Arquivos sociais em public/si-v2/social-v9; conteúdo/captions em data/si/social-v9.json. Sem aplicação ao Instagram.

A conexão da prévia foi restaurada. QA atual em docs/SINAPSE-SI-V9-QA.md e qa/v9-*.json substitui a limitação de conexão anterior. TypeScript, build de produção e 311 provas de fidelidade passaram. Não herdar inspeção de edições antigas como prova desta edição. Dev em 127.0.0.1:3256, checkout knowledge/sinapse-si-brandbook, branch feat/sinapse-si-brandbook-20261016, PR #11. Build isolado em .next-verify; preservar o servidor dev.

Geradores vigentes: build-si-v9-symbol.py; build-snps-display.py; build-si-v6-signatures.py; build-si-v9-delivery.py; consolidate-si-v9.py; package-si-v9.py; test-si-v9.py. Não executar consolidadores antigos. PDF, kit completo e kit social 08 são atuais. Recuperação anterior: bbc6e6c. Produção, DNS, Instagram e fabricação não foram autorizados nem executados.

---

## Histórico anterior / superado quando conflitar com a edição 08

# SINAPSE SI / edição 07 / vigente em 19.10.2026

Caio pediu menos texto, apresentação mais artística e todas as roupas com frente e costas. /book agora é uma galeria navegável com materiais, tipografia, aplicações e referências; o leitor completo fica recolhido. PDF visual com 40 páginas 1920 × 1080 e 5,639 caracteres nativos, contra 21.124 na edição 06. Fontes incorporadas e zero texto fora dos limites.

Símbolo vigente: o S circular fino existente no Idv_SNPS.pdf, página 8, escolhido por Caio. O PDF traz raster 7680 × 4321, sem Bézier. Contorno extraído e suavizado; origem explicitada em symbol-circle/source.json. Sobreposição binária: 99,478% na silhueta e 98,580% na abertura S. Os dois mestres e a fonte corporativa permanecem byte a byte. /studio/symbol e downloads mostram a seleção atual; as propostas rejeitadas continuam só no histórico.

Collection 04 em wear-v8: oito camisetas regulares, quatro moletons, 24 vistas em seis folhas. Frente: só S circular no peito; costas: frase + SNPS SI. Estampas de wear-v7 e Caveat preservadas byte a byte. Bricolage Grotesque e Space Mono continuam propostas. Vidro/prata/papel em visual-v8. Fotografias conceituais geradas, conferidas como arquivos locais; fabricação não autorizada.

Verificação vigente: TypeScript, 112 provas de fidelidade, PDF e kit CRC/SHA. Limitação: navegador bloqueou observação da aba no documento data: de erro; Caio confirmou conexão recusada após recarregar e digitar /book. Servidor Ready, escutando 127.0.0.1:3256 e HTTP 200 local. Responsividade, Dark/Light, pausa, seleção, filtros e diálogos desta revisão NÃO verificados. Não herdar aprovação visual web de edições anteriores. Não declarar prévia pronta. Build de produção não executado por RAM abaixo de 4 GiB.

Fontes atuais: scripts/build-si-v8-circle.py, build-si-v8-wear.py, build-si-v8-book.py, consolidate-si-v8.py, package-si-v8.py e test-si-v8.py. Leitor data/si/book-v8.json, PDF/kit 07. O gerador PDF reutiliza só os helpers de texto/vetor da edição 06. Preservar o acervo antigo; não executar consolidadores históricos. Próximo passo: restaurar acesso da prévia e conferir 320/390/768/1440 px, breakpoints e controles. Sem produção, DNS, postagem ou fabricação.

Checkout knowledge/sinapse-si-brandbook; branch feat/sinapse-si-brandbook-20261016; PR #11. Recuperação anterior: bb713a2. O checkout source-of-truth não foi alterado.

---

## Histórico anterior / superado quando conflitar com a edição 07

# SINAPSE SI — edição 06 / Sinal contínuo

Pedido vigente: reestruturar a expressão e o brandbook com leitura profunda dos seis cases abertos por Caio, sobretudo OXA AI e Buff. Preservar SNPS e SINAPSE completos. Preto e branco, Dark First e Light Mode continuam definidos.

## Identidade e fonte

Originais em public/brand/logo, intactos. O mestre SINAPSE completo também é incorporado diretamente nas novas assinaturas, incluindo o segundo S e o I original. Não substituir os mestres por texto digitado.

SNPS Display Regular 1.200: OTF, TTF e WOFF2; 196 glifos. K, J, F, W e Z foram redesenhados nesta edição. H foi preservado. S, I, N, A, P e E são curvas recuperadas. Demais letras são extensões propostas; teclas minúsculas usam formas maiúsculas. Manrope 400/600 mantém a leitura e JetBrains Mono identifica registros.

Traço 9,38; altura 46,90; intervalo 16,64 no mestre. A gramática não possui um radius único: terminal aberto reto; retorno circular 4,69; ombro externo do N 9,38; retorno interno pequeno 2,54. Diagonais novas têm transições suaves e terminais cortados. OTF conserva cúbicas; TTF usa aproximação de até 0,25 unidade de fonte.

Dez assinaturas em quatro materiais e dois fundos: 80 SVGs. SI, School, House e Growth ficam sempre à direita do nome na mesma altura e baseline, nunca embaixo. Usar SNPS SI como assinatura principal compacta. O intervalo entre nome e complemento é de 46,90 unidades do mestre, uma altura de letra (+41% sobre 33,28). Não deformar proporção, traço, sequência de letras ou avanço. Conferir palavras críticas e reprodução física antes de adotar extensões como arte final de fabricação.

## Expressão

Sinal contínuo: retorno do S e transição do N originam recortes, camadas, foco e material. Texto informativo permanece em plano estável. Os casos inspiram mecanismos; símbolos, paletas, retratos e arquivos de terceiros não integram a identidade SINAPSE.

17 composições atuais de aplicações/anatomia em SVG e WebP, com Passagem fora do conjunto. Atlas interativo, pôsteres, stories, capas, perfis e cartão. Passagem foi rejeitado por Caio em 17/10 e retirado da direção atual; os arquivos permanecem recuperáveis. Collection 03 substitui 02: oito camisetas e quatro moletons, seis novos pares fotográficos e 12 novas estampas em curvas. Refinamento vigente: camisetas de corte regular; Caveat aprovada em Born Curious e Still Human, com os traços preservados. Bricolage Grotesque e Space Mono são novos testes, com licenças OFL. Assinatura das roupas somente SNPS SI, sem microtexto abaixo. Fotografias de conceito não são prova de fabricação, parceria, cliente ou local real.

Estudo de origem em /studio/symbol: Nexo, Síntese SN e Pulso foram rejeitados por incongruência com o lettering. Não há símbolo selecionado ou recomendado. O S original foi extraído dos dois mestres com o atributo d intacto; sua proporção 1,987:1 e seu traço permanecem. O uso isolado é um teste construtivo, não um novo ícone aprovado. Documento de cinco páginas e kit próprio em public/si-v2/symbol-origin. Fonte: data/si/symbol-origin.json e docs/SINAPSE-ORIGEM-TRACO.md.

Material comum em data/si/materials.json e lib/si/material.ts. Vidro portátil em PNG/WebP com alpha e iluminação própria. Geometria exata continua no SVG; o material web é interpretação, não o recurso nativo Apple.

Logos de ferramentas mantêm suas cores no conteúdo pertinente, com escala e legenda. Collection 03 usa Nude Project como referência de atitude editorial, sem adotar modelagem oversize; Coinbase Shop orienta cultura de tecnologia. Frases de IA, escrita gestual aprovada e novos testes sem serifa/monoespaçados. Protótipo físico continua necessário.

Signals 04: 12 ícones, formato 96 × 64, terminais retos e retornos controlados. Conferir redução com rótulo. Editor com 49 templates exportados, cinco famílias (Manifesto, Fluxo, Caderno, Convite, Em produção), material/fonte por quadro e PNG/SVG/JSON.

## Livro e pesquisa

60 páginas 1920 × 1080. Texto nativo com Manrope Regular e Semibold de nomes distintos, JetBrains e SNPS Display incorporadas. Fotografias e pranchas de material são ilustrações raster; mestres, anatomia e ícones mantêm curvas. Leitor /book, PDF e kit 06 são atuais e não contêm Passagem. Capa, página 24, campanha e pôster House foram atualizados. PDFs antigos permanecem recuperáveis, fora do kit atual. A decisão de símbolo segue aberta, sem adoção do estudo separado.

199 imagens estáticas: OXA AI 25, Buff 42, Mozari 23, Cirdia 52, Centrysk 36 e Clarity 21. Dois vídeos Buff identificados, sem análise temporal. Não afirmar acesso aos editáveis ou PDFs completos dos autores. Dados e decisões em data/si/reference-atlas.json e docs/SINAPSE-SI-V4-BENCHMARK.md.

## Negócio e entrega

School desenvolve repertório; House constrói projetos; Growth opera crescimento para e-commerce, vendas diretas e geração de leads. SI significa Super Intelligence, sem alegação de capacidade técnica de superinteligência. Lista T04 não equivale a matrícula; condições comerciais precisam refletir a oferta vigente.

Prévia 3256, branch feat/sinapse-si-brandbook-20261016, PR #11, issue #10. Sem produção, DNS, postagem ou fabricação. Revisão 03 recuperável em cfe9c41; anteriores no Git. CANON modificado no checkout principal permanece intocado.
