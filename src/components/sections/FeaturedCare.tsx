import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { Eyebrow } from '../ui/SectionHeader'
import { useDialogs } from '../dialogs/DialogProvider'
import type { IconName } from '../../content/types'

const points: { title: string; description: string; icon: IconName }[] = [
  {
    title: 'One coordinated team',
    description: 'Your physician, specialists and therapists share notes, so you never have to repeat your story.',
    icon: 'chat',
  },
  {
    title: 'Time to listen',
    description: 'Longer appointments leave room for questions and for decisions you make together.',
    icon: 'clock',
  },
  {
    title: 'Continuity you can count on',
    description: 'Clear follow-up plans and a consistent clinician who knows your history.',
    icon: 'heart',
  },
]

export function FeaturedCare() {
  const { openBooking } = useDialogs()
  return (
    <section id="about" aria-labelledby="about-title" className="bg-sage-soft/55 py-20 sm:py-28 lg:py-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-6">
          <div className="aspect-[4/4.4] overflow-hidden rounded-5xl rounded-tr-[9rem] bg-sage-soft sm:rounded-tr-[12rem]">
            <Media scene="care" asset={{ alt: 'Soft window light falling on a quiet clinic room with a vase of greenery' }} />
          </div>
          <figure className="absolute -right-2 -bottom-8 hidden max-w-[17rem] rounded-3xl bg-blue-deep p-6 text-paper shadow-[0_30px_60px_-30px_rgb(20_33_58/0.6)] sm:block lg:-right-10">
            <blockquote className="font-display-tight text-[1.25rem] leading-snug font-[380]">
              “We look at the whole person, not just the symptom in front of us.”
            </blockquote>
            <figcaption className="mt-4 text-sm text-paper/75">Our philosophy of care</figcaption>
          </figure>
        </div>

        <div className="lg:col-span-6 lg:pl-4">
          <Eyebrow tone="sage">About the clinic</Eyebrow>
          <h2 id="about-title" className="font-display-tight mt-5 text-[2.25rem] leading-[1.08] font-[380] sm:text-5xl lg:text-[3.5rem]">
            Care that looks at the whole picture.
          </h2>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed">
            Health rarely fits into a single specialty. Our clinicians work side by side — sharing insight across primary
            care, diagnostics, specialist medicine and rehabilitation — to build plans that make sense for you as a whole
            person.
          </p>
          <ul className="mt-10 space-y-7">
            {points.map((p) => (
              <li key={p.title} className="flex gap-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-sage-deep/25 bg-paper text-sage-deep">
                  <Icon name={p.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-1 leading-relaxed text-ink-soft">{p.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button icon="arrow-right" onClick={() => openBooking()}>
              Request a consultation
            </Button>
            <a href="#specialists" className="inline-flex min-h-11 items-center gap-2 font-medium text-ink underline decoration-ink/25 underline-offset-[6px] hover:decoration-ink">
              Meet our specialists
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
