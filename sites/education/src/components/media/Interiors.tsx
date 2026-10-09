import type { SceneFn } from './Campus'
import type { Palette } from './palette'
import { Atmosphere, Books, Bust, cast, Figure, Frame, H, Laptop, LightBeam, Mug, PendantLamp, Plant, rng, Sheet, SkyGradient, W, Window } from './parts'

/* Interior learning spaces (1200×900 canvas). Back wall → windows → people behind furniture → furniture → foreground. */

function Room({ id, p, floorY, wall }: { id: string; p: Palette; floorY: number; wall?: string }) {
  return (
    <>
      <defs>
        <SkyGradient id={id} p={p} />
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={wall ?? p.wallShade} />
          <stop offset="0.45" stopColor={wall ?? p.wall} />
          <stop offset="1" stopColor={p.wallShade} />
        </linearGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.floorDeep} />
          <stop offset="1" stopColor={p.floor} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-wall)`} />
      {wall && <rect width={W} height={H} fill={wall} opacity="0.55" />}
      <rect x={0} y={floorY} width={W} height={H - floorY} fill={`url(#${id}-floor)`} />
      <rect x={0} y={floorY - 14} width={W} height={14} fill={p.wallDeep} opacity="0.6" />
    </>
  )
}

/** Table top in gentle perspective, front edge facing the viewer. */
function Table({ x, y, w, depth = 90, p, color }: { x: number; y: number; w: number; depth?: number; p: Palette; color?: string }) {
  const c = color ?? p.wood
  return (
    <g>
      <path d={`M${x + 40},${y} L${x + w - 40},${y} L${x + w},${y + depth} L${x},${y + depth} Z`} fill={c} />
      <path d={`M${x + 40},${y} L${x + w - 40},${y} L${x + w - 30},${y + 12} L${x + 30},${y + 12} Z`} fill="#fff" opacity="0.18" />
      <rect x={x} y={y + depth} width={w} height={18} fill={p.woodDark} />
      <rect x={x + 30} y={y + depth + 18} width={14} height={H} fill={p.woodDark} opacity="0.85" />
      <rect x={x + w - 44} y={y + depth + 18} width={14} height={H} fill={p.woodDark} opacity="0.85" />
    </g>
  )
}

function DeskLamp({ x, y, p, color }: { x: number; y: number; p: Palette; color?: string }) {
  return (
    <g>
      {p.lampOn > 0.5 && <ellipse cx={x + 30} cy={y - 10} rx={110} ry={60} fill={p.glow} opacity={0.25} />}
      <rect x={x - 26} y={y - 8} width={52} height={8} rx={3} fill={p.navy} />
      <path d={`M${x},${y - 8} L${x},${y - 70}`} stroke={p.navy} strokeWidth="5" />
      <path d={`M${x - 8},${y - 70} L${x + 58},${y - 92} L${x + 64},${y - 70} L${x - 4},${y - 52} Z`} fill={color ?? p.greenDeep} />
      <path d={`M${x - 4},${y - 52} L${x + 64},${y - 70}`} stroke={p.glow} strokeWidth="4" opacity={0.4 + 0.6 * p.lampOn} />
    </g>
  )
}

