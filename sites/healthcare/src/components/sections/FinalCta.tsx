import { Button, ButtonLink } from '../ui/Button'
import { useDialogs } from '../dialogs/DialogProvider'

export function FinalCta() {
  const { openBooking } = useDialogs()
  return (
    <section aria-labelledby="final-cta-title" className="py-20 sm:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-5xl bg-ink px-6 py-16 text-center sm:px-12 sm:py-24 lg:py-28">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-1/2 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-blue/35 blur-3xl" />
            <div className="absolute -bottom-1/2 -left-24 size-[28rem] rounded-full bg-sage/25 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-3xl">
            <p className="text-[0.8125rem] font-medium tracking-[0.08em] text-paper/75 uppercase">We’re here when you’re ready</p>
            <h2
              id="final-cta-title"
              className="font-display-tight mt-6 text-[2.5rem] leading-[1.06] font-[360] text-paper sm:text-[3.5rem] lg:text-[4.25rem]"
            >
              Your health deserves time, attention, and <em className="text-sage italic">expert care</em>.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper/80">
              Book online in a few minutes, or speak with our team to find the right clinician for you.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button variant="light" size="lg" icon="arrow-right" onClick={() => openBooking()}>
                Book an Appointment
              </Button>
              <ButtonLink variant="outline-light" size="lg" href="#contact">
                Contact the Clinic
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
