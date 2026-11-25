import Icon from './Icon'

export default function QuantityStepper({ qty, onChange, compact = false, itemName = 'item' }) {
  if (compact) {
    return (
      <div className="flex items-center bg-surface-container-lowest rounded-md shadow-xs px-1 py-0.5 gap-2">
        <button
          type="button"
          title={`Remove one ${itemName}`}
          onClick={() => onChange(-1)}
          className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-primary"
        >
          <Icon name={qty === 1 ? 'delete' : 'remove'} className="text-[15px]" />
        </button>
        <span className="font-label-md text-label-md font-bold text-on-surface tabular-nums">{qty}</span>
        <button
          type="button"
          title={`Add one ${itemName}`}
          onClick={() => onChange(1)}
          className="w-6 h-6 flex items-center justify-center text-primary hover:text-primary-container"
        >
          <Icon name="add" className="text-[15px]" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center bg-surface-container-lowest rounded-lg shadow-sm p-1 gap-space-sm">
      <button
        type="button"
        title={`Remove one ${itemName}`}
        onClick={() => onChange(-1)}
        className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
          qty === 1
            ? 'text-on-surface-variant hover:text-error hover:bg-error-container'
            : 'text-primary hover:bg-primary-fixed/50'
        }`}
      >
        <Icon name={qty === 1 ? 'delete' : 'remove'} className="text-[18px]" />
      </button>
      <span className="w-6 text-center font-headline-sm text-headline-sm text-on-surface font-bold tabular-nums">
        {qty}
      </span>
      <button
        type="button"
        title={`Add one ${itemName}`}
        onClick={() => onChange(1)}
        className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container transition-colors shadow-sm"
      >
        <Icon name="add" className="text-[18px]" />
      </button>
    </div>
  )
}
