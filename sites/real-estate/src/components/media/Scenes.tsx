import type { ReactElement } from 'react'
import type { MediaAsset, SceneName, SceneTone } from '../../content/types'

/**
 * Art-directed architectural illustrations in the brand palette. They stand in for
 * photography in the pitch prototype; every scene is a plain SVG (no network, no layout shift)
 * and crops gracefully via `preserveAspectRatio="xMidYMid slice"`.
 */

interface Palette {
  skyTop: string
  skyMid: string
  skyBottom: string
  sun: string
  hillFar: string
  hillNear: string
  foliage: [string, string, string]
  trunk: string
  wall: string
  wallShade: string
  render: string
  timber: string
  timberDark: string
  roof: string
  glass: string
  glassHi: string
  glow: string
  ground: string
  groundShade: string
  water: string
  waterHi: string
  interiorWall: string
  interiorShade: string
  floor: string
  floorShade: string
  fabric: string
  fabricShade: string
  ink: string
  beam: number
}

const palettes: Record<SceneTone, Palette> = {
  day: {
    skyTop: '#c3cfcd',
    skyMid: '#dcdfd6',
    skyBottom: '#efe9dc',
    sun: '#fffbf2',
    hillFar: '#b6bba6',
    hillNear: '#9aa384',
    foliage: ['#6e7a57', '#56613f', '#8a9469'],
    trunk: '#5a4a3a',
    wall: '#b98f6f',
    wallShade: '#9e7559',
    render: '#efe9de',
    timber: '#a98463',
    timberDark: '#7d5f45',
    roof: '#4d4b47',
    glass: '#9fb2b2',
    glassHi: '#dbe4e0',
    glow: '#fffaf0',
    ground: '#c9bfa8',
    groundShade: '#b3a88f',
    water: '#a5b8b5',
    waterHi: '#dfe8e3',
    interiorWall: '#ece5d9',
    interiorShade: '#ddd3c3',
    floor: '#c8b292',
    floorShade: '#b39a78',
    fabric: '#ddd2c0',
    fabricShade: '#c6b8a2',
    ink: '#2b2a26',
    beam: 0.55,
  },
  golden: {
    skyTop: '#d9bf9b',
    skyMid: '#ead6b8',
    skyBottom: '#f6ebd8',
    sun: '#fff1d6',
    hillFar: '#c2b48f',
    hillNear: '#a59a70',
    foliage: ['#7b7c50', '#62643c', '#9a9864'],
    trunk: '#5e4a36',
    wall: '#c2916b',
    wallShade: '#a57452',
    render: '#f3e9d8',
    timber: '#b0865d',
    timberDark: '#835f3f',
    roof: '#56504a',
    glass: '#c7b497',
    glassHi: '#f5e4c4',
    glow: '#ffe7bd',
    ground: '#d2c09d',
    groundShade: '#bba783',
    water: '#bfb497',
    waterHi: '#f2e3c2',
    interiorWall: '#efe3cf',
    interiorShade: '#dfcfb6',
    floor: '#c9a87f',
    floorShade: '#ad8a62',
    fabric: '#e6d6bc',
    fabricShade: '#cdb999',
    ink: '#2d2924',
    beam: 0.75,
  },
  dusk: {
    skyTop: '#2c303c',
    skyMid: '#5d5862',
    skyBottom: '#b48c74',
    sun: '#f2c48f',
    hillFar: '#4c4a4a',
    hillNear: '#383836',
    foliage: ['#3b3e31', '#2c2f25', '#4b4e3c'],
    trunk: '#2a2621',
    wall: '#7c5f4c',
    wallShade: '#634a3b',
    render: '#b9ad9c',
    timber: '#6e5440',
    timberDark: '#4f3c2e',
    roof: '#262522',
    glass: '#e9b877',
    glassHi: '#ffd9a1',
    glow: '#ffcf8c',
    ground: '#5a554c',
    groundShade: '#48443d',
    water: '#3f4651',
    waterHi: '#d8a56f',
    interiorWall: '#c9b8a0',
    interiorShade: '#ab9a83',
    floor: '#8a6d50',
    floorShade: '#6f563f',
    fabric: '#b8a68c',
    fabricShade: '#9c8b72',
    ink: '#1f1d1a',
    beam: 0.35,
  },
}

/** Deterministic pseudo-random for window patterns, so renders are stable. */
const rand = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

type SceneProps = { p: Palette; id: string; tone: SceneTone; view?: MediaAsset['view'] }

export function Scene({ asset, id }: { asset: MediaAsset; id: string }) {
  const tone = asset.tone ?? 'day'
  const p = palettes[tone]
  const Component = scenes[asset.scene]
  return <Component p={p} id={id} tone={tone} view={asset.view} />
}

/* ------------------------------------------------------------ Shared bits */

function Sky({ p, id, w = 800, h = 600 }: { p: Palette; id: string; w?: number; h?: number }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.skyTop} />
          <stop offset="0.55" stopColor={p.skyMid} />
          <stop offset="1" stopColor={p.skyBottom} />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="0.72" cy="0.62" r="0.55">
          <stop offset="0" stopColor={p.sun} stopOpacity="0.9" />
          <stop offset="1" stopColor={p.sun} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${id}-sky)`} />
      <rect width={w} height={h} fill={`url(#${id}-sun)`} />
    </>
  )
}

function Clouds({ p, y = 90, opacity = 0.5 }: { p: Palette; y?: number; opacity?: number }) {
  return (
    <g fill={p.sun} opacity={opacity}>
      <ellipse cx="160" cy={y} rx="90" ry="9" />
      <ellipse cx="210" cy={y - 10} rx="50" ry="8" />
      <ellipse cx="560" cy={y + 40} rx="120" ry="8" />
      <ellipse cx="620" cy={y + 31} rx="60" ry="7" />
    </g>
  )
}

function Tree({ x, y, s = 1, p, kind = 'round' }: { x: number; y: number; s?: number; p: Palette; kind?: 'round' | 'cypress' | 'olive' }) {
  if (kind === 'cypress') {
    return (
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <path d="M0 0c-14-40-16-110 0-170 16 60 14 130 0 170Z" fill={p.foliage[1]} />
        <path d="M0 0c-6-40-4-110 0-170 10 60 10 130 0 170Z" fill={p.foliage[0]} opacity="0.6" />
      </g>
    )
  }
  if (kind === 'olive') {
    return (
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <path d="M-3 0c2-30-6-50-14-64M3 0c0-30 8-50 18-62M0 -20c-2-16 2-30 0-44" stroke={p.trunk} strokeWidth="5" fill="none" strokeLinecap="round" />
        <ellipse cx="-22" cy="-74" rx="30" ry="18" fill={p.foliage[2]} />
        <ellipse cx="20" cy="-80" rx="34" ry="20" fill={p.foliage[0]} />
        <ellipse cx="-2" cy="-98" rx="30" ry="18" fill={p.foliage[2]} opacity="0.9" />
      </g>
    )
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-4 0v-60M4 0v-60" stroke={p.trunk} strokeWidth="6" />
      <circle cx="0" cy="-95" r="48" fill={p.foliage[1]} />
      <circle cx="-26" cy="-78" r="32" fill={p.foliage[0]} />
      <circle cx="24" cy="-112" r="30" fill={p.foliage[2]} opacity="0.85" />
      <circle cx="28" cy="-74" r="28" fill={p.foliage[0]} opacity="0.9" />
    </g>
  )
}

