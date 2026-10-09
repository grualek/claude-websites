import { createContext, useContext, type ReactNode } from 'react'
import type { Palette } from './palette'

/* Reusable, deterministic SVG building blocks for the illustrated scenes (1200×900 canvas). */

export const W = 1200
export const H = 900

const AlignContext = createContext<'left' | 'center' | 'right'>('center')
export const SceneAlign = AlignContext.Provider
const ratio = { left: 'xMinYMid', center: 'xMidYMid', right: 'xMaxYMid' } as const

/** Shared 1200×900 canvas; crops via `slice`, keeping the side the asset asks for. */
export function Frame({ children }: { children: ReactNode }) {
  const align = useContext(AlignContext)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio={`${ratio[align]} slice`} className="h-full w-full" aria-hidden="true" focusable="false">
      {children}
    </svg>
  )
}

/** Small seeded PRNG so scenes render identically on every load (no layout jitter). */
export function rng(seed: number) {
  let s = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b) >>> 0
  s = Math.imul(s ^ (s >>> 13), 0xc2b2ae35) >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

export const pick = <T,>(r: () => number, list: readonly T[]) => list[Math.floor(r() * list.length)]

/** Evening veil + warm vignette, shared by every scene. */
export function Atmosphere({ id, p }: { id: string; p: Palette }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-vig`} cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.6" stopColor="#14213a" stopOpacity="0" />
          <stop offset="1" stopColor="#14213a" stopOpacity={p.mood === 'evening' ? 0.32 : 0.14} />
        </radialGradient>
      </defs>
      {p.veil > 0 && <rect width={W} height={H} fill="#1b2440" opacity={p.veil} />}
      <rect width={W} height={H} fill={`url(#${id}-vig)`} />
    </>
  )
}

export function SkyGradient({ id, p }: { id: string; p: Palette }) {
  return (
    <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={p.skyTop} />
      <stop offset="1" stopColor={p.skyLow} />
    </linearGradient>
  )
}

export function LightBeam({ id, p, x, y, w, h, skew = 160, opacity = 0.35 }: { id: string; p: Palette; x: number; y: number; w: number; h: number; skew?: number; opacity?: number }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-beam-${x}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.glow} stopOpacity={opacity} />
          <stop offset="1" stopColor={p.glow} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M${x},${y} L${x + w},${y} L${x + w + skew},${y + h} L${x + skew},${y + h} Z`} fill={`url(#${id}-beam-${x})`} />
    </>
  )
}

/* ------------------------------------------------------------------ people */

export type HairStyle = 'short' | 'bun' | 'long' | 'curly' | 'cropped' | 'wavy' | 'bald'

export interface Look {
  skin: string
  hair: string
  hairStyle: HairStyle
  top: string
  bottom: string
  shoes?: string
  /** Lab coat / apron over the top */
  coat?: string
  bag?: string
}

/** A diverse, reusable cast. Index into it with `cast[n % cast.length]`. */
export const cast: Look[] = [
  { skin: '#7d4c32', hair: '#1c1714', hairStyle: 'curly', top: '#e9b949', bottom: '#2f3a52' },
  { skin: '#f0cfb2', hair: '#a87c4f', hairStyle: 'long', top: '#4f6f97', bottom: '#3a3f4b' },
  { skin: '#c99070', hair: '#2a1d16', hairStyle: 'short', top: '#4b6e5c', bottom: '#b9a27e' },
  { skin: '#e2b48f', hair: '#1f1b19', hairStyle: 'bun', top: '#d98c6c', bottom: '#1d2d4a' },
  { skin: '#5a3624', hair: '#141110', hairStyle: 'cropped', top: '#f3eee3', bottom: '#4f6f97' },
  { skin: '#f1d6bd', hair: '#d3b07a', hairStyle: 'wavy', top: '#1d2d4a', bottom: '#7d8a9e' },
  { skin: '#a8704f', hair: '#2b2220', hairStyle: 'long', top: '#86a487', bottom: '#2f3a52' },
  { skin: '#e8c3a0', hair: '#4a3324', hairStyle: 'short', top: '#b9cadc', bottom: '#3a3f4b' },
  { skin: '#8f5b3e', hair: '#1a1514', hairStyle: 'bun', top: '#1d2d4a', bottom: '#c9b28c' },
  { skin: '#f3d3b8', hair: '#6b4a2f', hairStyle: 'cropped', top: '#e9b949', bottom: '#4b6e5c' },
]

