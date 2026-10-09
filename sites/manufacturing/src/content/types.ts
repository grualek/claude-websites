/**
 * Content shapes for the site. Each maps 1:1 to a future CMS collection (capabilities, industries,
 * products, case studies, resources, certifications, locations) so demo content can be swapped
 * without touching components.
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
  | 'upload'
  | 'file'
  | 'download'
  | 'search'
  | 'spindle'
  | 'weld'
  | 'assembly'
  | 'automation'
  | 'prototype'
  | 'finish'
  | 'inspect'
  | 'custom'
  | 'gauge'
  | 'engineer'
  | 'layers'
  | 'scale-up'
  | 'car'
  | 'plane'
  | 'medical'
  | 'energy'
  | 'crane'
  | 'chip'
  | 'food'
  | 'gear'
  | 'book'
  | 'doc'
  | 'badge'
  | 'material'
  | 'question'
  | 'truck'
  | 'clipboard'
  | 'trace'
  | 'loop'
  | 'linkedin'

/** Art-directed scenes stand in for photography until real imagery is supplied. */
export type SceneName = 'cnc' | 'component' | 'hall' | 'robot' | 'inspection' | 'line' | 'drawing' | 'materials' | 'enclosure' | 'assembly'

export interface MediaAsset {
  scene: SceneName
  alt: string
  /** Provide a real photograph (or poster frame for video) to replace the illustrated scene. */
  src?: string
  srcSet?: string
  width?: number
  height?: number
}

export interface Capability {
  slug: string
  /** Display index, e.g. "01" */
  code: string
  title: string
  icon: IconName
  /** One-line card summary */
  summary: string
  /** Longer overview used on the capability page / dialog */
  overview: string
  /** Typical processes / services within the capability */
  services: string[]
  /** Materials commonly processed — informational, not a capability claim */
  materials: string[]
  /** Option label used by the RFQ form's "Project type" select */
  projectType: string
}

export interface Industry {
  slug: string
  title: string
  icon: IconName
  /** Short positioning copy for the grid */
  summary: string
  overview: string
  /** Typical parts / programs — written for search intent */
  applications: string[]
  /** What matters most to buyers in this sector */
  priorities: string[]
}

export interface ProductFamily {
  slug: string
  code: string
  title: string
  summary: string
  materials: string
  processes: string
}

export interface CaseStudy {
  slug: string
  title: string
  industry: string
  capability: string
  challenge: string
  approach: string
  result: string
  /** Extended narrative used in the dialog / future page */
  details: string[]
  image: MediaAsset
}

export interface Resource {
  slug: string
  title: string
  icon: IconName
  summary: string
  /** Example items listed in the dialog / future index page */
  items: { title: string; format: string }[]
}

export interface Step {
  code: string
  title: string
  body: string
  deliverables: string[]
}

export interface QualityPillar {
  title: string
  icon: IconName
  body: string
}

export interface Faq {
  question: string
  answer: string
}
