import { proofPoints } from '../../content/site'
import { Icon } from '../ui/Icon'

export function ProofBar() {
  return (
    <section aria-label="What we deliver" className="on-dark bg-charcoal text-on-dark">
      <ul className="container-page grid sm:grid-cols-2 lg:grid-cols-4">
        {proofPoints.map((pt, i) => (
          <li
            key={pt.code}
            data-reveal
            className={`flex flex-col gap-6 border-graphite-line py-10 sm:px-8 lg:py-12 ${i > 0 ? 'border-t sm:border-t-0' : ''} ${i % 2 === 1 ? 'sm:border-l' : ''} ${
              i > 1 ? 'sm:border-t lg:border-t-0' : ''
            } lg:border-l lg:first:border-l-0 lg:first:pl-0`}
          >
            <div className="flex items-center justify-between">
              <span className="font-headline text-[2.75rem] leading-none text-on-dark/90 tabular-nums">{pt.code}</span>
              <Icon name={pt.icon} className="size-7 text-signal" />
            </div>
            <div>
              <h2 className="font-headline text-[1.25rem] text-on-dark" style={{ letterSpacing: '-0.015em' }}>
                {pt.title}
              </h2>
              <p className="mt-2 max-w-xs text-[0.875rem] leading-relaxed text-on-dark-muted">{pt.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
