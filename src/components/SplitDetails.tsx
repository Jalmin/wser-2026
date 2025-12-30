import { memo } from 'react'
import { type SplitData, sections, wserSplits } from '../data/wserSplits'
import { MapPin, Mountain, TrendingUp, TrendingDown, Clock, Route } from 'lucide-react'

interface SplitDetailsProps {
  station: SplitData
  onClose: () => void
}

export const SplitDetails = memo(function SplitDetails({ station, onClose }: SplitDetailsProps) {
  const section = sections.find(s => s.id === station.section)

  // Get previous station for segment info
  const stationIndex = wserSplits.findIndex(s => s.num === station.num)
  const prevStation = stationIndex > 0 ? wserSplits[stationIndex - 1] : null

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/95 backdrop-blur-sm overflow-hidden">
      {/* Header with section color */}
      <div
        className="px-5 py-4 border-b border-zinc-800"
        style={{ background: `linear-gradient(135deg, ${station.sectionColor}15 0%, transparent 100%)` }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${station.sectionColor}20`, border: `1px solid ${station.sectionColor}40` }}
            >
              <MapPin className="w-5 h-5" style={{ color: station.sectionColor }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{station.name}</h3>
              <p className="text-sm text-zinc-400">
                km {station.km} · {section?.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Segment header - between prev and current station */}
        {prevStation && station.sectionKm && (
          <div className="rounded-lg bg-zinc-800/50 p-4 border border-zinc-700">
            <div className="flex items-center gap-2 mb-3">
              <Route className="w-4 h-4" style={{ color: station.sectionColor }} />
              <span className="text-sm font-semibold text-zinc-300">
                Segment : {prevStation.name} → {station.name}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div>
                <div className="font-mono font-bold text-lg text-white">{station.sectionKm} km</div>
                <div className="text-xs text-zinc-500">Distance</div>
              </div>
              <div>
                <div className="font-mono font-bold text-lg text-emerald-400">+{station.dPlus}m</div>
                <div className="text-xs text-zinc-500">D+</div>
              </div>
              <div>
                <div className="font-mono font-bold text-lg text-red-400">-{station.dMinus}m</div>
                <div className="text-xs text-zinc-500">D-</div>
              </div>
              <div>
                <div className="font-mono font-bold text-lg text-white">{station.altitude}m</div>
                <div className="text-xs text-zinc-500">Altitude</div>
              </div>
            </div>
          </div>
        )}

        {/* Station info if no segment */}
        {!prevStation && (
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Altitude"
              value={`${station.altitude}m`}
              icon={<Mountain className="w-4 h-4" />}
              color={station.sectionColor}
            />
            <StatCard
              label="Distance"
              value={`km ${station.km}`}
              icon={<MapPin className="w-4 h-4" />}
              color="#71717a"
            />
          </div>
        )}

        {/* Terrain breakdown */}
        {(station.upKm || station.flatKm || station.downKm) && (
          <div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Répartition terrain</h4>
            <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-zinc-800">
              {station.upKm && station.sectionKm && (
                <div
                  className="bg-emerald-500"
                  style={{ width: `${(station.upKm / station.sectionKm) * 100}%` }}
                  title={`Montée: ${station.upKm}km (${station.upPercent})`}
                />
              )}
              {station.flatKm && station.sectionKm && (
                <div
                  className="bg-zinc-500"
                  style={{ width: `${(station.flatKm / station.sectionKm) * 100}%` }}
                  title={`Plat: ${station.flatKm}km`}
                />
              )}
              {station.downKm && station.sectionKm && (
                <div
                  className="bg-red-500"
                  style={{ width: `${(station.downKm / station.sectionKm) * 100}%` }}
                  title={`Descente: ${station.downKm}km (${station.downPercent})`}
                />
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs text-emerald-400">Montée</span>
                </div>
                <div className="font-mono text-sm text-white">{station.upKm}km</div>
                <div className="text-xs text-emerald-400">{station.upPercent}</div>
              </div>
              <div className="rounded-lg bg-zinc-500/10 border border-zinc-500/20 p-2 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-xs text-zinc-400">→ Plat</span>
                </div>
                <div className="font-mono text-sm text-white">{station.flatKm}km</div>
              </div>
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-2 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingDown className="w-3 h-3 text-red-400" />
                  <span className="text-xs text-red-400">Descente</span>
                </div>
                <div className="font-mono text-sm text-white">{station.downKm}km</div>
                <div className="text-xs text-red-400">{station.downPercent}</div>
              </div>
            </div>
          </div>
        )}

        {/* Reference splits */}
        {station.jeffSplit && (
          <div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              <Clock className="w-3 h-3 inline mr-1" />
              Temps de référence (segment)
            </h4>
            <div className="overflow-x-auto rounded-lg border border-zinc-800">
              <table className="w-full text-sm">
                <thead className="bg-zinc-800/50">
                  <tr>
                    <th className="text-left py-2 px-3 font-medium text-zinc-400">Coureur</th>
                    <th className="text-left py-2 px-3 font-medium text-zinc-400">Split</th>
                    <th className="text-left py-2 px-3 font-medium text-zinc-400">Allure</th>
                  </tr>
                </thead>
                <tbody>
                  <RunnerRow name="Jeff Browning" split={station.jeffSplit} pace={station.jeffPace} highlight />
                  <RunnerRow name="Johanna" split={station.johannaSplit} pace={station.johannaPace} />
                  <RunnerRow name="Jérémie" split={station.jeremieSplit} pace={station.jeremiePace} />
                  <RunnerRow name="Chris" split={station.chrisSplit} pace={station.chrisPace} />
                  <RunnerRow name="Nancy" split={station.nancySplit} pace={station.nancyPace} />
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

const StatCard = memo(function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string
  value: string
  icon: React.ReactNode
  color: string
}) {
  return (
    <div className="rounded-lg bg-zinc-800/50 p-3">
      <div className="flex items-center gap-1.5 mb-1">
        <span style={{ color }}>{icon}</span>
        <span className="text-xs text-zinc-500">{label}</span>
      </div>
      <div className="font-mono font-semibold text-white">{value}</div>
    </div>
  )
})

const RunnerRow = memo(function RunnerRow({
  name,
  split,
  pace,
  highlight,
}: {
  name: string
  split: string | null
  pace: string | null
  highlight?: boolean
}) {
  if (!split) return null

  return (
    <tr className={`border-b border-zinc-800/50 last:border-0 ${highlight ? 'bg-orange-500/10' : ''}`}>
      <td className={`py-2 px-3 ${highlight ? 'font-semibold text-orange-400' : 'text-zinc-300'}`}>
        {name}
      </td>
      <td className="py-2 px-3 font-mono text-zinc-300">{split}</td>
      <td className={`py-2 px-3 font-mono ${highlight ? 'text-orange-400' : 'text-zinc-400'}`}>
        {pace}/km
      </td>
    </tr>
  )
})

// Section summary component
interface SectionSummaryProps {
  sectionId: string
  onClose: () => void
}

export const SectionSummary = memo(function SectionSummary({ sectionId, onClose }: SectionSummaryProps) {
  const section = sections.find(s => s.id === sectionId)
  if (!section) return null

  // Calculate section stats from stations
  const stationsInSection = wserSplits.filter(s => s.section === sectionId && s.sectionKm)
  const totalKm = stationsInSection.reduce((acc, s) => acc + (s.sectionKm || 0), 0)
  const totalDPlus = stationsInSection.reduce((acc, s) => acc + (s.dPlus || 0), 0)
  const totalDMinus = stationsInSection.reduce((acc, s) => acc + (s.dMinus || 0), 0)

  const sectionInfo: Record<string, {
    title: string
    distance: string
    character: string
    challenge: string
    strategy: string
  }> = {
    'high-country': {
      title: 'High Country',
      distance: '0 → 55.4 km',
      character: 'Altitude (2000-2500m), terrain technique, température fraîche le matin',
      challenge: 'Gérer l\'altitude + ne pas partir trop vite. Économiser pour les canyons.',
      strategy: 'Départ conservateur. Se caler sur 7:30-8:00/km. Nutrition 50-60g CHO/h.',
    },
    'canyons': {
      title: 'The Canyons',
      distance: '55.4 → 99.8 km',
      character: 'Chaleur extrême (35-42°C), canyons profonds, 2 grosses montées',
      challenge: 'Thermorégulation + préservation des quads. C\'est LA section décisive.',
      strategy: 'Cooling agressif. "Float" en descente. Nutrition 60-80g CHO/h. Power hike Devil\'s Thumb.',
    },
    'california-loop': {
      title: 'California Loop',
      distance: '99.8 → 128.4 km',
      character: 'Post-Foresthill, California Street avec 3 ravitos, traversée rivière',
      challenge: 'Maintenir l\'allure malgré la fatigue. "The race starts at mile 62".',
      strategy: 'Ne pas relâcher. Augmenter nutrition 90-100g CHO/h. Frontale si nuit.',
    },
    'final-push': {
      title: 'Final Push',
      distance: '128.4 → 161.3 km',
      character: 'Nuit probable, technique, dernières montées vers Robie Point',
      challenge: 'Tout donner. Pousser jusqu\'au bout. Gestion mentale.',
      strategy: 'Push through. Nutrition 100-110g CHO/h même si difficile. Ne jamais s\'arrêter.',
    },
  }

  const info = sectionInfo[sectionId]

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/95 backdrop-blur-sm overflow-hidden">
      <div
        className="px-5 py-4 border-b border-zinc-800"
        style={{ background: `linear-gradient(135deg, ${section.color}15 0%, transparent 100%)` }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">{info.title}</h3>
            <p className="text-sm text-zinc-400">{info.distance}</p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Stats calculated from data */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-zinc-800/50 border border-zinc-700 p-3 text-center">
            <div className="text-xs text-zinc-500 mb-1">Distance</div>
            <div className="font-mono font-semibold text-white">{totalKm.toFixed(1)} km</div>
          </div>
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-center">
            <div className="text-xs text-emerald-400 mb-1">D+</div>
            <div className="font-mono font-semibold text-white">{totalDPlus}m</div>
          </div>
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-center">
            <div className="text-xs text-red-400 mb-1">D-</div>
            <div className="font-mono font-semibold text-white">{totalDMinus}m</div>
          </div>
        </div>

        {/* Aid stations in section */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Ravitaillements ({stationsInSection.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {stationsInSection.map(s => (
              <span key={s.num} className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-400">
                {s.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Caractère</h4>
          <p className="text-sm text-zinc-300">{info.character}</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Défi</h4>
          <p className="text-sm text-zinc-300">{info.challenge}</p>
        </div>

        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: `${section.color}10`, border: `1px solid ${section.color}30` }}
        >
          <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: section.color }}>
            Stratégie
          </h4>
          <p className="text-sm text-zinc-200">{info.strategy}</p>
        </div>
      </div>
    </div>
  )
})
