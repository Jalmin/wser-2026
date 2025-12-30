import { memo } from 'react'

type Status = 'ok' | 'warning' | 'critical'

interface StatusBadgeProps {
  status: Status
  showIcon?: boolean
  className?: string
}

const statusConfig = {
  ok: {
    icon: '✓',
    textClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500/5',
    borderClass: 'border-emerald-500/30',
  },
  warning: {
    icon: '⚠',
    textClass: 'text-yellow-400',
    bgClass: 'bg-yellow-500/5',
    borderClass: 'border-yellow-500/30',
  },
  critical: {
    icon: '✗',
    textClass: 'text-red-400',
    bgClass: 'bg-red-500/5',
    borderClass: 'border-red-500/30',
  },
} as const

export const StatusBadge = memo(function StatusBadge({
  status,
  showIcon = true,
  className = ''
}: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span className={`text-lg font-semibold ${config.textClass} ${className}`}>
      {showIcon && config.icon}
    </span>
  )
})

// Utility function for row background based on status
export function getStatusRowClass(status: Status): string {
  return statusConfig[status].bgClass
}

// Utility function for text color based on status
export function getStatusTextClass(status: Status): string {
  return statusConfig[status].textClass
}

// Utility function for border color based on status
export function getStatusBorderClass(status: Status): string {
  return statusConfig[status].borderClass
}

// Export config for advanced use cases
export { statusConfig }
export type { Status }
