import { capabilities } from '../../content/capabilities'
import { routes } from '../../lib/routes'
import { useApp } from '../../state/AppState'
import { ArrowChip, Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { SectionHeader } from '../ui/SectionHeader'

export function Capabilities() {
  const { openDetail, openLead } = useApp()
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="py-24 lg:py-32">
      <div className="container-page">
        <SectionHeader
          index="01"
          eyebrow="Capabilities"
          id="capabilities-title"
          title="Eight disciplines. One controlled process."
          intro="Machining, fabrication, assembly and inspection under one roof and one quality system, so programs move from drawing to delivery without hand-offs between suppliers."
          action={
            <Button variant="secondary" icon="download" onClick={() => openLead('brochure')}>
              Download capabilities brochure
            </Button>
          }
        />

        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {capabilities.map((c) => (
            <li key={c.slug} className="bg-bone" data-reveal>
              <a
                href={routes.capability(c)}
                onClick={(e) => {
                  e.preventDefault()
                  openDetail({ kind: 'capability', slug: c.slug })
                }}
                className="group relative flex h-full min-h-[19rem] flex-col p-6 transition-colors duration-200 hover:bg-paper lg:p-7"
              >
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100" />
                <div className="flex items-start justify-between">
                  <span className="font-headline text-[3.25rem] leading-none text-ink/15 tabular-nums transition-colors group-hover:text-steel">{c.code}</span>
                  <Icon name={c.icon} className="size-7 text-ink" />
                </div>
                <h3 className="font-headline mt-10 text-[1.5rem]" style={{ letterSpacing: '-0.02em' }}>
                  {c.title}
                </h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">{c.summary}</p>
                <div className="mt-auto flex items-end justify-between pt-8">
                  <span className="label-mono text-[0.625rem] text-muted">View capability</span>
                  <ArrowChip />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
