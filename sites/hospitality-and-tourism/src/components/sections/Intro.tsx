import { intro } from '../../content/site'
import { TextAction } from '../ui/Button'
import { Media } from '../ui/Media'

export function Intro() {
  return (
    <section id="stay" aria-labelledby="stay-title" className="section-y bg-ivory">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <p className="eyebrow flex items-center gap-4 text-clay">
              <span className="tabular-nums">01</span>
              <span aria-hidden="true" className="h-px w-10 bg-ink/20" />
              <span>{intro.eyebrow}</span>
            </p>
            <h2 id="stay-title" className="font-editorial mt-6 text-[2.9rem] sm:text-[4rem] lg:text-[5.25rem]">
              A slower way to experience <em className="italic">the coast.</em>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-16" data-reveal>
            <p className="font-editorial text-[1.6rem] leading-[1.3] text-ink">{intro.lead}</p>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* image pair: tall arch + inset detail */}
          <div className="relative lg:col-span-7" data-reveal>
            <div className="aspect-[4/5] overflow-hidden rounded-[4px] sm:aspect-[5/4] lg:aspect-[6/5]">
              <Media asset={intro.images.main} sizes="(min-width: 1024px) 55vw, 100vw" />
            </div>
            <div className="absolute -bottom-10 right-4 w-[42%] max-w-72 overflow-hidden rounded-[4px] border-[6px] border-ivory sm:right-8 lg:-right-16">
              <div className="aspect-[4/5]">
                <Media asset={intro.images.detail} sizes="18rem" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-12 pt-6 lg:col-span-4 lg:col-start-9" data-reveal>
            <div className="space-y-5 text-[1rem] leading-relaxed text-muted">
              {intro.body.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
              <a href="#destination" className="group inline-block pt-2">
                <TextAction>Plan your trip</TextAction>
              </a>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8">
              {intro.facts.map((f) => (
                <div key={f.label} className="flex flex-col">
                  <dt className="order-2 mt-1 text-[0.8rem] text-muted">{f.label}</dt>
                  <dd className="font-editorial order-1 text-[2.6rem] leading-none text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
