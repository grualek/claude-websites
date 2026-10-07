import { clinic } from '../../content/clinic'

export function LogoMark({ className = 'size-9' }: { className?: string }) {
  // Abstract alder leaf inside an arch — a calm, non-clinical mark.
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden focusable="false">
      <path d="M6 38V18a14 14 0 0 1 28 0v20Z" fill="currentColor" />
      <path d="M20 33c-6-4-8-9-6-15 1.5-4.5 4.5-7 6-8 1.5 1 4.5 3.5 6 8 2 6 0 11-6 15Z" fill="#f7f4ee" />
      <path d="M20 33V15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const text = tone === 'dark' ? 'text-ink' : 'text-paper'
  return (
    <a href="#top" className={`inline-flex min-w-0 items-center gap-3 ${text}`}>
      <LogoMark className={`size-9 shrink-0 ${tone === 'dark' ? 'text-blue-deep' : 'text-sage'}`} />
      <span className="flex flex-col leading-none">
        <span className="font-display-tight text-[1.375rem] font-[450]">{clinic.name}</span>
        <span className={`mt-1 hidden text-[0.6875rem] min-[420px]:block font-medium tracking-[0.14em] uppercase ${tone === 'dark' ? 'text-muted' : 'text-paper/70'}`}>
          {clinic.tagline}
        </span>
      </span>
      <span className="sr-only">— home</span>
    </a>
  )
}
