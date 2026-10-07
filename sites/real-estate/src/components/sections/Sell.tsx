import { sellingSteps } from '../../content/site'
import { Button } from '../ui/Button'
import { ChoiceGroup, Consent, Select, SuccessMessage, TextField, consent, email, required, useLeadForm } from '../ui/Form'
import { Media } from '../ui/Media'
import { Eyebrow } from '../ui/SectionHeader'

export function Sell() {
  const { errors, submitted, onSubmit, reset } = useLeadForm({
    address: required('Please enter the property address or postcode.'),
    name: required('Please enter your name.'),
    email,
    consent,
  })

  return (
    <section id="sell" aria-labelledby="sell-title" className="py-20 sm:py-28">
      <div className="container-page">
        <div className="grid overflow-hidden rounded-[4px] border border-line bg-paper lg:grid-cols-2">
          {/* Left: pitch + process */}
          <div className="relative flex flex-col">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:h-80">
              <Media asset={{ scene: 'townhouse', tone: 'golden', alt: 'Georgian townhouse in warm evening light' }} sizes="50vw" />
            </div>
            <div className="flex flex-1 flex-col p-7 sm:p-10 lg:p-12">
              <Eyebrow>
                <span className="tabular-nums">07</span> <span aria-hidden>—</span> Selling with us
              </Eyebrow>
              <h2 id="sell-title" className="font-editorial mt-5 text-[2.75rem] sm:text-[3.5rem]">
                Thinking about <em>selling?</em>
              </h2>
              <p className="mt-4 max-w-lg text-[0.9875rem] leading-relaxed text-muted">
                Start with a free, no-obligation valuation. You’ll get an honest figure backed by local evidence, and a clear plan for bringing your home to market
                — whether you’re ready now or simply weighing up options.
              </p>
              <ol className="mt-10 space-y-0">
                {sellingSteps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line-soft py-4 last:border-b">
                    <span className="font-editorial text-[1.5rem] leading-none text-taupe tabular-nums">0{i + 1}</span>
                    <div>
                      <p className="text-[0.9375rem] font-semibold text-ink">{s.title}</p>
                      <p className="mt-0.5 text-sm text-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right: valuation form */}
          <div className="border-t border-line bg-ivory p-7 sm:p-10 lg:border-t-0 lg:border-l lg:p-12">
            {submitted ? (
              <SuccessMessage title="Thank you — we’ll be in touch." onReset={reset}>
                An advisor will call within one working day to arrange your valuation. If it’s urgent, call us on 01632 960 418.
              </SuccessMessage>
            ) : (
              <form noValidate onSubmit={onSubmit} aria-labelledby="valuation-form-title" className="grid gap-5">
                <div>
                  <p id="valuation-form-title" className="font-editorial text-[2rem] leading-tight text-ink">
                    Request a valuation
                  </p>
                  <p className="mt-1.5 text-sm text-muted">Takes about a minute. No obligation.</p>
                </div>
                <TextField label="Property address or postcode" name="address" autoComplete="street-address" error={errors.address} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Select label="Property type" name="type" options={['House', 'Apartment', 'Townhouse', 'Cottage', 'Other']} />
                  <Select label="Bedrooms" name="beds" options={['Studio', '1', '2', '3', '4', '5+']} defaultValue="3" />
                </div>
                <ChoiceGroup legend="I’m looking to" name="intent" options={['Sell', 'Let', 'Not sure yet']} defaultValue="Sell" />
                <ChoiceGroup legend="Valuation type" name="mode" options={['In person', 'Video call']} defaultValue="In person" />
                <TextField label="Full name" name="name" autoComplete="name" error={errors.name} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
                  <TextField label="Phone" name="phone" type="tel" autoComplete="tel" optional />
                </div>
                <Consent error={errors.consent} />
                <Button type="submit" size="lg" icon="arrow-right" className="w-full sm:w-auto sm:justify-self-start">
                  Request a Valuation
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
