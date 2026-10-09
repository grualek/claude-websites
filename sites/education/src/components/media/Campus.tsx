import type { ReactElement } from 'react'
import type { Palette } from './palette'
import { Atmosphere, cast, Figure, Frame, H, rng, SkyGradient, Tree, W } from './parts'

export type SceneFn = (id: string, p: Palette) => ReactElement

/* Exterior scenes: campus, quad, sports field, river fieldwork, community garden, campus map. */

/** Academic building façade — brick wings, stone centre block with tall arched windows. */
function Building({ id, p, x, y, w, h }: { id: string; p: Palette; x: number; y: number; w: number; h: number }) {
  const centerW = w * 0.36
  const cx = x + (w - centerW) / 2
  const winW = 46
  const lit = p.mood === 'evening'
  const pane = lit ? p.glow : p.windowLight
  const wing = (wx: number, ww: number, key: string) => (
    <g key={key}>
      <rect x={wx} y={y + 60} width={ww} height={h - 60} fill={p.brick} />
      <rect x={wx} y={y + 60} width={ww} height={14} fill={p.stone} />
      <rect x={wx} y={y + 60 + 14} width={ww} height={6} fill={p.brickShade} opacity="0.6" />
      {[0, 1, 2].map((row) =>
        Array.from({ length: Math.floor(ww / 92) }, (_, i) => {
          const wx2 = wx + 30 + i * 92
          const wy = y + 110 + row * 110
          return (
            <g key={`${key}-${row}-${i}`}>
              <rect x={wx2 - 5} y={wy - 5} width={winW + 10} height={76} fill={p.stone} />
              <rect x={wx2} y={wy} width={winW} height={66} fill={pane} opacity={lit ? 0.95 : 1} />
              {!lit && <path d={`M${wx2},${wy} L${wx2 + winW},${wy} L${wx2},${wy + 50} Z`} fill="#fff" opacity="0.35" />}
              <line x1={wx2 + winW / 2} y1={wy} x2={wx2 + winW / 2} y2={wy + 66} stroke={p.stone} strokeWidth="4" />
              <line x1={wx2} y1={wy + 30} x2={wx2 + winW} y2={wy + 30} stroke={p.stone} strokeWidth="4" />
            </g>
          )
        }),
      )}
    </g>
  )
  return (
    <g>
      {wing(x, (w - centerW) / 2 + 2, 'l')}
      {wing(cx + centerW - 2, (w - centerW) / 2 + 2, 'r')}
      {/* roofline */}
      <path d={`M${x - 10},${y + 62} L${x + 30},${y + 20} L${cx},${y + 20} L${cx},${y + 62} Z`} fill={p.roof} />
      <path d={`M${cx + centerW},${y + 62} L${cx + centerW},${y + 20} L${x + w - 30},${y + 20} L${x + w + 10},${y + 62} Z`} fill={p.roof} />
      {/* centre block */}
      <path d={`M${cx - 10},${y + 10} L${cx + centerW / 2},${y - 70} L${cx + centerW + 10},${y + 10} Z`} fill={p.stoneShade} />
      <rect x={cx} y={y + 6} width={centerW} height={h - 6} fill={p.stone} />
      <rect x={cx} y={y + 6} width={centerW} height={h - 6} fill={`url(#${id}-stoneShade)`} />
      <circle cx={cx + centerW / 2} cy={y - 18} r={22} fill={p.paper} stroke={p.stoneShade} strokeWidth="5" />
      <path d={`M${cx + centerW / 2},${y - 18} L${cx + centerW / 2},${y - 32} M${cx + centerW / 2},${y - 18} L${cx + centerW / 2 + 10},${y - 14}`} stroke={p.navy} strokeWidth="3" strokeLinecap="round" />
      {[0, 1, 2].map((i) => {
        const aw = 70
        const ax = cx + centerW * (0.2 + i * 0.3) - aw / 2
        const ay = y + 70
        return (
          <g key={i}>
            <path d={`M${ax},${ay + 190} L${ax},${ay + aw / 2} A${aw / 2},${aw / 2} 0 0 1 ${ax + aw},${ay + aw / 2} L${ax + aw},${ay + 190} Z`} fill={pane} />
            {!lit && <path d={`M${ax},${ay + 120} L${ax},${ay + aw / 2} A${aw / 2},${aw / 2} 0 0 1 ${ax + aw * 0.8},${ay + 8} Z`} fill="#fff" opacity="0.3" />}
            <path d={`M${ax + aw / 2},${ay} L${ax + aw / 2},${ay + 190} M${ax},${ay + 100} L${ax + aw},${ay + 100}`} stroke={p.stone} strokeWidth="5" />
          </g>
        )
      })}
      {/* entrance */}
      <path d={`M${cx + centerW / 2 - 56},${y + h} L${cx + centerW / 2 - 56},${y + h - 110} A56,56 0 0 1 ${cx + centerW / 2 + 56},${y + h - 110} L${cx + centerW / 2 + 56},${y + h} Z`} fill={p.navy} />
      <path d={`M${cx + centerW / 2 - 40},${y + h} L${cx + centerW / 2 - 40},${y + h - 104} A40,40 0 0 1 ${cx + centerW / 2 + 40},${y + h - 104} L${cx + centerW / 2 + 40},${y + h} Z`} fill={lit ? p.glow : '#2d3d5c'} opacity={lit ? 0.9 : 1} />
      {/* yellow banners */}
      {[-1, 1].map((d) => (
        <g key={d}>
          <rect x={cx + centerW / 2 + d * 128 - 16} y={y + 300} width={32} height={96} fill={p.yellow} />
          <path d={`M${cx + centerW / 2 + d * 128 - 16},${y + 396} l16,-12 l16,12`} fill={p.stone} />
          <circle cx={cx + centerW / 2 + d * 128} cy={y + 336} r={8} fill={p.navy} opacity="0.7" />
        </g>
      ))}
      <rect x={x - 10} y={y + h - 8} width={w + 20} height={14} fill={p.stoneShade} />
    </g>
  )
}

