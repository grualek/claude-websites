/**
 * Company details. Everything here is a fictional demo placeholder: phone numbers use the reserved
 * 555-01XX range and emails use the `.example` TLD. Replace before launch.
 */
export const company = {
  name: 'Ferrovane',
  legalName: 'Ferrovane Precision Manufacturing (demo)',
  tagline: 'Precision manufacturing',
  /** Production URL — used for canonical links and structured data. */
  url: 'https://grualek.github.io/claude-websites/manufacturing',
  city: 'Harlow Falls',
  address: {
    street: '1400 Foundry Parkway',
    locality: 'Harlow Falls',
    region: 'OH',
    postalCode: '44000',
    country: 'US',
  },
  phone: { display: '(555) 010-4410', href: 'tel:+15550104410' },
  sales: { display: '(555) 010-4420', href: 'tel:+15550104420' },
  email: 'rfq@ferrovane.example',
  salesEmail: 'sales@ferrovane.example',
  engineeringEmail: 'engineering@ferrovane.example',
  hours: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '17:00', label: 'Mon–Fri · 7:00–17:00' }],
} as const

export interface NavItem {
  label: string
  href: string
}

export const primaryNav: NavItem[] = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Industries', href: '#industries' },
  { label: 'Products', href: '#products' },
  { label: 'Quality', href: '#quality' },
  { label: 'About', href: '#facility' },
  { label: 'Resources', href: '#resources' },
  { label: 'Contact', href: '#rfq' },
]
