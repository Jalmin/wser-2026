import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Clock, Mountain, Flame, Zap, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react'

export function HomePage() {
  const countdown = getCountdown('2026-06-28')

  return (
    <div className="space-y-16">
      {/* Hero Section with Image */}
      <header className="relative -mx-4 md:-mx-6 -mt-6">
        {/* Hero Image */}
        <div className="relative h-130 md:h-125 overflow-hidden">
          <img
            src="/images/wserStade.png"
            alt="Arrivée Western States à Auburn"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-end md:items-center pb-6 md:pb-0">
            <div className="px-4 md:px-6 max-w-2xl">
              <div className="kicker mb-2 md:mb-3">Western States Endurance Run</div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-4">
                Western States Endurance 100
              </h1>
              <p className="text-base md:text-lg text-zinc-300 leading-relaxed mb-6 md:mb-8">
                25 × 100 miles. Un moteur éprouvé. Mais WSER ne pardonne pas l'improvisation :
                canyons à 42°C, 7536m de descente, 20h sans erreur. Ce site documente une préparation
                chirurgicale — de l'analyse des gaps à la stratégie de ravito.
              </p>

              {/* Countdown */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="stat-mega">{countdown.days}</span>
                <div>
                  <div className="text-zinc-300 text-lg">jours</div>
                  <div className="text-zinc-500 text-sm">jusqu'au 28 juin 2026</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/course" className="btn-primary">
                  Découvrir le parcours
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/plan" className="btn-secondary">
                  Voir le plan d'entraînement
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Profil Athlétique - From MD */}
      <section>
        <div className="kicker mb-3">Analyse Strava</div>
        <h2 className="headline-lg text-white mb-2">Profil Athlétique</h2>
        <p className="prose-magazine mb-6 max-w-2xl">
          On a épluché ton historique Strava — 1663 activités, 10 ans de données.
          Voici ce qu'on sait de toi. Pas de bullshit, juste les faits.
        </p>

        {/* Identité coureur */}
        <div className="data-card overflow-hidden mb-6">
          <div className="border-b border-zinc-800 px-5 py-3">
            <h3 className="font-display font-semibold text-white">Identité coureur</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: 'Expérience ultra', value: '25 × 100 miles en 5 ans' },
                  { label: 'Index UTMB', value: '680' },
                  { label: 'Volume annuel moyen', value: '3,500 km / 95,000m D+' },
                  { label: 'Heures hebdo typiques', value: '6-9h' },
                  { label: 'Contrainte déclarée', value: '10h/semaine max' },
                ].map((row, i) => (
                  <tr key={row.label} className={i < 4 ? 'border-b border-zinc-800/50' : ''}>
                    <td className="px-5 py-3 text-zinc-400">{row.label}</td>
                    <td className="px-5 py-3 text-white font-medium text-right">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { value: '680', label: 'Index UTMB', sub: '+12 sur 12 mois' },
            { value: '25', label: '100 miles', sub: 'finishés' },
            { value: '19:00', label: 'Meilleur temps', sub: 'Kullamannen 163km' },
            { value: '0', label: 'DNF', sub: 'en 5 ans' },
          ].map((stat) => (
            <div key={stat.label} className="data-card p-4 text-center">
              <div className="font-display font-bold text-3xl text-white">{stat.value}</div>
              <div className="text-sm text-zinc-400 mt-1">{stat.label}</div>
              <div className="text-xs text-zinc-600 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Régularité */}
        <div className="data-card border-emerald-500/20 p-5 mb-6">
          <h3 className="font-display font-semibold text-lg text-emerald-400 mb-3">
            Régularité — Ton arme secrète
          </h3>
          <p className="text-zinc-300 mb-4">
            102 semaines analysées. Pas une seule à zéro run. C'est pas du talent, c'est de la discipline.
            Et en ultra, la discipline bat le talent 10 fois sur 10.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="font-display font-bold text-2xl text-white">0</div>
              <div className="text-sm text-zinc-500">semaine à 0 run</div>
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-white">14%</div>
              <div className="text-sm text-zinc-500">semaines à 1-2 runs</div>
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-white">37%</div>
              <div className="text-sm text-zinc-500">semaines à 3-4 runs</div>
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-orange-400">49%</div>
              <div className="text-sm text-zinc-500">semaines à 5+ runs</div>
            </div>
          </div>
          <p className="text-zinc-500 text-sm">Volume médian : 53 km/semaine (P25: 38 km, P75: 66 km)</p>
        </div>

        {/* Preuve de concept */}
        <div className="data-card border-orange-500/30 bg-orange-500/5 p-5">
          <h3 className="font-display font-semibold text-lg text-orange-400 mb-3">
            Preuve de concept : Kullamannen 2024
          </h3>
          <p className="text-zinc-300 mb-4">
            Même distance que WSER. Terrain plat, climat frais. Tu l'as bouclé en 19h pile.
            Voici pourquoi c'est la preuve que sub-20h est atteignable.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            {[
              { label: 'Distance', value: '163 km' },
              { label: 'Temps', value: '19h00' },
              { label: 'Allure', value: '6:47/km' },
              { label: 'D+', value: '2,640m' },
              { label: 'Classement', value: '25ème' },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-xs text-zinc-600 uppercase tracking-wide mb-1">{item.label}</div>
                <div className="font-display font-bold text-lg text-white">{item.value}</div>
              </div>
            ))}
          </div>
          <p className="prose-magazine">
            <strong>Objectif WSER sub-20h = 163km en &lt;20h = 7:21/km</strong><br />
            À Kullamannen : 6:47/km — soit <strong className="text-orange-400">34 secondes plus rapide/km</strong> que l'objectif WSER.
          </p>
          <blockquote className="pull-quote mt-6">
            Le moteur aérobie est là. L'enjeu n'est pas de "gagner du moteur" mais de spécifier pour les contraintes WSER.
          </blockquote>
        </div>
      </section>

      {/* Gaps Identifiés */}
      <section>
        <div className="kicker mb-3">Diagnostic</div>
        <h2 className="headline-lg text-white mb-2">Gaps Identifiés</h2>
        <p className="prose-magazine mb-8 max-w-2xl">
          Maintenant, les mauvaises nouvelles. WSER n'est pas juste "un autre 100 miles".
          Voici précisément ce qu'il te manque — et pourquoi.
        </p>

        <div className="space-y-6">
          {/* Gap #1 */}
          <div className="data-card border-yellow-500/30 overflow-hidden">
            <div className="p-4 md:p-6">
              <div className="flex items-start gap-3 md:gap-4">
                <span className="hidden md:block font-display text-5xl font-bold text-zinc-800">01</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                    <Clock className="w-5 h-5 text-yellow-500 shrink-0" />
                    <h3 className="font-display font-bold text-lg md:text-xl text-white">Déficit sorties longues d'ENTRAÎNEMENT</h3>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/20 text-yellow-400">Important</span>
                  </div>

                  <p className="prose-magazine mb-4">
                    Tu fais des sorties longues. Mais seulement en course. Problème : en compétition,
                    tu ne contrôles rien — ni l'allure, ni la nutrition, ni la récupération.
                  </p>

                  {/* Data table */}
                  <div className="data-card mb-4 overflow-x-auto">
                    <table className="w-full text-sm min-w-100">
                      <thead className="bg-zinc-900/80">
                        <tr>
                          <th className="px-3 md:px-4 py-2 text-left text-zinc-400 font-medium">Durée</th>
                          <th className="px-3 md:px-4 py-2 text-left text-zinc-400 font-medium">Total</th>
                          <th className="px-3 md:px-4 py-2 text-left text-zinc-400 font-medium">Courses</th>
                          <th className="px-3 md:px-4 py-2 text-left text-zinc-400 font-medium">Entraîn.</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-zinc-800/50">
                          <td className="px-4 py-2 text-zinc-300">&gt;2h</td>
                          <td className="px-4 py-2 text-white font-medium">39</td>
                          <td className="px-4 py-2 text-zinc-400">12 (31%)</td>
                          <td className="px-4 py-2 text-zinc-400">27 (69%)</td>
                        </tr>
                        <tr className="border-b border-zinc-800/50">
                          <td className="px-4 py-2 text-zinc-300">&gt;3h</td>
                          <td className="px-4 py-2 text-white font-medium">18</td>
                          <td className="px-4 py-2 text-zinc-400">9 (50%)</td>
                          <td className="px-4 py-2 text-yellow-400 font-medium">9 (50%)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-zinc-300">&gt;5h</td>
                          <td className="px-4 py-2 text-white font-medium">13</td>
                          <td className="px-4 py-2 text-red-400 font-medium">9 (69%)</td>
                          <td className="px-4 py-2 text-zinc-400">4 (31%)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="prose-magazine mb-4">
                    <strong>Problème</strong> : Sur 13 sorties &gt;5h, seulement 4 sont des entraînements contrôlés.
                    Les autres sont des courses (TDS, XGTV, Kerry Way...).
                  </p>
                  <p className="prose-magazine mb-4">
                    <strong>Pourquoi c'est critique</strong> : En course, impossible de contrôler nutrition, allure, récupération.
                    Les adaptations aérobies profondes se construisent en entraînement contrôlé Z2, pas en compétition.
                  </p>
                  <div className="flex items-start gap-2 text-sm bg-zinc-900/50 rounded-lg p-3">
                    <span className="text-orange-500 mt-0.5">→</span>
                    <span className="text-zinc-300">
                      <strong className="text-white">Recommandation</strong> (Koop, Millet) : 15-20 sorties &gt;3h dans les 6 mois pré-course.
                      5-6 sorties &gt;5h minimum. Majorité en ENTRAÎNEMENT, pas en course.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gap #2 */}
          <div className="data-card border-yellow-500/30 overflow-hidden">
            <div className="p-4 md:p-6">
              <div className="flex items-start gap-3 md:gap-4">
                <span className="hidden md:block font-display text-5xl font-bold text-zinc-800">02</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                    <TrendingUp className="w-5 h-5 text-yellow-500 shrink-0" />
                    <h3 className="font-display font-bold text-lg md:text-xl text-white">Travail descente non-répété</h3>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/20 text-yellow-400">Important</span>
                  </div>

                  <p className="prose-magazine mb-4">
                    7536m de descente. 46m de D- par kilomètre. Sans préparation spécifique,
                    tes quads seront morts à Foresthill — et tu as encore 60km.
                  </p>

                  <p className="prose-magazine mb-4">
                    <strong>WSER = 7536m D- sur 163km = 46m D-/km</strong>
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {[
                      { range: '500-1000m', count: '22 sorties' },
                      { range: '1000-2000m', count: '3 sorties' },
                      { range: '2000-4000m', count: '4 sorties' },
                      { range: '>4000m', count: '4 sorties (courses)', highlight: true },
                    ].map((item) => (
                      <div key={item.range} className={`data-card p-3 ${item.highlight ? 'border-red-500/30' : ''}`}>
                        <div className="text-xs text-zinc-500 mb-1">D- par sortie</div>
                        <div className="font-display font-semibold text-white">{item.range}</div>
                        <div className={`text-sm ${item.highlight ? 'text-red-400' : 'text-zinc-400'}`}>{item.count}</div>
                      </div>
                    ))}
                  </div>

                  <p className="prose-magazine mb-4">
                    <strong>Problème</strong> : Les grosses expositions D- sont toutes en course (TDS, XGTV), avec 2-3 mois d'écart.
                    Le <em>Repeated Bout Effect</em> se perd partiellement entre les expositions.
                  </p>
                  <p className="prose-magazine mb-4">
                    <strong>Mécanisme RBE</strong> : Les marqueurs de dommages musculaires diminuent de 40-60% après 2-3 expositions similaires.
                    Cette adaptation nécessite des expositions hebdomadaires pendant 4-6 semaines. Elle persiste 4-6 semaines puis se dégrade.
                  </p>
                  <div className="flex items-start gap-2 text-sm bg-zinc-900/50 rounded-lg p-3">
                    <span className="text-orange-500 mt-0.5">→</span>
                    <span className="text-zinc-300">
                      <strong className="text-white">Recommandation</strong> : 1 séance "Long Downhill Repeats" par semaine pendant la phase spécifique (mars-mai).
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gap #3 */}
          <div className="data-card border-red-500/30 overflow-hidden">
            <div className="p-4 md:p-6">
              <div className="flex items-start gap-3 md:gap-4">
                <span className="hidden md:block font-display text-5xl font-bold text-zinc-800">03</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                    <Flame className="w-5 h-5 text-red-500 shrink-0" />
                    <h3 className="font-display font-bold text-lg md:text-xl text-white">Heat training absent</h3>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-500/20 text-red-400">Critique</span>
                  </div>

                  <p className="prose-magazine mb-4">
                    Les canyons de WSER atteignent 42°C. Sans acclimatation, ta fréquence cardiaque
                    s'emballe, ton estomac se ferme, et ta course s'arrête. C'est non-négociable.
                  </p>

                  <p className="prose-magazine mb-4">
                    Aucune trace de travail chaleur dans l'historique Strava (pas de sessions K-way/indoor identifiées).
                  </p>
                  <p className="prose-magazine mb-4 text-red-400 font-semibold">
                    WSER = 35-45°C dans les canyons
                  </p>

                  <div className="data-card mb-4 overflow-hidden">
                    <div className="border-b border-zinc-800 px-4 py-2 bg-zinc-900/80">
                      <span className="text-zinc-400 text-sm font-medium">Adaptations heat (littérature Périard, Tyler)</span>
                    </div>
                    <div className="p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Volume plasmatique +10-15%</span>
                        <span className="text-zinc-300">3-5 jours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Début sudation plus précoce</span>
                        <span className="text-zinc-300">5-7 jours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">FC réduite 10-15 bpm à effort égal</span>
                        <span className="text-zinc-300">7-10 jours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Concentration sueur réduite 30-40%</span>
                        <span className="text-zinc-300">10-14 jours</span>
                      </div>
                    </div>
                  </div>

                  <p className="prose-magazine mb-4">
                    <strong>Demi-vie de perte</strong> : -2.5%/jour sans exposition. Après 2 semaines : -35% contrôle FC.
                  </p>

                  <div className="flex items-start gap-2 text-sm bg-zinc-900/50 rounded-lg p-3">
                    <span className="text-orange-500 mt-0.5">→</span>
                    <span className="text-zinc-300">
                      <strong className="text-white">Recommandation</strong> : Maintenance 1×/semaine dès janvier, bloc Maroc, bloc intensif mai-juin.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gap #4 */}
          <div className="data-card border-red-500/30 overflow-hidden">
            <div className="p-4 md:p-6">
              <div className="flex items-start gap-3 md:gap-4">
                <span className="hidden md:block font-display text-5xl font-bold text-zinc-800">04</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                    <Zap className="w-5 h-5 text-red-500 shrink-0" />
                    <h3 className="font-display font-bold text-lg md:text-xl text-white">Gut training non-validé</h3>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-500/20 text-red-400">Critique</span>
                  </div>

                  <p className="prose-magazine mb-4">
                    80-110g de glucides par heure pendant 20 heures. Si ton intestin n'est pas entraîné,
                    tu vas vomir — et sans carburant, pas de finish.
                  </p>

                  <p className="prose-magazine mb-4">
                    Pas de données nutrition dans Strava, mais aucun protocole systématique identifié.
                  </p>
                  <p className="prose-magazine mb-4 text-orange-400 font-semibold">
                    Objectif WSER : 80-110g CHO/h pendant 20h
                  </p>
                  <p className="prose-magazine mb-4">
                    <strong>Mécanisme</strong> : Les transporteurs intestinaux SGLT1 sont entraînables.
                    2-4 semaines d'exposition à haute charge CHO augmentent la capacité d'absorption.
                  </p>

                  <div className="flex items-start gap-2 text-sm bg-zinc-900/50 rounded-lg p-3">
                    <span className="text-orange-500 mt-0.5">→</span>
                    <span className="text-zinc-300">
                      <strong className="text-white">Recommandation</strong> : Timer systématique sur toutes les sorties &gt;2h, progression de 60g à 110g/h.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Synthèse Forces / Gaps */}
      <section>
        <div className="kicker mb-3">Synthèse</div>
        <h2 className="headline-lg text-white mb-2">Forces & Gaps</h2>
        <p className="prose-magazine mb-6 max-w-2xl">
          En résumé : tu as le moteur, mais pas les pneus pour la route. Voici le bilan complet.
        </p>

        <div className="data-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="px-5 py-3 text-left text-zinc-400 font-medium">Domaine</th>
                <th className="px-5 py-3 text-left text-zinc-400 font-medium">Status</th>
                <th className="px-5 py-3 text-left text-zinc-400 font-medium">Commentaire</th>
              </tr>
            </thead>
            <tbody>
              {[
                { domain: 'Volume aérobie', status: 'ok', comment: '65-75 km/sem, suffisant avec contrainte 10h' },
                { domain: 'Régularité', status: 'ok', comment: '0 semaine à 0 run, 49% à 5+ runs' },
                { domain: 'Expérience ultra', status: 'ok', comment: '25 × 100 miles, gestion nuit/durée acquise' },
                { domain: 'Preuve sub-20h', status: 'ok', comment: 'Kullamannen 163km en 19h00' },
                { domain: 'Sorties longues entraînement', status: 'warning', comment: 'Déficit >3h hors course' },
                { domain: 'Travail descente répété', status: 'warning', comment: 'RBE non-maintenu entre courses' },
                { domain: 'Heat training', status: 'critical', comment: 'Absent, à construire' },
                { domain: 'Gut training', status: 'critical', comment: 'Non-systématisé' },
              ].map((row, i) => (
                <tr key={row.domain} className={i < 7 ? 'border-b border-zinc-800/50' : ''}>
                  <td className="px-5 py-3 text-white font-medium">{row.domain}</td>
                  <td className="px-5 py-3">
                    {row.status === 'ok' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                    {row.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                    {row.status === 'critical' && <span className="text-red-500 text-lg">✗</span>}
                  </td>
                  <td className="px-5 py-3 text-zinc-400">{row.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <blockquote className="pull-quote mt-6">
          La bonne nouvelle : chaque gap est adressable en 6 mois. La préparation commence maintenant.
        </blockquote>
      </section>

      {/* Navigation */}
      <section>
        <div className="kicker mb-3">Explorer</div>
        <h2 className="headline-lg text-white mb-6">Plonger dans les détails</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              to: '/course',
              title: 'Le Parcours',
              desc: 'Chaque mètre de dénivelé cartographié. Les 4 sections décortiquées, les pièges identifiés, les stratégies par segment.',
              icon: Mountain,
            },
            {
              to: '/plan',
              title: 'Le Plan',
              desc: '24 semaines de préparation périodisée. De la base hivernale au pic de forme, chaque bloc a son objectif.',
              icon: TrendingUp,
            },
            {
              to: '/methodes',
              title: 'Les Méthodes',
              desc: 'Les protocoles qui vont combler les gaps : heat training, gut training, travail descente, musculation spécifique.',
              icon: Zap,
            },
            {
              to: '/profil',
              title: 'Mon Profil',
              desc: 'L\'analyse Strava complète : volumes, allures, patterns d\'entraînement, et benchmarks contre les finishers sub-20h.',
              icon: Clock,
            },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="data-card p-5 group cursor-pointer hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <item.icon className="w-6 h-6 text-zinc-600 group-hover:text-orange-500 transition-colors mb-3" />
                  <h3 className="font-display font-semibold text-lg text-white group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 text-sm mt-2">{item.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-700 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section>
        <div className="kicker mb-3">Calendrier</div>
        <h2 className="headline-lg text-white mb-6">Les jalons clés</h2>

        <div className="relative">
          <div className="absolute left-[60px] top-0 bottom-0 w-px bg-zinc-800" />

          <div className="space-y-4">
            {[
              { date: '25 jan', name: 'Arc of Attrition', type: 'Course', desc: '100 miles UK côtier — Premier test 2026 en conditions hivernales difficiles' },
              { date: '1 mars', name: 'Ultra Sainte Baume', type: 'Entraînement', desc: 'Sortie longue structurée avec test nutrition 80g CHO/h' },
              { date: '25 avr', name: 'Bloc Maroc', type: 'Heat Init', desc: 'Semaine immersion chaleur — Initiation heat training terrain réel' },
              { date: '15 mai', name: 'THP 120', type: 'Simulation', desc: 'Dress rehearsal : 120km avec protocole nutrition et heat complet' },
              { date: '28 juin', name: 'WSER 2026', type: 'OBJECTIF', desc: '163km de Squaw Valley à Auburn — Sub-20h', highlight: true },
            ].map((milestone) => (
              <div key={milestone.name} className="flex gap-4 items-start relative">
                <div className="w-[60px] text-right">
                  <span className="font-mono text-sm text-zinc-600">{milestone.date}</span>
                </div>
                <div className={`w-3 h-3 rounded-full border-2 z-10 mt-1.5 ${
                  milestone.highlight
                    ? 'bg-orange-500 border-orange-500'
                    : 'bg-zinc-900 border-zinc-600'
                }`} />
                <div className={`flex-1 data-card p-4 ${
                  milestone.highlight ? 'border-orange-500/50 bg-orange-500/5' : ''
                }`}>
                  <div className="flex items-center gap-2">
                    <span className={`font-display font-semibold ${
                      milestone.highlight ? 'text-orange-400' : 'text-white'
                    }`}>
                      {milestone.name}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      milestone.type === 'OBJECTIF' ? 'bg-orange-500/20 text-orange-400' :
                      milestone.type === 'Course' ? 'bg-blue-500/20 text-blue-400' :
                      milestone.type === 'Heat Init' ? 'bg-red-500/20 text-red-400' :
                      'bg-zinc-800 text-zinc-400'
                    }`}>
                      {milestone.type}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 mt-1">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function getCountdown(targetDate: string) {
  const target = new Date(targetDate)
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  return { days }
}
