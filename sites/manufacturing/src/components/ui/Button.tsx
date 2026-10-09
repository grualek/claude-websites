import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import type { IconName } from '../../content/types'
import { Icon } from './Icon'

type Variant = 'signal' | 'primary' | 'secondary' | 'light' | 'outline-light'
type Size = 'sm' | 'md' | 'lg'

interface Common {
  variant?: Variant
  size?: Size
  icon?: IconName
  /** Trailing arrow that nudges on hover */
  arrow?: boolean
  children: ReactNode
  className?: string
}

const base =
  'group/btn relative inline-flex items-center justify-center gap-3 font-medium tracking-[0.005em] transition-[background-color,color,border-color] duration-200 ease-[var(--ease-precise)] disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap'

const variants: Record<Variant, string> = {
  /** Primary conversion — safety orange with charcoal text (AA) */
  signal: 'bg-signal text-charcoal hover:bg-signal-hover',
  primary: 'bg-charcoal text-on-dark hover:bg-graphite-soft',
  secondary: 'border border-ink/30 bg-transparent text-ink hover:border-ink hover:bg-paper',
  light: 'bg-on-dark text-charcoal hover:bg-white',
  'outline-light': 'border border-on-dark/30 text-on-dark hover:border-on-dark hover:bg-on-dark/5',
}

const sizes: Record<Size, string> = {
  sm: 'min-h-10 px-4 text-[0.8125rem]',
  md: 'min-h-12 px-5 text-[0.875rem]',
  lg: 'min-h-14 px-6 text-[0.9375rem]',
}

function Inner({ icon, arrow, children }: Pick<Common, 'icon' | 'arrow' | 'children'>) {
  return (
    <>
      {icon && <Icon name={icon} className="size-[1.05rem] shrink-0" />}
      <span>{children}</span>
      {arrow && <Icon name="arrow-right" className="size-4 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1" />}
    </>
  )
}

export function Button({ variant = 'primary', size = 'md', icon, arrow, children, className = '', ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      <Inner icon={icon} arrow={arrow}>
        {children}
      </Inner>
    </button>
  )
}

export function ButtonLink({ variant = 'primary', size = 'md', icon, arrow, children, className = '', ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      <Inner icon={icon} arrow={arrow}>
        {children}
      </Inner>
    </a>
  )
}

/** Square arrow chip used at the corner of cards. */
export function ArrowChip({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-10 shrink-0 items-center justify-center border transition-colors duration-200 ${
        light
          ? 'border-graphite-line text-on-dark group-hover:border-signal group-hover:bg-signal group-hover:text-charcoal'
          : 'border-line text-ink group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-on-dark'
      } ${className}`}
    >
      <Icon name="arrow-up-right" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  )
}