/** Back hair (behind head) and front hair (over head) for a head centred at hx, hy. */
function Hair({ hx, hy, look, back, layer }: { hx: number; hy: number; look: Look; back?: boolean; layer: 'behind' | 'front' }) {
  const c = look.hair
  const s = look.hairStyle
  if (s === 'bald') return null
  if (layer === 'behind') {
    if (s === 'long') return <path d={`M${hx - 23},${hy - 6} Q${hx - 26},${hy + 38} ${hx - 18},${hy + 50} L${hx + 18},${hy + 50} Q${hx + 26},${hy + 38} ${hx + 23},${hy - 6} Z`} fill={c} />
    if (s === 'wavy')
      return <path d={`M${hx - 23},${hy - 6} Q${hx - 28},${hy + 22} ${hx - 22},${hy + 32} Q${hx - 12},${hy + 40} ${hx},${hy + 34} Q${hx + 12},${hy + 40} ${hx + 22},${hy + 32} Q${hx + 28},${hy + 22} ${hx + 23},${hy - 6} Z`} fill={c} />
    if (s === 'curly') return <ellipse cx={hx} cy={hy - 4} rx={29} ry={29} fill={c} />
    if (s === 'bun') return <circle cx={hx + (back ? 0 : 6)} cy={hy - 27} r={11} fill={c} />
    return null
  }
  if (back) {
    // seen from behind: hair covers the head
    if (s === 'cropped') return <ellipse cx={hx} cy={hy - 3} rx={20} ry={21} fill={c} opacity={0.92} />
    return <ellipse cx={hx} cy={hy - 1} rx={21} ry={s === 'short' ? 21 : 23.5} fill={c} />
  }
  if (s === 'curly')
    return (
      <g fill={c}>
        {[-22, -14, -5, 5, 14, 22].map((dx, i) => (
          <circle key={i} cx={hx + dx} cy={hy - 18 + Math.abs(dx) * 0.35} r={10} />
        ))}
      </g>
    )
  if (s === 'cropped') return <path d={`M${hx - 19},${hy - 6} Q${hx - 19},${hy - 24} ${hx},${hy - 24} Q${hx + 19},${hy - 24} ${hx + 19},${hy - 6} Q${hx + 12},${hy - 16} ${hx},${hy - 16} Q${hx - 12},${hy - 16} ${hx - 19},${hy - 6} Z`} fill={c} />
  // short / long / wavy / bun: a soft cap with a side part
  return <path d={`M${hx - 21},${hy + 4} Q${hx - 24},${hy - 27} ${hx + 2},${hy - 26} Q${hx + 25},${hy - 25} ${hx + 21},${hy + 2} Q${hx + 14},${hy - 13} ${hx + 3},${hy - 14} Q${hx - 10},${hy - 10} ${hx - 21},${hy + 4} Z`} fill={c} />
}

function Head({ hx, hy, look, back }: { hx: number; hy: number; look: Look; back?: boolean }) {
  return (
    <g>
      <Hair hx={hx} hy={hy} look={look} back={back} layer="behind" />
      <rect x={hx - 7} y={hy + 14} width={14} height={20} fill={look.skin} />
      <rect x={hx - 7} y={hy + 14} width={14} height={8} fill="#000" opacity="0.12" />
      <ellipse cx={hx} cy={hy} rx={19} ry={22} fill={look.skin} />
      {!back && <ellipse cx={hx + 9} cy={hy + 4} rx={8} ry={12} fill="#000" opacity="0.06" />}
      <Hair hx={hx} hy={hy} look={look} back={back} layer="front" />
    </g>
  )
}

