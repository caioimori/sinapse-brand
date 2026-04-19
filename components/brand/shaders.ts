// SINAPSE Shader Wallpapers V3 — 6 wallpapers WebGL2 B&W radical
// Todos densos · auto-loop · gradient B&W · responsive a mouse/click

const HEADER = `#version 300 es
precision highp float;
uniform float uTime;
uniform vec2  uMouse;
uniform vec2  uResolution;
uniform float uClickTime;
uniform vec2  uClickPos;
uniform float uTheme;
in vec2 vUv;
out vec4 fragColor;

vec3 BONE  = vec3(0.961, 0.961, 0.941);
vec3 VANTA = vec3(0.039, 0.039, 0.039);
vec3 INK_DARK   = vec3(0.04);
vec3 INK_LIGHT  = vec3(0.97);

vec3 paletteBg() { return mix(BONE, VANTA, uTheme); }
vec3 paletteFg() { return mix(INK_DARK, INK_LIGHT, uTheme); }
vec3 paletteMid() { return mix(vec3(0.55), vec3(0.42), uTheme); }

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
             mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 6; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}
mat2 rot(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
`;

// 13.1 — VANTA STORM — atmospheric noir, clouds rolling auto-loop
export const VANTA_STORM = HEADER + `
void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);

  // mouse subtle distort
  vec2 d = (uv - uMouse) * aspect;
  float dist = length(d);
  uv += normalize(d + 0.0001) * exp(-dist * 5.0) * 0.04;

  // Multi-layer fbm clouds
  vec2 q = uv * 2.5;
  q.y += uTime * 0.04;
  float cloud1 = fbm(q);
  float cloud2 = fbm(q * 2.0 + vec2(uTime * 0.06, 0.0));
  float cloud3 = fbm(q * 4.0 - vec2(0.0, uTime * 0.08));

  float density = cloud1 * 0.5 + cloud2 * 0.3 + cloud3 * 0.2;
  density = smoothstep(0.3, 0.85, density);

  // Vertical gradient
  float vgrad = uv.y * 0.4 + 0.4;

  vec3 bg = paletteBg();
  vec3 fg = paletteFg();
  vec3 mid = paletteMid();

  vec3 color = mix(bg, mid, density * 0.4);
  color = mix(color, fg, density * vgrad * 0.18);

  // Grain
  color += (hash(uv * uResolution + uTime) - 0.5) * 0.03;

  fragColor = vec4(color, 1.0);
}`;

// 13.2 — BONE GLOW — gradient breathing infinite + click pulse
export const BONE_GLOW = HEADER + `
void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);

  // breathing radial centerpiece
  vec2 cd = (uv - vec2(0.5)) * aspect;
  float cdist = length(cd);
  float breath = 0.5 + 0.5 * sin(uTime * 0.5);
  float core = exp(-cdist * (4.0 - breath * 1.5)) * 0.6;

  // mouse follower glow
  vec2 md = (uv - uMouse) * aspect;
  float mdist = length(md);
  float mglow = exp(-mdist * 6.0) * 0.4;

  // click sonar
  float t = uTime - uClickTime;
  vec2 ccd = (uv - uClickPos) * aspect;
  float cdist2 = length(ccd);
  float pulseR = t * 0.5;
  float sonar = (1.0 - smoothstep(0.01, 0.025, abs(cdist2 - pulseR))) * exp(-t * 0.7);

  vec3 bg = paletteBg();
  vec3 fg = paletteFg();
  vec3 mid = paletteMid();

  // Gradient base — radial soft
  vec3 color = mix(bg, mid, smoothstep(1.0, 0.0, cdist) * 0.18);
  color = mix(color, fg, (core + mglow + sonar) * 0.4);

  // Hairline grid sutil overlay
  vec2 g = abs(fract(uv * 24.0) - 0.5);
  float line = min(g.x, g.y);
  float alpha = 1.0 - smoothstep(0.0, 0.005, line);
  color = mix(color, fg, alpha * 0.06);

  fragColor = vec4(color, 1.0);
}`;

