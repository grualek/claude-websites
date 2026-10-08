import { firm } from '../../content/firm'

/** Wordmark: serif name with a fine bronze rule and small-caps descriptor. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="group inline-flex flex-col leading-none" aria-label={`${firm.name}, ${firm.descriptor} — home`}>
      <span className={`font-display text-[1.6rem] font-[420] tracking-[-0.01em] ${light ? 'text-on-dark' : 'text-ink'}`}>
        Calder <span className="italic text-bronze">&amp;</span> Rowe
      </span>
      <span className={`mt-1.5 flex items-center gap-2 text-[0.5625rem] font-semibold tracking-[0.28em] uppercase ${light ? 'text-on-dark-muted' : 'text-muted'}`}>
        <span className="h-px w-5 bg-bronze" aria-hidden="true" />
        {firm.descriptor}
      </span>
    </a>
  )
}
