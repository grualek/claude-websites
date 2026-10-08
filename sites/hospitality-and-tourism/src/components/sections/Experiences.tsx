import { experiences } from '../../content/experiences'
import { useApp } from '../../state/AppState'
import { TextAction } from '../ui/Button'
import { Media } from '../ui/Media'
import { SectionHeader } from '../ui/Text'

export function Experiences() {
  const { open } = useApp()
  return (
    <section id="experiences" aria-labelledby="experiences-title" className="section-y bg-ivory">
      <div className="container-page">
        <SectionHeader
          id="experiences-title"
          index="04"
          eyebrow="Experiences"
          title={
            <>
              Days shaped by <em className="italic">the coast.</em>
            </>
          }
          intro="Wellness, food, walking, culture and time on the water — planned by people who grew up here, and always at your pace."
        />

        <ul className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-8">
          {experiences.map((e, i) => (
            <li key={e.slug} data-reveal style={{ ['--reveal-delay' as string]: `${(i % 3) * 120}ms` }} className={i % 3 === 1 ? 'lg:mt-20' : ''}>
              <article className="group relative">
                <div className="media-zoom aspect-[4/5] overflow-hidden rounded-[4px]">
                  <Media asset={e.image} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" decorative />
                </div>
                <p className="eyebrow mt-6 flex items-center gap-3 text-clay">
                  <span className="tabular-nums text-muted">{String(i + 1).padStart(2, '0')}</span>
                  {e.category}
                </p>
                <h3 className="font-editorial mt-3 text-[2rem] leading-[1.05]">
                  {/* Stretched button: the whole card is one target, the heading keeps its semantics */}
                  <button type="button" onClick={() => open({ type: 'experience', experience: e })} className="text-left after:absolute after:inset-0 after:content-['']">
                    {e.title}
                  </button>
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{e.summary}</p>
                <p className="mt-4 text-[0.8rem] text-muted">
                  {e.duration} · {e.season}
                </p>
                <TextAction className="mt-5">Discover</TextAction>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