// 13.3 — NEURAL NETWORK — AI agent graph, nodes connecting infinite
export const NEURAL_NETWORK = HEADER + `
// Render N nodes + connecting lines
float nodeAt(vec2 uv, vec2 pos, float r) {
  return smoothstep(r, r * 0.6, length(uv - pos));
}
float lineAt(vec2 uv, vec2 a, vec2 b, float w) {
  vec2 pa = uv - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return smoothstep(w, w * 0.5, length(pa - ba * h));
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 p = (uv - 0.5) * aspect;

  // 6 oscillating nodes
  vec2 nodes[6];
  nodes[0] = vec2(sin(uTime * 0.3) * 0.3, cos(uTime * 0.4) * 0.25);
  nodes[1] = vec2(cos(uTime * 0.35 + 1.0) * 0.35, sin(uTime * 0.5 + 0.5) * 0.3);
  nodes[2] = vec2(sin(uTime * 0.25 + 2.0) * 0.4, cos(uTime * 0.6 + 1.0) * 0.28);
  nodes[3] = vec2(cos(uTime * 0.45 + 3.0) * 0.32, sin(uTime * 0.3 + 1.5) * 0.35);
  nodes[4] = vec2(sin(uTime * 0.5 + 4.0) * 0.28, cos(uTime * 0.35 + 2.0) * 0.3);
  nodes[5] = vec2(cos(uTime * 0.4 + 5.0) * 0.36, sin(uTime * 0.45 + 2.5) * 0.32);

  // Mouse-attracted node
  vec2 mNode = (uMouse - 0.5) * aspect;

  vec3 bg = paletteBg();
  vec3 fg = paletteFg();
  vec3 mid = paletteMid();

  // Background gradient
  float vgrad = (uv.y * 0.3 + 0.5);
  vec3 color = mix(bg, mid, vgrad * 0.15);

  // Lines between adjacent nodes
  float lines = 0.0;
  for (int i = 0; i < 6; i++) {
    for (int j = 0; j < 6; j++) {
      if (j > i) {
        lines += lineAt(p, nodes[i], nodes[j], 0.0008);
      }
    }
    // node-mouse line
    lines += lineAt(p, nodes[i], mNode, 0.0006);
  }
  color = mix(color, fg, clamp(lines * 0.3, 0.0, 0.6));

  // Nodes (dots)
  float dots = 0.0;
  for (int i = 0; i < 6; i++) {
    dots += nodeAt(p, nodes[i], 0.012);
  }
  // Mouse node bigger
  dots += nodeAt(p, mNode, 0.018) * 1.2;
  color = mix(color, fg, dots);

  fragColor = vec4(color, 1.0);
}`;

// 13.4 — DATA STREAM — particles flowing constant (CRM data feel)
export const DATA_STREAM = HEADER + `
void main() {
  vec2 uv = vUv;

  // 60 vertical streams
  float col = floor(uv.x * 60.0);
  float colSeed = hash(vec2(col, 7.0));
  float speed = 0.4 + colSeed * 0.6;

  // mouse pause column
  float mCol = uMouse.x * 60.0;
  float pauseInfl = 1.0 - smoothstep(0.0, 1.5, abs(col - mCol));
  speed *= mix(1.0, 0.05, pauseInfl);

  float yOff = mod(uv.y + uTime * speed * 0.25, 1.0);

  // 40 cells per column
  float row = floor(yOff * 40.0);
  float cellSeed = hash(vec2(col, row));

  // brightness with trail decay
  float trail = smoothstep(0.0, 0.5, fract(yOff * 40.0));
  float bright = step(0.55, cellSeed) * trail;

  // top of stream brighter (head)
  float headPos = fract(yOff * 40.0);
  bright += step(0.92, cellSeed) * smoothstep(0.85, 1.0, headPos) * 1.5;

  bright += pauseInfl * 0.15;

  vec3 bg = paletteBg();
  vec3 fg = paletteFg();
  vec3 mid = paletteMid();

  // base gradient (left dark to right light gives subtle directional feel)
  vec3 color = mix(bg, mid, uv.x * 0.1);

  color = mix(color, fg, bright * 0.55);

  // edge fade horizontal
  float edge = smoothstep(0.0, 0.05, uv.x) * smoothstep(1.0, 0.95, uv.x);
  color = mix(bg, color, edge);

  fragColor = vec4(color, 1.0);
}`;

// 13.5 — MARKER SWEEP — typography highlight motion (copy theme)
export const MARKER_SWEEP = HEADER + `
void main() {
  vec2 uv = vUv;

  // 12 horizontal "lines" of text being highlighted
  float row = floor(uv.y * 12.0);
  float rowSeed = hash(vec2(row, 13.0));
  float startTime = rowSeed * 5.0;
  float t = mod(uTime - startTime, 8.0);

  // sweep fills 0→1 over 1.5s, holds 1s, empties 1→0 over 1.5s, rest 4s
  float fill = 0.0;
  if (t < 1.5)        fill = t / 1.5;
  else if (t < 2.5)   fill = 1.0;
  else if (t < 4.0)   fill = 1.0 - (t - 2.5) / 1.5;

  // mouse highlight any line near cursor
  float mRow = floor(uMouse.y * 12.0);
  float mInfl = 1.0 - smoothstep(0.0, 1.5, abs(row - mRow));
  fill = max(fill, mInfl * 0.5);

  // is x within fill?
  float onSweep = step(uv.x, fill);

  // text-line look — narrow band middle of row
  float rowFract = fract(uv.y * 12.0);
  float textBand = smoothstep(0.35, 0.4, rowFract) * smoothstep(0.65, 0.6, rowFract);

  // background "letters" via noise
  float letterMask = step(0.5, hash(floor(vec2(uv.x * 80.0, row))));
  textBand *= letterMask * 0.8;

  vec3 bg = paletteBg();
  vec3 fg = paletteFg();
  vec3 mid = paletteMid();

  vec3 color = bg;
  // text base
  color = mix(color, mid, textBand * 0.5);
  // highlight overlay (yellow→white in B&W = just bright)
  color = mix(color, fg, onSweep * textBand * 0.7);
  // sweep line edge bright
  float edgeWidth = 0.005;
  float edgeOn = smoothstep(fill - edgeWidth, fill, uv.x) * smoothstep(fill + edgeWidth, fill, uv.x);
  color = mix(color, fg, edgeOn * 0.4);

  fragColor = vec4(color, 1.0);
}`;

