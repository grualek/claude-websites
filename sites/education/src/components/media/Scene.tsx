import type { Mood, SceneName } from '../../content/types'
import { activities, campus, community, field, map, quad, type SceneFn } from './Campus'
import { clubs, collaboration, digital, event, lab, lecture, library, projects, seminar, studio, workshop } from './Interiors'
import { palettes } from './palette'
import { SceneAlign } from './parts'

/**
 * Art-directed illustrations in the brand palette that stand in for photography in the pitch
 * prototype. Every scene is inline SVG (no network, no layout shift), lit for morning, day or
 * evening, and crops gracefully via `preserveAspectRatio="… slice"`.
 */
const scenes: Record<SceneName, SceneFn> = {
  campus,
  quad,
  activities,
  field,
  community,
  map,
  library,
  seminar,
  lab,
  workshop,
  studio,
  digital,
  collaboration,
  lecture,
  event,
  clubs,
  projects,
}

export function Scene({ name, mood = 'day', id, align = 'center' }: { name: SceneName; mood?: Mood; id: string; align?: 'left' | 'center' | 'right' }) {
  return <SceneAlign value={align}>{scenes[name](id, palettes[mood])}</SceneAlign>
}
