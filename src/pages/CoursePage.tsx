import { Thermometer, TrendingDown, Zap, ChevronDown, ChevronUp, Users } from 'lucide-react'
import { useState, useEffect } from 'react'
import { WSERMap, parseGPX } from '../components/WSERMap'
import { ElevationProfile } from '../components/ElevationProfile'
import { SplitDetails, SectionSummary } from '../components/SplitDetails'
import { PaceCalculator } from '../components/PaceCalculator'
import { type SplitData } from '../data/wserSplits'

// Full 23 aid stations data from markdown
const aidStations = [
  { num: 1, name: 'Start', km: 0, alt: 1943, cutoff: '—', sub20: '0:00', hour: '5:00', services: '—', crew: false },
  { num: 2, name: 'Escarpment', km: 6.4, alt: 2555, cutoff: '—', sub20: '0:48', hour: '5:48', services: 'eau', crew: false },
  { num: 3, name: 'Lyon Ridge', km: 16.6, alt: 2123, cutoff: '—', sub20: '1:58', hour: '6:58', services: 'eau', crew: false },
  { num: 4, name: 'Red Star Ridge', km: 25.4, alt: 2239, cutoff: '—', sub20: '2:59', hour: '7:59', services: 'eau', crew: false },
  { num: 5, name: 'Duncan Canyon', km: 39.3, alt: 1790, cutoff: '—', sub20: '4:21', hour: '9:21', services: 'eau', crew: false },
  { num: 6, name: 'Robinson Flat', km: 48.8, alt: 2057, cutoff: '10h30', sub20: '5:34', hour: '10:34', services: 'CREW, drop bag, médical', crew: true },
  { num: 7, name: "Miller's Defeat", km: 55.4, alt: 1909, cutoff: '—', sub20: '6:16', hour: '11:16', services: 'eau', crew: false },
  { num: 8, name: 'Dusty Corners', km: 61.2, alt: 1652, cutoff: '—', sub20: '6:47', hour: '11:47', services: 'eau', crew: false },
  { num: 9, name: 'Last Chance', km: 69.7, alt: 1402, cutoff: '—', sub20: '7:35', hour: '12:35', services: 'eau', crew: false },
  { num: 10, name: "Devil's Thumb", km: 76.9, alt: 1277, cutoff: '—', sub20: '8:39', hour: '13:39', services: 'eau, glace', crew: false },
  { num: 11, name: 'El Dorado Creek', km: 85.1, alt: 625, cutoff: '—', sub20: '9:29', hour: '14:29', services: 'eau, glace', crew: false },
  { num: 12, name: 'Michigan Bluff', km: 89.7, alt: 1080, cutoff: '17h00', sub20: '10:18', hour: '15:18', services: 'CREW, drop bag, médical', crew: true },
  { num: 13, name: 'Foresthill', km: 99.8, alt: 1004, cutoff: '19h20', sub20: '11:34', hour: '16:34', services: 'CREW, drop bag, médical, pacer', crew: true },
  { num: 14, name: 'Cal-1 (Dardanelles)', km: 105.7, alt: 582, cutoff: '—', sub20: '12:14', hour: '17:14', services: 'eau', crew: false },
  { num: 15, name: 'Cal-2 (Peachstone)', km: 113.8, alt: 506, cutoff: '—', sub20: '13:08', hour: '18:08', services: 'eau', crew: false },
  { num: 16, name: "Cal-3 (Ford's Bar)", km: 117.5, alt: 364, cutoff: '—', sub20: '13:51', hour: '18:51', services: 'eau', crew: false },
  { num: 17, name: 'Rucky Chucky', km: 125.5, alt: 236, cutoff: '—', sub20: '14:36', hour: '19:36', services: 'drop bag, traversée rivière', crew: false },
  { num: 18, name: 'Green Gate', km: 128.4, alt: 434, cutoff: '—', sub20: '15:02', hour: '20:02', services: 'eau', crew: false },
  { num: 19, name: 'Auburn Lake Trails', km: 137.1, alt: 443, cutoff: '23h00', sub20: '15:58', hour: '20:58', services: 'médical, soupe', crew: true },
  { num: 20, name: 'Quarry Road', km: 146.0, alt: 244, cutoff: '—', sub20: '16:54', hour: '21:54', services: 'eau', crew: false },
  { num: 21, name: 'Pointed Rocks', km: 151.8, alt: 486, cutoff: '—', sub20: '17:49', hour: '22:49', services: 'eau', crew: false },
  { num: 22, name: 'Robie Point', km: 159.2, alt: 334, cutoff: '—', sub20: '18:58', hour: '23:58', services: 'eau', crew: false },
  { num: 23, name: 'Finish (Auburn)', km: 163.4, alt: 404, cutoff: '30h00', sub20: '19:13', hour: '0:13 +1', services: 'FINISH', crew: true },
]

// Jeff Browning splits
const browninSplits = [
  { section: 'Escarpment', km: 6.4, split: '0:48:15', pace: '7:32' },
  { section: 'Lyon Ridge', km: 16.6, split: '1:09:44', pace: '6:50' },
  { section: 'Red Star Ridge', km: 25.4, split: '1:01:22', pace: '6:58' },
  { section: 'Duncan Canyon', km: 39.3, split: '1:21:46', pace: '5:53' },
  { section: 'Robinson Flat', km: 48.8, split: '1:13:11', pace: '7:42', highlight: true },
  { section: "Miller's Defeat", km: 55.4, split: '0:42:14', pace: '6:23' },
  { section: 'Dusty Corners', km: 61.2, split: '0:30:55', pace: '5:19' },
  { section: 'Last Chance', km: 69.7, split: '0:47:30', pace: '5:35' },
  { section: "Devil's Thumb", km: 76.9, split: '1:04:45', pace: '8:59' },
  { section: 'El Dorado Creek', km: 85.1, split: '0:49:27', pace: '6:01' },
  { section: 'Michigan Bluff', km: 89.7, split: '0:48:53', pace: '10:37', highlight: true },
  { section: 'Foresthill', km: 99.8, split: '1:16:30', pace: '7:34', highlight: true },
  { section: 'Cal-1', km: 105.7, split: '0:39:15', pace: '6:39' },
  { section: 'Cal-2', km: 113.8, split: '0:54:37', pace: '6:44' },
  { section: 'Cal-3', km: 117.5, split: '0:42:29', pace: '11:28' },
  { section: 'Rucky Chucky', km: 125.5, split: '0:45:15', pace: '5:39' },
  { section: 'Green Gate', km: 128.4, split: '0:25:45', pace: '8:52' },
  { section: 'Auburn Lake Trails', km: 137.1, split: '0:55:37', pace: '6:23' },
  { section: 'Quarry Road', km: 146.0, split: '0:56:06', pace: '6:18' },
  { section: 'Pointed Rocks', km: 151.8, split: '0:55:04', pace: '9:29' },
  { section: 'Robie Point', km: 159.2, split: '1:08:53', pace: '9:18' },
  { section: 'Finish', km: 163.4, split: '0:15:15', pace: '7:16' },
]

