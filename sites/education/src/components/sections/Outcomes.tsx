import type { CSSProperties } from 'react'
import { outcomes, outcomesImage } from '../../content/site'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { Eyebrow } from '../ui/Text'

/** Learning outcomes framed as experiences and skills — deliberately no employment statistics. */
export function Outcomes() {
  return (
    <section aria-labelledby="outcomes-title" className="on-dark section-y bg-navy text-on-dark">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div data-reveal>
              <Eyebrow index="08" tone="dark">
                Outcomes & experience
              </Eyebrow>
              <h2 id="outcomes-title" className="font-editorial mt-6 text-[2.6rem] text-on-dark sm:text-[3.4rem] lg:text-[4rem]">
                What you’ll <em className="italic text-sun">leave with.</em>
              </h2>
              <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-on-dark-muted">
                Every learner’s path is different, so we don’t promise outcomes. What we can promise is the experience: real skills, real projects and people in your corner.
              </p>
            </div>
            <div className="mt-10 aspect-[4/3] overflow-hidden rounded-[22px]" data-reveal>
              <Media asset={outcomesImage} sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
          </div>
        </div>
        <ol className="lg:col-span-6 lg:col-start-7">
          {outcomes.map((o, i) => (
            <li key={o.title} data-reveal style={{ '--reveal-delay': `${i * 60}ms` } as CSSProperties} className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-navy-line py-9 last:border-b sm:gap-x-10">
              <span className="font-editorial text-[1.1rem] text-on-dark-muted tabular-nums">0{i + 1}</span>
              <div>
                <div className="flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full border border-navy-line text-sun">
                    <Icon name={o.icon} className="size-6" />
                  </span>
                  <h3 className="font-editorial text-[2rem] text-on-dark sm:text-[2.5rem]">{o.title}</h3>
                </div>
                <p className="mt-4 max-w-lg text-[1rem] leading-relaxed text-on-dark-muted">{o.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
