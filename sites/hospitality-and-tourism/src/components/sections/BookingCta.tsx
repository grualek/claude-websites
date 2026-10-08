import { bookingCta, offers } from '../../content/site'
import { useApp } from '../../state/AppState'
import { StayForm } from '../booking/StayForm'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'

export function BookingCta() {
  const { enquire } = useApp()
  return (
    <section id="book" aria-labelledby="book-title" className="on-dark relative isolate overflow-hidden bg-charcoal">
      <div className="absolute inset-0 -z-10">
        <Media asset={bookingCta.image} sizes="100vw" decorative />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-charcoal/35 to-charcoal/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
      </div>

      <div className="container-page grid gap-14 py-24 lg:grid-cols-12 lg:items-end lg:py-36">
        <div className="lg:col-span-6" data-reveal>
          <p className="eyebrow flex items-center gap-4 text-clay-light">
            <span className="tabular-nums">12</span>
            <span aria-hidden="true" className="h-px w-10 bg-on-dark/30" />
            <span>{bookingCta.eyebrow}</span>
          </p>
          <h2 id="book-title" className="font-editorial mt-6 text-[3.25rem] text-on-dark sm:text-[4.75rem] lg:text-[6rem]">
            Your next escape <em className="italic">starts here.</em>
          </h2>
          <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-on-dark/90">{bookingCta.body}</p>
          <ul className="mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-3 text-[0.88rem] text-on-dark/90">
            {bookingCta.perks.map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <Icon name="check" className="size-4 shrink-0 text-clay-light" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5 lg:col-start-8" data-reveal>
          <div className="rounded-[6px] border border-on-dark/15 bg-charcoal/55 p-5 backdrop-blur-md sm:p-8">
            <h3 className="font-editorial text-[1.9rem] text-on-dark">Check availability</h3>
            <p className="mt-1 mb-6 text-[0.85rem] text-on-dark-muted">See rooms and rates for your dates. No payment needed to request.</p>
            <StayForm variant="panel" />
          </div>
          <div className="mt-6">
            <h3 className="eyebrow text-on-dark/70">Seasonal offers</h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {offers.map((o) => (
                <li key={o.slug}>
                  <button
                    type="button"
                    onClick={() => enquire({ topic: 'Stay', message: `I’m interested in the “${o.title}” offer for ` })}
                    className="group h-full w-full rounded-[4px] border border-on-dark/15 bg-on-dark/5 p-4 text-left transition-colors hover:border-on-dark/40"
                  >
                    <span className="font-editorial block text-[1.35rem] text-on-dark">{o.title}</span>
                    <span className="mt-1 block text-[0.82rem] leading-snug text-on-dark-muted">{o.summary}</span>
                    <span className="mt-3 flex items-center justify-between text-[0.72rem] font-semibold text-clay-light">
                      {o.validity}
                      <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
