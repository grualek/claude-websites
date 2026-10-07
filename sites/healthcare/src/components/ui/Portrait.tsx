import type { Specialist } from '../../content/types'

const tones = {
  blue: { bg: '#e3eaf0', arch: '#d2dde7', fig: '#9db2c4', figDeep: '#7f98ad' },
  sage: { bg: '#e4ebe4', arch: '#d3dfd4', fig: '#a2b8a8', figDeep: '#86a08d' },
  clay: { bg: '#f3e9de', arch: '#e9dac8', fig: '#cdb39a', figDeep: '#b8987b' },
  sand: { bg: '#eee9df', arch: '#e2dacc', fig: '#bfb3a1', figDeep: '#a69882' },
}

/**
 * Portrait slot. Uses the clinician's photo when provided; otherwise a quiet illustrated
 * silhouette so layouts can be reviewed before professional photography is available.
 */
export function Portrait({ person, className = '' }: { person: Specialist; className?: string }) {
  if (person.portrait.src) {
    return (
      <img
        src={person.portrait.src}
        srcSet={person.portrait.srcSet}
        alt={person.portrait.alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }
  const t = tones[person.tone]
  const gid = `p-${person.id}`
  return (
    <div role="img" aria-label={person.portrait.alt} className={`h-full w-full ${className}`}>
      <svg viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id={`${gid}-fig`} x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor={t.fig} />
            <stop offset="1" stopColor={t.figDeep} />
          </linearGradient>
          <radialGradient id={`${gid}-light`} cx="0.25" cy="0.15" r="0.8">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="480" fill={t.bg} />
        <path d="M60 480V230a140 140 0 0 1 280 0v250Z" fill={t.arch} />
        <g fill={`url(#${gid}-fig)`}>
          {/* shoulders */}
          <path d="M62 480c6-92 62-136 138-136s132 44 138 136Z" />
          {/* neck */}
          <path d="M176 290h48v62c-10 14-38 14-48 0Z" />
          {/* head */}
          <ellipse cx="200" cy="236" rx="58" ry="70" />
        </g>
        {/* collar suggestion */}
        <path d="M160 356 200 410l40-54" fill="none" stroke={t.bg} strokeWidth="6" strokeLinejoin="round" opacity="0.7" />
        <rect width="400" height="480" fill={`url(#${gid}-light)`} />
      </svg>
    </div>
  )
}
