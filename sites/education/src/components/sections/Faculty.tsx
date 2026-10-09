import type { CSSProperties } from 'react'
import { educators } from '../../content/people'
import { useApp } from '../../state/AppState'
import { TextAction } from '../ui/Button'
import { Portrait } from '../ui/Portrait'
import { SectionHeader } from '../ui/Text'

/** Educator profiles — each card opens the profile (future /faculty/{slug}/ page). */
export function Faculty() {
  const { open } = useApp()
  return (
    <section id="faculty" aria-labelledby="faculty-title" className="section-y">
      <div className="container-page">
        <SectionHeader
          index="07"
          eyebrow="Faculty & educators"
          id="faculty-title"
          title={
            <>
              Taught by people who <em className="italic">still do the work.</em>
            </>
          }
          intro="Our educators combine research, professional practice and a genuine interest in how you learn. Meet a few of them."
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {educators.map((e, i) => (
            <li key={e.slug} data-reveal style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}>
              <article className="group relative flex h-full flex-col has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue has-[:focus-visible]:ring-offset-4 has-[:focus-visible]:ring-offset-cream rounded-[22px]">
                <div className="media-zoom aspect-[4/5] overflow-hidden rounded-[22px] bg-stone">
                  <Portrait spec={e.portrait} photo={e.photo} name={e.name} decorative />
                </div>
                <p className="mt-5 text-[0.8rem] font-semibold tracking-[0.04em] text-blue">{e.department}</p>
                <h3 className="font-editorial mt-1.5 text-[1.6rem] leading-tight">
                  <button type="button" onClick={() => open({ type: 'educator', educator: e })} className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
                    {e.name}
                  </button>
                </h3>
                <p className="mt-1 text-[0.9rem] text-muted">{e.title}</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">{e.bio}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Expertise">
                  {e.expertise.map((x) => (
                    <li key={x} className="rounded-full bg-stone px-2.5 py-1 text-[0.76rem] font-medium text-ink-soft">
                      {x}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <TextAction>Read profile</TextAction>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
