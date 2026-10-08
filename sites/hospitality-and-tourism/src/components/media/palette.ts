import type { Mood } from '../../content/types'

/** Lighting palettes: one illustration reads as morning, golden hour or dusk. */
export interface Palette {
  mood: Mood
  skyTop: string
  skyMid: string
  skyLow: string
  sun: string
  sunGlow: string
  seaFar: string
  seaNear: string
  shimmer: string
  hillFar: string
  hillMid: string
  hillNear: string
  foliage: string
  foliageLit: string
  foliageDark: string
  cypress: string
  wallLit: string
  wallShade: string
  wallDeep: string
  roof: string
  stone: string
  stoneDark: string
  ground: string
  pool: string
  poolDeep: string
  glow: string
  linen: string
  wood: string
  woodDark: string
  shadow: string
  /** Darkens a scene evenly (dusk) — 0 means none */
  veil: number
}

const morning: Palette = {
  mood: 'morning',
  skyTop: '#b9cfd2',
  skyMid: '#dbe3dc',
  skyLow: '#f3ecdd',
  sun: '#fffaf0',
  sunGlow: '#fff6e2',
  seaFar: '#9fb9b7',
  seaNear: '#5f8a8c',
  shimmer: '#eef3ec',
  hillFar: '#b8c2bd',
  hillMid: '#98a596',
  hillNear: '#76825f',
  foliage: '#7c8762',
  foliageLit: '#a5ad86',
  foliageDark: '#4e5a3d',
  cypress: '#3f4a33',
  wallLit: '#f7f2e9',
  wallShade: '#d9d6cc',
  wallDeep: '#b9b6ac',
  roof: '#c98a68',
  stone: '#d9c9ad',
  stoneDark: '#b49f80',
  ground: '#d8c7a6',
  pool: '#8cc3c2',
  poolDeep: '#4f9597',
  glow: '#fff3d6',
  linen: '#f6f2ea',
  wood: '#a77d57',
  woodDark: '#6e4f36',
  shadow: '#5a6260',
  veil: 0,
}

const golden: Palette = {
  mood: 'golden',
  skyTop: '#d8b48f',
  skyMid: '#f0cfa2',
  skyLow: '#f8e2bb',
  sun: '#fff4d8',
  sunGlow: '#ffe2a8',
  seaFar: '#c9b08e',
  seaNear: '#5d7c7d',
  shimmer: '#fff0cc',
  hillFar: '#c9a888',
  hillMid: '#a68c6b',
  hillNear: '#7b7550',
  foliage: '#7f7d52',
  foliageLit: '#b4a66c',
  foliageDark: '#4d4d31',
  cypress: '#3d4029',
  wallLit: '#fbe8cc',
  wallShade: '#d9b893',
  wallDeep: '#b3906d',
  roof: '#b9673f',
  stone: '#e1c39a',
  stoneDark: '#b8936a',
  ground: '#dcbc8f',
  pool: '#7fb7b0',
  poolDeep: '#3f7f80',
  glow: '#ffd99a',
  linen: '#f9ead2',
  wood: '#a36f45',
  woodDark: '#664328',
  shadow: '#6b5038',
  veil: 0,
}

const dusk: Palette = {
  mood: 'dusk',
  skyTop: '#3b3a4a',
  skyMid: '#8a5f63',
  skyLow: '#e0a37a',
  sun: '#ffd9a0',
  sunGlow: '#f1a66f',
  seaFar: '#7d6466',
  seaNear: '#26323a',
  shimmer: '#f5b886',
  hillFar: '#6c5560',
  hillMid: '#4f4250',
  hillNear: '#33333a',
  foliage: '#3f4433',
  foliageLit: '#5e6047',
  foliageDark: '#262a20',
  cypress: '#1f231b',
  wallLit: '#e2c3a8',
  wallShade: '#a68979',
  wallDeep: '#6d5a52',
  roof: '#8a4e36',
  stone: '#a88c74',
  stoneDark: '#6f5b4c',
  ground: '#8e7562',
  pool: '#3fa2a4',
  poolDeep: '#1d5b63',
  glow: '#ffc779',
  linen: '#eed7bf',
  wood: '#6f4b33',
  woodDark: '#3e2a1d',
  shadow: '#231d1d',
  veil: 0.12,
}

export const palettes: Record<Mood, Palette> = { morning, golden, dusk }
