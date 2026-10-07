import { useId, useState } from 'react'
import { getProperty } from '../../content/properties'
import { getArea } from '../../content/areas'
import { company, getAgent } from '../../content/company'
import type { EnquiryIntent, Property } from '../../content/types'
import { formatArea, formatPrice, propertyTypeLabel, sqm } from '../../lib/format'
import { featureLabels } from '../../lib/search'
import { routes } from '../../lib/routes'
import { useApp } from '../../state/AppState'
import { Button, ButtonLink } from '../ui/Button'
import { Dialog, DialogClose } from '../ui/Dialog'
import { ChoiceGroup, Consent, Select, SuccessMessage, TextArea, TextField, consent, email, required, useLeadForm } from '../ui/Form'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { PropertyFacts, SaveButton, StatusBadge } from '../property/PropertyBits'
import { enquiryTypes } from '../sections/Contact'
import { areas } from '../../content/areas'

export function Dialogs() {
  const { dialog, closeDialog } = useApp()
  const property = dialog.kind === 'property' ? getProperty(dialog.propertyId) : undefined
  return (
    <>
      <PropertyDialog property={property} onClose={closeDialog} />
      <EnquiryDialog
        open={dialog.kind === 'enquiry'}
        intent={dialog.kind === 'enquiry' ? dialog.intent : 'general'}
        property={dialog.kind === 'enquiry' && dialog.propertyId ? getProperty(dialog.propertyId) : undefined}
        onClose={closeDialog}
      />
    </>
  )
}

/* ------------------------------------------------------------- Property */

