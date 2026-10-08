/**
 * Content shapes for the site. Each maps 1:1 to a future CMS / PMS collection (rooms, rates, experiences,
 * dining, destination guides, journal, reviews, offers, FAQs) so demo content can be swapped without
 * touching components.
 */

export type IconName =
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up-right'
  | 'arrow-down'
  | 'phone'
  | 'mail'
  | 'pin'
  | 'clock'
  | 'close'
  | 'menu'
  | 'plus'
  | 'minus'
  | 'check'
  | 'calendar'
  | 'guests'
  | 'size'
  | 'bed'
  | 'view'
  | 'sparkle'
  | 'leaf'
  | 'wave'
  | 'sun'
  | 'compass'
  | 'plate'
  | 'boat'
  | 'car'
  | 'plane'
  | 'quote'
  | 'instagram'
  | 'expand'

/** Illustrated scenes stand in for photography until real imagery is supplied. */
export type SceneName =
  | 'coast'
  | 'pool'
  | 'garden-room'
  | 'ocean-suite'
  | 'residence'
  | 'villa'
  | 'long-table'
  | 'restaurant'
  | 'spa'
  | 'market'
  | 'trail'
  | 'village'
  | 'grove'
  | 'boat'
  | 'ceramics'
  | 'arch'
  | 'swimmer'
  | 'map'

/** Lighting for a scene — lets one illustration read as morning, golden hour or dusk. */
export type Mood = 'morning' | 'golden' | 'dusk'

export interface MediaAsset {
  scene: SceneName
  mood?: Mood
  alt: string
  /** Provide a real photograph to replace the illustrated scene. */
  src?: string
  srcSet?: string
  width?: number
  height?: number
  /** CSS object-position / focal point for photos, e.g. '30% 50%' */
  focus?: string
  /** Which side of an illustrated scene to keep when it is cropped */
  align?: 'left' | 'center' | 'right'
}

export interface Money {
  amount: number
  currency: string
}

export interface Room {
  slug: string
  name: string
  /** Short category label, e.g. "Suite" — used for filtering and HotelRoom schema */
  category: string
  summary: string
  description: string[]
  maxGuests: number
  /** Square metres */
  size: number
  bed: string
  view: string
  keyFeature: string
  amenities: string[]
  /** Indicative "from" nightly rate — replace with live rates from the booking engine */
  fromRate: Money
  /** Number of keys of this type (used by the demo availability check) */
  inventory: number
  image: MediaAsset
  gallery: MediaAsset[]
}

export interface Experience {
  slug: string
  category: string
  title: string
  summary: string
  description: string[]
  duration: string
  season: string
  groupSize: string
  fromPrice?: Money
  includes: string[]
  image: MediaAsset
}

export interface DiningVenue {
  slug: string
  name: string
  cuisine: string
  atmosphere: string
  description: string[]
  hours: { service: string; time: string }[]
  dressCode: string
  sampleMenu: { course: string; dishes: string[] }[]
  image: MediaAsset
  detail: MediaAsset
}

export interface DestinationHighlight {
  slug: string
  /** Local attractions | Nature | Culture | Activities | Day trips */
  category: string
  title: string
  summary: string
  /** Travel time from the property */
  distance: string
  image: MediaAsset
}

export interface Article {
  slug: string
  category: string
  /** ISO date */
  date: string
  title: string
  summary: string
  readingMinutes: number
  author: string
  body: string[]
  image: MediaAsset
}

export interface Testimonial {
  quote: string
  name: string
  origin: string
  stay: string
}

export interface Faq {
  question: string
  /** Text inside [[double brackets]] marks a placeholder for the real business policy. */
  answer: string
}

export interface Offer {
  slug: string
  title: string
  summary: string
  validity: string
}

export interface GalleryItem {
  image: MediaAsset
  caption: string
  /** Layout hint for the editorial gallery grid */
  shape: 'landscape' | 'portrait' | 'square' | 'wide' | 'tall'
}

export interface Pillar {
  title: string
  body: string
}
