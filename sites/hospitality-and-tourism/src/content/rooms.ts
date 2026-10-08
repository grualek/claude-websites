import type { Room } from './types'

/**
 * Demo inventory. Rates are indicative "from" prices only — in production, pull room types, rates and
 * availability from the PMS / booking engine (see `lib/booking.ts`).
 */
export const rooms: Room[] = [
  {
    slug: 'garden-room',
    name: 'Garden Room',
    category: 'Room',
    summary: 'Lime-washed walls, linen and a private terrace that opens straight onto the citrus garden.',
    description: [
      'Set at garden level in the original 1920s farmhouse, the Garden Rooms keep the thick stone walls and deep window seats of the old building. Mornings start on your own terrace, shaded by a vine pergola, with the scent of lemon blossom drifting up from the terraces.',
      'Inside: a handmade oak bed dressed in washed linen, a rain shower in local stone, and a writing table set beneath the window.',
    ],
    maxGuests: 2,
    size: 32,
    bed: 'King or twin',
    view: 'Citrus garden',
    keyFeature: 'Private garden terrace',
    amenities: ['Private terrace with daybed', 'Rain shower', 'Air conditioning & ceiling fan', 'Nespresso & loose-leaf tea', 'Organic toiletries', 'Wi-Fi'],
    fromRate: { amount: 290, currency: 'EUR' },
    inventory: 10,
    image: { scene: 'garden-room', mood: 'morning', alt: 'A light-filled bedroom with a linen-dressed bed and doors open to a citrus garden' },
    gallery: [
      { scene: 'garden-room', mood: 'golden', alt: 'Garden Room in afternoon light' },
      { scene: 'ceramics', mood: 'morning', alt: 'Breakfast on the terrace: hand-thrown ceramics and figs' },
    ],
  },
  {
    slug: 'ocean-suite',
    name: 'Ocean Suite',
    category: 'Suite',
    summary: 'Floor-to-ceiling openings frame the bay. A freestanding bath faces the sea; the horizon does the rest.',
    description: [
      'Our Ocean Suites sit on the upper terraces with an uninterrupted view across the bay. Wide oak-framed doors fold back to a balcony large enough for breakfast for two and a pair of loungers.',
      'A separate sitting room, a deep stone bath placed to face the water, and sheer linen curtains that move with the evening breeze.',
    ],
    maxGuests: 3,
    size: 54,
    bed: 'King',
    view: 'Sea view',
    keyFeature: 'Sea-facing stone bath',
    amenities: ['Sea-view balcony', 'Freestanding stone bath', 'Separate sitting room', 'Sofa bed for a third guest', 'In-room bar', 'Wi-Fi'],
    fromRate: { amount: 520, currency: 'EUR' },
    inventory: 8,
    image: { scene: 'ocean-suite', mood: 'golden', alt: 'A suite with linen curtains open to a balcony and a calm sea at golden hour' },
    gallery: [
      { scene: 'ocean-suite', mood: 'morning', alt: 'Ocean Suite in morning light' },
      { scene: 'swimmer', mood: 'morning', alt: 'A swimmer in clear water below the terraces' },
    ],
  },
  {
    slug: 'hillside-residence',
    name: 'Hillside Residence',
    category: 'Residence',
    summary: 'Two bedrooms, a long terrace and a kitchen of your own, set among the olive groves above the estate.',
    description: [
      'Converted from the estate’s old olive press, the Hillside Residences are made for families and friends travelling together. Two bedrooms open onto a shared terrace with an outdoor dining table and views across the groves to the sea.',
      'A full kitchen, a fireplace for cooler months, and a pantry we can stock before you arrive.',
    ],
    maxGuests: 4,
    size: 110,
    bed: '2 bedrooms · King + twin',
    view: 'Olive groves & sea',
    keyFeature: 'Outdoor dining terrace',
    amenities: ['Two bedrooms, two bathrooms', 'Full kitchen', 'Terrace with outdoor dining', 'Fireplace', 'Pre-arrival pantry stocking', 'Wi-Fi'],
    fromRate: { amount: 760, currency: 'EUR' },
    inventory: 4,
    image: { scene: 'residence', mood: 'golden', alt: 'A long stone terrace with loungers overlooking olive groves and the sea' },
    gallery: [
      { scene: 'residence', mood: 'dusk', alt: 'The residence terrace at dusk' },
      { scene: 'grove', mood: 'golden', alt: 'Olive groves around the residences' },
    ],
  },
  {
    slug: 'private-villa',
    name: 'Private Villa',
    category: 'Villa',
    summary: 'A walled villa with its own pool, pergola and garden — the full estate experience, entirely to yourselves.',
    description: [
      'Villa Velora stands apart at the edge of the estate, behind its own garden walls. Three bedrooms, a pergola-shaded living terrace and a pool that seems to spill into the bay.',
      'A dedicated host arranges everything from private dinners to boat days, and breakfast is served whenever and wherever you like.',
    ],
    maxGuests: 6,
    size: 240,
    bed: '3 bedrooms · 3 King',
    view: 'Panoramic sea view',
    keyFeature: 'Private infinity pool',
    amenities: ['Private heated pool', 'Three en-suite bedrooms', 'Pergola living terrace', 'Dedicated villa host', 'Private chef on request', 'Walled garden'],
    fromRate: { amount: 1850, currency: 'EUR' },
    inventory: 1,
    image: { scene: 'villa', mood: 'golden', alt: 'A whitewashed villa with a pergola and private pool above the sea', align: 'right' },
    gallery: [
      { scene: 'villa', mood: 'dusk', alt: 'Villa pool lit at dusk', align: 'right' },
      { scene: 'long-table', mood: 'dusk', alt: 'A private dinner set under the villa pergola' },
    ],
  },
]
