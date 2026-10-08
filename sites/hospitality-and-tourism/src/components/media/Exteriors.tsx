import type { ReactElement } from 'react'
import type { Palette } from './palette'
import { Cypress, Frame, Figure, House, Lounger, OliveTree, rng, Sea, Sky, SkyDefs, Umbrella } from './parts'

/* Landscape & architecture scenes. All share a 1200×900 canvas and crop via `slice`. */

export type SceneFn = (id: string, p: Palette) => ReactElement

const W = 1200
const H = 900


const Veil = ({ id, p }: { id: string; p: Palette }) => (p.veil ? <rect width={W} height={H} fill={`url(#${id}-veil)`} /> : null)

/* ---------- Coast: terraced estate on the right, open bay and low sun on the left (hero) ---------- */
export const coast: SceneFn = (id, p) => {
  const sunX = 330
  const horizon = 470
  const houses = [
    [700, 330, 150, 92],
    [860, 300, 120, 110],
    [990, 270, 140, 120],
    [640, 440, 170, 96],
    [830, 420, 150, 100],
    [1000, 395, 170, 112],
    [760, 540, 180, 90],
    [960, 520, 210, 100],
  ] as const
  return (
    <Frame>
      <defs>
        <SkyDefs id={id} p={p} sunX={sunX / W} sunY={0.48} />
        <linearGradient id={`${id}-land`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.ground} />
          <stop offset="1" stopColor={p.stoneDark} />
        </linearGradient>
        <linearGradient id={`${id}-poolg`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={p.pool} />
          <stop offset="1" stopColor={p.poolDeep} />
        </linearGradient>
      </defs>
      <Sky id={id} p={p} w={W} h={H} sunX={sunX} sunY={horizon - 34} sunR={30} />
      {/* far headland across the bay */}
      <path d={`M0,${horizon - 30} C120,${horizon - 70} 220,${horizon - 48} 300,${horizon - 20} C340,${horizon - 8} 380,${horizon - 4} 420,${horizon} L0,${horizon} Z`} fill={p.hillFar} />
      <path d={`M0,${horizon - 8} C80,${horizon - 26} 160,${horizon - 14} 230,${horizon} L0,${horizon} Z`} fill={p.hillMid} opacity="0.7" />
      <Sea id={id} p={p} y={horizon} w={W} h={H - horizon} sunX={sunX} seed={11} />
      {/* the estate's hillside */}
      <path d={`M560,${H} C580,640 600,520 650,420 C700,320 780,250 900,215 C1000,190 1100,180 ${W},175 L${W},${H} Z`} fill={`url(#${id}-land)`} />
      <path d={`M520,${H} C560,760 600,700 660,660 C760,600 900,640 ${W},610 L${W},${H} Z`} fill={p.foliageDark} opacity="0.85" />
      {/* terrace walls */}
      {[300, 400, 500, 600].map((y, i) => (
        <path key={y} d={`M${640 - i * 20},${y + 92} L${W},${y + 70}`} stroke={p.stoneDark} strokeWidth="5" opacity="0.6" />
      ))}
      {/* olive groves on the hill */}
      {[
        [930, 250, 0.38],
        [1120, 230, 0.42],
        [760, 330, 0.3],
      ].map(([x, y, s], i) => (
        <OliveTree key={i} x={x} y={y} s={s} p={p} seed={i + 4} />
      ))}
      {houses.map(([x, y, w, h], i) => (
        <House key={i} x={x} y={y} w={w} h={h} p={p} windows={i % 3 === 0 ? 3 : 2} lit={p.mood === 'dusk'} />
      ))}
      {/* pool terrace */}
      <rect x={650} y={640} width={360} height={26} fill={p.stone} />
      <rect x={662} y={644} width={336} height={16} fill={`url(#${id}-poolg)`} />
      <rect x={662} y={644} width={336} height={3} fill={p.shimmer} opacity="0.6" />
      {/* cypress sentinels */}
      {[
        [690, 445, 170],
        [835, 330, 150],
        [1170, 300, 200],
        [620, 560, 140],
        [1040, 640, 190],
      ].map(([x, y, h], i) => (
        <Cypress key={i} x={x} y={y} h={h} fill={p.cypress} lit={p.foliage} />
      ))}
      {/* foreground foliage */}
      <OliveTree x={1080} y={960} s={1.5} p={p} seed={21} />
      <path d={`M0,${H} C140,850 260,870 380,${H} Z`} fill={p.foliageDark} opacity="0.6" />
      <Veil id={id} p={p} />
    </Frame>
  )
}

/* ---------- Pool: infinity edge meeting the horizon, loungers, umbrella ---------- */
export const pool: SceneFn = (id, p) => {
  const horizon = 420
  const sunX = 760
  return (
    <Frame>
      <defs>
        <SkyDefs id={id} p={p} sunX={sunX / W} sunY={0.44} />
        <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.pool} />
          <stop offset="1" stopColor={p.poolDeep} />
        </linearGradient>
        <linearGradient id={`${id}-deck`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.stone} />
          <stop offset="1" stopColor={p.stoneDark} />
        </linearGradient>
      </defs>
      <Sky id={id} p={p} w={W} h={H} sunX={sunX} sunY={horizon - 40} sunR={28} />
      <path d={`M700,${horizon} C820,${horizon - 40} 980,${horizon - 52} ${W},${horizon - 30} L${W},${horizon} Z`} fill={p.hillFar} />
      <Sea id={id} p={p} y={horizon} w={W} h={140} sunX={sunX} seed={5} />
      {/* infinity pool */}
      <rect y={500} width={W} height={260} fill={`url(#${id}-water)`} />
      {Array.from({ length: 22 }, (_, i) => {
        const r = rng(i + 9)
        const y = 510 + i * 11
        return <path key={i} d={`M${r() * 400},${y} q60,-5 120,0 t120,0 t120,0`} stroke={p.shimmer} strokeWidth={1 + i * 0.06} fill="none" opacity={0.35 - i * 0.008} />
      })}
      {p.mood === 'dusk' && <ellipse cx={600} cy={640} rx={420} ry={90} fill={p.pool} opacity="0.45" />}
      <rect y={496} width={W} height={6} fill={p.stone} opacity="0.9" />
      {/* deck */}
      <path d={`M0,760 L${W},760 L${W},${H} L0,${H} Z`} fill={`url(#${id}-deck)`} />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={i * 150} y1={760} x2={i * 150 - 60} y2={H} stroke={p.stoneDark} strokeWidth="1.2" opacity="0.5" />
      ))}
      <Lounger x={90} y={800} s={1.5} p={p} />
      <Lounger x={380} y={812} s={1.6} p={p} />
      <Umbrella x={330} y={790} s={1.5} p={p} />
      <OliveTree x={1050} y={830} s={1.25} p={p} seed={7} />
      <rect x={1000} y={800} width={110} height={70} fill={p.roof} opacity="0.85" />
      <Veil id={id} p={p} />
    </Frame>
  )
}

