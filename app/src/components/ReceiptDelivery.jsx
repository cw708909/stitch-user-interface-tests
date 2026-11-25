import { useState } from 'react'
import Icon from './Icon'

export default function ReceiptDelivery() {
  const [email, setEmail] = useState('alexander.w@example.com')
  const [phone, setPhone] = useState('+1 (555) 392-8401')

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
      <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm">Digital Receipt</h2>
      <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
        Choose where to send your itemized receipt &amp; dining invoice.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
        <div>
          <label className="block font-label-md text-label-md text-on-surface-variant mb-space-xs">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-surface-container-low rounded-lg pl-space-md pr-10 py-space-sm text-on-surface font-body-md focus:outline-none focus:bg-surface-container-high transition-colors"
            />
            <Icon
              name="mark_email_read"
              className="text-[18px] text-tertiary absolute right-space-md top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
        <div>
          <label className="block font-label-md text-label-md text-on-surface-variant mb-space-xs">
            Mobile Phone (SMS)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="w-full bg-surface-container-low rounded-lg px-space-md py-space-sm text-on-surface font-body-md focus:outline-none focus:bg-surface-container-high transition-colors"
          />
        </div>
      </div>
    </div>
  )
}
