/**
 * Firm details — every value here is a fictional placeholder for the demo.
 * Phone numbers use the reserved 555-01XX range; emails use the reserved `.example` TLD.
 */
export const firm = {
  name: 'Calder & Rowe',
  legalName: 'Calder & Rowe LLP (demo)',
  descriptor: 'Attorneys & Counselors',
  url: 'https://grualek.github.io/claude-websites/legal',
  city: 'Eastbridge',
  phone: { display: '(555) 555-0142', href: 'tel:+15555550142' },
  email: 'consult@calderrowe.example',
  address: {
    street: '400 Meridian Avenue, Suite 1200',
    locality: 'Eastbridge',
    region: 'ST',
    postalCode: '00000',
    country: 'US',
  },
  hours: [
    { label: 'Monday – Friday', value: '8:30 am – 6:00 pm', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '18:00' },
    { label: 'Evenings & weekends', value: 'By appointment' },
  ],
  social: [{ label: 'LinkedIn', href: '#' }],
} as const

export const primaryNav = [
  { label: 'Practice Areas', href: '#practice-areas' },
  { label: 'Attorneys', href: '#attorneys' },
  { label: 'About', href: '#about' },
  { label: 'Insights', href: '#insights' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const

export const disclaimer =
  'Information on this website is provided for general informational purposes and does not constitute legal advice or create an attorney-client relationship.'
