import { useId, useState, type FormEvent, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { Icon } from './Icon'

/* Accessible form primitives: visible labels, hint + error wired via aria-describedby. */

const control =
  'mt-2 block w-full min-h-12 rounded-[3px] border border-line bg-paper px-4 py-3 text-[0.9375rem] text-ink placeholder:text-muted/70 transition-colors hover:border-ink/35 focus:border-olive focus:outline-none focus-visible:outline-2 focus-visible:outline-olive/40 focus-visible:outline-offset-0 aria-[invalid=true]:border-[#9b3b2b]'
const labelCls = 'block text-[0.8125rem] font-semibold text-ink'

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
        {optional && <span className="ml-1.5 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-[#9b3b2b]">
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
      <input id={id} className={control} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, hint, error)} {...rest} />
    </Shell>
  )
}

export function TextArea({ label, hint, error, optional, className, ...rest }: FieldShell & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId()
  return (
    <Shell id={id} label={label} hint={hint} error={error} optional={optional} className={className}>
      <textarea id={id} rows={4} className={`${control} resize-y`} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, hint, error)} {...rest} />
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
  ...rest
}: FieldShell & SelectHTMLAttributes<HTMLSelectElement> & { options: Array<string | { value: string; label: string }> }) {
  const id = useId()
  return (
    <Shell id={id} label={label} hint={hint} error={error} optional={optional} className={className}>
      <select id={id} className={`${control} cursor-pointer`} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, hint, error)} {...rest}>
        {options.map((o) =>
          typeof o === 'string' ? (
            <option key={o} value={o}>
              {o}
            </option>
          ) : (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ),
        )}
      </select>
    </Shell>
  )
}

export function ChoiceGroup({ legend, name, options, defaultValue }: { legend: string; name: string; options: string[]; defaultValue?: string }) {
  return (
    <fieldset>
      <legend className={labelCls}>{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} defaultChecked={o === defaultValue} className="peer sr-only" />
            <span className="inline-flex min-h-11 items-center rounded-[3px] border border-line bg-paper px-4 text-sm font-medium text-ink-soft transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-olive hover:border-ink/40">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function Consent({ error }: { error?: string }) {
  const id = useId()
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-relaxed text-muted">
        <input
          type="checkbox"
          name="consent"
          className="mt-0.5 size-4.5 shrink-0 accent-[var(--color-olive-deep)]"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? id : undefined}
        />
        <span>
          I agree to Hollis &amp; Vale contacting me about this enquiry. See our{' '}
          <a href="#privacy" className="text-ink underline underline-offset-2">
            privacy notice
          </a>
          .
        </span>
      </label>
      {error && (
        <p id={id} className="mt-1.5 text-xs font-medium text-[#9b3b2b]">
          {error}
        </p>
      )}
    </div>
  )
}

export function SuccessMessage({ title, children, onReset, light = false }: { title: string; children: ReactNode; onReset?: () => void; light?: boolean }) {
  return (
    <div role="status" className="flex flex-col items-start py-6">
      <span className={`flex size-14 items-center justify-center rounded-full ${light ? 'bg-paper/10 text-paper' : 'bg-olive-soft text-olive-deep'}`}>
        <Icon name="check" className="size-6" />
      </span>
      <p className={`font-editorial mt-6 text-[2.25rem] leading-tight ${light ? 'text-paper' : 'text-ink'}`}>{title}</p>
      <div className={`mt-3 max-w-md text-[0.9375rem] leading-relaxed ${light ? 'text-paper/80' : 'text-muted'}`}>{children}</div>
      {onReset && (
        <button type="button" onClick={onReset} className={`mt-6 text-sm font-semibold underline underline-offset-4 ${light ? 'text-paper' : 'text-ink'}`}>
          Send another enquiry
        </button>
      )}
    </div>
  )
}

type Rules = Record<string, (value: string, data: FormData) => string | undefined>

export const required = (msg: string) => (v: string) => (v.trim() ? undefined : msg)
export const email = (v: string) => (!v.trim() ? 'Please enter your email address.' : /^\S+@\S+\.\S+$/.test(v) ? undefined : 'Please enter a valid email address.')
export const consent = (_: string, data: FormData) => (data.get('consent') ? undefined : 'Please confirm we may contact you.')

/**
 * Tiny form-state hook: validates on submit, focuses the first invalid field and flips to a
 * success state. Replace `onValid` with a POST to the CRM / lead-routing endpoint.
 */
export function useLeadForm(rules: Rules, onValid?: (data: FormData) => void) {
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

  return { errors, submitted, onSubmit, reset: () => (setSubmitted(false), setErrors({})) }
}
