import { specialists } from '../../content/people'
import { Icon } from '../ui/Icon'
import { Portrait } from '../ui/Portrait'
import { SectionHeader } from '../ui/SectionHeader'
import { useDialogs } from '../dialogs/DialogProvider'
import { DemoBadge } from '../dialogs/Dialogs'

export function Specialists() {
  const { openSpecialist } = useDialogs()
  return (
    <section id="specialists" aria-labelledby="specialists-title" className="py-20 sm:py-28 lg:py-32">
      <div className="container-page">
        <SectionHeader
          id="specialists-title"
          align="split"
          eyebrow="Our specialists"
          title="Experienced clinicians who take the time to listen."
          intro="Meet some of the physicians and therapists who make up our care team. Each brings specialist training and a shared commitment to clear, compassionate care."
        />

        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {specialists.map((person) => (
            <li key={person.id} className="group relative flex flex-col">
              <div className="relative aspect-[4/4.8] overflow-hidden rounded-t-[7rem] rounded-b-3xl">
                <Portrait person={person} className="transition-transform duration-700 ease-calm group-hover:scale-[1.03]" />
                {person.isDemo && <DemoBadge className="absolute bottom-4 left-4 bg-paper/90!">Demo profile</DemoBadge>}
              </div>
              <p className="mt-6 text-sm font-medium tracking-[0.06em] text-blue uppercase">{person.specialty}</p>
              <h3 className="font-display-tight mt-2 text-[1.625rem] leading-tight font-[420]">{person.name}</h3>
              <p className="mt-1.5 text-sm text-muted">{person.credentials}</p>
              <p className="mt-4 flex-1 leading-relaxed text-ink-soft">{person.shortBio}</p>
              <button
                type="button"
                onClick={() => openSpecialist(person)}
                className="mt-5 inline-flex min-h-11 items-center gap-2 self-start font-medium text-ink after:absolute after:inset-0 after:content-['']"
                aria-label={`View profile: ${person.name}`}
              >
                <span className="underline decoration-ink/25 underline-offset-[6px] transition-colors group-hover:decoration-ink">View profile</span>
                <Icon name="arrow-right" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
