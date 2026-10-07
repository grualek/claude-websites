import { useEffect, useId, useMemo, useState } from 'react'
import { properties } from '../../content/properties'
import { getArea } from '../../content/areas'
import type { PropertyType } from '../../content/types'
import { formatCompactPrice, propertyTypeLabel } from '../../lib/format'
import { advancedFilterCount, defaultFilters, featureLabels, searchProperties, type SearchFilters, type SortKey } from '../../lib/search'
import { useApp } from '../../state/AppState'
import { PropertyCard } from '../property/PropertyCard'
import { AreaMap } from '../search/AreaMap'
import { BedroomPicker, FeatureChips, ListingTypeToggle, SelectField, locationOptions, priceOptions, typeOptions } from '../search/Filters'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { SectionHeader } from '../ui/SectionHeader'

const PAGE = 6

export function PropertySearch() {
  const { filters, setFilters, sort, setSort, saved, openEnquiry } = useApp()
  const [view, setView] = useState<'grid' | 'map'>('grid')
  const [moreOpen, setMoreOpen] = useState(false)
  const [visible, setVisible] = useState(PAGE)
  const moreId = useId()
  const viewName = useId()

  const results = useMemo(() => searchProperties(properties, filters, sort, saved), [filters, sort, saved])
  const advanced = advancedFilterCount(filters)

  // New criteria → start from the first page again
  useEffect(() => setVisible(PAGE), [filters, sort])

  const update = (patch: Partial<SearchFilters>) => setFilters((f) => ({ ...f, ...patch, savedOnly: false }))
  const reset = () => setFilters({ ...defaultFilters, listingType: filters.listingType })

  const chips = activeChips(filters, update)
  const noun = filters.listingType === 'rent' ? 'to rent' : 'for sale'

  return (
    <section id="search" aria-labelledby="search-title" className="scroll-mt-20 bg-sand py-20 sm:py-28">
      <div className="container-page">
        <SectionHeader
          id="search-title"
          index="02"
          eyebrow="Property search"
          title={
            <>
              Search every home <em>we represent</em>.
            </>
          }
          intro="Filter by neighbourhood, budget and the things that matter to you. Save homes as you go, switch to the map, or set up an alert so new instructions reach you first."
        />

        {/* Filter panel */}
        <form
          role="search"
          aria-label="Property search filters"
          onSubmit={(e) => e.preventDefault()}
          className="mt-12 rounded-[4px] border border-line bg-paper p-4 shadow-[0_24px_60px_-40px_rgb(31_30_27/0.5)] sm:p-6 lg:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ListingTypeToggle value={filters.listingType} onChange={(v) => update({ listingType: v, minPrice: 0, maxPrice: 0 })} />
            <button type="button" onClick={reset} className="text-[0.8125rem] font-semibold text-muted underline-offset-4 hover:text-ink hover:underline">
              Reset filters
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SelectField label="Location" value={filters.areaId} onValue={(v) => update({ areaId: v })} options={locationOptions} />
            <SelectField label="Property type" value={filters.propertyType} onValue={(v) => update({ propertyType: v as PropertyType | '' })} options={typeOptions} />
            <SelectField label="Min price" value={String(filters.minPrice)} onValue={(v) => update({ minPrice: Number(v) })} options={priceOptions(filters.listingType, 'min')} />
            <SelectField label="Max price" value={String(filters.maxPrice)} onValue={(v) => update({ maxPrice: Number(v) })} options={priceOptions(filters.listingType, 'max')} />
          </div>

          <div className="mt-6 flex flex-col gap-5 border-t border-line-soft pt-6 lg:flex-row lg:items-end lg:justify-between">
            <BedroomPicker value={filters.minBeds} onChange={(n) => update({ minBeds: n })} />
            <button
              type="button"
              aria-expanded={moreOpen}
              aria-controls={moreId}
              onClick={() => setMoreOpen((o) => !o)}
              className="inline-flex min-h-12 items-center gap-2.5 self-start rounded-[3px] border border-ink/25 px-5 text-sm font-semibold text-ink transition-colors hover:border-ink lg:self-auto"
            >
              <Icon name="filter" className="size-4.5" />
              More filters
              {advanced > 0 && <span className="inline-flex size-5 items-center justify-center rounded-full bg-olive-deep text-[0.6875rem] text-paper">{advanced}</span>}
              <Icon name={moreOpen ? 'minus' : 'plus'} className="size-4" />
            </button>
          </div>

          <div id={moreId} hidden={!moreOpen} className="mt-6 grid gap-6 border-t border-line-soft pt-6 lg:grid-cols-[14rem_1fr_auto] lg:items-start">
            <SelectField
              label="Bathrooms"
              value={String(filters.minBaths)}
              onValue={(v) => update({ minBaths: Number(v) })}
              options={[{ value: '0', label: 'Any' }, ...[1, 2, 3, 4].map((n) => ({ value: String(n), label: `${n}+` }))]}
            />
            <FeatureChips value={filters.features} onChange={(features) => update({ features })} />
            <label className="flex min-h-12 cursor-pointer items-center gap-3 text-sm text-ink-soft lg:mt-6">
              <input
                type="checkbox"
                checked={filters.includeUnavailable}
                onChange={(e) => update({ includeUnavailable: e.target.checked })}
                className="size-4.5 accent-[var(--color-olive-deep)]"
              />
              Include {filters.listingType === 'rent' ? 'let agreed' : 'under offer'}
            </label>
          </div>
        </form>

        {/* Toolbar */}
        <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            {filters.savedOnly ? (
              <p className="font-editorial text-[2rem] text-ink" aria-live="polite">
                Your saved homes <span className="text-taupe-deep">({results.length})</span>
              </p>
            ) : (
              <p className="font-editorial text-[2rem] text-ink" aria-live="polite">
                {results.length} {results.length === 1 ? 'home' : 'homes'} {noun}
                {filters.areaId && <span className="text-taupe-deep"> in {getArea(filters.areaId)?.name}</span>}
              </p>
            )}
            {chips.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Active filters">
                {chips.map((c) => (
                  <li key={c.label}>
                    <button
                      type="button"
                      onClick={c.clear}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line bg-paper pr-2.5 pl-3.5 text-xs font-medium text-ink hover:border-ink/40"
                    >
                      {c.label}
                      <Icon name="close" className="size-3.5" />
                      <span className="sr-only">Remove filter</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-[0.8125rem] text-muted">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="min-h-11 cursor-pointer rounded-[3px] border border-line bg-paper pl-3 text-[0.8125rem] font-semibold text-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-olive"
              >
                <option value="newest">Newest first</option>
                <option value="price-desc">Highest price</option>
                <option value="price-asc">Lowest price</option>
              </select>
            </label>
            <fieldset className="flex rounded-[3px] border border-line bg-paper p-1">
              <legend className="sr-only">Results view</legend>
              {(['grid', 'map'] as const).map((v) => (
                <label key={v} className="cursor-pointer">
                  <input type="radio" name={viewName} checked={view === v} onChange={() => setView(v)} className="peer sr-only" />
                  <span className="inline-flex min-h-9 items-center gap-1.5 rounded-[2px] px-3 text-[0.8125rem] font-semibold text-muted peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-olive">
                    <Icon name={v} className="size-4" />
                    {v === 'grid' ? 'Grid' : 'Map'}
                  </span>
                </label>
              ))}
            </fieldset>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8">
          {results.length === 0 ? (
            <div className="flex flex-col items-center rounded-[4px] border border-dashed border-taupe bg-paper/60 px-6 py-16 text-center">
              <Icon name="search" className="size-8 text-taupe" />
              <p className="font-editorial mt-4 text-[2rem] text-ink">{filters.savedOnly ? 'No saved homes yet' : 'Nothing matches just yet'}</p>
              <p className="mt-2 max-w-md text-sm text-muted">
                {filters.savedOnly
                  ? 'Tap the heart on any property to keep it here.'
                  : 'Many of our homes are sold or let before they reach the portals. Set up an alert and we’ll tell you the moment something fits.'}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button icon="bell" onClick={() => openEnquiry('alerts')}>
                  Create a property alert
                </Button>
                <Button variant="secondary" onClick={reset}>
                  {filters.savedOnly ? 'Browse all homes' : 'Clear filters'}
                </Button>
              </div>
            </div>
          ) : view === 'map' ? (
            <AreaMap key={results.map((r) => r.id).join()} results={results} />
          ) : (
            <>
              <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {results.slice(0, visible).map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
              {visible < results.length && (
                <div className="mt-12 flex justify-center">
                  <Button variant="secondary" size="lg" onClick={() => setVisible((v) => v + PAGE)}>
                    Show more homes ({results.length - visible})
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Alerts strip */}
        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-taupe text-olive-deep">
              <Icon name="bell" className="size-5" />
            </span>
            <div>
              <p className="font-editorial text-[1.75rem] leading-tight text-ink">Hear about new homes first.</p>
              <p className="mt-1 text-sm text-muted">Registered buyers and tenants receive new instructions before they’re published online.</p>
            </div>
          </div>
          <Button variant="olive" icon="arrow-right" onClick={() => openEnquiry('alerts')}>
            Get property alerts
          </Button>
        </div>
      </div>
    </section>
  )
}

function activeChips(f: SearchFilters, update: (patch: Partial<SearchFilters>) => void) {
  const chips: Array<{ label: string; clear: () => void }> = []
  if (f.savedOnly) return chips
  if (f.areaId) chips.push({ label: getArea(f.areaId)?.name ?? f.areaId, clear: () => update({ areaId: '' }) })
  if (f.propertyType) chips.push({ label: propertyTypeLabel[f.propertyType], clear: () => update({ propertyType: '' }) })
  if (f.minPrice) chips.push({ label: `From ${formatCompactPrice(f.minPrice)}`, clear: () => update({ minPrice: 0 }) })
  if (f.maxPrice) chips.push({ label: `Up to ${formatCompactPrice(f.maxPrice)}`, clear: () => update({ maxPrice: 0 }) })
  if (f.minBeds) chips.push({ label: `${f.minBeds}+ beds`, clear: () => update({ minBeds: 0 }) })
  if (f.minBaths) chips.push({ label: `${f.minBaths}+ baths`, clear: () => update({ minBaths: 0 }) })
  for (const feat of f.features) chips.push({ label: featureLabels[feat], clear: () => update({ features: f.features.filter((x) => x !== feat) }) })
  return chips
}
