# SINAPSE SI — edição 06

Prévia local: http://127.0.0.1:3256/studio/wear . Livro: /book . Assinaturas: /studio/identity . Arquivos: /studio/downloads . Reutilizar servidor e aba existentes.

Mestres SNPS e SINAPSE intactos. Todas as assinaturas permanecem horizontais; espaço até o descritor ampliado de 33,28 para 46,90 unidades do mestre. A fonte corporativa SNPS Display 1.200 não foi alterada neste lote.

Passagem e a imagem de campanha que o continha saíram do livro e das aplicações atuais. PDF 06: 60 páginas 1920 × 1080, texto nativo e fontes incorporadas. Nenhum novo ícone foi escolhido.

Collection 03: oito camisetas e quatro moletons, 12 estampas originais em curvas e seis pares fotográficos conceituais. Fontes de expressão licenciadas por OFL. Nude Project orienta modelagem e linguagem tipográfica; Coinbase Shop orienta cultura de tecnologia.

Geradores atuais, nesta ordem:

```powershell
python scripts/build-si-v6-signatures.py
python scripts/build-si-v4-assets.py
python scripts/build-si-v6-wear.py
python scripts/build-si-v6-book.py
python scripts/consolidate-si-v6.py
python scripts/package-si-v6.py
```

O gerador de roupas cria as estampas e pranchas; os seis mockups foram gerados e revisados separadamente. Origem e prompts: public/si-v2/wear-v6/provenance.json. Não executar consolidadores ou livros históricos sobre a edição atual.

Testes proporcionais pelo gate: scripts/test-si-v6.py e node node_modules/typescript/bin/tsc --noEmit. 101 verificações e TypeScript passaram. Livro sem texto fora da página; kit com CRC e SHA conferidos. Evidências em docs/SINAPSE-SI-V6-QA.md e qa/v6-*.json.

Build de produção deste lote não executado: RAM observada abaixo do piso de 4 GiB. Prévia local revisada, sem produção, DNS, postagem ou fabricação. PR #11 / issue #10; branch feat/sinapse-si-brandbook-20261016.
