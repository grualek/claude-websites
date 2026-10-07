import { company } from '../../content/company'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Consent, Select, SuccessMessage, TextArea, TextField, consent, email, required, useLeadForm } from '../ui/Form'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { SectionHeader } from '../ui/SectionHeader'

export const enquiryTypes = ['Buying', 'Renting', 'Selling / valuation', 'Property management', 'Investment advice', 'Something else']

export function Contact() {
  const { openEnquiry } = useApp()
  const { errors, submitted, onSubmit, reset } = useLeadForm({
    name: required('Please enter your name.'),
    email,
    message: required('Please add a short message.'),
    consent,
  })
  const a = company.address

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-paper py-20 sm:py-28">
      <div className="container-page">
        <SectionHeader
          id="contact-title"
          index="12"
          eyebrow="Contact"
          title={
            <>
              Come and <em>see us</em>.
            </>
          }
          intro="Drop into the office on Linden Row, call, or send a message — we reply to every enquiry within one working day."
          action={
            <Button variant="olive" icon="calendar" onClick={() => openEnquiry('viewing')}>
              Request a Viewing
            </Button>
          }
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Office details */}
          <div className="lg:col-span-5">
            <div className="aspect-[16/10] overflow-hidden rounded-[3px] bg-sand">
              <Media asset={{ scene: 'oldtown', tone: 'day', alt: 'Illustration of Linden Row in the Old Town, where the office is located' }} sizes="40vw" />
            </div>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="eyebrow flex items-center gap-2 text-[0.6rem] text-muted">
                  <Icon name="pin" className="size-4" /> Office
                </dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink">
                  <address className="not-italic">
                    {company.name}
                    <br />
                    {a.street}, {a.region}
                    <br />
                    {a.locality} {a.postcode}
                  </address>
                </dd>
              </div>
              <div>
                <dt className="eyebrow flex items-center gap-2 text-[0.6rem] text-muted">
                  <Icon name="clock" className="size-4" /> Opening hours
                </dt>
                <dd className="mt-2 text-[0.9375rem] text-ink">
                  <ul className="space-y-1">
                    {company.hours.map((h) => (
                      <li key={h.label} className="flex justify-between gap-4">
                        <span>{h.label}</span>
                        <span className="text-muted tabular-nums">{h.closed ? 'Closed' : `${h.opens}–${h.closes}`}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-muted">{company.hoursNote}</p>
                </dd>
              </div>
              <div>
                <dt className="eyebrow flex items-center gap-2 text-[0.6rem] text-muted">
                  <Icon name="phone" className="size-4" /> Phone
                </dt>
                <dd className="mt-2 space-y-1 text-[0.9375rem]">
                  <a href={company.phone.href} className="block text-ink underline-offset-4 hover:underline">
                    Sales {company.phone.display}
                  </a>
                  <a href={company.lettingsPhone.href} className="block text-ink underline-offset-4 hover:underline">
                    Lettings {company.lettingsPhone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow flex items-center gap-2 text-[0.6rem] text-muted">
                  <Icon name="mail" className="size-4" /> Email
                </dt>
                <dd className="mt-2 text-[0.9375rem]">
                  <a href={`mailto:${company.email}`} className="break-all text-ink underline-offset-4 hover:underline">
                    {company.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Form */}
          <div className="rounded-[4px] border border-line bg-ivory p-6 sm:p-10 lg:col-span-7">
            {submitted ? (
              <SuccessMessage title="Message received." onReset={reset}>
                Thank you. The right person in our team will reply within one working day.
              </SuccessMessage>
            ) : (
              <form noValidate onSubmit={onSubmit} aria-label="Contact form" className="grid gap-5">
                <p className="font-editorial text-[2rem] leading-tight text-ink">Send us a message</p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField label="Full name" name="name" autoComplete="name" error={errors.name} />
                  <Select label="I’m interested in" name="topic" options={enquiryTypes} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
                  <TextField label="Phone" name="phone" type="tel" autoComplete="tel" optional />
                </div>
                <TextArea label="Message" name="message" error={errors.message} placeholder="Tell us a little about what you’re looking for…" />
                <Select label="Preferred contact" name="preferred" options={['Email', 'Phone', 'Either']} />
                <Consent error={errors.consent} />
                <Button type="submit" size="lg" icon="arrow-right" className="w-full sm:w-auto sm:justify-self-start">
                  Send message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
