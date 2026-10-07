import { useState, type FormEvent } from 'react'
import { company } from '../../content/company'
import { areas } from '../../content/areas'
import { useApp } from '../../state/AppState'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'

export function Footer() {
  const { runSearch, openEnquiry } = useApp()
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  const onSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = String(new FormData(e.currentTarget).get('email') ?? '')
    if (!/^\S+@\S+\.\S+$/.test(value)) return setError('Please enter a valid email address.')
    setError('')
    setSubscribed(true)
  }

  const columns: Array<{ title: string; links: Array<{ label: string; href?: string; onClick?: () => void }> }> = [
    {
      title: 'Property',
      links: [
        { label: 'Buy', onClick: () => runSearch({ listingType: 'sale' }) },
        { label: 'Rent', onClick: () => runSearch({ listingType: 'rent' }) },
        { label: 'Sell', href: '#sell' },
        { label: 'Property Management', href: '#management' },
        { label: 'Request a Valuation', onClick: () => openEnquiry('valuation') },
      ],
    },
    {
      title: 'Areas',
      links: areas.map((a) => ({ label: a.name, onClick: () => runSearch({ areaId: a.id }) })),
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Insights', href: '#insights' },
        { label: 'Services', href: '#services' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  ]

  const linkCls = 'inline-flex min-h-9 items-center text-sm text-paper/70 transition-colors hover:text-paper'

  return (
    <footer id="site-footer" className="bg-charcoal text-paper">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/65">{company.descriptor}. An independent property team serving {company.city} and the surrounding coast and countryside.</p>
            <address className="mt-6 text-sm leading-relaxed text-paper/70 not-italic">
              {company.address.street}, {company.address.locality} {company.address.postcode}
              <br />
              <a href={company.phone.href} className="hover:text-paper">
                {company.phone.display}
              </a>{' '}
              ·{' '}
              <a href={`mailto:${company.email}`} className="hover:text-paper">
                {company.email}
              </a>
            </address>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {columns.map((c) => (
              <div key={c.title}>
                <h2 className="eyebrow text-[0.6rem] text-paper/50">{c.title}</h2>
                <ul className="mt-4 space-y-0.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {l.href ? (
                        <a href={l.href} className={linkCls}>
                          {l.label}
                        </a>
                      ) : (
                        <button type="button" onClick={l.onClick} className={`${linkCls} text-left`}>
                          {l.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-[0.6rem] text-paper/50">Property alerts</h2>
            <p className="font-editorial mt-4 text-[1.75rem] leading-tight">New homes, in your inbox first.</p>
            {subscribed ? (
              <p role="status" className="mt-5 flex items-center gap-2 text-sm text-paper/80">
                <Icon name="check" className="size-4.5 text-[#c9c7a6]" /> You’re subscribed. We’ll be in touch.
              </p>
            ) : (
              <form noValidate onSubmit={onSubscribe} className="mt-5">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <div className="flex border-b border-paper/30 focus-within:border-paper">
                  <input
                    id="footer-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Your email address"
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? 'footer-email-error' : undefined}
                    className="min-h-12 w-full bg-transparent text-sm text-paper placeholder:text-paper/45 focus:outline-none"
                  />
                  <button type="submit" className="inline-flex min-h-12 items-center px-2 text-paper/80 hover:text-paper">
                    <Icon name="arrow-right" className="size-5" />
                    <span className="sr-only">Subscribe to property alerts</span>
                  </button>
                </div>
                {error && (
                  <p id="footer-email-error" className="mt-2 text-xs text-[#f0b8a8]">
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/15 pt-8 text-xs text-paper/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}. Demo prototype — all businesses, people and properties are fictional.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {['Privacy', 'Terms', 'Cookies', 'Complaints'].map((l) => (
              <li key={l}>
                <a id={l === 'Privacy' ? 'privacy' : undefined} href={`#${l.toLowerCase()}`} className="hover:text-paper">
                  {l}
                </a>
              </li>
            ))}
            {company.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="hover:text-paper">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
