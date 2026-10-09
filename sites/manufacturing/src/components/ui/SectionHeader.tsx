import type { ReactNode } from 'react'

interface Props {
  index: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  id?: string
  action?: ReactNode
  light?: boolean
  className?: string
}

/** Section opener: index code + eyebrow on a hairline rule, oversized headline, intro and action on the right. */
export function SectionHeader({ index, eyebrow, title, intro, id, action, light = false, className = '' }: Props) {
  return (
    <header className={className} data-reveal>
      <div className={`flex items-center gap-4 border-t pt-4 ${light ? 'border-graphite-line text-on-dark-muted' : 'border-ink/80 text-muted'}`}>
        <span className={`label-mono ${light ? 'text-signal' : 'text-signal-deep'}`}>{index}</span>
        <span className="label-mono">{eyebrow}</span>
        <span aria-hidden="true" className={`ml-auto hidden h-2 w-2 sm:block ${light ? 'bg-on-dark/40' : 'bg-ink/70'}`} />
      </div>
      <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h2 id={id} className={`font-headline text-[2.375rem] sm:text-[3.25rem] lg:col-span-7 lg:text-[4rem] ${light ? 'text-on-dark' : ''}`}>
          {title}
        </h2>
        {(intro || action) && (
          <div className="lg:col-span-5 lg:pb-1.5">
            {intro && <p className={`max-w-md text-[1rem] leading-relaxed ${light ? 'text-on-dark-muted' : 'text-muted'}`}>{intro}</p>}
            {action && <div className="mt-6">{action}</div>}
          </div>
        )}
      </div>
    </header>
  )
}
