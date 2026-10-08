import { principles } from '../../content/site'
import { Icon } from '../ui/Icon'
import { SectionHeader } from '../ui/SectionHeader'

export function WhyUs() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 lg:py-32">
      <div className="container-page">
        <SectionHeader
          index="04"
          eyebrow="Why Clients Choose Us"
          id="about-title"
          title={
            <>
              Counsel defined by judgment, <em className="italic text-bronze-deep">not volume.</em>
            </>
          }
          intro="Calder & Rowe is a focused firm by design. We take on matters where we can give each client real attention — and we measure our work by the quality of the decisions it makes possible."
        />

        <ul className="mt-16 grid border-t border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {principles.map((p, i) => (
            <li
              key={p.title}
              className="border-b border-line py-10 sm:px-8 sm:odd:border-r sm:odd:pl-0 lg:border-r lg:border-b-0 lg:[&:nth-child(3)]:pl-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Icon name={p.icon} className="size-7 text-bronze-deep" />
              <h3 className="font-editorial mt-10 text-[1.75rem]">{p.title}</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
