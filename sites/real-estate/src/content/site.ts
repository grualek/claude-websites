import type { Faq, IconName, Insight, Service, Testimonial } from './types'

export const services: Service[] = [
  {
    id: 'buying',
    title: 'Buying',
    summary: 'Early access to new instructions, honest advice on value, and a guide from first viewing to keys.',
    points: ['Property alerts before portals', 'Accompanied viewings', 'Offer & negotiation advice'],
    icon: 'key',
    cta: { label: 'Explore properties', href: '#search' },
  },
  {
    id: 'selling',
    title: 'Selling',
    summary: 'A considered launch with editorial photography, floor plans and a marketing plan built around your home.',
    points: ['Professional photography & film', 'Targeted buyer matching', 'Sale progression to completion'],
    icon: 'sign',
    cta: { label: 'Request a valuation', intent: 'valuation' },
  },
  {
    id: 'renting',
    title: 'Renting',
    summary: 'Well-presented homes to let across the city, with clear referencing and a straightforward move-in.',
    points: ['Furnished & unfurnished homes', 'Transparent referencing', 'Digital tenancy signing'],
    icon: 'home',
    cta: { label: 'Browse rentals', href: '#search' },
  },
  {
    id: 'management',
    title: 'Property Management',
    summary: 'Day-to-day care of your rental — tenants, maintenance, compliance and rent — handled by one team.',
    points: ['Tenant management', 'Maintenance coordination', 'Monthly owner statements'],
    icon: 'shield',
    cta: { label: 'Management enquiry', intent: 'management' },
  },
  {
    id: 'valuation',
    title: 'Valuation',
    summary: 'A written appraisal based on recent local evidence and the specifics of your property — not a headline number.',
    points: ['In-person or video appraisal', 'Sales & rental valuations', 'Written comparable evidence'],
    icon: 'chart',
    cta: { label: 'Book a valuation', intent: 'valuation' },
  },
  {
    id: 'investment',
    title: 'Investment Advisory',
    summary: 'Help building or reshaping a portfolio, from yield modelling to sourcing and long-term management.',
    points: ['Yield & cash-flow modelling', 'Off-market sourcing', 'Portfolio reviews'],
    icon: 'coins',
    cta: { label: 'Speak with an advisor', intent: 'advisor' },
  },
]

export const pillars: Array<{ title: string; body: string; icon: IconName }> = [
  {
    title: 'Local market knowledge',
    body: 'Our team lives and works in the neighbourhoods we sell. We know which streets hold their value, which buildings have issues, and what comparable homes actually achieved.',
    icon: 'compass',
  },
  {
    title: 'Strategic marketing',
    body: 'Every launch is planned: photography, film, floor plans and copy written for the property, then shared with registered buyers before it reaches the portals.',
    icon: 'megaphone',
  },
  {
    title: 'Personal guidance',
    body: 'One named advisor from valuation to completion, who answers the phone, explains the trade-offs and tells you what they’d do in your position.',
    icon: 'handshake',
  },
  {
    title: 'Property expertise',
    body: 'Sales, lettings and management under one roof means advice that considers the whole picture — including whether to sell, let, or hold.',
    icon: 'building',
  },
]

export const sellingSteps = [
  { title: 'Book a valuation', body: 'In person or by video, at a time that suits you.' },
  { title: 'Appraisal & advice', body: 'A written valuation with local evidence and a recommended asking strategy.' },
  { title: 'Considered launch', body: 'Photography, floor plans, film and a preview to registered buyers.' },
  { title: 'Viewings & offers', body: 'Accompanied viewings, feedback within 24 hours and every offer qualified.' },
  { title: 'Through to completion', body: 'A dedicated progressor working with solicitors until the keys are handed over.' },
]

export const managementServices: Array<{ title: string; body: string; icon: IconName }> = [
  { title: 'Tenant management', body: 'Marketing, referencing, right-to-rent checks, tenancy agreements and a single point of contact for your tenants.', icon: 'users' },
  { title: 'Maintenance coordination', body: 'Vetted local contractors, quotes approved by you, and a 24-hour line for emergencies.', icon: 'tools' },
  { title: 'Rent administration', body: 'Rent collection, arrears chasing and deposit registration with a government-approved scheme.', icon: 'coins' },
  { title: 'Property inspections', body: 'Scheduled visits with photographs and notes, plus detailed check-in and check-out inventories.', icon: 'clipboard' },
  { title: 'Reporting', body: 'Monthly statements, an annual summary for your accountant and an online owner portal.', icon: 'chart' },
]

export const managementTiers = [
  {
    name: 'Let Only',
    summary: 'We find and reference the right tenant; you manage the tenancy.',
    includes: ['Marketing & viewings', 'Referencing & right-to-rent', 'Tenancy agreement', 'Deposit registration'],
  },
  {
    name: 'Rent Collection',
    summary: 'Everything in Let Only, plus monthly rent administration.',
    includes: ['Everything in Let Only', 'Rent collection & arrears', 'Monthly statements', 'Annual rent review'],
  },
  {
    name: 'Fully Managed',
    summary: 'We look after the tenancy and the property on your behalf.',
    includes: ['Everything in Rent Collection', 'Maintenance & emergencies', 'Inspections & inventories', 'Compliance tracking'],
    recommended: true,
  },
]

