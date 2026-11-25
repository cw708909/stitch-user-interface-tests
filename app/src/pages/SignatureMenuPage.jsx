import { useMemo, useState } from 'react'
import FilterBar, { categoriesForSignature } from '../components/FilterBar'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Icon from '../components/Icon'
import NotificationBar from '../components/NotificationBar'
import OrderRail from '../components/OrderRail'
import SignatureMenuCard from '../components/SignatureMenuCard'
import { signatureMenu } from '../data/menu'
import { useCart, useCartDetails } from '../context/CartContext'

const sortOptions = ['Chef Curated', 'Price: Low to High', 'Price: High to Low']

export default function SignatureMenuPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All Items (28)')
  const [activeDietary, setActiveDietary] = useState([])
  const [sortIndex, setSortIndex] = useState(0)
  const [learnMore, setLearnMore] = useState(false)

  const { carts, changeQty } = useCart()
  const details = useCartDetails('signature', signatureMenu)

  const visibleItems = useMemo(() => {
    const query = search.trim().toLowerCase()
    const categories = categoriesForSignature(activeCategory)
    const filtered = signatureMenu.filter((item) => {
      const haystack = [item.name, item.description, ...(item.tags ?? []).map((tag) => tag.text)]
        .join(' ')
        .toLowerCase()
      const matchesSearch = !query || haystack.includes(query)
      const matchesCategory = !categories || categories.includes(item.category)
      const matchesDietary =
        activeDietary.length === 0 || activeDietary.every((key) => item.dietary?.includes(key))
      return matchesSearch && matchesCategory && matchesDietary
    })

    if (sortIndex === 1) return [...filtered].sort((a, b) => a.price - b.price)
    if (sortIndex === 2) return [...filtered].sort((a, b) => b.price - a.price)
    return filtered
  }, [search, activeCategory, activeDietary, sortIndex])

  function toggleDietary(key) {
    setActiveDietary((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header flow="signature" step={1} cartCount={details.totalQty} />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full">
          <NotificationBar message="Seasonal Spring Menu is Live" />
          <div className="max-w-[1440px] w-full mx-auto px-margin py-space-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
              <section className="lg:col-span-8 flex flex-col gap-space-lg min-w-0">
                <FilterBar
                  mode="signature"
                  search={search}
                  onSearch={setSearch}
                  sortLabel={sortOptions[sortIndex]}
                  onSort={() => setSortIndex((index) => (index + 1) % sortOptions.length)}
                  activeCategory={activeCategory}
                  onCategory={setActiveCategory}
                  activeDietary={activeDietary}
                  onDietary={toggleDietary}
                />

                <div className="flex items-baseline justify-between pt-space-xs">
                  <div>
                    <span className="font-label-sm text-label-sm tracking-wider uppercase text-primary font-bold">
                      Featured Craft Selections
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface mt-0.5">
                      Signature Dishes &amp; Complements
                    </h2>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant hidden sm:inline">
                    Showing {visibleItems.length} curated items
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  {visibleItems.map((item) => (
                    <SignatureMenuCard
                      key={item.id}
                      item={item}
                      qty={carts.signature[item.id]?.qty ?? 0}
                      onChange={(id, delta) => changeQty('signature', id, delta)}
                    />
                  ))}
                  {visibleItems.length === 0 && (
                    <div className="col-span-full rounded-xl bg-surface-container-low p-space-lg text-body-md text-body-md text-on-surface-variant">
                      No dishes match those filters. Try another search or clear a dietary filter.
                    </div>
                  )}
                </div>

                <div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between flex-wrap gap-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                      <Icon name="restaurant" className="text-[22px]" />
                    </div>
                    <div>
                      <p className="font-label-lg text-label-lg text-on-surface font-bold">
                        Chef's Pairing Recommendation
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Pair the Truffle Angus Burger with our cold-brewed Ginger Brew for balanced umami richness.
                        {learnMore && ' Ask Elena for the truffle aioli on the side to make it extra bright.'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLearnMore((value) => !value)}
                    className="px-space-sm py-1.5 rounded-lg bg-surface-container-highest hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors"
                  >
                    {learnMore ? 'Show Less' : 'Learn More'}
                  </button>
                </div>
              </section>

              <OrderRail flow="signature" details={details} />
            </div>
          </div>
        </div>
      </main>
      <Footer flow="signature" />
    </div>
  )
}
