import type { CSSProperties } from 'react'
import { institution } from '../../content/institution'
import { programs } from '../../content/programs'
import { about, pillars } from '../../content/site'
import { Icon } from '../ui/Icon'
import { SectionHeader } from '../ui/Text'

const facts = [
  { value: String(institution.founded), label: 'Teaching since' },
  { value: String(programs.length), label: 'Programs across five levels' },
  { value: '12–30', label: 'Students in a typical seminar' },
]

/** About / why choose us: four pillars in hairline-separated columns, with a few institutional facts. */
export function WhyChooseUs() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y">
      <div className="container-page">
        <SectionHeader index="03" eyebrow="Why Larkmoor" id="about-title" title={about.title} intro={about.intro} />

        <ul className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
              className={`group flex flex-col border-b border-line py-10 sm:px-8 lg:border-b-0 ${i % 2 ? 'sm:border-l' : ''} ${i > 0 ? 'lg:border-l' : ''} ${i === 0 ? 'sm:pl-0' : ''}`}
            >
              <span className="flex size-14 items-center justify-center rounded-2xl bg-blue-soft text-blue transition-colors duration-500 group-hover:bg-sun group-hover:text-navy">
                <Icon name={p.icon} className="size-7" />
              </span>
              <span className="mt-8 text-[0.8rem] font-semibold text-muted tabular-nums">0{i + 1}</span>
              <h3 className="font-editorial mt-2 text-[1.9rem] leading-tight">{p.title}</h3>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ul>

        <dl className="mt-14 grid gap-6 rounded-[24px] bg-stone p-8 sm:grid-cols-3 sm:p-10" data-reveal>
          {facts.map((f) => (
            <div key={f.label} className="flex items-baseline gap-4 sm:flex-col sm:gap-2">
              <dt className="order-2 text-[0.95rem] text-muted">{f.label}</dt>
              <dd className="font-editorial order-1 min-w-[6.5rem] text-[2.6rem] leading-none whitespace-nowrap text-ink sm:min-w-0 sm:text-[3.5rem]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
