import { firm } from '../../content/firm'
import { faqs } from '../../content/site'
import { Icon } from '../ui/Icon'
import { SectionHeader } from '../ui/SectionHeader'

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line bg-stone py-24 lg:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeader index="07" eyebrow="Frequently Asked Questions" id="faq-title" title="Before your first conversation." stacked />
          <div className="mt-10 max-w-sm border-l border-bronze pl-6" data-reveal>
            <p className="text-[0.9375rem] leading-relaxed text-ink-soft">Have a question that isn’t answered here? Our team is happy to help.</p>
            <a href={firm.phone.href} className="mt-4 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-ink hover:text-bronze-deep">
              <Icon name="phone" className="size-4" />
              {firm.phone.display}
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-14">
          <ul className="border-t border-line">
            {faqs.map((f) => (
              <li key={f.question} className="border-b border-line" data-reveal>
                <details className="group">
                  <summary className="flex min-h-20 cursor-pointer items-center justify-between gap-6 py-5 text-left focus-visible:outline-offset-[-2px]">
                    <h3 className="font-editorial text-[1.375rem] leading-snug sm:text-[1.5rem]">{f.question}</h3>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 group-open:rotate-45 group-open:border-espresso group-open:bg-espresso group-open:text-on-dark">
                      <Icon name="plus" className="size-4" />
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-7 text-[0.9375rem] leading-relaxed text-muted">{f.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
