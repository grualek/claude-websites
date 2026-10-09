import type { EnquiryIntent, IconName } from '../content/types'

/** Copy for each secondary conversion. The form fields live in components/forms/EnquiryForm.tsx. */
export const intents: Record<EnquiryIntent, { label: string; icon: IconName; title: string; body: string; submit: string; success: { title: string; body: string } }> = {
  apply: {
    label: 'Apply Now',
    icon: 'cap',
    title: 'Start your application',
    body: 'Tell us a little about yourself and we’ll set up your applicant account. You can save and return at any time.',
    submit: 'Start application',
    success: { title: 'You’re on your way.', body: 'We’ve emailed a secure link to continue your application, plus a checklist of what you’ll need. (Demo — no email is sent.)' },
  },
  visit: {
    label: 'Book a Visit',
    icon: 'map',
    title: 'Visit our campus',
    body: 'Join an open day, take a guided tour or meet a program team. Prefer to explore from home? Choose a virtual tour.',
    submit: 'Request my visit',
    success: { title: 'See you soon.', body: 'Our visits team will confirm your date and send directions within two working days. (Demo — no booking is made.)' },
  },
  info: {
    label: 'Request Information',
    icon: 'mail',
    title: 'Request information',
    body: 'Ask about programs, fees, funding, accommodation or anything else. We’ll reply personally.',
    submit: 'Send my request',
    success: { title: 'Thanks — we’re on it.', body: 'An admissions adviser will reply by email within two working days. (Demo — nothing is sent.)' },
  },
  talk: {
    label: 'Talk to Admissions',
    icon: 'chat',
    title: 'Talk to an adviser',
    body: 'Book a no-pressure call or video chat with an admissions adviser about your options.',
    submit: 'Book my call',
    success: { title: 'Call requested.', body: 'We’ll confirm a time that suits you by email. (Demo — no call is booked.)' },
  },
  prospectus: {
    label: 'Download Prospectus',
    icon: 'download',
    title: 'Get the prospectus',
    body: 'Every program, our campus and student life in one guide — as a PDF, or a printed copy by post.',
    submit: 'Send me the prospectus',
    success: { title: 'It’s on its way.', body: 'Check your inbox for your prospectus link. Printed copies arrive within [[5–7 working days]]. (Demo — nothing is sent.)' },
  },
}

export const intentOrder: EnquiryIntent[] = ['apply', 'visit', 'info', 'talk', 'prospectus']
