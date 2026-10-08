import { restaurant } from '../content/dining'
import { destination } from '../content/destination'
import { experiences } from '../content/experiences'
import { articles } from '../content/journal'
import { property } from '../content/property'
import { rooms } from '../content/rooms'
import { faqs, offers } from '../content/site'
import { stripPlaceholders } from './format'
import { routes } from './routes'

export const seo = {
  title: `${property.name} — Boutique Hotel & Sea-View Suites on the Sarenne Coast`,
  description: `${property.name} is a boutique coastal hotel on the Sarenne Coast: ${property.keys} rooms, suites and private villas among olive groves above the sea, with a wood-fired restaurant, stone bathhouse and curated local experiences. Book direct for the best available rate.`,
  themeColor: '#f6f1e8',
}

const abs = (path: string) => `${property.url}${path}`

/** JSON-LD injected into index.html at build time (see vite.config.ts) so crawlers see it without JS. */
export function buildStructuredData() {
  const hotelId = abs('/#hotel')
  const address = {
    '@type': 'PostalAddress',
    streetAddress: property.address.street,
    addressLocality: property.address.locality,
    addressRegion: property.address.region,
    postalCode: property.address.postalCode,
    addressCountry: property.address.countryCode,
  }

  const hotel = {
    '@context': 'https://schema.org',
    '@type': ['Hotel', 'LodgingBusiness'],
    '@id': hotelId,
    name: property.name,
    description: seo.description,
    url: abs('/'),
    telephone: property.phone.href.replace('tel:', ''),
    email: property.email,
    address,
    geo: { '@type': 'GeoCoordinates', latitude: property.geo.latitude, longitude: property.geo.longitude },
    checkinTime: property.checkIn,
    checkoutTime: property.checkOut,
    numberOfRooms: property.keys,
    priceRange: `${rooms[0].fromRate.currency} ${Math.min(...rooms.map((r) => r.fromRate.amount))}–${Math.max(...rooms.map((r) => r.fromRate.amount))}`,
    currenciesAccepted: property.currency,
    amenityFeature: ['Outdoor pool', 'Spa', 'Restaurant', 'Free parking', 'Wi-Fi', 'Airport transfer'].map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
    containsPlace: rooms.map((r) => ({
      '@type': r.category === 'Suite' ? 'Suite' : 'HotelRoom',
      '@id': abs(`${routes.room(r)}#room`),
      name: r.name,
      description: r.summary,
      url: abs(routes.room(r)),
      bed: r.bed,
      occupancy: { '@type': 'QuantitativeValue', maxValue: r.maxGuests },
      floorSize: { '@type': 'QuantitativeValue', value: r.size, unitCode: 'MTK' },
      amenityFeature: r.amenities.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    })),
    makesOffer: [
      ...rooms.map((r) => ({
        '@type': 'Offer',
        name: r.name,
        url: abs(routes.room(r)),
        priceSpecification: { '@type': 'UnitPriceSpecification', price: r.fromRate.amount, priceCurrency: r.fromRate.currency, unitText: 'per night' },
      })),
      ...offers.map((o) => ({ '@type': 'Offer', name: o.title, description: o.summary, url: abs(routes.offer(o)) })),
    ],
  }

  const dining = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': abs(`${routes.dining}#restaurant`),
    name: `${restaurant.name} at ${property.name}`,
    servesCuisine: restaurant.cuisine,
    description: restaurant.description[0],
    url: abs(routes.dining),
    address,
    telephone: property.phone.href.replace('tel:', ''),
    containedInPlace: { '@id': hotelId },
  }

  const thingsToDo = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Things to do near ${property.name} on the Sarenne Coast`,
    url: abs(routes.thingsToDo),
    itemListElement: destination.highlights.map((h, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'TouristAttraction', name: h.title, description: h.summary, url: abs(routes.highlight(h)) },
    })),
  }

  const experienceList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Experiences at ${property.name}`,
    url: abs(routes.experiences),
    itemListElement: experiences.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'TouristTrip',
        name: e.title,
        description: e.summary,
        url: abs(routes.experience(e)),
        provider: { '@id': hotelId },
        ...(e.fromPrice ? { offers: { '@type': 'Offer', price: e.fromPrice.amount, priceCurrency: e.fromPrice.currency } } : {}),
      },
    })),
  }

  const journal = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Travel guides from ${property.name}`,
    itemListElement: articles.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Article',
        headline: a.title,
        description: a.summary,
        datePublished: a.date,
        articleSection: a.category,
        url: abs(routes.article(a)),
        author: { '@type': 'Organization', name: a.author },
        publisher: { '@id': hotelId },
      },
    })),
  }

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: stripPlaceholders(f.answer) } })),
  }

  const website = { '@context': 'https://schema.org', '@type': 'WebSite', name: property.name, url: abs('/'), publisher: { '@id': hotelId } }

  // Note: demo testimonials are deliberately NOT emitted as Review / AggregateRating markup.
  return [hotel, dining, experienceList, thingsToDo, journal, faq, website]
}
