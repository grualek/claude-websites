import type { ClinicInfo, Link } from './types'

/**
 * Placeholder business details. Phone numbers use the reserved 555-01xx range and the
 * email/website use the reserved `.example` domain so nothing routes to a real business.
 */
export const clinic: ClinicInfo = {
  name: 'Alder Clinic',
  legalName: 'Alder Clinic Medical Group (Demo)',
  tagline: 'Specialist & Family Medicine',
  shortDescription:
    'An independent, multi-specialty practice offering primary, preventive and specialist care — with time to listen and a team that coordinates around you.',
  url: 'https://www.alderclinic.example',
  phone: { display: '(555) 010-0148', href: 'tel:+15550100148' },
  email: 'care@alderclinic.example',
  address: {
    street: '128 Linden Avenue, Suite 200',
    locality: 'Springfield',
    region: 'ST',
    postalCode: '00000',
    country: 'US',
  },
  hours: [
    { label: 'Monday – Thursday', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '08:00', closes: '18:00' },
    { label: 'Friday', days: ['Friday'], opens: '08:00', closes: '17:00' },
    { label: 'Saturday', days: ['Saturday'], opens: '09:00', closes: '13:00' },
    { label: 'Sunday', days: ['Sunday'], closed: true },
  ],
  medicalSpecialties: ['PrimaryCare', 'PreventiveMedicine', 'Gynecologic', 'Physiotherapy', 'DiagnosticLab'],
  announcement: 'Now accepting new patients · Same-week appointments available',
  emergencyDisclaimer:
    'This website is for informational purposes only and is not a substitute for professional medical advice. For emergencies, contact your local emergency services.',
  demoNotice:
    'Design prototype. Clinic name, people, addresses and testimonials are fictional placeholders.',
}

export const fullAddress = `${clinic.address.street}, ${clinic.address.locality}, ${clinic.address.region} ${clinic.address.postalCode}`

export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`

/** Primary navigation — each item maps to an in-page section id (future: real routes). */
export const primaryNav: Link[] = [
  { label: 'Services', href: '#services' },
  { label: 'Specialists', href: '#specialists' },
  { label: 'About', href: '#about' },
  { label: 'Patient Information', href: '#patient-information' },
  { label: 'Resources', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export function formatTime(time: string) {
  const [h, m] = time.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 === 0 ? 12 : h % 12
  return m === 0 ? `${hour}${suffix}` : `${hour}:${String(m).padStart(2, '0')}${suffix}`
}