/* ---------- Library: tall shelves, arched window, long reading table ---------- */
export const library: SceneFn = (id, p) => {
  const floorY = 690
  return (
    <Frame>
      <Room id={id} p={p} floorY={floorY} />
      <Window id={id} p={p} x={440} y={90} w={320} h={480} cols={4} rows={5} arch outside="trees" />
      <LightBeam id={id} p={p} x={460} y={560} w={280} h={330} skew={-120} opacity={p.mood === 'evening' ? 0.1 : 0.3} />
      {[0, 1].map((side) => {
        const x0 = side ? 860 : 0
        return (
          <g key={side}>
            <rect x={x0} y={40} width={340} height={floorY - 30} fill={p.woodDark} />
            {Array.from({ length: 6 }, (_, i) => (
              <g key={i}>
                <rect x={x0 + 14} y={60 + i * 104} width={312} height={92} fill="#5c4330" />
                <Books x={x0 + 18} y={150 + i * 104} w={304} h={78} seed={side * 10 + i + 1} p={p} />
                <rect x={x0 + 8} y={150 + i * 104} width={324} height={10} fill={p.wood} />
              </g>
            ))}
          </g>
        )
      })}
      <PendantLamp x={600} y={0} len={90} p={p} color={p.greenDeep} />
      {/* browsing student */}
      <Figure x={1010} y={floorY + 130} s={1.2} look={{ ...cast[5], bag: p.coral }} pose="stand" back />
      {/* readers behind the table */}
      <Figure x={360} y={800} s={1.05} look={cast[0]} pose="seated" />
      <Figure x={600} y={796} s={1} look={cast[7]} pose="seated" />
      <Figure x={830} y={802} s={1.05} look={cast[3]} pose="seated" />
      <Table x={170} y={700} w={860} depth={70} p={p} />
      <DeskLamp x={480} y={730} p={p} />
      <DeskLamp x={720} y={730} p={p} />
      <Laptop x={600} y={752} s={1} p={p} facing="away" />
      <Laptop x={360} y={758} s={1.05} p={p} facing="away" />
      <rect x={810} y={738} width={70} height={14} rx={2} fill={p.yellow} />
      <rect x={816} y={726} width={60} height={12} rx={2} fill={p.blue} />
      <Mug x={900} y={756} color={p.paper} />
      {/* foreground reader, from behind */}
      <Figure x={210} y={H + 130} s={1.25} look={{ ...cast[4] }} pose="seated" back />
      <Atmosphere id={id} p={p} />
    </Frame>
  )
}

/* ---------- Seminar: discussion around a table, whiteboard, big window ---------- */
export const seminar: SceneFn = (id, p) => {
  const floorY = 620
  return (
    <Frame>
      <Room id={id} p={p} floorY={floorY} />
      <Window id={id} p={p} x={60} y={90} w={420} h={430} cols={3} rows={3} outside="trees" />
      <LightBeam id={id} p={p} x={80} y={520} w={400} h={380} skew={260} opacity={p.mood === 'evening' ? 0.08 : 0.28} />
      {/* whiteboard */}
      <rect x={600} y={150} width={500} height={290} rx={6} fill="#fdfcf8" stroke={p.wallDeep} strokeWidth="8" />
      <rect x={600} y={440} width={500} height={12} fill={p.wallDeep} />
      <circle cx={720} cy={270} r={58} fill="none" stroke={p.blue} strokeWidth="5" />
      <circle cx={800} cy={270} r={58} fill="none" stroke={p.greenDeep} strokeWidth="5" />
      <path d="M900,210 h150 M900,250 h120 M900,290 h140 M900,330 h90" stroke={p.navy} strokeWidth="5" strokeLinecap="round" opacity="0.55" />
      <path d="M640,390 q60,-30 120,0 t120,0" stroke={p.coral} strokeWidth="5" fill="none" />
      <PendantLamp x={420} y={0} len={70} p={p} color={p.navy} />
      <PendantLamp x={820} y={0} len={70} p={p} color={p.navy} />
      {/* behind the table */}
      <Figure x={300} y={800} s={1.05} look={cast[1]} pose="seated" />
      <Figure x={530} y={792} s={1} look={cast[0]} pose="seated" />
      <Figure x={750} y={798} s={1.05} look={cast[9]} pose="seated" />
      <Figure x={970} y={890} s={1.12} look={cast[2]} pose="point" facing={-1} shadow={false} />
      <Table x={140} y={690} w={940} depth={80} p={p} color={p.paper} />
      <Laptop x={520} y={746} p={p} facing="away" />
      <rect x={260} y={720} width={80} height={46} rx={2} fill="#fff" transform="rotate(-6 300 740)" />
      <Mug x={410} y={742} color={p.yellow} />
      <rect x={700} y={724} width={70} height={40} rx={2} fill={p.greenSoft} transform="rotate(4 735 744)" />
      <Mug x={820} y={748} color={p.blue} />
      {/* foreground */}
      <Figure x={1080} y={H + 140} s={1.2} look={cast[8]} pose="seated" back />
      <Plant x={70} y={H - 30} s={1.4} p={p} pot={p.blue} />
      <Atmosphere id={id} p={p} />
    </Frame>
  )
}

/* ---------- Lab: benches, glassware, students in lab coats ---------- */
function Flask({ x, y, s = 1, liquid }: { x: number; y: number; s?: number; liquid: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-8,-70 L-8,-44 L-32,-6 Q-34,0 -28,0 L28,0 Q34,0 32,-6 L8,-44 L8,-70 Z" fill="#eef4f6" opacity="0.85" stroke="#9fb3c4" strokeWidth="2" />
      <path d="M-22,-18 L22,-18 L30,-5 Q32,0 26,0 L-26,0 Q-32,0 -30,-5 Z" fill={liquid} opacity="0.85" />
      <rect x={-11} y={-76} width={22} height={8} rx={2} fill="#9fb3c4" />
    </g>
  )
}

