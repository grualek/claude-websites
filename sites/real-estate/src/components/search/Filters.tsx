import { useId, type ReactNode, type SelectHTMLAttributes } from 'react'
import type { ListingType, PropertyFeature, PropertyType } from '../../content/types'
import { areas } from '../../content/areas'
import { formatCompactPrice, propertyTypeLabel } from '../../lib/format'
import { featureLabels, priceSteps } from '../../lib/search'

/* Reusable, accessible filter primitives shared by the hero search and the full search module. */

export const fieldBase =
  'block w-full min-h-12 rounded-[3px] border border-line bg-paper px-4 text-[0.9375rem] text-ink transition-colors hover:border-ink/40 focus:border-olive focus:outline-none focus-visible:outline-2 focus-visible:outline-olive/40 focus-visible:outline-offset-0'

export function FieldLabel({ htmlFor, children, className = '' }: { htmlFor?: string; children: ReactNode; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={`eyebrow block text-[0.65rem] text-muted ${className}`}>
      {children}
    </label>
  )
}

interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label: string
  options: Array<{ value: string; label: string }>
  onValue: (value: string) => void
  /** `bare` drops the border for use inside a segmented bar */
  bare?: boolean
}

export function SelectField({ label, options, onValue, bare = false, className = '', ...rest }: SelectFieldProps) {
  const id = useId()
  return (
    <div className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <select
        id={id}
        onChange={(e) => onValue(e.target.value)}
        className={
          bare
            ? 'mt-1 block w-full min-h-10 cursor-pointer rounded-[3px] bg-transparent pl-0 text-[0.9375rem] font-medium text-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-olive'
            : `${fieldBase} mt-2 cursor-pointer`
        }
        style={bare ? { backgroundPosition: 'right 0 center' } : undefined}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export const locationOptions = [{ value: '', label: 'All areas' }, ...areas.map((a) => ({ value: a.id, label: a.name }))]

export const typeOptions = [
  { value: '', label: 'Any type' },
  ...(Object.keys(propertyTypeLabel) as PropertyType[]).map((t) => ({ value: t, label: propertyTypeLabel[t] })),
]

export const priceOptions = (listingType: ListingType, kind: 'min' | 'max') => [
  { value: '0', label: kind === 'min' ? 'No min' : 'No max' },
  ...priceSteps[listingType].map((v) => ({ value: String(v), label: listingType === 'rent' ? `${formatCompactPrice(v)} pcm` : formatCompactPrice(v) })),
]

/** Buy / Rent segmented control built on native radios (arrow-key navigation for free). */
export function ListingTypeToggle({
  value,
  onChange,
  tone = 'light',
  className = '',
}: {
  value: ListingType
  onChange: (v: ListingType) => void
  tone?: 'light' | 'dark'
  className?: string
}) {
  const name = useId()
  const options: Array<{ value: ListingType; label: string }> = [
    { value: 'sale', label: 'Buy' },
    { value: 'rent', label: 'Rent' },
  ]
  return (
    <fieldset className={className}>
      <legend className="sr-only">Buy or rent</legend>
      <div className={`inline-flex rounded-[3px] p-1 ${tone === 'dark' ? 'bg-ink/6' : 'bg-sand'}`}>
        {options.map((o) => (
          <label key={o.value} className="relative cursor-pointer">
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="peer sr-only" />
            <span className="eyebrow inline-flex min-h-10 min-w-20 items-center justify-center rounded-[2px] px-5 text-[0.6875rem] text-muted transition-colors peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-olive">
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** Minimum bedrooms as a chip radio group. */
export function BedroomPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const name = useId()
  return (
    <fieldset>
      <legend className="eyebrow text-[0.65rem] text-muted">Bedrooms</legend>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <label key={n} className="cursor-pointer">
            <input type="radio" name={name} checked={value === n} onChange={() => onChange(n)} className="peer sr-only" />
            <span className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-[3px] border border-line bg-paper px-3 text-sm font-medium text-ink transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-olive hover:border-ink/40">
              {n === 0 ? 'Any' : `${n}+`}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function FeatureChips({ value, onChange }: { value: PropertyFeature[]; onChange: (v: PropertyFeature[]) => void }) {
  return (
    <fieldset>
      <legend className="eyebrow text-[0.65rem] text-muted">Must have</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {(Object.keys(featureLabels) as PropertyFeature[]).map((f) => {
          const checked = value.includes(f)
          return (
            <label key={f} className="cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onChange(checked ? value.filter((x) => x !== f) : [...value, f])}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-paper px-4 text-[0.8125rem] font-medium text-ink-soft transition-colors peer-checked:border-olive peer-checked:bg-olive-soft peer-checked:text-olive-deep peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-olive hover:border-ink/40">
                {featureLabels[f]}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
