import type { ListingStatus, Property } from '../../content/types'
import { formatArea } from '../../lib/format'
import { useApp } from '../../state/AppState'
import { Icon } from '../ui/Icon'

const statusStyles: Record<ListingStatus, string> = {
  'For Sale': 'bg-paper/95 text-ink',
  'To Let': 'bg-paper/95 text-ink',
  'New Instruction': 'bg-olive-deep text-paper',
  'Coming Soon': 'bg-ink text-paper',
  'Under Offer': 'bg-sand/95 text-taupe-deep',
  'Let Agreed': 'bg-sand/95 text-taupe-deep',
}

export function StatusBadge({ status, className = '' }: { status: ListingStatus; className?: string }) {
  return (
    <span className={`eyebrow inline-flex min-h-7 items-center rounded-[2px] px-2.5 text-[0.65rem] backdrop-blur-sm ${statusStyles[status]} ${className}`}>
      {status}
    </span>
  )
}

/** Beds / baths / area with icons. Commercial listings omit bedrooms. */
export function PropertyFacts({ property, className = '', size = 'sm' }: { property: Property; className?: string; size?: 'sm' | 'lg' }) {
  const facts = [
    property.bedrooms > 0 && { icon: 'bed' as const, label: `${property.bedrooms} bed${property.bedrooms > 1 ? 's' : ''}`, value: property.bedrooms, unit: 'Bedrooms' },
    { icon: 'bath' as const, label: `${property.bathrooms} bath${property.bathrooms > 1 ? 's' : ''}`, value: property.bathrooms, unit: 'Bathrooms' },
    { icon: 'area' as const, label: formatArea(property.floorArea), value: property.floorArea, unit: 'Floor area' },
  ].filter(Boolean) as Array<{ icon: 'bed' | 'bath' | 'area'; label: string }>
  return (
    <ul className={`flex flex-wrap items-center gap-x-4 gap-y-1 ${size === 'lg' ? 'text-[0.9375rem]' : 'text-[0.8125rem]'} text-ink-soft ${className}`}>
      {facts.map((f) => (
        <li key={f.icon} className="inline-flex items-center gap-1.5 whitespace-nowrap">
          <Icon name={f.icon} className={size === 'lg' ? 'size-5 text-taupe-deep' : 'size-4 text-taupe-deep'} />
          {f.label}
        </li>
      ))}
    </ul>
  )
}

export function SaveButton({ property, className = '' }: { property: Property; className?: string }) {
  const { saved, toggleSaved } = useApp()
  const isSaved = saved.includes(property.id)
  return (
    <button
      type="button"
      onClick={() => toggleSaved(property.id)}
      aria-pressed={isSaved}
      className={`inline-flex size-10 items-center justify-center rounded-full bg-paper/90 text-ink backdrop-blur-sm transition-colors hover:bg-paper ${className}`}
    >
      <Icon name={isSaved ? 'heart-filled' : 'heart'} className={`size-[1.15rem] ${isSaved ? 'text-[#8c3b2e]' : ''}`} />
      <span className="sr-only">{isSaved ? `Remove ${property.title} from saved homes` : `Save ${property.title}`}</span>
    </button>
  )
}
