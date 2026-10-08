import type { ReactNode } from 'react'
import { splitPlaceholders } from '../../lib/format'

/**
 * Renders copy containing [[placeholder]] markers. Placeholders are highlighted so a client can see
 * exactly which policy, time or price must be confirmed before launch.
 */
export function WithPlaceholders({ text }: { text: string }) {
  return (
    <>
      {splitPlaceholders(text).map((p, i) =>
        p.placeholder ? (
          <span key={i} className="placeholder-token" title="Placeholder — replace with the property’s confirmed policy">
            {p.text}
          </span>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  )
}

interface SectionHeaderProps {
  eyebrow: string
  index?: string
  title: ReactNode
  intro?: ReactNode
  id?: string
  tone?: 'light' | 'dark'
  align?: 'left' | 'split'
  action?: ReactNode
  className?: string
}

/**
 * Editorial section heading: numbered eyebrow with a hairline, oversized serif title and an
 * optional intro / action set in a second column on large screens.
 */
export function SectionHeader({ eyebrow, index, title, intro, id, tone = 'light', align = 'split', action, className = '' }: SectionHeaderProps) {
  const dark = tone === 'dark'
  return (
    <div className={`grid gap-8 lg:grid-cols-12 lg:items-end ${className}`} data-reveal>
      <div className={align === 'split' ? 'lg:col-span-7' : 'lg:col-span-9'}>
        <p className={`eyebrow flex items-center gap-4 ${dark ? 'text-clay-light' : 'text-clay'}`}>
          {index && <span className="tabular-nums">{index}</span>}
          <span aria-hidden="true" className={`h-px w-10 ${dark ? 'bg-on-dark/30' : 'bg-ink/20'}`} />
          <span>{eyebrow}</span>
        </p>
        <h2 id={id} className={`font-editorial mt-6 text-[2.75rem] sm:text-[3.5rem] lg:text-[4.5rem] ${dark ? 'text-on-dark' : ''}`}>
          {title}
        </h2>
      </div>
      {(intro || action) && (
        <div className={align === 'split' ? 'lg:col-span-4 lg:col-start-9' : 'lg:col-span-9'}>
          {intro && <div className={`text-[1rem] leading-relaxed ${dark ? 'text-on-dark-muted' : 'text-muted'}`}>{intro}</div>}
          {action && <div className="mt-6">{action}</div>}
        </div>
      )}
    </div>
  )
}
