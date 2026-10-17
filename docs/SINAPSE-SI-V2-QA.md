# SINAPSE SI — QA da proposta 02

16/10/2026, horário de São Paulo. Prévia local: http://127.0.0.1:3256/ . Esta revisão substitui a avaliação visual 1.0.

## Evidência observada
- 15 páginas em 390, 768 e 1440 px nos dois temas: 90 verificações de layout, sem rolagem horizontal da página, texto fora da largura ou imagem quebrada. Preferência Light conferida após hidratação e entre navegações; script antecipa a restauração visual.
- Home vista em desktop, mobile e 320 px; SNPS inteiro na largura mínima. School em prata inspecionada em tablet. Assinatura, material e fundo acionados no laboratório.
- Studio em mobile e tablet: título e ferramenta preservados entre telas; 10 telas selecionadas. PNG 1080 × 1350 baixado e aberto, com Figma multicolorido. SVG com fonte incorporada e JSON baixados.
- Ferramenta, título, corpo, assinatura, família e tema são preservados por tela. Upload é local, limitado por tipo e tamanho; SVG de upload recusado pelo contrato. Escala limitada à área disponível, sem cortar a imagem do cliente.
- Ícone Growth selecionado e traço leve realmente alterado; download acompanha o peso.
- Reflexo selecionado e pausado: animation-play-state: paused. Movimento reduzido: animation-name: none. Emulação restaurada. Índice fecha com Escape e devolve foco.
- Seis imagens geradas a partir do SNPS inspecionadas: vidro, metal, roupas. Tecido, mangas, costuras, punhos, capuz, estampa e contato com a superfície. Mockups conceituais; não prova de fabricação.
- PDF: 37 páginas 1920 × 1080, 10.702 caracteres informativos nativos, fontes incorporadas e lettering em curvas. Prancha completa e páginas ampliadas conferidas; zero texto nativo fora da página. Exemplos vetoriais no PDF usam versão plana quando o renderizador não mantém gradiente; materiais aparecem nas fotografias.
- 40 assinaturas em curvas, 12 ícones e 34 templates. Kit com CRC e manifesto SHA-256.
- Typecheck passou. ESLint proporcional sem erros; 18 avisos de imagem nativa (SVG, data URI e WebP preparado). Nenhuma regra desativada.
- 57 verificações do exportador passaram: dimensões, temas, XML, texto longo, guias, coassinatura e cores de ferramenta.

## Limites reais
Build de produção não executado localmente. O gate exige 4 GiB de RAM; esta revisão encontrou cerca de 1,7 GiB livres, sem condição para repetir. Nenhum processo de outra sessão foi encerrado para liberar memória.

A CI anterior falhou no lint interativo sem configuração e no Gitleaks por revisão indisponível no checkout raso (zero bytes analisados). Não equivale a varredura de segurança concluída. Workflow, hooks, autenticação e permissões não foram alterados.

Vínculo Vercel antigo inacessível na conta autenticada. Nenhum projeto novo, deploy, DNS, postagem ou fabricação. Board GitHub sem escopo de leitura; issue #10 e PR #11 mantêm acompanhamento.

Validação técnica não representa aprovação estética de Caio. Assinaturas, ícones, materiais e roupas são a proposta 02 para revisão.

Downloads: 118 URLs locais conferidas com resposta 200; SVG XML válido e JSON com ferramenta por tela lidos após exportação.