/* ---------- Villa: whitewashed villa, pergola and its own pool ---------- */
export const villa: SceneFn = (id, p) => {
  const horizon = 480
  const sunX = 260
  return (
    <Frame>
      <defs>
        <SkyDefs id={id} p={p} sunX={sunX / W} sunY={0.5} />
        <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.pool} />
          <stop offset="1" stopColor={p.poolDeep} />
        </linearGradient>
      </defs>
      <Sky id={id} p={p} w={W} h={H} sunX={sunX} sunY={horizon - 40} />
      <Sea id={id} p={p} y={horizon} w={W} h={200} sunX={sunX} seed={17} />
      {/* villa */}
      <rect x={560} y={300} width={560} height={300} fill={p.wallLit} />
      <rect x={560} y={292} width={560} height={10} fill={p.wallLit} />
      <rect x={880} y={210} width={240} height={95} fill={p.wallLit} />
      <rect x={1120} y={210} width={60} height={390} fill={p.wallShade} />
      {[620, 720].map((x) => (
        <path key={x} d={`M${x},560 V430 a35,35 0 0 1 70,0 V560 Z`} fill={p.mood === 'dusk' ? p.glow : p.wallDeep} opacity={p.mood === 'dusk' ? 0.85 : 0.9} />
      ))}
      <rect x={930} y={240} width={34} height={44} fill={p.wallDeep} opacity="0.8" />
      <rect x={1010} y={240} width={34} height={44} fill={p.wallDeep} opacity="0.8" />
      {/* pergola */}
      <g stroke={p.woodDark} strokeWidth="9">
        <line x1={820} y1={390} x2={820} y2={600} />
        <line x1={1080} y1={390} x2={1080} y2={600} />
      </g>
      <rect x={800} y={380} width={300} height={12} fill={p.wood} />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={808 + i * 35} y={366} width={10} height={14} fill={p.woodDark} />
      ))}
      <path d="M800,380 C840,350 900,372 940,352 C990,330 1050,360 1100,344 L1100,384 L800,384 Z" fill={p.foliage} />
      <path d="M840,384 C860,420 850,450 870,470 M960,384 C970,410 960,430 975,446" stroke={p.foliage} strokeWidth="10" fill="none" strokeLinecap="round" />
      {/* daybed under the pergola */}
      <rect x={870} y={540} width={180} height={34} rx="4" fill={p.linen} />
      <rect x={870} y={574} width={180} height={10} fill={p.woodDark} />
      <Cypress x={520} y={600} h={300} fill={p.cypress} lit={p.foliage} />
      <Cypress x={470} y={600} h={220} fill={p.cypress} lit={p.foliage} />
      {/* pool & deck */}
      <rect y={600} width={W} height={20} fill={p.stone} />
      <rect y={620} width={W} height={180} fill={`url(#${id}-water)`} />
      {/* reflection of the villa */}
      <rect x={560} y={622} width={560} height={90} fill={p.wallLit} opacity="0.18" />
      {Array.from({ length: 14 }, (_, i) => (
        <path key={i} d={`M${(i * 97) % 900},${632 + i * 11} q50,-4 100,0 t100,0`} stroke={p.shimmer} strokeWidth="1.4" fill="none" opacity="0.35" />
      ))}
      <rect y={800} width={W} height={100} fill={p.stone} />
      <Lounger x={160} y={850} s={1.2} p={p} />
      <OliveTree x={60} y={900} s={1.1} p={p} seed={13} />
      <Veil id={id} p={p} />
    </Frame>
  )
}

