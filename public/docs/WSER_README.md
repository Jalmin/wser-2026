# WSER 2026 — Documentation Site Web

*Tous les documents adaptés au profil Strava de Loïc*

---

## 📁 Structure des fichiers

```
/
├── WSER_PROFIL_ATHLETE.md      # Profil athlète issu de l'analyse Strava
├── WSER_PLANNING_ADAPTE.md     # Planning 6 mois adapté à tes volumes réels
├── WSER_MUSCULATION.md         # Programme musculation excentrique complet
├── WSER_SEANCES_SIGNATURE.md   # 4 séances clés détaillées
├── WSER_HEAT_TRAINING.md       # Protocole acclimatation chaleur
├── WSER_GUT_TRAINING.md        # Protocole nutrition progressive
├── wser_training_data.ts       # Données TypeScript prêtes pour React
└── README.md                   # Ce fichier
```

---

## 🎯 Synthèse de l'analyse Strava

### Ce que tu fais bien ✅

| Domaine | Constat |
|---------|---------|
| **Régularité** | 0 semaine à 0 run, 49% des semaines à 5+ runs |
| **Volume** | 65-75 km/sem (médiane 53 km), cohérent avec 10h/sem |
| **Expérience** | 25 × 100 miles, gestion nuit/durée acquise |
| **Preuve sub-20h** | Kullamannen 163km en 19h00 (6:47/km) |

### Les 4 gaps à combler ⚠️

| Gap | Status | Action |
|-----|--------|--------|
| Sorties longues entraînement | ⚠️ | Samedi 2h → 3-5h |
| Travail descente répété | ⚠️ | 1× Long Downhill Repeats/sem |
| Heat training | ❌ | Maintenance + bloc Maroc + intensif |
| Gut training | ❌ | Timer systématique, 60→110g CHO/h |

---

## 📅 Planning résumé

| Phase | Période | h/sem | Focus |
|-------|---------|-------|-------|
| **BASE** | Jan-Mar | 6-8h | Récup Arc + volume + muscu apprentissage |
| **DÉVELOPPEMENT** | Mar-Mai | 8-10h | Volume max + bloc Maroc + RBE |
| **SPÉCIFIQUE** | Mai-Juin | 8-10h | Heat intensif + THP dress rehearsal |
| **TAPER** | J-14 → J-0 | 4-6h | Fraîcheur + re-boost heat |

### Jalons clés

| Date | Événement | Objectif |
|------|-----------|----------|
| 25 jan | Arc of Attrition | 100%, seule course perf |
| 1 mars | Ultra Sainte Baume | 85%, gut training 80-100g/h |
| 25 avril | Bloc Maroc | Heat initiation 7-10j |
| 15 mai | THP 120 | 85%, dress rehearsal complet |
| **27 juin** | **WSER** | **SUB-20H** |

---

## 🔧 Utilisation dans le site React

### Import des données

```typescript
import { 
  athleteProfile,
  phases,
  milestones,
  signatureSessions,
  exercises,
  heatPhases,
  gutPhases,
  differentiators
} from './wser_training_data';
```

### Exemple d'utilisation

```tsx
// Afficher les phases
{phases.map(phase => (
  <PhaseCard 
    key={phase.id}
    name={phase.name}
    weeks={phase.weeks}
    volume={phase.volume}
    color={phase.color}
  />
))}

// Afficher les gaps
{athleteProfile.gaps.map(gap => (
  <GapIndicator
    key={gap.id}
    status={gap.status}
    name={gap.name}
    recommendation={gap.recommendation}
  />
))}
```

---

## 📊 Données clés pour le site

### Volumes calibrés (vs anciens docs)

| Métrique | Ancien (générique) | Nouveau (calibré Strava) |
|----------|-------------------|--------------------------|
| Phase BASE | 8-10h/sem | **6-8h/sem** |
| Phase DEV | 12-15h/sem | **8-10h/sem** |
| Longue max | 55 km | **40-50 km** |
| Fréquence | 5-6 runs/sem | **4-5 runs/sem** |

### Allures de référence

| Type terrain | Allure actuelle | Cible WSER |
|--------------|-----------------|------------|
| Plat | 5:10/km | 6:30-7:30/km |
| Vallonné | 6:46/km | 7:00-8:30/km |
| Montées | 10:35/km | 10-15 min/km |
| Descentes | - | 5:30-9:00/km |

---

## 📝 Notes d'implémentation

### Pages suggérées

1. **Dashboard** — Vue d'ensemble avec gaps, phase actuelle, prochain jalon
2. **Planning** — Calendrier avec phases, jalons, volumes
3. **Méthodes** — Onglets : Musculation, Séances, Heat, Nutrition
4. **Profil** — Données Strava, progression, objectifs

### Composants clés

- `PhaseCard` — Affiche une phase avec couleur, volume, focus
- `MilestoneTimeline` — Timeline des jalons avec statut
- `GapIndicator` — Indicateur visuel des gaps (✅ ⚠️ ❌)
- `ExerciseCard` — Détail exercice avec vidéo/gif
- `ProtocolTable` — Tableau protocole (heat, gut)

---

## 🔄 Mises à jour

Les documents sont calibrés sur l'analyse Strava du 24 décembre 2024.

Pour recalibrer après une période d'entraînement :
1. Exporter nouvel activities.csv de Strava
2. Relancer l'analyse
3. Ajuster les volumes si évolution significative

---

*Généré le 24 décembre 2024*
