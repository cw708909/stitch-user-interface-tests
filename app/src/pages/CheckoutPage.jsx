import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Icon from '../components/Icon'
import PaymentSection from '../components/PaymentSection'
import ReceiptDelivery from '../components/ReceiptDelivery'
import SuccessModal from '../components/SuccessModal'
import TipSelector from '../components/TipSelector'
import { flowConfig, pizzaMenu, signatureMenu } from '../data/menu'
import { useCartDetails } from '../context/CartContext'
import { money, roundMoney } from '../utils/format'

export default function CheckoutPage({ flow }) {
  const config = flowConfig[flow]
  const items = flow === 'pizza' ? pizzaMenu : signatureMenu
  const details = useCartDetails(flow, items)

  const [tipRate, setTipRate] = useState(0.18)
  const [customTip, setCustomTip] = useState('')
  const [paymentTab, setPaymentTab] = useState('card')
  const [showSuccess, setShowSuccess] = useState(false)

  const tax = roundMoney(details.subtotal * config.taxRate)
  const tipAmount =
    tipRate === 'custom' ? Math.max(0, Number(customTip) || 0) : roundMoney(details.subtotal * tipRate)
  const beforeTip = roundMoney(details.subtotal + tax)
  const total = roundMoney(beforeTip + tipAmount + config.serviceFee)
  const tipLabel = tipRate === 'custom' ? 'Custom' : `${Math.round(tipRate * 100)}%`

  const submitLabel =
    paymentTab === 'cash'
      ? `Fire Order to Kitchen • Pay Elena Later (${money(total)})`
      : `Submit Order • ${money(total)}`

  return (
    <div className="min-h-screen bg-surface">
      <Header flow={flow} step={2} cartCount={details.totalQty} />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-[1440px] mx-auto px-margin py-space-lg">
          <div className="flex flex-wrap items-center justify-between gap-space-md mb-space-lg">
            <Link
              to={config.menuPath}
              className="group flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors font-label-lg text-label-lg"
            >
              <Icon name="arrow_back" className="text-[18px] group-hover:-translate-x-1 transition-transform" />
              <span>Back to Menu to edit items</span>
            </Link>
            <div className="flex items-center gap-space-md">
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-label-lg text-label-lg text-on-surface">Step 2 of 2: Ready to Pay</span>
              </div>
              <div className="w-32 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div className="w-full h-full bg-primary rounded-full" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-space-md mb-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <span className="w-3 h-3 rounded-full bg-tertiary" />
                    <span className="font-headline-sm text-headline-sm text-on-surface">
                      Table 14 • Main Dining Hall
                    </span>
                  </div>
                  <span className="font-label-md text-label-md px-space-sm py-space-xs rounded-full bg-secondary-container text-on-secondary-fixed">
                    Active Session
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-sm">
                  <div className="flex flex-col bg-surface-container-low p-space-sm rounded-lg">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Order Reference</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface mt-space-xs">
                      {config.orderReference}
                    </span>
                  </div>
                  <div className="flex flex-col bg-surface-container-low p-space-sm rounded-lg">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Server Assigned</span>
                    <div className="flex items-center gap-space-xs mt-space-xs">
                      <Icon name="person" className="text-[18px] text-tertiary" />
                      <span className="font-label-lg text-label-lg text-on-surface">{config.server}</span>
                    </div>
                  </div>
                  <div className="flex flex-col bg-surface-container-low p-space-sm rounded-lg">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Kitchen Status</span>
                    <div className="flex items-center gap-space-xs mt-space-xs">
                      <Icon name="skillet" className="text-[18px] text-primary" />
                      <span className="font-label-lg text-label-lg text-on-surface">Ready to Fire</span>
                    </div>
                  </div>
                </div>
              </div>

              <TipSelector
                subtotal={details.subtotal}
                tipRate={tipRate}
                customTip={customTip}
                onTipRate={setTipRate}
                onCustomTip={setCustomTip}
              />

              <PaymentSection activeTab={paymentTab} onTab={setPaymentTab} />

              <ReceiptDelivery />
            </div>

            <div className="lg:col-span-5 flex flex-col gap-space-md sticky top-24">
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-space-md">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Order Slip Summary
                    </span>
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                      {details.itemCount} Items {flow === 'pizza' ? 'in Order' : 'in Batch'}
                    </h2>
                  </div>
                  <Link
                    to={config.menuPath}
                    className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors flex items-center gap-0.5"
                  >
                    <span>Edit</span>
                    <Icon name="edit" className="text-[16px]" />
                  </Link>
                </div>

                <div className="flex flex-col gap-space-sm py-space-md">
                  {details.lines.map((line) => (
                    <div
                      key={line.id}
                      className="flex items-start justify-between gap-space-sm bg-surface-container-low/60 p-space-sm rounded-xl"
                    >
                      <div className="flex gap-space-sm">
                        {line.image ? (
                          <img
                            alt={line.name}
                            src={line.image}
                            className="w-14 h-14 rounded-lg object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                            <Icon name={line.icon ?? 'restaurant'} className="text-[28px]" />
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-space-xs">
                            <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface font-label-md text-label-md font-bold">
                              {line.qty}×
                            </span>
                            <h3 className="font-headline-sm text-[16px] text-on-surface">{line.name}</h3>
                          </div>
                          <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                            {line.receiptDetail}
                          </p>
                        </div>
                      </div>
                      <span className="font-headline-sm text-[16px] text-on-surface shrink-0 font-semibold">
                        {money(line.lineTotal)}
                      </span>
                    </div>
                  ))}
                  {details.lines.length === 0 && (
                    <div className="rounded-xl bg-surface-container-low p-space-md text-body-sm text-body-sm text-on-surface-variant">
                      Your tray is empty. Add items before submitting the order.
                    </div>
                  )}
                </div>

                <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-xs my-space-sm">
                  <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
                    <span>{flow === 'pizza' ? 'Subtotal' : 'Food & Beverages Subtotal'}</span>
                    <span className="text-on-surface font-label-lg">{money(details.subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
                    <span>{config.checkoutTaxLabel}</span>
                    <span className="text-on-surface font-label-lg">{money(tax)}</span>
                  </div>
                  {flow === 'signature' ? (
                    <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
                      <span>Kitchen Service Fee</span>
                      <span className="text-on-surface font-label-lg">{money(config.serviceFee)}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant border-b border-surface-container-high/60 pb-space-xs">
                      <span>Total Before Tip</span>
                      <span className="text-on-surface font-label-lg font-semibold">{money(beforeTip)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <span>Gratuity / Tip</span>
                      <span className="px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-fixed text-[11px] font-label-sm">
                        {tipLabel}
                      </span>
                    </span>
                    <span className="text-on-surface font-label-lg">{money(tipAmount)}</span>
                  </div>
                  <div className="pt-space-sm mt-space-xs flex justify-between items-baseline border-t border-surface-container-high">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                        Total Due
                      </span>
                      <span className="font-body-sm text-[11px] text-tertiary font-medium">
                        {flow === 'pizza' ? 'Includes 8.5% tax & gratuity' : 'Includes all taxes & fees'}
                      </span>
                    </div>
                    <span className="font-display-xl text-display-xl text-primary font-extrabold">{money(total)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-space-xs p-space-sm rounded-lg bg-surface-container text-on-surface font-body-sm text-[12px] mb-space-md">
                  <Icon name="bolt" className="text-[18px] text-tertiary" />
                  <span>Your order will be sent straight to kitchen station upon submission.</span>
                </div>

                <div className="flex flex-col gap-space-sm">
                  <button
                    type="button"
                    onClick={() => setShowSuccess(true)}
                    className="w-full h-14 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-headline-md text-[18px] flex items-center justify-center gap-space-sm shadow-xl hover:shadow-2xl transition-all cursor-pointer font-bold"
                  >
                    <Icon name="lock" className="text-[22px]" />
                    <span>{submitLabel}</span>
                  </button>
                  <Link
                    to={config.menuPath}
                    className="w-full py-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg flex items-center justify-center gap-space-xs transition-colors text-center"
                  >
                    <Icon name="arrow_back" className="text-[18px] text-on-surface-variant" />
                    <span>Back to Menu to edit items</span>
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm mt-space-md text-center">
                  <Icon name="verified_user" className="text-[16px] text-tertiary" />
                  <span>Encrypted &amp; Secure 256-bit • Instant Kitchen Print</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer flow={flow} />
      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        flow={flow}
        total={total}
        email={config.receiptEmail}
      />
    </div>
  )
}
