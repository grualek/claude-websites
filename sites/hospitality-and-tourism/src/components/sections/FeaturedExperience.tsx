import { featuredExperience as fx } from '../../content/experiences'
import { useApp } from '../../state/AppState'
import { Button, ButtonLink } from '../ui/Button'
import { Media } from '../ui/Media'

export function FeaturedExperience() {
  const { enquire } = useApp()
  return (
    <section id="experience" aria-labelledby="experience-title" className="on-dark relative isolate overflow-hidden bg-charcoal">
      <div className="grid lg:min-h-[52rem] lg:grid-cols-12">
        <div className="relative min-h-[26rem] sm:min-h-[34rem] lg:col-span-8 lg:min-h-0">
          <div className="absolute inset-0">
            <Media asset={fx.image} sizes="(min-width: 1024px) 66vw, 100vw" />
          </div>
          <p className="eyebrow absolute bottom-6 left-4 text-on-dark/85 sm:left-8 lg:left-14">{fx.name} · Thursdays in summer</p>
        </div>

        <div className="flex flex-col justify-center px-4 py-16 sm:px-8 lg:col-span-4 lg:px-12 lg:py-24 xl:px-16" data-reveal>
          <p className="eyebrow flex items-center gap-4 text-clay-light">
            <span className="tabular-nums">03</span>
            <span aria-hidden="true" className="h-px w-10 bg-on-dark/30" />
            <span>{fx.eyebrow}</span>
          </p>
          <h2 id="experience-title" className="font-editorial mt-6 text-[2.9rem] text-on-dark sm:text-[3.75rem] xl:text-[4.25rem]">
            More than a place <em className="italic">to stay.</em>
          </h2>
          <h3 className="font-editorial mt-10 text-[1.6rem] text-on-dark">{fx.name}</h3>
          <p className="mt-3 text-[1rem] leading-relaxed text-on-dark-muted">{fx.body}</p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-charcoal-line pt-6 text-[0.85rem]">
            {fx.details.map((d) => (
              <div key={d.label}>
                <dt className="eyebrow text-[0.6rem] text-on-dark/60">{d.label}</dt>
                <dd className="mt-1.5 text-on-dark">{d.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button onClick={() => enquire({ topic: 'Experiences', message: `I’d like to reserve ${fx.name.toLowerCase()} on ` })}>Reserve a seat</Button>
            <ButtonLink href="#experiences" variant="outline-light">
              View Experiences
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
