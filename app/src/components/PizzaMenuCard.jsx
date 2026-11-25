import { money } from '../utils/format'
import Icon from './Icon'
import QuantityStepper from './QuantityStepper'

function SizeSelector({ item, size, onSize }) {
  if (!item.sizes) return null
  return (
    <div className="mt-space-sm flex flex-col gap-1.5">
      <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Select Size:</span>
      <div className={`grid gap-1.5 ${item.sizes.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {item.sizes.map((option) => {
          const active = option.label === size
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => onSize(option.label)}
              className={`py-1.5 px-2 rounded-lg font-label-sm text-label-sm text-center border transition-colors flex flex-col items-center ${
                active
                  ? 'bg-primary text-on-primary font-bold shadow-xs border-primary'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface border-transparent'
              }`}
            >
              <span>{option.label}</span>
              <span className={`text-[11px] ${active ? 'opacity-90' : 'text-on-surface-variant'}`}>
                {money(option.price)}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function StepperFooter({ item, qty, size, onChange }) {
  const price = item.sizes?.find((option) => option.label === size)?.price ?? item.price
  return (
    <div className="pt-space-sm flex items-center justify-between bg-surface-container-low -mx-space-md -mb-space-md p-space-md mt-2">
      <span className="font-label-md text-label-md text-on-surface-variant">
        {item.sizes ? `${size}: ` : 'Subtotal: '}
        <strong className="text-on-surface font-bold">{money(price * qty)}</strong>
      </span>
      <QuantityStepper qty={qty} itemName={item.name} onChange={(delta) => onChange(item.id, delta)} />
    </div>
  )
}

function Badge({ badge }) {
  if (!badge) return null
  return (
    <div
      className={`absolute top-3 left-3 flex items-center gap-1 px-space-sm py-1 rounded-full backdrop-blur-md text-surface-container-lowest font-label-sm text-label-sm ${
        badge.tone === 'tertiary' ? 'bg-on-surface/85 text-tertiary-fixed' : 'bg-on-surface/85'
      }`}
    >
      {badge.icon && <Icon name={badge.icon} className="text-primary-fixed text-[14px]" />}
      <span>{badge.text}</span>
    </div>
  )
}

export default function PizzaMenuCard({ item, qty, size, onChange, onSize }) {
  const activeSize = size ?? item.defaultSize
  const trayBadge = qty > 0 && (
    <div className="px-space-sm py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-sm font-bold">
      {qty} in Tray
    </div>
  )

  if (!item.image) {
    return (
      <div className="relative bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl">
        <div className="p-space-md flex flex-col flex-1 justify-between gap-space-md">
          <div>
            <div className="flex items-start justify-between gap-1">
              <div className="flex items-center gap-2">
                <span
                  className={`w-9 h-9 rounded-lg bg-secondary-container flex items-center justify-center ${
                    item.iconTone === 'tertiary'
                      ? 'text-tertiary'
                      : item.iconTone === 'secondary'
                        ? 'text-secondary'
                        : 'text-primary'
                  }`}
                >
                  <Icon name={item.icon} className="text-[20px]" />
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{item.name}</h3>
              </div>
              {qty > 0 ? (
                trayBadge
              ) : (
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold whitespace-nowrap">
                  {money(item.price)}
                </span>
              )}
            </div>
            <div className="mt-2 flex items-baseline justify-between gap-2">
              <p className="font-body-sm text-body-sm text-on-surface-variant">{item.description}</p>
              {qty > 0 && (
                <span className="font-headline-sm text-headline-sm text-primary font-bold whitespace-nowrap">
                  {money(item.price)}
                </span>
              )}
            </div>
            {item.tags && (
              <div className="mt-space-sm flex items-center gap-2 flex-wrap">
                {item.tags.map((tag) => (
                  <span
                    key={tag.text}
                    className={`px-2 py-0.5 rounded font-label-sm text-label-sm ${
                      tag.tone === 'green'
                        ? 'bg-tertiary/10 text-tertiary'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
            )}
            {!trayBadge && (
              <SizeSelector item={item} size={activeSize} onSize={(value) => onSize(item.id, value)} />
            )}
          </div>
          <StepperFooter item={item} qty={qty} size={activeSize} onChange={onChange} />
        </div>
      </div>
    )
  }

  if (item.wide) {
    return (
      <div className="relative bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl md:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-5 relative h-48 md:h-full min-h-[190px] overflow-hidden bg-surface-container">
            <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
            <Badge badge={item.badge} />
            {trayBadge && <div className="absolute top-3 right-3">{trayBadge}</div>}
          </div>
          <div className="md:col-span-7 p-space-md flex flex-col justify-between gap-space-md">
            <div>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{item.name}</h3>
                <span className="font-headline-sm text-headline-sm text-primary font-bold whitespace-nowrap">
                  {money(item.price)}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{item.description}</p>
              <SizeSelector item={item} size={activeSize} onSize={(value) => onSize(item.id, value)} />
            </div>
            <StepperFooter item={item} qty={qty} size={activeSize} onChange={onChange} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl">
      <div className="relative h-48 w-full overflow-hidden bg-surface-container">
        <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
        <Badge badge={item.badge} />
        {trayBadge && <div className="absolute top-3 right-3">{trayBadge}</div>}
      </div>
      <div className="p-space-md flex flex-col flex-1 justify-between gap-space-md">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{item.name}</h3>
            <span className="font-headline-sm text-headline-sm text-primary font-bold whitespace-nowrap">
              {money(item.price)}
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">{item.description}</p>
          <SizeSelector item={item} size={activeSize} onSize={(value) => onSize(item.id, value)} />
        </div>
        <StepperFooter item={item} qty={qty} size={activeSize} onChange={onChange} />
      </div>
    </div>
  )
}
