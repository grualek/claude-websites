import { useId, useState, type FormEvent, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { Icon } from './Icon'

/* Accessible form primitives: visible labels, required markers, hint + error wired via aria-describedby. */

const control =
  'mt-2 block w-full min-h-12 rounded-[2px] border border-line bg-paper px-4 py-3 text-[0.9375rem] text-ink placeholder:text-muted/70 transition-colors hover:border-ink/40 focus:border-bronze-deep focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-bronze-deep/40 aria-[invalid=true]:border-[#9a3324]'
const labelCls = 'block text-[0.8125rem] font-medium text-ink'
const errorCls = 'mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#9a3324]'

interface FieldShell {
  label: string
  hint?: string
  error?: string
  optional?: boolean
  className?: string
}

function Shell({ id, label, hint, error, optional, className = '', children }: FieldShell & { id: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelCls}>
        {label}
        {optional ? <span className="ml-1.5 font-normal text-muted">(optional)</span> : <span aria-hidden="true" className="ml-0.5 text-bronze-deep">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={errorCls}>
          {error}
        </p>
      )}
    </div>
  )
}

const describedBy = (id: string, hint?: string, error?: string) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined)

export function TextField({ label, hint, error, optional, className, ...rest }: FieldShell & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId()
  return (
    <Shell id={id} label={label} hint={hint} error={error} optional={optional} className={className}>
      <input id={id} className={control} aria-required={!optional || undefined} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, hint, error)} {...rest} />
    </Shell>
  )
}

export function TextArea({ label, hint, error, optional, className, ...rest }: FieldShell & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId()
  return (
    <Shell id={id} label={label} hint={hint} error={error} optional={optional} className={className}>
      <textarea id={id} rows={5} className={`${control} resize-y`} aria-required={!optional || undefined} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, hint, error)} {...rest} />
    </Shell>
  )
}

export function Select({
  label,
  hint,
  error,
  optional,
  className,
  options,
  placeholder,
  ...rest
}: FieldShell & SelectHTMLAttributes<HTMLSelectElement> & { options: string[]; placeholder?: string }) {
  const id = useId()
  return (
    <Shell id={id} label={label} hint={hint} error={error} optional={optional} className={className}>
      <select id={id} className={`${control} cursor-pointer`} aria-required={!optional || undefined} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, hint, error)} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Shell>
  )
}

export function ChoiceGroup({ legend, name, options, defaultValue }: { legend: string; name: string; options: readonly string[]; defaultValue?: string }) {
  return (
    <fieldset>
      <legend className={labelCls}>{legend}</legend>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} defaultChecked={o === defaultValue} className="peer sr-only" />
            <span className="flex min-h-12 items-center justify-center rounded-[2px] border border-line bg-paper px-3 text-center text-[0.8125rem] font-medium text-ink-soft transition-colors peer-checked:border-espresso peer-checked:bg-espresso peer-checked:text-on-dark peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bronze-deep hover:border-ink/40">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function Consent({ error, firmName }: { error?: string; firmName: string }) {
  const id = useId()
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-relaxed text-muted">
        <input
          type="checkbox"
          name="consent"
          className="mt-0.5 size-4.5 shrink-0 accent-[var(--color-espresso)]"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? id : undefined}
        />
        <span>
          I understand that submitting this form does not create an attorney-client relationship, and I agree to {firmName} contacting me about my inquiry. See our{' '}
          <a href="#privacy" className="text-ink underline underline-offset-2">
            privacy policy
          </a>
          .
        </span>
      </label>
      {error && (
        <p id={id} className={errorCls}>
          {error}
        </p>
      )}
    </div>
  )
}

export function SuccessMessage({ title, children, onReset }: { title: string; children: ReactNode; onReset?: () => void }) {
  return (
    <div role="status" className="flex flex-col items-start py-4">
      <span className="flex size-14 items-center justify-center rounded-full border border-bronze/50 text-bronze-deep">
        <Icon name="check" className="size-6" />
      </span>
      <p className="font-editorial mt-8 text-[2.25rem] text-ink">{title}</p>
      <div className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted">{children}</div>
      {onReset && (
        <button type="button" onClick={onReset} className="mt-8 text-sm font-medium text-ink underline decoration-bronze underline-offset-4">
          Submit another request
        </button>
      )}
    </div>
  )
}

type Rules = Record<string, (value: string, data: FormData) => string | undefined>

export const required = (msg: string) => (v: string) => (v.trim() ? undefined : msg)
export const email = (v: string) => (!v.trim() ? 'Please enter your email address.' : /^\S+@\S+\.\S+$/.test(v) ? undefined : 'Please enter a valid email address, e.g. name@example.com.')
export const phone = (v: string) => (!v.trim() ? 'Please enter a phone number.' : v.replace(/\D/g, '').length >= 7 ? undefined : 'Please enter a valid phone number.')
export const consent = (_: string, data: FormData) => (data.get('consent') ? undefined : 'Please confirm you have read this notice.')

/**
 * Small form-state hook: validates on submit, focuses the first invalid field and flips to a
 * success state. Replace `onValid` with a POST to the intake / CRM endpoint.
 */
export function useIntakeForm(rules: Rules, onValid?: (data: FormData) => void) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const next: Record<string, string> = {}
    for (const [name, rule] of Object.entries(rules)) {
      const msg = rule(String(data.get(name) ?? ''), data)
      if (msg) next[name] = msg
    }
    setErrors(next)
    const first = Object.keys(next)[0]
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    onValid?.(data)
    setSubmitted(true)
  }

  /** Clear a field's error as soon as the user edits it. */
  const onChange = (e: FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name
    if (name && errors[name]) setErrors(({ [name]: _, ...rest }) => rest)
  }

  return { errors, submitted, onSubmit, onChange, reset: () => (setSubmitted(false), setErrors({})) }
}
