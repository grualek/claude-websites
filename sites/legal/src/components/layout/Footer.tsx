import type { ReactNode } from 'react'
import { attorneys } from '../../content/attorneys'
import { disclaimer, firm } from '../../content/firm'
import { practiceAreas } from '../../content/practices'
import { useApp } from '../../state/AppState'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'

const linkCls = 'inline-flex min-h-9 items-center text-left text-[0.875rem] text-on-dark-muted transition-colors hover:text-on-dark'

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow text-bronze">{title}</h2>
      <ul className="mt-5 space-y-1">{children}</ul>
    </div>
  )
}

export function Footer() {
  const { openDetail } = useApp()
  const year = new Date().getFullYear()
  return (
    <footer className="on-dark bg-espresso text-on-dark-muted" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Site footer
      </h2>
      <div className="container-page pt-20 pb-28 md:pb-10 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <address className="mt-8 space-y-3 text-[0.875rem] not-italic leading-relaxed">
              <p className="flex gap-3">
                <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-bronze" />
                <span>
                  {firm.address.street}
                  <br />
                  {firm.address.locality}
                </span>
              </p>
              <p>
                <a href={firm.phone.href} className="flex items-center gap-3 hover:text-on-dark">
                  <Icon name="phone" className="size-4 shrink-0 text-bronze" />
                  {firm.phone.display}
                </a>
              </p>
              <p>
                <a href={`mailto:${firm.email}`} className="flex items-center gap-3 hover:text-on-dark">
                  <Icon name="mail" className="size-4 shrink-0 text-bronze" />
                  {firm.email}
                </a>
              </p>
              <p className="flex gap-3">
                <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-bronze" />
                <span>
                  {firm.hours.map((h) => (
                    <span key={h.label} className="block">
                      {h.label}: {h.value}
                    </span>
                  ))}
                </span>
              </p>
            </address>
          </div>

          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <Column title="Practice Areas">
              {practiceAreas.map((p) => (
                <li key={p.slug}>
                  <button type="button" className={linkCls} onClick={() => openDetail({ kind: 'practice', slug: p.slug })}>
                    {p.title}
                  </button>
                </li>
              ))}
            </Column>
            <Column title="Attorneys">
              {attorneys.map((a) => (
                <li key={a.slug}>
                  <button type="button" className={linkCls} onClick={() => openDetail({ kind: 'attorney', slug: a.slug })}>
                    {a.name}
                  </button>
                </li>
              ))}
              <li>
                <a href="#attorneys" className={linkCls}>
                  All attorneys
                </a>
              </li>
            </Column>
            <Column title="Firm">
              {[
                ['About', '#about'],
                ['How we work', '#approach'],
                ['Insights', '#insights'],
                ['Client perspective', '#experience'],
                ['FAQ', '#faq'],
                ['Contact', '#contact'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className={linkCls}>
                    {label}
                  </a>
                </li>
              ))}
            </Column>
          </nav>
        </div>

        <div className="mt-16 border-t border-espresso-line pt-8">
          <p className="max-w-4xl text-[0.8125rem] leading-relaxed">
            <strong className="font-semibold text-on-dark">Disclaimer.</strong> {disclaimer} Contacting the firm does not create an attorney-client relationship;
            please do not send confidential information until an engagement has been confirmed in writing. Prior results do not guarantee a similar outcome.
            Attorney advertising.
          </p>
          <p className="mt-4 text-xs text-on-dark-muted/80">
            Demo prototype: {firm.name}, its attorneys, address, testimonials and contact details are fictional placeholders.
          </p>
          <div className="mt-8 flex flex-col gap-4 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {firm.legalName}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {['Privacy', 'Terms', 'Accessibility', 'Cookie preferences'].map((l) => (
                <li key={l}>
                  <a id={l === 'Privacy' ? 'privacy' : undefined} href="#top" className="inline-flex min-h-9 items-center hover:text-on-dark">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
