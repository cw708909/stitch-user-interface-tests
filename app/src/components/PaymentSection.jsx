import { useState } from 'react'
import Icon from './Icon'

const tabs = [
  { id: 'card', label: 'Credit Card', icon: 'credit_card' },
  { id: 'digital', label: 'Digital Wallet', icon: 'contactless' },
  { id: 'cash', label: 'Pay Server', icon: 'payments' },
]

export default function PaymentSection({ activeTab, onTab }) {
  const [cardName, setCardName] = useState('Alexander Wright')
  const [cardNumber, setCardNumber] = useState('4829 •••• •••• 9104')
  const [expiry, setExpiry] = useState('08 / 27')
  const [cvv, setCvv] = useState('842')
  const [saveCard, setSaveCard] = useState(true)
  const [walletReady, setWalletReady] = useState(false)

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
      <div className="flex items-center justify-between mb-space-md">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">Payment Method</h2>
        <span className="flex items-center gap-space-xs font-label-sm text-label-sm text-tertiary">
          <Icon name="lock" className="text-[16px]" />
          PCI Compliant
        </span>
      </div>

      <div className="grid grid-cols-3 gap-space-xs p-space-xs rounded-xl bg-surface-container-low mb-space-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTab(tab.id)}
            className={`py-space-sm px-space-md rounded-lg font-label-lg text-label-lg transition-all flex items-center justify-center gap-space-xs ${
              activeTab === tab.id
                ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name={tab.icon} className={`text-[18px] ${activeTab === tab.id ? 'text-primary' : ''}`} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'card' && (
        <div className="flex flex-col gap-space-md">
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-space-xs">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardName}
              onChange={(event) => setCardName(event.target.value)}
              className="w-full bg-surface-container-low rounded-lg px-space-md py-space-sm text-on-surface font-body-md focus:outline-none focus:bg-surface-container-high transition-colors"
            />
          </div>
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-space-xs">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={(event) => setCardNumber(event.target.value)}
                className="w-full bg-surface-container-low rounded-lg pl-space-md pr-12 py-space-sm text-on-surface font-body-md focus:outline-none focus:bg-surface-container-high transition-colors"
              />
              <div className="absolute right-space-md top-1/2 -translate-y-1/2 flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-primary opacity-80" />
                <span className="w-4 h-4 rounded-full bg-primary-container -ml-2 opacity-80" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-space-md">
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant mb-space-xs">
                Expires (MM/YY)
              </label>
              <input
                type="text"
                value={expiry}
                onChange={(event) => setExpiry(event.target.value)}
                className="w-full bg-surface-container-low rounded-lg px-space-md py-space-sm text-on-surface font-body-md focus:outline-none focus:bg-surface-container-high transition-colors"
              />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant mb-space-xs">
                Security CVV
              </label>
              <div className="relative">
                <input
                  type="password"
                  maxLength="4"
                  value={cvv}
                  onChange={(event) => setCvv(event.target.value)}
                  className="w-full bg-surface-container-low rounded-lg px-space-md py-space-sm text-on-surface font-body-md focus:outline-none focus:bg-surface-container-high transition-colors"
                />
                <Icon
                  name="help_outline"
                  className="text-[18px] text-on-surface-variant absolute right-space-md top-1/2 -translate-y-1/2"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-space-sm pt-space-xs">
            <input
              id="save-card"
              type="checkbox"
              checked={saveCard}
              onChange={(event) => setSaveCard(event.target.checked)}
              className="w-4 h-4 accent-primary rounded"
            />
            <label htmlFor="save-card" className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer">
              Save card securely for quicker orders on this device
            </label>
          </div>
        </div>
      )}

      {activeTab === 'digital' && (
        <div className="flex flex-col gap-space-md py-space-sm">
          <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-space-md">
              <span className="w-12 h-12 rounded-xl bg-inverse-surface flex items-center justify-center text-inverse-on-surface">
                <Icon name="phone_iphone" className="text-[28px]" />
              </span>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Fast 1-Touch Checkout</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Defaulting to Apple Pay / Google Wallet card ending in 7102
                </p>
              </div>
            </div>
            <Icon name="check_circle" className="text-tertiary text-[24px]" />
          </div>
          <button
            type="button"
            onClick={() => setWalletReady(true)}
            className="w-full h-12 rounded-lg bg-inverse-surface hover:bg-on-background text-inverse-on-surface font-headline-sm flex items-center justify-center gap-space-sm transition-colors shadow-md"
          >
            <Icon name="contactless" className="text-[20px]" />
            <span>{walletReady ? 'Wallet Connected' : 'Pay with Digital Wallet'}</span>
          </button>
          {walletReady && (
            <p className="text-body-sm text-body-sm text-tertiary text-center">
              Wallet card ending in 7102 is ready. Submit your order below.
            </p>
          )}
        </div>
      )}

      {activeTab === 'cash' && (
        <div className="flex flex-col gap-space-md py-space-sm">
          <div className="p-space-md rounded-xl bg-secondary-container text-on-secondary-fixed flex items-start gap-space-md">
            <Icon name="receipt_long" className="text-[28px] text-primary mt-0.5" />
            <div>
              <h3 className="font-headline-sm text-headline-sm">Pay In-Person at Table 14</h3>
              <p className="font-body-sm text-body-sm mt-space-xs text-on-secondary-fixed-variant">
                Your kitchen ticket will dispatch right now. Elena M. will present the mobile terminal or accept
                cash directly at your table whenever you are ready.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm text-on-surface-variant font-label-md text-label-md">
            <Icon name="check" className="text-[18px] text-tertiary" />
            <span>No pre-authorization charged today</span>
          </div>
        </div>
      )}
    </div>
  )
}
