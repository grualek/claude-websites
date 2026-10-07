import { useState } from 'react'
import type { Property } from '../../content/types'
import { areas, getArea } from '../../content/areas'
import { formatCompactPrice, formatPrice } from '../../lib/format'
import { useApp } from '../../state/AppState'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { PropertyFacts } from '../property/PropertyBits'

/**
 * Illustrated map of the city with listing pins. Pins are real buttons positioned in %,
 * so the map is keyboard and screen-reader accessible. Swap the SVG for Mapbox / Google Maps
 * (and `mapPosition` for lat/lng) when connecting a live feed.
 */
export function AreaMap({ results }: { results: Property[] }) {
  const { openProperty } = useApp()
  const [activeId, setActiveId] = useState<string | null>(results[0]?.id ?? null)
  const active = results.find((p) => p.id === activeId) ?? null

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_20rem]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] border border-line bg-[#e9e2d4] sm:aspect-[16/10]">
        <MapArt />
        {/* Area labels */}
        {areas.map((a) => (
          <span
            key={a.id}
            aria-hidden
            className="eyebrow pointer-events-none absolute -translate-x-1/2 text-[0.55rem] whitespace-nowrap text-taupe-deep sm:text-[0.625rem]"
            style={{ left: `${a.mapPosition.x}%`, top: `${a.mapPosition.y - 7}%` }}
          >
            {a.name}
          </span>
        ))}
        <ul aria-label="Properties on the map">
          {results.map((p) => {
            const isActive = p.id === activeId
            return (
              <li key={p.id} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${p.mapPosition.x}%`, top: `${p.mapPosition.y}%`, zIndex: isActive ? 20 : 10 }}>
                <button
                  type="button"
                  onClick={() => setActiveId(p.id)}
                  aria-pressed={isActive}
                  aria-label={`${p.title}, ${formatPrice(p)}`}
                  className={`relative flex min-h-8 items-center rounded-[3px] px-2.5 text-[0.75rem] font-semibold whitespace-nowrap shadow-[0_6px_16px_-8px_rgb(31_30_27/0.6)] transition-colors after:absolute after:top-full after:left-1/2 after:-ml-1.5 after:border-x-[6px] after:border-t-[6px] after:border-x-transparent ${
                    isActive ? 'bg-ink text-paper after:border-t-ink' : 'bg-paper text-ink after:border-t-paper hover:bg-olive-soft'
                  }`}
                >
                  {formatCompactPrice(p.price)}
                  {p.listingType === 'rent' && <span className="ml-0.5 font-normal opacity-70">pcm</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div aria-live="polite" className="rounded-[3px] border border-line bg-paper">
        {active ? (
          <div className="flex h-full flex-col">
            <div className="aspect-[4/3] overflow-hidden rounded-t-[3px]">
              <Media asset={active.images[0]} sizes="320px" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="eyebrow text-[0.6rem] text-muted">{getArea(active.address.areaId)?.name}</p>
              <h3 className="font-editorial mt-2 text-[1.75rem] leading-tight">{active.title}</h3>
              <p className="mt-1 text-sm font-semibold text-ink tabular-nums">{formatPrice(active)}</p>
              <PropertyFacts property={active} className="mt-3" />
              <button
                type="button"
                onClick={() => openProperty(active.id)}
                className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.8125rem] font-semibold text-ink underline-offset-4 hover:underline"
              >
                View property <Icon name="arrow-right" className="size-4" />
              </button>
            </div>
          </div>
        ) : (
          <p className="p-6 text-sm text-muted">Select a pin to preview a property.</p>
        )}
      </div>
    </div>
  )
}

function MapArt() {
  return (
    <svg viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect width="1000" height="640" fill="#ebe4d6" />
      {/* Parks & countryside */}
      <path d="M0 0h1000v90c-120 30-260 10-380 30S300 80 0 120Z" fill="#dcdcc8" />
      <ellipse cx="560" cy="80" rx="90" ry="40" fill="#cfd2b8" />
      <path d="M640 640c40-120 140-180 360-200v200Z" fill="#dcdcc8" />
      {/* Sea */}
      <path d="M760 640c30-60 90-100 240-120v120Z" fill="#cdd7d6" />
      {/* River */}
      <path d="M-20 470c120-30 220-60 320-40s170 70 260 40 160-120 260-150 160 10 200 20" fill="none" stroke="#c9d3d2" strokeWidth="34" strokeLinecap="round" />
      <path d="M-20 470c120-30 220-60 320-40s170 70 260 40 160-120 260-150 160 10 200 20" fill="none" stroke="#dbe2e0" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
      {/* Blocks */}
      <g fill="#f4efe5">
        {Array.from({ length: 48 }).map((_, i) => {
          const col = i % 8
          const row = Math.floor(i / 8)
          const x = 300 + col * 62 + (row % 2) * 14
          const y = 120 + row * 46
          return (row * 8 + col) % 7 === 3 ? null : <rect key={i} x={x} y={y} width="50" height="34" rx="3" />
        })}
      </g>
      {/* Roads */}
      <g fill="none" stroke="#fffaf1" strokeLinecap="round">
        <path d="M0 260h1000" strokeWidth="12" />
        <path d="M520 0v640" strokeWidth="12" />
        <path d="M120 40c80 120 120 260 100 420" strokeWidth="8" />
        <path d="M300 640c80-180 260-300 700-340" strokeWidth="8" />
        <circle cx="480" cy="260" r="120" strokeWidth="6" />
      </g>
      {/* Suburban streets */}
      <g fill="none" stroke="#fffaf1" strokeWidth="4" opacity="0.9">
        <path d="M40 160c60 10 120 0 180 20M40 210c60 10 120 0 180 20M60 300c50 10 100 0 150 14" />
      </g>
      {/* Bridge */}
      <path d="M435 430l30 40" stroke="#b9ad98" strokeWidth="10" />
    </svg>
  )
}
