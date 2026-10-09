import type { Article, CampusEvent, Faq, MediaAsset, Pillar, Resource, Space, Step } from './types'

/** Page copy. Demo content — swap per institution. */

export const hero = {
  eyebrow: 'Applications open for [[2027]] entry',
  title: { lead: 'Education designed for', emphasis: 'what comes next.' },
  body: 'At Larkmoor, you build knowledge, confidence and practical skills side by side — in studios, labs and workshops, with educators who know your name and partners who bring real problems to solve.',
  images: {
    main: { scene: 'campus', mood: 'morning', alt: 'Students walking across the college courtyard toward the main library building on a bright morning' } satisfies MediaAsset,
    inset: { scene: 'workshop', mood: 'day', alt: 'Student shaping a prototype in the workshop', align: 'left' } satisfies MediaAsset,
  },
  openDay: { label: 'Next open day', date: '[[Saturday 14 November]]', note: 'Tours, taster sessions and talks with tutors' },
  quickLinks: [
    { label: 'Undergraduate', category: 'Undergraduate' as const },
    { label: 'Postgraduate', category: 'Postgraduate' as const },
    { label: 'Professional', category: 'Professional' as const },
    { label: 'Online', category: 'Online' as const },
  ],
}

/** Ticker of subject areas under the hero */
export const subjects = ['Computing', 'Design', 'Environmental Science', 'Business', 'Engineering', 'Education', 'Data Science', 'Leadership', 'Languages', 'Digital Media']

export const about = {
  title: 'A college built around how people really learn.',
  intro:
    'Since 1968, Larkmoor has grown from a small technical institute into a college of 6,000 learners — school-leavers, career-changers, professionals and online students — without losing the small-group teaching we started with.',
}

export const pillars: Pillar[] = [
  {
    icon: 'mentor',
    title: 'Expert educators',
    body: 'Learn from researchers and practitioners who still work in their fields — and who teach in small groups where questions are welcome.',
  },
  {
    icon: 'tools',
    title: 'Practical learning',
    body: 'Studios, labs, fieldwork and live briefs from the first term, so theory always has somewhere to land.',
  },
  {
    icon: 'people',
    title: 'Supportive community',
    body: 'A personal tutor, peer mentors and wellbeing, careers and study-skills teams who are easy to reach.',
  },
  {
    icon: 'compass',
    title: 'Future-focused curriculum',
    body: 'Programs reviewed every year with partners and students, so what you learn reflects how fields are changing.',
  },
]

export const spaces: Space[] = [
  {
    slug: 'classrooms',
    title: 'Classrooms & seminars',
    body: 'Seminar rooms for 12–30, designed for discussion rather than dictation.',
    image: { scene: 'seminar', mood: 'day', alt: 'Seminar room with students in discussion around a large table' },
  },
  {
    slug: 'labs',
    title: 'Science labs',
    body: 'Teaching and research labs for environmental, chemical and life sciences.',
    image: { scene: 'lab', mood: 'day', alt: 'Students at a lab bench with microscopes and sample bottles' },
  },
  {
    slug: 'workshops',
    title: 'Workshops & maker space',
    body: 'Wood, metal, electronics and digital fabrication, with technicians on hand.',
    image: { scene: 'workshop', mood: 'morning', alt: 'Maker space with tools on a pegboard and a student at a workbench' },
  },
  {
    slug: 'digital-learning',
    title: 'Digital learning',
    body: 'A virtual campus with live classes, recordings and tutor support.',
    image: { scene: 'digital', mood: 'day', alt: 'Laptop showing a live online class with several participants' },
  },
  {
    slug: 'collaboration',
    title: 'Student collaboration',
    body: 'Bookable project rooms and open studios for teamwork.',
    image: { scene: 'collaboration', mood: 'evening', alt: 'Student team planning a project on a whiteboard wall' },
  },
]

export const steps: Step[] = [
  {
    title: 'Explore Programs',
    body: 'Browse programs, compare formats and download a program guide. Not sure yet? Talk it through with an adviser.',
    action: 'Browse programs',
    href: '#programs',
  },
  {
    title: 'Submit Your Application',
    body: 'Apply online in around 30 minutes. Save as you go and upload documents whenever you’re ready.',
    action: 'Start an application',
    intent: 'apply',
  },
  {
    title: 'Meet With Admissions',
    body: 'Some programs include an informal conversation or portfolio review. It’s a chance for you to ask questions too.',
    action: 'Talk to admissions',
    intent: 'talk',
  },
  {
    title: 'Start Your Journey',
    body: 'Accept your offer, join pre-arrival sessions and meet your cohort at Welcome Week — on campus or online.',
    action: 'Book a visit',
    intent: 'visit',
  },
]

