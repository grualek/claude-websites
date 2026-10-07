import { insights } from '../../content/site'
import type { Insight } from '../../content/types'
import { formatDate } from '../../lib/format'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { SectionHeader } from '../ui/SectionHeader'

export function Insights() {
  const [lead, ...rest] = insights
  return (
    <section id="insights" aria-labelledby="insights-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeader
          id="insights-title"
          index="09"
          eyebrow="Market insights"
          title={
            <>
              Notes from the <em>local market</em>.
            </>
          }
          intro="Guides, area profiles and market commentary from our advisors — written for people making real decisions, not for search engines."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <article className="group relative lg:col-span-7">
            <div className="aspect-[16/10] overflow-hidden rounded-[3px] bg-sand">
              <Media asset={lead.image} sizes="(min-width: 1024px) 58vw, 100vw" className="transition-transform duration-[1400ms] ease-calm group-hover:scale-[1.03]" />
            </div>
            <Meta insight={lead} className="mt-6" />
            <h3 className="font-editorial mt-3 text-[2.25rem] leading-[1.05] sm:text-[2.75rem]">
              <a href={`#insights`} className="after:absolute after:inset-0 after:content-['']">
                {lead.title}
              </a>
            </h3>
            <p className="mt-3 max-w-xl text-[0.9875rem] leading-relaxed text-muted">{lead.excerpt}</p>
            <p className="mt-4 text-xs text-muted">By {lead.author}</p>
          </article>

          <ul className="divide-y divide-line border-y border-line lg:col-span-5">
            {rest.map((i) => (
              <li key={i.id}>
                <article className="group relative grid grid-cols-[6.5rem_1fr] gap-5 py-6 sm:grid-cols-[8rem_1fr]">
                  <div className="aspect-square overflow-hidden rounded-[3px] bg-sand">
                    <Media asset={i.image} sizes="128px" />
                  </div>
                  <div>
                    <Meta insight={i} />
                    <h3 className="font-editorial mt-2 text-[1.5rem] leading-[1.1]">
                      <a href="#insights" className="after:absolute after:inset-0 after:content-[''] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                        {i.title}
                      </a>
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{i.excerpt}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Meta({ insight, className = '' }: { insight: Insight; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted ${className}`}>
      <span className="eyebrow text-[0.6rem] text-olive">{insight.category}</span>
      <span aria-hidden>·</span>
      <time dateTime={insight.publishedAt}>{formatDate(insight.publishedAt)}</time>
      <span aria-hidden>·</span>
      <span className="inline-flex items-center gap-1">
        <Icon name="clock" className="size-3.5" />
        {insight.readMinutes} min read
      </span>
    </p>
  )
}
