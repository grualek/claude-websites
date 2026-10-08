import { useEffect, useId } from 'react'
import { restaurant } from '../../content/dining'
import { gallery } from '../../content/site'
import type { Article, Experience, Room } from '../../content/types'
import { formatDate, formatMoney } from '../../lib/format'
import { useApp } from '../../state/AppState'
import { BookingDialog } from '../booking/BookingDialog'
import { Button } from '../ui/Button'
import { Dialog, DialogClose } from '../ui/Dialog'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { WithPlaceholders } from '../ui/Text'

/**
 * Detail views. In the prototype they open as dialogs; in production each becomes a standalone,
 * indexable page at the matching path in lib/routes.ts with the same content.
 */
export function DetailDialogs() {
  const { view, close } = useApp()
  return (
    <>
      <BookingDialog />
      <RoomDialog room={view?.type === 'room' ? view.room : null} onClose={close} />
      <ExperienceDialog experience={view?.type === 'experience' ? view.experience : null} onClose={close} />
      <ArticleDialog article={view?.type === 'article' ? view.article : null} onClose={close} />
      <DiningDialog open={view?.type === 'dining'} onClose={close} />
      <GalleryLightbox index={view?.type === 'gallery' ? view.index : null} onClose={close} />
    </>
  )
}

function Hero({ asset, eyebrow, title, titleId, onClose }: { asset: Room['image']; eyebrow: string; title: string; titleId: string; onClose: () => void }) {
  return (
    <div className="on-dark relative aspect-[16/10] sm:aspect-[21/9]">
      <Media asset={asset} sizes="(min-width: 1024px) 64rem, 100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
      <div className="absolute top-4 right-4">
        <DialogClose onClose={onClose} />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
        <p className="eyebrow text-on-dark/85">{eyebrow}</p>
        <h2 id={titleId} className="font-editorial mt-2 text-[2.4rem] text-on-dark sm:text-[3.5rem]">
          {title}
        </h2>
      </div>
    </div>
  )
}

