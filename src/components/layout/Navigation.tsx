import { NavLink } from 'react-router-dom'
import { Home, Map, User, Calendar, BookOpen, FileText } from 'lucide-react'
import { ProgressTracker } from '../ProgressTracker'

const nav = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Course', href: '/course', icon: Map },
  { name: 'Profil', href: '/profil', icon: User },
  { name: 'Plan', href: '/plan', icon: Calendar },
  { name: 'Méthodes', href: '/methodes', icon: BookOpen },
  { name: 'Docs', href: '/docs', icon: FileText },
]

export function Navigation({ variant }: { variant: 'sidebar' | 'bottom' }) {
  if (variant === 'bottom') {
    return (
      <nav className="grid grid-cols-6 gap-1 p-2">
        {nav.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-xl py-2 text-xs transition-colors ${
                  isActive ? 'bg-zinc-800 text-white' : 'text-zinc-500'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          )
        })}
      </nav>
    )
  }

  return (
    <nav className="space-y-4">
      <div className="mb-6">
        <div className="text-xl font-semibold tracking-tight">WSER 2026</div>
        <div className="text-xs uppercase tracking-widest text-zinc-500 mt-1">Préparation</div>
      </div>

      {/* Progress Tracker */}
      <ProgressTracker compact />

      <div className="space-y-1 pt-2">
        {nav.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 border transition-all ${
                  isActive
                    ? 'bg-zinc-900 border-zinc-700 text-white'
                    : 'border-transparent text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
