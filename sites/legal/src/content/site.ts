import type { Faq, MatterType, Principle, Step, Testimonial } from './types'

export const hero = {
  eyebrow: 'Attorneys & Counselors · Eastbridge',
  title: 'Clear advice. Strong representation. Built around what matters.',
  body: 'Calder & Rowe advises businesses and individuals on the legal matters that shape what comes next. We take time to understand your goals, give you a candid view of your options, and represent you with care and conviction.',
  badge: 'Strategic Counsel · Trusted Representation',
  caption: 'Offices — Meridian Avenue',
}

export const proofPoints: Array<{ title: string; body: string; icon: Principle['icon'] }> = [
  { title: 'Experienced Counsel', body: 'Attorneys who lead your matter personally', icon: 'scale' },
  { title: 'Client-Focused Strategy', body: 'Advice shaped around your objectives', icon: 'compass' },
  { title: 'Business & Individual Representation', body: 'Companies, owners, families and individuals', icon: 'briefcase' },
  { title: 'Confidential Consultations', body: 'In person, by phone or by video', icon: 'lock' },
]

export const steps: Step[] = [
  {
    title: 'Initial Consultation',
    body: 'A confidential conversation about what has happened, what you need and what concerns you most.',
    detail: 'In person, by phone or video',
  },
  {
    title: 'Understand the Matter',
    body: 'We review the documents and facts, identify the key issues and explain your position in plain language.',
    detail: 'Clear scope and fee terms in writing',
  },
  {
    title: 'Build the Strategy',
    body: 'Together we weigh the options — their costs, timing and risks — and agree on a course of action that fits your goals.',
    detail: 'A defined plan and decision points',
  },
  {
    title: 'Move Forward',
    body: 'We carry out the plan, keep you informed at every stage and adjust thoughtfully as circumstances develop.',
    detail: 'Regular updates from your attorney',
  },
]

export const principles: Principle[] = [
  {
    title: 'Strategic thinking',
    body: 'We consider the legal question in the context of your wider objectives — commercial, financial and personal — before recommending a path.',
    icon: 'compass',
  },
  {
    title: 'Clear communication',
    body: 'Plain-language advice, realistic expectations and prompt responses. You will always know where your matter stands and what comes next.',
    icon: 'chat',
  },
  {
    title: 'Personal attention',
    body: 'Your matter is led by an attorney who knows it well and is accessible to you — not passed between people you have never met.',
    icon: 'person',
  },
  {
    title: 'Practical solutions',
    body: 'We look for outcomes that work in practice, weighing cost and time alongside legal merit, and tell you candidly when a fight is not worth it.',
    icon: 'key',
  },
]

/** Fictional demo testimonials — replace with genuine, permission-cleared client feedback that complies with applicable advertising rules. */
export const testimonials: Testimonial[] = [
  {
    quote: 'They explained our options clearly, were candid about the risks, and helped us reach a resolution that let us get back to running the business.',
    attribution: 'Owner, family business',
    context: 'Commercial dispute',
  },
  {
    quote: 'During a very difficult period, I always knew what was happening and why. That steadiness mattered as much as the advice itself.',
    attribution: 'Individual client',
    context: 'Family matter',
  },
  {
    quote: 'Thorough, responsive and practical. They understood what we were trying to achieve and structured the agreement around it.',
    attribution: 'Managing director, professional services firm',
    context: 'Commercial agreement',
  },
]

/** Illustrative matter types (no outcomes claimed). Replace with approved case studies. */
export const matterTypes: MatterType[] = [
  { practice: 'Business & Corporate', description: 'Structuring a partnership buy-out between founding shareholders' },
  { practice: 'Employment', description: 'Negotiating separation terms for a senior executive' },
  { practice: 'Real Estate', description: 'Commercial lease negotiations for a growing retail operator' },
  { practice: 'Litigation', description: 'Contract dispute between a supplier and a regional distributor' },
  { practice: 'Estate Planning', description: 'Succession planning for a second-generation family business' },
]

export const faqs: Faq[] = [
  {
    question: 'What happens during the initial consultation?',
    answer:
      'We listen to an overview of your situation, ask questions to understand the key facts and your goals, and outline the issues we see and the options that may be available. If it makes sense to work together, we explain the proposed scope and how fees would be structured. Consultations are confidential.',
  },
  {
    question: 'Do you offer remote consultations?',
    answer: 'Yes. Consultations are available in person at our offices, by phone or by secure video call — whichever is most convenient for you.',
  },
  {
    question: 'How are legal fees structured?',
    answer:
      'Fee arrangements depend on the type of matter. Depending on the work, we may offer hourly rates, fixed fees for defined tasks, or staged fees. We discuss fees openly at the outset and confirm them in a written engagement letter before any work begins.',
  },
  {
    question: 'What information should I bring?',
    answer:
      'A brief timeline of events, the names of the people or businesses involved, and any key documents — such as contracts, correspondence, court papers or notices. If you are unsure what is relevant, bring what you have and we will help you sort through it.',
  },
  {
    question: 'How long does a consultation take?',
    answer: 'Most initial consultations take between 30 and 60 minutes, depending on the complexity of the matter. We will confirm the expected length when we schedule your appointment.',
  },
  {
    question: 'Do you work with businesses and individuals?',
    answer:
      'Yes. We represent companies of different sizes, business owners, families and individuals. Many of our clients come to us for both business and personal matters.',
  },
]

export const contactMethods = ['Phone', 'Email', 'Video call'] as const
