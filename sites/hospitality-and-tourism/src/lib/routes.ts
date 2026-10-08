import type { Article, DestinationHighlight, Experience, Offer, Room } from '../content/types'

/**
 * Canonical URL architecture for the production site (SSG / router). The single-page prototype opens
 * these as dialogs, but structured data and future pages use the same paths, so search equity builds
 * on stable URLs from day one:
 *  - hotel / brand searches        → /
 *  - accommodation searches        → /rooms/, /rooms/{slug}/
 *  - experience searches           → /experiences/, /experiences/{slug}/
 *  - restaurant searches           → /dining/
 *  - destination / local tourism   → /destination/, /destination/{slug}/
 *  - travel guides & things to do  → /journal/{slug}/, /destination/things-to-do/
 *  - offers & seasonal packages    → /offers/{slug}/
 *  - FAQ content                   → /faq/
 */
export const routes = {
  home: '/',
  rooms: '/rooms/',
  room: (r: Pick<Room, 'slug'>) => `/rooms/${r.slug}/`,
  experiences: '/experiences/',
  experience: (e: Pick<Experience, 'slug'>) => `/experiences/${e.slug}/`,
  dining: '/dining/',
  destination: '/destination/',
  highlight: (h: Pick<DestinationHighlight, 'slug'>) => `/destination/${h.slug}/`,
  thingsToDo: '/destination/things-to-do/',
  journal: '/journal/',
  article: (a: Pick<Article, 'slug'>) => `/journal/${a.slug}/`,
  offer: (o: Pick<Offer, 'slug'>) => `/offers/${o.slug}/`,
  about: '/about/',
  faq: '/faq/',
  contact: '/contact/',
  book: '/book/',
}
