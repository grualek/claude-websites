import { capabilities } from '../content/capabilities'
import { caseStudies } from '../content/caseStudies'
import { company } from '../content/company'
import { industries } from '../content/industries'
import { productFamilies } from '../content/products'
import { faqs } from '../content/resources'
import { routes } from './routes'

export const seo = {
  title: `${company.name} — Precision CNC Machining, Fabrication & Contract Manufacturing in ${company.city}, ${company.address.region}`,
  description: `${company.name} is a precision manufacturer in ${company.city}, ${company.address.region}, offering CNC machining, fabrication, assembly, automation, prototyping, finishing and quality inspection for automotive, aerospace, medical, energy and industrial OEMs. Request a quote.`,
  themeColor: '#16181b',
}

/** JSON-LD injected into index.html at build time (see vite.config.ts) so crawlers see it without JS. */
export function buildStructuredData() {
  const orgId = `${company.url}/#organization`
  const address = {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    addressLocality: company.address.locality,
    addressRegion: company.address.region,
    postalCode: company.address.postalCode,
    addressCountry: company.address.country,
  }

  const organization = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': orgId,
    name: company.name,
    legalName: company.legalName,
    description: seo.description,
    url: `${company.url}/`,
    telephone: company.phone.href.replace('tel:', ''),
    email: company.email,
    address,
    areaServed: { '@type': 'Country', name: 'United States' },
    openingHoursSpecification: company.hours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'sales', telephone: company.sales.href.replace('tel:', ''), email: company.salesEmail },
      { '@type': 'ContactPoint', contactType: 'technical support', email: company.engineeringEmail },
    ],
    knowsAbout: [...capabilities.map((c) => c.title), ...industries.map((i) => `${i.title} manufacturing`)],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Manufacturing capabilities',
      itemListElement: capabilities.map((c) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: c.title,
          serviceType: c.title,
          description: c.summary,
          url: `${company.url}${routes.capability(c)}`,
          provider: { '@id': orgId },
          audience: industries.map((i) => ({ '@type': 'BusinessAudience', name: i.title })),
        },
      })),
    },
  }

  const products = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${company.name} product families`,
    itemListElement: productFamilies.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'ProductGroup',
        name: p.title,
        description: p.summary,
        url: `${company.url}${routes.product(p)}`,
        brand: { '@id': orgId },
      },
    })),
  }

  const projects = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${company.name} case studies`,
    itemListElement: caseStudies.map((c, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: { '@type': 'Article', headline: c.title, description: c.challenge, url: `${company.url}${routes.caseStudy(c)}`, publisher: { '@id': orgId } },
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
    name: company.name,
    url: `${company.url}/`,
    publisher: { '@id': orgId },
  }

  return [organization, products, projects, faq, website]
}
