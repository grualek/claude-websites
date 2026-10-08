import { property } from '../content/property'
import { rooms } from '../content/rooms'
import type { Money, Room } from '../content/types'

/**
 * Booking layer. The prototype runs a deterministic demo availability check so the flow can be
 * pitched end to end. In production, replace `checkAvailability` with a call to the PMS / booking
 * engine API, or set `bookingEngine.mode = 'redirect'` and point `buildUrl` at the engine's
 * deep-link format (most engines accept arrival, departure, adults and a room/rate code).
 */
export interface StayQuery {
  checkIn: string
  checkOut: string
  guests: number
  /** Optional room slug when the visitor started from a specific room */
  room?: string
}

export const bookingEngine = {
  mode: 'demo' as 'demo' | 'redirect',
  buildUrl: (q: StayQuery) => {
    const params = new URLSearchParams({ arrival: q.checkIn, departure: q.checkOut, adults: String(q.guests) })
    if (q.room) params.set('room', q.room)
    return `https://booking.example/casa-velora?${params}`
  },
}

export const maxGuests = Math.max(...rooms.map((r) => r.maxGuests))

/* ---------- Dates (ISO yyyy-mm-dd, timezone-safe) ---------- */

export const toISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
export const todayISO = () => toISO(new Date())
export const addDays = (iso: string, days: number) => {
  const [y, m, d] = iso.split('-').map(Number)
  return toISO(new Date(y, m - 1, d + days))
}
export const nightsBetween = (a: string, b: string) => {
  const [y1, m1, d1] = a.split('-').map(Number)
  const [y2, m2, d2] = b.split('-').map(Number)
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86_400_000)
}

/** A sensible default stay: three weeks out, three nights. */
export const defaultStay = (): StayQuery => {
  const checkIn = addDays(todayISO(), 21)
  return { checkIn, checkOut: addDays(checkIn, 3), guests: 2 }
}

export type StayErrors = Partial<Record<'checkIn' | 'checkOut' | 'guests', string>>

export function validateStay(q: Partial<StayQuery>): StayErrors {
  const errors: StayErrors = {}
  const today = todayISO()
  if (!q.checkIn) errors.checkIn = 'Choose your arrival date.'
  else if (q.checkIn < today) errors.checkIn = 'Arrival can’t be in the past.'
  if (!q.checkOut) errors.checkOut = 'Choose your departure date.'
  else if (q.checkIn && q.checkOut <= q.checkIn) errors.checkOut = 'Departure must be after arrival.'
  else if (q.checkIn && nightsBetween(q.checkIn, q.checkOut) > 28) errors.checkOut = 'For stays over 28 nights, please contact us.'
  if (!q.guests || q.guests < 1) errors.guests = 'Choose the number of guests.'
  return errors
}

/* ---------- Demo availability ---------- */

export interface RoomAvailability {
  room: Room
  available: boolean
  /** Keys left at this rate — shown as gentle scarcity only when low */
  remaining: number
  nightly: Money
  total: Money
  nights: number
}

const hash = (s: string) => [...s].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7)

/** High season uplift (June–September) so demo rates feel plausible across the year. */
const seasonFactor = (iso: string) => {
  const month = Number(iso.slice(5, 7))
  return month >= 6 && month <= 9 ? 1.25 : month === 5 || month === 10 ? 1.1 : 1
}

export function checkAvailability(q: StayQuery): RoomAvailability[] {
  const nights = nightsBetween(q.checkIn, q.checkOut)
  return rooms
    .filter((r) => r.maxGuests >= q.guests)
    .map((room) => {
      // Mostly available, with the occasional sold-out room type and gentle low-stock notes
      const h = hash(q.checkIn + q.checkOut + room.slug)
      const remaining = h % 7 === 0 ? 0 : Math.min(room.inventory, 1 + (h % 4))
      const nightlyAmount = Math.round((room.fromRate.amount * seasonFactor(q.checkIn)) / 5) * 5
      return {
        room,
        available: remaining > 0,
        remaining,
        nights,
        nightly: { amount: nightlyAmount, currency: room.fromRate.currency || property.currency },
        total: { amount: nightlyAmount * nights, currency: room.fromRate.currency || property.currency },
      }
    })
    .sort((a, b) => Number(b.available) - Number(a.available) || (q.room === a.room.slug ? -1 : q.room === b.room.slug ? 1 : 0))
}
