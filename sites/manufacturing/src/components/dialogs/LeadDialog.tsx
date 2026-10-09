import { useId, useState } from 'react'
import { company } from '../../content/company'
import { brochure } from '../../content/site'
import type { IconName } from '../../content/types'
import { type LeadKind, useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Dialog, DialogClose } from '../ui/Dialog'
import { Consent, SuccessMessage, TextArea, TextField, consent, email, optionalPhone, required, useLeadForm } from '../ui/Form'
import { Icon } from '../ui/Icon'

const copy: Record<LeadKind, { eyebrow: string; title: string; intro: string; cta: string; icon: IconName; done: string }> = {
  engineer: {
    eyebrow: 'Engineering support',
    title: 'Talk to an Engineer',
    intro: 'Discuss design-for-manufacture, materials, tolerances or a project that isn’t ready for a formal RFQ. An application engineer will contact you directly.',
    cta: 'Request a call back',
    icon: 'engineer',
    done: 'An engineer will contact you to arrange a time to talk.',
  },
  sales: {
    eyebrow: 'Sales',
    title: 'Contact Sales',
    intro: 'Questions about capacity, supplier onboarding, pricing or an existing program? Our sales team will get back to you.',
    cta: 'Send message',
    icon: 'phone',
    done: 'A member of our sales team will be in touch shortly.',
  },
  brochure: {
    eyebrow: 'Download',
    title: 'Download Brochure',
    intro: brochure.description,
    cta: 'Email me the brochure',
    icon: 'download',
    done: 'The brochure is on its way to your inbox. (Demo: no email is sent from this prototype.)',
  },
}

function LeadForm({ kind, onDone }: { kind: LeadKind; onDone: (name: string) => void }) {
  const c = copy[kind]
  const rules = {
    name: required('Please enter your full name.'),
    company: required('Please enter your company name.'),
    email,
    ...(kind === 'brochure' ? {} : { phone: optionalPhone, message: required('Please add a short note so we can prepare.') }),
    consent,
  }
  const { errors, onSubmit, onChange } = useLeadForm(rules, (data) => onDone(String(data.get('name') ?? '').trim().split(/\s+/)[0] ?? ''))
  return (
    <form noValidate onSubmit={onSubmit} onChange={onChange} className="grid gap-5 sm:grid-cols-2">
      <TextField label="Full name" name="name" autoComplete="name" error={errors.name} />
      <TextField label="Company" name="company" autoComplete="organization" error={errors.company} />
      <TextField label="Work email" name="email" type="email" autoComplete="email" inputMode="email" error={errors.email} className={kind === 'brochure' ? 'sm:col-span-2' : ''} />
      {kind !== 'brochure' && (
        <>
          <TextField label="Phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" optional error={errors.phone} />
          <TextArea label={kind === 'engineer' ? 'What would you like to discuss?' : 'Message'} name="message" rows={4} error={errors.message} className="sm:col-span-2" />
        </>
      )}
      <div className="sm:col-span-2">
        <Consent error={errors.consent} companyName={company.name} />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" variant={kind === 'brochure' ? 'primary' : 'signal'} size="lg" arrow className="w-full">
          {c.cta}
        </Button>
      </div>
    </form>
  )
}

export function LeadDialog() {
  const { lead, closeLead, requestQuote } = useApp()
  const titleId = useId()
  const [done, setDone] = useState<{ kind: LeadKind; name: string } | null>(null)
  const kind = lead ?? done?.kind ?? 'engineer'
  const c = copy[kind]
  const close = () => {
    closeLead()
    setDone(null)
  }
  const finished = done && done.kind === lead

  return (
    <Dialog open={!!lead} onClose={close} labelledBy={titleId}>
      <div className="flex items-start justify-between gap-6 border-b border-line bg-bone px-6 pt-8 pb-6 sm:px-8">
        <div className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center bg-charcoal text-on-dark">
            <Icon name={c.icon} className="size-6" />
          </span>
          <div>
            <p className="label-mono text-[0.625rem] text-signal-deep">{c.eyebrow}</p>
            <h2 id={titleId} className="font-headline mt-1 text-[1.75rem]">
              {c.title}
            </h2>
          </div>
        </div>
        <DialogClose onClose={close} />
      </div>
      <div className="px-6 py-8 sm:px-8">
        {finished ? (
          <SuccessMessage title={`Thank you${done.name ? `, ${done.name}` : ''}.`}>
            <p>{c.done}</p>
            <div className="mt-8">
              <Button variant="signal" arrow onClick={() => (setDone(null), requestQuote())}>
                Request a Quote
              </Button>
            </div>
          </SuccessMessage>
        ) : (
          <>
            <p className="mb-8 text-[0.9375rem] leading-relaxed text-ink-soft">{c.intro}</p>
            {lead && <LeadForm key={lead} kind={lead} onDone={(name) => setDone({ kind: lead, name })} />}
            {kind !== 'brochure' && (
              <p className="mt-6 flex items-center gap-2 text-[0.8125rem] text-muted">
                <Icon name="phone" className="size-4" />
                Prefer to call?{' '}
                <a href={company.sales.href} className="font-medium text-ink underline underline-offset-2">
                  {company.sales.display}
                </a>
              </p>
            )}
          </>
        )}
      </div>
    </Dialog>
  )
}
