import { clinic, fullAddress } from '../../content/clinic'
import { services } from '../../content/services'
import { infoTopics, legalPages } from '../../content/patients'
import { Logo } from './Logo'
import { useDialogs } from '../dialogs/DialogProvider'

const linkClass = 'inline-flex min-h-9 items-center text-left text-paper/75 transition-colors hover:text-paper hover:underline underline-offset-4'

export function Footer() {
  const { openService, openInfo } = useDialogs()
  return (
    <footer id="site-footer" className="bg-ink text-paper/75">
      <div className="container-page pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm leading-relaxed">{clinic.shortDescription}</p>
            <address className="mt-6 space-y-1 text-[0.9375rem] not-italic">
              <p>{fullAddress}</p>
              <p>
                <a className="text-paper underline-offset-4 hover:underline" href={clinic.phone.href}>
                  {clinic.phone.display}
                </a>
                {' · '}
                <a className="text-paper underline-offset-4 hover:underline" href={`mailto:${clinic.email}`}>
                  {clinic.email}
                </a>
              </p>
            </address>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            <FooterColumn title="Services">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <button type="button" className={linkClass} onClick={() => openService(s)}>
                    {s.name}
                  </button>
                </li>
              ))}
            </FooterColumn>
            <FooterColumn title="Patients">
              {infoTopics
                .filter((t) => !t.href)
                .map((t) => (
                  <li key={t.id}>
                    <button type="button" className={linkClass} onClick={() => openInfo(t)}>
                      {t.title}
                    </button>
                  </li>
                ))}
            </FooterColumn>
            <FooterColumn title="About">
              <li><a className={linkClass} href="#about">Our approach</a></li>
              <li><a className={linkClass} href="#specialists">Specialists</a></li>
              <li><a className={linkClass} href="#contact">Location &amp; hours</a></li>
            </FooterColumn>
            <FooterColumn title="Resources">
              <li><a className={linkClass} href="#faq">FAQ</a></li>
              <li><a className={linkClass} href="#patient-information">Patient information</a></li>
              <li><a className={linkClass} href="#contact">Contact</a></li>
            </FooterColumn>
          </nav>
        </div>

        <div className="mt-14 rounded-3xl border border-paper/15 p-6 sm:p-7">
          <p className="text-[0.9375rem] leading-relaxed text-paper/85">
            <strong className="font-semibold text-paper">Medical disclaimer: </strong>
            {clinic.emergencyDisclaimer}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-paper/15 pt-8 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {clinic.legalName}. {clinic.demoNotice}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {legalPages.map((page) => (
              <li key={page.id}>
                <button type="button" className={linkClass} onClick={() => openInfo(page)}>
                  {page.title.replace(/ (policy|statement|of use)$/, '').replace(/^\w/, (c) => c.toUpperCase())}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold tracking-[0.08em] text-paper uppercase">{title}</h2>
      <ul className="mt-5 space-y-1.5 text-[0.9375rem]">{children}</ul>
    </div>
  )
}
