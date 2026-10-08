import { attorneys } from '../content/attorneys'
import { firm } from '../content/firm'
import { insights } from '../content/insights'
import { practiceAreas } from '../content/practices'
import { faqs } from '../content/site'
import { routes } from './routes'

export const seo = {
  title: `${firm.name} — Business, Employment, Real Estate & Family Law Attorneys in ${firm.city}`,
  description: `${firm.name} is a ${firm.city} law firm advising businesses and individuals on corporate, employment, real estate, family, estate planning, litigation, immigration and tax matters. Schedule a confidential consultation.`,
  themeColor: '#f4efe6',
}

/** JSON-LD injected into index.html at build time (see vite.config.ts) so crawlers see it without JS. */
export function buildStructuredData() {
  const firmId = `${firm.url}/#firm`
  const address = {
    '@type': 'PostalAddress',
    streetAddress: firm.address.street,
    addressLocality: firm.address.locality,
    addressRegion: firm.address.region,
    postalCode: firm.address.postalCode,
    addressCountry: firm.address.country,
  }

  const legalService = {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'LocalBusiness'],
    '@id': firmId,
    name: firm.name,
    legalName: firm.legalName,
    description: seo.description,
    url: `${firm.url}/`,
    telephone: firm.phone.href.replace('tel:', ''),
    email: firm.email,
    address,
    areaServed: { '@type': 'City', name: firm.city },
    openingHoursSpecification: firm.hours.flatMap((h) =>
      'days' in h ? [{ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes }] : [],
    ),
    knowsAbout: practiceAreas.map((p) => p.title),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Practice areas',
      itemListElement: practiceAreas.map((p) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: p.title, description: p.summary, url: `${firm.url}${routes.practice(p)}`, areaServed: firm.city },
      })),
    },
    employee: attorneys.map((a) => ({ '@id': `${firm.url}${routes.attorney(a)}#person` })),
  }

  const people = attorneys.map((a) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${firm.url}${routes.attorney(a)}#person`,
    name: a.name,
    jobTitle: a.role,
    description: a.bio,
    url: `${firm.url}${routes.attorney(a)}`,
    worksFor: { '@id': firmId },
    knowsAbout: a.practices,
    ...(a.languages ? { knowsLanguage: a.languages } : {}),
  }))

  const articles = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Legal insights from ${firm.name}`,
    itemListElement: insights.map((i, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Article',
        headline: i.title,
        description: i.summary,
        datePublished: i.date,
        articleSection: i.category,
        url: `${firm.url}${routes.insight(i)}`,
        author: { '@type': 'Person', name: i.author },
        publisher: { '@id': firmId },
      },
    })),
  }

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: firm.name,
    url: `${firm.url}/`,
    publisher: { '@id': firmId },
  }

  return [legalService, ...people, articles, faq, website]
}
