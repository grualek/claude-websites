import type { Mood } from '../../content/types'

/** Lighting palettes: one illustration reads as morning, day or early evening. */
export interface Palette {
  mood: Mood
  skyTop: string
  skyLow: string
  sun: string
  glow: string
  wall: string
  wallShade: string
  wallDeep: string
  floor: string
  floorDeep: string
  windowLight: string
  wood: string
  woodDark: string
  paper: string
  navy: string
  blue: string
  blueSoft: string
  green: string
  greenDeep: string
  greenSoft: string
  yellow: string
  coral: string
  foliage: string
  foliageLit: string
  foliageDark: string
  trunk: string
  brick: string
  brickShade: string
  stone: string
  stoneShade: string
  roof: string
  lawn: string
  lawnLit: string
  shadow: string
  /** Darkens a scene evenly (evening) — 0 means none */
  veil: number
  /** Lamps and screens glow brighter in the evening */
  lampOn: number
}

const morning: Palette = {
  mood: 'morning',
  skyTop: '#b8cde0',
  skyLow: '#efe9da',
  sun: '#fff8e6',
  glow: '#fff3d1',
  wall: '#f3eee3',
  wallShade: '#dfd8c8',
  wallDeep: '#c9c0ad',
  floor: '#d7cbb3',
  floorDeep: '#bfb093',
  windowLight: '#e6eef2',
  wood: '#c79a6b',
  woodDark: '#8d6643',
  paper: '#fbf8f1',
  navy: '#1d2d4a',
  blue: '#4f6f97',
  blueSoft: '#b9cadc',
  green: '#86a487',
  greenDeep: '#4b6e5c',
  greenSoft: '#cfdcc8',
  yellow: '#ecc25a',
  coral: '#d98c6c',
  foliage: '#7f9d74',
  foliageLit: '#a9c08f',
  foliageDark: '#4f6c4f',
  trunk: '#6b5640',
  brick: '#b9866a',
  brickShade: '#9a6c55',
  stone: '#e4dac6',
  stoneShade: '#c7baa1',
  roof: '#4a5568',
  lawn: '#97b083',
  lawnLit: '#b6c99a',
  shadow: '#2a3346',
  veil: 0,
  lampOn: 0.25,
}

const day: Palette = {
  ...morning,
  mood: 'day',
  skyTop: '#9fbad6',
  skyLow: '#e3ebef',
  sun: '#fffdf4',
  glow: '#fff7df',
  wall: '#f1ece1',
  windowLight: '#dbe8f0',
  foliage: '#728f63',
  foliageLit: '#9db77e',
  lawn: '#8aa874',
  lawnLit: '#a9c18b',
  lampOn: 0.3,
}

const evening: Palette = {
  ...morning,
  mood: 'evening',
  skyTop: '#33456b',
  skyLow: '#e7a978',
  sun: '#ffd79a',
  glow: '#ffc979',
  wall: '#e6dac4',
  wallShade: '#cdbd9f',
  wallDeep: '#a99878',
  floor: '#b9a27e',
  floorDeep: '#957e5c',
  windowLight: '#7d8fb1',
  foliage: '#5f7657',
  foliageLit: '#87996a',
  foliageDark: '#3a4d3c',
  brick: '#a8735a',
  brickShade: '#7f5443',
  stone: '#d6c3a3',
  stoneShade: '#ae9a7b',
  lawn: '#71875e',
  lawnLit: '#8e9f6b',
  veil: 0.1,
  lampOn: 1,
}

export const palettes: Record<Mood, Palette> = { morning, day, evening }
