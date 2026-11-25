import { Link } from 'react-router-dom'
import { flowConfig } from '../data/menu'
import { money } from '../utils/format'
import Icon from './Icon'

export default function SuccessModal({ open, onClose, flow, total, email }) {
  if (!open) return null
  const config = flowConfig[flow]

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-space-md bg-inverse-surface/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface-container-lowest rounded-2xl p-space-xl shadow-2xl flex flex-col items-center text-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="w-16 h-16 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary mb-space-md">
          <Icon name={flow === 'pizza' ? 'local_pizza' : 'restaurant'} className="text-[36px]" />
        </div>
        <span className="font-label-md text-label-md px-space-sm py-space-xs rounded-full bg-secondary-container text-on-secondary-fixed mb-space-xs">
          Order Confirmed • {config.orderReference}
        </span>
        <h3 className="font-headline-lg text-headline-lg text-on-surface">Order Sent to Kitchen!</h3>
        <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs mb-space-lg">
          {config.successMessage}
        </p>
        <div className="w-full bg-surface-container-low rounded-xl p-space-md text-left mb-space-lg flex flex-col gap-space-xs">
          <div className="flex justify-between font-label-md text-label-md text-on-surface-variant">
            <span>Table Assignment</span>
            <span className="text-on-surface font-bold">Table 14</span>
          </div>
          <div className="flex justify-between font-label-md text-label-md text-on-surface-variant">
            <span>Total Paid</span>
            <span className="text-primary font-bold">{money(total)}</span>
          </div>
          <div className="flex justify-between font-label-md text-label-md text-on-surface-variant">
            <span>Digital Receipt</span>
            <span className="text-on-surface">{email}</span>
          </div>
        </div>
        <Link
          to={config.menuPath}
          onClick={onClose}
          className="w-full py-space-md rounded-xl bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-center transition-colors shadow-md"
        >
          Return to Table Dashboard
        </Link>
      </div>
    </div>
  )
}