/* ---------- Residence terrace: long table and loungers above the groves ---------- */
export const residence: SceneFn = (id, p) => {
  const horizon = 380
  const sunX = 900
  return (
    <Frame>
      <defs>
        <SkyDefs id={id} p={p} sunX={sunX / W} sunY={0.4} />
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.stone} />
          <stop offset="1" stopColor={p.stoneDark} />
        </linearGradient>
      </defs>
      <Sky id={id} p={p} w={W} h={H} sunX={sunX} sunY={horizon - 30} sunR={26} />
      <Sea id={id} p={p} y={horizon} w={W} h={120} sunX={sunX} seed={23} />
      {/* groves descending to the sea */}
      <path d={`M0,430 C200,410 420,450 640,440 C860,430 1000,410 ${W},420 L${W},${H} L0,${H} Z`} fill={p.hillMid} />
      <path d={`M0,490 C260,470 520,510 780,495 C980,485 1100,470 ${W},480 L${W},${H} L0,${H} Z`} fill={p.hillNear} />
      {Array.from({ length: 26 }, (_, i) => {
        const r = rng(i + 31)
        return <OliveTree key={i} x={(i % 13) * 96 + r() * 40} y={470 + Math.floor(i / 13) * 50 + r() * 20} s={0.2 + Math.floor(i / 13) * 0.08} p={p} seed={i + 40} />
      })}
      {/* terrace floor and wall */}
      <path d={`M0,600 L${W},600 L${W},${H} L0,${H} Z`} fill={`url(#${id}-floor)`} />
      <rect y={585} width={W} height={22} fill={p.wallLit} />
      <rect y={605} width={W} height={6} fill={p.wallShade} />
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1={-200 + i * 220} y1={900} x2={200 + i * 130} y2={611} stroke={p.stoneDark} strokeWidth="1.2" opacity="0.45" />
      ))}
      {/* pergola beams + shade */}
      <rect width={W} height={26} y={0} fill={p.woodDark} />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={i * 170} y={0} width={14} height={60} fill={p.woodDark} />
      ))}
      <path d={`M0,0 L${W},0 L${W},60 C1000,90 860,40 700,70 C520,100 380,46 200,78 C120,90 60,70 0,80 Z`} fill={p.foliageDark} opacity="0.8" />
      {/* long table */}
      <path d="M180,700 L760,700 L820,760 L120,760 Z" fill={p.linen} />
      <rect x={120} y={760} width={700} height={14} fill={p.wallShade} />
      <path d="M150,774 v90 M790,774 v90" stroke={p.woodDark} strokeWidth="9" />
      {[230, 340, 450, 560, 670].map((x, i) => (
        <g key={x}>
          <ellipse cx={x} cy={728} rx={26} ry={8} fill={p.wallShade} />
          <rect x={x + 20} y={700 - 26} width={6} height={30} rx="2" fill={p.glow} opacity={i % 2 ? 0.9 : 0} />
        </g>
      ))}
      <Lounger x={900} y={780} s={1.4} p={p} />
      <Cypress x={1150} y={640} h={300} fill={p.cypress} lit={p.foliage} />
      <Veil id={id} p={p} />
    </Frame>
  )
}

/* ---------- Long table: dinner in the olive grove, lanterns in the branches ---------- */
export const longTable: SceneFn = (id, p) => {
  const horizon = 500
  return (
    <Frame>
      <defs>
        <SkyDefs id={id} p={p} sunX={0.5} sunY={0.55} />
        <radialGradient id={`${id}-candle`} cx="0.5" cy="0.6" r="0.5">
          <stop offset="0" stopColor={p.glow} stopOpacity="0.55" />
          <stop offset="1" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <Sky id={id} p={p} w={W} h={H} sunX={600} sunY={horizon + 10} sunR={20} />
      <path d={`M0,${horizon} C300,470 500,490 700,480 C900,470 1050,488 ${W},478 L${W},${H} L0,${H} Z`} fill={p.hillMid} />
      <path d={`M0,560 L${W},560 L${W},${H} L0,${H} Z`} fill={p.ground} />
      <path d={`M0,560 L${W},560 L${W},${H} L0,${H} Z`} fill={p.foliageDark} opacity="0.45" />
      {/* trees framing */}
      <OliveTree x={140} y={600} s={2.1} p={p} seed={3} lanterns />
      <OliveTree x={1060} y={610} s={2.2} p={p} seed={8} lanterns />
      <OliveTree x={600} y={540} s={1.2} p={p} seed={12} lanterns />
      {/* table in perspective toward the vanishing point */}
      <path d="M540,600 L660,600 L900,880 L300,880 Z" fill={p.linen} />
      <path d="M300,880 L900,880 L900,900 L300,900 Z" fill={p.wallShade} />
      {/* chairs */}
      {[0, 1, 2, 3, 4].map((i) => {
        const t = i / 4
        const yl = 610 + t * 250
        const xl = 540 - t * 240 - 24 - t * 20
        const xr = 660 + t * 240 + 10 + t * 10
        const s = 0.4 + t * 0.8
        return (
          <g key={i} fill={p.woodDark}>
            <rect x={xl} y={yl - 30 * s} width={18 * s} height={50 * s} />
            <rect x={xr} y={yl - 30 * s} width={18 * s} height={50 * s} />
          </g>
        )
      })}
      {/* candles + glasses */}
      {Array.from({ length: 7 }, (_, i) => {
        const t = i / 6
        const y = 615 + t * 240
        const s = 0.4 + t
        return (
          <g key={i}>
            <circle cx={600} cy={y - 8 * s} r={36 * s} fill={`url(#${id}-candle)`} />
            <rect x={597 - s} y={y - 18 * s} width={5 * s} height={18 * s} fill={p.linen} />
            <circle cx={599} cy={y - 21 * s} r={2.6 * s} fill={p.glow} />
            <ellipse cx={600 - 70 * s} cy={y} rx={14 * s} ry={4 * s} fill={p.wallShade} />
            <ellipse cx={600 + 70 * s} cy={y} rx={14 * s} ry={4 * s} fill={p.wallShade} />
          </g>
        )
      })}
      <Veil id={id} p={p} />
    </Frame>
  )
}

