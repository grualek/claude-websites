import { industries } from '../../content/industries'
import { routes } from '../../lib/routes'
import { useApp } from '../../state/AppState'
import { ArrowChip, ButtonLink } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { SectionHeader } from '../ui/SectionHeader'

export function Industries() {
  const { openDetail } = useApp()
  return (
    <section id="industries" aria-labelledby="industries-title" className="py-24 lg:py-32">
      <div className="container-page">
        <SectionHeader
          index="04"
          eyebrow="Industries served"
          id="industries-title"
          title="Built for sectors where failure is not an option."
          intro="Different industries ask different things of a supplier. We adapt documentation, inspection and logistics to the standards your sector expects."
          action={
            <ButtonLink variant="secondary" href="#projects" arrow>
              See project examples
            </ButtonLink>
          }
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <li key={ind.slug} data-reveal>
              <a
                href={routes.industry(ind)}
                onClick={(e) => {
                  e.preventDefault()
                  openDetail({ kind: 'industry', slug: ind.slug })
                }}
                className="group flex h-full min-h-[15rem] flex-col border border-line bg-paper p-6 transition-[border-color,background-color] duration-200 hover:border-charcoal hover:bg-charcoal"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center bg-concrete text-ink transition-colors group-hover:bg-signal group-hover:text-charcoal">
                    <Icon name={ind.icon} className="size-6" />
                  </span>
                  <span className="label-mono text-muted transition-colors group-hover:text-on-dark-muted">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-headline mt-8 text-[1.375rem] transition-colors group-hover:text-on-dark" style={{ letterSpacing: '-0.02em' }}>
                  {ind.title}
                </h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-muted transition-colors group-hover:text-on-dark-muted">{ind.summary}</p>
                <div className="mt-auto flex justify-end pt-6">
                  <ArrowChip className="group-hover:border-signal group-hover:bg-signal group-hover:text-charcoal" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
