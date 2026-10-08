import { rooms } from '../../content/rooms'
import type { Room } from '../../content/types'
import { formatMoney } from '../../lib/format'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { SectionHeader } from '../ui/Text'

export function Rooms() {
  return (
    <section id="rooms" aria-labelledby="rooms-title" className="section-y bg-paper">
      <div className="container-page">
        <SectionHeader
          id="rooms-title"
          index="02"
          eyebrow="Rooms & suites"
          title={
            <>
              Rooms to slow down in, <em className="italic">views to wake up to.</em>
            </>
          }
          intro={`Twenty-four rooms, suites and villas across the old estate — each with its own outdoor space, and none quite like another. Rates from ${formatMoney(rooms[0].fromRate)} per night.`}
        />

        <ul className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-24 lg:gap-x-12">
          {rooms.map((room, i) => (
            <li key={room.slug} className={i % 2 === 1 ? 'md:mt-28' : ''} data-reveal>
              <RoomCard room={room} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function RoomCard({ room, index }: { room: Room; index: number }) {
  const { open, bookStay } = useApp()
  const titleId = `room-${room.slug}`
  return (
    <article aria-labelledby={titleId} className="group">
      <button
        type="button"
        onClick={() => open({ type: 'room', room })}
        className="relative block w-full overflow-hidden rounded-[4px] text-left"
        aria-label={`View the ${room.name}`}
      >
        <div className={`media-zoom ${index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[5/4]'}`}>
          <Media asset={room.image} sizes="(min-width: 768px) 45vw, 100vw" />
        </div>
        <span className="eyebrow absolute top-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 text-[0.6rem] text-ink backdrop-blur">{room.keyFeature}</span>
      </button>

      <div className="mt-7 flex items-start justify-between gap-6">
        <div>
          <p className="eyebrow text-muted">{room.category}</p>
          <h3 id={titleId} className="font-editorial mt-2 text-[2.4rem] lg:text-[2.75rem]">
            {room.name}
          </h3>
        </div>
        <p className="shrink-0 pt-1 text-right text-[0.8rem] text-muted">
          From
          <span className="font-editorial block text-[1.6rem] leading-tight text-ink">{formatMoney(room.fromRate)}</span>
          per night
        </p>
      </div>
      <p className="mt-3 max-w-lg text-[0.97rem] leading-relaxed text-muted">{room.summary}</p>

      <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-line py-4 text-[0.8rem]">
        {[
          { icon: 'guests' as const, label: 'Guests', value: `Up to ${room.maxGuests}` },
          { icon: 'size' as const, label: 'Size', value: `${room.size} m²` },
          { icon: 'view' as const, label: 'View', value: room.view },
        ].map((m) => (
          <div key={m.label} className="flex flex-col gap-1">
            <dt className="flex items-center gap-1.5 text-muted">
              <Icon name={m.icon} className="size-4 text-clay" />
              {m.label}
            </dt>
            <dd className="font-semibold text-ink">{m.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button variant="secondary" size="sm" onClick={() => open({ type: 'room', room })} aria-label={`View ${room.name} details`}>
          View room
        </Button>
        <button type="button" onClick={() => bookStay({ room: room.slug })} className="group/c inline-flex min-h-10 items-center gap-2 text-[0.8rem] font-semibold text-clay">
          <span className="border-b border-clay/40 pb-0.5 group-hover/c:border-clay">Check availability</span>
          <Icon name="arrow-right" className="size-4 transition-transform group-hover/c:translate-x-1" />
        </button>
      </div>
    </article>
  )
}
