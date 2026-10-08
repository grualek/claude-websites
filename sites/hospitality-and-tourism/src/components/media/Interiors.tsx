import type { SceneFn } from './Exteriors'
import type { Palette } from './palette'
import { Cypress, Frame, rng, Sea, Sky, SkyDefs } from './parts'

/* Interior & still-life scenes (1200×900 canvas). */

const W = 1200
const H = 900


const Veil = ({ id, p }: { id: string; p: Palette }) => (p.veil ? <rect width={W} height={H} fill={`url(#${id}-veil)`} /> : null)

function Bed({ x, y, w, p }: { x: number; y: number; w: number; p: Palette }) {
  return (
    <g>
      <ellipse cx={x + w / 2} cy={y + 190} rx={w * 0.6} ry={22} fill={p.shadow} opacity="0.2" />
      <rect x={x + w - 30} y={y - 150} width={40} height={340} rx="6" fill={p.wood} />
      <rect x={x} y={y + 40} width={w} height={130} rx="10" fill={p.wallShade} />
      <path d={`M${x - 10},${y + 10} C${x + w * 0.3},${y - 20} ${x + w * 0.7},${y + 20} ${x + w},${y} L${x + w},${y + 120} L${x - 10},${y + 150} Z`} fill={p.linen} />
      <path d={`M${x + 20},${y + 40} C${x + w * 0.4},${y + 30} ${x + w * 0.6},${y + 70} ${x + w * 0.85},${y + 50}`} stroke={p.wallShade} strokeWidth="3" fill="none" opacity="0.7" />
      <rect x={x + w * 0.72} y={y - 60} width={w * 0.24} height={70} rx="26" fill={p.linen} transform={`rotate(-8 ${x + w * 0.84} ${y - 25})`} />
      <rect x={x + w * 0.55} y={y - 44} width={w * 0.22} height={62} rx="24" fill={p.wallLit} transform={`rotate(-4 ${x + w * 0.66} ${y - 13})`} />
      <path d={`M${x - 10},${y + 90} L${x + w * 0.45},${y + 70} L${x + w * 0.45},${y + 150} L${x - 10},${y + 160} Z`} fill={p.foliage} opacity="0.55" />
    </g>
  )
}

/* ---------- Garden Room: limewashed room, French doors onto a citrus garden ---------- */
export const gardenRoom: SceneFn = (id, p) => {
  const r = rng(5)
  return (
    <Frame>
      <defs>
        <SkyDefs id={id} p={p} sunX={0.45} sunY={0.2} />
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={p.wallShade} />
          <stop offset="0.6" stopColor={p.wallLit} />
          <stop offset="1" stopColor={p.wallShade} />
        </linearGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.glow} stopOpacity="0.5" />
          <stop offset="1" stopColor={p.glow} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.stone} />
          <stop offset="1" stopColor={p.stoneDark} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-wall)`} />
      {/* doorway with garden view */}
      <g transform="translate(-110 0)">
        <rect x={250} y={120} width={380} height={560} fill={p.skyLow} />
        <rect x={250} y={120} width={380} height={300} fill={`url(#${id}-sky)`} />
        <rect x={250} y={400} width={380} height={280} fill={p.foliage} />
        {Array.from({ length: 14 }, (_, i) => (
          <circle key={i} cx={260 + r() * 360} cy={380 + r() * 200} r={30 + r() * 40} fill={i % 3 ? p.foliage : p.foliageLit} />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <circle key={`l${i}`} cx={270 + r() * 340} cy={360 + r() * 220} r={7} fill="#e9c349" />
        ))}
        <Cypress x={580} y={480} h={300} fill={p.cypress} lit={p.foliage} />
        <rect x={250} y={600} width={380} height={80} fill={p.stone} />
        {/* door leaves */}
        <path d="M250,120 L170,150 L170,700 L250,680 Z" fill={p.wood} opacity="0.9" />
        <path d="M630,120 L700,148 L700,698 L630,680 Z" fill={p.wood} opacity="0.85" />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={176} y1={200 + i * 120} x2={244} y2={185 + i * 118} stroke={p.woodDark} strokeWidth="3" />
        ))}
        <rect x={240} y={110} width={400} height={14} fill={p.wallLit} />
        <rect x={244} y={110} width={8} height={575} fill={p.wallLit} />
        <rect x={628} y={110} width={8} height={575} fill={p.wallLit} />
      </g>
      {/* floor */}
      <path d={`M0,680 L${W},680 L${W},${H} L0,${H} Z`} fill={`url(#${id}-floor)`} />
      <path d="M140,680 L520,680 L760,900 L-100,900 Z" fill={`url(#${id}-beam)`} />
      {/* rug */}
      <path d="M120,760 L760,740 L860,880 L40,900 Z" fill={p.linen} opacity="0.55" />
      <Bed x={610} y={520} w={360} p={p} />
      {/* side table + vase */}
      <g transform="translate(-90 0)">
        <rect x={620} y={600} width={80} height={130} fill={p.wood} />
        <path d="M640,600 C630,560 650,540 660,520 C670,540 690,560 680,600 Z" fill={p.roof} />
        <path d="M660,520 C640,470 610,450 600,420 M660,520 C680,470 700,450 720,430" stroke={p.foliage} strokeWidth="5" fill="none" />
      </g>
      <Veil id={id} p={p} />
    </Frame>
  )
}

