import Icon from './Icon'

export default function NotificationBar({ message }) {
  return (
    <div className="w-full bg-surface-container-high py-space-xs px-margin">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between font-label-md text-label-md text-on-surface-variant">
        <div className="flex items-center gap-space-sm">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
          <span className="text-on-surface font-semibold">Kitchen Queue: Fast (~12-15 mins)</span>
          <span className="text-outline-variant">•</span>
          <span>Table 14 active order session #842</span>
        </div>
        <div className="hidden sm:flex items-center gap-space-md">
          <span className="flex items-center gap-1 text-tertiary">
            <Icon name="local_fire_department" className="text-[16px]" />
            {message}
          </span>
        </div>
      </div>
    </div>
  )
}
