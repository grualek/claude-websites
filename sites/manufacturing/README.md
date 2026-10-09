# Ferrovane: manufacturing / industrial website prototype

A pitch-ready B2B website for a manufacturer, fabricator, CNC shop, automation or OEM supplier (fictional:
*Ferrovane Precision Manufacturing, Harlow Falls, OH*). Built with React 19, TypeScript and Tailwind CSS v4 on Vite.

The visual direction is industrial and editorial. Surfaces are warm light gray and off-white, with graphite and deep
charcoal, muted steel blue, and a restrained safety-orange accent. Type is Archivo (bold, slightly expanded headlines),
Inter (UI/body) and JetBrains Mono (technical labels and large numerals).

Preview: https://grualek.github.io/claude-websites/manufacturing/

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build to dist/
```

## Page structure

Utility bar + header → Hero (Fig. 01 machining cell with technical overlay) → Proof bar → Capabilities (8) → Featured
capability ("From specification to finished component.") → Product families → Industries (8) → Process timeline
(horizontal on desktop, vertical on mobile) → Quality (pillars, illustrative inspection record, certification
placeholders) → Facility & technology → Case studies (3) → Resources (6) → RFQ form → Final CTA → Footer.

**Primary conversion:** *Request a Quote*. Every quote CTA scrolls to the RFQ form and focuses the first field. When the
context is known (a capability, an industry or a case study), the CTA also pre-selects the project type or industry.

**Secondary conversions:**
- *Talk to an Engineer*, *Contact Sales* and *Download Brochure* open a compact lead dialog.
- *Explore / View Capabilities* and *View Industries* open detail views.
- On mobile, an action bar (Engineer / Request a Quote) appears after the hero and hides while the RFQ form is on screen.

## Structure

```
src/
  content/          Typed content layer — swap demo content here without touching components
    company.ts      Name, address, phones, emails, hours, navigation
    capabilities.ts Capabilities (+ featured capability copy)
    industries.ts   Industries served
    products.ts     Product families
    caseStudies.ts  Demo projects (challenge / approach / result)
    resources.ts    Resource hubs + FAQs
    site.ts         Hero, proof points, process, quality, facility, RFQ options
    types.ts        Capability, Industry, ProductFamily, CaseStudy, Resource… shapes a CMS should return
  lib/
    routes.ts       Canonical URL architecture (see SEO below)
    seo.ts          Meta + JSON-LD (Organization/LocalBusiness with Service catalog, ProductGroup list,
                    case-study list, FAQPage, WebSite), injected into index.html at build time
    useReveal.ts    Progressive scroll-reveal + active-section tracking (both respect reduced motion)
  state/            Detail views, lead dialogs and RFQ pre-fill
  components/
    sections/       One component per page section
    dialogs/        Capability / industry / product / case-study / resource views (future pages) + lead dialog
    media/          Art-directed industrial SVG scenes used in place of photography
    layout/         Header (utility bar, mobile menu), Footer, Logo, MobileActionBar
    ui/             Button, Dialog (native <dialog>), accessible Form primitives incl. file drop, Icon, Media, SectionHeader
```

## SEO architecture

`lib/routes.ts` defines stable paths that the single-page prototype already uses as link `href`s. Search equity can
then be built on them from day one:

| Intent | Path |
| --- | --- |
| Manufacturing services | `/capabilities/{slug}/` (e.g. `/capabilities/cnc-machining/`) |
| Industry-specific | `/industries/{slug}/` |
| Product searches | `/products/{slug}/` |
| Location-based | `/locations/{city}/{capability}/` (e.g. `/locations/harlow-falls/cnc-machining/`) |
| Technical content | `/resources/{hub}/{article}/` |
| Proof | `/case-studies/{slug}/`, `/quality/certifications/`, `/downloads/` |

## Accessibility

- Skip link, landmark regions, and one `h1` with a logical `h2`/`h3` outline.
- `aria-current` marks the active navigation item.
- Dialogs use native `<dialog>`, which gives focus trapping, Escape to close and focus return.
- Form fields have visible labels. Errors are linked via `aria-describedby`, and focus moves to the first invalid field.
  The file upload is a real `<input type="file">` styled as a drop zone.
- Text contrast meets WCAG AA. Body text never uses the bright orange; orange buttons use charcoal text (4.9:1).
- Touch targets are 44px or more. Animations respect `prefers-reduced-motion`.

## Going live

- **Content**: replace everything in `src/content/`. The company, projects and contact details are fictional. Phone
  numbers use the 555-01XX range and emails use `.example`. Certifications appear only as labelled demo placeholders,
  and no production statistics are claimed. Add real machine lists, envelopes and tolerances only when verified.
- **Photography / video**: every image is a `MediaAsset`. Add `src` / `srcSet` and the illustrated scene is replaced by a
  lazy, responsive `<img>` with no layout changes. The hero is a good candidate for a muted looping video.
- **Pages**: add a router or SSG (Next.js, Astro) using the paths in `lib/routes.ts`. The dialogs already hold the content
  for capability, industry, product, case-study and resource pages.
- **RFQ**: `useLeadForm` validates the form and shows the success state. Connect its `onValid` callback to your CRM / ERP
  quoting inbox, and upload files through signed URLs.
- **Launch**: remove `<meta name="robots" content="noindex">` from `index.html` and set `company.url`.