function Microscope({ x, y, p }: { x: number; y: number; p: Palette }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-34} y={-10} width={68} height={10} rx={3} fill={p.navy} />
      <path d="M14,-10 Q30,-60 6,-100" stroke={p.paper} strokeWidth="14" fill="none" strokeLinecap="round" />
      <rect x={-22} y={-50} width={36} height={8} rx={2} fill={p.navy} />
      <rect x={-12} y={-118} width={16} height={52} rx={4} fill={p.navy} transform="rotate(-20 -4 -92)" />
      <rect x={-26} y={-136} width={14} height={22} rx={3} fill={p.blue} transform="rotate(-20 -19 -125)" />
    </g>
  )
}

export const lab: SceneFn = (id, p) => {
  const floorY = 650
  const r = rng(13)
  return (
    <Frame>
      <Room id={id} p={p} floorY={floorY} wall={p.mood === 'evening' ? undefined : '#e4ebee'} />
      <Window id={id} p={p} x={60} y={80} w={1080} h={190} cols={6} rows={1} outside="sky" />
      {/* shelving with bottles */}
      {[0, 1].map((row) => (
        <g key={row}>
          <rect x={120} y={400 + row * 100} width={960} height={10} fill={p.paper} />
          {Array.from({ length: 22 }, (_, i) => {
            const bx = 140 + i * 43
            const bh = 36 + r() * 30
            return <rect key={i} x={bx} y={400 + row * 100 - bh} width={24} height={bh} rx={5} fill={[p.blueSoft, p.greenSoft, p.paper, '#f4dfaa', p.blue][Math.floor(r() * 5)]} opacity="0.95" />
          })}
        </g>
      ))}
      <PendantLamp x={300} y={0} len={40} p={p} color={p.paper} />
      <PendantLamp x={900} y={0} len={40} p={p} color={p.paper} />
      {/* students behind the bench */}
      <Figure x={380} y={920} s={1.22} look={{ ...cast[0], coat: '#f7f5ef' }} pose="stand" />
      <Figure x={780} y={930} s={1.25} look={{ ...cast[1], coat: '#f7f5ef' }} pose="point" facing={-1} shadow={false} />
      <g transform="translate(0 70)">
      {/* bench */}
      <rect x={60} y={680} width={1080} height={30} fill={p.navy} />
      <rect x={70} y={710} width={1060} height={H} fill={p.blue} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x={90 + i * 176} y={730} width={160} height={200} rx={4} fill="#fff" opacity="0.08" />
          <rect x={160 + i * 176} y={760} width={22} height={6} rx={3} fill={p.paper} opacity="0.7" />
        </g>
      ))}
      <Flask x={220} y={680} liquid={p.green} />
      <Flask x={280} y={680} s={0.7} liquid={p.yellow} />
      <Microscope x={560} y={680} p={p} />
      <Flask x={900} y={680} s={0.85} liquid={p.blue} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={980 + i * 22} y={640} width={12} height={40} rx={6} fill={[p.coral, p.green, p.yellow, p.blue, p.greenDeep][i]} opacity="0.85" />
      ))}
      <rect x={970} y={660} width={120} height={20} rx={3} fill={p.paper} />
      </g>
      <Atmosphere id={id} p={p} />
    </Frame>
  )
}

