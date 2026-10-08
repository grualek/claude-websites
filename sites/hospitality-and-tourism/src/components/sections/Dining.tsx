import { restaurant } from '../../content/dining'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Media } from '../ui/Media'
import { WithPlaceholders } from '../ui/Text'

export function Dining() {
  const { open, enquire } = useApp()
  return (
    <section id="dining" aria-labelledby="dining-title" className="section-y overflow-hidden bg-sand">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-7" data-reveal>
          <div className="aspect-[4/5] overflow-hidden rounded-[4px] sm:aspect-[4/3] lg:aspect-[5/6]">
            <Media asset={restaurant.image} sizes="(min-width: 1024px) 55vw, 100vw" />
          </div>
          <div className="absolute -bottom-8 -left-2 hidden w-56 overflow-hidden rounded-full border-[6px] border-sand sm:block lg:-left-10 lg:w-64">
            <div className="aspect-square">
              <Media asset={restaurant.detail} sizes="16rem" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center lg:col-span-4 lg:col-start-9" data-reveal>
          <p className="eyebrow flex items-center gap-4 text-clay">
            <span className="tabular-nums">05</span>
            <span aria-hidden="true" className="h-px w-10 bg-ink/20" />
            <span>Dining</span>
          </p>
          <h2 id="dining-title" className="font-editorial mt-6 text-[2.9rem] sm:text-[3.75rem] lg:text-[4.25rem]">
            Dinner at <em className="italic">{restaurant.name}.</em>
          </h2>
          <p className="mt-6 text-[1rem] leading-relaxed text-ink-soft">{restaurant.description[0]}</p>

          <dl className="mt-8 divide-y divide-ink/15 border-y border-ink/15 text-[0.9rem]">
            <div className="grid grid-cols-[7rem_1fr] gap-4 py-3.5">
              <dt className="text-muted">Cuisine</dt>
              <dd className="text-ink">{restaurant.cuisine}</dd>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-4 py-3.5">
              <dt className="text-muted">Atmosphere</dt>
              <dd className="text-ink">{restaurant.atmosphere}</dd>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-4 py-3.5">
              <dt className="text-muted">Hours</dt>
              <dd>
                <ul className="space-y-1 text-ink">
                  {restaurant.hours.map((h) => (
                    <li key={h.service} className="flex justify-between gap-4">
                      <span>{h.service}</span>
                      <span className="tabular-nums">
                        <WithPlaceholders text={h.time} />
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button variant="dark" arrow onClick={() => open({ type: 'dining' })}>
              Explore Dining
            </Button>
            <Button variant="secondary" onClick={() => enquire({ topic: 'Dining', message: `I’d like to reserve a table at ${restaurant.name} for ` })}>
              Reserve a table
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
