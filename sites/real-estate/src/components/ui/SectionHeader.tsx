import type { ReactNode } from 'react'

export function Eyebrow({ children, className = '', light = false }: { children: ReactNode; className?: string; light?: boolean }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${light ? 'text-paper/70' : 'text-muted'} ${className}`}>
      <span aria-hidden className={`h-px w-8 ${light ? 'bg-paper/40' : 'bg-taupe'}`} />
      {children}
    </p>
  )
}

interface SectionHeaderProps {
  id: string
  index?: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  action?: ReactNode
  light?: boolean
  className?: string
}

/** Editorial section opener: index + eyebrow, oversized serif title, optional intro and action. */
export function SectionHeader({ id, index, eyebrow, title, intro, action, light = false, className = '' }: SectionHeaderProps) {
  return (
    <div className={`grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10 ${className}`}>
      <div className="lg:col-span-7">
        <Eyebrow light={light}>
          {index && <span className="tabular-nums">{index}</span>}
          {index && <span aria-hidden>—</span>}
          {eyebrow}
        </Eyebrow>
        <h2
          id={id}
          className={`font-editorial mt-5 text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] ${light ? 'text-paper' : 'text-ink'}`}
        >
          {title}
        </h2>
      </div>
      {(intro || action) && (
        <div className="flex flex-col items-start gap-6 lg:col-span-5 lg:pb-2">
          {intro && <p className={`max-w-md text-[0.9875rem] leading-relaxed ${light ? 'text-paper/75' : 'text-muted'}`}>{intro}</p>}
          {action}
        </div>
      )}
    </div>
  )
}
