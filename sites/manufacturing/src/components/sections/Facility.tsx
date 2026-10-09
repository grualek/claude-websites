import { facility } from '../../content/site'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { SectionHeader } from '../ui/SectionHeader'

/** Annotated hotspots on the production-floor image (positions as % of the frame). */
const hotspots = [
  { label: 'Machining cells', x: 22, y: 64 },
  { label: 'Crane bay', x: 50, y: 30 },
  { label: 'Inspection lab', x: 77, y: 60 },
]

export function Facility() {
  return (
    <section id="facility" aria-labelledby="facility-title" className="py-24 lg:py-32">
      <div className="container-page">
        <SectionHeader
          index="07"
          eyebrow="About · Facility & technology"
          id="facility-title"
          title="Equipment, people and space to deliver."
          intro="A purpose-built production floor where engineering, machining, fabrication and quality work side by side, so problems get solved at the machine, not over email."
        />

        <figure className="relative mt-14 lg:mt-20" data-reveal>
          <div className="relative aspect-[4/3] overflow-hidden bg-concrete sm:aspect-[21/9]">
            <Media asset={facility.main} sizes="100vw" />
            {hotspots.map((h) => (
              <span key={h.label} className="absolute hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 sm:flex" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
                <span className="relative flex size-4 items-center justify-center" aria-hidden="true">
                  <span className="absolute inset-0 animate-ping bg-signal/50" />
                  <span className="relative size-2.5 bg-signal" />
                </span>
                <span className="label-mono bg-charcoal/85 px-2 py-1 text-[0.5625rem] text-on-dark">{h.label}</span>
              </span>
            ))}
          </div>
          <figcaption className="label-mono mt-3 flex justify-between text-[0.625rem] text-muted">
            <span>Fig. 07 — Production floor</span>
            <span className="hidden sm:inline">Illustrative</span>
          </figcaption>
        </figure>

        <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {facility.gallery.map((g) => (
            <li key={g.label} data-reveal>
              <figure>
                <div className="aspect-[4/3] overflow-hidden bg-charcoal">
                  <Media asset={g.image} sizes="(min-width: 1024px) 25vw, 50vw" className="transition-transform duration-700 hover:scale-[1.03]" />
                </div>
                <figcaption className="mt-3">
                  <span className="label-mono block text-[0.625rem] text-signal-deep">{g.label}</span>
                  <span className="mt-1 block text-[0.875rem] text-ink">{g.caption}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {facility.details.map((d) => (
            <li key={d.code} className="flex flex-col gap-5 bg-paper p-6" data-reveal>
              <div className="flex items-center justify-between">
                <span className="label-mono text-muted">{d.code}</span>
                <Icon name={d.icon} className="size-6 text-steel-deep" />
              </div>
              <div>
                <h3 className="font-headline text-[1.25rem]" style={{ letterSpacing: '-0.015em' }}>
                  {d.title}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">{d.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
