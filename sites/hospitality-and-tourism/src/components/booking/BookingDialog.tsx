import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { experiences } from '../../content/experiences'
import { property } from '../../content/property'
import { bookingEngine, checkAvailability, validateStay, type RoomAvailability } from '../../lib/booking'
import { formatDate, formatMoney } from '../../lib/format'
import { useApp } from '../../state/AppState'
import { Button, ButtonLink } from '../ui/Button'
import { Dialog, DialogClose } from '../ui/Dialog'
import { email, required, SuccessMessage, TextArea, TextField, useForm } from '../ui/Form'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { StayForm } from './StayForm'

/**
 * Booking flow: dates → available rooms (demo availability + indicative rates) → guest details → request
 * sent. With `bookingEngine.mode = 'redirect'`, "Select" deep-links to the real booking engine instead.
 */
export function BookingDialog() {
  const { view, close, stay, stayIsValid } = useApp()
  const open = view?.type === 'booking'
  const preferredRoom = open ? view.room : undefined
  const titleId = useId()
  const [selected, setSelected] = useState<RoomAvailability | null>(null)
  const [searched, setSearched] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Reset to the results step every time the dialog opens
  useEffect(() => {
    if (open) {
      setSelected(null)
      setSearched(stayIsValid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const results = useMemo(
    () => (stayIsValid && stay.checkIn && stay.checkOut && stay.guests ? checkAvailability({ checkIn: stay.checkIn, checkOut: stay.checkOut, guests: stay.guests, room: preferredRoom }) : []),
    [stayIsValid, stay.checkIn, stay.checkOut, stay.guests, preferredRoom],
  )
  const showResults = searched && Object.keys(validateStay(stay)).length === 0

  return (
    <Dialog open={open} onClose={close} labelledBy={titleId} size="xl">
      <div className="sticky top-0 z-10 border-b border-line bg-paper/95 px-5 py-5 backdrop-blur sm:px-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow text-clay">{selected ? 'Step 2 of 2 · Your details' : 'Step 1 of 2 · Choose your room'}</p>
            <h2 id={titleId} className="font-editorial mt-2 text-[2rem] sm:text-[2.5rem]">
              {selected ? 'Almost there.' : 'Book your stay'}
            </h2>
          </div>
          <DialogClose onClose={close} />
        </div>
        {!selected && (
          <div className="mt-5">
            <StayForm
              variant="dialog"
              submitLabel="Update"
              room={preferredRoom}
              onValid={() => {
                setSearched(true)
                requestAnimationFrame(() => resultsRef.current?.focus())
              }}
            />
          </div>
        )}
      </div>

      <div className="px-5 py-8 sm:px-8">
        {selected ? (
          <GuestDetails choice={selected} onBack={() => setSelected(null)} onDone={close} />
        ) : showResults ? (
          <div ref={resultsRef} tabIndex={-1} className="focus:outline-none" aria-live="polite">
            <p className="text-[0.9rem] text-muted">
              {results.filter((r) => r.available).length} of {results.length} room types available · {formatDate(stay.checkIn!)} – {formatDate(stay.checkOut!)} · {stay.guests}{' '}
              {stay.guests === 1 ? 'guest' : 'guests'}
            </p>
            {results.length === 0 ? (
              <p className="mt-6 max-w-lg text-[0.95rem]">
                None of our rooms sleep {stay.guests} guests together. Our team can suggest combinations of connecting rooms —{' '}
                <a href={`mailto:${property.email}`} className="font-semibold text-clay underline underline-offset-4">
                  email reservations
                </a>
                .
              </p>
            ) : (
              <ul className="mt-6 grid gap-5">
                {results.map((r) => (
                  <ResultCard key={r.room.slug} r={r} highlight={r.room.slug === preferredRoom} onSelect={() => setSelected(r)} />
                ))}
              </ul>
            )}
            <p className="mt-8 flex items-start gap-2 text-xs leading-relaxed text-muted">
              <Icon name="sparkle" className="mt-0.5 size-3.5 shrink-0 text-clay" />
              Demo availability and indicative rates. In production this step is powered by the property’s booking engine, with live rates, taxes and
              rate plans.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-4 py-6 text-[0.95rem] text-muted">
            <Icon name="calendar" className="size-8 text-clay" />
            <p className="max-w-md">Choose your dates and number of guests above to see available rooms and rates.</p>
          </div>
        )}
      </div>
    </Dialog>
  )
}

function ResultCard({ r, highlight, onSelect }: { r: RoomAvailability; highlight: boolean; onSelect: () => void }) {
  const { stay } = useApp()
  const { room } = r
  return (
    <li className={`grid gap-5 rounded-[6px] border bg-ivory p-3 sm:grid-cols-[13rem_1fr_auto] sm:items-center sm:p-4 ${highlight ? 'border-clay' : 'border-line'} ${r.available ? '' : 'opacity-70'}`}>
      <div className="aspect-[16/10] overflow-hidden rounded-[4px] sm:aspect-[4/3]">
        <Media asset={room.image} sizes="208px" />
      </div>
      <div className="px-1">
        <p className="eyebrow text-muted">{room.category}</p>
        <h3 className="font-editorial mt-1.5 text-[1.75rem]">{room.name}</h3>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.8rem] text-muted">
          <span>Up to {room.maxGuests} guests</span>
          <span>{room.size} m²</span>
          <span>{room.view}</span>
          <span>{room.bed}</span>
        </p>
        {r.available && r.remaining <= 2 && <p className="mt-2 text-[0.8rem] font-semibold text-clay">Only {r.remaining} left for these dates</p>}
      </div>
      <div className="flex items-end justify-between gap-6 border-t border-line px-1 pt-4 sm:flex-col sm:items-end sm:border-0 sm:pt-0 sm:text-right">
        {r.available ? (
          <>
            <div>
              <p className="font-editorial text-[1.75rem] leading-none text-ink">{formatMoney(r.nightly)}</p>
              <p className="mt-1 text-xs text-muted">
                per night · {formatMoney(r.total)} for {r.nights} {r.nights === 1 ? 'night' : 'nights'}
              </p>
            </div>
            {bookingEngine.mode === 'redirect' ? (
              <ButtonLink href={bookingEngine.buildUrl({ checkIn: stay.checkIn!, checkOut: stay.checkOut!, guests: stay.guests!, room: room.slug })} size="sm" arrow>
                Select
              </ButtonLink>
            ) : (
              <Button size="sm" arrow onClick={onSelect} aria-label={`Select ${room.name}`}>
                Select
              </Button>
            )}
          </>
        ) : (
          <p className="text-[0.85rem] font-semibold text-muted">Unavailable for these dates</p>
        )}
      </div>
    </li>
  )
}

function GuestDetails({ choice, onBack, onDone }: { choice: RoomAvailability; onBack: () => void; onDone: () => void }) {
  const { stay } = useApp()
  const { errors, submitted, onSubmit, onChange } = useForm({
    firstName: required('Please enter your first name.'),
    lastName: required('Please enter your last name.'),
    email,
  })

  if (submitted) {
    return (
      <SuccessMessage title="Request received.">
        <p>
          Thank you — we’ve received your request for the {choice.room.name}, {formatDate(stay.checkIn!)} – {formatDate(stay.checkOut!)}. Our reservations
          team will confirm by email, usually within 24 hours.
        </p>
        <p className="mt-3">Demo prototype: no booking has been made and no payment was taken.</p>
        <div className="mt-6">
          <Button variant="dark" onClick={onDone}>
            Back to the site
          </Button>
        </div>
      </SuccessMessage>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
      <form onSubmit={onSubmit} onChange={onChange} noValidate className="grid gap-5 sm:grid-cols-2">
        <TextField label="First name" name="firstName" autoComplete="given-name" error={errors.firstName} />
        <TextField label="Last name" name="lastName" autoComplete="family-name" error={errors.lastName} />
        <TextField label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
        <TextField label="Phone" name="phone" type="tel" autoComplete="tel" optional />
        <fieldset className="sm:col-span-2">
          <legend className="text-[0.8125rem] font-semibold text-ink">
            Add experiences <span className="font-normal text-muted">(optional — our concierge will confirm)</span>
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {experiences.map((e) => (
              <label key={e.slug} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-[4px] border border-line bg-paper px-4 text-[0.875rem] text-ink-soft transition-colors hover:border-ink/40 has-[:checked]:border-clay has-[:checked]:bg-clay-soft/40">
                <input type="checkbox" name="experiences" value={e.slug} className="size-4 accent-[var(--color-clay)]" />
                {e.title}
              </label>
            ))}
          </div>
        </fieldset>
        <TextArea label="Special requests" name="requests" optional className="sm:col-span-2" hint="Celebrations, dietary needs, arrival time, transfers…" />
        <div className="flex flex-col-reverse items-stretch gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={onBack} className="inline-flex min-h-11 items-center gap-2 text-[0.85rem] font-semibold text-ink">
            <Icon name="arrow-left" className="size-4" /> Change room
          </button>
          <Button type="submit" size="lg" arrow>
            Request reservation
          </Button>
        </div>
      </form>

      <aside aria-label="Your stay" className="h-fit rounded-[6px] bg-ivory p-5 lg:sticky lg:top-40">
        <div className="aspect-[4/3] overflow-hidden rounded-[4px]">
          <Media asset={choice.room.image} sizes="352px" />
        </div>
        <h3 className="font-editorial mt-5 text-[1.75rem]">{choice.room.name}</h3>
        <dl className="mt-4 divide-y divide-line border-y border-line text-[0.875rem]">
          {[
            ['Check-in', `${formatDate(stay.checkIn!, { weekday: 'short', day: 'numeric', month: 'short' })} · from ${property.checkIn}`],
            ['Check-out', `${formatDate(stay.checkOut!, { weekday: 'short', day: 'numeric', month: 'short' })} · by ${property.checkOut}`],
            ['Guests', String(stay.guests)],
            ['Rate', `${formatMoney(choice.nightly)} × ${choice.nights}`],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2.5">
              <dt className="text-muted">{k}</dt>
              <dd className="text-right font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 flex items-baseline justify-between">
          <span className="text-[0.875rem] text-muted">Indicative total</span>
          <span className="font-editorial text-[2rem] text-ink">{formatMoney(choice.total)}</span>
        </div>
        <ul className="mt-4 space-y-1.5 text-[0.8rem] text-muted">
          {['Breakfast included', 'No payment taken today', 'Taxes confirmed by reservations'].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Icon name="check" className="size-4 text-olive" /> {t}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
