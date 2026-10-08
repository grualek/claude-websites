import { matterTypes, testimonials } from '../../content/site'
import { SectionHeader } from '../ui/SectionHeader'

export function Testimonials() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 lg:py-32">
      <div className="container-page">
        <SectionHeader
          index="06"
          eyebrow="Client Perspective & Experience"
          id="experience-title"
          title={
            <>
              In our clients’ <em className="italic text-bronze-deep">own words.</em>
            </>
          }
          intro="We do not publish rankings or outcome statistics. Instead, here is how clients describe working with us, and the kinds of matters we regularly handle."
        />

        <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <ul className="grid gap-px bg-line lg:col-span-8 lg:grid-cols-1">
            {testimonials.map((t, i) => (
              <li key={t.attribution} className="bg-ivory py-10 first:pt-0 last:pb-0 lg:pr-12" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <figure>
                  <span aria-hidden="true" className="font-display block h-8 text-[4rem] leading-none text-bronze">“</span>
                  <blockquote className={`font-editorial mt-5 text-ink ${i === 0 ? 'text-[1.75rem] sm:text-[2.25rem]' : 'text-[1.375rem] sm:text-[1.625rem]'} leading-[1.25]`}>
                    <p>{t.quote}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex flex-wrap items-center gap-3 text-[0.8125rem]">
                    <span className="font-medium text-ink">{t.attribution}</span>
                    <span aria-hidden="true" className="h-3 w-px bg-line" />
                    <span className="text-muted">{t.context}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <aside aria-labelledby="matters-title" className="self-start border border-line bg-paper p-8 lg:col-span-4" data-reveal>
            <h3 id="matters-title" className="eyebrow text-bronze-deep">
              Representative matter types
            </h3>
            <ul className="mt-6 divide-y divide-line-soft">
              {matterTypes.map((m) => (
                <li key={m.description} className="py-4 first:pt-0">
                  <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-muted uppercase">{m.practice}</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-snug text-ink">{m.description}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted">
              Illustrative of the work we do; not a description of specific results. Prior results do not guarantee a similar outcome. Testimonials shown are demo content.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
