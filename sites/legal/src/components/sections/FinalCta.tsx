import { firm } from '../../content/firm'
import { useApp } from '../../state/AppState'
import { Button, ButtonLink } from '../ui/Button'

export function FinalCta() {
  const { scheduleConsultation } = useApp()
  return (
    <section aria-labelledby="final-cta-title" className="on-dark relative overflow-hidden border-b border-espresso-line bg-espresso-soft">
      {/* Fine architectural line work */}
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-25" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M0 100 50 0 100 100M25 100 50 50 75 100" stroke="#c9a77c" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="container-page relative py-28 text-center lg:py-40">
        <p className="eyebrow text-bronze" data-reveal>
          Calder &amp; Rowe · {firm.city}
        </p>
        <h2 id="final-cta-title" className="font-editorial mx-auto mt-8 max-w-5xl text-[3rem] text-on-dark sm:text-[4.5rem] lg:text-[6.5rem]" data-reveal>
          Good decisions start with <em className="italic text-bronze">good counsel.</em>
        </h2>
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row" data-reveal>
          <Button variant="light" size="lg" arrow onClick={() => scheduleConsultation()}>
            Schedule a Consultation
          </Button>
          <ButtonLink variant="outline-light" size="lg" icon="phone" href={firm.phone.href}>
            {firm.phone.display}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
