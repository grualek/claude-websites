# Healthcare Clinic Website — Prototype

A pitch-ready website prototype for a private medical practice (primary care, specialist, dental,
diagnostic, physiotherapy or multi-specialty clinic). Built with **React + TypeScript + Vite + Tailwind CSS v4**.

> All business details, clinicians and testimonials are **fictional placeholders** and are labelled as demo
> content in the UI and in the content model (`isDemo: true`).

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # typecheck + production build to dist/
npm run preview   # serve the production build
```

## Online preview (GitHub Pages)

`.github/workflows/deploy-pages.yml` builds the site and publishes it to GitHub Pages on every push to
`main` or `claude/healthcare-clinic-prototype-r3t0k6` (or manually from the Actions tab).
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The site is then served at `https://<owner>.github.io/<repo>/`.

## Structure

```
src/
  content/          ← all copy & data (CMS-ready, typed)
    types.ts          content model (Service, Specialist, FaqItem, InfoTopic, …)
    clinic.ts         name, address, phone, hours, nav, announcement, disclaimers
    services.ts       services + trust strip
    people.ts         specialists + testimonials (demo-flagged)
    patients.ts       patient journey, patient info topics, FAQs, legal placeholders
  lib/seo.ts        title/description + schema.org JSON-LD (MedicalClinic, FAQPage) built from content
  components/
    ui/               Button, Icon, SectionHeader/Eyebrow, Dialog, Media, Portrait
    layout/           AnnouncementBar, Header (+ mobile menu), MobileBookingBar, Footer, Logo
    sections/         Hero + TrustStrip, Services, FeaturedCare, Specialists, Journey,
                      PatientInfo, Testimonials, Faq, Contact, FinalCta
    dialogs/          booking form, service / specialist / info panels, DialogProvider
  styles/index.css  design tokens (@theme), base styles, reduced-motion rules
```

## Adapting it for a real clinic

- **Content** — edit the files in `src/content/`. To connect a headless CMS, replace those modules with
  fetchers returning the same types.
- **Photography** — every image slot accepts `{ src, srcSet, alt }`. Without a `src`, an illustrated
  placeholder renders, so layouts can be reviewed before a photo shoot. Add images to `public/` (WebP/AVIF,
  multiple widths) and set `src`/`srcSet` in content.
- **Booking** — `BookingDialog` (`src/components/dialogs/Dialogs.tsx`) validates and shows a confirmation but
  sends nothing. Wire `onSubmit` to the practice-management or booking system.
- **Routes** — services and specialists carry a `slug`. "Learn more" / "View profile" open panels in the
  prototype; with a router they can navigate to `/services/:slug` and `/specialists/:slug`.
- **SEO** — `<title>`, meta description, Open Graph and JSON-LD are injected into `index.html` at build time
  by a small Vite plugin (`vite.config.ts`), so they are present in the static HTML. Add real `geo`
  coordinates in `clinic.ts`. Demo clinicians are excluded from structured data automatically.

## Accessibility

Semantic landmarks and a single H1 with logical H2/H3 levels; a skip link; native `<dialog>` for modals and the mobile
menu (focus trap, Escape to close, focus return); an ARIA accordion for FAQs; labelled form fields with inline
errors; visible focus rings; 44px+ touch targets; WCAG AA colour contrast; and `prefers-reduced-motion` support.