function WindowView({ p, view, id, x, y, w, h }: { p: Palette; view: NonNullable<MediaAsset['view']>; id: string; x: number; y: number; w: number; h: number }) {
  const horizon = y + h * 0.62
  return (
    <g>
      <defs>
        <clipPath id={`${id}-win`}>
          <rect x={x} y={y} width={w} height={h} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-win)`}>
        <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-sky)`} />
        <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-sun)`} />
        {view === 'sea' && (
          <>
            <rect x={x} y={horizon} width={w} height={h} fill={p.water} />
            <path d={`M${x} ${horizon + 18}h${w}M${x} ${horizon + 40}h${w}M${x} ${horizon + 70}h${w}`} stroke={p.waterHi} strokeWidth="2" opacity="0.6" />
            <path d={`M${x} ${y + h}c80-40 160-30 240-20s160 10 ${w}-6V${y + h}Z`} fill={p.ground} />
          </>
        )}
        {view === 'city' && (
          <g>
            {Array.from({ length: 14 }).map((_, i) => {
              const bw = 30 + rand(i) * 40
              const bh = 60 + rand(i + 9) * 170
              const bx = x + i * (w / 13) - 10
              return (
                <g key={i}>
                  <rect x={bx} y={y + h - bh} width={bw} height={bh} fill={i % 3 ? p.hillFar : p.hillNear} />
                  {Array.from({ length: Math.floor(bh / 18) }).map((__, j) =>
                    rand(i * 20 + j) > 0.55 ? <rect key={j} x={bx + 6} y={y + h - bh + 8 + j * 18} width={bw - 12} height="5" fill={p.glow} opacity="0.55" /> : null,
                  )}
                </g>
              )
            })}
            <path d={`M${x + w * 0.62} ${y + h - 250}l10-70 10 70v250h-20Z`} fill={p.hillNear} />
          </g>
        )}
        {view === 'hills' && (
          <>
            <path d={`M${x} ${horizon}c120-60 220-40 320-10s200-50 ${w}-20V${y + h}H${x}Z`} fill={p.hillFar} />
            <path d={`M${x} ${horizon + 50}c140-40 260-20 380 10s180-30 ${w}-10V${y + h}H${x}Z`} fill={p.hillNear} />
          </>
        )}
        {view === 'garden' && (
          <>
            <path d={`M${x} ${horizon}c100-30 200-26 300-8s200 0 ${w}-14V${y + h}H${x}Z`} fill={p.hillFar} opacity="0.8" />
            <rect x={x} y={horizon + 40} width={w} height={h} fill={p.hillNear} />
            <Tree x={x + w * 0.2} y={horizon + 60} s={1.3} p={p} />
            <Tree x={x + w * 0.72} y={horizon + 70} s={1.6} p={p} />
            <Tree x={x + w * 0.48} y={horizon + 50} s={0.8} p={p} kind="cypress" />
          </>
        )}
      </g>
    </g>
  )
}

/* ------------------------------------------------------------------ Villa */

function Villa({ p, id, tone }: SceneProps) {
  const dusk = tone === 'dusk'
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <Sky p={p} id={id} />
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.glassHi} />
          <stop offset="1" stopColor={p.glass} />
        </linearGradient>
        <linearGradient id={`${id}-pool`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.water} />
          <stop offset="1" stopColor={dusk ? '#2c3139' : p.waterHi} />
        </linearGradient>
      </defs>
      {!dusk && <Clouds p={p} y={80} />}
      {dusk && <circle cx="660" cy="120" r="2" fill={p.glow} opacity="0.7" />}
      {/* Hills & background trees */}
      <path d="M0 360c110-40 230-50 360-30s250-30 440-10v160H0Z" fill={p.hillFar} />
      <Tree x={70} y={392} s={0.9} p={p} kind="cypress" />
      <Tree x={100} y={392} s={0.7} p={p} kind="cypress" />
      <Tree x={760} y={386} s={1} p={p} kind="round" />
      {/* Upper cantilevered volume — timber */}
      <rect x="250" y="190" width="480" height="110" fill={p.timber} />
      {Array.from({ length: 40 }).map((_, i) => (
        <path key={i} d={`M${256 + i * 12} 190v110`} stroke={p.timberDark} strokeWidth="1.2" opacity="0.45" />
      ))}
      <rect x="236" y="180" width="508" height="12" fill={p.roof} />
      {/* Upper glazing band */}
      <rect x="300" y="214" width="380" height="64" fill={`url(#${id}-glass)`} />
      {[395, 490, 585].map((x) => (
        <path key={x} d={`M${x} 214v64`} stroke={p.roof} strokeWidth="3" />
      ))}
      {dusk && <rect x="300" y="214" width="380" height="64" fill={p.glow} opacity="0.35" />}
      {/* Ground floor — rendered volume */}
      <rect x="110" y="300" width="560" height="150" fill={p.render} />
      <rect x="110" y="300" width="560" height="14" fill={p.ink} opacity="0.12" />
      <rect x="96" y="292" width="160" height="10" fill={p.roof} />
      {/* Ground floor glazing with interior */}
      <rect x="150" y="326" width="420" height="124" fill={`url(#${id}-glass)`} />
      {dusk ? (
        <g>
          <rect x="150" y="326" width="420" height="124" fill={p.glow} opacity="0.55" />
          <rect x="190" y="400" width="130" height="30" rx="4" fill={p.timberDark} opacity="0.75" />
          <rect x="370" y="380" width="8" height="70" fill={p.timberDark} opacity="0.6" />
          <circle cx="374" cy="372" r="12" fill="#fff1d2" />
          <rect x="430" y="404" width="110" height="10" fill={p.timberDark} opacity="0.7" />
        </g>
      ) : (
        <path d="M150 326h120L190 450h-40Z M330 326h60l-90 124h-60Z" fill="#fff" opacity="0.28" />
      )}
      {[255, 360, 465].map((x) => (
        <path key={x} d={`M${x} 326v124`} stroke={p.roof} strokeWidth="3" />
      ))}
      {/* Stone wing */}
      <rect x="590" y="330" width="80" height="120" fill={p.wallShade} opacity="0.35" />
      {/* Terrace & pool */}
      <path d="M0 450h800v150H0Z" fill={p.ground} />
      <path d="M0 450h800" stroke={p.groundShade} strokeWidth="3" />
      <rect x="120" y="480" width="560" height="64" fill={`url(#${id}-pool)`} />
      <rect x="120" y="480" width="560" height="64" fill="none" stroke={p.render} strokeWidth="6" />
      {/* Pool reflection of the house */}
      <rect x="150" y="486" width="420" height="22" fill={dusk ? p.glow : p.glassHi} opacity={dusk ? 0.45 : 0.4} />
      <rect x="300" y="514" width="380" height="10" fill={dusk ? p.glow : p.glassHi} opacity={dusk ? 0.3 : 0.25} />
      {/* Loungers */}
      <g fill={p.render} opacity="0.95">
        <path d="M190 570h80l14-16h-20l-8 8h-66Z" />
        <path d="M310 570h80l14-16h-20l-8 8h-66Z" />
      </g>
      <Tree x={720} y={470} s={1.1} p={p} kind="olive" />
      <rect x="696" y="466" width="50" height="40" fill={p.wallShade} />
    </svg>
  )
}

