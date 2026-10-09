import { useId, type ReactNode } from 'react'
import { capabilities } from '../../content/capabilities'
import { caseStudies } from '../../content/caseStudies'
import { company } from '../../content/company'
import { industries } from '../../content/industries'
import { productFamilies } from '../../content/products'
import { faqs, resources } from '../../content/resources'
import type { IconName, MediaAsset } from '../../content/types'
import { routes } from '../../lib/routes'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Dialog, DialogClose } from '../ui/Dialog'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'

/* Detail views. Each one is the content of a future standalone page at the path shown in its header. */

function Shell({
  titleId,
  eyebrow,
  title,
  path,
  image,
  icon,
  children,
  onClose,
}: {
  titleId: string
  eyebrow: string
  title: string
  path: string
  image?: MediaAsset
  icon?: IconName
  children: ReactNode
  onClose: () => void
}) {
  return (
    <>
      <div className={`relative ${image ? 'aspect-[16/7] bg-charcoal' : 'border-b border-line bg-bone'}`}>
        {image && <Media asset={image} sizes="64rem" />}
        <div className="absolute top-4 right-4">
          <DialogClose onClose={onClose} light={!!image} />
        </div>
        {!image && (
          <div className="flex items-end gap-5 px-6 pt-10 pb-8 pr-20 sm:px-10">
            {icon && (
              <span className="flex size-14 shrink-0 items-center justify-center bg-charcoal text-on-dark">
                <Icon name={icon} className="size-7" />
              </span>
            )}
            <div>
              <p className="label-mono text-[0.625rem] text-signal-deep">{eyebrow}</p>
              <h2 id={titleId} className="font-headline mt-2 text-[2rem] sm:text-[2.5rem]">
                {title}
              </h2>
            </div>
          </div>
        )}
      </div>
      <div className="px-6 py-8 sm:px-10 sm:py-10">
        {image && (
          <>
            <p className="label-mono text-[0.625rem] text-signal-deep">{eyebrow}</p>
            <h2 id={titleId} className="font-headline mt-2 text-[2rem] sm:text-[2.5rem]">
              {title}
            </h2>
          </>
        )}
        <div className={image ? 'mt-6' : ''}>{children}</div>
        <p className="label-mono mt-10 border-t border-line pt-4 text-[0.5625rem] text-muted">
          Page · {company.url.replace('https://', '')}
          {path}
        </p>
      </div>
    </>
  )
}

