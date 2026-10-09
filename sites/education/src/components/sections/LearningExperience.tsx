import type { CSSProperties } from 'react'
import { spaces } from '../../content/site'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Media } from '../ui/Media'
import { SectionHeader } from '../ui/Text'

/** Bento grid of learning spaces — each tile becomes a campus page (/campus/{slug}/). */
export function LearningExperience() {
  const { enquire } = useApp()
  return (
    <section id="campus" aria-labelledby="campus-title" className="section-y bg-paper">
      <div className="container-page">
        <SectionHeader
          index="04"
          eyebrow="Learning experience"
          id="campus-title"
          title={
            <>
              Spaces made for <em className="italic">doing,</em> not just listening.
            </>
          }
          intro="From seminar rooms to science labs and a new maker space, every program is taught where ideas can be tested — and our virtual campus brings the same support online."
          action={
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" icon="map" onClick={() => enquire('visit')}>
                Book a campus tour
              </Button>
            </div>
          }
        />

        <ul className="mt-14 grid auto-rows-[17rem] gap-4 sm:grid-cols-2 lg:auto-rows-[19rem] lg:grid-cols-4">
          {spaces.map((s, i) => (
            <li
              key={s.slug}
              data-reveal
              style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}
              className={`group relative overflow-hidden rounded-[22px] bg-stone ${i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''} ${i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="media-zoom absolute inset-0">
                <Media asset={s.image} sizes={i === 0 ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'} />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/45 to-transparent p-5 pt-16 sm:p-6 sm:pt-24">
                <span className="text-[0.75rem] font-semibold text-sun tabular-nums">0{i + 1}</span>
                <h3 className={`font-editorial mt-1 text-on-dark ${i === 0 ? 'text-[2.2rem] sm:text-[2.6rem]' : 'text-[1.6rem]'}`}>{s.title}</h3>
                <p className={`mt-2 max-w-md text-[0.92rem] leading-snug text-on-dark/85 ${i === 0 ? '' : 'line-clamp-2'}`}>{s.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
