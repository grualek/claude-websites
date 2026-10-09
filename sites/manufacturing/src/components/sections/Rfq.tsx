import { useEffect, useState } from 'react'
import { capabilities } from '../../content/capabilities'
import { company } from '../../content/company'
import { industries } from '../../content/industries'
import { rfqOptions } from '../../content/site'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Consent, FileDrop, Select, SuccessMessage, TextArea, TextField, consent, email, optionalPhone, required, useLeadForm } from '../ui/Form'
import { Icon } from '../ui/Icon'

const projectTypes = [...capabilities.map((c) => c.projectType), 'Other / not sure']
const industryOptions = [...industries.map((i) => i.title), 'Other']

const checklist = ['3D model (STEP / native CAD)', '2D drawing with tolerances & revision', 'Material, finish and any special requirements', 'Quantities, release schedule and target date']

const nextSteps = ['We confirm receipt and assign an estimator.', 'An engineer reviews your files and flags any questions.', 'You receive a detailed quote with lead time.']

const makeReference = () => `RFQ-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`

export function Rfq() {
  const { prefill, prefillRequest, openLead } = useApp()
  const [projectType, setProjectType] = useState(prefill.projectType ?? '')
  const [industry, setIndustry] = useState(prefill.industry ?? '')
  const [firstName, setFirstName] = useState('')
  const [reference, setReference] = useState('')

  // A CTA elsewhere on the page can pre-select the project type / industry
  useEffect(() => {
    if (!prefillRequest) return
    if (prefill.projectType !== undefined) setProjectType(prefill.projectType)
    if (prefill.industry !== undefined) setIndustry(prefill.industry)
  }, [prefillRequest, prefill])

  const { errors, submitted, onSubmit, onChange, reset } = useLeadForm(
    {
      name: required('Please enter your full name.'),
      company: required('Please enter your company name.'),
      email,
      phone: optionalPhone,
      industry: required('Please choose your industry.'),
      projectType: required('Please choose a project type.'),
      quantity: required('Please choose an approximate quantity.'),
      timeline: required('Please choose a timeline.'),
      description: required('Please describe the part or project so we can quote accurately.'),
      consent,
    },
    (data) => {
      // Replace with a POST to the RFQ / CRM endpoint (files via signed upload URLs).
      setFirstName(String(data.get('name') ?? '').trim().split(/\s+/)[0] ?? '')
      setReference(makeReference())
    },
  )

  return (
    <section id="rfq" aria-labelledby="rfq-title" className="bg-concrete py-24 lg:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-4 border-t border-ink/80 pt-4 text-muted" data-reveal>
            <span className="label-mono text-signal-deep">10</span>
            <span className="label-mono">Request a Quote</span>
          </div>
          <h2 id="rfq-title" className="font-headline mt-8 text-[2.5rem] sm:text-[3.25rem] lg:mt-10 lg:text-[3.75rem]" data-reveal>
            Send us your drawings.
          </h2>
          <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-ink-soft" data-reveal>
            Tell us about your part or program. An estimator and an engineer review every request, and we will ask before we assume.
          </p>

          <div className="mt-10 border-t border-ink/20 pt-6" data-reveal>
            <h3 className="label-mono text-ink">For the most accurate quote, include</h3>
            <ul className="mt-4 space-y-3">
              {checklist.map((c) => (
                <li key={c} className="flex gap-3 text-[0.875rem] text-ink-soft">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-signal-deep" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 grid gap-px bg-line" data-reveal>
            <a href={company.sales.href} className="group flex items-center gap-4 bg-paper p-5 hover:bg-bone">
              <Icon name="phone" className="size-5 text-ink" />
              <span className="flex-1">
                <span className="label-mono block text-[0.5625rem] text-muted">Contact Sales</span>
                <span className="text-[0.9375rem] font-medium text-ink">{company.sales.display}</span>
              </span>
              <Icon name="arrow-right" className="size-4 text-muted transition-transform group-hover:translate-x-1" />
            </a>
            <a href={`mailto:${company.email}`} className="group flex items-center gap-4 bg-paper p-5 hover:bg-bone">
              <Icon name="mail" className="size-5 text-ink" />
              <span className="flex-1">
                <span className="label-mono block text-[0.5625rem] text-muted">Email RFQs</span>
                <span className="text-[0.9375rem] font-medium text-ink">{company.email}</span>
              </span>
              <Icon name="arrow-right" className="size-4 text-muted transition-transform group-hover:translate-x-1" />
            </a>
            <button type="button" onClick={() => openLead('engineer')} className="group flex items-center gap-4 bg-paper p-5 text-left hover:bg-bone">
              <Icon name="engineer" className="size-5 text-ink" />
              <span className="flex-1">
                <span className="label-mono block text-[0.5625rem] text-muted">Not ready to quote?</span>
                <span className="text-[0.9375rem] font-medium text-ink">Talk to an Engineer</span>
              </span>
              <Icon name="arrow-right" className="size-4 text-muted transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="border border-line bg-paper shadow-[0_40px_80px_-60px_rgb(20_22_25/0.45)]" data-reveal>
            <div className="flex items-center justify-between border-b border-line px-6 py-4 sm:px-10">
              <span className="label-mono text-[0.625rem] text-muted">Form RFQ-01</span>
              <span className="label-mono flex items-center gap-2 text-[0.625rem] text-muted">
                <Icon name="lock" className="size-3.5" />
                Confidential · NDA available
              </span>
            </div>
            <div className="p-6 sm:p-10">
              {submitted ? (
                <SuccessMessage title={`Thank you${firstName ? `, ${firstName}` : ''}. Your RFQ is in.`} reference={reference} onReset={reset}>
                  <p>We have received your request and files. Here is what happens next:</p>
                  <ol className="mt-5 space-y-3">
                    {nextSteps.map((s, i) => (
                      <li key={s} className="flex gap-3">
                        <span className="font-mono text-[0.8125rem] text-signal-deep">0{i + 1}</span>
                        <span className="text-ink-soft">{s}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-5">
                    Need to add something? Email <a href={`mailto:${company.email}`} className="text-ink underline underline-offset-2">{company.email}</a> and quote your reference.
                  </p>
                </SuccessMessage>
              ) : (
                <form id="rfq-form" noValidate onSubmit={onSubmit} onChange={onChange} aria-labelledby="rfq-form-title">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <h3 id="rfq-form-title" className="font-headline text-[1.75rem]" style={{ letterSpacing: '-0.02em' }}>
                      Request for quote
                    </h3>
                    <p className="text-xs text-muted">
                      <span aria-hidden="true" className="text-signal-deep">
                        *
                      </span>{' '}
                      Required fields
                    </p>
                  </div>

                  <fieldset className="mt-8">
                    <legend className="label-mono mb-5 flex w-full items-center gap-3 text-[0.625rem] text-muted">
                      <span className="text-signal-deep">A</span> Contact
                      <span className="h-px flex-1 bg-line" aria-hidden="true" />
                    </legend>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <TextField label="Full name" name="name" autoComplete="name" error={errors.name} />
                      <TextField label="Company" name="company" autoComplete="organization" error={errors.company} />
                      <TextField label="Work email" name="email" type="email" autoComplete="email" inputMode="email" error={errors.email} />
                      <TextField label="Phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" optional error={errors.phone} />
                    </div>
                  </fieldset>

                  <fieldset className="mt-10">
                    <legend className="label-mono mb-5 flex w-full items-center gap-3 text-[0.625rem] text-muted">
                      <span className="text-signal-deep">B</span> Project
                      <span className="h-px flex-1 bg-line" aria-hidden="true" />
                    </legend>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Select label="Industry" name="industry" options={industryOptions} placeholder="Select industry" value={industry} onChange={(e) => setIndustry(e.target.value)} error={errors.industry} />
                      <Select
                        label="Project type"
                        name="projectType"
                        options={projectTypes}
                        placeholder="Select project type"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        error={errors.projectType}
                      />
                      <Select label="Quantity" name="quantity" options={rfqOptions.quantities} placeholder="Approximate quantity" defaultValue="" error={errors.quantity} />
                      <Select label="Timeline" name="timeline" options={rfqOptions.timelines} placeholder="When do you need parts?" defaultValue="" error={errors.timeline} />
                      <div className="sm:col-span-2">
                        <FileDrop name="files" label="Drawings & models" accept=".step,.stp,.iges,.igs,.x_t,.sldprt,.dxf,.dwg,.pdf,.zip" hint="STEP · IGES · Parasolid · DXF · PDF · ZIP" />
                      </div>
                      <TextArea
                        label="Project description"
                        name="description"
                        hint="Material, finish, critical features, annual volume, inspection or documentation requirements."
                        error={errors.description}
                        className="sm:col-span-2"
                      />
                    </div>
                  </fieldset>

                  <div className="mt-8">
                    <Consent error={errors.consent} companyName={company.name} />
                  </div>

                  <div className="mt-8 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <Button type="submit" variant="signal" size="lg" arrow className="w-full sm:w-auto">
                      Submit RFQ
                    </Button>
                    <p className="text-xs text-muted">Every request is reviewed by an estimator and an engineer.</p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
