import type { CSSProperties } from 'react'
import { keyDates, steps } from '../../content/site'
import { useApp } from '../../state/AppState'
import { Button, TextAction } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { SectionHeader, WithPlaceholders } from '../ui/Text'

/** Four-step admissions journey with a connecting rule, plus key dates and the main admissions actions. */
export function Admissions() {
  const { enquire, explore } = useApp()
  return (
    <section id="admissions" aria-labelledby="admissions-title" className="section-y">
      <div className="container-page">
        <SectionHeader
          index="05"
          eyebrow="Admissions"
          id="admissions-title"
          title={
            <>
              Four steps from <em className="italic">curious</em> to enrolled.
            </>
          }
          intro="Applying should feel clear and human. Our admissions advisers are with you at every step — and happy to answer questions before you apply."
        />

        <ol className="relative mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <span aria-hidden="true" className="absolute top-[2.2rem] right-[12%] left-[6%] hidden h-px border-t border-dashed border-ink/25 xl:block" />
          {steps.map((s, i) => (
            <li key={s.title} data-reveal style={{ '--reveal-delay': `${i * 100}ms` } as CSSProperties} className="group relative flex flex-col rounded-[22px] border border-line bg-paper p-7 transition-colors hover:border-ink/40">
              <span className={`font-editorial relative flex size-[4.4rem] items-center justify-center rounded-full text-[1.7rem] ${i === 0 ? 'bg-sun text-navy' : 'bg-navy text-on-dark'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-editorial mt-7 text-[1.65rem] leading-tight">{s.title}</h3>
              <p className="mt-3 flex-1 text-[0.96rem] leading-relaxed text-muted">{s.body}</p>
              <div className="mt-6">
                {s.intent ? (
                  <button type="button" onClick={() => enquire(s.intent!)} className="group min-h-11 text-left">
                    <TextAction>{s.action}</TextAction>
                  </button>
                ) : (
                  <button type="button" onClick={() => explore()} className="group min-h-11 text-left">
                    <TextAction>{s.action}</TextAction>
                  </button>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-6 rounded-[24px] bg-blue-mist p-7 sm:p-10 lg:grid-cols-12 lg:items-center" data-reveal>
          <div className="lg:col-span-4">
            <p className="flex items-center gap-2 text-[0.85rem] font-semibold text-blue">
              <Icon name="calendar" className="size-4" /> Key dates
            </p>
            <p className="font-editorial mt-3 text-[2rem] leading-tight text-ink">Plan your application</p>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 lg:col-span-5">
            {keyDates.map((d) => (
              <div key={d.label}>
                <dt className="text-[0.85rem] text-muted">{d.label}</dt>
                <dd className="mt-1 text-[0.98rem] font-semibold text-ink">
                  <WithPlaceholders text={d.value} />
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-3 lg:flex-col">
            <Button arrow onClick={() => enquire('apply')}>
              Apply Now
            </Button>
            <Button variant="secondary" icon="chat" onClick={() => enquire('talk')}>
              Talk to Admissions
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
