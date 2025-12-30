import { memo, useState, useEffect, useCallback } from 'react'
import { Check, Circle, Calendar, TrendingUp, Flame, Dumbbell, Utensils } from 'lucide-react'

// Training sessions from the signature workouts
const signatureSessions = [
  {
    id: 'long-run-1',
    category: 'endurance',
    name: 'Sortie Longue #1',
    description: '4-5h Z2 avec nutrition 80g CHO/h',
    targetWeek: 4,
    icon: TrendingUp,
  },
  {
    id: 'long-run-2',
    category: 'endurance',
    name: 'Sortie Longue #2',
    description: '5-6h Z2 terrain vallonné',
    targetWeek: 8,
    icon: TrendingUp,
  },
  {
    id: 'long-run-3',
    category: 'endurance',
    name: 'Sortie Longue #3',
    description: '6-7h simulation race day',
    targetWeek: 12,
    icon: TrendingUp,
  },
  {
    id: 'downhill-1',
    category: 'downhill',
    name: 'Downhill Repeats #1',
    description: '6x descente 300m D- technique',
    targetWeek: 6,
    icon: TrendingUp,
  },
  {
    id: 'downhill-2',
    category: 'downhill',
    name: 'Downhill Repeats #2',
    description: '8x descente 400m D- rapide',
    targetWeek: 10,
    icon: TrendingUp,
  },
  {
    id: 'downhill-3',
    category: 'downhill',
    name: 'Downhill Repeats #3',
    description: '10x descente 500m D- all-out',
    targetWeek: 14,
    icon: TrendingUp,
  },
  {
    id: 'heat-1',
    category: 'heat',
    name: 'Heat Session #1',
    description: '45min sauna post-run',
    targetWeek: 8,
    icon: Flame,
  },
  {
    id: 'heat-2',
    category: 'heat',
    name: 'Heat Session #2',
    description: '60min overdressed run',
    targetWeek: 12,
    icon: Flame,
  },
  {
    id: 'heat-3',
    category: 'heat',
    name: 'Bloc Maroc',
    description: 'Semaine immersion chaleur',
    targetWeek: 16,
    icon: Flame,
  },
  {
    id: 'heat-4',
    category: 'heat',
    name: 'Heat Bloc Final',
    description: '10-14 jours pré-course',
    targetWeek: 24,
    icon: Flame,
  },
  {
    id: 'gut-60',
    category: 'gut',
    name: 'Gut Training 60g/h',
    description: 'Valider 60g CHO/h sur 2h',
    targetWeek: 4,
    icon: Utensils,
  },
  {
    id: 'gut-80',
    category: 'gut',
    name: 'Gut Training 80g/h',
    description: 'Valider 80g CHO/h sur 3h',
    targetWeek: 10,
    icon: Utensils,
  },
  {
    id: 'gut-100',
    category: 'gut',
    name: 'Gut Training 100g/h',
    description: 'Valider 100g CHO/h sur 4h+',
    targetWeek: 16,
    icon: Utensils,
  },
  {
    id: 'muscu-1',
    category: 'muscu',
    name: 'Eccentric Block #1',
    description: '3x/sem pendant 4 semaines',
    targetWeek: 6,
    icon: Dumbbell,
  },
  {
    id: 'muscu-2',
    category: 'muscu',
    name: 'Eccentric Block #2',
    description: 'Maintenance 1x/sem',
    targetWeek: 12,
    icon: Dumbbell,
  },
]

interface CompletedSession {
  id: string
  completedAt: string
  notes?: string
}

const STORAGE_KEY = 'wser-training-log'

export const TrainingLog = memo(function TrainingLog() {
  const [completed, setCompleted] = useState<CompletedSession[]>([])
  const [filter, setFilter] = useState<string>('all')

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setCompleted(JSON.parse(stored))
    }
  }, [])

  // Save to localStorage
  const saveCompleted = useCallback((sessions: CompletedSession[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
    setCompleted(sessions)
  }, [])

  const toggleSession = useCallback((sessionId: string) => {
    const existing = completed.find(c => c.id === sessionId)
    if (existing) {
      saveCompleted(completed.filter(c => c.id !== sessionId))
    } else {
      saveCompleted([...completed, { id: sessionId, completedAt: new Date().toISOString() }])
    }
  }, [completed, saveCompleted])

  const isCompleted = (sessionId: string) => completed.some(c => c.id === sessionId)

  const categories = [
    { id: 'all', label: 'Toutes', color: 'zinc' },
    { id: 'endurance', label: 'Endurance', color: 'blue' },
    { id: 'downhill', label: 'Descente', color: 'orange' },
    { id: 'heat', label: 'Heat', color: 'red' },
    { id: 'gut', label: 'Gut', color: 'green' },
    { id: 'muscu', label: 'Muscu', color: 'purple' },
  ]

  const filteredSessions = filter === 'all'
    ? signatureSessions
    : signatureSessions.filter(s => s.category === filter)

  const completedCount = completed.length
  const totalCount = signatureSessions.length
  const progressPercent = Math.round((completedCount / totalCount) * 100)

  return (
    <div className="data-card overflow-hidden">
      <div className="border-b border-zinc-800 px-5 py-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            Training Log
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">{completedCount}/{totalCount}</span>
            <div className="w-16 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-1 p-3 border-b border-zinc-800 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              filter === cat.id
                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                : 'bg-zinc-800 text-zinc-400 border border-transparent hover:border-zinc-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sessions list */}
      <div className="divide-y divide-zinc-800/50 max-h-[400px] overflow-y-auto">
        {filteredSessions.map((session) => {
          const done = isCompleted(session.id)
          const Icon = session.icon

          return (
            <button
              key={session.id}
              onClick={() => toggleSession(session.id)}
              className={`w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-zinc-800/30 ${
                done ? 'opacity-60' : ''
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                done
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border-zinc-600 hover:border-zinc-500'
              }`}>
                {done ? (
                  <Check className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Circle className="w-3 h-3 text-zinc-600" />
                )}
              </div>

              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                session.category === 'endurance' ? 'bg-blue-500/20' :
                session.category === 'downhill' ? 'bg-orange-500/20' :
                session.category === 'heat' ? 'bg-red-500/20' :
                session.category === 'gut' ? 'bg-green-500/20' :
                'bg-purple-500/20'
              }`}>
                <Icon className={`w-4 h-4 ${
                  session.category === 'endurance' ? 'text-blue-400' :
                  session.category === 'downhill' ? 'text-orange-400' :
                  session.category === 'heat' ? 'text-red-400' :
                  session.category === 'gut' ? 'text-green-400' :
                  'text-purple-400'
                }`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium ${done ? 'line-through text-zinc-500' : 'text-white'}`}>
                  {session.name}
                </div>
                <div className="text-xs text-zinc-500 truncate">{session.description}</div>
              </div>

              <div className="text-xs text-zinc-600">
                S{session.targetWeek}
              </div>
            </button>
          )
        })}
      </div>

      {/* Progress summary */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
        <div className="grid grid-cols-5 gap-2 text-center">
          {categories.slice(1).map((cat) => {
            const catSessions = signatureSessions.filter(s => s.category === cat.id)
            const catCompleted = catSessions.filter(s => isCompleted(s.id)).length
            return (
              <div key={cat.id}>
                <div className={`font-mono text-sm font-semibold ${
                  catCompleted === catSessions.length ? 'text-emerald-400' : 'text-zinc-400'
                }`}>
                  {catCompleted}/{catSessions.length}
                </div>
                <div className="text-[10px] text-zinc-600">{cat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
})
