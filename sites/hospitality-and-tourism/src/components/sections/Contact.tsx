import { useEffect, useRef } from 'react'
import { property } from '../../content/property'
import { useApp } from '../../state/AppState'
import { ButtonLink } from '../ui/Button'
import { email, required, Select, SuccessMessage, TextArea, TextField, useForm } from '../ui/Form'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'

const topics = ['Stay', 'Plan my trip', 'Experiences', 'Dining', 'Weddings & events', 'Something else'] as const

export function Contact() {
  const { enquiry } = useApp()
  const formRef = useRef<HTMLFormElement>(null)
  const { errors, submitted, onSubmit, onChange, reset } = useForm({
    name: required('Please enter your name.'),
    email,
    topic: required('Please choose a topic.'),
    message: required('Please add a short message.'),
  })

  // Apply a pre-fill (e.g. "Reserve a table") when another section routes the visitor here
  useEffect(() => {
    if (!enquiry) return
    if (submitted) reset()
    requestAnimationFrame(() => {
      const form = formRef.current
      if (!form) return
      const topic = form.elements.namedItem('topic') as HTMLSelectElement | null
      const message = form.elements.namedItem('message') as HTMLTextAreaElement | null
      if (topic && topics.includes(enquiry.topic as (typeof topics)[number])) topic.value = enquiry.topic
      if (message && enquiry.message && !message.value) message.value = enquiry.message
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enquiry])

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.geo.latitude},${property.geo.longitude}`)}`

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y bg-ivory">
      <div className="container-page grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow flex items-center gap-4 text-clay">
            <span className="tabular-nums">13</span>
            <span aria-hidden="true" className="h-px w-10 bg-ink/20" />
            <span>Contact</span>
          </p>
          <h2 id="contact-title" className="font-editorial mt-6 text-[2.75rem] sm:text-[3.5rem] lg:text-[4.25rem]">
            Finding <em className="italic">your way here.</em>
          </h2>

          <address className="mt-10 grid gap-6 text-[0.95rem] not-italic sm:grid-cols-2">
            <div>
              <h3 className="eyebrow text-muted">Address</h3>
              <p className="mt-2 leading-relaxed text-ink">
                {property.name}
                <br />
                {property.address.street}
                <br />
                {property.address.postalCode} {property.address.locality}, {property.address.region}
              </p>
            </div>
            <div>
              <h3 className="eyebrow text-muted">Reservations</h3>
              <a href={property.phone.href} className="mt-2 flex min-h-10 items-center gap-2 font-semibold text-ink hover:text-clay">
                <Icon name="phone" className="size-4 text-clay" /> {property.phone.display}
              </a>
              <a href={`mailto:${property.email}`} className="flex min-h-10 items-center gap-2 font-semibold break-all text-ink hover:text-clay">
                <Icon name="mail" className="size-4 shrink-0 text-clay" /> {property.email}
              </a>
            </div>
          </address>

          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[4px] border border-line">
            <Media asset={{ scene: 'map', alt: `Map showing ${property.name} on the coast road between Porto Sarenne and Capo Sarenne` }} sizes="(min-width: 1024px) 40vw, 100vw" />
            <ButtonLink href={mapsUrl} target="_blank" rel="noopener" size="sm" variant="light" icon="pin" className="absolute right-4 bottom-4 shadow-lg">
              Get directions<span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
          </div>

          <ul className="mt-8 grid gap-5">
            {property.directions.map((d) => (
              <li key={d.title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-clay">
                  <Icon name={d.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="text-[0.9rem] font-semibold text-ink">{d.title}</h3>
                  <p className="mt-0.5 text-[0.9rem] leading-relaxed text-muted">{d.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7" data-reveal>
          <div className="rounded-[6px] bg-paper p-6 shadow-[0_30px_60px_-40px_rgb(35_33_30/0.35)] sm:p-10 lg:sticky lg:top-28">
            {submitted ? (
              <SuccessMessage title="Thank you." onReset={reset}>
                Your message is with our team. We usually reply within a day — sooner during the season. (Demo prototype: nothing was sent.)
              </SuccessMessage>
            ) : (
              <>
                <h3 className="font-editorial text-[2.25rem]">Plan your trip</h3>
                <p className="mt-2 text-[0.95rem] text-muted">Questions about a stay, an experience or a celebration? Send us a note and our concierge will reply personally.</p>
                <form id="contact-form" ref={formRef} onSubmit={onSubmit} onChange={onChange} noValidate className="mt-8 grid scroll-mt-28 gap-5 sm:grid-cols-2">
                  <TextField label="Name" name="name" autoComplete="name" error={errors.name} />
                  <TextField label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
                  <Select label="Topic" name="topic" options={topics} placeholder="Choose a topic" error={errors.topic} />
                  <TextField label="Travel dates" name="dates" optional placeholder="e.g. mid-June, 5 nights" />
                  <TextArea label="Message" name="message" className="sm:col-span-2" error={errors.message} />
                  <p className="text-xs leading-relaxed text-muted sm:col-span-2">
                    We’ll only use your details to reply to this enquiry. See our{' '}
                    <a href="#privacy" className="text-ink underline underline-offset-2">
                      privacy policy
                    </a>
                    .
                  </p>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="group/btn inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-charcoal px-8 text-[0.9rem] font-semibold text-on-dark transition-colors hover:bg-ink-soft sm:w-auto"
                    >
                      Contact Us
                      <Icon name="arrow-right" className="size-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
