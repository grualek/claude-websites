import type { Program, ProgramCategory } from '../../content/types'
import { useApp } from '../../state/AppState'
import { TextAction } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { plain } from '../ui/Text'

export const categoryTone: Record<ProgramCategory, string> = {
  Undergraduate: 'bg-blue-soft text-blue-hover',
  Postgraduate: 'bg-navy text-on-dark',
  Professional: 'bg-green-soft text-green-deep',
  Online: 'bg-sun-soft text-ink',
  'Short Courses': 'bg-stone text-ink',
}

export function CategoryChip({ category, className = '' }: { category: ProgramCategory; className?: string }) {
  return <span className={`inline-flex min-h-7 items-center rounded-full px-3 text-[0.75rem] font-semibold tracking-[0.02em] ${categoryTone[category]} ${className}`}>{category}</span>
}

/**
 * Reusable program card (grid, related programs, search results). The whole card is one target via a
 * stretched button inside the heading, so the heading keeps its semantics.
 */
export function ProgramCard({ program, headingLevel = 3 }: { program: Program; headingLevel?: 3 | 4 }) {
  const { open } = useApp()
  const Heading = headingLevel === 3 ? 'h3' : 'h4'
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-paper transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-soft)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue has-[:focus-visible]:ring-offset-4 has-[:focus-visible]:ring-offset-cream hover:-translate-y-1 hover:border-ink/40 hover:shadow-[0_30px_60px_-40px_rgb(20_33_58/0.55)]">
      <div className="media-zoom relative aspect-[16/10] overflow-hidden bg-stone">
        <Media asset={program.image} decorative sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <CategoryChip category={program.category} />
          {program.format !== 'On campus' && (
            <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full bg-paper/90 px-3 text-[0.75rem] font-semibold text-ink backdrop-blur">
              <Icon name={program.format === 'Online' ? 'laptop' : 'layers'} className="size-3.5" />
              {program.format}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[0.8rem] font-semibold tracking-[0.04em] text-blue">{program.award}</p>
        <Heading className="font-editorial mt-2 text-[1.75rem] leading-[1.08]">
          <button type="button" onClick={() => open({ type: 'program', program })} className="text-left after:absolute after:inset-0 after:rounded-[22px] after:content-[''] focus-visible:outline-none">
            {program.name}
          </button>
        </Heading>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{program.summary}</p>
        <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-5 text-[0.84rem]">
          <div>
            <dt className="text-muted">Duration</dt>
            <dd className="mt-0.5 font-semibold text-ink">{program.duration}</dd>
          </div>
          <div>
            <dt className="text-muted">Format</dt>
            <dd className="mt-0.5 font-semibold text-ink">
              {program.format} · {program.studyMode}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="sr-only">Next start</dt>
            <dd className="flex items-center gap-2 text-ink-soft">
              <Icon name="calendar" className="size-4 text-blue" />
              Starts {plain(program.start)}
            </dd>
          </div>
        </dl>
        <div className="mt-auto pt-6">
          <TextAction>View program</TextAction>
        </div>
      </div>
    </article>
  )
}
