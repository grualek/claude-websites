import type { IconName } from '../../content/types'

/** Minimal 1.5px line icons drawn on a 24px grid. Decorative by default. */
const paths: Record<IconName, React.ReactNode> = {
  stethoscope: (
    <>
      <path d="M5 3v5a5 5 0 0 0 10 0V3" />
      <path d="M10 13v2a5 5 0 0 0 10 0v-2" />
      <circle cx="20" cy="11" r="2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5 7.5-9.5V6L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z" />,
  person: (
    <>
      <circle cx="12" cy="7.5" r="3.5" />
      <path d="M5 20.5a7 7 0 0 1 14 0" />
    </>
  ),
  microscope: (
    <>
      <path d="M6 21h12" />
      <path d="M9 17a6 6 0 0 0 9-5.2" />
      <path d="m9.5 4.5 3-1.5 3.5 7-3 1.5z" />
      <path d="M11 12.5 9 14" />
      <circle cx="8" cy="15" r="1.6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  movement: (
    <>
      <circle cx="13.5" cy="4.5" r="1.8" />
      <path d="m7 21 3.5-6 3 2.5V21" />
      <path d="M6 11.5 9 9l4 .5 3 3.5 3 .5" />
      <path d="m13 9.5-2.5 5.5" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" />
      <path d="M5 19c3-4 6-6.5 10-8.5" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4.5" width="14" height="16.5" rx="2" />
      <path d="M9 4.5V3.5h6v1" />
      <path d="M8.5 10.5h7M8.5 14h7M8.5 17.5h4" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3 10h18M7 15h3" />
    </>
  ),
  'user-plus': (
    <>
      <circle cx="10" cy="8" r="3.5" />
      <path d="M3.5 20.5a6.5 6.5 0 0 1 13 0" />
      <path d="M19 8v6M16 11h6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <path d="m9.5 15 1.8 1.8 3.4-3.4" />
    </>
  ),
  chat: (
    <>
      <path d="M20.5 12a8 8 0 0 1-11.6 7.2L4 20.5l1.3-4.4A8 8 0 1 1 20.5 12Z" />
      <path d="M8.5 11h7M8.5 14h4" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="m16 10.5 5-3v9l-5-3" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5.5L12 3l8 2.5V21" />
      <path d="M3 21h18" />
      <path d="M10 21v-4h4v4" />
      <path d="M12 7v4M10 9h4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  phone: (
    <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  'arrow-right': <path d="M4.5 12h15m-5.5-5.5L19.5 12 14 17.5" />,
  'arrow-up-right': <path d="M7 17 17 7M8.5 7H17v8.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M4 7.5h16M4 12h16M4 16.5h10" />,
  quote: (
    <path d="M9.5 7C6.5 8 5 10.5 5 13.5V17h4.5v-4.5H7c0-2 .9-3.4 2.5-4.2V7Zm9 0c-3 1-4.5 3.5-4.5 6.5V17h4.5v-4.5H16c0-2 .9-3.4 2.5-4.2V7Z" />
  ),
  sparkle: <path d="M12 3.5c.6 4.3 2.2 5.9 6.5 6.5-4.3.6-5.9 2.2-6.5 6.5-.6-4.3-2.2-5.9-6.5-6.5 4.3-.6 5.9-2.2 6.5-6.5Z" />,
}

interface IconProps {
  name: IconName
  className?: string
  /** Provide a label only when the icon conveys meaning on its own. */
  label?: string
  strokeWidth?: number
}

export function Icon({ name, className = 'size-5', label, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {paths[name]}
    </svg>
  )
}
