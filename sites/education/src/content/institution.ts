import type { NavItem } from './types'

/**
 * Core institution details. Everything here is fictional demo content: phone numbers use the reserved
 * 555-01XX range and email addresses use the `.example` TLD. Swap this file to rebrand the site for a
 * school, university, academy, language school or online provider.
 */
export const institution = {
  name: 'Larkmoor College',
  shortName: 'Larkmoor',
  /** One-line descriptor used in titles and structured data — adapt per institution type */
  descriptor: 'Independent college of applied learning',
  founded: 1968,
  url: 'https://www.larkmoor.example',
  locale: 'en',
  address: {
    street: '1 Collegiate Way',
    locality: 'Millbrook',
    region: 'Northvale',
    postalCode: '04120',
    country: 'Demo Country',
    countryCode: 'XX',
  },
  phone: { display: '(555) 555-0163', href: 'tel:+15555550163' },
  email: 'admissions@larkmoor.example',
  generalEmail: 'hello@larkmoor.example',
  admissionsHours: [
    { days: 'Monday – Friday', hours: '9:00 – 17:30' },
    { days: 'Saturday', hours: '[[10:00 – 14:00 during application season]]' },
    { days: 'Sunday', hours: 'Closed' },
  ],
  /** ISO opening hours for structured data */
  openingHoursSpec: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:30' }],
  directions: [
    { mode: 'Rail', text: 'Millbrook Central is a 12-minute walk, or two stops on the 4 bus.' },
    { mode: 'Bus', text: 'Routes 4, 11 and 27 stop outside the Collegiate Way entrance.' },
    { mode: 'Cycle', text: 'Covered cycle parking for 400 bikes beside the Library.' },
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com/', icon: 'instagram' as const },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' as const },
    { label: 'YouTube', href: 'https://www.youtube.com/', icon: 'youtube' as const },
  ],
}

export const primaryNav: NavItem[] = [
  { label: 'Programs', href: '#programs' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'About', href: '#about' },
  { label: 'Campus', href: '#campus' },
  { label: 'Student Life', href: '#student-life' },
  { label: 'Resources', href: '#resources' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
]
