import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon } from './Icon'
import type { IconName } from '../../content/types'

type Variant = 'primary' | 'olive' | 'secondary' | 'light' | 'outline-light' | 'link'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group inline-flex items-center justify-center gap-3 rounded-[3px] font-semibold tracking-[0.02em] whitespace-nowrap transition-[background-color,color,border-color,transform] duration-300 ease-calm focus-visible:outline-offset-4 active:translate-y-px disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-olive-deep',
  olive: 'bg-olive-deep text-paper hover:bg-ink',
  secondary: 'border border-ink/25 text-ink hover:border-ink hover:bg-paper',
  light: 'bg-paper text-ink hover:bg-sand',
  'outline-light': 'border border-paper/40 text-paper hover:border-paper hover:bg-paper/10',
  link: 'text-ink underline decoration-ink/25 underline-offset-[6px] hover:decoration-ink px-0! min-h-0!',
}

const sizes: Record<Size, string> = {
  sm: 'min-h-10 px-4 text-[0.8125rem]',
  md: 'min-h-12 px-6 text-sm',
  lg: 'min-h-14 px-7 text-[0.9375rem]',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  icon?: IconName
  children: ReactNode
  className?: string
}

export function buttonClasses({ variant = 'primary', size = 'md', className = '' }: Partial<CommonProps>) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`
}

function TrailingIcon({ icon }: { icon?: IconName }) {
  if (!icon) return null
  return <Icon name={icon} className="size-4.5 shrink-0 transition-transform duration-300 ease-calm group-hover:translate-x-1" />
}

export function Button({ variant, size, icon, children, className, type = 'button', ...rest }: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
      <TrailingIcon icon={icon} />
    </button>
  )
}

export function ButtonLink({ variant, size, icon, children, className, ...rest }: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
      <TrailingIcon icon={icon} />
    </a>
  )
}
