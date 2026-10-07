import type { Agent, Link, OpeningHours } from './types'

/**
 * Business details. Everything here is a fictional placeholder for the pitch —
 * swap in the client's real name, contact details and hours.
 * Phone numbers use the Ofcom range reserved for drama/fiction (01632 960xxx).
 */
export const company = {
  name: 'Hollis & Vale',
  legalName: 'Hollis & Vale Property Ltd',
  descriptor: 'Estate Agents · Lettings · Property Management',
  city: 'Wrenfield',
  url: 'https://grualek.github.io/claude-websites/real-estate',
  phone: { display: '01632 960 418', href: 'tel:+441632960418' },
  lettingsPhone: { display: '01632 960 427', href: 'tel:+441632960427' },
  email: 'hello@hollisandvale.example',
  address: {
    street: '14 Linden Row',
    locality: 'Wrenfield',
    region: 'Old Town',
    postcode: 'WR1 4LH',
    country: 'GB',
  },
  hours: [
    { label: 'Monday – Friday', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '18:30' },
    { label: 'Saturday', days: ['Saturday'], opens: '09:00', closes: '16:00' },
    { label: 'Sunday', days: ['Sunday'], closed: true },
  ] satisfies OpeningHours[],
  hoursNote: 'Accompanied viewings available most evenings by arrangement.',
  social: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ] satisfies Link[],
}

/** In-page anchors in the prototype. With a router these map to the URLs in `lib/routes.ts`. */
export const primaryNav: Link[] = [
  { label: 'Buy', href: '#search' },
  { label: 'Rent', href: '#search' },
  { label: 'Sell', href: '#sell' },
  { label: 'Property Management', href: '#management' },
  { label: 'Areas', href: '#areas' },
  { label: 'About', href: '#about' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
]

export const agents: Agent[] = [
  {
    id: 'eleanor',
    name: 'Eleanor Hollis',
    role: 'Director · Sales',
    phone: { display: '01632 960 418', href: 'tel:+441632960418' },
    email: 'eleanor@hollisandvale.example',
    areas: ['old-town', 'riverside'],
  },
  {
    id: 'james',
    name: 'James Okafor',
    role: 'Senior Sales Advisor',
    phone: { display: '01632 960 419', href: 'tel:+441632960419' },
    email: 'james@hollisandvale.example',
    areas: ['city-centre', 'north-district'],
  },
  {
    id: 'priya',
    name: 'Priya Raman',
    role: 'Head of Lettings & Management',
    phone: { display: '01632 960 427', href: 'tel:+441632960427' },
    email: 'priya@hollisandvale.example',
    areas: ['city-centre', 'riverside', 'north-district'],
  },
  {
    id: 'tom',
    name: 'Tom Ashworth',
    role: 'Country & Coastal Homes',
    phone: { display: '01632 960 433', href: 'tel:+441632960433' },
    email: 'tom@hollisandvale.example',
    areas: ['coast-country', 'the-suburbs'],
  },
]

export const getAgent = (id: string) => agents.find((a) => a.id === id) ?? agents[0]
