import { useId } from 'react'
import type { MediaAsset } from '../../content/types'
import { Scene } from '../media/Scene'

interface MediaProps {
  asset: MediaAsset
  className?: string
  /** Above-the-fold images load eagerly with high fetch priority. */
  priority?: boolean
  sizes?: string
  /** Decorative usage (e.g. a background behind text that already says the same thing) */
  decorative?: boolean
}

/**
 * Renders a real photograph when `asset.src` is provided (lazy, async-decoded, responsive srcset),
 * otherwise the art-directed illustrated scene. Swap in photography via the content layer only.
 */
export function Media({ asset, className = '', priority = false, sizes = '100vw', decorative = false }: MediaProps) {
  const id = 's' + useId().replace(/[^a-zA-Z0-9]/g, '')
  if (asset.src) {
    return (
      <img
        src={asset.src}
        srcSet={asset.srcSet}
        sizes={asset.srcSet ? sizes : undefined}
        alt={decorative ? '' : asset.alt}
        width={asset.width}
        height={asset.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        style={asset.focus ? { objectPosition: asset.focus } : undefined}
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }
  return (
    <div
      {...(decorative || !asset.alt ? { 'aria-hidden': true } : { role: 'img', 'aria-label': asset.alt })}
      className={`grain h-full w-full overflow-hidden ${className}`}
    >
      <Scene name={asset.scene} mood={asset.mood} id={id} align={asset.align} />
    </div>
  )
}