/* --------------------------------------------------------------- Interior */

function Interior({ p, id, view = 'garden', tone }: SceneProps) {
  const dusk = tone === 'dusk'
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.skyTop} />
          <stop offset="0.55" stopColor={p.skyMid} />
          <stop offset="1" stopColor={p.skyBottom} />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="0.72" cy="0.62" r="0.55">
          <stop offset="0" stopColor={p.sun} stopOpacity="0.9" />
          <stop offset="1" stopColor={p.sun} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor={p.interiorShade} />
          <stop offset="0.5" stopColor={p.interiorWall} />
          <stop offset="1" stopColor={p.interiorShade} />
        </linearGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.floor} />
          <stop offset="1" stopColor={p.floorShade} />
        </linearGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.sun} stopOpacity={p.beam} />
          <stop offset="1" stopColor={p.sun} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-lamp`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={p.glow} stopOpacity="0.9" />
          <stop offset="1" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#${id}-wall)`} />
      {/* Ceiling line */}
      <path d="M0 34h800" stroke={p.interiorShade} strokeWidth="2" />
      {/* Large window wall */}
      <WindowView p={p} view={view} id={id} x={300} y={70} w={440} h={380} />
      <g stroke={p.ink} strokeWidth="5" fill="none">
        <rect x="300" y="70" width="440" height="380" />
        <path d="M447 70v380M593 70v380" />
      </g>
      {/* Floor */}
      <path d="M0 450h800v150H0Z" fill={`url(#${id}-floor)`} />
      {Array.from({ length: 12 }).map((_, i) => (
        <path key={i} d={`M${-200 + i * 100} 600L${200 + i * 50} 450`} stroke={p.floorShade} strokeWidth="1" opacity="0.4" />
      ))}
      {/* Light falling across floor */}
      <path d="M300 450h440l60 150H180Z" fill={`url(#${id}-beam)`} />
      {/* Artwork */}
      <rect x="64" y="120" width="150" height="190" fill={p.render} stroke={p.timberDark} strokeWidth="4" />
      <path d="M84 260c30-50 60-70 110-90M84 290c40-20 80-30 110-30" stroke={p.timber} strokeWidth="6" fill="none" opacity="0.7" />
      <circle cx="160" cy="180" r="22" fill={p.foliage[2]} opacity="0.6" />
      {/* Pendant */}
      <path d="M250 34v120" stroke={p.ink} strokeWidth="1.5" />
      <path d="M226 154h48l-6 20h-36Z" fill={p.ink} />
      {dusk && <circle cx="250" cy="190" r="70" fill={`url(#${id}-lamp)`} />}
      {/* Rug */}
      <ellipse cx="330" cy="540" rx="300" ry="42" fill={p.fabric} opacity="0.85" />
      {/* Sofa */}
      <g>
        <rect x="80" y="404" width="380" height="64" rx="10" fill={p.fabricShade} />
        <rect x="70" y="440" width="400" height="62" rx="12" fill={p.fabric} />
        <rect x="96" y="420" width="110" height="40" rx="10" fill={p.fabric} />
        <rect x="216" y="420" width="110" height="40" rx="10" fill={p.fabric} />
        <rect x="336" y="420" width="110" height="40" rx="10" fill={p.fabric} />
        <rect x="120" y="410" width="54" height="40" rx="8" fill={p.foliage[2]} opacity="0.85" />
        <rect x="390" y="412" width="50" height="38" rx="8" fill={p.timber} opacity="0.85" />
        <path d="M90 502v14M450 502v14" stroke={p.ink} strokeWidth="5" strokeLinecap="round" />
      </g>
      {/* Coffee table */}
      <ellipse cx="300" cy="548" rx="90" ry="14" fill={p.timberDark} />
      <ellipse cx="300" cy="544" rx="90" ry="14" fill={p.timber} />
      <rect x="270" y="526" width="34" height="10" fill={p.render} />
      <path d="M330 536c0-14 10-22 18-22s16 8 16 22Z" fill={p.render} />
      {/* Floor lamp */}
      <path d="M540 520V250c0-30 30-50 70-50" stroke={p.ink} strokeWidth="3" fill="none" />
      <path d="M590 196h44l10 26h-64Z" fill={p.ink} />
      {dusk && <circle cx="612" cy="240" r="60" fill={`url(#${id}-lamp)`} />}
      <ellipse cx="540" cy="522" rx="26" ry="5" fill={p.ink} />
      {/* Lounge chair */}
      <g>
        <path d="M620 470c-6-40 6-70 50-74h30c36 4 44 34 40 74Z" fill={p.timberDark} />
        <rect x="610" y="462" width="140" height="40" rx="10" fill={p.fabricShade} />
        <path d="M624 502l-8 34M736 502l8 34" stroke={p.ink} strokeWidth="5" strokeLinecap="round" />
      </g>
      {/* Plant */}
      <path d="M752 590h44l-6-60h-32Z" fill={p.render} />
      <g fill={p.foliage[0]}>
        <path d="M774 530c-20-50-50-70-70-74 12 26 30 54 70 74Z" />
        <path d="M776 530c-2-70 18-110 40-136-2 40-12 96-40 136Z" fill={p.foliage[2]} />
        <path d="M774 530c-20-30-26-70-20-100 18 26 28 60 20 100Z" fill={p.foliage[1]} />
      </g>
      {dusk && <rect width="800" height="600" fill="#1c1a24" opacity="0.18" />}
    </svg>
  )
}

/* ---------------------------------------------------------------- Kitchen */

