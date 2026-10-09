# Larkmoor College — education website prototype

A pitch-ready website for an education provider (fictional: *Larkmoor College, an independent college of applied learning*).
Built to adapt to private schools, universities, colleges, training academies, professional and executive education,
online learning businesses, language schools, vocational institutions and tutoring organisations.

React 19 + TypeScript + Tailwind CSS v4, built with Vite. Editorial direction: warm cream and ivory, deep navy, muted
academic blue, soft green and a restrained warm-yellow accent; Fraunces (display serif) + Instrument Sans (UI).

Preview: https://grualek.github.io/claude-websites/education/

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build to dist/
```

## Page structure

Utility bar (every secondary conversion) → sticky header → Hero (headline, CTAs, program search, open-day card) →
01 Programs (program finder) → 02 Flagship program → 03 Why Larkmoor → 04 Learning experience (campus spaces) →
05 Admissions (4-step journey + key dates) → 06 Student life → 07 Faculty → 08 Outcomes & experience →
09 Student stories → 10 Resources → 11 News & events → 12 FAQ → Admissions CTA → 13 Contact → Footer.

The primary conversion is **Explore Programs** (header, hero, flagship, mobile action bar, footer program links). Secondary
conversions — **Apply Now, Book a Visit, Request Information, Talk to Admissions, Download Prospectus** — each open a
tailored form (one shared `EnquiryForm`, fields adapt to the intent, with program pre-selection when opened from a program).

### Program discovery

Level filter (All · Undergraduate · Postgraduate · Professional · Online · Short Courses, with counts), keyword search
(name, award, subject, synonyms such as "coding" or "ux"), study-format filter and a live result count. The hero search and
"Browse" chips feed the same query. "Online" also surfaces any fully online program at other levels.

## Structure

```
src/
  content/          Typed content layer — swap demo content here without touching components
    institution.ts  Name, address, contact, admissions hours, directions, social, navigation
    programs.ts     Program catalogue (award, level, duration, format, start, modules, pathways, entry, keywords)
    people.ts       Educators and student stories
    site.ts         Hero, pillars, spaces, admissions steps, key dates, student life, outcomes, resources,
                    events, news/guides, FAQs, closing CTA
    types.ts        Program, Educator, StudentStory, Space, Resource, CampusEvent, Article, Faq, MediaAsset… (CMS shapes)
  lib/
    routes.ts       Canonical URL architecture (see SEO below)
    seo.ts          JSON-LD injected into index.html at build time
    programs.ts     Program filtering / search
    enquiry.ts      Copy for each secondary conversion
    format.ts       Dates, [[placeholder]] parsing
    useReveal.ts    Progressive scroll-reveal + active-section tracking (both respect reduced motion)
  state/            Program query + open detail view / enquiry
  components/
    sections/       One component per page section
    programs/       ProgramCard + CategoryChip (reused in the grid, program pages and "related programs")
    forms/          EnquiryForm (apply · visit · info · talk · prospectus)
    dialogs/        Program, educator, story, article and enquiry views (future standalone pages)
    media/          Art-directed SVG scenes (17 learning spaces × morning / day / evening) in place of photography
    layout/         Header (utility bar + mobile menu), Footer, Logo, MobileCtaBar
    ui/             Button, Dialog (native <dialog>), Form primitives, Icon, Media, Portrait, SectionHeader
```

## SEO architecture

`lib/routes.ts` defines the production URL map, already used by structured data and shown as "Future page" in each dialog:

| Search intent | Route |
| --- | --- |
| Program searches ("msc data science") | `/programs/{level}/{slug}/` |
| Level hubs ("part-time courses", "short courses") | `/programs/{level}/` |
| Course search / filters | `/programs/?q=` (also the `WebSite` SearchAction) |
| Subject searches ("environmental science degree") | `/subjects/{subject}/` |
| Admissions searches ("how to apply", "entry requirements", "scholarships") | `/admissions/{topic}/`, `/apply/` |
| Local education searches ("college in Millbrook", "campus tour") | `/visit/`, `/campus/{space}/`, `/contact/` |
| Informational searches ("full-time vs part-time study") | `/guides/{slug}/`, `/news/{slug}/` |
| Faculty | `/faculty/{slug}/` |
| Student stories, events, resources | `/stories/{slug}/`, `/events/{slug}/`, `/resources/{slug}/` |
| FAQ content | `/faq/` |

Structured data (built from the content layer, crawlable without JS): `CollegeOrUniversity` / `EducationalOrganization`
with an admissions `ContactPoint` and hours; an `ItemList` of `Course` items with `CourseInstance` (mode, workload),
credential, duration and syllabus; `Person` for each educator; `EducationEvent` for events; news/guide articles; `FAQPage`;
`WebSite` with a course `SearchAction`. Demo stories are deliberately **not** emitted as Review markup.

## Content strategy

Each content type is a typed collection, so new program, faculty, campus, admissions, story, event, blog, guide and FAQ
pages can be added by appending content and rendering it with the existing components (the dialog views are the page
templates). To expand to a multi-page site, add a router or SSG (Astro, Next.js) using `lib/routes.ts`.

## Accessibility

- Skip link, landmarks, one `h1` and a logical heading outline; `aria-current` marks the section in view.
- Native `<dialog>` for menu, detail views and forms: focus trapping, Escape to close, focus return.
- Filters are toggle buttons (`aria-pressed`) with a live result count; search moves focus to the results heading.
- Every field has a visible label; errors are linked with `aria-describedby` and focus moves to the first invalid field.
- Cards use a stretched-button pattern with a visible focus ring; the FAQ uses native `<details>`.
- Text meets WCAG AA on every surface; touch targets are 40–44px or larger.
- `prefers-reduced-motion` disables scroll reveals, the subject ticker and smooth scrolling.

## Going live

- **Content**: everything in `src/content/` is fictional. Phone numbers use the reserved 555-01XX range; emails use `.example`.
- **Placeholders**: text in `[[double brackets]]` (dates, entry requirements, hours, scholarship details) is highlighted on
  the page for confirmation; structured data strips the brackets.
- **Claims**: no employment statistics or guaranteed outcomes; career "pathways" are framed as directions students explore.
  Scholarship amounts are intentionally not stated.
- **Imagery**: every image is a `MediaAsset`. Add `src` / `srcSet` (and optionally `focus`) to swap an illustration for a
  lazy, responsive photo. Educator `photo` replaces the illustrated portrait.
- **Forms**: connect `useForm`'s `onValid` (in `EnquiryForm`) to the admissions CRM / student-information system.
- **Launch**: remove `<meta name="robots" content="noindex">` from `index.html` and set `institution.url`.
