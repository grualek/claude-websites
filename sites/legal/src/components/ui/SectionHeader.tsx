import type { ReactNode } from 'react'

interface Props {
  index: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  id?: string
  action?: ReactNode
  light?: boolean
  /** Single-column variant for narrow sidebars */
  stacked?: boolean
  className?: string
}

/** Editorial section opener: index number + eyebrow on a hairline, large serif title, optional intro. */
export function SectionHeader({ index, eyebrow, title, intro, id, action, light = false, stacked = false, className = '' }: Props) {
  return (
    <header className={className} data-reveal>
      <div className={`flex items-center gap-4 border-t pt-5 ${light ? 'border-espresso-line text-on-dark-muted' : 'border-line text-muted'}`}>
        <span className={`eyebrow tabular-nums ${light ? 'text-bronze' : 'text-bronze-deep'}`}>{index}</span>
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <div className={`mt-8 grid gap-6 lg:mt-10 ${stacked ? '' : 'lg:grid-cols-12 lg:items-end lg:gap-10'}`}>
        <h2 id={id} className={`font-editorial text-[2.5rem] sm:text-[3.25rem] ${stacked ? 'lg:text-[3.5rem]' : 'lg:col-span-7 lg:text-[4rem]'} ${light ? 'text-on-dark' : ''}`}>
          {title}
        </h2>
        {(intro || action) && (
          <div className={stacked ? '' : 'lg:col-span-5 lg:pb-2'}>
            {intro && <p className={`max-w-md text-[1rem] leading-relaxed ${light ? 'text-on-dark-muted' : 'text-muted'}`}>{intro}</p>}
            {action && <div className="mt-6">{action}</div>}
          </div>
        )}
      </div>
    </header>
  )
}
