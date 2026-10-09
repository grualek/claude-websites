import { institution } from '../../content/institution'
import { categories } from '../../content/programs'
import { useApp } from '../../state/AppState'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'

const linkCls = 'inline-flex min-h-10 items-center text-[0.92rem] text-on-dark-muted transition-colors hover:text-sun'

/** Footer with every primary destination, the admissions actions and the legal links. */
export function Footer() {
  const { explore, enquire } = useApp()
  const columns = [
    {
      title: 'Programs',
      links: categories.map((c) => ({ label: c, onClick: () => explore({ category: c }) })),
    },
    {
      title: 'Admissions',
      links: [
        { label: 'How to apply', href: '#admissions' },
        { label: 'Apply Now', onClick: () => enquire('apply') },
        { label: 'Book a Visit', onClick: () => enquire('visit') },
        { label: 'Download Prospectus', onClick: () => enquire('prospectus') },
        { label: 'FAQs', href: '#faq' },
      ],
    },
    {
      title: 'College',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Campus', href: '#campus' },
        { label: 'Student Life', href: '#student-life' },
        { label: 'Faculty', href: '#faculty' },
        { label: 'Student stories', href: '#stories' },
      ],
    },
    {
      title: 'Explore',
      links: [
        { label: 'Resources', href: '#resources' },
        { label: 'News', href: '#news' },
        { label: 'Events', href: '#news' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  ]
  return (
    <footer id="site-footer" className="on-dark mt-16 bg-navy text-on-dark">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-on-dark-muted">
            {institution.name} is an {institution.descriptor.toLowerCase()} in {institution.address.locality}, teaching undergraduate, postgraduate, professional and online learners since {institution.founded}.
          </p>
          <address className="mt-6 space-y-1 text-[0.92rem] not-italic text-on-dark-muted">
            <p>
              {institution.address.street}, {institution.address.locality} {institution.address.postalCode}
            </p>
            <a href={institution.phone.href} className="block hover:text-sun">
              {institution.phone.display}
            </a>
            <a href={`mailto:${institution.generalEmail}`} className="block hover:text-sun">
              {institution.generalEmail}
            </a>
          </address>
          <ul className="mt-6 flex gap-2">
            {institution.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex size-11 items-center justify-center rounded-full border border-navy-line text-on-dark transition-colors hover:border-sun hover:text-sun">
                  <Icon name={s.icon} className="size-5" />
                  <span className="sr-only">{s.label} (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
          {columns.map((c) => (
            <div key={c.title}>
              <h2 className="eyebrow text-sun">{c.title}</h2>
              <ul className="mt-4">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {'href' in l && l.href ? (
                      <a href={l.href} className={linkCls}>
                        {l.label}
                      </a>
                    ) : (
                      <button type="button" onClick={'onClick' in l ? l.onClick : undefined} className={`${linkCls} text-left`}>
                        {l.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-navy-line">
        <div className="container-page flex flex-col gap-4 py-6 text-[0.84rem] text-on-dark-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {institution.name}. Demo prototype — all names, people and details are fictional.
          </p>
          <ul className="flex flex-wrap gap-x-6">
            {['Privacy', 'Accessibility', 'Terms', 'Cookies'].map((l) => (
              <li key={l}>
                <a id={l === 'Privacy' ? 'privacy' : undefined} href={`#${l.toLowerCase()}`} className="inline-flex min-h-10 items-center hover:text-sun">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
