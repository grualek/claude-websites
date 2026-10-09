import type { Article, CampusEvent, Educator, Program, ProgramCategory, Resource, Space, StudentStory } from '../content/types'

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/**
 * Canonical URL architecture for the production site (SSG / router). The single-page prototype opens
 * these as dialogs, but structured data and future pages use the same paths, so search equity builds on
 * stable URLs from day one:
 *
 *  - program searches ("msc data science", "part-time project management course")
 *        → /programs/{level}/{slug}/            one page per program, level hub per category
 *  - course searches / filters
 *        → /programs/?q={query}&format={format} search results page (also the WebSite SearchAction)
 *  - subject searches ("environmental science degree")
 *        → /subjects/{subject}/                 subject hubs linking every level
 *  - online learning searches                → /programs/online/
 *  - admissions searches ("how to apply", "entry requirements", "scholarships")
 *        → /admissions/, /admissions/{topic}/
 *  - local education searches ("college in Millbrook", "campus tours")
 *        → /visit/, /campus/, /campus/{space}/, /contact/
 *  - informational searches ("full-time vs part-time study") → /guides/{slug}/, /news/{slug}/
 *  - people searches                          → /faculty/, /faculty/{slug}/
 *  - social proof                             → /stories/{slug}/
 *  - events                                   → /events/{slug}/
 *  - FAQ content                              → /faq/ (+ FAQPage markup)
 */
export const routes = {
  home: '/',
  programs: '/programs/',
  programSearch: (q = '{search_term_string}') => `/programs/?q=${q}`,
  level: (c: ProgramCategory) => `/programs/${slugify(c)}/`,
  program: (p: Pick<Program, 'slug' | 'category'>) => `/programs/${slugify(p.category)}/${p.slug}/`,
  subject: (subject: string) => `/subjects/${slugify(subject)}/`,
  admissions: '/admissions/',
  admissionsTopic: (topic: 'how-to-apply' | 'entry-requirements' | 'scholarships-and-funding' | 'key-dates' | 'international') => `/admissions/${topic}/`,
  apply: '/apply/',
  visit: '/visit/',
  prospectus: '/prospectus/',
  about: '/about/',
  campus: '/campus/',
  space: (s: Pick<Space, 'slug'>) => `/campus/${s.slug}/`,
  studentLife: '/student-life/',
  faculty: '/faculty/',
  educator: (e: Pick<Educator, 'slug'>) => `/faculty/${e.slug}/`,
  stories: '/stories/',
  story: (s: Pick<StudentStory, 'slug'>) => `/stories/${s.slug}/`,
  resources: '/resources/',
  resource: (r: Pick<Resource, 'slug'>) => `/resources/${r.slug}/`,
  news: '/news/',
  article: (a: Pick<Article, 'slug' | 'category'>) => (a.category === 'Guide' ? `/guides/${a.slug}/` : `/news/${a.slug}/`),
  events: '/events/',
  event: (e: Pick<CampusEvent, 'slug'>) => `/events/${e.slug}/`,
  faq: '/faq/',
  contact: '/contact/',
}
