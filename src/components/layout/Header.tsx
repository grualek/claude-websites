import { useEffect, useId, useState } from 'react'
import { clinic, primaryNav } from '../../content/clinic'
import { Button, ButtonLink } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Icon } from '../ui/Icon'
import { useDialogs } from '../dialogs/DialogProvider'
import { Logo } from './Logo'

export function AnnouncementBar() {
  return (
    <div id="top" className="bg-blue-deep text-paper">
      <div className="container-page flex min-h-10 items-center justify-center gap-3 py-2 text-center text-[0.8125rem] sm:justify-between">
        <p className="flex items-center gap-2.5">
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inset-0 rounded-full bg-sage" />
          </span>
          {clinic.announcement}
        </p>
        <a href={clinic.phone.href} className="hidden items-center gap-2 text-paper/85 underline-offset-4 hover:text-paper hover:underline sm:inline-flex">
          <Icon name="phone" className="size-3.5" />
          {clinic.phone.display}
        </a>
      </div>
    </div>
  )
}

export function Header() {
  const { openBooking } = useDialogs()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuTitle = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled ? 'border-b border-line-soft bg-ivory/92 shadow-[0_8px_30px_-24px_rgb(20_33_58/0.5)] backdrop-blur-md' : 'border-b border-transparent bg-ivory'
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Logo />

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative inline-flex min-h-11 items-center px-3.5 text-[0.9375rem] text-ink-soft transition-colors after:absolute after:inset-x-3.5 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={clinic.phone.href}
            className="hidden min-h-11 items-center gap-2 px-3 text-[0.9375rem] font-medium text-ink lg:inline-flex xl:hidden 2xl:inline-flex"
          >
            <Icon name="phone" className="size-4" />
            <span>{clinic.phone.display}</span>
          </a>
          <Button size="sm" className="max-sm:hidden sm:min-h-11 sm:px-5" onClick={() => openBooking()}>
            Book an Appointment
          </Button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/15 px-4 text-sm font-medium text-ink transition-colors hover:bg-paper xl:hidden"
          >
            <Icon name="menu" className="size-5" />
            Menu
          </button>
        </div>
      </div>

      <Dialog open={menuOpen} onClose={() => setMenuOpen(false)} labelledBy={menuTitle} variant="sheet">
        <div className="flex min-h-dvh flex-col p-6">
          <div className="flex items-center justify-between">
            <h2 id={menuTitle} className="text-sm font-medium tracking-[0.08em] text-muted uppercase">
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
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display-tight flex min-h-16 items-center justify-between text-[1.625rem] font-[380] text-ink"
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
              onClick={() => {
                setMenuOpen(false)
                openBooking()
              }}
            >
              Book an Appointment
            </Button>
            <ButtonLink variant="secondary" size="lg" href={clinic.phone.href} icon="phone">
              Call {clinic.phone.display}
            </ButtonLink>
          </div>
        </div>
      </Dialog>
    </header>
  )
}

/** Mobile-only persistent booking bar that appears once the hero CTA scrolls away. */
export function MobileBookingBar() {
  const { openBooking } = useDialogs()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = document.getElementById('hero-ctas')
    const footer = document.getElementById('site-footer')
    if (!target || !('IntersectionObserver' in window)) return
    let heroVisible = true
    let footerVisible = false
    const update = () => setVisible(!heroVisible && !footerVisible)
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === target) heroVisible = e.isIntersecting || e.boundingClientRect.top > 0
        if (e.target === footer) footerVisible = e.isIntersecting
      }
      update()
    })
    io.observe(target)
    if (footer) io.observe(footer)
    return () => io.disconnect()
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line-soft bg-ivory/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 ease-calm md:hidden ${
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="flex gap-2.5">
        <ButtonLink href={clinic.phone.href} variant="secondary" className="flex-none px-4!" aria-label={`Call ${clinic.phone.display}`}>
          <Icon name="phone" className="size-5" />
        </ButtonLink>
        <Button className="flex-1" onClick={() => openBooking()}>
          Book an Appointment
        </Button>
      </div>
    </div>
  )
}