/* ---------- Restaurant terrace: pergola, string lights, sea at sunset ---------- */
export const restaurant: SceneFn = (id, p) => {
  const horizon = 470
  const sunX = 640
  return (
    <Frame>
      <defs>
        <SkyDefs id={id} p={p} sunX={sunX / W} sunY={0.52} />
        <radialGradient id={`${id}-candle`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={p.glow} stopOpacity="0.6" />
          <stop offset="1" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <Sky id={id} p={p} w={W} h={H} sunX={sunX} sunY={horizon - 10} sunR={30} />
      <path d={`M780,${horizon} C880,${horizon - 50} 1040,${horizon - 70} ${W},${horizon - 60} L${W},${horizon} Z`} fill={p.hillFar} />
      <Sea id={id} p={p} y={horizon} w={W} h={140} sunX={sunX} seed={29} />
      {/* balustrade */}
      <rect y={600} width={W} height={18} fill={p.wallLit} />
      {Array.from({ length: 30 }, (_, i) => (
        <rect key={i} x={i * 42 + 10} y={618} width={14} height={50} rx="6" fill={p.wallShade} />
      ))}
      <rect y={668} width={W} height={232} fill={p.stoneDark} />
      {/* pergola posts + beams */}
      <g fill={p.woodDark}>
        <rect x={60} y={80} width={22} height={600} />
        <rect x={1120} y={80} width={22} height={600} />
        <rect x={0} y={70} width={W} height={20} />
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={i * 104} y={40} width={12} height={40} />
        ))}
      </g>
      <path d="M0,70 C120,120 220,60 340,110 C460,150 560,80 700,120 C840,150 960,90 1200,130 L1200,0 L0,0 Z" fill={p.foliageDark} />
      {/* string lights */}
      {[0, 1].map((row) => {
        const y0 = 150 + row * 70
        const pts = Array.from({ length: 16 }, (_, i) => [i * 80 + 20, y0 + Math.sin((i / 15) * Math.PI) * 50] as const)
        return (
          <g key={row}>
            <path d={`M${pts.map(([x, y]) => `${x},${y}`).join(' L')}`} stroke={p.woodDark} strokeWidth="1.2" fill="none" opacity="0.7" />
            {pts.map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y + 6} r={14} fill={p.glow} opacity={p.mood === 'dusk' ? 0.25 : 0.1} />
                <circle cx={x} cy={y + 6} r={3.5} fill={p.glow} />
              </g>
            ))}
          </g>
        )
      })}
      {/* tables */}
      {[
        [260, 760, 1],
        [620, 720, 0.8],
        [930, 780, 1.1],
      ].map(([x, y, s], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx={110 * s} ry={24 * s} fill={p.linen} />
          <rect x={x - 110 * s} y={y} width={220 * s} height={70 * s} fill={p.linen} />
          <ellipse cx={x} cy={y + 70 * s} rx={110 * s} ry={14 * s} fill={p.wallShade} />
          <circle cx={x} cy={y - 20 * s} r={60 * s} fill={`url(#${id}-candle)`} />
          <rect x={x - 3 * s} y={y - 30 * s} width={6 * s} height={22 * s} fill={p.linen} />
          <circle cx={x} cy={y - 34 * s} r={3.5 * s} fill={p.glow} />
          <rect x={x - 170 * s} y={y - 50 * s} width={36 * s} height={140 * s} rx={4} fill={p.woodDark} />
          <rect x={x + 134 * s} y={y - 50 * s} width={36 * s} height={140 * s} rx={4} fill={p.woodDark} />
        </g>
      ))}
      <Veil id={id} p={p} />
    </Frame>
  )
}

