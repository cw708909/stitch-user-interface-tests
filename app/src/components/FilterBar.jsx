import {
  pizzaCategories,
  signatureCategories,
  signatureDietaryFilters,
} from '../data/menu'
import Icon from './Icon'

const signatureCategoryMap = {
  'All Items (28)': null,
  'Artisanal Burgers & Mains': ['Mains'],
  'Fresh Bowls & Greens': ['Bowls'],
  'Wood-Fired Sides': ['Sides'],
  'Handcrafted Drinks': ['Drinks'],
  'House Desserts': ['Desserts'],
}

export function categoriesForSignature(label) {
  return signatureCategoryMap[label]
}

export default function FilterBar({
  mode,
  search,
  onSearch,
  sortLabel,
  onSort,
  activeCategory,
  onCategory,
  activeDietary,
  onDietary,
}) {
  const isPizza = mode === 'pizza'

  return (
    <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm">
        <div className="relative w-full sm:w-80">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]" />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low rounded-lg text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder={isPizza ? 'Search pizza, sides, drinks...' : 'Search ingredients, wine, or mains...'}
          />
        </div>
        <div className="flex items-center gap-space-sm self-end sm:self-auto">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Sort by</span>
          <button
            type="button"
            onClick={onSort}
            className="px-space-sm py-1 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md flex items-center gap-1"
          >
            <span>{sortLabel}</span>
            <Icon name="tune" className="text-[16px]" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-space-xs overflow-x-auto pb-1 scrollbar-none">
        {isPizza
          ? pizzaCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  onCategory(category.label)
                  document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className={`px-space-md py-2 rounded-full font-label-md text-label-md whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                  activeCategory === category.label
                    ? 'bg-on-secondary-fixed text-surface-container-lowest shadow-sm'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                }`}
              >
                <Icon name={category.icon} className="text-[16px]" />
                <span>{category.label}</span>
              </button>
            ))
          : signatureCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => onCategory(category)}
                className={`px-space-md py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-on-secondary-fixed text-surface-container-lowest shadow-sm'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                }`}
              >
                {category}
              </button>
            ))}
      </div>

      {!isPizza && (
        <div className="flex items-center gap-space-xs flex-wrap pt-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant mr-1">Dietary:</span>
          {signatureDietaryFilters.map((filter) => {
            const active = activeDietary.includes(filter.key)
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => onDietary(filter.key)}
                className={`px-space-sm py-1 rounded-md font-label-sm text-label-sm flex items-center gap-1 transition-colors ${
                  active
                    ? 'bg-on-secondary-fixed text-surface-container-lowest'
                    : filter.key === 'chef-special'
                      ? 'bg-primary-fixed text-on-primary-fixed-variant hover:bg-primary-fixed-dim'
                      : 'bg-tertiary/10 text-tertiary hover:bg-tertiary/20'
                }`}
              >
                <Icon name={filter.icon} className="text-[14px]" />
                <span>{filter.label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
