import { areas } from '../../content/areas'
import { properties } from '../../content/properties'
import { useApp } from '../../state/AppState'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { SectionHeader } from '../ui/SectionHeader'

/** Grid spans create an editorial, asymmetric mosaic on large screens. */
const spans = ['lg:col-span-7 lg:row-span-2', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4']

export function Areas() {
  const { runSearch } = useApp()
  const countFor = (areaId: string) => properties.filter((p) => p.address.areaId === areaId).length

  return (
    <section id="areas" aria-labelledby="areas-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeader
          id="areas-title"
          index="05"
          eyebrow="Areas we serve"
          title={
            <>
              Know the street, <em>not just the postcode</em>.
            </>
          }
          intro="From the cobbled lanes of the Old Town to the dunes at Saltmarsh Bay — explore the neighbourhoods we know best, and the homes available in each."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:auto-rows-[17rem] lg:grid-cols-12">
          {areas.map((a, i) => {
            const count = countFor(a.id)
            const big = i === 0
            return (
              <li key={a.id} className={`group relative min-h-[22rem] overflow-hidden rounded-[3px] bg-sand ${spans[i]} ${big ? 'sm:col-span-2 lg:min-h-0' : 'lg:min-h-0'}`}>
                <Media asset={a.image} sizes="(min-width: 1024px) 40vw, 100vw" className="absolute inset-0 transition-transform duration-[1400ms] ease-calm group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 via-45% to-ink/5" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col p-6 text-paper sm:p-7">
                  <p className="eyebrow text-[0.6rem] text-paper/75">{a.kicker}</p>
                  <h3 className={`font-editorial mt-2 text-paper ${big ? 'text-[2.75rem] sm:text-[3.5rem]' : 'text-[2.125rem]'}`}>
                    <button
                      type="button"
                      onClick={() => runSearch({ areaId: a.id })}
                      className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-paper"
                    >
                      {a.name}
                    </button>
                  </h3>
                  <p className={`mt-2 max-w-md text-sm leading-relaxed text-paper/85 ${big ? '' : 'lg:line-clamp-2'}`}>{a.description}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-semibold">
                    {count} {count === 1 ? 'property' : 'properties'} available
                    <Icon name="arrow-right" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