function List({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h3 className="label-mono border-b border-ink pb-2 text-[0.625rem] text-ink">{title}</h3>
      <ul className="mt-2">
        {items.map((s) => (
          <li key={s} className="flex items-start gap-2.5 border-b border-line-soft py-2.5 text-[0.875rem] text-ink-soft">
            <span className="mt-2 size-1.5 shrink-0 bg-signal" aria-hidden="true" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Actions({ children }: { children: ReactNode }) {
  return <div className="mt-10 flex flex-col gap-3 sm:flex-row">{children}</div>
}

export function DetailDialogs() {
  const { detail, closeDetail, requestQuote, openLead } = useApp()
  const titleId = useId()

  let body: ReactNode = null
  let size: 'md' | 'lg' = 'lg'

  if (detail?.kind === 'capability') {
    const c = capabilities.find((x) => x.slug === detail.slug)
    if (c)
      body = (
        <Shell titleId={titleId} eyebrow={`Capability ${c.code}`} title={c.title} path={routes.capability(c)} icon={c.icon} onClose={closeDetail}>
          <p className="max-w-2xl text-[1rem] leading-relaxed text-ink-soft">{c.overview}</p>
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <List title="Services" items={c.services} />
            <List title="Materials processed" items={c.materials} />
          </div>
          <p className="mt-6 text-[0.75rem] text-muted">Machine envelopes, tolerances and certifications are listed on the full capability page (demo content to be supplied).</p>
          <Actions>
            <Button variant="signal" arrow onClick={() => requestQuote({ projectType: c.projectType })}>
              Request a Quote
            </Button>
            <Button variant="secondary" icon="engineer" onClick={() => openLead('engineer')}>
              Talk to an Engineer
            </Button>
          </Actions>
        </Shell>
      )
  }

  if (detail?.kind === 'industry') {
    const ind = industries.find((x) => x.slug === detail.slug)
    if (ind)
      body = (
        <Shell titleId={titleId} eyebrow="Industry" title={ind.title} path={routes.industry(ind)} icon={ind.icon} onClose={closeDetail}>
          <p className="max-w-2xl text-[1rem] leading-relaxed text-ink-soft">{ind.overview}</p>
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <List title="Typical applications" items={ind.applications} />
            <List title="What we prioritize" items={ind.priorities} />
          </div>
          <Actions>
            <Button variant="signal" arrow onClick={() => requestQuote({ industry: ind.title })}>
              Request a Quote
            </Button>
            <Button variant="secondary" icon="phone" onClick={() => openLead('sales')}>
              Contact Sales
            </Button>
          </Actions>
        </Shell>
      )
  }

  if (detail?.kind === 'product') {
    const p = productFamilies.find((x) => x.slug === detail.slug)
    if (p) {
      size = 'md'
      body = (
        <Shell titleId={titleId} eyebrow={`Product family ${p.code}`} title={p.title} path={routes.product(p)} icon="layers" onClose={closeDetail}>
          <p className="text-[1rem] leading-relaxed text-ink-soft">{p.summary} Built to your drawing, or adapted from our standard designs.</p>
          <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
            <div className="bg-paper p-5">
              <dt className="label-mono text-[0.5625rem] text-muted">Materials</dt>
              <dd className="mt-2 font-mono text-[0.8125rem] text-ink">{p.materials}</dd>
            </div>
            <div className="bg-paper p-5">
              <dt className="label-mono text-[0.5625rem] text-muted">Processes</dt>
              <dd className="mt-2 font-mono text-[0.8125rem] text-ink">{p.processes}</dd>
            </div>
          </dl>
          <Actions>
            <Button variant="signal" arrow onClick={() => requestQuote()}>
              Request a Quote
            </Button>
            <Button variant="secondary" icon="download" onClick={() => openLead('brochure')}>
              Download Brochure
            </Button>
          </Actions>
        </Shell>
      )
    }
  }

  if (detail?.kind === 'case') {
    const c = caseStudies.find((x) => x.slug === detail.slug)
    if (c)
      body = (
        <Shell titleId={titleId} eyebrow={`Case study · ${c.industry} · ${c.capability}`} title={c.title} path={routes.caseStudy(c)} image={c.image} onClose={closeDetail}>
          <dl className="grid gap-px border border-line bg-line md:grid-cols-3">
            {(
              [
                ['Challenge', c.challenge],
                ['Approach', c.approach],
                ['Result', c.result],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="bg-paper p-5">
                <dt className={`label-mono text-[0.625rem] ${k === 'Result' ? 'text-signal-deep' : 'text-muted'}`}>{k}</dt>
                <dd className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 max-w-2xl space-y-4 text-[0.9375rem] leading-relaxed text-ink-soft">
            {c.details.map((d) => (
              <p key={d}>{d}</p>
            ))}
          </div>
          <p className="mt-6 text-[0.75rem] text-muted">Demo project for illustration. Replace with an approved, anonymized customer program.</p>
          <Actions>
            <Button variant="signal" arrow onClick={() => requestQuote({ industry: c.industry })}>
              Discuss a similar project
            </Button>
          </Actions>
        </Shell>
      )
  }

  if (detail?.kind === 'resource') {
    const r = resources.find((x) => x.slug === detail.slug)
    if (r) {
      size = 'md'
      body = (
        <Shell titleId={titleId} eyebrow="Resources" title={r.title} path={routes.resource(r)} icon={r.icon} onClose={closeDetail}>
          <p className="text-[1rem] leading-relaxed text-ink-soft">{r.summary}</p>
          {r.slug === 'faqs' ? (
            <div className="mt-8 border-t border-ink">
              {faqs.map((f) => (
                <details key={f.question} className="group border-b border-line">
                  <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-[0.9375rem] font-medium text-ink">
                    {f.question}
                    <Icon name="plus" className="size-4 shrink-0 transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="pb-5 text-[0.875rem] leading-relaxed text-muted">{f.answer}</p>
                </details>
              ))}
            </div>
          ) : (
            <ul className="mt-8 border-t border-ink">
              {r.items.map((it) => (
                <li key={it.title}>
                  <a
                    href={routes.article(r, it.title)}
                    onClick={(e) => {
                      e.preventDefault()
                      if (r.slug === 'downloads' || it.format === 'PDF') openLead('brochure')
                    }}
                    className="group flex min-h-14 items-center gap-4 border-b border-line py-3 text-[0.9375rem] text-ink"
                  >
                    <Icon name={it.format === 'PDF' ? 'download' : 'doc'} className="size-4.5 shrink-0 text-steel-deep" />
                    <span className="flex-1">{it.title}</span>
                    <span className={`label-mono text-[0.5625rem] ${it.format === 'Demo' ? 'text-signal-deep' : 'text-muted'}`}>{it.format}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          <Actions>
            <Button variant="primary" icon="engineer" onClick={() => openLead('engineer')}>
              Ask an Engineer
            </Button>
          </Actions>
        </Shell>
      )
    }
  }

  return (
    <Dialog open={!!detail && !!body} onClose={closeDetail} labelledBy={titleId} size={size}>
      {body}
    </Dialog>
  )
}
