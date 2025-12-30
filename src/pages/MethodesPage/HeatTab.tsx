import { memo } from 'react'
import { SectionHeader } from '../../components/shared'

function HeatTabComponent() {
  return (
    <div className="space-y-12">
      {/* Intro */}
      <section>
        <h2 className="headline-lg">Acclimatation chaleur pour les canyons a 40C</h2>
        <div className="w-12 h-1 bg-linear-to-r from-orange-500 to-orange-600 rounded mt-3" />
      </section>

      {/* Le probleme */}
      <section>
        <SectionHeader kicker="Le contexte" title="Les canyons de WSER" />

        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6 mt-6">
          <p className="text-zinc-300 leading-relaxed">
            Les canyons de WSER (km 50-100) atteignent <strong className="text-red-400">35-45C</strong>.
            C'est la que la course se gagne ou se perd.
          </p>
          <p className="text-sm text-zinc-400 mt-3">
            Apres le Mosquito Fire 2022, ~20 miles sont totalement sans ombre. L'exposition solaire est maximale.
            El Dorado Creek a Devil's Thumb est decrit comme "usually the hottest point on the course".
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 mt-6">
          <h4 className="font-semibold text-zinc-300 mb-4">Ce qui se passe physiologiquement</h4>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            En chaleur extreme, ton corps fait face a un conflit de ressources :
          </p>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li className="flex gap-2"><span className="text-orange-400">*</span> Les muscles ont besoin de sang pour l'oxygene</li>
            <li className="flex gap-2"><span className="text-orange-400">*</span> La peau a besoin de sang pour evacuer la chaleur</li>
            <li className="flex gap-2"><span className="text-orange-400">*</span> L'intestin a besoin de sang pour absorber les nutriments</li>
          </ul>
          <p className="text-sm text-zinc-400 mt-4">
            Quand la temperature monte, ton corps priorise la thermoregulation. Le flux sanguin cutane peut
            augmenter de 5-8 L/min. Ce sang est "vole" aux muscles et a l'intestin.
          </p>
        </div>

        {/* Tableau comparatif */}
        <h3 className="headline-lg text-lg mt-10">La difference acclimate vs non-acclimate</h3>

        <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Parametre</th>
                <th className="text-left py-3 px-4 font-medium text-red-400">Non-acclimate</th>
                <th className="text-left py-3 px-4 font-medium text-emerald-400">Acclimate</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Gain</th>
              </tr>
            </thead>
            <tbody>
              {[
                { param: 'FC a effort donne', nonAccl: 'Reference', accl: '-10 a -15 bpm', gain: 'Reserve cardiaque' },
                { param: 'Debut sudation', nonAccl: 'Retarde', accl: 'Plus precoce', gain: 'Refroidissement anticipe' },
                { param: 'Volume sudation', nonAccl: 'Reference', accl: '+20-30%', gain: 'Evacuation chaleur' },
                { param: 'Concentration sueur', nonAccl: 'Elevee (sel)', accl: '-30-40%', gain: 'Conservation electrolytes' },
                { param: 'Core temp max toleree', nonAccl: '~39C', accl: '39.5-40C', gain: 'Marge de securite' },
                { param: 'Performance chaleur', nonAccl: '-20-25%', accl: '-5-10%', gain: 'Course vs survie' },
              ].map((row) => (
                <tr key={row.param} className="border-t border-zinc-800/50">
                  <td className="py-3 px-4 font-medium">{row.param}</td>
                  <td className="py-3 px-4 text-red-400">{row.nonAccl}</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">{row.accl}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.gain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Les 4 adaptations majeures */}
      <section>
        <SectionHeader kicker="Physiologie" title="Les 4 adaptations majeures" />

        <div className="space-y-6 mt-6">
          {[
            {
              num: '1',
              title: 'Expansion du volume plasmatique (+10-15%)',
              mechanism: "L'exposition repetee a la chaleur stimule la retention de sodium et d'eau par les reins. Le volume de plasma sanguin augmente.",
              effect: "Plus de sang disponible = tu peux alimenter muscles ET peau simultanement. La FC diminue car chaque battement envoie plus de volume.",
              timeline: 'Premiers effets a 3-5 jours, plateau a 10-14 jours.',
              important: "C'est l'adaptation la plus rapide et la plus importante.",
            },
            {
              num: '2',
              title: 'Sudation precoce et augmentee',
              mechanism: "Les glandes sudoripares deviennent plus reactives. Elles s'activent a une temperature corporelle plus basse et produisent plus de sueur.",
              effect: "Tu commences a te refroidir AVANT que la temperature corporelle ne monte dangereusement.",
              timeline: '5-7 jours pour le declenchement precoce, 10-14 jours pour le volume max.',
            },
            {
              num: '3',
              title: 'Sueur plus diluee (-30-40% de sel)',
              mechanism: 'Les glandes sudoripares reabsorbent plus de sodium avant de secreter la sueur.',
              effect: 'Tu perds moins d\'electrolytes. Moins de crampes, moins besoin de supplementation sodium.',
              timeline: "10-14 jours. C'est l'adaptation la plus lente.",
            },
            {
              num: '4',
              title: 'Reduction de la FC a effort egal (-10-15 bpm)',
              mechanism: "Consequence directe de l'expansion plasmatique. Plus de volume par battement = moins de battements necessaires.",
              effect: 'Reserve cardiaque disponible pour les moments critiques (montees, relances).',
              timeline: 'Visible des 5-7 jours, optimale a 10-14 jours.',
            },
          ].map((adapt) => (
            <div key={adapt.num} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <div className="flex items-start gap-4">
                <span className="font-mono text-2xl font-bold text-zinc-700">{adapt.num}</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-orange-400">{adapt.title}</h4>
                  <div className="mt-3 space-y-2 text-sm">
                    <p className="text-zinc-400"><strong className="text-zinc-300">Mecanisme :</strong> {adapt.mechanism}</p>
                    <p className="text-zinc-400"><strong className="text-zinc-300">Effet :</strong> {adapt.effect}</p>
                    <p className="text-zinc-400"><strong className="text-zinc-300">Timeline :</strong> {adapt.timeline}</p>
                    {adapt.important && <p className="text-orange-400 font-medium">{adapt.important}</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline recap */}
        <div className="overflow-x-auto mt-8 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Jour</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Adaptation</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">% du gain total</th>
              </tr>
            </thead>
            <tbody>
              {[
                { day: 'J1-J3', adapt: 'Expansion plasma commence', pct: '30%' },
                { day: 'J3-J5', adapt: "Sudation precoce s'installe", pct: '50%' },
                { day: 'J5-J7', adapt: 'FC stabilisee, technique sudation', pct: '70%' },
                { day: 'J7-J10', adapt: 'Volume sudation max', pct: '85%' },
                { day: 'J10-J14', adapt: 'Sueur diluee, plateau', pct: '100%' },
              ].map((row) => (
                <tr key={row.day} className="border-t border-zinc-800/50">
                  <td className="py-3 px-4 font-mono text-orange-400">{row.day}</td>
                  <td className="py-3 px-4 text-zinc-300">{row.adapt}</td>
                  <td className="py-3 px-4 font-mono text-zinc-400">{row.pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pourquoi ca se perd */}
      <section>
        <SectionHeader kicker="Attention" title="Pourquoi ca se perd (et a quelle vitesse)" />

        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-6 mt-6">
          <p className="text-zinc-300 leading-relaxed">
            Sans exposition, les adaptations se degradent a environ <strong className="text-yellow-400">-2.5%/jour</strong>.
          </p>
          <div className="mt-4 space-y-1 text-sm text-zinc-400">
            <p>Apres 2 semaines sans heat training :</p>
            <ul className="mt-2 space-y-1">
              <li className="flex gap-2"><span className="text-yellow-400">*</span> -35% du controle FC</li>
              <li className="flex gap-2"><span className="text-yellow-400">*</span> -30% de l'amelioration sudation</li>
              <li className="flex gap-2"><span className="text-yellow-400">*</span> -6% du controle core temp</li>
            </ul>
          </div>
        </div>

        <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Temps sans exposition</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Perte estimee</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Ce qui reste</th>
              </tr>
            </thead>
            <tbody>
              {[
                { time: '48h', loss: 'Minimale', remains: '~98%' },
                { time: '1 semaine', loss: '~15-20%', remains: '~80-85%' },
                { time: '2 semaines', loss: '~35%', remains: '~65%', warning: true },
                { time: '3 semaines', loss: '~50%', remains: '~50%', warning: true },
                { time: '4 semaines', loss: '~65%', remains: '~35%', warning: true },
              ].map((row) => (
                <tr key={row.time} className={`border-t border-zinc-800/50 ${row.warning ? 'bg-red-500/5' : ''}`}>
                  <td className="py-3 px-4 font-medium">{row.time}</td>
                  <td className={`py-3 px-4 ${row.warning ? 'text-red-400' : 'text-zinc-400'}`}>{row.loss}</td>
                  <td className="py-3 px-4 font-mono text-zinc-400">{row.remains}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pull-quote mt-6">
          <p className="text-zinc-300 leading-relaxed">
            Si tu fais un bloc heat en avril et que tu arretes jusqu'a la course fin juin, tu perds la majorite de tes adaptations.
            C'est pourquoi le protocole inclut : maintenance hiver (1x/sem) + bloc Maroc (avril) + bloc intensif (mai-juin) + re-boost (J-10 -&gt; J-3).
          </p>
        </div>
      </section>

      {/* Le protocole detaille */}
      <section>
        <SectionHeader kicker="Methode" title="Le protocole detaille" />

        {/* Pourquoi le velo */}
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-6 mt-6">
          <h4 className="font-semibold text-cyan-400 mb-3">Pourquoi le velo (et pas la course) ?</h4>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            En chaleur, le running ajoute un stress mecanique au stress thermique.
          </p>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li className="flex gap-2"><span className="text-cyan-400">*</span> Dissocier le stress thermique du stress mecanique</li>
            <li className="flex gap-2"><span className="text-cyan-400">*</span> Maintenir un effort Z2 stable pendant 60-90min</li>
            <li className="flex gap-2"><span className="text-cyan-400">*</span> Eviter les blessures (le heat training ne doit pas te casser)</li>
            <li className="flex gap-2"><span className="text-cyan-400">*</span> Controler precisement l'intensite</li>
          </ul>
          <p className="text-sm text-orange-400 mt-4 font-medium">
            Pour l'acclimatation, c'est le STRESS THERMIQUE qui compte, pas le mode de locomotion.
            60min de velo a 38C core temp = meme adaptation que 60min de run.
          </p>
        </div>

        {/* Pourquoi K-way */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 mt-6">
          <h4 className="font-semibold text-zinc-300 mb-3">Pourquoi K-way + bonnet ?</h4>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            L'objectif est de creer un micro-environnement chaud autour de ton corps.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-lg bg-zinc-800/50 p-4">
              <h5 className="font-medium text-orange-400 mb-2">K-way</h5>
              <p className="text-sm text-zinc-400">Empeche l'evaporation de la sueur. La sueur reste sur ta peau, la chaleur s'accumule. Tu simules un environnement a 35-40C meme dans une piece a 22C.</p>
            </div>
            <div className="rounded-lg bg-zinc-800/50 p-4">
              <h5 className="font-medium text-orange-400 mb-2">Bonnet</h5>
              <p className="text-sm text-zinc-400">40% de la deperdition de chaleur se fait par la tete. En la couvrant, tu bloques ce mecanisme de refroidissement.</p>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-lg border border-zinc-700">
            <h5 className="text-sm font-medium text-zinc-300 mb-2">Configuration recommandee</h5>
            <ul className="space-y-1 text-sm text-zinc-400">
              <li>* Piece a 22-25C (chauffage si besoin)</li>
              <li>* Home trainer</li>
              <li>* K-way ferme</li>
              <li>* Bonnet ou casquette</li>
              <li>* Pas de ventilateur (ou au minimum)</li>
            </ul>
          </div>
        </div>

        {/* Pourquoi Z2 */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 mt-6">
          <h4 className="font-semibold text-zinc-300 mb-3">Pourquoi Z2 (et pas plus intense) ?</h4>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            L'objectif n'est pas de s'entrainer DUR, c'est de maintenir une core temp elevee (38.5-39C) pendant 45-60min.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {[
              'Tu peux tenir 60-90min sans probleme',
              'Le stress reste gerable',
              'Tu peux enchainer les jours (bloc intensif)',
              "L'adaptation est identique",
            ].map((item, i) => (
              <div key={i} className="rounded-lg bg-zinc-800/50 p-3 text-center">
                <p className="text-xs text-zinc-400">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-zinc-400 mt-4">
            L'effort "moderately hard" (RPE 5-6) suffit pour elever la core temp.
            Au-dela, tu ajoutes de la fatigue sans benefice thermique supplementaire.
          </p>
        </div>

        {/* Pourquoi pas douche froide */}
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-6 mt-6">
          <h4 className="font-semibold text-yellow-400 mb-3">Pourquoi pas de douche froide apres ?</h4>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Ton corps s'adapte parce qu'il RESSENT le stress thermique prolonge. Si tu coupes brutalement ce signal avec une douche froide, tu raccourcis la fenetre d'adaptation.
          </p>
          <p className="text-sm text-zinc-300 mt-4 font-medium">
            Recommandation : Attendre 30 minutes apres la session avant toute douche. Laisser le corps redescendre naturellement en temperature.
          </p>
        </div>
      </section>

      {/* La periodisation complete */}
      <section>
        <SectionHeader kicker="Periodisation" title="Les 4 phases sur 6 mois" />

        <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Phase</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Periode</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Frequence</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Objectif</th>
              </tr>
            </thead>
            <tbody>
              {[
                { phase: 'Maintenance', period: 'Janvier -> Avril', freq: '1-2x/sem', obj: 'Ne pas partir de zero', color: 'blue' },
                { phase: 'Initiation (Maroc)', period: 'Fin avril', freq: 'Quotidien (7-10j)', obj: 'Lancer les adaptations', color: 'orange' },
                { phase: 'Intensif', period: 'Mai -> mi-juin', freq: '3-5x/sem', obj: 'Adaptation maximale', color: 'red' },
                { phase: 'Re-boost', period: 'J-10 -> J-3', freq: 'Quotidien', obj: 'Pic le jour J', color: 'emerald' },
              ].map((row) => (
                <tr key={row.phase} className="border-t border-zinc-800/50">
                  <td className={`py-3 px-4 font-medium ${
                    row.color === 'blue' ? 'text-blue-400' :
                    row.color === 'orange' ? 'text-orange-400' :
                    row.color === 'red' ? 'text-red-400' :
                    'text-emerald-400'
                  }`}>{row.phase}</td>
                  <td className="py-3 px-4 font-mono text-zinc-400">{row.period}</td>
                  <td className="py-3 px-4 text-zinc-300">{row.freq}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.obj}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phase 1 : Maintenance */}
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 uppercase tracking-wider">Phase 1</span>
            <h4 className="font-semibold text-blue-400">Maintenance (janvier -&gt; avril)</h4>
          </div>
          <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: 'Frequence', value: '1-2x/semaine' },
                  { label: 'Duree session', value: '45-60 min' },
                  { label: 'Methode', value: 'Velo indoor + K-way + bonnet' },
                  { label: 'Intensite', value: 'Z2 facile (RPE 5-6)' },
                  { label: 'Core temp cible', value: '38.0-38.3C' },
                  { label: 'Environnement', value: 'Piece 22-25C, pas de ventilateur' },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-zinc-800/50 last:border-b-0">
                    <td className="py-2 px-4 font-medium text-zinc-400 w-1/3">{row.label}</td>
                    <td className="py-2 px-4 text-zinc-300">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-zinc-400 mt-4">
            <strong>Pourquoi 1x/sem suffit :</strong> L'objectif n'est pas de construire une adaptation complete en hiver.
            C'est de maintenir les voies metaboliques "eveillees" pour que le bloc intensif de mai soit plus efficace.
          </p>
        </div>

        {/* Phase 2 : Maroc */}
        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-400 uppercase tracking-wider">Phase 2</span>
            <h4 className="font-semibold text-orange-400">Initiation Maroc (fin avril, 7-10 jours)</h4>
          </div>
          <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: 'Frequence', value: 'Quotidien' },
                  { label: 'Duree session', value: '60-90 min' },
                  { label: 'Methode', value: 'Run exterieur 11h-14h (pic chaleur)' },
                  { label: 'Intensite', value: 'Z2 tres facile (RPE 4-5)' },
                  { label: 'Core temp cible', value: '38.3-38.8C' },
                  { label: 'Environnement', value: 'Chaleur naturelle 28-35C' },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-zinc-800/50 last:border-b-0">
                    <td className="py-2 px-4 font-medium text-zinc-400 w-1/3">{row.label}</td>
                    <td className="py-2 px-4 text-zinc-300">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-zinc-900/50">
            <h5 className="text-sm font-medium text-zinc-300 mb-2">Ce qu'on ne fait PAS au Maroc :</h5>
            <ul className="space-y-1 text-sm text-zinc-400">
              <li>* Pas de seances dures (le heat training EST la seance)</li>
              <li>* Pas de gros volume (60-90min/jour max)</li>
              <li>* Pas de refroidissement artificiel</li>
              <li>* Pas de recherche de performance</li>
            </ul>
          </div>
        </div>

        {/* Phase 3 : Bloc intensif */}
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400 uppercase tracking-wider">Phase 3</span>
            <h4 className="font-semibold text-red-400">Bloc intensif (mai -&gt; mi-juin)</h4>
          </div>
          <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: 'Frequence', value: '3-5x/semaine' },
                  { label: 'Duree session', value: '60-75 min' },
                  { label: 'Methode', value: 'Mix runs midi + indoor' },
                  { label: 'Intensite', value: 'Z2 (RPE 5-6)' },
                  { label: 'Core temp cible', value: '38.5-39C maintenue 45min+' },
                  { label: 'Environnement', value: 'Exterieur si >25C, sinon indoor' },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-zinc-800/50 last:border-b-0">
                    <td className="py-2 px-4 font-medium text-zinc-400 w-1/3">{row.label}</td>
                    <td className="py-2 px-4 text-zinc-300">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pull-quote mt-4">
            <p className="text-zinc-300 text-sm">
              Le heat training devient LA seance prioritaire. Si tu dois choisir entre une seance de cotes et une session heat, choisis le heat.
              Les adaptations chaleur sont plus fragiles et plus longues a construire que les adaptations aerobies.
            </p>
          </div>

          {/* Semaine type */}
          <h5 className="font-medium text-zinc-300 mt-6 mb-3">Semaine type phase intensive</h5>
          <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/80">
                <tr>
                  <th className="text-left py-2 px-3 font-medium text-zinc-400">Jour</th>
                  <th className="text-left py-2 px-3 font-medium text-zinc-400">Session</th>
                  <th className="text-left py-2 px-3 font-medium text-zinc-400">Detail</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { day: 'Lundi', session: 'Heat indoor', detail: '60min velo K-way' },
                  { day: 'Mardi', session: 'Run midi', detail: '12h-14h, 50-60min Z2' },
                  { day: 'Mercredi', session: 'Heat indoor', detail: '60min velo K-way' },
                  { day: 'Jeudi', session: 'Repos ou footing frais', detail: 'Recup' },
                  { day: 'Vendredi', session: 'Run midi', detail: '12h-14h, 50-60min Z2' },
                  { day: 'Samedi', session: 'Sortie longue heures chaudes', detail: 'Depart 10h, finir 14h-16h' },
                  { day: 'Dimanche', session: 'Repos ou heat leger', detail: 'Selon fatigue' },
                ].map((row) => (
                  <tr key={row.day} className="border-t border-zinc-800/50">
                    <td className="py-2 px-3 font-medium">{row.day}</td>
                    <td className="py-2 px-3 text-red-400">{row.session}</td>
                    <td className="py-2 px-3 text-zinc-400">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Phase 4 : Re-boost */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 uppercase tracking-wider">Phase 4</span>
            <h4 className="font-semibold text-emerald-400">Re-boost (J-10 -&gt; J-3)</h4>
          </div>

          <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/80">
                <tr>
                  <th className="text-left py-2 px-3 font-medium text-zinc-400">Jour</th>
                  <th className="text-left py-2 px-3 font-medium text-zinc-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { day: 'J-10', action: 'Heat 45-60min' },
                  { day: 'J-9', action: 'Heat 45-60min' },
                  { day: 'J-8', action: 'Heat 45-60min' },
                  { day: 'J-7', action: 'Heat 45min + shakeout' },
                  { day: 'J-6', action: 'Heat 45min' },
                  { day: 'J-5', action: 'Arrivee Californie -- Heat leger', highlight: true },
                  { day: 'J-4', action: 'Heat 30-45min' },
                  { day: 'J-3', action: 'STOP heat -- Repos', stop: true },
                  { day: 'J-2', action: 'Repos complet' },
                  { day: 'J-1', action: 'Repos + preparation' },
                  { day: 'J-0', action: 'WSER', goal: true },
                ].map((row) => (
                  <tr key={row.day} className={`border-t border-zinc-800/50 ${
                    row.goal ? 'bg-orange-500/10' :
                    row.stop ? 'bg-red-500/10' :
                    row.highlight ? 'bg-emerald-500/10' : ''
                  }`}>
                    <td className={`py-2 px-3 font-mono ${
                      row.goal ? 'text-orange-400 font-bold' :
                      row.stop ? 'text-red-400 font-bold' :
                      row.highlight ? 'text-emerald-400 font-bold' : 'text-zinc-400'
                    }`}>{row.day}</td>
                    <td className={`py-2 px-3 ${
                      row.goal ? 'text-orange-400 font-bold' :
                      row.stop ? 'text-red-400' : 'text-zinc-300'
                    }`}>{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-zinc-400 mt-4">
            <strong>Pourquoi arreter a J-3 :</strong> Les adaptations sont en place. Continuer jusqu'a J-1 risque de : ajouter de la fatigue, deshydrater, perturber le sommeil.
            J-3 permet 48-72h de recuperation complete tout en conservant les adaptations.
          </p>
        </div>
      </section>

      {/* Marqueurs de progression */}
      <section>
        <SectionHeader kicker="Suivi" title="Comment savoir que ca marche" />

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {[
            {
              title: 'FC a effort donne',
              measure: 'Fais un effort standard (ex: 30min velo a 150W) et note ta FC moyenne.',
              expected: '-10 a -15 bpm sur 4-6 semaines',
              example: 'Semaine 1 : 150W = 145 bpm -> Semaine 6 : 150W = 132 bpm',
            },
            {
              title: 'Temps pour atteindre la sudation',
              measure: 'Note combien de temps apres le debut de l\'effort tu commences a vraiment transpirer.',
              expected: 'La sudation commence 3-5 minutes plus tot',
              example: 'Semaine 1 : Sudation a 12min -> Semaine 6 : Sudation a 7min',
            },
            {
              title: 'Volume de sudation',
              measure: 'Pese-toi avant et apres une session standard (nu, apres avoir vide la vessie).',
              expected: '+20-30% de perte de poids (= plus de sueur)',
              example: 'Semaine 1 : -0.8kg sur 60min -> Semaine 6 : -1.1kg sur 60min',
            },
            {
              title: 'Sensation subjective',
              measure: 'La chaleur devient "moins penible". Tu peux maintenir l\'effort sans avoir l\'impression de mourir.',
              expected: 'Amelioration progressive du confort',
              example: 'Si apres 4 semaines les sessions sont toujours aussi dures, quelque chose ne va pas.',
            },
          ].map((marker) => (
            <div key={marker.title} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <h4 className="font-semibold text-orange-400 mb-3">{marker.title}</h4>
              <div className="space-y-2 text-sm">
                <p className="text-zinc-400"><strong className="text-zinc-300">Mesure :</strong> {marker.measure}</p>
                <p className="text-zinc-400"><strong className="text-zinc-300">Attendu :</strong> <span className="text-emerald-400">{marker.expected}</span></p>
                <p className="text-xs text-zinc-500 italic">{marker.example}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategie jour J */}
      <section>
        <SectionHeader kicker="Jour J" title="Strategie chaleur WSER" />

        <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Section</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Km</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Temperature</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Strategie</th>
              </tr>
            </thead>
            <tbody>
              {[
                { section: 'High Country', km: '0-50', temp: '15-25C', strategy: "Pas de stress chaleur, economiser l'eau" },
                { section: 'Canyons', km: '50-100', temp: '35-45C', strategy: 'Cooling max, nutrition adaptee', critical: true },
                { section: 'California Loop', km: '100-128', temp: '25-35C', strategy: 'Temperature descend, opportunite' },
                { section: 'Final Push', km: '128-161', temp: '15-25C (nuit)', strategy: 'Frais, pas de stress' },
              ].map((row) => (
                <tr key={row.section} className={`border-t border-zinc-800/50 ${row.critical ? 'bg-red-500/10' : ''}`}>
                  <td className={`py-3 px-4 font-medium ${row.critical ? 'text-red-400' : ''}`}>{row.section}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.km}</td>
                  <td className={`py-3 px-4 font-mono ${row.critical ? 'text-red-400 font-bold' : 'text-zinc-400'}`}>{row.temp}</td>
                  <td className={`py-3 px-4 ${row.critical ? 'text-red-400 font-semibold' : 'text-zinc-300'}`}>{row.strategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Protocole cooling */}
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-6 mt-6">
          <h4 className="font-semibold text-cyan-400 mb-3">Protocole cooling dans les canyons</h4>
          <p className="text-sm text-zinc-400 mb-4">A chaque ravito (Cal-1, Cal-2, Cal-3, Michigan Bluff) :</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              'Remplir casquette de glace',
              'Glace dans bandana cou',
              'Eponge/eau sur tete et epaules',
              'Glace dans les mains (palm cooling)',
              'Si disponible : glace dans short (arteres femorales)',
            ].map((item, i) => (
              <div key={i} className="rounded-lg bg-zinc-900/50 p-3 text-center">
                <span className="font-mono text-lg text-cyan-400 block mb-1">{i + 1}</span>
                <p className="text-xs text-zinc-400">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-zinc-500 mt-4">Temps max : 3-4 min (pas plus, tu te refroidis en bougeant)</p>
        </div>

        {/* Le piege classique */}
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6 mt-6">
          <h4 className="font-semibold text-red-400 mb-3">Le piege classique</h4>
          <p className="text-sm text-zinc-300 italic mb-4">"Je me sens bien a Robinson Flat, pas besoin de glace."</p>
          <p className="text-sm text-zinc-400">
            ERREUR. A Robinson Flat tu es encore en altitude (2000m), relativement frais. Les canyons commencent APRES.
          </p>
          <p className="text-sm text-orange-400 font-medium mt-3">
            Regle : Commencer le cooling a Robinson Flat AVANT de se sentir en surchauffe. L'anticipation est la cle.
          </p>
        </div>
      </section>

      {/* Ce qu'il faut retenir */}
      <section>
        <SectionHeader kicker="Synthese" title="Ce qu'il faut retenir" />

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
            <h4 className="font-semibold text-emerald-400 mb-3">Les principes cles</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex gap-2"><span className="text-emerald-400">1.</span> L'acclimatation prend 10-14 jours pour etre complete</li>
              <li className="flex gap-2"><span className="text-emerald-400">2.</span> Sans exposition, tu perds ~2.5%/jour d'adaptation</li>
              <li className="flex gap-2"><span className="text-emerald-400">3.</span> Le stress thermique compte, pas le mode d'exercice (velo = course)</li>
              <li className="flex gap-2"><span className="text-emerald-400">4.</span> Core temp 38.5-39C pendant 45-60min = stimulus optimal</li>
              <li className="flex gap-2"><span className="text-emerald-400">5.</span> Pas de douche froide immediate apres les sessions</li>
            </ul>
          </div>

          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <h4 className="font-semibold text-red-400 mb-3">Les erreurs a eviter</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex gap-2"><span className="text-red-400">*</span> Faire un bloc heat en avril puis arreter -&gt; adaptations perdues en juin</li>
              <li className="flex gap-2"><span className="text-red-400">*</span> Faire des sessions trop intenses -&gt; fatigue sans benefice supplementaire</li>
              <li className="flex gap-2"><span className="text-red-400">*</span> Ne pas monitorer la progression -&gt; pas de feedback</li>
              <li className="flex gap-2"><span className="text-red-400">*</span> Attendre d'avoir chaud pour se refroidir le jour J -&gt; trop tard</li>
              <li className="flex gap-2"><span className="text-red-400">*</span> Forcer la nutrition dans les canyons -&gt; GI distress</li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 mt-6">
          <h4 className="font-semibold text-orange-400 mb-3">Le minimum vital</h4>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Si tu ne fais qu'UNE chose pour la chaleur : <strong className="text-white">Bloc intensif mai-juin : 4-5 sessions/semaine pendant 4-6 semaines.</strong>
          </p>
          <p className="text-sm text-zinc-400 mt-3">
            C'est le minimum pour avoir une adaptation fonctionnelle le jour J.
            L'ideal = maintenance hiver + Maroc + bloc intensif + re-boost. Mais si tu dois prioriser, c'est le bloc intensif qui compte le plus.
          </p>
        </div>
      </section>
    </div>
  )
}

export const HeatTab = memo(HeatTabComponent)
