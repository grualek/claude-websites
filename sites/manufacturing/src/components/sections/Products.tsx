import { productFamilies } from '../../content/products'
import { routes } from '../../lib/routes'
import { useApp } from '../../state/AppState'
import { ArrowChip } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'

export function Products() {
  const { openDetail } = useApp()
  return (
    <section id="products" aria-labelledby="products-title" className="bg-paper py-24 lg:py-32">
      <div className="container-page">
        <SectionHeader
          index="03"
          eyebrow="Products"
          id="products-title"
          title="Product families we build to print."
          intro="Recurring product families with defined materials and processes. Each has its own documentation, and each can be adapted to your specification."
        />

        <div className="mt-14 lg:mt-20" data-reveal>
          <div aria-hidden="true" className="label-mono hidden grid-cols-12 gap-6 border-b border-ink pb-3 text-[0.625rem] text-muted md:grid">
            <span className="col-span-1">Ref.</span>
            <span className="col-span-5">Product family</span>
            <span className="col-span-3">Materials</span>
            <span className="col-span-3">Processes</span>
          </div>
          <ul className="border-t border-ink md:border-t-0">
            {productFamilies.map((p) => (
              <li key={p.slug} className="border-b border-line">
                <a
                  href={routes.product(p)}
                  onClick={(e) => {
                    e.preventDefault()
                    openDetail({ kind: 'product', slug: p.slug })
                  }}
                  className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-6 transition-colors hover:bg-bone md:grid-cols-12 md:px-0"
                >
                  <span className="label-mono text-signal-deep md:col-span-1">{p.code}</span>
                  <span className="col-span-2 md:col-span-5 md:pr-6">
                    <span className="font-headline block text-[1.375rem] text-ink transition-transform duration-300 group-hover:translate-x-1 sm:text-[1.625rem]" style={{ letterSpacing: '-0.02em' }}>
                      {p.title}
                    </span>
                    <span className="mt-1.5 block text-[0.875rem] text-muted">{p.summary}</span>
                  </span>
                  <span className="col-span-2 font-mono text-[0.75rem] text-ink-soft md:col-span-3">
                    <span className="label-mono mr-2 text-[0.5625rem] text-muted md:hidden">Materials</span>
                    {p.materials}
                  </span>
                  <span className="col-span-2 flex items-center justify-between gap-4 font-mono text-[0.75rem] text-ink-soft md:col-span-3">
                    <span>
                      <span className="label-mono mr-2 text-[0.5625rem] text-muted md:hidden">Processes</span>
                      {p.processes}
                    </span>
                    <ArrowChip className="max-md:hidden" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
