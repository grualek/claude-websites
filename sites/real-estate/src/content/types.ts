/**
 * Content model for the real estate website.
 *
 * Every section reads from typed content objects rather than hard-coded JSX. To go live,
 * replace the modules in `src/content/` with fetchers that return the same shapes — from a
 * property feed (Reapit, Alto, Jupix, Rightmove BLM / RTDF, Zoopla), a CRM, or a headless CMS.
 */

export type IconName =
  | 'search'
  | 'bed'
  | 'bath'
  | 'area'
  | 'pin'
  | 'heart'
  | 'heart-filled'
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up-right'
  | 'plus'
  | 'minus'
  | 'close'
  | 'menu'
  | 'phone'
  | 'mail'
  | 'clock'
  | 'calendar'
  | 'key'
  | 'home'
  | 'sign'
  | 'chart'
  | 'tools'
  | 'shield'
  | 'clipboard'
  | 'users'
  | 'compass'
  | 'megaphone'
  | 'handshake'
  | 'sparkle'
  | 'filter'
  | 'grid'
  | 'map'
  | 'check'
  | 'bell'
  | 'quote'
  | 'camera'
  | 'coins'
  | 'building'
  | 'leaf'

/** Illustrated scenes stand in for photography until real images are supplied. */
export type SceneName =
  | 'villa'
  | 'interior'
  | 'townhouse'
  | 'apartment'
  | 'coastal'
  | 'cottage'
  | 'kitchen'
  | 'bedroom'
  | 'office'
  | 'skyline'
  | 'riverside'
  | 'oldtown'
  | 'suburb'
  | 'countryside'

export type SceneTone = 'day' | 'golden' | 'dusk'

/**
 * Images are optional everywhere: when `src` is missing, the art-directed `scene` renders.
 * Supply `src` / `srcSet` from your image CDN to switch to photography with no layout changes.
 */
export interface MediaAsset {
  src?: string
  srcSet?: string
  alt: string
  width?: number
  height?: number
  scene: SceneName
  tone?: SceneTone
  /** Optional variant for scenes that support one, e.g. the view through an interior window. */
  view?: 'garden' | 'city' | 'sea' | 'hills'
}

export interface Link {
  label: string
  href: string
}

/* --------------------------------------------------------------- Listings */

export type ListingType = 'sale' | 'rent'

export type PropertyType = 'house' | 'apartment' | 'townhouse' | 'penthouse' | 'cottage' | 'commercial'

export type ListingStatus = 'For Sale' | 'To Let' | 'New Instruction' | 'Under Offer' | 'Let Agreed' | 'Coming Soon'

export type PropertyFeature =
  | 'garden'
  | 'parking'
  | 'outside-space'
  | 'period'
  | 'new-build'
  | 'water-views'
  | 'furnished'
  | 'pets-considered'

export interface Property {
  id: string
  /** Stable URL slug — becomes /property/:slug */
  slug: string
  title: string
  address: {
    line: string
    areaId: string
    city: string
    postcode: string
  }
  listingType: ListingType
  status: ListingStatus
  propertyType: PropertyType
  /** Sale price, or monthly rent for lettings (pcm). */
  price: number
  /** e.g. "Guide price", "Offers over", "Offers in excess of" */
  priceQualifier?: string
  bedrooms: number
  bathrooms: number
  receptions?: number
  /** Internal area in square feet */
  floorArea: number
  plot?: string
  tenure?: 'Freehold' | 'Leasehold' | 'Share of freehold'
  epc?: string
  councilTax?: string
  availableFrom?: string
  summary: string
  description: string[]
  keyFeatures: string[]
  features: PropertyFeature[]
  images: MediaAsset[]
  agentId: string
  /** ISO date the listing went live */
  listedAt: string
  featured?: boolean
  /** Coordinates on the illustrated area map (0–100), replaced by lat/lng with a real map provider. */
  mapPosition: { x: number; y: number }
}

export interface Agent {
  id: string
  name: string
  role: string
  phone: { display: string; href: string }
  email: string
  areas: string[]
}

/* ------------------------------------------------------------------ Areas */

export interface Area {
  id: string
  slug: string
  name: string
  kicker: string
  description: string
  /** Longer editorial copy for the future /areas/:slug guide page */
  guide: string
  highlights: string[]
  image: MediaAsset
  mapPosition: { x: number; y: number }
}

/* --------------------------------------------------------------- Services */

export type EnquiryIntent = 'viewing' | 'valuation' | 'management' | 'advisor' | 'alerts' | 'general'

export interface Service {
  id: string
  title: string
  summary: string
  points: string[]
  icon: IconName
  cta: { label: string; intent?: EnquiryIntent; href?: string }
}

/* --------------------------------------------------------------- Insights */

export type InsightCategory = 'Market Trends' | 'Area Guide' | 'Buying Guide' | 'Selling Guide' | 'Investment'

export interface Insight {
  id: string
  slug: string
  category: InsightCategory
  title: string
  excerpt: string
  readMinutes: number
  publishedAt: string
  author: string
  image: MediaAsset
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  context: string
  service: 'Bought' | 'Sold' | 'Let' | 'Landlord' | 'Rented'
}

export interface Faq {
  question: string
  answer: string
}

export interface OpeningHours {
  label: string
  days: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>
  opens?: string
  closes?: string
  closed?: boolean
}
