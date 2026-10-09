import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Media } from '../ui/Media'

export function FinalCta() {
  const { requestQuote, openLead } = useApp()
  return (
    <section aria-labelledby="final-cta-title" className="on-dark relative isolate overflow-hidden bg-charcoal">
      <div className="absolute inset-0 -z-10 opacity-70">
        <Media asset={{ scene: 'robot', alt: '' }} />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/30" aria-hidden="true" />
      <div className="container-page py-24 lg:py-36">
        <div className="max-w-3xl" data-reveal>
          <p className="label-mono flex items-center gap-3 text-on-dark-muted">
            <span className="size-1.5 bg-signal" aria-hidden="true" />
            Start a conversation
          </p>
          <h2 id="final-cta-title" className="font-headline mt-8 text-[2.5rem] text-on-dark sm:text-[3.5rem] lg:text-[4.5rem]">
            Have a demanding manufacturing requirement?
          </h2>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-on-dark-muted">
            Send a drawing, a model or just a problem statement. We’ll tell you honestly how we would make it, and what it will take.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button variant="signal" size="lg" arrow onClick={() => requestQuote()}>
              Request a Quote
            </Button>
            <Button variant="outline-light" size="lg" icon="engineer" onClick={() => openLead('engineer')}>
              Talk to an Engineer
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
