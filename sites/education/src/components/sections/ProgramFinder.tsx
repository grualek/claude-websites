import { useId, useMemo, useState } from 'react'
import { categories, categoryBlurb, formats, programs } from '../../content/programs'
import { filterPrograms, inCategory, type CategoryFilter, type FormatFilter } from '../../lib/programs'
import { useApp } from '../../state/AppState'
import { ProgramCard } from '../programs/ProgramCard'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { SectionHeader } from '../ui/Text'

const INITIAL = 6

/**
 * Program discovery: level filter (toggle buttons with counts), keyword search and format filter,
 * a live result count and a responsive grid of reusable ProgramCards. In production this becomes the
 * /programs/ search page; each filter maps to a crawlable level hub (/programs/{level}/).
 */
export function ProgramFinder() {
  const { query, setQuery, enquire } = useApp()
  const [expanded, setExpanded] = useState(false)
  const searchId = useId()
  const formatId = useId()

  const results = useMemo(() => filterPrograms(programs, query), [query])
  const filtered = query.category !== 'All' || query.format !== 'Any' || query.q.trim() !== ''
  const visible = expanded || filtered ? results : results.slice(0, INITIAL)
  const tabs: CategoryFilter[] = ['All', ...categories]

  const update = (q: Parameters<typeof setQuery>[0]) => {
    setQuery(q)
    setExpanded(false)
  }

  return (
    <section id="programs" aria-labelledby="programs-title" className="section-y">
      <div className="container-page">
        <SectionHeader
          index="01"
          eyebrow="Programs"
          id="programs-title"
          title={
            <>
              Find the program that fits <em className="italic">your next step.</em>
            </>
          }
          intro="Degrees, master’s, professional certificates, online learning and short courses — on campus, online or a blend of both."
        />

        {/* filters */}
        <div className="mt-14 rounded-[24px] border border-line bg-paper p-3 sm:p-4" data-reveal>
          <div role="group" aria-label="Program level" className="rail -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
            {tabs.map((t) => {
              const count = t === 'All' ? programs.length : programs.filter((p) => inCategory(p, t)).length
              const selected = query.category === t
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => update({ category: t })}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-[0.9rem] font-semibold transition-colors ${
                    selected ? 'bg-navy text-on-dark' : 'text-ink-soft hover:bg-stone'
                  }`}
                >
                  {t === 'All' ? 'All programs' : t}
                  <span className={`rounded-full px-2 py-0.5 text-[0.72rem] tabular-nums ${selected ? 'bg-sun text-navy' : 'bg-stone text-muted'}`}>{count}</span>
                </button>
              )
            })}
          </div>
          <div className="mt-3 grid gap-3 border-t border-line pt-3 sm:grid-cols-[1fr_auto]">
            <div className="relative">
              <label htmlFor={searchId} className="sr-only">
                Search programs
              </label>
              <Icon name="search" className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" />
              <input
                id={searchId}
                type="search"
                value={query.q}
                onChange={(e) => update({ q: e.target.value })}
                placeholder="Search by subject, skill or keyword"
                className="min-h-12 w-full rounded-full border border-line bg-cream pr-12 pl-12 text-[1rem] text-ink placeholder:text-muted hover:border-ink/40 focus:border-blue focus:outline-none"
              />
              {query.q && (
                <button type="button" onClick={() => update({ q: '' })} className="absolute top-1/2 right-1 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:text-ink">
                  <Icon name="close" className="size-4" />
                  <span className="sr-only">Clear search</span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor={formatId} className="text-[0.88rem] font-semibold whitespace-nowrap text-ink">
                Study format
              </label>
              <select
                id={formatId}
                value={query.format}
                onChange={(e) => update({ format: e.target.value as FormatFilter })}
                className="min-h-12 w-full cursor-pointer rounded-full border border-line bg-cream pl-4 text-[0.95rem] text-ink hover:border-ink/40 focus:border-blue focus:outline-none sm:w-44"
              >
                <option value="Any">Any format</option>
                {formats.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* result summary */}
        <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 id="program-results-title" tabIndex={-1} className="font-editorial text-[1.75rem] focus:outline-none">
              {query.category === 'All' ? 'All programs' : query.category}
            </h3>
            <p className="mt-1 text-[0.95rem] text-muted" aria-live="polite">
              {query.category !== 'All' && <span>{categoryBlurb[query.category]} </span>}
              <span className="font-semibold text-ink">
                {results.length} {results.length === 1 ? 'program' : 'programs'}
              </span>
              {query.q.trim() && <span> matching “{query.q.trim()}”</span>}
              {query.format !== 'Any' && <span> · {query.format}</span>}
            </p>
          </div>
          {filtered && (
            <button type="button" onClick={() => update({ category: 'All', format: 'Any', q: '' })} className="min-h-11 text-[0.9rem] font-semibold text-ink underline decoration-sun decoration-2 underline-offset-[6px] hover:text-blue">
              Clear filters
            </button>
          )}
        </div>

        {results.length ? (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <li key={p.slug}>
                <ProgramCard program={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 flex flex-col items-start gap-5 rounded-[22px] border border-dashed border-line bg-paper p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-editorial text-[1.6rem] text-ink">No programs match yet.</p>
              <p className="mt-2 text-muted">Try a broader search, or tell us what you’re looking for — new programs launch every year.</p>
            </div>
            <Button variant="secondary" icon="chat" onClick={() => enquire('talk')}>
              Talk to Admissions
            </Button>
          </div>
        )}

        {!filtered && results.length > INITIAL && (
          <div className="mt-10 flex justify-center">
            <Button variant="secondary" aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
              {expanded ? 'Show fewer programs' : `Show all ${results.length} programs`}
            </Button>
          </div>
        )}

        <p className="mt-10 flex flex-wrap items-center gap-x-2 text-[0.95rem] text-muted">
          Not sure which program is right for you?
          <button type="button" onClick={() => enquire('talk')} className="min-h-11 font-semibold text-ink underline decoration-sun decoration-2 underline-offset-[6px] hover:text-blue">
            Talk it through with an adviser
          </button>
          or
          <button type="button" onClick={() => enquire('prospectus')} className="min-h-11 font-semibold text-ink underline decoration-sun decoration-2 underline-offset-[6px] hover:text-blue">
            download the prospectus
          </button>
        </p>
      </div>
    </section>
  )
}
