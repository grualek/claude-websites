import type { ListingType, Property, PropertyFeature, PropertyType } from '../content/types'

export interface SearchFilters {
  listingType: ListingType
  areaId: string // '' = any
  propertyType: PropertyType | ''
  minPrice: number // 0 = no min
  maxPrice: number // 0 = no max
  minBeds: number // 0 = any
  minBaths: number
  features: PropertyFeature[]
  includeUnavailable: boolean
  /** Show only homes the visitor has saved (ignores the other filters). */
  savedOnly: boolean
}

export type SortKey = 'newest' | 'price-desc' | 'price-asc'

export const defaultFilters: SearchFilters = {
  listingType: 'sale',
  areaId: '',
  propertyType: '',
  minPrice: 0,
  maxPrice: 0,
  minBeds: 0,
  minBaths: 0,
  features: [],
  includeUnavailable: true,
  savedOnly: false,
}

const unavailable = new Set(['Under Offer', 'Let Agreed'])

/** Price steps for the selects, per listing type. */
export const priceSteps: Record<ListingType, number[]> = {
  sale: [250000, 400000, 600000, 800000, 1000000, 1250000, 1500000, 2000000],
  rent: [1000, 1250, 1500, 1750, 2000, 2500, 3000, 4000],
}

/**
 * Pure filter + sort. With a live feed this becomes the query sent to the listings API
 * (the `SearchFilters` shape maps 1:1 to query-string params for shareable /buy/ URLs).
 */
export function searchProperties(all: Property[], f: SearchFilters, sort: SortKey = 'newest', savedIds: string[] = []): Property[] {
  const results = f.savedOnly
    ? all.filter((p) => savedIds.includes(p.id))
    : all.filter(
    (p) =>
      p.listingType === f.listingType &&
      (!f.areaId || p.address.areaId === f.areaId) &&
      (!f.propertyType || p.propertyType === f.propertyType) &&
      (!f.minPrice || p.price >= f.minPrice) &&
      (!f.maxPrice || p.price <= f.maxPrice) &&
      (!f.minBeds || p.bedrooms >= f.minBeds) &&
      (!f.minBaths || p.bathrooms >= f.minBaths) &&
      f.features.every((feat) => p.features.includes(feat)) &&
      (f.includeUnavailable || !unavailable.has(p.status)),
  )
  return results.sort((a, b) =>
    sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : b.listedAt.localeCompare(a.listedAt),
  )
}

/** Number of "More filters" options in use — shown as a badge on the toggle. */
export const advancedFilterCount = (f: SearchFilters) => (f.minBaths ? 1 : 0) + f.features.length + (f.includeUnavailable ? 0 : 1)

export const featureLabels: Record<PropertyFeature, string> = {
  garden: 'Garden',
  parking: 'Parking',
  'outside-space': 'Outside space',
  period: 'Period property',
  'new-build': 'New build',
  'water-views': 'Water views',
  furnished: 'Furnished',
  'pets-considered': 'Pets considered',
}
