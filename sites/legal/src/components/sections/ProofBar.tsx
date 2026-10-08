import { proofPoints } from '../../content/site'
import { Icon } from '../ui/Icon'

export function ProofBar() {
  return (
    <section aria-label="Why clients work with us" className="border-y border-line bg-paper">
      <ul className="container-page grid grid-cols-1 divide-y divide-line-soft sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {proofPoints.map((p, i) => (
          <li
            key={p.title}
            className={`flex items-start gap-4 py-6 sm:py-8 lg:px-8 lg:first:pl-0 lg:last:pr-0 ${i < 2 ? 'sm:border-b sm:border-line-soft lg:border-b-0' : ''} ${i % 2 === 0 ? 'sm:pr-6' : 'sm:pl-6 lg:pl-8'}`}
          >
            <Icon name={p.icon} className="mt-0.5 size-5 shrink-0 text-bronze-deep" />
            <div>
              <p className="text-[0.9375rem] font-medium text-ink">{p.title}</p>
              <p className="mt-1 text-[0.8125rem] text-muted">{p.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
