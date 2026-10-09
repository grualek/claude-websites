import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import type { IconName } from '../../content/types'
import { Icon } from './Icon'

/**
 * primary   — navy, the "Explore Programs" conversion on light surfaces
 * sun       — warm yellow, the primary conversion on navy surfaces
 * secondary — outlined, for secondary actions on light surfaces
 * light     — cream fill on dark / image surfaces
 * outline-light — outlined, for secondary actions on dark surfaces
 */
type Variant = 'primary' | 'sun' | 'secondary' | 'light' | 'outline-light'
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
  'group/btn inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-[var(--ease-calm)] active:translate-y-px disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary: 'bg-navy text-on-dark hover:bg-blue-hover shadow-[0_10px_24px_-14px_rgb(20_33_58/0.7)]',
  sun: 'bg-sun text-navy hover:bg-sun-hover',
  secondary: 'border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-paper/70',
  light: 'bg-cream text-navy hover:bg-paper',
  'outline-light': 'border border-on-dark/40 text-on-dark hover:border-on-dark hover:bg-on-dark/10',
}

const sizes: Record<Size, string> = {
  sm: 'min-h-10 px-5 text-[0.84rem]',
  md: 'min-h-12 px-6 text-[0.92rem]',
  lg: 'min-h-14 px-8 text-[1rem]',
}

function Inner({ icon, arrow, children }: Pick<Common, 'icon' | 'arrow' | 'children'>) {
  return (
    <>
      {icon && <Icon name={icon} className="size-[1.1rem] shrink-0" />}
      <span>{children}</span>
      {arrow && <Icon name="arrow-right" className="size-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1" />}
    </>
  )
}

export const buttonClass = (variant: Variant = 'primary', size: Size = 'md') => `${base} ${variants[variant]} ${sizes[size]}`

export function Button({ variant = 'primary', size = 'md', icon, arrow, children, className = '', type = 'button', ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={`${buttonClass(variant, size)} ${className}`} {...rest}>
      <Inner icon={icon} arrow={arrow}>
        {children}
      </Inner>
    </button>
  )
}

export function ButtonLink({ variant = 'primary', size = 'md', icon, arrow, children, className = '', ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${buttonClass(variant, size)} ${className}`} {...rest}>
      <Inner icon={icon} arrow={arrow}>
        {children}
      </Inner>
    </a>
  )
}

/** Quiet underlined text action with an arrow — for secondary actions inside cards. */
export function TextAction({ children, className = '', tone = 'ink' }: { children: ReactNode; className?: string; tone?: 'ink' | 'light' }) {
  const color = tone === 'light' ? 'text-on-dark border-on-dark/40 group-hover:border-sun' : 'text-ink border-ink/25 group-hover:border-blue'
  return (
    <span className={`inline-flex items-center gap-2 text-[0.88rem] font-semibold ${className}`}>
      <span className={`border-b pb-0.5 transition-colors duration-300 ${color}`}>{children}</span>
      <Icon name="arrow-right" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  )
}
