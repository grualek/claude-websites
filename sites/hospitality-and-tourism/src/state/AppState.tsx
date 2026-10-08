import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Article, Experience, Room } from '../content/types'
import { validateStay, type StayQuery } from '../lib/booking'

/**
 * App-level state: the visitor's stay (shared by every availability form), and which detail view is
 * open. Detail views are dialogs in the prototype and become standalone pages (see lib/routes.ts).
 */
export type View =
  | { type: 'booking'; room?: string }
  | { type: 'room'; room: Room }
  | { type: 'experience'; experience: Experience }
  | { type: 'article'; article: Article }
  | { type: 'dining' }
  | { type: 'gallery'; index: number }
  | null

export interface EnquiryPrefill {
  topic: string
  message?: string
}

interface AppState {
  stay: Partial<StayQuery>
  setStay: (s: Partial<StayQuery>) => void
  view: View
  open: (v: View) => void
  close: () => void
  /** Opens the booking flow. Pass a room slug to highlight it in the results. */
  bookStay: (opts?: { room?: string; stay?: Partial<StayQuery> }) => void
  /** Scrolls to the contact form with a topic pre-selected (experiences, dining, events…). */
  enquire: (prefill: EnquiryPrefill) => void
  enquiry: EnquiryPrefill | null
  stayIsValid: boolean
}

const Ctx = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [stay, setStayState] = useState<Partial<StayQuery>>({ guests: 2 })
  const [view, setView] = useState<View>(null)
  const [enquiry, setEnquiry] = useState<EnquiryPrefill | null>(null)

  const setStay = useCallback((s: Partial<StayQuery>) => setStayState((prev) => ({ ...prev, ...s })), [])
  const close = useCallback(() => setView(null), [])

  const bookStay = useCallback<AppState['bookStay']>((opts) => {
    if (opts?.stay) setStayState((prev) => ({ ...prev, ...opts.stay }))
    setView({ type: 'booking', room: opts?.room })
  }, [])

  const enquire = useCallback((prefill: EnquiryPrefill) => {
    setView(null)
    setEnquiry({ ...prefill })
    // Wait a frame so a closing dialog releases focus before we move it
    requestAnimationFrame(() => {
      const form = document.getElementById('contact-form')
      form?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
      form?.querySelector<HTMLElement>('input, select, textarea')?.focus({ preventScroll: true })
    })
  }, [])

  const stayIsValid = Object.keys(validateStay(stay)).length === 0

  const value = useMemo(
    () => ({ stay, setStay, view, open: setView, close, bookStay, enquire, enquiry, stayIsValid }),
    [stay, setStay, view, close, bookStay, enquire, enquiry, stayIsValid],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
