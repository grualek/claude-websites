import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

/** Which detail view is open. Each maps to a future standalone page (see lib/routes.ts). */
export type DetailView =
  | { kind: 'capability'; slug: string }
  | { kind: 'industry'; slug: string }
  | { kind: 'product'; slug: string }
  | { kind: 'case'; slug: string }
  | { kind: 'resource'; slug: string }
  | null

/** Secondary conversions handled in a compact lead dialog. */
export type LeadKind = 'engineer' | 'brochure' | 'sales'

export interface QuotePrefill {
  projectType?: string
  industry?: string
}

interface AppState {
  detail: DetailView
  openDetail: (view: Exclude<DetailView, null>) => void
  closeDetail: () => void
  lead: LeadKind | null
  openLead: (kind: LeadKind) => void
  closeLead: () => void
  prefill: QuotePrefill
  /** Bumped every time a CTA requests the form, so the form can re-sync its fields. */
  prefillRequest: number
  /** Primary conversion: jump to the RFQ form, optionally pre-selecting project type / industry. */
  requestQuote: (prefill?: QuotePrefill) => void
}

const Ctx = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [detail, setDetail] = useState<DetailView>(null)
  const [lead, setLead] = useState<LeadKind | null>(null)
  const [prefill, setPrefill] = useState<QuotePrefill>({})
  const [prefillRequest, setPrefillRequest] = useState(0)

  const requestQuote = useCallback((next?: QuotePrefill) => {
    setDetail(null)
    setLead(null)
    if (next) setPrefill(next)
    setPrefillRequest((n) => n + 1)
    // Wait a frame so a closing dialog releases the scroll lock before we scroll
    requestAnimationFrame(() => {
      const section = document.getElementById('rfq')
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      section?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      // Move focus to the first field so keyboard and screen-reader users land in the form
      window.setTimeout(() => document.querySelector<HTMLElement>('#rfq-form input[name="name"]')?.focus({ preventScroll: true }), reduce ? 0 : 700)
    })
  }, [])

  const openLead = useCallback((kind: LeadKind) => {
    setDetail(null)
    setLead(kind)
  }, [])

  const value = useMemo<AppState>(
    () => ({
      detail,
      openDetail: setDetail,
      closeDetail: () => setDetail(null),
      lead,
      openLead,
      closeLead: () => setLead(null),
      prefill,
      prefillRequest,
      requestQuote,
    }),
    [detail, lead, openLead, prefill, prefillRequest, requestQuote],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
