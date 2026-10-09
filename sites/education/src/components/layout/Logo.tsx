import { institution } from '../../content/institution'

/** Arch monogram + wordmark. `tone` switches for dark surfaces. */
export function Logo({ tone = 'dark', className = '' }: { tone?: 'dark' | 'light'; className?: string }) {
  const light = tone === 'light'
  return (
    <a href="#top" className={`group inline-flex min-h-11 items-center gap-3 ${className}`}>
      <svg viewBox="0 0 40 40" className="size-10 shrink-0" aria-hidden="true" focusable="false">
        <rect width="40" height="40" rx="10" fill={light ? '#f4efe4' : '#14213a'} />
        <path d="M11 30V18a9 9 0 0 1 18 0v12" fill="none" stroke={light ? '#14213a' : '#f4efe4'} strokeWidth="2.2" />
        <circle cx="20" cy="19" r="3.4" fill="#e9b949" className="origin-center transition-transform duration-500 group-hover:-translate-y-0.5" />
        <path d="M8.5 30h23" stroke={light ? '#14213a' : '#f4efe4'} strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-editorial text-[1.45rem] tracking-[-0.02em] ${light ? 'text-on-dark' : 'text-ink'}`}>{institution.shortName}</span>
        <span className={`mt-1 text-[0.62rem] font-semibold tracking-[0.22em] uppercase ${light ? 'text-on-dark-muted' : 'text-muted'}`}>College · Est. {institution.founded}</span>
      </span>
      <span className="sr-only">{institution.name} — home</span>
    </a>
  )
}
