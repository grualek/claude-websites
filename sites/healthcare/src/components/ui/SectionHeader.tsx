import type { ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
  tone?: 'blue' | 'sage' | 'light'
  className?: string
}

export function Eyebrow({ children, tone = 'blue', className = '' }: EyebrowProps) {
  const color = { blue: 'text-blue', sage: 'text-sage-deep', light: 'text-paper/80' }[tone]
  const dot = { blue: 'bg-blue', sage: 'bg-sage', light: 'bg-sage' }[tone]
  return (
    <p className={`inline-flex items-center gap-2.5 text-[0.8125rem] font-medium tracking-[0.08em] uppercase ${color} ${className}`}>
      <span aria-hidden className={`size-1.5 rounded-full ${dot}`} />
      {children}
    </p>
  )
}

interface SectionHeaderProps {
  id: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'split'
  aside?: ReactNode
  tone?: 'blue' | 'sage'
}

/** Consistent H2 + eyebrow + intro block. `id` is used for aria-labelledby on the section. */
export function SectionHeader({ id, eyebrow, title, intro, align = 'left', aside, tone }: SectionHeaderProps) {
  if (align === 'split') {
    return (
      <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
        <div className="md:col-span-7">
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          <h2 id={id} className="font-display-tight mt-5 text-[2.25rem] leading-[1.08] font-[380] sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h2>
        </div>
        <div className="md:col-span-5 md:pb-1.5">
          {intro && <p className="max-w-md text-[1.0625rem] leading-relaxed text-ink-soft">{intro}</p>}
          {aside && <div className="mt-6">{aside}</div>}
        </div>
      </div>
    )
  }
  return (
    <div className="max-w-2xl">
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 id={id} className="font-display-tight mt-5 text-[2.25rem] leading-[1.08] font-[380] sm:text-5xl lg:text-[3.5rem]">
        {title}
      </h2>
      {intro && <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">{intro}</p>}
      {aside && <div className="mt-8">{aside}</div>}
    </div>
  )
}
