import { pillars } from '../../content/site'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Eyebrow } from '../ui/SectionHeader'

export function WhyUs() {
  const { openEnquiry } = useApp()
  return (
    <section id="about" aria-labelledby="why-title" className="bg-charcoal py-20 text-paper sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow light>
              <span className="tabular-nums">06</span> <span aria-hidden>—</span> Why work with us
            </Eyebrow>
            <h2 id="why-title" className="font-editorial mt-5 text-[2.75rem] text-paper sm:text-[3.5rem] lg:text-[4.25rem]">
              Advice you can <em className="text-[#c9c7a6]">plan a life around</em>.
            </h2>
            <p className="mt-6 max-w-md text-[0.9875rem] leading-relaxed text-paper/75">
              We’re a small, independent team based on Linden Row. We’d rather tell you the truth about a price than win an instruction on a promise — and we
              measure ourselves on whether you’d call us again.
            </p>
            <figure className="mt-10 border-l border-paper/25 pl-6">
              <blockquote className="font-editorial text-[1.625rem] leading-snug text-paper/90 italic">
                “The best advice is often the least convenient for an agent. We give it anyway.”
              </blockquote>
              <figcaption className="mt-4 text-xs tracking-[0.1em] text-paper/60 uppercase">Eleanor Hollis, Director</figcaption>
            </figure>
            <Button variant="light" size="lg" icon="arrow-right" className="mt-10" onClick={() => openEnquiry('advisor')}>
              Speak With an Advisor
            </Button>
          </div>

          <ol className="grid gap-px self-start overflow-hidden rounded-[3px] bg-paper/15 sm:grid-cols-2 lg:col-span-7">
            {pillars.map((p, i) => (
              <li key={p.title} className="flex flex-col bg-charcoal p-7 sm:p-9">
                <div className="flex items-center justify-between">
                  <Icon name={p.icon} className="size-7 text-[#c9c7a6]" />
                  <span className="font-editorial text-[1.25rem] text-paper/40 tabular-nums">0{i + 1}</span>
                </div>
                <h3 className="font-editorial mt-10 text-[2rem] text-paper">{p.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper/70">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
