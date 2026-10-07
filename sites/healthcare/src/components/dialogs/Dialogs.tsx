import { useId, useState, type FormEvent } from 'react'
import { Dialog, DialogClose } from '../ui/Dialog'
import { Button, ButtonLink } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Eyebrow } from '../ui/SectionHeader'
import { Portrait } from '../ui/Portrait'
import { useDialogs } from './DialogProvider'
import { clinic } from '../../content/clinic'
import { services } from '../../content/services'
import { specialists } from '../../content/people'

export function Dialogs() {
  const { state, close } = useDialogs()
  return (
    <>
      <BookingDialog
        open={state.kind === 'booking'}
        onClose={close}
        serviceId={state.kind === 'booking' ? state.serviceId : undefined}
        specialistId={state.kind === 'booking' ? state.specialistId : undefined}
      />
      <ServiceDialog />
      <SpecialistDialog />
      <InfoDialog />
    </>
  )
}

function PanelHeader({ id, eyebrow, title, onClose }: { id: string; eyebrow: string; title: string; onClose: () => void }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="font-display-tight mt-3 text-3xl leading-tight font-[400] sm:text-[2.25rem]">
          {title}
        </h2>
      </div>
      <DialogClose onClose={onClose} />
    </div>
  )
}

/* ---------------------------------------------------------------- Booking */

const fieldClass =
  'mt-2 block w-full min-h-12 rounded-xl border border-line bg-white/70 px-4 py-3 text-[0.9375rem] text-ink placeholder:text-muted/80 transition-colors hover:border-ink/30 focus:border-blue focus:bg-white focus:outline-none focus-visible:outline-2 focus-visible:outline-blue/40 focus-visible:outline-offset-0 aria-[invalid=true]:border-[#a23b2a]'
const labelClass = 'block text-sm font-medium text-ink'