export function CoursePage() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null)
  const [expandedRoadbook, setExpandedRoadbook] = useState<number | null>(null)
  const [gpxData, setGpxData] = useState<GeoJSON.FeatureCollection | null>(null)
  const [elevationData, setElevationData] = useState<{ lat: number; lon: number; ele: number }[]>([])
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [selectedStation, setSelectedStation] = useState<SplitData | null>(null)
  const [hoveredStation, setHoveredStation] = useState<SplitData | null>(null)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  // Load GPX data
  useEffect(() => {
    parseGPX('/WSER2025.gpx').then(({ track, elevationData }) => {
      setGpxData(track)
      setElevationData(elevationData)
    }).catch(err => console.error('Error loading GPX:', err))
  }, [])

  return (
    <div className="space-y-12">
      {/* Hero with Interactive Map */}
      <header className="relative -mx-4 md:-mx-6 -mt-6">
        {/* Full-width Map */}
        <div className="relative h-[500px] md:h-[600px]">
          <WSERMap
            onSectionSelect={setSelectedSection}
            onAidStationSelect={setSelectedStation}
            onStationHover={setHoveredStation}
            onSectionHover={setHoveredSection}
            selectedSection={selectedSection}
            selectedStation={selectedStation}
            hoveredStation={hoveredStation}
            hoveredSection={hoveredSection}
            gpxData={gpxData}
          />
        </div>

        {/* Elevation Profile - synchronized with map */}
        {elevationData.length > 0 && (
          <div className="mt-4 px-4 md:px-6">
            <ElevationProfile
              elevationData={elevationData}
              selectedSection={selectedSection}
              selectedStation={selectedStation}
              hoveredStation={hoveredStation}
              hoveredSection={hoveredSection}
              onSectionSelect={setSelectedSection}
              onStationSelect={setSelectedStation}
              onStationHover={setHoveredStation}
              onSectionHover={setHoveredSection}
            />
          </div>
        )}

        {/* Station/Section Details Panel */}
        {(selectedStation || selectedSection) && (
          <div className="mt-4">
            {selectedStation ? (
              <SplitDetails
                station={selectedStation}
                onClose={() => setSelectedStation(null)}
              />
            ) : selectedSection ? (
              <SectionSummary
                sectionId={selectedSection}
                onClose={() => setSelectedSection(null)}
              />
            ) : null}
          </div>
        )}

        {/* Key stats below map */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          {[
            { value: '163.4', unit: 'km', label: 'Distance' },
            { value: '6004', unit: 'm', label: 'D+' },
            { value: '7536', unit: 'm', label: 'D-' },
            { value: '1.26', unit: '', label: 'Ratio D-/D+' },
          ].map((stat) => (
            <div key={stat.label} className="data-card p-3 text-center">
              <div className="flex items-baseline justify-center gap-0.5">
                <span className="font-display font-bold text-xl text-white">{stat.value}</span>
                {stat.unit && <span className="text-xs text-zinc-500">{stat.unit}</span>}
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Section 1: Vue d'ensemble */}
      <section>
        <SectionHeader kicker="Vue d'ensemble" title="L'insight clé" />

        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 mt-6">
          <p className="text-base-lg text-zinc-300 leading-relaxed">
            Plus de dénivelé négatif que positif. <strong className="text-orange-400">WSER est une course de DESCENTE déguisée en 100 miles.</strong>
          </p>
          <p className="text-sm text-zinc-400 mt-4">
            7536m de D- à absorber avec tes quads. C'est 1500m de plus que le D+. Cette asymétrie définit la course :
            ceux qui arrivent avec des quads fonctionnels à Foresthill (km 100) ont encore une course à faire.
            Ceux qui les ont détruits avant n'ont plus qu'à survivre.
          </p>
        </div>

        {/* Stats détaillées */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <h4 className="font-semibold text-zinc-200 mb-4">Stats principales</h4>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Distance', value: '163.4 km (101.4 miles)' },
                { label: 'D+', value: '6004 m' },
                { label: 'D-', value: '7536 m', highlight: true },
                { label: 'Ratio D-/D+', value: '1.26', highlight: true },
                { label: 'Altitude départ', value: '1943 m (Olympic Valley)' },
                { label: 'Point culminant', value: '2660 m (Emigrant Pass, km 5)' },
                { label: 'Altitude arrivée', value: '404 m (Auburn)' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-zinc-400">{item.label}</span>
                  <span className={item.highlight ? 'font-mono text-orange-400 font-semibold' : 'font-mono text-zinc-200'}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <h4 className="font-semibold text-zinc-200 mb-4">Répartition terrain</h4>

            {/* Visual bar */}
            <div className="flex h-4 rounded-full overflow-hidden mb-4">
              <div className="w-[29%] bg-blue-500" />
              <div className="w-[29%] bg-zinc-600" />
              <div className="w-[42%] bg-linear-to-r from-orange-500 to-orange-600" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded bg-blue-500" />
                  <span className="font-display font-bold text-xl text-white">29%</span>
                </div>
                <div className="text-sm text-zinc-400">Montée ↑</div>
                <div className="text-xs text-zinc-600">47 km</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded bg-zinc-600" />
                  <span className="font-display font-bold text-xl text-white">29%</span>
                </div>
                <div className="text-sm text-zinc-400">Plat →</div>
                <div className="text-xs text-zinc-600">46 km</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded bg-orange-500" />
                  <span className="font-display font-bold text-xl text-orange-400">42%</span>
                </div>
                <div className="text-sm text-zinc-400">Descente ↓</div>
                <div className="text-xs text-zinc-600">68 km</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-zinc-800">
              <div className="text-center">
                <span className="text-xs text-zinc-500">Pente moyenne montées</span>
                <div className="font-mono text-blue-400">+9.2%</div>
              </div>
              <div className="text-center">
                <span className="text-xs text-zinc-500">Pente moyenne descentes</span>
                <div className="font-mono text-orange-400">-8.6%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pace Calculator */}
        <div className="mt-6">
          <PaceCalculator />
        </div>
      </section>

      {/* Section 2: Les 4 grandes sections */}
      <section>
        <SectionHeader kicker="Anatomie" title="Les 4 grandes sections" />

        <div className="space-y-4 mt-6">
          {/* HIGH COUNTRY */}
          <SectionCard
            num="01"
            name="HIGH COUNTRY"
            km="0-50 km"
            color="blue"
            stats={{ distance: '50 km', dPlus: '2252 m', dMinus: '2135 m', altMin: '1665 m', altMax: '2660 m', net: '+116 m' }}
            caractere="Altitude 1900m → 2650m → 1500m. Grosse montée initiale vers Emigrant Pass (2650m), puis descente progressive vers les canyons. L'altitude (2000-2650m) réduit ta capacité aérobie de 10-15%. C'est une section qui paraît 'facile' — c'est un piège."
            defi="L'euphorie du départ combinée à l'altitude crée une tentation massive de partir trop vite. Chaque minute gagnée ici coûte 2-3 minutes dans les canyons. Les données montrent un fade moyen de +12% chez les coureurs qui partent trop vite dans le High Country."
            strategie="Économie absolue. Powerhike la montée initiale. Au sommet d'Emigrant Pass, tu dois pouvoir dire 'je pourrais refaire cette montée' — si non, tu es trop vite. Run easy les plats, run agressif les descentes, hike tous les ups."
            points={[
              'Emigrant Pass km 5-6 : point culminant (2660m)',
              'Lyon Ridge km 17 : première vraie descente',
              'Duncan Canyon km 39 : descente technique vers le creek',
              'Robinson Flat km 49 : premier cutoff (10h30), gros ravito crew',
            ]}
            expanded={expandedSection === 0}
            onToggle={() => setExpandedSection(expandedSection === 0 ? null : 0)}
          />

          {/* CANYONS */}
          <SectionCard
            num="02"
            name="THE CANYONS"
            km="50-100 km"
            color="orange"
            stats={{ distance: '50 km', dPlus: '1878 m', dMinus: '2847 m', altMin: '552 m', altMax: '2134 m', net: '-972 m' }}
            caractere="Le cœur de la course. Montées/descentes brutales dans les canyons. Chaleur maximale (35-45°C) entre 12h et 18h. Après le Mosquito Fire 2022, ~20 miles sont sans ombre. L'exposition solaire est totale."
            defi="Conflit de ressources : ton corps doit alimenter les muscles ET évacuer la chaleur. Le flux sanguin intestinal chute de 50-80% — c'est là que la nutrition devient critique et difficile. Devil's Thumb (36 lacets, +18% de pente moyenne) est LA montée la plus raide du parcours. El Dorado Creek est généralement le point le plus chaud (38-42°C affiché à l'AS)."
            strategie="CHALEUR = priorité #1. Cooling agressif à chaque ravito (glace casquette, nuque, mains). Économiser les quads pour après Foresthill. Mantra : 'Survive the canyons, race from Foresthill.'"
            points={[
              "Devil's Thumb km 77 : 36 lacets, +18% moyenne — full powerhike",
              'El Dorado km 85 : fond de canyon, point le plus chaud',
              'Michigan Bluff km 90 : cutoff 17h, dernier gros ravito avant Foresthill',
              'Foresthill km 100 : MI-COURSE, cutoff 19h20, changement équipement possible',
            ]}
            expanded={expandedSection === 1}
            onToggle={() => setExpandedSection(expandedSection === 1 ? null : 1)}
          />

          {/* CALIFORNIA LOOP */}
          <SectionCard
            num="03"
            name="CALIFORNIA LOOP"
            km="100-128 km"
            color="emerald"
            stats={{ distance: '28 km', dPlus: '808 m', dMinus: '1448 m', altMin: '217 m', altMax: '1038 m', net: '-642 m' }}
            caractere="Foresthill → Rucky Chucky. 28 km de descente quasi-continue vers la rivière (236m d'altitude). C'est là que la course se gagne ou se perd. 'The race starts here.'"
            defi="Tu as déjà 4500m de D- dans les jambes. Le Repeated Bout Effect (ou son absence) devient visible : ceux qui ont entraîné leurs quads 'float' les descentes, ceux qui ne l'ont pas fait marchent. Les 'rollers' (petites bosses entre les Cal) cassent le rythme — tout le monde pense 'tout en descente' mais les montées de 5-10min à +17% font mal."
            strategie="Si tes quads tiennent, tu dépasses. Si non, tu subis. C'est le 'crux de la course' (AJW) : si tu laisses exploser les quads ici, tu ne courras plus les 20 derniers miles. Descendre vite mais CONTRÔLÉ."
            points={[
              'Cal-1 à Cal-3 : descente technique single track, "elevator shaft" à -20%',
              'Rucky Chucky km 125 : traversée American River (cordes + personnel sécurité)',
            ]}
            expanded={expandedSection === 2}
            onToggle={() => setExpandedSection(expandedSection === 2 ? null : 2)}
          />

          {/* FINAL PUSH */}
          <SectionCard
            num="04"
            name="FINAL PUSH"
            km="128-161 km"
            color="cyan"
            stats={{ distance: '33 km', dPlus: '1176 m', dMinus: '1103 m', altMin: '184 m', altMax: '487 m', net: '+70 m' }}
            caractere="Green Gate → Auburn. Terrain plus roulant, dernières montées/descentes. Souvent couru de nuit (réflecteurs sur les 38 derniers miles)."
            defi="Fatigue terminale. Chaque petite montée paraît énorme. La tentation de marcher des sections 'courables' est maximale. Fatigue décisionnelle : après 16h+ d'effort, le cerveau cherche des excuses pour s'arrêter."
            strategie="Tout donner. Relancer chaque descente. Marcher les montées mais AGRESSIVEMENT. Mantra : 'Si ce tronçon était un entraînement de 20 km, je le courrais 100%' — donc courir tout ce qui n'est pas clairement une montée raide."
            points={[
              'Auburn Lake Trails km 137 : cutoff 23h, dernier gros ravito',
              'Robie Point km 159 : dernière montée (+9% sur 1.3 miles)',
              'Finish km 161 : Placer High School track',
            ]}
            expanded={expandedSection === 3}
            onToggle={() => setExpandedSection(expandedSection === 3 ? null : 3)}
          />
        </div>
      </section>

      {/* Pull Quote */}
      <section className="max-w-2xl mx-auto py-4">
        <blockquote className="pull-quote">
          À Western States, tu ne gagnes pas des places en montée. Tu les gagnes en ne les perdant pas en descente.
        </blockquote>
        <p className="text-zinc-600 text-sm mt-4 pl-6">— Jeff Browning, vainqueur 2019</p>
      </section>

      {/* Section 3: Les 23 ravitaillements */}
      <section>
        <SectionHeader kicker="Ravitaillements" title="Les 23 postes" />

        <div className="overflow-x-auto mt-6">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-2 font-semibold text-zinc-400">#</th>
                <th className="text-left py-3 px-2 font-semibold text-zinc-400">Ravito</th>
                <th className="text-left py-3 px-2 font-semibold text-zinc-400">Km</th>
                <th className="text-left py-3 px-2 font-semibold text-zinc-400 hidden sm:table-cell">Alt.</th>
                <th className="text-left py-3 px-2 font-semibold text-zinc-400">Cutoff</th>
                <th className="text-left py-3 px-2 font-semibold text-zinc-400">Sub-20h</th>
                <th className="text-left py-3 px-2 font-semibold text-zinc-400 hidden lg:table-cell">Services</th>
              </tr>
            </thead>
            <tbody>
              {aidStations.map((station) => (
                <tr
                  key={station.num}
                  className={`border-b border-zinc-800/50 hover:bg-zinc-800/20 ${
                    station.crew ? 'bg-orange-500/5' : ''
                  }`}
                >
                  <td className="py-3 px-2 font-mono text-zinc-500">{station.num}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      {station.crew && <Users className="w-3 h-3 text-orange-400" />}
                      <span className={station.crew ? 'font-semibold text-orange-400' : 'text-zinc-200'}>
                        {station.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2 font-mono text-zinc-300">{station.km}</td>
                  <td className="py-3 px-2 font-mono text-zinc-500 hidden sm:table-cell">{station.alt}m</td>
                  <td className="py-3 px-2">
                    {station.cutoff !== '—' ? (
                      <span className="font-mono text-red-400 font-semibold">{station.cutoff}</span>
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="py-3 px-2 font-mono text-emerald-400">{station.sub20}</td>
                  <td className="py-3 px-2 text-zinc-500 text-xs hidden lg:table-cell">{station.services}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Postes avec crew */}
        <div className="mt-6">
          <h4 className="font-semibold text-zinc-200 mb-4">Postes avec crew</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Robinson Flat', mile: '30.3', km: '48.8', desc: 'Premier cutoff. Drop bag. Crew possible. Dernier ravito avant les canyons.' },
              { name: 'Michigan Bluff', mile: '55.7', km: '89.7', desc: 'Cutoff 17h. Après 2 canyons. Médical complet. Moment pour corriger les dégâts.' },
              { name: 'Foresthill', mile: '62', km: '99.8', desc: 'MI-COURSE. Cutoff 19h20. Changement équipement complet. Pacer autorisé à partir d\'ici.' },
              { name: 'Rucky Chucky', mile: '78', km: '125.5', desc: 'Après traversée rivière. Drop bag. Frontale obligatoire si nuit.' },
              { name: 'Auburn Lake Trails', mile: '85.2', km: '137.1', desc: 'Cutoff 23h. Dernier gros ravito. Soupe disponible.' },
            ].map((post) => (
              <div key={post.name} className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-orange-400" />
                  <h5 className="font-semibold text-orange-400">{post.name}</h5>
                </div>
                <div className="text-xs text-zinc-500 mb-2">Mile {post.mile} · km {post.km}</div>
                <p className="text-sm text-zinc-400">{post.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Splits des finishers */}
      <section>
        <SectionHeader kicker="Analyse" title="Splits des finishers sub-20h30" />

        {/* Les 5 coureurs */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Coureur</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Temps</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300 hidden sm:table-cell">Particularité</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Jeff Browning', time: '19:12:58', note: 'Référence pacing' },
                { name: 'Johanna Antila', time: '19:13:16', note: 'Femme, quasi-identique' },
                { name: 'Jeremie Marcuccilli', time: '19:47:24', note: 'Français, bon push final' },
                { name: 'Chris Roberts', time: '20:05:51', note: 'Gestion conservative' },
                { name: 'Nancy Jiang', time: '20:17:24', note: 'Femme, régulière' },
              ].map((runner, i) => (
                <tr key={runner.name} className={`border-b border-zinc-800/50 ${i === 0 ? 'bg-orange-500/5' : ''}`}>
                  <td className="py-3 px-4 font-semibold text-zinc-200">{runner.name}</td>
                  <td className="py-3 px-4 font-mono text-orange-400">{runner.time}</td>
                  <td className="py-3 px-4 text-zinc-400 hidden sm:table-cell">{runner.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Jeff Browning splits */}
        <div className="mt-6">
          <h4 className="font-semibold text-zinc-200 mb-4">Splits complets — Jeff Browning (19:12:58)</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">Section</th>
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">Km</th>
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">Split</th>
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">Pace/km</th>
                </tr>
              </thead>
              <tbody>
                {browninSplits.map((split) => (
                  <tr key={split.section} className={`border-b border-zinc-800/50 ${split.highlight ? 'bg-orange-500/5' : ''}`}>
                    <td className={`py-2 px-3 ${split.highlight ? 'font-semibold text-orange-400' : 'text-zinc-200'}`}>
                      {split.section}
                    </td>
                    <td className="py-2 px-3 font-mono text-zinc-400">{split.km}</td>
                    <td className="py-2 px-3 font-mono text-zinc-300">{split.split}</td>
                    <td className="py-2 px-3 font-mono text-cyan-400">{split.pace}</td>
                  </tr>
                ))}
                <tr className="border-t border-zinc-600 bg-orange-500/10">
                  <td className="py-3 px-3 font-semibold text-orange-400">TOTAL</td>
                  <td className="py-3 px-3 font-mono text-zinc-200">161.3</td>
                  <td className="py-3 px-3 font-mono text-orange-400 font-semibold">19:12:58</td>
                  <td className="py-3 px-3 font-mono text-orange-400 font-semibold">7:08</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Patterns identifiés */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <h4 className="font-semibold text-zinc-200 mb-4">1. Économie en montée</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Escarpment (grosse montée)</span>
                <span className="font-mono text-blue-400">7:06 - 7:52/km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Devil's Thumb (36 lacets)</span>
                <span className="font-mono text-blue-400">8:50 - 9:33/km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Michigan Bluff climb</span>
                <span className="font-mono text-blue-400">10:07 - 13:38/km</span>
              </div>
            </div>
            <p className="text-sm text-zinc-500 mt-3 italic">Ils marchent les grosses montées. Pas de héros.</p>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <h4 className="font-semibold text-zinc-200 mb-4">2. Descentes contrôlées pré-Foresthill</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Duncan Canyon</span>
                <span className="font-mono text-emerald-400">5:25 - 6:03/km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">El Dorado descente</span>
                <span className="font-mono text-emerald-400">6:01 - 7:12/km</span>
              </div>
            </div>
            <p className="text-sm text-zinc-500 mt-3 italic">Vite mais pas explosif. Économie des quads.</p>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <h4 className="font-semibold text-zinc-200 mb-4">3. Maintien post-Foresthill</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Cal-1</span>
                <span className="font-mono text-orange-400">5:42 - 7:59/km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Auburn Lake Trails</span>
                <span className="font-mono text-orange-400">6:23 - 8:37/km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Quarry Road</span>
                <span className="font-mono text-orange-400">6:18 - 8:04/km</span>
              </div>
            </div>
            <p className="text-sm text-zinc-500 mt-3 italic">Tous maintiennent un pace "running" même après 130km.</p>
          </div>

          <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6">
            <h4 className="font-semibold text-orange-400 mb-4">4. Ratio 2e moitié / 1re moitié</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left py-2 font-semibold text-zinc-400">Coureur</th>
                    <th className="text-left py-2 font-semibold text-zinc-400">1re</th>
                    <th className="text-left py-2 font-semibold text-zinc-400">2e</th>
                    <th className="text-left py-2 font-semibold text-zinc-400">Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Jeff', first: '11:34', second: '7:39', ratio: '66%' },
                    { name: 'Johanna', first: '11:11', second: '8:02', ratio: '72%' },
                    { name: 'Jeremie', first: '11:47', second: '8:00', ratio: '68%' },
                    { name: 'Chris', first: '12:26', second: '7:40', ratio: '62%' },
                    { name: 'Nancy', first: '12:04', second: '8:13', ratio: '68%' },
                  ].map((r) => (
                    <tr key={r.name} className="border-b border-zinc-800/50">
                      <td className="py-2 text-zinc-200">{r.name}</td>
                      <td className="py-2 font-mono text-zinc-400">{r.first}</td>
                      <td className="py-2 font-mono text-zinc-400">{r.second}</td>
                      <td className="py-2 font-mono text-orange-400">{r.ratio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-orange-300 mt-3 font-semibold">Cible : 2e moitié ≤ 70% de la 1re moitié</p>
          </div>
        </div>
      </section>

      {/* Section 5: Roadbook détaillé */}
      <section>
        <SectionHeader kicker="Roadbook" title="Les 10 tronçons — Détail complet" />

        <div className="space-y-4 mt-6">
          {[
            {
              num: 1,
              name: 'Départ → Lyon Ridge',
              km: '0-16.6 km',
              terrain: 'Montée directe 1890m → 2670m en 6km (+13-14% moyenne). Pistes de ski raides au début, puis single étroit, rocheux en haut. Après le sommet : crête roulante, alternance run/hike. Descentes parfois -10% à -20%.',
              risques: "Euphorie du départ → tentation de courir la montée. Altitude + effort = lactate et souffle court plus vite que d'habitude. En année enneigée, appuis instables.",
              mental: "Au sommet : 'Je pourrais refaire la montée' → si non, tu es trop vite. Stratégie AJW : dès 800m de course, passer en powerhike fort.",
              nutrition: "Froid relatif, digestion facile → bon moment pour manger tôt (solide/liquide). Remplir suffisamment avant la crête. Ne PAS profiter du 'estomac frais' pour front-loader.",
            },
            {
              num: 2,
              name: 'Lyon Ridge → Duncan Canyon',
              km: '16.6-39.3 km',
              terrain: 'Crêtes boisées, enchaînement de petits coups de cul (7-15%). Descentes parfois longues -7% à -11%. Longue descente soutenue vers Duncan Creek.',
              risques: "Terrain moins spectaculaire mais usure insidieuse. Première vraie sensation de chaleur en approchant Duncan (zone brûlée depuis 2001).",
              mental: "Mantra AJW : run easy les plats, run agressif les downs, hike les ups. Objectif : sortir de Duncan en se disant 'c'est facile'.",
              nutrition: "Continuer à manger régulièrement. À Duncan : première lecture réelle de la chaleur. Se mouiller, remplir à fond avant la longue montée vers Robinson.",
            },
            {
              num: 3,
              name: 'Duncan Canyon → Robinson Flat',
              km: '39.3-48.8 km',
              terrain: '4km de descente vers le creek. 6km de montée constante vers Robinson (8-12% moyenne). Souvent non courable sauf derniers 2km.',
              risques: "Première vraie alerte chaleur possible au fond de Duncan Creek. Très tentant de courir trop de la montée.",
              mental: "Accepter de 'donner du temps' sur cette montée pour le récupérer dans les canyons. AJW dit qu'il 'se laissait passer' ici pour repasser ces gens plus tard.",
              nutrition: "Se doucher dans le creek, mouiller casquette/buff. Arriver à Robinson en ayant bien mangé/bu, pas en mode survie. Robinson = gros point crew + médical.",
            },
            {
              num: 4,
              name: 'Robinson Flat → Last Chance',
              km: '48.8-69.7 km',
              terrain: "Courte montée vers Little Bald Mountain. Très longue descente roulante vers Miller's puis Dusty (jusqu'à 5km à -6%). Alternance single + anciens chemins de mine, poussiéreux. Très exposé sur versant sud.",
              risques: "C'est ici que tu sens vraiment la chaleur du versant sud. Grosse descente continue = début du travail destructeur sur les quads.",
              mental: "Période 'gratuitement rapide' → mais ne pas chercher des PR descente. Objectif : arriver à Last Chance FRAIS + BIEN HYDRATÉ. Les canyons commencent juste après.",
              nutrition: "À Dusty : prendre une minute pour éponge/rafraîchir. Bien remplir : 4 miles jusqu'à Devil's Thumb, souvent >1h dans un four.",
            },
            {
              num: 5,
              name: 'Last Chance → Michigan Bluff',
              km: '69.7-89.7 km — LES CANYONS',
              terrain: "Last Chance → fond Deadwood : 2.5km à -17% moyenne. Swinging bridge → Devil's Thumb : 36 lacets, 2.5km à +18% moyenne. Devil's Thumb → El Dorado Creek : 8km de descente. El Dorado Creek → Michigan Bluff : 2.5km à +15% puis +10% exposé.",
              risques: "SECTION LA PLUS CHAUDE de la course (38-42°C au fond d'El Dorado). C'est là que les quads explosent si tu as trop envoyé. Ombre de plus en plus rare depuis Mosquito Fire.",
              mental: "Deadwood : descendre avec contrôle. Devil's Thumb : accepter la souffrance, rythme de randonneur alpin, ne jamais s'arrêter. El Dorado climb : découper en fractions.",
              nutrition: "Last Chance : remplir à ras bord + glace partout. Swinging bridge : source potable → remplir + s'immerger avant la montée. El Dorado AS : point le plus chaud → se rafraîchir, recharger vite, sortir. Michigan Bluff : checkpoint médical + crew.",
            },
            {
              num: 6,
              name: 'Michigan Bluff → Foresthill',
              km: '89.7-99.8 km',
              terrain: "Sortie de Michigan sur piste. Descente vers Volcano Canyon, remontée progressive. Bath Road (pavée, raide). Foresthill Road en légère descente vers AS. Montées 8-14% mais plus courtes que les canyons.",
              risques: "Tu as déjà deux canyons dans les jambes → fatigabilité mentale élevée. Encore du soleil direct sur Volcano Canyon (Mosquito Fire a supprimé l'ombre).",
              mental: "Traiter Volcano Canyon comme trois morceaux distincts (piste, single dans le creux, Bath Road). Objectif : arriver à Foresthill en état de 'reset' mental. Nouvelle course commence ici.",
              nutrition: "Au creek de Volcano : se doucher, recharger refroidissement. Bath Road : marcher/courir alterné. Foresthill : gros centre logistique → Changer chaussures si besoin, manger chaud, repartir avec frontale même si tu penses passer de jour.",
            },
            {
              num: 7,
              name: 'Foresthill → Rucky Chucky',
              km: '99.8-125.5 km — CAL STREET',
              terrain: "Grande descente continue vers Cal-1 (5km à -11%). 'Rollers' : une quinzaine de petites bosses (dont 'red roller' et 'elevator shaft' à -20%). Cal-2 → Cal-3 → Rucky : descente soutenue -10/-13% + petites montées +17%.",
              risques: "Section PIÈGE classique : tout le monde pense 'tout en descente'. En fait, les montées cassent le rythme. C'est le 'crux de la course' : si tu laisses exploser les quads ici, tu ne courras plus les 20 derniers miles.",
              mental: "Mantra AJW : 'all downhill, except for the uphill parts'. Planifier mentalement les rollers, les compter. Ne pas se laisser tromper par le bruit de la rivière : encore plusieurs bosses avant le crossing.",
              nutrition: "Cal Street peut encore être très chaude. Continuer à avaler des glucides : c'est le moment classique où les gens arrêtent de manger, tu dois faire l'inverse. Rucky Chucky : profiter du refroidissement dans la rivière, mais ne pas traîner.",
            },
            {
              num: 8,
              name: 'Rucky Chucky → Auburn Lake Trails',
              km: '125.5-137.1 km',
              terrain: "Traversée rivière puis montée Green Gate (1.5km à +9%). Terrain globalement roulable : singletrack avec petits coups de cul (7-8%). Souvent parcouru de nuit.",
              risques: "Fatigue profonde, chaque petite montée paraît énorme. Navigation mentale plus dure de nuit (balisage réfléchissant).",
              mental: "Segment à aborder comme un semi-marathon trail de nuit. Objectif : courir tout ce qui n'est pas manifestement une montée raide.",
              nutrition: "Chaleur commence à tomber, digestion redevient plus facile. Bon moment pour solidifier l'apport glucides (si tu as réduit dans les canyons). Auburn Lake Trails = gros AS avec soupe, solide, médical.",
            },
            {
              num: 9,
              name: 'Auburn Lake Trails → Pointed Rocks',
              km: '137.1-151.8 km',
              terrain: "Quarry Road : 2.5km de piste le long de la rivière, plat/descendant. 2.5km de montée vers Hwy 49 (+8% moyenne). Hwy 49 → Pointed Rocks : encore montée puis terrain plus doux. Pointed Rocks → No Hands : 4.5km de descente douce.",
              risques: "Fatigue terminale, douleurs articulaires et musculaires maximales. Très facile de s'autoriser trop de marche sur les portions roulantes.",
              mental: "'Si ce tronçon était un entraînement de 20 km, je le courrais 100%'. À Hwy 49, odeur d'écurie : prendre cette montée comme le dernier gros investissement.",
              nutrition: "Souvent plus frais, mais ne pas arrêter les apports glucidiques. Beaucoup de DNFs viennent d'un arrêt prématuré de la nutrition ici. Pointed Rocks = dernière vraie AS pour se remettre.",
            },
            {
              num: 10,
              name: 'No Hands Bridge → Finish',
              km: '155.3-161.3 km',
              terrain: "No Hands → Robie : 1 mile de montée progressive, puis +9-10% sur 2km. Robie → Placer : petite bosse goudronnée puis descente vers le stade. Arrivée : Placer High School track.",
              risques: "Tout fait mal, mais c'est COURT. Possible refroidissement nocturne si arrivée proche golden hour.",
              mental: "No Hands : courir tout ce qui est plat/descendant jusqu'à la vraie montée. Robie : accepter la grosse bosse route comme tout dernier test. Derniers 400m sur la piste : savourer.",
              nutrition: "Plus question de stratégie fine : gel/boisson sucrée ok. Ne rien tester de nouveau. Gérer la thermorégulation si arrivée chaude ou se couvrir si nuit fraîche.",
            },
          ].map((troncon, idx) => (
            <div key={troncon.num} className="rounded-xl border border-zinc-700 bg-zinc-900/30 overflow-hidden">
              <button
                onClick={() => setExpandedRoadbook(expandedRoadbook === idx ? null : idx)}
                className="w-full p-5 text-left flex items-start gap-4 cursor-pointer hover:bg-zinc-800/20"
              >
                <span className={`font-display text-3xl font-bold ${
                  troncon.num === 5 ? 'text-red-500' :
                  troncon.num === 7 ? 'text-orange-500' :
                  'text-zinc-700'
                }`}>{String(troncon.num).padStart(2, '0')}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">{troncon.name}</h3>
                      <span className="text-sm text-zinc-400">{troncon.km}</span>
                    </div>
                    {expandedRoadbook === idx ? (
                      <ChevronUp className="w-5 h-5 text-zinc-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-500" />
                    )}
                  </div>
                </div>
              </button>

              {expandedRoadbook === idx && (
                <div className="px-5 pb-5 pt-0">
                  <div className="ml-12 border-t border-zinc-800 pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-cyan-400 text-sm mb-2">Terrain & profil</h4>
                      <p className="text-sm text-zinc-400">{troncon.terrain}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-400 text-sm mb-2">Risques & sensations</h4>
                      <p className="text-sm text-zinc-400">{troncon.risques}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-400 text-sm mb-2">Focus mental</h4>
                      <p className="text-sm text-zinc-400">{troncon.mental}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-400 text-sm mb-2">Stratégie nutrition/chaleur</h4>
                      <p className="text-sm text-zinc-400">{troncon.nutrition}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: La formule sub-20h */}
      <section>
        <SectionHeader kicker="La formule" title="Les 5 principes sub-20h" />

        <div className="space-y-6 mt-6">
          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">1</span>
              <h3 className="font-semibold text-zinc-100">Économie absolue dans le High Country</h3>
            </div>
            <p className="text-sm text-zinc-400">
              Les 5 finishers sub-20h passent Escarpment entre 7:06 et 7:52/km. Aucun ne "court" la montée initiale.
            </p>
            <p className="text-sm text-blue-400 mt-2 font-semibold">
              Cible : 7:30-8:00/km sur les grosses montées High Country.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">2</span>
              <h3 className="font-semibold text-zinc-100">Survie dans les canyons, pas performance</h3>
            </div>
            <p className="text-sm text-zinc-400">
              Les splits canyons (Devil's Thumb, El Dorado) sont les plus lents : 8:50-13:38/km.
            </p>
            <p className="text-sm text-red-400 mt-2 font-semibold">
              La priorité est le cooling et la préservation des quads, pas le chrono.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">3</span>
              <h3 className="font-semibold text-zinc-100">Maintien actif post-Foresthill</h3>
            </div>
            <p className="text-sm text-zinc-400">
              Tous les 5 finishers maintiennent un pace "running" (6:00-8:30/km) sur Cal Street et après.
            </p>
            <p className="text-sm text-orange-400 mt-2 font-semibold">
              La différence avec un 24h : à ce stade, les 24h marchent les descentes.
            </p>
          </div>

          <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">4</span>
              <h3 className="font-semibold text-orange-100">Ratio 2e moitié ≤ 70%</h3>
            </div>
            <p className="text-sm text-zinc-400">
              La 2e moitié (Foresthill→Auburn) doit être ≤70% du temps de la 1re moitié.
            </p>
            <p className="text-sm text-orange-300 mt-2 font-semibold">
              Calcul en course : à Foresthill, multiplier ton temps par 1.70. C'est ton arrivée estimée.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">5</span>
              <h3 className="font-semibold text-zinc-100">Nutrition non-stop</h3>
            </div>
            <p className="text-sm text-zinc-400">
              Tous les 5 continuent à manger jusqu'au finish. Pas d'arrêt nutrition après Foresthill.
            </p>
            <p className="text-sm text-emerald-400 mt-2 font-semibold">
              Le moment classique où les gens arrêtent de manger = le moment où il faut continuer.
            </p>
          </div>
        </div>

        {/* Tableau monitoring */}
        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 mt-6">
          <h4 className="font-semibold text-orange-400 mb-4">Comment monitorer en course</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">Checkpoint</th>
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">Temps cible</th>
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">Marge</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { checkpoint: 'Robinson Flat (48.8 km)', target: '5:30-6:00', margin: '+30min' },
                  { checkpoint: 'Michigan Bluff (89.7 km)', target: '10:15-10:45', margin: '+15min' },
                  { checkpoint: 'Foresthill (99.8 km)', target: '11:30-12:00', margin: '—' },
                  { checkpoint: 'Rucky Chucky (125.5 km)', target: '14:30-15:00', margin: '—' },
                  { checkpoint: 'Auburn Lake Trails (137.1 km)', target: '16:00-16:30', margin: '—' },
                  { checkpoint: 'Finish', target: '19:30-20:00', margin: '—' },
                ].map((row) => (
                  <tr key={row.checkpoint} className="border-b border-zinc-800/50">
                    <td className="py-2 px-3 text-zinc-200">{row.checkpoint}</td>
                    <td className="py-2 px-3 font-mono text-orange-400">{row.target}</td>
                    <td className="py-2 px-3 text-zinc-500">{row.margin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Les 3 défis */}
      <section>
        <SectionHeader kicker="Les défis" title="Ce qui rend WSER unique" />

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="data-card border-orange-500/30 p-5">
            <Thermometer className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="font-display font-bold text-lg text-orange-400 mb-2">Chaleur extrême</h3>
            <p className="text-sm text-zinc-400 mb-3">
              35-45°C dans les canyons entre km 50-100. La température arrive exactement quand la fatigue s'accumule.
            </p>
            <div className="text-xs text-zinc-600">
              L'acclimatation chaleur est le facteur #1 de succès.
            </div>
          </div>

          <div className="data-card border-blue-500/30 p-5">
            <TrendingDown className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="font-display font-bold text-lg text-blue-400 mb-2">7536m de D-</h3>
            <p className="text-sm text-zinc-400 mb-3">
              Plus de D- que de D+. Les quadriceps encaissent des milliers de contractions excentriques sur terrain roulant.
            </p>
            <div className="text-xs text-zinc-600">
              Sans RBE, la fin devient un calvaire.
            </div>
          </div>

          <div className="data-card border-cyan-500/30 p-5">
            <Zap className="w-8 h-8 text-cyan-500 mb-4" />
            <h3 className="font-display font-bold text-lg text-cyan-400 mb-2">20h de nutrition</h3>
            <p className="text-sm text-zinc-400 mb-3">
              80-110g CHO/h pendant 20h. L'intestin est entraînable — mais ça se construit sur 3-4 mois.
            </p>
            <div className="text-xs text-zinc-600">
              Gut training systématique requis.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <p className="kicker">{kicker}</p>
      <h2 className="headline-lg">{title}</h2>
    </div>
  )
}

interface SectionCardProps {
  num: string
  name: string
  km: string
  color: 'blue' | 'orange' | 'emerald' | 'cyan'
  stats: { distance: string; dPlus: string; dMinus: string; altMin: string; altMax: string; net: string }
  caractere: string
  defi: string
  strategie: string
  points: string[]
  expanded: boolean
  onToggle: () => void
}

function SectionCard({ num, name, km, color, stats, caractere, defi, strategie, points, expanded, onToggle }: SectionCardProps) {
  const colorClasses = {
    blue: { border: 'border-l-blue-500', text: 'text-blue-400', bg: 'bg-blue-500' },
    orange: { border: 'border-l-orange-500', text: 'text-orange-400', bg: 'bg-orange-500' },
    emerald: { border: 'border-l-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500' },
    cyan: { border: 'border-l-cyan-500', text: 'text-cyan-400', bg: 'bg-cyan-500' },
  }

  return (
    <div className={`data-card overflow-hidden border-l-4 ${colorClasses[color].border}`}>
      <button
        onClick={onToggle}
        className="w-full p-5 text-left flex items-start gap-4 cursor-pointer"
      >
        <span className="font-display text-4xl font-bold text-zinc-800">{num}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-white">{name}</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className={`text-sm ${colorClasses[color].text}`}>{km}</span>
              </div>
            </div>
            {expanded ? (
              <ChevronUp className="w-5 h-5 text-zinc-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-zinc-500" />
            )}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 pt-0">
          <div className="ml-14 border-t border-zinc-800 pt-4 space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
              {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="p-2 bg-zinc-800/30 rounded text-center">
                  <div className="text-zinc-500 mb-1">{key === 'dPlus' ? 'D+' : key === 'dMinus' ? 'D-' : key === 'altMin' ? 'Alt min' : key === 'altMax' ? 'Alt max' : key}</div>
                  <div className="font-mono text-zinc-200">{value}</div>
                </div>
              ))}
            </div>

            {/* Caractère */}
            <div>
              <h4 className="font-semibold text-zinc-200 text-sm mb-2">Caractère</h4>
              <p className="text-sm text-zinc-400">{caractere}</p>
            </div>

            {/* Défi */}
            <div>
              <h4 className="font-semibold text-red-400 text-sm mb-2">Défi physiologique</h4>
              <p className="text-sm text-zinc-400">{defi}</p>
            </div>

            {/* Stratégie */}
            <div>
              <h4 className={`font-semibold ${colorClasses[color].text} text-sm mb-2`}>Stratégie</h4>
              <p className="text-sm text-zinc-400">{strategie}</p>
            </div>

            {/* Points clés */}
            <ul className="space-y-1">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-zinc-400">
                  <span className={`w-1.5 h-1.5 rounded-full ${colorClasses[color].bg}`} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
