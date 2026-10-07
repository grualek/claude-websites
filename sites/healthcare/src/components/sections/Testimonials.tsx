import { testimonials } from '../../content/people'
import { SectionHeader } from '../ui/SectionHeader'
import { DemoBadge } from '../dialogs/Dialogs'

export function Testimonials() {
  const [featured, ...rest] = testimonials
  const hasDemo = testimonials.some((t) => t.isDemo)
  return (
    <section aria-labelledby="testimonials-title" className="bg-paper py-20 sm:py-28 lg:py-32" data-content="demo-testimonials">
      <div className="container-page">
        <SectionHeader
          id="testimonials-title"
          align="split"
          eyebrow="Patient experiences"
          title="In their words."
          intro="We ask every patient for feedback so we can keep improving how we care for people."
          aside={
            hasDemo ? (
              <p className="flex items-center gap-3 text-sm text-muted">
                <DemoBadge>Illustrative</DemoBadge>
                Sample testimonials for demonstration only.
              </p>
            ) : undefined
          }
        />

        <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-12">
          <figure className="flex flex-col justify-between rounded-4xl bg-sand/70 p-8 sm:p-12 lg:col-span-7">
            <span aria-hidden className="font-display-tight block text-[5rem] leading-[0.6] text-clay">“</span>
            <blockquote className="font-display-tight mt-6 text-[1.75rem] leading-[1.3] font-[360] text-ink sm:text-[2.125rem]">
              {featured.quote}
            </blockquote>
            <figcaption className="mt-10 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
              <span>
                <span className="block font-semibold text-ink">{featured.author}</span>
                <span className="text-sm text-muted">{featured.context}</span>
              </span>
              {featured.isDemo && <DemoBadge>Demo</DemoBadge>}
            </figcaption>
          </figure>
          <div className="grid gap-5 lg:col-span-5">
            {rest.map((t) => (
              <figure key={t.id} className="flex flex-col justify-between rounded-4xl border border-line p-8">
                <blockquote className="text-[1.0625rem] leading-relaxed text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-4">
                  <span>
                    <span className="block font-semibold text-ink">{t.author}</span>
                    <span className="text-sm text-muted">{t.context}</span>
                  </span>
                  {t.isDemo && <DemoBadge>Demo</DemoBadge>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
