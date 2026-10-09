import type { CSSProperties } from 'react'
import { studentLife } from '../../content/site'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Media } from '../ui/Media'
import { SectionHeader } from '../ui/Text'

const layout = [
  'sm:col-span-2 lg:col-span-3 lg:row-span-2',
  'lg:col-span-3',
  'lg:col-span-3',
  'lg:col-span-2',
  'lg:col-span-2',
  'sm:col-span-2 lg:col-span-2',
]

/** Rich image grid of student life — each tile maps to a /student-life/{slug}/ page. */
export function StudentLife() {
  const { enquire } = useApp()
  return (
    <section id="student-life" aria-labelledby="life-title" className="section-y bg-green-soft/70">
      <div className="container-page">
        <SectionHeader
          index="06"
          eyebrow="Student life"
          id="life-title"
          title={
            <>
              Find your people. <em className="italic">Then find your voice.</em>
            </>
          }
          intro="Life at Larkmoor happens between classes as much as in them — in clubs, studios, sports, volunteering and the friendships that grow from all of it."
          action={
            <Button variant="secondary" icon="calendar" onClick={() => enquire('visit')}>
              Come to an open day
            </Button>
          }
        />
        <ul className="mt-14 grid auto-rows-[18rem] gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[18.5rem]">
          {studentLife.map((t, i) => (
            <li key={t.slug} data-reveal style={{ '--reveal-delay': `${(i % 3) * 90}ms` } as CSSProperties} className={`group relative overflow-hidden rounded-[22px] bg-stone ${layout[i]}`}>
              <div className="media-zoom absolute inset-0">
                <Media asset={t.image} sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw" />
              </div>
              <div className="absolute bottom-3 left-3 max-w-[min(17rem,calc(100%-1.5rem))] rounded-xl bg-paper/95 px-4 py-3 shadow-[0_20px_40px_-24px_rgb(20_33_58/0.6)] backdrop-blur">
                <h3 className="font-editorial text-[1.25rem] leading-tight">{t.title}</h3>
                <p className="mt-0.5 text-[0.82rem] leading-snug text-muted">{t.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
