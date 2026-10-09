import { institution } from '../../content/institution'
import { faqs } from '../../content/site'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Eyebrow, WithPlaceholders } from '../ui/Text'

/** Native <details> accordion (keyboard and screen-reader friendly by default) + FAQPage markup in seo.ts. */
export function Faq() {
  const { enquire } = useApp()
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y bg-paper">
      <div className="container-page grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div data-reveal>
            <Eyebrow index="12">FAQs</Eyebrow>
            <h2 id="faq-title" className="font-editorial mt-6 text-[2.6rem] sm:text-[3.4rem] lg:text-[3.9rem]">
              Questions, <em className="italic">answered.</em>
            </h2>
          </div>
          <p className="mt-6 text-[1rem] leading-relaxed text-muted" data-reveal>
            Can’t find what you’re looking for? Our admissions team is happy to help.
          </p>
          <div className="mt-6 space-y-1 text-[0.95rem]" data-reveal>
            <a href={institution.phone.href} className="flex min-h-11 items-center gap-3 font-semibold text-ink hover:text-blue">
              <Icon name="phone" className="size-5 text-blue" /> {institution.phone.display}
            </a>
            <a href={`mailto:${institution.email}`} className="flex min-h-11 items-center gap-3 font-semibold break-all text-ink hover:text-blue">
              <Icon name="mail" className="size-5 shrink-0 text-blue" /> {institution.email}
            </a>
          </div>
          <Button variant="secondary" icon="chat" className="mt-6" onClick={() => enquire('talk')}>
            Talk to Admissions
          </Button>
          <p className="mt-10 flex items-start gap-2 text-[0.8rem] leading-relaxed text-muted">
            <span className="placeholder-token mt-0.5 shrink-0">Highlighted</span>
            text marks demo dates and policies to confirm before launch.
          </p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="border-t border-line">
            {faqs.map((f) => (
              <li key={f.question} className="border-b border-line">
                <details className="group">
                  <summary className="flex min-h-[4.5rem] cursor-pointer items-center justify-between gap-6 py-4 text-left">
                    <h3 className="font-editorial text-[1.4rem] leading-tight sm:text-[1.65rem]">{f.question}</h3>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-[transform,background-color,border-color] duration-300 group-open:rotate-45 group-open:border-sun group-open:bg-sun group-hover:border-ink">
                      <Icon name="plus" className="size-4" />
                    </span>
                  </summary>
                  <p className="max-w-2xl pr-14 pb-7 text-[1rem] leading-relaxed text-muted">
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
