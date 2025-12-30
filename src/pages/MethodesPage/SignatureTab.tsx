import { memo } from 'react'
import { SectionHeader } from '../../components/shared'

function SignatureTabComponent() {
  return (
    <div className="space-y-12">
      {/* Intro */}
      <section>
        <h2 className="headline-lg">Les 4 workouts qui font la difference pour WSER</h2>
        <div className="w-12 h-1 bg-linear-to-r from-orange-500 to-orange-600 rounded mt-3" />
      </section>

      {/* Le contexte WSER */}
      <section>
        <SectionHeader kicker="Le contexte" title="Pourquoi ces seances" />

        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 mt-6">
          <p className="font-mono text-lg text-white">
            WSER = 7536m de denivele negatif. Plus que le positif (6004m).
          </p>
          <p className="text-sm text-zinc-400 mt-2">
            C'est contre-intuitif mais c'est la cle de la course.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 mt-6">
          <h4 className="font-semibold text-zinc-300 mb-3">Ce qui se passe a Foresthill (km 100)</h4>
          <p className="text-sm text-zinc-400 leading-relaxed">
            A ce stade, tu as deja descendu ~5000m de D-. Tu viens de traverser les canyons dans une chaleur de 35-42C.
            Il te reste 60 km, dont la quasi-totalite en descente vers Auburn.
          </p>
        </div>

        <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-red-400">Quads morts</th>
                <th className="text-left py-3 px-4 font-medium text-emerald-400">Quads qui tiennent</th>
              </tr>
            </thead>
            <tbody>
              {[
                { bad: 'Tu ne peux plus freiner. Chaque pas en descente est une douleur.', good: 'Tu peux encore courir les descentes.' },
                { bad: 'Tu marches les descentes.', good: 'Tu depasses ceux qui marchent.' },
                { bad: 'Foresthill -> Auburn = 5-6h', good: 'Foresthill -> Auburn = 3h30-4h' },
                { bad: 'Temps final : 22-24h', good: 'Temps final : sub-20h' },
              ].map((row, i) => (
                <tr key={i} className="border-t border-zinc-800/50">
                  <td className="py-3 px-4 text-red-400">{row.bad}</td>
                  <td className="py-3 px-4 text-emerald-400">{row.good}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pull-quote mt-6">
          <p className="text-zinc-300 leading-relaxed">
            La difference entre 20h et 24h ne se fait pas sur ta VO2max ou ton endurance aerobie.
            Elle se fait sur ta capacite a encore courir les descentes quand tout le monde marche.
            C'est une capacite qui s'entraine specifiquement.
          </p>
        </div>
      </section>

      {/* Les 3 composantes */}
      <section>
        <SectionHeader kicker="Physiologie" title="Les 3 composantes de la descente" />

        <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Composante</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Ce que c'est</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Comment l'entrainer</th>
              </tr>
            </thead>
            <tbody>
              {[
                { comp: 'Resistance musculaire', desc: 'Capacite des quads a encaisser les impacts repetes sans se detruire', how: 'Muscu excentrique + Long Downhill Repeats' },
                { comp: 'Technique "Float"', desc: "Laisser passer l'energie au lieu de l'absorber avec les quads", how: 'Long Downhill Repeats + Hilly Threshold' },
                { comp: "Economie d'effort", desc: "Garder de l'energie en montee pour la depenser en descente", how: 'Hill Beast + Hilly Threshold' },
              ].map((row) => (
                <tr key={row.comp} className="border-t border-zinc-800/50">
                  <td className="py-3 px-4 font-medium text-orange-400">{row.comp}</td>
                  <td className="py-3 px-4 text-zinc-300">{row.desc}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-zinc-400 mt-4">
          Ces 4 seances travaillent ces 3 composantes de maniere complementaire.
          Aucune ne suffit seule. C'est la combinaison qui fait la difference.
        </p>
      </section>

      {/* Seance 1 : Hill Beast */}
      <SessionCard
        num="01"
        name="Hill Beast"
        signature="10-8-6-4-2-1 min cotes + 3km tempo"
        duration="75-90 min"
        frequency="1x/semaine phase bloc (mars-mai)"
        terrain="Montee 3-5min + descente trottable"
        color="orange"
        objective="Fatiguer tes jambes en montee, puis les forcer a courir quand meme."
        context="WSER enchaine montee-descente-montee. Le probleme n'est pas de monter fort -- tu sais faire. Le probleme c'est de COURIR CORRECTEMENT la descente quand tes quads sont deja entames par la montee precedente, puis de RELANCER sur du plat avec des jambes qui n'en peuvent plus."
        adaptations={[
          { title: 'Economie de montee', desc: "Plus tu montes souvent 'dur mais pas max', plus ton cout energetique en montee diminue. Les montees WSER sont longues (30-45min). L'objectif est de monter fort SANS TE CRAMER." },
          { title: 'Descente sur jambes fatiguees', desc: "En descendant en trot actif (pas en marchant), tu forces tes quads a travailler excentrique quand ils sont deja entames." },
          { title: 'Relance tempo', desc: "Le finisher de 10-15min a allure tempo simule les 38km post-Foresthill. Tu dois encore courir vite alors que ton corps dit 'j'arrete'." },
        ]}
        logic={[
          "Les cotes en descending ladder (10-8-6-4-2-1) : Tu commences par le bloc le plus long quand tu es frais. Au fur et a mesure que tu fatigues, les intervalles raccourcissent.",
          "La recup en descente 'steady' : Pas de marche. Tu descends en courant, a effort controle. C'est la que tu travailles ta technique de descente sous fatigue.",
          "Le finisher 3 km tempo : C'est le moment cle. Tes jambes sont cuites. Et la, tu dois relancer sur du plat a tempo.",
        ]}
        protocol={[
          { label: 'Echauffement', value: '15-20 min endurance facile + quelques accelerations' },
          { label: 'Bloc principal', value: '10 / 8 / 6 / 4 / 2 / 1 min cotes -- effort "moderately hard" (RPE 7-8)' },
          { label: 'Recuperation', value: 'Descente en courant ("steady"), pas de marche. Effort RPE 5-6.' },
          { label: 'Finisher', value: '+ 3 km tempo plat immediatement apres le dernier intervalle' },
          { label: 'Retour au calme', value: '10-15 min trot facile' },
        ]}
        terrainGood={['Chemin forestier qui monte', 'Route de col', 'Piste DFCI', 'Sentier large']}
        terrainBad={['Montee trop courte (<2min)', 'Descente trop technique pour trotter', 'Montee trop longue (>8min) sans possibilite de decouper']}
        signals={[
          { aspect: 'Montees', good: "Meme sensation d'effort de la 1ere a la derniere", bad: 'Tu exploses a la 3eme' },
          { aspect: 'Descentes', good: 'Tu COURS (meme lentement)', bad: 'Tu marches' },
          { aspect: 'Finisher', good: 'Tu tiens ton allure tempo', bad: 'Tu ne peux pas le faire' },
          { aspect: 'Lendemain', good: 'Fatigue normale', bad: 'Detruit pendant 3 jours' },
        ]}
        errors={[
          "Partir trop fort sur le 10 min : Tu dois pouvoir tenir le meme effort percu sur toutes les repetitions.",
          "Marcher les descentes : Toute la valeur de la seance est dans le fait de courir les descentes fatigue.",
          "Sauter le finisher : 'Je suis creve, je rentre.' Non. Le finisher EST la seance.",
        ]}
        progression={[
          { week: '1-2', adapt: '8-6-4-2-1 (version courte) + 2km tempo' },
          { week: '3-4', adapt: '10-8-6-4-2-1 complet + 3km tempo' },
          { week: '5+', adapt: 'Meme structure, terrain plus vallonne ou tempo plus rapide' },
        ]}
      />

      {/* Seance 2 : Pyramide */}
      <SessionCard
        num="02"
        name="Pyramide"
        signature="2-4-6-8-6-4-2 min @ seuil avec recup"
        duration="70-80 min"
        frequency="1x/semaine en phase developpement (mars-avril)"
        terrain="N'importe ou tu peux courir 8min sans t'arreter"
        color="blue"
        objective="Maintenir un effort seuil malgre une structure variable."
        context="WSER n'est pas un effort constant. C'est 20h de variations : montees ou tu ralentis, descentes ou tu acceleres, faux-plats ou tu maintiens. Cette seance t'apprend a GERER TON EFFORT SUR LA DUREE avec des blocs de longueur variable."
        adaptations={[
          { title: 'Endurance au seuil', desc: "32min d'effort cumule au seuil lactique. C'est plus long qu'un 10km, moins intense qu'un 5km. Exactement l'intensite des sections 'push' de WSER." },
          { title: 'Pacing variable', desc: "La structure 2-4-6-8-6-4-2 t'oblige a gerer. Si tu pars trop vite sur les blocs courts, tu exploses sur le 8min." },
          { title: 'Finir fort', desc: "Le seul indicateur de reussite = tes dernieres reps sont meilleures que les premieres." },
        ]}
        logic={[
          "La structure ascendante puis descendante (2-4-6-8-6-4-2) : Tu montes en charge jusqu'au pic (8 min), puis tu redescends. C'est un test de pacing.",
          "L'effort seuil (RPE 7-8) : Conversation TRES difficile. Tu es au-dessus de l'endurance fondamentale mais en-dessous du max.",
          "La recup = 50% du temps d'effort : 2min effort -> 1min recup. 8min effort -> 4min recup. Tu ne recuperes jamais completement.",
        ]}
        protocol={[
          { label: 'Echauffement', value: '15min progressif' },
          { label: 'Pyramide', value: '2min -> 4min -> 6min -> 8min -> 6min -> 4min -> 2min @ seuil' },
          { label: 'Recup entre blocs', value: '50% du temps d\'effort (1-2-3-4-3-2-1min)' },
          { label: 'Allure', value: 'Seuil = conversation TRES difficile, RPE 7-8' },
          { label: 'Retour calme', value: '10min' },
        ]}
        terrainGood={['Chemin forestier vallonne', 'Route tranquille', "Piste d'athle", 'Parc urbain']}
        terrainBad={['Terrain trop cassant (escaliers, obstacles)', 'Single tres technique']}
        signals={[
          { aspect: 'Blocs 2-4min', good: 'Tu te retiens un peu', bad: 'Tu pars a fond' },
          { aspect: 'Bloc 8min', good: 'Dur mais tu tiens', bad: 'Tu survis a peine' },
          { aspect: 'Blocs 6-4-2 (retour)', good: 'Les meilleurs de la seance', bad: "Tu n'en peux plus" },
          { aspect: 'Allure', good: 'Reguliere (+-5%)', bad: 'Yo-yo' },
        ]}
        errors={[
          "Partir trop vite sur les premiers intervalles courts et ne plus rien avoir pour le 8min.",
          "Le 8min doit etre fait a la MEME SENSATION que le 2min.",
        ]}
        progression={[
          { week: '1', adapt: '2-4-6-4-2 (version courte, 18min @ seuil)' },
          { week: '2-3', adapt: '2-4-6-8-6-4-2 (version complete)' },
          { week: '4+', adapt: 'Meme structure, terrain plus vallonne' },
        ]}
      />

      {/* Seance 3 : Long Downhill Repeats */}
      <SessionCard
        num="03"
        name="Long Downhill Repeats"
        signature="3-5x descente 8-15min @ allure semi/marathon"
        duration="90-120 min"
        frequency="1x/2 semaines phase specifique (avril-mai)"
        terrain="Descente ROULANTE 8-15min (piste, route, chemin large)"
        color="cyan"
        critical
        objective="Detruire tes quads de maniere controlee pour qu'ils s'adaptent."
        context="C'est la seance la plus contre-intuitive. Tu vas volontairement creer des dommages musculaires (DOMS garantis les premieres fois) pour declencher le Repeated Bout Effect : apres 2-3 expositions similaires, les marqueurs de dommages diminuent de 40-60%. C'est ce qui te permet de COURIR les 38km Foresthill->Auburn au lieu de les MARCHER."
        adaptations={[
          { title: 'Repeated Bout Effect', desc: "L'excentrique repete provoque une adaptation sarcomerique. Tes fibres musculaires ajoutent des sarcomeres en serie, ce qui reduit le stress mecanique par unite de longueur." },
          { title: 'Technique "float"', desc: "Quand tes quads fatiguent, ton corps est FORCE de trouver une technique plus economique. Tu apprends a laisser passer l'energie au lieu de freiner." },
          { title: 'Confiance en descente rapide', desc: "Plus tu descends vite en entrainement, plus tu es a l'aise le jour J. La descente WSER n'est pas technique -- elle est LONGUE et RAPIDE." },
        ]}
        logic={[
          "Descentes repetees (3-5x) : Tu accumules du volume de descente controlee. Chaque rep ajoute du stress excentrique. C'est le stimulus qui declenche l'adaptation.",
          "Allure semi/marathon : Vite mais controle. Tu dois pouvoir maintenir cette allure jusqu'a la derniere rep.",
          "Remontee en recup : La montee n'est PAS le travail. Marche ou trot tres leger.",
        ]}
        protocol={[
          { label: 'Echauffement', value: '15min (peut etre la montee vers le spot)' },
          { label: 'Bloc principal', value: '3-5x descente @ allure semi/marathon' },
          { label: 'Duree descente', value: '8-15min par rep' },
          { label: 'Remontee', value: 'Marche ou trot tres leger' },
          { label: 'Volume D- cible', value: '800-1500m' },
        ]}
        terrainGood={['Piste forestiere/DFCI', 'Route de montagne (goudron OK)', 'Chemin large type "voie verte"', 'Fire road']}
        terrainBad={['Descente alpine technique', 'Pierrier, marches, epingles', 'Terrain ou tu dois freiner/negocier']}
        terrainNote="Le test : Est-ce que tu peux descendre a allure semi-marathon pendant 10min sans reflechir a ou tu poses les pieds ? Si oui -> bon spot."
        technicalPoints={[
          'Cadence haute (180+ spm) : Plus de pas = moins d\'impact par pas',
          'Foulee courte : Pas de grands bonds. Petites foulees rapides.',
          'Bras actifs : Les bras aident a l\'equilibre et absorbent une partie de l\'energie',
          'Regard loin : Anticiper le terrain, pas regarder ses pieds',
          'Genoux souples : Jamais verrouilles. Les genoux sont des amortisseurs.',
          'Freinage : ZERO. Tu LAISSES PASSER.',
        ]}
        signals={[
          { aspect: 'Allure', good: 'Marathon/semi controlee', bad: 'Sprint ou trop lent' },
          { aspect: 'Respiration', good: 'Controlee en bas', bad: 'Essouffle en bas' },
          { aspect: 'Technique', good: "S'ameliore au fil des reps", bad: 'Se degrade' },
          { aspect: 'DOMS J+2', good: 'Moderes (premieres fois), quasi-nuls (apres 4-5 seances)', bad: 'Violents a chaque fois' },
        ]}
        errors={[
          "Descendre trop vite en mode 'trail racing'. L'objectif est le VOLUME de descente controlee, pas la vitesse.",
          "Si tu es essouffle en bas, tu vas trop vite.",
        ]}
        progression={[
          { week: '1-2', adapt: '3 repetitions, allure prudente' },
          { week: '3-4', adapt: '4 repetitions, technique float' },
          { week: '5+', adapt: '5 repetitions, allure semi' },
        ]}
        floatTable
      />

      {/* Seance 4 : Hilly Threshold */}
      <SessionCard
        num="04"
        name="Hilly Threshold"
        signature="20-30min continu @ seuil sur vallonne"
        duration="50-70 min"
        frequency="1x/semaine de fevrier a mai"
        terrain="Vallonne 'courable' 20-30min (bosses, pas vraies montees)"
        color="emerald"
        objective="Maintenir une vitesse de croisiere elevee malgre les variations de terrain."
        context="C'est la seance 'vitesse roulante' par excellence. Tu apprends a courir VITE sur du terrain WSER-like (vallonne, pas technique) pendant 20-30min."
        adaptations={[
          { title: 'Running economy sur terrain mixte', desc: "Ta consommation d'O2 a vitesse donnee diminue. Tu deviens plus efficace sur ce type de terrain." },
          { title: "Regulation d'effort", desc: "Tu maintiens un EFFORT constant (pas une VITESSE constante). En montee tu ralentis, en descente tu acceleres." },
          { title: 'Capitaliser les descentes', desc: "La cle sub-20h c'est de ne JAMAIS recuperer dans les descentes. Tu t'entraines a POUSSER quand ton instinct dit 'relache'." },
        ]}
        logic={[
          "Simule les sections roulantes de WSER entre les canyons.",
          "En montee tu ne ralentis pas l'effort (mais tu vas plus lent)",
          "En descente tu ne recuperes pas (tu pousses)",
          "C'est ce qui fait la difference entre sub-20h (effort constant) et 24h (recup dans les descentes).",
        ]}
        protocol={[
          { label: 'Echauffement', value: '15-20min progressif' },
          { label: 'Bloc principal', value: '20-30min continu @ seuil (RPE 7-8)' },
          { label: 'Terrain', value: 'VALLONNE (pas plat !)' },
          { label: 'Cle', value: 'Meme EFFORT PERCU partout' },
          { label: 'Denivele', value: '200-400m D+ sur le bloc' },
        ]}
        terrainGood={['Chemin vallonne forestier', 'Route vallonnee', 'Parc avec bosses', 'Berges avec ondulations']}
        terrainBad={['Terrain avec vraies montees (>5min de marche)', "Single trop technique pour maintenir l'effort", 'Plat total (moins specifique)']}
        signals={[
          { aspect: 'Effort', good: 'Constant RPE 7-8 partout', bad: 'Variable' },
          { aspect: 'Montees', good: 'Tu ralentis mais meme effort', bad: "Tu t'enterres" },
          { aspect: 'Descentes', good: 'Tu acceleres, meme effort', bad: 'Tu recuperes' },
        ]}
        errors={[
          "Recuperer dans les descentes. La descente DOIT etre a effort seuil aussi -- ca veut dire pousser vraiment.",
        ]}
        progression={[
          { week: '1-2', adapt: '20min, terrain moderement vallonne' },
          { week: '3-4', adapt: '25min, terrain plus technique' },
          { week: '5+', adapt: '30min, vrai terrain trail' },
        ]}
      />

      {/* Comment combiner les seances */}
      <section>
        <SectionHeader kicker="Organisation" title="Comment combiner les seances" />

        {/* Synthese terrain */}
        <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Seance</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Difficulte terrain</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Ce que tu cherches</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Hill Beast', diff: 'Facile', search: 'Montee 3-5min + descente trottable' },
                { name: 'Pyramide', diff: 'Tres facile', search: "N'importe ou tu peux courir 8min" },
                { name: 'Hilly Threshold', diff: 'Facile', search: 'Vallonne courable 20-30min' },
                { name: 'Long Downhill Repeats', diff: 'Plus exigeant', search: 'Descente roulante 8-15min (piste, route, chemin large)', highlight: true },
              ].map((row) => (
                <tr key={row.name} className={`border-t border-zinc-800/50 ${row.highlight ? 'bg-yellow-500/10' : ''}`}>
                  <td className="py-3 px-4 font-medium">{row.name}</td>
                  <td className={`py-3 px-4 ${row.highlight ? 'text-yellow-400' : 'text-zinc-400'}`}>{row.diff}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.search}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-zinc-400 mt-4">
          3 seances sur 4, tu trouves sans probleme. Pour Long Downhill Repeats, il faut identifier 1-2 spots specifiques
          avec de vraies descentes roulantes -- c'est la seule contrainte terrain du plan.
        </p>

        {/* Semaine type */}
        <h3 className="headline-lg text-lg mt-10">Semaine type phase bloc (mars-avril)</h3>

        <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Jour</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Seance</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Objectif</th>
              </tr>
            </thead>
            <tbody>
              {[
                { day: 'Lundi', session: 'Repos ou cross', obj: 'Recup' },
                { day: 'Mardi', session: 'Hill Beast OU Pyramide', obj: 'Seance cle #1', key: true },
                { day: 'Mercredi', session: 'Endurance facile', obj: 'Recup active' },
                { day: 'Jeudi', session: 'Hilly Threshold', obj: 'Seance cle #2', key: true },
                { day: 'Vendredi', session: 'Repos ou Muscu excentrique', obj: 'Renforcement' },
                { day: 'Samedi', session: 'Sortie longue vallonnee', obj: 'Volume + descentes integrees', key: true },
                { day: 'Dimanche', session: 'Endurance moyenne ou repos', obj: 'Selon fatigue' },
              ].map((row) => (
                <tr key={row.day} className={`border-t border-zinc-800/50 ${row.key ? 'bg-orange-500/10' : ''}`}>
                  <td className={`py-3 px-4 font-medium ${row.key ? 'text-orange-400' : ''}`}>{row.day}</td>
                  <td className={`py-3 px-4 ${row.key ? 'font-semibold' : 'text-zinc-400'}`}>{row.session}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.obj}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-zinc-400 mt-4">
          <strong>Long Downhill Repeats :</strong> 1x/2 semaines, remplacer la sortie longue du samedi. Pas en plus.
        </p>

        {/* Rotation */}
        <h3 className="headline-lg text-lg mt-10">Rotation des seances signature</h3>

        <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Semaine</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Seance cotes (mardi)</th>
                <th className="text-left py-3 px-4 font-medium text-zinc-400">Samedi</th>
              </tr>
            </thead>
            <tbody>
              {[
                { week: 'Semaine 1', mardi: 'Hill Beast', samedi: 'Sortie longue' },
                { week: 'Semaine 2', mardi: 'Pyramide', samedi: 'Long Downhill Repeats', highlight: true },
                { week: 'Semaine 3', mardi: 'Hill Beast', samedi: 'Sortie longue' },
                { week: 'Semaine 4', mardi: 'Pyramide', samedi: 'Long Downhill Repeats', highlight: true },
              ].map((row) => (
                <tr key={row.week} className={`border-t border-zinc-800/50 ${row.highlight ? 'bg-cyan-500/10' : ''}`}>
                  <td className="py-3 px-4 font-medium">{row.week}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.mardi}</td>
                  <td className={`py-3 px-4 ${row.highlight ? 'text-cyan-400 font-semibold' : 'text-zinc-400'}`}>{row.samedi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Ce qu'il faut retenir */}
      <section>
        <SectionHeader kicker="Synthese" title="Ce qu'il faut retenir" />

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {[
            { name: 'Hill Beast', focus: 'economie + relance', desc: "L'effort moderately hard et le finisher tempo simulent la fin de WSER.", color: 'orange' },
            { name: 'Pyramide', focus: 'puissance + mental', desc: "L'effort max developpe ta capacite a relancer dans les bosses.", color: 'blue' },
            { name: 'Long Downhill Repeats', focus: 'resistance + technique', desc: "Le volume d'excentrique developpe le 'float' et la resistance des quads.", color: 'cyan' },
            { name: 'Hilly Threshold', focus: 'running economy terrain', desc: 'Le seuil sur vallonne developpe ton moteur aerobie en contexte reel.', color: 'emerald' },
          ].map((item) => (
            <div key={item.name} className={`rounded-xl border p-5 ${
              item.color === 'orange' ? 'border-orange-500/30 bg-orange-500/5' :
              item.color === 'blue' ? 'border-blue-500/30 bg-blue-500/5' :
              item.color === 'cyan' ? 'border-cyan-500/30 bg-cyan-500/5' :
              'border-emerald-500/30 bg-emerald-500/5'
            }`}>
              <h4 className={`font-semibold ${
                item.color === 'orange' ? 'text-orange-400' :
                item.color === 'blue' ? 'text-blue-400' :
                item.color === 'cyan' ? 'text-cyan-400' :
                'text-emerald-400'
              }`}>{item.name}</h4>
              <p className="text-xs text-zinc-500 mt-1">{item.focus}</p>
              <p className="text-sm text-zinc-400 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="pull-quote mt-6">
          <p className="text-zinc-300 leading-relaxed">
            Les 4 ensemble font un coureur de descente complet. Aucune ne suffit seule.
          </p>
        </div>
      </section>
    </div>
  )
}

// Session Card Component
function SessionCard({
  num,
  name,
  signature,
  duration,
  frequency,
  terrain,
  color,
  critical,
  objective,
  context,
  adaptations,
  logic,
  protocol,
  terrainGood,
  terrainBad,
  terrainNote,
  technicalPoints,
  signals,
  errors,
  progression,
  floatTable,
}: {
  num: string
  name: string
  signature: string
  duration: string
  frequency: string
  terrain: string
  color: 'orange' | 'blue' | 'cyan' | 'emerald'
  critical?: boolean
  objective: string
  context: string
  adaptations: { title: string; desc: string }[]
  logic: string[]
  protocol: { label: string; value: string }[]
  terrainGood: string[]
  terrainBad: string[]
  terrainNote?: string
  technicalPoints?: string[]
  signals: { aspect: string; good: string; bad: string }[]
  errors: string[]
  progression: { week: string; adapt: string }[]
  floatTable?: boolean
}) {
  const colorClasses = {
    orange: { border: 'border-l-orange-500', bg: 'bg-orange-500/5', text: 'text-orange-400' },
    cyan: { border: 'border-l-cyan-500', bg: 'bg-cyan-500/5', text: 'text-cyan-400' },
    blue: { border: 'border-l-blue-500', bg: 'bg-blue-500/5', text: 'text-blue-400' },
    emerald: { border: 'border-l-emerald-500', bg: 'bg-emerald-500/5', text: 'text-emerald-400' },
  }[color]

  return (
    <article className={`rounded-xl border border-zinc-800 overflow-hidden border-l-4 ${colorClasses.border}`}>
      {/* Header */}
      <div className={`p-6 border-b border-zinc-800 ${colorClasses.bg}`}>
        <div className="flex items-start gap-5">
          <span className="font-mono text-4xl font-bold text-zinc-700">{num}</span>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-2xl font-display font-semibold">{name}</h3>
              {critical && (
                <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400 uppercase tracking-wider">
                  Gap critique
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Signature */}
      <div className="p-6 border-b border-zinc-800">
        <div className="font-mono text-lg bg-zinc-900 rounded-xl p-5 border border-zinc-800 text-center">
          {signature}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-zinc-800">
        {[
          { label: 'Duree totale', value: duration },
          { label: 'Frequence', value: frequency },
          { label: 'Terrain requis', value: terrain },
        ].map((stat) => (
          <div key={stat.label} className="p-4 border-r border-zinc-800 last:border-r-0">
            <div className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</div>
            <div className="font-medium mt-1 text-sm">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="p-6 space-y-8">
        {/* Objectif */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Ce que tu cherches a provoquer</h4>
          <p className={`font-semibold ${colorClasses.text}`}>{objective}</p>
          <p className="prose-magazine mt-3">{context}</p>
        </div>

        {/* Adaptations */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">L'intention physiologique</h4>
          <div className="space-y-4">
            {adaptations.map((adapt, i) => (
              <div key={i} className="rounded-lg bg-zinc-900/50 p-4">
                <h5 className={`font-semibold text-sm ${colorClasses.text}`}>Adaptation #{i + 1} -- {adapt.title}</h5>
                <p className="text-sm text-zinc-400 mt-2">{adapt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Float table for Long Downhill */}
        {floatTable && (
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/80">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-red-400">Freinage classique</th>
                  <th className="text-left py-3 px-4 font-medium text-emerald-400">Float</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { bad: 'Chaque impact absorbe par les quads', good: 'Energie redirigee vers le sol' },
                  { bad: 'Contraction excentrique maximale a chaque foulee', good: 'Cadence haute, foulee courte' },
                  { bad: 'Micro-dechirures accumulees', good: 'Corps relache, genoux souples' },
                  { bad: 'Quads detruits apres 3000m D-', good: 'Quads fonctionnels apres 6000m D-' },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-zinc-800/50">
                    <td className="py-3 px-4 text-red-400">{row.bad}</td>
                    <td className="py-3 px-4 text-emerald-400">{row.good}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Logic */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">La logique de la seance</h4>
          <div className="space-y-2">
            {logic.map((item, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="font-mono text-zinc-600 w-5">{i + 1}.</span>
                <span className="text-zinc-400">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Protocol */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Le protocole</h4>
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <tbody>
                {protocol.map((item) => (
                  <tr key={item.label} className="border-b border-zinc-800/50 last:border-b-0">
                    <td className="py-3 px-4 font-medium text-zinc-400 w-1/3">{item.label}</td>
                    <td className="py-3 px-4 text-zinc-300">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical points */}
        {technicalPoints && (
          <div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Points techniques</h4>
            <div className="grid md:grid-cols-2 gap-2">
              {technicalPoints.map((point, i) => (
                <div key={i} className="flex gap-2 text-sm text-zinc-400">
                  <span className={colorClasses.text}>*</span>
                  {point}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Terrain */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Ce que tu cherches comme terrain</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-4">
              <h5 className="text-sm font-semibold text-emerald-400 mb-2">Ca marche</h5>
              <ul className="space-y-1">
                {terrainGood.map((item, i) => (
                  <li key={i} className="text-sm text-zinc-400 flex gap-2">
                    <span className="text-emerald-400">*</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-4">
              <h5 className="text-sm font-semibold text-red-400 mb-2">Ca marche pas</h5>
              <ul className="space-y-1">
                {terrainBad.map((item, i) => (
                  <li key={i} className="text-sm text-zinc-400 flex gap-2">
                    <span className="text-red-400">*</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {terrainNote && (
            <p className="text-sm text-zinc-500 mt-3 italic">{terrainNote}</p>
          )}
        </div>

        {/* Signals */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Signaux de reussite</h4>
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/80">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-zinc-400">Signal</th>
                  <th className="text-left py-3 px-4 font-medium text-emerald-400">Tu fais bien</th>
                  <th className="text-left py-3 px-4 font-medium text-red-400">Tu fais mal</th>
                </tr>
              </thead>
              <tbody>
                {signals.map((signal) => (
                  <tr key={signal.aspect} className="border-t border-zinc-800/50">
                    <td className="py-3 px-4 font-medium">{signal.aspect}</td>
                    <td className="py-3 px-4 text-emerald-400">{signal.good}</td>
                    <td className="py-3 px-4 text-red-400">{signal.bad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Errors */}
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
          <h4 className="text-sm font-semibold text-red-400 mb-3">Erreurs frequentes</h4>
          <ul className="space-y-2">
            {errors.map((error, i) => (
              <li key={i} className="text-sm text-zinc-400 flex gap-2">
                <span className="text-red-400">!</span>
                {error}
              </li>
            ))}
          </ul>
        </div>

        {/* Progression */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Progression</h4>
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/80">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-zinc-400">Semaine</th>
                  <th className="text-left py-3 px-4 font-medium text-zinc-400">Adaptation</th>
                </tr>
              </thead>
              <tbody>
                {progression.map((item) => (
                  <tr key={item.week} className="border-t border-zinc-800/50">
                    <td className="py-3 px-4 font-mono text-zinc-500">{item.week}</td>
                    <td className="py-3 px-4 text-zinc-300">{item.adapt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </article>
  )
}

export const SignatureTab = memo(SignatureTabComponent)
