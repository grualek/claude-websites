import { useState, type FormEvent } from 'react'
import type { ListingType } from '../../content/types'
import { showcaseProperty } from '../../content/properties'
import { getArea } from '../../content/areas'
import { formatPrice } from '../../lib/format'
import { useApp } from '../../state/AppState'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Media } from '../ui/Media'
import { Eyebrow } from '../ui/SectionHeader'
import { ListingTypeToggle, SelectField, locationOptions, priceOptions, typeOptions } from '../search/Filters'
import type { PropertyType } from '../../content/types'

export function Hero() {
  const { runSearch, openEnquiry, openProperty } = useApp()
  const area = getArea(showcaseProperty.address.areaId)

  return (
    <section aria-labelledby="hero-title" className="relative pb-6 lg:pb-10">
      <div className="container-page pt-10 sm:pt-14 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <Eyebrow className="animate-fade-up">Buy · Rent · Sell · Manage — Wrenfield &amp; beyond</Eyebrow>
            <h1
              id="hero-title"
              className="font-editorial animate-fade-up mt-6 text-[3.4rem] leading-[0.9] sm:text-[5rem] lg:text-[6.25rem] xl:text-[7.25rem]"
              style={{ animationDelay: '80ms' }}
            >
              Find a place that <em className="text-olive-deep">feels</em> like yours.
            </h1>
          </div>
          <div className="animate-fade-up lg:col-span-4 lg:pb-3" style={{ animationDelay: '160ms' }}>
            <p className="max-w-md text-[1.0625rem] leading-relaxed text-ink-soft">
              We’re an independent, local property team helping people buy, sell, rent and look after homes across Wrenfield — with
              straight advice and one named advisor from first conversation to keys.
            </p>
            <div id="hero-ctas" className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start 2xl:flex-row">
              <Button size="lg" icon="arrow-right" onClick={() => runSearch({})}>
                Explore Properties
              </Button>
              <Button size="lg" variant="secondary" onClick={() => openEnquiry('advisor')}>
                Speak With an Advisor
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page mt-10 lg:mt-14">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-sand sm:aspect-[16/10] lg:aspect-[21/9]">
            <Media
              priority
              asset={{
                scene: 'interior',
                tone: 'golden',
                view: 'garden',
                alt: 'Light-filled sitting room with floor-to-ceiling windows opening onto a garden',
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
            <button
              type="button"
              onClick={() => openProperty(showcaseProperty.id)}
              className="group absolute top-4 right-4 flex max-w-[16rem] items-center gap-3 rounded-[3px] bg-paper/92 p-3 pr-4 text-left backdrop-blur-sm transition-colors hover:bg-paper sm:top-6 sm:right-6"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-olive-deep">
                <Icon name="sparkle" className="size-4.5" />
              </span>
              <span className="text-xs leading-snug text-muted">
                <span className="eyebrow block text-[0.6rem] text-olive">New instruction</span>
                <span className="mt-0.5 block font-semibold text-ink">
                  {showcaseProperty.title}, {area?.name}
                </span>
                {formatPrice(showcaseProperty)}
              </span>
            </button>
          </div>

          <HeroSearch />
        </div>
      </div>
    </section>
  )
}

/** Floating quick search. Hands its values to the main search module and scrolls to results. */
function HeroSearch() {
  const { runSearch } = useApp()
  const [listingType, setListingType] = useState<ListingType>('sale')
  const [areaId, setAreaId] = useState('')
  const [propertyType, setPropertyType] = useState<PropertyType | ''>('')
  const [maxPrice, setMaxPrice] = useState(0)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    runSearch({ listingType, areaId, propertyType, maxPrice })
  }

  return (
    <form
      role="search"
      aria-label="Quick property search"
      onSubmit={onSubmit}
      className="relative z-10 mx-2 -mt-28 rounded-[4px] border border-line bg-paper p-4 shadow-[0_30px_70px_-35px_rgb(31_30_27/0.55)] sm:mx-6 sm:-mt-20 sm:p-5 lg:absolute lg:right-8 lg:bottom-8 lg:left-8 lg:mx-0 lg:mt-0 xl:right-auto xl:w-[64rem]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ListingTypeToggle
          value={listingType}
          onChange={(v) => {
            setListingType(v)
            setMaxPrice(0)
          }}
        />
        <a href="#search" className="hidden items-center gap-2 text-[0.8125rem] font-semibold text-ink underline-offset-4 hover:underline sm:inline-flex">
          <Icon name="filter" className="size-4" />
          Advanced search
        </a>
      </div>
      <div className="mt-4 grid gap-x-0 gap-y-3 sm:grid-cols-3 lg:grid-cols-[1.25fr_1fr_1fr_auto] lg:items-end">
        <SelectField bare label="Location" value={areaId} onValue={setAreaId} options={locationOptions} className="border-b border-line pb-2 sm:border-r sm:border-b-0 sm:pr-5 sm:pb-0" />
        <SelectField
          bare
          label="Property type"
          value={propertyType}
          onValue={(v) => setPropertyType(v as PropertyType | '')}
          options={typeOptions}
          className="border-b border-line pb-2 sm:border-r sm:border-b-0 sm:px-5 sm:pb-0"
        />
        <SelectField bare label="Max price" value={String(maxPrice)} onValue={(v) => setMaxPrice(Number(v))} options={priceOptions(listingType, 'max')} className="pb-2 sm:px-5 sm:pb-0" />
        <Button type="submit" size="lg" icon="search" className="w-full sm:col-span-3 lg:col-span-1 lg:w-auto">
          Search
        </Button>
      </div>
    </form>
  )
}
