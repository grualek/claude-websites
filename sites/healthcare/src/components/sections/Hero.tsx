import { clinic } from '../../content/clinic'
import { trustPoints } from '../../content/services'
import { Button, ButtonLink } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { Eyebrow } from '../ui/SectionHeader'
import { useDialogs } from '../dialogs/DialogProvider'

export function Hero() {
  const { openBooking } = useDialogs()
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-page grid items-center gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-6 xl:col-span-6">
          <Eyebrow tone="sage">Specialist Care, Designed Around You</Eyebrow>
          <h1
            id="hero-title"
            className="font-display-tight mt-6 text-[2.875rem] leading-[1.02] font-[360] sm:text-[4rem] lg:text-[4.25rem] xl:text-[5.25rem]"
          >
            Expert medical care with a more <em className="font-[340] text-blue-deep italic">human</em> approach.
          </h1>
          <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-ink-soft sm:text-[1.1875rem]">
            At {clinic.name}, appointments are unhurried, clinicians coordinate with each other, and every plan is shaped
            around your life — from everyday primary care to specialist consultations, under one calm roof.
          </p>
          <div id="hero-ctas" className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" icon="arrow-right" onClick={() => openBooking()}>
              Book an Appointment
            </Button>
            <ButtonLink size="lg" variant="secondary" href="#services">
              Explore Our Services
            </ButtonLink>
          </div>
          <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <Icon name="phone" className="size-4 text-blue" />
              Prefer to call?{' '}
              <a href={clinic.phone.href} className="font-medium text-ink underline-offset-4 hover:underline">
                {clinic.phone.display}
              </a>
            </span>
          </p>
        </div>

        <div className="relative lg:col-span-6 lg:pl-6 xl:pl-10">
          <div className="relative aspect-[5/6] overflow-hidden rounded-t-[12rem] rounded-b-5xl bg-sand sm:aspect-[4/4.2] sm:rounded-t-[16rem] lg:aspect-[5/6]">
            <Media
              priority
              scene="consult"
              asset={{ alt: 'A calm, light-filled consultation room with a lounge chair and plants' }}
            />
          </div>

          {/* Floating trust card */}
          <div className="absolute -bottom-6 left-3 w-[15.5rem] rounded-3xl border border-white/60 bg-paper/95 p-5 shadow-[0_24px_60px_-28px_rgb(20_33_58/0.5)] backdrop-blur sm:left-0 lg:-left-6 lg:bottom-10">
            <div className="flex items-center gap-2.5">
              <span className="relative flex size-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-sage opacity-60 motion-reduce:hidden" />
                <span className="relative size-2.5 rounded-full bg-sage-deep" />
              </span>
              <p className="text-sm font-semibold text-ink">Appointments available</p>
            </div>
            <p className="mt-1.5 text-sm text-muted">In-person &amp; virtual care</p>
            <div className="mt-4 flex items-center gap-2 border-t border-line-soft pt-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-mist px-2.5 py-1 text-xs font-medium text-blue-deep">
                <Icon name="building" className="size-3.5" />
                Clinic
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-soft px-2.5 py-1 text-xs font-medium text-sage-deep">
                <Icon name="video" className="size-3.5" />
                Video
              </span>
            </div>
          </div>

          {/* Secondary floating chip */}
          <div className="absolute top-8 right-3 hidden items-center gap-3 rounded-full bg-paper/95 py-2 pr-4 pl-2 shadow-[0_18px_40px_-24px_rgb(20_33_58/0.55)] backdrop-blur sm:flex lg:-right-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-blue-deep text-paper">
              <Icon name="clock" className="size-4.5" />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-semibold text-ink">Same-week visits</span>
              <span className="text-muted">for new patients</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TrustStrip() {
  return (
    <section aria-label="Why patients choose us" className="border-y border-line-soft bg-paper">
      <ul className="container-page grid grid-cols-1 divide-y divide-line-soft sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
        {trustPoints.map((point, i) => (
          <li
            key={point.title}
            className={`flex items-start gap-4 py-6 sm:py-8 lg:px-8 ${i % 2 === 1 ? 'sm:pl-8' : 'sm:pr-8'} ${
              i > 0 ? 'lg:border-l lg:border-line-soft' : 'lg:pl-0'
            } ${i < 2 ? 'sm:border-b sm:border-line-soft lg:border-b-0' : ''}`}
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage-soft text-sage-deep">
              <Icon name={point.icon} className="size-5" />
            </span>
            <div>
              <p className="text-base font-semibold text-ink">{point.title}</p>
              <p className="mt-1 text-[0.9375rem] leading-snug text-muted">{point.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
