import type { CaseStudy, Capability, Industry, ProductFamily, Resource } from '../content/types'

const slugify = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/**
 * Canonical URL architecture for the production site (SSG / router). The single-page prototype
 * opens these as dialogs, but structured data and future pages use the same paths, so search
 * equity is built on stable URLs from day one.
 *
 *   /capabilities/cnc-machining/                 manufacturing-service searches
 *   /industries/aerospace/                       industry-specific searches
 *   /products/industrial-enclosures/             product searches
 *   /locations/harlow-falls/cnc-machining/       location-based manufacturing searches
 *   /resources/technical-guides/{article}/       technical informational content
 *   /case-studies/{slug}/  /quality/certifications/  /downloads/
 */
export const routes = {
  capabilities: '/capabilities/',
  capability: (c: Pick<Capability, 'slug'>) => `/capabilities/${c.slug}/`,
  industries: '/industries/',
  industry: (i: Pick<Industry, 'slug'>) => `/industries/${i.slug}/`,
  products: '/products/',
  product: (p: Pick<ProductFamily, 'slug'>) => `/products/${p.slug}/`,
  caseStudies: '/case-studies/',
  caseStudy: (c: Pick<CaseStudy, 'slug'>) => `/case-studies/${c.slug}/`,
  resources: '/resources/',
  resource: (r: Pick<Resource, 'slug'>) => `/resources/${r.slug}/`,
  article: (r: Pick<Resource, 'slug'>, title: string) => `/resources/${r.slug}/${slugify(title)}/`,
  quality: '/quality/',
  certifications: '/quality/certifications/',
  downloads: '/downloads/',
  /** Local landing pages, e.g. /locations/harlow-falls/cnc-machining/ */
  location: (city: string, capability?: Pick<Capability, 'slug'>) => `/locations/${slugify(city)}/${capability ? `${capability.slug}/` : ''}`,
  rfq: '/request-a-quote/',
  contact: '/contact/',
}
