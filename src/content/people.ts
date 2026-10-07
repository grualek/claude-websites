import type { Specialist, Testimonial } from './types'

/**
 * DEMO CONTENT — fictional clinicians for prototype purposes only.
 * Replace with real, verified practitioner profiles and portraits before launch.
 */
export const specialists: Specialist[] = [
  {
    id: 'elena-marsh',
    slug: 'dr-elena-marsh',
    name: 'Dr. Elena Marsh',
    title: 'Medical Director',
    specialty: 'Internal Medicine',
    credentials: 'MD · Board-certified, Internal Medicine',
    shortBio: 'Focuses on long-term relationships with patients and coordinating complex care across specialties.',
    bio: [
      'Dr. Marsh leads the clinical team and sees adult patients for primary and preventive care. She has a particular interest in helping patients manage several conditions at once.',
      'She believes good care starts with listening, and builds plans that fit the realities of each patient’s life.',
    ],
    focusAreas: ['Chronic condition management', 'Preventive medicine', 'Care coordination'],
    languages: ['English', 'Spanish'],
    portrait: { alt: 'Portrait of Dr. Elena Marsh (demo profile)' },
    tone: 'blue',
    isDemo: true,
  },
  {
    id: 'daniel-okoro',
    slug: 'dr-daniel-okoro',
    name: 'Dr. Daniel Okoro',
    title: 'Physician',
    specialty: 'Family Medicine',
    credentials: 'MD · Board-certified, Family Medicine',
    shortBio: 'Cares for patients and families at every life stage, with an emphasis on prevention and clear communication.',
    bio: [
      'Dr. Okoro provides comprehensive family medicine for adults and adolescents, from routine check-ups to new symptoms that need investigation.',
      'Patients describe his approach as calm and practical — he takes time to explain options in plain language.',
    ],
    focusAreas: ['Family medicine', "Men's health", 'Lifestyle medicine'],
    languages: ['English', 'French'],
    portrait: { alt: 'Portrait of Dr. Daniel Okoro (demo profile)' },
    tone: 'sage',
    isDemo: true,
  },
  {
    id: 'priya-castellan',
    slug: 'dr-priya-castellan',
    name: 'Dr. Priya Castellan',
    title: 'Consultant',
    specialty: "Women's Health",
    credentials: 'MD · Board-certified, Obstetrics & Gynecology',
    shortBio: "Provides gynecological and women's health care with a focus on informed, shared decision-making.",
    bio: [
      "Dr. Castellan sees patients for gynecological concerns, contraception, screening and menopause care.",
      'She works closely with primary care colleagues so that care remains joined-up and easy to navigate.',
    ],
    focusAreas: ['Gynecology', 'Menopause care', 'Preventive screening'],
    languages: ['English', 'Hindi'],
    portrait: { alt: 'Portrait of Dr. Priya Castellan (demo profile)' },
    tone: 'clay',
    isDemo: true,
  },
  {
    id: 'jonas-whitfield',
    slug: 'jonas-whitfield',
    name: 'Jonas Whitfield',
    title: 'Lead Physiotherapist',
    specialty: 'Physiotherapy',
    credentials: 'DPT · Licensed Physical Therapist',
    shortBio: 'Helps patients recover from injury and surgery, and return to the activities that matter to them.',
    bio: [
      'Jonas leads the physiotherapy team, treating musculoskeletal pain, sports injuries and post-operative recovery.',
      'His sessions combine hands-on treatment with clear, achievable exercise plans.',
    ],
    focusAreas: ['Musculoskeletal rehabilitation', 'Sports injuries', 'Post-operative recovery'],
    languages: ['English', 'German'],
    portrait: { alt: 'Portrait of Jonas Whitfield (demo profile)' },
    tone: 'sand',
    isDemo: true,
  },
]

/**
 * DEMO CONTENT — illustrative testimonials written for the prototype.
 * Real testimonials must be genuine, consented, and compliant with local advertising rules.
 */
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'I never felt rushed. The doctor took the time to explain my options and followed up exactly when she said she would.',
    author: 'Patient A.',
    context: 'Primary Care',
    isDemo: true,
  },
  {
    id: 't2',
    quote:
      'Booking was simple, the clinic was calm and welcoming, and my physiotherapist gave me a plan I could actually stick to.',
    author: 'Patient B.',
    context: 'Physiotherapy',
    isDemo: true,
  },
  {
    id: 't3',
    quote:
      'Having my tests and follow-up appointment in the same place made a stressful week much easier to manage.',
    author: 'Patient C.',
    context: 'Diagnostics',
    isDemo: true,
  },
]
