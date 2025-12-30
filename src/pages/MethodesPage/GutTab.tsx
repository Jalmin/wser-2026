import { memo } from 'react'
import { SectionHeader } from '../../components/shared'

function GutTabComponent() {
  return (
    <div className="space-y-12">
      {/* Introduction */}
      <section>
        <p className="prose-magazine leading-relaxed">
          Ton systeme digestif n'est pas concu pour absorber 100g de glucides par heure. Un repas riche en glucides
          delivre 60-80g sur 2-3 heures de digestion. Demander a ton intestin d'absorber cette quantite en une heure,
          pendant 20 heures, sous 40C, avec 80% de ton sang redirige vers les muscles et la peau -- c'est une
          contrainte physiologique majeure.
        </p>
        <p className="prose-magazine leading-relaxed mt-4">
          Si tu essaies le jour J sans preparation, c'est la GI distress garantie : <strong className="text-red-400">nausees,
          vomissements, diarrhee = marche forcee ou DNF.</strong>
        </p>

        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 mt-6">
          <h3 className="font-semibold text-emerald-400 mb-3">La bonne nouvelle</h3>
          <p className="text-base-lg text-zinc-300 leading-relaxed">
            Ton intestin s'adapte. Les transporteurs qui font passer les glucides vers le sang sont des proteines
            dont l'expression peut etre modulee. C'est le principe du gut training : exposer regulierement ton
            systeme digestif a des charges croissantes pour augmenter sa capacite d'absorption.
          </p>
          <p className="text-base-lg text-zinc-300 leading-relaxed mt-3">
            Comme les muscles, ton systeme digestif s'adapte. En entrainant progressivement, tu peux
            <strong className="text-emerald-400"> doubler ta capacite d'absorption</strong>.
          </p>
        </div>
      </section>

      {/* Section 2: L'equation - Trois transporteurs */}
      <section>
        <SectionHeader kicker="L'equation" title="Trois transporteurs, deux voies" />

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* SGLT1 */}
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-bold text-lg">S</span>
              </div>
              <div>
                <h3 className="font-semibold text-blue-400">SGLT1</h3>
                <span className="text-xs text-zinc-500">Le transporteur du glucose</span>
              </div>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Proteine de la membrane intestinale qui utilise le gradient de sodium pour faire entrer le glucose.
            </p>
            <div className="flex justify-between items-center p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-sm text-zinc-400">Capacite maximale</span>
              <span className="font-mono text-blue-400 font-semibold">~60g/h (1.0g/min)</span>
            </div>
            <p className="text-xs text-zinc-500 mt-3 italic">
              Au-dela, saturation -&gt; accumulation dans l'intestin -&gt; appel d'eau osmotique -&gt; ballonnements, crampes, diarrhee.
            </p>
          </div>

          {/* GLUT5 */}
          <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-purple-400 font-bold text-lg">G</span>
              </div>
              <div>
                <h3 className="font-semibold text-purple-400">GLUT5</h3>
                <span className="text-xs text-zinc-500">La voie parallele du fructose</span>
              </div>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Transporteur independant, specifique au fructose. Totalement separe du SGLT1.
            </p>
            <div className="flex justify-between items-center p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-sm text-zinc-400">Capacite maximale</span>
              <span className="font-mono text-purple-400 font-semibold">~30-40g/h (0.5-0.7g/min)</span>
            </div>
          </div>
        </div>

        {/* L'addition */}
        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 mt-6">
          <h3 className="font-semibold text-orange-400 mb-4">L'addition des deux voies</h3>
          <p className="text-base-lg text-zinc-300 leading-relaxed">
            Si tu satures le SGLT1 avec 60g/h de glucose <strong>ET</strong> que tu utilises le GLUT5 avec 30g/h de fructose
            -&gt; <span className="text-orange-400 font-semibold">90g/h sans surcharger aucun systeme</span>.
          </p>
          <p className="text-sm text-zinc-400 mt-3">
            C'est pourquoi tous les produits modernes contiennent un melange glucose + fructose.
          </p>

          {/* Schema conceptuel */}
          <div className="mt-6 p-4 bg-zinc-900/50 rounded-lg font-mono text-sm">
            <pre className="text-center text-zinc-400">
{`                INTESTIN
                   |
    +--------------+--------------+
    |              |              |
    v              |              v
 `}<span className="text-blue-400">SGLT1</span>{`           |           `}<span className="text-purple-400">GLUT5</span>{`
`}<span className="text-blue-400">(glucose)</span>{`         |         `}<span className="text-purple-400">(fructose)</span>{`
`}<span className="text-blue-400">60g/h max</span>{`         |         `}<span className="text-purple-400">30-40g/h max</span>{`
    |              |              |
    +--------------+--------------+
                   |
                   v
                 SANG
               `}<span className="text-orange-400 font-semibold">= 90g/h</span>
            </pre>
          </div>
        </div>
      </section>

      {/* Section 3: Le ratio glucose:fructose */}
      <section>
        <SectionHeader kicker="Les ratios" title="Glucose:Fructose -- Comparatif" />

        <div className="overflow-x-auto mt-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Ratio</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Produits</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Logique</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Efficacite</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-mono text-orange-400 font-semibold">2:1</td>
                <td className="py-4 px-4 text-zinc-300">Tailwind, TA Energy</td>
                <td className="py-4 px-4 text-zinc-400">Proportionnel a la capacite des transporteurs (60:30)</td>
                <td className="py-4 px-4 text-zinc-400">62% oxydation</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20 bg-emerald-500/5">
                <td className="py-4 px-4 font-mono text-emerald-400 font-semibold">1:0.8</td>
                <td className="py-4 px-4 text-zinc-300">SIS Beta Fuel, Nduranz</td>
                <td className="py-4 px-4 text-zinc-400">GLUT5 sous-utilise en 2:1, on augmente le fructose</td>
                <td className="py-4 px-4 text-emerald-400 font-semibold">74% oxydation (+17%)</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-mono text-cyan-400 font-semibold">0.8:1</td>
                <td className="py-4 px-4 text-zinc-300">Maurten</td>
                <td className="py-4 px-4 text-zinc-400">Fructose metabolise par le foie -&gt; flux d'energie plus stable</td>
                <td className="py-4 px-4 text-zinc-400">~72% oxydation</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6 mt-6">
          <h4 className="font-semibold text-zinc-200 mb-3">En pratique</h4>
          <p className="text-base-lg text-zinc-400 leading-relaxed">
            La difference entre ces ratios est de 5-10%. Ce qui compte vraiment, c'est :
          </p>
          <ol className="list-decimal list-inside mt-3 space-y-2 text-zinc-300">
            <li>Utiliser un produit avec les <strong>DEUX</strong> types de glucides</li>
            <li>Maintenir la <strong>regularite</strong> du gut training</li>
          </ol>
          <p className="text-sm text-zinc-500 mt-4 italic">
            Ne te prends pas la tete sur les ratios. Assure-toi que tes produits contiennent glucose ET fructose, et reste consistant.
          </p>
        </div>
      </section>

      {/* Section 4: Les adaptations physiologiques */}
      <section>
        <SectionHeader kicker="Adaptations" title="Timeline physiologique" />

        <div className="overflow-x-auto mt-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Adaptation</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Mecanisme</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Delai</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Gain</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">Microbiote</td>
                <td className="py-4 px-4 text-zinc-400">Shift vers bacteries moins fermentatives</td>
                <td className="py-4 px-4 font-mono text-cyan-400">1-2 sem</td>
                <td className="py-4 px-4 text-zinc-400">Moins de gaz</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">Vidange gastrique</td>
                <td className="py-4 px-4 text-zinc-400">Estomac detecte mieux la composition, ajuste le debit</td>
                <td className="py-4 px-4 font-mono text-cyan-400">2-4 sem</td>
                <td className="py-4 px-4 text-emerald-400">+20-30% debit</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20 bg-blue-500/5">
                <td className="py-4 px-4 font-semibold text-blue-400">Transporteurs SGLT1</td>
                <td className="py-4 px-4 text-zinc-400">Upregulation expression genique</td>
                <td className="py-4 px-4 font-mono text-cyan-400">4-6 sem</td>
                <td className="py-4 px-4 text-emerald-400 font-semibold">+30-50% densite</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20 bg-purple-500/5">
                <td className="py-4 px-4 font-semibold text-purple-400">Transporteurs GLUT5</td>
                <td className="py-4 px-4 text-zinc-400">Idem, plus rapide</td>
                <td className="py-4 px-4 font-mono text-cyan-400">2-4 sem</td>
                <td className="py-4 px-4 text-emerald-400 font-semibold">+40-60% densite</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 mt-6">
          <h4 className="font-semibold text-orange-400 mb-3">Capacite finale</h4>
          <p className="text-base-lg text-zinc-300 leading-relaxed">
            Un systeme entraine peut atteindre <span className="text-orange-400 font-semibold">120-130g/h</span> vs 90g/h non-entraine.
          </p>
          <p className="text-sm text-zinc-400 mt-3">
            Mais ca prend <strong>12-16 semaines</strong> d'exposition reguliere. C'est pourquoi le gut training commence des janvier, pas en mai.
          </p>
        </div>
      </section>

      {/* Section 5: Tes produits */}
      <section>
        <SectionHeader kicker="Produits" title="Valeurs de reference" />

        <div className="overflow-x-auto mt-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Produit</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">CHO/unite</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Ratio</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Usage optimal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">TA Energy gel</td>
                <td className="py-4 px-4 font-mono text-orange-400">33g</td>
                <td className="py-4 px-4 text-zinc-400">2:1</td>
                <td className="py-4 px-4 text-zinc-400">Cheval de bataille sorties &lt;4h</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">Maurten 160</td>
                <td className="py-4 px-4 font-mono text-orange-400">40g</td>
                <td className="py-4 px-4 text-zinc-400">0.8:1</td>
                <td className="py-4 px-4 text-zinc-400">Haute charge, sorties &gt;3h</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">Naak puree</td>
                <td className="py-4 px-4 font-mono text-orange-400">26g</td>
                <td className="py-4 px-4 text-zinc-400">~2:1</td>
                <td className="py-4 px-4 text-zinc-400">Variete sale/sucre, confort mental</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">Tailwind Endurance</td>
                <td className="py-4 px-4 font-mono text-orange-400">50g/500ml</td>
                <td className="py-4 px-4 text-zinc-400">2:1</td>
                <td className="py-4 px-4 text-zinc-400">Habituation boisson, phases 1-2</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20 bg-orange-500/5">
                <td className="py-4 px-4 font-semibold text-orange-400">Tailwind High Carb</td>
                <td className="py-4 px-4 font-mono text-orange-400 font-semibold">90g/500ml</td>
                <td className="py-4 px-4 text-zinc-400">2:1</td>
                <td className="py-4 px-4 text-orange-300">Simulations WSER, phases 3-4</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6 mt-6">
          <h4 className="font-semibold text-zinc-200 mb-4">Configuration standard</h4>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between p-3 bg-zinc-800/30 rounded-lg">
              <span className="text-zinc-400">Capacite</span>
              <span className="font-mono text-zinc-200">2x 500ml</span>
            </div>
            <div className="flex justify-between p-3 bg-zinc-800/30 rounded-lg">
              <span className="text-zinc-400">Autonomie</span>
              <span className="font-mono text-zinc-200">~2h entre ravitos</span>
            </div>
            <div className="flex justify-between p-3 bg-zinc-800/30 rounded-lg">
              <span className="text-zinc-400">Configuration</span>
              <span className="font-mono text-zinc-200">1 Tailwind + 1 eau</span>
            </div>
            <div className="flex justify-between p-3 bg-zinc-800/30 rounded-lg">
              <span className="text-zinc-400">Apport boisson/2h</span>
              <span className="font-mono text-orange-400">High Carb = 90g</span>
            </div>
          </div>
          <p className="text-sm text-zinc-400 mt-4">
            <strong className="text-zinc-300">Donc :</strong> la boisson apporte 45g/h (High Carb) ou 25g/h (Endurance). Le reste vient des gels.
          </p>
        </div>
      </section>

      {/* Section 6: Plan 24 semaines */}
      <section>
        <SectionHeader kicker="Protocole" title="Progression -- Plan 24 semaines" />

        <div className="overflow-x-auto mt-6">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-zinc-300">Semaines</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-zinc-300">Duree</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-zinc-300">Cible</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-zinc-300">Timer</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-zinc-300 hidden lg:table-cell">Protocole concret</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-2 sm:px-4 font-mono text-cyan-400">S1-S4</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400">2h-2h30</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-orange-400">40-50g/h</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400">30min</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-500 hidden lg:table-cell">3x TA (99g) ou 2x TA + 1 Tailwind Endurance (116g)</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-2 sm:px-4 font-mono text-cyan-400">S5-S8</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400">2h30-3h</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-orange-400">50-60g/h</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400">25min</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-500 hidden lg:table-cell">4x TA + 1 Naak (158g) ou 2x Tailwind Endurance + 1x TA (133g)</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-2 sm:px-4 font-mono text-cyan-400">S9-S12</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400">3h-3h30</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-orange-400">60-70g/h</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400">25min</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-500 hidden lg:table-cell">3x Maurten 160 + 3x TA (219g)</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-2 sm:px-4 font-mono text-cyan-400">S13-S16</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400">3h30-4h</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-orange-400">70-80g/h</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400">20min</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-500 hidden lg:table-cell">4x TA + 3x Maurten 160 + 1 Naak (278g)</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20 bg-orange-500/5">
                <td className="py-4 px-2 sm:px-4 font-mono text-orange-400 font-semibold">S17-S20</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-300">4h-5h</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-orange-400 font-semibold">80-100g/h</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-300">20min</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400 hidden lg:table-cell">4x High Carb + 4x TA (492g)</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-2 sm:px-4 font-mono text-cyan-400">S21-S24</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400">3h-4h (taper)</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-orange-400">80-90g/h</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400">20min</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-500 hidden lg:table-cell">6x Maurten 160 (240g) ou 3x High Carb (270g)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-6 mt-6">
          <h4 className="font-semibold text-yellow-400 mb-3">Regles d'ajustement</h4>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>* Si ballonnements &gt;6/10 -&gt; <strong>Reduire de 10g/h</strong> la semaine suivante, privilegier liquides</li>
            <li>* Si nausees repetees -&gt; Verifier dilution (<strong>High Carb dans 750ml, pas 500ml</strong>)</li>
            <li>* Si crampes abdominales -&gt; Reduire fructose (<strong>passer sur TA plutot que Maurten</strong>)</li>
          </ul>
        </div>
      </section>

      {/* Section 7: Courses jalons */}
      <section>
        <SectionHeader kicker="Courses jalons" title="Protocoles detailles" />

        {/* Vue d'ensemble */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Course</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Duree</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Objectif</th>
                <th className="text-left py-3 px-4 font-semibold text-zinc-300">Cible</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">Arc of Attrition</td>
                <td className="py-4 px-4 text-zinc-400">25 jan</td>
                <td className="py-4 px-4 font-mono text-zinc-400">24h</td>
                <td className="py-4 px-4 text-zinc-400">Test endurance</td>
                <td className="py-4 px-4 font-mono text-orange-400">60-70g/h</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-4 font-semibold text-zinc-200">Ultra Sainte Baume</td>
                <td className="py-4 px-4 text-zinc-400">1 mars</td>
                <td className="py-4 px-4 font-mono text-zinc-400">9h</td>
                <td className="py-4 px-4 text-zinc-400">Validation 80-100g/h</td>
                <td className="py-4 px-4 font-mono text-orange-400">80-100g/h</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20 bg-orange-500/5">
                <td className="py-4 px-4 font-semibold text-orange-400">THP 120</td>
                <td className="py-4 px-4 text-zinc-300">15-16 mai</td>
                <td className="py-4 px-4 font-mono text-zinc-300">16h</td>
                <td className="py-4 px-4 text-orange-300 font-semibold">Dress Rehearsal</td>
                <td className="py-4 px-4 font-mono text-orange-400 font-semibold">90-110g/h</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Arc of Attrition */}
        <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs font-semibold text-zinc-400">25 JAN</span>
            <h3 className="headline-lg text-zinc-100">Arc of Attrition</h3>
            <span className="text-sm text-zinc-500">-- Test endurance (60-70g/h)</span>
          </div>
          <p className="text-sm text-zinc-400 mb-4">
            <strong className="text-zinc-300">Objectif :</strong> Valider la capacite a maintenir un apport regulier sur 24h, sans pousser les quantites.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-zinc-800/30 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Configuration</span>
              <span className="text-sm text-zinc-300">1 gourde Tailwind Endurance (50g) + 1 gourde eau</span>
            </div>
            <div className="p-3 bg-zinc-800/30 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Gels</span>
              <span className="text-sm text-zinc-300">1x TA gel par heure</span>
            </div>
            <div className="p-3 bg-zinc-800/30 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Total/bloc 2h</span>
              <span className="text-sm font-mono text-orange-400">50g + 66g = 116g = 58g/h</span>
            </div>
            <div className="p-3 bg-zinc-800/30 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Total 24h</span>
              <span className="text-sm font-mono text-orange-400">~1600g = 67g/h moyenne</span>
            </div>
          </div>
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
            <h4 className="font-semibold text-cyan-400 text-sm mb-2">Focus</h4>
            <ul className="text-sm text-zinc-400 space-y-1">
              <li>* Timer 30min (plus conservateur)</li>
              <li>* Priorite : <strong className="text-zinc-300">regularite, pas volume</strong></li>
              <li>* Noter toutes les sensations GI</li>
              <li>* Pas d'objectif chrono -- course test</li>
            </ul>
          </div>
        </div>

        {/* Ultra Sainte Baume */}
        <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs font-semibold text-zinc-400">1 MARS</span>
            <h3 className="headline-lg text-zinc-100">Ultra Sainte Baume</h3>
            <span className="text-sm text-zinc-500">-- Validation 80-100g/h</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div className="p-3 bg-zinc-800/30 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Cible/2h</span>
              <span className="text-sm font-mono text-orange-400">160-200g</span>
            </div>
            <div className="p-3 bg-zinc-800/30 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Apport boisson</span>
              <span className="text-sm text-zinc-300">1x High Carb = 90g</span>
            </div>
            <div className="p-3 bg-zinc-800/30 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Manque</span>
              <span className="text-sm text-zinc-300">70-110g -&gt; 3-4 gels/bloc</span>
            </div>
          </div>

          <h4 className="font-semibold text-zinc-200 text-sm mb-3 mt-6">Protocole bloc type 2h</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">Timing</th>
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">Action</th>
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">CHO</th>
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">Cumule</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 font-mono text-cyan-400">Ravito</td>
                  <td className="py-2 px-3 text-zinc-400">Remplir 1x High Carb + 1x eau</td>
                  <td className="py-2 px-3 text-zinc-500">--</td>
                  <td className="py-2 px-3 text-zinc-500">--</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 font-mono text-cyan-400">+20min</td>
                  <td className="py-2 px-3 text-zinc-400">Boire + 1x TA</td>
                  <td className="py-2 px-3 font-mono text-orange-400">33g</td>
                  <td className="py-2 px-3 font-mono text-zinc-300">33g</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 font-mono text-cyan-400">+40min</td>
                  <td className="py-2 px-3 text-zinc-400">Boire</td>
                  <td className="py-2 px-3 text-zinc-500">--</td>
                  <td className="py-2 px-3 text-zinc-500">--</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 font-mono text-cyan-400">+60min</td>
                  <td className="py-2 px-3 text-zinc-400">Boire + 1x Maurten 160</td>
                  <td className="py-2 px-3 font-mono text-orange-400">40g</td>
                  <td className="py-2 px-3 font-mono text-zinc-300">73g</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 font-mono text-cyan-400">+80min</td>
                  <td className="py-2 px-3 text-zinc-400">Boire</td>
                  <td className="py-2 px-3 text-zinc-500">--</td>
                  <td className="py-2 px-3 text-zinc-500">--</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 font-mono text-cyan-400">+100min</td>
                  <td className="py-2 px-3 text-zinc-400">Boire + 1x TA</td>
                  <td className="py-2 px-3 font-mono text-orange-400">33g</td>
                  <td className="py-2 px-3 font-mono text-zinc-300">106g</td>
                </tr>
                <tr className="border-b border-zinc-700 bg-orange-500/5">
                  <td className="py-2 px-3 font-mono text-orange-400 font-semibold">Total</td>
                  <td className="py-2 px-3 text-zinc-300">High Carb (90g) + 2x TA + 1x M160</td>
                  <td className="py-2 px-3 font-mono text-orange-400 font-semibold">196g</td>
                  <td className="py-2 px-3 font-mono text-orange-400 font-semibold">98g/h</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-zinc-400 mt-4">
            <strong>Sur 9h :</strong> 4.5 blocs = ~880g = <span className="text-orange-400 font-semibold">98g/h</span>
          </p>
        </div>

        {/* THP 120 */}
        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-orange-500/20 rounded-full text-xs font-semibold text-orange-400">15-16 MAI</span>
            <h3 className="headline-lg text-orange-100">THP 120</h3>
            <span className="text-sm text-orange-300">-- Dress Rehearsal (90-110g/h)</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div className="p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Cible/2h</span>
              <span className="text-sm font-mono text-orange-400">180-220g</span>
            </div>
            <div className="p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Apport boisson</span>
              <span className="text-sm text-zinc-300">1x High Carb = 90g</span>
            </div>
            <div className="p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Manque</span>
              <span className="text-sm text-zinc-300">90-130g -&gt; 3-4 gels/bloc</span>
            </div>
          </div>

          <h4 className="font-semibold text-zinc-200 text-sm mb-3 mt-6">Protocole bloc type 2h</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">Timing</th>
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">Action</th>
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">CHO</th>
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">Cumule</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 font-mono text-cyan-400">Ravito</td>
                  <td className="py-2 px-3 text-zinc-400">Remplir 1x High Carb + 1x eau</td>
                  <td className="py-2 px-3 text-zinc-500">--</td>
                  <td className="py-2 px-3 text-zinc-500">--</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 font-mono text-cyan-400">+20min</td>
                  <td className="py-2 px-3 text-zinc-400">Boire + 1x Maurten 160</td>
                  <td className="py-2 px-3 font-mono text-orange-400">40g</td>
                  <td className="py-2 px-3 font-mono text-zinc-300">40g</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 font-mono text-cyan-400">+40min</td>
                  <td className="py-2 px-3 text-zinc-400">Boire</td>
                  <td className="py-2 px-3 text-zinc-500">--</td>
                  <td className="py-2 px-3 text-zinc-500">--</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 font-mono text-cyan-400">+60min</td>
                  <td className="py-2 px-3 text-zinc-400">Boire + 1x Maurten 160</td>
                  <td className="py-2 px-3 font-mono text-orange-400">40g</td>
                  <td className="py-2 px-3 font-mono text-zinc-300">80g</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 font-mono text-cyan-400">+80min</td>
                  <td className="py-2 px-3 text-zinc-400">Boire</td>
                  <td className="py-2 px-3 text-zinc-500">--</td>
                  <td className="py-2 px-3 text-zinc-500">--</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 font-mono text-cyan-400">+100min</td>
                  <td className="py-2 px-3 text-zinc-400">Boire + 1x TA ou Naak</td>
                  <td className="py-2 px-3 font-mono text-orange-400">33g/26g</td>
                  <td className="py-2 px-3 font-mono text-zinc-300">113g</td>
                </tr>
                <tr className="border-b border-zinc-700 bg-orange-500/10">
                  <td className="py-2 px-3 font-mono text-orange-400 font-semibold">Total</td>
                  <td className="py-2 px-3 text-zinc-300">High Carb (90g) + 2x M160 + 1x TA</td>
                  <td className="py-2 px-3 font-mono text-orange-400 font-semibold">203g</td>
                  <td className="py-2 px-3 font-mono text-orange-400 font-semibold">101g/h</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-zinc-300 mt-4">
            <strong>Variante haute (110g/h) :</strong> ajouter 1x Naak au milieu du bloc = 229g = 114g/h
          </p>
          <p className="text-sm text-zinc-300 mt-2">
            <strong>Sur 16h :</strong> 8 blocs = ~1650g = <span className="text-orange-400 font-semibold">103g/h</span>
          </p>

          <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 mt-6">
            <h4 className="font-semibold text-red-400 text-sm mb-2">Focus THP -- CRITIQUE</h4>
            <ul className="text-sm text-zinc-300 space-y-1">
              <li>* <strong>EXACT</strong> meme protocole que WSER jour J</li>
              <li>* <strong>EXACT</strong> meme matos (gourdes, poches, timer)</li>
              <li>* <strong>EXACT</strong> meme produits</li>
              <li>* Valider que 100+g/h passe sur 16h</li>
              <li>* <strong className="text-red-400">ZERO SURPRISE apres THP</strong></li>
            </ul>
          </div>
        </div>

        {/* Check-list ravito */}
        <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6 mt-6">
          <h4 className="font-semibold text-zinc-200 mb-4">Check-list ravito type (THP/USB)</h4>
          <p className="text-xs text-zinc-500 mb-4">A chaque ravito (~toutes les 2h) :</p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-300">
            <li>Vider/rincer gourde Tailwind</li>
            <li>Remplir 1x High Carb (1 sachet 90g dans 500ml)</li>
            <li>Remplir/completer gourde eau claire</li>
            <li>Recharger poches : 2x Maurten 160 + 1x TA + 1x Naak (optionnel)</li>
            <li>Timer reset si besoin</li>
            <li><strong className="text-orange-400">Temps max : 2-3 min</strong></li>
          </ol>
        </div>
      </section>

      {/* Section 8: Strategie WSER Jour J */}
      <section>
        <SectionHeader kicker="Jour J" title="Strategie WSER -- Par section" />

        {/* Vue d'ensemble */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-zinc-300">Section</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-zinc-300">Km</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-zinc-300">Duree</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-zinc-300">Contrainte</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-zinc-300">Cible</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-2 sm:px-4 font-semibold text-blue-400">High Country</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-zinc-400">0-50</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400">0-6h</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-500">Altitude -&gt; digestion ralentie</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-orange-400">50-60g/h</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-2 sm:px-4 font-semibold text-red-400">Canyons</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-zinc-400">50-100</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400">6-12h</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-500">35-45C -&gt; flux sanguin reduit</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-orange-400">60-80g/h</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20 bg-emerald-500/5">
                <td className="py-4 px-2 sm:px-4 font-semibold text-emerald-400">California Loop</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-zinc-400">100-128</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400">12-16h</td>
                <td className="py-4 px-2 sm:px-4 text-emerald-300">Fenetre d'opportunite</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-orange-400 font-semibold">90-100g/h</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20 bg-orange-500/5">
                <td className="py-4 px-2 sm:px-4 font-semibold text-orange-400">Final Push</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-zinc-400">128-161</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400">16-20h</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-500">Nuit, frais, fatigue</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-orange-400 font-semibold">100-110g/h</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Graphique ASCII */}
        <div className="rounded-xl border border-zinc-700 bg-zinc-900/50 p-6 mt-6 font-mono text-xs sm:text-sm overflow-x-auto">
          <h4 className="font-semibold text-zinc-300 mb-4 font-sans">Progression CHO/h</h4>
          <pre className="text-zinc-400">
{`CHO/h
110 -|                                          `}<span className="text-orange-400">########</span>{`
100 -|                              `}<span className="text-emerald-400">############</span>{`
 90 -|                              #
 80 -|                    `}<span className="text-red-400">##########</span>{`
 70 -|                    #
 60 -|          `}<span className="text-blue-400">##########</span>{`
 50 -|`}<span className="text-blue-400">##########</span>{`
     +------------------------------------------------------
      0    50km       100km       128km      161km
         High Country  Canyons    Cal Loop   Final`}
          </pre>
        </div>

        {/* High Country */}
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-500/20 rounded-full text-xs font-semibold font-mono text-blue-400">0-50km</span>
            <h3 className="headline-lg text-blue-100">High Country</h3>
            <span className="text-sm text-blue-300">-- Prudence altitude</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Cible</span>
              <span className="text-sm font-mono text-orange-400">50-60g/h</span>
            </div>
            <div className="p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Forme</span>
              <span className="text-sm text-zinc-300">80% liquide</span>
            </div>
            <div className="p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Timer</span>
              <span className="text-sm text-zinc-300">25min</span>
            </div>
            <div className="p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Produits</span>
              <span className="text-sm text-zinc-300">Tailwind Endurance dilue + eau</span>
            </div>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            L'altitude reduit le flux sanguin intestinal de 20-30%. La vidange gastrique ralentit.
            Si tu forces 90g/h en High Country, tu accumules dans l'estomac -&gt; nausees garanties dans les canyons.
          </p>
          <p className="text-sm text-zinc-300 mt-3 italic">
            Economise ton systeme digestif pour quand tu en auras vraiment besoin (post-Foresthill).
          </p>
          <div className="mt-4 p-3 bg-zinc-900/50 rounded-lg text-sm">
            <strong className="text-zinc-300">Total 6h :</strong> 3x Endurance + 3x Maurten 100 = 225g + gels = <span className="text-orange-400">~55g/h</span>
          </div>
        </div>

        {/* Canyons */}
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-red-500/20 rounded-full text-xs font-semibold font-mono text-red-400">50-100km</span>
            <h3 className="headline-lg text-red-100">Canyons</h3>
            <span className="text-sm text-red-300">-- Survie thermique</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Cible</span>
              <span className="text-sm font-mono text-orange-400">60-80g/h</span>
            </div>
            <div className="p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Forme</span>
              <span className="text-sm text-zinc-300">Liquide dominant</span>
            </div>
            <div className="p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Timer</span>
              <span className="text-sm text-zinc-300">20min</span>
            </div>
            <div className="p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Cooling</span>
              <span className="text-sm text-zinc-300">Glace casquette/nuque</span>
            </div>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            En chaleur extreme (35-45C), ton corps redirige le sang vers la peau pour evacuer la chaleur.
            Le flux sanguin intestinal chute de <strong className="text-red-400">50 a 80%</strong>. Forcer l'ingestion = accumulation -&gt; GI distress.
          </p>
          <p className="text-sm text-red-300 mt-3 font-semibold">
            La priorite est la survie thermique, pas l'apport calorique. 65g/h qui passent valent mieux que 100g/h qui ressortent.
          </p>
          <div className="mt-4 p-3 bg-zinc-900/50 rounded-lg text-sm">
            <strong className="text-zinc-300">Total bloc 2h :</strong> 1x High Carb (90g) + 1x Maurten 160 (40g) = 130g = <span className="text-orange-400">65g/h</span>
          </div>
        </div>

        {/* California Loop */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-emerald-500/20 rounded-full text-xs font-semibold font-mono text-emerald-400">100-128km</span>
            <h3 className="headline-lg text-emerald-100">California Loop</h3>
            <span className="text-sm text-emerald-300">-- Relance</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Cible</span>
              <span className="text-sm font-mono text-orange-400 font-semibold">90-100g/h</span>
            </div>
            <div className="p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Forme</span>
              <span className="text-sm text-zinc-300">Mix liquide/solide</span>
            </div>
            <div className="p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Timer</span>
              <span className="text-sm text-zinc-300">20min strict</span>
            </div>
          </div>
          <div className="pull-quote my-6">
            "The race starts at mile 62."
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            La temperature redescend apres Foresthill. Ton systeme digestif recupere de la fournaise des canyons.
            C'est la <strong className="text-emerald-400">fenetre d'opportunite</strong> pour maximiser l'apport.
          </p>
          <p className="text-sm text-emerald-300 mt-3 font-semibold">
            Les coureurs qui passent sub-20h sont ceux qui RELANCENT la nutrition ici, pas ceux qui continuent a 60g/h.
          </p>
          <div className="mt-4 p-3 bg-zinc-900/50 rounded-lg text-sm">
            <strong className="text-zinc-300">Total bloc 2h :</strong> High Carb (90g) + 2x Maurten 160 (80g) + Naak (26g) = 196g = <span className="text-orange-400 font-semibold">98g/h</span>
          </div>
        </div>

        {/* Final Push */}
        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-orange-500/20 rounded-full text-xs font-semibold font-mono text-orange-400">128-161km</span>
            <h3 className="headline-lg text-orange-100">Final Push</h3>
            <span className="text-sm text-orange-300">-- Tout ce qui passe</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Cible</span>
              <span className="text-sm font-mono text-orange-400 font-semibold">100-110g/h</span>
            </div>
            <div className="p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Forme</span>
              <span className="text-sm text-zinc-300">Ce qui passe</span>
            </div>
            <div className="p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Timer</span>
              <span className="text-sm text-zinc-300">20min non-negociable</span>
            </div>
            <div className="p-3 bg-zinc-900/50 rounded-lg">
              <span className="text-xs text-zinc-500 block mb-1">Backup</span>
              <span className="text-sm text-zinc-300">Coca dilue ravitos</span>
            </div>
          </div>
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 mt-4">
            <h4 className="font-semibold text-red-400 text-sm mb-2">Regle absolue</h4>
            <p className="text-sm text-zinc-200 font-semibold">Ne JAMAIS arreter de manger.</p>
            <p className="text-sm text-zinc-400 mt-2">
              Meme 40g/h vaut mieux que 0. L'hypoglycemie a 15km de l'arrivee = marche forcee.
              Si les gels ne passent plus, Coca dilue. Si le Coca ne passe plus, soupe. Quelque chose doit rentrer.
            </p>
          </div>
          <div className="mt-4 p-3 bg-zinc-900/50 rounded-lg text-sm">
            <strong className="text-zinc-300">Total bloc 2h :</strong> High Carb (90g) + 2x Maurten 160 + 1x TA = 203g = <span className="text-orange-400 font-semibold">101g/h</span>
          </div>
        </div>
      </section>

      {/* Section 9: Tableau recap WSER */}
      <section>
        <SectionHeader kicker="Recap" title="Tableau WSER -- Postes crewed" />

        <div className="overflow-x-auto mt-6">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-zinc-300">Poste</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-zinc-300">Mile/Km</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-zinc-300">Gourde 1</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-zinc-300">Gels a charger</th>
                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-zinc-300">Temps max</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-2 sm:px-4 font-semibold text-zinc-200">Robinson Flat</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-zinc-400">30/48</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400">High Carb 90g</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400">2x M160 + 1x TA</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-orange-400">3min</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20 bg-orange-500/5">
                <td className="py-4 px-2 sm:px-4 font-semibold text-orange-400">Foresthill</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-zinc-300">62/100</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-300">High Carb 90g</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-300">2x M160 + 1x TA + 1x Naak</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-orange-400">5min</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                <td className="py-4 px-2 sm:px-4 font-semibold text-zinc-200">Highway 49</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-zinc-400">93/150</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400">High Carb 90g</td>
                <td className="py-4 px-2 sm:px-4 text-zinc-400">2x M160 + 1x TA + 1x Naak</td>
                <td className="py-4 px-2 sm:px-4 font-mono text-orange-400">3min</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Calcul total jour J */}
        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 mt-6">
          <h4 className="font-semibold text-orange-400 mb-4">Calcul total jour J</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">Section</th>
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">Duree</th>
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">CHO/h</th>
                  <th className="text-left py-2 px-3 font-semibold text-zinc-400">Total CHO</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 text-blue-400">High Country</td>
                  <td className="py-2 px-3 text-zinc-400">6h</td>
                  <td className="py-2 px-3 font-mono text-zinc-400">55g</td>
                  <td className="py-2 px-3 font-mono text-zinc-300">330g</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 text-red-400">Canyons</td>
                  <td className="py-2 px-3 text-zinc-400">6h</td>
                  <td className="py-2 px-3 font-mono text-zinc-400">65g</td>
                  <td className="py-2 px-3 font-mono text-zinc-300">390g</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 text-emerald-400">California Loop</td>
                  <td className="py-2 px-3 text-zinc-400">4h</td>
                  <td className="py-2 px-3 font-mono text-zinc-400">98g</td>
                  <td className="py-2 px-3 font-mono text-zinc-300">392g</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 text-orange-400">Final Push</td>
                  <td className="py-2 px-3 text-zinc-400">4h</td>
                  <td className="py-2 px-3 font-mono text-zinc-400">101g</td>
                  <td className="py-2 px-3 font-mono text-zinc-300">404g</td>
                </tr>
                <tr className="border-t border-zinc-600 bg-orange-500/10">
                  <td className="py-3 px-3 font-semibold text-orange-400">TOTAL</td>
                  <td className="py-3 px-3 font-semibold text-zinc-200">20h</td>
                  <td className="py-3 px-3 font-mono font-semibold text-orange-400">76g/h moy</td>
                  <td className="py-3 px-3 font-mono font-semibold text-orange-400">1516g</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 10: Les 5 regles non-negociables */}
      <section>
        <SectionHeader kicker="Regles" title="Les 5 regles non-negociables" />

        <div className="space-y-6 mt-6">
          {/* Regle 1 */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">1</span>
              <h3 className="font-semibold text-zinc-100">Timer 20 minutes -- Toujours</h3>
            </div>
            <p className="text-base-lg text-zinc-400 leading-relaxed">
              Les etudes montrent 20-30% de sous-estimation sans rappel. Apres 15h d'effort, tu "oublies".
            </p>
            <p className="text-sm text-zinc-300 mt-3">
              Un timer elimine cette variable. A 5:00/km sur plat, 20min = 4km. En montee a 10:00/km, 20min = 2km.
              Le timer compense automatiquement.
            </p>
            <p className="text-sm text-orange-400 mt-3 font-semibold">
              Met une alarme. Ne compte pas sur ta memoire.
            </p>
          </div>

          {/* Regle 2 */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">2</span>
              <h3 className="font-semibold text-zinc-100">Produits testes = produits jour J</h3>
            </div>
            <p className="text-base-lg text-zinc-400 leading-relaxed">
              Les transporteurs s'adaptent aux substrats specifiques. Changer de marque 2 semaines avant = risque inutile.
            </p>
            <p className="text-sm text-orange-400 mt-3 font-semibold">
              Apres THP, ZERO changement. Ce qui a marche sur 16h marchera sur 20h. Ce qui n'a pas ete teste sur 16h peut exploser sur 20h.
            </p>
          </div>

          {/* Regle 3 */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">3</span>
              <h3 className="font-semibold text-zinc-100">Adapter a la section, pas forcer la cible</h3>
            </div>
            <p className="text-base-lg text-zinc-400 leading-relaxed">
              60g/h dans les canyons vaut mieux que 100g/h avec vomissements a mile 70.
            </p>
            <p className="text-sm text-zinc-300 mt-3">
              La strategie par section existe pour une raison. L'altitude ralentit la digestion. La chaleur reduit le flux sanguin intestinal.
              Respecte les contraintes physiologiques de chaque section.
            </p>
          </div>

          {/* Regle 4 */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">4</span>
              <h3 className="font-semibold text-zinc-100">Documenter chaque sortie</h3>
            </div>
            <p className="text-base-lg text-zinc-400 leading-relaxed mb-3">
              Noter sur chaque sortie longue :
            </p>
            <ul className="text-sm text-zinc-300 space-y-1">
              <li>* Produit utilise</li>
              <li>* Quantite totale</li>
              <li>* Timing (timer respecte ?)</li>
              <li>* Score GI (1-10)</li>
              <li>* Energie percue</li>
            </ul>
            <p className="text-sm text-zinc-400 mt-3 italic">
              Ces donnees guident les ajustements. Un pattern de ballonnements a S8 identifie tot = corrige avant THP.
            </p>
          </div>

          {/* Regle 5 */}
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">5</span>
              <h3 className="font-semibold text-red-100">Recuperation post-probleme = protocole degrade</h3>
            </div>
            <p className="text-base-lg text-zinc-400 leading-relaxed mb-3">
              Si GI distress en course :
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-3 bg-zinc-900/50 rounded-lg">
                <span className="text-zinc-400">H+0 a H+1</span>
                <span className="font-mono text-red-400">0g (eau pure seulement)</span>
              </div>
              <div className="flex justify-between p-3 bg-zinc-900/50 rounded-lg">
                <span className="text-zinc-400">H+1 a H+2</span>
                <span className="font-mono text-yellow-400">20-30g/h (gels dilues ou coca)</span>
              </div>
              <div className="flex justify-between p-3 bg-zinc-900/50 rounded-lg">
                <span className="text-zinc-400">H+2 a finish</span>
                <span className="font-mono text-orange-400">50-60g/h max</span>
              </div>
            </div>
            <p className="text-sm text-red-400 mt-4 font-semibold">
              Ne JAMAIS reprendre la cible initiale apres un incident. Le systeme digestif a besoin de temps pour recuperer.
            </p>
          </div>
        </div>
      </section>

      {/* Section 11: Ce qu'il faut retenir */}
      <section>
        <SectionHeader kicker="Conclusion" title="Ce qu'il faut retenir" />

        <div className="space-y-6 mt-6">
          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <h3 className="font-semibold text-zinc-100 mb-4">La philosophie</h3>
            <p className="text-base-lg text-zinc-400 leading-relaxed">
              Le gut training n'est pas de la magie -- c'est de la <strong className="text-zinc-200">biologie cellulaire</strong>.
            </p>
            <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
              Tu augmentes la densite de transporteurs SGLT1 et GLUT5 par exposition repetee. Tu utilises les deux voies avec un ratio
              glucose:fructose approprie. Tu adaptes ta cible aux contraintes de chaque section.
            </p>
            <p className="text-sm text-zinc-300 mt-4 italic">
              L'objectif n'est pas de battre un record d'ingestion. C'est d'optimiser le flux d'energie vers tes muscles
              tout en preservant l'integrite de ta barriere intestinale.
            </p>
          </div>

          <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6">
            <h3 className="font-semibold text-orange-400 mb-4">L'enjeu pour WSER</h3>
            <p className="text-base-lg text-zinc-300 leading-relaxed">
              Sur WSER, la nutrition ne te fera pas gagner. Mais une nutrition mal geree peut te faire <strong className="text-red-400">perdre</strong>.
            </p>
            <p className="text-sm text-zinc-400 mt-4">
              Le gut training est une assurance : <strong className="text-zinc-300">6 mois de travail pour eliminer une variable d'echec le jour J.</strong>
            </p>
            <p className="text-sm text-orange-300 mt-4 font-semibold">
              Les finishers sub-20h ne sont pas ceux qui mangent le plus. Ce sont ceux qui mangent REGULIEREMENT, ADAPTE a chaque section, sans incident GI.
            </p>
          </div>

          <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-6">
            <h3 className="font-semibold text-cyan-400 mb-4">Conseils cles resumes</h3>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">*</span>
                <span><strong>Timer 20-25min</strong> -- Met une alarme, ne compte pas sur ta memoire</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">*</span>
                <span><strong>Note TOUT</strong> -- Quel produit, quelle quantite, comment tu te sens</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">*</span>
                <span><strong>Les memes produits</strong> -- Teste en entrainement ce que tu utiliseras le jour J</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">*</span>
                <span><strong>Pas de nouveaute jour J</strong> -- Zero surprise sur les produits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">*</span>
                <span><strong>Adapter aux conditions</strong> -- 60g/h dans les canyons &gt; 100g/h avec nausees</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export const GutTab = memo(GutTabComponent)
