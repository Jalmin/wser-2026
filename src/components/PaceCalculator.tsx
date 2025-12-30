import { memo, useState, useMemo } from 'react'
import { Calculator } from 'lucide-react'
import { sections } from '../data/wserSplits'

interface SectionPace {
  name: string
  km: number
  estimatedTime: string
  pace: string
  arrivalTime: string
  color: string
}

export const PaceCalculator = memo(function PaceCalculator() {
  const [targetHours, setTargetHours] = useState(20)
  const [targetMinutes, setTargetMinutes] = useState(0)
  const [startTime, setStartTime] = useState('05:00')

  const calculations = useMemo(() => {
    const totalMinutes = targetHours * 60 + targetMinutes
    const totalKm = 163.3
    const avgPaceSeconds = (totalMinutes * 60) / totalKm

    // Données des sections avec leurs caractéristiques
    const sectionData = [
      { id: 'high-country', name: 'High Country', km: 55.4, dPlus: 2200, dMinus: 1800, factor: 1.08 },
      { id: 'canyons', name: 'The Canyons', km: 44.4, dPlus: 1800, dMinus: 2400, factor: 1.15 },
      { id: 'california-loop', name: 'California Loop', km: 28.6, dPlus: 800, dMinus: 1200, factor: 1.05 },
      { id: 'final-push', name: 'Final Push', km: 34.9, dPlus: 1200, dMinus: 2100, factor: 1.02 },
    ]

    // Calculer le facteur total pour normaliser
    const totalFactor = sectionData.reduce((sum, s) => sum + s.km * s.factor, 0)
    const baseTimePerKm = totalMinutes / (totalFactor / sectionData.reduce((sum, s) => sum + s.km, 0) * totalKm)

    // Parser l'heure de départ
    const [startHour, startMin] = startTime.split(':').map(Number)
    let currentMinutes = startHour * 60 + startMin

    const sectionPaces: SectionPace[] = sectionData.map((section) => {
      const sectionColor = sections.find(s => s.id === section.id)?.color || '#f97316'
      const adjustedPace = baseTimePerKm * section.factor
      const sectionTimeMinutes = section.km * adjustedPace

      const paceMin = Math.floor(adjustedPace)
      const paceSec = Math.round((adjustedPace - paceMin) * 60)

      const hours = Math.floor(sectionTimeMinutes / 60)
      const mins = Math.round(sectionTimeMinutes % 60)

      currentMinutes += sectionTimeMinutes
      const arrivalHour = Math.floor(currentMinutes / 60) % 24
      const arrivalMin = Math.round(currentMinutes % 60)

      return {
        name: section.name,
        km: section.km,
        estimatedTime: `${hours}h${mins.toString().padStart(2, '0')}`,
        pace: `${paceMin}:${paceSec.toString().padStart(2, '0')}`,
        arrivalTime: `${arrivalHour.toString().padStart(2, '0')}:${arrivalMin.toString().padStart(2, '0')}`,
        color: sectionColor,
      }
    })

    const avgPaceMin = Math.floor(avgPaceSeconds / 60)
    const avgPaceSec = Math.round(avgPaceSeconds % 60)

    return {
      sectionPaces,
      avgPace: `${avgPaceMin}:${avgPaceSec.toString().padStart(2, '0')}`,
      finishTime: sectionPaces[sectionPaces.length - 1]?.arrivalTime || '--:--',
    }
  }, [targetHours, targetMinutes, startTime])

  return (
    <div className="data-card overflow-hidden">
      <div className="border-b border-zinc-800 px-5 py-4">
        <h3 className="font-display font-semibold text-white flex items-center gap-2">
          <Calculator className="w-5 h-5 text-orange-500" />
          Pace Calculator
        </h3>
      </div>

      <div className="p-5 space-y-5">
        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-zinc-500 mb-2">Temps cible</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  min={14}
                  max={30}
                  value={targetHours}
                  onChange={(e) => setTargetHours(Number(e.target.value))}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white font-mono text-center focus:border-orange-500 focus:outline-none"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-500">h</span>
              </div>
              <div className="relative flex-1">
                <input
                  type="number"
                  min={0}
                  max={59}
                  step={5}
                  value={targetMinutes}
                  onChange={(e) => setTargetMinutes(Number(e.target.value))}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white font-mono text-center focus:border-orange-500 focus:outline-none"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-500">m</span>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-2">Heure départ</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white font-mono text-center focus:border-orange-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 py-3 px-4 rounded-lg bg-zinc-800/50">
          <div className="text-center">
            <div className="text-xs text-zinc-500 mb-1">Allure moy.</div>
            <div className="font-mono font-bold text-lg text-white">{calculations.avgPace}/km</div>
          </div>
          <div className="text-center border-x border-zinc-700">
            <div className="text-xs text-zinc-500 mb-1">Arrivée</div>
            <div className="font-mono font-bold text-lg text-orange-400">{calculations.finishTime}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-zinc-500 mb-1">Distance</div>
            <div className="font-mono font-bold text-lg text-white">163.3 km</div>
          </div>
        </div>

        {/* Section breakdown */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Par section</h4>
          <div className="space-y-1">
            {calculations.sectionPaces.map((section) => (
              <div
                key={section.name}
                className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800"
              >
                <div
                  className="w-1 h-8 rounded-full"
                  style={{ backgroundColor: section.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{section.name}</div>
                  <div className="text-xs text-zinc-500">{section.km} km</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm text-white">{section.pace}/km</div>
                  <div className="text-xs text-zinc-500">{section.estimatedTime}</div>
                </div>
                <div className="text-right pl-3 border-l border-zinc-700">
                  <div className="font-mono text-sm font-semibold" style={{ color: section.color }}>
                    {section.arrivalTime}
                  </div>
                  <div className="text-xs text-zinc-600">arrivée</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex gap-2 pt-2 border-t border-zinc-800">
          {[
            { label: 'Sub-20h', hours: 19, mins: 55 },
            { label: '21h', hours: 21, mins: 0 },
            { label: '24h', hours: 24, mins: 0 },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setTargetHours(preset.hours)
                setTargetMinutes(preset.mins)
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                targetHours === preset.hours && targetMinutes === preset.mins
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
})