/* ---------- Market: striped awnings, citrus and tomatoes ---------- */
export const market: SceneFn = (id, p) => {
  const r = rng(77)
  const fruit = (cx: number, cy: number, w: number, color: string, hi: string, n: number) =>
    Array.from({ length: n }, (_, i) => {
      const x = cx + (r() - 0.5) * w
      const y = cy - r() * 34
      const rr = 13 + r() * 6
      return (
        <g key={`${cx}-${i}`}>
          <circle cx={x} cy={y} r={rr} fill={color} />
          <circle cx={x - rr * 0.3} cy={y - rr * 0.35} r={rr * 0.3} fill={hi} opacity="0.6" />
        </g>
      )
    })
  return (
    <Frame>
      <defs>
        <SkyDefs id={id} p={p} sunX={0.3} sunY={0.1} />
      </defs>
      <rect width={W} height={H} fill={p.wallLit} />
      <rect x={0} y={0} width={W} height={H} fill={`url(#${id}-glow)`} opacity="0.6" />
      {/* backdrop: old town wall with doorways */}
      <path d="M760,520 V300 a70,70 0 0 1 140,0 V520 Z" fill={p.wallDeep} opacity="0.7" />
      <rect x={120} y={200} width={60} height={90} fill={p.wallDeep} opacity="0.55" />
      <rect x={300} y={160} width={60} height={90} fill={p.wallDeep} opacity="0.55" />
      <rect y={500} width={W} height={400} fill={p.stone} />
      {/* awnings */}
      {[
        [40, 230, 520],
        [620, 260, 560],
      ].map(([x, y, w], k) => (
        <g key={k}>
          {Array.from({ length: Math.floor(w / 40) }, (_, i) => (
            <path key={i} d={`M${x + i * 40},${y} L${x + i * 40 + 40},${y} L${x + i * 40 + 46},${y + 120} L${x + i * 40 + 6},${y + 120} Z`} fill={i % 2 ? p.linen : p.roof} />
          ))}
          {Array.from({ length: Math.floor(w / 40) }, (_, i) => (
            <path key={`s${i}`} d={`M${x + i * 40 + 6},${y + 120} q20,26 40,0`} fill={i % 2 ? p.linen : p.roof} />
          ))}
          <rect x={x} y={y + 120} width={w + 6} height={300} fill={p.shadow} opacity="0.14" />
          <line x1={x + 10} y1={y} x2={x + 10} y2={y + 420} stroke={p.woodDark} strokeWidth="6" />
          <line x1={x + w - 4} y1={y} x2={x + w - 4} y2={y + 420} stroke={p.woodDark} strokeWidth="6" />
        </g>
      ))}
      {/* crates */}
      {[
        [80, 600, 220, '#e9c349', '#fff3b8'],
        [320, 610, 220, '#c4553a', '#f5b39b'],
        [660, 640, 240, '#e9c349', '#fff3b8'],
        [930, 650, 220, '#7d8a4c', '#c8d39b'],
      ].map(([x, y, w, c, hi], i) => (
        <g key={i}>
          {fruit((x as number) + (w as number) / 2, y as number, (w as number) - 30, c as string, hi as string, 22)}
          <rect x={x as number} y={y as number} width={w as number} height={70} fill={p.wood} />
          <rect x={x as number} y={(y as number) + 30} width={w as number} height={4} fill={p.woodDark} opacity="0.6" />
        </g>
      ))}
      {/* bread */}
      {[0, 1, 2].map((i) => (
        <ellipse key={i} cx={560 + i * 34} cy={600 - i * 6} rx={40} ry={16} fill={p.wood} transform={`rotate(-12 ${560 + i * 34} ${600 - i * 6})`} />
      ))}
      <rect y={720} width={W} height={180} fill={p.stoneDark} opacity="0.5" />
      <Figure x={560} y={860} s={1.6} fill={p.shadow} pose="walk" />
      <Veil id={id} p={p} />
    </Frame>
  )
}

/* ---------- Trail: cliff path to the lighthouse ---------- */
export const trail: SceneFn = (id, p) => {
  const horizon = 400
  const sunX = 280
  return (
    <Frame>
      <defs>
        <SkyDefs id={id} p={p} sunX={sunX / W} sunY={0.4} />
        <linearGradient id={`${id}-cliff`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.stone} />
          <stop offset="1" stopColor={p.stoneDark} />
        </linearGradient>
      </defs>
      <Sky id={id} p={p} w={W} h={H} sunX={sunX} sunY={horizon - 60} />
      <Sea id={id} p={p} y={horizon} w={W} h={H - horizon} sunX={sunX} seed={41} />
      {/* headland with lighthouse */}
      <path d={`M560,${horizon + 30} C620,330 700,300 780,310 C860,320 930,350 1000,${horizon + 20} Z`} fill={p.hillFar} />
      <rect x={760} y={232} width={24} height={82} fill={p.wallLit} />
      <rect x={756} y={222} width={32} height={14} fill={p.wallShade} />
      <path d="M760,222 L772,206 L784,222 Z" fill={p.roof} />
      {p.mood === 'dusk' && <circle cx={772} cy={229} r={18} fill={p.glow} opacity="0.5" />}
      {/* near cliffs */}
      <path d={`M520,${H} C560,720 640,620 760,560 C880,500 1000,470 ${W},450 L${W},${H} Z`} fill={`url(#${id}-cliff)`} />
      <path d={`M700,${H} C760,760 860,660 980,610 C1060,580 1140,570 ${W},566 L${W},${H} Z`} fill={p.hillNear} />
      {/* path */}
      <path d={`M1200,600 C1080,620 980,650 900,700 C830,745 820,800 720,${H}`} stroke={p.ground} strokeWidth="26" fill="none" strokeLinecap="round" />
      <path d={`M1200,600 C1080,620 980,650 900,700 C830,745 820,800 720,${H}`} stroke={p.wallLit} strokeWidth="6" fill="none" opacity="0.5" strokeDasharray="2 18" />
      {/* herbs */}
      {Array.from({ length: 50 }, (_, i) => {
        const r = rng(i + 101)
        const x = 600 + r() * 600
        const y = 680 + r() * 220
        return <ellipse key={i} cx={x} cy={y} rx={10 + r() * 22} ry={6 + r() * 10} fill={i % 4 === 0 ? p.foliageLit : p.foliage} opacity="0.9" />
      })}
      <Figure x={905} y={705} s={0.95} fill={p.shadow} pose="walk" />
      <Cypress x={1140} y={600} h={210} fill={p.cypress} lit={p.foliage} />
      <Veil id={id} p={p} />
    </Frame>
  )
}

