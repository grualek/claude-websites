import type { Faq, GalleryItem, MediaAsset, Offer, Pillar, Testimonial } from './types'

export const hero = {
  eyebrow: 'A coastal estate · Sarenne Coast',
  title: 'Stay somewhere worth remembering.',
  body: 'Twenty-four rooms set among old olive groves above a quiet bay — where mornings start with the sea, afternoons drift by the pool, and dinner is served under the stars.',
  image: { scene: 'coast', mood: 'golden', alt: 'Whitewashed terraced buildings and cypress trees on a cliff above the sea at golden hour' } satisfies MediaAsset,
}

export const intro = {
  eyebrow: 'Stay',
  title: 'A slower way to experience the coast.',
  lead: 'Casa Velora began life as an olive farm in 1928. Today it is a small hotel of stone terraces, citrus gardens and sea views, with just twenty-four rooms, suites and villas spread across the old estate.',
  body: [
    'We kept what made the place special: thick stone walls that stay cool in August, centuries-old olive trees, and a path down through the garden to a cove where the water is clear enough to see the bottom.',
    'Days here have a rhythm of their own. Breakfast lasts as long as you want. The pool is never crowded. And the team — most of whom grew up on this coast — will happily share the places they love.',
  ],
  facts: [
    { value: '24', label: 'Rooms, suites & villas' },
    { value: '6 ha', label: 'Of olive groves & gardens' },
    { value: '5 min', label: 'Walk to a private cove' },
    { value: '40 min', label: 'From Sarenne airport' },
  ],
  images: {
    main: { scene: 'arch', mood: 'golden', alt: 'A stone archway framing a view of the sea and a cypress tree' },
    detail: { scene: 'ceramics', mood: 'morning', alt: 'Breakfast on hand-thrown ceramics: figs, bread and olive oil' },
  } satisfies Record<string, MediaAsset>,
}

export const story = {
  eyebrow: 'About',
  title: 'Hospitality rooted in a place.',
  statement:
    'We believe a great stay should feel like it could only happen here — shaped by the land, the people who live on it and the rhythm of the seasons.',
  pillars: [
    { title: 'Place', body: 'The estate’s buildings, groves and gardens shape everything we do — from where the rooms face to what is on the menu tonight.' },
    { title: 'People', body: 'Most of our team are from the Sarenne Coast. They know the boatmen, the winemakers and the best table in the old town.' },
    { title: 'Design', body: 'Restored with local stone, lime plaster and chestnut wood. Furniture made by craftspeople within a day’s drive.' },
    { title: 'Local culture', body: 'We work with local guides, growers, fishermen and makers, and introduce guests to them by name.' },
    {
      title: 'Responsibility',
      body: 'We grow what we can, buy locally where possible and are measuring our energy and water use. [[Insert verified certifications or commitments here.]]',
    },
  ] satisfies Pillar[],
  image: { scene: 'grove', mood: 'morning', alt: 'Ancient olive trees in morning mist' } satisfies MediaAsset,
}

export const gallery: GalleryItem[] = [
  { shape: 'wide', caption: 'The pool terrace, late afternoon', image: { scene: 'pool', mood: 'golden', alt: 'An infinity pool with loungers above the sea' } },
  { shape: 'tall', caption: 'The old farmhouse arch', image: { scene: 'arch', mood: 'morning', alt: 'A stone arch with a sea view' } },
  { shape: 'square', caption: 'Breakfast, any time', image: { scene: 'ceramics', mood: 'morning', alt: 'Breakfast plates with figs and bread' } },
  { shape: 'portrait', caption: 'The cove below the garden', image: { scene: 'swimmer', mood: 'morning', alt: 'A swimmer in clear water' } },
  { shape: 'landscape', caption: 'Dinner at Alma', image: { scene: 'restaurant', mood: 'dusk', alt: 'A candlelit terrace restaurant' } },
  { shape: 'portrait', caption: 'Ocean Suite', image: { scene: 'ocean-suite', mood: 'morning', alt: 'A suite opening to the sea' } },
  { shape: 'landscape', caption: 'The lighthouse path', image: { scene: 'trail', mood: 'golden', alt: 'A coastal path leading to a lighthouse' } },
  { shape: 'square', caption: 'The bathhouse', image: { scene: 'spa', mood: 'golden', alt: 'A vaulted stone bathhouse' } },
  { shape: 'wide', caption: 'The bay at dusk', image: { scene: 'boat', mood: 'dusk', alt: 'A boat on the bay at dusk' } },
]

