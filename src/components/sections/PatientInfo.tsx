import { infoTopics } from '../../content/patients'
import { Icon } from '../ui/Icon'
import { SectionHeader } from '../ui/SectionHeader'
import { useDialogs } from '../dialogs/DialogProvider'

const cardClass =
  "group relative flex h-full flex-col rounded-3xl border border-line bg-paper p-7 text-left transition-[border-color,box-shadow,transform] duration-300 ease-calm hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_24px_50px_-34px_rgb(20_33_58/0.45)] sm:p-8"

export function PatientInfo() {
  const { openInfo } = useDialogs()
  return (
    <section id="patient-information" aria-labelledby="patient-info-title" className="py-20 sm:py-28 lg:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              id="patient-info-title"
              eyebrow="Patient information"
              title="Everything you need before your visit."
              intro="Practical guidance for new and returning patients. If you can’t find what you’re looking for, our front desk is always happy to help."
              tone="sage"
            />
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {infoTopics.map((topic) => {
            const inner = (
              <>
                <span className="flex size-11 items-center justify-center rounded-full bg-sage-soft text-sage-deep">
                  <Icon name={topic.icon} className="size-5" />
                </span>
                <h3 className="font-display-tight mt-7 text-[1.4375rem] leading-tight font-[420]">{topic.title}</h3>
                <p className="mt-2.5 leading-relaxed text-muted">{topic.summary}</p>
                <span className="mt-auto flex items-center gap-2 pt-6 text-[0.9375rem] font-medium text-ink">
                  {topic.href ? 'View answers' : 'Read more'}
                  <Icon name="arrow-right" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </>
            )
            return (
              <li key={topic.id}>
                {topic.href ? (
                  <a href={topic.href} className={cardClass}>
                    {inner}
                  </a>
                ) : (
                  <button type="button" className={`${cardClass} w-full`} onClick={() => openInfo(topic)}>
                    {inner}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
