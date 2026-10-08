import type { ReactElement } from 'react'
import type { MediaAsset, SceneName } from '../../content/types'

/**
 * Art-directed illustrations in the brand palette that stand in for photography in the pitch
 * prototype. Every scene is a plain inline SVG (no network, no layout shift) that crops
 * gracefully via `preserveAspectRatio="xMidYMid slice"`. Supply `src` on a MediaAsset to replace.
 */

const c = {
  ivory: '#f4efe6',
  paper: '#faf7f1',
  stone: '#e3d9c8',
  stoneMid: '#d4c7b2',
  stoneDeep: '#bfae94',
  sand: '#a8916f',
  bronze: '#a98559',
  walnut: '#5b4331',
  walnutDark: '#3f2f24',
  espresso: '#261e19',
  charcoal: '#38312a',
}

type SceneFn = (id: string, variant: number) => ReactElement

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/* ---------- Office: window wall, skyline, conference table ---------- */
const office: SceneFn = (id) => {
  const towers = [
    [150, 470, 40], [190, 380, 34], [224, 520, 46], [270, 300, 38], [308, 440, 30], [338, 350, 52], [390, 250, 44],
    [434, 410, 36], [470, 330, 48], [518, 470, 30], [548, 280, 40], [588, 390, 46], [634, 450, 40],
  ] as const
  return (
    <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dcd2c2" />
          <stop offset="1" stopColor="#c6b8a2" />
        </linearGradient>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ebe6dc" />
          <stop offset="0.7" stopColor="#efe5d3" />
          <stop offset="1" stopColor="#e6d4b8" />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="0.72" cy="0.62" r="0.55">
          <stop offset="0" stopColor="#fff6e6" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff6e6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b09a7c" />
          <stop offset="1" stopColor="#8e785c" />
        </linearGradient>
        <linearGradient id={`${id}-table`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4a3628" />
          <stop offset="0.6" stopColor="#5e4533" />
          <stop offset="1" stopColor="#6b4f3a" />
        </linearGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff8ea" stopOpacity="0.32" />
          <stop offset="1" stopColor="#fff8ea" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-lamp`} cx="0.5" cy="0" r="1">
          <stop offset="0" stopColor="#ffe9c4" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffe9c4" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-win`} width="10" height="14" patternUnits="userSpaceOnUse">
          <rect x="2" y="3" width="5" height="6" fill="#f3ede2" opacity="0.5" />
        </pattern>
      </defs>

      <rect width="800" height="1000" fill={`url(#${id}-wall)`} />

      {/* window opening */}
      <rect x="140" y="80" width="540" height="700" fill={`url(#${id}-sky)`} />
      <rect x="140" y="80" width="540" height="700" fill={`url(#${id}-sun)`} />
      {/* far skyline */}
      {towers.map(([x, top, w], i) => (
        <g key={i}>
          <rect x={x} y={top + 40} width={w} height={780 - top} fill={i % 3 === 0 ? '#b9b6ab' : '#aaa79c'} />
          <rect x={x} y={top + 40} width={w} height={780 - top} fill={`url(#${id}-win)`} />
        </g>
      ))}
      <rect x="402" y="200" width="2" height="90" fill="#aaa79c" />
      {/* near skyline */}
      <path d="M140 640h70v-60h40v-30h56v90h40v-40h64v-70h48v110h60v-50h52v-20h48v70h62v140H140Z" fill="#958f82" />
      <rect x="140" y="760" width="540" height="20" fill="#837c70" />

      {/* window reveal (wall thickness) & frame */}
      <path d="M140 80 162 100v662l-22 18Z" fill="#b8a98f" />
      <path d="M140 80h540l-18 20H162Z" fill="#c7b9a2" />
      <g fill={c.espresso}>
        <rect x="134" y="76" width="552" height="7" />
        <rect x="134" y="776" width="552" height="9" />
        <rect x="134" y="76" width="7" height="709" />
        <rect x="679" y="76" width="7" height="709" />
        <rect x="318" y="80" width="6" height="700" />
        <rect x="498" y="80" width="6" height="700" />
        <rect x="140" y="408" width="540" height="5" />
      </g>

      {/* daylight falling into the room */}
      <path d="M140 780h540L800 1000H0Z" fill={`url(#${id}-floor)`} />
      <path d="M150 785h170l-120 215H0Z M328 785h168l-40 215H230Z M506 785h168l60 215H486Z" fill="#f6e9d2" opacity="0.18" />
      <path d="M140 80h540v700l120 220H0l140-220Z" fill={`url(#${id}-beam)`} opacity="0.5" />

      {/* pendant */}
      <rect x="259" y="0" width="1.5" height="248" fill={c.espresso} />
      <path d="M222 268a38 26 0 0 1 76 0Z" fill={c.bronze} />
      <path d="M222 268h76" stroke={c.walnut} strokeWidth="2" />
      <ellipse cx="260" cy="268" rx="190" ry="210" fill={`url(#${id}-lamp)`} opacity="0.45" />

      {/* chair backs */}
      <g fill={c.walnutDark}>
        <path d="M402 768c0-26 10-40 44-40h44c34 0 44 14 44 40v84H402Z" />
        <path d="M574 774c0-24 9-36 40-36h40c31 0 40 12 40 36v78H574Z" opacity="0.92" />
      </g>
      <path d="M410 770c0-22 9-34 38-34" stroke="#6e5442" strokeWidth="2" fill="none" />

      {/* table */}
      <path d="M0 862 700 846l60 30L0 912Z" fill={`url(#${id}-table)`} />
      <path d="M0 912 760 876v12L0 926Z" fill={c.walnutDark} />
      <rect x="690" y="884" width="9" height="116" fill={c.espresso} />
      <rect x="40" y="924" width="10" height="76" fill={c.espresso} />

      {/* documents, pen, glass, vase */}
      <path d="M330 872 470 866l26 16-142 7Z" fill="#efe7d9" />
      <path d="M318 878 458 872l26 16-142 7Z" fill={c.paper} />
      <path d="M330 884l118-5" stroke="#cdbfa8" strokeWidth="1.5" />
      <path d="M512 880 600 870" stroke={c.espresso} strokeWidth="4" strokeLinecap="round" />
      <path d="M596 870.5 610 869" stroke={c.bronze} strokeWidth="3" strokeLinecap="round" />
      <path d="M622 822h26l-3 50h-20Z" fill="#f4efe6" opacity="0.35" stroke="#f4efe6" strokeOpacity="0.6" />
      <path d="M118 872c-10-30-6-58 16-58s26 28 16 58Z" fill="#ebe2d3" />
      <path d="M134 816c-4-60-24-110-60-150M134 812c10-56 34-98 70-128M128 760c-26-12-46-30-56-56" stroke={c.walnutDark} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <g fill="#6f6a4f">
        <ellipse cx="78" cy="676" rx="12" ry="5" transform="rotate(-50 78 676)" />
        <ellipse cx="96" cy="700" rx="11" ry="5" transform="rotate(-30 96 700)" />
        <ellipse cx="196" cy="690" rx="12" ry="5" transform="rotate(-40 196 690)" />
        <ellipse cx="176" cy="716" rx="11" ry="4.5" transform="rotate(-20 176 716)" />
        <ellipse cx="76" cy="712" rx="10" ry="4.5" transform="rotate(30 76 712)" />
      </g>
    </svg>
  )
}

