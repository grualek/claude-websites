import { services } from '../../content/site'
import { useApp } from '../../state/AppState'
import { Icon } from '../ui/Icon'
import { SectionHeader } from '../ui/SectionHeader'

export function Services() {
  const { openEnquiry, runSearch } = useApp()
  return (
    <section id="services" aria-labelledby="services-title" className="border-y border-line bg-paper py-20 sm:py-28">
      <div className="container-page">
        <SectionHeader
          id="services-title"
          index="04"
          eyebrow="What we do"
          title={
            <>
              One team for every <em>stage of a move</em>.
            </>
          }
          intro="Sales, lettings, management and advice under one roof — so the person valuing your home understands the rental market, and the person finding your tenant knows what it would sell for."
        />

        <ul className="mt-14 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.id} className="group flex flex-col border-r border-b border-line p-7 transition-colors hover:bg-ivory sm:p-9">
              <div className="flex items-start justify-between">
                <span className="flex size-14 items-center justify-center rounded-full border border-line text-olive-deep transition-colors group-hover:border-olive group-hover:bg-olive-soft">
                  <Icon name={s.icon} className="size-6" />
                </span>
                <span className="font-editorial text-[1.25rem] text-taupe tabular-nums">0{i + 1}</span>
              </div>
              <h3 className="font-editorial mt-8 text-[2.125rem]">{s.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{s.summary}</p>
              <ul className="mt-6 space-y-2 text-sm text-ink-soft">
                {s.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5">
                    <Icon name="check" className="mt-0.5 size-4 shrink-0 text-olive" />
                    {pt}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => (s.cta.intent ? openEnquiry(s.cta.intent) : runSearch({ listingType: s.id === 'renting' ? 'rent' : 'sale' }))}
                className="mt-auto inline-flex items-center gap-2 self-start pt-8 text-[0.8125rem] font-semibold text-ink underline decoration-ink/20 underline-offset-[6px] hover:decoration-ink"
              >
                {s.cta.label}
                <Icon name="arrow-right" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
