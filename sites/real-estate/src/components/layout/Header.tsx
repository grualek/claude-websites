import { useEffect, useId, useState } from 'react'
import { company, primaryNav } from '../../content/company'
import { useApp } from '../../state/AppState'
import { Button, ButtonLink } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'

function UtilityBar() {
  const { saved, runSearch, openEnquiry } = useApp()
  return (
    <div id="top" className="border-b border-line-soft bg-ivory">
      <div className="container-page flex min-h-10 items-center justify-between gap-4 text-[0.75rem] text-muted">
        <p className="hidden sm:block">Independent estate agents, lettings &amp; property management in {company.city}</p>
        <ul className="flex w-full items-center justify-between gap-5 sm:w-auto sm:justify-end">
          <li>
            <a href={company.phone.href} className="inline-flex min-h-10 items-center gap-1.5 text-ink-soft hover:text-ink">
              <Icon name="phone" className="size-3.5" />
              {company.phone.display}
            </a>
          </li>
          <li className="hidden md:block">
            <button type="button" onClick={() => openEnquiry('valuation')} className="min-h-10 text-ink-soft hover:text-ink">
              Free valuation
            </button>
          </li>
          <li>
            <button type="button" onClick={() => openEnquiry('alerts')} className="inline-flex min-h-10 items-center gap-1.5 text-ink-soft hover:text-ink">
              <Icon name="bell" className="size-3.5" />
              Property alerts
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => runSearch({ savedOnly: true })}
              className="inline-flex min-h-10 items-center gap-1.5 text-ink-soft hover:text-ink"
              aria-label={`Saved homes: ${saved.length}`}
            >
              <Icon name={saved.length ? 'heart-filled' : 'heart'} className={`size-3.5 ${saved.length ? 'text-[#8c3b2e]' : ''}`} />
              Saved <span className="tabular-nums">({saved.length})</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export function Header() {
  const { runSearch } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuTitle = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /** Buy / Rent nav items pre-set the search mode before jumping to it. */
  const onNav = (label: string) => {
    if (label === 'Buy') runSearch({ listingType: 'sale' })
    else if (label === 'Rent') runSearch({ listingType: 'rent' })
  }

  return (
    <>
      <UtilityBar />
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled ? 'border-b border-line bg-ivory/90 backdrop-blur-md' : 'border-b border-transparent bg-ivory'
        }`}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <Logo />

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center">
              {primaryNav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.label === 'Buy' || item.label === 'Rent') {
                        e.preventDefault()
                        onNav(item.label)
                      }
                    }}
                    className="relative inline-flex min-h-11 items-center px-3 text-[0.875rem] font-medium text-ink-soft transition-colors after:absolute after:inset-x-3 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100 2xl:px-3.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button size="sm" className="max-sm:hidden sm:min-h-11 sm:px-5" icon="search" onClick={() => runSearch({})}>
              Find a Property
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              className="inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-ink/20 px-4 text-sm font-semibold text-ink transition-colors hover:bg-paper xl:hidden"
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
                className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink hover:bg-ivory"
              >
                <Icon name="close" className="size-5" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-6">
              <ul className="divide-y divide-line-soft border-y border-line-soft">
                {primaryNav.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        setMenuOpen(false)
                        if (item.label === 'Buy' || item.label === 'Rent') {
                          e.preventDefault()
                          onNav(item.label)
                        }
                      }}
                      className="font-editorial flex min-h-15 items-center justify-between text-[1.875rem] text-ink"
                    >
                      {item.label}
                      <Icon name="arrow-right" className="size-5 text-muted" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto grid gap-3 pt-8">
              <Button
                size="lg"
                icon="search"
                onClick={() => {
                  setMenuOpen(false)
                  runSearch({})
                }}
              >
                Find a Property
              </Button>
              <ButtonLink variant="secondary" size="lg" href={company.phone.href} icon="phone">
                Call {company.phone.display}
              </ButtonLink>
            </div>
          </div>
        </Dialog>
      </header>
    </>
  )
}
