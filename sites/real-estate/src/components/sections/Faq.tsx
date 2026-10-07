import { faqs } from '../../content/site'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Eyebrow } from '../ui/SectionHeader'

export function Faq() {
  const { openEnquiry } = useApp()
  return (
    <section aria-labelledby="faq-title" className="py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>
              <span className="tabular-nums">11</span> <span aria-hidden>—</span> Questions
            </Eyebrow>
            <h2 id="faq-title" className="font-editorial mt-5 text-[2.5rem] sm:text-[3.25rem]">
              Frequently <em>asked</em>.
            </h2>
            <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-muted">Can’t see your question? Our team is happy to help.</p>
            <Button variant="secondary" className="mt-8" icon="arrow-right" onClick={() => openEnquiry('general')}>
              Contact an Agent
            </Button>
          </div>
        </div>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {faqs.map((f, i) => (
            <details key={f.question} className="group" open={i === 0}>
              <summary className="flex min-h-18 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="font-editorial text-[1.5rem] leading-snug sm:text-[1.75rem]">{f.question}</h3>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-transform duration-300 group-open:rotate-45">
                  <Icon name="plus" className="size-4.5" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 text-[0.9875rem] leading-relaxed text-muted">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
