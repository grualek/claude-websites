/**
 * Content shapes for the site. Each maps 1:1 to a future CMS collection (programs, faculty, campus spaces,
 * student stories, events, news, guides, FAQs) so demo content can be swapped without touching components.
 *
 * Text wrapped in [[double brackets]] is a placeholder the institution must confirm (dates, requirements,
 * policies). It is highlighted on the page and stripped from structured data.
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
  | 'calendar'
  | 'search'
  | 'download'
  | 'chat'
  | 'book'
  | 'flask'
  | 'tools'
  | 'laptop'
  | 'people'
  | 'compass'
  | 'spark'
  | 'leaf'
  | 'mentor'
  | 'briefcase'
  | 'globe'
  | 'cap'
  | 'quote'
  | 'map'
  | 'file'
  | 'help'
  | 'news'
  | 'ticket'
  | 'layers'
  | 'instagram'
  | 'linkedin'
  | 'youtube'

/** Illustrated scenes stand in for photography until the institution supplies real imagery. */
export type SceneName =
  | 'campus'
  | 'library'
  | 'seminar'
  | 'lab'
  | 'workshop'
  | 'studio'
  | 'digital'
  | 'collaboration'
  | 'quad'
  | 'event'
  | 'clubs'
  | 'community'
  | 'projects'
  | 'activities'
  | 'field'
  | 'lecture'
  | 'map'

/** Lighting for a scene — lets one illustration read as morning, afternoon or early evening. */
export type Mood = 'morning' | 'day' | 'evening'

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

/** Illustrated portrait parameters — replaced by `photo` when a real headshot is supplied. */
export interface PortraitSpec {
  skin: string
  hair: string
  hairStyle: 'short' | 'bun' | 'long' | 'curly' | 'cropped' | 'wavy'
  top: string
  backdrop: string
  glasses?: boolean
  beard?: boolean
}

export type ProgramCategory = 'Undergraduate' | 'Postgraduate' | 'Professional' | 'Online' | 'Short Courses'
export type StudyFormat = 'On campus' | 'Online' | 'Blended'

export interface Program {
  slug: string
  name: string
  /** Award / credential, e.g. "BSc (Hons)" or "Professional Certificate" */
  award: string
  category: ProgramCategory
  subject: string
  duration: string
  /** ISO 8601 duration for Course schema, e.g. "P3Y" */
  isoDuration: string
  format: StudyFormat
  studyMode: string
  start: string
  summary: string
  overview: string[]
  highlights: string[]
  modules: string[]
  /** Areas of study and practice the program prepares students to explore — never an employment promise */
  pathways: string[]
  entry: string
  image: MediaAsset
  featured?: boolean
  /** Short tags used by the search box (subject synonyms, skills) */
  keywords: string[]
}

export interface Educator {
  slug: string
  name: string
  title: string
  department: string
  expertise: string[]
  bio: string
  longBio: string[]
  teaches: string[]
  portrait: PortraitSpec
  photo?: MediaAsset
}

export interface StudentStory {
  slug: string
  name: string
  program: string
  stage: string
  headline: string
  quote: string
  story: string[]
  image: MediaAsset
  portrait: PortraitSpec
}

export interface Pillar {
  icon: IconName
  title: string
  body: string
}

export interface Space {
  slug: string
  title: string
  body: string
  image: MediaAsset
}

export interface Step {
  title: string
  body: string
  action: string
  intent?: EnquiryIntent
  href?: string
}

export interface Resource {
  slug: string
  title: string
  body: string
  icon: IconName
  meta: string
  action: string
  intent?: EnquiryIntent
  href?: string
}

export interface CampusEvent {
  slug: string
  title: string
  /** ISO date yyyy-mm-dd */
  date: string
  time: string
  location: string
  format: 'On campus' | 'Online'
  summary: string
  audience: string
}

export interface Article {
  slug: string
  title: string
  category: 'News' | 'Guide' | 'Research' | 'Campus'
  date: string
  readTime: string
  summary: string
  body: string[]
  image: MediaAsset
  author: string
}

export interface Faq {
  question: string
  answer: string
}

/** The secondary conversions: each opens a tailored enquiry form. */
export type EnquiryIntent = 'apply' | 'visit' | 'info' | 'talk' | 'prospectus'

export interface NavItem {
  label: string
  href: string
}
