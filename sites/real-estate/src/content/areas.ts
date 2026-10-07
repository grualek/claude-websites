import type { Area } from './types'

/** Neighbourhoods served. Each becomes an /areas/:slug guide page and a search facet. */
export const areas: Area[] = [
  {
    id: 'city-centre',
    slug: 'city-centre',
    name: 'City Centre',
    kicker: 'Lofts, apartments & penthouses',
    description: 'Converted warehouses and new residences a short walk from the station, galleries and the covered market.',
    guide:
      'The centre of Wrenfield suits people who would rather walk than drive. Former mills and print works have become lofts with generous ceilings, and the newer schemes around Station Square add lateral apartments with concierge and parking.',
    highlights: ['Walk to the mainline station', 'Covered market & independent restaurants', 'Concierge buildings'],
    image: { scene: 'skyline', tone: 'dusk', alt: 'Illustration of the city centre skyline at dusk with lit apartment windows' },
    mapPosition: { x: 61, y: 36 },
  },
  {
    id: 'riverside',
    slug: 'riverside',
    name: 'Riverside',
    kicker: 'Water views & towpath walks',
    description: 'Wide, light-filled homes along the river, from Victorian villas to modern apartments with balconies over the water.',
    guide:
      'Riverside runs along both banks of the Wren between the old iron bridge and the boathouses. Expect morning rowers, a long towpath into the countryside and some of the most sought-after family houses in the city.',
    highlights: ['Towpath into open countryside', 'Rowing & sailing clubs', 'Well-regarded primary schools'],
    image: { scene: 'riverside', tone: 'golden', alt: 'Illustration of houses along a calm river with a stone bridge' },
    mapPosition: { x: 41, y: 63 },
  },
  {
    id: 'old-town',
    slug: 'old-town',
    name: 'Old Town',
    kicker: 'Georgian terraces & cobbled lanes',
    description: 'Listed townhouses, walled gardens and quiet squares in the historic heart of Wrenfield.',
    guide:
      'The Old Town is a conservation area of Georgian and Regency terraces, mews houses and lanes that lead down to the cathedral close. Homes here rarely come to market and tend to be sold by word of mouth.',
    highlights: ['Conservation area', 'Cathedral close & Linden Square', 'Walled gardens'],
    image: { scene: 'oldtown', tone: 'golden', alt: 'Illustration of a cobbled lane lined with Georgian townhouses' },
    mapPosition: { x: 47, y: 44 },
  },
  {
    id: 'north-district',
    slug: 'north-district',
    name: 'North District',
    kicker: 'New neighbourhoods & first homes',
    description: 'A growing district of well-planned apartments and townhouses around Northgate Park and the new tram line.',
    guide:
      'North District is where much of Wrenfield’s new housing is being built, with energy-efficient apartments, townhouses and a strong rental market close to the university and the tram.',
    highlights: ['Northgate Park', 'Tram to the centre', 'Popular with first-time buyers & investors'],
    image: { scene: 'apartment', tone: 'day', alt: 'Illustration of a modern apartment building with balconies and trees' },
    mapPosition: { x: 56, y: 15 },
  },
  {
    id: 'the-suburbs',
    slug: 'the-suburbs',
    name: 'Ashgrove & the Suburbs',
    kicker: 'Family houses & gardens',
    description: 'Tree-lined avenues, detached family homes and good schools, ten minutes from the centre by train.',
    guide:
      'Ashgrove, Fenwick and Hale Green are leafy villages that have been absorbed into the city without losing their high streets. Families come for the gardens and schools and tend to stay for a long time.',
    highlights: ['Tree-lined avenues', 'Village high streets', 'Large gardens'],
    image: { scene: 'suburb', tone: 'day', alt: 'Illustration of a detached family house on a tree-lined avenue' },
    mapPosition: { x: 21, y: 30 },
  },
  {
    id: 'coast-country',
    slug: 'coast-country',
    name: 'Coast & Countryside',
    kicker: 'Sea air & open views',
    description: 'Cottages, barn conversions and coastal houses within forty minutes of the city.',
    guide:
      'Beyond the ring of hills, the countryside opens out towards the coast at Saltmarsh Bay. We handle stone cottages, farmhouses, barn conversions and a small number of contemporary coastal homes each year.',
    highlights: ['Saltmarsh Bay & the dunes', 'Stone villages', 'Barn conversions & farmhouses'],
    image: { scene: 'coastal', tone: 'golden', alt: 'Illustration of a contemporary house above the dunes overlooking the sea' },
    mapPosition: { x: 83, y: 76 },
  },
]

export const getArea = (id: string) => areas.find((a) => a.id === id)