/* ---------- Workshop / maker space: pegboard, workbench, prototype ---------- */
export const workshop: SceneFn = (id, p) => {
  const floorY = 640
  return (
    <Frame>
      <Room id={id} p={p} floorY={floorY} />
      <Window id={id} p={p} x={820} y={80} w={320} h={360} cols={2} rows={3} outside="city" />
      {/* pegboard */}
      <rect x={70} y={110} width={660} height={360} rx={6} fill={p.wood} />
      {Array.from({ length: 18 }, (_, i) =>
        Array.from({ length: 10 }, (_, j) => <circle key={`${i}-${j}`} cx={100 + i * 36} cy={136 + j * 34} r={3} fill={p.woodDark} opacity="0.5" />),
      )}
      <g fill={p.navy}>
        <rect x={120} y={170} width={14} height={120} rx={4} />
        <rect x={100} y={160} width={54} height={26} rx={4} />
        <path d="M200,160 h18 v150 l-9,14 l-9,-14 Z" />
        <circle cx={300} cy={200} r={30} fill="none" stroke={p.navy} strokeWidth="10" />
        <rect x={294} y={226} width={12} height={90} rx={4} />
        <path d="M380,160 l60,0 l-10,140 l-40,0 Z" fill={p.coral} />
        <rect x={470} y={170} width={120} height={16} rx={6} fill={p.blue} />
        <rect x={470} y={200} width={100} height={16} rx={6} fill={p.greenDeep} />
        <rect x={470} y={230} width={140} height={16} rx={6} fill={p.yellow} />
        <circle cx={660} cy={220} r={34} fill={p.wallDeep} />
        <circle cx={660} cy={220} r={10} fill={p.navy} />
      </g>
      <path d="M120,360 h580" stroke={p.woodDark} strokeWidth="8" />
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={140 + i * 110} y={370} width={80} height={60} rx={4} fill={[p.blue, p.yellow, p.green, p.coral, p.blueSoft][i]} />
        ))}
      </g>
      <PendantLamp x={340} y={0} len={60} p={p} color={p.yellow} />
      <PendantLamp x={760} y={0} len={60} p={p} color={p.yellow} />
      {/* maker behind bench */}
      <Figure x={500} y={950} s={1.28} look={{ ...cast[6], coat: p.navy }} pose="stand" />
      <Figure x={840} y={940} s={1.22} look={{ ...cast[7], bag: undefined }} pose="point" facing={-1} shadow={false} />
      <g transform="translate(0 70)">
      {/* workbench */}
      <rect x={60} y={690} width={1080} height={34} fill={p.wood} />
      <rect x={60} y={690} width={1080} height={8} fill="#fff" opacity="0.2" />
      <rect x={60} y={724} width={1080} height={H} fill={p.woodDark} />
      <rect x={90} y={760} width={1020} height={14} fill="#000" opacity="0.12" />
      {/* prototype: small wooden frame model */}
      <g transform="translate(600 690)">
        <rect x={-110} y={-20} width={220} height={20} rx={3} fill={p.paper} />
        <path d="M-90,-20 L-60,-130 L60,-130 L90,-20" stroke={p.woodDark} strokeWidth="10" fill="none" strokeLinejoin="round" />
        <path d="M-60,-130 L0,-180 L60,-130 M0,-180 L0,-20" stroke={p.wood} strokeWidth="8" fill="none" />
        <circle cx={0} cy={-180} r={10} fill={p.yellow} />
      </g>
      {/* vice */}
      <rect x={200} y={650} width={90} height={40} rx={4} fill={p.blue} />
      <rect x={180} y={640} width={130} height={14} rx={4} fill={p.navy} />
      <rect x={950} y={662} width={110} height={28} rx={4} fill={p.coral} />
      </g>
      <Atmosphere id={id} p={p} />
    </Frame>
  )
}

/* ---------- Design studio: pinboard of work, big table, critique ---------- */
export const studio: SceneFn = (id, p) => {
  const floorY = 640
  const r = rng(29)
  const sheetColors = [p.paper, '#fff', p.sun, p.greenSoft, p.blueSoft, '#f6e6b8']
  return (
    <Frame>
      <Room id={id} p={p} floorY={floorY} />
      <Window id={id} p={p} x={860} y={70} w={300} h={470} cols={2} rows={4} outside="trees" />
      <LightBeam id={id} p={p} x={860} y={540} w={300} h={360} skew={-300} opacity={p.mood === 'evening' ? 0.08 : 0.3} />
      {/* pinboard with work */}
      <rect x={60} y={90} width={720} height={420} rx={4} fill={p.stone} />
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 6 }, (_, col) => {
          const sw = 82 + r() * 20
          const sh = 70 + r() * 30
          return (
            <Sheet
              key={`${row}-${col}`}
              x={84 + col * 114 + r() * 10}
              y={110 + row * 98 + r() * 6}
              w={sw}
              h={Math.min(sh, 88)}
              rot={(r() - 0.5) * 6}
              seed={row * 10 + col}
              fill={sheetColors[Math.floor(r() * sheetColors.length)]}
              ink={[p.navy, p.blue, p.greenDeep, p.coral][Math.floor(r() * 4)]}
              pin={r() > 0.5 ? p.coral : p.navy}
            />
          )
        }),
      )}
      <PendantLamp x={560} y={0} len={50} p={p} color={p.paper} />
      {/* critique */}
      <Figure x={300} y={930} s={1.18} look={cast[3]} pose="point" facing={-1} shadow={false} />
      <Figure x={570} y={920} s={1.12} look={{ ...cast[4] }} pose="stand" holding="tablet" />
      <Figure x={810} y={935} s={1.2} look={cast[1]} pose="stand" holding="cup" />
      <Table x={100} y={720} w={1000} depth={70} p={p} color={p.paper} />
      {Array.from({ length: 7 }, (_, i) => (
        <Sheet key={i} x={180 + i * 120} y={724} w={86} h={50} rot={(r() - 0.5) * 16} seed={50 + i} fill={sheetColors[i % sheetColors.length]} />
      ))}
      <Laptop x={980} y={772} s={1.1} p={p} facing="away" />
      <Mug x={150} y={782} color={p.blue} />
      <Atmosphere id={id} p={p} />
    </Frame>
  )
}

