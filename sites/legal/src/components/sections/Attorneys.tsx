import { attorneys } from '../../content/attorneys'
import { useApp } from '../../state/AppState'
import { ArrowLink } from '../ui/Button'
import { Media } from '../ui/Media'
import { SectionHeader } from '../ui/SectionHeader'

export function Attorneys() {
  const { openDetail } = useApp()
  return (
    <section id="attorneys" aria-labelledby="attorneys-title" className="py-24 lg:py-32">
      <div className="container-page">
        <SectionHeader
          index="02"
          eyebrow="Attorneys"
          id="attorneys-title"
          title={
            <>
              The people who will <em className="italic text-bronze-deep">lead your matter.</em>
            </>
          }
          intro="Every client works directly with an experienced attorney who knows their matter well — supported by colleagues across practice areas when a question crosses disciplines."
        />

        <ul className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {attorneys.map((a, i) => (
            <li key={a.slug} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <article className="group relative flex h-full flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                  <Media asset={a.portrait} className="transition-transform duration-[1200ms] ease-[var(--ease-calm)] group-hover:scale-[1.03]" />
                  <span className="absolute top-3 left-3 bg-ivory/90 px-2 py-1 text-[0.625rem] tracking-[0.14em] text-muted uppercase">Demo profile</span>
                </div>
                <p className="eyebrow mt-6 text-bronze-deep">{a.role}</p>
                <h3 className="font-editorial mt-2 text-[1.875rem] leading-tight">
                  <button
                    type="button"
                    onClick={() => openDetail({ kind: 'attorney', slug: a.slug })}
                    className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-bronze-deep"
                  >
                    {a.name}
                  </button>
                </h3>
                <p className="mt-2 text-[0.8125rem] font-medium text-ink-soft">{a.practices.join(' · ')}</p>
                <p className="mt-4 text-[0.875rem] leading-relaxed text-muted">{a.bio}</p>
                <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-muted">{a.credentials[0]}</p>
                <ArrowLink className="mt-6 self-start">View profile</ArrowLink>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
