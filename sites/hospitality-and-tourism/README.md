# Casa Velora — hospitality & tourism website prototype

A pitch-ready website for a hotel, resort, villa, lodge, retreat or experience provider (fictional: *Casa Velora, a boutique
coastal estate on the Sarenne Coast*). React 19 + TypeScript + Tailwind CSS v4, built with Vite. Editorial direction: warm
ivory, sand and deep charcoal with muted olive and terracotta accents, Cormorant Garamond (serif) + Manrope (UI).

Preview: https://grualek.github.io/claude-websites/hospitality-and-tourism/

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build to dist/
```

## Page structure

Header → Hero (with availability search) → Stay (introduction) → Rooms & suites → Featured experience → Experiences →
Dining → Destination (+ things to do) → About (philosophy) → Gallery → Guest stories → Journal → FAQ → Booking CTA
(+ seasonal offers) → Contact (map, directions, enquiry form) → Footer (newsletter, links, policies).

The primary conversion is **Book Your Stay**. It appears in the header, the hero, on every room, in the final booking section
and in a small-screen booking bar that shows after the hero and hides while the booking section or footer is on screen.
Secondary actions (Explore rooms, View experiences, Check availability, Reserve a table, Plan your trip, Contact us) send
visitors to the right detail view or pre-fill the enquiry form.

### Booking flow

Dates and guests are shared across every availability form. Choosing **Check availability** opens the booking dialog:

1. **Choose your room.** A demo availability check lists rooms that fit the party, with indicative nightly and total rates
   and gentle low-stock notes. When the visitor started from a room, that room is shown first.
2. **Your details.** Name, email, optional experiences and requests, next to a stay summary.
3. **Request received.** A confirmation that makes clear it's a demo.

## Structure

```
src/
  content/        Typed content layer — swap demo content here without touching components
    property.ts   Name, address, contact, check-in/out times, directions, navigation
    rooms.ts      Room types (capacity, size, beds, view, amenities, indicative rate, inventory, images)
    experiences.ts  Experiences + the featured "long table" experience
    dining.ts     Restaurant: cuisine, atmosphere, hours, sample menu
    destination.ts  Destination highlights + "things to do" list
    journal.ts    Journal articles / travel guides
    site.ts       Hero, intro, story pillars, gallery, testimonials, FAQs, seasonal offers, booking CTA copy
    types.ts      Room, Experience, DiningVenue, DestinationHighlight, Article, Offer, Faq, MediaAsset… (CMS shapes)
  lib/
    booking.ts    Stay validation, date helpers, demo availability, booking-engine adapter (demo | redirect)
    routes.ts     Canonical URL architecture (/rooms/{slug}/, /experiences/{slug}/, /dining/, /destination/{slug}/,
                  /destination/things-to-do/, /journal/{slug}/, /offers/{slug}/, /faq/)
    seo.ts        JSON-LD: Hotel/LodgingBusiness (rooms, offers, amenities, check-in/out), Restaurant, experiences
                  (TouristTrip), things to do (TouristAttraction), journal (Article), FAQPage, WebSite — injected into
                  index.html at build time so crawlers see it without JS
    format.ts     Money/date formatting, [[placeholder]] parsing
    useReveal.ts  Progressive scroll-reveal + active-section tracking (both respect reduced motion)
  state/          Shared stay, open detail view, enquiry pre-fill
  components/
    sections/     One component per page section
    booking/      StayForm (hero / panel / dialog variants) and BookingDialog
    dialogs/      Room, experience, article, dining and gallery views (future standalone pages)
    media/        Art-directed SVG scenes (18 scenes × morning / golden hour / dusk) in place of photography
    layout/       Header (+ mobile menu), Footer, Logo, MobileBookBar
    ui/           Button, Dialog (native <dialog>), Form primitives, Icon, Media, SectionHeader, placeholders
```

## Accessibility

- Skip link, landmark regions, and one `h1` with a logical `h2`/`h3` outline. `aria-current` marks the section in view.
- Native `<dialog>` for the booking flow, detail views and menu, which gives focus trapping, Escape to close and focus return.
  The gallery lightbox also supports the ← and → keys.
- Every field has a visible label. Errors are linked via `aria-describedby`, and focus moves to the first invalid field.
- Cards use a "stretched button" pattern, so the whole card is one target and the heading keeps its semantics.
- The FAQ uses native `<details>`. Touch targets are 40–44px or larger, and text meets WCAG AA contrast on every surface.
- `prefers-reduced-motion` turns off the hero zoom, scroll reveals and smooth scrolling.

## Going live

- **Content**: replace everything in `src/content/`. The property, rates, reviews and people are fictional. Phone numbers use
  the reserved 555-01XX range and emails use the `.example` TLD.
- **Policies**: text wrapped in `[[double brackets]]` (FAQ answers, restaurant hours, the responsibility pillar) is highlighted
  on the page as a placeholder for the property's confirmed policy. JSON-LD strips the brackets.
- **Sustainability**: the "Responsibility" pillar makes no certification claims. Add only verified commitments.
- **Reviews**: demo testimonials are deliberately *not* emitted as Review/AggregateRating markup. Use verified reviews (and
  their source) before adding rating markup.
- **Photography**: every image is a `MediaAsset`. Add `src` / `srcSet` (and optionally `focus`) and the illustration is replaced
  by a lazy, responsive `<img>` with no layout changes. Above-the-fold imagery loads eagerly with high priority.
- **Booking engine**: replace `checkAvailability` in `lib/booking.ts` with your PMS / booking-engine API, or set
  `bookingEngine.mode = 'redirect'` and point `buildUrl` at the engine's deep-link format. Then "Select" hands off with dates,
  guests and room.
- **Pages**: add a router or SSG (Next.js, Astro) using the paths in `lib/routes.ts` for room, experience, destination,
  journal, offer and FAQ pages. The dialogs already hold the content for those pages.
- **Forms**: `useForm` validates and shows the success state. Connect `onValid` to your reservations inbox or CRM.
- **Launch**: remove `<meta name="robots" content="noindex">` from `index.html` and set `property.url`.
