import { useState } from 'react'
import { testimonials } from '../../content/site'
import { Icon } from '../ui/Icon'
import { Eyebrow } from '../ui/SectionHeader'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const t = testimonials[index]
  const go = (d: number) => setIndex((i) => (i + d + testimonials.length) % testimonials.length)

  return (
    <section aria-labelledby="testimonials-title" className="border-y border-line bg-sand py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>
              <span className="tabular-nums">10</span> <span aria-hidden>—</span> Client stories
            </Eyebrow>
            <h2 id="testimonials-title" className="font-editorial mt-5 text-[2.5rem] sm:text-[3.25rem]">
              In their <em>own words</em>.
            </h2>
            <p className="mt-4 max-w-xs text-sm text-muted">Demo testimonials for the prototype — replace with verified client reviews.</p>
            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className="inline-flex size-12 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-ink hover:bg-paper"
              >
                <Icon name="arrow-left" className="size-5" />
                <span className="sr-only">Previous testimonial</span>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="inline-flex size-12 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-ink hover:bg-paper"
              >
                <Icon name="arrow-right" className="size-5" />
                <span className="sr-only">Next testimonial</span>
              </button>
              <p className="ml-2 text-sm text-muted tabular-nums" aria-hidden>
                {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
              </p>
            </div>
          </div>

          <figure key={t.id} aria-live="polite" className="animate-fade-up lg:col-span-8">
            <Icon name="quote" className="size-10 text-taupe" />
            <blockquote className="font-editorial mt-6 text-[1.875rem] leading-[1.2] text-ink sm:text-[2.5rem] lg:text-[2.875rem]">“{t.quote}”</blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-6">
              <span className="font-semibold text-ink">{t.name}</span>
              <span className="text-sm text-muted">{t.context}</span>
              <span className="eyebrow ml-auto rounded-[2px] border border-line px-2.5 py-1 text-[0.6rem] text-muted">{t.service}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