/* ---------- Digital learning: live online class on a laptop ---------- */
export const digital: SceneFn = (id, p) => {
  const deskY = 640
  const tiles = [cast[0], cast[5], cast[2], cast[3], cast[8], cast[7]]
  return (
    <Frame>
      <Room id={id} p={p} floorY={H} />
      <Window id={id} p={p} x={70} y={60} w={420} h={480} cols={2} rows={3} outside="trees" />
      <rect x={600} y={0} width={10} height={180} fill={p.navy} opacity="0.1" />
      <Plant x={1090} y={deskY + 4} s={1.3} p={p} pot={p.paper} />
      {/* shelf */}
      <rect x={720} y={180} width={420} height={12} fill={p.wood} />
      <Books x={740} y={180} w={220} h={86} seed={7} p={p} />
      <circle cx={1060} cy={150} r={26} fill={p.greenSoft} />
      {/* desk */}
      <rect x={0} y={deskY} width={W} height={H - deskY} fill={p.wood} />
      <rect x={0} y={deskY} width={W} height={10} fill="#fff" opacity="0.2" />
      {/* laptop */}
      <g transform="translate(600 820)">
        {p.lampOn > 0.5 && <ellipse cx={0} cy={-220} rx={380} ry={240} fill={p.blueSoft} opacity="0.18" />}
        <path d="M-330,0 L330,0 L300,-22 L-300,-22 Z" fill="#aab4c2" />
        <rect x={-300} y={-420} width={600} height={400} rx={14} fill="#1f2738" />
        <rect x={-282} y={-402} width={564} height={350} rx={4} fill="#eef1f4" />
        {tiles.map((look, i) => {
          const col = i % 3
          const row = Math.floor(i / 3)
          const tx = -274 + col * 184
          const ty = -394 + row * 152
          const bg = [p.blueSoft, p.greenSoft, '#f6e6b8', p.stone, '#e7d9cf', p.blueSoft][i]
          return (
            <g key={i}>
              <clipPath id={`${id}-tile-${i}`}>
                <rect x={tx} y={ty} width={176} height={144} rx={6} />
              </clipPath>
              <g clipPath={`url(#${id}-tile-${i})`}>
                <rect x={tx} y={ty} width={176} height={144} fill={bg} />
                <Bust x={tx + 88} y={ty + 150} s={1.05} look={look} />
              </g>
              {i === 1 && <rect x={tx} y={ty} width={176} height={144} rx={6} fill="none" stroke={p.yellow} strokeWidth="4" />}
            </g>
          )
        })}
        <rect x={-282} y={-82} width={564} height={30} fill="#dfe4ea" />
        {[-40, 0, 40].map((dx, i) => (
          <circle key={i} cx={dx} cy={-67} r={9} fill={i === 1 ? p.coral : p.navy} opacity="0.85" />
        ))}
      </g>
      {/* notebook & mug */}
      <g transform="rotate(-8 170 800)">
        <rect x={60} y={740} width={220} height={150} rx={6} fill={p.paper} />
        <rect x={60} y={740} width={14} height={150} fill={p.blue} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={96} y={770 + i * 22} width={150 - (i % 2) * 40} height={4} rx={2} fill={p.navy} opacity="0.35" />
        ))}
      </g>
      <Mug x={1010} y={830} color={p.yellow} />
      {p.lampOn > 0.5 && <ellipse cx={1000} cy={700} rx={200} ry={120} fill={p.glow} opacity="0.2" />}
      <Atmosphere id={id} p={p} />
    </Frame>
  )
}

