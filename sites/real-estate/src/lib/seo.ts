import { company } from '../content/company'
import { areas } from '../content/areas'
import { properties } from '../content/properties'
import { faqs } from '../content/site'
import { routes } from './routes'

export const seo = {
  title: `${company.name} — Estate Agents, Lettings & Property Management in ${company.city}`,
  description: `Homes for sale and to rent in ${company.city}'s City Centre, Riverside, Old Town and beyond. Free property valuations, lettings and full property management from a local, independent team.`,
  themeColor: '#f6f2ea',
}

/** JSON-LD injected into index.html at build time (see vite.config.ts) so crawlers see it without JS. */
export function buildStructuredData() {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${company.url}/#agency`,
    name: company.name,
    legalName: company.legalName,
    url: `${company.url}/`,
    telephone: company.phone.href.replace('tel:', ''),
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.locality,
      postalCode: company.address.postcode,
      addressCountry: company.address.country,
    },
    areaServed: areas.map((a) => ({ '@type': 'Place', name: `${a.name}, ${company.city}`, url: `${company.url}${routes.area(a)}` })),
    openingHoursSpecification: company.hours
      .filter((h) => !h.closed)
      .map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    makesOffer: ['Property sales', 'Lettings', 'Property management', 'Property valuation', 'Investment advisory'].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
  }

  const listings = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Properties for sale and to rent in ${company.city}`,
    itemListElement: properties.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'RealEstateListing',
        name: p.title,
        url: `${company.url}${routes.property(p)}`,
        datePosted: p.listedAt,
        description: p.summary,
        offers: {
          '@type': 'Offer',
          price: p.price,
          priceCurrency: 'GBP',
          businessFunction: p.listingType === 'rent' ? 'http://purl.org/goodrelations/v1#LeaseOut' : 'http://purl.org/goodrelations/v1#Sell',
        },
        about: {
          '@type': p.propertyType === 'apartment' || p.propertyType === 'penthouse' ? 'Apartment' : p.propertyType === 'commercial' ? 'Place' : 'SingleFamilyResidence',
          address: { '@type': 'PostalAddress', streetAddress: p.address.line, addressLocality: p.address.city, postalCode: p.address.postcode },
          numberOfRooms: p.bedrooms + (p.receptions ?? 0),
          floorSize: { '@type': 'QuantitativeValue', value: p.floorArea, unitCode: 'FTK' },
        },
      },
    })),
  }

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  }

  return [org, listings, faq]
}
