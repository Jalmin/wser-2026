/**
 * Utility functions for consistent styling across components
 */

// Color mapping for section/phase colors
export const colorClassMap = {
  blue: {
    text: 'text-blue-400',
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-500/10',
    border: 'border-blue-500',
    borderL: 'border-l-blue-500',
  },
  orange: {
    text: 'text-orange-400',
    bg: 'bg-orange-500',
    bgLight: 'bg-orange-500/10',
    border: 'border-orange-500',
    borderL: 'border-l-orange-500',
  },
  cyan: {
    text: 'text-cyan-400',
    bg: 'bg-cyan-500',
    bgLight: 'bg-cyan-500/10',
    border: 'border-cyan-500',
    borderL: 'border-l-cyan-500',
  },
  emerald: {
    text: 'text-emerald-400',
    bg: 'bg-emerald-500',
    bgLight: 'bg-emerald-500/10',
    border: 'border-emerald-500',
    borderL: 'border-l-emerald-500',
  },
  yellow: {
    text: 'text-yellow-400',
    bg: 'bg-yellow-500',
    bgLight: 'bg-yellow-500/10',
    border: 'border-yellow-500',
    borderL: 'border-l-yellow-500',
  },
  red: {
    text: 'text-red-400',
    bg: 'bg-red-500',
    bgLight: 'bg-red-500/10',
    border: 'border-red-500',
    borderL: 'border-l-red-500',
  },
  purple: {
    text: 'text-purple-400',
    bg: 'bg-purple-500',
    bgLight: 'bg-purple-500/10',
    border: 'border-purple-500',
    borderL: 'border-l-purple-500',
  },
} as const

export type ColorKey = keyof typeof colorClassMap

export function getColorClasses(color: ColorKey) {
  return colorClassMap[color] || colorClassMap.blue
}

// Status styling utilities
export type Status = 'ok' | 'warning' | 'critical'

export const statusStyles = {
  ok: {
    icon: '✓',
    text: 'text-emerald-400',
    textLight: 'text-emerald-300/80',
    bg: 'bg-emerald-500/5',
    border: 'border-emerald-500/30',
  },
  warning: {
    icon: '⚠',
    text: 'text-yellow-400',
    textLight: 'text-yellow-300/80',
    bg: 'bg-yellow-500/5',
    border: 'border-yellow-500/30',
  },
  critical: {
    icon: '✗',
    text: 'text-red-400',
    textLight: 'text-red-300/80',
    bg: 'bg-red-500/5',
    border: 'border-red-500/30',
  },
} as const

export function getStatusStyles(status: Status) {
  return statusStyles[status]
}

// Key label mapping for data display
export const keyLabelMap: Record<string, string> = {
  dPlus: 'D+',
  dMinus: 'D-',
  altMin: 'Alt min',
  altMax: 'Alt max',
  upKm: 'Montée',
  flatKm: 'Plat',
  downKm: 'Descente',
}

export function getKeyLabel(key: string): string {
  return keyLabelMap[key] || key
}
