import type { ReactNode } from 'react'
import { capabilities } from '../../content/capabilities'
import { company } from '../../content/company'
import { industries } from '../../content/industries'
import { productFamilies } from '../../content/products'
import { resources } from '../../content/resources'
import { routes } from '../../lib/routes'
import { useApp } from '../../state/AppState'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'

const linkCls = 'inline-flex min-h-9 items-center text-[0.8125rem] text-on-dark-muted transition-colors hover:text-on-dark'

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="label-mono border-b border-graphite-line pb-3 text-on-dark">{title}</h2>
      <ul className="mt-3">{children}</ul>
    </div>
  )
}

export function Footer() {
  const { openDetail, openLead, requestQuote } = useApp()
  const year = new Date().getFullYear()

  return (
    <footer className="on-dark bg-charcoal pb-24 text-on-dark-muted md:pb-0">
      <div className="container-page pt-20">
        <div className="grid gap-12 border-b border-graphite-line pb-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-sm text-[0.875rem] leading-relaxed">
              Precision machining, fabrication, assembly and inspection for OEMs and industrial manufacturers. Engineering-led, quality-built.
            </p>
            <address className="mt-8 space-y-2 text-[0.8125rem] not-italic">
              <p className="flex items-start gap-3">
                <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-signal" />
                {company.address.street}, {company.address.locality}, {company.address.region} {company.address.postalCode}
              </p>
              <p className="flex items-center gap-3">
                <Icon name="phone" className="size-4 shrink-0 text-signal" />
                <a href={company.phone.href} className="hover:text-on-dark">
                  {company.phone.display}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Icon name="mail" className="size-4 shrink-0 text-signal" />
                <a href={`mailto:${company.email}`} className="hover:text-on-dark">
                  {company.email}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Icon name="clock" className="size-4 shrink-0 text-signal" />
                {company.hours[0].label}
              </p>
            </address>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4">
            <Column title="Capabilities">
              {capabilities.map((c) => (
                <li key={c.slug}>
                  <a href={routes.capability(c)} onClick={(e) => (e.preventDefault(), openDetail({ kind: 'capability', slug: c.slug }))} className={linkCls}>
                    {c.title}
                  </a>
                </li>
              ))}
            </Column>
            <Column title="Industries">
              {industries.map((i) => (
                <li key={i.slug}>
                  <a href={routes.industry(i)} onClick={(e) => (e.preventDefault(), openDetail({ kind: 'industry', slug: i.slug }))} className={linkCls}>
                    {i.title}
                  </a>
                </li>
              ))}
            </Column>
            <Column title="Products">
              {productFamilies.map((p) => (
                <li key={p.slug}>
                  <a href={routes.product(p)} onClick={(e) => (e.preventDefault(), openDetail({ kind: 'product', slug: p.slug }))} className={linkCls}>
                    {p.title}
                  </a>
                </li>
              ))}
            </Column>
            <div className="grid content-start gap-10">
              <Column title="Quality">
                <li>
                  <a href="#quality" className={linkCls}>
                    Quality approach
                  </a>
                </li>
                <li>
                  <a href={routes.certifications} onClick={(e) => (e.preventDefault(), openDetail({ kind: 'resource', slug: 'certifications' }))} className={linkCls}>
                    Certifications
                  </a>
                </li>
              </Column>
              <Column title="Resources">
                {resources.slice(0, 3).map((r) => (
                  <li key={r.slug}>
                    <a href={routes.resource(r)} onClick={(e) => (e.preventDefault(), openDetail({ kind: 'resource', slug: r.slug }))} className={linkCls}>
                      {r.title}
                    </a>
                  </li>
                ))}
              </Column>
            </div>
            <Column title="Company">
              <li>
                <a href="#facility" className={linkCls}>
                  About & facility
                </a>
              </li>
              <li>
                <a href="#projects" className={linkCls}>
                  Case studies
                </a>
              </li>
              <li>
                <a href={routes.location(company.city)} className={linkCls}>
                  Locations
                </a>
              </li>
              <li>
                <a href="#careers" className={linkCls}>
                  Careers
                </a>
              </li>
            </Column>
            <Column title="Contact">
              <li>
                <button type="button" onClick={() => requestQuote()} className={linkCls}>
                  Request a Quote
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openLead('engineer')} className={linkCls}>
                  Talk to an Engineer
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openLead('sales')} className={linkCls}>
                  Contact Sales
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openLead('brochure')} className={linkCls}>
                  Download Brochure
                </button>
              </li>
            </Column>
          </nav>
        </div>

        <div className="flex flex-col gap-4 py-8 text-[0.75rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. Demo prototype — company, projects and certifications are fictional placeholders.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            <li>
              <a id="privacy" href="#privacy" className={linkCls}>
                Privacy
              </a>
            </li>
            <li>
              <a href="#terms" className={linkCls}>
                Terms
              </a>
            </li>
            <li>
              <a href="#top" className={`${linkCls} gap-2`}>
                Back to top <Icon name="arrow-up-right" className="size-3.5 -rotate-45" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
