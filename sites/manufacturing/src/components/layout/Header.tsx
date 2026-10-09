import { useCallback, useEffect, useId, useState } from 'react'
import { company, primaryNav } from '../../content/company'
import { useActiveSection } from '../../lib/useReveal'
import { useApp } from '../../state/AppState'
import { Button, ButtonLink } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'

const sectionIds = primaryNav.map((n) => n.href.slice(1))

export function Header() {
  const { requestQuote, openLead } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const menuTitle = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useActiveSection(sectionIds, useCallback((id: string) => setActive(id), []))

  return (
    <>
      {/* utility bar */}
      <div className="on-dark hidden bg-charcoal text-on-dark-muted md:block">
        <div className="container-page flex h-10 items-center justify-between gap-6">
          <p className="label-mono flex items-center gap-3 text-[0.625rem]">
            <span className="size-1.5 bg-signal" aria-hidden="true" />
            Contract manufacturing · {company.address.locality}, {company.address.region}
          </p>
          <div className="flex items-center gap-6 text-[0.75rem]">
            <a href={company.sales.href} className="inline-flex min-h-10 items-center gap-2 hover:text-on-dark">
              <Icon name="phone" className="size-3.5" />
              Sales {company.sales.display}
            </a>
            <button type="button" onClick={() => openLead('engineer')} className="inline-flex min-h-10 items-center gap-2 hover:text-on-dark">
              <Icon name="engineer" className="size-3.5" />
              Talk to an Engineer
            </button>
            <button type="button" onClick={() => openLead('brochure')} className="inline-flex min-h-10 items-center gap-2 hover:text-on-dark">
              <Icon name="download" className="size-3.5" />
              Brochure
            </button>
          </div>
        </div>
      </div>

      <header
        id="top"
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300 ${
          scrolled ? 'border-line bg-bone/90 backdrop-blur-md' : 'border-line/70 bg-bone'
        }`}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center">
              {primaryNav.map((item) => {
                const current = active === item.href.slice(1)
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      aria-current={current ? 'location' : undefined}
                      className={`relative inline-flex min-h-11 items-center px-3 text-[0.8125rem] font-medium transition-colors after:absolute after:inset-x-3 after:bottom-1.5 after:h-[2px] after:origin-left after:bg-signal after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100 xl:px-3.5 xl:after:inset-x-3.5 ${
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

          <div className="flex items-center gap-2">
            <Button variant="signal" size="sm" className="max-sm:hidden sm:min-h-11 sm:px-5" arrow onClick={() => requestQuote()}>
              Request a Quote
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              className="inline-flex min-h-11 items-center gap-2 border border-ink/25 px-4 text-[0.8125rem] font-medium text-ink transition-colors hover:border-ink lg:hidden"
            >
              <Icon name="menu" className="size-5" />
              Menu
            </button>
          </div>
        </div>

        <Dialog open={menuOpen} onClose={() => setMenuOpen(false)} labelledBy={menuTitle} variant="sheet">
          <div className="flex min-h-dvh flex-col p-6">
            <div className="flex items-center justify-between">
              <h2 id={menuTitle} className="label-mono text-muted">
                Menu
              </h2>
              <button type="button" onClick={() => setMenuOpen(false)} className="inline-flex size-11 items-center justify-center border border-line text-ink hover:border-ink">
                <Icon name="close" className="size-5" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-8">
              <ul className="border-t border-ink">
                {primaryNav.map((item, i) => (
                  <li key={item.label} className="border-b border-line">
                    <a href={item.href} onClick={() => setMenuOpen(false)} className="flex min-h-15 items-center gap-5 text-ink">
                      <span className="label-mono w-6 text-signal-deep">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-headline flex-1 text-[1.625rem]">{item.label}</span>
                      <Icon name="arrow-right" className="size-5 text-muted" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto grid gap-3 pt-10">
              <Button
                variant="signal"
                size="lg"
                arrow
                onClick={() => {
                  setMenuOpen(false)
                  requestQuote()
                }}
              >
                Request a Quote
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon="engineer"
                onClick={() => {
                  setMenuOpen(false)
                  openLead('engineer')
                }}
              >
                Talk to an Engineer
              </Button>
              <ButtonLink variant="secondary" size="lg" href={company.sales.href} icon="phone">
                Sales {company.sales.display}
              </ButtonLink>
            </div>
          </div>
        </Dialog>
      </header>
    </>
  )
}
