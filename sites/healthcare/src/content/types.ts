/**
 * Content model for the clinic website.
 *
 * Every section reads from typed content objects rather than hard-coded JSX so the
 * prototype can later be wired to a headless CMS (Sanity, Contentful, Storyblok…)
 * by replacing these modules with fetchers that return the same shapes.
 */

export type IconName =
  | 'stethoscope'
  | 'shield'
  | 'heart'
  | 'person'
  | 'microscope'
  | 'compass'
  | 'movement'
  | 'leaf'
  | 'clipboard'
  | 'card'
  | 'user-plus'
  | 'calendar'
  | 'chat'
  | 'video'
  | 'building'
  | 'clock'
  | 'check'
  | 'phone'
  | 'mail'
  | 'pin'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'plus'
  | 'close'
  | 'menu'
  | 'quote'
  | 'sparkle'

/** Images are optional everywhere: when `src` is missing an art-directed placeholder renders. */
export interface MediaAsset {
  src?: string
  /** Optional responsive sources, e.g. "/img/hero-800.webp 800w, /img/hero-1600.webp 1600w" */
  srcSet?: string
  alt: string
  width?: number
  height?: number
}

export interface Link {
  label: string
  href: string
}

export interface OpeningHours {
  /** Human-readable label, e.g. "Monday – Friday" */
  label: string
  /** schema.org dayOfWeek values the label covers */
  days: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>
  opens?: string // "08:00"
  closes?: string // "18:00"
  closed?: boolean
}

export interface ClinicInfo {
  name: string
  legalName: string
  shortDescription: string
  tagline: string
  url: string
  phone: { display: string; href: string }
  email: string
  address: {
    street: string
    locality: string
    region: string
    postalCode: string
    country: string
  }
  /** Add real coordinates to enable geo in structured data. */
  geo?: { latitude: number; longitude: number }
  hours: OpeningHours[]
  medicalSpecialties: string[]
  announcement: string
  emergencyDisclaimer: string
  /** Shown subtly in the footer so nobody mistakes the prototype for a live clinic. */
  demoNotice: string
}

export interface Service {
  id: string
  /** Future route: /services/{slug} */
  slug: string
  name: string
  icon: IconName
  summary: string
  /** Long-form copy shown in the service detail panel. */
  description: string
  includes: string[]
  appointmentTypes: Array<'In-person' | 'Virtual'>
}

export interface Specialist {
  id: string
  /** Future route: /specialists/{slug} */
  slug: string
  name: string
  title: string
  specialty: string
  credentials: string
  shortBio: string
  bio: string[]
  focusAreas: string[]
  languages: string[]
  portrait: MediaAsset
  /** Tone for the placeholder portrait. */
  tone: 'blue' | 'sage' | 'clay' | 'sand'
  isDemo: boolean
}

export interface JourneyStep {
  number: string
  title: string
  description: string
  icon: IconName
}

export interface InfoTopic {
  id: string
  title: string
  summary: string
  icon: IconName
  /** Paragraphs shown in the detail panel. */
  body: string[]
  bullets?: string[]
  /** Optional in-page link instead of opening a panel. */
  href?: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  context: string
  /** Testimonials in this prototype are illustrative. Replace with consented, real reviews. */
  isDemo: boolean
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface TrustPoint {
  title: string
  description: string
  icon: IconName
}
