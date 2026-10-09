import { institution } from '../content/institution'

/** Formats an ISO yyyy-mm-dd date without timezone drift. */
export const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat(institution.locale, { ...opts, timeZone: 'UTC' }).format(new Date(Date.UTC(y, m - 1, d)))
}

/** Splits text on [[placeholder]] markers so components can highlight content the institution must confirm. */
export const splitPlaceholders = (text: string) =>
  text
    .split(/(\[\[[^\]]+\]\])/g)
    .filter(Boolean)
    .map((part) => (part.startsWith('[[') ? { placeholder: true, text: part.slice(2, -2) } : { placeholder: false, text: part }))

/** Plain text for meta / JSON-LD: removes the [[ ]] markers. */
export const stripPlaceholders = (text: string) => text.replace(/\[\[|\]\]/g, '')

export const fullAddress = `${institution.address.street}, ${institution.address.locality}, ${institution.address.region} ${institution.address.postalCode}`
