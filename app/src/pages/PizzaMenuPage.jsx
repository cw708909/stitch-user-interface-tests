import { useMemo, useState } from 'react'
import FilterBar from '../components/FilterBar'
import Footer from '../components/Footer'
import Header from '../components/Header'
import NotificationBar from '../components/NotificationBar'
import OrderRail from '../components/OrderRail'
import PizzaMenuCard from '../components/PizzaMenuCard'
import { pizzaMenu } from '../data/menu'
import { useCart, useCartDetails } from '../context/CartContext'

const sortOptions = ['Category Order', 'Price: Low to High', 'Price: High to Low']
const groups = [
  { id: 'category-pizzas', title: 'Pizzas', category: 'Pizzas', grid: 'md:grid-cols-2' },
  { id: 'category-sides', title: 'Sides', category: 'Sides', grid: 'md:grid-cols-2' },
  { id: 'category-drinks', title: 'Drinks', category: 'Drinks', grid: 'md:grid-cols-3' },
]

export default function PizzaMenuPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Category 1: Pizzas')
  const [sortIndex, setSortIndex] = useState(0)

  const { carts, changeQty, setSize } = useCart()
  const details = useCartDetails('pizza', pizzaMenu)

  const groupedItems = useMemo(() => {
    const query = search.trim().toLowerCase()
    const result = {}
    for (const group of groups) {
      let items = pizzaMenu.filter((item) => {
        const haystack = [item.name, item.description, ...(item.tags ?? []).map((tag) => tag.text)]
          .join(' ')
          .toLowerCase()
        return item.category === group.category && (!query || haystack.includes(query))
      })
      if (sortIndex === 1) items = [...items].sort((a, b) => a.price - b.price)
      if (sortIndex === 2) items = [...items].sort((a, b) => b.price - a.price)
      result[group.id] = items
    }
    return result
  }, [search, sortIndex])

  return (
    <div className="min-h-screen bg-surface">
      <Header flow="pizza" step={1} cartCount={details.totalQty} />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full">
          <NotificationBar message="Wood-Fired Pizza Kitchen Live" />
          <div className="max-w-[1440px] w-full mx-auto px-margin py-space-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
              <section className="lg:col-span-8 flex flex-col gap-space-lg min-w-0">
                <FilterBar
                  mode="pizza"
                  search={search}
                  onSearch={setSearch}
                  sortLabel={sortOptions[sortIndex]}
                  onSort={() => setSortIndex((index) => (index + 1) % sortOptions.length)}
                  activeCategory={activeCategory}
                  onCategory={setActiveCategory}
                  activeDietary={[]}
                  onDietary={() => {}}
                />

                {groups.map((group) => {
                  const items = groupedItems[group.id]
                  if (items.length === 0) return null
                  return (
                    <div key={group.id} id={group.id} className="flex flex-col gap-space-md pt-space-xs scroll-mt-28">
                      <div className="flex items-baseline justify-between border-b border-surface-container-high pb-space-xs">
                        <h2 className="font-headline-lg text-headline-lg text-on-surface">{group.title}</h2>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {items.length} items
                        </span>
                      </div>
                      <div className={`grid grid-cols-1 ${group.grid} gap-gutter`}>
                        {items.map((item) => (
                          <PizzaMenuCard
                            key={item.id}
                            item={item}
                            qty={carts.pizza[item.id]?.qty ?? 0}
                            size={carts.pizza[item.id]?.size}
                            onChange={(id, delta) => changeQty('pizza', id, delta)}
                            onSize={(id, value) => setSize('pizza', id, value)}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}

                {Object.values(groupedItems).every((items) => items.length === 0) && (
                  <div className="rounded-xl bg-surface-container-low p-space-lg text-body-md text-body-md text-on-surface-variant">
                    No menu items match “{search}”. Try another search.
                  </div>
                )}
              </section>

              <OrderRail flow="pizza" details={details} />
            </div>
          </div>
        </div>
      </main>
      <Footer flow="pizza" />
    </div>
  )
}
