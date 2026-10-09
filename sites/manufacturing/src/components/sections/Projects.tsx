import { caseStudies } from '../../content/caseStudies'
import { routes } from '../../lib/routes'
import { useApp } from '../../state/AppState'
import { ArrowChip } from '../ui/Button'
import { Media } from '../ui/Media'
import { SectionHeader } from '../ui/SectionHeader'

export function Projects() {
  const { openDetail } = useApp()
  return (
    <section id="projects" aria-labelledby="projects-title" className="bg-paper py-24 lg:py-32">
      <div className="container-page">
        <SectionHeader
          index="08"
          eyebrow="Case studies · Projects"
          id="projects-title"
          title="Programs we have taken from drawing to delivery."
          intro="Representative demo projects showing how engineering, production and quality work together. Customer names are withheld; details are illustrative."
        />

        <ul className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {caseStudies.map((c, i) => (
            <li key={c.slug} data-reveal>
              <article className="group flex h-full flex-col border-t-2 border-ink">
                <a
                  href={routes.caseStudy(c)}
                  onClick={(e) => {
                    e.preventDefault()
                    openDetail({ kind: 'case', slug: c.slug })
                  }}
                  className="flex h-full flex-col"
                >
                  <div className="flex items-center justify-between py-4">
                    <span className="label-mono text-signal-deep">Project {String(i + 1).padStart(2, '0')}</span>
                    <span className="label-mono text-[0.625rem] text-muted">
                      {c.industry} · {c.capability}
                    </span>
                  </div>
                  <div className="aspect-[4/3] overflow-hidden bg-charcoal">
                    <Media asset={c.image} sizes="(min-width: 1024px) 33vw, 100vw" className="transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <h3 className="font-headline mt-6 text-[1.625rem] lg:min-h-[3.25rem]" style={{ letterSpacing: '-0.02em' }}>
                    {c.title}
                  </h3>
                  <dl className="mt-5 flex-1 divide-y divide-line border-y border-line">
                    {(
                      [
                        ['Challenge', c.challenge],
                        ['Approach', c.approach],
                        ['Result', c.result],
                      ] as const
                    ).map(([k, v]) => (
                      <div key={k} className="grid gap-1 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                        <dt className={`label-mono pt-0.5 text-[0.625rem] ${k === 'Result' ? 'text-signal-deep' : 'text-muted'}`}>{k}</dt>
                        <dd className="text-[0.875rem] leading-relaxed text-ink-soft">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[0.875rem] font-medium text-ink">Read case study</span>
                    <ArrowChip />
                  </div>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
