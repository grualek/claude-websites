import { steps } from '../../content/site'
import { pad } from '../../lib/format'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'

export function HowWeWork() {
  const { scheduleConsultation } = useApp()
  return (
    <section id="approach" aria-labelledby="approach-title" className="on-dark bg-espresso py-24 text-on-dark-muted lg:py-32">
      <div className="container-page">
        <SectionHeader
          light
          index="03"
          eyebrow="How We Work"
          id="approach-title"
          title={
            <>
              A calm, considered path <em className="italic text-bronze">from first call to resolution.</em>
            </>
          }
          intro="Legal matters can feel uncertain. Our process is designed to give you clarity early — on the issues, the options and the cost — and to keep you informed throughout."
        />

        <ol className="mt-16 grid gap-px bg-espresso-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col bg-espresso py-10 sm:px-8 lg:min-h-[22rem] lg:first:pl-0" data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="font-editorial text-[3.5rem] leading-none text-bronze tabular-nums">{pad(i + 1)}</span>
              <h3 className="font-editorial mt-8 text-[1.625rem] text-on-dark">{s.title}</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed">{s.body}</p>
              <p className="mt-auto flex items-center gap-3 pt-8 text-xs tracking-[0.04em] text-on-dark">
                <span className="h-px w-6 bg-bronze" aria-hidden="true" />
                {s.detail}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col items-start gap-6 border-t border-espresso-line pt-10 sm:flex-row sm:items-center sm:justify-between" data-reveal>
          <p className="font-editorial max-w-xl text-[1.5rem] leading-snug text-on-dark">The first step is a confidential conversation. There is no obligation to proceed.</p>
          <Button variant="light" size="lg" arrow onClick={() => scheduleConsultation()}>
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  )
}
