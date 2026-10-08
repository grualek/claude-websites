import { property } from '../../content/property'
import { faqs } from '../../content/site'
import { Icon } from '../ui/Icon'
import { WithPlaceholders } from '../ui/Text'

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y bg-paper">
      <div className="container-page grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div data-reveal>
            <p className="eyebrow flex items-center gap-4 text-clay">
              <span className="tabular-nums">11</span>
              <span aria-hidden="true" className="h-px w-10 bg-ink/20" />
              <span>Good to know</span>
            </p>
            <h2 id="faq-title" className="font-editorial mt-6 text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem]">
              Questions, <em className="italic">answered.</em>
            </h2>
          </div>
          <p className="mt-6 text-[0.95rem] leading-relaxed text-muted" data-reveal>
            Can’t find what you’re looking for? Our reservations team is available around the clock.
          </p>
          <div className="mt-6 space-y-2 text-[0.9rem]" data-reveal>
            <a href={property.phone.href} className="flex min-h-11 items-center gap-3 font-semibold text-ink hover:text-clay">
              <Icon name="phone" className="size-5 text-clay" /> {property.phone.display}
            </a>
            <a href={`mailto:${property.email}`} className="flex min-h-11 items-center gap-3 font-semibold text-ink hover:text-clay">
              <Icon name="mail" className="size-5 text-clay" /> {property.email}
            </a>
          </div>
          <p className="mt-10 flex items-start gap-2 text-xs leading-relaxed text-muted">
            <span className="placeholder-token mt-0.5 shrink-0">Highlighted</span>
            text marks demo policies to confirm before launch.
          </p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="border-t border-line">
            {faqs.map((f) => (
              <li key={f.question} className="border-b border-line">
                <details className="group">
                  <summary className="flex min-h-[4.5rem] cursor-pointer items-center justify-between gap-6 py-4 text-left">
                    <h3 className="font-editorial text-[1.5rem] leading-tight sm:text-[1.75rem]">{f.question}</h3>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-[transform,border-color] duration-300 group-open:rotate-45 group-hover:border-ink">
                      <Icon name="plus" className="size-4" />
                    </span>
                  </summary>
                  <p className="max-w-2xl pr-14 pb-7 text-[0.98rem] leading-relaxed text-muted">
                    <WithPlaceholders text={f.answer} />
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
