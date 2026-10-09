import { useEffect, useState } from 'react'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'

/**
 * Small-screen action bar: appears once the hero has scrolled away and hides while the program grid,
 * the closing admissions CTA or the footer is on screen, so it never doubles up with another CTA.
 */
export function MobileCtaBar() {
  const { explore, enquire } = useApp()
  const [pastHero, setPastHero] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const hero = document.getElementById('hero')
    const blockers = ['apply', 'contact', 'site-footer'].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
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
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-cream/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-500 ease-[var(--ease-soft)] md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex gap-2">
        <Button className="flex-1" arrow onClick={() => explore()}>
          Explore Programs
        </Button>
        <Button variant="sun" onClick={() => enquire('apply')}>
          Apply
        </Button>
      </div>
    </div>
  )
}
