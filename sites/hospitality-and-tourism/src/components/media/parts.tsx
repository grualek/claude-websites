import { createContext, useContext, type ReactElement, type ReactNode } from 'react'
import type { Palette } from './palette'

/* Reusable, deterministic SVG building blocks for the illustrated scenes. */

const AlignContext = createContext<'left' | 'center' | 'right'>('center')
export const SceneAlign = AlignContext.Provider
const ratio = { left: 'xMinYMid', center: 'xMidYMid', right: 'xMaxYMid' } as const

/** Shared 1200×900 canvas; crops via `slice`, keeping the side the asset asks for. */
export function Frame({ children }: { children: ReactNode }) {
  const align = useContext(AlignContext)
  return (
    <svg viewBox="0 0 1200 900" preserveAspectRatio={`${ratio[align]} slice`} className="h-full w-full" aria-hidden="true" focusable="false">
      {children}
    </svg>
  )
}

/** Small seeded PRNG so scenes render identically on every load (no hydration / layout jitter). */
export function rng(seed: number) {
  // Mix the seed so consecutive seeds give unrelated sequences
  let s = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b) >>> 0
  s = Math.imul(s ^ (s >>> 13), 0xc2b2ae35) >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

export function SkyDefs({ id, p, sunX = 0.7, sunY = 0.45 }: { id: string; p: Palette; sunX?: number; sunY?: number }) {
  return (
    <>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={p.skyTop} />
        <stop offset="0.55" stopColor={p.skyMid} />
        <stop offset="1" stopColor={p.skyLow} />
      </linearGradient>
      <radialGradient id={`${id}-glow`} cx={sunX} cy={sunY} r="0.6">
        <stop offset="0" stopColor={p.sunGlow} stopOpacity={p.mood === 'morning' ? 0.6 : 0.95} />
        <stop offset="0.35" stopColor={p.sunGlow} stopOpacity={p.mood === 'morning' ? 0.2 : 0.4} />
        <stop offset="1" stopColor={p.sunGlow} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={p.seaFar} />
        <stop offset="1" stopColor={p.seaNear} />
      </linearGradient>
      <linearGradient id={`${id}-veil`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1b1720" stopOpacity={p.veil} />
        <stop offset="1" stopColor="#1b1720" stopOpacity={p.veil * 2.2} />
      </linearGradient>
    </>
  )
}

/** Sky rect + glow + sun disc. Morning keeps the sun as a soft haze; dusk sets it on the horizon. */
export function Sky({ id, p, w, h, sunX, sunY, sunR = 34 }: { id: string; p: Palette; w: number; h: number; sunX: number; sunY: number; sunR?: number }) {
  return (
    <>
      <rect width={w} height={h} fill={`url(#${id}-sky)`} />
      <rect width={w} height={h} fill={`url(#${id}-glow)`} />
      {p.mood !== 'morning' && <circle cx={sunX} cy={sunY} r={sunR} fill={p.sun} opacity={p.mood === 'dusk' ? 0.95 : 0.9} />}
      {p.mood === 'morning' && <circle cx={sunX} cy={sunY} r={sunR * 1.4} fill={p.sun} opacity="0.55" />}
    </>
  )
}

/** Sea band with a shimmer path under the sun. */
export function Sea({ id, p, y, w, h, sunX, seed = 3 }: { id: string; p: Palette; y: number; w: number; h: number; sunX: number; seed?: number }) {
  const r = rng(seed)
  const lines: ReactElement[] = []
  for (let i = 0; i < 46; i++) {
    const t = i / 46
    const ly = y + 4 + t * t * h
    const spread = 30 + t * 260
    const cx = sunX + (r() - 0.5) * spread * 1.4
    const lw = (8 + r() * 40) * (0.5 + t * 1.6)
    lines.push(<rect key={i} x={cx - lw / 2} y={ly} width={lw} height={0.8 + t * 2.4} rx="1" fill={p.shimmer} opacity={(0.75 - t * 0.45) * (p.mood === 'morning' ? 0.6 : 0.9)} />)
  }
  // faint wide swell lines across the bay
  for (let i = 0; i < 18; i++) {
    const t = (i + 1) / 19
    const ly = y + t * t * h
    const x = r() * w * 0.6
    lines.push(<rect key={`s${i}`} x={x} y={ly} width={60 + r() * 220} height={0.7 + t * 1.6} fill={p.shimmer} opacity={0.12 + (1 - t) * 0.1} />)
  }
  return (
    <>
      <rect y={y} width={w} height={h} fill={`url(#${id}-sea)`} />
      {lines}
    </>
  )
}

export function Cypress({ x, y, h, fill, lit }: { x: number; y: number; h: number; fill: string; lit?: string }) {
  const w = h * 0.17
  return (
    <g>
      <path d={`M${x},${y} C${x - w * 0.62},${y - h * 0.3} ${x - w * 0.5},${y - h * 0.82} ${x},${y - h} C${x + w * 0.48},${y - h * 0.82} ${x + w * 0.62},${y - h * 0.3} ${x},${y} Z`} fill={fill} />
      {lit && (
        <path
          d={`M${x - w * 0.05},${y - h * 0.05} C${x - w * 0.45},${y - h * 0.32} ${x - w * 0.38},${y - h * 0.78} ${x - w * 0.02},${y - h * 0.95} C${x - w * 0.15},${y - h * 0.7} ${x - w * 0.2},${y - h * 0.35} ${x - w * 0.05},${y - h * 0.05} Z`}
          fill={lit}
          opacity="0.55"
        />
      )}
    </g>
  )
}

/** Olive tree: twisting trunk and a cloud of silver-green canopy clusters. */
export function OliveTree({ x, y, s = 1, p, seed = 1, lanterns = false }: { x: number; y: number; s?: number; p: Palette; seed?: number; lanterns?: boolean }) {
  const r = rng(seed)
  const blobs: ReactElement[] = []
  const lights: ReactElement[] = []
  for (let i = 0; i < 16; i++) {
    const a = r() * Math.PI * 2
    const d = r() * 70 * s
    const bx = x + Math.cos(a) * d * 1.5
    const by = y - 150 * s + Math.sin(a) * d * 0.55
    const rx = (30 + r() * 34) * s
    const ry = rx * (0.55 + r() * 0.2)
    blobs.push(<ellipse key={i} cx={bx} cy={by} rx={rx} ry={ry} fill={i % 3 === 0 ? p.foliageDark : p.foliage} />)
  }
  for (let i = 0; i < 9; i++) {
    const bx = x - 30 * s + (r() - 0.5) * 150 * s
    const by = y - 175 * s + (r() - 0.6) * 50 * s
    blobs.push(<ellipse key={`l${i}`} cx={bx} cy={by} rx={(16 + r() * 18) * s} ry={(8 + r() * 8) * s} fill={p.foliageLit} opacity="0.75" />)
  }
  if (lanterns) {
    for (let i = 0; i < 6; i++) {
      const lx = x + (r() - 0.5) * 220 * s
      const ly = y - 112 * s + r() * 30 * s
      lights.push(
        <g key={`ln${i}`}>
          <line x1={lx} y1={ly - 26 * s} x2={lx} y2={ly} stroke={p.woodDark} strokeWidth={1} opacity="0.6" />
          <circle cx={lx} cy={ly + 4 * s} r={22 * s} fill={p.glow} opacity="0.18" />
          <circle cx={lx} cy={ly + 4 * s} r={5 * s} fill={p.glow} />
        </g>,
      )
    }
  }
  return (
    <g>
      <path
        d={`M${x - 14 * s},${y} C${x - 6 * s},${y - 40 * s} ${x - 30 * s},${y - 70 * s} ${x - 18 * s},${y - 120 * s} M${x + 10 * s},${y} C${x + 18 * s},${y - 50 * s} ${x + 2 * s},${y - 80 * s} ${x + 30 * s},${y - 125 * s}`}
        stroke={p.woodDark}
        strokeWidth={11 * s}
        strokeLinecap="round"
        fill="none"
      />
      <path d={`M${x - 22 * s},${y} Q${x},${y - 30 * s} ${x + 20 * s},${y} Z`} fill={p.woodDark} />
      {blobs}
      {lights}
    </g>
  )
}

/** Whitewashed cube house with a shaded side, parapet and dark arched openings. */
export function House({
  x,
  y,
  w,
  h,
  side = 0.28,
  p,
  windows = 2,
  arch = true,
  lit = false,
}: {
  x: number
  y: number
  w: number
  h: number
  side?: number
  p: Palette
  windows?: number
  arch?: boolean
  lit?: boolean
}) {
  const sw = w * side
  const winW = Math.min(26, w / (windows * 2.4))
  const winH = winW * 1.6
  const els: ReactElement[] = []
  for (let i = 0; i < windows; i++) {
    const wx = x + (w / (windows + 1)) * (i + 1) - winW / 2
    const wy = y + h * 0.32
    const fill = lit ? p.glow : p.wallDeep
    els.push(
      arch ? (
        <path key={i} d={`M${wx},${wy + winH} V${wy + winW / 2} A${winW / 2},${winW / 2} 0 0 1 ${wx + winW},${wy + winW / 2} V${wy + winH} Z`} fill={fill} opacity={lit ? 0.9 : 0.85} />
      ) : (
        <rect key={i} x={wx} y={wy} width={winW} height={winH} fill={fill} opacity={lit ? 0.9 : 0.85} />
      ),
    )
  }
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={p.wallLit} />
      <path d={`M${x + w},${y} L${x + w + sw},${y + sw * 0.18} L${x + w + sw},${y + h} L${x + w},${y + h} Z`} fill={p.wallShade} />
      <rect x={x - 2} y={y - 6} width={w + 4} height={6} fill={p.wallLit} />
      <rect x={x} y={y} width={w} height={3} fill={p.wallShade} opacity="0.5" />
      {els}
    </g>
  )
}

