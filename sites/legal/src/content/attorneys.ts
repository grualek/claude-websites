import type { Attorney } from './types'

/** Fictional demo profiles. Replace names, portraits, credentials and admissions with verified details. */
export const attorneys: Attorney[] = [
  {
    slug: 'eleanor-calder',
    name: 'Eleanor Calder',
    role: 'Founding Partner',
    practices: ['Business & Corporate Law', 'Tax & Regulatory Advisory'],
    credentials: ['J.D., Eastbridge University School of Law', 'B.A., Economics'],
    admissions: ['State Bar (demo)', 'U.S. District Court (demo)'],
    bio: 'Advises owners, founders and boards on transactions, governance and the agreements that matter most to their businesses.',
    fullBio: [
      'Eleanor works with closely held companies, founders and boards on the decisions that shape a business — from formation and investment to acquisitions and eventual sale.',
      'Clients value her ability to separate what is legally significant from what is merely technical, and to explain both in plain terms. She works closely with clients’ accountants and financial advisors so legal, tax and commercial considerations are addressed together.',
    ],
    portrait: { scene: 'portrait', variant: 0, alt: 'Illustrated portrait of Eleanor Calder' },
    email: 'ecalder@calderrowe.example',
  },
  {
    slug: 'marcus-rowe',
    name: 'Marcus Rowe',
    role: 'Founding Partner',
    practices: ['Litigation & Disputes', 'Employment Law'],
    credentials: ['J.D., Northfield College of Law', 'B.A., Political Science'],
    admissions: ['State Bar (demo)', 'U.S. Court of Appeals (demo)'],
    bio: 'Represents businesses and individuals in commercial and employment disputes, with a focus on preparation and candid risk assessment.',
    fullBio: [
      'Marcus represents clients in contract, partnership and employment disputes — in negotiation, mediation, arbitration and court.',
      'His approach starts with a candid assessment of strengths, weaknesses and cost, so clients can decide how to proceed with a full picture. When a matter needs to be tried, he prepares it thoroughly and advocates firmly.',
    ],
    portrait: { scene: 'portrait', variant: 1, alt: 'Illustrated portrait of Marcus Rowe' },
    email: 'mrowe@calderrowe.example',
  },
  {
    slug: 'priya-anand',
    name: 'Priya Anand',
    role: 'Partner',
    practices: ['Family Law', 'Estate Planning'],
    credentials: ['J.D., Eastbridge University School of Law', 'Certificate in Family Mediation (demo)'],
    admissions: ['State Bar (demo)'],
    bio: 'Guides individuals and families through divorce, custody, prenuptial agreements and estate planning with discretion and care.',
    fullBio: [
      'Priya advises clients through some of the most personal decisions they will make — separation, parenting arrangements, and planning for the next generation.',
      'She is known for steady, discreet counsel and for helping clients focus on long-term outcomes. Where agreement is possible she pursues it; where it is not, she prepares carefully for court.',
    ],
    portrait: { scene: 'portrait', variant: 2, alt: 'Illustrated portrait of Priya Anand' },
    email: 'panand@calderrowe.example',
    languages: ['English', 'Hindi'],
  },
  {
    slug: 'daniel-okafor',
    name: 'Daniel Okafor',
    role: 'Senior Associate',
    practices: ['Real Estate Law', 'Immigration'],
    credentials: ['J.D., Westmere School of Law', 'B.S., Urban Planning'],
    admissions: ['State Bar (demo)'],
    bio: 'Handles commercial leasing, property transactions and employment-based immigration for companies and individuals.',
    fullBio: [
      'Daniel advises on commercial and residential property transactions, leasing and land use, and supports employers and individuals with employment-based immigration matters.',
      'He brings an organized, detail-first approach to deadline-driven work, and keeps clients informed at each stage of the process.',
    ],
    portrait: { scene: 'portrait', variant: 3, alt: 'Illustrated portrait of Daniel Okafor' },
    email: 'dokafor@calderrowe.example',
    languages: ['English', 'French'],
  },
]