export type Pose = 'stand' | 'walk' | 'sit' | 'seated' | 'point' | 'kneel'

interface FigureProps {
  x: number
  y: number
  s?: number
  look: Look
  pose?: Pose
  /** 1 faces right (for side poses), -1 faces left */
  facing?: 1 | -1
  /** Seen from behind */
  back?: boolean
  /** Something in hand */
  holding?: 'book' | 'laptop' | 'tablet' | 'cup' | 'none'
  shadow?: boolean
}

/**
 * Simplified, faceless editorial figure. Local coordinates: feet at (0, 0), ~300 units tall standing.
 * `sit` is a side view on a 120-unit seat; `seated` draws head and torso only (a table or row hides the rest)
 * and rests the hands on the table edge when seen from the front.
 */
export function Figure({ x, y, s = 1, look, pose = 'stand', facing = 1, back, holding = 'none', shadow = true }: FigureProps) {
  const sleeve = look.coat ?? look.top
  const shoes = look.shoes ?? '#2b2f3a'
  const arm = (d: string, w = 16) => <path d={d} stroke={sleeve} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  const hand = (cx: number, cy: number) => <circle cx={cx} cy={cy} r={7.5} fill={look.skin} />

  let body: ReactNode
  if (pose === 'seated') {
    body = (
      <g>
        <path d="M-40,-228 Q-40,-246 -24,-248 L24,-248 Q40,-246 40,-228 L46,-100 L-46,-100 Z" fill={look.coat ?? look.top} />
        {back ? (
          <>
            <path d="M-40,-228 L-50,-150" stroke={sleeve} strokeWidth="18" strokeLinecap="round" />
            <path d="M40,-228 L50,-150" stroke={sleeve} strokeWidth="18" strokeLinecap="round" />
            <path d="M0,-246 L0,-110" stroke="#000" strokeOpacity="0.07" strokeWidth="3" />
          </>
        ) : (
          <>
            {arm('M-38,-226 L-50,-160 L-22,-112', 17)}
            {arm('M38,-226 L50,-160 L22,-112', 17)}
            {hand(-20, -110)}
            {hand(20, -110)}
          </>
        )}
        <Head hx={0} hy={-274} look={look} back={back} />
      </g>
    )
  } else if (pose === 'sit') {
    body = (
      <g>
        {shadow && <ellipse cx={30} cy={0} rx={70} ry={9} fill="#14213a" opacity="0.14" />}
        <path d="M-6,-112 L66,-112" stroke={look.bottom} strokeWidth="28" strokeLinecap="round" />
        <path d="M66,-112 L70,-10" stroke={look.bottom} strokeWidth="22" strokeLinecap="round" />
        <ellipse cx={80} cy={-5} rx={17} ry={7} fill={shoes} />
        <path d="M-26,-112 L-24,-222 Q-22,-240 -6,-242 L10,-242 Q24,-240 24,-222 L26,-112 Z" fill={look.coat ?? look.top} />
        {back ? null : arm('M4,-226 L18,-166 L60,-152')}
        {back ? null : hand(62, -152)}
        <Head hx={2} hy={-268} look={look} back={back} />
      </g>
    )
  } else if (pose === 'kneel') {
    body = (
      <g>
        {shadow && <ellipse cx={10} cy={0} rx={60} ry={8} fill="#14213a" opacity="0.14" />}
        <path d="M-14,-80 L-40,-12 L10,-12" stroke={look.bottom} strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M6,-84 L44,-84 L46,-8" stroke={look.bottom} strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <ellipse cx={58} cy={-4} rx={15} ry={6} fill={shoes} />
        <path d="M-26,-80 L-20,-190 Q-18,-206 -2,-208 L14,-208 Q30,-206 30,-190 L30,-80 Z" fill={look.coat ?? look.top} transform="rotate(10 0 -80)" />
        {arm('M20,-180 L48,-120 L72,-96')}
        {hand(74, -95)}
        <Head hx={22} hy={-232} look={look} />
      </g>
    )
  } else if (pose === 'walk') {
    body = (
      <g>
        {shadow && <ellipse cx={0} cy={0} rx={52} ry={8} fill="#14213a" opacity="0.15" />}
        <path d="M-8,-136 L-34,-8" stroke={look.bottom} strokeWidth="23" strokeLinecap="round" />
        <path d="M8,-136 L30,-8" stroke={look.bottom} strokeWidth="23" strokeLinecap="round" />
        <ellipse cx={-38} cy={-5} rx={16} ry={7} fill={shoes} />
        <ellipse cx={38} cy={-5} rx={16} ry={7} fill={shoes} />
        {look.bag && <rect x={-58} y={-238} width={34} height={70} rx={12} fill={look.bag} />}
        <path d="M-34,-236 Q-34,-252 -20,-254 L22,-254 Q36,-252 36,-236 L30,-128 L-30,-128 Z" fill={look.coat ?? look.top} />
        {look.bag && <path d="M-26,-250 L24,-150" stroke={look.bag} strokeWidth="5" />}
        {arm('M-30,-236 L-46,-176 L-56,-134')}
        {arm('M30,-236 L44,-180 L60,-140')}
        {hand(-57, -132)}
        {hand(61, -138)}
        {holding === 'book' && <rect x={52} y={-176} width={22} height={32} rx={2} fill="#e9b949" transform="rotate(-12 62 -160)" />}
        <Head hx={2} hy={-280} look={look} back={back} />
      </g>
    )
  } else {
    // stand / point
    const pointing = pose === 'point'
    body = (
      <g>
        {shadow && <ellipse cx={0} cy={0} rx={46} ry={8} fill="#14213a" opacity="0.15" />}
        <rect x={-25} y={-140} width={22} height={134} rx={10} fill={look.bottom} />
        <rect x={3} y={-140} width={22} height={134} rx={10} fill={look.bottom} />
        <ellipse cx={-16} cy={-5} rx={16} ry={7} fill={shoes} />
        <ellipse cx={18} cy={-5} rx={16} ry={7} fill={shoes} />
        {look.bag && <rect x={back ? -26 : -60} y={-240} width={back ? 52 : 30} height={74} rx={12} fill={look.bag} />}
        <path d="M-35,-236 Q-35,-252 -20,-254 L22,-254 Q37,-252 37,-236 L31,-128 L-31,-128 Z" fill={look.top} />
        {look.coat && <path d="M-37,-236 Q-37,-254 -20,-256 L-4,-256 L-6,-96 L-36,-96 Z M37,-236 Q37,-254 20,-256 L4,-256 L6,-96 L36,-96 Z" fill={look.coat} />}
        {arm('M-31,-236 L-40,-176 L-36,-128')}
        {hand(-36, -126)}
        {pointing ? (
          <>
            {arm('M31,-236 L66,-262 L96,-300')}
            {hand(98, -302)}
          </>
        ) : holding === 'laptop' || holding === 'tablet' || holding === 'book' ? (
          <>
            {arm('M31,-236 L42,-186 L8,-168')}
            <rect x={-30} y={-186} width={holding === 'laptop' ? 64 : 44} height={holding === 'laptop' ? 10 : 34} rx={3} fill={holding === 'book' ? '#e9b949' : '#c9d2de'} transform="rotate(-8 0 -170)" />
            {hand(8, -168)}
          </>
        ) : holding === 'cup' ? (
          <>
            {arm('M31,-236 L44,-184 L30,-160')}
            <rect x={22} y={-178} width={18} height={22} rx={3} fill="#fbf8f1" />
            {hand(30, -158)}
          </>
        ) : (
          <>
            {arm('M31,-236 L40,-176 L36,-128')}
            {hand(36, -126)}
          </>
        )}
        <Head hx={0} hy={-280} look={look} back={back} />
      </g>
    )
  }

  return <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>{body}</g>
}

