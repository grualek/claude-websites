import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

/** Which detail view is open. Each maps to a future standalone page (see lib/routes.ts). */
export type DetailView = { kind: 'practice'; slug: string } | { kind: 'attorney'; slug: string } | { kind: 'insight'; slug: string } | null

interface AppState {
  detail: DetailView
  openDetail: (view: Exclude<DetailView, null>) => void
  closeDetail: () => void
  /** Pre-selected matter type for the consultation form (a PracticeArea.matterLabel). */
  matter: string
  /** Bumped every time a CTA requests the form, so the form can re-sync its fields. */
  matterRequest: number
  /** Primary conversion: jump to the consultation form, optionally with a matter type pre-selected. */
  scheduleConsultation: (matter?: string) => void
}

const Ctx = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [detail, setDetail] = useState<DetailView>(null)
  const [matter, setMatter] = useState('')
  const [matterRequest, setMatterRequest] = useState(0)

  const scheduleConsultation = useCallback((next?: string) => {
    setDetail(null)
    if (next !== undefined) setMatter(next)
    setMatterRequest((n) => n + 1)
    // Wait a frame so a closing dialog releases the scroll lock before we scroll
    requestAnimationFrame(() => {
      const section = document.getElementById('contact')
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      section?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      // Move focus to the first field so keyboard and screen-reader users land in the form
      window.setTimeout(() => document.querySelector<HTMLElement>('#consultation-form input[name="name"]')?.focus({ preventScroll: true }), reduce ? 0 : 600)
    })
  }, [])

  const value = useMemo<AppState>(
    () => ({
      detail,
      openDetail: setDetail,
      closeDetail: () => setDetail(null),
      matter,
      matterRequest,
      scheduleConsultation,
    }),
    [detail, matter, matterRequest, scheduleConsultation],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
