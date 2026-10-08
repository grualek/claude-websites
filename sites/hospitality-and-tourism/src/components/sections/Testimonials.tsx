import { testimonials } from '../../content/site'
import { Icon } from '../ui/Icon'

export function Testimonials() {
  const [lead, ...rest] = testimonials
  return (
    <section aria-labelledby="stories-title" className="section-y bg-sand">
      <div className="container-page">
        <h2 id="stories-title" className="eyebrow flex items-center gap-4 text-clay" data-reveal>
          <span className="tabular-nums">09</span>
          <span aria-hidden="true" className="h-px w-10 bg-ink/20" />
          <span>Guest stories</span>
        </h2>

        <figure className="mt-10 max-w-5xl" data-reveal>
          <Icon name="quote" className="size-10 text-clay" />
          <blockquote className="font-editorial mt-6 text-[2.2rem] leading-[1.12] text-ink sm:text-[3rem] lg:text-[3.75rem]">{lead.quote}</blockquote>
          <figcaption className="mt-8 text-[0.9rem] text-muted">
            <span className="font-semibold text-ink">{lead.name}</span>, {lead.origin} · {lead.stay}
          </figcaption>
        </figure>

        <div className="mt-16 grid gap-10 border-t border-ink/15 pt-12 md:grid-cols-2 lg:mt-20 lg:gap-16">
          {rest.map((t) => (
            <figure key={t.name} data-reveal>
              <blockquote className="font-editorial text-[1.6rem] leading-[1.25] text-ink sm:text-[1.9rem]">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-[0.875rem] text-muted">
                <span className="font-semibold text-ink">{t.name}</span>, {t.origin} · {t.stay}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-14 text-xs text-muted">Demo testimonials for the prototype. Replace with verified guest reviews and cite their source.</p>
      </div>
    </section>
  )
}
