import { money, roundMoney } from '../utils/format'
import Icon from './Icon'

export default function TipSelector({ subtotal, tipRate, customTip, onTipRate, onCustomTip }) {
  const options = [
    { label: '15%', value: 0.15 },
    { label: '18%', value: 0.18, recommended: true },
    { label: '20%', value: 0.2 },
    { label: 'Custom', value: 'custom' },
    { label: 'No Tip', value: 0 },
  ]

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
      <div className="flex items-center justify-between mb-space-sm">
        <div className="flex items-center gap-space-xs">
          <Icon name="volunteer_activism" className="text-primary text-[22px]" />
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Gratuity &amp; Tip</h2>
        </div>
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          Directly supports table staff &amp; kitchen
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-space-sm mt-space-md">
        {options.map((option) => {
          const active = tipRate === option.value
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => onTipRate(option.value)}
              className={`relative flex flex-col items-center justify-center p-space-sm rounded-lg transition-all text-center ${
                active
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {option.recommended && (
                <span className="absolute -top-2.5 px-space-xs py-0.5 bg-on-primary-fixed text-primary-fixed rounded-full font-label-sm text-[10px] tracking-wide uppercase">
                  Recommended
                </span>
              )}
              <span className="font-headline-sm text-headline-sm">{option.label}</span>
              <span
                className={`font-label-sm text-label-sm mt-0.5 ${
                  active ? 'text-primary-fixed' : 'text-on-surface-variant'
                }`}
              >
                {option.value === 'custom'
                  ? 'Enter $'
                  : money(roundMoney(subtotal * option.value))}
              </span>
            </button>
          )
        })}
      </div>

      {tipRate === 'custom' && (
        <div className="mt-space-md pt-space-sm">
          <label className="block font-label-md text-label-md text-on-surface-variant mb-space-xs">
            Enter Custom Tip Amount
          </label>
          <div className="relative max-w-xs">
            <span className="absolute left-space-md top-1/2 -translate-y-1/2 font-headline-sm text-on-surface-variant">
              $
            </span>
            <input
              type="number"
              min="0"
              step="0.5"
              value={customTip}
              onChange={(event) => onCustomTip(event.target.value)}
              placeholder="0.00"
              className="w-full bg-surface-container-low rounded-lg pl-8 pr-space-md py-space-sm text-on-surface font-headline-sm focus:outline-none focus:bg-surface-container-high"
            />
          </div>
        </div>
      )}
    </div>
  )
}
