import { useEffect, useRef, type ReactNode } from 'react'
import { Icon } from './Icon'

interface DialogProps {
  open: boolean
  onClose: () => void
  labelledBy: string
  children: ReactNode
  variant?: 'center' | 'sheet'
  size?: 'md' | 'lg'
  className?: string
}

/**
 * Thin wrapper around the native <dialog> element: showModal() gives focus trapping,
 * Escape-to-close, an inert background and top-layer rendering for free.
 * Focus returns to the triggering element when the dialog closes.
 */
export function Dialog({ open, onClose, labelledBy, children, variant = 'center', size = 'md', className = '' }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const openRef = useRef(open)
  openRef.current = open

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) {
      el.showModal()
      el.querySelector<HTMLElement>('[autofocus], button, a[href], input, select, textarea')?.focus()
    }
    if (!open && el.open) el.close()
  }, [open])

  const layout =
    variant === 'sheet'
      ? 'animate-sheet ml-auto mr-0 h-dvh max-h-dvh w-full max-w-md'
      : `animate-dialog m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] ${size === 'lg' ? 'max-w-5xl' : 'max-w-2xl'}`

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={() => openRef.current && onClose()}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className={`overflow-hidden rounded-[2px] bg-paper p-0 text-ink-soft shadow-[0_40px_80px_-30px_rgb(27_25_22/0.5)] ${layout} ${className}`}
    >
      {open && <div className="max-h-[inherit] overflow-y-auto overscroll-contain">{children}</div>}
    </dialog>
  )
}

export function DialogClose({ onClose, label = 'Close' }: { onClose: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-paper/80 text-ink backdrop-blur transition-colors hover:border-ink"
    >
      <Icon name="close" className="size-5" />
      <span className="sr-only">{label}</span>
    </button>
  )
}
