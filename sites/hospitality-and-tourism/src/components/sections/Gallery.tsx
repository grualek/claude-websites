import { gallery } from '../../content/site'
import type { GalleryItem } from '../../content/types'
import { useApp } from '../../state/AppState'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { SectionHeader } from '../ui/Text'

const aspect: Record<GalleryItem['shape'], string> = {
  wide: 'aspect-[16/9]',
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[3/4]',
  tall: 'aspect-[2/3]',
  square: 'aspect-square',
}

/**
 * Editorial gallery: a cinematic lead image, then a masonry of mixed aspect ratios
 * (landscape, portrait, detail) that never leaves gaps whatever the content.
 */
export function Gallery() {
  const [lead, ...rest] = gallery
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-y bg-paper">
      <div className="container-page">
        <SectionHeader
          id="gallery-title"
          index="08"
          eyebrow="Gallery"
          title={
            <>
              Light, stone <em className="italic">&amp; sea.</em>
            </>
          }
          intro="A few moments from around the estate — from first swims in the cove to dinner under the pergola."
        />
        <div className="mt-16 lg:mt-20" data-reveal>
          <Tile item={lead} index={0} className="aspect-[4/3] sm:aspect-[21/9]" />
        </div>
        <ul className="mt-3 columns-2 gap-3 sm:mt-4 sm:gap-4 lg:mt-5 lg:columns-3 lg:gap-5">
          {rest.map((item, i) => (
            <li key={item.caption} className="mb-3 break-inside-avoid sm:mb-4 lg:mb-5" data-reveal>
              <Tile item={item} index={i + 1} className={aspect[item.shape]} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Tile({ item, index, className }: { item: GalleryItem; index: number; className: string }) {
  const { open } = useApp()
  return (
    <figure className="group relative">
      <button
        type="button"
        onClick={() => open({ type: 'gallery', index })}
        className={`media-zoom relative block w-full overflow-hidden rounded-[4px] ${className}`}
        aria-label={`Open image: ${item.caption}`}
      >
        <Media asset={item.image} sizes="(min-width: 1024px) 33vw, 50vw" decorative />
        <span className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full bg-paper/85 text-ink opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100">
          <Icon name="expand" className="size-4" />
        </span>
      </button>
      <figcaption className="eyebrow mt-2.5 text-[0.58rem] text-muted">{item.caption}</figcaption>
    </figure>
  )
}
