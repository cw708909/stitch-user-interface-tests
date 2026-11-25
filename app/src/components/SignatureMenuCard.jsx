import { money } from '../utils/format'
import Icon from './Icon'
import QuantityStepper from './QuantityStepper'

function Tag({ text, tone }) {
  const tones = {
    neutral: 'bg-surface-container text-on-surface-variant',
    green: 'bg-tertiary/10 text-tertiary',
  }
  return (
    <span className={`px-2 py-0.5 rounded font-label-sm text-label-sm ${tones[tone] ?? tones.neutral}`}>
      {text}
    </span>
  )
}

export default function SignatureMenuCard({ item, qty, onChange }) {
  const selected = qty > 0

  return (
    <div
      className={`relative bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 ${
        selected ? 'shadow-md hover:shadow-xl' : 'shadow-sm hover:shadow-md'
      }`}
    >
      <div className="relative h-48 w-full overflow-hidden bg-surface-container">
        <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
        {item.badge && (
          <div
            className={`absolute top-3 left-3 flex items-center gap-1 px-space-sm py-1 rounded-full backdrop-blur-md text-surface-container-lowest font-label-sm text-label-sm ${
              item.badge.tone === 'tertiary' ? 'bg-on-surface/85 text-tertiary-fixed' : 'bg-on-surface/85'
            }`}
          >
            {item.badge.icon && <Icon name={item.badge.icon} className="text-primary-fixed text-[14px]" />}
            <span>{item.badge.text}</span>
          </div>
        )}
        {selected && (
          <div className="absolute top-3 right-3 px-space-sm py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-sm">
            {qty} in Tray
          </div>
        )}
      </div>

      <div className="p-space-md flex flex-col flex-1 justify-between gap-space-md">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{item.name}</h3>
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold whitespace-nowrap">
              {money(item.price)}
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{item.description}</p>
          <div className="mt-space-sm flex items-center gap-2 flex-wrap">
            {item.tags?.map((tag) => (
              <Tag key={tag.text} {...tag} />
            ))}
          </div>
        </div>

        <div className="pt-space-sm flex items-center justify-between bg-surface-container-low -mx-space-md -mb-space-md p-space-md mt-2">
          {selected ? (
            <>
              <span className="font-label-md text-label-md text-on-surface-variant">
                Subtotal: <strong className="text-on-surface">{money(item.price * qty)}</strong>
              </span>
              <QuantityStepper
                qty={qty}
                itemName={item.name}
                onChange={(delta) => onChange(item.id, delta)}
              />
            </>
          ) : (
            <>
              <span className="font-label-md text-label-md text-on-surface-variant">{item.footerNote}</span>
              <button
                type="button"
                onClick={() => onChange(item.id, 1)}
                className="px-space-md py-2 rounded-lg bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md flex items-center gap-1 transition-all shadow-sm"
              >
                <Icon name="add_circle" className="text-[18px]" />
                <span>Add to Order</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
