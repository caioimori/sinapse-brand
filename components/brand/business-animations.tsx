"use client";

/**
 * Business Animations — relacionadas ao SINAPSE business.
 * Tudo SVG/CSS · auto-loop infinite · sem JS state · sem libs.
 *
 * Components:
 *  - <NeuralNet />        AI agents conectando
 *  - <CRMFunnel />        funil cascade
 *  - <PaidMetrics />      métricas subindo
 *  - <ToolStackOrbit />   ferramentas orbitando símbolo
 *  - <CopyTyping />       texto se digitando
 *  - <GrowthChart />      chart climbing infinito
 *  - <MarketingPulse />   campanhas pulsando
 */

export function NeuralNet() {
  // 6 nodes + lines com SMIL animations
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden>
      <defs>
        <radialGradient id="nn-glow">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* connections */}
      {[
        ["60,80", "160,40"], ["60,80", "160,160"], ["60,80", "260,100"],
        ["160,40", "260,100"], ["160,160", "260,100"], ["160,40", "160,160"],
      ].map(([a, b], i) => (
        <line key={i} x1={a.split(",")[0]} y1={a.split(",")[1]} x2={b.split(",")[0]} y2={b.split(",")[1]} stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="2 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.4s" repeatCount="indefinite" />
        </line>
      ))}
      {/* nodes */}
      {[[60, 80], [160, 40], [160, 160], [260, 100]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="20" fill="url(#nn-glow)">
            <animate attributeName="r" values="20;28;20" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={x} cy={y} r="5" fill="currentColor" />
          <circle cx={x} cy={y} r="9" fill="none" stroke="currentColor" strokeOpacity="0.5">
            <animate attributeName="r" values="5;14;5" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
            <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
          </circle>
        </g>
      ))}
    </svg>
  );
}

export function CRMFunnel() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden>
      {/* funnel shape stages */}
      {[
        { y: 20, w: 280, label: "LEADS", count: "1.2k" },
        { y: 70, w: 220, label: "QUALIFIED", count: "420" },
        { y: 120, w: 140, label: "MEETINGS", count: "85" },
        { y: 170, w: 70, label: "CLIENTS", count: "12" },
      ].map((s, i) => (
        <g key={i}>
          <rect x={(320 - s.w) / 2} y={s.y - 14} width={s.w} height="28" fill="currentColor" fillOpacity={0.06 + i * 0.08} stroke="currentColor" strokeOpacity="0.3" />
          <text x="160" y={s.y + 5} textAnchor="middle" fontFamily="monospace" fontSize="10" fill="currentColor" opacity="0.8" letterSpacing="2">
            {s.label}
          </text>
          <text x={160 + s.w / 2 - 30} y={s.y + 5} textAnchor="end" fontFamily="monospace" fontSize="10" fill="currentColor" opacity="0.5">
            {s.count}
          </text>
          {/* falling drops */}
          <circle cx={160 + (i % 2 === 0 ? -20 : 20)} cy={s.y - 14} r="1.5" fill="currentColor">
            <animate attributeName="cy" from={s.y - 14} to={s.y + 14 + 36} dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;1;0" dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}

export function PaidMetrics() {
  // 3 bars rising/falling em loop
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden>
      {/* axis */}
      <line x1="40" y1="180" x2="300" y2="180" stroke="currentColor" strokeOpacity="0.3" />
      <line x1="40" y1="20" x2="40" y2="180" stroke="currentColor" strokeOpacity="0.3" />
      {/* bars */}
      {[
        { x: 70, label: "CTR", h0: 60, h1: 110 },
        { x: 130, label: "CPC", h0: 90, h1: 50 },
        { x: 190, label: "ROAS", h0: 40, h1: 140 },
        { x: 250, label: "LTV", h0: 70, h1: 120 },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x - 18} width="36" y={180 - b.h0} height={b.h0} fill="currentColor" fillOpacity="0.7">
            <animate attributeName="height" values={`${b.h0};${b.h1};${b.h0}`} dur="3s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
            <animate attributeName="y" values={`${180 - b.h0};${180 - b.h1};${180 - b.h0}`} dur="3s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
          </rect>
          <text x={b.x} y="195" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.6" letterSpacing="2">{b.label}</text>
        </g>
      ))}
    </svg>
  );
}

