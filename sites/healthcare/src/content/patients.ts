import type { FaqItem, InfoTopic, JourneyStep } from './types'

export const journeySteps: JourneyStep[] = [
  {
    number: '01',
    title: 'Choose a service',
    description: 'Browse our services or tell us what’s on your mind — we’ll help you find the right clinician.',
    icon: 'compass',
  },
  {
    number: '02',
    title: 'Book your appointment',
    description: 'Request a time online or by phone. In-person and virtual appointments are available.',
    icon: 'calendar',
  },
  {
    number: '03',
    title: 'Meet your care team',
    description: 'An unhurried first visit to understand your history, your concerns and your goals.',
    icon: 'chat',
  },
  {
    number: '04',
    title: 'Continue your care',
    description: 'Clear next steps, coordinated follow-ups and secure access to your results and records.',
    icon: 'heart',
  },
]

export const infoTopics: InfoTopic[] = [
  {
    id: 'what-to-bring',
    title: 'What to bring',
    summary: 'ID, insurance card, medication list and any recent results.',
    icon: 'clipboard',
    body: ['Bringing the right documents helps us make the most of your appointment time.'],
    bullets: [
      'A government-issued photo ID',
      'Your insurance card, if applicable',
      'A list of current medications, including supplements and doses',
      'Recent test results or letters from other clinicians',
      'Any questions you’d like to cover — writing them down helps',
    ],
  },
  {
    id: 'insurance-payments',
    title: 'Insurance & payments',
    summary: 'Plans we work with, self-pay options and how billing works.',
    icon: 'card',
    body: [
      'We work with a range of major insurance plans and also offer transparent self-pay pricing. Coverage varies by plan, so we recommend confirming your benefits with your insurer before your visit.',
      'Our front-desk team is happy to help you check eligibility. Payment is accepted by card at the time of your appointment.',
    ],
    bullets: ['Most major commercial plans (placeholder)', 'Self-pay rates available on request', 'Itemized receipts for reimbursement'],
  },
  {
    id: 'new-patients',
    title: 'New patients',
    summary: 'Registering is simple — here’s what happens before your first visit.',
    icon: 'user-plus',
    body: [
      'Once your appointment is confirmed, we’ll send a secure link to complete registration and a short health questionnaire. This lets your clinician review your history ahead of time.',
      'Please arrive around 10 minutes early for your first visit so we can confirm your details.',
    ],
  },
  {
    id: 'preparing',
    title: 'Preparing for your appointment',
    summary: 'Fasting, forms and practical tips for a smooth visit.',
    icon: 'calendar',
    body: [
      'Some tests require preparation such as fasting. If this applies to you, we’ll tell you in your confirmation message.',
      'If you need an interpreter, step-free access or any other adjustment, let us know when you book and we’ll arrange it.',
    ],
  },
  {
    id: 'faqs',
    title: 'Frequently asked questions',
    summary: 'Quick answers about booking, records, cancellations and more.',
    icon: 'chat',
    body: [],
    href: '#faq',
  },
  {
    id: 'telehealth',
    title: 'Telehealth information',
    summary: 'How virtual appointments work and what you’ll need.',
    icon: 'video',
    body: [
      'Many follow-ups, medication reviews and initial conversations can take place by secure video. You’ll receive a link by email or text shortly before your appointment — no app download is required.',
      'Join from a quiet, private space with a reliable connection. If a physical examination is needed, your clinician will arrange an in-person visit.',
    ],
  },
]

export const faqs: FaqItem[] = [
  {
    id: 'booking',
    question: 'How do I book an appointment?',
    answer:
      'You can request an appointment online using the “Book an Appointment” button, or call our front desk during opening hours. We’ll confirm your time by email or text.',
  },
  {
    id: 'new-patients',
    question: 'Do you accept new patients?',
    answer:
      'Yes. We are currently welcoming new patients across all services, and same-week appointments are often available for primary care.',
  },
  {
    id: 'virtual',
    question: 'Do you offer virtual appointments?',
    answer:
      'Yes. Many consultations and follow-ups can take place by secure video. When booking, choose “Virtual” and we’ll send you a link before your appointment.',
  },
  {
    id: 'bring',
    question: 'What should I bring?',
    answer:
      'Please bring photo ID, your insurance card if you have one, a list of your current medications and any recent test results or letters from other clinicians.',
  },
  {
    id: 'records',
    question: 'How do I access my records?',
    answer:
      'Registered patients can view results, letters and appointment history through our secure patient portal. You can also request a copy of your records from our front desk.',
  },
  {
    id: 'insurance',
    question: 'Which insurance plans do you accept?',
    answer:
      'We work with many major insurance plans and offer self-pay options. Because coverage varies, please contact us or your insurer to confirm before your visit.',
  },
  {
    id: 'reschedule',
    question: 'How do I cancel or reschedule?',
    answer:
      'Use the link in your confirmation message or call us. We kindly ask for at least 24 hours’ notice so we can offer the time to another patient.',
  },
]

/** Placeholder legal pages, opened as panels in the prototype. Future routes: /privacy, /accessibility, /terms */
export const legalPages: InfoTopic[] = [
  {
    id: 'privacy',
    title: 'Privacy policy',
    summary: '',
    icon: 'shield',
    body: [
      'This is placeholder text. A real clinic’s privacy notice explains how personal and health information is collected, used, stored and shared, and how patients can exercise their rights under applicable law (for example HIPAA or GDPR).',
    ],
  },
  {
    id: 'accessibility',
    title: 'Accessibility statement',
    summary: '',
    icon: 'person',
    body: [
      'This prototype is built to WCAG 2.2 AA principles: semantic structure, keyboard navigation, visible focus states, sufficient color contrast and support for reduced motion.',
      'A live site should include contact details for reporting accessibility barriers and information about physical access at the clinic.',
    ],
  },
  {
    id: 'terms',
    title: 'Terms of use',
    summary: '',
    icon: 'clipboard',
    body: ['This is placeholder text. Replace with the clinic’s website terms of use, reviewed by its legal advisors.'],
  },
]