/* ---------- Village: hill town with a domed church above the harbour ---------- */
export const village: SceneFn = (id, p) => {
  const r = rng(55)
  const houses: ReactElement[] = []
  for (let row = 0; row < 6; row++) {
    const y = 300 + row * 85
    const count = 6 + row
    for (let i = 0; i < count; i++) {
      const w = 80 + r() * 70
      const x = 600 - (count * 115) / 2 + i * 115 + (r() - 0.5) * 30
      const h = 70 + r() * 50
      houses.push(<House key={`${row}-${i}`} x={x} y={y + (r() - 0.5) * 20} w={w} h={h + 40} p={p} windows={1 + Math.floor(r() * 2)} arch={r() > 0.5} lit={p.mood === 'dusk' && r() > 0.35} side={0.2} />)
    }
  }
  return (
    <Frame>
      <defs>
        <SkyDefs id={id} p={p} sunX={0.85} sunY={0.25} />
      </defs>
      <Sky id={id} p={p} w={W} h={H} sunX={1020} sunY={200} sunR={26} />
      <path d={`M0,380 C200,300 380,220 600,190 C820,170 1000,260 ${W},330 L${W},${H} L0,${H} Z`} fill={p.hillMid} />
      <path d={`M0,330 C100,320 160,290 240,300 L0,${H} Z`} fill={p.hillFar} opacity="0.6" />
      {/* church */}
      <rect x={540} y={170} width={120} height={140} fill={p.wallLit} />
      <rect x={660} y={175} width={30} height={135} fill={p.wallShade} />
      <path d="M545,172 a55,55 0 0 1 110,0 Z" fill={p.mood === 'dusk' ? p.wallShade : p.roof} />
      <rect x={596} y={100} width={8} height={20} fill={p.wallLit} />
      <rect x={586} y={108} width={28} height={6} fill={p.wallLit} />
      <rect x={470} y={130} width={50} height={180} fill={p.wallLit} />
      <path d="M470,130 L495,96 L520,130 Z" fill={p.roof} />
      {houses}
      {/* harbour */}
      <rect y={790} width={W} height={110} fill={p.seaNear} />
      <rect y={784} width={W} height={10} fill={p.stone} />
      {[200, 480, 860].map((x, i) => (
        <g key={x}>
          <path d={`M${x},830 l120,0 l-16,22 l-88,0 Z`} fill={i === 1 ? p.roof : p.linen} />
          <line x1={x + 60} y1={830} x2={x + 60} y2={770} stroke={p.woodDark} strokeWidth="3" />
          {p.mood === 'dusk' && <rect x={x + 20} y={858} width={80} height={2} fill={p.glow} opacity="0.6" />}
        </g>
      ))}
      <Cypress x={90} y={560} h={240} fill={p.cypress} lit={p.foliage} />
      <Cypress x={1130} y={520} h={260} fill={p.cypress} lit={p.foliage} />
      <Veil id={id} p={p} />
    </Frame>
  )
}

/* ---------- Grove: terraced olive groves receding into haze ---------- */
export const grove: SceneFn = (id, p) => {
  const rows = [
    { y: 360, s: 0.28, n: 12, fade: 0.55 },
    { y: 450, s: 0.42, n: 9, fade: 0.35 },
    { y: 580, s: 0.7, n: 6, fade: 0.15 },
    { y: 800, s: 1.25, n: 4, fade: 0 },
  ]
  return (
    <Frame>
      <defs>
        <SkyDefs id={id} p={p} sunX={0.75} sunY={0.25} />
        <linearGradient id={`${id}-haze`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.skyLow} stopOpacity="0.85" />
          <stop offset="1" stopColor={p.skyLow} stopOpacity="0" />
        </linearGradient>
      </defs>
      <Sky id={id} p={p} w={W} h={H} sunX={900} sunY={210} sunR={30} />
      <path d={`M0,330 C260,280 520,300 760,270 C960,250 1100,280 ${W},270 L${W},${H} L0,${H} Z`} fill={p.hillFar} />
      {rows.map((row, k) => (
        <g key={k}>
          <path d={`M0,${row.y - 20} C300,${row.y - 40} 800,${row.y - 10} ${W},${row.y - 30} L${W},${H} L0,${H} Z`} fill={k % 2 ? p.hillNear : p.ground} />
          <path d={`M0,${row.y - 20} C300,${row.y - 40} 800,${row.y - 10} ${W},${row.y - 30}`} stroke={p.stoneDark} strokeWidth={3 + k * 3} fill="none" opacity="0.7" />
          {Array.from({ length: row.n }, (_, i) => {
            const r = rng(k * 50 + i)
            return <OliveTree key={i} x={(W / row.n) * (i + 0.5) + (r() - 0.5) * 40} y={row.y + 6 * k} s={row.s} p={p} seed={k * 10 + i} />
          })}
          {row.fade > 0 && <rect y={row.y - 200} width={W} height={260} fill={`url(#${id}-haze)`} opacity={row.fade} />}
        </g>
      ))}
      <Veil id={id} p={p} />
    </Frame>
  )
}

