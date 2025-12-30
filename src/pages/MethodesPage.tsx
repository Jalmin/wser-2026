import { useState } from 'react'
import { Thermometer, Utensils, Dumbbell, Zap } from 'lucide-react'
import { SignatureTab } from './MethodesPage/SignatureTab'
import { HeatTab } from './MethodesPage/HeatTab'
import { GutTab } from './MethodesPage/GutTab'
import { MuscuTab } from './MethodesPage/MuscuTab'

type TabId = 'signature' | 'heat' | 'gut' | 'muscu'

export function MethodesPage() {
  const [activeTab, setActiveTab] = useState<TabId>('signature')

  const tabs = [
    { id: 'signature' as const, label: 'Seances Signature', icon: Zap, desc: '4 seances cles' },
    { id: 'heat' as const, label: 'Heat Training', icon: Thermometer, desc: 'Acclimatation chaleur' },
    { id: 'gut' as const, label: 'Gut Training', icon: Utensils, desc: 'Entrainement intestinal' },
    { id: 'muscu' as const, label: 'Muscu Excentrique', icon: Dumbbell, desc: 'Repeated Bout Effect' },
  ]

  return (
    <div className="space-y-8">
      {/* Hero avec image */}
      <header className="relative -mx-4 md:-mx-6 -mt-6">
        <div className="relative h-[300px] md:h-[380px] overflow-hidden">
          <img
            src="/images/wserriver.png"
            alt="Traversee de l'American River"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-end">
            <div className="p-6 md:p-8 w-full">
              <p className="kicker">Protocoles d'entrainement</p>
              <h1 className="headline-xl mt-2">Les Methodes</h1>
              <p className="text-lg text-zinc-300 mt-4 max-w-3xl">
                4 piliers d'entrainement specifiques WSER. Chaque protocole cible un gap identifie dans ton profil
                et a ete calibre pour 6 mois de preparation.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs enrichis */}
      <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-zinc-800 z-30 -mx-4 px-4 md:-mx-6 md:px-6 py-2">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-orange-500/10 border border-orange-500/30'
                  : 'hover:bg-zinc-800/50 border border-transparent'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                activeTab === tab.id ? 'bg-orange-500/20' : 'bg-zinc-800'
              }`}>
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-orange-400' : 'text-zinc-500'}`} />
              </div>
              <div>
                <div className={`text-sm font-medium ${activeTab === tab.id ? 'text-white' : 'text-zinc-400'}`}>
                  {tab.label}
                </div>
                <div className="text-xs text-zinc-500 hidden md:block">{tab.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-10">
        {activeTab === 'signature' && <SignatureTab />}
        {activeTab === 'heat' && <HeatTab />}
        {activeTab === 'gut' && <GutTab />}
        {activeTab === 'muscu' && <MuscuTab />}
      </div>
    </div>
  )
}
