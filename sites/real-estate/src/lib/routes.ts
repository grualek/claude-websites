import type { Area, Insight, Property } from '../content/types'

/**
 * Canonical URL architecture for the production site.
 *
 * The prototype is a single page (anchors + dialogs), but every entity already knows its
 * future URL so links, sitemaps and structured data stay stable when a router / SSG
 * (Next.js, Astro, Remix) is introduced. Each pattern targets a distinct search intent:
 *
 *   /                                   brand + "estate agents in {city}"
 *   /buy/  /buy/{area}/                 "houses for sale in {area}"
 *   /buy/{area}/{type}/                 "{beds} bed {type} for sale in {area}"
 *   /rent/ /rent/{area}/                "flats to rent in {area}"
 *   /property/{slug}/                   individual listing (RealEstateListing schema)
 *   /areas/{slug}/                      area guide (local SEO, Place schema)
 *   /sell/  /valuation/                 "sell my house {city}", "free property valuation"
 *   /property-management/               "letting agents / property management {city}"
 *   /investment/                        "buy-to-let {city}", investor content
 *   /insights/{category}/{slug}/        guides & market reports (Article schema)
 *   /agents/{id}/                       agent profiles (Person schema)
 *   /alerts/                            property alert sign-up
 */
export const routes = {
  home: '/',
  buy: (areaSlug?: string) => (areaSlug ? `/buy/${areaSlug}/` : '/buy/'),
  rent: (areaSlug?: string) => (areaSlug ? `/rent/${areaSlug}/` : '/rent/'),
  property: (p: Pick<Property, 'slug'>) => `/property/${p.slug}/`,
  area: (a: Pick<Area, 'slug'>) => `/areas/${a.slug}/`,
  insight: (i: Pick<Insight, 'slug' | 'category'>) =>
    `/insights/${i.category.toLowerCase().replace(/\s+/g, '-')}/${i.slug}/`,
  agent: (id: string) => `/agents/${id}/`,
  sell: '/sell/',
  valuation: '/valuation/',
  management: '/property-management/',
  investment: '/investment/',
  alerts: '/alerts/',
  contact: '/contact/',
  privacy: '/privacy/',
  terms: '/terms/',
} as const
