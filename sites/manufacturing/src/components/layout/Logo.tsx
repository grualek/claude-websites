import { company } from '../../content/company'

/** Geometric "F" mark with a safety-orange datum square + expanded wordmark. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="group inline-flex min-h-11 items-center gap-3" aria-label={`${company.name} — home`}>
      <svg viewBox="0 0 32 32" className="size-9 shrink-0" aria-hidden="true">
        <rect width="32" height="32" fill={light ? '#ecebe6' : '#16181b'} />
        <path d="M8 7h16v4H12.5v3.5H21v4h-8.5V25H8Z" fill={light ? '#16181b' : '#ecebe6'} />
        <rect x="21" y="21" width="4" height="4" fill="#e4581c" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-headline text-[1.25rem] tracking-[0.04em] uppercase ${light ? 'text-on-dark' : 'text-ink'}`} style={{ fontStretch: '118%' }}>
          {company.name}
        </span>
        <span className={`label-mono mt-1 text-[0.5625rem] ${light ? 'text-on-dark-muted' : 'text-muted'}`}>{company.tagline}</span>
      </span>
    </a>
  )
}