/* ---------- Campus: main building across a courtyard, students walking ---------- */
export const campus: SceneFn = (id, p) => {
  const ground = 640
  return (
    <Frame>
      <defs>
        <SkyGradient id={id} p={p} />
        <linearGradient id={`${id}-stoneShade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.08" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id={`${id}-paving`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.stoneShade} />
          <stop offset="1" stopColor={p.stone} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      <circle cx={980} cy={150} r={90} fill={p.sun} opacity={p.mood === 'evening' ? 0.9 : 0.6} />
      <Tree x={70} y={ground - 10} s={1.1} p={p} seed={3} />
      <Building id={id} p={p} x={150} y={250} w={900} h={ground - 250} />
      <Tree x={1150} y={ground} s={1.25} p={p} seed={8} />
      {/* courtyard */}
      <rect x={0} y={ground} width={W} height={H - ground} fill={`url(#${id}-paving)`} />
      <path d={`M0,${ground + 40} L380,${ground + 10} L380,${ground + 4} L0,${ground + 18} Z`} fill={p.lawn} />
      <path d={`M0,${H} L0,${ground + 70} L330,${ground + 30} L240,${H} Z`} fill={p.lawn} />
      <path d={`M${W},${H} L${W},${ground + 70} L${W - 330},${ground + 30} L${W - 240},${H} Z`} fill={p.lawn} />
      <path d={`M0,${ground + 70} L330,${ground + 30} L340,${ground + 34} L10,${ground + 78} Z`} fill={p.lawnLit} opacity="0.7" />
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1={600 - (i + 1) * 70} y1={ground + 12 + i * 40} x2={600 + (i + 1) * 70} y2={ground + 12 + i * 40} stroke={p.stoneShade} strokeWidth="2" opacity="0.6" />
      ))}
      {/* people */}
      <Figure x={520} y={ground + 40} s={0.32} look={cast[5]} pose="walk" back />
      <Figure x={690} y={ground + 46} s={0.34} look={cast[2]} pose="stand" />
      <Figure x={722} y={ground + 48} s={0.33} look={cast[6]} pose="stand" holding="book" />
      <Figure x={300} y={ground + 150} s={0.6} look={{ ...cast[1], bag: p.greenDeep }} pose="walk" holding="book" />
      <Figure x={860} y={ground + 175} s={0.66} look={{ ...cast[0], bag: p.navy }} pose="walk" facing={-1} />
      <Figure x={930} y={ground + 182} s={0.64} look={cast[7]} pose="walk" facing={-1} />
      <Figure x={560} y={H + 10} s={0.95} look={{ ...cast[3], bag: p.blue }} pose="walk" back />
      <Atmosphere id={id} p={p} />
    </Frame>
  )
}

