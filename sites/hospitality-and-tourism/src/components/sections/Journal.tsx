import { articles } from '../../content/journal'
import type { Article } from '../../content/types'
import { formatDate } from '../../lib/format'
import { useApp } from '../../state/AppState'
import { TextAction } from '../ui/Button'
import { Media } from '../ui/Media'
import { SectionHeader } from '../ui/Text'

export function Journal() {
  const [feature, ...rest] = articles
  return (
    <section id="journal" aria-labelledby="journal-title" className="section-y bg-ivory">
      <div className="container-page">
        <SectionHeader
          id="journal-title"
          index="10"
          eyebrow="Journal"
          title={
            <>
              Notes from <em className="italic">the coast.</em>
            </>
          }
          intro="Destination guides, local food, seasonal travel and stories from the estate — written by the people who live here."
        />

        <div className="mt-16 lg:mt-20" data-reveal>
          <ArticleCard article={feature} feature />
        </div>
        <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-5">
          {rest.map((a, i) => (
            <li key={a.slug} data-reveal style={{ ['--reveal-delay' as string]: `${(i % 5) * 90}ms` }}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ArticleCard({ article, feature = false }: { article: Article; feature?: boolean }) {
  const { open } = useApp()
  return (
    <article className={`group relative ${feature ? 'grid gap-8 lg:grid-cols-12 lg:items-center' : ''}`}>
      <div className={`media-zoom overflow-hidden rounded-[4px] ${feature ? 'aspect-[16/10] lg:col-span-7' : 'aspect-[4/5]'}`}>
        <Media asset={article.image} sizes={feature ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 20vw, 50vw'} decorative />
      </div>
      <div className={feature ? 'lg:col-span-4 lg:col-start-9' : 'mt-5'}>
        <p className="eyebrow text-[0.6rem] text-clay">
          {article.category}
          <span className="text-muted"> · {article.readingMinutes} min read</span>
        </p>
        <h3 className={`font-editorial mt-3 leading-[1.08] ${feature ? 'text-[2.4rem] sm:text-[3rem]' : 'text-[1.6rem]'}`}>
          <button type="button" onClick={() => open({ type: 'article', article })} className="text-left after:absolute after:inset-0 after:content-['']">
            {article.title}
          </button>
        </h3>
        <p className={`mt-3 leading-relaxed text-muted ${feature ? 'text-[1rem]' : 'text-[0.9rem]'}`}>{article.summary}</p>
        {feature && <p className="mt-4 text-[0.8rem] text-muted">{formatDate(article.date, { day: 'numeric', month: 'long', year: 'numeric' })}</p>}
        <TextAction className="mt-5">Read article</TextAction>
      </div>
    </article>
  )
}