function BookingDialog({
  open,
  onClose,
  serviceId,
  specialistId,
}: {
  open: boolean
  onClose: () => void
  serviceId?: string
  specialistId?: string
}) {
  const titleId = useId()
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleClose = () => {
    onClose()
    // Reset after the dialog has closed so the next visit starts fresh
    setTimeout(() => {
      setSubmitted(false)
      setErrors({})
    }, 300)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const next: Record<string, string> = {}
    if (!String(data.get('name') ?? '').trim()) next.name = 'Please enter your full name.'
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    if (!email && !phone) next.contact = 'Please provide an email address or phone number.'
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = 'Please enter a valid email address.'
    if (!data.get('consent')) next.consent = 'Please confirm you have read the notice above.'
    setErrors(next)
    const firstInvalid = (['name', 'email', 'contact', 'consent'] as const).find((k) => next[k])
    if (firstInvalid) {
      const target = { name: 'b-name', email: 'b-email', contact: 'b-email', consent: 'b-consent' }[firstInvalid]
      document.getElementById(target)?.focus()
      return
    }
    // Prototype only: integrate with the clinic's practice-management / booking system here.
    setSubmitted(true)
  }

  return (
    <Dialog open={open} onClose={handleClose} labelledBy={titleId}>
      <div className="p-6 sm:p-10">
        <PanelHeader id={titleId} eyebrow="Appointment request" title={submitted ? 'Thank you — request received' : 'Book an appointment'} onClose={handleClose} />

        {submitted ? (
          <div className="mt-8" role="status">
            <div className="flex items-start gap-4 rounded-2xl bg-sage-soft p-5 text-ink">
              <Icon name="check" className="mt-0.5 size-6 shrink-0 text-sage-deep" strokeWidth={2} />
              <p className="leading-relaxed">
                Our patient coordinators will contact you within one working day to confirm a time. If your
                concern is urgent, please call us on{' '}
                <a className="font-medium underline underline-offset-4" href={clinic.phone.href}>
                  {clinic.phone.display}
                </a>
                .
              </p>
            </div>
            <p className="mt-5 text-sm text-muted">Prototype notice: no information was sent or stored.</p>
            <div className="mt-8">
              <Button onClick={handleClose}>Done</Button>
            </div>
          </div>
        ) : (
          <form className="mt-8" noValidate onSubmit={onSubmit}>
            <p className="rounded-2xl border border-clay/30 bg-clay-soft/60 px-5 py-4 text-sm leading-relaxed text-ink">
              <strong className="font-semibold">Not for emergencies.</strong> If you need urgent medical help, call your local
              emergency number. Please don’t include detailed medical information in this form.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="b-name" className={labelClass}>
                  Full name <span aria-hidden className="text-clay-deep">*</span>
                </label>
                <input
                  id="b-name"
                  name="name"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'b-name-err' : undefined}
                  className={fieldClass}
                />
                {errors.name && <FieldError id="b-name-err">{errors.name}</FieldError>}
              </div>
              <div>
                <label htmlFor="b-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="b-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!(errors.email || errors.contact)}
                  aria-describedby={['b-contact-hint', errors.email && 'b-email-err'].filter(Boolean).join(' ')}
                  className={fieldClass}
                />
                {errors.email && <FieldError id="b-email-err">{errors.email}</FieldError>}
              </div>
              <div>
                <label htmlFor="b-phone" className={labelClass}>
                  Phone
                </label>
                <input
                  id="b-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={!!errors.contact}
                  aria-describedby="b-contact-hint"
                  className={fieldClass}
                />
              </div>
              <p id="b-contact-hint" className={`-mt-2 text-sm sm:col-span-2 ${errors.contact ? 'font-medium text-[#a23b2a]' : 'text-muted'}`}>
                {errors.contact ?? 'We’ll use email or phone to confirm your appointment.'}
              </p>

              <div>
                <label htmlFor="b-service" className={labelClass}>
                  Service
                </label>
                <select id="b-service" name="service" defaultValue={serviceId ?? ''} className={`${fieldClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2314213a%22 stroke-width=%221.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}>
                  <option value="">Not sure — help me choose</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="b-clinician" className={labelClass}>
                  Preferred clinician
                </label>
                <select id="b-clinician" name="clinician" defaultValue={specialistId ?? ''} className={`${fieldClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2314213a%22 stroke-width=%221.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}>
                  <option value="">No preference</option>
                  {specialists.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="b-date" className={labelClass}>
                  Preferred date
                </label>
                <input id="b-date" name="date" type="date" min={new Date().toISOString().slice(0, 10)} className={fieldClass} />
              </div>

              <fieldset>
                <legend className={labelClass}>Appointment type</legend>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {['In-person', 'Virtual'].map((t, i) => (
                    <label
                      key={t}
                      className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-line bg-white/70 px-3 text-[0.9375rem] text-ink transition-colors hover:border-ink/30 has-checked:border-ink has-checked:bg-ink has-checked:text-paper has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-blue"
                    >
                      <input type="radio" name="type" value={t} defaultChecked={i === 0} className="sr-only" />
                      <Icon name={t === 'Virtual' ? 'video' : 'building'} className="size-4.5" />
                      {t}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="sm:col-span-2">
                <label htmlFor="b-notes" className={labelClass}>
                  Anything we should know? <span className="font-normal text-muted">(optional)</span>
                </label>
                <textarea
                  id="b-notes"
                  name="notes"
                  rows={3}
                  placeholder="E.g. preferred times, accessibility needs, or interpreter request"
                  className={`${fieldClass} resize-y`}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-soft">
                  <input
                    id="b-consent"
                    type="checkbox"
                    name="consent"
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? 'b-consent-err' : undefined}
                    className="mt-0.5 size-5 shrink-0 accent-ink"
                  />
                  <span>I understand this is a request, not a confirmed appointment, and agree to be contacted about it.</span>
                </label>
                {errors.consent && <FieldError id="b-consent-err">{errors.consent}</FieldError>}
              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse items-stretch gap-4 border-t border-line-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">
                Prefer to talk?{' '}
                <a href={clinic.phone.href} className="font-medium text-ink underline underline-offset-4">
                  {clinic.phone.display}
                </a>
              </p>
              <Button type="submit" icon="arrow-right">
                Request appointment
              </Button>
            </div>
          </form>
        )}
      </div>
    </Dialog>
  )
}

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="mt-2 text-sm font-medium text-[#a23b2a]">
      {children}
    </p>
  )
}

/* ---------------------------------------------------------------- Service */

