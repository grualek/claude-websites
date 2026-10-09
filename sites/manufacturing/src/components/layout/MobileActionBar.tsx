import { useEffect, useState } from 'react'
import { useApp } from '../../state/AppState'
import { Icon } from '../ui/Icon'

/** Persistent mobile conversion bar: appears after the hero, hides while the RFQ form is on screen. */
export function MobileActionBar() {
  const { requestQuote, openLead } = useApp()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const rfq = document.getElementById('rfq')
    let formInView = false
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.8 && !formInView)
    const io = new IntersectionObserver(([e]) => {
      formInView = e.isIntersecting
      update()
    })
    if (rfq) io.observe(rfq)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', update)
    }
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bone/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <button type="button" onClick={() => openLead('engineer')} className="inline-flex min-h-12 items-center gap-2 border border-ink/25 px-4 text-[0.875rem] font-medium text-ink">
          <Icon name="engineer" className="size-4" />
          Engineer
        </button>
        <button type="button" onClick={() => requestQuote()} className="inline-flex min-h-12 items-center justify-center gap-2 bg-signal px-4 text-[0.875rem] font-medium text-charcoal">
          Request a Quote
          <Icon name="arrow-right" className="size-4" />
        </button>
      </div>
    </div>
  )
}
