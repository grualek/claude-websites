# Hollis & Vale — real estate website prototype

A pitch-ready website for a real estate / lettings / property management business (fictional: *Hollis & Vale, Wrenfield*).
React 19 + TypeScript + Tailwind CSS v4, built with Vite.

Preview: https://grualek.github.io/claude-websites/real-estate/

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build to dist/
```

## Structure

```
src/
  content/        Typed content layer: company, properties, areas, services, insights, FAQs
    types.ts      Property, Area, Agent, Insight… shapes a property feed / CMS should return
  lib/
    search.ts     Pure filter + sort for listings (maps 1:1 to future query params)
    routes.ts     Canonical URL architecture (/buy/{area}/, /property/{slug}/, /areas/{slug}/…)
    seo.ts        Meta + JSON-LD (RealEstateAgent, RealEstateListing ItemList, FAQPage), injected at build
    format.ts     Price / area / date formatting (GBP, sq ft ↔ m²)
  state/          App state: dialogs, shared search filters, saved homes
  components/
    property/     PropertyCard, PropertyFacts, StatusBadge, SaveButton (reusable)
    search/       Reusable filters (Buy/Rent toggle, selects, bedroom chips, feature chips) + AreaMap
    sections/     One component per page section (Hero → FinalCta)
    dialogs/      Property detail + intent-aware enquiry forms (viewing, valuation, management, advisor, alerts)
    media/        Art-directed SVG scenes used in place of photography
    ui/           Button, Dialog (native <dialog>), Form primitives, Icon, Media, SectionHeader
```

## Going live

- **Photography**: every image is a `MediaAsset`. Add `src` / `srcSet` (from your image CDN) and the illustrated
  scene is replaced by a lazy-loaded, responsive `<img>` with no layout changes.
- **Listings feed**: replace `content/properties.ts` with an adapter (Reapit, Alto, Jupix, BLM/RTDF…) that returns
  `Property[]`. `searchProperties()` becomes the API query; `mapPosition` becomes lat/lng for a real map provider.
- **Pages**: introduce a router / SSG (Next.js, Astro) using the patterns in `lib/routes.ts` for listing pages,
  area guides, insights articles, agent profiles and the alerts sign-up.
- **Lead forms**: `useLeadForm` validates and shows success states; wire `onValid` to your CRM / lead-routing endpoint.
  Each form posts an `intent` (viewing, valuation, management, advisor, alerts, general) and optional `propertyId`.
- **Launch**: remove `<meta name="robots" content="noindex">` from `index.html` and replace all placeholder details
  in `content/company.ts` (phone numbers use the Ofcom drama range, emails use `.example`).
