import { useId } from 'react'
import type { MediaAsset, PortraitSpec } from '../../content/types'
import { Media } from './Media'

interface PortraitProps {
  spec: PortraitSpec
  /** Real headshot — replaces the illustration when supplied */
  photo?: MediaAsset
  name: string
  className?: string
  decorative?: boolean
}

/**
 * Illustrated head-and-shoulders portrait (4:5) in the brand palette, standing in for real headshots.
 * Faceless by design so demo people never look like real individuals.
 */
export function Portrait({ spec, photo, name, className = '', decorative = false }: PortraitProps) {
  const uid = 'p' + useId().replace(/[^a-zA-Z0-9]/g, '')
  if (photo) return <Media asset={photo} className={className} decorative={decorative} />
  const { skin, hair, hairStyle, top, backdrop, glasses, beard } = spec
  const hx = 200
  const hy = 205
  return (
    <div {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': `Illustrated portrait of ${name}` })} className={`grain h-full w-full overflow-hidden ${className}`}>
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id={`${uid}-bg`} cx="0.35" cy="0.25" r="0.9">
            <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-shade`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0.45" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill={backdrop} />
        <rect width="400" height="500" fill={`url(#${uid}-bg)`} />
        <circle cx="300" cy="120" r="120" fill="#fff" opacity="0.18" />

        {/* back hair */}
        {hairStyle === 'long' && <path d={`M${hx - 78},${hy - 20} Q${hx - 96},${hy + 140} ${hx - 70},${hy + 190} L${hx + 70},${hy + 190} Q${hx + 96},${hy + 140} ${hx + 78},${hy - 20} Z`} fill={hair} />}
        {hairStyle === 'wavy' && (
          <path
            d={`M${hx - 80},${hy - 20} Q${hx - 100},${hy + 70} ${hx - 80},${hy + 120} Q${hx - 50},${hy + 150} ${hx - 20},${hy + 125} L${hx + 20},${hy + 125} Q${hx + 50},${hy + 150} ${hx + 80},${hy + 120} Q${hx + 100},${hy + 70} ${hx + 80},${hy - 20} Z`}
            fill={hair}
          />
        )}
        {hairStyle === 'curly' && <ellipse cx={hx} cy={hy - 20} rx={104} ry={100} fill={hair} />}
        {hairStyle === 'bun' && <circle cx={hx + 8} cy={hy - 100} r={38} fill={hair} />}

        {/* shoulders */}
        <path d={`M40,500 Q44,${hy + 150} 120,${hy + 128} L280,${hy + 128} Q356,${hy + 150} 360,500 Z`} fill={top} />
        <path d={`M40,500 Q44,${hy + 150} 120,${hy + 128} L280,${hy + 128} Q356,${hy + 150} 360,500 Z`} fill={`url(#${uid}-shade)`} />
        <path d={`M${hx - 42},${hy + 128} Q${hx},${hy + 182} ${hx + 42},${hy + 128} Z`} fill={skin} />
        <path d={`M${hx - 42},${hy + 128} Q${hx},${hy + 182} ${hx + 42},${hy + 128}`} stroke="#000" strokeOpacity="0.12" strokeWidth="5" fill="none" />
        {/* neck */}
        <rect x={hx - 30} y={hy + 50} width={60} height={86} rx={20} fill={skin} />
        <rect x={hx - 30} y={hy + 50} width={60} height={34} fill="#000" opacity="0.12" />
        {/* ears + head */}
        <ellipse cx={hx - 68} cy={hy + 12} rx={13} ry={20} fill={skin} />
        <ellipse cx={hx + 68} cy={hy + 12} rx={13} ry={20} fill={skin} />
        <ellipse cx={hx} cy={hy} rx={68} ry={82} fill={skin} />
        {/* soft features: brow line, nose shadow, cheeks */}
        <path d={`M${hx - 42},${hy - 14} q12,-7 24,-2 M${hx + 18},${hy - 16} q12,-5 24,2`} stroke={hair} strokeOpacity="0.85" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <ellipse cx={hx - 29} cy={hy + 8} rx={4.6} ry={5.6} fill="#1d1a1a" opacity="0.85" />
        <ellipse cx={hx + 29} cy={hy + 8} rx={4.6} ry={5.6} fill="#1d1a1a" opacity="0.85" />
        <path d={`M${hx + 2},${hy + 4} q8,22 -4,32`} stroke="#000" strokeOpacity="0.14" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d={`M${hx - 18},${hy + 52} q18,10 36,0`} stroke="#000" strokeOpacity="0.2" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx={hx - 38} cy={hy + 32} r={13} fill="#e98a7a" opacity="0.14" />
        <circle cx={hx + 38} cy={hy + 32} r={13} fill="#e98a7a" opacity="0.14" />
        {beard && <path d={`M${hx - 66},${hy + 10} Q${hx - 62},${hy + 92} ${hx},${hy + 92} Q${hx + 62},${hy + 92} ${hx + 66},${hy + 10} Q${hx + 50},${hy + 46} ${hx + 26},${hy + 44} Q${hx},${hy + 38} ${hx - 26},${hy + 44} Q${hx - 50},${hy + 46} ${hx - 66},${hy + 10} Z`} fill={hair} opacity="0.9" />}
        {glasses && (
          <g stroke="#14213a" strokeWidth="5" fill="#fff" fillOpacity="0.12">
            <rect x={hx - 54} y={hy - 2} width={44} height={32} rx={12} />
            <rect x={hx + 10} y={hy - 2} width={44} height={32} rx={12} />
            <path d={`M${hx - 10},${hy + 10} q10,-6 20,0 M${hx - 54},${hy + 8} l-14,-4 M${hx + 54},${hy + 8} l14,-4`} fill="none" />
          </g>
        )}
        {/* front hair */}
        {hairStyle === 'curly' &&
          [-62, -40, -16, 10, 34, 58].map((dx, i) => <circle key={i} cx={hx + dx} cy={hy - 66 + Math.abs(dx) * 0.28} r={30} fill={hair} />)}
        {hairStyle === 'cropped' && <path d={`M${hx - 68},${hy - 14} Q${hx - 70},${hy - 86} ${hx},${hy - 86} Q${hx + 70},${hy - 86} ${hx + 68},${hy - 14} Q${hx + 50},${hy - 56} ${hx},${hy - 58} Q${hx - 50},${hy - 56} ${hx - 68},${hy - 14} Z`} fill={hair} />}
        {(hairStyle === 'short' || hairStyle === 'long' || hairStyle === 'wavy' || hairStyle === 'bun') && (
          <path
            d={`M${hx - 74},${hy + 10} Q${hx - 86},${hy - 96} ${hx + 6},${hy - 92} Q${hx + 88},${hy - 88} ${hx + 74},${hy + 6} Q${hx + 60},${hy - 44} ${hx + 16},${hy - 50} Q${hx - 30},${hy - 40} ${hx - 74},${hy + 10} Z`}
            fill={hair}
          />
        )}
      </svg>
    </div>
  )
}
