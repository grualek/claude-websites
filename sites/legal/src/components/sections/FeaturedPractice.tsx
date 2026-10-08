import { featuredPractice, practiceAreas } from '../../content/practices'
import { pad } from '../../lib/format'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Media } from '../ui/Media'

export function FeaturedPractice() {
  const { scheduleConsultation, openDetail } = useApp()
  const practice = practiceAreas.find((p) => p.slug === featuredPractice.practiceSlug)!
  return (
    <section aria-labelledby="featured-title" className="bg-stone">
      <div className="container-page grid lg:grid-cols-12">
        <figure className="relative -mx-4 aspect-[4/3] overflow-hidden sm:-mx-8 lg:col-span-5 lg:mx-0 lg:-ml-14 lg:aspect-auto lg:min-h-[44rem]">
          <Media asset={{ scene: 'facade', alt: 'Looking up at a stone-finned office building' }} />
        </figure>

        <div className="py-20 lg:col-span-7 lg:py-28 lg:pl-20 xl:pl-28">
          <p className="eyebrow flex items-center gap-3 text-muted" data-reveal>
            <span className="h-px w-8 bg-bronze" aria-hidden="true" />
            {featuredPractice.eyebrow}
          </p>
          <h2 id="featured-title" className="font-editorial mt-8 text-[2.75rem] sm:text-[3.5rem] lg:text-[4.25rem]" data-reveal>
            Complex matters require <em className="italic text-bronze-deep">clear thinking.</em>
          </h2>
          <div className="mt-8 max-w-xl space-y-4 text-[1rem] leading-relaxed text-ink-soft" data-reveal>
            {featuredPractice.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <ol className="mt-12 border-t border-line">
            {featuredPractice.capabilities.map((cap, i) => (
              <li key={cap.title} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[4rem_1fr_1.4fr] sm:gap-6" data-reveal>
                <span className="eyebrow pt-1 text-bronze-deep tabular-nums">{pad(i + 1)}</span>
                <h3 className="font-editorial text-[1.375rem] leading-tight">{cap.title}</h3>
                <p className="text-[0.875rem] leading-relaxed text-muted">{cap.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal>
            <Button size="lg" arrow onClick={() => scheduleConsultation(practice.matterLabel)}>
              Discuss a Business Matter
            </Button>
            <Button size="lg" variant="secondary" onClick={() => openDetail({ kind: 'practice', slug: practice.slug })}>
              About {practice.title}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
