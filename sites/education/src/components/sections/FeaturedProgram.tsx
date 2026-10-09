import { featuredProgram as program } from '../../content/programs'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { Eyebrow, plain } from '../ui/Text'

/** Editorial split for the flagship program. Pathways are framed as directions to explore, never promises. */
export function FeaturedProgram() {
  const { open, enquire } = useApp()
  return (
    <section aria-labelledby="featured-title" className="on-dark relative overflow-hidden bg-navy text-on-dark">
      <div className="grid lg:grid-cols-2">
        <div className="relative px-4 pt-16 sm:px-10 lg:py-24 lg:pr-0 lg:pl-12 xl:pl-20">
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-navy-soft" data-reveal>
              <Media asset={program.image} sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
            <div className="relative -mt-16 ml-auto w-[min(22rem,85%)] rounded-[20px] bg-sun p-5 text-navy shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] sm:p-6" data-reveal>
              <p className="flex items-center gap-2 text-[0.8rem] font-semibold">
                <Icon name="layers" className="size-4" /> How you’ll learn
              </p>
              <p className="mt-2 text-[0.95rem] leading-snug">Studio sessions in small teams, with briefs co-written by partner organisations.</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-16 sm:px-10 lg:px-16 lg:py-24 xl:px-20">
          <div data-reveal>
            <Eyebrow index="02" tone="dark">
              Flagship program
            </Eyebrow>
            <p className="mt-8 text-[0.9rem] font-semibold tracking-[0.04em] text-blue-light">{program.award}</p>
            <h2 id="featured-title" className="font-editorial mt-2 text-[3rem] text-on-dark sm:text-[4rem] xl:text-[4.75rem]">
              {program.name}
            </h2>
            <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-on-dark-muted">{program.overview[0]}</p>
          </div>

          <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2" data-reveal>
            {program.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 border-t border-navy-line pt-4 text-[0.98rem] text-on-dark">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-sun text-navy">
                  <Icon name="check" className="size-3.5" />
                </span>
                {plain(h)}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-8 sm:grid-cols-2" data-reveal>
            <div>
              <h3 className="eyebrow text-sun">What you’ll learn</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {program.modules.slice(0, 5).map((m) => (
                  <li key={m} className="rounded-full border border-navy-line px-3 py-1.5 text-[0.85rem] text-on-dark">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow text-sun">Pathways students explore</h3>
              <ul className="mt-4 space-y-2 text-[0.95rem] text-on-dark-muted">
                {program.pathways.map((p) => (
                  <li key={p} className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="h-px w-4 bg-sun" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-navy-line py-6 text-[0.85rem]" data-reveal>
            <div>
              <dt className="text-on-dark-muted">Duration</dt>
              <dd className="mt-1 font-semibold text-on-dark">{program.duration}</dd>
            </div>
            <div>
              <dt className="text-on-dark-muted">Format</dt>
              <dd className="mt-1 font-semibold text-on-dark">{program.format}</dd>
            </div>
            <div>
              <dt className="text-on-dark-muted">Next start</dt>
              <dd className="mt-1 font-semibold text-on-dark">{plain(program.start)}</dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal>
            <Button variant="sun" size="lg" arrow onClick={() => open({ type: 'program', program })}>
              Explore this program
            </Button>
            <Button variant="outline-light" size="lg" icon="download" onClick={() => enquire('prospectus', program.slug)}>
              Program guide
            </Button>
          </div>
          <p className="mt-6 text-[0.8rem] leading-relaxed text-on-dark-muted">Pathways are examples of directions students go on to explore. Individual outcomes vary.</p>
        </div>
      </div>
    </section>
  )
}
