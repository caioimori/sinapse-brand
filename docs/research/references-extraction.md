---
status: extraction completa
date: 2026-04-19
method: WebFetch + inferência estrutural (chrome-devtools MCP offline)
confidence: estrutura/nav = alta · animações = média-baixa (SPAs não renderizam sem JS)
---

# Extração de Referências — 10 sites

## ⚠️ Ressalva honesta
WebFetch pega HTML/metadata estático, não renderiza JS. Vi estrutura, classes, meta, assets, navegação. Animações inferi por contexto + conhecimento de sites desse nível. Com chrome-devtools MCP funcionando eu capturaria vídeos de scroll exatos — recomendo repetir com browser automation quando possível pra validar.

---

## 1. sp3company.com
Site healthcare focado em crescimento de clínicas. Limited signal via HTML estático. Descartado pra análise profunda.

## 2. abacatepay.com
- **Layout**: hero dominante → cards 3-4 col → carrossel testimonials → footer 6 col
- **Paleta**: verde/amarelo abacate + cinza neutro + branco
- **Interações**: pricing calculator interativo · carrossel auto-rotate testimonials · AI chat feature
- **Tech**: Next.js + Image Optimization
- **Único**: "Abacate Chat" AI, developer-centric, density em dashboard

## 3. stripe.com/br
- **Layout**: grid multi-col responsivo · seções full-width alternadas · bento grid produtos · acordeão enterprise
- **Paleta**: branco dominante + cinzas neutros + azul CTAs + fotografias com gradientes
- **Interações**: carrossel infinito de logos · acordeão expandível · scroll-triggered transitions · hover states tight
- **Tipografia**: pesos escalonados · line-height generoso
- **Único**: **fotografias conceituais com paralelogramos Stripe integrados em cenas reais** (assinatura visual) · bento grid premium · acordeão com conteúdo rico

## 4. itsoffbrand.com ⭐ referência principal
- **Layout**: modular em blocos · hero full com scroll indicator · portfolio 11 projetos dinâmicos · grid logos 4×10 ("Trusted by Leaders") · footer multi-col
- **Paleta**: **preto/branco alto contraste** (igual SINAPSE) + acentos pontuais
- **Tipografia**: **hierárquica com line breaks estratégicos** ("A Different / Creative / approach") · capitalization misto · ritmo visual por peso
- **Patterns**: grid de **+** repetidos · símbolos ● △ ⁂ como prefix/suffix · números 5%-100% como decoração · **setas →** como padrão de navegação
- **Animações**: loading progress bar 0-100% · scroll triggers · hover states em links · form feedback animado
- **Tech diferenciada**: **WebGL + 3D em 8 projetos** · **Web Motion + Rive** · Awwwards Site of the Year
- **Manifesto**: "Different Is the Standard" · "pushing THE BOUNDARIES OF DIGITAL CREATIVITY"
- **Navegação**: header minimal + submenu + social links
- **Assinatura única**: EMOTION + INNOVATION como tagline · portfólio com techniques múltiplas

## 5. nyo.ia.br
- **Layout**: hero full + nav fixa · grid cards 3-4 col agentes · seções alternadas light/dark · **tabela comparativa "Humanos vs Agentes"** · footer multi-col
- **Paleta**: azul/ciano brand + branco bg + cinza
- **Tipografia**: Sans-serif moderna (Inter/Rubik provável) · **maiúsculas decorativas** "//AI AGENTS NEVER SLEEP"
- **Patterns**: **prefix `//`** (code comment aesthetic) como assinatura visual · cards com elevation sutil · alternância de direção de layout
- **Animações**: **loading counter "00 23 65 100 nyo"** · scroll-triggered reveals · accordeons FAQ · **indicador de hora local dinâmica "13:27:02 [GMT -3]"** (referência que você pode querer)
- **Único**: diálogos fictícios entre agentes + usuários · narrativa Problema → Solução → Prova → Ação · minimalismo corporate com toques tech