/* ---------- Collaboration: planning wall with sticky notes ---------- */
export const collaboration: SceneFn = (id, p) => {
  const floorY = 660
  const r = rng(31)
  const notes = [p.yellow, '#f6e6b8', p.greenSoft, p.blueSoft, p.coral]
  return (
    <Frame>
      <Room id={id} p={p} floorY={floorY} />
      <rect x={80} y={90} width={1040} height={430} rx={6} fill="#fdfcf8" stroke={p.wallDeep} strokeWidth="6" />
      {[0, 1, 2, 3].map((c) => (
        <g key={c}>
          <rect x={120 + c * 250} y={120} width={150} height={16} rx={4} fill={p.navy} opacity="0.75" />
          {Array.from({ length: 7 }, (_, i) => {
            const nx = 120 + c * 250 + (i % 2) * 96 + r() * 10
            const ny = 160 + Math.floor(i / 2) * 84 + r() * 8
            return (
              <g key={i} transform={`rotate(${(r() - 0.5) * 8} ${nx + 40} ${ny + 40})`}>
                <rect x={nx} y={ny} width={78} height={72} fill={notes[(c + i) % notes.length]} />
                <rect x={nx + 12} y={ny + 20} width={50} height={4} rx={2} fill={p.navy} opacity="0.35" />
                <rect x={nx + 12} y={ny + 34} width={36} height={4} rx={2} fill={p.navy} opacity="0.25" />
              </g>
            )
          })}
        </g>
      ))}
      <path d="M360,330 C420,300 470,360 520,320" stroke={p.blue} strokeWidth="4" fill="none" markerEnd="" />
      <PendantLamp x={300} y={0} len={30} p={p} color={p.navy} />
      <PendantLamp x={900} y={0} len={30} p={p} color={p.navy} />
      <Figure x={300} y={960} s={1.25} look={{ ...cast[9] }} pose="point" />
      <Figure x={620} y={975} s={1.3} look={{ ...cast[8], bag: p.yellow }} pose="stand" back />
      <Figure x={890} y={965} s={1.25} look={cast[5]} pose="stand" holding="laptop" />
      <Table x={-40} y={800} w={1280} depth={60} p={p} color={p.paper} />
      <Laptop x={240} y={850} s={1.2} p={p} facing="away" />
      <Mug x={980} y={852} color={p.blue} />
      <Atmosphere id={id} p={p} />
    </Frame>
  )
}

/* ---------- Lecture: tiered seating facing a speaker and screen ---------- */
export const lecture: SceneFn = (id, p) => {
  const r = rng(41)
  return (
    <Frame>
      <Room id={id} p={p} floorY={560} />
      <rect x={260} y={70} width={680} height={380} rx={6} fill={p.navy} />
      <rect x={280} y={90} width={640} height={340} rx={2} fill={p.paper} />
      <rect x={320} y={130} width={300} height={22} rx={4} fill={p.navy} />
      <rect x={320} y={170} width={220} height={12} rx={4} fill={p.blue} opacity="0.6" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={340 + i * 60} y={390 - (40 + i * 34)} width={36} height={40 + i * 34} fill={i === 4 ? p.yellow : p.blue} opacity={i === 4 ? 1 : 0.7} />
      ))}
      <circle cx={790} cy={300} r={80} fill={p.greenSoft} />
      <path d="M790,300 L790,220 A80,80 0 0 1 866,326 Z" fill={p.greenDeep} />
      <Figure x={1020} y={600} s={0.9} look={{ ...cast[2], top: p.navy }} pose="point" facing={-1} />
      <rect x={120} y={500} width={120} height={110} fill={p.woodDark} />
      <rect x={110} y={490} width={140} height={20} fill={p.wood} />
      {[0, 1, 2].map((row) => {
        const y = 760 + row * 120
        const s = 0.8 + row * 0.22
        return (
          <g key={row}>
            {Array.from({ length: 6 - row }, (_, i) => (
              <Figure key={i} x={100 + i * (230 + row * 50) + r() * 40} y={y} s={s} look={cast[(i + row * 3) % cast.length]} pose="seated" back />
            ))}
            <rect x={0} y={y - 110 * s} width={W} height={18} fill={p.woodDark} />
            <rect x={0} y={y - 92 * s} width={W} height={H} fill={p.wood} opacity={0.95} />
          </g>
        )
      })}
      <Atmosphere id={id} p={p} />
    </Frame>
  )
}

