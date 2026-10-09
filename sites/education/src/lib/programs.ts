import type { Program, ProgramCategory, StudyFormat } from '../content/types'

export type CategoryFilter = ProgramCategory | 'All'
export type FormatFilter = StudyFormat | 'Any'

export interface ProgramQuery {
  category: CategoryFilter
  format: FormatFilter
  q: string
}

export const emptyQuery: ProgramQuery = { category: 'All', format: 'Any', q: '' }

/** "Online" also surfaces any program that can be studied fully online, whatever its level. */
export const inCategory = (p: Program, c: CategoryFilter) => c === 'All' || p.category === c || (c === 'Online' && p.format === 'Online')

const normalise = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

/** Simple client-side search: every word must match a program's name, award, subject, summary or keywords. */
export function matches(p: Program, q: string) {
  const words = normalise(q).split(/\s+/).filter(Boolean)
  if (!words.length) return true
  const hay = normalise([p.name, p.award, p.subject, p.category, p.format, p.studyMode, p.summary, ...p.keywords].join(' '))
  return words.every((w) => hay.includes(w))
}

export const filterPrograms = (list: Program[], { category, format, q }: ProgramQuery) =>
  list.filter((p) => inCategory(p, category) && (format === 'Any' || p.format === format) && matches(p, q))