/** Demo testimonials — replace with verified guest reviews (and their source) before launch. */
export const testimonials: Testimonial[] = [
  {
    quote: 'We came for four nights and stayed for seven. It’s the kind of place where you stop checking your phone without noticing.',
    name: 'Claire & Tom',
    origin: 'London',
    stay: 'Ocean Suite · September',
  },
  {
    quote: 'The long table dinner in the olive grove is one of the most beautiful evenings we have had anywhere. The team made our anniversary unforgettable.',
    name: 'Ana R.',
    origin: 'Lisbon',
    stay: 'Garden Room · June',
  },
  {
    quote: 'Three generations in the Hillside Residence, and somehow everyone got exactly the holiday they wanted.',
    name: 'The Becker family',
    origin: 'Munich',
    stay: 'Hillside Residence · August',
  },
]

/** FAQ answers: [[double brackets]] mark the property's real policy, to be confirmed before launch. */
export const faqs: Faq[] = [
  { question: 'What time is check-in?', answer: 'Check-in is from [[15:00]]. If you arrive earlier, we’ll store your luggage and you’re welcome to use the pool, bathhouse and restaurant while your room is prepared.' },
  { question: 'What time is check-out?', answer: 'Check-out is by [[11:00]]. Late check-out until [[14:00]] can be requested and is subject to availability [[and a supplement]].' },
  { question: 'Is breakfast included?', answer: 'Breakfast is [[included in all direct-booking rates]] and served on the Alma terrace from [[07:30 to 10:30]]. In-room and villa breakfast are available on request.' },
  { question: 'Is parking available?', answer: '[[Free on-site parking]] is available for all guests. We also have [[two electric-vehicle chargers]].' },
  { question: 'Are pets allowed?', answer: '[[Well-behaved dogs are welcome in Garden Rooms and the Private Villa for a supplement of €XX per night.]] Please let us know when booking.' },
  { question: 'Do you offer airport transfers?', answer: 'Yes. Private transfers from Sarenne International ([[approx. 40 minutes]]) can be arranged when you book or by contacting the concierge. [[Rates from €XX each way.]]' },
  { question: 'Can experiences be booked in advance?', answer: 'Yes — and we recommend it for summer stays. Add experiences when you book, or contact the concierge before you arrive. Some experiences are seasonal or depend on the weather.' },
  { question: 'What is the cancellation policy?', answer: '[[Flexible rates can be cancelled free of charge up to 14 days before arrival. Non-refundable rates are charged in full at booking.]] Full terms are shown before you confirm any reservation.' },
]

/** Seasonal packages / offers — production should load these from the booking engine or CMS. */
export const offers: Offer[] = [
  { slug: 'stay-longer', title: 'Stay longer', summary: 'Your fourth night is on us, with breakfast daily.', validity: 'October–April' },
  { slug: 'harvest-season', title: 'Harvest season', summary: 'Three nights, the olive harvest experience and a long table dinner.', validity: 'Late October–November' },
]

export const bookingCta = {
  eyebrow: 'Book direct',
  title: 'Your next escape starts here.',
  body: 'Choose your dates and we’ll show you what’s available. Booking direct means the best available rate and a team who will help plan the rest.',
  perks: ['Best available rate', 'Breakfast included', 'Flexible cancellation options', 'Concierge trip planning'],
  image: { scene: 'pool', mood: 'dusk', alt: 'A pool glowing at dusk with the sea beyond' } satisfies MediaAsset,
}
