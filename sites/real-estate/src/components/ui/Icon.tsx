import type { ReactNode } from 'react'
import type { IconName } from '../../content/types'

/** Fine 1.4px line icons on a 24px grid. Decorative by default (aria-hidden). */
const paths: Record<IconName, ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
  bed: (
    <>
      <path d="M3 18.5V6.5M3 14h18v4.5M21 14v-2.5a3 3 0 0 0-3-3h-7V14" />
      <circle cx="7" cy="10.5" r="1.8" />
    </>
  ),
  bath: (
    <>
      <path d="M4 12h16v2.5a4.5 4.5 0 0 1-4.5 4.5h-7A4.5 4.5 0 0 1 4 14.5Z" />
      <path d="M6 12V6a2 2 0 0 1 3.7-1M7 19l-1 2M17 19l1 2" />
    </>
  ),
  area: (
    <>
      <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  heart: <path d="M12 19.5s-7.5-4.4-7.5-10A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 7.5 2.5c0 5.6-7.5 10-7.5 10Z" />,
  'heart-filled': <path d="M12 19.5s-7.5-4.4-7.5-10A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 7.5 2.5c0 5.6-7.5 10-7.5 10Z" fill="currentColor" />,
  'arrow-right': <path d="M4.5 12h15m-5.5-6 6 6-6 6" />,
  'arrow-left': <path d="M19.5 12h-15m5.5-6-6 6 6 6" />,
  'arrow-up-right': <path d="M7 17 17 7M8.5 7H17v8.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M4 8h16M4 16h16" />,
  phone: (
    <path d="M5 4.5h3.2l1.6 4-2 1.3a10 10 0 0 0 5.4 5.4l1.3-2 4 1.6V18a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 3 6.7 2 2 0 0 1 5 4.5Z" />
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 8.5-8.5M16.5 6.5l2.5 2.5M14 9l2 2" />
    </>
  ),
  home: (
    <>
      <path d="M4 11 12 4.5l8 6.5v9H4Z" />
      <path d="M9.5 20v-5.5h5V20" />
    </>
  ),
  sign: (
    <>
      <path d="M5 21V3.5M5 6h13v8H5" />
      <path d="M9 10h5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="m7.5 15 4-4.5 3 2.5 5-6" />
    </>
  ),
  tools: (
    <>
      <path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3Z" />
      <path d="m4 4 5 5M4 4l1.5-.5L9 7" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6v5.5c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9V6Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4.5" width="14" height="16.5" rx="1.5" />
      <path d="M9 4.5v-1h6v1M8.5 10.5h7M8.5 14h7M8.5 17.5h4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 19.5a6 6 0 0 1 12 0M15.5 5a3.2 3.2 0 0 1 0 6.2M17.5 14a6 6 0 0 1 3.5 5.5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5Z" />
    </>
  ),
  megaphone: (
    <>
      <path d="M4 10v4h3l8 4.5v-13L7 10Z" />
      <path d="M7 14v4.5M18.5 9.5a3 3 0 0 1 0 5" />
    </>
  ),
  handshake: (
    <>
      <path d="m3 11 4-4 3 1.5L13 7l4 1 4 3" />
      <path d="m7 13 3.5 3.5a1.4 1.4 0 0 0 2-2M10 12l3.5 3.5a1.4 1.4 0 0 0 2-2L12 10M15 11.5l1.5 1.5a1.4 1.4 0 0 0 2-2L17 9.5" />
    </>
  ),
  sparkle: <path d="M12 3.5c.6 4.4 2.6 6.9 7.5 8.5-4.9 1.6-6.9 4.1-7.5 8.5-.6-4.4-2.6-6.9-7.5-8.5 4.9-1.6 6.9-4.1 7.5-8.5Z" />,
  filter: <path d="M4 6.5h16M7 12h10M10 17.5h4" />,
  grid: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" />
    </>
  ),
  map: (
    <>
      <path d="m3.5 6.5 5.5-2 6 2 5.5-2v13l-5.5 2-6-2-5.5 2Z" />
      <path d="M9 4.5v13M15 6.5v13" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  bell: (
    <>
      <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15Z" />
      <path d="M10 20.5a2.2 2.2 0 0 0 4 0" />
    </>
  ),
  quote: <path d="M10 7c-3 1-5 3.5-5 7v3.5h5V13H7.5c0-2.5 1-4 3-5ZM19 7c-3 1-5 3.5-5 7v3.5h5V13h-2.5c0-2.5 1-4 3-5Z" />,
  camera: (
    <>
      <path d="M4 8h3.5L9 5.5h6L16.5 8H20v11H4Z" />
      <circle cx="12" cy="13" r="3.3" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="9" cy="7" rx="5" ry="2.5" />
      <path d="M4 7v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V7M4 11v4c0 1.4 2.2 2.5 5 2.5" />
      <path d="M14 13c0-1.4 2.2-2.5 3.5-2.5S21 11.6 21 13v4c0 1.4-1.6 2.5-3.5 2.5S14 18.4 14 17Z" />
    </>
  ),
  building: (
    <>
      <path d="M4.5 20.5V4h10v16.5M14.5 9.5h5v11M3 20.5h18" />
      <path d="M8 8h3M8 11.5h3M8 15h3" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" />
      <path d="M5 19c3-4 6-6.5 10-8.5" />
    </>
  ),
}

export function Icon({ name, className = 'size-5', title }: { name: IconName; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  )
}