export function ToolStackOrbit() {
  // SINAPSE no centro, ferramentas orbitando
  const tools = ["CLAUDE", "GPT", "CODEX", "KIMI", "QWEN", "OPCLAW"];
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden>
      <g transform="translate(160 100)">
        {/* orbit rings */}
        <circle cx="0" cy="0" r="40" fill="none" stroke="currentColor" strokeOpacity="0.18" />
        <circle cx="0" cy="0" r="65" fill="none" stroke="currentColor" strokeOpacity="0.12" />
        <circle cx="0" cy="0" r="90" fill="none" stroke="currentColor" strokeOpacity="0.08" />

        {/* center label */}
        <circle cx="0" cy="0" r="20" fill="currentColor" />
        <text x="0" y="3" textAnchor="middle" fontFamily="sans-serif" fontWeight="600" fontSize="10" fill="var(--background)">SINAPSE</text>

        {/* orbiting tools */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="30s" repeatCount="indefinite" />
          {tools.map((t, i) => {
            const ang = (i / tools.length) * Math.PI * 2;
            const r = i % 2 === 0 ? 65 : 90;
            const x = Math.cos(ang) * r;
            const y = Math.sin(ang) * r;
            return (
              <g key={t}>
                <circle cx={x} cy={y} r="14" fill="var(--background)" stroke="currentColor" strokeOpacity="0.5" />
                <text x={x} y={y + 3} textAnchor="middle" fontFamily="monospace" fontSize="8" fill="currentColor" letterSpacing="1.5">{t}</text>
                {/* counter-rotate text to keep horizontal */}
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  );
}

export function CopyTyping() {
  // Typing effect via CSS only — letter-spacing via clip-path width
  return (
    <div className="w-full h-full flex flex-col items-start justify-center font-mono text-base md:text-lg overflow-hidden gap-2 px-2">
      <div className="opacity-40 text-xs">// COPY · headline</div>
      <div className="overflow-hidden whitespace-nowrap auto-text-shimmer">Escale sem aumentar a folha.</div>
      <div className="opacity-40 text-xs mt-2">// hero · sub</div>
      <div className="overflow-hidden whitespace-nowrap"><span className="auto-cursor">SINAPSE substitui processos</span></div>
    </div>
  );
}

export function GrowthChart() {
  // Line chart climbing em loop
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden>
      {/* grid bg */}
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="20" y1={y} x2="300" y2={y} stroke="currentColor" strokeOpacity="0.08" />
      ))}
      {[60, 120, 180, 240].map((x) => (
        <line key={x} x1={x} y1="20" x2={x} y2="180" stroke="currentColor" strokeOpacity="0.08" />
      ))}
      {/* growth path - climbing curve */}
      <path
        d="M 20 170 L 60 150 L 100 130 L 140 100 L 180 80 L 220 50 L 260 35 L 300 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="600"
        strokeDashoffset="600"
      >
        <animate attributeName="stroke-dashoffset" from="600" to="0" dur="3s" repeatCount="indefinite" />
      </path>
      {/* dots */}
      {[
        [60, 150], [100, 130], [140, 100], [180, 80], [220, 50], [260, 35], [300, 20],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="currentColor" opacity="0">
          <animate attributeName="opacity" values="0;1;1" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* axis labels */}
      <text x="20" y="195" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.5">Q1</text>
      <text x="300" y="195" textAnchor="end" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.5">Q4</text>
    </svg>
  );
}

export function MarketingPulse() {
  // Campanhas como blobs pulsando radial
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden>
      {[
        { cx: 80, cy: 100, label: "LP" },
        { cx: 160, cy: 60, label: "ADS" },
        { cx: 160, cy: 140, label: "EMAIL" },
        { cx: 240, cy: 100, label: "SOCIAL" },
      ].map((c, i) => (
        <g key={i}>
          <circle cx={c.cx} cy={c.cy} r="25" fill="none" stroke="currentColor" strokeOpacity="0.4">
            <animate attributeName="r" values="25;55;25" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.6}s`} />
            <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.6}s`} />
          </circle>
          <circle cx={c.cx} cy={c.cy} r="14" fill="currentColor" fillOpacity="0.85" />
          <text x={c.cx} y={c.cy + 3} textAnchor="middle" fontFamily="monospace" fontSize="8" fill="var(--background)" letterSpacing="1.5">{c.label}</text>
        </g>
      ))}
    </svg>
  );
}

export function AgentSquad() {
  // 4 agents standing in a row, each with a "task" indicator above
  const agents = ["AGT1", "AGT2", "AGT3", "AGT4"];
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden>
      {agents.map((a, i) => {
        const x = 50 + i * 70;
        return (
          <g key={a}>
            {/* task bar above */}
            <rect x={x - 22} y="30" width="44" height="3" fill="currentColor" fillOpacity="0.25" rx="1.5" />
            <rect x={x - 22} y="30" width="44" height="3" fill="currentColor" rx="1.5">
              <animate attributeName="width" values="0;44;0" dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
            </rect>
            {/* agent body */}
            <rect x={x - 18} y="60" width="36" height="80" fill="none" stroke="currentColor" strokeOpacity="0.5" rx="4" />
            <circle cx={x} cy="80" r="10" fill="currentColor" fillOpacity="0.85" />
            <text x={x} y="83" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="var(--background)">AI</text>
            <line x1={x - 14} y1="105" x2={x + 14} y2="105" stroke="currentColor" strokeOpacity="0.3" />
            <line x1={x - 14} y1="115" x2={x + 14} y2="115" stroke="currentColor" strokeOpacity="0.3" />
            <line x1={x - 14} y1="125" x2={x + 14} y2="125" stroke="currentColor" strokeOpacity="0.3" />
            {/* status dot */}
            <circle cx={x + 12} cy="135" r="2" fill="currentColor">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
            </circle>
            {/* label */}
            <text x={x} y="160" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.6" letterSpacing="2">{a}</text>
          </g>
        );
      })}
    </svg>
  );
}
