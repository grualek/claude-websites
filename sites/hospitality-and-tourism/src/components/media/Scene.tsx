import type { Mood, SceneName } from '../../content/types'
import { arch, boat, coast, grove, longTable, map, market, pool, residence, restaurant, swimmer, trail, village, villa, type SceneFn } from './Exteriors'
import { ceramics, gardenRoom, oceanSuite, spa } from './Interiors'
import { palettes } from './palette'
import { SceneAlign } from './parts'

/**
 * Art-directed illustrations in the brand palette that stand in for photography in the pitch
 * prototype. Every scene is inline SVG (no network, no layout shift), lit for morning, golden hour or
 * dusk, and crops gracefully via `preserveAspectRatio="xMidYMid slice"`.
 */
const scenes: Record<SceneName, SceneFn> = {
  coast,
  pool,
  'garden-room': gardenRoom,
  'ocean-suite': oceanSuite,
  residence,
  villa,
  'long-table': longTable,
  restaurant,
  spa,
  market,
  trail,
  village,
  grove,
  boat,
  ceramics,
  arch,
  swimmer,
  map,
}

export function Scene({ name, mood = 'golden', id, align = 'center' }: { name: SceneName; mood?: Mood; id: string; align?: 'left' | 'center' | 'right' }) {
  return <SceneAlign value={align}>{scenes[name](id, palettes[mood])}</SceneAlign>
}