function Kitchen({ p, id, tone }: SceneProps) {
  const dusk = tone === 'dusk'
  const cabinet = dusk ? '#2d2f27' : '#5c6447'
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.skyTop} />
          <stop offset="1" stopColor={p.skyBottom} />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="0.6" cy="0.6" r="0.6">
          <stop offset="0" stopColor={p.sun} stopOpacity="0.8" />
          <stop offset="1" stopColor={p.sun} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-stone`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#efebe3" />
          <stop offset="1" stopColor="#ddd6ca" />
        </linearGradient>
        <radialGradient id={`${id}-lamp`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={p.glow} stopOpacity="0.85" />
          <stop offset="1" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill={p.interiorWall} />
      <rect x="0" y="0" width="800" height="40" fill={p.interiorShade} />
      {/* Window */}
      <WindowView p={p} view="garden" id={id} x={480} y={90} w={250} h={250} />
      <rect x="480" y="90" width="250" height="250" fill="none" stroke={p.ink} strokeWidth="5" />
      <path d="M605 90v250" stroke={p.ink} strokeWidth="4" />
      {/* Tall cabinetry */}
      <rect x="40" y="60" width="380" height="390" fill={cabinet} />
      {[135, 230, 325].map((x) => (
        <path key={x} d={`M${x} 60v390`} stroke="#000" strokeOpacity="0.25" strokeWidth="2" />
      ))}
      {[120, 150, 215, 245, 310, 340].map((x) => (
        <path key={x} d={`M${x} 230v36`} stroke="#c9b48e" strokeWidth="3" strokeLinecap="round" />
      ))}
      {/* Open shelf with ceramics */}
      <rect x="480" y="370" width="250" height="8" fill={p.timber} />
      <g fill={p.render}>
        <rect x="500" y="344" width="22" height="26" rx="3" />
        <path d="M540 370c0-18 8-28 18-28s18 10 18 28Z" />
        <rect x="600" y="350" width="40" height="20" rx="3" fill={p.fabricShade} />
        <circle cx="680" cy="358" r="12" fill={p.foliage[2]} />
      </g>
      {/* Floor */}
      <rect x="0" y="450" width="800" height="150" fill={p.floor} />
      {Array.from({ length: 10 }).map((_, i) => (
        <path key={i} d={`M0 ${460 + i * 16}h800`} stroke={p.floorShade} strokeOpacity="0.35" />
      ))}
      {/* Island */}
      <rect x="120" y="398" width="560" height="22" fill={`url(#${id}-stone)`} />
      <rect x="140" y="420" width="520" height="120" fill={cabinet} />
      <rect x="140" y="420" width="520" height="120" fill="#fff" opacity="0.06" />
      {/* Stools */}
      {[220, 400, 580].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="476" rx="34" ry="8" fill={p.timber} />
          <path d={`M${x - 24} 478l-10 92M${x + 24} 478l10 92M${x - 28} 530h56`} stroke={p.timberDark} strokeWidth="5" strokeLinecap="round" />
        </g>
      ))}
      {/* Items on island */}
      <path d="M300 398c0-20 10-30 24-30s24 10 24 30Z" fill={p.render} />
      <rect x="470" y="374" width="54" height="24" rx="4" fill={p.timber} />
      <path d="M560 398v-30M560 368c-10-10-14-26-4-36M560 368c10-10 18-14 26-12" stroke={p.foliage[1]} strokeWidth="3" fill="none" />
      {/* Pendants */}
      {[250, 400, 550].map((x) => (
        <g key={x}>
          <path d={`M${x} 0v150`} stroke={p.ink} strokeWidth="1.5" />
          <circle cx={x} cy="172" r="22" fill={dusk ? p.glow : p.render} stroke={p.ink} strokeOpacity="0.15" />
          {dusk && <circle cx={x} cy="190" r="80" fill={`url(#${id}-lamp)`} />}
        </g>
      ))}
    </svg>
  )
}

/* ---------------------------------------------------------------- Bedroom */

function Bedroom({ p, id, tone }: SceneProps) {
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.skyTop} />
          <stop offset="1" stopColor={p.skyBottom} />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="0.6" cy="0.6" r="0.6">
          <stop offset="0" stopColor={p.sun} stopOpacity="0.8" />
          <stop offset="1" stopColor={p.sun} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.sun} stopOpacity={p.beam} />
          <stop offset="1" stopColor={p.sun} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill={p.interiorWall} />
      {/* Window with river view */}
      <WindowView p={p} view={tone === 'golden' ? 'sea' : 'hills'} id={id} x={540} y={80} w={200} h={330} />
      <rect x="540" y="80" width="200" height="330" fill="none" stroke={p.ink} strokeWidth="4" />
      <path d="M640 80v330M540 245h200" stroke={p.ink} strokeWidth="3" />
      {/* Curtain */}
      <path d="M520 60h28v390h-28c-6-80 6-160 0-230s-6-110 0-160Z" fill={p.fabric} />
      <path d="M752 60h24v390h-24c6-90-6-180 0-260 4-50 4-90 0-130Z" fill={p.fabric} />
      {/* Light beam */}
      <path d="M540 80h200L520 600H80Z" fill={`url(#${id}-beam)`} opacity="0.7" />
      {/* Floor */}
      <rect x="0" y="470" width="800" height="130" fill={p.floor} />
      {/* Headboard */}
      <rect x="90" y="250" width="360" height="200" rx="6" fill={p.timber} />
      {Array.from({ length: 11 }).map((_, i) => (
        <path key={i} d={`M${110 + i * 32} 256v190`} stroke={p.timberDark} strokeOpacity="0.4" />
      ))}
      {/* Bed */}
      <rect x="70" y="390" width="400" height="110" rx="8" fill={p.render} />
      <path d="M70 440h400v60H70Z" fill={p.fabricShade} />
      <path d="M70 440c80 14 300 10 400-4" stroke={p.render} strokeWidth="4" fill="none" />
      <rect x="110" y="356" width="130" height="50" rx="14" fill="#f7f2ea" />
      <rect x="260" y="356" width="130" height="50" rx="14" fill="#f7f2ea" />
      <rect x="180" y="378" width="120" height="36" rx="10" fill={p.foliage[2]} opacity="0.75" />
      {/* Side table & lamp */}
      <rect x="480" y="410" width="54" height="80" fill={p.timberDark} />
      <path d="M494 410v-50M484 360h30l-6-30h-18Z" stroke={p.ink} strokeWidth="2" fill={p.render} />
      {/* Art */}
      <rect x="170" y="110" width="200" height="110" fill={p.render} stroke={p.timberDark} strokeWidth="3" />
      <path d="M180 200c40-30 70-40 100-30s50-10 80-30" stroke={p.hillNear} strokeWidth="5" fill="none" />
    </svg>
  )
}

/* -------------------------------------------------------------- Townhouse */

