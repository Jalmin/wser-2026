/**
 * Date utility functions
 */

export interface CountdownResult {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

/**
 * Calculate countdown to a target date
 */
export function getCountdown(targetDate: string | Date): CountdownResult {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate
  const now = new Date()
  const diff = target.getTime() - now.getTime()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, isExpired: false }
}

/**
 * Format duration in hours to readable string
 */
export function formatDuration(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)}min`
  }
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  return m > 0 ? `${h}h${m.toString().padStart(2, '0')}` : `${h}h`
}

/**
 * Parse pace string (MM:SS) to minutes per km
 */
export function parsePace(pace: string): number {
  const [min, sec] = pace.split(':').map(Number)
  return min + sec / 60
}

/**
 * Format pace as MM:SS/km
 */
export function formatPace(minutesPerKm: number): string {
  const min = Math.floor(minutesPerKm)
  const sec = Math.round((minutesPerKm - min) * 60)
  return `${min}:${sec.toString().padStart(2, '0')}`
}
