import { practiceAreas } from '../../content/practices'
import { pad } from '../../lib/format'
import { useApp } from '../../state/AppState'
import { Icon } from '../ui/Icon'
import { SectionHeader } from '../ui/SectionHeader'

export function PracticeAreas() {
  const { openDetail, scheduleConsultation } = useApp()
  return (
    <section id="practice-areas" aria-labelledby="practice-title" className="py-24 lg:py-32">
      <div className="container-page">
        <SectionHeader
          index="01"
          eyebrow="Practice Areas"
          id="practice-title"
          title={
            <>
              Counsel for the matters that shape <em className="italic text-bronze-deep">businesses and lives.</em>
            </>
          }
          intro="We advise companies, owners, families and individuals across eight connected practice areas — so the full picture is considered, not just the immediate question."
        />

        <ul className="mt-16 grid border-t border-l border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {practiceAreas.map((p, i) => (
            <li key={p.slug} className="border-r border-b border-line" data-reveal style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
              <article className="group relative flex h-full flex-col p-7 sm:min-h-[19rem] transition-colors duration-500 focus-within:bg-paper hover:bg-paper lg:p-8">
                <span className="flex items-center justify-between">
                  <span className="eyebrow text-bronze-deep tabular-nums">{pad(i + 1)}</span>
                  <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full border border-line text-ink transition-all duration-500 group-hover:border-espresso group-hover:bg-espresso group-hover:text-on-dark">
                    <Icon name="arrow-up-right" className="size-4" />
                  </span>
                </span>
                <h3 className="font-editorial mt-8 text-[1.75rem] sm:mt-auto sm:pt-12 leading-[1.08]">
                  {/* Stretched button: the whole card is the hit area, the heading stays a real heading */}
                  <button
                    type="button"
                    onClick={() => openDetail({ kind: 'practice', slug: p.slug })}
                    className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-[-3px] focus-visible:after:outline-bronze-deep"
                  >
                    {p.title}
                  </button>
                </h3>
                <p className="mt-4 text-[0.875rem] leading-relaxed text-muted">{p.summary}</p>
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-bronze transition-transform duration-700 group-hover:scale-x-100" aria-hidden="true" />
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center" data-reveal>
          <p className="text-[0.9375rem] text-muted">Not sure which area your matter falls under? We’ll help you find the right starting point.</p>
          <button type="button" onClick={() => scheduleConsultation()} className="group inline-flex min-h-11 items-center gap-2 text-[0.875rem] font-medium text-ink">
            <span className="border-b border-ink/30 pb-0.5 group-hover:border-bronze-deep">Request a case evaluation</span>
            <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  )
}