export const keyDates = [
  { label: 'Applications open', value: '[[1 October 2026]]' },
  { label: 'Main undergraduate deadline', value: '[[31 January 2027]]' },
  { label: 'Postgraduate applications', value: '[[Rolling — apply early]]' },
  { label: 'Welcome Week', value: '[[September 2027]]' },
]

export const studentLife: { slug: string; title: string; body: string; image: MediaAsset }[] = [
  { slug: 'campus', title: 'Campus', body: 'A walkable, green campus ten minutes from the city centre.', image: { scene: 'quad', mood: 'day', alt: 'Students relaxing on the lawn of the main quad between classes' } },
  { slug: 'clubs', title: 'Student clubs', body: 'More than 80 clubs and societies, from robotics to choir.', image: { scene: 'clubs', mood: 'evening', alt: 'Student band rehearsing in a music room' } },
  { slug: 'events', title: 'Events', body: 'Talks, festivals, exhibitions and a lively Welcome Week.', image: { scene: 'event', mood: 'evening', alt: 'Audience watching a speaker on stage at a campus event' } },
  { slug: 'community', title: 'Community', body: 'Volunteering and partnerships across Millbrook.', image: { scene: 'community', mood: 'morning', alt: 'Students volunteering at a community garden' } },
  { slug: 'projects', title: 'Projects', body: 'Hackathons, exhibitions and research you can join.', image: { scene: 'projects', mood: 'day', alt: 'Students testing a small robot they built' } },
  { slug: 'activities', title: 'Activities', body: 'Sport, outdoors and wellbeing for every level.', image: { scene: 'activities', mood: 'morning', alt: 'Students running on the campus sports field' } },
]

export const outcomes: Pillar[] = [
  { icon: 'spark', title: 'Skills', body: 'Technical, creative and professional skills practised in every module — communication, teamwork and problem-solving included.' },
  { icon: 'layers', title: 'Projects', body: 'A portfolio of real work: studio briefs, field studies, ventures and a final project you choose.' },
  { icon: 'mentor', title: 'Mentorship', body: 'A personal tutor throughout, plus optional mentoring from alumni and partner professionals.' },
  { icon: 'briefcase', title: 'Industry exposure', body: 'Guest practitioners, site visits, live briefs and optional placements, depending on your program.' },
  { icon: 'people', title: 'Community', body: 'Peers, educators and alumni you can keep learning with long after graduation.' },
]

export const outcomesImage: MediaAsset = { scene: 'projects', mood: 'evening', alt: 'Students presenting a project at an end-of-year showcase' }

export const resources: Resource[] = [
  { slug: 'prospectus', title: 'Download prospectus', body: 'Every program, our campus and student life in one guide.', icon: 'download', meta: 'PDF · [[2027 edition]]', action: 'Get the prospectus', intent: 'prospectus' },
  { slug: 'program-guides', title: 'Program guides', body: 'Module-by-module detail, teaching hours and assessment.', icon: 'book', meta: '14 guides', action: 'Browse guides', href: '#programs' },
  { slug: 'admissions-guide', title: 'Admissions guide', body: 'How to apply, what we look for and key dates.', icon: 'compass', meta: 'Step by step', action: 'Read the guide', href: '#admissions' },
  { slug: 'faqs', title: 'FAQs', body: 'Quick answers about applying, visiting and studying.', icon: 'help', meta: '7 questions', action: 'See FAQs', href: '#faq' },
  { slug: 'student-handbook', title: 'Student handbook', body: 'Policies, support services and everyday essentials.', icon: 'file', meta: '[[2026–27]]', action: 'View handbook', intent: 'info' },
  { slug: 'events', title: 'Events', body: 'Open days, online info sessions and applicant workshops.', icon: 'ticket', meta: '3 upcoming', action: 'See events', href: '#news' },
  { slug: 'blog', title: 'Blog', body: 'Guides, campus news and stories from our community.', icon: 'news', meta: 'Updated weekly', action: 'Read the blog', href: '#news' },
]

