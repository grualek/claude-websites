import { services } from '../../content/services'
import { Icon } from '../ui/Icon'
import { ButtonLink } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'
import { useDialogs } from '../dialogs/DialogProvider'

export function Services() {
  const { openService } = useDialogs()
  return (
    <section id="services" aria-labelledby="services-title" className="py-20 sm:py-28 lg:py-32">
      <div className="container-page">
        <SectionHeader
          id="services-title"
          align="split"
          eyebrow="Our services"
          title={
            <>
              Comprehensive care, <span className="text-blue-deep italic">thoughtfully</span> connected.
            </>
          }
          intro="From routine check-ups to specialist opinions, our clinicians work as one team — so you don’t have to navigate your care alone."
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-4xl border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {services.map((service, i) => (
            <li key={service.id} className="group relative flex flex-col bg-paper p-7 transition-colors duration-300 hover:bg-white sm:p-8 lg:min-h-[21rem]">
              <div className="flex items-start justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-mist text-blue-deep transition-colors duration-300 group-hover:bg-blue-deep group-hover:text-paper">
                  <Icon name={service.icon} className="size-6" />
                </span>
                <span aria-hidden className="font-display-tight text-sm text-muted/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-display-tight mt-8 text-[1.625rem] leading-tight font-[420]">{service.name}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{service.summary}</p>
              <button
                type="button"
                onClick={() => openService(service)}
                className="mt-auto inline-flex min-h-11 items-center gap-2 pt-6 text-[0.9375rem] font-medium text-ink after:absolute after:inset-0 after:content-['']"
                aria-label={`Learn more about ${service.name}`}
              >
                <span className="underline decoration-ink/25 underline-offset-[6px] transition-colors group-hover:decoration-ink">
                  Learn more
                </span>
                <Icon name="arrow-right" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl bg-sand/60 px-6 py-5 sm:flex-row sm:items-center sm:px-8">
          <p className="text-[0.9375rem] text-ink">
            Not sure which service you need? Our patient coordinators can point you in the right direction.
          </p>
          <ButtonLink href="#contact" variant="secondary" size="sm" icon="arrow-right" className="shrink-0">
            Contact the clinic
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
