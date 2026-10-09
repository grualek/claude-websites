import type { Educator, StudentStory } from './types'

/** Fictional educator profiles (demo). Each becomes a faculty page at /faculty/{slug}/. */
export const educators: Educator[] = [
  {
    slug: 'amara-okafor',
    name: 'Dr Amara Okafor',
    title: 'Senior Lecturer & Program Lead',
    department: 'School of Computing',
    expertise: ['Human–computer interaction', 'Accessible design', 'Participatory research'],
    bio: 'Amara leads Applied Computing and researches how communities can shape the technology built for them.',
    longBio: [
      'Amara spent eight years designing digital public services before moving into teaching. Her research looks at participatory design methods and how they can make technology more accessible.',
      'She leads the Applied Computing degree and supervises final-year projects with community partners.',
    ],
    teaches: ['Human-Centred Design', 'Software Engineering Studio'],
    portrait: { skin: '#7a4a33', hair: '#1c1714', hairStyle: 'curly', top: '#34557c', backdrop: '#dfe7d9', glasses: true },
  },
  {
    slug: 'daniel-reyes-whitfield',
    name: 'Prof. Daniel Reyes-Whitfield',
    title: 'Professor of Environmental Science',
    department: 'School of Science & Environment',
    expertise: ['Urban ecology', 'Climate adaptation', 'River restoration'],
    bio: 'Daniel takes students into the field from week one and runs our long-term river monitoring project.',
    longBio: [
      'Daniel’s research focuses on how cities can adapt to a changing climate through green infrastructure and river restoration.',
      'He has led the college’s river monitoring project since it began, with data collected by every year of students.',
    ],
    teaches: ['Ecology in Practice', 'Climate & Society'],
    portrait: { skin: '#c99a76', hair: '#5b5048', hairStyle: 'short', top: '#3c6150', backdrop: '#dde5ee', beard: true },
  },
  {
    slug: 'mei-lindqvist',
    name: 'Dr Mei Lindqvist',
    title: 'Associate Professor',
    department: 'School of Business & Enterprise',
    expertise: ['Social enterprise', 'Organisational behaviour', 'Entrepreneurship education'],
    bio: 'Mei runs the Venture Studio, where student teams build and test enterprises with real customers.',
    longBio: [
      'Before academia, Mei co-founded a social enterprise working in community energy. She now studies how organisations balance purpose and growth.',
      'She runs the Venture Studio and mentors student founders.',
    ],
    teaches: ['Social Innovation', 'Venture Studio'],
    portrait: { skin: '#e2b996', hair: '#231c1a', hairStyle: 'bun', top: '#e9b949', backdrop: '#ebeff3' },
  },
  {
    slug: 'tomasz-kowalczyk',
    name: 'Tomasz Kowalczyk',
    title: 'Director of Professional Education',
    department: 'Professional & Executive Education',
    expertise: ['Project leadership', 'Change management', 'Coaching'],
    bio: 'Tomasz designs our part-time and executive programs so they fit around demanding jobs.',
    longBio: [
      'Tomasz led major transformation projects in transport and healthcare before joining Larkmoor. He is an accredited coach [[confirm accreditation]].',
      'He directs the professional and executive education portfolio.',
    ],
    teaches: ['Leading Teams', 'Leading Through Change'],
    portrait: { skin: '#ecc9a9', hair: '#9b7b5a', hairStyle: 'cropped', top: '#14213a', backdrop: '#f6e6b8', glasses: true },
  },
]

/** Fictional student stories (demo content — replace with consented, real stories). */
export const stories: StudentStory[] = [
  {
    slug: 'priya-applied-computing',
    name: 'Priya N.',
    program: 'BSc (Hons) Applied Computing',
    stage: 'Final-year student',
    headline: 'Building for people, not just for marks',
    quote: 'I came in thinking I’d learn to code. I’m leaving knowing how to build things people actually want to use.',
    story: [
      'In her second year, Priya’s studio team worked with a local food bank to redesign how volunteers book shifts. “It was the first time something I made was used by people I’d never met,” she says.',
      'She spent her placement year at a small product studio and is now writing her final-year project on accessible booking systems.',
    ],
    image: { scene: 'collaboration', mood: 'morning', alt: 'Student team mapping an app’s user journey on a wall of sticky notes' },
    portrait: { skin: '#9a6a4c', hair: '#1b1615', hairStyle: 'long', top: '#e9b949', backdrop: '#dde5ee' },
  },
  {
    slug: 'marcus-digital-marketing',
    name: 'Marcus T.',
    program: 'Online Diploma in Digital Marketing',
    stage: 'Part-time online learner',
    headline: 'Studying online around family and work',
    quote: 'The live clinics made it feel like a real class — even when I was logging in after the kids were in bed.',
    story: [
      'Marcus wanted to move from retail management into marketing but couldn’t stop working to study. The online diploma let him learn in short evening sessions.',
      'His final campaign project was for his partner’s small bakery.',
    ],
    image: { scene: 'digital', mood: 'evening', alt: 'Adult learner studying online in the evening at home', align: 'right' },
    portrait: { skin: '#5e3b2a', hair: '#141110', hairStyle: 'cropped', top: '#3c6150', backdrop: '#f6e6b8', beard: true },
  },
  {
    slug: 'lucia-data-science',
    name: 'Lucía G.',
    program: 'MSc Data Science & Society',
    stage: 'Postgraduate student',
    headline: 'From history graduate to data storyteller',
    quote: 'Nobody assumed I already knew statistics. They assumed I could learn it — and I did.',
    story: [
      'Lucía studied history before joining the MSc. She started with Academic English in the summer, then moved into the master’s in September.',
      'Her capstone project with a regional museum used visitor data to rethink how exhibitions are planned.',
    ],
    image: { scene: 'library', mood: 'day', alt: 'Postgraduate student working with notes and a laptop in the library', align: 'left' },
    portrait: { skin: '#d6a67f', hair: '#3b2418', hairStyle: 'wavy', top: '#34557c', backdrop: '#dfe7d9' },
  },
]