/* ---------- Boat: wooden boat on a calm sea, headland silhouette ---------- */
export const boat: SceneFn = (id, p) => {
  const horizon = 500
  const sunX = 760
  return (
    <Frame>
      <defs>
        <SkyDefs id={id} p={p} sunX={sunX / W} sunY={0.54} />
      </defs>
      <Sky id={id} p={p} w={W} h={H} sunX={sunX} sunY={horizon - 26} sunR={40} />
      <path d={`M0,${horizon} C80,${horizon - 90} 220,${horizon - 120} 340,${horizon - 70} C420,${horizon - 40} 480,${horizon - 20} 540,${horizon} Z`} fill={p.hillFar} />
      <path d={`M960,${horizon} C1040,${horizon - 30} 1120,${horizon - 40} ${W},${horizon - 34} L${W},${horizon} Z`} fill={p.hillFar} opacity="0.8" />
      <Sea id={id} p={p} y={horizon} w={W} h={H - horizon} sunX={sunX} seed={61} />
      {/* boat */}
      <g>
        <ellipse cx={520} cy={688} rx={260} ry={14} fill={p.seaNear} opacity="0.5" />
        <path d="M290,640 L770,640 C760,670 730,690 690,692 L360,692 C320,690 300,668 290,640 Z" fill={p.linen} />
        <path d="M296,652 L764,652" stroke={p.wood} strokeWidth="6" />
        <path d="M300,640 L770,640 L770,632 L300,632 Z" fill={p.wood} />
        <rect x={420} y={600} width={150} height={32} fill={p.wood} />
        <rect x={430} y={588} width={130} height={12} fill={p.linen} />
        <Figure x={360} y={632} s={0.6} fill={p.shadow} />
        <Figure x={660} y={632} s={0.55} fill={p.shadow} />
        <path d="M690,690 q30,10 80,6" stroke={p.shimmer} strokeWidth="2" fill="none" opacity="0.6" />
      </g>
      <Veil id={id} p={p} />
    </Frame>
  )
}

/* ---------- Arch: stone archway framing sea and a cypress ---------- */
export const arch: SceneFn = (id, p) => {
  const horizon = 520
  return (
    <Frame>
      <defs>
        <SkyDefs id={id} p={p} sunX={0.6} sunY={0.5} />
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={p.stoneDark} />
          <stop offset="0.5" stopColor={p.stone} />
          <stop offset="1" stopColor={p.stoneDark} />
        </linearGradient>
        <mask id={`${id}-m`}>
          <rect width={W} height={H} fill="white" />
          <path d="M380,900 V420 a220,220 0 0 1 440,0 V900 Z" fill="black" />
        </mask>
      </defs>
      <Sky id={id} p={p} w={W} h={H} sunX={720} sunY={horizon - 50} sunR={26} />
      <path d={`M380,${horizon} C480,${horizon - 60} 560,${horizon - 70} 640,${horizon - 30} L700,${horizon} Z`} fill={p.hillFar} />
      <Sea id={id} p={p} y={horizon} w={W} h={200} sunX={720} seed={71} />
      <rect y={700} width={W} height={200} fill={p.stone} />
      <rect y={700} width={W} height={8} fill={p.stoneDark} opacity="0.6" />
      <Cypress x={720} y={710} h={340} fill={p.cypress} lit={p.foliage} />
      <path d="M470,720 c20,-50 70,-60 90,-20 Z" fill={p.foliage} />
      {/* wall with arch cut-out */}
      <g mask={`url(#${id}-m)`}>
        <rect width={W} height={H} fill={`url(#${id}-wall)`} />
        {Array.from({ length: 70 }, (_, i) => {
          const r = rng(i + 7)
          return <rect key={i} x={r() * W} y={r() * H} width={40 + r() * 70} height={20 + r() * 26} rx="4" fill={i % 2 ? p.stoneDark : p.wallLit} opacity="0.18" />
        })}
      </g>
      <path d="M380,900 V420 a220,220 0 0 1 440,0 V900" stroke={p.wallDeep} strokeWidth="14" fill="none" opacity="0.5" />
      {/* steps */}
      <rect x={380} y={820} width={440} height={30} fill={p.stoneDark} opacity="0.5" />
      <rect x={380} y={850} width={440} height={50} fill={p.stoneDark} opacity="0.7" />
      {/* terracotta pot with a lemon tree */}
      <path d="M150,900 L170,790 L290,790 L310,900 Z" fill={p.roof} />
      <circle cx={230} cy={680} r={90} fill={p.foliage} />
      <circle cx={190} cy={650} r={50} fill={p.foliageLit} opacity="0.6" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={180 + i * 25} cy={650 + (i % 2) * 50} r={9} fill="#e9c349" />
      ))}
      <Veil id={id} p={p} />
    </Frame>
  )
}

