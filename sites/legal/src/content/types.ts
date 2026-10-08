/**
 * Content shapes for the site. Each maps 1:1 to a future CMS collection (practice areas, attorneys,
 * insights, FAQs, testimonials, locations, case studies) so demo content can be swapped without
 * touching components.
 */

export type IconName =
  | 'arrow-right'
  | 'arrow-up-right'
  | 'arrow-down'
  | 'phone'
  | 'mail'
  | 'pin'
  | 'clock'
  | 'close'
  | 'menu'
  | 'plus'
  | 'check'
  | 'lock'
  | 'video'
  | 'scale'
  | 'compass'
  | 'chat'
  | 'person'
  | 'key'
  | 'shield'
  | 'briefcase'
  | 'calendar'
  | 'quote'
  | 'linkedin'

/** Illustrated scenes stand in for photography until real imagery is supplied. */
export type SceneName = 'office' | 'facade' | 'arch' | 'stair' | 'window' | 'portrait'

export interface MediaAsset {
  scene: SceneName
  /** Variant index for scenes with several art-directed versions (e.g. portraits). */
  variant?: number
  alt: string
  /** Provide a real photograph to replace the illustrated scene. */
  src?: string
  srcSet?: string
  width?: number
  height?: number
}

export interface PracticeArea {
  slug: string
  title: string
  /** One-line card summary */
  summary: string
  /** Longer overview used on the practice page / dialog */
  overview: string
  services: string[]
  /** Typical client situations, written for search intent ("I need help with…") */
  situations: string[]
  /** Option label used by the consultation form's "Matter type" select */
  matterLabel: string
}

export interface Attorney {
  slug: string
  name: string
  role: string
  practices: string[]
  credentials: string[]
  admissions: string[]
  bio: string
  fullBio: string[]
  portrait: MediaAsset
  email: string
  languages?: string[]
}

export interface Insight {
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
  attribution: string
  context: string
}

export interface Faq {
  question: string
  answer: string
}

export interface Step {
  title: string
  body: string
  detail: string
}

export interface Principle {
  title: string
  body: string
  icon: IconName
}

/** Illustrative matter types. Replace with approved, anonymised case studies before launch. */
export interface MatterType {
  practice: string
  description: string
}