function Townhouse({ p, id }: SceneProps) {
  const sash = (x: number, y: number, w: number, h: number, k: string) => (
    <g key={k}>
      <rect x={x - 6} y={y - 6} width={w + 12} height={h + 12} fill={p.render} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-glass)`} />
      <path d={`M${x} ${y + h / 2}h${w}M${x + w / 2} ${y}v${h}M${x} ${y + h / 4}h${w}M${x} ${y + (3 * h) / 4}h${w}`} stroke={p.render} strokeWidth="3" />
      <rect x={x - 10} y={y + h + 6} width={w + 20} height="8" fill={p.render} />
    </g>
  )
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <Sky p={p} id={id} />
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.glassHi} />
          <stop offset="1" stopColor={p.ink} stopOpacity="0.75" />
        </linearGradient>
        <pattern id={`${id}-brick`} width="36" height="16" patternUnits="userSpaceOnUse">
          <rect width="36" height="16" fill={p.wall} />
          <path d="M0 15.5h36M18 0v8M0 8h36M0 8v8M36 8v8" stroke={p.wallShade} strokeWidth="1" opacity="0.55" />
        </pattern>
      </defs>
      {/* Neighbouring houses */}
      <rect x="-20" y="60" width="200" height="540" fill="#c9cdbd" />
      <rect x="620" y="40" width="200" height="560" fill={p.render} />
      <rect x="610" y="40" width="10" height="560" fill={p.wallShade} opacity="0.4" />
      {sash(30, 140, 90, 140, 'l1')}
      {sash(680, 140, 90, 140, 'r1')}
      {sash(680, 340, 90, 120, 'r2')}
      {/* Main facade */}
      <rect x="180" y="30" width="440" height="570" fill={`url(#${id}-brick)`} />
      <rect x="170" y="22" width="460" height="16" fill={p.render} />
      <rect x="180" y="400" width="440" height="200" fill={p.render} />
      {Array.from({ length: 6 }).map((_, i) => (
        <path key={i} d={`M180 ${420 + i * 30}h440`} stroke={p.groundShade} strokeOpacity="0.5" />
      ))}
      <rect x="170" y="394" width="460" height="10" fill={p.render} />
      {sash(220, 80, 90, 130, 'a')}
      {sash(355, 80, 90, 130, 'b')}
      {sash(490, 80, 90, 130, 'c')}
      {sash(220, 250, 90, 120, 'd')}
      {sash(355, 250, 90, 120, 'e')}
      {sash(490, 250, 90, 120, 'f')}
      {/* Balconette railings */}
      {[215, 350, 485].map((x) => (
        <g key={x} stroke={p.ink} strokeWidth="2">
          <path d={`M${x} 360h100`} />
          {Array.from({ length: 11 }).map((_, i) => (
            <path key={i} d={`M${x + i * 10} 340v20`} />
          ))}
        </g>
      ))}
      {/* Door with fanlight */}
      <path d="M340 600V480a60 60 0 0 1 120 0v120Z" fill={p.render} />
      <path d="M352 600V480a48 48 0 0 1 96 0v120Z" fill={p.ink} />
      <path d="M352 480a48 48 0 0 1 96 0Z" fill={`url(#${id}-glass)`} />
      {Array.from({ length: 5 }).map((_, i) => (
        <path key={i} d={`M400 480L${352 + i * 24} ${480 - Math.sin((i * Math.PI) / 4) * 46}`} stroke={p.render} strokeWidth="1.5" />
      ))}
      <rect x="364" y="500" width="72" height="44" fill="none" stroke="#000" strokeOpacity="0.35" />
      <circle cx="400" cy="560" r="4" fill="#c9a86a" />
      {sash(220, 440, 90, 110, 'g')}
      {sash(490, 440, 90, 110, 'h')}
      {/* Railings & steps */}
      <g stroke={p.ink} strokeWidth="2.5">
        <path d="M180 560h150M470 560h150" />
        {Array.from({ length: 16 }).map((_, i) => (
          <path key={i} d={`M${184 + i * 9.5} 560v40`} />
        ))}
        {Array.from({ length: 16 }).map((_, i) => (
          <path key={i} d={`M${474 + i * 9.5} 560v40`} />
        ))}
      </g>
      <rect x="330" y="588" width="140" height="12" fill={p.groundShade} />
      {/* Planter */}
      <rect x="296" y="560" width="30" height="30" fill={p.ink} />
      <circle cx="311" cy="548" r="18" fill={p.foliage[0]} />
      <rect x="474" y="560" width="30" height="30" fill={p.ink} />
      <circle cx="489" cy="548" r="18" fill={p.foliage[0]} />
    </svg>
  )
}

/* -------------------------------------------------------------- Apartment */

function Apartment({ p, id, tone }: SceneProps) {
  const dusk = tone === 'dusk'
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <Sky p={p} id={id} />
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.glassHi} />
          <stop offset="1" stopColor={p.glass} />
        </linearGradient>
      </defs>
      {!dusk && <Clouds p={p} y={60} />}
      {/* Rear block */}
      <rect x="520" y="140" width="260" height="400" fill={p.hillFar} opacity="0.7" />
      {/* Main block */}
      <rect x="120" y="70" width="460" height="480" fill={p.render} />
      <rect x="120" y="70" width="40" height="480" fill={p.wallShade} opacity="0.18" />
      {Array.from({ length: 6 }).map((_, row) => {
        const y = 90 + row * 76
        return (
          <g key={row}>
            {[150, 300, 450].map((x, col) => (
              <g key={col}>
                <rect x={x} y={y} width="100" height="56" fill={`url(#${id}-glass)`} />
                {dusk && rand(row * 3 + col) > 0.35 && <rect x={x} y={y} width="100" height="56" fill={p.glow} opacity="0.6" />}
                <path d={`M${x + 50} ${y}v56`} stroke={p.ink} strokeWidth="2" />
                {/* Balcony */}
                <rect x={x - 10} y={y + 40} width="120" height="22" fill={p.glassHi} opacity="0.35" />
                <path d={`M${x - 10} ${y + 40}h120M${x - 10} ${y + 62}h120`} stroke={p.ink} strokeWidth="2" />
              </g>
            ))}
            <rect x="120" y={y + 62} width="460" height="8" fill={p.groundShade} />
          </g>
        )
      })}
      <rect x="112" y="60" width="476" height="12" fill={p.ink} />
      {/* Ground */}
      <rect x="0" y="540" width="800" height="60" fill={p.hillNear} />
      <rect x="0" y="560" width="800" height="40" fill={p.ground} />
      <Tree x={70} y={560} s={1.25} p={p} />
      <Tree x={650} y={560} s={1.4} p={p} />
      <Tree x={520} y={566} s={0.8} p={p} />
    </svg>
  )
}