## 6. digitalflagship.com
- **Layout**: grid 2 col portfolio · cards quadrados 650×650 · "Rise above the current"
- **Paleta**: verde + branco + neutros escuros
- **Único**: Shopify Partner foco · case-study heavy · portfolios como hero visual
- **Animações**: Elementor popups + mobile menu toggle (menos ambicioso que outras refs)

## 7. overlay.com
- **Layout**: hero-first · seções modulares verticais · grid responsivo alternando img/video
- **Paleta**: gradientes suaves (`Gradient.avif`) · tons neutros premium · futurístico/beauty
- **Tipografia**: sans premium não-declarada
- **Assets**: **AVIF/WebP otimizadas** · SVG frames decorativos · elipses geométricas
- **Animações**: **vídeo HTML5 nativo** · scroll triggers · form feedback
- **Único**: **timeline diacrônica cultural** (12 épocas de beleza) · "beauty filter pro mundo real" · computer vision + robotics · design industrial meets minimalism
- **Navegação**: header minimal + hamburger · single-column · sem sidebar

## 8. euclidpower.com
- **Layout**: multi-col responsivo · hero 4 cards visuais · seções verticais alternando texto/imagem · narrativa 5 passos **"Chaos → Process → Organize → Analyze → Clarity"**
- **Paleta**: branco/neutros + azuis corporativos + pretos contraste
- **Tipografia**: **números gigantes destacados** (12+ GW, 1000+, $10b) como elementos visuais
- **Patterns**: logos clientes em banner · cards com bordas suaves
- **Animações**: hover states apenas · **nenhuma scroll/WebGL** — minimalismo corporate
- **Único**: **dados concretos como design elements** · storytelling before/after · minimal com propósito

## 9. story.foundation ⭐ referência principal
- **Layout**: seções full-width stacked · **card-based "IP Potential" 6 colunas colapsáveis** · hero dominante · footer 5 col
- **Paleta**: branco/off-white + acentos azul/ciano + cinzas · **rings concêntricos em background** (ip-potential/bg-2-ring.png)
- **Patterns**: **background rings geométricos** · imagens de transição full-width · iconografia flat (ai, data, bio) · avatares circulares com badges (Ippy, Hot Ippy, Star Ippy)
- **Animações**: scroll-triggered sections · hover states · **transições de imagem "AIxIP"** · visualização de derivative graphs
- **Único**: **visualização de derivative graphs** · tokenização com exemplos concretos (823k remixes) · data-driven + minimalista
- **Navegação**: header horizontal (Learn, Build, Tools, Network, Community) + CTA destaque · sem sidebar

## 10. thegrid.ai
- **Layout**: responsivo full-width · grid 3 col benefícios · hero CTA centralizado · alternância texto-imagem
- **Paleta**: preto/branco base · gradientes sutis · "offer-bg.png" background custom
- **Tipografia**: hierarquia clara · pesos variados
- **Patterns/Tech**: **vídeo backgrounds (4x elementos)** · Vercel Image Optimization · SVG scalability · Prismic CDN
- **Animações**: loops de vídeo automatizados · hover states · scroll revelações · trading interface (dashboard-like)
- **Navegação**: **dropdown "MENU_"** (tech aesthetic) · sidebar menu colapsável · footer standard
- **Único**: **design mercado financeiro aplicado a IA** (spot market, order book, liquidez) · manifesto visual · The Grid Game gamificado · dashboard/trading interface

---

## 🧪 PADRÕES RECORRENTES (que vou ABSORVER pro SINAPSE)

