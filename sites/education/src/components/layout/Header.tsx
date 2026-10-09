import { useCallback, useEffect, useId, useState } from 'react'
import { institution, primaryNav } from '../../content/institution'
import type { EnquiryIntent } from '../../content/types'
import { useActiveSection } from '../../lib/useReveal'
import { useApp } from '../../state/AppState'
import { Button, ButtonLink } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Icon } from '../ui/Icon'
import { WithPlaceholders } from '../ui/Text'
import { Logo } from './Logo'
import { hero } from '../../content/site'

const sectionIds = primaryNav.map((n) => n.href.slice(1))

export const secondaryActions: { label: string; intent: EnquiryIntent }[] = [
  { label: 'Apply Now', intent: 'apply' },
  { label: 'Book a Visit', intent: 'visit' },
  { label: 'Request Information', intent: 'info' },
  { label: 'Talk to Admissions', intent: 'talk' },
  { label: 'Download Prospectus', intent: 'prospectus' },
]

/**
 * Navy utility bar with every secondary conversion, then a sticky cream bar with the primary navigation
 * and the "Explore Programs" CTA. Below `xl` the navigation moves into a full-height menu sheet.
 */
export function Header() {
  const { explore, enquire } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const menuTitle = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useActiveSection(sectionIds, useCallback((id: string) => setActive(id), []))

  return (
    <>
      <div id="top" className="on-dark bg-navy text-on-dark">
        <div className="container-page flex min-h-11 items-center justify-between gap-6 text-[0.8rem]">
          <p className="flex items-center gap-2.5 text-on-dark-muted">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-sun" />
            <WithPlaceholders text={hero.eyebrow} />
          </p>
          <nav aria-label="Admissions shortcuts" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {secondaryActions.map((a) => (
                <li key={a.intent}>
                  <button type="button" onClick={() => enquire(a.intent)} className="inline-flex min-h-11 items-center px-3 font-medium text-on-dark/85 transition-colors hover:text-sun">
                    {a.label}
                  </button>
                </li>
              ))}
              <li className="ml-2 border-l border-navy-line pl-4">
                <a href={institution.phone.href} className="inline-flex min-h-11 items-center gap-2 font-medium text-on-dark/85 hover:text-sun">
                  <Icon name="phone" className="size-4" />
                  {institution.phone.display}
                </a>
              </li>
            </ul>
          </nav>
          <a href={institution.phone.href} className="inline-flex min-h-11 items-center gap-2 font-medium text-on-dark/85 hover:text-sun lg:hidden">
            <Icon name="phone" className="size-4" />
            <span className="max-sm:sr-only">Call admissions</span>
          </a>
        </div>
      </div>

      <header className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ${scrolled ? 'border-line bg-cream/92 shadow-[0_10px_30px_-24px_rgb(20_33_58/0.5)] backdrop-blur-md' : 'border-transparent bg-cream'}`}>
        <div className={`container-page flex items-center justify-between gap-6 transition-[height] duration-300 ${scrolled ? 'h-[4.25rem]' : 'h-[5.25rem]'}`}>
          <Logo />

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center">
              {primaryNav.map((item) => {
                const current = active === item.href.slice(1)
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      aria-current={current ? 'location' : undefined}
                      className={`relative inline-flex min-h-11 items-center px-3 text-[0.9rem] font-medium transition-colors after:absolute after:inset-x-3 after:bottom-1.5 after:h-[2px] after:origin-left after:rounded-full after:bg-sun after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100 ${
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
            <Button size="sm" className="max-sm:hidden sm:min-h-11" arrow onClick={() => explore()}>
              Explore Programs
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 px-4 text-[0.88rem] font-semibold text-ink transition-colors hover:border-ink xl:hidden"
            >
              <Icon name="menu" className="size-5" />
              Menu
            </button>
          </div>
        </div>
      </header>

      <Dialog open={menuOpen} onClose={() => setMenuOpen(false)} labelledBy={menuTitle} variant="sheet">
        <div className="flex min-h-dvh flex-col p-6">
          <div className="flex items-center justify-between">
            <h2 id={menuTitle} className="eyebrow text-muted">
              Menu
            </h2>
            <button type="button" onClick={() => setMenuOpen(false)} className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink hover:border-ink">
              <Icon name="close" className="size-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-4">
            <ul className="border-t border-line">
              {primaryNav.map((item) => (
                <li key={item.label} className="border-b border-line">
                  <a href={item.href} onClick={() => setMenuOpen(false)} className="flex min-h-14 items-center gap-4 text-ink">
                    <span className="font-editorial flex-1 text-[1.75rem]">{item.label}</span>
                    <Icon name="arrow-right" className="size-5 text-muted" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 grid grid-cols-2 gap-2">
            {secondaryActions.slice(1).map((a) => (
              <button
                key={a.intent}
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  enquire(a.intent)
                }}
                className="min-h-12 rounded-xl border border-line bg-cream px-3 text-left text-[0.85rem] font-semibold text-ink hover:border-ink"
              >
                {a.label}
              </button>
            ))}
          </div>
          <div className="mt-auto grid gap-3 pt-8">
            <Button
              size="lg"
              arrow
              onClick={() => {
                setMenuOpen(false)
                explore()
              }}
            >
              Explore Programs
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                setMenuOpen(false)
                enquire('apply')
              }}
            >
              Apply Now
            </Button>
            <ButtonLink variant="secondary" size="md" href={institution.phone.href} icon="phone" className="border-transparent">
              {institution.phone.display}
            </ButtonLink>
          </div>
        </div>
      </Dialog>
    </>
  )
}
