import { memo } from 'react'
import { SectionHeader } from '../../components/shared'

function MuscuTabComponent() {
  return (
    <div className="space-y-12">
      {/* Section 1: Le probleme WSER */}
      <section>
        <SectionHeader kicker="Le probleme" title="Ce qui fait la difference sur WSER" />

        <div className="overflow-x-auto mt-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-4 font-semibold text-zinc-400">Ce que tout le monde prepare</th>
                <th className="text-left py-3 px-4 font-semibold text-orange-400">Ce qui fait la difference</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 text-zinc-400">6004m D+</td>
                <td className="py-4 px-4 font-semibold text-orange-400">7536m D-</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 text-zinc-400">Chaleur des canyons</td>
                <td className="py-4 px-4 font-semibold text-orange-400">Foresthill -&gt; Auburn = 38 km de descente</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 text-zinc-400">Distance 163 km</td>
                <td className="py-4 px-4 font-semibold text-orange-400">Quads morts = marche forcee 60 derniers km</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 mt-6">
          <h3 className="font-semibold text-orange-400 mb-4">L'insight cle</h3>
          <p className="text-base-lg text-zinc-300 leading-relaxed">
            Le D- de WSER est superieur au D+. <strong>C'est une course de descente deguisee en 100 miles.</strong>
          </p>
          <p className="text-sm text-zinc-400 mt-4">
            Les montees, tu les marches. Les descentes, tu les cours -- ou tu essaies. A Foresthill (km 100),
            ceux qui ont encore des quads accelerent. Les autres subissent 60 km de marche forcee.
          </p>
          <p className="text-sm text-red-400 mt-4 font-semibold">
            80% des DNF a WSER sont lies aux quads detruits par les descentes.
          </p>
        </div>

        {/* Comparaison quads */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Parametre</th>
                <th className="text-left py-3 px-4 font-semibold text-red-400">Quads morts</th>
                <th className="text-left py-3 px-4 font-semibold text-emerald-400">Quads qui tiennent</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">Foresthill -&gt; Auburn</td>
                <td className="py-4 px-4 text-red-400">5-6h de marche</td>
                <td className="py-4 px-4 text-emerald-400">3h30-4h de course</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">Descentes Cal Street</td>
                <td className="py-4 px-4 text-red-400">Marche, freinage constant</td>
                <td className="py-4 px-4 text-emerald-400">Float, relance, gain de places</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">Douleur</td>
                <td className="py-4 px-4 text-red-400">Insupportable, chaque pas</td>
                <td className="py-4 px-4 text-emerald-400">Presente mais gerable</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">Mental</td>
                <td className="py-4 px-4 text-red-400">Survie, envie d'abandonner</td>
                <td className="py-4 px-4 text-emerald-400">Course, focus finish</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Pourquoi l'excentrique */}
      <section>
        <SectionHeader kicker="Physiologie" title="Pourquoi l'excentrique" />

        <div className="overflow-x-auto mt-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-4 font-semibold text-zinc-300"></th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Concentrique</th>
                <th className="text-left py-3 px-4 font-semibold text-orange-400">Excentrique</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">Mouvement</td>
                <td className="py-4 px-4 text-zinc-400">Muscle se raccourcit</td>
                <td className="py-4 px-4 text-orange-300">Muscle s'allonge sous tension</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">Exemple course</td>
                <td className="py-4 px-4 text-zinc-400">Pousser en montee</td>
                <td className="py-4 px-4 text-orange-300">Freiner en descente</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">Dommages musculaires</td>
                <td className="py-4 px-4 text-zinc-400">Moderes</td>
                <td className="py-4 px-4 text-red-400 font-semibold">Majeurs</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">DOMS</td>
                <td className="py-4 px-4 text-zinc-400">24-48h</td>
                <td className="py-4 px-4 text-red-400 font-semibold">48-96h, plus intenses</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6 mt-6">
          <h4 className="font-semibold text-zinc-200 mb-4">Le probleme physiologique</h4>
          <p className="text-base-lg text-zinc-400 leading-relaxed">
            En descente, tes quads absorbent des milliers de micro-impacts. Chaque foulee = contraction excentrique pour freiner.
          </p>
          <p className="text-sm text-zinc-400 mt-4">
            Sur 7536m D-, c'est des dizaines de milliers de contractions excentriques. Sans preparation specifique,
            les fibres musculaires se dechirent, l'inflammation s'installe, et tu perds toute capacite de freinage.
          </p>
          <p className="text-sm text-orange-400 mt-4 font-semibold">
            Les marqueurs de dommages musculaires (Creatine Kinase) chez les finishers WSER atteignent 32,956 U/L -- le seuil normal est &lt;198 U/L. C'est 166x la normale.
          </p>
        </div>

        {/* Les 4 benefices */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">1</span>
              <h3 className="font-semibold text-emerald-400">Repeated Bout Effect (RBE)</h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Apres quelques seances excentriques, le muscle s'adapte et resiste beaucoup mieux aux dommages futurs.
            </p>
            <p className="text-sm text-zinc-300 mt-3">
              Les sarcomeres s'allongent et se renforcent. <strong className="text-emerald-400">Reduction de 40-60% des marqueurs de dommages</strong> apres 2-3 expositions.
            </p>
            <p className="text-xs text-zinc-500 mt-3 italic">
              L'effet dure plusieurs semaines -- c'est pourquoi la derniere seance lourde a J-14 suffit.
            </p>
          </div>

          <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">2</span>
              <h3 className="font-semibold text-blue-400">Renforcement tendineux</h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Les tendons (rotulien, Achille) s'adaptent a la charge excentrique.
            </p>
            <p className="text-sm text-zinc-300 mt-3">
              Le collagene se reorganise, la section transversale du tendon augmente. <strong className="text-blue-400">Meilleure transmission de force, moins de tendinopathies.</strong>
            </p>
            <p className="text-xs text-zinc-500 mt-3 italic">
              Timeline : 8-12 semaines pour des adaptations tendineuses significatives.
            </p>
          </div>

          <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">3</span>
              <h3 className="font-semibold text-purple-400">Controle neuromusculaire</h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Apprendre a "lacher" le frein progressivement, pas en on/off.
            </p>
            <p className="text-sm text-zinc-300 mt-3">
              Le tempo lent (5 secondes) entraine les unites motrices a gerer la descente de facon graduee.
              <strong className="text-purple-400"> C'est ce qui permet la technique "float" en descente.</strong>
            </p>
          </div>

          <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">4</span>
              <h3 className="font-semibold text-cyan-400">Tolerance a la douleur</h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Les DOMS post-seance habituent le corps (et la tete) a fonctionner avec des quads en feu.
            </p>
            <p className="text-sm text-zinc-300 mt-3">
              Tu apprends que la douleur n'est pas un signal de dommage imminent, mais une sensation gerable.
              <strong className="text-cyan-400"> Le jour J, tes quads vont bruler -- mais tu sauras que tu peux continuer.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Les exercices */}
      <section>
        <SectionHeader kicker="Exercices" title="Les mouvements cles -- Detail complet" />

        {/* Exercice 1: Squat excentrique */}
        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-orange-500/20 rounded-full text-xs font-semibold text-orange-400">EXERCICE 1</span>
            <h3 className="headline-lg text-orange-100">Squat excentrique lent</h3>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">Quadriceps</span>
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm font-mono text-orange-400">5s down / 1s up</span>
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-400">3-4 x 8-10</span>
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            Le squat excentrique simule exactement le freinage en descente. Chaque foulee de descente = mini-squat excentrique.
            Le tempo lent (5 secondes) force le controle neuromusculaire. <strong className="text-zinc-300">C'est l'exercice fondamental -- maitrise-le avant tout.</strong>
          </p>

          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="rounded-lg border border-zinc-700 bg-zinc-900/50 p-4">
              <h4 className="font-semibold text-zinc-200 text-sm mb-3">Execution</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-cyan-400 font-semibold">Position de depart :</span>
                  <ul className="text-zinc-400 mt-1 space-y-1">
                    <li>* Debout, pieds largeur d'epaules, pointes legerement ouvertes (15-20 deg)</li>
                    <li>* Regard devant, buste droit, core engage</li>
                  </ul>
                </div>
                <div>
                  <span className="text-orange-400 font-semibold">Phase excentrique (5 secondes) :</span>
                  <ul className="text-zinc-400 mt-1 space-y-1">
                    <li>* Initier la descente en poussant les hanches vers l'arriere</li>
                    <li>* Descendre en comptant "1... 2... 3... 4... 5..." -- controle total</li>
                    <li>* Genoux alignes avec les pieds (pas de valgus)</li>
                    <li>* Descendre jusqu'a cuisses paralleles au sol</li>
                  </ul>
                </div>
                <div>
                  <span className="text-emerald-400 font-semibold">Phase concentrique (1 seconde) :</span>
                  <ul className="text-zinc-400 mt-1 space-y-1">
                    <li>* Marquer un temps d'arret (pas de rebond)</li>
                    <li>* Remonter de facon controlee mais dynamique</li>
                    <li>* Pousser a travers les talons</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-200 text-sm mb-3">Progression sur 6 mois</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="text-left py-2 px-3 font-semibold text-zinc-400">Periode</th>
                      <th className="text-left py-2 px-3 font-semibold text-zinc-400">Charge</th>
                      <th className="text-left py-2 px-3 font-semibold text-zinc-400">Focus</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-2 px-3 font-mono text-cyan-400">S1-S4</td>
                      <td className="py-2 px-3 text-zinc-300">Poids de corps</td>
                      <td className="py-2 px-3 text-zinc-400">Maitriser le tempo 5s</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-2 px-3 font-mono text-cyan-400">S5-S8</td>
                      <td className="py-2 px-3 text-zinc-300">Goblet 10-15kg</td>
                      <td className="py-2 px-3 text-zinc-400">Maintenir tempo avec charge</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-2 px-3 font-mono text-cyan-400">S9-S12</td>
                      <td className="py-2 px-3 text-zinc-300">Goblet 15-20kg</td>
                      <td className="py-2 px-3 text-zinc-400">Augmentation progressive</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50 bg-orange-500/5">
                      <td className="py-2 px-3 font-mono text-orange-400 font-semibold">S13+</td>
                      <td className="py-2 px-3 text-orange-300">Barre 20-40kg</td>
                      <td className="py-2 px-3 text-orange-300">Charges max si tempo stable</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 mt-4">
                <h5 className="font-semibold text-emerald-400 text-sm mb-2">Signal que ca marche</h5>
                <ul className="text-sm text-zinc-400 space-y-1">
                  <li>* DOMS quads 48-72h apres les premieres seances</li>
                  <li>* Tempo 5s stable meme en fin de serie</li>
                  <li>* Amelioration du controle en descente (ressenti terrain)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-red-400 text-sm mb-3">Erreurs techniques courantes</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left py-2 px-3 font-semibold text-zinc-400">Erreur</th>
                    <th className="text-left py-2 px-3 font-semibold text-zinc-400">Consequence</th>
                    <th className="text-left py-2 px-3 font-semibold text-zinc-400">Correction</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 px-3 text-red-400">Tempo trop rapide (&lt;3s)</td>
                    <td className="py-2 px-3 text-zinc-400">Perte du stimulus excentrique</td>
                    <td className="py-2 px-3 text-emerald-400">Compter a voix haute, reduire la charge</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 px-3 text-red-400">Genoux vers l'interieur</td>
                    <td className="py-2 px-3 text-zinc-400">Stress ligamentaire</td>
                    <td className="py-2 px-3 text-emerald-400">Penser "ecarter les genoux"</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 px-3 text-red-400">Talons qui decollent</td>
                    <td className="py-2 px-3 text-zinc-400">Surcharge rotule</td>
                    <td className="py-2 px-3 text-emerald-400">Elever les talons, mobilite chevilles</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 px-3 text-red-400">Rebond en bas</td>
                    <td className="py-2 px-3 text-zinc-400">Perte de controle, risque</td>
                    <td className="py-2 px-3 text-emerald-400">Marquer 1s d'arret en position basse</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Exercice 2: Step-down */}
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-500/20 rounded-full text-xs font-semibold text-blue-400">EXERCICE 2</span>
            <h3 className="headline-lg text-blue-100">Step-down unilateral</h3>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">Quadriceps + stabilisateurs hanche</span>
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm font-mono text-blue-400">3s down / 1s up</span>
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-400">3 x 10-12/jambe</span>
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            La descente se fait une jambe apres l'autre. Le step-down entraine la jambe de facon unilaterale, corrigeant les desequilibres.
            <strong className="text-zinc-300"> Si ta jambe gauche est 15% plus faible, elle va lacher en premier sur WSER.</strong>
          </p>

          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="rounded-lg border border-zinc-700 bg-zinc-900/50 p-4">
              <h4 className="font-semibold text-zinc-200 text-sm mb-3">Execution</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-cyan-400 font-semibold">Position de depart :</span>
                  <ul className="text-zinc-400 mt-1 space-y-1">
                    <li>* Debout sur un step/marche (20-40 cm), jambe de travail au bord</li>
                    <li>* Jambe libre dans le vide</li>
                    <li>* Bras libres ou mains sur hanches</li>
                  </ul>
                </div>
                <div>
                  <span className="text-blue-400 font-semibold">Phase excentrique (3 secondes) :</span>
                  <ul className="text-zinc-400 mt-1 space-y-1">
                    <li>* Flechir la jambe de travail de facon controlee</li>
                    <li>* Descendre le talon de la jambe libre vers le sol</li>
                    <li>* Compter "1... 2... 3..."</li>
                    <li>* Genou aligne avec le 2e orteil -- pas de valgus</li>
                  </ul>
                </div>
                <div>
                  <span className="text-emerald-400 font-semibold">Point bas :</span>
                  <ul className="text-zinc-400 mt-1 space-y-1">
                    <li>* Talon touche le sol (pas l'avant-pied)</li>
                    <li>* Pousser pour remonter, ne pas aider avec la jambe libre</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-200 text-sm mb-3">Progression sur 6 mois</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="text-left py-2 px-3 font-semibold text-zinc-400">Periode</th>
                      <th className="text-left py-2 px-3 font-semibold text-zinc-400">Hauteur</th>
                      <th className="text-left py-2 px-3 font-semibold text-zinc-400">Charge</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-2 px-3 font-mono text-cyan-400">S1-S4</td>
                      <td className="py-2 px-3 text-zinc-300">20 cm</td>
                      <td className="py-2 px-3 text-zinc-400">Poids de corps</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-2 px-3 font-mono text-cyan-400">S5-S8</td>
                      <td className="py-2 px-3 text-zinc-300">30 cm</td>
                      <td className="py-2 px-3 text-zinc-400">Poids de corps</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-2 px-3 font-mono text-cyan-400">S9-S12</td>
                      <td className="py-2 px-3 text-zinc-300">40 cm</td>
                      <td className="py-2 px-3 text-zinc-400">Poids de corps</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50 bg-blue-500/5">
                      <td className="py-2 px-3 font-mono text-blue-400 font-semibold">S13+</td>
                      <td className="py-2 px-3 text-blue-300">40 cm</td>
                      <td className="py-2 px-3 text-blue-300">Halteres 5-10kg si technique parfaite</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4 mt-4">
                <h5 className="font-semibold text-orange-400 text-sm mb-2">Principe cle</h5>
                <p className="text-sm text-zinc-300">
                  Augmenter la hauteur du step <strong>AVANT</strong> d'ajouter du poids.
                </p>
                <p className="text-sm text-zinc-400 mt-2">
                  40 cm poids de corps &gt; 20 cm avec halteres. L'amplitude est plus importante que la charge pour cet exercice.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Exercice 3: Nordic curl */}
        <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-purple-500/20 rounded-full text-xs font-semibold text-purple-400">EXERCICE 3</span>
            <h3 className="headline-lg text-purple-100">Nordic curl</h3>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">Ischio-jambiers</span>
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm font-mono text-purple-400">Controle</span>
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-400">3 x 5-8</span>
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            Les ischios stabilisent le genou en descente. Faibles = genou instable + risque de claquage. Le Nordic curl est l'exercice excentrique
            le plus efficace pour les ischios. <strong className="text-purple-300">Reduction de 51% des blessures aux ischio-jambiers</strong> avec un programme regulier.
          </p>

          <div className="rounded-lg border border-zinc-700 bg-zinc-900/50 p-4">
            <h4 className="font-semibold text-zinc-200 text-sm mb-3">Execution</h4>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-cyan-400 font-semibold">Position de depart :</span>
                <ul className="text-zinc-400 mt-1 space-y-1">
                  <li>* A genoux sur un tapis epais</li>
                  <li>* Chevilles bloquees (partenaire, barre basse, canape, sangle)</li>
                  <li>* Corps aligne genoux-hanches-epaules</li>
                  <li>* Bras prets a amortir</li>
                </ul>
              </div>
              <div>
                <span className="text-purple-400 font-semibold">Phase excentrique (controlee) :</span>
                <ul className="text-zinc-400 mt-1 space-y-1">
                  <li>* Se laisser tomber vers l'avant</li>
                  <li>* <strong className="text-zinc-300">CONTROLER la chute avec les ischios</strong></li>
                  <li>* Descendre le plus lentement possible</li>
                  <li>* Quand tu perds le controle, te rattraper avec les mains</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4 mt-4">
            <h5 className="font-semibold text-yellow-400 text-sm mb-2">C'est dur. Au debut tu vas tomber tres vite. C'est normal.</h5>
            <p className="text-sm text-zinc-400">
              L'objectif n'est pas de descendre jusqu'au sol de facon controlee des le depart. C'est de <strong className="text-zinc-300">RALLONGER le temps de descente</strong> au fil des semaines.
            </p>
            <div className="mt-3 space-y-1 text-sm text-zinc-400">
              <p><span className="text-cyan-400">Semaine 1 :</span> Tu controles les premiers 20 deg, puis tu tombes.</p>
              <p><span className="text-cyan-400">Semaine 8 :</span> Tu controles 60+ deg avant de te rattraper.</p>
              <p><span className="text-cyan-400">Semaine 16 :</span> Tu descends quasi-complet de facon controlee.</p>
            </div>
          </div>
        </div>

        {/* Exercice 4: Mollets */}
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-xs font-semibold text-cyan-400">EXERCICE 4</span>
            <h3 className="headline-lg text-cyan-100">Mollets excentriques</h3>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">Gastrocnemiens, soleaire, tendon d'Achille</span>
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm font-mono text-cyan-400">3s down</span>
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-400">3 x 15/jambe</span>
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            En descente, les mollets absorbent une partie du choc avant que les quads ne prennent le relais.
            Le tendon d'Achille est particulierement sollicite. <strong className="text-cyan-300">Un tendon renforce = moins de tendinopathies, meilleure elasticite.</strong>
          </p>

          <div className="rounded-lg border border-zinc-700 bg-zinc-900/50 p-4">
            <h4 className="font-semibold text-zinc-200 text-sm mb-3">Execution</h4>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-zinc-300 font-semibold">1. Position :</span>
                <span className="text-zinc-400"> Debout sur une marche, talons dans le vide</span>
              </div>
              <div>
                <span className="text-zinc-300 font-semibold">2. Phase concentrique (bilaterale) :</span>
                <span className="text-zinc-400"> Monter sur les deux pieds (pointes de pieds)</span>
              </div>
              <div>
                <span className="text-zinc-300 font-semibold">3. Transfert :</span>
                <span className="text-zinc-400"> Transferer tout le poids sur une jambe</span>
              </div>
              <div>
                <span className="text-cyan-400 font-semibold">4. Phase excentrique (unilaterale, 3 secondes) :</span>
                <span className="text-zinc-400"> Descendre lentement, talon le plus bas possible (stretch maximal)</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4 mt-4">
            <h5 className="font-semibold text-purple-400 text-sm mb-2">Variante soleaire (genou flechi)</h5>
            <p className="text-sm text-zinc-400">
              Meme execution, mais maintenir le genou flechi a 30 deg pendant tout le mouvement.
              Le gastrocnemien se desactive quand le genou est flechi. Le soleaire prend le relais.
              <strong className="text-zinc-300"> Plus specifique pour le trail.</strong>
            </p>
            <p className="text-sm text-zinc-400 mt-2 italic">
              Alterner : 1 serie genou tendu, 1 serie genou flechi.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Seances types */}
      <section>
        <SectionHeader kicker="Seances" title="Structure type" />

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          {/* Seance A */}
          <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-orange-400">Seance A -- Complete</h3>
              <span className="text-sm text-zinc-400">50-55 min</span>
            </div>
            <p className="text-sm text-zinc-400 mb-4">
              <strong className="text-zinc-300">Phase developpement</strong> (janvier-avril), 1-2x/semaine
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left py-2 px-3 font-semibold text-zinc-400">#</th>
                    <th className="text-left py-2 px-3 font-semibold text-zinc-400">Exercice</th>
                    <th className="text-left py-2 px-3 font-semibold text-zinc-400">Series x Reps</th>
                    <th className="text-left py-2 px-3 font-semibold text-zinc-400">Repos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 px-3 text-orange-400">1</td>
                    <td className="py-2 px-3 text-zinc-300">Squat excentrique lent</td>
                    <td className="py-2 px-3 font-mono text-zinc-400">4 x 8</td>
                    <td className="py-2 px-3 text-zinc-500">2 min</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 px-3 text-orange-400">2</td>
                    <td className="py-2 px-3 text-zinc-300">Leg press negatif (ou squat bulgare)</td>
                    <td className="py-2 px-3 font-mono text-zinc-400">4 x 8</td>
                    <td className="py-2 px-3 text-zinc-500">2 min</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 px-3 text-orange-400">3</td>
                    <td className="py-2 px-3 text-zinc-300">Step-down unilateral</td>
                    <td className="py-2 px-3 font-mono text-zinc-400">3 x 10/jambe</td>
                    <td className="py-2 px-3 text-zinc-500">90s</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 px-3 text-orange-400">4</td>
                    <td className="py-2 px-3 text-zinc-300">Nordic curl</td>
                    <td className="py-2 px-3 font-mono text-zinc-400">3 x 6</td>
                    <td className="py-2 px-3 text-zinc-500">90s</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 px-3 text-orange-400">5</td>
                    <td className="py-2 px-3 text-zinc-300">Mollets excentriques</td>
                    <td className="py-2 px-3 font-mono text-zinc-400">3 x 15/jambe</td>
                    <td className="py-2 px-3 text-zinc-500">60s</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Seance B */}
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-cyan-400">Seance B -- Maintien</h3>
              <span className="text-sm text-zinc-400">40-45 min</span>
            </div>
            <p className="text-sm text-zinc-400 mb-4">
              <strong className="text-zinc-300">Phase specifique</strong> (mai-juin), 1x/semaine
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left py-2 px-3 font-semibold text-zinc-400">#</th>
                    <th className="text-left py-2 px-3 font-semibold text-zinc-400">Exercice</th>
                    <th className="text-left py-2 px-3 font-semibold text-zinc-400">Series x Reps</th>
                    <th className="text-left py-2 px-3 font-semibold text-zinc-400">Repos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 px-3 text-cyan-400">1</td>
                    <td className="py-2 px-3 text-zinc-300">Squat excentrique lent</td>
                    <td className="py-2 px-3 font-mono text-zinc-400">3 x 8</td>
                    <td className="py-2 px-3 text-zinc-500">2 min</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 px-3 text-cyan-400">2</td>
                    <td className="py-2 px-3 text-zinc-300">Step-down unilateral</td>
                    <td className="py-2 px-3 font-mono text-zinc-400">2 x 10/jambe</td>
                    <td className="py-2 px-3 text-zinc-500">90s</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 px-3 text-cyan-400">3</td>
                    <td className="py-2 px-3 text-zinc-300">Nordic curl</td>
                    <td className="py-2 px-3 font-mono text-zinc-400">2 x 6</td>
                    <td className="py-2 px-3 text-zinc-500">90s</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 px-3 text-cyan-400">4</td>
                    <td className="py-2 px-3 text-zinc-300">Mollets excentriques</td>
                    <td className="py-2 px-3 font-mono text-zinc-400">2 x 12/jambe</td>
                    <td className="py-2 px-3 text-zinc-500">60s</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-lg border border-zinc-700 bg-zinc-900/50 p-4 mt-4">
              <h5 className="font-semibold text-zinc-300 text-sm mb-2">Difference cle</h5>
              <p className="text-sm text-zinc-400">
                Meme charge qu'en phase developpement, mais <strong className="text-zinc-300">moins de series</strong>.
                On maintient le stimulus sans accumuler de fatigue. Le RBE est deja installe -- l'objectif est de le preserver.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Periodisation */}
      <section>
        <SectionHeader kicker="Planification" title="Periodisation 6 mois" />

        <div className="overflow-x-auto mt-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Periode</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Frequence</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Seance</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Focus</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">Janvier</td>
                <td className="py-4 px-4 text-zinc-400">2x/sem</td>
                <td className="py-4 px-4 text-zinc-400">A (complete)</td>
                <td className="py-4 px-4 text-zinc-400">Apprentissage. Charges legeres. Maitriser tempo.</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">Fevrier</td>
                <td className="py-4 px-4 text-zinc-400">2x/sem</td>
                <td className="py-4 px-4 text-zinc-400">A (complete)</td>
                <td className="py-4 px-4 text-zinc-400">Augmentation progressive charges. Recup post-Arc.</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20 bg-orange-500/5">
                <td className="py-4 px-4 font-semibold text-orange-400">Mars-Avril</td>
                <td className="py-4 px-4 text-orange-300 font-semibold">1-2x/sem</td>
                <td className="py-4 px-4 text-orange-300 font-semibold">A (complete)</td>
                <td className="py-4 px-4 text-orange-300 font-semibold">PIC. Charges maximales. Repeated Bout Effect.</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">Mai</td>
                <td className="py-4 px-4 text-zinc-400">1x/sem</td>
                <td className="py-4 px-4 text-zinc-400">B (maintien)</td>
                <td className="py-4 px-4 text-zinc-400">Maintien acquis. Reduire volume, garder intensite.</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">Juin</td>
                <td className="py-4 px-4 text-zinc-400">1x/sem -&gt; stop</td>
                <td className="py-4 px-4 text-zinc-400">B legere</td>
                <td className="py-4 px-4 text-zinc-400">Derniere lourde J-14. Legere J-10. Stop apres.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 6: Placement dans la semaine */}
      <section>
        <SectionHeader kicker="Timing" title="Placement dans la semaine" />

        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6 mt-6">
          <h3 className="font-semibold text-red-400 mb-4">Les regles non-negociables</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="text-red-400 font-bold">x</span>
              <div>
                <p className="text-zinc-200 font-semibold">Jamais la veille d'une sortie longue</p>
                <p className="text-sm text-zinc-400">Les DOMS vont te tuer. Tu vas passer 4h a souffrir au lieu de construire.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-red-400 font-bold">x</span>
              <div>
                <p className="text-zinc-200 font-semibold">Jamais le lendemain d'une grosse descente</p>
                <p className="text-sm text-zinc-400">Quads deja enflammes. Ajouter du stress excentrique = risque de blessure.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-emerald-400 font-bold">ok</span>
              <div>
                <p className="text-zinc-200 font-semibold">48-72h avant la sortie longue = ideal</p>
                <p className="text-sm text-zinc-400">Le temps que les DOMS se dissipent. Tu arrives frais pour la longue.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-orange-400 font-bold">!</span>
              <div>
                <p className="text-zinc-200 font-semibold">Post-course (100km+)</p>
                <p className="text-sm text-zinc-400">Reprendre 7-10 jours apres. Leger d'abord. Le corps a besoin de reconstruire.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6 mt-6">
          <h4 className="font-semibold text-zinc-200 mb-4">En pratique</h4>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Tu places ta muscu quand ca t'arrange, en respectant les contraintes ci-dessus.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm">
            <div className="p-3 bg-zinc-800/30 rounded-lg">
              <span className="text-zinc-400">Si sortie longue le samedi :</span>
              <span className="font-semibold text-zinc-200"> muscu mardi ou mercredi max</span>
            </div>
            <div className="p-3 bg-zinc-800/30 rounded-lg">
              <span className="text-zinc-400">Si sortie longue le dimanche :</span>
              <span className="font-semibold text-zinc-200"> muscu mercredi ou jeudi max</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Annecy vs Paris */}
      <section>
        <SectionHeader kicker="Adaptation" title="Annecy vs Paris -- Ce que ton terrain implique" />

        <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6 mt-6">
          <h3 className="font-semibold text-zinc-200 mb-4">Le principe Koop</h3>
          <p className="text-base-lg text-zinc-400 leading-relaxed">
            Si ton terrain d'entrainement a un ratio D+/D- par km similaire a WSER, tes runs d'endurance quotidiens suffisent pour l'excentrique.
            La muscu devient un complement, pas la base.
          </p>
          <p className="text-sm text-orange-400 mt-4 font-semibold">
            WSER = ~37m de D- par km en moyenne.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          {/* Annecy */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
            <h3 className="font-semibold text-emerald-400 mb-4">Si tu t'entraines a Annecy (montagne)</h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-zinc-200 text-sm mb-2">Ce que le terrain t'apporte :</h4>
                <ul className="text-sm text-zinc-400 space-y-1">
                  <li>* Denivele naturel sur quasi toutes les sorties</li>
                  <li>* Descentes techniques disponibles (Semnoz, Tournette, Aravis)</li>
                  <li>* Accumulation excentrique "gratuite" en courant normalement</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-zinc-200 text-sm mb-2">Ce que ca implique pour la muscu :</h4>
                <ul className="text-sm text-emerald-300 space-y-1">
                  <li>* <strong>1x/semaine suffit</strong></li>
                  <li>* La muscu est un COMPLEMENT, pas la base</li>
                  <li>* Focus sur les exercices que le terrain ne donne pas (Nordic curl, mollets)</li>
                </ul>
              </div>

              <div className="p-3 bg-zinc-900/50 rounded-lg">
                <span className="text-xs text-zinc-500">D- hebdo "naturel"</span>
                <span className="font-mono text-emerald-400 font-semibold block">1000-2000m</span>
              </div>
            </div>
          </div>

          {/* Paris */}
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6">
            <h3 className="font-semibold text-red-400 mb-4">Si tu t'entraines a Paris (plat)</h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-zinc-200 text-sm mb-2">Ce que le terrain NE t'apporte PAS :</h4>
                <ul className="text-sm text-zinc-400 space-y-1">
                  <li>* Quasi aucun denivele naturel</li>
                  <li>* Pas de descentes techniques</li>
                  <li>* Zero accumulation excentrique en courant normalement</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-zinc-200 text-sm mb-2">Ce que ca implique pour la muscu :</h4>
                <ul className="text-sm text-red-300 space-y-1">
                  <li>* <strong>2x/semaine OBLIGATOIRE</strong> janvier-avril</li>
                  <li>* La muscu est LA BASE de ta preparation excentrique</li>
                  <li>* Tous les exercices sont critiques (pas de "bonus")</li>
                  <li>* Chercher les rares deniveles : Montmartre, Buttes-Chaumont...</li>
                </ul>
              </div>

              <div className="p-3 bg-zinc-900/50 rounded-lg">
                <span className="text-xs text-zinc-500">D- hebdo "naturel"</span>
                <span className="font-mono text-red-400 font-semibold block">50-100m</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 mt-6">
          <h4 className="font-semibold text-orange-400 mb-3">Le message cle</h4>
          <p className="text-base-lg text-zinc-300 leading-relaxed">
            Ton terrain definit ta strategie.
          </p>
          <p className="text-sm text-zinc-400 mt-3">
            <strong className="text-emerald-400">A Annecy :</strong> le terrain fait le travail, la muscu complete.
          </p>
          <p className="text-sm text-zinc-400 mt-1">
            <strong className="text-red-400">A Paris :</strong> la muscu fait le travail, le terrain complete (quand tu peux).
          </p>
          <p className="text-sm text-orange-300 mt-4 font-semibold">
            Adapte la frequence muscu a ton terrain reel, pas a un plan generique.
          </p>
        </div>
      </section>

      {/* Section 8: Ce qu'il faut retenir */}
      <section>
        <SectionHeader kicker="Conclusion" title="Les 5 principes" />

        <div className="space-y-6 mt-6">
          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">1</span>
              <h3 className="font-semibold text-zinc-100">Le tempo est roi</h3>
            </div>
            <p className="text-base-lg text-zinc-400 leading-relaxed">
              5 secondes de descente, pas 3. Sinon c'est du squat classique.
            </p>
            <p className="text-sm text-zinc-300 mt-3">
              Le tempo lent force le controle neuromusculaire. C'est ce qui construit le Repeated Bout Effect.
              <strong className="text-orange-400"> Si tu ne peux plus tenir 5s, baisse la charge -- ne triche pas sur le tempo.</strong>
            </p>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">2</span>
              <h3 className="font-semibold text-zinc-100">La charge vient apres le controle</h3>
            </div>
            <p className="text-base-lg text-zinc-400 leading-relaxed">
              Maitrise le mouvement poids de corps avant d'ajouter des kilos.
            </p>
            <p className="text-sm text-zinc-300 mt-3">
              Un squat a 40kg avec tempo 3s = moins efficace qu'un squat poids de corps avec tempo 5s parfait.
              <strong className="text-zinc-200"> La qualite prime sur la quantite.</strong>
            </p>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">3</span>
              <h3 className="font-semibold text-zinc-100">Les DOMS sont normaux</h3>
            </div>
            <p className="text-base-lg text-zinc-400 leading-relaxed">
              48-96h de quads douloureux apres les premieres seances = le programme fonctionne.
            </p>
            <p className="text-sm text-zinc-300 mt-3">
              Ne pas paniquer. Ne pas abandonner. L'intensite des DOMS diminue drastiquement apres 3-4 semaines grace au RBE.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">4</span>
              <h3 className="font-semibold text-zinc-100">Moins de volume en approche course</h3>
            </div>
            <p className="text-base-lg text-zinc-400 leading-relaxed">
              Derniere seance lourde J-14. Le Repeated Bout Effect dure plusieurs semaines.
            </p>
            <p className="text-sm text-zinc-300 mt-3">
              Tu n'as pas besoin de "maintenir" jusqu'a J-1. Les adaptations sont stables.
              <strong className="text-zinc-200"> Mieux vaut arriver frais que fatigue.</strong>
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">5</span>
              <h3 className="font-semibold text-emerald-100">Le terrain reste prioritaire</h3>
            </div>
            <p className="text-base-lg text-zinc-400 leading-relaxed">
              La muscu ne remplace pas les vraies descentes. C'est un complement.
            </p>
            <p className="text-sm text-emerald-300 mt-3 font-semibold">
              Si tu dois choisir entre une seance muscu et une sortie longue avec denivele, choisis le terrain. La specificite prime.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export const MuscuTab = memo(MuscuTabComponent)
