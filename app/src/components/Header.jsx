import { useState } from 'react'
import { Link } from 'react-router-dom'
import { flowConfig } from '../data/menu'
import Icon from './Icon'

export default function Header({ flow, step, cartCount }) {
  const [dineIn, setDineIn] = useState(true)
  const [called, setCalled] = useState(false)
  const config = flowConfig[flow]

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_2px_12px_-2px_rgba(31,27,24,0.06)]">
      <div className="h-20 max-w-[1440px] mx-auto px-margin flex items-center justify-between gap-space-lg">
        <div className="flex items-center gap-space-md">
          <Link className="flex items-center gap-space-sm" to={config.menuPath}>
            <img
              alt="Savor Ordering Logo"
              className="h-8 w-auto object-contain"
              src="/images/savor-logo.png"
            />
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
              Savor
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setDineIn((value) => !value)}
            className="hidden sm:flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-secondary-container text-on-secondary-fixed text-label-md font-label-md cursor-pointer hover:bg-surface-container-high transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-tertiary" />
            <span>{dineIn ? 'Dine-in • Table 14' : 'Takeaway • Table 14'}</span>
            <Icon name="expand_more" className="text-[16px] text-on-surface-variant" />
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-space-xs p-space-xs rounded-xl bg-surface-container-low">
          <Link
            className={`px-space-md py-space-xs rounded-lg font-label-lg text-label-lg transition-colors ${
              step === 1
                ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            to={config.menuPath}
          >
            1. Menu &amp; Selections
          </Link>
          <Link
            className={`px-space-md py-space-xs rounded-lg font-label-lg text-label-lg transition-colors ${
              step === 2
                ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            to={config.checkoutPath}
          >
            2. Review &amp; Pay
          </Link>
        </nav>

        <div className="flex items-center gap-space-md">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setCalled(true)
                window.setTimeout(() => setCalled(false), 2200)
              }}
              className="hidden lg:flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors font-label-md text-label-md"
            >
              <Icon name="room_service" className="text-[18px] text-primary" />
              <span>Call Server</span>
            </button>
            {called && (
              <span className="absolute right-0 top-full mt-2 whitespace-nowrap rounded-lg bg-inverse-surface px-space-sm py-space-xs text-label-sm font-label-sm text-inverse-on-surface shadow-lg">
                Elena M. is on the way
              </span>
            )}
          </div>
          <Link
            to={config.checkoutPath}
            className="flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-primary hover:bg-primary-container text-on-primary transition-colors font-label-lg text-label-lg"
          >
            <Icon name="shopping_bag" className="text-[20px]" />
            <span className="hidden sm:inline">Order</span>
            <span className="flex items-center justify-center min-w-[20px] h-5 px-space-xs rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm font-bold">
              {cartCount}
            </span>
          </Link>
          <button
            type="button"
            title="Guest profile"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
          >
            <Icon name="person" className="text-on-primary text-[18px]" />
          </button>
        </div>
      </div>
    </header>
  )
}
