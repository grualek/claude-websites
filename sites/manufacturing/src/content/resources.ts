import type { Faq, Resource } from './types'

export const resources: Resource[] = [
  {
    slug: 'technical-guides',
    title: 'Technical Guides',
    icon: 'book',
    summary: 'Design-for-manufacture guidance for machined, fabricated and assembled parts.',
    items: [
      { title: 'Designing machined parts for cost and repeatability', format: 'Guide' },
      { title: 'Sheet-metal design: bend radii, reliefs and hardware', format: 'Guide' },
      { title: 'Specifying tolerances that match function', format: 'Article' },
    ],
  },
  {
    slug: 'product-documentation',
    title: 'Product Documentation',
    icon: 'doc',
    summary: 'Data sheets, drawings and specifications for our standard product families.',
    items: [
      { title: 'Industrial enclosure series — data sheet', format: 'PDF' },
      { title: 'Fixture plate system — specification', format: 'PDF' },
      { title: 'Standard hardware & finish options', format: 'PDF' },
    ],
  },
  {
    slug: 'certifications',
    title: 'Certifications',
    icon: 'badge',
    summary: 'Quality-system certificates and registrations. Demo placeholders — not actual certifications.',
    items: [
      { title: 'Quality management system certificate (placeholder)', format: 'Demo' },
      { title: 'Industry-specific registration (placeholder)', format: 'Demo' },
      { title: 'Supplier quality manual (placeholder)', format: 'Demo' },
    ],
  },
  {
    slug: 'material-information',
    title: 'Material Information',
    icon: 'material',
    summary: 'Material selection notes, finish compatibility and certification requirements.',
    items: [
      { title: 'Aluminum alloy selection overview', format: 'Guide' },
      { title: 'Stainless steel grades for processing equipment', format: 'Guide' },
      { title: 'Finish & coating compatibility chart', format: 'PDF' },
    ],
  },
  {
    slug: 'faqs',
    title: 'FAQs',
    icon: 'question',
    summary: 'Answers to common questions about quoting, files, lead times and quality.',
    items: [],
  },
  {
    slug: 'downloads',
    title: 'Downloads',
    icon: 'download',
    summary: 'Company brochure, line card, supplier forms and capability overviews.',
    items: [
      { title: 'Company brochure', format: 'PDF' },
      { title: 'Capabilities line card', format: 'PDF' },
      { title: 'New supplier information form', format: 'PDF' },
    ],
  },
]

export const faqs: Faq[] = [
  {
    question: 'What files should I include with an RFQ?',
    answer:
      'A 3D model (STEP or native CAD) and a 2D drawing with tolerances, material and finish callouts give us everything needed for an accurate quote. If you only have a sketch or a sample part, send it — our engineers can help develop the specification.',
  },
  {
    question: 'How quickly will I receive a quote?',
    answer:
      'Quote timing depends on part complexity and the number of line items. We confirm receipt promptly and tell you when to expect the quote; if anything is unclear, an engineer will contact you before quoting.',
  },
  {
    question: 'Do you handle prototype and production quantities?',
    answer:
      'Yes. We support one-off prototypes, pilot runs and recurring production, and we plan prototypes with production processes in mind so the transition is straightforward.',
  },
  {
    question: 'Can you sign an NDA before I share drawings?',
    answer: 'Yes. We routinely work under mutual non-disclosure agreements and can sign yours or provide ours before files are exchanged.',
  },
  {
    question: 'What documentation ships with my parts?',
    answer:
      'Standard shipments include a certificate of conformance and lot traceability. Inspection reports, material certifications and first article reports can be supplied to your requirements.',
  },
]
