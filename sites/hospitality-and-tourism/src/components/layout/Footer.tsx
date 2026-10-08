import { footerNav, property } from '../../content/property'
import { email, useForm } from '../ui/Form'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'

export function Footer() {
  const { errors, submitted, onSubmit, onChange } = useForm({ newsletterEmail: (v) => email(v) })
  const year = new Date().getFullYear()

  return (
    <footer id="site-footer" className="on-dark bg-charcoal text-on-dark-muted">
      <div className="container-page grid gap-14 pt-20 pb-12 lg:grid-cols-12 lg:pt-28">
        <div className="lg:col-span-5">
          <Logo tone="light" />
          <p className="font-editorial mt-8 max-w-md text-[2rem] leading-[1.1] text-on-dark sm:text-[2.4rem]">Letters from the coast.</p>
          <p className="mt-3 max-w-md text-[0.9rem] leading-relaxed">Seasonal notes, new experiences and the occasional recipe — a few times a year, never more.</p>
          {submitted ? (
            <p role="status" className="mt-6 flex items-center gap-2 text-[0.9rem] font-semibold text-on-dark">
              <Icon name="check" className="size-5 text-clay-light" /> Thank you — you’re on the list.
            </p>
          ) : (
            <form onSubmit={onSubmit} onChange={onChange} noValidate className="mt-6 max-w-md">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="flex gap-2 border-b border-on-dark/30 focus-within:border-on-dark">
                <input
                  id="newsletter-email"
                  name="newsletterEmail"
                  type="email"
                  autoComplete="email"
                  placeholder="Your email address"
                  aria-invalid={errors.newsletterEmail ? true : undefined}
                  aria-describedby={errors.newsletterEmail ? 'newsletter-error' : undefined}
                  className="min-h-12 flex-1 bg-transparent text-[0.95rem] text-on-dark placeholder:text-on-dark-muted/70 focus:outline-none"
                />
                <button type="submit" className="inline-flex min-h-12 items-center gap-2 text-[0.8rem] font-semibold text-on-dark">
                  Subscribe <Icon name="arrow-right" className="size-4" />
                </button>
              </div>
              {errors.newsletterEmail && (
                <p id="newsletter-error" className="mt-2 text-xs font-semibold text-[#ffc9b8]">
                  {errors.newsletterEmail}
                </p>
              )}
            </form>
          )}
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-4 lg:col-start-7">
          {footerNav.map((group) => (
            <div key={group.title}>
              <h2 className="eyebrow text-on-dark/60">{group.title}</h2>
              <ul className="mt-5 space-y-1">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="inline-flex min-h-10 items-center text-[0.9rem] text-on-dark/85 transition-colors hover:text-on-dark">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <address className="text-[0.9rem] leading-relaxed not-italic lg:col-span-2">
          <h2 className="eyebrow text-on-dark/60">Visit</h2>
          <p className="mt-5">
            {property.address.street}
            <br />
            {property.address.locality}
            <br />
            {property.address.region}
          </p>
          <p className="mt-4">
            <a href={property.phone.href} className="block min-h-10 py-2 text-on-dark/85 hover:text-on-dark">
              {property.phone.display}
            </a>
            <a href={`mailto:${property.email}`} className="block min-h-10 py-2 break-all text-on-dark/85 hover:text-on-dark">
              {property.email}
            </a>
          </p>
          <a href={property.social.instagram} className="mt-3 inline-flex min-h-11 items-center gap-2 text-on-dark/85 hover:text-on-dark">
            <Icon name="instagram" className="size-5" /> Instagram
          </a>
        </address>
      </div>

      <div className="border-t border-charcoal-line">
        <div className="container-page flex flex-col gap-3 py-7 pb-28 text-xs sm:flex-row sm:items-center sm:justify-between md:pb-7">
          <p>
            © {year} {property.name}. Demo prototype — all property details, rates and reviews are fictional.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              ['Privacy', '#privacy'],
              ['Terms', '#terms'],
              ['Booking policies', '#faq'],
              ['Cookies', '#cookies'],
            ].map(([label, href]) => (
              <li key={label}>
                <a href={href} className="hover:text-on-dark">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
