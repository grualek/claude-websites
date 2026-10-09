import type { ReactNode } from 'react'
import type { StudentStory } from '../../content/types'
import { stories } from '../../content/people'
import { useApp } from '../../state/AppState'
import { TextAction } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { Portrait } from '../ui/Portrait'
import { SectionHeader } from '../ui/Text'

function StoryButton({ story, children }: { story: StudentStory; children: ReactNode }) {
  const { open } = useApp()
  return (
    <button type="button" onClick={() => open({ type: 'story', story })} className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
      {children}
    </button>
  )
}

const cardBase = 'group relative overflow-hidden rounded-[24px] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue has-[:focus-visible]:ring-offset-4 has-[:focus-visible]:ring-offset-cream'

/** Editorial story cards — one feature, two supporting. Demo content: replace with consented stories. */
export function Stories() {
  const [lead, ...rest] = stories
  return (
    <section id="stories" aria-labelledby="stories-title" className="section-y">
      <div className="container-page">
        <SectionHeader
          index="09"
          eyebrow="Student stories"
          id="stories-title"
          title={
            <>
              Stories from <em className="italic">our community.</em>
            </>
          }
          intro={<>Different starting points, different routes. <span className="text-[0.85rem]">(Demo stories — replace with real, consented student stories.)</span></>}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <article className={`${cardBase} grid bg-paper lg:col-span-7 lg:grid-rows-[1fr_auto]`} data-reveal>
            <div className="media-zoom relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[22rem]">
              <Media asset={lead.image} decorative />
            </div>
            <div className="p-7 sm:p-10">
              <Icon name="quote" className="size-9 text-sun" />
              <blockquote className="font-editorial mt-4 text-[1.75rem] leading-[1.18] text-ink sm:text-[2.2rem]">“{lead.quote}”</blockquote>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="size-14 overflow-hidden rounded-full">
                    <Portrait spec={lead.portrait} name={lead.name} decorative />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">
                      <StoryButton story={lead}>{lead.name}</StoryButton>
                    </h3>
                    <p className="text-[0.88rem] text-muted">
                      {lead.program} · {lead.stage}
                    </p>
                  </div>
                </div>
                <TextAction>Read Priya’s story</TextAction>
              </div>
            </div>
          </article>

          <div className="grid gap-6 lg:col-span-5">
            {rest.map((s, i) => (
              <article key={s.slug} className={`${cardBase} flex flex-col p-7 sm:p-8 ${i === 0 ? 'bg-sun-soft' : 'bg-blue-soft'}`} data-reveal>
                <div className="flex items-start justify-between gap-4">
                  <p className="eyebrow text-ink/70">{s.headline}</p>
                  <Icon name="quote" className="size-8 shrink-0 text-ink/25" />
                </div>
                <blockquote className="font-editorial mt-5 flex-1 text-[1.6rem] leading-[1.22] text-ink sm:text-[1.85rem]">“{s.quote}”</blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <div className="size-12 shrink-0 overflow-hidden rounded-full">
                    <Portrait spec={s.portrait} name={s.name} decorative />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-ink">
                      <StoryButton story={s}>{s.name}</StoryButton>
                    </h3>
                    <p className="text-[0.85rem] text-ink-soft">{s.program}</p>
                  </div>
                  <Icon name="arrow-right" className="size-5 text-ink transition-transform group-hover:translate-x-1" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
