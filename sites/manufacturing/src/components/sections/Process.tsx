import { processSteps } from '../../content/site'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { SectionHeader } from '../ui/SectionHeader'

export function Process() {
  const { requestQuote, openLead } = useApp()
  return (
    <section id="process" aria-labelledby="process-title" className="bg-blueprint bg-concrete py-24 lg:py-32">
      <div className="container-page">
        <SectionHeader
          index="05"
          eyebrow="Process"
          id="process-title"
          title="A manufacturing process you can audit."
          intro="Five controlled stages, each with defined outputs. You always know where your parts are, and what has been checked."
        />

        {/* Horizontal timeline on desktop, vertical flow on mobile */}
        <ol className="relative mt-16 grid gap-0 lg:mt-24 lg:grid-cols-5">
          <span aria-hidden="true" className="absolute top-0 bottom-0 left-[1.1875rem] w-px bg-ink/25 lg:top-[1.1875rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
          {processSteps.map((s, i) => (
            <li key={s.code} className="relative grid grid-cols-[2.5rem_1fr] gap-x-6 pb-12 last:pb-0 lg:block lg:pr-8 lg:pb-0" data-reveal>
              <span aria-hidden="true" className="relative z-10 flex size-10 items-center justify-center">
                <span className={`size-3.5 ${i === 0 ? 'bg-signal' : 'border-2 border-ink bg-concrete'}`} />
              </span>
              <div className="lg:mt-10">
                <span className="font-headline block text-[2.5rem] leading-none text-ink/15 tabular-nums lg:text-[4.5rem]">{s.code}</span>
                <h3 className="font-headline mt-3 text-[1.5rem] lg:mt-4" style={{ letterSpacing: '-0.02em' }}>
                  {s.title}
                </h3>
                <p className="mt-3 max-w-sm text-[0.875rem] leading-relaxed text-ink-soft">{s.body}</p>
                <ul className="mt-5 space-y-1.5 border-t border-ink/15 pt-4">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2 font-mono text-[0.75rem] text-ink-soft">
                      <Icon name="check" className="size-3.5 text-signal-deep" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink/20 pt-8 sm:flex-row sm:items-center sm:justify-between" data-reveal>
          <p className="max-w-lg text-[0.9375rem] text-ink-soft">Start at stage 01. Send a drawing or model, and an engineer will review it with you.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="signal" arrow onClick={() => requestQuote()}>
              Request a Quote
            </Button>
            <Button variant="secondary" icon="engineer" onClick={() => openLead('engineer')}>
              Talk to an Engineer
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