/* ---------- Facade: looking up at a stone-finned building ---------- */
const facade: SceneFn = (id) => {
  const top = 110
  const cx = 400
  const k = 0.55
  const project = (xb: number, y: number) => lerp(cx + (xb - cx) * k, xb, (y - top) / (1000 - top))
  const fins: number[] = []
  for (let x = -120; x <= 920; x += 74) fins.push(x)
  const slabs = Array.from({ length: 11 }, (_, i) => top + 890 * Math.pow((i + 1) / 11, 1.55))
  return (
    <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efe8db" />
          <stop offset="1" stopColor="#e2d2b8" />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="0.86" cy="0.04" r="0.5">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="1" stopColor="#fffaf0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="1" x2="0.2" y2="0">
          <stop offset="0" stopColor="#4c443b" />
          <stop offset="0.55" stopColor="#6d655a" />
          <stop offset="1" stopColor="#a49a89" />
        </linearGradient>
        <linearGradient id={`${id}-fin`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#d7cab4" />
          <stop offset="1" stopColor="#ece4d6" />
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill={`url(#${id}-sky)`} />
      <rect width="800" height="1000" fill={`url(#${id}-sun)`} />
      <path d={`M${project(-120, top)} ${top}H${project(920, top)}L920 1000H-120Z`} fill={`url(#${id}-glass)`} />
      {/* sky reflections in glazing */}
      <path d="M180 1000 420 110h60L300 1000Z" fill="#f2eadc" opacity="0.08" />
      <path d="M520 1000 470 110h22l80 890Z" fill="#f2eadc" opacity="0.1" />
      {slabs.map((y, i) => {
        const h = lerp(5, 22, (y - top) / 890)
        return <path key={i} d={`M${project(-120, y)} ${y}H${project(920, y)}L${project(920, y + h)} ${y + h}H${project(-120, y + h)}Z`} fill="#cdbfa7" />
      })}
      {fins.map((xb, i) => {
        const w = 30
        const side = xb + w / 2 < cx ? 1 : -1
        const sw = 14 * side
        const face = `M${project(xb, top)} ${top}L${project(xb + w, top)} ${top}L${xb + w} 1000L${xb} 1000Z`
        const edgeX = side > 0 ? xb + w : xb
        const sideFace = `M${project(edgeX, top)} ${top}L${project(edgeX, top) + sw * k} ${top}L${edgeX + sw} 1000L${edgeX} 1000Z`
        return (
          <g key={i}>
            <path d={sideFace} fill="#b3a286" />
            <path d={face} fill={`url(#${id}-fin)`} />
          </g>
        )
      })}
      {/* cornice */}
      <path d={`M${project(-120, top) - 10} ${top - 14}H${project(920, top) + 10}L${project(920, top)} ${top + 4}H${project(-120, top)}Z`} fill="#e9e0d0" />
      <path d={`M${project(-120, top)} ${top + 4}H${project(920, top)}`} stroke="#a8977c" strokeWidth="2" />
    </svg>
  )
}

/* ---------- Article thumbnails (800 x 600) ---------- */
const arch: SceneFn = (id) => (
  <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
    <defs>
      <linearGradient id={`${id}-in`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f6eedf" />
        <stop offset="1" stopColor="#e7d7bc" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="#d9cdb8" />
    <rect y="470" width="800" height="130" fill="#c6b597" />
    <path d="M330 470V250a70 70 0 0 1 140 0v220Z" fill="#a7926f" />
    <path d="M346 470V254a54 54 0 0 1 108 0v216Z" fill={`url(#${id}-in)`} />
    <path d="M346 470h108l150 130H330Z" fill="#efe3cc" opacity="0.7" />
    <path d="M454 470V254a54 54 0 0 0-30-48v264Z" fill="#d8c6a6" opacity="0.6" />
    <rect x="560" y="300" width="2" height="170" fill={c.espresso} opacity="0.5" />
    <circle cx="561" cy="292" r="10" fill={c.bronze} opacity="0.75" />
  </svg>
)

const stair: SceneFn = (id) => {
  const steps = Array.from({ length: 9 }, (_, i) => i)
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e8dfcf" />
          <stop offset="1" stopColor="#d3c4aa" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#${id}-bg)`} />
      {steps.map((i) => {
        const x = 80 + i * 74
        const y = 560 - i * 52
        return (
          <g key={i}>
            <rect x={x} y={y} width={800 - x} height={14} fill="#f3ece0" />
            <rect x={x} y={y + 14} width={800 - x} height={38} fill="#b9a687" />
          </g>
        )
      })}
      <path d="M90 470 726 22" stroke={c.espresso} strokeWidth="3" />
      {steps.map((i) => (
        <rect key={i} x={118 + i * 74} y={492 - i * 52 - 44} width="2" height={60} fill={c.espresso} opacity="0.7" />
      ))}
      <path d="M0 600 0 300 380 600Z" fill="#7d6a52" opacity="0.12" />
    </svg>
  )
}

const windowScene: SceneFn = (id) => (
  <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
    <defs>
      <linearGradient id={`${id}-glow`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff6e4" stopOpacity="0.85" />
        <stop offset="1" stopColor="#fff6e4" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="#cfc1a8" />
    <rect x="70" y="60" width="210" height="300" fill="#efe6d4" />
    <path d="M175 60v300M70 210h210" stroke={c.espresso} strokeWidth="5" />
    <rect x="70" y="60" width="210" height="300" fill="none" stroke={c.espresso} strokeWidth="6" />
    <path d="M280 60 800 330V600H560L280 360Z" fill={`url(#${id}-glow)`} opacity="0.55" />
    <rect y="420" width="800" height="180" fill="#5e4533" />
    <rect y="420" width="800" height="10" fill="#6f5340" />
    <path d="M300 460 520 448l40 40-226 14Z" fill={c.paper} />
    <path d="M330 470 500 462M336 480 470 474M342 490 520 482" stroke="#cdbfa8" strokeWidth="2" />
    <path d="M580 470 690 452" stroke={c.espresso} strokeWidth="5" strokeLinecap="round" />
    <path d="M686 452.6 702 450" stroke={c.bronze} strokeWidth="4" strokeLinecap="round" />
  </svg>
)

/* ---------- Portraits (400 x 500): editorial, monochrome-warm illustrations ---------- */
interface PortraitTone {
  bg: [string, string]
  skin: string
  hair: string
  jacket: string
  shirt: string
}

const portraitTones: PortraitTone[] = [
  { bg: ['#e4dac9', '#cdbfa8'], skin: '#cfb196', hair: '#6a5443', jacket: '#3a342e', shirt: '#efe7da' },
  { bg: ['#ddd3c3', '#c2b59f'], skin: '#b8977a', hair: '#2f2620', jacket: '#29292b', shirt: '#f1ebe0' },
  { bg: ['#e2d6c2', '#c9b89c'], skin: '#a6826a', hair: '#211a15', jacket: '#4a3d33', shirt: '#efe5d4' },
  { bg: ['#dcd2c1', '#bfb099'], skin: '#7a5a44', hair: '#1d1713', jacket: '#2f2b27', shirt: '#eee6d8' },
]

const portrait: SceneFn = (id, variant) => {
  const v = variant % portraitTones.length
  const t = portraitTones[v]
  const backdrop = [
    <path key="b" d="M250 0v500M330 0v500M250 160h150" stroke="#b9aa90" strokeWidth="3" fill="none" opacity="0.7" />,
    <g key="b" fill="#c9bba4" opacity="0.8">
      <rect x="20" y="0" width="22" height="500" />
      <rect x="70" y="0" width="22" height="500" />
      <rect x="318" y="0" width="22" height="500" />
      <rect x="368" y="0" width="22" height="500" />
    </g>,
    <path key="b" d="M260 500V170a70 70 0 0 1 140 0v330" fill="#d6c7ae" opacity="0.8" />,
    <g key="b" stroke="#b1a188" strokeWidth="3" opacity="0.7">
      <path d="M0 120h110M0 220h110M0 320h110M110 0v500" />
      <path d="M18 120V86M30 120V96M44 120V80M58 120V100M76 220v-40M90 220v-28M24 320v-36M40 320v-30" strokeWidth="9" />
    </g>,
  ][v]

  const hairBack = [
    <path key="h" d="M134 262c-6-74 28-104 68-104s76 30 68 104c-2 34-6 58-16 74l-110 0c-8-16-10-42-10-74Z" fill={t.hair} />,
    null,
    <path key="h" d="M130 258c-4-72 30-100 70-100s74 28 70 100l8 152c-24 10-60 8-78-2-18 10-54 12-78 2Z" fill={t.hair} />,
    null,
  ][v]

  const hairFront = [
    <path key="f" d="M142 252c-4-54 26-82 62-82 36 0 62 26 58 84-16-34-46-50-80-44-18 4-32 18-40 42Z" fill={t.hair} />,
    <path key="f" d="M144 238c-2-44 24-64 58-64 32 0 58 20 56 64-10-18-30-28-58-28s-46 10-56 28Z" fill={t.hair} />,
    <path key="f" d="M140 256c-4-58 24-90 60-90 38 0 66 30 62 90-8-30-30-56-62-62-30 6-52 32-60 62Z" fill={t.hair} />,
    <path key="f" d="M146 232c0-40 24-56 54-56s54 16 54 56c-12-14-30-20-54-20s-42 6-54 20Z" fill={t.hair} />,
  ][v]

  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={t.bg[0]} />
          <stop offset="1" stopColor={t.bg[1]} />
        </linearGradient>
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.45" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#1b130d" stopOpacity="0.28" />
        </linearGradient>
        <clipPath id={`${id}-head`}>
          <ellipse cx="200" cy="262" rx="56" ry="70" />
        </clipPath>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}-bg)`} />
      {backdrop}
      {hairBack}
      {/* neck */}
      <path d="M176 318h48v62l-24 28-24-28Z" fill={t.skin} />
      <path d="M176 330c14 12 34 12 48 0v20c-16 8-32 8-48 0Z" fill="#1b130d" opacity="0.14" />
      {/* jacket & shirt */}
      {v === 2 ? (
        <>
          <path d="M28 500c8-78 54-112 118-124l54 22 54-22c64 12 110 46 118 124Z" fill={t.jacket} />
          <path d="M150 378c16 26 34 36 50 36s34-10 50-36l-8 122h-84Z" fill={t.shirt} />
          <path d="M146 376 182 500M254 376 218 500" stroke="#2d241d" strokeWidth="2" opacity="0.5" />
        </>
      ) : (
        <>
          <path d="M24 500c8-80 56-114 122-126l54 30 54-30c66 12 114 46 122 126Z" fill={t.jacket} />
          <path d="M166 372 200 420l34-48 10 128h-88Z" fill={t.shirt} />
          <path d="M166 372 200 420l-16-52Z M234 372 200 420l16-52Z" fill={t.shirt} stroke="#cfc3b0" strokeWidth="1" />
          {v === 1 && <path d="M200 416l-9 12 9 72 9-72Z M193 410h14l-7 10Z" fill="#5a4636" />}
          {v === 3 && <path d="M200 416l-8 10 8 74 8-74Z" fill="#7a6250" />}
          <path d="M146 374 186 500M254 374 214 500" stroke="#120e0b" strokeWidth="2.5" opacity="0.35" />
          <path d="M146 374c10 40 24 80 40 126H120c-6-40 2-90 26-126Z M254 374c-10 40-24 80-40 126h66c6-40-2-90-26-126Z" fill="#000" opacity="0.08" />
        </>
      )}
      {/* head */}
      <ellipse cx="144" cy="266" rx="9" ry="15" fill={t.skin} />
      <ellipse cx="256" cy="266" rx="9" ry="15" fill={t.skin} />
      <ellipse cx="200" cy="262" rx="56" ry="70" fill={t.skin} />
      <rect x="130" y="180" width="140" height="170" fill={`url(#${id}-shade)`} clipPath={`url(#${id}-head)`} />
      {hairFront}
      {v === 3 && (
        <g fill="none" stroke="#1d1713" strokeWidth="2.5" opacity="0.85">
          <rect x="160" y="252" width="34" height="24" rx="8" />
          <rect x="206" y="252" width="34" height="24" rx="8" />
          <path d="M194 262h12M160 260l-14-4M240 260l14-4" />
        </g>
      )}
    </svg>
  )
}

const scenes: Record<SceneName, SceneFn> = { office, facade, arch, stair, window: windowScene, portrait }

export function Scene({ asset, id }: { asset: MediaAsset; id: string }) {
  return scenes[asset.scene](id, asset.variant ?? 0)
}
