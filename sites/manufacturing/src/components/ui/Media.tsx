import { useId } from 'react'
import type { MediaAsset } from '../../content/types'
import { Scene, type SceneFit } from '../media/Scenes'

interface MediaProps {
  asset: MediaAsset
  className?: string
  /** Above-the-fold images load eagerly with high fetch priority. */
  priority?: boolean
  sizes?: string
  /** Illustrated scenes only: keep the whole subject in frame in tall or narrow boxes. */
  fit?: SceneFit
}

/**
 * Renders a real photograph when `asset.src` is provided (lazy, async-decoded, responsive),
 * otherwise the art-directed illustrated scene. Swap in photography via the content layer.
 */
export function Media({ asset, className = '', priority = false, sizes = '100vw', fit }: MediaProps) {
  const id = 's' + useId().replace(/[^a-zA-Z0-9]/g, '')
  if (asset.src) {
    return (
      <img
        src={asset.src}
        srcSet={asset.srcSet}
        sizes={asset.srcSet ? sizes : undefined}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }
  return (
    <div {...(asset.alt ? { role: 'img', 'aria-label': asset.alt } : { 'aria-hidden': true })} className={`grain h-full w-full overflow-hidden ${className}`}>
      <Scene name={asset.scene} id={id} fit={fit} />
    </div>
  )
}
