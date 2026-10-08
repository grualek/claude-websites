import { insights } from '../../content/insights'
import type { Insight } from '../../content/types'
import { formatDate } from '../../lib/format'
import { useApp } from '../../state/AppState'
import { ArrowLink } from '../ui/Button'
import { Media } from '../ui/Media'
import { SectionHeader } from '../ui/SectionHeader'

function ArticleCard({ article, lead = false }: { article: Insight; lead?: boolean }) {
  const { openDetail } = useApp()
  return (
    <article className={`group relative flex h-full flex-col gap-6 ${lead ? '' : 'sm:flex-row lg:flex-col'}`}>
      <div className={`relative shrink-0 overflow-hidden bg-stone ${lead ? 'aspect-[16/10]' : 'aspect-[4/3] sm:w-2/5 lg:aspect-[16/9] lg:w-full'}`}>
        <Media asset={article.image} className="transition-transform duration-[1200ms] ease-[var(--ease-calm)] group-hover:scale-[1.04]" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="flex items-center gap-3 text-xs text-muted">
          <span className="eyebrow text-bronze-deep">{article.category}</span>
          <span aria-hidden="true" className="h-3 w-px bg-line" />
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </p>
        <h3 className={`font-editorial mt-4 leading-[1.1] ${lead ? 'text-[2rem] sm:text-[2.5rem]' : 'text-[1.5rem]'}`}>
          <button
            type="button"
            onClick={() => openDetail({ kind: 'insight', slug: article.slug })}
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-bronze-deep"
          >
            {article.title}
          </button>
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{article.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <ArrowLink>Read article</ArrowLink>
          <span className="text-xs text-muted">{article.readingMinutes} min read</span>
        </div>
      </div>
    </article>
  )
}

export function Insights() {
  const [lead, ...rest] = insights
  return (
    <section id="insights" aria-labelledby="insights-title" className="border-t border-line bg-paper py-24 lg:py-32">
      <div className="container-page">
        <SectionHeader
          index="05"
          eyebrow="Insights & Resources"
          id="insights-title"
          title={
            <>
              Practical guidance, <em className="italic text-bronze-deep">written plainly.</em>
            </>
          }
          intro="Short, considered articles on the questions clients most often ask — to help you prepare, understand your options and know when to seek advice."
        />

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 lg:border-r lg:border-line lg:pr-10" data-reveal>
            <ArticleCard article={lead} lead />
          </div>
          <ul className="grid gap-12 lg:col-span-5 lg:gap-10">
            {rest.map((a, i) => (
              <li key={a.slug} className={i > 0 ? 'border-t border-line pt-10' : ''} data-reveal>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
