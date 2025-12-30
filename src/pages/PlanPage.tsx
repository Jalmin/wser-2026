import { useState } from 'react'
import { ChevronDown, Target, Flame, Mountain, Zap, CheckCircle, AlertTriangle, Info, Calendar, MapPin, Timer, Thermometer } from 'lucide-react'
import { ProgressTracker } from '../components/ProgressTracker'
import { TrainingLog } from '../components/TrainingLog'

type PhaseId = 'base' | 'dev' | 'specific' | 'taper' | null
type JalonId = 'arc' | 'sainte-baume' | 'maroc' | 'thp' | null

export function PlanPage() {
  const [expandedPhase, setExpandedPhase] = useState<PhaseId>('base')
  const [expandedJalon, setExpandedJalon] = useState<JalonId>(null)

  const heroContent = (
    <header className="relative -mx-4 md:-mx-6 -mt-6 mb-12">
      <div className="relative h-[300px] md:h-[380px] overflow-hidden">
        <img
          src="/images/wsernight.png"
          alt="Course de nuit Western States"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="p-6 md:p-8 w-full">
            <p className="kicker">Périodisation 2026</p>
            <h1 className="headline-xl mt-2">Le Plan</h1>
            <p className="text-lg text-zinc-300 mt-4 max-w-2xl">
              6 mois de préparation calibrés sur ton profil Strava. 4 phases progressives,
              4 jalons stratégiques, un seul objectif : <span className="text-orange-500 font-semibold">Sub 20h</span>.
            </p>
          </div>
        </div>
      </div>
    </header>
  )

  const phases = [
    {
      id: 'base' as const,
      num: '01',
      name: 'Base',
      period: '27 jan → 22 mars',
      weeks: '8 semaines',
      volume: '6-8h/sem',
      km: '50-65 km',
      volumeDetail: 'S1-S3: 4-6h / 35-50km | S4-S8: 6-8h / 50-65km',
      color: 'blue',
      icon: Target,
      headline: 'Construire les fondations',
      objective: 'Construire le socle aérobie + apprendre les patterns excentriques.',
      physiologicalDetail: 'Les 3 premières semaines sont de la récupération post-Arc of Attrition. Pas de volume avant S4. Le corps a besoin de reconstruire après un 100 miles. L\'objectif n\'est PAS de faire du volume. C\'est de poser les fondations techniques (tempo muscu, technique descente) et de maintenir une base heat minimale.',
      sessions: [
        { name: 'Sortie longue', duration: '2h30-3h30', detail: 'Terrain vallonné. Allure Z2 conversationnelle. Intégrer quelques descentes à allure soutenue (pas juste les subir). Gut training 40-50g CHO/h avec timer 30min.', priority: true },
        { name: 'Footing Z2', duration: '2× 50-60min', detail: 'Endurance fondamentale. Pas de montre, juste conversation facile. Accumulation de volume sans stress.' },
        { name: 'Muscu A', duration: '50-55min', detail: 'Séance complète excentrique. Focus sur l\'apprentissage du tempo (5s descente). Charges légères — maîtriser avant de charger.', priority: true },
        { name: 'Heat indoor', duration: '45-60min', detail: 'Vélo home trainer + K-way + bonnet. Pièce 22-25°C. Z2 facile. Pas de douche froide après (30min). Maintenance minimale.' },
        { name: 'Gainage', duration: '15-20min', detail: 'Peut se faire après un footing. Planche, bird-dog, dead bug, pont fessier. Core stability pour les descentes.' },
      ],
      totalSessions: '5-6 sessions, 6-8h',
      whatWeConstruct: [
        'Volume Z2 = 80% du temps. Pas d\'intensité, juste accumulation.',
        'Technique muscu = tempo avant charge. Le 5 secondes de descente doit devenir automatique.',
        'Heat = juste maintenir une base. 1×/sem suffit pour ne pas partir de zéro en mai.',
        'Gut training = commencer à 40-50g/h, installer le réflexe timer.',
      ],
      indicators: [
        'Arc of Attrition terminé sans blessure',
        'Récup complète à S+3 (jambes fraîches)',
        'Technique muscu maîtrisée : tempo 5s stable sur squat',
        '4-6 sorties longues >2h30 réalisées',
        'Heat : 6-8 sessions indoor',
      ],
      transition: [
        'Jambes fraîches, pas de douleur résiduelle Arc',
        'Tempo muscu maîtrisé (prêt pour les charges)',
        'Régularité installée (5-6 sessions/sem)',
        'Gut training réflexe (timer automatique)',
      ],
      keyNumber: { value: '80%', label: 'Volume Z2' },
    },
    {
      id: 'dev' as const,
      num: '02',
      name: 'Développement',
      period: '23 mars → 24 mai',
      weeks: '9 semaines',
      volume: '8-10h/sem',
      km: '65-85 km',
      volumeDetail: 'D- hebdo cumulé: 1500-2500m',
      color: 'orange',
      icon: Mountain,
      headline: 'Pic de volume + RBE',
      objective: 'PIC DE VOLUME de l\'année. Construction du Repeated Bout Effect. Gut training progressif. Initiation heat naturelle au Maroc.',
      physiologicalDetail: 'C\'est LA phase où tu construis la résistance musculaire pour les 7536m de D- WSER. Le Long Downhill Repeats devient une séance toutes les 2 semaines, non-négociable.',
      sessions: [
        { name: 'Sortie longue WSER-like', duration: '4-5h', detail: 'C\'est LA séance prioritaire. Terrain avec ratio D-/D+ > 1 si possible. Descentes techniques à allure course (float, pas freinage). Gut training 60-80g CHO/h timer 22-25min. Finir les 2 dernières heures en effort, pas en promenade.', priority: true },
        { name: 'Hill Beast', duration: '75-90min', detail: '4-6× (3-5min montée dure RPE 8 + descente récup ACTIVE en trot). Total 600-1200m D+. Ne pas marcher en descente — c\'est le cœur de l\'adaptation. Alternance avec Pyramide 1 semaine sur 2.' },
        { name: 'Long Downhill Repeats', duration: '90-120min', detail: '4-6× descente 300-500m D-. Allure marathon/semi contrôlée (pas sprint). Montée = récup en marche. Total 1500-3000m D- par séance. C\'est LA séance qui te manque.', priority: true },
        { name: 'Muscu A', duration: '55-60min', detail: 'Charges progressives. Squat passe à goblet 15-20kg puis barre. Step-down passe à 40cm. Nordic curl = allonger le temps de chute.' },
        { name: 'Footing Z2', duration: '1-2× 50-70min', detail: 'Volume complémentaire.' },
        { name: 'Heat indoor', duration: '60min', detail: 'Maintien avant Maroc. Après Maroc : optionnel si météo permet runs midi.' },
      ],
      totalSessions: '6-7 sessions, 8-10h',
      whatWeConstruct: [
        'Volume max de l\'année. C\'est maintenant qu\'on charge, pas en mai.',
        'Repeated Bout Effect via Long Downhill Repeats. 6-8 séances minimum.',
        'Gut training 60→80g CHO/h. Progression méthodique.',
        'Bloc Maroc = initiation heat naturelle. 7-10 jours consécutifs.',
        'Muscu charges en progression. Le tempo est acquis, on charge.',
      ],
      indicators: [
        '8-10 sorties longues >3h réalisées',
        '6-8 séances Long Downhill Repeats',
        'Ultra Sainte Baume : gut 80g/h validé sans GI distress',
        'Bloc Maroc : 7+ jours heat consécutifs',
        'Muscu : squat à 20-30kg tempo 5s stable',
      ],
      transition: [
        'RBE installé (descentes sans courbatures à 48h)',
        'Gut training 80g/h validé en course',
        'Heat initiation Maroc complétée',
        'Charges muscu à niveau cible',
      ],
      keyNumber: { value: '2500m', label: 'D-/semaine' },
    },
    {
      id: 'specific' as const,
      num: '03',
      name: 'Spécifique',
      period: '25 mai → 14 juin',
      weeks: '3 semaines',
      volume: '8-10h/sem',
      km: '55-75 km',
      volumeDetail: 'Sessions heat: 4-5×/sem',
      color: 'cyan',
      icon: Flame,
      headline: 'Heat intensif + dress rehearsal',
      objective: 'Heat intensif. Validation complète matos/nutrition. Simulation conditions jour J.',
      physiologicalDetail: 'Le volume ne monte plus. La priorité devient le heat training intensif (4-5×/sem) et la validation de TOUT ce qui sera utilisé le jour J. Zéro surprise après cette phase. Tout doit être testé et validé.',
      sessions: [
        { name: 'Sortie longue heures chaudes', duration: '4-6h', detail: 'Départ 10h-11h pour finir aux heures chaudes (14h-16h). Simule l\'arrivée aux canyons WSER. Gut training 90-110g CHO/h timer 20min. EXACT mêmes produits que jour J.', priority: true },
        { name: 'Descente technique', duration: '75-90min', detail: 'Focus qualité technique "float". Pas de gros volume, juste entretenir le pattern. Terrain varié.' },
        { name: 'Heat', duration: '3-4× 60-75min', detail: 'Mix runs midi (12h-14h) + indoor si météo <25°C. Objectif core temp 38.5-39°C maintenue 45min+. C\'est LA priorité de cette phase.', priority: true },
        { name: 'Muscu B', duration: '40-45min', detail: 'Séance maintien. Mêmes charges qu\'en phase DEV, moins de séries. Préserver le RBE sans accumuler fatigue.' },
        { name: 'Footing récup', duration: '40-50min', detail: 'Régénération. Très facile.' },
      ],
      totalSessions: '6-8 sessions, 8-10h',
      whatWeConstruct: [
        'Heat intensif 4-5×/sem. C\'est LA priorité.',
        'Gut training 90-110g CHO/h. Validation finale.',
        'Matos WSER définitif validé. Zéro changement après THP.',
        'Confiance. Tu sais que tout fonctionne.',
      ],
      indicators: [
        'THP 120 nutrition : 90-110g/h sans GI distress',
        'THP 120 matos : définitif choisi et validé',
        'Sortie 80km : simulation complète OK',
        'Heat : 20+ sessions sur la phase',
        'Aucune blessure',
      ],
      transition: [
        'Nutrition 100g/h validée sur 16h (THP)',
        'Matos définitif (zéro changement)',
        'Heat adaptation maximale',
        'Confiance dans le plan',
      ],
      keyNumber: { value: '4-5×', label: 'Heat/semaine' },
    },
    {
      id: 'taper' as const,
      num: '04',
      name: 'Taper',
      period: '15 juin → 27 juin',
      weeks: '2 semaines',
      volume: '3-6h/sem',
      km: '25-50 km',
      volumeDetail: 'S1: 5-6h / 40-50km | S2: 3-4h / 25-35km',
      color: 'emerald',
      icon: Zap,
      headline: 'Arriver frais, prêt, confiant',
      objective: 'Arriver FRAIS. Re-boost chaleur. Logistics voyage.',
      physiologicalDetail: 'Le volume chute drastiquement (-50% puis -70%). Le seul travail qui continue = le re-boost heat quotidien de J-10 à J-3. L\'objectif est la fraîcheur absolue le jour J. Toute fatigue accumulée ici est de la fatigue en moins pour la course.',
      sessions: [
        { name: 'Dernière longue', duration: '2h-2h30', detail: 'J-14 ou J-13. Allure facile. Terrain connu. Dernière validation que tout va bien.' },
        { name: 'Dernière muscu lourde', duration: '45min', detail: 'J-14. Séance B normale. Après ça, plus de charges lourdes.' },
        { name: 'Shakeout', duration: '2× 30-40min', detail: 'Activation légère. Juste bouger.' },
        { name: 'Heat léger', duration: '3-4× 45-60min', detail: 'Re-boost quotidien de J-10 à J-3. Intensité légère (Z1-Z2), juste maintenir core temp élevée.', priority: true },
      ],
      totalSessions: 'Variable selon jour',
      whatWeConstruct: [
        'Fraîcheur physique absolue. Le volume chute, c\'est normal.',
        'Re-boost heat quotidien J-10→J-3. C\'est le seul "travail" qui continue.',
        'Logistics voyage. Arrivée J-5 pour s\'acclimater au décalage horaire.',
        'Mental, visualisation, confiance. Tu connais le plan, tu connais la course.',
      ],
      indicators: [
        'Arrivée Californie J-5',
        'Re-boost heat quotidien J-10 → J-3',
        'Stop heat J-3',
        'Dernière muscu J-14',
        'Mental, visualisation OK',
      ],
      transition: [],
      keyNumber: { value: 'J-5', label: 'Arrivée USA' },
    },
  ]

  const taperWeek2Schedule = [
    { jour: 'J-7', activite: 'Muscu légère (dernière), heat 45min' },
    { jour: 'J-6', activite: 'Shakeout 30min, heat 45min' },
    { jour: 'J-5', activite: 'Arrivée Californie — Shakeout léger, heat', highlight: true },
    { jour: 'J-4', activite: 'Shakeout 20min, heat 30min' },
    { jour: 'J-3', activite: 'STOP heat — Shakeout 20min', highlight: true },
    { jour: 'J-2', activite: 'Repos complet, briefing, check-in mental' },
    { jour: 'J-1', activite: 'Repos, check-in course, prépa sacs' },
    { jour: 'J-0', activite: 'WSER — 5am start', highlight: true },
  ]

  const jalons = [
    {
      id: 'arc' as const,
      date: '25-26 jan',
      name: 'Arc of Attrition',
      distance: '100 miles',
      lieu: 'Cornouailles, UK',
      objectif: 'À FOND — seule course performance',
      intensity: '100%',
      mode: 'Course, pas entraînement',
      color: 'orange',
      icon: Target,
      pourquoi: 'C\'est ta seule course "performance" avant WSER. Toutes les autres sont des entraînements déguisés. Arc of Attrition te donne un marqueur de forme en début de cycle. Le résultat n\'affecte pas la préparation WSER — c\'est un test, pas un objectif. Timing : Assez tôt pour avoir 5 mois de préparation après. Assez tard pour être en forme hivernale correcte.',
      tests: [
        'État de forme général post-hiver',
        'Capacité à performer sur 100 miles',
        'Nutrition longue durée (premier test gut training)',
        'Mental course ultra',
      ],
      validation: [
        'Finish sans blessure',
        'Pas de GI distress majeur',
        'Sensation de "j\'aurais pu aller plus vite" = parfait',
        'Si DNF ou blessure → réviser le plan',
      ],
    },
    {
      id: 'sainte-baume' as const,
      date: '1 mars',
      name: 'Ultra Sainte Baume',
      distance: '~80-90 km',
      lieu: 'Provence, France',
      objectif: 'Gut training 80-100g CHO/h',
      intensity: '85%',
      mode: 'Entraînement, pas course',
      color: 'blue',
      icon: Timer,
      pourquoi: 'Validation du gut training à 80-100g/h sur une durée significative (9h+). C\'est la première vraie mise en application des protocoles nutrition. Tu dois sortir de cette course en sachant que 80g/h passe sans problème. Timing : Assez tôt pour corriger si problème. Assez tard pour avoir quelques semaines de gut training derrière.',
      tests: [
        'Gut training 80-100g CHO/h',
        'Timer 20-25min',
        'Produits spécifiques (Maurten, Tailwind, TA)',
        'Gestion ravitos',
      ],
      validation: [
        '80g/h maintenu sans GI distress = validé',
        'Si ballonnements/nausées → ajuster les produits',
        'Si impossible de tenir 80g/h → revoir la progression',
        'Chrono secondaire — l\'objectif est la nutrition',
      ],
    },
    {
      id: 'maroc' as const,
      date: 'Fin avril',
      name: 'Bloc Maroc',
      distance: '7-10 jours',
      lieu: 'Maroc (chaleur naturelle)',
      objectif: 'Heat initiation naturelle',
      intensity: '60-70%',
      mode: 'Exposition, pas entraînement',
      color: 'orange',
      icon: Thermometer,
      pourquoi: 'L\'exposition naturelle au soleil + chaleur ambiante est plus complète que le protocole indoor. Le Maroc offre une opportunité de lancer les vraies adaptations heat (volume plasmatique, sudation précoce) avec une exposition prolongée que tu ne peux pas reproduire en France en avril. Timing : 8 semaines avant WSER. Assez tôt pour avoir le bloc intensif après. Assez tard pour que les adaptations persistent.',
      tests: [
        'Run quotidien 1h-1h30 aux heures chaudes (11h-14h)',
        'Allure Z2 très facile — l\'objectif est l\'exposition',
        'Activités outdoor (parapente, marche) — rester au soleil',
        'Pas de refroidissement artificiel (piscine, clim, douche froide)',
      ],
      validation: [
        '7+ jours consécutifs d\'exposition',
        'Sudation précoce observable',
        'FC à effort donné qui diminue au fil des jours',
        'Sensation subjective : la chaleur devient "moins pénible"',
      ],
      protocoleJournee: [
        'Matin : Activités outdoor légères (parapente, marche)',
        '11h-14h : Run Z2 très facile',
        'Après-midi : Rester dehors, pas de clim',
        'Post-run : Pas de douche froide immédiate, pas de piscine pendant 30min',
      ],
      aNepasFaire: [
        'Pas de séances dures (le heat training EST la séance)',
        'Pas de gros volume (60-90min/jour max)',
        'Pas de refroidissement artificiel',
        'Pas de recherche de performance',
      ],
    },
    {
      id: 'thp' as const,
      date: '15-16 mai',
      name: 'THP 120',
      distance: '120 km / ~16h',
      lieu: 'France',
      objectif: 'Dress rehearsal complet',
      intensity: '85%',
      mode: 'Simulation WSER, pas course',
      color: 'cyan',
      icon: MapPin,
      pourquoi: 'Dernière opportunité de tester TOUT dans des conditions proches de WSER. THP 120 est ton "dress rehearsal". Tu utilises exactement le même matos, la même nutrition, les mêmes protocoles que WSER. Tout problème identifié ici = problème résolu avant le jour J. Timing : 6 semaines avant WSER. Assez de temps pour récupérer et corriger. Assez proche pour que les conditions soient représentatives.',
      tests: [
        'Nutrition 90-110g CHO/h sur 16h',
        'EXACT mêmes produits WSER',
        'Matos complet (chaussures, chaussettes, t-shirt, casquette)',
        'Protocoles cooling (bandana glace, casquette mouillée)',
        'Timer 20min',
        'Gestion ravitos et transitions',
      ],
      validation: [
        '90-110g/h maintenu sans GI distress = validé',
        'Matos confortable sur 16h = définitif',
        'Cooling efficace = protocole finalisé',
        'Si problème → 6 semaines pour corriger',
      ],
      debrief: [
        'Ce qui a marché parfaitement',
        'Ce qui a posé problème',
        'Ce qui doit être ajusté',
        'Après THP, ZÉRO changement sur les produits/matos',
      ],
    },
  ]

  const checkpoints = [
    { name: 'Robinson Flat', km: 48.8, tempsTarget: '5:30-6:00' },
    { name: 'Michigan Bluff', km: 89.7, tempsTarget: '10:15-10:45' },
    { name: 'Foresthill', km: 99.8, tempsTarget: '11:30-12:00' },
    { name: 'Rucky Chucky', km: 125.5, tempsTarget: '14:30-15:00' },
    { name: 'Auburn Lake Trails', km: 137.1, tempsTarget: '16:00-16:30' },
    { name: 'Finish', km: 161, tempsTarget: '19:30-20:00', highlight: true },
  ]

  const checklist = [
    { item: 'Gut training 80g/h validé', deadline: '1 mars', course: 'Ultra Sainte Baume' },
    { item: 'Gut training 100g/h validé', deadline: '15 mai', course: 'THP 120' },
    { item: 'Matos définitif testé', deadline: '15 mai', course: 'THP 120' },
    { item: 'Bloc heat 7-10j consécutifs', deadline: '25 avril', course: 'Maroc' },
    { item: 'Dress rehearsal 120km', deadline: '15 mai', course: 'THP 120' },
    { item: 'Simulation finale 80km', deadline: 'Fin mai', course: 'Sortie longue' },
    { item: 'Heat intensif complété', deadline: '14 juin', course: 'Phase SPÉ' },
    { item: 'Re-boost heat 7j', deadline: 'J-10 → J-3', course: 'Taper' },
    { item: 'Dernière muscu lourde', deadline: 'J-14', course: 'Taper' },
    { item: 'Arrivée Californie', deadline: 'J-5', course: 'Voyage' },
    { item: 'Stop heat', deadline: 'J-3', course: 'Taper' },
  ]

  const acquisAvantDepart = [
    'Nutrition 100g/h validée sur 16h',
    'Matos définitif (zéro changement depuis THP)',
    'Heat adaptation maximale',
    'RBE installé (descentes sans courbatures)',
    'Plan de course détaillé (splits, nutrition par section)',
    'Équipe crew briefée (postes, protocoles)',
    'Logistics voyage bouclées',
  ]

  return (
    <div className="space-y-12">
      {/* Hero avec image */}
      {heroContent}

      {/* Progress + Training Log */}
      <div className="grid md:grid-cols-2 gap-6 -mt-6">
        <ProgressTracker />
        <TrainingLog />
      </div>

      {/* Timeline visuelle */}
      <div>
        <div className="flex gap-1">
          {[
            { phase: 'Base', weeks: 8, color: 'bg-blue-500' },
            { phase: 'Dév', weeks: 9, color: 'bg-orange-500' },
            { phase: 'Spé', weeks: 3, color: 'bg-cyan-500' },
            { phase: 'Taper', weeks: 2, color: 'bg-emerald-500' },
          ].map((p) => (
            <div
              key={p.phase}
              className={`${p.color} h-2 rounded-full`}
              style={{ flex: p.weeks }}
              title={`${p.phase}: ${p.weeks} semaines`}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-zinc-500 mt-2">
          <span>27 Janvier</span>
          <span>23 Mars</span>
          <span>25 Mai</span>
          <span>27 Juin</span>
        </div>
      </div>

      {/* Vue d'ensemble - Tableau des 4 phases */}
      <section>
        <SectionHeader kicker="Vue d'ensemble" title="Les 4 phases de préparation" />

        <div className="overflow-x-auto mt-8 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Phase</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Période</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Durée</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Volume</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Focus principal</th>
              </tr>
            </thead>
            <tbody>
              {[
                { phase: 'BASE', period: '27 jan → 22 mars', duration: '8 sem', volume: '6-8h/sem', focus: 'Récup + socle aérobie + technique muscu', color: 'blue' },
                { phase: 'DÉVELOPPEMENT', period: '23 mars → 24 mai', duration: '9 sem', volume: '8-10h/sem', focus: 'Pic volume + RBE + gut training', color: 'orange' },
                { phase: 'SPÉCIFIQUE', period: '25 mai → 14 juin', duration: '3 sem', volume: '8-10h/sem', focus: 'Heat intensif + validation matos', color: 'cyan' },
                { phase: 'TAPER', period: '15 juin → 27 juin', duration: '2 sem', volume: '3-6h/sem', focus: 'Fraîcheur + re-boost heat', color: 'emerald' },
              ].map((row) => (
                <tr key={row.phase} className="border-t border-zinc-800/50">
                  <td className={`py-3 px-4 font-semibold ${
                    row.color === 'blue' ? 'text-blue-400' :
                    row.color === 'orange' ? 'text-orange-400' :
                    row.color === 'cyan' ? 'text-cyan-400' :
                    'text-emerald-400'
                  }`}>{row.phase}</td>
                  <td className="py-3 px-4 font-mono text-zinc-400">{row.period}</td>
                  <td className="py-3 px-4 text-zinc-300">{row.duration}</td>
                  <td className="py-3 px-4 text-zinc-300">{row.volume}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Jalons - Timeline horizontale */}
      <section>
        <SectionHeader kicker="Calendrier" title="Les jalons clés" />

        <div className="overflow-x-auto mt-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Date</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Événement</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Objectif</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Intensité</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: '25-26 jan', name: 'Arc of Attrition', obj: 'À FOND — seule course perf', intensity: '100%', color: 'orange' },
                { date: '1 mars', name: 'Ultra Sainte Baume', obj: 'Gut training 80-100g/h', intensity: '85%', color: 'blue' },
                { date: '25 avril', name: 'Bloc Maroc', obj: 'Heat initiation 7-10j', intensity: '60-70%', color: 'orange' },
                { date: '15-16 mai', name: 'THP 120', obj: 'Dress rehearsal complet', intensity: '85%', color: 'cyan' },
                { date: 'Fin mai', name: 'Sortie 80km', obj: 'Dernière simulation', intensity: '80%', color: 'cyan' },
                { date: '27-28 juin', name: 'WSER', obj: 'Sub-20h', intensity: '100%', highlight: true, color: 'emerald' },
              ].map((m) => (
                <tr key={m.name} className={`border-b border-zinc-800/50 ${m.highlight ? 'bg-emerald-500/10' : ''}`}>
                  <td className="py-3 px-4 font-mono text-zinc-400">{m.date}</td>
                  <td className={`py-3 px-4 font-semibold ${m.highlight ? 'text-emerald-400' : ''}`}>{m.name}</td>
                  <td className="py-3 px-4 text-zinc-400">{m.obj}</td>
                  <td className="py-3 px-4">
                    <span className={`font-mono ${
                      m.color === 'orange' ? 'text-orange-400' :
                      m.color === 'blue' ? 'text-blue-400' :
                      m.color === 'cyan' ? 'text-cyan-400' :
                      'text-emerald-400'
                    }`}>{m.intensity}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Différenciateurs - Les 4 bascules */}
      <section>
        <SectionHeader kicker="Sub-20h" title="Ce qui différencie un finisher d'un sub-20h" />

        <p className="prose-magazine mt-4 mb-8">
          Passer de <strong>top 5%</strong> (finisher 24h) à <strong>top 2-3%</strong> (sub-20h) ne se joue pas sur la forme.
          Ça se joue sur <strong>4 facteurs spécifiques</strong> que ce plan adresse frontalement.
        </p>

        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Facteur</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Finisher (24h)</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Sub-20h</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Ton état actuel</th>
              </tr>
            </thead>
            <tbody>
              {[
                { factor: 'Chaleur', finisher: 'Survit aux canyons', sub20: 'Performe à 40°C', gap: 'Aucune base', status: 'critical' },
                { factor: 'Descentes', finisher: 'Ralentit, protège', sub20: 'Float, relance, gagne', gap: 'Non-répété', status: 'warning' },
                { factor: 'Intake CHO', finisher: '250 kcal/h', sub20: '300+ kcal/h', gap: 'Non-validé', status: 'critical' },
                { factor: '2e moitié', finisher: 'Gère, limite la casse', sub20: 'Accélère après Foresthill', gap: 'Kullamannen', status: 'ok' },
              ].map((row) => (
                <tr key={row.factor} className={`border-b border-zinc-800/50 last:border-0 ${
                  row.status === 'ok' ? 'bg-emerald-500/5' :
                  row.status === 'warning' ? 'bg-yellow-500/5' :
                  'bg-red-500/5'
                }`}>
                  <td className="py-3 px-4 font-medium">{row.factor}</td>
                  <td className="py-3 px-4 text-zinc-500">{row.finisher}</td>
                  <td className="py-3 px-4 text-orange-400 font-medium">{row.sub20}</td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-semibold flex items-center gap-1.5 ${
                      row.status === 'critical' ? 'text-red-400' :
                      row.status === 'warning' ? 'text-yellow-400' :
                      'text-emerald-400'
                    }`}>
                      <span>{row.status === 'ok' ? '✓' : row.status === 'warning' ? '⚠' : '✗'}</span>
                      {row.gap}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Les 4 bascules à opérer */}
        <h3 className="text-lg font-semibold mt-8 mb-4">Les 4 bascules à opérer</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { num: '1', title: 'Sortie longue = vraie longue', desc: 'Passer de 2h à 3-5h. Tes sorties longues actuelles sont trop courtes pour WSER.' },
            { num: '2', title: '1 séance descente/semaine', desc: 'Long Downhill Repeats. C\'est LA séance qui te manque pour construire le RBE.' },
            { num: '3', title: 'Heat maintenance dès janvier', desc: '1×/sem indoor. Ne pas partir de zéro en mai.' },
            { num: '4', title: 'Gut training systématique', desc: 'Timer sur toute sortie >2h. Progression 40g → 110g CHO/h.' },
          ].map((b) => (
            <div key={b.num} className="flex gap-4 items-start p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <span className="font-mono text-2xl font-bold text-orange-500">{b.num}</span>
              <div>
                <h4 className="font-semibold">{b.title}</h4>
                <p className="text-sm text-zinc-400 mt-1">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Phases - Style magazine avec numérotation */}
      <section>
        <SectionHeader kicker="Périodisation" title="Les 4 phases détaillées" />

        <div className="space-y-4 mt-8">
          {phases.map((phase) => {
            const Icon = phase.icon
            const isExpanded = expandedPhase === phase.id
            const colorMap = {
              blue: { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-l-blue-500', bgLight: 'bg-blue-500/10' },
              orange: { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-l-orange-500', bgLight: 'bg-orange-500/10' },
              cyan: { bg: 'bg-cyan-500', text: 'text-cyan-400', border: 'border-l-cyan-500', bgLight: 'bg-cyan-500/10' },
              emerald: { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-l-emerald-500', bgLight: 'bg-emerald-500/10' },
            }
            const colorClasses = colorMap[phase.color as keyof typeof colorMap] || colorMap.blue

            return (
              <div
                key={phase.id}
                className={`rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden border-l-4 ${colorClasses.border}`}
              >
                <button
                  onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-zinc-800/30 transition-colors"
                >
                  <div className="flex items-center gap-5">
                    <span className="font-mono text-3xl font-bold text-zinc-700">{phase.num}</span>
                    <div className={`w-10 h-10 rounded-xl ${colorClasses.bgLight} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${colorClasses.text}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold">{phase.name}</span>
                        <span className={`text-xs uppercase tracking-wider ${colorClasses.text}`}>{phase.headline}</span>
                      </div>
                      <div className="text-sm text-zinc-500 mt-1">{phase.period} · {phase.weeks} · {phase.volume}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <div className="font-mono text-xl font-bold">{phase.keyNumber.value}</div>
                      <div className="text-xs text-zinc-500">{phase.keyNumber.label}</div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-zinc-800">
                    {/* Vue d'ensemble de la phase */}
                    <div className="p-5 border-b border-zinc-800/50 bg-zinc-900/30">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-zinc-500">Période</div>
                          <div className="font-mono">{phase.period}</div>
                        </div>
                        <div>
                          <div className="text-zinc-500">Durée</div>
                          <div className="font-mono">{phase.weeks}</div>
                        </div>
                        <div>
                          <div className="text-zinc-500">Volume</div>
                          <div className="font-mono">{phase.volume}</div>
                        </div>
                        <div>
                          <div className="text-zinc-500">Détail</div>
                          <div className="font-mono text-xs">{phase.volumeDetail}</div>
                        </div>
                      </div>
                    </div>

                    {/* Objectif physiologique */}
                    <div className={`p-5 ${colorClasses.bgLight}`}>
                      <h4 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                        <Info className="w-4 h-4" /> Objectif physiologique
                      </h4>
                      <p className="text-zinc-300 leading-relaxed font-medium">{phase.objective}</p>
                      <p className="text-zinc-400 leading-relaxed mt-3">{phase.physiologicalDetail}</p>
                    </div>

                    {/* Semaine type - Table */}
                    <div className="p-5">
                      <h4 className="text-sm font-semibold text-zinc-300 mb-4 uppercase tracking-wider">
                        Semaine type {phase.name.toUpperCase()} — La recette
                      </h4>
                      <div className="overflow-x-auto rounded-lg border border-zinc-800">
                        <table className="w-full text-sm">
                          <thead className="bg-zinc-900/80">
                            <tr>
                              <th className="text-left py-2 px-3 font-medium text-zinc-400">Séance</th>
                              <th className="text-left py-2 px-3 font-medium text-zinc-400">Durée</th>
                              <th className="text-left py-2 px-3 font-medium text-zinc-400">Détail</th>
                            </tr>
                          </thead>
                          <tbody>
                            {phase.sessions.map((session) => (
                              <tr key={session.name} className="border-t border-zinc-800/50">
                                <td className={`py-2 px-3 font-medium ${session.priority ? colorClasses.text : ''}`}>
                                  {session.name}
                                  {session.priority && <span className="ml-2 text-xs">★</span>}
                                </td>
                                <td className="py-2 px-3 font-mono text-zinc-400 whitespace-nowrap">{session.duration}</td>
                                <td className="py-2 px-3 text-zinc-400 text-xs">{session.detail}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-sm text-zinc-500 mt-3"><strong>Total :</strong> {phase.totalSessions}</p>
                    </div>

                    {/* Ce qu'on construit */}
                    <div className="p-5 pt-0">
                      <h4 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider">
                        Ce qu'on construit en phase {phase.name.toUpperCase()}
                      </h4>
                      <ul className="space-y-2">
                        {phase.whatWeConstruct.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400">
                            <span className={`mt-1 w-1.5 h-1.5 rounded-full ${colorClasses.bg}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Indicateurs de réussite */}
                    <div className="p-5 pt-0">
                      <h4 className="text-sm font-semibold text-zinc-300 mb-4 uppercase tracking-wider">Indicateurs de réussite</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {phase.indicators.map((indicator) => (
                          <div key={indicator} className="flex items-center gap-3 text-sm">
                            <div className={`w-4 h-4 rounded border ${colorClasses.border.replace('border-l-', 'border-')} flex items-center justify-center`}>
                              <CheckCircle className="w-3 h-3 text-zinc-600" />
                            </div>
                            <span className="text-zinc-400">{indicator}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Transition vers phase suivante */}
                    {phase.transition.length > 0 && (
                      <div className="p-5 pt-0">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-500" /> Acquis nécessaires avant la phase suivante
                        </h4>
                        <ul className="space-y-2">
                          {phase.transition.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400">
                              <CheckCircle className="w-4 h-4 text-zinc-600 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Semaine 2 du Taper - Planning jour par jour */}
                    {phase.id === 'taper' && (
                      <>
                        <div className="p-5 border-t border-zinc-800/50">
                          <h4 className="text-sm font-semibold text-zinc-300 mb-4 uppercase tracking-wider">
                            Semaine 2 (J-7 → J-0) — Planning jour par jour
                          </h4>
                          <div className="overflow-x-auto rounded-lg border border-zinc-800">
                            <table className="w-full text-sm">
                              <thead className="bg-zinc-900/80">
                                <tr>
                                  <th className="text-left py-2 px-3 font-medium text-zinc-400 w-20">Jour</th>
                                  <th className="text-left py-2 px-3 font-medium text-zinc-400">Activité</th>
                                </tr>
                              </thead>
                              <tbody>
                                {taperWeek2Schedule.map((day) => (
                                  <tr key={day.jour} className={`border-t border-zinc-800/50 ${day.highlight ? 'bg-emerald-500/10' : ''}`}>
                                    <td className={`py-2 px-3 font-mono ${day.highlight ? 'text-emerald-400 font-semibold' : 'text-zinc-400'}`}>
                                      {day.jour}
                                    </td>
                                    <td className={`py-2 px-3 ${day.highlight ? 'text-zinc-200 font-medium' : 'text-zinc-400'}`}>
                                      {day.activite}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Re-boost Heat */}
                        <div className="p-5 pt-0">
                          <h4 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                            <Thermometer className="w-4 h-4 text-orange-500" /> Re-boost Heat (J-10 → J-3)
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                            <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                              <div className="text-zinc-500">Fréquence</div>
                              <div className="font-semibold text-orange-400">Quotidien</div>
                            </div>
                            <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                              <div className="text-zinc-500">Durée</div>
                              <div className="font-semibold">30-45min</div>
                            </div>
                            <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                              <div className="text-zinc-500">Intensité</div>
                              <div className="font-semibold">Z1-Z2 légère</div>
                            </div>
                            <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                              <div className="text-zinc-500">Objectif</div>
                              <div className="font-semibold">Mémoire physio</div>
                            </div>
                          </div>
                          <div className="space-y-3 text-sm">
                            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                              <p className="font-semibold text-orange-400 mb-2">Pourquoi le re-boost ?</p>
                              <p className="text-zinc-400">La "mémoire physiologique" permet une réadaptation rapide (5-7 jours vs 10-14 jours initial). Les adaptations perdues pendant les quelques jours sans heat se récupèrent vite. Le re-boost assure que le jour J = pic d'acclimatation.</p>
                            </div>
                            <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                              <p className="font-semibold text-cyan-400 mb-2">Pourquoi arrêter à J-3 ?</p>
                              <p className="text-zinc-400">Les adaptations sont en place. Continuer jusqu'à J-1 risque d'ajouter de la fatigue, déshydrater, perturber le sommeil. J-3 permet 48-72h de récupération complète tout en conservant les adaptations.</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Jalons détaillés */}
      <section>
        <SectionHeader kicker="Jalons" title="Les 4 jalons détaillés" />

        <div className="space-y-4 mt-8">
          {jalons.map((jalon) => {
            const Icon = jalon.icon
            const isExpanded = expandedJalon === jalon.id
            const colorMap = {
              orange: { text: 'text-orange-400', border: 'border-l-orange-500', bgLight: 'bg-orange-500/10' },
              blue: { text: 'text-blue-400', border: 'border-l-blue-500', bgLight: 'bg-blue-500/10' },
              cyan: { text: 'text-cyan-400', border: 'border-l-cyan-500', bgLight: 'bg-cyan-500/10' },
            }
            const colorClasses = colorMap[jalon.color as keyof typeof colorMap] || colorMap.orange

            return (
              <div
                key={jalon.id}
                className={`rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden border-l-4 ${colorClasses.border}`}
              >
                <button
                  onClick={() => setExpandedJalon(isExpanded ? null : jalon.id)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-zinc-800/30 transition-colors"
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-10 h-10 rounded-xl ${colorClasses.bgLight} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${colorClasses.text}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-zinc-500">{jalon.date}</span>
                        <span className="text-lg font-semibold">{jalon.name}</span>
                      </div>
                      <div className="text-sm text-zinc-400 mt-1">{jalon.objectif}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <div className={`font-mono text-lg font-bold ${colorClasses.text}`}>{jalon.intensity}</div>
                      <div className="text-xs text-zinc-500">{jalon.distance}</div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-zinc-800">
                    {/* Infos de base */}
                    <div className="p-5 border-b border-zinc-800/50 bg-zinc-900/30">
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <div className="text-zinc-500">Distance</div>
                          <div className="font-semibold">{jalon.distance}</div>
                        </div>
                        <div>
                          <div className="text-zinc-500">Lieu</div>
                          <div className="font-semibold">{jalon.lieu}</div>
                        </div>
                        <div>
                          <div className="text-zinc-500">Objectif</div>
                          <div className="font-semibold">{jalon.objectif}</div>
                        </div>
                        <div>
                          <div className="text-zinc-500">Intensité</div>
                          <div className={`font-semibold ${colorClasses.text}`}>{jalon.intensity}</div>
                        </div>
                        <div>
                          <div className="text-zinc-500">Mode</div>
                          <div className="font-semibold">{jalon.mode}</div>
                        </div>
                      </div>
                    </div>

                    {/* Pourquoi */}
                    <div className={`p-5 ${colorClasses.bgLight}`}>
                      <h4 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider">
                        Pourquoi cette {jalon.id === 'maroc' ? 'période' : 'course'} à ce moment ?
                      </h4>
                      <p className="text-zinc-300 leading-relaxed">{jalon.pourquoi}</p>
                    </div>

                    {/* Protocole journée type (Maroc) */}
                    {jalon.protocoleJournee && (
                      <div className="p-5 border-t border-zinc-800/50">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider">
                          Protocole journée type
                        </h4>
                        <ul className="space-y-2">
                          {jalon.protocoleJournee.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400">
                              <Calendar className="w-4 h-4 text-orange-500 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Ce qu'on ne fait PAS (Maroc) */}
                    {jalon.aNepasFaire && (
                      <div className="p-5 pt-0">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-500" /> Ce qu'on ne fait PAS
                        </h4>
                        <ul className="space-y-2">
                          {jalon.aNepasFaire.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-red-400/80">
                              <span className="mt-1">✗</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Ce qu'on teste */}
                    <div className="p-5 border-t border-zinc-800/50">
                      <h4 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider">
                        Ce qu'on {jalon.id === 'maroc' ? 'fait' : 'teste'}
                      </h4>
                      <ul className="space-y-2">
                        {jalon.tests.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400">
                            <CheckCircle className="w-4 h-4 text-zinc-600 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Critères de validation */}
                    <div className="p-5 pt-0">
                      <h4 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider">
                        Critères de validation
                      </h4>
                      <ul className="space-y-2">
                        {jalon.validation.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400">
                            <span className={`mt-1 w-1.5 h-1.5 rounded-full ${
                              item.includes('→') ? 'bg-yellow-500' : 'bg-emerald-500'
                            }`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Débrief obligatoire (THP) */}
                    {jalon.debrief && (
                      <div className="p-5 pt-0">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-500" /> Débrief obligatoire (dans les 48h)
                        </h4>
                        <ul className="space-y-2">
                          {jalon.debrief.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400">
                              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Mantras - Pull quotes */}
      <section>
        <SectionHeader kicker="Mindset" title="Les 4 mantras" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {[
            { mantra: 'Float, don\'t brake', context: 'Descente', detail: 'Ne pas freiner mais accompagner le terrain. Laisser les jambes absorber.' },
            { mantra: 'Walk like you mean it', context: 'Montée', detail: 'Marcher vite et efficace, pas traîner. Power hiking = arme secrète.' },
            { mantra: 'The race starts at mile 62', context: 'Post-Foresthill', detail: 'C\'est là que tout se joue. Accélérer quand les autres ralentissent.' },
            { mantra: 'Eat before you\'re hungry, drink before you\'re thirsty', context: 'Nutrition', detail: 'Anticiper, jamais rattraper. Timer toutes les 20min.' },
          ].map((item) => (
            <div key={item.mantra} className="pull-quote">
              <p className="text-xl font-display font-semibold text-orange-400">"{item.mantra}"</p>
              <p className="text-sm text-zinc-300 mt-3">{item.detail}</p>
              <p className="text-xs text-zinc-500 mt-2 uppercase tracking-wider">{item.context}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stratégie Jour J - Timeline visuelle */}
      <section>
        <SectionHeader kicker="Jour J" title="Stratégie par section" />

        <p className="prose-magazine mt-4 mb-8">
          4 sections, 4 stratégies distinctes. La clé : adapter l'effort et l'intake CHO à chaque portion du parcours.
        </p>

        <div className="space-y-4 mt-8">
          {[
            { section: 'High Country', km: '0-50', strategy: 'Stay relaxed, focus eating', conditions: 'Altitude 2300m', cho: '50-60g/h', color: 'blue' },
            { section: 'Canyons', km: '50-100', strategy: 'Float downhills, hike hard ups', conditions: '35-42°C. Cooling max.', cho: '60-80g/h', color: 'orange' },
            { section: 'California Loop', km: '100-128', strategy: '"The race starts here." Maintenir allure', conditions: 'River crossing km 125', cho: '90-100g/h', color: 'cyan' },
            { section: 'Final Push', km: '128-161', strategy: 'Push through. Don\'t stop eating', conditions: 'Auburn Lake Trails', cho: '100-110g/h', color: 'emerald' },
          ].map((s, idx) => {
            const colorMap = {
              blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-l-blue-500' },
              orange: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-l-orange-500' },
              cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-l-cyan-500' },
              emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-l-emerald-500' },
            }
            const colorClasses = colorMap[s.color as keyof typeof colorMap] || colorMap.blue

            return (
              <div
                key={s.section}
                className={`rounded-xl border border-zinc-800 ${colorClasses.bg} overflow-hidden border-l-4 ${colorClasses.border}`}
              >
                <div className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-3xl font-bold text-zinc-700">0{idx + 1}</span>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{s.section}</h3>
                          <span className={`text-xs font-mono ${colorClasses.text}`}>km {s.km}</span>
                        </div>
                        <p className="text-zinc-400 mt-1">{s.strategy}</p>
                        <p className="text-xs text-zinc-500 mt-1">{s.conditions}</p>
                      </div>
                    </div>
                    <div className="flex gap-6 md:gap-8">
                      <div className="text-right">
                        <div className="font-mono text-lg font-bold text-orange-400">{s.cho}</div>
                        <div className="text-xs text-zinc-500">CHO</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Checkpoints sub-20h */}
      <section>
        <SectionHeader kicker="Pacing" title="Checkpoints sub-20h" />

        <div className="overflow-x-auto mt-8 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Checkpoint</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Distance</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Temps cible</th>
              </tr>
            </thead>
            <tbody>
              {checkpoints.map((cp) => (
                <tr key={cp.name} className={`border-t border-zinc-800/50 ${cp.highlight ? 'bg-emerald-500/10' : ''}`}>
                  <td className={`py-3 px-4 font-medium ${cp.highlight ? 'text-emerald-400' : ''}`}>{cp.name}</td>
                  <td className="py-3 px-4 font-mono text-zinc-400">{cp.km} km</td>
                  <td className={`py-3 px-4 font-mono ${cp.highlight ? 'text-emerald-400 font-bold text-lg' : ''}`}>{cp.tempsTarget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Check-list finale */}
      <section>
        <SectionHeader kicker="Validation" title="Check-list pré-WSER" />

        <h3 className="text-lg font-semibold mt-8 mb-4">Timeline des validations</h3>

        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Item</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Deadline</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Course/Moment</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400 w-16">Status</th>
              </tr>
            </thead>
            <tbody>
              {checklist.map((row) => (
                <tr key={row.item} className="border-t border-zinc-800/50">
                  <td className="py-3 px-4">{row.item}</td>
                  <td className="py-3 px-4 font-mono text-zinc-400">{row.deadline}</td>
                  <td className="py-3 px-4 text-zinc-500">{row.course}</td>
                  <td className="py-3 px-4">
                    <div className="w-5 h-5 rounded border border-zinc-700 flex items-center justify-center">
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Acquis avant départ */}
        <h3 className="text-lg font-semibold mt-8 mb-4">Ce qui doit être acquis avant le départ</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {acquisAvantDepart.map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-zinc-300">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <div className="text-center text-xs text-zinc-600 mt-12 pt-8 border-t border-zinc-800">
        Document calibré sur le profil Strava de Loïc : 6-9h/sem, régularité excellente
      </div>
    </div>
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
