import type { PracticeArea } from './types'

export const practiceAreas: PracticeArea[] = [
  {
    slug: 'business-corporate-law',
    title: 'Business & Corporate Law',
    summary: 'Formation, governance, commercial agreements and transactions for owners, founders and boards.',
    overview:
      'We advise businesses at every stage — from choosing the right structure to negotiating the agreements that carry real commercial risk. Our focus is practical: documents that reflect how your business actually operates, and advice that weighs legal exposure against commercial reality.',
    services: ['Entity formation & restructuring', 'Commercial contracts & vendor agreements', 'Shareholder & operating agreements', 'Mergers, acquisitions & sales of business', 'Corporate governance & compliance'],
    situations: ['Starting or restructuring a company', 'Reviewing a significant commercial agreement', 'Bringing in investors or partners', 'Buying or selling a business'],
    matterLabel: 'Business & corporate',
  },
  {
    slug: 'employment-law',
    title: 'Employment Law',
    summary: 'Guidance for employers and employees on contracts, workplace disputes, separations and policy.',
    overview:
      'Employment matters are rarely only legal — they involve people, reputations and livelihoods. We represent both employers and individuals, helping them understand their position early and resolve issues before they escalate where that is possible.',
    services: ['Employment agreements & executive contracts', 'Separation & severance negotiations', 'Workplace investigations', 'Discrimination & retaliation claims', 'Handbooks, policies & compliance'],
    situations: ['Facing or managing a termination', 'Reviewing a severance offer', 'Responding to a workplace complaint', 'Drafting executive or restrictive covenants'],
    matterLabel: 'Employment',
  },
  {
    slug: 'real-estate-law',
    title: 'Real Estate Law',
    summary: 'Commercial and residential transactions, leasing, development and property disputes.',
    overview:
      'Property is often the largest asset a business or family holds. We guide clients through acquisitions, leases and development matters with careful diligence and clear explanations of what each clause means for you.',
    services: ['Commercial purchases & sales', 'Commercial leasing (landlord & tenant)', 'Residential closings', 'Zoning & land use', 'Title, boundary & property disputes'],
    situations: ['Negotiating a commercial lease', 'Purchasing investment property', 'Resolving a title or boundary issue', 'Planning a development project'],
    matterLabel: 'Real estate',
  },
  {
    slug: 'family-law',
    title: 'Family Law',
    summary: 'Discreet, steady counsel through divorce, custody, support and family agreements.',
    overview:
      'Family matters call for both strength and discretion. We help clients make clear-headed decisions during difficult transitions, prioritizing children, privacy and long-term stability — and preparing thoroughly for court when agreement is not possible.',
    services: ['Divorce & legal separation', 'Child custody & parenting plans', 'Child & spousal support', 'Prenuptial & postnuptial agreements', 'Mediation & collaborative approaches'],
    situations: ['Considering separation or divorce', 'Modifying a custody or support order', 'Planning a prenuptial agreement', 'Protecting assets during a transition'],
    matterLabel: 'Family',
  },
  {
    slug: 'estate-planning',
    title: 'Estate Planning',
    summary: 'Wills, trusts and succession plans that protect the people and businesses you care about.',
    overview:
      'Good planning brings clarity to difficult questions. We prepare wills, trusts and powers of attorney tailored to your family and assets, and coordinate with your financial advisors so the plan works as intended.',
    services: ['Wills & revocable trusts', 'Powers of attorney & healthcare directives', 'Business succession planning', 'Probate & trust administration', 'Charitable & legacy planning'],
    situations: ['Creating or updating a will', 'Planning business succession', 'Administering a loved one’s estate', 'Planning for a family member’s care'],
    matterLabel: 'Estate planning',
  },
  {
    slug: 'litigation',
    title: 'Litigation & Disputes',
    summary: 'Measured, well-prepared representation in commercial and civil disputes — in and out of court.',
    overview:
      'Not every dispute should go to trial, but every dispute should be prepared as if it might. We assess risk candidly, pursue early resolution where it serves you, and advocate firmly when a matter needs to be decided by a court or arbitrator.',
    services: ['Commercial & contract disputes', 'Partnership & shareholder disputes', 'Mediation & arbitration', 'Pre-litigation strategy & demand letters', 'Appeals support'],
    situations: ['Receiving a demand letter or lawsuit', 'A partner or counterparty in breach', 'Evaluating whether to file a claim', 'Preparing for mediation'],
    matterLabel: 'Litigation or dispute',
  },
  {
    slug: 'immigration',
    title: 'Immigration',
    summary: 'Employment-based and family immigration counsel for individuals and the companies that sponsor them.',
    overview:
      'Immigration processes are detailed and deadline-driven. We help employers and individuals understand their options, prepare complete applications and plan ahead for each stage of the process.',
    services: ['Employment-based visas', 'Permanent residence', 'Family-based petitions', 'Employer compliance (I-9)', 'Naturalization'],
    situations: ['Sponsoring an employee', 'Planning a path to permanent residence', 'Bringing family members to the U.S.', 'Reviewing employer compliance'],
    matterLabel: 'Immigration',
  },
  {
    slug: 'tax-regulatory-advisory',
    title: 'Tax & Regulatory Advisory',
    summary: 'Clear guidance on tax structure, regulatory obligations and government inquiries.',
    overview:
      'Tax and regulatory questions often sit beneath major business and personal decisions. We work alongside your accountants to structure transactions thoughtfully and respond to agency inquiries with care.',
    services: ['Transaction tax structuring', 'Regulatory compliance reviews', 'Licensing & permits', 'Responding to agency inquiries', 'Coordination with CPAs & advisors'],
    situations: ['Structuring a transaction', 'Receiving an agency notice', 'Entering a regulated industry', 'Reviewing compliance obligations'],
    matterLabel: 'Tax or regulatory',
  },
]

export const featuredPractice = {
  practiceSlug: 'business-corporate-law',
  eyebrow: 'Featured Practice — Business & Corporate',
  title: 'Complex matters require clear thinking.',
  body: [
    'Growing companies face decisions where the legal detail and the commercial stakes are tightly linked. We help owners and leadership teams see both clearly — and act with confidence.',
    'Whether you are negotiating a critical agreement, bringing in partners or preparing for a sale, we translate complexity into a defined set of choices, risks and next steps.',
  ],
  capabilities: [
    { title: 'Transactions & agreements', body: 'Drafting and negotiating the contracts that define your relationships with customers, vendors and partners.' },
    { title: 'Ownership & governance', body: 'Operating agreements, shareholder arrangements and board matters that hold up when circumstances change.' },
    { title: 'Growth & exit planning', body: 'Investment, acquisition and sale processes, structured with tax and succession considerations in view.' },
  ],
}