/* ---------------------------------------------------------------- Coastal */

function Coastal({ p, id, tone }: SceneProps) {
  const dusk = tone === 'dusk'
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <Sky p={p} id={id} />
      <defs>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.water} />
          <stop offset="1" stopColor={p.waterHi} />
        </linearGradient>
      </defs>
      <Clouds p={p} y={110} opacity={0.4} />
      <circle cx="600" cy="300" r="40" fill={p.sun} opacity="0.75" />
      <rect x="0" y="320" width="800" height="120" fill={`url(#${id}-sea)`} />
      {Array.from({ length: 7 }).map((_, i) => (
        <path key={i} d={`M${40 + rand(i) * 600} ${334 + i * 14}h${60 + rand(i + 3) * 120}`} stroke={p.sun} strokeWidth="2" opacity="0.5" />
      ))}
      {/* Dunes */}
      <path d="M0 400c120-30 240-10 360 0s260-40 440-20v220H0Z" fill={p.ground} />
      <path d="M0 470c160-30 300-10 420 0s250-20 380-10v140H0Z" fill={p.groundShade} />
      {/* House on dune */}
      <g>
        <rect x="430" y="276" width="270" height="120" fill={p.timber} />
        {Array.from({ length: 22 }).map((_, i) => (
          <path key={i} d={`M${436 + i * 12} 276v120`} stroke={p.timberDark} strokeOpacity="0.4" />
        ))}
        <path d="M420 280 565 220l145 60Z" fill={p.roof} />
        <rect x="470" y="300" width="150" height="76" fill={dusk ? p.glow : p.glassHi} />
        <path d="M520 300v76M570 300v76" stroke={p.roof} strokeWidth="3" />
        <rect x="640" y="300" width="40" height="76" fill={p.timberDark} />
        <rect x="410" y="396" width="310" height="10" fill={p.timberDark} />
        <path d="M430 406v30M700 406v30" stroke={p.timberDark} strokeWidth="5" />
      </g>
      {/* Marram grass */}
      <g stroke={p.foliage[2]} strokeWidth="2.5" strokeLinecap="round" fill="none">
        {Array.from({ length: 70 }).map((_, i) => {
          const x = rand(i) * 800
          const y = 470 + rand(i + 50) * 120
          const h = 30 + rand(i + 99) * 40
          return <path key={i} d={`M${x} ${y}q${(rand(i + 7) - 0.5) * 20} ${-h / 2} ${(rand(i + 4) - 0.3) * 30} ${-h}`} />
        })}
      </g>
      {/* Boardwalk */}
      <path d="M380 600l60-160h40l-20 160Z" fill={p.timber} />
    </svg>
  )
}

/* ---------------------------------------------------------------- Cottage */

function Cottage({ p, id }: SceneProps) {
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <Sky p={p} id={id} />
      <Clouds p={p} y={90} />
      <path d="M0 330c140-70 260-60 400-20s260-50 400-30v320H0Z" fill={p.hillFar} />
      <path d="M0 400c160-40 300-30 440 0s240-20 360-10v210H0Z" fill={p.hillNear} />
      {/* Cottage */}
      <g>
        <rect x="230" y="300" width="340" height="180" fill="#d4c6ab" />
        {Array.from({ length: 50 }).map((_, i) => (
          <rect key={i} x={234 + (i % 10) * 34 + (Math.floor(i / 10) % 2) * 12} y={306 + Math.floor(i / 10) * 34} width={22 + rand(i) * 8} height="14" rx="4" fill="#c2b292" opacity="0.7" />
        ))}
        <path d="M210 304 330 200h140l120 104Z" fill={p.roof} />
        <path d="M210 304h380" stroke={p.ink} strokeWidth="4" />
        <rect x="460" y="168" width="34" height="62" fill="#b9a787" />
        <rect x="456" y="162" width="42" height="10" fill={p.ink} />
        {/* Windows */}
        {[262, 486].map((x) => (
          <g key={x}>
            <rect x={x} y="340" width="56" height="54" fill={p.ink} />
            <rect x={x + 4} y="344" width="48" height="46" fill={p.glassHi} />
            <path d={`M${x + 28} 344v46M${x + 4} 367h48`} stroke={p.render} strokeWidth="2" />
          </g>
        ))}
        <path d="M370 480v-80a30 30 0 0 1 60 0v80Z" fill={p.foliage[1]} />
        <circle cx="420" cy="440" r="3" fill="#c9a86a" />
        {/* Climbing rose */}
        <g fill={p.foliage[0]}>
          <circle cx="352" cy="400" r="12" />
          <circle cx="356" cy="380" r="10" />
          <circle cx="448" cy="396" r="12" />
          <circle cx="444" cy="376" r="9" />
        </g>
        <g fill="#c98c7a">
          <circle cx="350" cy="384" r="3" />
          <circle cx="446" cy="390" r="3" />
          <circle cx="358" cy="402" r="3" />
        </g>
      </g>
      {/* Orchard trees */}
      <Tree x={110} y={470} s={1.1} p={p} />
      <Tree x={690} y={470} s={1.2} p={p} />
      <Tree x={760} y={430} s={0.7} p={p} />
      {/* Garden */}
      <rect x="0" y="480" width="800" height="120" fill={p.foliage[2]} opacity="0.55" />
      <path d="M360 600l20-120h40l20 120Z" fill={p.ground} />
      <g stroke={p.timber} strokeWidth="4">
        <path d="M0 520h340M460 520h340" />
        {Array.from({ length: 14 }).map((_, i) => (
          <path key={i} d={`M${10 + i * 24} 506v34`} />
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <path key={i} d={`M${474 + i * 24} 506v34`} />
        ))}
      </g>
    </svg>
  )
}

/* ----------------------------------------------------------------- Office */

function Office({ p, id }: SceneProps) {
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <Sky p={p} id={id} />
      <defs>
        <pattern id={`${id}-brick`} width="30" height="12" patternUnits="userSpaceOnUse">
          <rect width="30" height="12" fill="#9c6e55" />
          <path d="M0 11.5h30M15 0v6M0 6h30" stroke="#835a45" strokeWidth="1" />
        </pattern>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.glassHi} />
          <stop offset="1" stopColor={p.glass} />
        </linearGradient>
      </defs>
      <rect x="60" y="80" width="680" height="460" fill={`url(#${id}-brick)`} />
      <rect x="50" y="70" width="700" height="14" fill={p.render} />
      {[0, 1].map((row) =>
        [0, 1, 2, 3, 4].map((col) => {
          const x = 100 + col * 128
          const y = 120 + row * 200
          return (
            <g key={`${row}-${col}`}>
              <path d={`M${x} ${y + 150}V${y + 40}a44 44 0 0 1 88 0v110Z`} fill={`url(#${id}-glass)`} />
              <path d={`M${x + 44} ${y - 4}v154M${x} ${y + 80}h88M${x} ${y + 115}h88`} stroke={p.ink} strokeWidth="3" />
              <path d={`M${x} ${y + 150}V${y + 40}a44 44 0 0 1 88 0v110Z`} fill="none" stroke={p.ink} strokeWidth="4" />
            </g>
          )
        }),
      )}
      <rect x="260" y="80" width="280" height="30" fill={p.ink} />
      <rect x="290" y="92" width="220" height="6" fill={p.render} opacity="0.6" />
      <rect x="0" y="540" width="800" height="60" fill={p.ground} />
      <Tree x={30} y={560} s={1} p={p} />
      <Tree x={780} y={560} s={1.1} p={p} />
    </svg>
  )
}

