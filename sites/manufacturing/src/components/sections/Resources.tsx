import { faqs, resources } from '../../content/resources'
import { routes } from '../../lib/routes'
import { useApp } from '../../state/AppState'
import { ArrowChip, Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { SectionHeader } from '../ui/SectionHeader'

export function Resources() {
  const { openDetail, openLead } = useApp()
  return (
    <section id="resources" aria-labelledby="resources-title" className="py-24 lg:py-32">
      <div className="container-page">
        <SectionHeader
          index="09"
          eyebrow="Resources"
          id="resources-title"
          title="Technical information for engineers and buyers."
          intro="Design guidance, documentation and answers that help you specify better parts and onboard us as a supplier faster."
          action={
            <Button variant="primary" icon="download" onClick={() => openLead('brochure')}>
              Download Brochure
            </Button>
          }
        />

        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {resources.map((r) => {
            const count = r.slug === 'faqs' ? faqs.length : r.items.length
            return (
              <li key={r.slug} className="bg-bone" data-reveal>
                <a
                  href={routes.resource(r)}
                  onClick={(e) => {
                    e.preventDefault()
                    openDetail({ kind: 'resource', slug: r.slug })
                  }}
                  className="group flex h-full min-h-[14rem] flex-col p-6 transition-colors hover:bg-paper lg:p-8"
                >
                  <div className="flex items-start justify-between">
                    <Icon name={r.icon} className="size-8 text-ink" />
                    <span className="label-mono text-[0.625rem] text-muted">
                      {count} {r.slug === 'faqs' ? 'questions' : 'items'}
                    </span>
                  </div>
                  <h3 className="font-headline mt-8 text-[1.375rem]" style={{ letterSpacing: '-0.02em' }}>
                    {r.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-[0.875rem] leading-relaxed text-muted">{r.summary}</p>
                  <div className="mt-auto flex justify-end pt-6">
                    <ArrowChip />
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
