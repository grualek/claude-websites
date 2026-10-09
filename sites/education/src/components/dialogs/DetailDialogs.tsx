import { useId, type ReactNode } from 'react'
import { institution } from '../../content/institution'
import { programs } from '../../content/programs'
import type { Article, Educator, EnquiryIntent, Program, StudentStory } from '../../content/types'
import { intentOrder, intents } from '../../lib/enquiry'
import { formatDate } from '../../lib/format'
import { routes } from '../../lib/routes'
import { useApp } from '../../state/AppState'
import { EnquiryForm } from '../forms/EnquiryForm'
import { CategoryChip, ProgramCard } from '../programs/ProgramCard'
import { Button } from '../ui/Button'
import { Dialog, DialogClose } from '../ui/Dialog'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { Portrait } from '../ui/Portrait'
import { WithPlaceholders } from '../ui/Text'

/**
 * Detail views. In the prototype they open as dialogs; in production each becomes a page at the path
 * shown in the "page" hint (see lib/routes.ts), so the content and layout carry straight over.
 */
export function DetailDialogs() {
  const { view, close } = useApp()
  const titleId = useId()
  return (
    <>
      <Dialog open={view?.type === 'program'} onClose={close} labelledBy={titleId} size="xl">
        {view?.type === 'program' && <ProgramView program={view.program} titleId={titleId} />}
      </Dialog>
      <Dialog open={view?.type === 'educator'} onClose={close} labelledBy={titleId} size="lg">
        {view?.type === 'educator' && <EducatorView educator={view.educator} titleId={titleId} />}
      </Dialog>
      <Dialog open={view?.type === 'story'} onClose={close} labelledBy={titleId} size="lg">
        {view?.type === 'story' && <StoryView story={view.story} titleId={titleId} />}
      </Dialog>
      <Dialog open={view?.type === 'article'} onClose={close} labelledBy={titleId} size="lg">
        {view?.type === 'article' && <ArticleView article={view.article} titleId={titleId} />}
      </Dialog>
      <Dialog open={view?.type === 'enquiry'} onClose={close} labelledBy={titleId} size="xl">
        {view?.type === 'enquiry' && <EnquiryView intent={view.intent} program={view.program} titleId={titleId} />}
      </Dialog>
    </>
  )
}

function PageHint({ path }: { path: string }) {
  return (
    <p className="text-[0.75rem] text-muted">
      Future page: <code className="rounded bg-stone px-1.5 py-0.5 text-ink-soft">{path}</code>
    </p>
  )
}

function TopBar({ children }: { children?: ReactNode }) {
  const { close } = useApp()
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-paper/92 px-5 py-3 backdrop-blur sm:px-8">
      <div className="min-w-0">{children}</div>
      <DialogClose onClose={close} />
    </div>
  )
}

/* ------------------------------------------------------------ program */

