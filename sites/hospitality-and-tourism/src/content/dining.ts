import type { DiningVenue } from './types'

/** Demo restaurant. Opening hours are placeholders ([[…]]) until the real schedule is confirmed. */
export const restaurant: DiningVenue = {
  slug: 'alma',
  name: 'Alma',
  cuisine: 'Coastal, seasonal & wood-fired',
  atmosphere: 'A candlelit terrace beneath the pergola, open to the sea breeze',
  description: [
    'Alma is the estate’s restaurant: a stone dining room and a long terrace that looks west over the bay. The menu follows what the boats, the market and our kitchen garden bring in each day, cooked simply over olive wood.',
    'Lunch is relaxed and unhurried. Dinner arrives as the sun goes down, with wines chosen from small growers in the hills behind the coast.',
  ],
  hours: [
    { service: 'Breakfast', time: '[[07:30 – 10:30]]' },
    { service: 'Lunch', time: '[[12:30 – 15:00]]' },
    { service: 'Aperitivo', time: '[[18:00 – 19:30]]' },
    { service: 'Dinner', time: '[[19:30 – 22:30]]' },
  ],
  dressCode: 'Relaxed elegance',
  sampleMenu: [
    { course: 'To begin', dishes: ['Bread from our oven, new-season olive oil', 'Raw red prawns, blood orange, wild fennel', 'Charred courgette flowers, ricotta, lemon thyme'] },
    { course: 'From the fire', dishes: ['Whole fish of the day, salmoriglio', 'Lamb shoulder, smoked aubergine, mint', 'Hand-cut pasta, clams, garden tomatoes'] },
    { course: 'To finish', dishes: ['Lemon tart, almond cream', 'Honey from the estate, sheep’s cheese, figs'] },
  ],
  image: { scene: 'restaurant', mood: 'dusk', alt: 'A candlelit restaurant terrace beneath a pergola overlooking the sea at dusk' },
  detail: { scene: 'ceramics', mood: 'golden', alt: 'Hand-thrown ceramic plates with figs, bread and olive oil' },
}
