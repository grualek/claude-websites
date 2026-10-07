import { company } from '../../content/company'

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="group inline-flex items-center gap-3" aria-label={`${company.name} — home`}>
      <svg viewBox="0 0 40 40" className={`size-9 shrink-0 ${light ? 'text-paper' : 'text-olive-deep'}`} aria-hidden>
        <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M11 30V17.5l9-7 9 7V30" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M17 30v-7h6v7" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-editorial text-[1.6rem] leading-none tracking-[-0.01em] ${light ? 'text-paper' : 'text-ink'}`}>
          Hollis <span className="italic">&amp;</span> Vale
        </span>
        <span className={`eyebrow mt-1 text-[0.55rem] tracking-[0.24em] ${light ? 'text-paper/65' : 'text-muted'}`}>Property · Wrenfield</span>
      </span>
    </a>
  )
}
