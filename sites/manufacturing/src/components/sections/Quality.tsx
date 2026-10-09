import { certificationPlaceholders, qualityPillars } from '../../content/site'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { SectionHeader } from '../ui/SectionHeader'

/** Illustrative inspection record — characteristics are described, never given invented values. */
const reportRows = [
  ['01', 'Bore Ø C', 'CMM', 'Conforms'],
  ['02', 'Overall length B', 'CMM', 'Conforms'],
  ['03', 'Flatness, datum A', 'CMM', 'Conforms'],
  ['04', 'Surface finish', 'Profilometer', 'Conforms'],
  ['05', 'Material certificate', 'Review', 'Verified'],
]

function InspectionRecord() {
  return (
    <figure className="border border-graphite-line bg-graphite" aria-label="Example inspection record (illustrative)">
      <div className="flex items-center justify-between border-b border-graphite-line px-5 py-4">
        <div>
          <p className="label-mono text-[0.625rem] text-on-dark-muted">Inspection record</p>
          <p className="mt-1 font-mono text-[0.8125rem] text-on-dark">FV-0142 · Rev C · Lot 07</p>
        </div>
        <span className="label-mono inline-flex items-center gap-2 border border-signal/60 px-2.5 py-1.5 text-[0.5625rem] text-signal">
          <Icon name="check" className="size-3" />
          Released
        </span>
      </div>
      <table className="w-full text-left font-mono text-[0.75rem]">
        <thead>
          <tr className="label-mono text-[0.5625rem] text-on-dark-muted">
            <th scope="col" className="px-5 py-3 font-medium">
              #
            </th>
            <th scope="col" className="py-3 font-medium">
              Characteristic
            </th>
            <th scope="col" className="hidden py-3 font-medium sm:table-cell">
              Method
            </th>
            <th scope="col" className="px-5 py-3 text-right font-medium">
              Result
            </th>
          </tr>
        </thead>
        <tbody>
          {reportRows.map(([n, c, m, r]) => (
            <tr key={n} className="border-t border-graphite-line text-on-dark">
              <td className="px-5 py-3 text-on-dark-muted">{n}</td>
              <td className="py-3">{c}</td>
              <td className="hidden py-3 text-on-dark-muted sm:table-cell">{m}</td>
              <td className="px-5 py-3 text-right">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 bg-[#5fb07f]" aria-hidden="true" />
                  {r}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="flex flex-wrap justify-between gap-2 border-t border-graphite-line px-5 py-3 text-[0.6875rem] text-on-dark-muted">
        <span>Heat no. · Operator · Equipment · Date — linked per lot</span>
        <span className="label-mono text-[0.5625rem]">Illustrative example</span>
      </figcaption>
    </figure>
  )
}

export function Quality() {
  const { openDetail } = useApp()
  return (
    <section id="quality" aria-labelledby="quality-title" className="on-dark bg-charcoal py-24 text-on-dark-muted lg:py-32">
      <div className="container-page">
        <SectionHeader
          light
          index="06"
          eyebrow="Quality"
          id="quality-title"
          title="Quality is built into the process."
          intro="We don’t inspect quality in at the end. It is planned when we quote, controlled during production and recorded for every lot, so the evidence is there when you need it."
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <ul className="lg:col-span-6">
            {qualityPillars.map((q, i) => (
              <li key={q.title} className="grid grid-cols-[auto_1fr] gap-5 border-t border-graphite-line py-6 last:border-b" data-reveal>
                <span className="flex size-11 items-center justify-center border border-graphite-line text-signal">
                  <Icon name={q.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="flex items-baseline gap-3 text-on-dark">
                    <span className="label-mono text-[0.625rem] text-on-dark-muted">Q{i + 1}</span>
                    <span className="font-headline text-[1.25rem]" style={{ letterSpacing: '-0.015em' }}>
                      {q.title}
                    </span>
                  </h3>
                  <p className="mt-2 max-w-lg text-[0.875rem] leading-relaxed">{q.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-6 lg:pl-6" data-reveal>
            <InspectionRecord />

            <div className="mt-8">
              <p className="label-mono text-[0.625rem]">Certifications &amp; registrations</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {certificationPlaceholders.map((c) => (
                  <li key={c} className="flex flex-col gap-3 border border-dashed border-on-dark/25 p-4">
                    <Icon name="badge" className="size-6 text-on-dark-muted" />
                    <span className="text-[0.8125rem] text-on-dark">{c}</span>
                    <span className="label-mono text-[0.5625rem] text-signal">Demo placeholder</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.75rem]">
                Placeholders only. List your actual, current certificates and registrations here; the prototype makes no certification claims.
              </p>
              <Button variant="outline-light" className="mt-6" icon="doc" onClick={() => openDetail({ kind: 'resource', slug: 'certifications' })}>
                Quality documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
