import { useState } from 'react'
import { categories, programs } from '../../content/programs'
import type { EnquiryIntent } from '../../content/types'
import { intents } from '../../lib/enquiry'
import { Button } from '../ui/Button'
import { Checkbox, email, required, Select, SuccessMessage, TextArea, TextField, useForm } from '../ui/Form'
import { WithPlaceholders } from '../ui/Text'

const programOptions = programs.map((p) => `${p.award} ${p.name}`)
const startOptions = ['[[September 2027]]', '[[January 2028]]', 'Not sure yet'].map((s) => s.replace(/\[\[|\]\]/g, ''))

const rulesFor = (intent: EnquiryIntent) => {
  const base = { firstName: required('Please enter your first name.'), email }
  switch (intent) {
    case 'apply':
      return { ...base, lastName: required('Please enter your last name.'), program: required('Please choose a program.'), start: required('Please choose a start date.') }
    case 'visit':
      return { ...base, visitType: required('Please choose a type of visit.') }
    case 'talk':
      return { ...base, method: required('Please choose how you’d like to talk.') }
    case 'prospectus':
      return {
        ...base,
        level: required('Please choose a level of study.'),
        address: (v: string, d: FormData) => (d.get('format') === 'Printed copy by post' && !v.trim() ? 'Please enter a postal address for your printed copy.' : undefined),
      }
    default:
      return { ...base, role: required('Please tell us who you are.') }
  }
}

interface EnquiryFormProps {
  intent: EnquiryIntent
  /** Program slug to pre-select */
  program?: string
}

/**
 * One form for every secondary conversion. Fields adapt to the intent; validation, error focus and the
 * success state come from `useForm`. Connect `onValid` to the admissions CRM / student-information system.
 */
export function EnquiryForm({ intent, program }: EnquiryFormProps) {
  const { errors, submitted, onSubmit, onChange, reset } = useForm(rulesFor(intent))
  const [format, setFormat] = useState('Digital PDF')
  const meta = intents[intent]
  const preselected = programs.find((p) => p.slug === program)
  const programDefault = preselected ? `${preselected.award} ${preselected.name}` : ''

  if (submitted)
    return (
      <SuccessMessage title={meta.success.title} onReset={reset} resetLabel="Send another request">
        <WithPlaceholders text={meta.success.body} />
      </SuccessMessage>
    )

  return (
    <form noValidate onSubmit={onSubmit} onChange={onChange} className="grid gap-5 sm:grid-cols-2" aria-label={meta.title}>
      <TextField label="First name" name="firstName" autoComplete="given-name" error={errors.firstName} />
      {intent === 'apply' ? (
        <TextField label="Last name" name="lastName" autoComplete="family-name" error={errors.lastName} />
      ) : (
        <TextField label="Last name" name="lastName" autoComplete="family-name" optional />
      )}
      <TextField label="Email" name="email" type="email" autoComplete="email" inputMode="email" error={errors.email} className="sm:col-span-2" />

      {intent === 'apply' && (
        <>
          <Select label="Program" name="program" options={programOptions} placeholder="Choose a program" defaultValue={programDefault} error={errors.program} className="sm:col-span-2" />
          <Select label="Preferred start" name="start" options={startOptions} placeholder="Choose a start" error={errors.start} />
          <Select label="Applying as" name="applicant" options={['Home applicant', 'International applicant', 'Transfer applicant']} optional placeholder="Select" />
        </>
      )}

      {intent === 'visit' && (
        <>
          <Select label="Type of visit" name="visitType" options={['Open day', 'Guided campus tour', 'Meet a program team', 'Virtual tour']} placeholder="Choose a visit" error={errors.visitType} />
          <TextField label="Preferred date" name="date" type="date" optional />
          <Select label="Number of visitors" name="guests" options={['1', '2', '3', '4']} optional defaultValue="1" />
          <Select label="Program of interest" name="program" options={programOptions} placeholder="Any / not sure" optional defaultValue={programDefault} />
          <TextArea label="Accessibility or other requirements" name="needs" optional rows={3} className="sm:col-span-2" />
        </>
      )}

      {intent === 'info' && (
        <>
          <Select label="I am a…" name="role" options={['Prospective student', 'Parent or supporter', 'School or careers adviser', 'Employer', 'Other']} placeholder="Select" error={errors.role} />
          <Select label="Program of interest" name="program" options={programOptions} placeholder="Any / not sure" optional defaultValue={programDefault} />
          <TextArea label="Your question" name="message" optional rows={4} className="sm:col-span-2" />
        </>
      )}

      {intent === 'talk' && (
        <>
          <Select label="How would you like to talk?" name="method" options={['Phone call', 'Video call', 'Email']} placeholder="Choose" error={errors.method} />
          <Select label="Best time" name="time" options={['Morning', 'Afternoon', 'Early evening']} optional placeholder="Any time" />
          <TextField label="Phone" name="phone" type="tel" autoComplete="tel" optional className="sm:col-span-2" />
          <TextArea label="What would you like to talk about?" name="message" optional rows={3} className="sm:col-span-2" />
        </>
      )}

      {intent === 'prospectus' && (
        <>
          <Select label="Level of study" name="level" options={categories} placeholder="Choose a level" error={errors.level} />
          <Select label="Format" name="format" options={['Digital PDF', 'Printed copy by post']} value={format} onChange={(e) => setFormat(e.target.value)} />
          {format === 'Printed copy by post' && <TextArea label="Postal address" name="address" autoComplete="street-address" rows={3} error={errors.address} className="sm:col-span-2" />}
        </>
      )}

      <Checkbox name="updates" label="Send me occasional updates about events and programs. You can unsubscribe at any time." className="sm:col-span-2" />
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.8rem] leading-snug text-muted">
          We use your details only to respond to this request. See our <a href="#privacy" className="font-semibold text-ink underline underline-offset-2">privacy notice</a>.
        </p>
        <Button type="submit" arrow className="shrink-0">
          {meta.submit}
        </Button>
      </div>
    </form>
  )
}