/** Head-and-shoulders bust, used in video tiles and small portraits. */
export function Bust({ x, y, s = 1, look }: { x: number; y: number; s?: number; look: Look }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-46,0 Q-46,-40 -22,-46 L22,-46 Q46,-40 46,0 Z" fill={look.top} />
      <Head hx={0} hy={-72} look={look} />
    </g>
  )
}

/* ------------------------------------------------------------------ nature & architecture */

export function Tree({ x, y, s = 1, p, seed = 1, kind = 'round' }: { x: number; y: number; s?: number; p: Palette; seed?: number; kind?: 'round' | 'tall' }) {
  const r = rng(seed)
  const blobs = Array.from({ length: kind === 'tall' ? 9 : 11 }, () => ({
    dx: (r() - 0.5) * (kind === 'tall' ? 90 : 170),
    dy: -r() * (kind === 'tall' ? 260 : 150),
    rr: 40 + r() * 34,
  }))
  const top = kind === 'tall' ? -170 : -250
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={10} cy={0} rx={90} ry={12} fill="#14213a" opacity="0.12" />
      <path d="M-9,0 L-6,-190 L6,-190 L10,0 Z" fill={p.trunk} />
      <path d="M-2,-120 L-40,-170 M2,-140 L36,-196" stroke={p.trunk} strokeWidth="7" strokeLinecap="round" />
      <g transform={`translate(0 ${top})`}>
        {blobs.map((b, i) => (
          <circle key={i} cx={b.dx} cy={b.dy} r={b.rr} fill={p.foliage} />
        ))}
        {blobs.slice(0, 6).map((b, i) => (
          <circle key={`l${i}`} cx={b.dx - b.rr * 0.25} cy={b.dy - b.rr * 0.3} r={b.rr * 0.6} fill={p.foliageLit} opacity="0.85" />
        ))}
        {blobs.slice(6).map((b, i) => (
          <circle key={`d${i}`} cx={b.dx + b.rr * 0.3} cy={b.dy + b.rr * 0.4} r={b.rr * 0.55} fill={p.foliageDark} opacity="0.5" />
        ))}
      </g>
    </g>
  )
}

