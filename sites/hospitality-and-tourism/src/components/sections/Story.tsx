import { story } from '../../content/site'
import { Media } from '../ui/Media'
import { WithPlaceholders } from '../ui/Text'

export function Story() {
  return (
    <section id="about" aria-labelledby="about-title" className="on-dark section-y bg-olive-deep text-on-dark">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow flex items-center gap-4 text-clay-light">
              <span className="tabular-nums">07</span>
              <span aria-hidden="true" className="h-px w-10 bg-on-dark/30" />
              <span>{story.eyebrow}</span>
            </p>
            <h2 id="about-title" className="font-editorial mt-6 text-[2.9rem] text-on-dark sm:text-[3.75rem] lg:text-[4.25rem]">
              Hospitality rooted <em className="italic">in a place.</em>
            </h2>
            <div className="mt-12 aspect-[4/5] overflow-hidden rounded-[4px] lg:mt-16">
              <Media asset={story.image} sizes="(min-width: 1024px) 38vw, 100vw" />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-28">
            <blockquote className="font-editorial text-[1.9rem] leading-[1.2] text-on-dark sm:text-[2.4rem]" data-reveal>
              <span aria-hidden="true" className="text-clay-light">“</span>
              {story.statement}
              <span aria-hidden="true" className="text-clay-light">”</span>
            </blockquote>
            <p className="mt-6 text-[0.85rem] text-olive-soft" data-reveal>
              The Velora family &amp; team <span className="text-olive-soft/70">(demo)</span>
            </p>

            <ol className="mt-14 border-t border-on-dark/20">
              {story.pillars.map((pl, i) => (
                <li key={pl.title} className="grid gap-2 border-b border-on-dark/20 py-6 sm:grid-cols-[3rem_10rem_1fr] sm:gap-6" data-reveal>
                  <span className="eyebrow pt-1.5 text-clay-light tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-editorial text-[1.75rem] leading-none text-on-dark">{pl.title}</h3>
                  <p className="text-[0.95rem] leading-relaxed text-olive-soft">
                    <WithPlaceholders text={pl.body} />
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