function RoomDialog({ room, onClose }: { room: Room | null; onClose: () => void }) {
  const { bookStay } = useApp()
  const titleId = useId()
  return (
    <Dialog open={!!room} onClose={onClose} labelledBy={titleId} size="lg">
      {room && (
        <article>
          <Hero asset={room.image} eyebrow={`${room.category} · From ${formatMoney(room.fromRate)} per night`} title={room.name} titleId={titleId} onClose={onClose} />
          <div className="grid gap-10 p-5 sm:p-8 lg:grid-cols-[1fr_18rem] lg:p-10">
            <div>
              <div className="space-y-4 text-[1rem] leading-relaxed text-ink-soft">
                {room.description.map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </div>
              <h3 className="eyebrow mt-10 text-muted">In the room</h3>
              <ul className="mt-4 grid gap-x-6 gap-y-2.5 text-[0.92rem] sm:grid-cols-2">
                {room.amenities.map((a) => (
                  <li key={a} className="flex items-start gap-2.5">
                    <Icon name="check" className="mt-0.5 size-4 shrink-0 text-olive" />
                    {a}
                  </li>
                ))}
              </ul>
              <div className="mt-10 grid grid-cols-2 gap-3">
                {room.gallery.map((g) => (
                  <div key={g.alt} className="aspect-[4/3] overflow-hidden rounded-[4px]">
                    <Media asset={g} sizes="(min-width: 640px) 30rem, 50vw" />
                  </div>
                ))}
              </div>
            </div>
            <aside className="h-fit rounded-[6px] bg-ivory p-5">
              <dl className="divide-y divide-line text-[0.9rem]">
                {[
                  ['Guests', `Up to ${room.maxGuests}`],
                  ['Size', `${room.size} m²`],
                  ['Beds', room.bed],
                  ['View', room.view],
                  ['Highlight', room.keyFeature],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-right font-semibold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-[0.8rem] text-muted">From</p>
              <p className="font-editorial text-[2.25rem] leading-none text-ink">
                {formatMoney(room.fromRate)} <span className="font-sans text-xs text-muted">/ night</span>
              </p>
              <Button className="mt-5 w-full" arrow onClick={() => bookStay({ room: room.slug })}>
                Check availability
              </Button>
            </aside>
          </div>
        </article>
      )}
    </Dialog>
  )
}

function ExperienceDialog({ experience: e, onClose }: { experience: Experience | null; onClose: () => void }) {
  const { enquire, bookStay } = useApp()
  const titleId = useId()
  return (
    <Dialog open={!!e} onClose={onClose} labelledBy={titleId} size="lg">
      {e && (
        <article>
          <Hero asset={e.image} eyebrow={e.category} title={e.title} titleId={titleId} onClose={onClose} />
          <div className="grid gap-10 p-5 sm:p-8 lg:grid-cols-[1fr_18rem] lg:p-10">
            <div>
              <p className="font-editorial text-[1.6rem] leading-snug text-ink">{e.summary}</p>
              <div className="mt-6 space-y-4 text-[1rem] leading-relaxed text-ink-soft">
                {e.description.map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </div>
              <h3 className="eyebrow mt-10 text-muted">Included</h3>
              <ul className="mt-4 grid gap-2.5 text-[0.92rem] sm:grid-cols-2">
                {e.includes.map((a) => (
                  <li key={a} className="flex items-start gap-2.5">
                    <Icon name="check" className="mt-0.5 size-4 shrink-0 text-olive" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="h-fit rounded-[6px] bg-ivory p-5">
              <dl className="divide-y divide-line text-[0.9rem]">
                {[
                  ['Duration', e.duration],
                  ['When', e.season],
                  ['Group', e.groupSize],
                  ['From', e.fromPrice ? `${formatMoney(e.fromPrice)} pp` : 'Included for guests'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-right font-semibold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <Button className="mt-5 w-full" variant="dark" onClick={() => enquire({ topic: 'Experiences', message: `I’d like to book “${e.title}” during my stay on ` })}>
                Enquire about this
              </Button>
              <Button className="mt-3 w-full" variant="secondary" onClick={() => bookStay()}>
                Book Your Stay
              </Button>
              <p className="mt-4 text-xs leading-relaxed text-muted">Experiences can be added when you book or arranged with the concierge before you arrive.</p>
            </aside>
          </div>
        </article>
      )}
    </Dialog>
  )
}

function ArticleDialog({ article: a, onClose }: { article: Article | null; onClose: () => void }) {
  const titleId = useId()
  return (
    <Dialog open={!!a} onClose={onClose} labelledBy={titleId} size="lg">
      {a && (
        <article>
          <Hero asset={a.image} eyebrow={`${a.category} · ${a.readingMinutes} min read`} title={a.title} titleId={titleId} onClose={onClose} />
          <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8 lg:py-14">
            <p className="text-[0.85rem] text-muted">
              {a.author} · {formatDate(a.date, { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <p className="font-editorial mt-6 text-[1.75rem] leading-snug text-ink">{a.summary}</p>
            <div className="mt-8 space-y-5 text-[1.05rem] leading-[1.75] text-ink-soft">
              {a.body.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            <p className="mt-10 border-t border-line pt-6 text-xs text-muted">Demo article excerpt. In production this is a full, indexable journal page.</p>
          </div>
        </article>
      )}
    </Dialog>
  )
}

function DiningDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { enquire } = useApp()
  const titleId = useId()
  return (
    <Dialog open={open} onClose={onClose} labelledBy={titleId} size="lg">
      {open && (
        <article>
          <Hero asset={restaurant.image} eyebrow={restaurant.cuisine} title={`${restaurant.name} at Casa Velora`} titleId={titleId} onClose={onClose} />
          <div className="grid gap-10 p-5 sm:p-8 lg:grid-cols-[1fr_18rem] lg:p-10">
            <div>
              <div className="space-y-4 text-[1rem] leading-relaxed text-ink-soft">
                {restaurant.description.map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </div>
              <h3 className="font-editorial mt-10 text-[2rem]">A taste of the menu</h3>
              <p className="mt-1 text-xs text-muted">Sample dishes — the menu changes daily with the season.</p>
              <div className="mt-6 grid gap-8 sm:grid-cols-3">
                {restaurant.sampleMenu.map((c) => (
                  <div key={c.course}>
                    <h4 className="eyebrow text-clay">{c.course}</h4>
                    <ul className="mt-3 space-y-2.5 text-[0.92rem] leading-snug text-ink">
                      {c.dishes.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <aside className="h-fit rounded-[6px] bg-ivory p-5">
              <h3 className="eyebrow text-muted">Hours</h3>
              <ul className="mt-3 divide-y divide-line text-[0.9rem]">
                {restaurant.hours.map((h) => (
                  <li key={h.service} className="flex justify-between gap-4 py-2.5">
                    <span className="text-muted">{h.service}</span>
                    <span className="font-semibold text-ink tabular-nums">
                      <WithPlaceholders text={h.time} />
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.85rem] text-muted">Dress code: {restaurant.dressCode}. Non-residents welcome by reservation.</p>
              <Button className="mt-5 w-full" variant="dark" onClick={() => enquire({ topic: 'Dining', message: `I’d like to reserve a table at ${restaurant.name} for ` })}>
                Reserve a table
              </Button>
            </aside>
          </div>
        </article>
      )}
    </Dialog>
  )
}

function GalleryLightbox({ index, onClose }: { index: number | null; onClose: () => void }) {
  const { open } = useApp()
  const titleId = useId()
  const isOpen = index !== null
  const go = (d: number) => index !== null && open({ type: 'gallery', index: (index + d + gallery.length) % gallery.length })

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const item = index !== null ? gallery[index] : null
  return (
    <Dialog open={isOpen} onClose={onClose} labelledBy={titleId} size="xl" className="bg-charcoal!">
      {item && (
        <figure className="on-dark relative">
          <div className="aspect-[4/3] max-h-[78dvh] w-full sm:aspect-[16/10]">
            <Media asset={item.image} sizes="100vw" />
          </div>
          <figcaption className="flex items-center justify-between gap-4 px-5 py-4 text-on-dark">
            <span>
              <span id={titleId} className="font-editorial text-[1.4rem]">
                {item.caption}
              </span>
              <span className="ml-3 text-xs text-on-dark-muted tabular-nums">
                {index! + 1} / {gallery.length}
              </span>
            </span>
            <span className="flex gap-2">
              <button type="button" onClick={() => go(-1)} className="inline-flex size-11 items-center justify-center rounded-full border border-on-dark/30 hover:border-on-dark">
                <Icon name="arrow-left" className="size-5" />
                <span className="sr-only">Previous image</span>
              </button>
              <button type="button" onClick={() => go(1)} className="inline-flex size-11 items-center justify-center rounded-full border border-on-dark/30 hover:border-on-dark">
                <Icon name="arrow-right" className="size-5" />
                <span className="sr-only">Next image</span>
              </button>
              <button type="button" onClick={onClose} className="inline-flex size-11 items-center justify-center rounded-full border border-on-dark/30 hover:border-on-dark">
                <Icon name="close" className="size-5" />
                <span className="sr-only">Close gallery</span>
              </button>
            </span>
          </figcaption>
        </figure>
      )}
    </Dialog>
  )
}
