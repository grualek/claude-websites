import { useEffect, useState } from 'react'
import { firm } from '../../content/firm'
import { practiceAreas } from '../../content/practices'
import { contactMethods } from '../../content/site'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { ChoiceGroup, Consent, Select, SuccessMessage, TextArea, TextField, consent, email, phone, required, useIntakeForm } from '../ui/Form'
import { Icon } from '../ui/Icon'

const matterOptions = [...practiceAreas.map((p) => p.matterLabel), 'Other / not sure']

const nextSteps = [
  'A member of our team reviews your request — usually within one business day.',
  'We contact you by your preferred method to arrange a convenient time.',
  'You meet with an attorney, in person, by phone or by video.',
]

export function Contact() {
  const { matter: requestedMatter, matterRequest } = useApp()
  const [matter, setMatter] = useState(requestedMatter)
  const [firstName, setFirstName] = useState('')

  // A CTA elsewhere on the page can pre-select the matter type
  useEffect(() => {
    if (matterRequest) setMatter(requestedMatter)
  }, [matterRequest, requestedMatter])

  const { errors, submitted, onSubmit, onChange, reset } = useIntakeForm(
    {
      name: required('Please enter your full name.'),
      email,
      phone,
      matter: required('Please choose the type of matter.'),
      message: required('Please add a brief description so we can prepare.'),
      consent,
    },
    (data) => {
      // Replace with a POST to the intake / CRM endpoint (conflict check happens before engagement).
      setFirstName(String(data.get('name') ?? '').trim().split(/\s+/)[0] ?? '')
    },
  )

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24 lg:py-32">
      <div className="container-page grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:pr-10">
          <div className="flex items-center gap-4 border-t border-line pt-5 text-muted" data-reveal>
            <span className="eyebrow text-bronze-deep">08</span>
            <span className="eyebrow">Schedule a Consultation</span>
          </div>
          <h2 id="contact-title" className="font-editorial mt-8 text-[2.75rem] sm:text-[3.5rem] lg:mt-10 lg:text-[4rem]" data-reveal>
            Tell us about <em className="italic text-bronze-deep">your matter.</em>
          </h2>
          <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-muted" data-reveal>
            Share a few details and we will arrange a confidential consultation with the appropriate attorney. Prefer to talk now? Call us directly.
          </p>

          <ul className="mt-10 space-y-5 border-t border-line pt-8 text-[0.9375rem]" data-reveal>
            <li>
              <a href={firm.phone.href} className="group flex items-center gap-4 text-ink">
                <span className="flex size-11 items-center justify-center rounded-full border border-line group-hover:border-espresso">
                  <Icon name="phone" className="size-4.5" />
                </span>
                <span>
                  <span className="block text-xs text-muted">Call the firm</span>
                  <span className="font-medium">{firm.phone.display}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${firm.email}`} className="group flex items-center gap-4 text-ink">
                <span className="flex size-11 items-center justify-center rounded-full border border-line group-hover:border-espresso">
                  <Icon name="mail" className="size-4.5" />
                </span>
                <span>
                  <span className="block text-xs text-muted">Email</span>
                  <span className="font-medium">{firm.email}</span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4 text-ink">
              <span className="flex size-11 items-center justify-center rounded-full border border-line">
                <Icon name="pin" className="size-4.5" />
              </span>
              <span>
                <span className="block text-xs text-muted">Office</span>
                <span className="font-medium">
                  {firm.address.street}, {firm.address.locality}
                </span>
              </span>
            </li>
          </ul>

          <div className="mt-10 bg-stone p-7" data-reveal>
            <h3 className="eyebrow text-ink">What happens next</h3>
            <ol className="mt-5 space-y-4">
              {nextSteps.map((s, i) => (
                <li key={s} className="flex gap-4 text-[0.875rem] leading-relaxed text-ink-soft">
                  <span className="font-editorial text-[1.25rem] leading-none text-bronze-deep tabular-nums">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-line bg-paper p-6 shadow-[0_40px_80px_-60px_rgb(27_25_22/0.35)] sm:p-10 lg:p-12" data-reveal>
            {submitted ? (
              <SuccessMessage title={`Thank you${firstName ? `, ${firstName}` : ''}.`} onReset={reset}>
                <p>
                  Your consultation request has been received. A member of our team will contact you within one business day to arrange a time. If your matter is urgent,
                  please call <a href={firm.phone.href} className="text-ink underline underline-offset-2">{firm.phone.display}</a>.
                </p>
              </SuccessMessage>
            ) : (
              <form id="consultation-form" noValidate onSubmit={onSubmit} onChange={onChange} aria-labelledby="form-title">
                <div className="flex flex-col gap-2 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
                  <h3 id="form-title" className="font-editorial text-[1.875rem]">
                    Consultation request
                  </h3>
                  <p className="text-xs text-muted">
                    <span aria-hidden="true" className="text-bronze-deep">*</span> Required fields
                  </p>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <TextField label="Full name" name="name" autoComplete="name" error={errors.name} className="sm:col-span-2" />
                  <TextField label="Email" name="email" type="email" autoComplete="email" inputMode="email" error={errors.email} />
                  <TextField label="Phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" error={errors.phone} />
                  <Select
                    label="Matter type"
                    name="matter"
                    options={matterOptions}
                    placeholder="Select a practice area"
                    value={matter}
                    onChange={(e) => setMatter(e.target.value)}
                    error={errors.matter}
                    className="sm:col-span-2"
                  />
                  <div className="sm:col-span-2">
                    <ChoiceGroup legend="Preferred contact method" name="contactMethod" options={contactMethods} defaultValue="Phone" />
                  </div>
                  <TextArea
                    label="How can we help?"
                    name="message"
                    hint="A brief overview is enough. Please avoid sharing confidential details until we have spoken."
                    error={errors.message}
                    className="sm:col-span-2"
                  />
                </div>

                <div className="mt-8 flex gap-4 border border-line-soft bg-ivory p-5">
                  <Icon name="lock" className="mt-0.5 size-5 shrink-0 text-bronze-deep" />
                  <p className="text-[0.8125rem] leading-relaxed text-muted">
                    <strong className="font-medium text-ink">Your privacy matters.</strong> Information you share is transmitted securely, reviewed only by our
                    attorneys and intake staff, and never sold or shared for marketing.
                  </p>
                </div>

                <div className="mt-6">
                  <Consent error={errors.consent} firmName={firm.name} />
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" size="lg" arrow className="w-full sm:w-auto">
                    Request Consultation
                  </Button>
                  <p className="text-xs text-muted">We typically respond within one business day.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
