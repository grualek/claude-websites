import { useId, useState, type FormEvent } from 'react'
import { hero, subjects } from '../../content/site'
import { programs } from '../../content/programs'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { WithPlaceholders } from '../ui/Text'

/**
 * Editorial hero: oversized serif headline, primary/secondary CTAs and a program search on the left;
 * an arched image collage with an open-day card on the right. A subject ticker closes the section.
 */
export function Hero() {
  const { explore, enquire } = useApp()
  const [q, setQ] = useState('')
  const searchId = useId()

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    explore({ q: q.trim() })
  }

  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-page grid gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pt-16 lg:pb-24">
        {/* copy */}
        <div className="flex flex-col justify-center lg:col-span-6 xl:col-span-6">
          <p className="eyebrow animate-fade-up flex items-center gap-3 text-blue">
            <span aria-hidden="true" className="h-px w-8 bg-ink/25" />
            Undergraduate · Postgraduate · Professional · Online
          </p>
          <h1 id="hero-title" className="font-editorial animate-fade-up mt-7 text-[3.2rem] leading-[0.98] [animation-delay:80ms] sm:text-[4.6rem] lg:text-[5rem] xl:text-[6.1rem]">
            {hero.title.lead} <em className="highlight font-[350] italic">{hero.title.emphasis}</em>
          </h1>
          <p className="animate-fade-up mt-7 max-w-xl text-[1.12rem] leading-relaxed text-muted [animation-delay:160ms] sm:text-[1.2rem]">{hero.body}</p>

          <div className="animate-fade-up mt-9 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:items-center">
            <Button size="lg" arrow onClick={() => explore()}>
              Explore Programs
            </Button>
            <Button size="lg" variant="secondary" icon="map" onClick={() => enquire('visit')}>
              Visit Our Campus
            </Button>
          </div>

          {/* program search */}
          <form role="search" aria-label="Find a program" onSubmit={onSearch} className="animate-fade-up mt-10 max-w-xl [animation-delay:320ms]">
            <label htmlFor={searchId} className="text-[0.85rem] font-semibold text-ink">
              Find your program
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-full border border-line bg-paper p-1.5 pl-5 shadow-[0_16px_40px_-30px_rgb(20_33_58/0.6)] transition-colors focus-within:border-blue">
              <Icon name="search" className="size-5 shrink-0 text-muted" />
              <input
                id={searchId}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Try “data” or “part-time”"
                className="min-h-11 w-full min-w-0 bg-transparent text-[1rem] text-ink placeholder:text-muted focus:outline-none"
                list={`${searchId}-suggestions`}
                autoComplete="off"
              />
              <datalist id={`${searchId}-suggestions`}>
                {programs.map((p) => (
                  <option key={p.slug} value={p.name} />
                ))}
              </datalist>
              <Button type="submit" size="sm" variant="sun" className="min-h-11 shrink-0">
                Search
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[0.82rem] text-muted">Browse:</span>
              {hero.quickLinks.map((l) => (
                <button
                  key={l.label}
                  type="button"
                  onClick={() => explore({ category: l.category })}
                  className="min-h-10 rounded-full border border-line bg-cream px-3.5 text-[0.82rem] font-medium text-ink transition-colors hover:border-ink hover:bg-paper"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* image collage */}
        <div className="relative lg:col-span-6 xl:col-span-6">
          <div className="relative mx-auto aspect-[4/5] max-w-[38rem] sm:aspect-[5/5] lg:aspect-[4/5] lg:max-w-none">
            <div className="absolute inset-y-0 right-0 left-[8%] overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-stone">
              <Media asset={hero.images.main} priority />
            </div>
            <div className="absolute bottom-[8%] left-0 w-[42%] overflow-hidden rounded-[22px] border-[6px] border-cream shadow-[0_30px_60px_-30px_rgb(20_33_58/0.6)]">
              <div className="aspect-[4/5]">
                <Media asset={hero.images.inset} />
              </div>
            </div>
            {/* sticker */}
            <div aria-hidden="true" className="absolute right-[6%] bottom-[-3%] hidden size-28 items-center justify-center rounded-full bg-sun text-center text-navy shadow-lg sm:flex">
              <span className="font-editorial text-[1rem] leading-tight">
                Small
                <br />
                <em>classes,</em>
                <br />
                big ideas
              </span>
            </div>
          </div>
          {/* open day card — below the image on phones, floating on larger screens */}
          <div className="on-dark relative mx-auto mt-5 max-w-[38rem] rounded-[20px] bg-navy p-5 text-on-dark shadow-[0_30px_60px_-30px_rgb(20_33_58/0.7)] sm:absolute sm:top-[9%] sm:right-0 sm:mt-0 sm:w-[17rem] sm:p-6 lg:right-[-2%]">
            <p className="eyebrow flex items-center gap-2 text-sun">
              <Icon name="calendar" className="size-4" />
              {hero.openDay.label}
            </p>
            <p className="font-editorial mt-3 text-[1.6rem] leading-tight text-on-dark">
              <WithPlaceholders text={hero.openDay.date} />
            </p>
            <p className="mt-2 text-[0.85rem] leading-snug text-on-dark-muted">{hero.openDay.note}</p>
            <button type="button" onClick={() => enquire('visit')} className="on-dark mt-4 inline-flex min-h-10 items-center gap-2 text-[0.88rem] font-semibold text-on-dark underline decoration-sun decoration-2 underline-offset-[6px] hover:text-sun">
              Book a visit <Icon name="arrow-right" className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* subject ticker */}
      <div className="marquee border-y border-line bg-paper/60">
        <div className="overflow-hidden py-5">
          <ul aria-label="Subject areas" className="animate-marquee flex w-max gap-10 pr-10">
            {[...subjects, ...subjects].map((s, i) => (
              <li key={i} aria-hidden={i >= subjects.length || undefined} className="font-editorial flex items-center gap-10 text-[1.6rem] whitespace-nowrap text-ink/80 italic">
                {s}
                <span aria-hidden="true" className="size-2 rounded-full bg-sun not-italic" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
