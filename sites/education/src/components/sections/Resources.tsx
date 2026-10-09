import type { CSSProperties } from 'react'
import { articles, events, resources } from '../../content/site'
import type { Resource } from '../../content/types'
import { formatDate } from '../../lib/format'
import { useApp } from '../../state/AppState'
import { Button, TextAction } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { plain, SectionHeader } from '../ui/Text'

function ResourceCard({ r, i }: { r: Resource; i: number }) {
  const { enquire } = useApp()
  const inner = (
    <>
      <span className="flex size-12 items-center justify-center rounded-xl bg-blue-soft text-blue transition-colors group-hover:bg-navy group-hover:text-sun">
        <Icon name={r.icon} className="size-6" />
      </span>
      <span className="mt-6 block font-editorial text-[1.45rem] leading-tight text-ink">{r.title}</span>
      <span className="mt-2 block flex-1 text-[0.93rem] leading-relaxed text-muted">{r.body}</span>
      <span className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        <span className="text-[0.8rem] text-muted">{plain(r.meta)}</span>
        <Icon name="arrow-up-right" className="size-5 text-ink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </>
  )
  const cls = 'group flex h-full flex-col rounded-[20px] border border-line bg-paper p-6 text-left transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-ink/40'
  return (
    <li data-reveal style={{ '--reveal-delay': `${(i % 3) * 70}ms` } as CSSProperties}>
      {r.intent ? (
        <button type="button" onClick={() => enquire(r.intent!)} className={`${cls} w-full`} aria-label={`${r.title}: ${r.action}`}>
          {inner}
        </button>
      ) : (
        <a href={r.href} className={cls} aria-label={`${r.title}: ${r.action}`}>
          {inner}
        </a>
      )}
    </li>
  )
}

/** Resources hub (prospectus, guides, handbook…) followed by upcoming events and latest news. */
export function Resources() {
  const { enquire, open } = useApp()
  const [prospectus, ...others] = resources
  return (
    <>
      <section id="resources" aria-labelledby="resources-title" className="section-y bg-paper">
        <div className="container-page">
          <SectionHeader
            index="10"
            eyebrow="Resources"
            id="resources-title"
            title={
              <>
                Everything you need <em className="italic">to decide well.</em>
              </>
            }
            intro="Guides, handbooks and answers for applicants, parents, supporters and schools — free to download and share."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-12">
            <div className="relative flex flex-col overflow-hidden rounded-[24px] bg-sun p-8 text-navy sm:p-10 lg:col-span-4 lg:row-span-2" data-reveal>
              <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -right-10 -bottom-10 size-64 text-navy/10">
                <path d="M40 180V90a60 60 0 0 1 120 0v90" fill="none" stroke="currentColor" strokeWidth="14" />
              </svg>
              <p className="eyebrow">{plain(prospectus.meta)}</p>
              <h3 className="font-editorial mt-6 text-[2.6rem] leading-[1.02]">Download the prospectus</h3>
              <p className="mt-4 max-w-xs text-[1rem] leading-relaxed text-navy/80">{prospectus.body} Delivered to your inbox in seconds.</p>
              {/* mini cover */}
              <div aria-hidden="true" className="my-8 flex justify-center lg:my-auto lg:py-8">
                <div className="relative h-44 w-32 rotate-[-4deg] rounded-md bg-navy p-3 shadow-[0_24px_40px_-20px_rgb(20_33_58/0.8)]">
                  <div className="h-20 overflow-hidden rounded-t-full">
                    <Media asset={{ scene: 'campus', mood: 'morning', alt: '' }} decorative />
                  </div>
                  <p className="font-editorial mt-3 text-[0.95rem] leading-tight text-on-dark">Prospectus</p>
                  <p className="text-[0.55rem] tracking-[0.2em] text-sun uppercase">Larkmoor</p>
                </div>
              </div>
              <Button variant="primary" icon="download" className="relative self-start" onClick={() => enquire('prospectus')}>
                {prospectus.action}
              </Button>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
              {others.map((r, i) => (
                <ResourceCard key={r.slug} r={r} i={i} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="news" aria-labelledby="news-title" className="section-y">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader index="11" eyebrow="News & events" id="news-title" title={<>What’s on.</>} align="left" />
            <h3 className="mt-10 text-[0.85rem] font-semibold text-blue">Upcoming events</h3>
            <ul className="mt-4 border-t border-line">
              {events.map((e) => {
                const day = formatDate(e.date, { day: 'numeric' })
                const month = formatDate(e.date, { month: 'short' })
                return (
                  <li key={e.slug} className="border-b border-line">
                    <button type="button" onClick={() => enquire(e.format === 'Online' ? 'info' : 'visit')} className="group grid w-full grid-cols-[auto_1fr] gap-5 py-5 text-left">
                      <span className="flex w-16 flex-col items-center justify-center rounded-xl bg-navy py-2 text-on-dark">
                        <span className="font-editorial text-[1.7rem] leading-none">{day}</span>
                        <span className="mt-1 text-[0.7rem] font-semibold tracking-[0.14em] text-sun uppercase">{month}</span>
                      </span>
                      <span>
                        <span className="block font-semibold text-ink group-hover:text-blue">{e.title}</span>
                        <span className="mt-1 flex flex-wrap items-center gap-x-3 text-[0.84rem] text-muted">
                          <span className="inline-flex items-center gap-1">
                            <Icon name="clock" className="size-3.5" />
                            {e.time}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Icon name={e.format === 'Online' ? 'laptop' : 'pin'} className="size-3.5" />
                            {e.location}
                          </span>
                        </span>
                        <span className="mt-2 block text-[0.84rem] font-semibold text-ink underline decoration-sun decoration-2 underline-offset-4">{e.format === 'Online' ? 'Register' : 'Book a place'}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <p className="mt-4 text-[0.78rem] text-muted">Demo events — dates are illustrative.</p>
          </div>

          <div className="lg:col-span-8">
            <h3 className="sr-only">Latest news and guides</h3>
            <ul className="grid gap-6 md:grid-cols-3 lg:mt-24">
              {articles.map((a, i) => (
                <li key={a.slug} data-reveal style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}>
                  <article className="group relative flex h-full flex-col rounded-[20px] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue has-[:focus-visible]:ring-offset-4 has-[:focus-visible]:ring-offset-cream">
                    <div className="media-zoom aspect-[4/3] overflow-hidden rounded-[20px] bg-stone">
                      <Media asset={a.image} decorative sizes="(min-width: 768px) 25vw, 100vw" />
                    </div>
                    <p className="mt-5 flex items-center gap-3 text-[0.8rem] text-muted">
                      <span className="rounded-full bg-stone px-2.5 py-0.5 font-semibold text-ink-soft">{a.category}</span>
                      <time dateTime={a.date}>{formatDate(a.date, { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                    </p>
                    <h4 className="font-editorial mt-3 text-[1.45rem] leading-tight">
                      <button type="button" onClick={() => open({ type: 'article', article: a })} className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
                        {a.title}
                      </button>
                    </h4>
                    <p className="mt-2 flex-1 text-[0.93rem] leading-relaxed text-muted">{a.summary}</p>
                    <div className="mt-4">
                      <TextAction>{a.readTime}</TextAction>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