/* ---------- Event: speaker on stage, audience in the hall ---------- */
export const event: SceneFn = (id, p) => {
  const stageY = 560
  return (
    <Frame>
      <rect width={W} height={H} fill="#1b2440" />
      <rect width={W} height={stageY} fill="#24304f" />
      {/* screen */}
      <rect x={300} y={90} width={600} height={330} rx={6} fill={p.paper} />
      <rect x={300} y={90} width={600} height={330} rx={6} fill={p.blueSoft} opacity="0.6" />
      <rect x={350} y={150} width={330} height={36} rx={6} fill={p.navy} />
      <rect x={350} y={200} width={240} height={16} rx={6} fill={p.navy} opacity="0.5" />
      <circle cx={760} cy={300} r={74} fill={p.yellow} />
      <path d="M350,360 q80,-90 160,-40 t160,-40" stroke={p.greenDeep} strokeWidth="8" fill="none" />
      {/* spotlights */}
      <path d="M220,0 L420,0 L700,560 L420,560 Z" fill={p.glow} opacity="0.12" />
      <path d="M980,0 L1100,0 L900,560 L680,560 Z" fill={p.glow} opacity="0.1" />
      {/* stage */}
      <rect x={0} y={stageY} width={W} height={30} fill={p.woodDark} />
      <rect x={0} y={stageY - 10} width={W} height={14} fill={p.wood} />
      <Figure x={600} y={stageY} s={0.8} look={{ ...cast[0], top: p.coral }} pose="point" facing={-1} />
      <rect x={760} y={stageY - 130} width={70} height={130} fill={p.navy} />
      <rect x={750} y={stageY - 140} width={90} height={20} fill={p.blue} />
      {/* audience silhouettes */}
      {[0, 1, 2].map((row) => (
        <g key={row} opacity={0.98}>
          {Array.from({ length: 9 - row * 2 }, (_, i) => {
            const s = 0.75 + row * 0.35
            const look = { ...cast[(i + row * 2) % cast.length] }
            return <Figure key={i} x={40 + i * (150 + row * 70) + (row % 2) * 60} y={720 + row * 150} s={s} look={{ ...look, top: '#2e3a58', hair: '#141a2b', skin: '#3a4560' }} pose="seated" back />
          })}
        </g>
      ))}
      <Atmosphere id={id} p={{ ...p, veil: 0 }} />
    </Frame>
  )
}

/* ---------- Clubs: band rehearsal in a music room ---------- */
export const clubs: SceneFn = (id, p) => {
  const floorY = 640
  const panelColors = [p.blue, p.greenDeep, p.navy, p.coral, p.blueSoft]
  return (
    <Frame>
      <Room id={id} p={p} floorY={floorY} />
      {Array.from({ length: 5 }, (_, i) =>
        Array.from({ length: 2 }, (_, j) => <rect key={`${i}-${j}`} x={70 + i * 220} y={100 + j * 200} width={190} height={170} rx={10} fill={panelColors[(i + j * 2) % panelColors.length]} opacity="0.85" />),
      )}
      {/* string lights */}
      <path d="M0,60 Q300,130 600,60 T1200,60" stroke={p.navy} strokeWidth="2" fill="none" />
      {Array.from({ length: 20 }, (_, i) => {
        const t = i / 19
        const x = t * 1200
        const y = 60 + Math.sin(t * Math.PI * 2) * 0 + 34 * Math.sin(t * Math.PI * 2 + Math.PI) * -1
        return <circle key={i} cx={x} cy={y + 20} r={7} fill={p.yellow} opacity={0.6 + 0.4 * p.lampOn} />
      })}
      {/* drum kit */}
      <g transform="translate(860 760)">
        <ellipse cx={0} cy={0} rx={90} ry={90} fill={p.paper} />
        <ellipse cx={0} cy={0} rx={70} ry={70} fill={p.coral} />
        <ellipse cx={-120} cy={-70} rx={48} ry={14} fill={p.yellow} />
        <path d="M-120,-70 L-120,90" stroke={p.navy} strokeWidth="5" />
        <ellipse cx={120} cy={-90} rx={56} ry={14} fill={p.yellow} />
        <path d="M120,-90 L120,90" stroke={p.navy} strokeWidth="5" />
        <rect x={-70} y={-120} width={60} height={46} rx={10} fill={p.coral} />
        <rect x={10} y={-124} width={64} height={48} rx={10} fill={p.coral} />
      </g>
      <Figure x={860} y={740} s={0.95} look={cast[4]} pose="seated" />
      {/* guitarist */}
      <Figure x={360} y={900} s={1.2} look={{ ...cast[1], top: p.navy }} pose="stand" />
      <g transform="rotate(-28 360 660)">
        <ellipse cx={360} cy={680} rx={56} ry={46} fill={p.wood} />
        <ellipse cx={330} cy={660} rx={40} ry={34} fill={p.wood} />
        <circle cx={350} cy={672} r={12} fill={p.woodDark} />
        <rect x={380} y={662} width={170} height={16} rx={4} fill={p.woodDark} />
      </g>
      {/* keyboard */}
      <Figure x={610} y={900} s={1.1} look={cast[9]} pose="stand" />
      <rect x={500} y={690} width={220} height={30} rx={4} fill={p.navy} />
      {Array.from({ length: 14 }, (_, i) => (
        <rect key={i} x={508 + i * 15} y={694} width={12} height={20} fill="#fff" />
      ))}
      <path d="M520,720 L500,900 M700,720 L720,900" stroke={p.navy} strokeWidth="8" />
      <rect x={60} y={720} width={140} height={160} rx={8} fill="#2b2f3a" />
      <circle cx={130} cy={800} r={46} fill="#3a3f4b" />
      <Atmosphere id={id} p={p} />
    </Frame>
  )
}