export function Plant({ x, y, s = 1, p, pot }: { x: number; y: number; s?: number; p: Palette; pot?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-50, -25, 0, 22, 48].map((a, i) => (
        <path key={i} d={`M0,-40 Q${a * 0.8},-${110 + i * 8} ${a * 1.6},-${120 + (i % 2) * 40}`} stroke={i % 2 ? p.foliage : p.foliageDark} strokeWidth="5" fill="none" />
      ))}
      {[-60, -36, -12, 14, 38, 62].map((a, i) => (
        <ellipse key={i} cx={a * 1.2} cy={-120 - (i % 3) * 22} rx={20} ry={9} fill={i % 2 ? p.foliageLit : p.foliage} transform={`rotate(${a * 0.6} ${a * 1.2} ${-120 - (i % 3) * 22})`} />
      ))}
      <path d="M-30,-44 L30,-44 L24,0 L-24,0 Z" fill={pot ?? p.coral} />
      <rect x={-33} y={-50} width={66} height={10} rx={3} fill={pot ?? p.coral} />
      <rect x={-33} y={-50} width={66} height={10} rx={3} fill="#000" opacity="0.1" />
    </g>
  )
}

/** Multi-pane window showing sky (and optionally trees) outside. */
export function Window({ id, p, x, y, w, h, cols = 3, rows = 4, arch = false, outside = 'trees', frame }: { id: string; p: Palette; x: number; y: number; w: number; h: number; cols?: number; rows?: number; arch?: boolean; outside?: 'trees' | 'sky' | 'city'; frame?: string }) {
  const r = rng(x + y)
  const clip = `${id}-win-${x}-${y}`
  const shape = arch ? `M${x},${y + h} L${x},${y + w / 2} A${w / 2},${w / 2} 0 0 1 ${x + w},${y + w / 2} L${x + w},${y + h} Z` : `M${x},${y} H${x + w} V${y + h} H${x} Z`
  const fc = frame ?? p.paper
  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <path d={shape} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-sky)`} />
        {outside === 'trees' &&
          Array.from({ length: 9 }, (_, i) => <circle key={i} cx={x + r() * w} cy={y + h * (0.55 + r() * 0.35)} r={30 + r() * 50} fill={i % 3 ? p.foliage : p.foliageLit} opacity="0.85" />)}
        {outside === 'city' &&
          Array.from({ length: 7 }, (_, i) => {
            const bw = 40 + r() * 60
            const bh = h * (0.25 + r() * 0.35)
            return <rect key={i} x={x + (i / 7) * w} y={y + h - bh} width={bw} height={bh} fill={i % 2 ? p.blueSoft : p.stoneShade} opacity="0.8" />
          })}
        <rect x={x} y={y} width={w} height={h} fill={p.glow} opacity={p.mood === 'evening' ? 0.08 : 0.25} />
      </g>
      <path d={shape} fill="none" stroke={fc} strokeWidth="12" />
      {Array.from({ length: cols - 1 }, (_, i) => (
        <line key={`c${i}`} x1={x + ((i + 1) * w) / cols} y1={y} x2={x + ((i + 1) * w) / cols} y2={y + h} stroke={fc} strokeWidth="6" clipPath={`url(#${clip})`} />
      ))}
      {Array.from({ length: rows - 1 }, (_, i) => (
        <line key={`r${i}`} x1={x} y1={y + ((i + 1) * h) / rows} x2={x + w} y2={y + ((i + 1) * h) / rows} stroke={fc} strokeWidth="6" clipPath={`url(#${clip})`} />
      ))}
      <rect x={x - 14} y={y + h} width={w + 28} height={12} rx={2} fill={fc} />
      <rect x={x - 14} y={y + h + 8} width={w + 28} height={4} fill="#000" opacity="0.08" />
    </g>
  )
}