export function Lounger({ x, y, s = 1, p }: { x: number; y: number; s?: number; p: Palette }) {
  return (
    <g>
      <ellipse cx={x + 60 * s} cy={y + 14 * s} rx={70 * s} ry={6 * s} fill={p.shadow} opacity="0.18" />
      <path d={`M${x},${y} L${x + 92 * s},${y} L${x + 122 * s},${y - 30 * s}`} stroke={p.woodDark} strokeWidth={5 * s} fill="none" strokeLinecap="round" />
      <path d={`M${x + 2 * s},${y - 5 * s} L${x + 90 * s},${y - 5 * s} L${x + 118 * s},${y - 34 * s}`} stroke={p.linen} strokeWidth={9 * s} fill="none" strokeLinecap="round" />
      <path d={`M${x + 8 * s},${y} v${10 * s} M${x + 84 * s},${y} v${10 * s}`} stroke={p.woodDark} strokeWidth={3 * s} />
    </g>
  )
}

export function Umbrella({ x, y, s = 1, p }: { x: number; y: number; s?: number; p: Palette }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y - 150 * s} stroke={p.woodDark} strokeWidth={3 * s} />
      <path d={`M${x - 85 * s},${y - 130 * s} Q${x},${y - 185 * s} ${x + 85 * s},${y - 130 * s} Z`} fill={p.linen} />
      <path d={`M${x - 85 * s},${y - 130 * s} Q${x},${y - 140 * s} ${x + 85 * s},${y - 130 * s}`} fill={p.wallShade} opacity="0.7" />
    </g>
  )
}