/* ---------------------------------------------------------------- Skyline */

function Skyline({ p, id, tone }: SceneProps) {
  const dusk = tone === 'dusk'
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <Sky p={p} id={id} />
      {!dusk && <Clouds p={p} y={110} />}
      {/* Far layer */}
      {Array.from({ length: 16 }).map((_, i) => {
        const w = 40 + rand(i) * 30
        const h = 120 + rand(i + 20) * 150
        return <rect key={`f${i}`} x={i * 52 - 10} y={460 - h} width={w} height={h + 140} fill={p.hillFar} />
      })}
      {/* Cathedral */}
      <path d="M380 460V250h40v210Z M384 250l16-120 16 120Z" fill={p.hillNear} />
      <rect x="330" y="330" width="140" height="130" fill={p.hillNear} />
      {/* Near layer with windows */}
      {Array.from({ length: 11 }).map((_, i) => {
        const w = 60 + rand(i + 40) * 40
        const h = 90 + rand(i + 60) * 160
        const x = i * 76 - 20
        const y = 560 - h
        return (
          <g key={`n${i}`}>
            <rect x={x} y={y} width={w} height={h + 60} fill={dusk ? '#2b2b2c' : i % 2 ? p.wallShade : p.render} />
            {Array.from({ length: Math.floor(h / 22) }).map((__, r) =>
              Array.from({ length: Math.floor(w / 18) }).map((___, c) => {
                const on = rand(i * 100 + r * 10 + c) > (dusk ? 0.45 : 0.7)
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={x + 8 + c * 18}
                    y={y + 12 + r * 22}
                    width="8"
                    height="11"
                    fill={dusk ? (on ? p.glow : '#3c3c3e') : on ? p.glassHi : p.glass}
                    opacity={dusk ? 0.9 : 0.75}
                  />
                )
              }),
            )}
          </g>
        )
      })}
      <rect x="0" y="560" width="800" height="40" fill={dusk ? '#1d1d1f' : p.groundShade} />
    </svg>
  )
}

/* -------------------------------------------------------------- Riverside */

function Riverside({ p, id, tone }: SceneProps) {
  const dusk = tone === 'dusk'
  const colours = [p.render, '#cfd2c2', p.wall, '#e4d3b8', '#c7cdc9', p.render, '#d9c0a5']
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <Sky p={p} id={id} />
      <defs>
        <linearGradient id={`${id}-river`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.waterHi} />
          <stop offset="1" stopColor={p.water} />
        </linearGradient>
      </defs>
      <Clouds p={p} y={80} />
      {/* Trees behind */}
      <Tree x={60} y={330} s={1.2} p={p} />
      <Tree x={760} y={330} s={1.3} p={p} />
      {/* Row of riverside houses */}
      {colours.map((c, i) => {
        const x = 100 + i * 88
        const h = 130 + (i % 3) * 22
        const y = 340 - h
        return (
          <g key={i}>
            <rect x={x} y={y} width="88" height={h} fill={c} stroke={p.wallShade} strokeOpacity="0.25" />
            <path d={i % 2 ? `M${x - 4} ${y}h96l-12-26H${x + 8}Z` : `M${x - 4} ${y}l48-40 48 40Z`} fill={p.roof} />
            {[0, 1].map((r) =>
              [0, 1].map((col) => (
                <rect key={`${r}${col}`} x={x + 16 + col * 36} y={y + 18 + r * 50} width="20" height="32" fill={dusk && rand(i * 4 + r * 2 + col) > 0.4 ? p.glow : p.glass} />
              )),
            )}
          </g>
        )
      })}
      {/* Riverbank */}
      <rect x="0" y="330" width="800" height="20" fill={p.foliage[2]} />
      <rect x="0" y="346" width="800" height="10" fill={p.groundShade} />
      {/* River */}
      <rect x="0" y="356" width="800" height="244" fill={`url(#${id}-river)`} />
      {/* Reflections */}
      <g opacity="0.35">
        {colours.map((c, i) => (
          <rect key={i} x={100 + i * 88} y="360" width="88" height={70 + (i % 3) * 14} fill={c} />
        ))}
      </g>
      {Array.from({ length: 14 }).map((_, i) => (
        <path key={i} d={`M${rand(i) * 760} ${380 + i * 15}h${40 + rand(i + 2) * 120}`} stroke={p.sun} strokeWidth="2" opacity="0.55" />
      ))}
      {/* Stone bridge */}
      <path d="M-20 300h300v80h-30a90 90 0 0 0-180 0h-30a40 40 0 0 0-60 0Z" fill={p.ground} />
      <path d="M-20 300h300v12H-20Z" fill={p.groundShade} />
      {/* Rowing boat */}
      <path d="M470 500h190l-20 14H490Z" fill={p.ink} />
      <path d="M520 498l-30-20M620 498l30-20" stroke={p.ink} strokeWidth="2" />
    </svg>
  )
}

/* --------------------------------------------------------------- Old Town */

