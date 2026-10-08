import type { Attorney, Insight, PracticeArea } from '../content/types'

/**
 * Canonical URL architecture for the production site (SSG / router). The single-page prototype
 * opens these as dialogs, but structured data and future pages use the same paths, so search
 * equity is built on stable URLs from day one.
 */
export const routes = {
  practiceAreas: '/practice-areas/',
  practice: (p: Pick<PracticeArea, 'slug'>) => `/practice-areas/${p.slug}/`,
  attorneys: '/attorneys/',
  attorney: (a: Pick<Attorney, 'slug'>) => `/attorneys/${a.slug}/`,
  insights: '/insights/',
  insight: (i: Pick<Insight, 'slug'>) => `/insights/${i.slug}/`,
  /** Local landing pages, e.g. /locations/eastbridge/family-law/ */
  location: (city: string, practice?: Pick<PracticeArea, 'slug'>) =>
    `/locations/${city.toLowerCase().replace(/\s+/g, '-')}/${practice ? `${practice.slug}/` : ''}`,
  contact: '/contact/',
}
