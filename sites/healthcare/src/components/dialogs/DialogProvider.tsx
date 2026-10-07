import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { InfoTopic, Service, Specialist } from '../../content/types'

type DialogState =
  | { kind: 'none' }
  | { kind: 'booking'; serviceId?: string; specialistId?: string }
  | { kind: 'service'; service: Service }
  | { kind: 'specialist'; specialist: Specialist }
  | { kind: 'info'; topic: InfoTopic }

interface DialogApi {
  state: DialogState
  openBooking: (opts?: { serviceId?: string; specialistId?: string }) => void
  openService: (service: Service) => void
  openSpecialist: (specialist: Specialist) => void
  openInfo: (topic: InfoTopic) => void
  close: () => void
}

const Ctx = createContext<DialogApi | null>(null)

/**
 * Central place for overlays. In the prototype, "Learn more" / "View profile" open
 * panels instead of routing, so there are no dead links. With a router/CMS these
 * calls can become navigations to /services/:slug and /specialists/:slug.
 */
export function DialogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DialogState>({ kind: 'none' })
  const close = useCallback(() => setState({ kind: 'none' }), [])

  const api = useMemo<DialogApi>(
    () => ({
      state,
      close,
      openBooking: (opts) => setState({ kind: 'booking', ...opts }),
      openService: (service) => setState({ kind: 'service', service }),
      openSpecialist: (specialist) => setState({ kind: 'specialist', specialist }),
      openInfo: (topic) => setState({ kind: 'info', topic }),
    }),
    [state, close],
  )

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useDialogs() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useDialogs must be used within DialogProvider')
  return ctx
}
