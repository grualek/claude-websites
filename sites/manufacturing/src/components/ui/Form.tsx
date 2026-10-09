import { useId, useRef, useState, type DragEvent, type FormEvent, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { Icon } from './Icon'

/* Accessible form primitives: visible labels, required markers, hint + error wired via aria-describedby. */

const control =
  'mt-2 block w-full min-h-12 border border-line bg-paper px-4 py-3 text-[0.9375rem] text-ink placeholder:text-muted/70 transition-colors hover:border-ink/40 focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-signal/50 aria-[invalid=true]:border-[#a3261b]'
const labelCls = 'flex items-baseline justify-between gap-3 text-[0.8125rem] font-medium text-ink'
const errorCls = 'mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#a3261b]'

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
        <span>
          {label}
          {!optional && (
            <span aria-hidden="true" className="ml-0.5 text-signal-deep">
              *
            </span>
          )}
        </span>
        {optional && <span className="label-mono text-[0.625rem] font-normal text-muted">Optional</span>}
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

const formatBytes = (n: number) => (n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`)

/**
 * Drawing / model upload. A real <input type="file"> (keyboard and screen-reader friendly) styled as a
 * drop zone. In the prototype files stay in the browser; wire to signed-URL storage at launch.
 */
export function FileDrop({ name, label, accept, hint }: { name: string; label: string; accept: string; hint: string }) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [dragging, setDragging] = useState(false)

  const sync = (list: FileList | null) => setFiles(list ? Array.from(list) : [])

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setDragging(false)
    const input = inputRef.current
    if (input && e.dataTransfer.files.length) {
      input.files = e.dataTransfer.files
      sync(input.files)
    }
  }

  const remove = (index: number) => {
    const input = inputRef.current
    if (!input) return
    const dt = new DataTransfer()
    files.forEach((f, i) => i !== index && dt.items.add(f))
    input.files = dt.files
    sync(input.files)
  }

  return (
    <div>
      <p className={labelCls} id={`${id}-label`}>
        <span>{label}</span>
        <span className="label-mono text-[0.625rem] font-normal text-muted">Optional</span>
      </p>
      <label
        htmlFor={id}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`mt-2 flex cursor-pointer flex-col items-center justify-center gap-3 border border-dashed px-6 py-8 text-center transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal-deep ${
          dragging ? 'border-signal bg-signal/5' : 'border-ink/30 bg-bone hover:border-ink/60'
        }`}
      >
        <span className="flex size-11 items-center justify-center border border-line bg-paper text-ink">
          <Icon name="upload" className="size-5" />
        </span>
        <span className="text-[0.875rem] text-ink">
          <span className="font-medium underline decoration-signal underline-offset-4">Choose files</span> or drag them here
        </span>
        <span id={`${id}-hint`} className="label-mono text-[0.625rem] text-muted">
          {hint}
        </span>
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          multiple
          accept={accept}
          className="sr-only"
          aria-labelledby={`${id}-label`}
          aria-describedby={`${id}-hint`}
          onChange={(e) => sync(e.target.files)}
        />
      </label>
      {files.length > 0 && (
        <ul className="mt-3 divide-y divide-line-soft border border-line-soft bg-paper" aria-label="Selected files">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center gap-3 px-4 py-2.5 text-[0.8125rem]">
              <Icon name="file" className="size-4 shrink-0 text-steel-deep" />
              <span className="min-w-0 flex-1 truncate text-ink">{f.name}</span>
              <span className="label-mono text-[0.625rem] text-muted">{formatBytes(f.size)}</span>
              <button type="button" onClick={() => remove(i)} className="inline-flex size-8 items-center justify-center text-muted hover:text-ink">
                <Icon name="close" className="size-4" />
                <span className="sr-only">Remove {f.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function Consent({ error, companyName }: { error?: string; companyName: string }) {
  const id = useId()
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-relaxed text-muted">
        <input
          type="checkbox"
          name="consent"
          className="mt-0.5 size-4.5 shrink-0 accent-[var(--color-charcoal)]"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? id : undefined}
        />
        <span>
          I agree to {companyName} contacting me about this request. Drawings and files are treated as confidential. See our{' '}
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

export function SuccessMessage({ title, children, onReset, reference }: { title: string; children: ReactNode; onReset?: () => void; reference?: string }) {
  return (
    <div role="status" className="flex flex-col items-start py-2">
      <span className="flex size-14 items-center justify-center bg-signal text-charcoal">
        <Icon name="check" className="size-6" />
      </span>
      {reference && <p className="label-mono mt-8 text-muted">Reference · {reference}</p>}
      <p className="font-headline mt-3 text-[2rem] text-ink sm:text-[2.5rem]">{title}</p>
      <div className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-muted">{children}</div>
      {onReset && (
        <button type="button" onClick={onReset} className="mt-8 min-h-11 text-sm font-medium text-ink underline decoration-signal underline-offset-4">
          Submit another request
        </button>
      )}
    </div>
  )
}

type Rules = Record<string, (value: string, data: FormData) => string | undefined>

export const required = (msg: string) => (v: string) => (v.trim() ? undefined : msg)
export const email = (v: string) => (!v.trim() ? 'Please enter your work email.' : /^\S+@\S+\.\S+$/.test(v) ? undefined : 'Please enter a valid email address, e.g. name@company.com.')
export const optionalPhone = (v: string) => (!v.trim() || v.replace(/\D/g, '').length >= 7 ? undefined : 'Please enter a valid phone number.')
export const consent = (_: string, data: FormData) => (data.get('consent') ? undefined : 'Please confirm so we can respond to your request.')

/**
 * Small form-state hook: validates on submit, focuses the first invalid field and flips to a
 * success state. Replace `onValid` with a POST to the RFQ / CRM endpoint.
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

  /** Clear a field's error as soon as the user edits it. */
  const onChange = (e: FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name
    if (name && errors[name]) setErrors(({ [name]: _, ...rest }) => rest)
  }

  return { errors, submitted, onSubmit, onChange, reset: () => (setSubmitted(false), setErrors({})) }
}
