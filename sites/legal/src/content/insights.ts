import type { Insight } from './types'

/** Demo articles. In production these come from the CMS and render at /insights/{slug}/. */
export const insights: Insight[] = [
  {
    slug: 'before-signing-a-commercial-agreement',
    category: 'Business',
    date: '2026-09-22',
    title: 'What businesses should know before signing a commercial agreement',
    summary: 'The clauses that most often cause problems later — and the questions worth asking before you commit.',
    readingMinutes: 6,
    author: 'Eleanor Calder',
    body: [
      'Commercial agreements are usually negotiated under time pressure, with attention focused on price and scope. The provisions that cause the most difficulty later tend to sit further down the page.',
      'Start with termination. Understand how and when either party can exit, what notice is required and what happens to work in progress, payments and data on the way out.',
      'Next, read the limitation of liability and indemnity clauses together. They determine who bears the cost if something goes wrong — and caps or exclusions that look standard can leave meaningful risk with you.',
      'Finally, check whether the agreement reflects how the relationship will actually work. Service levels, approval processes and change mechanisms that do not match reality are a common source of disputes.',
      'This article is general information, not legal advice. If you are reviewing a specific agreement, an early conversation with counsel is usually far less costly than resolving a dispute later.',
    ],
    image: { scene: 'window', alt: '' },
  },
  {
    slug: 'options-in-an-employment-dispute',
    category: 'Employment',
    date: '2026-09-08',
    title: 'Understanding your options when facing an employment dispute',
    summary: 'From internal processes to negotiated resolutions, a calm overview of the paths available to employees and employers.',
    readingMinutes: 5,
    author: 'Marcus Rowe',
    body: [
      'Employment disputes can feel urgent and personal. Taking a structured view of your options early helps you protect your position and make decisions you will be comfortable with later.',
      'Many disputes begin with an internal process — a grievance, an investigation or a performance procedure. How you engage with that process, and what you put in writing, can matter later.',
      'Some deadlines in employment matters are short. If you believe you may have a claim, or that a claim may be brought against your organization, it is sensible to seek advice promptly.',
      'Negotiated outcomes, including separation agreements, are common. Understanding what you may be asked to give up — and what is customary — puts you in a better position to negotiate.',
      'This article is general information, not legal advice, and the law varies by jurisdiction.',
    ],
    image: { scene: 'stair', alt: '' },
  },
  {
    slug: 'questions-before-beginning-a-legal-matter',
    category: 'Guidance',
    date: '2026-08-19',
    title: 'Questions to ask before beginning a legal matter',
    summary: 'How to prepare for a first consultation, and what to ask so you understand scope, fees and next steps.',
    readingMinutes: 4,
    author: 'Priya Anand',
    body: [
      'A first consultation is an opportunity for both sides to understand whether, and how, to work together. A little preparation makes it far more useful.',
      'Bring a short written timeline of events and any key documents. You do not need to have everything organized — but having the essentials will help your attorney give you a clearer early view.',
      'Ask how the matter is likely to unfold, what the main decision points are, and how fees will be structured at each stage. Ask who will be working on your matter and how you will receive updates.',
      'Finally, ask what you should and should not do in the meantime. Sometimes the most valuable advice in a first meeting is what to avoid.',
      'This article is general information, not legal advice.',
    ],
    image: { scene: 'arch', alt: '' },
  },
]
