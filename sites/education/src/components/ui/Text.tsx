import type { ReactNode } from 'react'
import { splitPlaceholders } from '../../lib/format'

/**
 * Renders copy containing [[placeholder]] markers. Placeholders are highlighted so a client can see
 * exactly which date, requirement or policy must be confirmed before launch.
 */
export function WithPlaceholders({ text }: { text: string }) {
  return (
    <>
      {splitPlaceholders(text).map((p, i) =>
        p.placeholder ? (
          <span key={i} className="placeholder-token" title="Placeholder — replace with the institution’s confirmed details">
            {p.text}
          </span>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  )
}

/** Same as WithPlaceholders but without highlighting — for tight UI (chips, meta rows). */
export const plain = (text: string) => text.replace(/\[\[|\]\]/g, '')

interface EyebrowProps {
  index?: string
  children: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}

export function Eyebrow({ index, children, tone = 'light', className = '' }: EyebrowProps) {
  const dark = tone === 'dark'
  return (
    <p className={`eyebrow flex items-center gap-3 ${dark ? 'text-sun' : 'text-blue'} ${className}`}>
      {index && <span className="tabular-nums">{index}</span>}
      <span aria-hidden="true" className={`h-px w-8 ${dark ? 'bg-on-dark/30' : 'bg-ink/20'}`} />
      <span>{children}</span>
    </p>
  )
}

interface SectionHeaderProps {
  eyebrow: string
  index?: string
  title: ReactNode
  intro?: ReactNode
  id?: string
  tone?: 'light' | 'dark'
  align?: 'left' | 'split' | 'center'
  action?: ReactNode
  className?: string
}

/**
 * Editorial section heading: numbered eyebrow with a hairline, oversized serif title and an
 * optional intro / action set in a second column on large screens.
 */
export function SectionHeader({ eyebrow, index, title, intro, id, tone = 'light', align = 'split', action, className = '' }: SectionHeaderProps) {
  const dark = tone === 'dark'
  if (align === 'center') {
    return (
      <div className={`mx-auto max-w-3xl text-center ${className}`} data-reveal>
        <Eyebrow index={index} tone={tone} className="justify-center">
          {eyebrow}
        </Eyebrow>
        <h2 id={id} className={`font-editorial mt-6 text-[2.6rem] sm:text-[3.4rem] lg:text-[4.25rem] ${dark ? 'text-on-dark' : ''}`}>
          {title}
        </h2>
        {intro && <div className={`mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed ${dark ? 'text-on-dark-muted' : 'text-muted'}`}>{intro}</div>}
        {action && <div className="mt-8 flex justify-center">{action}</div>}
      </div>
    )
  }
  return (
    <div className={`grid gap-8 lg:grid-cols-12 lg:items-end ${className}`} data-reveal>
      <div className={align === 'split' ? 'lg:col-span-7' : 'lg:col-span-9'}>
        <Eyebrow index={index} tone={tone}>
          {eyebrow}
        </Eyebrow>
        <h2 id={id} className={`font-editorial mt-6 text-[2.6rem] sm:text-[3.4rem] lg:text-[4.25rem] ${dark ? 'text-on-dark' : ''}`}>
          {title}
        </h2>
      </div>
      {(intro || action) && (
        <div className={align === 'split' ? 'lg:col-span-4 lg:col-start-9' : 'lg:col-span-9'}>
          {intro && <div className={`text-[1.05rem] leading-relaxed ${dark ? 'text-on-dark-muted' : 'text-muted'}`}>{intro}</div>}
          {action && <div className="mt-6">{action}</div>}
        </div>
      )}
    </div>
  )
}
