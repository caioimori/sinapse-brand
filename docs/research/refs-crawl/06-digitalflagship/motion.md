# DIGITAL FLAGSHIP — MOTION/PATTERNS/EFFECTS

## STACK
- **WordPress + Elementor + Qode framework** (`qodef-` prefix)
- **SplitType** ✅
- 153 keyframes (massive — Qode framework injeta tudo)
- **50+ easings** (impossível disciplinar — confirma que Qode é "kitchen sink")
- 36 videos · 3 SVGs · sem WebGL canvas

## PADRÕES NOTÁVEIS

### #1 — Underline reverse-and-play
```css
@keyframes qodef-animate-underline-from-left {
  0%   { transform: scaleX(1); transform-origin: right center; }
  37%  { transform: scaleX(0); transform-origin: right center; }
  38%  { transform: scaleX(0); transform-origin: left center; }   /* swap origin */
  100% { transform: scaleX(1); transform-origin: left center; }
}
```
**Genius hack:** underline existente "se desfaz" pra direita (37%), troca origin (38%), e "se refaz" pela esquerda (100%). Visual: linha "passa por trás" do texto e reaparece. Sintaxe pura CSS sem JS.

### #2 — Highlight sweep (marker)
```css
@keyframes qodef-animate-highlight {
  0%   { background-size: 0px 100%; background-position-x: left; }
  100% { background-size: 100% 100%; background-position-x: left; }
}
```
Background com size 0→100% horizontal = highlighter marker passando sobre texto. **Aplicar em SINAPSE pra "Big Idea" reveals**.

### #3 — SVG border draw (stroke-dashoffset)
```css
@keyframes qodef-border-line-draw {
  100% { stroke-dashoffset: 0; }
}
```
Padrão clássico SVG: stroke-dasharray + stroke-dashoffset = path "desenhando" no scroll.

### #4 — Image hover variants (4 modes)
- `--hover-zoom`: scale 1.005 → 1.03
- `--hover-zoom-out`: scale 1.03 → 1
- `--hover-move`: scale 1.2 + translateX(12px) — pan effect
- Aplicáveis como utility class system

### #5 — Content follow cursor
`.qodef-qi-e-content-follow` — ao hover de uma área, content card flutuante segue cursor. JS-driven.

## LIÇÕES SINAPSE
- **Highlight sweep** pra Big Idea / quotes / palavras-chave em manifesto
- **SVG border-draw** pra logo entrance + frame reveals
- **Underline reverse-and-play** pra links premium
- **NÃO copiar** os 50 easings — kitchen-sink anti-pattern
