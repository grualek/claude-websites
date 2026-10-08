import { useId } from 'react'
import { attorneys } from '../../content/attorneys'
import { insights } from '../../content/insights'
import { practiceAreas } from '../../content/practices'
import type { Attorney, Insight, PracticeArea } from '../../content/types'
import { formatDate, pad } from '../../lib/format'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Dialog, DialogClose } from '../ui/Dialog'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'

/*
 * Detail views. In production each becomes a standalone, indexable page at the path in
 * lib/routes.ts; in the prototype they open as accessible modal dialogs.
 */

function PracticeDetail({ practice, titleId }: { practice: PracticeArea; titleId: string }) {
  const { scheduleConsultation, openDetail, closeDetail } = useApp()
  const index = practiceAreas.indexOf(practice)
  const team = attorneys.filter((a) => a.practices.includes(practice.title))
  return (
    <article>
      <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-paper/95 px-6 py-4 backdrop-blur sm:px-10">
        <p className="eyebrow text-muted">
          <span className="text-bronze-deep">{pad(index + 1)}</span> · Practice Area
        </p>
        <DialogClose onClose={closeDetail} />
      </header>
      <div className="px-6 py-10 sm:px-10 sm:py-12">
        <h2 id={titleId} className="font-editorial text-[2.5rem] sm:text-[3.25rem]">
          {practice.title}
        </h2>
        <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-soft">{practice.overview}</p>

        <div className="mt-10 grid gap-10 border-t border-line pt-8 sm:grid-cols-2">
          <div>
            <h3 className="eyebrow text-bronze-deep">How we help</h3>
            <ul className="mt-4 space-y-3">
              {practice.services.map((s) => (
                <li key={s} className="flex gap-3 text-[0.9375rem] text-ink-soft">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-bronze-deep" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-bronze-deep">Clients often come to us when</h3>
            <ul className="mt-4 space-y-3">
              {practice.situations.map((s) => (
                <li key={s} className="flex gap-3 text-[0.9375rem] text-ink-soft">
                  <span className="mt-2.5 h-px w-3 shrink-0 bg-bronze" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {team.length > 0 && (
          <div className="mt-10 border-t border-line pt-8">
            <h3 className="eyebrow text-bronze-deep">Attorneys</h3>
            <ul className="mt-4 flex flex-wrap gap-3">
              {team.map((a) => (
                <li key={a.slug}>
                  <button
                    type="button"
                    onClick={() => openDetail({ kind: 'attorney', slug: a.slug })}
                    className="flex items-center gap-3 border border-line py-2 pr-4 pl-2 text-left transition-colors hover:border-ink"
                  >
                    <span className="size-10 overflow-hidden rounded-full">
                      <Media asset={{ ...a.portrait, alt: '' }} />
                    </span>
                    <span>
                      <span className="block text-[0.875rem] font-medium text-ink">{a.name}</span>
                      <span className="block text-xs text-muted">{a.role}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3 bg-stone p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-editorial text-[1.375rem] leading-snug text-ink">Discuss a {practice.matterLabel.toLowerCase()} matter in confidence.</p>
          <Button arrow onClick={() => scheduleConsultation(practice.matterLabel)}>
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </article>
  )
}

function AttorneyDetail({ attorney, titleId }: { attorney: Attorney; titleId: string }) {
  const { scheduleConsultation, closeDetail } = useApp()
  const firstPractice = practiceAreas.find((p) => attorney.practices.includes(p.title))
  return (
    <article className="grid md:grid-cols-[2fr_3fr]">
      <div className="relative aspect-[4/3] bg-stone md:aspect-auto">
        <Media asset={attorney.portrait} />
        <div className="absolute top-4 right-4 md:hidden">
          <DialogClose onClose={closeDetail} />
        </div>
      </div>
      <div className="px-6 py-10 sm:px-10">
        <div className="flex items-start justify-between gap-4">
          <p className="eyebrow pt-3 text-bronze-deep">{attorney.role}</p>
          <div className="max-md:hidden">
            <DialogClose onClose={closeDetail} />
          </div>
        </div>
        <h2 id={titleId} className="font-editorial mt-3 text-[2.5rem] sm:text-[3rem]">
          {attorney.name}
        </h2>
        <p className="mt-2 text-[0.875rem] font-medium text-ink-soft">{attorney.practices.join(' · ')}</p>
        <div className="mt-6 space-y-4 text-[0.9375rem] leading-relaxed text-ink-soft">
          {attorney.fullBio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="mt-8 grid gap-6 border-t border-line pt-6 text-[0.875rem] sm:grid-cols-2">
          <div>
            <dt className="eyebrow text-muted">Education</dt>
            <dd className="mt-2 space-y-1 text-ink">
              {attorney.credentials.map((c) => (
                <span key={c} className="block">
                  {c}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-muted">Admissions</dt>
            <dd className="mt-2 space-y-1 text-ink">
              {attorney.admissions.map((c) => (
                <span key={c} className="block">
                  {c}
                </span>
              ))}
            </dd>
          </div>
          {attorney.languages && (
            <div>
              <dt className="eyebrow text-muted">Languages</dt>
              <dd className="mt-2 text-ink">{attorney.languages.join(', ')}</dd>
            </div>
          )}
          <div>
            <dt className="eyebrow text-muted">Contact</dt>
            <dd className="mt-2">
              <a href={`mailto:${attorney.email}`} className="text-ink underline decoration-line underline-offset-4 hover:decoration-bronze-deep">
                {attorney.email}
              </a>
            </dd>
          </div>
        </dl>
        <div className="mt-8">
          <Button arrow onClick={() => scheduleConsultation(firstPractice?.matterLabel)}>
            Schedule with {attorney.name.split(' ')[0]}
          </Button>
        </div>
        <p className="mt-6 text-xs text-muted">Demo profile — name, credentials and admissions are fictional placeholders.</p>
      </div>
    </article>
  )
}

function InsightDetail({ article, titleId }: { article: Insight; titleId: string }) {
  const { scheduleConsultation, closeDetail } = useApp()
  return (
    <article>
      <div className="relative aspect-[21/9] bg-stone">
        <Media asset={article.image} />
        <div className="absolute top-4 right-4">
          <DialogClose onClose={closeDetail} />
        </div>
      </div>
      <div className="mx-auto max-w-[40rem] px-6 py-10 sm:py-14">
        <p className="flex flex-wrap items-center gap-3 text-xs text-muted">
          <span className="eyebrow text-bronze-deep">{article.category}</span>
          <span aria-hidden="true" className="h-3 w-px bg-line" />
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true" className="h-3 w-px bg-line" />
          {article.readingMinutes} min read
        </p>
        <h2 id={titleId} className="font-editorial mt-5 text-[2.25rem] leading-[1.08] sm:text-[2.75rem]">
          {article.title}
        </h2>
        <p className="mt-4 text-[0.875rem] text-muted">By {article.author}</p>
        <div className="mt-8 space-y-5 border-t border-line pt-8 text-[1.0625rem] leading-[1.75] text-ink-soft">
          {article.body.map((p, i) => (
            <p key={i} className={i === 0 ? 'first-letter:font-display first-letter:float-left first-letter:mr-2 first-letter:text-[3.75rem] first-letter:leading-[0.85] first-letter:text-bronze-deep' : ''}>
              {p}
            </p>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.9375rem] text-ink">Have a question about your own situation?</p>
          <Button arrow onClick={() => scheduleConsultation()}>
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </article>
  )
}

export function DetailDialogs() {
  const { detail, closeDetail } = useApp()
  const titleId = useId()

  const practice = detail?.kind === 'practice' ? practiceAreas.find((p) => p.slug === detail.slug) : undefined
  const attorney = detail?.kind === 'attorney' ? attorneys.find((a) => a.slug === detail.slug) : undefined
  const article = detail?.kind === 'insight' ? insights.find((a) => a.slug === detail.slug) : undefined

  return (
    <>
      <Dialog open={!!practice} onClose={closeDetail} labelledBy={titleId}>
        {practice && <PracticeDetail key={practice.slug} practice={practice} titleId={titleId} />}
      </Dialog>
      <Dialog open={!!attorney} onClose={closeDetail} labelledBy={`${titleId}-a`} size="lg">
        {attorney && <AttorneyDetail key={attorney.slug} attorney={attorney} titleId={`${titleId}-a`} />}
      </Dialog>
      <Dialog open={!!article} onClose={closeDetail} labelledBy={`${titleId}-i`}>
        {article && <InsightDetail key={article.slug} article={article} titleId={`${titleId}-i`} />}
      </Dialog>
    </>
  )
}
