import type { ReactNode } from 'react'
import type { IconName } from '../../content/types'

/** 1.5px line icons on a 24px grid. Decorative by default (aria-hidden). */
const paths: Record<IconName, ReactNode> = {
  'arrow-right': <path d="M4.5 12h15m-5.5-6 6 6-6 6" />,
  'arrow-up-right': <path d="M7 17 17 7M8.5 7H17v8.5" />,
  'arrow-down': <path d="M12 4.5v15m-6-5.5 6 6 6-6" />,
  phone: <path d="M5.5 4.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a1.5 1.5 0 0 1-1.5 1.5A15.5 15.5 0 0 1 4 6a1.5 1.5 0 0 1 1.5-1.5Z" />,
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M4 7.5h16M4 12h16M4 16.5h10" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5" />
    </>
  ),
  download: <path d="M12 4v11m-5-5 5 5 5-5M5 19.5h14" />,
  chat: <path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8.5a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 3.5V17H5a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 5 5.5ZM8 10h8M8 13h5" />,
  book: <path d="M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5Zm0 0v13" />,
  flask: <path d="M9.5 3.5h5M10 3.5v5.5L4.8 18a1.5 1.5 0 0 0 1.3 2.3h11.8a1.5 1.5 0 0 0 1.3-2.3L14 9V3.5M7.5 14h9" />,
  tools: <path d="M14.5 6.5a3.5 3.5 0 0 0 4.6 4.3L20 12l-8 8-2.5-2.5 8-8M14.5 6.5l-1.1-1.1a3.5 3.5 0 0 1 4.6-1.6L15.5 6.3l1.4 1.4 2.5-2.5M4 20l6.5-6.5M4.5 4.5l5 5" />,
  laptop: (
    <>
      <rect x="5" y="5" width="14" height="10" rx="1.5" />
      <path d="M2.5 18.5h19M9 18.5l.5-1.5h5l.5 1.5" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0M15.5 5.8a3 3 0 0 1 0 5.4M17.5 14.2a5.5 5.5 0 0 1 3 4.8" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5Z" />
    </>
  ),
  spark: <path d="M12 3.5c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7ZM19 16.5c.2 1.3.8 1.9 2 2-1.2.2-1.8.8-2 2-.2-1.2-.8-1.8-2-2 1.2-.1 1.8-.7 2-2Z" />,
  leaf: <path d="M5 19c0-8 5-13.5 14.5-14 .3 9.5-5 14.5-13 14M5 19l7-7" />,
  mentor: (
    <>
      <circle cx="8" cy="7.5" r="2.8" />
      <path d="M3 19.5v-1.5a5 5 0 0 1 10 0v1.5M15 9.5h5.5M15 13h4M15 6h5.5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3.5" y="7" width="17" height="12.5" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.5 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.5-3.5-8.5s1-6 3.5-8.5Z" />
    </>
  ),
  cap: <path d="m2.5 9.5 9.5-4.5 9.5 4.5-9.5 4.5Zm4 2v4.5c1.5 1.5 3.5 2.2 5.5 2.2s4-.7 5.5-2.2v-4.5M21.5 9.5v5" />,
  quote: <path d="M10 7c-3 1-4.5 3.5-4.5 6.5V17H10v-4.5H7.5M18.5 7c-3 1-4.5 3.5-4.5 6.5V17h4.5v-4.5H16" />,
  map: <path d="m9 4.5-5.5 2v13l5.5-2 6 2 5.5-2v-13l-5.5 2Zm0 0v13M15 6.5v13" />,
  file: <path d="M13.5 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8.5Zm0 0v5h5M9 13h6M9 16.5h4" />,
  help: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.6 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.7M12 16.8v.01" />
    </>
  ),
  news: <path d="M5 5.5h11.5v13a1.5 1.5 0 0 0 1.5 1.5H6.5A1.5 1.5 0 0 1 5 18.5Zm11.5 4h3v9a1.5 1.5 0 0 1-3 0M8 9h5.5M8 12.5h5.5M8 16h3.5" />,
  ticket: <path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v2a2.5 2.5 0 0 0 0 5v2a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5v-2a2.5 2.5 0 0 0 0-5ZM14 6v12" />,
  layers: <path d="m12 4 8.5 4.5L12 13 3.5 8.5Zm-8.5 8L12 16.5l8.5-4.5M3.5 15.5 12 20l8.5-4.5" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M17 7v.01" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M8 10.5V16M8 7.8v.01M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6V16" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="m10.5 9.5 4 2.5-4 2.5Z" />
    </>
  ),
}

export function Icon({ name, className = 'size-5', label }: { name: IconName; className?: string; label?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true, focusable: false })}
    >
      {paths[name]}
    </svg>
  )
}
