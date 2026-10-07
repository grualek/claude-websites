import type { Property, PropertyType } from '../content/types'

const gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 })
const num = new Intl.NumberFormat('en-GB')

export const formatPrice = (p: Pick<Property, 'price' | 'listingType'>) =>
  p.listingType === 'rent' ? `${gbp.format(p.price)} pcm` : gbp.format(p.price)

export const formatCompactPrice = (value: number) =>
  value >= 1_000_000 ? `£${+(value / 1_000_000).toFixed(2)}m` : value >= 1000 ? `£${Math.round(value / 1000)}k` : gbp.format(value)

export const formatArea = (sqft: number) => `${num.format(sqft)} sq ft`

export const sqm = (sqft: number) => `${num.format(Math.round(sqft * 0.092903))} m²`

export const propertyTypeLabel: Record<PropertyType, string> = {
  house: 'House',
  apartment: 'Apartment',
  townhouse: 'Townhouse',
  penthouse: 'Penthouse',
  cottage: 'Cottage',
  commercial: 'Commercial',
}

export const formatDate = (iso: string) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
