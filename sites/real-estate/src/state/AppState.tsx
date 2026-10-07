import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { EnquiryIntent } from '../content/types'
import { defaultFilters, type SearchFilters, type SortKey } from '../lib/search'

type DialogState =
  | { kind: 'none' }
  | { kind: 'property'; propertyId: string }
  | { kind: 'enquiry'; intent: EnquiryIntent; propertyId?: string }

interface AppApi {
  dialog: DialogState
  openProperty: (propertyId: string) => void
  openEnquiry: (intent: EnquiryIntent, propertyId?: string) => void
  closeDialog: () => void

  filters: SearchFilters
  setFilters: (next: SearchFilters | ((prev: SearchFilters) => SearchFilters)) => void
  sort: SortKey
  setSort: (s: SortKey) => void
  /** Apply filters (e.g. from the hero or an area tile) and bring the results into view. */
  runSearch: (partial: Partial<SearchFilters>) => void

  saved: string[]
  toggleSaved: (propertyId: string) => void
}

const Ctx = createContext<AppApi | null>(null)
const SAVED_KEY = 'hv-saved'

const readSaved = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) ?? '[]')
  } catch {
    return []
  }
}

/**
 * Central UI state. In the prototype, "View property" and enquiry CTAs open dialogs so
 * there are no dead links; with a router these become /property/:slug and /valuation/ etc.
 * Saved homes are kept per-browser here and would sync to a buyer account in production.
 */
export function AppStateProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<DialogState>({ kind: 'none' })
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters)
  const [sort, setSort] = useState<SortKey>('newest')
  const [saved, setSaved] = useState<string[]>(readSaved)

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(saved))
    } catch {
      /* storage unavailable — saved homes stay in memory */
    }
  }, [saved])

  const closeDialog = useCallback(() => setDialog({ kind: 'none' }), [])

  const runSearch = useCallback((partial: Partial<SearchFilters>) => {
    setFilters({ ...defaultFilters, ...partial })
    requestAnimationFrame(() => document.getElementById('search')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }, [])

  const api = useMemo<AppApi>(
    () => ({
      dialog,
      openProperty: (propertyId) => setDialog({ kind: 'property', propertyId }),
      openEnquiry: (intent, propertyId) => setDialog({ kind: 'enquiry', intent, propertyId }),
      closeDialog,
      filters,
      setFilters,
      sort,
      setSort,
      runSearch,
      saved,
      toggleSaved: (id) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])),
    }),
    [dialog, closeDialog, filters, sort, runSearch, saved],
  )

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useApp() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp must be used within AppStateProvider')
  return ctx
}
