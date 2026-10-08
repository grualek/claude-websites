import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import type { IconName } from '../../content/types'
import { Icon } from './Icon'

type Variant = 'primary' | 'dark' | 'secondary' | 'light' | 'outline-light'
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
  'group/btn inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-[0.02em] transition-[background-color,color,border-color,box-shadow] duration-300 ease-[var(--ease-calm)] disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap'

const variants: Record<Variant, string> = {
  /** Terracotta — reserved for booking actions */
  primary: 'bg-clay text-ivory hover:bg-clay-hover',
  dark: 'bg-charcoal text-on-dark hover:bg-ink-soft',
  secondary: 'border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-paper/60',
  light: 'bg-ivory text-charcoal hover:bg-paper',
  'outline-light': 'border border-on-dark/45 text-on-dark hover:border-on-dark hover:bg-on-dark/10',
}

const sizes: Record<Size, string> = {
  sm: 'min-h-10 px-5 text-[0.78rem]',
  md: 'min-h-12 px-7 text-[0.84rem]',
  lg: 'min-h-14 px-8 text-[0.9rem]',
}

function Inner({ icon, arrow, children }: Pick<Common, 'icon' | 'arrow' | 'children'>) {
  return (
    <>
      {icon && <Icon name={icon} className="size-[1.05rem] shrink-0" />}
      <span>{children}</span>
      {arrow && <Icon name="arrow-right" className="size-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1" />}
    </>
  )
}

export function Button({ variant = 'primary', size = 'md', icon, arrow, children, className = '', type = 'button', ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
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

/** Quiet underlined text action with an arrow — for secondary actions inside cards. */
export function TextAction({ children, className = '', tone = 'ink' }: { children: ReactNode; className?: string; tone?: 'ink' | 'light' }) {
  const color = tone === 'light' ? 'text-on-dark border-on-dark/40 group-hover:border-clay-light' : 'text-ink border-ink/30 group-hover:border-clay'
  return (
    <span className={`inline-flex items-center gap-2 text-[0.8rem] font-semibold tracking-[0.02em] ${className}`}>
      <span className={`border-b pb-0.5 transition-colors duration-300 ${color}`}>{children}</span>
      <Icon name="arrow-right" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  )
}
