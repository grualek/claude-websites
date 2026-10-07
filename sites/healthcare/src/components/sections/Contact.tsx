import { clinic, directionsUrl, formatTime } from '../../content/clinic'
import { Button, ButtonLink } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { SectionHeader } from '../ui/SectionHeader'
import { useDialogs } from '../dialogs/DialogProvider'

export function Contact() {
  const { openBooking } = useDialogs()
  const { address } = clinic
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-paper py-20 sm:py-28 lg:py-32">
      <div className="container-page">
        <SectionHeader
          id="contact-title"
          align="split"
          eyebrow="Visit us"
          title="Find the clinic."
          intro={`Located in central ${address.locality}, with step-free access, nearby parking and public transport links.`}
        />

        <div className="mt-14 grid overflow-hidden rounded-4xl border border-line lg:mt-20 lg:grid-cols-12">
          <div className="relative min-h-[18rem] sm:min-h-[24rem] lg:col-span-7 lg:min-h-full">
            <Media scene="map" asset={{ alt: `Map showing the clinic at ${address.street}, ${address.locality}` }} />
            <div className="absolute bottom-4 left-4 rounded-2xl bg-paper/95 px-4 py-3 text-sm shadow-[0_16px_40px_-24px_rgb(20_33_58/0.6)] backdrop-blur">
              <p className="font-semibold text-ink">{clinic.name}</p>
              <p className="text-muted">{address.street}</p>
            </div>
          </div>

          <div className="bg-ivory p-7 sm:p-10 lg:col-span-5">
            {/* Address marked up as a contact block for local SEO */}
            <address className="not-italic">
              <dl className="space-y-7">
                <ContactRow icon="pin" label="Address">
                  {address.street}
                  <br />
                  {address.locality}, {address.region} {address.postalCode}
                </ContactRow>
                <ContactRow icon="phone" label="Phone">
                  <a href={clinic.phone.href} className="font-medium text-ink underline-offset-4 hover:underline">
                    {clinic.phone.display}
                  </a>
                </ContactRow>
                <ContactRow icon="mail" label="Email">
                  <a href={`mailto:${clinic.email}`} className="font-medium break-all text-ink underline-offset-4 hover:underline">
                    {clinic.email}
                  </a>
                </ContactRow>
                <ContactRow icon="clock" label="Opening hours">
                  <table className="w-full text-left">
                    <caption className="sr-only">Opening hours</caption>
                    <tbody>
                      {clinic.hours.map((h) => (
                        <tr key={h.label} className="align-top">
                          <th scope="row" className="py-0.5 pr-4 font-normal">
                            {h.label}
                          </th>
                          <td className="py-0.5 text-right font-medium whitespace-nowrap text-ink tabular-nums">
                            {h.closed || !h.opens || !h.closes ? 'Closed' : `${formatTime(h.opens)} – ${formatTime(h.closes)}`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ContactRow>
              </dl>
            </address>

            <div className="mt-9 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row lg:flex-col xl:flex-row">
              <Button icon="arrow-right" onClick={() => openBooking()} className="flex-1">
                Book an Appointment
              </Button>
              <ButtonLink variant="secondary" href={directionsUrl} target="_blank" rel="noopener noreferrer" icon="arrow-up-right" className="flex-1">
                Get directions<span className="sr-only"> (opens in a new tab)</span>
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactRow({ icon, label, children }: { icon: 'pin' | 'phone' | 'mail' | 'clock'; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-mist text-blue-deep">
        <Icon name={icon} className="size-4.5" />
      </span>
      <div className="min-w-0 flex-1">
        <dt className="text-sm font-medium tracking-[0.06em] text-muted uppercase">{label}</dt>
        <dd className="mt-1.5 leading-relaxed text-ink-soft">{children}</dd>
      </div>
    </div>
  )
}
