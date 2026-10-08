import { useCallback, useEffect, useId, useState } from 'react'
import { primaryNav, property } from '../../content/property'
import { useActiveSection } from '../../lib/useReveal'
import { useApp } from '../../state/AppState'
import { Button, ButtonLink } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'

const sectionIds = primaryNav.map((n) => n.href.slice(1))

/**
 * Transparent over the hero, settling into a solid ivory bar once the visitor scrolls. Desktop shows
 * the full navigation; smaller screens get a full-height menu sheet.
 */
export function Header() {
  const { bookStay } = useApp()
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const menuTitle = useId()

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useActiveSection(sectionIds, useCallback((id: string) => setActive(id), []))

  const light = !solid

  return (
    <header
      id="top"
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,color] duration-500 ${
        solid ? 'border-b border-line bg-ivory/92 backdrop-blur-md' : 'border-b border-transparent bg-gradient-to-b bg-origin-border from-charcoal/45 to-transparent'
      }`}
    >
      <div className={`container-page flex items-center justify-between gap-6 transition-[height] duration-500 ${solid ? 'h-[4.25rem] lg:h-[4.75rem]' : 'h-[5rem] lg:h-[6rem]'}`}>
        <Logo tone={light ? 'light' : 'dark'} />

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const current = active === item.href.slice(1)
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-current={current ? 'location' : undefined}
                    className={`relative inline-flex min-h-11 items-center px-3 text-[0.8rem] font-medium tracking-[0.04em] transition-colors after:absolute after:inset-x-3 after:bottom-2 after:h-px after:origin-left after:transition-transform after:duration-500 hover:after:scale-x-100 ${
                      light ? 'text-on-dark/90 after:bg-on-dark hover:text-on-dark' : 'text-ink-soft after:bg-clay hover:text-ink'
                    } ${current ? 'after:scale-x-100' : 'after:scale-x-0'}`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button size="sm" className="max-sm:hidden sm:min-h-11 sm:px-6" onClick={() => bookStay()}>
            Book Your Stay
          </Button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[0.8rem] font-semibold transition-colors xl:hidden ${
              light ? 'border-on-dark/40 text-on-dark hover:border-on-dark' : 'border-ink/20 text-ink hover:border-ink'
            }`}
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
          <nav aria-label="Mobile" className="mt-6">
            <ul className="border-t border-line">
              {primaryNav.map((item, i) => (
                <li key={item.label} className="border-b border-line">
                  <a href={item.href} onClick={() => setMenuOpen(false)} className="flex min-h-[3.75rem] items-center gap-5 text-ink">
                    <span className="eyebrow w-6 text-clay tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-editorial flex-1 text-[2rem]">{item.label}</span>
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
                bookStay()
              }}
            >
              Book Your Stay
            </Button>
            <ButtonLink variant="secondary" size="lg" href={property.phone.href} icon="phone">
              {property.phone.display}
            </ButtonLink>
            <p className="mt-2 text-center text-xs text-muted">Reservations · {property.reception}</p>
          </div>
        </div>
      </Dialog>
    </header>
  )
}
