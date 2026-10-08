# Calder & Rowe — law firm / professional services website prototype

A pitch-ready website for a law firm or other high-trust professional services business (fictional: *Calder & Rowe, Eastbridge*).
React 19 + TypeScript + Tailwind CSS v4, built with Vite. Editorial direction: warm ivory and stone, near-black type,
espresso and muted bronze accents, Newsreader (serif) + Inter (UI).

Preview: https://grualek.github.io/claude-websites/legal/

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build to dist/
```

## Page structure

Header → Hero → Proof bar → Practice areas → Featured practice → Attorneys → How we work → Why clients choose us →
Insights → Client perspective & experience → FAQ → Consultation form → Final CTA → Footer (with legal disclaimer).

The primary conversion is **Schedule a Consultation**. Every CTA scrolls to the form and focuses the first field. When the
context is known (a practice area or an attorney), it also pre-selects the matter type. On mobile, an action bar (Call /
Schedule) appears after the hero and hides while the form is on screen.

## Structure

```
src/
  content/        Typed content layer — swap demo content here without touching components
    firm.ts       Name, address, phone, email, hours, navigation, disclaimer
    practices.ts  Practice areas (+ featured practice section copy)
    attorneys.ts  Attorney profiles (credentials, admissions, bios, portraits)
    insights.ts   Articles
    site.ts       Hero, proof points, process steps, principles, testimonials, matter types, FAQs
    types.ts      PracticeArea, Attorney, Insight, Faq, Testimonial, MediaAsset… shapes a CMS should return
  lib/
    routes.ts     Canonical URL architecture (/practice-areas/{slug}/, /attorneys/{slug}/, /insights/{slug}/,
                  /locations/{city}/{practice}/)
    seo.ts        Meta + JSON-LD (LegalService/LocalBusiness, Person per attorney, Article list, FAQPage, WebSite),
                  injected into index.html at build time so crawlers see it without JS
    useReveal.ts  Progressive scroll-reveal + active-section tracking (both respect reduced motion)
  state/          Detail views (practice / attorney / article dialogs) and consultation pre-fill
  components/
    sections/     One component per page section
    dialogs/      Practice, attorney profile and article reader views (future standalone pages)
    media/        Art-directed SVG scenes used in place of photography
    layout/       Header (+ mobile menu), Footer, Logo, MobileActionBar
    ui/           Button, Dialog (native <dialog>), accessible Form primitives, Icon, Media, SectionHeader
```

## Accessibility

- Skip link, landmark regions, and one `h1` with a logical `h2`/`h3` outline.
- `aria-current` marks the active navigation item.
- Dialogs use native `<dialog>`, which gives focus trapping, Escape to close and focus return.
- The FAQ uses native `<details>`.
- Form fields have visible labels. Errors are linked via `aria-describedby`, and focus moves to the first invalid field.
- Strong bronze focus rings and touch targets of 44px or more.
- Text contrast meets WCAG AA on every surface.
- Animations respect `prefers-reduced-motion`.

## Going live

- **Content**: replace everything in `src/content/`. The firm, attorneys, admissions and testimonials are fictional.
  Phone numbers use the reserved 555-01XX range and emails use the `.example` TLD. Check the testimonials, the
  "representative matter types" and any attorney-advertising wording against your jurisdiction's professional-conduct rules.
- **Photography**: every image is a `MediaAsset`. Add `src` / `srcSet` and the illustration is replaced by a lazy,
  responsive `<img>` with no layout changes.
- **Pages**: add a router or SSG (Next.js, Astro) using the paths in `lib/routes.ts` for practice-area, attorney, article and
  local landing pages (e.g. `/locations/eastbridge/family-law/`). The dialogs already hold the content for those pages.
- **Intake**: `useIntakeForm` validates the form and shows the success state. Connect its `onValid` callback to your intake / CRM
  endpoint, and run conflict checks before engagement.
- **Launch**: remove `<meta name="robots" content="noindex">` from `index.html` and set `firm.url`.
