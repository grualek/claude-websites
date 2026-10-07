import { useId, useState } from 'react'
import { properties } from '../../content/properties'
import type { ListingType } from '../../content/types'
import { useApp } from '../../state/AppState'
import { PropertyCard } from '../property/PropertyCard'
import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'

type Tab = 'all' | ListingType
const tabs: Array<{ id: Tab; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'sale', label: 'For sale' },
  { id: 'rent', label: 'To let' },
]

/** Newest available homes, excluding the showcase listing (which has its own section). */
const pool = properties.filter((p) => !p.featured && p.status !== 'Let Agreed' && p.propertyType !== 'commercial')

export function FeaturedProperties() {
  const { runSearch } = useApp()
  const [tab, setTab] = useState<Tab>('all')
  const tabsId = useId()
  const list = pool
    .filter((p) => tab === 'all' || p.listingType === tab)
    .sort((a, b) => b.listedAt.localeCompare(a.listedAt))
    .slice(0, 6)

  return (
    <section aria-labelledby="featured-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeader
          id="featured-title"
          index="01"
          eyebrow="Featured properties"
          title={
            <>
              New to the market, <em>handpicked</em>.
            </>
          }
          intro="A selection of the homes we’ve most recently been asked to sell and let — each one visited, photographed and written up by the advisor who knows it."
        />

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-b border-line">
          <div
            role="tablist"
            aria-label="Filter featured properties"
            className="-mb-px flex gap-6"
            onKeyDown={(e) => {
              if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
              const i = tabs.findIndex((t) => t.id === tab)
              const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]
              setTab(next.id)
              document.getElementById(`${tabsId}-${next.id}`)?.focus()
            }}
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                id={`${tabsId}-${t.id}`}
                aria-selected={tab === t.id}
                tabIndex={tab === t.id ? 0 : -1}
                aria-controls={`${tabsId}-panel`}
                onClick={() => setTab(t.id)}
                className={`min-h-12 border-b-2 text-sm font-semibold transition-colors ${tab === t.id ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <p className="pb-3 text-[0.8125rem] text-muted sm:pb-0">Showing {list.length} of {properties.length} homes</p>
        </div>

        <div id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-${tab}`} className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button variant="secondary" size="lg" icon="arrow-right" onClick={() => runSearch(tab === 'all' ? {} : { listingType: tab })}>
            Explore Properties
          </Button>
        </div>
      </div>
    </section>
  )
}