/* ---------- Quad: students on the lawn between classes ---------- */
export const quad: SceneFn = (id, p) => {
  const r = rng(11)
  const ground = 520
  return (
    <Frame>
      <defs>
        <SkyGradient id={id} p={p} />
        <linearGradient id={`${id}-stoneShade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.05" />
          <stop offset="1" stopColor="#000" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id={`${id}-lawn`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.lawnLit} />
          <stop offset="1" stopColor={p.lawn} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      {p.mood === 'evening' && <circle cx={260} cy={360} r={70} fill={p.sun} opacity="0.8" />}
      <g transform="translate(-150 120) scale(1.25 0.8)">
        <Building id={id} p={p} x={150} y={250} w={900} h={250} />
      </g>
      <rect x={0} y={ground} width={W} height={H - ground} fill={`url(#${id}-lawn)`} />
      {Array.from({ length: 70 }, (_, i) => (
        <path key={i} d={`M${r() * W},${ground + 20 + r() * 360} l4,-10 l4,10`} stroke={p.foliage} strokeWidth="2" fill="none" opacity="0.5" />
      ))}
      <path d={`M${W * 0.62},${ground} L${W * 0.7},${ground} L${W + 40},${H} L${W * 0.86},${H} Z`} fill={p.stone} opacity="0.85" />
      <Tree x={110} y={ground + 40} s={1.3} p={p} seed={21} />
      <Tree x={1090} y={ground + 20} s={1.05} p={p} seed={4} />
      {/* group on a blanket */}
      <ellipse cx={420} cy={ground + 250} rx={190} ry={44} fill={p.yellow} opacity="0.9" />
      <Figure x={330} y={ground + 260} s={0.72} look={cast[0]} pose="sit" shadow={false} />
      <Figure x={520} y={ground + 262} s={0.72} look={cast[3]} pose="sit" facing={-1} shadow={false} />
      <Figure x={430} y={ground + 290} s={0.78} look={cast[4]} pose="seated" back />
      <rect x={400} y={ground + 230} width={40} height={10} rx={2} fill={p.navy} />
      <Mugless x={470} y={ground + 236} p={p} />
      {/* pair walking on the path */}
      <Figure x={850} y={ground + 140} s={0.5} look={{ ...cast[7], bag: p.navy }} pose="walk" facing={-1} />
      <Figure x={900} y={ground + 150} s={0.5} look={cast[9]} pose="walk" facing={-1} holding="book" />
      {/* reader under the tree */}
      <Figure x={150} y={ground + 120} s={0.55} look={cast[6]} pose="sit" />
      <Atmosphere id={id} p={p} />
    </Frame>
  )
}

function Mugless({ x, y, p }: { x: number; y: number; p: Palette }) {
  return <rect x={x} y={y - 18} width={14} height={18} rx={3} fill={p.paper} />
}

/* ---------- Sports field: runners on the track ---------- */
export const activities: SceneFn = (id, p) => {
  const ground = 470
  return (
    <Frame>
      <defs>
        <SkyGradient id={id} p={p} />
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      <circle cx={240} cy={190} r={80} fill={p.sun} opacity="0.6" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <Tree key={i} x={60 + i * 190} y={ground + 10} s={0.7 + (i % 3) * 0.12} p={p} seed={40 + i} kind={i % 2 ? 'tall' : 'round'} />
      ))}
      <rect x={0} y={ground} width={W} height={H - ground} fill={p.lawn} />
      <path d={`M-100,${H} Q600,${ground - 30} 1300,${H}`} fill={p.coral} opacity="0.9" />
      <path d={`M-100,${H + 60} Q600,${ground + 60} 1300,${H + 60}`} fill={p.lawnLit} />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M-100,${H + i * 18 - 40} Q600,${ground + i * 22} 1300,${H + i * 18 - 40}`} stroke={p.paper} strokeWidth="3" fill="none" opacity="0.8" />
      ))}
      <rect x={880} y={ground - 90} width={8} height={100} fill={p.paper} />
      <rect x={1060} y={ground - 90} width={8} height={100} fill={p.paper} />
      <rect x={880} y={ground - 90} width={188} height={8} fill={p.paper} />
      <Figure x={360} y={ground + 170} s={0.68} look={{ ...cast[4], top: p.yellow }} pose="walk" />
      <Figure x={520} y={ground + 200} s={0.74} look={{ ...cast[1], top: p.blue }} pose="walk" />
      <Figure x={700} y={ground + 240} s={0.82} look={{ ...cast[8], top: p.greenDeep }} pose="walk" />
      <Figure x={140} y={ground + 70} s={0.42} look={cast[2]} pose="stand" />
      <Atmosphere id={id} p={p} />
    </Frame>
  )
}

/* ---------- Fieldwork: students sampling a river ---------- */
export const field: SceneFn = (id, p) => {
  const r = rng(77)
  const bank = 470
  return (
    <Frame>
      <defs>
        <SkyGradient id={id} p={p} />
        <linearGradient id={`${id}-water`} gradientUnits="userSpaceOnUse" x1="0" y1={bank + 60} x2="0" y2={H}>
          <stop offset="0" stopColor={p.blueSoft} />
          <stop offset="1" stopColor={p.blue} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      <path d={`M0,${bank - 120} Q300,${bank - 190} 600,${bank - 130} T1200,${bank - 140} V${bank} H0 Z`} fill={p.greenSoft} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Tree key={i} x={80 + i * 270} y={bank} s={0.85 + (i % 2) * 0.2} p={p} seed={60 + i} />
      ))}
      <rect x={0} y={bank} width={W} height={H - bank} fill={p.lawn} />
      <path d={`M0,${bank + 90} Q400,${bank + 40} 800,${bank + 80} T1200,${bank + 60} V${H} H0 Z`} fill={`url(#${id}-water)`} />
      {Array.from({ length: 30 }, (_, i) => (
        <rect key={i} x={r() * W} y={bank + 110 + r() * 260} width={20 + r() * 60} height={3} rx={1.5} fill="#fff" opacity="0.35" />
      ))}
      {Array.from({ length: 26 }, (_, i) => {
        const x = r() * W
        return <path key={`reed${i}`} d={`M${x},${bank + 70} q${(r() - 0.5) * 20},-60 ${(r() - 0.5) * 30},-110`} stroke={p.foliageDark} strokeWidth="4" fill="none" />
      })}
      {/* waders standing in water — water line hides legs */}
      <Figure x={460} y={bank + 330} s={0.86} look={{ ...cast[2], bottom: p.greenDeep, top: p.yellow }} pose="stand" holding="tablet" />
      <Figure x={680} y={bank + 300} s={0.8} look={{ ...cast[1], bottom: p.greenDeep, top: p.coral }} pose="point" facing={-1} />
      <path d={`M300,${bank + 250} Q560,${bank + 220} 860,${bank + 250} V${H} H300 Z`} fill={`url(#${id}-water)`} opacity="0.92" />
      <rect x={520} y={bank + 228} width={20} height={34} rx={4} fill={p.paper} />
      <Atmosphere id={id} p={p} />
    </Frame>
  )
}

