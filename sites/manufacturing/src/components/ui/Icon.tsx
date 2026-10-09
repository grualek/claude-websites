import type { ReactNode } from 'react'
import type { IconName } from '../../content/types'

/** Technical 1.4px line icons on a 24px grid with square caps. Decorative by default (aria-hidden). */
const paths: Record<IconName, ReactNode> = {
  'arrow-right': <path d="M4 12h15.5m-6-6 6 6-6 6" />,
  'arrow-up-right': <path d="M6.5 17.5 17.5 6.5M8 6.5h9.5V16" />,
  'arrow-down': <path d="M12 4v15.5m-6-6 6 6 6-6" />,
  phone: <path d="M5.5 4.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a1.5 1.5 0 0 1-1.5 1.5A15.5 15.5 0 0 1 4 6a1.5 1.5 0 0 1 1.5-1.5Z" />,
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" />
      <path d="m3.5 6 8.5 7 8.5-7" />
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
  menu: <path d="M3.5 7.5h17M3.5 12h17M3.5 16.5h11" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2.5" />
    </>
  ),
  upload: <path d="M12 15.5V4m-4.5 4.5L12 4l4.5 4.5M4.5 14v5.5h15V14" />,
  file: (
    <>
      <path d="M6 3.5h8l4.5 4.5v12.5H6Z" />
      <path d="M14 3.5V8h4.5M9 12.5h6M9 15.5h6" />
    </>
  ),
  download: <path d="M12 4v11.5m-4.5-4.5L12 15.5l4.5-4.5M4.5 19.5h15" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5" />
    </>
  ),
  spindle: (
    <>
      <path d="M8 3.5h8v5H8ZM10 8.5h4v4h-4ZM11 12.5h2l-.5 5h-1Z" />
      <path d="M4 20.5h16M7 17.5h10v3H7Z" />
    </>
  ),
  weld: (
    <>
      <path d="M4 20.5 13 11.5M11 9.5l3.5 3.5M13 7.5l3.5 3.5-2 2L11 9.5Z" />
      <path d="M17.5 4v2.5M20 6.5h-2.5M19.5 3l-1.5 1.5M16 8l-1 1" />
    </>
  ),
  assembly: (
    <>
      <rect x="3.5" y="13.5" width="7" height="7" />
      <rect x="13.5" y="13.5" width="7" height="7" />
      <rect x="8.5" y="3.5" width="7" height="7" />
      <path d="M12 10.5v3M7 13.5v-1.5h10v1.5" />
    </>
  ),
  automation: (
    <>
      <path d="M4 20.5h7M7.5 20.5v-3l3-1.5L15 8.5" />
      <circle cx="10.5" cy="16" r="1.6" />
      <circle cx="15" cy="8.5" r="1.6" />
      <path d="m15 8.5 4 2.5M19 11v3M17.5 14h3" />
    </>
  ),
  prototype: (
    <>
      <path d="m12 3.5 8 4.5v8l-8 4.5L4 16V8Z" />
      <path d="m4 8 8 4.5L20 8M12 12.5v8" strokeDasharray="2 2" />
    </>
  ),
  finish: (
    <>
      <path d="M4.5 16.5 16 5l3 3L7.5 19.5h-3Z" />
      <path d="M13.5 7.5l3 3M3.5 21h17" />
    </>
  ),
  inspect: (
    <>
      <path d="M4 7.5V4h3.5M16.5 4H20v3.5M20 16.5V20h-3.5M7.5 20H4v-3.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 6.5v2M12 15.5v2M6.5 12h2M15.5 12h2" />
    </>
  ),
  custom: (
    <>
      <path d="M4 4h7v7H4ZM13 13h7v7h-7Z" />
      <path d="M13 7.5h7M16.5 4v7M4 16.5h7" />
    </>
  ),
  gauge: (
    <>
      <path d="M3.5 16a8.5 8.5 0 0 1 17 0" />
      <path d="m12 16 4-5.5M6 16H3.5M20.5 16H18M12 7.5v1.5M7 10l1 1M17 10l-1 1" />
      <path d="M3.5 19.5h17" />
    </>
  ),
  engineer: (
    <>
      <path d="M6.5 10.5a5.5 5.5 0 0 1 11 0Z" />
      <path d="M5 10.5h14M12 5V3.5" />
      <path d="M8 13.5a4 4 0 0 0 8 0M5 20.5a7 7 0 0 1 14 0" />
    </>
  ),
  layers: <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8ZM3.5 12l8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />,
  'scale-up': (
    <>
      <path d="M4 20.5h16M6 20.5v-4M10 20.5v-7M14 20.5v-10M18 20.5V7" />
      <path d="M14.5 3.5h4v4" />
    </>
  ),
  car: (
    <>
      <path d="M3.5 16.5v-4l2.5-5h12l2.5 5v4Z" />
      <path d="M3.5 12.5h17" />
      <circle cx="7.5" cy="16.5" r="1.8" />
      <circle cx="16.5" cy="16.5" r="1.8" />
    </>
  ),
  plane: <path d="M12 3.5c.9 0 1.5.8 1.5 2v4.5l7 4v2l-7-2v4l2 1.5v1.5L12 20l-3.5 1v-1.5l2-1.5v-4l-7 2v-2l7-4V5.5c0-1.2.6-2 1.5-2Z" />,
  medical: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" />
      <path d="M12 7.5v9M7.5 12h9" />
    </>
  ),
  energy: <path d="M13 3 5.5 13.5H12L11 21l7.5-10.5H12Z" />,
  crane: (
    <>
      <path d="M6 20.5V5l14 0M6 5 3.5 8M6 8.5 9.5 5M6 12l6-7M17 5v6" />
      <path d="M15.5 11h3v2.5h-3ZM3.5 20.5h6" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" />
      <path d="M9.5 3.5V7M14.5 3.5V7M9.5 17v3.5M14.5 17v3.5M3.5 9.5H7M3.5 14.5H7M17 9.5h3.5M17 14.5h3.5" />
      <path d="M10 10h4v4h-4Z" />
    </>
  ),
  food: (
    <>
      <path d="M7 3.5h10l-1 4.5H8ZM8 8l-1 12.5h10L16 8" />
      <path d="M7.5 13h9" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3M6 6l2.1 2.1M15.9 15.9 18 18M6 18l2.1-2.1M15.9 8.1 18 6" />
      <circle cx="12" cy="12" r="6" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5c2.5-1.3 5.5-1.3 8 0v14c-2.5-1.3-5.5-1.3-8 0ZM12 5.5c2.5-1.3 5.5-1.3 8 0v14c-2.5-1.3-5.5-1.3-8 0Z" />
    </>
  ),
  doc: (
    <>
      <path d="M5.5 3.5h13v17h-13Z" />
      <path d="M8.5 7.5h7M8.5 11h7M8.5 14.5h4" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="9.5" r="5.5" />
      <path d="m8.5 13.8-1.5 6.7 5-2.5 5 2.5-1.5-6.7" />
      <path d="m9.8 9.5 1.6 1.6 2.9-3" />
    </>
  ),
  material: (
    <>
      <path d="M3.5 16.5h17v4h-17ZM5.5 12.5h13v4h-13ZM7.5 8.5h9v4h-9Z" />
    </>
  ),
  question: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 16.5v.5" />
    </>
  ),
  truck: (
    <>
      <path d="M3.5 6.5h10.5v10H3.5ZM14 10h4l2.5 3v3.5H14" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  clipboard: (
    <>
      <path d="M8.5 5h-3v15.5h13V5h-3" />
      <path d="M8.5 3.5h7v3h-7ZM8.5 11l1.5 1.5 3-3M8.5 16h7" />
    </>
  ),
  trace: (
    <>
      <circle cx="5.5" cy="6" r="2" />
      <circle cx="18.5" cy="12" r="2" />
      <circle cx="5.5" cy="18" r="2" />
      <path d="M7.5 6h4v12h-4M11.5 12h5" />
    </>
  ),
  loop: <path d="M19.5 12a7.5 7.5 0 0 1-13.4 4.6M4.5 12a7.5 7.5 0 0 1 13.4-4.6M18 3.5v4h-4M6 20.5v-4h4" />,
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" />
      <path d="M8 10.5V16M8 7.5v.5M11.5 16v-5.5M11.5 13c0-1.7 1-2.7 2.5-2.7s2.5 1 2.5 2.7v3" />
    </>
  ),
}

export function Icon({ name, className = 'size-5', label }: { name: IconName; className?: string; label?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true, focusable: false })}
    >
      {paths[name]}
    </svg>
  )
}
