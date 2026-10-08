import { useCallback, useEffect, useId, useState } from 'react'
import { firm, primaryNav } from '../../content/firm'
import { useActiveSection } from '../../lib/useReveal'
import { useApp } from '../../state/AppState'
import { Button, ButtonLink } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'

const sectionIds = primaryNav.map((n) => n.href.slice(1))

export function Header() {
  const { scheduleConsultation } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const menuTitle = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useActiveSection(sectionIds, useCallback((id: string) => setActive(id), []))

  return (
    <header
      id="top"
      className={`sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled ? 'border-b border-line bg-ivory/88 backdrop-blur-md' : 'border-b border-transparent bg-ivory'
      }`}
    >
      <div className="container-page flex h-[4.75rem] items-center justify-between gap-6 lg:h-[5.25rem]">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {primaryNav.map((item) => {
              const current = active === item.href.slice(1)
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-current={current ? 'location' : undefined}
                    className={`relative inline-flex min-h-11 items-center px-2.5 text-[0.8125rem] font-medium tracking-[0.01em] transition-colors after:absolute after:inset-x-2.5 after:bottom-2 after:h-px after:origin-left after:bg-bronze after:transition-transform after:duration-500 hover:text-ink hover:after:scale-x-100 xl:px-3 xl:after:inset-x-3 ${
                      current ? 'text-ink after:scale-x-100' : 'text-ink-soft after:scale-x-0'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a href={firm.phone.href} className="hidden min-h-11 items-center gap-2 text-[0.8125rem] font-medium text-ink-soft hover:text-ink 2xl:inline-flex">
            <Icon name="phone" className="size-4" />
            {firm.phone.display}
          </a>
          <Button size="sm" className="max-sm:hidden sm:min-h-11 sm:px-5" onClick={() => scheduleConsultation()}>
            Schedule a Consultation
          </Button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="inline-flex min-h-11 items-center gap-2 rounded-[2px] border border-ink/20 px-4 text-[0.8125rem] font-medium text-ink transition-colors hover:border-ink lg:hidden"
          >
            <Icon name="menu" className="size-5" />
            Menu
          </button>
        </div>
      </div>

      <Dialog open={menuOpen} onClose={() => setMenuOpen(false)} labelledBy={menuTitle} variant="sheet">
        <div className="flex min-h-dvh flex-col p-6">
          <div className="flex items-center justify-between">
            <h2 id={menuTitle} className="eyebrow text-muted">
              Menu
            </h2>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink hover:border-ink"
            >
              <Icon name="close" className="size-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-8">
            <ul className="border-t border-line">
              {primaryNav.map((item, i) => (
                <li key={item.label} className="border-b border-line">
                  <a href={item.href} onClick={() => setMenuOpen(false)} className="flex min-h-16 items-center gap-5 text-ink">
                    <span className="eyebrow w-6 text-bronze-deep tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-editorial flex-1 text-[1.875rem]">{item.label}</span>
                    <Icon name="arrow-right" className="size-5 text-muted" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto grid gap-3 pt-10">
            <Button
              size="lg"
              onClick={() => {
                setMenuOpen(false)
                scheduleConsultation()
              }}
            >
              Schedule a Consultation
            </Button>
            <ButtonLink variant="secondary" size="lg" href={firm.phone.href} icon="phone">
              Call {firm.phone.display}
            </ButtonLink>
            <p className="mt-2 text-center text-xs text-muted">Confidential consultations · In person, phone or video</p>
          </div>
        </div>
      </Dialog>
    </header>
  )
}
