import { useEffect, useState } from 'react'
import { rooms } from '../../content/rooms'
import { formatMoney } from '../../lib/format'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'

const lowest = rooms.reduce((a, b) => (b.fromRate.amount < a.fromRate.amount ? b : a)).fromRate

/**
 * Small-screen booking bar: appears once the hero has scrolled away and hides while the dedicated
 * booking section or the footer is on screen, so it never doubles up with another CTA.
 */
export function MobileBookBar() {
  const { bookStay } = useApp()
  const [pastHero, setPastHero] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const hero = document.getElementById('hero')
    const blockers = ['book', 'site-footer'].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const visible = new Set<Element>()
    const heroIo = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { threshold: 0 })
    const blockIo = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)))
      setHidden(visible.size > 0)
    })
    if (hero) heroIo.observe(hero)
    blockers.forEach((b) => blockIo.observe(b))
    return () => {
      heroIo.disconnect()
      blockIo.disconnect()
    }
  }, [])

  const show = pastHero && !hidden
  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ivory/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-500 ease-[var(--ease-soft)] md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-[0.8rem] leading-tight text-muted">
          Rooms from
          <span className="font-editorial block text-[1.4rem] text-ink">
            {formatMoney(lowest)} <span className="font-sans text-xs text-muted">/ night</span>
          </span>
        </p>
        <Button onClick={() => bookStay()} className="flex-1 max-w-56">
          Book Your Stay
        </Button>
      </div>
    </div>
  )
}