export function PendantLamp({ x, y, len = 120, p, color }: { x: number; y: number; len?: number; p: Palette; color?: string }) {
  const c = color ?? p.navy
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y + len} stroke={p.navy} strokeWidth="2" />
      {p.lampOn > 0.5 && <ellipse cx={x} cy={y + len + 60} rx={90} ry={60} fill={p.glow} opacity={0.22 * p.lampOn} />}
      <path d={`M${x - 34},${y + len + 30} Q${x - 30},${y + len} ${x},${y + len} Q${x + 30},${y + len} ${x + 34},${y + len + 30} Z`} fill={c} />
      <ellipse cx={x} cy={y + len + 30} rx={34} ry={6} fill={p.glow} opacity={0.4 + 0.5 * p.lampOn} />
    </g>
  )
}

/** A run of book spines on a shelf. */
export function Books({ x, y, w, h = 70, seed = 1, p }: { x: number; y: number; w: number; h?: number; seed?: number; p: Palette }) {
  const r = rng(seed)
  const colors = [p.navy, p.blue, p.greenDeep, p.green, p.yellow, p.coral, p.paper, p.woodDark, p.blueSoft]
  const out: ReactNode[] = []
  let cx = x
  let i = 0
  while (cx < x + w - 10) {
    const bw = 9 + r() * 14
    const bh = h * (0.68 + r() * 0.32)
    const lean = r() < 0.08
    out.push(
      <rect key={i} x={cx} y={y - bh} width={bw} height={bh} rx={1.5} fill={pick(r, colors)} transform={lean ? `rotate(${8} ${cx} ${y})` : undefined} />,
    )
    if (r() < 0.5) out.push(<rect key={`b${i}`} x={cx + 2} y={y - bh + 8} width={bw - 4} height={3} fill="#fff" opacity="0.35" />)
    cx += bw + 1.5 + (lean ? 8 : 0)
    if (r() < 0.06) cx += 26
    i++
  }
  return <g>{out}</g>
}