// 13.6 — HUD RADAR SCAN — precision targeting, radar sweep 360°
export const HUD_RADAR_SCAN = HEADER + `
void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 p = (uv - 0.5) * aspect;
  float dist = length(p);
  float ang = atan(p.y, p.x);

  vec3 bg = paletteBg();
  vec3 fg = paletteFg();
  vec3 mid = paletteMid();

  // Radial gradient base
  vec3 color = mix(bg, mid, smoothstep(0.7, 0.0, dist) * 0.18);

  // 4 concentric rings
  float rings = 0.0;
  for (int i = 1; i <= 4; i++) {
    float r = float(i) * 0.12;
    rings += (1.0 - smoothstep(0.001, 0.003, abs(dist - r))) * 0.45;
  }
  color = mix(color, fg, rings);

  // 4 axis lines
  float axisX = 1.0 - smoothstep(0.0, 0.0008, abs(p.y));
  float axisY = 1.0 - smoothstep(0.0, 0.0008, abs(p.x));
  color = mix(color, fg, max(axisX, axisY) * 0.25);

  // Sweeping radar line — rotates 360 every 4s
  float sweepAng = mod(uTime * 1.57, 6.28318) - 3.14159;
  float angDiff = mod(ang - sweepAng + 6.28318, 6.28318);
  float sweepFalloff = exp(-angDiff * 1.8) * step(dist, 0.5);
  color = mix(color, fg, sweepFalloff * 0.7);

  // Pings (random dots that fade)
  for (int i = 0; i < 5; i++) {
    float pingTime = mod(uTime + float(i) * 1.7, 5.0);
    float pingFade = 1.0 - pingTime / 3.0;
    if (pingFade > 0.0) {
      vec2 pingPos = vec2(
        sin(float(i) * 13.7 + 1.0) * 0.32,
        cos(float(i) * 17.3 + 2.0) * 0.32
      );
      float pingDist = length(p - pingPos);
      float ping = (1.0 - smoothstep(0.005, 0.012, pingDist)) * pingFade;
      color = mix(color, fg, ping * 0.8);
    }
  }

  // Mouse crosshair (small)
  vec2 m = (uMouse - 0.5) * aspect;
  float mLineX = (1.0 - smoothstep(0.0, 0.0006, abs(p.y - m.y))) * step(abs(p.x - m.x), 0.04);
  float mLineY = (1.0 - smoothstep(0.0, 0.0006, abs(p.x - m.x))) * step(abs(p.y - m.y), 0.04);
  color = mix(color, fg, max(mLineX, mLineY) * 0.5);
  // central dot
  color = mix(color, fg, (1.0 - smoothstep(0.004, 0.006, length(p - m))) * 0.7);

  // Click pulse
  float t = uTime - uClickTime;
  vec2 cp = (uClickPos - 0.5) * aspect;
  float cdist = length(p - cp);
  float pulse = (1.0 - smoothstep(0.005, 0.01, abs(cdist - t * 0.3))) * exp(-t * 0.8);
  color = mix(color, fg, pulse);

  fragColor = vec4(color, 1.0);
}`;

export const SHADERS = {
  "vanta-storm":      { id: "13.1", name: "Vanta Storm",     source: VANTA_STORM,     theme: "Atmospheric noir" },
  "bone-glow":        { id: "13.2", name: "Bone Glow",       source: BONE_GLOW,       theme: "Light gradient breathing" },
  "neural-network":   { id: "13.3", name: "Neural Network",  source: NEURAL_NETWORK,  theme: "AI agent graph" },
  "data-stream":      { id: "13.4", name: "Data Stream",     source: DATA_STREAM,     theme: "CRM data flow" },
  "marker-sweep":     { id: "13.5", name: "Marker Sweep",    source: MARKER_SWEEP,    theme: "Copy highlight" },
  "hud-radar-scan":   { id: "13.6", name: "HUD Radar Scan",  source: HUD_RADAR_SCAN,  theme: "Precision targeting" },
} as const;

export type ShaderKey = keyof typeof SHADERS;
