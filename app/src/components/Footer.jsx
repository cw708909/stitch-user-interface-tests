import { Link } from 'react-router-dom'
import { flowConfig } from '../data/menu'
import Icon from './Icon'

export default function Footer({ flow }) {
  const otherFlow = flow === 'signature' ? 'pizza' : 'signature'

  return (
    <footer className="w-full bg-surface-container-low py-space-lg">
      <div className="max-w-[1440px] mx-auto px-margin flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant font-body-sm text-body-sm">
        <div className="flex items-center gap-space-sm">
          <Icon name="verified_user" className="text-[18px] text-tertiary" />
          <span>256-bit Encrypted Checkout • Contactless Table Service</span>
        </div>
        <div className="flex items-center gap-space-lg flex-wrap justify-center">
          <Link
            className="text-primary hover:text-primary-container transition-colors font-label-md text-label-md"
            to={flowConfig[otherFlow].menuPath}
          >
            {otherFlow === 'pizza' ? 'Pizza Menu' : 'Signature Menu'}
          </Link>
          <a
            className="text-on-surface-variant hover:text-on-surface transition-colors"
            href="mailto:elena@savor.example?subject=Assistance%20at%20Table%2014"
          >
            Need Assistance?
          </a>
          <span className="text-outline-variant">•</span>
          <span>Table 14</span>
          <span className="text-outline-variant">•</span>
          <span>Savor Dining OS © 2025</span>
        </div>
      </div>
    </footer>
  )
}
