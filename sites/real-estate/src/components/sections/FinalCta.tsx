import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Media } from '../ui/Media'

export function FinalCta() {
  const { runSearch, openEnquiry } = useApp()
  return (
    <section aria-labelledby="final-title" className="container-page pb-20 sm:pb-28">
      <div className="relative isolate overflow-hidden rounded-[4px]">
        <div className="absolute inset-0 -z-10">
          <Media asset={{ scene: 'villa', tone: 'dusk', alt: '' }} sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20" />
        </div>
        <div className="max-w-3xl px-6 py-20 sm:px-12 sm:py-28 lg:px-16 lg:py-32">
          <p className="eyebrow text-paper/70">Hollis &amp; Vale · {new Date().getFullYear()}</p>
          <h2 id="final-title" className="font-editorial mt-5 text-[3.25rem] leading-[0.95] text-paper sm:text-[4.5rem] lg:text-[5.5rem]">
            Your next move <em>starts here.</em>
          </h2>
          <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-paper/80">
            Whether you’re buying, selling, letting or simply curious about what your home is worth, we’d be glad to help.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button variant="light" size="lg" icon="arrow-right" onClick={() => runSearch({})}>
              Explore Properties
            </Button>
            <Button variant="outline-light" size="lg" onClick={() => openEnquiry('advisor')}>
              Speak With an Advisor
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
