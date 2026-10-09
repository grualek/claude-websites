import { institution } from '../../content/institution'
import { fullAddress } from '../../lib/format'
import { useApp } from '../../state/AppState'
import { EnquiryForm } from '../forms/EnquiryForm'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { Eyebrow, WithPlaceholders } from '../ui/Text'

/** Contact details, admissions hours, directions and an inline information request. */
export function Contact() {
  const { enquire } = useApp()
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y">
      <div className="container-page grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div data-reveal>
            <Eyebrow index="13">Contact</Eyebrow>
            <h2 id="contact-title" className="font-editorial mt-6 text-[2.6rem] sm:text-[3.4rem]">
              Come and <em className="italic">say hello.</em>
            </h2>
          </div>

          <address className="mt-10 grid gap-6 not-italic sm:grid-cols-2" data-reveal>
            <div>
              <p className="flex items-center gap-2 text-[0.85rem] font-semibold text-blue">
                <Icon name="pin" className="size-4" /> Address
              </p>
              <p className="mt-2 leading-relaxed text-ink">
                {institution.name}
                <br />
                {institution.address.street}
                <br />
                {institution.address.locality}, {institution.address.region} {institution.address.postalCode}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-[0.85rem] font-semibold text-blue">
                <Icon name="phone" className="size-4" /> Admissions
              </p>
              <a href={institution.phone.href} className="mt-2 block min-h-7 font-semibold text-ink hover:text-blue">
                {institution.phone.display}
              </a>
              <a href={`mailto:${institution.email}`} className="block min-h-7 font-semibold break-all text-ink hover:text-blue">
                {institution.email}
              </a>
            </div>
          </address>

          <div className="mt-8 rounded-[20px] border border-line bg-paper p-6" data-reveal>
            <p className="flex items-center gap-2 text-[0.85rem] font-semibold text-blue">
              <Icon name="clock" className="size-4" /> Admissions hours
            </p>
            <dl className="mt-3 divide-y divide-line text-[0.95rem]">
              {institution.admissionsHours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-muted">{h.days}</dt>
                  <dd className="text-right font-semibold text-ink">
                    <WithPlaceholders text={h.hours} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="mt-8 overflow-hidden rounded-[20px] border border-line" data-reveal>
            <div className="aspect-[16/9]">
              <Media asset={{ scene: 'map', alt: `Map showing the ${institution.name} campus on Collegiate Way, near Millbrook Central station` }} />
            </div>
            <figcaption className="grid gap-3 bg-paper p-5 text-[0.88rem] sm:grid-cols-3">
              {institution.directions.map((d) => (
                <p key={d.mode}>
                  <span className="font-semibold text-ink">{d.mode}. </span>
                  <span className="text-muted">{d.text}</span>
                </p>
              ))}
            </figcaption>
          </figure>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-reveal>
            <Button icon="map" onClick={() => enquire('visit')}>
              Plan a campus visit
            </Button>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/25 px-6 text-[0.92rem] font-semibold text-ink hover:border-ink"
            >
              Get directions <Icon name="arrow-up-right" className="size-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div id="contact-form" className="rounded-[28px] border border-line bg-paper p-6 shadow-[0_40px_80px_-60px_rgb(20_33_58/0.5)] sm:p-10" data-reveal>
            <h3 className="font-editorial text-[2rem]">Request information</h3>
            <p className="mt-2 text-muted">Questions about programs, fees, funding or visiting? Send us a note and an adviser will reply personally.</p>
            <div className="mt-8">
              <EnquiryForm intent="info" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