function OldTown({ p, id }: SceneProps) {
  const fronts = ['#e8dcc6', '#c9cfc0', p.wall, '#efe6d6', '#d7c3a6', '#bfc7c4']
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <Sky p={p} id={id} />
      <defs>
        <pattern id={`${id}-cobble`} width="28" height="14" patternUnits="userSpaceOnUse">
          <rect width="28" height="14" fill={p.ground} />
          <rect x="1" y="1" width="12" height="5" rx="2.5" fill={p.groundShade} opacity="0.6" />
          <rect x="15" y="1" width="12" height="5" rx="2.5" fill={p.groundShade} opacity="0.5" />
          <rect x="8" y="8" width="12" height="5" rx="2.5" fill={p.groundShade} opacity="0.55" />
        </pattern>
      </defs>
      {/* Cathedral beyond */}
      <path d="M560 260V130l24-110 24 110v130Z" fill={p.hillFar} />
      <rect x="500" y="170" width="180" height="120" fill={p.hillFar} />
      {/* Terrace of painted townhouses */}
      {fronts.map((c, i) => {
        const x = i * 134 - 4
        const top = 120 + (i % 2) * 24
        return (
          <g key={i}>
            <rect x={x} y={top} width="134" height={470 - top} fill={c} />
            <rect x={x} y={top - 10} width="134" height="12" fill={p.render} />
            {[0, 1, 2].map((r) =>
              [0, 1].map((col) => (
                <g key={`${r}${col}`}>
                  <rect x={x + 22 + col * 56} y={top + 30 + r * 92} width="34" height={r === 2 ? 64 : 58} fill={p.ink} opacity="0.82" />
                  <rect x={x + 24 + col * 56} y={top + 32 + r * 92} width="30" height="20" fill={p.glassHi} opacity="0.35" />
                </g>
              )),
            )}
            {i % 2 === 0 && <path d={`M${x + 46} 470v-52a21 21 0 0 1 42 0v52Z`} fill={i === 2 ? p.foliage[1] : p.ink} />}
            <path d={`M${x} ${top}v${470 - top}`} stroke={p.wallShade} strokeOpacity="0.3" />
          </g>
        )
      })}
      {/* Lamp post */}
      <path d="M690 590V420" stroke={p.ink} strokeWidth="5" />
      <path d="M676 420h28l-6-28h-16Z" fill={p.ink} />
      <rect x="682" y="398" width="16" height="18" fill={p.glow} opacity="0.85" />
      {/* Cobbles */}
      <rect x="0" y="470" width="800" height="130" fill={`url(#${id}-cobble)`} />
      <rect x="0" y="466" width="800" height="8" fill={p.render} />
      {/* Planters */}
      <rect x="120" y="440" width="40" height="30" fill={p.ink} />
      <circle cx="140" cy="430" r="22" fill={p.foliage[0]} />
      <rect x="390" y="440" width="40" height="30" fill={p.ink} />
      <circle cx="410" cy="428" r="24" fill={p.foliage[2]} />
    </svg>
  )
}

/* ----------------------------------------------------------------- Suburb */

function Suburb({ p, id }: SceneProps) {
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <Sky p={p} id={id} />
      <defs>
        <pattern id={`${id}-brick`} width="32" height="14" patternUnits="userSpaceOnUse">
          <rect width="32" height="14" fill={p.wall} />
          <path d="M0 13.5h32M16 0v7M0 7h32" stroke={p.wallShade} strokeWidth="1" opacity="0.5" />
        </pattern>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.glassHi} />
          <stop offset="1" stopColor={p.glass} />
        </linearGradient>
      </defs>
      <Clouds p={p} y={70} />
      <path d="M0 380c160-30 300-20 420 0s260-10 380-6v226H0Z" fill={p.hillFar} />
      {/* House */}
      <rect x="230" y="230" width="360" height="230" fill={`url(#${id}-brick)`} />
      <rect x="230" y="230" width="360" height="110" fill={p.render} />
      {/* Mock-Tudor timbering on gable */}
      <path d="M200 236 410 100l210 136Z" fill={p.roof} />
      <path d="M440 236 520 150l100 86Z" fill={p.render} stroke={p.ink} strokeWidth="3" />
      <path d="M470 236v-50M500 236v-74M530 236v-74M560 236v-50M440 236l80-86" stroke={p.ink} strokeWidth="3" />
      <rect x="350" y="84" width="30" height="50" fill={p.wallShade} />
      {/* Bay window */}
      <path d="M260 450V340h120v110Z" fill={p.render} />
      <rect x="272" y="352" width="96" height="90" fill={`url(#${id}-glass)`} />
      <path d="M304 352v90M336 352v90M272 380h96" stroke={p.render} strokeWidth="3" />
      <path d="M252 340h136l-10-14H262Z" fill={p.roof} />
      {/* Upper windows */}
      {[262, 470].map((x) => (
        <g key={x}>
          <rect x={x} y="258" width="90" height="62" fill={`url(#${id}-glass)`} stroke={p.render} strokeWidth="6" />
          <path d={`M${x + 45} 258v62M${x} 280h90`} stroke={p.render} strokeWidth="3" />
        </g>
      ))}
      {/* Porch & door */}
      <path d="M440 460v-90h80v90Z" fill={p.foliage[1]} />
      <path d="M426 372h108l-54-36Z" fill={p.roof} />
      <circle cx="505" cy="420" r="3" fill="#c9a86a" />
      <rect x="540" y="370" width="40" height="60" fill={`url(#${id}-glass)`} stroke={p.render} strokeWidth="5" />
      {/* Big trees */}
      <Tree x={110} y={470} s={1.9} p={p} />
      <Tree x={720} y={470} s={2.1} p={p} />
      {/* Lawn, hedge, drive */}
      <rect x="0" y="460" width="800" height="140" fill={p.hillNear} />
      <path d="M440 460h80l120 140H360Z" fill={p.ground} />
      <rect x="0" y="520" width="380" height="50" rx="18" fill={p.foliage[1]} />
      <rect x="620" y="520" width="200" height="50" rx="18" fill={p.foliage[1]} />
      <rect x="0" y="566" width="800" height="34" fill={p.groundShade} />
    </svg>
  )
}

/* ------------------------------------------------------------- Countryside */

function Countryside({ p, id }: SceneProps) {
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <Sky p={p} id={id} />
      <Clouds p={p} y={100} opacity={0.6} />
      <path d="M0 300c140-50 280-40 400-10s260-40 400-20v330H0Z" fill={p.hillFar} />
      <path d="M0 370c120-40 260-20 380 10s280-30 420-20v240H0Z" fill={p.hillNear} />
      <path d="M0 450c180-40 340-10 460 10s240-20 340-10v150H0Z" fill={p.foliage[2]} />
      {/* Hedgerows */}
      <g stroke={p.foliage[1]} strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.9">
        <path d="M60 420c120-20 220-10 300 20" />
        <path d="M420 400c100-10 200 0 300 20" />
        <path d="M0 520c200-20 380 0 540 30" />
      </g>
      {/* Barn */}
      <path d="M560 360v-36l40-26 40 26v36Z" fill={p.wallShade} />
      <path d="M552 326l48-32 48 32" stroke={p.roof} strokeWidth="6" fill="none" />
      <Tree x={250} y={470} s={1.3} p={p} />
      <Tree x={700} y={380} s={0.6} p={p} />
    </svg>
  )
}

const scenes: Record<SceneName, (props: SceneProps) => ReactElement> = {
  villa: Villa,
  interior: Interior,
  kitchen: Kitchen,
  bedroom: Bedroom,
  townhouse: Townhouse,
  apartment: Apartment,
  coastal: Coastal,
  cottage: Cottage,
  office: Office,
  skyline: Skyline,
  riverside: Riverside,
  oldtown: OldTown,
  suburb: Suburb,
  countryside: Countryside,
}
