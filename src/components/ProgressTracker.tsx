import { memo, useMemo } from 'react'
import { CalendarDays, Target, Clock } from 'lucide-react'

interface ProgressTrackerProps {
  raceDate?: string
  compact?: boolean
}

export const ProgressTracker = memo(function ProgressTracker({
  raceDate = '2026-06-28',
  compact = false,
}: ProgressTrackerProps) {
  const stats = useMemo(() => {
    const race = new Date(raceDate)
    const now = new Date()
    const start = new Date('2026-01-01') // Début de la prépa

    const totalDays = Math.ceil((race.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    const daysRemaining = Math.ceil((race.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    const daysPassed = totalDays - daysRemaining
    const progress = Math.max(0, Math.min(100, (daysPassed / totalDays) * 100))

    // Calculer la semaine actuelle de prépa
    const weekNumber = Math.max(1, Math.ceil(daysPassed / 7))
    const totalWeeks = Math.ceil(totalDays / 7)

    // Phase actuelle
    let phase = 'Base'
    let phaseColor = '#3b82f6'
    if (weekNumber > 20) {
      phase = 'Affûtage'
      phaseColor = '#f97316'
    } else if (weekNumber > 12) {
      phase = 'Spécifique'
      phaseColor = '#10b981'
    } else if (weekNumber > 4) {
      phase = 'Build'
      phaseColor = '#8b5cf6'
    }

    return {
      daysRemaining,
      daysPassed,
      progress,
      weekNumber,
      totalWeeks,
      phase,
      phaseColor,
    }
  }, [raceDate])

  if (compact) {
    return (
      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-orange-500" />
          <span className="font-mono text-sm font-semibold text-white">J-{stats.daysRemaining}</span>
        </div>
        <div className="w-px h-4 bg-zinc-700" />
        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${stats.progress}%`,
              background: `linear-gradient(90deg, #3b82f6 0%, #8b5cf6 40%, #10b981 70%, #f97316 100%)`,
            }}
          />
        </div>
        <span className="text-xs text-zinc-500">S{stats.weekNumber}/{stats.totalWeeks}</span>
      </div>
    )
  }

  return (
    <div className="data-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-white flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-orange-500" />
          Progression Prépa
        </h3>
        <div
          className="px-2.5 py-1 rounded-full text-xs font-medium"
          style={{ backgroundColor: `${stats.phaseColor}20`, color: stats.phaseColor }}
        >
          {stats.phase}
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 relative"
            style={{
              width: `${stats.progress}%`,
              background: `linear-gradient(90deg, #3b82f6 0%, #8b5cf6 40%, #10b981 70%, #f97316 100%)`,
            }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
          </div>
        </div>

        {/* Phase markers */}
        <div className="flex justify-between text-[10px] text-zinc-600">
          <span>Base</span>
          <span>Build</span>
          <span>Spécifique</span>
          <span>Affûtage</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="font-mono text-2xl font-bold text-white">{stats.daysRemaining}</div>
          <div className="text-xs text-zinc-500">jours restants</div>
        </div>
        <div className="text-center">
          <div className="font-mono text-2xl font-bold text-white">S{stats.weekNumber}</div>
          <div className="text-xs text-zinc-500">sur {stats.totalWeeks}</div>
        </div>
        <div className="text-center">
          <div className="font-mono text-2xl font-bold" style={{ color: stats.phaseColor }}>
            {Math.round(stats.progress)}%
          </div>
          <div className="text-xs text-zinc-500">accompli</div>
        </div>
      </div>

      {/* Countdown to race */}
      <div className="flex items-center justify-center gap-2 pt-2 border-t border-zinc-800">
        <Clock className="w-4 h-4 text-zinc-500" />
        <span className="text-sm text-zinc-400">
          28 juin 2026 · <span className="text-orange-400 font-semibold">Squaw Valley → Auburn</span>
        </span>
      </div>
    </div>
  )
})
