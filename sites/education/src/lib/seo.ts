import { institution } from '../content/institution'
import { educators } from '../content/people'
import { programs } from '../content/programs'
import { articles, events, faqs } from '../content/site'
import { stripPlaceholders } from './format'
import { routes } from './routes'

export const seo = {
  title: `${institution.name} — Undergraduate, Postgraduate, Professional & Online Programs in ${institution.address.locality}`,
  description: `${institution.name} is an ${institution.descriptor.toLowerCase()} in ${institution.address.locality}. Explore undergraduate degrees, master’s, professional certificates, online programs and short courses with small classes, practical learning and supportive tutors. Book a campus visit or apply online.`,
  themeColor: '#f4efe4',
}

const abs = (path: string) => `${institution.url}${path}`
const courseMode = { 'On campus': 'Onsite', Online: 'Online', Blended: 'Blended' } as const

/** JSON-LD injected into index.html at build time (see vite.config.ts) so crawlers see it without JS. */
export function buildStructuredData() {
  const orgId = abs('/#organization')
  const address = {
    '@type': 'PostalAddress',
    streetAddress: institution.address.street,
    addressLocality: institution.address.locality,
    addressRegion: institution.address.region,
    postalCode: institution.address.postalCode,
    addressCountry: institution.address.countryCode,
  }

  const organization = {
    '@context': 'https://schema.org',
    // Use HighSchool / School / CollegeOrUniversity / EducationalOrganization to match the institution type
    '@type': ['CollegeOrUniversity', 'EducationalOrganization'],
    '@id': orgId,
    name: institution.name,
    description: seo.description,
    url: abs('/'),
    foundingDate: String(institution.founded),
    telephone: institution.phone.href.replace('tel:', ''),
    email: institution.email,
    address,
    sameAs: institution.social.map((s) => s.href),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'admissions',
        telephone: institution.phone.href.replace('tel:', ''),
        email: institution.email,
        hoursAvailable: institution.openingHoursSpec.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.days,
          opens: h.opens,
          closes: h.closes,
        })),
      },
    ],
  }

  const courseList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Programs at ${institution.name}`,
    url: abs(routes.programs),
    itemListElement: programs.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        '@id': abs(`${routes.program(p)}#course`),
        name: `${p.award} ${p.name}`,
        description: p.summary,
        url: abs(routes.program(p)),
        courseCode: p.slug.toUpperCase(),
        educationalLevel: p.category,
        about: p.subject,
        educationalCredentialAwarded: p.award,
        timeRequired: p.isoDuration,
        provider: { '@id': orgId },
        coursePrerequisites: stripPlaceholders(p.entry),
        syllabusSections: p.modules.map((m) => ({ '@type': 'Syllabus', name: m })),
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: courseMode[p.format],
          courseWorkload: p.studyMode,
          ...(p.format !== 'Online' ? { location: { '@type': 'Place', name: institution.name, address } } : {}),
        },
      },
    })),
  }

  const faculty = educators.map((e) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': abs(`${routes.educator(e)}#person`),
    name: e.name,
    jobTitle: e.title,
    description: e.bio,
    url: abs(routes.educator(e)),
    knowsAbout: e.expertise,
    worksFor: { '@id': orgId },
    affiliation: { '@type': 'Organization', name: e.department, parentOrganization: { '@id': orgId } },
  }))

  const eventList = events.map((e) => ({
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: e.title,
    description: e.summary,
    startDate: e.date,
    url: abs(routes.event(e)),
    eventAttendanceMode: e.format === 'Online' ? 'https://schema.org/OnlineEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location:
      e.format === 'Online'
        ? { '@type': 'VirtualLocation', url: abs(routes.event(e)) }
        : { '@type': 'Place', name: `${e.location}, ${institution.name}`, address },
    organizer: { '@id': orgId },
    audience: { '@type': 'EducationalAudience', educationalRole: e.audience },
    isAccessibleForFree: true,
  }))

  const news = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `News and guides from ${institution.name}`,
    itemListElement: articles.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': a.category === 'Guide' ? 'Article' : 'NewsArticle',
        headline: a.title,
        description: a.summary,
        datePublished: a.date,
        articleSection: a.category,
        url: abs(routes.article(a)),
        author: { '@type': 'Organization', name: a.author },
        publisher: { '@id': orgId },
      },
    })),
  }

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: stripPlaceholders(f.answer) } })),
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: institution.name,
    url: abs('/'),
    publisher: { '@id': orgId },
    // Sitelinks search box → the course search results page
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: abs(routes.programSearch()) },
      'query-input': 'required name=search_term_string',
    },
  }

  // Demo student stories are deliberately NOT emitted as Review / AggregateRating markup.
  return [organization, courseList, ...faculty, ...eventList, news, faq, website]
}
