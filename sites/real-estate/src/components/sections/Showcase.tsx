import { showcaseProperty as p } from '../../content/properties'
import { getArea } from '../../content/areas'
import { getAgent } from '../../content/company'
import { formatArea, formatPrice, propertyTypeLabel, sqm } from '../../lib/format'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { Eyebrow } from '../ui/SectionHeader'

/** Editorial "Featured Residence" spread for the agency's flagship listing. */
export function Showcase() {
  const { openProperty, openEnquiry } = useApp()
  const area = getArea(p.address.areaId)
  const agent = getAgent(p.agentId)
  const details = [
    { label: 'Bedrooms', value: String(p.bedrooms) },
    { label: 'Bathrooms', value: String(p.bathrooms) },
    { label: 'Receptions', value: String(p.receptions ?? '—') },
    { label: 'Interior', value: `${formatArea(p.floorArea)}`, sub: sqm(p.floorArea) },
    { label: 'Plot', value: p.plot ?? '—' },
    { label: 'Tenure', value: p.tenure ?? '—', sub: p.epc ? `EPC ${p.epc}` : undefined },
  ]

  return (
    <section aria-labelledby="showcase-title" className="py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-5">
          <Eyebrow>
            <span className="tabular-nums">03</span> <span aria-hidden>—</span> Featured residence
          </Eyebrow>
          <p className="eyebrow text-[0.65rem] text-muted">
            {area?.name} · {p.address.city}
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Imagery */}
          <div className="lg:col-span-7">
            <div className="aspect-[4/5] overflow-hidden rounded-[3px] bg-sand sm:aspect-[5/4]">
              <Media asset={p.images[0]} sizes="(min-width: 1024px) 58vw, 100vw" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {p.images.slice(1, 4).map((img) => (
                <div key={img.alt} className="aspect-[4/3] overflow-hidden rounded-[3px] bg-sand">
                  <Media asset={img} sizes="20vw" />
                </div>
              ))}
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-5 lg:pt-4">
            <p className="eyebrow text-[0.65rem] text-olive">
              {p.status} · {propertyTypeLabel[p.propertyType]}
            </p>
            <h2 id="showcase-title" className="font-editorial mt-4 text-[3.25rem] sm:text-[4.25rem] lg:text-[4.75rem]">
              {p.title}
            </h2>
            <p className="mt-3 flex items-center gap-2 text-[0.9375rem] text-muted">
              <Icon name="pin" className="size-4.5" />
              {p.address.line}, {area?.name}, {p.address.postcode}
            </p>

            <p className="font-editorial mt-8 text-[1.625rem] leading-snug text-ink-soft italic">{p.summary}</p>
            {p.description.map((para) => (
              <p key={para.slice(0, 20)} className="mt-5 text-[0.9875rem] leading-relaxed text-ink-soft">
                {para}
              </p>
            ))}

            <dl className="mt-10 grid grid-cols-2 border-t border-l border-line sm:grid-cols-3">
              {details.map((d) => (
                <div key={d.label} className="border-r border-b border-line p-4">
                  <dt className="eyebrow text-[0.6rem] text-muted">{d.label}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] font-semibold text-ink">
                    {d.value}
                    {d.sub && <span className="block text-xs font-normal text-muted">{d.sub}</span>}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
              <p>
                <span className="eyebrow block text-[0.6rem] text-muted">{p.priceQualifier}</span>
                <span className="font-editorial text-[2.5rem] leading-none text-ink tabular-nums">{formatPrice(p)}</span>
              </p>
              <p className="text-right text-xs text-muted">
                Listed by <span className="font-semibold text-ink">{agent.name}</span>
                <br />
                {agent.role}
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" icon="arrow-right" onClick={() => openProperty(p.id)}>
                View Property
              </Button>
              <Button size="lg" variant="secondary" icon="calendar" onClick={() => openEnquiry('viewing', p.id)}>
                Book a Viewing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