export const events: CampusEvent[] = [
  {
    slug: 'open-day-november',
    title: 'Undergraduate Open Day',
    date: '2026-11-14',
    time: '10:00 – 15:00',
    location: 'Main campus',
    format: 'On campus',
    summary: 'Campus tours, taster lectures and conversations with tutors and current students.',
    audience: 'Prospective undergraduates & families',
  },
  {
    slug: 'postgraduate-online-info-session',
    title: 'Postgraduate Online Info Session',
    date: '2026-10-28',
    time: '18:00 – 19:00',
    location: 'Online',
    format: 'Online',
    summary: 'Meet program leads, hear about funding options and ask questions live.',
    audience: 'Prospective postgraduates',
  },
  {
    slug: 'portfolio-workshop',
    title: 'Portfolio & Personal Statement Workshop',
    date: '2026-12-03',
    time: '16:30 – 18:00',
    location: 'Design Studios',
    format: 'On campus',
    summary: 'Practical advice from admissions tutors on presenting your work and experience.',
    audience: 'Applicants',
  },
]

export const articles: Article[] = [
  {
    slug: 'new-maker-space-opens',
    title: 'A new maker space opens on the east campus',
    category: 'Campus',
    date: '2026-09-22',
    readTime: '3 min read',
    summary: 'Laser cutters, electronics benches and a wood shop — open to every student, not just engineers.',
    body: [
      'The new maker space brings digital fabrication, electronics and woodworking under one roof, with technicians on hand throughout the day.',
      'Inductions run every week of term and are open to students from any program.',
    ],
    image: { scene: 'workshop', mood: 'evening', alt: 'The new maker space with workbenches and tools', align: 'right' },
    author: 'Larkmoor News',
  },
  {
    slug: 'full-time-or-part-time-study',
    title: 'Full-time, part-time or online: how to choose',
    category: 'Guide',
    date: '2026-09-08',
    readTime: '6 min read',
    summary: 'A practical guide to weighing time, cost, support and learning style before you apply.',
    body: [
      'Choosing how to study is as important as choosing what to study. Start by being honest about the time you can give each week, then look at how each format supports you.',
      'Talk to an admissions adviser if you are unsure — many programs offer more than one route.',
    ],
    image: { scene: 'library', mood: 'morning', alt: 'Quiet corner of the library with a student reading' },
    author: 'Admissions Team',
  },
  {
    slug: 'river-survey-shared-with-council',
    title: 'Student river survey shared with Millbrook council',
    category: 'Research',
    date: '2026-08-27',
    readTime: '4 min read',
    summary: 'Ten years of student-collected data on the River Lark is informing local restoration plans.',
    body: [
      'Environmental Science students have monitored the River Lark every term for a decade. This year the dataset was shared with the local council’s restoration team.',
    ],
    image: { scene: 'field', mood: 'morning', alt: 'Students taking water samples from a river' },
    author: 'School of Science & Environment',
  },
]

export const faqs: Faq[] = [
  {
    question: 'How do I apply?',
    answer:
      'Choose your program, then select Apply Now to start an online application. You can save your progress and return at any time. Most applications take around 30 minutes; some creative programs also ask for a portfolio.',
  },
  {
    question: 'When are applications open?',
    answer:
      'Undergraduate applications for [[2027]] entry open on [[1 October 2026]], with a main deadline of [[31 January 2027]]. Postgraduate, professional and online programs accept applications on a rolling basis until places are filled.',
  },
  {
    question: 'Can I visit the campus?',
    answer:
      'Yes. Join an open day, book a weekday campus tour or arrange a one-to-one visit with a program team. We also run virtual tours if you can’t travel.',
  },
  {
    question: 'Are online programs available?',
    answer:
      'Yes. We offer fully online certificates and diplomas, an online master’s, and blended programs that combine online study with occasional on-campus workshops.',
  },
  {
    question: 'What are the entry requirements?',
    answer:
      'Requirements vary by program and are listed on each program page. [[Typical undergraduate offers and English-language requirements to be confirmed.]] We consider each application individually, including relevant experience.',
  },
  {
    question: 'How do I contact admissions?',
    answer: 'Call or email the admissions team, use the contact form below, or book a call at a time that suits you. We aim to reply within [[two working days]].',
  },
  {
    question: 'Are scholarships available?',
    answer:
      'A range of scholarships, bursaries and fee-support options is available, depending on your program and circumstances. [[Eligibility, values and deadlines to be confirmed each year.]] Ask admissions which options may apply to you.',
  },
]

export const admissionsCta = {
  title: 'Ready to take the next step?',
  body: 'Start your application today, or talk it through with our admissions team first. There’s no such thing as a silly question.',
  image: { scene: 'quad', mood: 'evening', alt: 'The college quad in early evening light', align: 'right' } satisfies MediaAsset,
}
