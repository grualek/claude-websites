import { hero } from '../../content/site'
import { useApp } from '../../state/AppState'
import { Button, ButtonLink } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'

const assurances = ['Engineering support from quote to delivery', 'Documented inspection & lot traceability', 'Prototype, pilot and production volumes']

/** Corner registration marks, like a technical drawing frame. */
function CropMarks() {
  const cls = 'pointer-events-none absolute size-5 border-on-dark/70'
  return (
    <>
      <span aria-hidden="true" className={`${cls} top-4 left-4 border-t border-l`} />
      <span aria-hidden="true" className={`${cls} top-4 right-4 border-t border-r`} />
      <span aria-hidden="true" className={`${cls} bottom-4 left-4 border-b border-l`} />
      <span aria-hidden="true" className={`${cls} right-4 bottom-4 border-r border-b`} />
    </>
  )
}

export function Hero() {
  const { requestQuote } = useApp()
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-10 pb-16 sm:pt-14 lg:pt-16 lg:pb-24">
      <div className="bg-blueprint pointer-events-none absolute inset-x-0 top-0 h-[34rem] [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="container-page relative">
        <div className="flex items-center gap-4 border-t border-ink/80 pt-4 text-muted">
          <span className="label-mono shrink-0 text-signal-deep">FV—00</span>
          <span className="label-mono truncate">{hero.eyebrow}</span>
        </div>

        <h1 id="hero-title" className="font-headline mt-8 max-w-[16ch] xl:max-w-[17ch] text-[2.75rem] sm:text-[4.25rem] lg:mt-10 lg:text-[5.5rem] xl:text-[6.5rem]">
          Precision manufacturing built for <span className="text-steel-deep">demanding</span> applications.
        </h1>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col lg:order-2 lg:col-span-4 lg:col-start-9">
            <p className="text-[1.0625rem] leading-relaxed text-ink-soft">{hero.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button variant="signal" size="lg" arrow onClick={() => requestQuote()}>
                Request a Quote
              </Button>
              <ButtonLink variant="secondary" size="lg" href="#capabilities">
                Explore Capabilities
              </ButtonLink>
            </div>
            <ul className="mt-10 border-t border-line">
              {assurances.map((a) => (
                <li key={a} className="flex items-center gap-3 border-b border-line py-3.5 text-[0.875rem] text-ink-soft">
                  <Icon name="check" className="size-4 shrink-0 text-signal-deep" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <figure className="relative lg:order-1 lg:col-span-8">
            <div className="relative aspect-[4/3] overflow-hidden bg-charcoal sm:aspect-[16/10]">
              <Media asset={hero.image} priority />
              <CropMarks />
              {/* technical overlay */}
              <div className="absolute top-8 left-8 flex items-center gap-2.5 bg-charcoal/80 px-3 py-2 text-on-dark backdrop-blur-sm">
                <span className="animate-blink size-1.5 bg-signal" aria-hidden="true" />
                <span className="label-mono text-[0.625rem]">{hero.overlay}</span>
              </div>
              <dl className="absolute right-8 bottom-8 hidden gap-px bg-on-dark/15 text-on-dark backdrop-blur-sm sm:grid sm:grid-cols-3" aria-label="Illustrative cell readout">
                {[
                  ['Process', '5-axis mill'],
                  ['Material', 'Aluminum'],
                  ['Status', 'In-process'],
                ].map(([k, v]) => (
                  <div key={k} className="bg-charcoal/75 px-4 py-2.5">
                    <dt className="label-mono text-[0.5625rem] text-on-dark-muted">{k}</dt>
                    <dd className="mt-1 font-mono text-[0.75rem]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <figcaption className="label-mono mt-3 flex justify-between text-[0.625rem] text-muted">
              <span>Fig. 01 — Multi-axis machining cell</span>
              <span className="hidden sm:inline">Illustrative · replace with facility photography / video</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
