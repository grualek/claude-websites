import { featuredCapability as f } from '../../content/capabilities'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Media } from '../ui/Media'

export function FeaturedCapability() {
  const { requestQuote, openDetail } = useApp()
  return (
    <section aria-labelledby="featured-title" className="on-dark relative overflow-hidden bg-charcoal text-on-dark-muted">
      <div className="grid lg:grid-cols-2">
        {/* imagery */}
        <div className="relative min-h-[26rem] sm:min-h-[34rem] lg:min-h-full" data-reveal>
          <div className="absolute inset-0">
            <Media asset={{ scene: 'component', alt: 'Precision machined flange with dimension and datum callouts' }} sizes="(min-width: 1024px) 50vw, 100vw" fit="contain" />
          </div>
          <div className="absolute bottom-6 left-6 hidden w-[42%] md:block max-w-[17rem] border border-graphite-line bg-charcoal p-1.5 shadow-2xl sm:bottom-8 sm:left-8">
            <div className="aspect-[4/3]">
              <Media asset={{ scene: 'drawing', alt: 'Engineering drawing of the same component' }} sizes="18rem" />
            </div>
            <p className="label-mono px-1.5 pt-2 pb-1 text-[0.5625rem] text-on-dark-muted">DWG → Part · Rev controlled</p>
          </div>
        </div>

        {/* copy */}
        <div className="bg-blueprint-dark px-4 py-20 sm:px-8 lg:px-14 lg:py-28 xl:px-20">
          <div className="flex items-center gap-4 border-t border-graphite-line pt-4" data-reveal>
            <span className="label-mono text-signal">02</span>
            <span className="label-mono">{f.eyebrow}</span>
          </div>
          <h2 id="featured-title" className="font-headline mt-8 text-[2.375rem] text-on-dark sm:text-[3.25rem] lg:text-[3.75rem]" data-reveal>
            {f.title}
          </h2>
          <p className="mt-6 max-w-xl text-[1rem] leading-relaxed" data-reveal>
            {f.intro}
          </p>

          <ol className="mt-12 grid gap-px bg-graphite-line sm:grid-cols-2" data-reveal>
            {f.stages.map((s) => (
              <li key={s.code} className="bg-charcoal p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center border border-signal font-mono text-[0.75rem] text-signal">{s.code}</span>
                  <h3 className="font-headline text-[1.25rem] text-on-dark" style={{ letterSpacing: '-0.015em' }}>
                    {s.title}
                  </h3>
                </div>
                <p className="mt-4 text-[0.875rem] leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal>
            <Button variant="signal" size="lg" arrow onClick={() => requestQuote({ projectType: 'CNC machining' })}>
              Request a Quote
            </Button>
            <Button variant="outline-light" size="lg" onClick={() => openDetail({ kind: 'capability', slug: f.slug })}>
              View capability details
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