export const insights: Insight[] = [
  {
    id: 'autumn-market',
    slug: 'autumn-market-what-we-are-seeing',
    category: 'Market Trends',
    title: 'The autumn market: what we’re seeing on the ground',
    excerpt: 'Well-priced family houses are still finding buyers quickly. Here’s what separates the homes that sell from those that sit.',
    readMinutes: 6,
    publishedAt: '2026-10-02',
    author: 'Eleanor Hollis',
    image: { scene: 'oldtown', tone: 'golden', alt: 'Illustration of Old Town rooftops in autumn light' },
  },
  {
    id: 'riverside-guide',
    slug: 'living-in-riverside-area-guide',
    category: 'Area Guide',
    title: 'Living in Riverside: towpaths, schools and the streets to know',
    excerpt: 'A local’s guide to the Wren’s two banks — from the boathouses to the quiet lanes behind the weir.',
    readMinutes: 8,
    publishedAt: '2026-09-24',
    author: 'Priya Raman',
    image: { scene: 'riverside', tone: 'golden', alt: 'Illustration of the riverbank at Riverside' },
  },
  {
    id: 'first-time-buyers',
    slug: 'first-time-buyers-guide',
    category: 'Buying Guide',
    title: 'A first-time buyer’s guide to Wrenfield',
    excerpt: 'Budgets, mortgages in principle, surveys and the questions to ask at a second viewing.',
    readMinutes: 9,
    publishedAt: '2026-09-15',
    author: 'James Okafor',
    image: { scene: 'apartment', tone: 'day', alt: 'Illustration of a modern apartment building' },
  },
  {
    id: 'preparing-to-sell',
    slug: 'preparing-your-home-for-sale',
    category: 'Selling Guide',
    title: 'Preparing your home for sale: what’s worth doing',
    excerpt: 'The small, inexpensive changes that make the biggest difference in photographs and on viewings.',
    readMinutes: 5,
    publishedAt: '2026-09-08',
    author: 'Eleanor Hollis',
    image: { scene: 'interior', tone: 'golden', view: 'garden', alt: 'Illustration of a calm, well-styled living room' },
  },
  {
    id: 'yield-vs-growth',
    slug: 'yield-versus-growth-investment',
    category: 'Investment',
    title: 'Yield or growth? Choosing the right rental property',
    excerpt: 'How landlords in different parts of the city weigh income against long-term value.',
    readMinutes: 7,
    publishedAt: '2026-08-29',
    author: 'Priya Raman',
    image: { scene: 'skyline', tone: 'day', alt: 'Illustration of the city skyline' },
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Eleanor told us plainly what our house was worth and why. The launch was beautifully done, and she called after every single viewing. We never felt left in the dark.',
    name: 'Catherine & Mark D.',
    context: 'Sold a family home in Riverside',
    service: 'Sold',
  },
  {
    id: 't2',
    quote:
      'We were relocating from abroad and bought largely on James’s advice and video walk-throughs. He pointed out the things we’d never have known to ask about.',
    name: 'Daniel R.',
    context: 'Bought an apartment in the City Centre',
    service: 'Bought',
  },
  {
    id: 't3',
    quote:
      'I own four flats and have used several agents over the years. This is the first time the statements arrive on time and maintenance is sorted without me chasing.',
    name: 'Helen W.',
    context: 'Landlord, fully managed portfolio',
    service: 'Landlord',
  },
  {
    id: 't4',
    quote: 'Referencing was quick, the flat was spotless on move-in day, and the one repair we needed was fixed within the week.',
    name: 'Sam & Leila K.',
    context: 'Rented in North District',
    service: 'Rented',
  },
]

export const faqs: Faq[] = [
  {
    question: 'How do I arrange a viewing?',
    answer:
      'Choose “Book a Viewing” on any property, call the office, or send us a message. We’ll confirm a time within one working day. Most viewings are accompanied by the listing advisor, and we can arrange evening, weekend or video viewings on request.',
  },
  {
    question: 'Can you help me sell my property?',
    answer:
      'Yes. We start with a free, no-obligation valuation — in person or by video — and a written marketing recommendation. If you instruct us, a named advisor manages the launch, viewings, negotiation and sale progression through to completion.',
  },
  {
    question: 'Do you manage rental properties?',
    answer:
      'We do. Landlords can choose Let Only, Rent Collection or Fully Managed. Fully Managed covers tenant management, maintenance coordination, rent administration, inspections, compliance tracking and monthly reporting.',
  },
  {
    question: 'How are properties valued?',
    answer:
      'We look at recent sales and lettings of comparable homes nearby, current competition on the market, the condition and specification of your property, and buyer demand we’re seeing in the area. You’ll receive the evidence alongside our figure.',
  },
  {
    question: 'What areas do you cover?',
    answer:
      'Wrenfield City Centre, Riverside, the Old Town, North District, Ashgrove and the surrounding suburbs, and the countryside and coast out to Saltmarsh Bay. If you’re just outside these areas, ask — we can usually help or recommend someone who can.',
  },
  {
    question: 'Can I receive property alerts?',
    answer:
      'Yes. Register your search and we’ll email you matching homes as soon as they’re instructed — often before they appear on the property portals. You can change or pause alerts at any time.',
  },
]
