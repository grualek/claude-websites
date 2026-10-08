import { useId, useState, type FormEvent, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { Icon } from './Icon'

/* Accessible form primitives: visible labels, required markers, hint + error wired via aria-describedby. */

const control =
  'mt-2 block w-full min-h-12 rounded-[3px] border border-line bg-paper px-4 py-3 text-[0.9375rem] text-ink placeholder:text-muted/70 transition-colors hover:border-ink/40 focus:border-clay focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-clay/40 aria-[invalid=true]:border-[#a2301f]'
const labelCls = 'block text-[0.8125rem] font-semibold text-ink'
export const errorCls = 'mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#a2301f]'

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
        {optional ? <span className="ml-1.5 font-normal text-muted">(optional)</span> : <span aria-hidden="true" className="ml-0.5 text-clay">*</span>}
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
      <textarea id={id} rows={4} className={`${control} resize-y`} aria-required={!optional || undefined} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, hint, error)} {...rest} />
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
}: FieldShell & SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[]; placeholder?: string }) {
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

export function SuccessMessage({ title, children, onReset, resetLabel = 'Send another message' }: { title: string; children: ReactNode; onReset?: () => void; resetLabel?: string }) {
  return (
    <div role="status" className="flex flex-col items-start py-4">
      <span className="flex size-14 items-center justify-center rounded-full border border-clay/50 text-clay">
        <Icon name="check" className="size-6" />
      </span>
      <p className="font-editorial mt-8 text-[2.5rem] text-ink">{title}</p>
      <div className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted">{children}</div>
      {onReset && (
        <button type="button" onClick={onReset} className="mt-8 min-h-11 text-sm font-semibold text-ink underline decoration-clay underline-offset-4">
          {resetLabel}
        </button>
      )}
    </div>
  )
}

type Rules = Record<string, (value: string, data: FormData) => string | undefined>

export const required = (msg: string) => (v: string) => (v.trim() ? undefined : msg)
export const email = (v: string) => (!v.trim() ? 'Please enter your email address.' : /^\S+@\S+\.\S+$/.test(v) ? undefined : 'Please enter a valid email address, e.g. name@example.com.')

/**
 * Small form-state hook: validates on submit, focuses the first invalid field and flips to a
 * success state. Replace `onValid` with a POST to the CRM / reservations inbox.
 */
export function useForm(rules: Rules, onValid?: (data: FormData) => void) {
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
