import { managementServices, managementTiers } from '../../content/site'
import { company } from '../../content/company'
import { useApp } from '../../state/AppState'
import { Button, ButtonLink } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { Eyebrow } from '../ui/SectionHeader'

export function Management() {
  const { openEnquiry } = useApp()
  return (
    <section id="management" aria-labelledby="management-title" className="bg-olive-deep py-20 text-paper sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow light>
              <span className="tabular-nums">08</span> <span aria-hidden>—</span> For landlords
            </Eyebrow>
            <h2 id="management-title" className="font-editorial mt-5 text-[2.75rem] text-paper sm:text-[3.5rem] lg:text-[4.25rem]">
              Property management, <em className="text-[#d7d4b0]">quietly handled</em>.
            </h2>
            <p className="mt-6 max-w-md text-[0.9875rem] leading-relaxed text-paper/75">
              Whether you let a single flat or a growing portfolio, our lettings and management team looks after your tenants, your property and your paperwork —
              and keeps you informed without needing to chase.
            </p>
            <div className="mt-10 aspect-[4/3] overflow-hidden rounded-[3px]">
              <Media asset={{ scene: 'apartment', tone: 'golden', alt: 'Modern apartment building with balconies in evening sun' }} sizes="40vw" />
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button variant="light" size="lg" icon="arrow-right" onClick={() => openEnquiry('management')}>
                Talk About Property Management
              </Button>
              <ButtonLink variant="outline-light" size="lg" href={company.lettingsPhone.href} icon="phone">
                {company.lettingsPhone.display}
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-paper/15 border-y border-paper/15">
              {managementServices.map((s) => (
                <li key={s.title} className="grid gap-4 py-6 sm:grid-cols-[3rem_14rem_1fr] sm:items-start">
                  <Icon name={s.icon} className="size-7 text-[#d7d4b0]" />
                  <h3 className="font-editorial text-[1.75rem] leading-tight text-paper">{s.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-paper/75">{s.body}</p>
                </li>
              ))}
            </ul>

            <h3 className="eyebrow mt-14 text-paper/70">Choose your level of service</h3>
            <ul className="mt-5 grid gap-4 md:grid-cols-3">
              {managementTiers.map((t) => (
                <li
                  key={t.name}
                  className={`relative flex flex-col rounded-[3px] border p-6 ${t.recommended ? 'border-paper bg-paper text-ink-soft' : 'border-paper/25 text-paper/80'}`}
                >
                  {t.recommended && <span className="eyebrow absolute -top-3 left-6 rounded-[2px] bg-[#d7d4b0] px-2 py-1 text-[0.6rem] text-olive-deep">Recommended</span>}
                  <p className={`font-editorial text-[1.75rem] ${t.recommended ? 'text-ink' : 'text-paper'}`}>{t.name}</p>
                  <p className="mt-2 text-sm leading-relaxed">{t.summary}</p>
                  <ul className="mt-5 space-y-2 text-[0.8125rem]">
                    {t.includes.map((x) => (
                      <li key={x} className="flex items-start gap-2">
                        <Icon name="check" className={`mt-0.5 size-4 shrink-0 ${t.recommended ? 'text-olive' : 'text-[#d7d4b0]'}`} />
                        {x}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-paper/60">Fees are tailored to each property and confirmed in writing before any agreement.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
