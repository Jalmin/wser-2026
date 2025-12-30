import { TrendingUp, Activity, Timer, Zap, Mountain, Target } from 'lucide-react'

export function ProfilPage() {
  return (
    <div className="space-y-12">
      {/* Hero avec image */}
      <header className="relative -mx-4 md:-mx-6 -mt-6">
        <div className="relative h-[300px] md:h-[380px] overflow-hidden">
          <img
            src="/images/wserbridge.png"
            alt="No Hands Bridge Western States"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-end">
            <div className="p-6 md:p-8 w-full">
              <p className="kicker">Analyse Strava · 1663 activités</p>
              <h1 className="headline-xl mt-2">Mon Profil</h1>
              <p className="text-lg text-zinc-300 mt-4 max-w-3xl">
                D'où je pars — Analyse de <strong className="text-white">1663 activités Strava</strong> (2015-2025).
                Le moteur aérobie est là — l'enjeu c'est la <span className="text-orange-500 font-semibold">spécificité WSER</span>.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Section 1 : État des lieux */}
      <section>
        <SectionHeader kicker="01 · État des lieux" title="Vue d'ensemble" />

        <div className="flex items-center gap-8 mt-6">
          <div>
            <div className="stat-mega-sm">★680</div>
            <div className="text-sm text-zinc-500">Index UTMB</div>
          </div>
          <div className="prose-magazine">
            1663 activités analysées. 25 × 100 miles. Le moteur aérobie est là — l'enjeu c'est la <strong>spécificité WSER</strong>.
          </div>
        </div>

        <div className="overflow-x-auto mt-8 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Métrique</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Valeur</th>
              </tr>
            </thead>
            <tbody>
              {[
                { metric: 'Expérience ultra', value: '25 × 100 miles en 5 ans', highlight: true },
                { metric: 'Index UTMB', value: '680' },
                { metric: 'Volume annuel moyen', value: '3,500 km / 95,000m D+' },
                { metric: 'Heures hebdo typiques', value: '6-9h' },
                { metric: 'Contrainte déclarée', value: '10h/semaine max', highlight: true },
              ].map((row) => (
                <tr key={row.metric} className="border-t border-zinc-800/50">
                  <td className="py-3 px-4 font-medium">{row.metric}</td>
                  <td className={`py-3 px-4 ${row.highlight ? 'text-orange-400 font-semibold' : 'text-zinc-300'}`}>
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Régularité */}
        <div className="mt-10">
          <h3 className="headline-lg text-lg">Régularité — Point fort majeur</h3>
          <p className="prose-magazine mt-4">
            Sur <strong>102 semaines analysées</strong> (2024-2025) :
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { value: '0', label: 'Semaines à 0 run', color: 'emerald' },
              { value: '14', label: 'Semaines 1-2 runs', sublabel: '14%', color: 'zinc' },
              { value: '38', label: 'Semaines 3-4 runs', sublabel: '37%', color: 'zinc' },
              { value: '50', label: 'Semaines 5+ runs', sublabel: '49%', color: 'orange' },
            ].map((stat) => (
              <div key={stat.label} className={`rounded-xl border p-5 text-center ${
                stat.color === 'emerald' ? 'border-emerald-500/30 bg-emerald-500/5' :
                stat.color === 'orange' ? 'border-orange-500/30 bg-orange-500/5' :
                'border-zinc-800 bg-zinc-900/50'
              }`}>
                <div className={`text-3xl font-bold font-mono ${
                  stat.color === 'emerald' ? 'text-emerald-400' :
                  stat.color === 'orange' ? 'text-orange-400' : ''
                }`}>{stat.value}</div>
                <div className="text-sm text-zinc-400 mt-1">{stat.label}</div>
                {stat.sublabel && <div className="text-xs text-zinc-500">{stat.sublabel}</div>}
              </div>
            ))}
          </div>

          <p className="text-sm text-zinc-400 mt-4">
            Volume médian : <span className="font-mono text-white">53 km/semaine</span> (P25: 38 km, P75: 66 km)
          </p>

          <div className="pull-quote mt-6">
            <p className="text-zinc-300 leading-relaxed">
              La consistance est un avantage compétitif majeur. La plupart des coureurs oscillent entre grosses semaines et absences.
              Cette régularité permet des adaptations profondes sur le long terme.
            </p>
          </div>
        </div>

        {/* Sorties longues */}
        <div className="mt-10">
          <h3 className="headline-lg text-lg">Distribution des sorties longues</h3>

          <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/80">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-zinc-400">Durée</th>
                  <th className="text-left py-3 px-4 font-medium text-zinc-400">Total</th>
                  <th className="text-left py-3 px-4 font-medium text-zinc-400">Courses</th>
                  <th className="text-left py-3 px-4 font-medium text-zinc-400">Entraînements</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { duree: '>2h', total: '39', courses: '12 (31%)', entrainements: '27 (69%)' },
                  { duree: '>3h', total: '18', courses: '9 (50%)', entrainements: '9 (50%)' },
                  { duree: '>5h', total: '13', courses: '9 (69%)', entrainements: '4 (31%)', highlight: true },
                ].map((row) => (
                  <tr key={row.duree} className={`border-t border-zinc-800/50 ${row.highlight ? 'bg-yellow-500/10' : ''}`}>
                    <td className={`py-3 px-4 font-medium ${row.highlight ? 'text-yellow-400' : ''}`}>{row.duree}</td>
                    <td className="py-3 px-4 text-zinc-300">{row.total}</td>
                    <td className={`py-3 px-4 ${row.highlight ? 'text-yellow-400 font-semibold' : 'text-zinc-400'}`}>{row.courses}</td>
                    <td className="py-3 px-4 text-zinc-400">{row.entrainements}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pull-quote mt-6">
            <p className="text-zinc-300 leading-relaxed">
              La majorité des très longues = en course, pas en entraînement contrôlé. C'est le gap #3.
            </p>
          </div>

          <p className="prose-magazine mt-4">
            <strong>Pourquoi c'est critique :</strong> En course, impossible de contrôler nutrition, allure, récupération.
            Le stimulus est maximal mais non-répétable. Les adaptations aérobies profondes se construisent en entraînement contrôlé Z2, pas en compétition.
          </p>

          <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5 mt-6">
            <h4 className="font-semibold text-cyan-400 mb-2">Recommandation littérature (Koop, Millet)</h4>
            <ul className="text-sm text-zinc-300 space-y-1">
              <li>• 15-20 sorties &gt;3h dans les 6 mois pré-course</li>
              <li>• 5-6 sorties &gt;5h minimum</li>
              <li>• Majorité en ENTRAÎNEMENT, pas en course</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2 : Top 5 Performances */}
      <section>
        <SectionHeader kicker="02 · Performances" title="Top 5 Performances" />

        <div className="overflow-x-auto mt-8 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">#</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Index</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Course</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Distance</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">D+</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Temps</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Rang</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rank: '1', index: '677', course: 'Templiers 2021', dist: '108.5 km', dplus: '4840m', time: '13:45:09', rang: '27/769', highlight: true },
                { rank: '2', index: '669', course: 'Kullamannen 2022', dist: '161 km', dplus: '2150m', time: '19:12:16', rang: '15/259' },
                { rank: '3', index: '669', course: 'UT4M Xtrem 2022', dist: '171.8 km', dplus: '12050m', time: '35:22:07', rang: '10/88' },
                { rank: '4', index: '668', course: 'Aigueblanche 2021', dist: '51 km', dplus: '3020m', time: '6:15:01', rang: '8/78' },
                { rank: '5', index: '660', course: 'UTMJ 2022', dist: '175.5 km', dplus: '7618m', time: '27:39:31', rang: '6/64' },
              ].map((row) => (
                <tr key={row.course} className={`border-t border-zinc-800/50 ${row.highlight ? 'bg-orange-500/10' : ''}`}>
                  <td className="py-3 px-4 font-mono text-zinc-500">{row.rank}</td>
                  <td className={`py-3 px-4 font-mono font-bold ${row.highlight ? 'text-orange-400' : 'text-white'}`}>{row.index}</td>
                  <td className={`py-3 px-4 font-medium ${row.highlight ? 'text-orange-400' : ''}`}>{row.course}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.dist}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.dplus}</td>
                  <td className="py-3 px-4 font-mono text-zinc-300">{row.time}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.rang}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pull-quote mt-6">
          <p className="text-zinc-300 leading-relaxed">
            <strong>Polyvalence complète :</strong> Index stable 655-677 sur toutes les distances (51km → 175km) et tous les profils (1450m → 12050m D+).
          </p>
        </div>

        <p className="prose-magazine mt-4">
          <strong>Période de pic :</strong> 2021-2022 = 5 courses à 660+ en 12 mois. Niveau actuel (2024) : 634 Kullamannen.
        </p>

        {/* Objectif WSER */}
        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-5 mt-6">
          <h4 className="font-semibold text-orange-400 mb-2">Objectif WSER</h4>
          <p className="text-lg font-mono text-white">Sub-20h = 163km en &lt;20h = 7:21/km moyenne</p>
          <p className="text-sm text-zinc-400 mt-2">
            Validé par Kullamannen 2022 (19:12, 15ème) — même distance, terrain roulant similaire.
          </p>
        </div>

        {/* Pertinence pour WSER */}
        <h3 className="headline-lg text-lg mt-10">Pertinence pour WSER</h3>

        <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Référence</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Index</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Pertinence</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Ce que ça valide</th>
              </tr>
            </thead>
            <tbody>
              {[
                { ref: 'Kullamannen 2022', index: '669', pertinence: '⭐⭐⭐', valide: '100 miles en 19:12 = marge +12s/km' },
                { ref: 'UT4M 2022', index: '669', pertinence: '⭐⭐⭐', valide: '12050m D+ = capacité descente sur 35h' },
                { ref: 'UTMJ 2022', index: '660', pertinence: '⭐⭐', valide: '175km / 7618m en 27h39' },
                { ref: 'Ecotrail 2023', index: '655', pertinence: '⭐⭐', valide: '5:30/km = réserve vitesse canyons' },
              ].map((row) => (
                <tr key={row.ref} className="border-t border-zinc-800/50">
                  <td className="py-3 px-4 font-medium">{row.ref}</td>
                  <td className="py-3 px-4 font-mono text-orange-400">{row.index}</td>
                  <td className="py-3 px-4">{row.pertinence}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.valide}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pull-quote mt-6">
          <p className="text-zinc-300 leading-relaxed">
            Le moteur est validé sur TOUS les formats. L'enjeu WSER = combiner ces capacités dans des conditions spécifiques (7536m D-, 40°C canyons).
          </p>
        </div>
      </section>

      {/* Section 3 : Analyse du fade */}
      <section>
        <SectionHeader kicker="03 · Analyse du fade" title="Ce que les données GPS révèlent vraiment" />

        <div className="prose-magazine mt-6">
          <p>
            <strong>Le fade</strong> mesure de combien tu ralentis entre le début et la fin de ta course.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 mt-6">
          <h4 className="font-semibold text-zinc-300 mb-3">Méthode de calcul</h4>
          <ol className="text-sm text-zinc-400 space-y-1 list-decimal list-inside">
            <li>On divise la course en 10 tranches égales (déciles)</li>
            <li>D1 = allure moyenne sur les premiers 10%</li>
            <li>D10 = allure moyenne sur les derniers 10%</li>
            <li>Fade = (D10 - D1) / D1 × 100</li>
          </ol>
          <p className="text-sm text-zinc-500 mt-3">
            <em>Exemple : Si tu fais 6'/km au D1 et 7.2'/km au D10 → Fade = +20%</em>
          </p>
        </div>

        {/* Le problème méthodologique */}
        <h3 className="headline-lg text-lg mt-10">Le problème méthodologique</h3>

        <p className="prose-magazine mt-4">
          Quand on compare des allures entre courses de profils différents, on compare des pommes et des oranges.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="text-sm text-zinc-500">TDS 2024 — D1 sur montée à +10%</div>
            <div className="font-mono text-2xl font-bold mt-1">8.7'/km</div>
            <div className="text-xs text-zinc-500 mt-1">= effort modéré</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="text-sm text-zinc-500">Kullamannen 2024 — D1 sur plat</div>
            <div className="font-mono text-2xl font-bold mt-1">5.3'/km</div>
            <div className="text-xs text-zinc-500 mt-1">= effort soutenu</div>
          </div>
        </div>

        <p className="text-sm text-zinc-400 mt-4">
          Ces allures ne représentent PAS le même effort. Le terrain montagneux "masque" la fatigue dans les stats brutes.
        </p>

        {/* La solution : GAP */}
        <h3 className="headline-lg text-lg mt-10">La solution : le GAP (Grade Adjusted Pace)</h3>

        <p className="prose-magazine mt-4">
          Le GAP normalise l'allure en fonction de la pente pour obtenir un "équivalent plat".
        </p>

        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5 mt-6">
          <h4 className="font-semibold text-cyan-400 mb-2">Principe</h4>
          <ul className="text-sm text-zinc-300 space-y-1">
            <li>• <strong>Montée</strong> → on divise l'allure par un facteur &gt;1 (c'est plus dur)</li>
            <li>• <strong>Descente légère</strong> → on divise par un facteur &lt;1 (c'est plus facile)</li>
            <li>• <strong>Descente raide</strong> → on divise par un facteur &gt;1 (freinage coûteux)</li>
          </ul>
          <p className="text-sm text-zinc-400 mt-3">
            <strong>Résultat :</strong> On compare l'EFFORT réel, pas la vitesse apparente.
          </p>
        </div>

        {/* Tableau comparatif */}
        <h3 className="headline-lg text-lg mt-10">Fade BRUT vs Fade GAP</h3>

        <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Course</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">D+/km</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Fade BRUT</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Fade GAP</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Écart</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Ce que ça révèle</th>
              </tr>
            </thead>
            <tbody>
              {[
                { course: 'Ecotrail 80', dpkm: '25 m/km', brut: '+26%', gap: '+27%', ecart: '+1 pt', revele: 'Parcours plat → pas de masquage' },
                { course: 'Kullamannen 2024', dpkm: '33 m/km', brut: '+45%', gap: '+47%', ecart: '+2 pts', revele: 'Parcours peu vallonné → fiable' },
                { course: 'Kullamannen 2022', dpkm: '28 m/km', brut: '+76%', gap: '+72%', ecart: '-5 pts', revele: 'Parcours peu vallonné → fiable', highlight: 'red' },
                { course: 'Templiers 2021', dpkm: '53 m/km', brut: '+23%', gap: '+40%', ecart: '+16 pts', revele: 'Terrain masque partiellement', highlight: 'green' },
                { course: 'Istria 100mi', dpkm: '52 m/km', brut: '+18%', gap: '+44%', ecart: '+26 pts', revele: 'Terrain masque fortement' },
                { course: 'TDS 2024', dpkm: '68 m/km', brut: '+13%', gap: '+55%', ecart: '+43 pts', revele: 'Terrain masque très fortement' },
                { course: 'UTMJ 2022', dpkm: '54 m/km', brut: '+38%', gap: '+72%', ecart: '+34 pts', revele: 'Terrain masque fortement' },
                { course: 'Maquisards', dpkm: '49 m/km', brut: '+27%', gap: '+80%', ecart: '+54 pts', revele: 'Terrain masque très fortement', highlight: 'red' },
              ].map((row) => (
                <tr key={row.course} className={`border-t border-zinc-800/50 ${
                  row.highlight === 'green' ? 'bg-emerald-500/10' :
                  row.highlight === 'red' ? 'bg-red-500/10' : ''
                }`}>
                  <td className="py-3 px-4 font-medium">{row.course}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.dpkm}</td>
                  <td className="py-3 px-4 font-mono text-zinc-400">{row.brut}</td>
                  <td className={`py-3 px-4 font-mono font-semibold ${
                    row.highlight === 'green' ? 'text-emerald-400' :
                    row.highlight === 'red' ? 'text-red-400' : 'text-orange-400'
                  }`}>{row.gap}</td>
                  <td className="py-3 px-4 text-zinc-500">{row.ecart}</td>
                  <td className="py-3 px-4 text-zinc-400 text-xs">{row.revele}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ce que ça change */}
        <h3 className="headline-lg text-lg mt-10">Ce que ça change</h3>

        <div className="space-y-6 mt-6">
          {/* Point 1 */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h4 className="font-semibold text-zinc-300 mb-3">1. La "bonne gestion" sur parcours difficile était une illusion</h4>
            <p className="text-sm text-zinc-400">
              Le fade brut de +13% au TDS ne signifie pas "excellente gestion". Ça signifie que le terrain montagneux a mécaniquement :
            </p>
            <ul className="text-sm text-zinc-400 mt-2 space-y-1">
              <li>• Ralenti les km de début (montées)</li>
              <li>• Accéléré les km de fin (descentes/plats)</li>
            </ul>
            <p className="text-sm text-orange-400 mt-3">
              → En effort réel (GAP), tu avais +55% de fade — tu t'es quand même bien fatigué.
            </p>
          </div>

          {/* Point 2 */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h4 className="font-semibold text-zinc-300 mb-3">2. La corrélation D+/km → fade était un artefact</h4>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg bg-zinc-800/50 p-3 text-center">
                <div className="text-xs text-zinc-500">D+/km vs Fade BRUT</div>
                <div className="font-mono text-xl font-bold text-red-400 mt-1">r = -0.64</div>
                <div className="text-xs text-emerald-400">✅ Significatif</div>
              </div>
              <div className="rounded-lg bg-zinc-800/50 p-3 text-center">
                <div className="text-xs text-zinc-500">D+/km vs Fade GAP</div>
                <div className="font-mono text-xl font-bold text-zinc-400 mt-1">r = +0.22</div>
                <div className="text-xs text-zinc-500">❌ Non significatif</div>
              </div>
            </div>
            <p className="text-sm text-orange-400 mt-4">
              → La corrélation disparaît quand on corrige pour le terrain. La difficulté du parcours n'influence PAS ta gestion d'effort.
            </p>
          </div>

          {/* Point 3 */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
            <h4 className="font-semibold text-emerald-400 mb-3">3. Kullamannen 2024 n'était pas si mal</h4>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg bg-zinc-800/50 p-3 text-center">
                <div className="text-xs text-zinc-500">Kullamannen 2024</div>
                <div className="font-mono text-xl font-bold text-white mt-1">+47% GAP</div>
              </div>
              <div className="rounded-lg bg-zinc-800/50 p-3 text-center">
                <div className="text-xs text-zinc-500">TDS 2024</div>
                <div className="font-mono text-xl font-bold text-white mt-1">+55% GAP</div>
              </div>
            </div>
            <p className="text-sm text-zinc-300 mt-4">
              En réalité, tu as géré de façon SIMILAIRE les deux courses.
              La différence de fade brut (+45% vs +13%) était due au terrain, pas à ta gestion.
            </p>
          </div>

          {/* Point 4 */}
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <h4 className="font-semibold text-red-400 mb-3">4. Le vrai crash reste Kullamannen 2022</h4>
            <div className="text-center py-4">
              <div className="font-mono text-4xl font-bold text-red-400">+72%</div>
              <div className="text-sm text-zinc-400 mt-1">Fade GAP (2e pire)</div>
            </div>
            <p className="text-sm text-zinc-300">
              Et comme le terrain est peu vallonné, ce chiffre est fiable.
              → C'est bien un vrai problème (gestion/nutrition/départ trop rapide).
            </p>
          </div>
        </div>

        {/* Nouveau classement */}
        <h3 className="headline-lg text-lg mt-10">Nouveau classement (basé sur le GAP)</h3>

        <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Rang</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Course</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Fade GAP</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Interprétation</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rang: '1', course: 'Ecotrail 80', gap: '+27%', interp: 'Meilleure gestion d\'effort', color: 'emerald' },
                { rang: '2', course: 'Templiers 2021', gap: '+40%', interp: 'Bonne gestion', color: 'emerald' },
                { rang: '3', course: 'Istria 100mi', gap: '+44%', interp: 'Correct pour 168km', color: 'zinc' },
                { rang: '4', course: 'Kullamannen 2024', gap: '+47%', interp: 'Correct', color: 'zinc' },
                { rang: '5', course: 'TDS 2024', gap: '+55%', interp: 'Moyen', color: 'yellow' },
                { rang: '6', course: 'Kullamannen 2022', gap: '+72%', interp: 'Crash', color: 'red' },
                { rang: '7', course: 'UTMJ 2022', gap: '+72%', interp: 'Crash (mais 179km)', color: 'red' },
                { rang: '8', course: 'Maquisards', gap: '+80%', interp: 'Pire gestion', color: 'red' },
              ].map((row) => (
                <tr key={row.course} className={`border-t border-zinc-800/50 ${
                  row.color === 'emerald' ? 'bg-emerald-500/10' :
                  row.color === 'red' ? 'bg-red-500/10' :
                  row.color === 'yellow' ? 'bg-yellow-500/10' : ''
                }`}>
                  <td className="py-3 px-4 font-mono text-zinc-500">{row.rang}</td>
                  <td className={`py-3 px-4 font-medium ${
                    row.color === 'emerald' ? 'text-emerald-400' :
                    row.color === 'red' ? 'text-red-400' : ''
                  }`}>{row.course}</td>
                  <td className={`py-3 px-4 font-mono font-semibold ${
                    row.color === 'emerald' ? 'text-emerald-400' :
                    row.color === 'red' ? 'text-red-400' :
                    row.color === 'yellow' ? 'text-yellow-400' : 'text-zinc-300'
                  }`}>{row.gap}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.interp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Conclusions corrigées */}
        <h3 className="headline-lg text-lg mt-10">Conclusions corrigées</h3>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <h4 className="font-semibold text-red-400 mb-3">Ce qui était FAUX</h4>
            <ul className="text-sm text-zinc-300 space-y-3">
              <li>
                <span className="text-red-400">❌</span> "Tu gères mieux sur parcours difficile"
                <p className="text-xs text-zinc-500 mt-1">→ Le terrain difficile MASQUAIT ta fatigue dans les stats brutes</p>
              </li>
              <li>
                <span className="text-red-400">❌</span> "TDS 2024 est ta course la mieux gérée"
                <p className="text-xs text-zinc-500 mt-1">→ En effort réel, tu avais +55% de fade</p>
              </li>
              <li>
                <span className="text-red-400">❌</span> "Kullamannen 2024 était mal géré"
                <p className="text-xs text-zinc-500 mt-1">→ +47% GAP ≈ +55% TDS GAP (similaire)</p>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
            <h4 className="font-semibold text-emerald-400 mb-3">Ce qui reste VRAI</h4>
            <ul className="text-sm text-zinc-300 space-y-3">
              <li>
                <span className="text-emerald-400">✅</span> Kullamannen 2022 était un vrai crash (+72% GAP sur terrain fiable)
              </li>
              <li>
                <span className="text-emerald-400">✅</span> Templiers 2021 reste ta meilleure perf longue (+40% GAP, index 677)
              </li>
              <li>
                <span className="text-emerald-400">✅</span> Le pattern crash km 20-40 existe (visible sur Kulla 2022, probablement digestif)
              </li>
            </ul>
          </div>
        </div>

        {/* Application à WSER */}
        <h3 className="headline-lg text-lg mt-10">Application à WSER</h3>

        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-5 mt-6">
          <h4 className="font-semibold text-orange-400 mb-3">Le terrain WSER ne masquera pas grand chose</h4>
          <p className="font-mono text-lg text-white">WSER = 37 m D+/km → profil similaire à Kullamannen</p>
          <p className="text-sm text-zinc-400 mt-3">
            Sur ce type de terrain peu vallonné : Fade brut ≈ Fade GAP.
            Les stats seront FIABLES pour monitorer ta course.
          </p>
        </div>

        <h4 className="font-semibold text-zinc-300 mt-8 mb-4">Cible réaliste basée sur le GAP</h4>

        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Référence</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Fade GAP</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Distance</th>
              </tr>
            </thead>
            <tbody>
              {[
                { ref: 'Ecotrail', gap: '+27%', dist: '81 km' },
                { ref: 'Templiers', gap: '+40%', dist: '105 km' },
                { ref: 'Istria', gap: '+44%', dist: '168 km' },
              ].map((row) => (
                <tr key={row.ref} className="border-t border-zinc-800/50">
                  <td className="py-3 px-4 font-medium">{row.ref}</td>
                  <td className="py-3 px-4 font-mono text-orange-400">{row.gap}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.dist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 mt-6">
          <h4 className="font-semibold text-zinc-300 mb-3">Pour WSER (163 km), cible : fade de 40-50%</h4>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-xs text-zinc-500">D1 (0-16 km)</div>
              <div className="font-mono text-lg font-bold text-white">~6.5'/km</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-zinc-500">D10 (147-163 km)</div>
              <div className="font-mono text-lg font-bold text-white">~9.0'/km</div>
              <div className="text-xs text-zinc-500">(fade +38%)</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-zinc-500">Moyenne</div>
              <div className="font-mono text-lg font-bold text-orange-400">~7.4'/km</div>
              <div className="text-xs text-zinc-500">→ ~20h</div>
            </div>
          </div>
        </div>

        {/* La vraie question */}
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5 mt-6">
          <h4 className="font-semibold text-yellow-400 mb-3">La vraie question pour WSER</h4>
          <p className="text-sm text-zinc-300">
            Ce n'est pas "comment reproduire le TDS" (le fade brut était artificiel).
          </p>
          <p className="text-sm text-zinc-300 mt-2">
            C'est : <strong className="text-white">"Comment éviter le crash Kullamannen 2022 ?"</strong>
          </p>
          <p className="text-sm text-zinc-400 mt-4">
            Le seul vrai crash confirmé par le GAP (+72%) montre :
          </p>
          <ul className="text-sm text-zinc-400 mt-2 space-y-1">
            <li>• Départ trop rapide (5.2'/km D1)</li>
            <li>• Dégradation brutale D4-D7</li>
            <li>• Probablement problème digestif</li>
          </ul>
          <p className="text-sm text-orange-400 mt-4 font-semibold">
            → Résoudre avec : départ contrôlé + gut training + nutrition progressive
          </p>
        </div>
      </section>

      {/* Section 4 : Le modèle Templiers 2021 */}
      <section>
        <SectionHeader kicker="04 · Le modèle" title="Templiers 2021 (★677) — Ta meilleure performance" />

        {/* Timeline visuelle */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 mt-8 overflow-x-auto">
          <div className="flex items-start gap-4 min-w-[600px]">
            {[
              { month: 'Mai', label: 'WE CHOC', detail: '35h/9j · 12000m D+', type: 'peak' },
              { month: 'Juin', label: 'Récup + vite', detail: '', type: 'rest' },
              { month: 'Juil', label: 'ULTRA 01', detail: '28h · S-15', type: 'race' },
              { month: 'Août', label: 'VRAIE COUPURE', detail: '~0h/sem', type: 'rest' },
              { month: 'Sept', label: 'Relance', detail: '4-5h/sem', type: 'build' },
              { month: 'Oct', label: 'AIGUE + TEMPLIERS', detail: '6h S-2 · ★677', type: 'goal' },
            ].map((item, i) => (
              <div key={item.month} className="flex-1 text-center">
                <div className="text-xs text-zinc-500 mb-2">{item.month}</div>
                <div className={`h-16 rounded-lg flex items-center justify-center ${
                  item.type === 'peak' ? 'bg-orange-500/20 border border-orange-500/30' :
                  item.type === 'race' ? 'bg-cyan-500/20 border border-cyan-500/30' :
                  item.type === 'goal' ? 'bg-emerald-500/20 border border-emerald-500/30' :
                  item.type === 'rest' ? 'bg-zinc-800/50 border border-zinc-700' :
                  'bg-zinc-800/30 border border-zinc-700/50'
                }`}>
                  <span className={`text-xs font-semibold ${
                    item.type === 'peak' ? 'text-orange-400' :
                    item.type === 'race' ? 'text-cyan-400' :
                    item.type === 'goal' ? 'text-emerald-400' :
                    'text-zinc-400'
                  }`}>{item.label}</span>
                </div>
                <div className="text-[10px] text-zinc-500 mt-2">{item.detail}</div>
                {i < 5 && (
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-zinc-600">→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-zinc-500 mt-4">
          Post-course prépa (Ultra 01) : 2.3h/sem × 6 sem (dont 2 sem quasi 0h). Course prépa = stimulus, pas objectif.
        </p>

        {/* Ce qui a marché */}
        <h3 className="headline-lg text-lg mt-10">Ce qui a marché</h3>

        <div className="space-y-4 mt-6">
          {[
            {
              num: '1',
              title: 'Variabilité massive',
              detail: 'CV (coefficient de variation) = 99%',
              insight: 'Semaines de 3h à 33h — pas de volume "régulier"'
            },
            {
              num: '2',
              title: 'Vraie récupération post-course prépa',
              detail: '6 semaines à 2.3h/sem en moyenne après Ultra 01',
              insight: 'Dont 2 semaines quasi à 0h'
            },
            {
              num: '3',
              title: 'Course "réveil" à S-2',
              detail: 'Aigueblanche (6h, 3020m D+) = stimulus court mais intense',
              insight: 'Réactive les systèmes sans fatiguer'
            },
          ].map((item) => (
            <div key={item.num} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <div className="flex items-start gap-4">
                <span className="font-mono text-2xl font-bold text-zinc-700">{item.num}</span>
                <div>
                  <h4 className="font-semibold text-zinc-300">{item.title}</h4>
                  <p className="text-sm text-orange-400 mt-1">{item.detail}</p>
                  <p className="text-sm text-zinc-500 mt-1">{item.insight}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparaison 2024 */}
        <h3 className="headline-lg text-lg mt-10">Pourquoi 2024 n'a pas marché (Kullamannen 634)</h3>

        <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Facteur</th>
                <th className="text-left py-3 px-4 font-medium text-emerald-400">Templiers 2021 (677)</th>
                <th className="text-left py-3 px-4 font-medium text-red-400">Kullamannen 2024 (634)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { facteur: 'CV volume', t2021: '99%', k2024: '21% (trop régulier)' },
                { facteur: 'Course prépa', t2021: 'Ultra 01 à S-15', k2024: 'Absente' },
                { facteur: 'Coupure post-prépa', t2021: '2 sem quasi 0h', k2024: 'Pas de vraie coupure' },
                { facteur: 'Taper', t2021: '-67% S-1', k2024: '-41% S-1' },
                { facteur: 'D+/semaine prépa', t2021: '1879m', k2024: '772m' },
              ].map((row) => (
                <tr key={row.facteur} className="border-t border-zinc-800/50">
                  <td className="py-3 px-4 font-medium">{row.facteur}</td>
                  <td className="py-3 px-4 text-emerald-400">{row.t2021}</td>
                  <td className="py-3 px-4 text-red-400">{row.k2024}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pull-quote mt-6">
          <p className="text-zinc-300 leading-relaxed">
            Le problème en 2024 n'était pas le volume total — c'était la distribution.
            Un volume "lissé" à 5-8h/semaine ne produit pas les mêmes adaptations qu'une variabilité massive avec vraies récups.
          </p>
        </div>
      </section>

      {/* Section 5 : Les 4 patterns identifiés */}
      <section>
        <SectionHeader kicker="05 · Patterns" title="Ce qui marche chez toi — 4 patterns validés par les données" />

        <div className="space-y-8 mt-8">
          {/* Pattern #1 */}
          <PatternCard
            num="1"
            title="Course comme préparation"
            icon={<Timer className="w-6 h-6" />}
            constat="Tes meilleures perfs ont une course 3-5 semaines avant."
            data={[
              { objectif: 'Templiers 2021', index: '677', prepa: 'Aigueblanche (6h)', timing: 'S-2' },
              { objectif: 'Kullamannen 2022', index: '669', prepa: 'UTMJ (27h)', timing: 'S-5' },
              { objectif: 'UT4M 2022', index: '669', prepa: 'Ultra 01 (28h)', timing: 'S-5' },
            ]}
            contreExemple="Kullamannen 2024 (634) = aucune course prépa → index 35 points plus bas."
            action="THP 120 à S-6 = ta course prépa pour WSER."
          />

          {/* Pattern #2 */}
          <PatternCard
            num="2"
            title="Volume variable (pas régulier)"
            icon={<TrendingUp className="w-6 h-6" />}
            constat="La variabilité produit de meilleures adaptations que la régularité."
            dataTable={[
              { course: 'Kullamannen 2022', index: '669', cv: '99%', pattern: 'Semaines de 3h à 33h' },
              { course: 'Kullamannen 2024', index: '634', cv: '21%', pattern: 'Semaines de 5-8h (trop régulier)' },
            ]}
            action="Accepter les gros blocs + vraies récups. Pas chercher X h/sem constant."
          />

          {/* Pattern #3 */}
          <PatternCard
            num="3"
            title="Taper agressif"
            icon={<Zap className="w-6 h-6" />}
            constat="Les meilleures perfs ont un taper S-1 de -50% ou plus."
            dataTable={[
              { course: 'Templiers 2021', index: '677', reduction: '-67%' },
              { course: 'UT4M 2022', index: '669', reduction: '-48%' },
              { course: 'Kullamannen 2024', index: '634', reduction: '-41%' },
            ]}
            action="Taper 50-70% la dernière semaine. Arriver FRAIS."
          />

          {/* Pattern #4 */}
          <PatternCard
            num="4"
            title="D+ élevé avant courses montagne"
            icon={<Mountain className="w-6 h-6" />}
            constat="Le D+ prépa corrèle avec la performance."
            dataTable={[
              { course: 'UT4M 2022', index: '669', dplus: '3378m/sem' },
              { course: 'Kullamannen 2022', index: '669', dplus: '1879m/sem' },
              { course: 'Kullamannen 2024', index: '634', dplus: '772m/sem' },
            ]}
            action="Objectif 8 semaines pré-WSER : 12-15k D+ total (1500-1900m/sem)."
          />
        </div>
      </section>

      {/* Section 6 : Les 4 Gaps identifiés */}
      <section>
        <SectionHeader kicker="06 · Gaps" title="Ce qui manque pour WSER" />

        <div className="space-y-6 mt-8">
          {/* Gap #1 */}
          <GapCard
            num="01"
            title="Déficit sorties longues d'entraînement"
            status="warning"
            problem="Sur 13 sorties >5h, seulement 4 sont des entraînements contrôlés. Les autres sont des courses (TDS, XGTV, Kerry Way...)."
            why="En course, impossible de contrôler nutrition, allure, récupération. Le stimulus est maximal mais non-répétable. Les adaptations aérobies profondes se construisent en entraînement contrôlé Z2, pas en compétition."
            recommendation="6-8 sorties >4h en entraînement contrôlé (samedi longue systématique)"
            source="Koop, Millet"
            data={[
              { label: '>2h total', value: '39', detail: '27 entraînements (69%)' },
              { label: '>3h total', value: '18', detail: '9 entraînements (50%)' },
              { label: '>5h total', value: '13', detail: '4 entraînements (31%)' },
            ]}
          />

          {/* Gap #2 */}
          <GapCard
            num="02"
            title="Travail descente non-répété"
            status="warning"
            problem="Les grosses expositions D- sont toutes en course (TDS, XGTV), avec 2-3 mois d'écart. Le Repeated Bout Effect se perd partiellement entre les expositions."
            why="Les marqueurs de dommages musculaires diminuent de 40-60% après 2-3 expositions similaires. Mais cette adaptation nécessite des expositions hebdomadaires pendant 4-6 semaines. Elle persiste 4-6 semaines puis se dégrade."
            recommendation="1 séance 'Long Downhill Repeats' par semaine pendant la phase spécifique (mars-mai)."
            data={[
              { label: 'WSER D-', value: '7536m', detail: '46m D-/km sur 163km' },
              { label: '500-1000m D-', value: '22 sorties', detail: 'Distribution normale' },
              { label: '>2000m D-', value: '4 sorties', detail: 'Toutes en course' },
            ]}
          />

          {/* Gap #3 */}
          <GapCard
            num="03"
            title="Heat training absent"
            status="critical"
            problem="Aucune trace de travail chaleur dans l'historique Strava (pas de sessions K-way/indoor identifiées)."
            why="WSER = 35-45°C dans les canyons. Les adaptations heat sont critiques et se perdent rapidement : demi-vie de perte = -2.5%/jour sans exposition. Après 2 semaines : -35% contrôle FC."
            recommendation="Maintenance 1×/semaine dès janvier, bloc Maroc, bloc intensif mai-juin."
            source="Périard, Tyler"
            data={[
              { label: 'Volume plasmatique', value: '+10-15%', detail: '3-5 jours' },
              { label: 'FC réduite', value: '-10-15 bpm', detail: '7-10 jours' },
              { label: 'Concentration sueur', value: '-30-40%', detail: '10-14 jours' },
            ]}
          />

          {/* Gap #4 */}
          <GapCard
            num="04"
            title="Gut training non-validé"
            status="critical"
            problem="Pas de données nutrition dans Strava, mais aucun protocole systématique identifié. GI distress documentée sur Kerry Way et SaintéLyon."
            why="Les transporteurs intestinaux SGLT1 sont entraînables. 2-4 semaines d'exposition à haute charge CHO augmentent la capacité d'absorption."
            recommendation="Timer systématique sur toutes les sorties >2h, progression de 40g à 110g/h."
            data={[
              { label: 'Objectif WSER', value: '80-110g/h', detail: 'Pendant 20h' },
              { label: 'Total calories', value: '~4000 kcal', detail: 'Sur la course' },
              { label: 'Protocole actuel', value: '?', detail: 'Non-systématisé' },
            ]}
          />
        </div>
      </section>

      {/* Section 7 : 7 Patterns → 7 Actions */}
      <section>
        <SectionHeader kicker="07 · Synthèse" title="Ce que les données révèlent" />

        <div className="overflow-x-auto mt-8 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">#</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Pattern identifié</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Gap actuel</th>
                <th className="text-left py-3 px-4 font-medium text-orange-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { num: '1', pattern: 'Course prépa S-4/S-6', gap: 'Absente en 2024', action: 'THP à S-6' },
                { num: '2', pattern: 'Variabilité volume', gap: 'CV 21% (vs 65%)', action: '3-15h/sem OK' },
                { num: '3', pattern: 'Longues en entraînement', gap: '69% = courses', action: '6-8 >4h contrôlées' },
                { num: '4', pattern: 'RBE maintenu', gap: 'Non répété', action: '1×/sem descente' },
                { num: '5', pattern: 'Heat training', gap: 'Absent', action: 'Bloc complet' },
                { num: '6', pattern: 'Gut training', gap: 'GI distress', action: '40→110g CHO' },
                { num: '7', pattern: 'D+/semaine', gap: '772m (vs 1879m)', action: '1500m+ cible' },
              ].map((row) => (
                <tr key={row.num} className="border-t border-zinc-800/50">
                  <td className="py-3 px-4 font-mono text-zinc-500">{row.num}</td>
                  <td className="py-3 px-4 font-medium">{row.pattern}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.gap}</td>
                  <td className="py-3 px-4 text-orange-400 font-semibold">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 8 : Allures de référence */}
      <section>
        <SectionHeader kicker="08 · Allures" title="Allures actuelles et cibles" />

        <h3 className="headline-lg text-lg mt-8">Allures par terrain (2024-2025)</h3>

        <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Type</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">D+/km</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Allure moyenne</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Nb runs</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: 'Plat', dplus: '<20m', pace: '5:10/km', runs: '201', highlight: true },
                { type: 'Léger vallonné', dplus: '20-40m', pace: '6:21/km', runs: '25' },
                { type: 'Vallonné', dplus: '40-60m', pace: '6:46/km', runs: '51' },
                { type: 'Très montagneux', dplus: '>100m', pace: '10:35/km', runs: '12' },
              ].map((row) => (
                <tr key={row.type} className={`border-t border-zinc-800/50 ${row.highlight ? 'bg-orange-500/10' : ''}`}>
                  <td className="py-3 px-4 font-medium">{row.type}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.dplus}</td>
                  <td className={`py-3 px-4 font-mono ${row.highlight ? 'text-orange-400 font-bold' : 'text-zinc-300'}`}>{row.pace}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.runs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="headline-lg text-lg mt-10">Cibles WSER sub-20h</h3>

        <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Section</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Type</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Allure cible</th>
              </tr>
            </thead>
            <tbody>
              {[
                { section: 'Montées raides (>10%)', type: 'Power hike', pace: '15-20 min/km' },
                { section: 'Montées modérées (5-10%)', type: 'Trot/marche', pace: '10-14 min/km' },
                { section: 'Plat/faux-plat', type: 'Course', pace: '6:30-7:30/km' },
                { section: 'Descentes techniques', type: 'Contrôlé', pace: '8:00-9:30/km' },
                { section: 'Descentes roulantes', type: 'Relance', pace: '5:30-7:00/km' },
                { section: 'Post-Foresthill (100km+)', type: 'Maintien', pace: '8:00-9:30/km' },
              ].map((row) => (
                <tr key={row.section} className="border-t border-zinc-800/50">
                  <td className="py-3 px-4 font-medium">{row.section}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.type}</td>
                  <td className="py-3 px-4 font-mono text-orange-400">{row.pace}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-5 mt-6">
          <div className="flex items-center gap-4">
            <Activity className="w-6 h-6 text-orange-500" />
            <div>
              <div className="text-sm text-zinc-400">Moyenne globale requise</div>
              <div className="font-mono text-xl font-bold text-orange-400">7:21/km</div>
              <div className="text-xs text-zinc-500">ou 7:03/km moving sans les arrêts ravitos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9 : Synthèse Forces / Gaps */}
      <section>
        <SectionHeader kicker="09 · Bilan" title="Où tu en es" />

        <div className="overflow-x-auto mt-8 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Domaine</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Commentaire</th>
              </tr>
            </thead>
            <tbody>
              {[
                { domain: 'Volume aérobie', status: 'ok', comment: '65-75 km/sem, suffisant avec contrainte 10h' },
                { domain: 'Régularité', status: 'ok', comment: '0 semaine à 0 run, 49% à 5+ runs' },
                { domain: 'Expérience ultra', status: 'ok', comment: '25 × 100 miles, gestion nuit/durée acquise' },
                { domain: 'Preuve sub-20h', status: 'ok', comment: 'Kullamannen 2022 (19:12) + Ecotrail 2023 (7:20)' },
                { domain: 'Sorties longues entraînement', status: 'warning', comment: 'Déficit >3h hors course' },
                { domain: 'Travail descente répété', status: 'warning', comment: 'RBE non-maintenu entre courses' },
                { domain: 'Heat training', status: 'critical', comment: 'Absent, à construire' },
                { domain: 'Gut training', status: 'critical', comment: 'Non-systématisé' },
              ].map((row) => (
                <tr key={row.domain} className={`border-t border-zinc-800/50 ${
                  row.status === 'ok' ? 'bg-emerald-500/5' :
                  row.status === 'warning' ? 'bg-yellow-500/5' :
                  'bg-red-500/5'
                }`}>
                  <td className="py-3 px-4 font-medium">{row.domain}</td>
                  <td className="py-3 px-4">
                    <span className={`text-lg font-semibold ${
                      row.status === 'ok' ? 'text-emerald-400' :
                      row.status === 'warning' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {row.status === 'ok' ? '✓' : row.status === 'warning' ? '⚠' : '✗'}
                    </span>
                  </td>
                  <td className={`py-3 px-4 ${
                    row.status === 'ok' ? 'text-emerald-300/80' :
                    row.status === 'warning' ? 'text-yellow-300/80' :
                    'text-red-300/80'
                  }`}>{row.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Conclusion */}
      <section>
        <SectionHeader kicker="Conclusion" title="La suite" />

        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 mt-8">
          <div className="prose-magazine">
            <p>
              <strong className="text-white">Le moteur aérobie est validé</strong> — 25 × 100 miles, index 680, Kullamannen en 19:12.
            </p>
            <p className="mt-4">
              L'enjeu n'est pas de "pouvoir finir WSER". Tu pourrais le finir demain si tu voulais.
            </p>
            <p className="mt-4">
              L'enjeu c'est le <strong className="text-orange-400">sub-20h</strong> : passer de finisher (~24h) à top 50 (~19-20h).
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-orange-500/20">
            <p className="text-sm text-zinc-300">
              Cette différence de ~4h se joue sur <strong className="text-white">4 bascules spécifiques</strong> :
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {[
                { label: 'Chaleur canyons', value: '35-45°C' },
                { label: 'Descentes', value: '7536m D-' },
                { label: 'Nutrition', value: '90-110g CHO/h' },
                { label: 'Stratégie', value: 'Fade maîtrisé' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="font-mono text-lg font-bold text-orange-400">{item.value}</div>
                  <div className="text-xs text-zinc-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-orange-400 font-semibold mt-6">
            → Le plan qui suit adresse ces 4 gaps.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-zinc-500 pt-8 border-t border-zinc-800">
        Document généré le 28 décembre 2024 — basé sur l'analyse de 1663 activités Strava et 8 courses GPS
      </footer>
    </div>
  )
}

// Pattern Card Component
function PatternCard({
  num,
  title,
  icon,
  constat,
  data,
  dataTable,
  contreExemple,
  action,
}: {
  num: string
  title: string
  icon: React.ReactNode
  constat: string
  data?: { objectif: string; index: string; prepa: string; timing: string }[]
  dataTable?: { course: string; index: string; cv?: string; pattern?: string; reduction?: string; dplus?: string }[]
  contreExemple?: string
  action: string
}) {
  return (
    <article className="rounded-xl border border-zinc-800 overflow-hidden">
      <div className="p-6 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
            {icon}
          </div>
          <div>
            <div className="text-xs text-zinc-500">Pattern #{num}</div>
            <h3 className="text-lg font-display font-semibold">{title}</h3>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Constat</h4>
          <p className="text-zinc-300">{constat}</p>
        </div>

        {data && (
          <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/80">
                <tr>
                  <th className="text-left py-2 px-3 font-medium text-zinc-400">Course objectif</th>
                  <th className="text-left py-2 px-3 font-medium text-zinc-400">Index</th>
                  <th className="text-left py-2 px-3 font-medium text-zinc-400">Course prépa</th>
                  <th className="text-left py-2 px-3 font-medium text-zinc-400">Timing</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.objectif} className="border-t border-zinc-800/50">
                    <td className="py-2 px-3 font-medium">{row.objectif}</td>
                    <td className="py-2 px-3 font-mono text-orange-400">{row.index}</td>
                    <td className="py-2 px-3 text-zinc-400">{row.prepa}</td>
                    <td className="py-2 px-3 text-zinc-400">{row.timing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {dataTable && (
          <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/80">
                <tr>
                  <th className="text-left py-2 px-3 font-medium text-zinc-400">Course</th>
                  <th className="text-left py-2 px-3 font-medium text-zinc-400">Index</th>
                  {dataTable[0].cv && <th className="text-left py-2 px-3 font-medium text-zinc-400">CV hebdo</th>}
                  {dataTable[0].pattern && <th className="text-left py-2 px-3 font-medium text-zinc-400">Pattern</th>}
                  {dataTable[0].reduction && <th className="text-left py-2 px-3 font-medium text-zinc-400">Réduction S-1</th>}
                  {dataTable[0].dplus && <th className="text-left py-2 px-3 font-medium text-zinc-400">D+/sem prépa</th>}
                </tr>
              </thead>
              <tbody>
                {dataTable.map((row) => (
                  <tr key={row.course} className="border-t border-zinc-800/50">
                    <td className="py-2 px-3 font-medium">{row.course}</td>
                    <td className="py-2 px-3 font-mono text-orange-400">{row.index}</td>
                    {row.cv && <td className="py-2 px-3 text-zinc-400">{row.cv}</td>}
                    {row.pattern && <td className="py-2 px-3 text-zinc-400 text-xs">{row.pattern}</td>}
                    {row.reduction && <td className="py-2 px-3 font-mono text-zinc-400">{row.reduction}</td>}
                    {row.dplus && <td className="py-2 px-3 font-mono text-zinc-400">{row.dplus}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {contreExemple && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
            <p className="text-sm text-red-400">
              <strong>Contre-exemple :</strong> {contreExemple}
            </p>
          </div>
        )}

        <div className="rounded-lg bg-orange-500/10 border border-orange-500/30 p-4">
          <div className="flex gap-3">
            <Target className="w-5 h-5 text-orange-500 shrink-0" />
            <p className="text-sm text-zinc-300">
              <strong className="text-orange-400">Action :</strong> {action}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

function GapCard({
  num,
  title,
  status,
  problem,
  why,
  recommendation,
  source,
  data,
}: {
  num: string
  title: string
  status: 'warning' | 'critical'
  problem: string
  why: string
  recommendation: string
  source?: string
  data: { label: string; value: string; detail: string }[]
}) {
  const borderColor = status === 'critical' ? 'border-l-red-500' : 'border-l-yellow-500'
  const bgColor = status === 'critical' ? 'bg-red-500/5' : 'bg-yellow-500/5'

  return (
    <article className={`rounded-xl border border-zinc-800 overflow-hidden border-l-4 ${borderColor}`}>
      {/* Header */}
      <div className={`p-6 border-b border-zinc-800 ${bgColor}`}>
        <div className="flex items-start gap-5">
          <span className="font-mono text-4xl font-bold text-zinc-700">{num}</span>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-display font-semibold">{title}</h3>
              <span className={`w-3 h-3 rounded-full ${status === 'critical' ? 'bg-red-500' : 'bg-yellow-500'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        {/* Problème */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Problème</h4>
          <p className="text-zinc-300 leading-relaxed">{problem}</p>
        </div>

        {/* Data */}
        <div className="grid grid-cols-3 gap-4">
          {data.map((d) => (
            <div key={d.label} className="rounded-lg bg-zinc-900/50 p-3">
              <div className="text-xs text-zinc-500">{d.label}</div>
              <div className="text-lg font-semibold font-mono mt-1">{d.value}</div>
              <div className="text-xs text-zinc-500">{d.detail}</div>
            </div>
          ))}
        </div>

        {/* Pourquoi c'est critique */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Pourquoi c'est critique</h4>
          <p className="text-zinc-400 leading-relaxed text-sm">{why}</p>
        </div>

        {/* Recommandation */}
        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-4">
          <div className="flex gap-3">
            <span className="text-orange-500 font-bold">→</span>
            <div>
              <span className="text-sm text-zinc-300">{recommendation}</span>
              {source && <span className="text-xs text-zinc-500 ml-2">({source})</span>}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <p className="kicker">{kicker}</p>
      <h2 className="headline-lg">{title}</h2>
      <div className="w-12 h-1 bg-linear-to-r from-orange-500 to-orange-600 rounded mt-3" />
    </div>
  )
}
