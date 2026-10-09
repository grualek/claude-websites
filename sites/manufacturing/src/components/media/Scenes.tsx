import type { ReactElement, ReactNode } from 'react'
import type { SceneName } from '../../content/types'

/**
 * Art-directed industrial scenes that stand in for photography in the pitch prototype. Every scene
 * is a plain inline SVG (no network, no layout shift) drawn on a 1200×900 canvas that crops
 * gracefully via `preserveAspectRatio="xMidYMid slice"`. Supply `src` on a MediaAsset to replace.
 */

const p = {
  void: '#0f1113',
  charcoal: '#16181b',
  graphite: '#23272c',
  graphite2: '#2e3338',
  iron: '#40474e',
  steel: '#56738b',
  steelDark: '#3d566b',
  alu: '#c4cbd0',
  bone: '#eeece7',
  signal: '#e4581c',
  amber: '#f2a15b',
  mono: "'JetBrains Mono Variable', ui-monospace, monospace",
}

type SceneFn = (id: string) => ReactElement

/** `contain` keeps the whole subject in frame; scenes that support it paint an oversized backdrop. */
export type SceneFit = 'cover' | 'contain'

/** Deterministic pseudo-random sequence so scenes render identically on every load. */
function rng(seed: number) {
  let t = seed
  return () => {
    t |= 0
    t = (t + 0x6d2b79f5) | 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function Svg({ children, fit = 'cover' }: { children: ReactNode; fit?: SceneFit }) {
  return (
    <svg
      viewBox={fit === 'contain' ? '120 160 960 720' : '0 0 1200 900'}
      preserveAspectRatio={fit === 'contain' ? 'xMidYMid meet' : 'xMidYMid slice'}
      className="block h-full w-full"
      style={fit === 'contain' ? { overflow: 'visible' } : undefined}
    >
      {children}
    </svg>
  )
}

/** Brushed-metal gradient stops (horizontal), from dark to bright. */
function Chrome({ id, from = '#5a636b', mid = '#e8edf0', to = '#646d75' }: { id: string; from?: string; mid?: string; to?: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor={from} />
      <stop offset="0.28" stopColor={mid} />
      <stop offset="0.45" stopColor="#9aa4ab" />
      <stop offset="0.62" stopColor={mid} stopOpacity="0.9" />
      <stop offset="1" stopColor={to} />
    </linearGradient>
  )
}

function Vignette({ id, strength = 0.55 }: { id: string; strength?: number }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-vig`} cx="0.5" cy="0.48" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity={strength} />
        </radialGradient>
      </defs>
      <rect width="1200" height="900" fill={`url(#${id}-vig)`} />
    </>
  )
}

/* ---------------------------------------------------------------- CNC machining center (hero) */
const cnc: SceneFn = (id) => {
  const u = (n: string) => `url(#${id}-${n})`
  const r = rng(7)
  const chips = Array.from({ length: 46 }, () => {
    const a = r() * Math.PI * 2
    const d = 40 + r() ** 0.7 * 300
    const x = 600 + Math.cos(a) * d * 1.3
    const y = 486 + Math.sin(a) * d * 0.55 - (r() > 0.5 ? r() * 60 : 0)
    return { x, y, s: 4 + r() * 9, rot: r() * 360, warm: r() > 0.82 }
  })
  const pile = Array.from({ length: 70 }, () => ({ x: 330 + r() * 540, y: 618 + r() * 34, s: 3 + r() * 6, rot: r() * 360, warm: r() > 0.9 }))
  return (
    <Svg>
      <defs>
        <radialGradient id={`${id}-bg`} cx="0.5" cy="0.4" r="0.8">
          <stop offset="0" stopColor="#4a525a" />
          <stop offset="0.5" stopColor="#262a2f" />
          <stop offset="1" stopColor="#0f1113" />
        </radialGradient>
        <linearGradient id={`${id}-head`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1c1f23" />
          <stop offset="0.3" stopColor="#4d555d" />
          <stop offset="0.55" stopColor="#353b41" />
          <stop offset="1" stopColor="#181a1d" />
        </linearGradient>
        <Chrome id={`${id}-chrome`} />
        <Chrome id={`${id}-chromeDark`} from="#3a4147" mid="#aab3ba" to="#3f464c" />
        <linearGradient id={`${id}-aluTop`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f1f4f5" />
          <stop offset="1" stopColor="#b3bcc2" />
        </linearGradient>
        <linearGradient id={`${id}-aluFront`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7d878f" />
          <stop offset="0.4" stopColor="#c9d0d5" />
          <stop offset="1" stopColor="#8a949b" />
        </linearGradient>
        <linearGradient id={`${id}-pocket`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5f686f" />
          <stop offset="1" stopColor="#a7b0b6" />
        </linearGradient>
        <linearGradient id={`${id}-table`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6c757c" />
          <stop offset="1" stopColor="#3a4046" />
        </linearGradient>
        <linearGradient id={`${id}-tableSide`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1e2125" />
          <stop offset="0.35" stopColor="#4a5259" />
          <stop offset="1" stopColor="#1a1c1f" />
        </linearGradient>
        <linearGradient id={`${id}-cone`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6f2e8" stopOpacity="0.22" />
          <stop offset="1" stopColor="#f6f2e8" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-cut`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff6e8" stopOpacity="0.95" />
          <stop offset="0.25" stopColor="#ffd9a8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ff9a4d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-mist`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#dfe8ee" stopOpacity="0.16" />
          <stop offset="1" stopColor="#dfe8ee" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-platter`}>
          <ellipse cx="600" cy="612" rx="318" ry="58" />
        </clipPath>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.48" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0.02" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1200" height="900" fill={u('bg')} />

      {/* enclosure back wall */}
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={110 + i * 140} y="0" width="138" height="540" fill="#2b3035" opacity={0.35 + (i % 2) * 0.15} />
      ))}
      <rect x="110" y="300" width="980" height="2" fill="#15171a" opacity="0.6" />
      <rect x="110" y="538" width="980" height="6" fill="#121417" />

      {/* work light */}
      <path d="M160 0h300l340 650H90Z" fill={u('cone')} />
      <rect x="160" y="-4" width="300" height="22" fill="#e9ecee" />
      <rect x="160" y="18" width="300" height="4" fill="#9aa2a8" />

      {/* rear way covers */}
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={250 - i * 6} y={548 + i * 8} width={700 + i * 12} height="8" fill={i % 2 ? '#30363c' : '#3b4248'} />
      ))}

      {/* trunnion supports */}
      <path d="M200 560h96v250h-96Z" fill={u('tableSide')} />
      <path d="M904 560h96v250h-96Z" fill={u('tableSide')} />
      <rect x="200" y="560" width="96" height="6" fill="#6d767d" />
      <rect x="904" y="560" width="96" height="6" fill="#6d767d" />

      {/* rotary platter */}
      <path d="M282 612v52a318 58 0 0 0 636 0v-52Z" fill={u('tableSide')} />
      <ellipse cx="600" cy="612" rx="318" ry="58" fill={u('table')} />
      <g clipPath={u('platter')} stroke="#2a2f34" strokeWidth="7">
        <path d="M250 586h700M250 612h700M250 638h700" />
      </g>
      <ellipse cx="600" cy="612" rx="318" ry="58" fill="none" stroke="#8a939a" strokeWidth="1.5" opacity="0.6" />

      {/* chip pile on platter */}
      {pile.map((c, i) => (
        <path
          key={i}
          d={`M${c.x} ${c.y}q${c.s / 2} ${-c.s} ${c.s} 0`}
          stroke={c.warm ? p.amber : '#c9d0d5'}
          strokeWidth="1.6"
          fill="none"
          opacity="0.75"
          transform={`rotate(${c.rot} ${c.x} ${c.y})`}
        />
      ))}

      {/* vise */}
      <path d="M410 560h380v42H410Z" fill="#2c3136" />
      <rect x="410" y="560" width="380" height="4" fill="#7b848b" />
      <path d="M424 478h58v84h-58Z" fill={u('chromeDark')} />
      <path d="M718 478h58v84h-58Z" fill={u('chromeDark')} />

      {/* workpiece */}
      <path d="M482 522h236v40H482Z" fill={u('aluFront')} />
      <path d="M482 522h236l-28-68H510Z" fill={u('aluTop')} />
      <g stroke="#8d969c" strokeWidth="0.8" opacity="0.5">
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M${512 - i * 3} ${458 + i * 7.5}h${176 + i * 6}`} />
        ))}
      </g>
      <path d="M548 508h104l-14-40h-76Z" fill={u('pocket')} />
      <path d="M548 508h104l-4-6h-96Z" fill="#e7ebed" opacity="0.6" />
      <circle cx="526" cy="512" r="5" fill="#59626a" />
      <circle cx="674" cy="512" r="5" fill="#59626a" />

      {/* spindle head */}
      <path d="M462 -20h276v236H462Z" fill={u('head')} />
      <rect x="462" y="208" width="276" height="8" fill="#0f1113" opacity="0.6" />
      <rect x="486" y="40" width="44" height="120" fill="#1a1d20" opacity="0.6" />
      <rect x="694" y="44" width="22" height="8" fill={p.signal} />
      <rect x="694" y="44" width="22" height="8" fill={p.signal} opacity="0.5" filter="blur(4px)" />
      <path d="M528 216h144v40a10 10 0 0 1-10 10H538a10 10 0 0 1-10-10Z" fill={u('chrome')} />
      <path d="M528 236h144" stroke="#596168" strokeWidth="1.2" />
      <path d="M548 266h104v16H548Z" fill={u('chromeDark')} />
      <path d="M556 282h88l-20 64h-48Z" fill={u('chrome')} />
      <path d="M578 346h44v26h-44Z" fill={u('chromeDark')} />
      <path d="M590 372h20v44h-20Z" fill={u('chrome')} />
      <path d="M590 416h20v72h-20Z" fill="#9fa8ae" />
      <g stroke="#3f464c" strokeWidth="2.2">
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d={`M590 ${424 + i * 10}l20 -9`} />
        ))}
      </g>

      {/* coolant hoses (segmented) and streams */}
      {[
        'M470 190c-40 70-40 150 40 220c18 16 34 34 46 52',
        'M730 190c40 70 40 150-40 220c-18 16-34 34-46 52',
      ].map((d, i) => (
        <g key={i}>
          <path d={d} stroke={p.steel} strokeWidth="15" fill="none" />
          <path d={d} stroke={p.steelDark} strokeWidth="15" fill="none" strokeDasharray="3 8" />
        </g>
      ))}
      <path d="M556 462c14 8 24 14 36 20M644 462c-14 8-24 14-36 20" stroke="#e3edf3" strokeWidth="3" opacity="0.55" fill="none" />
      <path d="M552 466c18 10 28 16 40 22M648 466c-18 10-28 16-40 22" stroke="#e3edf3" strokeWidth="1.4" opacity="0.4" fill="none" />

      {/* cutting zone */}
      <ellipse cx="600" cy="488" rx="150" ry="110" fill={u('mist')} />
      <ellipse cx="600" cy="488" rx="44" ry="26" fill={u('cut')} />

      {/* flying chips */}
      {chips.map((c, i) => (
        <path
          key={i}
          d={`M${c.x} ${c.y}q${c.s / 2} ${-c.s} ${c.s} 0`}
          stroke={c.warm ? p.amber : '#dfe4e7'}
          strokeWidth="1.8"
          fill="none"
          opacity="0.85"
          transform={`rotate(${c.rot} ${c.x} ${c.y})`}
        />
      ))}

      {/* enclosure window frame + glass reflection */}
      <rect width="1200" height="900" fill={u('glass')} />
      <path d="M0 0h70v900H0ZM1130 0h70v900h-70Z" fill="#0b0c0e" />
      <path d="M70 0v900M1130 0v900" stroke="#33393f" strokeWidth="3" />
      <Vignette id={id} strength={0.6} />
    </Svg>
  )
}

/* ---------------------------------------------------------------- precision component + callouts */
const component = (id: string, fit?: SceneFit) => {
  const u = (n: string) => `url(#${id}-${n})`
  const holes = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8
    return { x: 600 + Math.cos(a) * 262, y: 540 + Math.sin(a) * 92, front: Math.sin(a) > -0.2 }
  })
  const dim = '#9aa1a8'
  return (
    <Svg fit={fit}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b3036" />
          <stop offset="1" stopColor="#131518" />
        </linearGradient>
        <pattern id={`${id}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0v40" fill="none" stroke="#fff" strokeOpacity="0.04" />
        </pattern>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4e575e" />
          <stop offset="0.18" stopColor="#d7dde1" />
          <stop offset="0.32" stopColor="#8c969d" />
          <stop offset="0.55" stopColor="#eef2f4" />
          <stop offset="0.75" stopColor="#7e8890" />
          <stop offset="1" stopColor="#3f474e" />
        </linearGradient>
        <radialGradient id={`${id}-top`} cx="0.42" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#f5f7f8" />
          <stop offset="0.6" stopColor="#b9c1c7" />
          <stop offset="1" stopColor="#7d878e" />
        </radialGradient>
        <linearGradient id={`${id}-bore`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d0f11" />
          <stop offset="1" stopColor="#4b545b" />
        </linearGradient>
        <radialGradient id={`${id}-shadow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.65" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-key`} cx="0.35" cy="0.2" r="0.7">
          <stop offset="0" stopColor="#8fa3b4" stopOpacity="0.25" />
          <stop offset="1" stopColor="#8fa3b4" stopOpacity="0" />
        </radialGradient>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="10" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
          <path d="M0 1.5 10 5 0 8.5Z" fill={dim} />
        </marker>
      </defs>
      <rect x="-1200" y="-900" width="3600" height="1800" fill="#2b3036" />
      <rect x="-1200" y="899" width="3600" height="1000" fill="#131518" />
      <rect x="-1200" width="3600" height="900" fill={u('bg')} />
      <rect x="-1200" y="-900" width="3600" height="2700" fill={u('grid')} />
      {fit !== 'contain' && <rect width="1200" height="900" fill={u('key')} />}
      <ellipse cx="600" cy="640" rx="400" ry="70" fill={u('shadow')} />

      {/* flange base */}
      <path d="M268 540v58a332 116 0 0 0 664 0v-58Z" fill={u('side')} />
      <ellipse cx="600" cy="540" rx="332" ry="116" fill={u('top')} />
      {[300, 280, 230, 200].map((rx, i) => (
        <ellipse key={i} cx="600" cy="540" rx={rx} ry={rx * 0.35} fill="none" stroke="#fff" strokeOpacity={0.12 + (i % 2) * 0.08} strokeWidth="1" />
      ))}
      <ellipse cx="600" cy="540" rx="332" ry="116" fill="none" stroke="#f4f6f7" strokeOpacity="0.7" strokeWidth="2" />
      {holes.map((h, i) => (
        <g key={i}>
          <ellipse cx={h.x} cy={h.y} rx="21" ry="8.5" fill="#1a1d20" />
          <ellipse cx={h.x} cy={h.y + 1.5} rx="21" ry="8.5" fill="none" stroke="#e8ecef" strokeOpacity="0.6" strokeWidth="1.2" />
        </g>
      ))}

      {/* hub */}
      <path d="M448 540V386a152 53 0 0 0 304 0v154a152 53 0 0 1-304 0Z" fill={u('side')} />
      <ellipse cx="600" cy="386" rx="152" ry="53" fill={u('top')} />
      <ellipse cx="600" cy="386" rx="152" ry="53" fill="none" stroke="#f6f8f9" strokeWidth="2" strokeOpacity="0.8" />
      <ellipse cx="600" cy="386" rx="128" ry="44" fill="none" stroke="#fff" strokeOpacity="0.18" />
      <ellipse cx="600" cy="386" rx="80" ry="28" fill={u('bore')} />
      <ellipse cx="600" cy="386" rx="80" ry="28" fill="none" stroke="#e9edef" strokeOpacity="0.8" strokeWidth="1.5" />
      <path d="M448 540a152 53 0 0 0 304 0" fill="none" stroke="#2a2f34" strokeWidth="2" opacity="0.5" />

      {/* center mark */}
      <g stroke={p.signal} strokeWidth="1.5">
        <path d="M600 356v60M560 386h80" strokeDasharray="10 4 2 4" />
      </g>

      {/* dimensions */}
      <g stroke={dim} strokeWidth="1.2" fill="none">
        <path d="M268 610v138M932 610v138" strokeDasharray="4 4" />
        <path d="M272 730h656" markerStart={u('arrow')} markerEnd={u('arrow')} />
        <path d="M760 386h270M940 598h90" strokeDasharray="4 4" />
        <path d="M1010 390v204" markerStart={u('arrow')} markerEnd={u('arrow')} />
        <path d="M668 372 820 228h170" />
      </g>
      <g fontFamily={p.mono} fontSize="17" fill="#c9ced3" letterSpacing="2">
        <rect x="546" y="716" width="108" height="28" fill="#17191c" />
        <text x="600" y="736" textAnchor="middle">Ø A</text>
        <rect x="994" y="476" width="34" height="30" fill="#17191c" />
        <text x="1011" y="497" textAnchor="middle">B</text>
        <text x="830" y="218">BORE Ø C</text>
        <rect x="992" y="198" width="30" height="30" fill="none" stroke={p.signal} strokeWidth="1.5" />
        <text x="1007" y="219" textAnchor="middle" fill={p.signal}>A</text>
      </g>
      <g fontFamily={p.mono} fontSize="13" fill="#8d949b" letterSpacing="2">
        <text x="150" y="120">PART · FV-0142</text>
        <text x="150" y="144">REV · C</text>
        <text x="150" y="168">VIEW · ISO 1</text>
        <path d="M150 186h170" stroke="#4a5158" />
      </g>
      {fit !== 'contain' && <Vignette id={id} strength={0.45} />}
    </Svg>
  )
}

/* ---------------------------------------------------------------- production hall (perspective) */
const hall: SceneFn = (id) => {
  const u = (n: string) => `url(#${id}-${n})`
  const VX = 600
  const VY = 380
  const P = (x: number, y: number, z: number) => [VX + x / z, VY + y / z] as const
  const pt = (x: number, y: number, z: number) => P(x, y, z).join(' ')
  const FLOOR = 520
  const CEIL = -470
  const depths = [1, 1.35, 1.85, 2.6, 3.7, 5.4, 8, 12]
  const quad = (a: string, b: string, c: string, d: string) => `M${a}L${b}L${c}L${d}Z`
  // machines: [xNear, xFar(side), z1, z2, height]
  const machines: [number, number, number, number, number][] = [
    [-640, -260, 1.6, 2.2, 300],
    [-640, -260, 2.6, 3.4, 300],
    [-640, -260, 4.0, 5.0, 300],
    [-640, -260, 6.0, 7.4, 300],
    [260, 640, 1.6, 2.2, 300],
    [260, 640, 2.6, 3.4, 300],
    [260, 640, 4.0, 5.0, 300],
    [260, 640, 6.0, 7.4, 300],
  ]
  return (
    <Svg>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9cdcf" />
          <stop offset="1" stopColor="#a9aeb1" />
        </linearGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a4a7a6" />
          <stop offset="1" stopColor="#d7d6d1" />
        </linearGradient>
        <linearGradient id={`${id}-ceil`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#8d9396" />
          <stop offset="1" stopColor="#5d6367" />
        </linearGradient>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e4ebef" />
        </linearGradient>
        <linearGradient id={`${id}-haze`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6f7f6" stopOpacity="0" />
          <stop offset="0.5" stopColor="#f6f7f6" stopOpacity="0.45" />
          <stop offset="1" stopColor="#f6f7f6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ceiling, walls, floor */}
      <rect width="1200" height="900" fill={u('ceil')} />
      <path d={quad(pt(-700, CEIL, 1), pt(-700, FLOOR, 1), pt(-700, FLOOR, 14), pt(-700, CEIL, 14))} fill={u('wall')} />
      <path d={quad(pt(700, CEIL, 1), pt(700, FLOOR, 1), pt(700, FLOOR, 14), pt(700, CEIL, 14))} fill={u('wall')} />
      <path d={quad(pt(-700, CEIL, 14), pt(700, CEIL, 14), pt(700, FLOOR, 14), pt(-700, FLOOR, 14))} fill="#d9dcdc" />
      <path d={quad(pt(-2000, FLOOR, 0.5), pt(2000, FLOOR, 0.5), pt(700, FLOOR, 14), pt(-700, FLOOR, 14))} fill={u('floor')} />

      {/* skylight bands (sawtooth roof) */}
      {depths.slice(0, -1).map((z, i) => {
        const z2 = z + (depths[i + 1] - z) * 0.45
        return <path key={i} d={quad(pt(-700, CEIL, z), pt(700, CEIL, z), pt(700, CEIL, z2), pt(-700, CEIL, z2))} fill={u('sky')} opacity="0.92" />
      })}
      {/* trusses */}
      {depths.map((z, i) => (
        <g key={i} stroke="#3a4045" strokeWidth={Math.max(1, 6 / z)} fill="none">
          <path d={`M${pt(-700, CEIL + 60, z)}L${pt(700, CEIL + 60, z)}`} />
          <path d={`M${pt(-700, CEIL + 60, z)}L${pt(-350, CEIL, z)}L${pt(0, CEIL + 60, z)}L${pt(350, CEIL, z)}L${pt(700, CEIL + 60, z)}`} />
        </g>
      ))}
      {/* crane runway beams */}
      {[-560, 560].map((x) => (
        <path key={x} d={`M${pt(x, CEIL + 150, 1)}L${pt(x, CEIL + 150, 14)}`} stroke="#2f3439" strokeWidth="10" />
      ))}
      <path d={`M${pt(-560, CEIL + 150, 3.1)}L${pt(560, CEIL + 150, 3.1)}`} stroke="#d06a2a" strokeWidth="9" />
      <path d={`M${pt(-560, CEIL + 180, 3.1)}L${pt(560, CEIL + 180, 3.1)}`} stroke="#9b4c1d" strokeWidth="3" />

      {/* columns */}
      {depths.slice(0, -1).map((z) =>
        [-700, 700].map((x) => {
          const [x1, y1] = P(x, CEIL + 60, z)
          const [, y2] = P(x, FLOOR, z)
          const w = 36 / z
          return <rect key={`${x}${z}`} x={x < 0 ? x1 : x1 - w} y={y1} width={w} height={y2 - y1} fill="#3a4045" />
        }),
      )}

      {/* floor markings */}
      {[-220, 220].map((x) => (
        <path key={x} d={quad(pt(x - 10, FLOOR, 0.6), pt(x + 10, FLOOR, 0.6), pt(x + 10, FLOOR, 14), pt(x - 10, FLOOR, 14))} fill="#d9a23c" opacity="0.8" />
      ))}
      {depths.map((z, i) => (
        <path key={i} d={quad(pt(-400, FLOOR, z), pt(400, FLOOR, z), pt(400, FLOOR, z + 0.3 * z), pt(-400, FLOOR, z + 0.3 * z))} fill="#fff" opacity="0.08" />
      ))}

      {/* machine rows */}
      {machines
        .slice()
        .sort((a, b) => b[2] - a[2])
        .map(([xa, xb, z1, z2, h], i) => {
          const left = xa < 0
          const inner = left ? xb : xa
          const top = FLOOR - h
          const front = quad(pt(xa, top, z1), pt(xb, top, z1), pt(xb, FLOOR, z1), pt(xa, FLOOR, z1))
          const side = quad(pt(inner, top, z1), pt(inner, top, z2), pt(inner, FLOOR, z2), pt(inner, FLOOR, z1))
          const lid = quad(pt(xa, top, z1), pt(xb, top, z1), pt(xb, top, z2), pt(xa, top, z2))
          const wx1 = left ? xa + 90 : xa + 60
          const wx2 = left ? xb - 60 : xb - 90
          const win = quad(pt(wx1, top + 60, z1), pt(wx2, top + 60, z1), pt(wx2, top + 190, z1), pt(wx1, top + 190, z1))
          const stripe = quad(pt(xa, top + 22, z1), pt(xb, top + 22, z1), pt(xb, top + 36, z1), pt(xa, top + 36, z1))
          const beacon = P(left ? xb - 30 : xa + 30, top - 30, z1)
          return (
            <g key={i}>
              <path d={side} fill="#b5babd" />
              <path d={lid} fill="#e7e8e6" />
              <path d={front} fill="#d9dbda" />
              <path d={stripe} fill={p.steel} />
              <path d={win} fill="#2b3338" />
              <path d={win} fill="#9fb4c3" opacity="0.18" />
              <rect x={beacon[0] - 4 / z1} y={beacon[1]} width={8 / z1} height={30 / z1} fill={i % 3 === 0 ? p.signal : '#4c9a6a'} />
            </g>
          )
        })}

      <rect y="200" width="1200" height="330" fill={u('haze')} />
      <Vignette id={id} strength={0.35} />
    </Svg>
  )
}

/* ---------------------------------------------------------------- robotic welding cell */
const robot: SceneFn = (id) => {
  const u = (n: string) => `url(#${id}-${n})`
  const r = rng(21)
  const sparks = Array.from({ length: 56 }, () => {
    const a = -Math.PI * (0.05 + r() * 0.9)
    const len = 40 + r() * 220
    const ex = Math.cos(a) * len
    const ey = Math.sin(a) * len * 0.8
    return { ex, ey, drop: 30 + r() * 140, w: 0.8 + r() * 1.8, warm: r() > 0.35 }
  })
  const tip = [792, 566]
  return (
    <Svg>
      <defs>
        <radialGradient id={`${id}-bg`} cx="0.66" cy="0.62" r="0.8">
          <stop offset="0" stopColor="#3b342f" />
          <stop offset="0.45" stopColor="#1f2226" />
          <stop offset="1" stopColor="#0e1012" />
        </radialGradient>
        <pattern id={`${id}-mesh`} width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0h26M0 0v26" stroke="#7d868d" strokeWidth="1.4" />
        </pattern>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6e7e4" />
          <stop offset="0.5" stopColor="#b4b8b8" />
          <stop offset="1" stopColor="#6e7476" />
        </linearGradient>
        <linearGradient id={`${id}-bodyDark`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2a2e32" />
          <stop offset="0.5" stopColor="#4c545b" />
          <stop offset="1" stopColor="#1d2023" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff8ee" stopOpacity="1" />
          <stop offset="0.08" stopColor="#ffe2b8" stopOpacity="0.95" />
          <stop offset="0.3" stopColor="#ff9a4d" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ff7a2a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-core`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#d9ecff" />
          <stop offset="1" stopColor="#9fd0ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-tube`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7e888f" />
          <stop offset="0.35" stopColor="#c3cacf" />
          <stop offset="1" stopColor="#3c4349" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill={u('bg')} />
      {/* safety fence */}
      <rect x="0" y="80" width="1200" height="560" fill={u('mesh')} opacity="0.13" />
      {[0, 300, 600, 900, 1200].map((x) => (
        <rect key={x} x={x - 9} y="60" width="18" height="600" fill="#2a2e32" />
      ))}
      <rect x="0" y="70" width="1200" height="12" fill="#2a2e32" />
      <rect y="640" width="1200" height="260" fill="#121416" />
      <rect y="640" width="1200" height="3" fill="#2f3438" />

      {/* positioner + workpiece frame */}
      <path d="M600 660h520v28H600Z" fill="#2c3135" />
      <path d="M640 688h40v140h-40ZM1040 688h40v140h-40Z" fill="#202327" />
      <g>
        <path d="M640 600h440l-60 60H580Z" fill="#3b4248" />
        <path d="M580 660h440v14H580Z" fill="#23272b" />
        {/* welded tube frame */}
        <path d="M660 560h360v22H660Z" fill={u('tube')} />
        <path d="M640 600h380v22H640Z" fill={u('tube')} />
        <path d="M660 560l-20 40h22l20-40Z" fill="#59626a" />
        <path d="M1000 560l-20 40h22l20-40Z" fill="#59626a" />
        <path d="M820 560l-20 40h22l20-40Z" fill="#6a737a" />
      </g>
      <path d="M760 581h60" stroke={p.amber} strokeWidth="4" opacity="0.9" />

      {/* robot */}
      <ellipse cx="330" cy="812" rx="150" ry="34" fill="#0b0c0d" />
      <path d="M220 700h220v110H220Z" fill={u('bodyDark')} />
      <path d="M250 610h160l20 90H230Z" fill={u('body')} />
      <rect x="250" y="680" width="160" height="6" fill={p.signal} />
      <circle cx="340" cy="600" r="66" fill={u('bodyDark')} />
      <circle cx="340" cy="600" r="40" fill="#585f66" />
      <path d="M296 590 430 316l78 38-122 286Z" fill={u('body')} />
      <path d="M300 590 434 316" stroke="#f3f4f2" strokeWidth="3" opacity="0.5" />
      <circle cx="470" cy="336" r="54" fill={u('bodyDark')} />
      <circle cx="470" cy="336" r="30" fill="#5d646b" />
      <path d="M470 300 722 388l-14 56-250-84Z" fill={u('body')} />
      <path d="M474 304 720 390" stroke="#f3f4f2" strokeWidth="2.5" opacity="0.5" />
      <circle cx="722" cy="420" r="34" fill={u('bodyDark')} />
      <circle cx="722" cy="420" r="16" fill={p.signal} />
      {/* torch */}
      <path d="M736 446c22 30 40 60 52 108" stroke="#1b1d20" strokeWidth="22" fill="none" strokeLinecap="round" />
      <path d="M736 446c22 30 40 60 52 108" stroke="#5c646b" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.6" />
      {/* dress pack */}
      <path d="M380 640c-60-120 40-260 100-330c60-40 160 10 230 70" stroke="#121315" strokeWidth="16" fill="none" />
      <path d="M380 640c-60-120 40-260 100-330c60-40 160 10 230 70" stroke="#2f3438" strokeWidth="16" fill="none" strokeDasharray="2 10" />

      {/* arc light */}
      <circle cx={tip[0]} cy={tip[1]} r="430" fill={u('glow')} opacity="0.55" />
      <circle cx={tip[0]} cy={tip[1]} r="150" fill={u('glow')} />
      {sparks.map((s, i) => (
        <path
          key={i}
          d={`M${tip[0]} ${tip[1]}q${s.ex} ${s.ey} ${s.ex * 1.4} ${s.ey + s.drop}`}
          stroke={s.warm ? '#ffb66b' : '#fff1d6'}
          strokeWidth={s.w}
          fill="none"
          strokeDasharray={`${8 + (i % 5) * 6} ${30 + (i % 7) * 12}`}
          opacity="0.9"
        />
      ))}
      <circle cx={tip[0]} cy={tip[1]} r="22" fill={u('core')} />
      <Vignette id={id} strength={0.55} />
    </Svg>
  )
}

/* ---------------------------------------------------------------- CMM inspection */
const inspection: SceneFn = (id) => {
  const u = (n: string) => `url(#${id}-${n})`
  const r = rng(3)
  const specks = Array.from({ length: 260 }, () => ({ x: 170 + r() * 860, y: 478 + r() * 120, o: r() * 0.4 }))
  return (
    <Svg>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e7e6e1" />
          <stop offset="1" stopColor="#cfcdc7" />
        </linearGradient>
        <linearGradient id={`${id}-granite`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3e42" />
          <stop offset="1" stopColor="#24272a" />
        </linearGradient>
        <linearGradient id={`${id}-alu`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3f4f3" />
          <stop offset="0.5" stopColor="#cfd4d6" />
          <stop offset="1" stopColor="#9ba3a8" />
        </linearGradient>
        <linearGradient id={`${id}-aluV`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a7aeb2" />
          <stop offset="0.4" stopColor="#eef0f0" />
          <stop offset="1" stopColor="#9aa2a6" />
        </linearGradient>
        <linearGradient id={`${id}-map`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3f73a8" />
          <stop offset="0.35" stopColor="#4fa37a" />
          <stop offset="0.6" stopColor="#9fc35a" />
          <stop offset="0.85" stopColor="#e9a23b" />
          <stop offset="1" stopColor={p.signal} />
        </linearGradient>
        <radialGradient id={`${id}-light`} cx="0.5" cy="0" r="0.9">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="900" fill={u('wall')} />
      <rect width="1200" height="900" fill={u('light')} />
      {[160, 400, 640, 880, 1120].map((x) => (
        <rect key={x} x={x} y="0" width="2" height="460" fill="#bdbab3" />
      ))}
      <rect y="700" width="1200" height="200" fill="#bdbbb5" />

      {/* granite table */}
      <path d="M150 700h900v30H150Z" fill="#191b1d" />
      <path d="M200 730h60v170h-60ZM940 730h60v170h-60Z" fill="#3a3e42" />
      <path d="M150 600h900v100H150Z" fill="#2a2d30" />
      <path d="M150 600h900l-70-130H220Z" fill={u('granite')} />
      {specks.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r="1.2" fill="#fff" opacity={s.o * 0.5} />
      ))}
      <path d="M150 600h900" stroke="#62686d" strokeWidth="2" />

      {/* bridge */}
      <path d="M254 520h48V210h-48Z" fill={u('aluV')} />
      <path d="M898 520h48V210h-48Z" fill={u('aluV')} />
      <path d="M244 520h68v14h-68ZM888 520h68v14h-68Z" fill="#7f878c" />
      <path d="M226 180h748v58H226Z" fill={u('alu')} />
      <path d="M226 238h748v6H226Z" fill="#7d858a" />
      <path d="M548 160h124v130H548Z" fill={u('alu')} />
      <rect x="560" y="176" width="38" height="8" fill={p.steel} />
      <path d="M598 290h28v170h-28Z" fill={u('aluV')} />
      <path d="M594 458h36v34h-36Z" fill="#2b2f33" />
      <path d="M606 492h12v20h-12Z" fill="#555c62" />
      <path d="M612 512v34" stroke="#c9ced1" strokeWidth="3" />
      <circle cx="612" cy="550" r="7" fill="#d03b25" />
      <circle cx="610" cy="548" r="2.2" fill="#fff" opacity="0.8" />

      {/* part */}
      <path d="M470 560h280v46H470Z" fill="#9aa3a9" />
      <path d="M470 560h280l-24-48H494Z" fill="#dde2e5" />
      <ellipse cx="612" cy="536" rx="46" ry="12" fill="#5b646b" />
      <ellipse cx="530" cy="540" rx="11" ry="4" fill="#5b646b" />
      <ellipse cx="694" cy="540" rx="11" ry="4" fill="#5b646b" />
      <path d="M470 606h280" stroke="#2a2d30" strokeWidth="2" />

      {/* monitor with deviation map */}
      <path d="M1100 380v140" stroke="#4a5055" strokeWidth="8" />
      <rect x="1000" y="250" width="180" height="128" fill="#16181b" />
      <rect x="1008" y="258" width="164" height="96" fill="#1f2327" />
      <path d="M1024 330l40-48h64l20 22v26Z" fill={u('map')} opacity="0.9" />
      <rect x="1018" y="362" width="60" height="4" fill="#5d646a" />
      <rect x="1084" y="362" width="30" height="4" fill={p.signal} />
      <Vignette id={id} strength={0.22} />
    </Svg>
  )
}

/* ---------------------------------------------------------------- production line */
const line: SceneFn = (id) => {
  const u = (n: string) => `url(#${id}-${n})`
  const parts = [70, 250, 430, 610, 790, 970, 1150]
  return (
    <Svg>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d444b" />
          <stop offset="1" stopColor="#1f2326" />
        </linearGradient>
        <linearGradient id={`${id}-mach`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dfe1df" />
          <stop offset="1" stopColor="#b3b8ba" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3c4a55" />
          <stop offset="0.5" stopColor="#202a31" />
          <stop offset="1" stopColor="#2c3a44" />
        </linearGradient>
        <radialGradient id={`${id}-inner`} cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#c6d6e0" stopOpacity="0.45" />
          <stop offset="1" stopColor="#c6d6e0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-belt`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2d30" />
          <stop offset="1" stopColor="#141618" />
        </linearGradient>
        <Chrome id={`${id}-chrome`} />
      </defs>
      <rect width="1200" height="900" fill={u('bg')} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={40 + i * 260} y="28" width="160" height="10" fill="#f4f5f2" opacity="0.85" />
      ))}
      {/* machines */}
      {[0, 1, 2, 3].map((i) => {
        const x = 30 + i * 300
        return (
          <g key={i}>
            <rect x={x} y="150" width="270" height="400" fill={u('mach')} />
            <rect x={x} y="150" width="270" height="18" fill={p.steel} />
            <rect x={x + 22} y="196" width="170" height="230" fill={u('glass')} />
            <rect x={x + 22} y="196" width="170" height="230" fill={u('inner')} />
            <path d={`M${x + 90} 196v80h34v-80`} fill="#59636a" opacity="0.6" />
            <rect x={x + 204} y="196" width="48" height="70" fill="#1d2125" />
            <rect x={x + 210} y="202" width="36" height="34" fill="#4c7590" opacity="0.6" />
            <rect x={x + 210} y="244" width="8" height="8" fill={p.signal} />
            <rect x={x + 224} y="244" width="8" height="8" fill="#4c9a6a" />
            <rect x={x + 240} y="96" width="10" height="54" fill="#2a2e32" />
            <rect x={x + 238} y="100" width="14" height="12" fill={i === 1 ? p.signal : '#4c9a6a'} />
            <rect x={x + 238} y="112" width="14" height="12" fill="#c8a03c" opacity="0.5" />
            <rect x={x} y="530" width="270" height="20" fill="#8d9498" />
          </g>
        )
      })}
      {/* conveyor */}
      <path d="M0 620h1200v140H0Z" fill="#2a2e32" />
      <path d="M0 640h1200l-40-60H40Z" fill={u('belt')} />
      {Array.from({ length: 30 }, (_, i) => (
        <path key={i} d={`M${40 + i * 40} 580l-${40 - (i - 15) * 0.6} 60`} stroke="#373b40" strokeWidth="2" />
      ))}
      <path d="M0 640h1200" stroke="#7a8288" strokeWidth="4" />
      <path d="M0 662h1200" stroke="#40464b" strokeWidth="2" />
      {[100, 400, 700, 1000].map((x) => (
        <rect key={x} x={x} y="760" width="30" height="140" fill="#1a1d20" />
      ))}
      {/* parts on the belt */}
      {parts.map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy="622" rx="54" ry="14" fill="#0e1012" opacity="0.6" />
          <path d={`M${x - 46} 580v34a46 12 0 0 0 92 0v-34Z`} fill={u('chrome')} />
          <ellipse cx={x} cy="580" rx="46" ry="12" fill="#dfe4e7" />
          <ellipse cx={x} cy="580" rx="18" ry="5" fill="#59626a" />
        </g>
      ))}
      <Vignette id={id} strength={0.5} />
    </Svg>
  )
}

/* ---------------------------------------------------------------- engineering: drawing flat-lay */
const drawing: SceneFn = (id) => {
  const u = (n: string) => `url(#${id}-${n})`
  const ink = '#2b3a48'
  return (
    <Svg>
      <defs>
        <linearGradient id={`${id}-desk`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2d3237" />
          <stop offset="1" stopColor="#181b1e" />
        </linearGradient>
        <pattern id={`${id}-hatch`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0v10" stroke={ink} strokeWidth="1.2" />
        </pattern>
        <Chrome id={`${id}-chrome`} />
        <filter id={`${id}-shadow`} x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="10" dy="18" stdDeviation="14" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>
      <rect width="1200" height="900" fill={u('desk')} />
      <g transform="rotate(-6 600 450)" filter={u('shadow')}>
        <rect x="170" y="110" width="860" height="640" fill="#f2f1ec" />
        <rect x="196" y="136" width="808" height="588" fill="none" stroke={ink} strokeWidth="2" />
        <g stroke={ink} fill="none" strokeWidth="2">
          {/* front view */}
          <path d="M260 250h300v220H260Z" />
          <path d="M320 250v220M500 250v220" strokeDasharray="10 6" strokeWidth="1.2" />
          <circle cx="410" cy="360" r="62" />
          <circle cx="410" cy="360" r="34" />
          <path d="M410 280v160M330 360h160" strokeDasharray="18 5 3 5" strokeWidth="1" />
          {/* section view */}
          <path d="M640 250h120v220H640Z" />
          <path d="M680 250v220M720 250v220" />
        </g>
        <path d="M640 250h40v220h-40ZM720 250h40v220h-40Z" fill={u('hatch')} />
        <g stroke={ink} strokeWidth="1" fill="none">
          <path d="M260 520h300M260 512v16M560 512v16" />
          <path d="M600 250v220M592 250h16M592 470h16" />
          <path d="M640 210h120M640 202v16M760 202v16" />
        </g>
        <g fontFamily={p.mono} fontSize="15" fill={ink} letterSpacing="1.5">
          <text x="410" y="545" textAnchor="middle">A</text>
          <text x="610" y="365">B</text>
          <text x="700" y="200" textAnchor="middle">SECTION A–A</text>
        </g>
        {/* title block */}
        <g stroke={ink} strokeWidth="1.5" fill="none">
          <path d="M700 600h304v124H700ZM700 640h304M700 680h304M850 600v124" />
        </g>
        <rect x="700" y="600" width="12" height="124" fill={p.signal} />
        <g fontFamily={p.mono} fontSize="12" fill={ink} letterSpacing="1.5">
          <text x="724" y="626">FERROVANE</text>
          <text x="862" y="626">DWG · FV-0142</text>
          <text x="724" y="666">MATL · SEE NOTE</text>
          <text x="862" y="666">REV · C</text>
          <text x="724" y="706">SCALE · 1:1</text>
          <text x="862" y="706">SHEET · 1/2</text>
        </g>
        <g fontFamily={p.mono} fontSize="12" fill={ink} opacity="0.75" letterSpacing="1">
          <text x="230" y="620">NOTES:</text>
          <text x="230" y="642">1. BREAK ALL SHARP EDGES.</text>
          <text x="230" y="662">2. DIMENSIONS PER DATUM A.</text>
          <text x="230" y="682">3. FINISH AS SPECIFIED.</text>
        </g>
      </g>
      {/* caliper */}
      <g transform="rotate(28 860 700)" filter={u('shadow')}>
        <rect x="560" y="680" width="620" height="38" fill={u('chrome')} />
        {Array.from({ length: 60 }, (_, i) => (
          <path key={i} d={`M${600 + i * 9} 680v${i % 5 === 0 ? 14 : 8}`} stroke="#3b4248" strokeWidth="1" />
        ))}
        <path d="M560 640h40v120h-40Z" fill={u('chrome')} />
        <path d="M800 650h90v110h-90Z" fill="#c6ccd0" />
        <rect x="812" y="664" width="66" height="30" fill="#1f2326" />
        <path d="M800 650l-30-40h30Z M890 650h10v-40h-30Z" fill="#aab2b8" />
      </g>
      {/* machined part */}
      <g filter={u('shadow')}>
        <path d="M60 790v54a96 30 0 0 0 192 0v-54Z" fill={u('chrome')} />
        <ellipse cx="156" cy="790" rx="96" ry="30" fill="#e3e8ea" />
        <ellipse cx="156" cy="790" rx="40" ry="12" fill="#3e464c" />
      </g>
      <Vignette id={id} strength={0.4} />
    </Svg>
  )
}

/* ---------------------------------------------------------------- materials: bar stock */
const materials: SceneFn = (id) => {
  const u = (n: string) => `url(#${id}-${n})`
  const rows = [6, 5, 4, 3]
  const R = 58
  const tags = ['#3f73a8', p.signal, '#4c9a6a', '#c8a03c']
  return (
    <Svg>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#30353a" />
          <stop offset="1" stopColor="#15171a" />
        </linearGradient>
        <linearGradient id={`${id}-end`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c9d0d4" />
          <stop offset="0.5" stopColor="#a9b2b8" />
          <stop offset="1" stopColor="#8d979e" />
        </linearGradient>
        <linearGradient id={`${id}-endWarm`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d9bf8c" />
          <stop offset="1" stopColor="#9c7a46" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill={u('bg')} />
      <rect y="760" width="1200" height="140" fill="#101214" />
      {rows.map((n, ri) =>
        Array.from({ length: n }, (_, i) => {
          const cx = 330 + i * R * 2 + ri * R + 40
          const cy = 700 - ri * R * 1.73
          const warm = ri === 2 && i === 1
          return (
            <g key={`${ri}-${i}`}>
              <circle cx={cx} cy={cy} r={R} fill="#3a4147" />
              <circle cx={cx} cy={cy} r={R - 4} fill={warm ? u('endWarm') : u('end')} />
              {Array.from({ length: 4 }, (_, k) => (
                <circle key={k} cx={cx} cy={cy} r={R - 12 - k * 11} fill="none" stroke="#fff" strokeOpacity={0.08 + k * 0.03} />
              ))}
              <path d={`M${cx - R * 0.7} ${cy - R * 0.7}a${R} ${R} 0 0 1 ${R * 0.5} -${R * 0.28}`} stroke={tags[(ri + i) % 4]} strokeWidth="9" fill="none" />
            </g>
          )
        }),
      )}
      {/* plate stack */}
      {Array.from({ length: 7 }, (_, i) => (
        <g key={i}>
          <path d={`M60 ${740 - i * 26}h220v20H60Z`} fill={i % 2 ? '#7b858c' : '#8f999f'} />
          <path d={`M60 ${740 - i * 26}l40 -14h220l-40 14Z`} fill="#c4cbd0" opacity={i === 6 ? 1 : 0.5} />
        </g>
      ))}
      <path d="M1040 760V420h40v340ZM1100 760V470h40v290Z" fill="#59626a" />
      <path d="M1040 420h40v12h-40ZM1100 470h40v12h-40Z" fill="#c4cbd0" />
      <Vignette id={id} strength={0.5} />
    </Svg>
  )
}

/* ---------------------------------------------------------------- industrial enclosure */
const enclosure: SceneFn = (id) => {
  const u = (n: string) => `url(#${id}-${n})`
  return (
    <Svg>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4a535b" />
          <stop offset="1" stopColor="#1b1e21" />
        </linearGradient>
        <linearGradient id={`${id}-front`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d9dbd8" />
          <stop offset="1" stopColor="#c3c6c3" />
        </linearGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9da2a1" />
          <stop offset="1" stopColor="#7e8382" />
        </linearGradient>
        <linearGradient id={`${id}-door`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b9bdbb" />
          <stop offset="1" stopColor="#e2e4e1" />
        </linearGradient>
        <linearGradient id={`${id}-plate`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c9ced1" />
          <stop offset="1" stopColor="#8e979d" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill={u('bg')} />
      <rect y="760" width="1200" height="140" fill="#141618" />
      <ellipse cx="560" cy="790" rx="380" ry="30" fill="#000" opacity="0.5" />
      {/* cabinet body */}
      <path d="M380 140h360v620H380Z" fill={u('front')} />
      <path d="M740 140l90-50v620l-90 50Z" fill={u('side')} />
      <path d="M380 140l90-50h360l-90 50Z" fill="#eceeeb" />
      {/* open interior */}
      <path d="M404 166h312v570H404Z" fill="#3a3f43" />
      <path d="M424 186h272v530H424Z" fill={u('plate')} />
      {[250, 380, 510, 640].map((y) => (
        <g key={y}>
          <rect x="440" y={y} width="240" height="12" fill="#e1e5e7" />
          {Array.from({ length: 7 }, (_, i) => (
            <rect key={i} x={446 + i * 33} y={y - 46} width="26" height="64" fill={i % 3 === 0 ? '#2c3135' : '#e9ebea'} stroke="#7f878d" strokeWidth="1" />
          ))}
          <rect x={446} y={y - 40} width="26" height="6" fill={y === 380 ? p.signal : p.steel} />
        </g>
      ))}
      <path d="M440 690h240" stroke="#2b3035" strokeWidth="10" />
      {/* open door */}
      <path d="M380 140 200 200v620l180-60Z" fill={u('door')} />
      <path d="M372 160 216 212v588l156-52Z" fill="none" stroke="#333a3f" strokeWidth="5" opacity="0.6" />
      <rect x="240" y="440" width="12" height="70" fill="#2b2f33" />
      <path d="M260 260l70-22v80l-70 22Z" fill="#f5f6f4" />
      <path d="M268 272l54-17M268 286l54-17M268 300l36-11" stroke="#8b9296" strokeWidth="2" />
      {/* plinth */}
      <path d="M380 760h360v26H380Z" fill="#2a2e32" />
      <path d="M740 760l90-50v26l-90 50Z" fill="#1d2023" />
      <Vignette id={id} strength={0.45} />
    </Svg>
  )
}

/* ---------------------------------------------------------------- engineered assembly on fixture */
const assembly: SceneFn = (id) => {
  const u = (n: string) => `url(#${id}-${n})`
  const holes: [number, number][] = []
  for (let r = 0; r < 6; r++) for (let c = 0; c < 14; c++) holes.push([150 + c * 66 + r * 18, 610 + r * 34])
  return (
    <Svg>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2e3338" />
          <stop offset="1" stopColor="#141619" />
        </linearGradient>
        <linearGradient id={`${id}-plate`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5d7a92" />
          <stop offset="1" stopColor="#3a5368" />
        </linearGradient>
        <Chrome id={`${id}-chrome`} />
        <linearGradient id={`${id}-block`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8d979e" />
          <stop offset="0.45" stopColor="#dfe4e7" />
          <stop offset="1" stopColor="#7f8990" />
        </linearGradient>
        <linearGradient id={`${id}-motor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4b5259" />
          <stop offset="0.35" stopColor="#7d868d" />
          <stop offset="1" stopColor="#1f2226" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill={u('bg')} />
      {/* fixture plate */}
      <path d="M120 590h900l120 220H240Z" fill={u('plate')} />
      <path d="M240 810h900v30H240Z" fill="#2a3a48" />
      {holes.map(([x, y], i) => (
        <ellipse key={i} cx={x + (y - 610) * 0.5} cy={y} rx="7" ry="3.4" fill="#22313d" />
      ))}
      {/* base plate */}
      <path d="M300 560h620l60 110H360Z" fill="#c9cfd3" />
      <path d="M360 670h620v26H360Z" fill="#8a949b" />
      {/* bearing blocks */}
      {[420, 780].map((x) => (
        <g key={x}>
          <path d={`M${x} 470h120v150H${x}Z`} fill={u('block')} />
          <path d={`M${x} 470l20-24h120l-20 24Z`} fill="#eef1f2" />
          <path d={`M${x + 120} 470l20-24v150l-20 24Z`} fill="#6c767d" />
          <circle cx={x + 60} cy="520" r="34" fill="#3d454b" />
          <circle cx={x + 60} cy="520" r="22" fill={u('chrome')} />
          {[x + 18, x + 102].map((bx) => (
            <g key={bx}>
              <circle cx={bx} cy="600" r="9" fill="#2f353a" />
              <path d={`M${bx - 4} 600h8`} stroke="#8d969c" strokeWidth="2" />
            </g>
          ))}
        </g>
      ))}
      {/* shaft */}
      <path d="M300 508h740v24H300Z" fill={u('chrome')} />
      {/* pulley */}
      <path d="M640 430v180h56V430Z" fill="#2c3136" />
      <ellipse cx="668" cy="520" rx="30" ry="92" fill={u('chrome')} />
      <ellipse cx="668" cy="520" rx="12" ry="34" fill="#3a4147" />
      {/* motor */}
      <path d="M940 440h170v164H940Z" fill={u('motor')} />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={960 + i * 18} y="440" width="6" height="164" fill="#1a1d20" opacity="0.5" />
      ))}
      <path d="M920 430h26v184h-26Z" fill="#373d43" />
      <rect x="1030" y="410" width="60" height="30" fill="#2a2e32" />
      <rect x="1040" y="418" width="14" height="8" fill={p.signal} />
      {/* traveler tag */}
      <path d="M210 470h120v80H210Z" fill="#f2f1ec" transform="rotate(-8 270 510)" />
      <g transform="rotate(-8 270 510)" fontFamily={p.mono} fontSize="11" fill="#2b3a48" letterSpacing="1">
        <text x="222" y="494">S/N · 0007</text>
        <text x="222" y="514">TORQUE ✓</text>
        <text x="222" y="534">TEST ✓</text>
      </g>
      <Vignette id={id} strength={0.5} />
    </Svg>
  )
}

const scenes: Record<SceneName, SceneFn> = { cnc, component, hall, robot, inspection, line, drawing, materials, enclosure, assembly }

export function Scene({ name, id, fit }: { name: SceneName; id: string; fit?: SceneFit }) {
  return name === 'component' ? component(id, fit) : scenes[name](id)
}
