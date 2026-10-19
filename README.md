# SINAPSE SI / edição 08

Brandbook visual em `/book`: 53 pranchas 1920 × 1080. R corrigido na SNPS Display 1.300; demais glifos, avanços e mestres SNPS/SINAPSE preservados. S circular fino e seu contorno interno preenchido, sem círculo, disponíveis em sólido, vidro, prata e fosco.

Prévia local: http://127.0.0.1:3256/book . Collection: /studio/wear . Símbolo: /studio/symbol . Downloads: /studio/downloads . O acesso foi recuperado e a revisão atual do navegador está registrada em docs/SINAPSE-SI-V9-QA.md.

Sistema social: 9 posts, três carrosséis de cinco telas, cinco destaques de quatro Stories, cinco capas e dois avatares. 50 artes SVG em curvas, PNGs nativos e WebPs de consulta; legendas e conteúdo em Markdown/JSON. É uma proposta editorial; não houve alteração do Instagram.

Collection 04: oito camisetas regulares e quatro moletons, sempre frente + costas. Duas versões do mesmo S na frente; frase e SNPS SI atrás. Caveat aprovada preservada, demais fontes em teste. Fotografias geradas são conceitos para revisão; o SVG é a referência do desenho e a amostra física validará tecido, caimento e impressão.

Símbolo de origem: Idv_SNPS.pdf, página 8, imagem incorporada de alta resolução; Bézier original indisponível. A variante solta copia exatamente o contorno interno recuperado, sem redesenho. Proveniência em symbol-circle/source.json e symbol-free/source.json. Prompts e checksums das fotos em wear-v8/provenance.json, wear-v9/provenance.json e visual-v8/provenance.json.

Geradores atuais: build-si-v9-symbol.py; build-snps-display.py; build-si-v6-signatures.py; build-si-v9-delivery.py (social → PNG/WebP → PDF → TypeScript); consolidate-si-v9.py; package-si-v9.py. O build do livro reutiliza apenas helpers nativos antigos. Não executar consolidadores históricos sobre a edição atual.

Verificação: 311 provas de fidelidade, TypeScript, build de produção, limites do texto PDF e fontes incorporadas. QA de navegador e de pacotes em docs/SINAPSE-SI-V9-QA.md e qa/v9-*.json. Livros antigos e propostas rejeitadas permanecem recuperáveis fora do kit vigente.

Entregas: SINAPSE-SI-Brandbook-08.pdf, SINAPSE-SI-Kit-08.zip e SINAPSE-SI-Social-08.zip. Branch feat/sinapse-si-brandbook-20261016 / PR #11 / issue #10. Sem publicação em produção, DNS, postagem ou fabricação. Recuperação: bbc6e6c.
