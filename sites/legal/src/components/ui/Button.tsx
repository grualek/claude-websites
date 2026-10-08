import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import type { IconName } from '../../content/types'
import { Icon } from './Icon'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outline-light'
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
  'group/btn inline-flex items-center justify-center gap-2.5 rounded-[2px] font-medium tracking-[0.01em] transition-[background-color,color,border-color,box-shadow] duration-300 ease-[var(--ease-calm)] disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary: 'bg-espresso text-on-dark hover:bg-ink shadow-[0_1px_0_rgb(255_255_255/0.06)_inset]',
  secondary: 'border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-paper',
  ghost: 'text-ink underline-offset-[6px] hover:underline decoration-bronze',
  light: 'bg-ivory text-espresso hover:bg-paper',
  'outline-light': 'border border-on-dark/30 text-on-dark hover:border-on-dark hover:bg-on-dark/5',
}

const sizes: Record<Size, string> = {
  sm: 'min-h-10 px-4 text-[0.8125rem]',
  md: 'min-h-12 px-6 text-[0.875rem]',
  lg: 'min-h-14 px-7 text-[0.9375rem]',
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

/** Quiet inline text link with an arrow — used for secondary actions on cards. */
export function ArrowLink({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink ${className}`}>
      <span className="border-b border-ink/25 pb-0.5 transition-colors duration-300 group-hover:border-bronze-deep">{children}</span>
      <Icon name="arrow-right" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  )
}
