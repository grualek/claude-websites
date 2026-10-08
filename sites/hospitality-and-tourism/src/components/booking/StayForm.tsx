import { useId, useState, type FormEvent } from 'react'
import { addDays, maxGuests, nightsBetween, todayISO, validateStay, type StayErrors } from '../../lib/booking'
import { useApp } from '../../state/AppState'
import { Icon } from '../ui/Icon'

type Variant = 'hero' | 'panel' | 'dialog'

interface StayFormProps {
  variant?: Variant
  submitLabel?: string
  /** Called after a valid submit instead of opening the booking dialog (used inside the dialog). */
  onValid?: () => void
  room?: string
}

const guestOptions = Array.from({ length: maxGuests }, (_, i) => i + 1)

const styles: Record<Variant, { form: string; field: string; label: string; control: string; button: string; error: string }> = {
  hero: {
    form: 'grid grid-cols-2 gap-px overflow-hidden rounded-[6px] bg-ink/10 shadow-[0_30px_60px_-30px_rgb(20_16_12/0.55)] sm:grid-cols-[1fr_1fr_0.8fr_auto]',
    field: 'relative bg-paper/95 px-4 pt-3 pb-2 backdrop-blur-md transition-colors focus-within:bg-paper sm:px-5',
    label: 'eyebrow block text-[0.625rem] text-muted',
    control: 'mt-1 block w-full min-h-9 bg-transparent text-[0.95rem] font-semibold text-ink focus:outline-none',
    button: 'col-span-2 min-h-14 bg-clay px-7 text-[0.84rem] font-semibold tracking-[0.02em] text-ivory transition-colors hover:bg-clay-hover sm:col-span-1',
    error: 'text-[#ffd9cc]',
  },
  panel: {
    form: 'grid gap-3 sm:grid-cols-3',
    field: 'relative rounded-[4px] border border-on-dark/25 bg-on-dark/5 px-4 pt-3 pb-2 transition-colors focus-within:border-on-dark/70 hover:border-on-dark/50',
    label: 'eyebrow block text-[0.625rem] text-on-dark-muted',
    control: 'mt-1 block w-full min-h-10 bg-transparent text-[1rem] font-semibold text-on-dark [color-scheme:dark] focus:outline-none',
    button: 'min-h-14 rounded-full bg-clay px-8 text-[0.9rem] font-semibold tracking-[0.02em] text-ivory transition-colors hover:bg-clay-hover sm:col-span-3',
    error: 'text-[#ffc9b8]',
  },
  dialog: {
    form: 'grid grid-cols-2 gap-3 md:grid-cols-[1fr_1fr_0.8fr_auto]',
    field: 'relative rounded-[4px] border border-line bg-paper px-4 pt-2.5 pb-1.5 transition-colors focus-within:border-clay hover:border-ink/40',
    label: 'eyebrow block text-[0.625rem] text-muted',
    control: 'mt-0.5 block w-full min-h-9 bg-transparent text-[0.95rem] font-semibold text-ink focus:outline-none',
    button: 'col-span-2 min-h-14 rounded-full bg-charcoal px-7 text-[0.84rem] font-semibold text-on-dark transition-colors hover:bg-ink-soft md:col-span-1',
    error: 'text-[#a2301f]',
  },
}

/**
 * Availability search (check-in, check-out, guests). Shares the visitor's stay through app state, so
 * dates chosen in the hero carry through to the booking dialog and the final CTA.
 */
export function StayForm({ variant = 'hero', submitLabel = 'Check availability', onValid, room }: StayFormProps) {
  const { stay, setStay, bookStay } = useApp()
  const [errors, setErrors] = useState<StayErrors>({})
  const uid = useId()
  const s = styles[variant]
  const today = todayISO()
  const nights = stay.checkIn && stay.checkOut && stay.checkOut > stay.checkIn ? nightsBetween(stay.checkIn, stay.checkOut) : 0

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next = validateStay(stay)
    setErrors(next)
    const first = (['checkIn', 'checkOut', 'guests'] as const).find((k) => next[k])
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    if (onValid) onValid()
    else bookStay({ room })
  }

  const clear = (k: keyof StayErrors) => errors[k] && setErrors(({ [k]: _, ...rest }) => rest)
  const errorId = (k: keyof StayErrors) => (errors[k] ? `${uid}-${k}-err` : undefined)
  const errorList = (['checkIn', 'checkOut', 'guests'] as const).filter((k) => errors[k])

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Check availability">
      <div className={s.form}>
        <div className={s.field}>
          <label htmlFor={`${uid}-in`} className={s.label}>
            Check-in
          </label>
          <input
            id={`${uid}-in`}
            name="checkIn"
            type="date"
            min={today}
            value={stay.checkIn ?? ''}
            aria-invalid={errors.checkIn ? true : undefined}
            aria-describedby={errorId('checkIn')}
            onChange={(e) => {
              const checkIn = e.target.value
              const keep = stay.checkOut && checkIn && stay.checkOut > checkIn
              setStay({ checkIn, ...(keep || !checkIn ? {} : { checkOut: addDays(checkIn, 3) }) })
              clear('checkIn')
              clear('checkOut')
            }}
            className={s.control}
          />
        </div>
        <div className={s.field}>
          <label htmlFor={`${uid}-out`} className={s.label}>
            Check-out {nights > 0 && <span className="normal-case tracking-normal">· {nights} {nights === 1 ? 'night' : 'nights'}</span>}
          </label>
          <input
            id={`${uid}-out`}
            name="checkOut"
            type="date"
            min={stay.checkIn ? addDays(stay.checkIn, 1) : addDays(today, 1)}
            value={stay.checkOut ?? ''}
            aria-invalid={errors.checkOut ? true : undefined}
            aria-describedby={errorId('checkOut')}
            onChange={(e) => {
              setStay({ checkOut: e.target.value })
              clear('checkOut')
            }}
            className={s.control}
          />
        </div>
        <div className={`${s.field} ${variant === 'panel' ? '' : 'col-span-2 sm:col-span-1'} ${variant === 'dialog' ? 'md:col-span-1' : ''}`}>
          <label htmlFor={`${uid}-guests`} className={s.label}>
            Guests
          </label>
          <select
            id={`${uid}-guests`}
            name="guests"
            value={stay.guests ?? 2}
            onChange={(e) => setStay({ guests: Number(e.target.value) })}
            className={`${s.control} cursor-pointer bg-none! pr-0!`}
          >
            {guestOptions.map((n) => (
              <option key={n} value={n} className="text-ink">
                {n} {n === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
          <Icon name="guests" className={`pointer-events-none absolute right-4 bottom-3.5 size-4 ${variant === 'panel' ? 'hidden' : 'text-muted'}`} />
        </div>
        <button type="submit" className={`group/btn inline-flex items-center justify-center gap-2.5 ${s.button}`}>
          {submitLabel}
          <Icon name="arrow-right" className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>
      {errorList.length > 0 && (
        <ul className={`mt-3 space-y-1 text-[0.8rem] font-semibold ${s.error}`}>
          {errorList.map((k) => (
            <li key={k} id={`${uid}-${k}-err`}>
              {errors[k]}
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}
