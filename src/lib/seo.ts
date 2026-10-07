import { clinic, fullAddress } from '../content/clinic'
import { faqs } from '../content/patients'
import { services } from '../content/services'
import { specialists } from '../content/people'

export const seo = {
  title: `${clinic.name} | Primary & Specialist Medical Care in ${clinic.address.locality}`,
  description: `${clinic.name} offers primary care, preventive health, women’s and men’s health, diagnostics, specialist consultations and physiotherapy in ${clinic.address.locality}. Now accepting new patients — book in-person or virtual appointments.`,
  themeColor: '#f7f4ee',
}

/**
 * schema.org JSON-LD generated from the same content the page renders, so structured
 * data never drifts from visible copy. Injected into index.html at build time (see vite.config.ts).
 */
export function buildStructuredData() {
  const dayHours = clinic.hours
    .filter((h) => !h.closed && h.opens && h.closes)
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    }))

  const org = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${clinic.url}/#clinic`,
    name: clinic.name,
    description: clinic.shortDescription,
    url: clinic.url,
    telephone: clinic.phone.href.replace('tel:', ''),
    email: clinic.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.locality,
      addressRegion: clinic.address.region,
      postalCode: clinic.address.postalCode,
      addressCountry: clinic.address.country,
    },
    ...(clinic.geo ? { geo: { '@type': 'GeoCoordinates', ...clinic.geo } } : {}),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
    openingHoursSpecification: dayHours,
    medicalSpecialty: clinic.medicalSpecialties,
    isAcceptingNewPatients: true,
    availableService: services.map((s) => ({
      '@type': 'MedicalProcedure',
      name: s.name,
      description: s.summary,
    })),
    // Only include real, verified practitioners in production.
    employee: specialists
      .filter((p) => !p.isDemo)
      .map((p) => ({ '@type': 'Physician', name: p.name, medicalSpecialty: p.specialty })),
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return [org, faqPage]
}