### Visual/Layout
1. **Hero full-bleed com scroll indicator** (sp3, itsoff, overlay)
2. **Alternância light/dark entre seções** (nyo, euclid, stripe) — Bone ↔ Vanta zones
3. **Bento grid assimétrico** (stripe, story)
4. **Cards em lockup com padding generoso** (euclid, nyo, abacate)
5. **Tabela comparativa "A vs B"** (nyo Humanos vs Agentes) — pode virar nosso "Design System sem vs com SINAPSE Brand"
6. **Narrativa 5-passos "antes → depois"** (euclid Chaos → Clarity)
7. **Logos carousel infinito** (stripe, itsoff) — nosso: logos de projetos SINAPSE
8. **Portfolio em cards grandes quadrados** (digitalflagship, itsoff)
9. **Timeline diacrônica** (overlay — 12 épocas) — pode virar nosso "Brand through time"
10. **Bg rings concêntricos decorativos** (story foundation) — perfeito pro SINAPSE

### Animações
11. **Loading progress counter** (itsoff 0-100, nyo 00-23-65-100) — **vou construir**
12. **Custom cursor com blend mode** (itsoff, overlay inferido) — **já no plano**
13. **Scroll-pin sections** (stripe, story) — **no plano**
14. **Video background loops** (thegrid 4 elementos, overlay) — **vou adicionar**
15. **Accordion expandível com conteúdo rico** (stripe enterprise) — **já uso em FAQ**
16. **Hora local dinâmica** (nyo 13:27:02 GMT-3) — **vou adicionar no footer**
17. **Auto-rotate carousel testimonials** (abacate) — **vou absorver pra showcase**
18. **Hover state magnetic em thumbs** (itsoff portfolio) — **já tenho magnet**
19. **Transição de imagem entre seções** (story "AIxIP transitions") — **vou adicionar**
20. **Image masks/reveals** (stripe fotografias paralelogramo) — **conceitual: símbolo SINAPSE integrado em contextos reais**

### Tipografia/Micro
21. **Prefix `//` code-comment** (nyo) — **adotar em mono meta labels**
22. **Símbolos decorativos ● △ ⁂ →** (itsoff) — **adotar como assinatura**
23. **Números grandes como decoração** (euclid $10b, 12+ GW) — **já uso em giant-number**
24. **Maiúsculas decorativas em H2** (nyo "//AI AGENTS NEVER SLEEP") — **adotar**
25. **Line breaks estratégicos em H1** (itsoff "A Different / Creative / approach") — **já uso**
26. **Grid de símbolos repetidos como textura** (itsoff grid de +) — **vou criar .pattern-plus**
27. **Ring concêntrico SVG decorativo** (story) — **novo pattern .pattern-rings**

### Técnicas avançadas
28. **WebGL/Rive em moments específicos** (itsoff) — v2 (é caro)
29. **Gradientes AVIF/WebP** (overlay) — usar em imagens, não no brand
30. **Prismic/CDN delivery** (thegrid) — manter next/image

---

## 🎯 O que vai entrar na SINAPSE v2

**Adotar na FASE A (infra):**
- Loading counter animado na primeira visita (00 → 100 → SINAPSE)
- Custom cursor blend-mode
- Símbolos decorativos (●  ◆  →  //) em meta labels
- Hora local dinâmica + "LIVE" indicator no footer
- Scroll progress bar top
- `.pattern-plus` + `.pattern-rings` novos
- `.pattern-grid` e `.pattern-dots` opacity 2x maior

**Adotar na FASE C (brandbook):**
- Moodboard timeline diacrônica
- Tabela "sem SINAPSE vs com SINAPSE" (com/sem sistema)
- Narrativa 5-passos no Movimento (Caos → Sistema)

**Adotar na FASE D (design system):**
- Bento grid em index de components
- Cards portfolio em Showcase
- Auto-rotate carrossel para testimoniais
- Video loop backgrounds em templates

**Adotar na FASE E (templates):**
- Landing template com hero shader-like
- Dashboard SaaS com density Stripe
- Proposta 9-slides com fotografia conceitual (símbolo integrado em cenas)

---

## Próximo passo
Caio valida se vou **absorver tudo isso na FASE A/B/C** ou cortar algo. Depois executo.