/* ---------- Community garden: volunteering ---------- */
export const community: SceneFn = (id, p) => {
  const r = rng(91)
  const ground = 500
  return (
    <Frame>
      <defs>
        <SkyGradient id={id} p={p} />
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={60 + i * 290} y={ground - 200 + (i % 2) * 30} width={220} height={220} fill={i % 2 ? p.stone : p.brick} />
          <path d={`M${50 + i * 290},${ground - 200 + (i % 2) * 30} L${170 + i * 290},${ground - 290 + (i % 2) * 30} L${290 + i * 290},${ground - 200 + (i % 2) * 30} Z`} fill={p.roof} />
          <rect x={100 + i * 290} y={ground - 150 + (i % 2) * 30} width={50} height={60} fill={p.windowLight} />
          <rect x={190 + i * 290} y={ground - 150 + (i % 2) * 30} width={50} height={60} fill={p.windowLight} />
        </g>
      ))}
      {Array.from({ length: 24 }, (_, i) => (
        <rect key={i} x={i * 52} y={ground - 70} width={10} height={80} fill={p.wood} />
      ))}
      <rect x={0} y={ground - 50} width={W} height={8} fill={p.wood} />
      <rect x={0} y={ground} width={W} height={H - ground} fill={p.lawn} />
      {/* raised beds */}
      {[0, 1].map((b) => (
        <g key={b}>
          <path d={`M${120 + b * 560},${ground + 120} L${560 + b * 520},${ground + 120} L${600 + b * 520},${ground + 220} L${80 + b * 560},${ground + 220} Z`} fill={p.woodDark} />
          <path d={`M${130 + b * 560},${ground + 124} L${552 + b * 520},${ground + 124} L${580 + b * 520},${ground + 190} L${100 + b * 560},${ground + 190} Z`} fill="#6b5640" />
          {Array.from({ length: 12 }, (_, i) => (
            <g key={i}>
              <ellipse cx={150 + b * 560 + i * 34 + r() * 10} cy={ground + 130 + r() * 40} rx={16} ry={22} fill={i % 2 ? p.foliage : p.foliageLit} />
              {i % 4 === 0 && <circle cx={150 + b * 560 + i * 34} cy={ground + 122} r={7} fill={i % 8 ? p.coral : p.yellow} />}
            </g>
          ))}
        </g>
      ))}
      <Figure x={300} y={ground + 128} s={0.78} look={{ ...cast[3], top: p.greenDeep }} pose="kneel" />
      <Figure x={640} y={ground + 150} s={0.86} look={{ ...cast[0], top: p.paper }} pose="stand" />
      <path d={`M${640 + 30},${ground + 40} l40,10 l-6,30 l-36,-6 Z`} fill={p.blue} />
      <Figure x={900} y={ground + 120} s={0.8} look={{ ...cast[5] }} pose="point" facing={-1} />
      <Atmosphere id={id} p={p} />
    </Frame>
  )
}