/* ---------- Ocean Suite: wide opening to the sea, sheer curtain, stone bath ---------- */
export const oceanSuite: SceneFn = (id, p) => {
  const horizon = 430
  const sunX = 800
  return (
    <Frame>
      <defs>
        <SkyDefs id={id} p={p} sunX={sunX / W} sunY={0.46} />
        <linearGradient id={`${id}-curtain`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={p.linen} stopOpacity="0.95" />
          <stop offset="1" stopColor={p.linen} stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.stone} />
          <stop offset="1" stopColor={p.stoneDark} />
        </linearGradient>
        <linearGradient id={`${id}-bath`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={p.wallLit} />
          <stop offset="1" stopColor={p.wallShade} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={p.wallShade} />
      {/* opening */}
      <g>
        <Sky id={id} p={p} w={W} h={horizon} sunX={sunX} sunY={horizon - 50} sunR={26} />
        <Sea id={id} p={p} y={horizon} w={W} h={210} sunX={sunX} seed={13} />
        <path d={`M120,${horizon} C220,${horizon - 40} 360,${horizon - 44} 440,${horizon} Z`} fill={p.hillFar} />
        {/* balcony rail */}
        <rect y={560} width={W} height={6} fill={p.woodDark} />
        {Array.from({ length: 30 }, (_, i) => (
          <rect key={i} x={i * 42} y={566} width={3} height={74} fill={p.woodDark} opacity="0.7" />
        ))}
      </g>
      {/* frame + walls */}
      <rect x={0} y={0} width={W} height={60} fill={p.wallLit} />
      <rect x={0} y={0} width={90} height={H} fill={p.wallLit} />
      <rect x={1110} y={0} width={90} height={H} fill={p.wallShade} />
      <rect x={90} y={60} width={1020} height={10} fill={p.woodDark} />
      {/* curtain */}
      <path d="M90,70 C160,260 120,480 200,660 L300,660 C250,480 290,260 220,70 Z" fill={`url(#${id}-curtain)`} />
      <path d="M140,70 C200,280 170,470 240,660" stroke={p.wallShade} strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M1110,70 C1060,240 1080,460 1040,660 L980,660 C1010,460 1000,260 1050,70 Z" fill={`url(#${id}-curtain)`} opacity="0.8" />
      {/* floor */}
      <path d={`M0,640 L${W},640 L${W},${H} L0,${H} Z`} fill={`url(#${id}-floor)`} />
      <path d="M90,640 L1110,640 L1200,900 L0,900 Z" fill={p.glow} opacity={p.mood === 'dusk' ? 0.12 : 0.2} />
      {/* bath */}
      <ellipse cx={560} cy={820} rx={300} ry={26} fill={p.shadow} opacity="0.22" />
      <path d="M290,700 C290,680 310,670 340,670 L780,670 C810,670 830,680 830,700 C830,780 760,820 680,820 L440,820 C360,820 290,780 290,700 Z" fill={`url(#${id}-bath)`} />
      <ellipse cx={560} cy={686} rx={250} ry={18} fill={p.pool} opacity="0.65" />
      <path d="M760,690 C780,660 810,660 812,690" stroke={p.woodDark} strokeWidth="4" fill="none" />
      {/* stool with towel */}
      <rect x={900} y={740} width={110} height={90} fill={p.wood} />
      <rect x={905} y={720} width={100} height={28} rx="6" fill={p.linen} />
      <Veil id={id} p={p} />
    </Frame>
  )
}

/* ---------- Spa: vaulted stone bathhouse, oculus light, still pool ---------- */
export const spa: SceneFn = (id, p) => {
  const r = rng(19)
  return (
    <Frame>
      <defs>
        <radialGradient id={`${id}-vault`} cx="0.5" cy="0" r="1">
          <stop offset="0" stopColor={p.stone} />
          <stop offset="1" stopColor={p.stoneDark} />
        </radialGradient>
        <linearGradient id={`${id}-shaft`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.glow} stopOpacity="0.6" />
          <stop offset="1" stopColor={p.glow} stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.pool} />
          <stop offset="1" stopColor={p.poolDeep} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-vault)`} />
      {/* stone coursing */}
      {Array.from({ length: 90 }, (_, i) => (
        <rect key={i} x={r() * W} y={r() * 560} width={50 + r() * 80} height={22 + r() * 18} rx="3" fill={i % 2 ? p.wallLit : p.stoneDark} opacity="0.16" />
      ))}
      {/* receding arches */}
      {[0, 1, 2].map((i) => {
        const inset = 120 + i * 120
        const top = 80 + i * 70
        return (
          <path
            key={i}
            d={`M${inset},620 V${top + (600 - inset) * 0.5} A${600 - inset},${(600 - inset) * 0.75} 0 0 1 ${W - inset},${top + (600 - inset) * 0.5} V620`}
            stroke={p.stoneDark}
            strokeWidth={22 - i * 5}
            fill="none"
            opacity={0.55 - i * 0.12}
          />
        )
      })}
      <path d="M440,620 V420 a160,160 0 0 1 320,0 V620 Z" fill={p.shadow} opacity="0.35" />
      {/* light shaft */}
      <path d="M560,0 L640,0 L760,620 L440,620 Z" fill={`url(#${id}-shaft)`} />
      <ellipse cx={600} cy={8} rx={44} ry={10} fill={p.sun} />
      {/* pool */}
      <rect y={620} width={W} height={280} fill={`url(#${id}-water)`} />
      <rect y={612} width={W} height={12} fill={p.stone} />
      <ellipse cx={600} cy={700} rx={180} ry={30} fill={p.glow} opacity="0.35" />
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d={`M${200 + ((i * 83) % 700)},${650 + i * 18} q40,-4 80,0 t80,0`} stroke={p.shimmer} strokeWidth="1.4" fill="none" opacity="0.35" />
      ))}
      {/* steps into the water */}
      <rect x={60} y={620} width={220} height={26} fill={p.stone} opacity="0.85" />
      <rect x={60} y={646} width={170} height={24} fill={p.stone} opacity="0.55" />
      {/* folded towels + candles */}
      <rect x={930} y={580} width={160} height={30} rx="6" fill={p.linen} />
      <rect x={945} y={556} width={130} height={26} rx="6" fill={p.wallLit} />
      {[880, 905].map((x) => (
        <g key={x}>
          <rect x={x} y={584} width={12} height={28} fill={p.linen} />
          <circle cx={x + 6} cy={578} r={4} fill={p.glow} />
          <circle cx={x + 6} cy={578} r={16} fill={p.glow} opacity="0.2" />
        </g>
      ))}
    </Frame>
  )
}

