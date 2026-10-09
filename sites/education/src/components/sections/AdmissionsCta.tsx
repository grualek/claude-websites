import { admissionsCta } from '../../content/site'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'

/** Large closing conversion block: Apply Now / Talk to Admissions, with the other secondary actions below. */
export function AdmissionsCta() {
  const { enquire } = useApp()
  return (
    <section id="apply" aria-labelledby="cta-title" className="py-6 sm:py-10">
      <div className="container-page">
        <div className="on-dark relative grid overflow-hidden rounded-[32px] bg-navy text-on-dark lg:grid-cols-12">
          <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-20 lg:col-span-7 lg:py-28 lg:pl-16">
            <p className="eyebrow flex items-center gap-3 text-sun">
              <span aria-hidden="true" className="h-px w-8 bg-on-dark/30" />
              Admissions are open
            </p>
            <h2 id="cta-title" className="font-editorial mt-7 text-[3.2rem] text-on-dark sm:text-[4.6rem] xl:text-[5.6rem]">
              Ready to take the <em className="text-sun italic">next step?</em>
            </h2>
            <p className="mt-7 max-w-lg text-[1.1rem] leading-relaxed text-on-dark-muted">{admissionsCta.body}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button variant="sun" size="lg" arrow onClick={() => enquire('apply')}>
                Apply Now
              </Button>
              <Button variant="outline-light" size="lg" icon="chat" onClick={() => enquire('talk')}>
                Talk to Admissions
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-2 border-t border-navy-line pt-7 text-[0.92rem]">
              {(
                [
                  ['visit', 'Book a Visit', 'map'],
                  ['info', 'Request Information', 'mail'],
                  ['prospectus', 'Download Prospectus', 'download'],
                ] as const
              ).map(([intent, label, icon]) => (
                <li key={intent}>
                  <button type="button" onClick={() => enquire(intent)} className="inline-flex min-h-11 items-center gap-2 font-semibold text-on-dark hover:text-sun">
                    <Icon name={icon} className="size-4 text-sun" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[18rem] lg:col-span-5 lg:min-h-full">
            <div className="absolute inset-0 lg:inset-y-10 lg:right-10 lg:left-0 lg:overflow-hidden lg:rounded-t-[999px] lg:rounded-b-[24px]">
              <Media asset={admissionsCta.image} decorative />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