function ProgramView({ program: p, titleId }: { program: Program; titleId: string }) {
  const { enquire } = useApp()
  const related = programs.filter((x) => x.slug !== p.slug && (x.subject === p.subject || x.category === p.category)).slice(0, 3)
  return (
    <article>
      <TopBar>
        <PageHint path={routes.program(p)} />
      </TopBar>
      <div className="grid lg:grid-cols-12">
        <div className="relative aspect-[16/10] lg:col-span-5 lg:aspect-auto">
          <div className="absolute inset-0">
            <Media asset={p.image} />
          </div>
        </div>
        <div className="p-6 sm:p-10 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryChip category={p.category} />
            <span className="text-[0.85rem] font-semibold text-blue">{p.award}</span>
          </div>
          <h2 id={titleId} className="font-editorial mt-4 text-[2.6rem] sm:text-[3.4rem]">
            {p.name}
          </h2>
          <p className="mt-4 text-[1.1rem] leading-relaxed text-ink-soft">{p.summary}</p>
          <dl className="mt-8 grid grid-cols-2 gap-5 rounded-2xl bg-stone p-5 text-[0.9rem] sm:grid-cols-4">
            {[
              ['Duration', p.duration],
              ['Format', p.format],
              ['Study mode', p.studyMode],
              ['Next start', p.start],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-muted">{k}</dt>
                <dd className="mt-1 font-semibold text-ink">
                  <WithPlaceholders text={v} />
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button arrow onClick={() => enquire('apply', p.slug)}>
              Apply Now
            </Button>
            <Button variant="secondary" icon="map" onClick={() => enquire('visit', p.slug)}>
              Book a Visit
            </Button>
            <Button variant="secondary" icon="download" onClick={() => enquire('prospectus', p.slug)}>
              Program guide
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-10 border-t border-line p-6 sm:p-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h3 className="eyebrow text-blue">Overview</h3>
          {p.overview.map((para) => (
            <p key={para} className="mt-4 text-[1rem] leading-relaxed text-ink-soft">
              {para}
            </p>
          ))}
          <h3 className="eyebrow mt-10 text-blue">Example modules</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {p.modules.map((m, i) => (
              <li key={m} className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-[0.95rem] text-ink">
                <span className="text-[0.75rem] font-semibold text-muted tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                {m}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[0.8rem] text-muted">Modules are indicative and may change as the curriculum is reviewed.</p>
        </div>
        <div className="space-y-8 lg:col-span-5">
          <div>
            <h3 className="eyebrow text-blue">Key features</h3>
            <ul className="mt-4 space-y-3">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-[0.95rem] text-ink">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-soft text-green-deep">
                    <Icon name="check" className="size-3" />
                  </span>
                  <span>
                    <WithPlaceholders text={h} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-blue">Pathways students explore</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.pathways.map((x) => (
                <li key={x} className="rounded-full bg-blue-soft px-3 py-1.5 text-[0.85rem] text-ink">
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[0.8rem] text-muted">Illustrative directions only — individual outcomes vary.</p>
          </div>
          <div className="rounded-2xl border border-line p-5">
            <h3 className="eyebrow text-blue">Entry requirements</h3>
            <p className="mt-3 text-[0.95rem] text-ink-soft">
              <WithPlaceholders text={p.entry} />
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="border-t border-line bg-cream p-6 sm:p-10">
          <h3 className="font-editorial text-[1.75rem]">You might also like</h3>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <ProgramCard program={r} headingLevel={4} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}

/* ------------------------------------------------------------ educator */

function EducatorView({ educator: e, titleId }: { educator: Educator; titleId: string }) {
  const { enquire } = useApp()
  return (
    <article>
      <TopBar>
        <PageHint path={routes.educator(e)} />
      </TopBar>
      <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden rounded-[20px]">
            <Portrait spec={e.portrait} photo={e.photo} name={e.name} />
          </div>
        </div>
        <div className="md:col-span-7">
          <p className="text-[0.85rem] font-semibold text-blue">{e.department}</p>
          <h2 id={titleId} className="font-editorial mt-2 text-[2.6rem]">
            {e.name}
          </h2>
          <p className="mt-1 text-muted">{e.title}</p>
          {e.longBio.map((para) => (
            <p key={para} className="mt-5 text-[1rem] leading-relaxed text-ink-soft">
              <WithPlaceholders text={para} />
            </p>
          ))}
          <h3 className="eyebrow mt-8 text-blue">Expertise</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {e.expertise.map((x) => (
              <li key={x} className="rounded-full bg-stone px-3 py-1.5 text-[0.85rem] text-ink">
                {x}
              </li>
            ))}
          </ul>
          <h3 className="eyebrow mt-8 text-blue">Teaches</h3>
          <p className="mt-3 text-[0.95rem] text-ink-soft">{e.teaches.join(' · ')}</p>
          <Button variant="secondary" icon="chat" className="mt-8" onClick={() => enquire('info')}>
            Ask about this subject
          </Button>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------ story */

function StoryView({ story: s, titleId }: { story: StudentStory; titleId: string }) {
  const { explore } = useApp()
  return (
    <article>
      <TopBar>
        <PageHint path={routes.story(s)} />
      </TopBar>
      <div className="aspect-[16/7] overflow-hidden">
        <Media asset={s.image} />
      </div>
      <div className="mx-auto max-w-2xl p-6 sm:p-10">
        <p className="eyebrow text-blue">Student story</p>
        <h2 id={titleId} className="font-editorial mt-4 text-[2.4rem] sm:text-[3rem]">
          {s.headline}
        </h2>
        <div className="mt-6 flex items-center gap-4">
          <div className="size-14 overflow-hidden rounded-full">
            <Portrait spec={s.portrait} name={s.name} decorative />
          </div>
          <div>
            <p className="font-semibold text-ink">{s.name}</p>
            <p className="text-[0.9rem] text-muted">
              {s.program} · {s.stage}
            </p>
          </div>
        </div>
        <blockquote className="font-editorial mt-8 border-l-4 border-sun pl-6 text-[1.6rem] leading-snug text-ink italic">“{s.quote}”</blockquote>
        {s.story.map((para) => (
          <p key={para} className="mt-5 text-[1.02rem] leading-relaxed text-ink-soft">
            {para}
          </p>
        ))}
        <p className="mt-8 text-[0.8rem] text-muted">Demo story — fictional student, for illustration only.</p>
        <Button arrow className="mt-6" onClick={() => explore({ q: s.program.split(' ').slice(-2).join(' ') })}>
          Explore similar programs
        </Button>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------ article */

function ArticleView({ article: a, titleId }: { article: Article; titleId: string }) {
  return (
    <article>
      <TopBar>
        <PageHint path={routes.article(a)} />
      </TopBar>
      <div className="aspect-[16/7] overflow-hidden">
        <Media asset={a.image} />
      </div>
      <div className="mx-auto max-w-2xl p-6 sm:p-10">
        <p className="flex items-center gap-3 text-[0.85rem] text-muted">
          <span className="rounded-full bg-stone px-2.5 py-0.5 font-semibold text-ink-soft">{a.category}</span>
          <time dateTime={a.date}>{formatDate(a.date)}</time> · {a.readTime}
        </p>
        <h2 id={titleId} className="font-editorial mt-5 text-[2.4rem] sm:text-[3rem]">
          {a.title}
        </h2>
        <p className="mt-5 text-[1.15rem] leading-relaxed text-ink">{a.summary}</p>
        {a.body.map((para) => (
          <p key={para} className="mt-5 text-[1.02rem] leading-relaxed text-ink-soft">
            {para}
          </p>
        ))}
        <p className="mt-8 text-[0.85rem] text-muted">By {a.author}</p>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------ enquiry */

function EnquiryView({ intent, program, titleId }: { intent: EnquiryIntent; program?: string; titleId: string }) {
  const { enquire, close } = useApp()
  const meta = intents[intent]
  const programName = programs.find((p) => p.slug === program)
  return (
    <div className="grid lg:grid-cols-12">
      <aside className="on-dark relative overflow-hidden bg-navy p-6 text-on-dark sm:p-10 lg:col-span-5">
        <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -right-16 -bottom-16 size-80 text-on-dark/5">
          <path d="M40 180V90a60 60 0 0 1 120 0v90" fill="none" stroke="currentColor" strokeWidth="14" />
        </svg>
        <div className="flex items-start justify-between gap-4 lg:block">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-sun text-navy">
            <Icon name={meta.icon} className="size-6" />
          </span>
          <div className="lg:hidden">
            <DialogClose onClose={close} />
          </div>
        </div>
        <h2 id={titleId} className="font-editorial mt-6 text-[2.4rem] text-on-dark sm:text-[2.9rem]">
          {meta.title}
        </h2>
        <p className="mt-4 text-[1rem] leading-relaxed text-on-dark-muted">{meta.body}</p>
        {programName && (
          <p className="mt-6 rounded-xl border border-navy-line px-4 py-3 text-[0.9rem] text-on-dark">
            <span className="text-on-dark-muted">Program: </span>
            {programName.award} {programName.name}
          </p>
        )}
        <div className="relative mt-10 space-y-3 border-t border-navy-line pt-8 text-[0.92rem]">
          <p className="text-on-dark-muted">Prefer to talk now?</p>
          <a href={institution.phone.href} className="flex min-h-11 items-center gap-3 font-semibold text-on-dark hover:text-sun">
            <Icon name="phone" className="size-5 text-sun" />
            {institution.phone.display}
          </a>
          <a href={`mailto:${institution.email}`} className="flex min-h-11 items-center gap-3 font-semibold break-all text-on-dark hover:text-sun">
            <Icon name="mail" className="size-5 shrink-0 text-sun" />
            {institution.email}
          </a>
          <p className="text-[0.85rem] text-on-dark-muted">
            {institution.admissionsHours[0].days}, {institution.admissionsHours[0].hours}
          </p>
        </div>
      </aside>
      <div className="p-6 sm:p-10 lg:col-span-7">
        <div className="flex items-start justify-between gap-4">
          <div role="group" aria-label="What would you like to do?" className="flex flex-wrap gap-1.5">
            {intentOrder.map((i) => (
              <button
                key={i}
                type="button"
                aria-pressed={i === intent}
                onClick={() => enquire(i, program)}
                className={`min-h-10 shrink-0 rounded-full px-3.5 text-[0.82rem] font-semibold transition-colors ${i === intent ? 'bg-navy text-on-dark' : 'border border-line text-ink-soft hover:border-ink'}`}
              >
                {intents[i].label}
              </button>
            ))}
          </div>
          <div className="hidden lg:block">
            <DialogClose onClose={close} />
          </div>
        </div>
        <div className="mt-8">
          {/* key resets form state when the intent changes */}
          <EnquiryForm key={intent} intent={intent} program={program} />
        </div>
        <p className="mt-6 text-[0.75rem] text-muted">Demo form — submissions are not sent.</p>
      </div>
    </div>
  )
}
