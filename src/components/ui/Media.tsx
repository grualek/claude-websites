import { useId } from 'react'
import type { MediaAsset } from '../../content/types'

type Scene = 'consult' | 'care' | 'map'

interface MediaProps {
  asset: MediaAsset
  /** Art-directed illustration rendered when no photograph is supplied yet. */
  scene: Scene
  className?: string
  priority?: boolean
  sizes?: string
}

/**
 * Renders a real photograph when `asset.src` is provided, otherwise an art-directed
 * illustrated placeholder in the brand palette. Swap in clinic photography via content.
 */
export function Media({ asset, scene, className = '', priority = false, sizes = '100vw' }: MediaProps) {
  if (asset.src) {
    return (
      <img
        src={asset.src}
        srcSet={asset.srcSet}
        sizes={asset.srcSet ? sizes : undefined}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }
  const Component = { consult: ConsultScene, care: CareScene, map: MapScene }[scene]
  return (
    <div role="img" aria-label={asset.alt} className={`h-full w-full ${className}`}>
      <Component />
    </div>
  )
}

function Grain({ id }: { id: string }) {
  return (
    <filter id={id} x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
      <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.25  0 0 0 0.09 0" />
      <feComposite in2="SourceGraphic" operator="in" />
    </filter>
  )
}

/** Warm consultation room: arched window, morning light, lounge chair, plant. */
function ConsultScene() {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 600 720" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={`${id}wall`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#efe6d8" />
          <stop offset="1" stopColor="#e2d4c0" />
        </linearGradient>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dfe8ee" />
          <stop offset="0.65" stopColor="#f3efe6" />
          <stop offset="1" stopColor="#f7ecdc" />
        </linearGradient>
        <linearGradient id={`${id}beam`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fffaf0" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fffaf0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cdb89c" />
          <stop offset="1" stopColor="#b99f80" />
        </linearGradient>
        <linearGradient id={`${id}chair`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f6b84" />
          <stop offset="1" stopColor="#2f4a62" />
        </linearGradient>
        <radialGradient id={`${id}glow`} cx="0.35" cy="0.3" r="0.7">
          <stop offset="0" stopColor="#fff7e8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff7e8" stopOpacity="0" />
        </radialGradient>
        <Grain id={`${id}grain`} />
      </defs>

      <rect width="600" height="720" fill={`url(#${id}wall)`} />
      <rect width="600" height="720" fill={`url(#${id}glow)`} />

      {/* Arched window */}
      <g>
        <path d="M120 520V215a130 130 0 0 1 260 0v305Z" fill="#d8c8b2" />
        <path d="M134 512V218a116 116 0 0 1 232 0v294Z" fill={`url(#${id}sky)`} />
        {/* distant trees */}
        <path d="M134 430c30-26 52-18 74-32 22-14 40-8 62 4s46 6 64-6 26-6 32-2v118H134Z" fill="#b9c8b8" opacity="0.7" />
        <path d="M134 462c34-14 60-6 90-18s58-4 82 4 44-2 60-8v74H134Z" fill="#9fb3a2" opacity="0.65" />
        <path d="M250 102v410M134 330h232" stroke="#d8c8b2" strokeWidth="9" />
      </g>

      {/* Light beam across the room */}
      <path d="M134 230 366 230 600 600 600 720 330 720Z" fill={`url(#${id}beam)`} opacity="0.55" />

      {/* Floor */}
      <path d="M0 560h600v160H0Z" fill={`url(#${id}floor)`} />
      <path d="M0 560h600" stroke="#bda585" strokeWidth="2" />
      <path d="M210 560 360 720h170L330 560Z" fill="#fff6e6" opacity="0.22" />

      {/* Rug */}
      <ellipse cx="300" cy="640" rx="230" ry="38" fill="#e9dcc8" opacity="0.85" />

      {/* Side table + cup */}
      <rect x="402" y="500" width="78" height="10" rx="5" fill="#8a6a4c" />
      <path d="M414 510 404 620M468 510l10 110" stroke="#8a6a4c" strokeWidth="6" strokeLinecap="round" />
      <path d="M428 478h24l-3 22h-18Z" fill="#f7f1e7" />
      <path d="M452 484c10 0 10 12 0 12" fill="none" stroke="#f7f1e7" strokeWidth="3" />

      {/* Lounge chair */}
      <g>
        <path d="M92 588 78 652M252 588l14 64" stroke="#6b4f37" strokeWidth="7" strokeLinecap="round" />
        <path d="M84 548c-6-70 6-128 76-134h34c64 4 78 60 70 134Z" fill={`url(#${id}chair)`} />
        <path d="M60 540c0-22 14-34 34-34h160c20 0 34 12 34 34v26c0 18-12 28-30 28H90c-18 0-30-10-30-28Z" fill="#3a566f" />
        <path d="M98 520c0-12 8-18 20-18h112c12 0 20 6 20 18v12H98Z" fill="#5a7690" />
        <path d="M120 430c20-8 50-10 76-4" stroke="#7f98ad" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
      </g>

      {/* Plant */}
      <g>
        <path d="M498 640h70l-8 70h-54Z" fill="#c9b49a" />
        <path d="M498 640h70" stroke="#b8a083" strokeWidth="4" />
        <g fill="#6f8d78">
          <path d="M532 640c-20-60-60-90-86-96 18 30 34 70 86 96Z" />
          <path d="M534 640c-4-80 20-140 48-170-2 50-14 120-48 170Z" fill="#87a28d" />
          <path d="M534 640c12-60 48-92 66-96-8 36-28 74-66 96Z" fill="#5f7d68" />
          <path d="M532 640c-30-40-40-90-34-130 24 30 40 80 34 130Z" fill="#7c9883" />
        </g>
      </g>

      <rect width="600" height="720" filter={`url(#${id}grain)`} />
    </svg>
  )
}

/** Close, calm still life: window light falling on a wall, vase with a branch, folded linen. */
function CareScene() {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 640 720" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dde6e0" />
          <stop offset="1" stopColor="#c7d4cb" />
        </linearGradient>
        <linearGradient id={`${id}light`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbf6ec" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fbf6ec" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`${id}table`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9dfcf" />
          <stop offset="1" stopColor="#d8c9b3" />
        </linearGradient>
        <linearGradient id={`${id}vase`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f6f1e8" />
          <stop offset="0.6" stopColor="#e8dfd1" />
          <stop offset="1" stopColor="#cfc2ae" />
        </linearGradient>
        <Grain id={`${id}grain`} />
      </defs>

      <rect width="640" height="720" fill={`url(#${id}bg)`} />

      {/* Window light pattern */}
      <g fill={`url(#${id}light)`} transform="skewX(-14)">
        <rect x="250" y="60" width="120" height="180" rx="4" />
        <rect x="384" y="60" width="120" height="180" rx="4" />
        <rect x="250" y="254" width="120" height="180" rx="4" />
        <rect x="384" y="254" width="120" height="180" rx="4" />
      </g>

      {/* Branch shadow on wall */}
      <g stroke="#9fb1a5" strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round">
        <path d="M120 470c40-90 70-150 140-230" />
        <path d="M180 340c-30-14-50-10-70 2M214 290c10-30 30-50 56-60" />
      </g>

      {/* Table */}
      <path d="M0 520h640v200H0Z" fill={`url(#${id}table)`} />
      <path d="M0 520h640" stroke="#cbbba2" strokeWidth="2" />

      {/* Folded linen */}
      <g>
        <rect x="360" y="478" width="200" height="22" rx="6" fill="#f4efe6" />
        <rect x="372" y="456" width="176" height="24" rx="6" fill="#e9eef1" />
        <rect x="384" y="436" width="152" height="22" rx="6" fill="#dbe4ea" />
        <rect x="360" y="500" width="200" height="20" rx="6" fill="#ece5d9" />
      </g>

      {/* Vase with branch */}
      <g>
        <path d="M120 520c-10-60 20-110 30-150 6-24 0-44 0-60h64c0 16-6 36 0 60 10 40 40 90 30 150Z" fill={`url(#${id}vase)`} />
        <ellipse cx="182" cy="310" rx="32" ry="7" fill="#d6cab8" />
        <g stroke="#5c7a66" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M182 310c-6-80 6-160 46-240" />
          <path d="M190 210c24-12 44-12 60 0M200 150c-22-12-40-12-56-2" />
        </g>
        <g fill="#7f9c87">
          <ellipse cx="232" cy="84" rx="16" ry="7" transform="rotate(-40 232 84)" />
          <ellipse cx="252" cy="206" rx="16" ry="7" transform="rotate(20 252 206)" />
          <ellipse cx="146" cy="148" rx="16" ry="7" transform="rotate(30 146 148)" />
          <ellipse cx="214" cy="120" rx="14" ry="6" transform="rotate(50 214 120)" fill="#6c8a75" />
          <ellipse cx="176" cy="250" rx="14" ry="6" transform="rotate(-30 176 250)" fill="#6c8a75" />
        </g>
      </g>

      <rect width="640" height="720" filter={`url(#${id}grain)`} />
    </svg>
  )
}

/** Stylized street map used instead of an embedded map API. Pin sits at the visual center. */
function MapScene() {
  return (
    <svg viewBox="0 0 800 560" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <rect width="800" height="560" fill="#e6dfd2" />
      {/* Park */}
      <path d="M440 110h200c20 0 30 10 30 30v90c0 20-10 30-30 30H470c-20 0-30-10-30-30Z" fill="#cfdccf" />
      <circle cx="510" cy="160" r="14" fill="#b9cbb9" />
      <circle cx="570" cy="200" r="18" fill="#b9cbb9" />
      <circle cx="620" cy="150" r="12" fill="#b9cbb9" />
      {/* River */}
      <path d="M-20 500c120-40 200 10 320-20s210-60 320-30 160 30 200 20v120H-20Z" fill="#cfdbe4" />
      {/* Blocks */}
      <g fill="#f3efe7">
        <rect x="100" y="110" width="130" height="150" rx="6" />
        <rect x="250" y="110" width="130" height="150" rx="6" />
        <rect x="100" y="300" width="130" height="110" rx="6" />
        <rect x="250" y="300" width="130" height="110" rx="6" />
        <rect x="420" y="300" width="250" height="110" rx="6" />
        <rect x="700" y="110" width="140" height="300" rx="6" />
        <rect x="-60" y="110" width="140" height="300" rx="6" />
      </g>
      {/* Roads */}
      <g stroke="#ffffff" strokeLinecap="round" fill="none">
        <path d="M-10 280h820" strokeWidth="18" />
        <path d="M400 -10v460" strokeWidth="18" />
        <path d="M240 60v380" strokeWidth="10" />
        <path d="M685 60v380" strokeWidth="10" />
        <path d="M-10 430c200 8 420 0 820-8" strokeWidth="12" />
        <path d="M-10 85h820" strokeWidth="10" />
      </g>
      <g fill="#7d8899" fontFamily="Inter Variable, sans-serif" fontSize="11" letterSpacing="1.6" fontWeight="500">
        <text x="110" y="300" dy="-24">LINDEN AVENUE</text>
        <text x="412" y="60" transform="rotate(90 412 60)">MAPLE STREET</text>
        <text x="476" y="250" fill="#5f7a67">RIVERSIDE PARK</text>
      </g>
      {/* Pin */}
      <g transform="translate(400 280)">
        <circle r="46" fill="#24435d" opacity="0.1" />
        <circle r="22" fill="#24435d" opacity="0.18" />
        <path d="M0 0s-20-17-20-33a20 20 0 0 1 40 0C20-17 0 0 0 0Z" fill="#14213a" />
        <circle cy="-33" r="7" fill="#f7f4ee" />
      </g>
    </svg>
  )
}
