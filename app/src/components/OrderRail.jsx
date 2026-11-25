import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { flowConfig } from '../data/menu'
import { useCart } from '../context/CartContext'
import { money, roundMoney } from '../utils/format'
import Icon from './Icon'
import QuantityStepper from './QuantityStepper'

export default function OrderRail({ flow, details }) {
  const { changeQty, setNote } = useCart()
  const config = flowConfig[flow]
  const notesRef = useRef(null)
  const [dineIn, setDineIn] = useState(true)

  const tax = roundMoney(details.subtotal * config.taxRate)
  const estimatedTotal = roundMoney(details.subtotal + tax)

  function handleCustomize(line) {
    if (line.customizeLabel === 'Remove') {
      for (let i = 0; i < line.qty; i += 1) changeQty(flow, line.id, -1)
      return
    }
    const prefix = details.note ? `${details.note} ` : ''
    setNote(flow, `${prefix}${line.name}: ${line.customizeLabel ?? 'custom request'}`)
    notesRef.current?.focus()
  }

  return (
    <aside className="lg:col-span-4 sticky top-24 flex flex-col gap-space-md">
      <div className="bg-surface-container-lowest rounded-xl shadow-lg p-space-lg flex flex-col gap-space-md">
        <div className="flex items-center justify-between pb-space-sm">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
              Active Table Tray
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">{config.menuTitle}</h2>
          </div>
          <div className="px-space-sm py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-bold flex items-center gap-1">
            <Icon name="receipt_long" className="text-[16px]" />
            <span>
              {details.itemCount} Items ({details.totalQty} Total)
            </span>
          </div>
        </div>

        <div className="bg-surface-container-low p-1 rounded-lg grid grid-cols-2 gap-1 text-center font-label-md text-label-md">
          <button
            type="button"
            onClick={() => setDineIn(true)}
            className={`py-1.5 rounded-md flex items-center justify-center gap-1 ${
              dineIn ? 'bg-surface-container-lowest text-on-surface font-bold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="table_restaurant" className="text-[16px] text-tertiary" />
            <span>Dine-in • Table 14</span>
          </button>
          <button
            type="button"
            onClick={() => setDineIn(false)}
            className={`py-1.5 rounded-md flex items-center justify-center gap-1 ${
              !dineIn ? 'bg-surface-container-lowest text-on-surface font-bold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="takeout_dining" className="text-[16px]" />
            <span>To-Go / Takeaway</span>
          </button>
        </div>

        <div className="flex flex-col gap-space-sm">
          {details.lines.length === 0 && (
            <div className="p-space-md rounded-lg bg-surface-container-low text-body-sm text-body-sm text-on-surface-variant">
              Your tray is empty. Add something delicious from the menu.
            </div>
          )}
          {details.lines.map((line) => (
            <div key={line.id} className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold">
                      {line.qty}×
                    </span>
                    <span className="font-label-lg text-label-lg text-on-surface font-bold truncate">
                      {line.name}
                    </span>
                  </div>
                  <span className="text-on-surface-variant font-body-sm text-body-sm pl-6.5 block">
                    {line.size ? `${line.size} • ` : ''}
                    {line.trayNote ?? `${money(line.unitPrice)} each`}
                  </span>
                </div>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold whitespace-nowrap">
                  {money(line.lineTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                {line.customizeLabel ? (
                  <button
                    type="button"
                    onClick={() => handleCustomize(line)}
                    className={`${
                      line.customizeLabel === 'Remove'
                        ? 'text-on-surface-variant hover:text-error'
                        : 'text-on-surface-variant hover:text-primary'
                    } font-label-sm text-label-sm flex items-center gap-1`}
                  >
                    <Icon
                      name={line.customizeLabel === 'Remove' ? 'delete' : 'edit_note'}
                      className="text-[14px]"
                    />
                    <span>{line.customizeLabel}</span>
                  </button>
                ) : (
                  <span className="text-on-surface-variant font-label-sm text-label-sm">{line.trayNote}</span>
                )}
                <QuantityStepper
                  compact
                  qty={line.qty}
                  itemName={line.name}
                  onChange={(delta) => changeQty(flow, line.id, delta)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold flex items-center gap-1">
            <Icon name="notes" className="text-[16px]" />
            <span>Kitchen &amp; Server Notes</span>
          </label>
          <textarea
            ref={notesRef}
            value={details.note}
            onChange={(event) => setNote(flow, event.target.value)}
            className="w-full p-space-sm bg-surface-container-low rounded-lg text-body-sm font-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            placeholder={
              flow === 'signature'
                ? 'Allergies, extra napkins, or serve drinks first...'
                : 'Allergies, serve drinks first, or extra napkins...'
            }
            rows="2"
          />
        </div>

        <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-2">
          <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
            <span>Items Subtotal ({details.totalQty} total)</span>
            <span className="text-on-surface font-semibold">{money(details.subtotal)}</span>
          </div>
          <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
            <span>{config.taxLabel}</span>
            <span className="text-on-surface font-semibold">{money(tax)}</span>
          </div>
          <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
            <span className="flex items-center gap-1">
              <span>Service Fee</span>
              <Icon name="verified" className="text-[14px] text-tertiary" />
            </span>
            <span className="text-tertiary font-bold">Complimentary</span>
          </div>
          <div className="h-px bg-surface-container-highest my-1" />
          <div className="flex items-baseline justify-between pt-1">
            <div>
              <span className="font-label-lg text-label-lg text-on-surface font-bold block">Estimated Total</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Tip calculated at payment</span>
            </div>
            <span className="font-display-xl text-display-xl text-on-surface font-extrabold tracking-tight">
              {money(estimatedTotal)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-space-xs pt-space-xs">
          <Link
            to={config.checkoutPath}
            className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all active:scale-[0.99]"
          >
            <span>Ready to Pay ({money(estimatedTotal)})</span>
            <Icon name="arrow_forward" className="text-[20px]" />
          </Link>
          <p className="text-center font-label-sm text-label-sm text-on-surface-variant pt-1 flex items-center justify-center gap-1">
            <Icon name="lock" className="text-[15px] text-tertiary" />
            <span>Ready to review bill, add server tip &amp; split payment</span>
          </p>
        </div>
      </div>

      <div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <Icon name="contactless" className="text-primary text-[22px]" />
          <div>
            <p className="font-label-md text-label-md font-bold text-on-surface">Ordering together?</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Other guests at Table 14 can scan the stand QR to add items.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