function PropertyDialog({ property: p, onClose }: { property?: Property; onClose: () => void }) {
  const titleId = useId()
  const [imageIndex, setImageIndex] = useState(0)
  const { openEnquiry } = useApp()
  const close = () => {
    onClose()
    setTimeout(() => setImageIndex(0), 300)
  }
  if (!p) return <Dialog open={false} onClose={close} labelledBy={titleId} size="xl" children={null} />

  const area = getArea(p.address.areaId)
  const agent = getAgent(p.agentId)
  const image = p.images[imageIndex] ?? p.images[0]
  const facts = [
    p.bedrooms > 0 && ['Bedrooms', String(p.bedrooms)],
    ['Bathrooms', String(p.bathrooms)],
    p.receptions && ['Receptions', String(p.receptions)],
    ['Floor area', `${formatArea(p.floorArea)} · ${sqm(p.floorArea)}`],
    p.plot && ['Plot', p.plot],
    p.tenure && ['Tenure', p.tenure],
    p.availableFrom && ['Available', p.availableFrom],
    p.epc && ['EPC rating', p.epc],
    p.councilTax && ['Council tax', p.councilTax],
  ].filter(Boolean) as string[][]

  return (
    <Dialog open onClose={close} labelledBy={titleId} size="xl">
      <div className="grid lg:grid-cols-[1.25fr_1fr]">
        {/* Gallery */}
        <div className="bg-sand lg:sticky lg:top-0 lg:self-start">
          <div className="relative aspect-[4/3]">
            <Media key={imageIndex} asset={image} priority sizes="(min-width: 1024px) 55vw, 100vw" className="animate-fade-up" />
            <StatusBadge status={p.status} className="absolute top-4 left-4" />
            <SaveButton property={p} className="absolute top-3 right-3" />
            {p.images.length > 1 && (
              <div className="absolute right-4 bottom-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setImageIndex((i) => (i - 1 + p.images.length) % p.images.length)}
                  className="inline-flex size-10 items-center justify-center rounded-full bg-paper/90 text-ink hover:bg-paper"
                >
                  <Icon name="arrow-left" className="size-4.5" />
                  <span className="sr-only">Previous image</span>
                </button>
                <button
                  type="button"
                  onClick={() => setImageIndex((i) => (i + 1) % p.images.length)}
                  className="inline-flex size-10 items-center justify-center rounded-full bg-paper/90 text-ink hover:bg-paper"
                >
                  <Icon name="arrow-right" className="size-4.5" />
                  <span className="sr-only">Next image</span>
                </button>
              </div>
            )}
            <p className="absolute bottom-5 left-4 text-xs font-medium text-paper drop-shadow" aria-live="polite">
              {imageIndex + 1} / {p.images.length}
            </p>
          </div>
          <ul className="grid grid-cols-4 gap-2 p-2" aria-label="Choose image">
            {p.images.map((img, i) => (
              <li key={img.alt}>
                <button
                  type="button"
                  onClick={() => setImageIndex(i)}
                  aria-pressed={i === imageIndex}
                  aria-label={`Show image ${i + 1}: ${img.alt}`}
                  className={`block aspect-[4/3] w-full overflow-hidden rounded-[2px] ring-offset-2 ring-offset-sand transition ${i === imageIndex ? 'ring-2 ring-ink' : 'opacity-75 hover:opacity-100'}`}
                >
                  <Media asset={{ ...img, alt: '' }} sizes="120px" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Details */}
        <div className="p-6 sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <p className="eyebrow pt-2 text-[0.6rem] text-muted">
              {propertyTypeLabel[p.propertyType]} · {area?.name}
            </p>
            <DialogClose onClose={close} />
          </div>
          <h2 id={titleId} className="font-editorial mt-2 text-[2.5rem] sm:text-[3rem]">
            {p.title}
          </h2>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
            <Icon name="pin" className="size-4" />
            {p.address.line}, {p.address.city} {p.address.postcode}
          </p>
          <p className="mt-6">
            {p.priceQualifier && <span className="eyebrow block text-[0.6rem] text-muted">{p.priceQualifier}</span>}
            <span className="font-editorial text-[2.25rem] leading-none text-ink tabular-nums">{formatPrice(p)}</span>
          </p>
          <PropertyFacts property={p} size="lg" className="mt-5 border-y border-line py-4" />

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button icon="calendar" onClick={() => openEnquiry('viewing', p.id)}>
              Book a Viewing
            </Button>
            <ButtonLink variant="secondary" href={agent.phone.href} icon="phone">
              Call {agent.name.split(' ')[0]}
            </ButtonLink>
          </div>

          <p className="mt-8 text-[0.9875rem] leading-relaxed text-ink-soft">{p.summary}</p>
          {p.description.map((d) => (
            <p key={d.slice(0, 24)} className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
              {d}
            </p>
          ))}

          <h3 className="eyebrow mt-8 text-[0.65rem] text-ink">Key features</h3>
          <ul className="mt-3 grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
            {p.keyFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Icon name="check" className="mt-0.5 size-4 shrink-0 text-olive" />
                {f}
              </li>
            ))}
          </ul>

          <h3 className="eyebrow mt-8 text-[0.65rem] text-ink">Details</h3>
          <dl className="mt-3 divide-y divide-line-soft border-y border-line-soft text-sm">
            {facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5">
                <dt className="text-muted">{k}</dt>
                <dd className="text-right font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          {p.features.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.features.map((f) => (
                <li key={f} className="rounded-full bg-olive-soft px-3 py-1 text-xs font-medium text-olive-deep">
                  {featureLabels[f]}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex items-center gap-4 rounded-[3px] border border-line bg-ivory p-4">
            <span className="font-editorial flex size-12 shrink-0 items-center justify-center rounded-full bg-sand text-xl text-ink" aria-hidden>
              {agent.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>
            <div className="min-w-0 text-sm">
              <p className="font-semibold text-ink">{agent.name}</p>
              <p className="text-muted">{agent.role}</p>
              <a href={agent.phone.href} className="text-ink underline-offset-4 hover:underline">
                {agent.phone.display}
              </a>
            </div>
          </div>
          <p className="mt-6 text-xs text-muted">
            Reference {p.id.toUpperCase()} · Listing page: <span className="font-mono">{routes.property(p)}</span>
          </p>
        </div>
      </div>
    </Dialog>
  )
}

/* -------------------------------------------------------------- Enquiry */

const intentCopy: Record<EnquiryIntent, { eyebrow: string; title: string; intro: string; submit: string; success: string }> = {
  viewing: {
    eyebrow: 'Book a viewing',
    title: 'Arrange a viewing',
    intro: 'Tell us when suits you and we’ll confirm a time within one working day. In-person and video viewings available.',
    submit: 'Request viewing',
    success: 'We’ll confirm your viewing time within one working day.',
  },
  valuation: {
    eyebrow: 'Free valuation',
    title: 'Request a valuation',
    intro: 'An honest, evidence-based appraisal of your property, in person or by video. No obligation.',
    submit: 'Request a Valuation',
    success: 'An advisor will call within one working day to arrange your valuation.',
  },
  management: {
    eyebrow: 'For landlords',
    title: 'Talk about property management',
    intro: 'Tell us about your property and we’ll explain how we’d look after it — and what it could achieve.',
    submit: 'Send enquiry',
    success: 'Our lettings & management team will be in touch within one working day.',
  },
  advisor: {
    eyebrow: 'Speak with an advisor',
    title: 'Speak with an advisor',
    intro: 'Buying, selling, letting or investing — book a no-pressure conversation with the right person in our team.',
    submit: 'Request a call',
    success: 'An advisor will call you back at your preferred time.',
  },
  alerts: {
    eyebrow: 'Property alerts',
    title: 'Get new homes first',
    intro: 'Tell us what you’re looking for. We’ll email matching homes as soon as they’re instructed — often before they appear online.',
    submit: 'Create alert',
    success: 'Your alert is set up. We’ll email you as soon as something matches.',
  },
  general: {
    eyebrow: 'Contact an agent',
    title: 'How can we help?',
    intro: 'Send us a message and the right person will reply within one working day.',
    submit: 'Send message',
    success: 'Thank you — we’ll reply within one working day.',
  },
}

function EnquiryDialog({ open, intent, property, onClose }: { open: boolean; intent: EnquiryIntent; property?: Property; onClose: () => void }) {
  const titleId = useId()
  const copy = intentCopy[intent]
  const { errors, submitted, onSubmit, reset } = useLeadForm({
    name: required('Please enter your name.'),
    email,
    ...(intent === 'valuation' || intent === 'management' ? { address: required('Please enter the property address or postcode.') } : {}),
    consent,
  })
  const close = () => {
    onClose()
    setTimeout(reset, 300)
  }

  return (
    <Dialog open={open} onClose={close} labelledBy={titleId}>
      <div className="p-6 sm:p-9">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow text-[0.65rem] text-olive">{copy.eyebrow}</p>
            <h2 id={titleId} className="font-editorial mt-3 text-[2.25rem] leading-tight sm:text-[2.75rem]">
              {copy.title}
            </h2>
          </div>
          <DialogClose onClose={close} />
        </div>

        {submitted ? (
          <SuccessMessage title="Thank you.">
            {copy.success} If it’s urgent, call{' '}
            <a href={company.phone.href} className="text-ink underline">
              {company.phone.display}
            </a>
            .
          </SuccessMessage>
        ) : (
          <>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{copy.intro}</p>
            {property && (
              <div className="mt-6 flex items-center gap-4 rounded-[3px] border border-line bg-ivory p-3">
                <div className="aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-[2px]">
                  <Media asset={{ ...property.images[0], alt: '' }} sizes="96px" />
                </div>
                <div className="min-w-0 text-sm">
                  <p className="font-semibold text-ink">{property.title}</p>
                  <p className="text-muted">
                    {getArea(property.address.areaId)?.name} · {formatPrice(property)}
                  </p>
                </div>
              </div>
            )}
            <form noValidate onSubmit={onSubmit} className="mt-6 grid gap-5">
              {property && <input type="hidden" name="propertyId" value={property.id} />}
              <input type="hidden" name="intent" value={intent} />

              {(intent === 'valuation' || intent === 'management') && (
                <TextField label="Property address or postcode" name="address" autoComplete="street-address" error={errors.address} />
              )}
              {intent === 'management' && (
                <ChoiceGroup legend="Service you’re considering" name="tier" options={['Let Only', 'Rent Collection', 'Fully Managed', 'Not sure']} defaultValue="Fully Managed" />
              )}
              {intent === 'valuation' && <ChoiceGroup legend="Valuation for" name="purpose" options={['Sale', 'Letting', 'Both']} defaultValue="Sale" />}
              {intent === 'alerts' && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Select label="Buy or rent" name="mode" options={['Buy', 'Rent']} />
                  <Select label="Area" name="area" options={['Any area', ...areas.map((a) => a.name)]} />
                  <Select label="Min bedrooms" name="beds" options={['Any', '1+', '2+', '3+', '4+', '5+']} />
                  <TextField label="Max budget" name="budget" inputMode="numeric" placeholder="e.g. £650,000" optional />
                </div>
              )}
              {intent === 'viewing' && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField label="Preferred date" name="date" type="date" optional />
                  <Select label="Time of day" name="time" options={['Morning', 'Afternoon', 'Evening', 'Flexible']} defaultValue="Flexible" />
                  <ChoiceGroup legend="Viewing type" name="viewingType" options={['In person', 'Video']} defaultValue="In person" />
                </div>
              )}
              {intent === 'general' && <Select label="Enquiry about" name="topic" options={enquiryTypes} />}

              <TextField label="Full name" name="name" autoComplete="name" error={errors.name} />
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
                <TextField label="Phone" name="phone" type="tel" autoComplete="tel" optional />
              </div>
              {intent === 'advisor' && <Select label="Best time to call" name="callTime" options={['Any time', 'Morning', 'Lunchtime', 'Afternoon', 'Evening']} />}
              {(intent === 'general' || intent === 'advisor') && <TextArea label="Message" name="message" optional rows={3} />}
              <Consent error={errors.consent} />
              <Button type="submit" size="lg" icon="arrow-right" className="w-full">
                {copy.submit}
              </Button>
            </form>
          </>
        )}
      </div>
    </Dialog>
  )
}