export function Laptop({ x, y, s = 1, p, facing = 'away', screen }: { x: number; y: number; s?: number; p: Palette; facing?: 'away' | 'toward' | 'side'; screen?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {facing === 'away' ? (
        <>
          <path d="M-46,0 L-40,-62 L40,-62 L46,0 Z" fill="#aab4c2" />
          <circle cx={0} cy={-32} r={5} fill="#fff" opacity="0.5" />
          <rect x={-52} y={-4} width={104} height={6} rx={2} fill="#8a95a5" />
        </>
      ) : facing === 'side' ? (
        <>
          <path d="M-40,0 L40,0 L42,-4 L-38,-4 Z" fill="#8a95a5" />
          <path d="M34,-4 L46,-66" stroke="#8a95a5" strokeWidth="6" strokeLinecap="round" />
        </>
      ) : (
        <>
          <rect x={-46} y={-66} width={92} height={62} rx={4} fill="#2b3446" />
          <rect x={-40} y={-60} width={80} height={50} rx={2} fill={screen ?? p.blueSoft} opacity={0.75 + 0.25 * p.lampOn} />
          <path d="M-56,0 L56,0 L46,-6 L-46,-6 Z" fill="#aab4c2" />
        </>
      )}
    </g>
  )
}

export function Mug({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g>
      <rect x={x} y={y - 26} width={22} height={26} rx={3} fill={color} />
      <path d={`M${x + 22},${y - 20} q10,0 10,8 q0,8 -10,8`} stroke={color} strokeWidth="4" fill="none" />
    </g>
  )
}

/** A loose sheet of paper with scribbled lines (sketches, notes, pinned work). */
export function Sheet({ x, y, w, h, rot = 0, fill = '#fbf8f1', seed = 1, ink = '#4f6f97', pin }: { x: number; y: number; w: number; h: number; rot?: number; fill?: string; seed?: number; ink?: string; pin?: string }) {
  const r = rng(seed)
  const kind = Math.floor(r() * 3)
  return (
    <g transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}>
      <rect x={x + 3} y={y + 4} width={w} height={h} fill="#14213a" opacity="0.1" />
      <rect x={x} y={y} width={w} height={h} fill={fill} />
      {kind === 0 &&
        Array.from({ length: Math.floor(h / 14) - 1 }, (_, i) => (
          <rect key={i} x={x + w * 0.12} y={y + 12 + i * 14} width={w * (0.4 + r() * 0.45)} height={3} rx={1.5} fill={ink} opacity="0.45" />
        ))}
      {kind === 1 && (
        <>
          <rect x={x + w * 0.12} y={y + h * 0.14} width={w * 0.76} height={h * 0.42} rx={3} fill={ink} opacity="0.25" />
          <rect x={x + w * 0.12} y={y + h * 0.66} width={w * 0.6} height={4} rx={2} fill={ink} opacity="0.5" />
          <rect x={x + w * 0.12} y={y + h * 0.78} width={w * 0.4} height={4} rx={2} fill={ink} opacity="0.35" />
        </>
      )}
      {kind === 2 && (
        <>
          <circle cx={x + w * 0.5} cy={y + h * 0.42} r={Math.min(w, h) * 0.24} fill="none" stroke={ink} strokeWidth="3" opacity="0.6" />
          <path d={`M${x + w * 0.15},${y + h * 0.82} Q${x + w * 0.5},${y + h * 0.62} ${x + w * 0.85},${y + h * 0.8}`} stroke={ink} strokeWidth="3" fill="none" opacity="0.5" />
        </>
      )}
      {pin && <circle cx={x + w / 2} cy={y + 6} r={5} fill={pin} />}
    </g>
  )
}

/** Simple chair seen from the side. */
export function Chair({ x, y, p, facing = 1, color }: { x: number; y: number; p: Palette; facing?: 1 | -1; color?: string }) {
  const c = color ?? p.woodDark
  return (
    <g transform={`translate(${x} ${y}) scale(${facing} 1)`}>
      <path d="M-30,-118 L40,-118" stroke={c} strokeWidth="10" strokeLinecap="round" />
      <path d="M-30,-118 L-34,-250" stroke={c} strokeWidth="9" strokeLinecap="round" />
      <path d="M-26,-118 L-30,0 M34,-118 L38,0" stroke={c} strokeWidth="7" strokeLinecap="round" />
    </g>
  )
}
