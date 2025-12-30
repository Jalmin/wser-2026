import { ExternalLink, Book, Video, Podcast } from 'lucide-react'
import { DocsList } from '../components/MarkdownViewer'

export function DocsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <header className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8">
        <p className="text-orange-500 text-sm font-medium uppercase tracking-widest mb-2">Ressources</p>
        <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
        <p className="text-zinc-400 mt-2">Sources, références et outils pour la préparation WSER.</p>
      </header>

      {/* Fichiers du projet - avec viewer */}
      <section>
        <SectionHeader kicker="Contenu" title="Fichiers source" />
        <p className="text-sm text-zinc-500 mt-2 mb-4">Cliquez sur un fichier pour le consulter</p>
        <DocsList />
      </section>

      {/* Références littérature */}
      <section>
        <SectionHeader kicker="Littérature" title="Références scientifiques" />
        <div className="space-y-4 mt-4">
          <div className="rounded-xl border border-zinc-800 p-5">
            <h4 className="font-semibold mb-3">Heat Training</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>• Périard et al. (2015) — Adaptations to heat training in endurance athletes</li>
              <li>• Tyler et al. (2016) — The Effects of Heat Adaptation on Performance</li>
              <li>• Racinais et al. (2015) — Consensus recommendations on training and competing in the heat</li>
            </ul>
          </div>

          <div className="rounded-xl border border-zinc-800 p-5">
            <h4 className="font-semibold mb-3">Gut Training</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>• Jeukendrup (2017) — Training the gut for athletes</li>
              <li>• Cox et al. (2010) — Daily training with high carbohydrate availability</li>
              <li>• Pfeiffer et al. (2012) — Nutritional intake and gastrointestinal problems during competitive endurance events</li>
            </ul>
          </div>

          <div className="rounded-xl border border-zinc-800 p-5">
            <h4 className="font-semibold mb-3">Repeated Bout Effect</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>• Nosaka & Clarkson (1995) — Muscle damage following repeated bouts of high force eccentric exercise</li>
              <li>• Mavropalias et al. (2020) — The repeated bout effect in exercise</li>
              <li>• McHugh (2003) — Recent advances in the understanding of the repeated bout effect</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Livres */}
      <section>
        <SectionHeader kicker="Livres" title="Ouvrages de référence" />
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {[
            {
              title: 'Training Essentials for Ultrarunning',
              author: 'Jason Koop',
              desc: 'Référence pour la planification ultra, chapitres heat et altitude',
            },
            {
              title: 'Running with the Pack',
              author: 'Mark Rowlands',
              desc: 'Philosophie de l\'ultra-endurance',
            },
            {
              title: 'Relentless Forward Progress',
              author: 'Bryon Powell',
              desc: 'Guide pratique 100 miles',
            },
            {
              title: 'Science of Running',
              author: 'Steve Magness',
              desc: 'Physiologie appliquée à la performance',
            },
          ].map((book) => (
            <div key={book.title} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
              <Book className="w-5 h-5 text-orange-500 mb-3" />
              <h4 className="font-semibold">{book.title}</h4>
              <p className="text-sm text-zinc-500 mt-1">{book.author}</p>
              <p className="text-sm text-zinc-400 mt-2">{book.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Podcasts & Vidéos */}
      <section>
        <SectionHeader kicker="Médias" title="Podcasts & Vidéos" />
        <div className="space-y-3 mt-4">
          {[
            { type: 'Podcast', name: 'Some Work All Play (SWAP)', desc: 'David Roche — entraînement trail scientifique', icon: Podcast },
            { type: 'Podcast', name: 'CTS Train Right', desc: 'Jason Koop — préparation 100 miles', icon: Podcast },
            { type: 'Podcast', name: 'Science of Ultra', desc: 'Shawn Bearden — physiologie ultra', icon: Podcast },
            { type: 'Vidéo', name: 'Billy Yang Films', desc: 'Documentaires WSER', icon: Video },
          ].map((media) => (
            <div key={media.name} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 flex items-start gap-4">
              <media.icon className="w-5 h-5 text-zinc-500 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{media.name}</span>
                  <span className="text-xs text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded">{media.type}</span>
                </div>
                <p className="text-sm text-zinc-500 mt-1">{media.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Outils */}
      <section>
        <SectionHeader kicker="Outils" title="Applications & Calculateurs" />
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {[
            { name: 'Strava', desc: 'Suivi activités, analyse performance', url: 'strava.com' },
            { name: 'TrainingPeaks', desc: 'Planification, TSS, CTL', url: 'trainingpeaks.com' },
            { name: 'intervals.icu', desc: 'Analyse avancée gratuite', url: 'intervals.icu' },
            { name: 'UltraSignup', desc: 'Résultats, rankings ultra', url: 'ultrasignup.com' },
          ].map((tool) => (
            <a
              key={tool.name}
              href={`https://${tool.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-zinc-700 hover:bg-zinc-800/30 transition-colors group"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-semibold">{tool.name}</h4>
                <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              </div>
              <p className="text-sm text-zinc-500 mt-1">{tool.desc}</p>
              <p className="text-xs text-orange-500 mt-2">{tool.url}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Données techniques */}
      <section>
        <SectionHeader kicker="Données" title="Chiffres clés WSER" />
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm">
            <tbody>
              {[
                { label: 'Distance', value: '163.4 km / 101.4 miles' },
                { label: 'Dénivelé positif', value: '6004 m / 18,090 ft' },
                { label: 'Dénivelé négatif', value: '7536 m / 22,970 ft' },
                { label: 'Altitude départ', value: '2650 m (Olympic Valley)' },
                { label: 'Altitude arrivée', value: '390 m (Auburn)' },
                { label: 'Point le plus haut', value: '2650 m (Emigrant Pass)' },
                { label: 'Cut-off total', value: '30 heures' },
                { label: 'Date 2026', value: '27-28 juin' },
                { label: 'Départ', value: '5:00 AM' },
              ].map((row) => (
                <tr key={row.label} className="border-b border-zinc-800/50">
                  <td className="py-3 pr-4 text-zinc-500">{row.label}</td>
                  <td className="py-3 font-mono">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Note */}
      <section>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 text-center">
          <p className="text-sm text-zinc-500">
            Documents générés le 24 décembre 2024 — basés sur l'analyse de 1663 activités Strava
          </p>
        </div>
      </section>
    </div>
  )
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <p className="text-orange-500 text-xs font-medium uppercase tracking-widest mb-2">{kicker}</p>
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  )
}