/** Minimal human silhouette (standing) — scale 1 ≈ 90px tall. */
export function Figure({ x, y, s = 1, fill, pose = 'stand' }: { x: number; y: number; s?: number; fill: string; pose?: 'stand' | 'walk' }) {
  const legs =
    pose === 'walk'
      ? `M${x - 3 * s},${y - 38 * s} L${x - 12 * s},${y} M${x + 3 * s},${y - 38 * s} L${x + 10 * s},${y}`
      : `M${x - 4 * s},${y - 38 * s} L${x - 5 * s},${y} M${x + 4 * s},${y - 38 * s} L${x + 5 * s},${y}`
  return (
    <g fill={fill} stroke={fill}>
      <circle cx={x} cy={y - 82 * s} r={7 * s} stroke="none" />
      <path d={`M${x - 11 * s},${y - 70 * s} Q${x},${y - 75 * s} ${x + 11 * s},${y - 70 * s} L${x + 9 * s},${y - 36 * s} L${x - 9 * s},${y - 36 * s} Z`} stroke="none" />
      <path d={legs} strokeWidth={6 * s} strokeLinecap="round" fill="none" />
    </g>
  )
}

/** Terraced hillside band with soft contour. */
export function Ridge({ d, fill, opacity = 1 }: { d: string; fill: string; opacity?: number }) {
  return <path d={d} fill={fill} opacity={opacity} />
}
