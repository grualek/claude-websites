import { useId } from 'react'
import type { Property } from '../../content/types'
import { getArea } from '../../content/areas'
import { formatPrice, propertyTypeLabel } from '../../lib/format'
import { useApp } from '../../state/AppState'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { PropertyFacts, SaveButton, StatusBadge } from './PropertyBits'

interface PropertyCardProps {
  property: Property
  /** `feature` = larger editorial card (taller image, bigger title) */
  variant?: 'default' | 'feature'
  headingLevel?: 'h3' | 'h4'
}

/**
 * Reusable listing card. The title is a stretched button over the whole card so the
 * card is one clear click target, while the Save button stays independently focusable.
 */
export function PropertyCard({ property, variant = 'default', headingLevel: H = 'h3' }: PropertyCardProps) {
  const { openProperty } = useApp()
  const titleId = useId()
  const area = getArea(property.address.areaId)
  const feature = variant === 'feature'

  return (
    <article aria-labelledby={titleId} className="group relative flex flex-col">
      <div className={`relative overflow-hidden rounded-[3px] bg-sand ${feature ? 'aspect-[4/3] lg:aspect-[5/4]' : 'aspect-[4/3]'}`}>
        <Media
          asset={property.images[0]}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-[1400ms] ease-calm group-hover:scale-[1.035]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/35 to-transparent" />
        <StatusBadge status={property.status} className="absolute top-4 left-4" />
        <SaveButton property={property} className="absolute top-3 right-3 z-10" />
        <span className="absolute bottom-3.5 left-4 inline-flex items-center gap-1.5 text-xs font-medium text-paper">
          <Icon name="camera" className="size-4" />
          {property.images.length} images
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <p className="eyebrow text-[0.65rem] text-muted">
          {propertyTypeLabel[property.propertyType]} <span aria-hidden>·</span> {area?.name}
        </p>
        <H id={titleId} className={`font-editorial mt-2.5 ${feature ? 'text-[2rem] sm:text-[2.25rem]' : 'text-[1.75rem]'} leading-[1.05]`}>
          <button
            type="button"
            onClick={() => openProperty(property.id)}
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-olive"
          >
            {property.title}
          </button>
        </H>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
          <Icon name="pin" className="size-4 shrink-0" />
          {property.address.line}, {property.address.postcode}
        </p>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3 border-t border-line pt-4">
            <p className="text-ink">
              {property.priceQualifier && <span className="block text-[0.6875rem] tracking-[0.08em] text-muted uppercase">{property.priceQualifier}</span>}
              <span className="text-[1.0625rem] font-semibold tabular-nums">{formatPrice(property)}</span>
            </p>
            <PropertyFacts property={property} />
          </div>
          <p className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-ink">
            View details
            <Icon name="arrow-right" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </p>
        </div>
      </div>
    </article>
  )
}
