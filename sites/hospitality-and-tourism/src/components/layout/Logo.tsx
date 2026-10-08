import { property } from '../../content/property'

/** Wordmark: serif name over a spaced sans descriptor. `tone` follows the surface it sits on. */
export function Logo({ tone = 'dark', className = '' }: { tone?: 'dark' | 'light'; className?: string }) {
  const color = tone === 'light' ? 'text-on-dark' : 'text-ink'
  return (
    <a href="#top" className={`group inline-flex min-h-11 flex-col justify-center leading-none transition-colors duration-500 ${color} ${className}`}>
      <span className="font-editorial text-[1.65rem] font-medium tracking-[0.01em] sm:text-[1.85rem]">{property.name}</span>
      <span className={`eyebrow mt-1 text-[0.55rem] tracking-[0.32em] ${tone === 'light' ? 'text-on-dark/75' : 'text-muted'}`}>Sarenne Coast</span>
      <span className="sr-only">— home</span>
    </a>
  )
}
