# SINAPSE SI — handoff da proposta 1.0

Refs #10. Branch `feat/sinapse-si-brandbook-20261016`. Base original `df2838f`.

## Entrega
Portal `/` + 14 capítulos em `/studio/*`, Template Studio com 6 formatos e exportação PNG/SVG/JSON, avatares e capas Member, vestuário interativo, ícones e movimento, PDF de 47 páginas e kit.

Nome e preto e branco seguem o pedido de Caio. Plataforma verbal, assinaturas SI/braços, ícones e aplicações são propostas para revisão. O lettering e o símbolo originais ficam intactos.

## Retomar
Prévia local: `http://127.0.0.1:3256/`. Checkout: `knowledge/sinapse-si-brandbook`. Servidor da tarefa iniciado na porta 3256; não confundir com outras prévias.

Comandos: `npm ci`; `npm run dev -- --hostname 127.0.0.1 --port 3256`; `npm run typecheck`; `node scripts/test-si-artwork.mjs`. Geradores: preparar dados, preparar assets, exportar templates, construir PDF, consolidar manifestos e empacotar kit.

Fonte do sistema: `CANON.md`, `data/si/brand.ts`, `brand-system.json`, `public/si/tokens.json`, `components/si/` e `lib/si/`.

## Pendências reais
Build local impedido pelo gate de RAM. Vínculo antigo da Vercel indisponível na conta atual; não criar serviço ou alterar autenticação por inferência. GitHub Project sem escopo de leitura. Ver relatório de QA.

O domínio pretendido é `branding.sinapse.si`. Nenhum deploy de produção, alteração de DNS, postagem ou fabricação foi executado. A aprovação deste sistema não se propaga a esses canais.

Para recuperar a identidade anterior: `docs/archive/CANON-2026-06.md`, `public/brand/logo/` e rotas `/brandbook/*`. O CANON.md já alterado no checkout principal permaneceu intacto.