/* ---------- Ceramics: top-down breakfast still life with leaf shadows ---------- */
export const ceramics: SceneFn = (id, p) => {
  const r = rng(33)
  const plate = (cx: number, cy: number, rad: number, glaze: string, k: number) => (
    <g key={k}>
      <ellipse cx={cx + 10} cy={cy + 14} rx={rad} ry={rad} fill={p.shadow} opacity="0.18" />
      <circle cx={cx} cy={cy} r={rad} fill={glaze} />
      <circle cx={cx} cy={cy} r={rad * 0.72} fill={p.wallLit} opacity="0.4" />
      <circle cx={cx} cy={cy} r={rad * 0.98} stroke={p.wallDeep} strokeWidth="2" fill="none" opacity="0.5" />
    </g>
  )
  const fig = (x: number, y: number, k: number) => (
    <g key={`f${k}`}>
      <path d={`M${x},${y - 34} C${x + 30},${y - 20} ${x + 34},${y + 24} ${x},${y + 28} C${x - 34},${y + 24} ${x - 30},${y - 20} ${x},${y - 34} Z`} fill="#5a3a4a" />
      <ellipse cx={x - 8} cy={y - 6} rx={8} ry={14} fill="#8a6378" opacity="0.6" />
    </g>
  )
  return (
    <Frame>
      <defs>
        <pattern id={`${id}-linen`} width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill={p.linen} />
          <path d="M0,4 H8 M4,0 V8" stroke={p.wallShade} strokeWidth="0.6" opacity="0.5" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill={p.wood} />
      {Array.from({ length: 14 }, (_, i) => (
        <path key={i} d={`M0,${i * 70 + r() * 20} C400,${i * 70 + 20} 800,${i * 70 - 10} ${W},${i * 70 + 10}`} stroke={p.woodDark} strokeWidth="2" fill="none" opacity="0.25" />
      ))}
      <path d="M140,-20 L760,-20 L700,940 L80,940 Z" fill={`url(#${id}-linen)`} />
      {plate(400, 330, 170, p.wallLit, 1)}
      {plate(820, 560, 130, '#9aa58a', 2)}
      {plate(330, 690, 100, p.stone, 3)}
      {/* bread */}
      <ellipse cx={380} cy={320} rx={90} ry={56} fill="#c18e5a" transform="rotate(-20 380 320)" />
      <path d="M320,300 l40,-20 M350,330 l50,-26 M390,350 l40,-22" stroke="#8d5f36" strokeWidth="5" strokeLinecap="round" />
      {/* figs */}
      {fig(820, 540, 1)}
      {fig(870, 590, 2)}
      <path d="M780,600 C800,560 840,570 850,600 C840,630 790,630 780,600 Z" fill="#a8455a" />
      <ellipse cx={815} cy={600} rx={20} ry={14} fill="#d77a8a" opacity="0.8" />
      {/* olive oil bowl */}
      <circle cx={330} cy={690} r={56} fill="#c2a43d" />
      <circle cx={318} cy={676} r={16} fill="#f2dc84" opacity="0.6" />
      {/* lemons */}
      <ellipse cx={1000} cy={260} rx={52} ry={40} fill="#e9c349" transform="rotate(25 1000 260)" />
      <ellipse cx={1060} cy={330} rx={46} ry={36} fill="#e3b93a" transform="rotate(-15 1060 330)" />
      <path d="M1020,220 c30,-30 70,-30 90,-10 c-30,10 -60,20 -90,10 Z" fill={p.foliage} />
      {/* cup */}
      <circle cx={640} cy={160} r={58} fill={p.wallLit} />
      <circle cx={640} cy={160} r={44} fill="#6b4329" />
      <path d="M698,160 h30" stroke={p.wallLit} strokeWidth="14" strokeLinecap="round" />
      {/* leaf shadows */}
      <g fill={p.shadow} opacity="0.13">
        {Array.from({ length: 18 }, (_, i) => {
          const x = 600 + r() * 600
          const y = r() * 900
          return <ellipse key={i} cx={x} cy={y} rx={50} ry={18} transform={`rotate(${r() * 180} ${x} ${y})`} />
        })}
      </g>
      <Veil id={id} p={p} />
    </Frame>
  )
}
