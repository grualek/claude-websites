import type { ReactNode } from 'react'
import type { IconName } from '../../content/types'

/** Fine 1.3px line icons on a 24px grid. Decorative by default (aria-hidden). */
const paths: Record<IconName, ReactNode> = {
  'arrow-right': <path d="M4.5 12h15m-5.5-6 6 6-6 6" />,
  'arrow-left': <path d="M19.5 12h-15m5.5-6-6 6 6 6" />,
  'arrow-up-right': <path d="M7 17 17 7M8.5 7H17v8.5" />,
  'arrow-down': <path d="M12 4.5v15m-6-5.5 6 6 6-6" />,
  phone: <path d="M5.5 4.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a1.5 1.5 0 0 1-1.5 1.5A15.5 15.5 0 0 1 4 6a1.5 1.5 0 0 1 1.5-1.5Z" />,
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1" />
      <path d="m4 6.5 8 6.5 8-6.5" />
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
  menu: <path d="M4 8h16M4 16h16" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="1.5" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  guests: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0M15.5 5.8a3 3 0 0 1 0 5.4M17.5 14.2a5.5 5.5 0 0 1 3 4.8" />
    </>
  ),
  size: <path d="M4.5 9.5v-5h5M19.5 14.5v5h-5M4.5 4.5l6 6M19.5 19.5l-6-6M14.5 4.5h5v5M9.5 19.5h-5v-5" />,
  bed: <path d="M3.5 18.5v-11M3.5 14.5h17v4M20.5 14.5v-3a2.5 2.5 0 0 0-2.5-2.5h-7.5v5.5M7 11.5a1.5 1.5 0 1 0 0-.01" />,
  view: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  sparkle: <path d="M12 3.5c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7Z" />,
  leaf: <path d="M5 19c0-8 5-13.5 14.5-14 .3 9.5-5 14.5-13 14M5 19l7-7" />,
  wave: <path d="M2.5 9c2 0 2-1.5 4-1.5S8.5 9 10.5 9s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 3-1.5M2.5 15c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 3-1.5" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="3.8" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5Z" />
    </>
  ),
  plate: (
    <>
      <circle cx="12" cy="12" r="6.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M2.5 4v6.5M2.5 7.5h0M21.5 4c-1.5 1-1.5 4 0 6.5v9" />
    </>
  ),
  boat: <path d="M3 15.5h18l-2.5 4h-13ZM12 4v11.5M12 5l6 8.5h-6M12 7.5l-4.5 6H12" />,
  car: (
    <>
      <path d="M4.5 16.5v-4l2-5h11l2 5v4ZM4.5 12.5h15M4.5 16.5v2h2.5v-2M17 16.5v2h2.5v-2" />
      <circle cx="8" cy="14.5" r=".6" />
      <circle cx="16" cy="14.5" r=".6" />
    </>
  ),
  plane: <path d="M21 4.5 3.5 11l6 2.5 2.5 6Zm-11.5 9L21 4.5" />,
  quote: <path d="M10 7c-3 1-4.5 3.5-4.5 6.5V17H10v-4.5H7.5M18.5 7c-3 1-4.5 3.5-4.5 6.5V17h4.5v-4.5H16" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M17 7v.01" />
    </>
  ),
  expand: <path d="M14.5 4.5h5v5M9.5 19.5h-5v-5M19.5 4.5 13.5 10.5M4.5 19.5l6-6" />,
}

export function Icon({ name, className = 'size-5', label }: { name: IconName; className?: string; label?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true, focusable: false })}
    >
      {paths[name]}
    </svg>
  )
}
