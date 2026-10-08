import { firm } from '../../content/firm'
import { hero } from '../../content/site'
import { useApp } from '../../state/AppState'
import { Button, ButtonLink } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'

export function Hero() {
  const { scheduleConsultation } = useApp()
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="container-page grid gap-10 pt-8 pb-16 lg:grid-cols-12 lg:gap-0 lg:pt-10 lg:pb-24">
        {/* Copy */}
        <div className="flex flex-col justify-between lg:col-span-6 lg:border-r lg:border-line lg:pr-14 xl:col-span-6 xl:pr-20">
          <div className="animate-fade-up">
            <p className="eyebrow flex items-center gap-3 text-muted">
              <span className="h-px w-8 bg-bronze" aria-hidden="true" />
              {hero.eyebrow}
            </p>
            <h1 id="hero-title" className="font-editorial mt-8 text-[2.875rem] leading-[0.98] sm:text-[4.25rem] lg:mt-12 lg:text-[3.875rem] xl:text-[4.75rem] 2xl:text-[5.25rem]">
              Clear advice. Strong representation. <em className="text-bronze-deep italic">Built around what matters.</em>
            </h1>
          </div>

          <div className="animate-fade-up mt-10 [animation-delay:120ms] lg:mt-16">
            <p className="max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft sm:text-[1.125rem]">{hero.body}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button size="lg" arrow onClick={() => scheduleConsultation()}>
                Schedule a Consultation
              </Button>
              <ButtonLink size="lg" variant="secondary" href="#practice-areas">
                Explore Practice Areas
              </ButtonLink>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6 text-[0.8125rem] sm:max-w-lg">
              <div>
                <dt className="eyebrow text-muted">Speak with us</dt>
                <dd className="mt-2">
                  <a href={firm.phone.href} className="inline-flex min-h-6 items-center gap-2 font-medium text-ink hover:text-bronze-deep">
                    <Icon name="phone" className="size-4" />
                    {firm.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-muted">Consultations</dt>
                <dd className="mt-2 font-medium text-ink">In person · Phone · Video</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Image */}
        <div className="relative lg:col-span-6 lg:pl-14 xl:pl-20">
          <figure className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[40rem]">
            <Media asset={{ scene: 'office', alt: 'A calm, light-filled meeting room overlooking the city' }} priority />
            <figcaption className="absolute bottom-0 left-0 flex items-center gap-3 bg-ivory/90 px-4 py-2.5 text-[0.6875rem] tracking-[0.12em] text-muted uppercase backdrop-blur">
              <span className="text-bronze-deep">Fig. 01</span>
              {hero.caption}
            </figcaption>
          </figure>
          {/* Floating credibility element */}
          <div className="animate-fade-up relative z-10 mr-4 -mt-16 ml-auto max-w-[15rem] sm:absolute sm:mt-0 sm:mr-0 sm:ml-0 border border-line bg-paper/95 p-5 shadow-[0_24px_48px_-28px_rgb(27_25_22/0.45)] backdrop-blur [animation-delay:300ms] sm:top-8 sm:right-8 lg:top-auto lg:right-auto lg:bottom-16 lg:-left-0 lg:max-w-[17rem] xl:-left-6">
            <span className="flex size-9 items-center justify-center rounded-full border border-bronze/50 text-bronze-deep">
              <Icon name="scale" className="size-4.5" />
            </span>
            <p className="font-editorial mt-4 text-[1.375rem] leading-tight text-ink">{hero.badge.split(' · ')[0]}</p>
            <p className="font-editorial text-[1.375rem] leading-tight text-bronze-deep italic">{hero.badge.split(' · ')[1]}</p>
            <p className="mt-3 text-xs leading-relaxed text-muted">Business and individual clients, represented with care and discretion.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
