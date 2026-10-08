import { destination } from '../../content/destination'
import type { DestinationHighlight } from '../../content/types'
import { useApp } from '../../state/AppState'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { SectionHeader } from '../ui/Text'

/** Grid placement for the five highlights: one tall feature + an asymmetric mosaic. */
const tiles = [
  'aspect-[4/5] sm:aspect-[16/10] lg:col-span-5 lg:row-span-2',
  'aspect-square sm:aspect-[4/5] lg:col-span-4',
  'aspect-square sm:aspect-[4/5] lg:col-span-3',
  'aspect-square sm:aspect-[4/5] lg:col-span-3',
  'aspect-square sm:aspect-[4/5] lg:col-span-4',
].map((c) => `${c} lg:aspect-auto`)

export function Destination() {
  const { enquire } = useApp()
  return (
    <section id="destination" aria-labelledby="destination-title" className="section-y bg-ivory">
      <div className="container-page">
        <SectionHeader
          id="destination-title"
          index="06"
          eyebrow={destination.eyebrow}
          title={
            <>
              The Sarenne Coast, <em className="italic">unhurried.</em>
            </>
          }
          intro={destination.intro}
        />

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:auto-rows-[18rem] lg:grid-cols-12 lg:gap-5 xl:auto-rows-[21rem]">
          {destination.highlights.map((h, i) => (
            <li key={h.slug} className={`${tiles[i]} ${i === 0 ? 'sm:col-span-2 lg:col-span-5' : ''}`} data-reveal>
              <Tile h={h} large={i === 0} />
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-10 lg:grid-cols-12" data-reveal>
          <div className="lg:col-span-4">
            <h3 className="font-editorial text-[2.25rem] leading-[1.05]">Things to do nearby</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">A few favourites from our concierge. Tell us how you like to travel and we’ll plan the rest.</p>
            <button
              type="button"
              onClick={() => enquire({ topic: 'Plan my trip', message: 'We’re interested in ' })}
              className="group mt-6 inline-flex min-h-11 items-center gap-2 text-[0.85rem] font-semibold text-clay"
            >
              <span className="border-b border-clay/40 pb-0.5 group-hover:border-clay">Plan your trip with the concierge</span>
              <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <ul className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:col-span-7 lg:col-start-6">
            {destination.thingsToDo.map((t) => (
              <li key={t.title} className="flex items-baseline justify-between gap-4 border-b border-line py-4">
                <span className="text-[0.95rem] text-ink">{t.title}</span>
                <span className="shrink-0 text-[0.78rem] text-muted">{t.distance}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Tile({ h, large }: { h: DestinationHighlight; large: boolean }) {
  return (
    <article className="group relative isolate h-full overflow-hidden rounded-[4px]">
      <div className="media-zoom absolute inset-0 -z-10">
        <Media asset={h.image} sizes={large ? '(min-width: 1024px) 40vw, 100vw' : '(min-width: 1024px) 30vw, 50vw'} decorative />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/90 via-charcoal/40 via-45% to-charcoal/0" />
      <div className="flex h-full flex-col justify-between p-5 sm:p-6">
        <p className="eyebrow self-start rounded-full bg-paper/90 px-3 py-1.5 text-[0.6rem] text-ink">{h.category}</p>
        <div className="text-on-dark">
          <h3 className={`font-editorial text-on-dark ${large ? 'text-[2.4rem] lg:text-[3rem]' : 'text-[1.75rem]'} leading-[1.05]`}>{h.title}</h3>
          <p className="mt-2 max-w-sm text-[0.88rem] leading-relaxed text-on-dark/90">{h.summary}</p>
          <p className="mt-3 flex items-center gap-1.5 text-[0.75rem] font-semibold text-on-dark/85">
            <Icon name="pin" className="size-4" /> {h.distance}
          </p>
        </div>
      </div>
    </article>
  )
}
