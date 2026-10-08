import type { DestinationHighlight } from './types'

/**
 * Destination highlights. Each is the seed of a "things to do" landing page
 * (/destination/{slug}/) targeting local tourism searches.
 */
export const destination = {
  eyebrow: 'The destination',
  title: 'The Sarenne Coast, unhurried.',
  intro:
    'Fishing villages, hill towns and hidden coves along forty kilometres of coastline — with the mountains never far behind. Our concierge team plans days out around the season, the weather and the way you like to travel.',
  highlights: [
    {
      slug: 'porto-sarenne-old-town',
      category: 'Culture',
      title: 'Porto Sarenne old town',
      summary: 'Whitewashed lanes, the fishermen’s chapel and a morning market on the harbour.',
      distance: '10 min by car',
      image: { scene: 'village', mood: 'golden', alt: 'Whitewashed houses climbing a hillside to a domed church' },
    },
    {
      slug: 'hidden-coves',
      category: 'Nature',
      title: 'The hidden coves',
      summary: 'Clear water and pale stone, reachable only by boat or the cliff path.',
      distance: 'By boat from our jetty',
      image: { scene: 'swimmer', mood: 'morning', alt: 'A swimmer floating in clear turquoise water' },
    },
    {
      slug: 'lighthouse-path',
      category: 'Activities',
      title: 'Capo Sarenne lighthouse',
      summary: 'The coast’s favourite walk, with a swim stop halfway.',
      distance: '2 hr walk · 15 min by boat',
      image: { scene: 'trail', mood: 'morning', alt: 'A cliff path winding toward a lighthouse' },
    },
    {
      slug: 'olive-groves-and-hill-towns',
      category: 'Day trips',
      title: 'Hill towns & wineries',
      summary: 'Medieval towns, family wineries and long lunches in the hills.',
      distance: '45 min by car',
      image: { scene: 'grove', mood: 'morning', alt: 'Terraced olive groves with hill towns in the distance' },
    },
    {
      slug: 'harbour-market',
      category: 'Local attractions',
      title: 'The harbour market',
      summary: 'Tuesday and Saturday mornings: fish straight off the boats, cheese, citrus and bread.',
      distance: '10 min by car',
      image: { scene: 'market', mood: 'golden', alt: 'Market stalls with citrus and striped awnings' },
    },
  ] satisfies DestinationHighlight[],
  /** "Things to do" quick list — good for local search intent and for the concierge to keep current. */
  thingsToDo: [
    { title: 'Swim at the Cala Bianca cove', distance: '5 min walk' },
    { title: 'Kayak to the sea caves', distance: 'From our jetty' },
    { title: 'Wine tasting in the Velora hills', distance: '35 min' },
    { title: 'Sunday antiques market, Alta Sarenne', distance: '30 min' },
    { title: 'Ferry day trip to Isola Pera', distance: '1 hr by sea' },
    { title: 'Mountain trails of the Sarenne Park', distance: '50 min' },
  ],
}
