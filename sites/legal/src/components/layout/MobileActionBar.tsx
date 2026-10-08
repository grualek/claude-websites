import { useEffect, useState } from 'react'
import { firm } from '../../content/firm'
import { useApp } from '../../state/AppState'
import { Icon } from '../ui/Icon'

/** Persistent mobile conversion bar: appears after the hero, hides while the form is on screen. */
export function MobileActionBar() {
  const { scheduleConsultation } = useApp()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const contact = document.getElementById('contact')
    let formInView = false
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.8 && !formInView)
    const io = new IntersectionObserver(([e]) => {
      formInView = e.isIntersecting
      update()
    })
    if (contact) io.observe(contact)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', update)
    }
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ivory/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-500 md:hidden ${
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <a href={firm.phone.href} className="inline-flex min-h-12 items-center gap-2 rounded-[2px] border border-ink/20 px-4 text-[0.875rem] font-medium text-ink">
          <Icon name="phone" className="size-4" />
          Call
        </a>
        <button type="button" onClick={() => scheduleConsultation()} className="min-h-12 rounded-[2px] bg-espresso px-4 text-[0.875rem] font-medium text-on-dark">
          Schedule a Consultation
        </button>
      </div>
    </div>
  )
}
