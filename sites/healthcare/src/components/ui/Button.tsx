import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon } from './Icon'
import type { IconName } from '../../content/types'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outline-light'
type Size = 'md' | 'lg' | 'sm'

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-[-0.005em] whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-calm focus-visible:outline-offset-4 active:translate-y-px disabled:opacity-60 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-paper shadow-[0_1px_0_rgb(255_255_255/0.08)_inset,0_8px_24px_-12px_rgb(20_33_58/0.55)] hover:bg-blue-deep',
  secondary: 'border border-ink/20 bg-transparent text-ink hover:border-ink/45 hover:bg-paper',
  ghost: 'text-ink underline-offset-4 hover:underline px-0!',
  light: 'bg-paper text-ink hover:bg-ivory',
  'outline-light': 'border border-paper/35 text-paper hover:border-paper/70 hover:bg-paper/10',
}

const sizes: Record<Size, string> = {
  sm: 'min-h-10 px-4.5 text-sm',
  md: 'min-h-12 px-6 text-[0.9375rem]',
  lg: 'min-h-14 px-7 text-base',
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
  return (
    <Icon
      name={icon}
      className="size-4.5 shrink-0 transition-transform duration-200 ease-calm group-hover:translate-x-0.5"
    />
  )
}

export function Button({
  variant,
  size,
  icon,
  children,
  className,
  type = 'button',
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
      <TrailingIcon icon={icon} />
    </button>
  )
}

export function ButtonLink({
  variant,
  size,
  icon,
  children,
  className,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
      <TrailingIcon icon={icon} />
    </a>
  )
}