/* ---------- Projects: student team testing a robot ---------- */
export const projects: SceneFn = (id, p) => {
  const floorY = 660
  const r = rng(53)
  return (
    <Frame>
      <Room id={id} p={p} floorY={floorY} />
      {/* project posters */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={120 + i * 340} y={120} width={260} height={330} rx={4} fill={[p.blueSoft, '#f6e6b8', p.greenSoft][i]} />
          <rect x={150 + i * 340} y={150} width={180} height={24} rx={4} fill={p.navy} />
          <rect x={150 + i * 340} y={196} width={200} height={130} rx={4} fill="#fff" opacity="0.7" />
          {[0, 1, 2, 3].map((j) => (
            <rect key={j} x={150 + i * 340} y={350 + j * 20} width={120 + r() * 70} height={6} rx={3} fill={p.navy} opacity="0.35" />
          ))}
        </g>
      ))}
      <PendantLamp x={600} y={0} len={40} p={p} color={p.yellow} />
      <Figure x={260} y={940} s={1.2} look={cast[7]} pose="stand" holding="laptop" />
      <Figure x={930} y={945} s={1.22} look={{ ...cast[0] }} pose="point" facing={-1} shadow={false} />
      <Table x={160} y={720} w={880} depth={70} p={p} color={p.paper} />
      {/* robot */}
      <g transform="translate(600 760)">
        <ellipse cx={0} cy={6} rx={110} ry={14} fill="#14213a" opacity="0.15" />
        <rect x={-90} y={-60} width={180} height={56} rx={10} fill={p.yellow} />
        <circle cx={-56} cy={-4} r={24} fill={p.navy} />
        <circle cx={56} cy={-4} r={24} fill={p.navy} />
        <circle cx={-56} cy={-4} r={8} fill={p.paper} />
        <circle cx={56} cy={-4} r={8} fill={p.paper} />
        <rect x={-50} y={-110} width={70} height={52} rx={8} fill={p.blue} />
        <circle cx={-28} cy={-86} r={8} fill={p.paper} />
        <circle cx={0} cy={-86} r={8} fill={p.paper} />
        <path d="M20,-90 L70,-150 L110,-120" stroke={p.navy} strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={70} cy={-150} r={9} fill={p.coral} />
      </g>
      <path d="M300,770 C380,740 420,800 500,760" stroke={p.coral} strokeWidth="4" fill="none" />
      <Laptop x={330} y={776} s={0.9} p={p} facing="away" />
      {/* foreground: student kneeling to watch */}
      <Figure x={1080} y={H + 40} s={1.1} look={cast[3]} pose="seated" back />
      <Atmosphere id={id} p={p} />
    </Frame>
  )
}
