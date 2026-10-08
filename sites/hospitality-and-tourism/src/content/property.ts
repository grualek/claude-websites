/**
 * Core business details. Everything here is fictional demo content — replace with the real property's
 * name, address, contact details and policies. Phone numbers use the reserved 555-01XX range and
 * email addresses use the `.example` TLD.
 */
export const property = {
  name: 'Casa Velora',
  /** Short descriptor used in titles & schema */
  type: 'Boutique coastal hotel',
  tagline: 'A coastal estate on the Sarenne Coast',
  destination: 'the Sarenne Coast',
  region: 'Sarenne',
  url: 'https://grualek.github.io/claude-websites/hospitality-and-tourism',
  currency: 'EUR',
  locale: 'en-GB',
  keys: 24,
  established: 1928,
  address: {
    street: '12 Strada del Faro',
    locality: 'Porto Sarenne',
    region: 'Sarenne Coast',
    postalCode: '00412',
    country: 'Demo Country',
    countryCode: 'XX',
  },
  geo: { latitude: 38.1234, longitude: 15.6789 },
  phone: { display: '+1 (555) 014-2290', href: 'tel:+15550142290' },
  whatsapp: { display: 'Message us', href: '#contact' },
  email: 'stay@casavelora.example',
  eventsEmail: 'events@casavelora.example',
  checkIn: '15:00',
  checkOut: '11:00',
  reception: 'Open 24 hours',
  social: { instagram: '#' },
  directions: [
    {
      icon: 'plane' as const,
      title: 'By air',
      body: 'Sarenne International is 40 minutes away by car. Private transfers can be arranged when you book.',
    },
    {
      icon: 'car' as const,
      title: 'By car',
      body: 'Follow the coast road south from Porto Sarenne and turn at the lighthouse sign. Parking on site.',
    },
    {
      icon: 'boat' as const,
      title: 'By sea',
      body: 'Our launch meets guests from the Porto Sarenne ferry quay in summer, on request.',
    },
  ],
}

export const primaryNav = [
  { label: 'Stay', href: '#stay' },
  { label: 'Rooms', href: '#rooms' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Dining', href: '#dining' },
  { label: 'Destination', href: '#destination' },
  { label: 'About', href: '#about' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' },
] as const

export const footerNav = [
  {
    title: 'Stay',
    links: [
      { label: 'Stay', href: '#stay' },
      { label: 'Rooms & suites', href: '#rooms' },
      { label: 'Experiences', href: '#experiences' },
      { label: 'Dining', href: '#dining' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'Destination', href: '#destination' },
      { label: 'Journal', href: '#journal' },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { label: 'Booking policies', href: '#faq' },
      { label: 'Privacy', href: '#privacy' },
      { label: 'Terms', href: '#terms' },
      { label: 'Accessibility', href: '#accessibility' },
    ],
  },
] as const