/* ---------- Campus map (contact section) ---------- */
export const map: SceneFn = (_id, p) => {
  const r = rng(5)
  return (
    <Frame>
      <rect width={W} height={H} fill={p.mood === 'evening' ? '#e9e2d2' : p.paper} />
      {/* parks */}
      <path d="M0,560 Q180,520 260,620 T420,900 H0 Z" fill={p.greenSoft} />
      <path d="M760,0 H1200 V300 Q1000,340 900,240 T760,0 Z" fill={p.greenSoft} />
      <rect x={470} y={330} width={300} height={200} rx={20} fill={p.greenSoft} />
      {/* river */}
      <path d="M-20,180 C220,240 300,120 520,170 S900,330 1220,260" stroke={p.blueSoft} strokeWidth="46" fill="none" strokeLinecap="round" />
      {/* streets */}
      <g stroke="#fff" strokeLinecap="round" fill="none">
        <path d="M0,420 H1200" strokeWidth="26" />
        <path d="M380,0 V900" strokeWidth="22" />
        <path d="M860,300 V900" strokeWidth="18" />
        <path d="M0,700 Q600,640 1200,760" strokeWidth="16" />
        <path d="M520,0 L700,330" strokeWidth="12" />
      </g>
      {/* blocks */}
      {Array.from({ length: 26 }, (_, i) => {
        const x = r() * 1150
        const y = r() * 860
        if (x > 440 && x < 800 && y > 300 && y < 560) return null
        return <rect key={i} x={x} y={y} width={40 + r() * 70} height={30 + r() * 50} rx={4} fill={p.stone} />
      })}
      {/* campus buildings */}
      <rect x={490} y={350} width={110} height={70} rx={6} fill={p.blueSoft} />
      <rect x={620} y={350} width={130} height={46} rx={6} fill={p.blueSoft} />
      <rect x={520} y={440} width={90} height={70} rx={6} fill={p.blueSoft} />
      <rect x={640} y={420} width={110} height={90} rx={6} fill={p.blueSoft} />
      <path d="M470,330 h300 v200 h-300 Z" fill="none" stroke={p.blue} strokeWidth="3" strokeDasharray="10 8" rx={20} />
      {/* pin */}
      <g transform="translate(620 330)">
        <ellipse cx={0} cy={6} rx={22} ry={7} fill="#14213a" opacity="0.2" />
        <path d="M0,0 C-30,-34 -38,-56 -38,-72 A38,38 0 0 1 38,-72 C38,-56 30,-34 0,0 Z" fill={p.navy} />
        <circle cx={0} cy={-72} r={14} fill={p.yellow} />
      </g>
      {/* rail */}
      <path d="M0,820 L1200,600" stroke={p.navy} strokeWidth="6" strokeDasharray="22 12" opacity="0.5" />
      <circle cx={210} cy={782} r={14} fill={p.paper} stroke={p.navy} strokeWidth="5" />
    </Frame>
  )
}
