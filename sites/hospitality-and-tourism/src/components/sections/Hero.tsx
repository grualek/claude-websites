import { hero } from '../../content/site'
import { StayForm } from '../booking/StayForm'
import { useApp } from '../../state/AppState'
import { Button, ButtonLink } from '../ui/Button'
import { Media } from '../ui/Media'

export function Hero() {
  const { bookStay } = useApp()
  return (
    <section id="hero" aria-labelledby="hero-title" className="on-dark relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal">
      <div className="absolute inset-0 -z-10">
        <div className="animate-slow-zoom h-full w-full">
          <Media asset={hero.image} priority />
        </div>
        {/* legibility: soft vignette left + floor gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-charcoal/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/55 via-charcoal/10 to-transparent" />
      </div>

      <div className="container-page pt-36 pb-8 sm:pb-10 lg:pb-12">
        <div className="max-w-[60rem]">
          <p className="eyebrow animate-fade-up text-on-dark/85">{hero.eyebrow}</p>
          <h1 id="hero-title" className="font-editorial animate-fade-up mt-6 text-[3.4rem] text-on-dark [animation-delay:120ms] sm:text-[5rem] lg:text-[6.75rem] xl:text-[7.5rem]">
            Stay somewhere <em className="font-normal italic">worth remembering.</em>
          </h1>
          <p className="animate-fade-up mt-7 max-w-xl text-[1.05rem] leading-relaxed text-on-dark/90 [animation-delay:240ms] sm:text-[1.15rem]">{hero.body}</p>
          <div className="animate-fade-up mt-9 flex flex-wrap gap-3 [animation-delay:360ms]">
            <Button size="lg" arrow onClick={() => bookStay()}>
              Book Your Stay
            </Button>
            <ButtonLink href="#experience" size="lg" variant="outline-light">
              Explore the Experience
            </ButtonLink>
          </div>
        </div>

        <div className="animate-fade-up mt-12 lg:mt-16 [animation-delay:520ms]">
          <h2 className="sr-only">Check availability</h2>
          <StayForm variant="hero" />
        </div>
      </div>
    </section>
  )
}
