import { useId, useState } from 'react'
import { faqs } from '../../content/patients'
import { clinic } from '../../content/clinic'
import { Icon } from '../ui/Icon'
import { SectionHeader } from '../ui/SectionHeader'

export function Faq() {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null)
  const baseId = useId()

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 sm:py-28 lg:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader
            id="faq-title"
            eyebrow="Resources & FAQ"
            title="Questions, answered."
            intro="Can’t find what you need? Our patient coordinators are available during opening hours."
            aside={
              <a
                href={clinic.phone.href}
                className="inline-flex min-h-11 items-center gap-3 rounded-full border border-ink/15 py-2 pr-5 pl-2 font-medium text-ink transition-colors hover:bg-paper"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-blue-mist text-blue-deep">
                  <Icon name="phone" className="size-4" />
                </span>
                {clinic.phone.display}
              </a>
            }
          />
        </div>

        <div className="lg:col-span-7">
          <ul className="border-t border-line">
            {faqs.map((item) => {
              const isOpen = open === item.id
              const btnId = `${baseId}-btn-${item.id}`
              const panelId = `${baseId}-panel-${item.id}`
              return (
                <li key={item.id} className="border-b border-line">
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : item.id)}
                      className="group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-[1.125rem] font-medium text-ink sm:text-[1.1875rem]"
                    >
                      {item.question}
                      <span
                        className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-300 ease-calm ${
                          isOpen ? 'rotate-45 border-ink bg-ink text-paper' : 'border-line text-ink group-hover:border-ink/40'
                        }`}
                      >
                        <Icon name="plus" className="size-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    hidden={!isOpen}
                    className="pr-14 pb-7"
                  >
                    <p className="max-w-[40rem] leading-relaxed text-ink-soft">{item.answer}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
