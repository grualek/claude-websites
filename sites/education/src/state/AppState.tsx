import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Article, Educator, EnquiryIntent, Program, StudentStory } from '../content/types'
import { emptyQuery, type ProgramQuery } from '../lib/programs'

/**
 * App-level state: the program finder query (shared by the hero search and the program grid), and
 * which detail view or enquiry form is open. Detail views are dialogs in the prototype and become
 * standalone pages in production (see lib/routes.ts).
 */
export type View =
  | { type: 'program'; program: Program }
  | { type: 'educator'; educator: Educator }
  | { type: 'story'; story: StudentStory }
  | { type: 'article'; article: Article }
  | { type: 'enquiry'; intent: EnquiryIntent; program?: string }
  | null

interface AppState {
  query: ProgramQuery
  setQuery: (q: Partial<ProgramQuery>) => void
  view: View
  open: (v: View) => void
  close: () => void
  /** Opens one of the secondary conversions (apply, visit, info, talk, prospectus). */
  enquire: (intent: EnquiryIntent, program?: string) => void
  /** Scrolls to the program finder, optionally applying a filter or search first. */
  explore: (q?: Partial<ProgramQuery>) => void
}

const Ctx = createContext<AppState | null>(null)

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function AppProvider({ children }: { children: ReactNode }) {
  const [query, setQueryState] = useState<ProgramQuery>(emptyQuery)
  const [view, setView] = useState<View>(null)

  const setQuery = useCallback((q: Partial<ProgramQuery>) => setQueryState((prev) => ({ ...prev, ...q })), [])
  const close = useCallback(() => setView(null), [])
  const enquire = useCallback((intent: EnquiryIntent, program?: string) => setView({ type: 'enquiry', intent, program }), [])

  const explore = useCallback((q?: Partial<ProgramQuery>) => {
    setView(null)
    if (q) setQueryState({ ...emptyQuery, ...q })
    // Wait a frame so a closing dialog releases focus before we move it
    requestAnimationFrame(() => {
      const target = document.getElementById('programs')
      target?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
      document.getElementById('program-results-title')?.focus({ preventScroll: true })
    })
  }, [])

  const value = useMemo(() => ({ query, setQuery, view, open: setView, close, enquire, explore }), [query, setQuery, view, close, enquire, explore])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