function ServiceDialog() {
  const { state, close, openBooking } = useDialogs()
  const titleId = useId()
  const service = state.kind === 'service' ? state.service : null
  return (
    <Dialog open={!!service} onClose={close} labelledBy={titleId}>
      {service && (
        <div className="p-6 sm:p-10">
          <PanelHeader id={titleId} eyebrow="Service" title={service.name} onClose={close} />
          <p className="mt-6 text-[1.0625rem] leading-relaxed">{service.description}</p>
          <h3 className="mt-8 text-sm font-semibold tracking-[0.06em] text-ink uppercase">Typically includes</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Icon name="check" className="mt-0.5 size-5 shrink-0 text-sage-deep" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 flex flex-wrap items-center gap-2 text-sm text-muted">
            Available as:
            {service.appointmentTypes.map((t) => (
              <span key={t} className="rounded-full bg-blue-mist px-3 py-1 font-medium text-blue-deep">
                {t}
              </span>
            ))}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 border-t border-line-soft pt-6">
            <Button icon="arrow-right" onClick={() => openBooking({ serviceId: service.id })}>
              Book {service.name}
            </Button>
            <ButtonLink variant="secondary" href={clinic.phone.href}>
              Call {clinic.phone.display}
            </ButtonLink>
          </div>
        </div>
      )}
    </Dialog>
  )
}

/* ------------------------------------------------------------- Specialist */

function SpecialistDialog() {
  const { state, close, openBooking } = useDialogs()
  const titleId = useId()
  const person = state.kind === 'specialist' ? state.specialist : null
  return (
    <Dialog open={!!person} onClose={close} labelledBy={titleId} className="max-w-3xl!">
      {person && (
        <div className="grid sm:grid-cols-[15rem_1fr]">
          <div className="aspect-[4/3] sm:aspect-auto sm:min-h-full">
            <Portrait person={person} />
          </div>
          <div className="p-6 sm:p-9">
            <PanelHeader id={titleId} eyebrow={person.specialty} title={person.name} onClose={close} />
            <p className="mt-2 text-sm text-muted">
              {person.title} · {person.credentials}
            </p>
            {person.isDemo && <DemoBadge className="mt-4">Demo profile</DemoBadge>}
            {person.bio.map((p) => (
              <p key={p} className="mt-5 leading-relaxed">
                {p}
              </p>
            ))}
            <dl className="mt-7 grid gap-5 border-t border-line-soft pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-semibold tracking-[0.06em] text-ink uppercase">Focus areas</dt>
                <dd className="mt-2 text-[0.9375rem]">{person.focusAreas.join(' · ')}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold tracking-[0.06em] text-ink uppercase">Languages</dt>
                <dd className="mt-2 text-[0.9375rem]">{person.languages.join(', ')}</dd>
              </div>
            </dl>
            <div className="mt-8">
              <Button icon="arrow-right" onClick={() => openBooking({ specialistId: person.id })}>
                Book with {person.name}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  )
}

/* ------------------------------------------------------------------- Info */

function InfoDialog() {
  const { state, close, openBooking } = useDialogs()
  const titleId = useId()
  const topic = state.kind === 'info' ? state.topic : null
  return (
    <Dialog open={!!topic} onClose={close} labelledBy={titleId}>
      {topic && (
        <div className="p-6 sm:p-10">
          <PanelHeader id={titleId} eyebrow="Patient information" title={topic.title} onClose={close} />
          {topic.body.map((p) => (
            <p key={p} className="mt-6 text-[1.0625rem] leading-relaxed">
              {p}
            </p>
          ))}
          {topic.bullets && (
            <ul className="mt-6 space-y-3">
              {topic.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Icon name="check" className="mt-0.5 size-5 shrink-0 text-sage-deep" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-8 flex flex-wrap gap-3 border-t border-line-soft pt-6">
            <Button icon="arrow-right" onClick={() => openBooking()}>
              Book an Appointment
            </Button>
            <ButtonLink variant="secondary" href={clinic.phone.href}>
              Questions? Call us
            </ButtonLink>
          </div>
        </div>
      )}
    </Dialog>
  )
}

export function DemoBadge({ children, className = '' }: { children: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-clay/35 bg-clay-soft px-2.5 py-0.5 text-xs font-medium tracking-wide text-clay-deep ${className}`}
    >
      <Icon name="sparkle" className="size-3" />
      {children}
    </span>
  )
}
