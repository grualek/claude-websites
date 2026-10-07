import type { Service, TrustPoint } from './types'

export const trustPoints: TrustPoint[] = [
  {
    title: 'Board-certified specialists',
    description: 'Physicians and clinicians credentialed in their fields.',
    icon: 'shield',
  },
  {
    title: 'Patient-centered care',
    description: 'Unhurried appointments and plans built with you.',
    icon: 'heart',
  },
  {
    title: 'Modern facilities',
    description: 'On-site diagnostics in a calm, accessible space.',
    icon: 'building',
  },
  {
    title: 'Convenient appointments',
    description: 'Early, late and virtual options.',
    icon: 'calendar',
  },
]

export const services: Service[] = [
  {
    id: 'primary-care',
    slug: 'primary-care',
    name: 'Primary Care',
    icon: 'stethoscope',
    summary: 'Ongoing care from a physician who knows your history — for everyday concerns, chronic conditions and everything in between.',
    description:
      'Your primary care physician is your first point of contact and the person who helps coordinate the rest of your care. Visits are scheduled with enough time to talk through symptoms, medications and questions.',
    includes: ['Annual physicals and check-ups', 'Management of long-term conditions', 'Same-week appointments for new concerns', 'Referrals and care coordination'],
    appointmentTypes: ['In-person', 'Virtual'],
  },
  {
    id: 'preventive-health',
    slug: 'preventive-health',
    name: 'Preventive Health',
    icon: 'shield',
    summary: 'Age-appropriate screenings, vaccinations and health reviews designed to catch concerns early.',
    description:
      'Preventive visits focus on staying well. Your clinician reviews your history and risk factors, then recommends screenings and vaccinations in line with current clinical guidelines.',
    includes: ['Personalized screening schedules', 'Adult vaccinations', 'Blood pressure and cholesterol checks', 'Lifestyle and risk-factor reviews'],
    appointmentTypes: ['In-person'],
  },
  {
    id: 'womens-health',
    slug: 'womens-health',
    name: "Women's Health",
    icon: 'heart',
    summary: 'Gynecological care, contraception, menopause support and routine screenings in a private, respectful setting.',
    description:
      "Our women's health clinicians provide care through every life stage, from routine screenings to support with hormonal changes, delivered with privacy and respect.",
    includes: ['Well-woman examinations', 'Cervical screening', 'Contraception counseling', 'Perimenopause and menopause care'],
    appointmentTypes: ['In-person', 'Virtual'],
  },
  {
    id: 'mens-health',
    slug: 'mens-health',
    name: "Men's Health",
    icon: 'person',
    summary: 'Straightforward conversations and checks covering heart health, hormones, urology and wellbeing.',
    description:
      "Men's health appointments create space for topics that are often put off. Clinicians focus on prevention, early detection and practical next steps.",
    includes: ['Cardiovascular risk assessments', 'Prostate health discussions', 'Hormone and metabolic checks', 'Mental wellbeing support'],
    appointmentTypes: ['In-person', 'Virtual'],
  },
  {
    id: 'diagnostics',
    slug: 'diagnostics',
    name: 'Diagnostics',
    icon: 'microscope',
    summary: 'On-site blood tests, ECGs and imaging referrals, with results explained clearly by your care team.',
    description:
      'Having diagnostics under the same roof means fewer trips and faster coordination. Your clinician reviews results with you and explains what they mean for your care.',
    includes: ['Blood and urine testing', 'Electrocardiograms (ECG)', 'Imaging referrals', 'Results reviewed with a clinician'],
    appointmentTypes: ['In-person'],
  },
  {
    id: 'specialist-consultations',
    slug: 'specialist-consultations',
    name: 'Specialist Consultations',
    icon: 'compass',
    summary: 'Access to specialist opinions in cardiology, dermatology, endocrinology and more — coordinated with your primary physician.',
    description:
      'When you need a specialist view, we arrange it in-house where possible and share notes with your primary physician, so your care stays connected.',
    includes: ['Cardiology', 'Dermatology', 'Endocrinology', 'Second opinions'],
    appointmentTypes: ['In-person', 'Virtual'],
  },
  {
    id: 'physiotherapy',
    slug: 'physiotherapy',
    name: 'Physiotherapy',
    icon: 'movement',
    summary: 'Assessment and treatment for pain, injury and mobility, with exercise plans tailored to your goals.',
    description:
      'Physiotherapists assess how you move, identify contributing factors and work with you on a treatment plan that may include hands-on therapy and guided exercise.',
    includes: ['Musculoskeletal assessment', 'Post-operative rehabilitation', 'Sports and activity injuries', 'Home exercise programs'],
    appointmentTypes: ['In-person', 'Virtual'],
  },
  {
    id: 'wellness-programs',
    slug: 'wellness-programs',
    name: 'Wellness & Preventive Programs',
    icon: 'leaf',
    summary: 'Structured programs for nutrition, sleep, stress and healthy aging, guided by clinicians.',
    description:
      'Multi-session programs combine clinical assessment with practical coaching. They are designed to complement, not replace, the care you receive from your physician.',
    includes: ['Nutrition consultations', 'Sleep and stress support', 'Healthy aging reviews', 'Progress check-ins'],
    appointmentTypes: ['In-person', 'Virtual'],
  },
]
