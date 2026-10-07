import { journeySteps } from '../../content/patients'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { useDialogs } from '../dialogs/DialogProvider'

export function Journey() {
  const { openBooking } = useDialogs()
  return (
    <section aria-labelledby="journey-title" className="relative overflow-hidden bg-blue-deep py-20 text-paper sm:py-28 lg:py-32">
      {/* Soft decorative arcs */}
      <svg aria-hidden className="pointer-events-none absolute -top-40 -right-40 size-[36rem] text-paper/[0.06]" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="199" stroke="currentColor" />
        <circle cx="200" cy="200" r="150" stroke="currentColor" />
        <circle cx="200" cy="200" r="100" stroke="currentColor" />
      </svg>

      <div className="container-page relative">
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-7">
            <p className="inline-flex items-center gap-2.5 text-[0.8125rem] font-medium tracking-[0.08em] text-paper/80 uppercase">
              <span aria-hidden className="size-1.5 rounded-full bg-sage" />
              Becoming a patient
            </p>
            <h2 id="journey-title" className="font-display-tight mt-5 text-[2.25rem] leading-[1.08] font-[380] text-paper sm:text-5xl lg:text-[3.5rem]">
              Getting started is simple.
            </h2>
          </div>
          <p className="max-w-md text-[1.0625rem] leading-relaxed text-paper/80 md:col-span-5 md:pb-1.5">
            Four clear steps from your first question to ongoing care — with a real person to help at every stage.
          </p>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-0">
          {journeySteps.map((step, i) => (
            <li key={step.number} className="relative rounded-3xl border border-paper/12 bg-paper/[0.04] p-7 lg:rounded-none lg:border-0 lg:border-l lg:bg-transparent lg:px-8 lg:py-2 first:lg:border-l-0 first:lg:pl-0">
              <div className="flex items-center gap-4">
                <span className="font-display-tight text-[3.25rem] leading-none font-[300] text-sage">{step.number}</span>
                {i < journeySteps.length - 1 && (
                  <span aria-hidden className="hidden h-px flex-1 bg-gradient-to-r from-paper/30 to-transparent lg:block" />
                )}
              </div>
              <span className="mt-8 flex size-11 items-center justify-center rounded-full bg-paper/10 text-paper">
                <Icon name={step.icon} className="size-5" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-paper">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-paper/75">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button variant="light" icon="arrow-right" onClick={() => openBooking()}>
            Book an Appointment
          </Button>
          <a href="#patient-information" className="inline-flex min-h-12 items-center px-2 font-medium text-paper underline decoration-paper/30 underline-offset-[6px] hover:decoration-paper">
            New patient information
          </a>
        </div>
      </div>
    </section>
  )
}