/* ---------- Swimmer: top-down cove with caustics ---------- */
export const swimmer: SceneFn = (id, p) => {
  const r = rng(91)
  return (
    <Frame>
      <defs>
        <radialGradient id={`${id}-water`} cx="0.45" cy="0.45" r="0.8">
          <stop offset="0" stopColor={p.pool} />
          <stop offset="1" stopColor={p.poolDeep} />
        </radialGradient>
        <pattern id={`${id}-caustic`} width="140" height="110" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
          <path d="M0,40 C30,20 50,60 80,40 S130,20 140,40 M10,100 C40,80 70,110 100,90 S130,80 140,95 M60,0 C70,20 50,30 70,55" stroke={p.shimmer} strokeWidth="2.2" fill="none" opacity="0.45" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-water)`} />
      <rect width={W} height={H} fill={`url(#${id}-caustic)`} />
      {/* pale sand patches under water */}
      <ellipse cx={300} cy={700} rx={260} ry={140} fill={p.stone} opacity="0.25" />
      {/* rocks at the edge */}
      {Array.from({ length: 14 }, (_, i) => (
        <ellipse key={i} cx={980 + r() * 260} cy={i * 70 + r() * 30} rx={70 + r() * 70} ry={40 + r() * 40} fill={i % 3 ? p.stone : p.stoneDark} />
      ))}
      {/* swimmer floating, seen from above */}
      <g transform="translate(560 420) rotate(-28)">
        <ellipse cx="0" cy="0" rx="210" ry="40" fill={p.poolDeep} opacity="0.25" transform="translate(30 40)" />
        <circle cx="-150" cy="0" r="22" fill={p.woodDark} />
        <path d="M-128,-16 L40,-22 L40,22 L-128,16 Z" fill={p.wood} />
        <path d="M-100,-18 L-40,-90 M-100,18 L-40,90" stroke={p.wood} strokeWidth="14" strokeLinecap="round" />
        <path d="M40,-14 L170,-34 M40,14 L170,34" stroke={p.wood} strokeWidth="16" strokeLinecap="round" />
        <path d="M-60,-21 L0,-22 L0,22 L-60,21 Z" fill={p.roof} />
        <circle cx="0" cy="0" r="160" stroke={p.shimmer} strokeWidth="2" fill="none" opacity="0.3" />
        <circle cx="0" cy="0" r="230" stroke={p.shimmer} strokeWidth="1.5" fill="none" opacity="0.2" />
      </g>
    </Frame>
  )
}

/* ---------- Map: stylised coastline with the property and points of interest ---------- */
export const map: SceneFn = (id, p) => (
  <Frame>
    <defs>
      <pattern id={`${id}-waves`} width="40" height="18" patternUnits="userSpaceOnUse">
        <path d="M0,9 q10,-6 20,0 t20,0" stroke="#8fb0ad" strokeWidth="1" fill="none" opacity="0.5" />
      </pattern>
    </defs>
    <rect width={W} height={H} fill="#cfdcd6" />
    <rect width={W} height={H} fill={`url(#${id}-waves)`} />
    <path
      d="M0,0 L1200,0 L1200,260 C1120,300 1060,280 1000,340 C940,400 980,460 900,500 C820,540 760,500 700,560 C640,620 680,700 600,740 C520,780 460,740 400,800 C360,840 360,880 340,900 L0,900 Z"
      fill="#efe7d6"
    />
    <path
      d="M0,0 L1200,0 L1200,260 C1120,300 1060,280 1000,340 C940,400 980,460 900,500 C820,540 760,500 700,560 C640,620 680,700 600,740 C520,780 460,740 400,800 C360,840 360,880 340,900"
      stroke="#b9a98a"
      strokeWidth="2"
      fill="none"
    />
    {/* hills */}
    {[
      [260, 260, 160],
      [420, 140, 120],
      [180, 520, 140],
    ].map(([x, y, rr], i) => (
      <g key={i} stroke="#cdbf9f" fill="none">
        <ellipse cx={x} cy={y} rx={rr} ry={rr * 0.6} />
        <ellipse cx={x} cy={y} rx={rr * 0.65} ry={rr * 0.38} />
        <ellipse cx={x} cy={y} rx={rr * 0.3} ry={rr * 0.18} />
      </g>
    ))}
    {/* roads */}
    <path d="M60,880 C200,720 300,640 460,600 C600,560 700,480 820,430 C900,400 980,360 1060,250" stroke="#ffffff" strokeWidth="9" fill="none" />
    <path d="M60,880 C200,720 300,640 460,600 C600,560 700,480 820,430 C900,400 980,360 1060,250" stroke="#d9c7a7" strokeWidth="2" fill="none" strokeDasharray="10 10" />
    <path d="M460,600 C420,480 360,360 300,200" stroke="#ffffff" strokeWidth="6" fill="none" />
    {/* places */}
    <g fontFamily="Manrope Variable, system-ui, sans-serif" fontSize="18" fill="#3a3631" fontWeight="600" letterSpacing="2">
      <circle cx={1010} cy={300} r={7} fill="#3a3631" />
      <text x={880} y={275}>PORTO SARENNE</text>
      <circle cx={300} cy={200} r={6} fill="#645c51" />
      <text x={150} y={180} fill="#645c51">ALTA SARENNE</text>
      <path d="M560,790 l0,-26 l8,0 l0,26 Z" fill="#3a3631" />
      <text x={470} y={830}>CAPO SARENNE</text>
      <text x={950} y={700} fill="#4f7a78" fontStyle="italic" fontFamily="Cormorant Garamond Variable, Georgia, serif" fontSize="34" letterSpacing="1" fontWeight="500">
        Bay of Velora
      </text>
      <g transform="translate(70 70)">
        <rect width="250" height="44" rx="22" fill="#ffffff" opacity="0.85" />
        <text x={22} y={28} fontSize="15">✈ AIRPORT · 40 MIN</text>
      </g>
    </g>
    {/* property pin */}
    <g transform="translate(760 500)">
      <circle r="60" fill={p.roof} opacity="0.15" />
      <circle r="30" fill={p.roof} opacity="0.25" />
      <circle r="13" fill="#9a4b2a" stroke="#ffffff" strokeWidth="4" />
      <text x={-150} y={-36} fontFamily="Cormorant Garamond Variable, Georgia, serif" fontSize="38" fill="#23211e" fontWeight="600">
        Casa Velora
      </text>
    </g>
  </Frame>
)
