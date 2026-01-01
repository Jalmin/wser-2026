// Arc of Attrition 2026 - Course Data
// 161km coastal trail, Cornwall UK

export interface AoaAidStation {
  num: number
  name: string
  km: number
  ele: number
  lat: number
  lon: number
  cutoff?: string
  services?: string
}

export interface AoaSection {
  id: string
  name: string
  kmStart: number
  kmEnd: number
  color: string
  description: string
}

// Course stats
export const aoaStats = {
  distance_km: 161.0,
  ascent_m: 5341,
  descent_m: 5265,
  min_ele_m: 0,
  max_ele_m: 120,
  uphill_pct: 30,
  flat_pct: 40,
  downhill_pct: 30,
  uphill_km: 48.0,
  flat_km: 64.5,
  downhill_km: 48.6,
  ratio: 0.99, // D-/D+
}

// Aid stations along the route
export const aoaAidStations: AoaAidStation[] = [
  { num: 1, name: 'Start - Coverack', km: 0, ele: 24, lat: 50.0262892, lon: -5.0991247, services: 'D\u00e9part' },
  { num: 2, name: 'Lizard Point', km: 16.9, ele: 31, lat: 49.9598117, lon: -5.20679, cutoff: '4h00', services: 'eau, ravito' },
  { num: 3, name: 'Porthleven', km: 39.5, ele: 7, lat: 50.0855884, lon: -5.3172296, cutoff: '9h30', services: 'ravito complet, drop bag' },
  { num: 4, name: 'Penzance', km: 63.4, ele: 6, lat: 50.1133408, lon: -5.5427366, cutoff: '15h00', services: 'ravito complet, drop bag, m\u00e9dical' },
  { num: 5, name: 'Minack Theatre', km: 80.8, ele: 60, lat: 50.0410233, lon: -5.6525194, cutoff: '19h00', services: 'eau, ravito' },
  { num: 6, name: "Land's End", km: 88.2, ele: 65, lat: 50.0656303, lon: -5.7143873, cutoff: '21h00', services: 'ravito complet, MI-COURSE' },
  { num: 7, name: 'Pendeen', km: 104.1, ele: 72, lat: 50.1620458, lon: -5.6696958, cutoff: '25h00', services: 'ravito complet, drop bag' },
  { num: 8, name: 'Lelant', km: 132.0, ele: 5, lat: 50.1794274, lon: -5.4417635, cutoff: '32h00', services: 'ravito complet, drop bag' },
  { num: 9, name: 'Godrevy', km: 142.2, ele: 6, lat: 50.2293819, lon: -5.3869164, cutoff: '34h30', services: 'eau, ravito' },
  { num: 10, name: 'Portreath', km: 153.9, ele: 6, lat: 50.2614534, lon: -5.2882417, cutoff: '37h00', services: 'eau, ravito' },
  { num: 11, name: 'Finish - Portreath', km: 161.0, ele: 100, lat: 50.2762997, lon: -5.234803, cutoff: '40h00', services: 'FINISH' },
]

// Course sections (4 major sections like WSER)
export const aoaSections: AoaSection[] = [
  {
    id: 'lizard',
    name: 'The Lizard',
    kmStart: 0,
    kmEnd: 39.5,
    color: '#3b82f6', // blue
    description: 'D\u00e9part Coverack, contour de la p\u00e9ninsule du Lizard, point le plus au sud du Royaume-Uni. Terrain technique avec falaises et descentes raides vers les criques.',
  },
  {
    id: 'penwith',
    name: 'Mounts Bay to Penwith',
    kmStart: 39.5,
    kmEnd: 88.2,
    color: '#f97316', // orange
    description: "Travers\u00e9e de la baie de Mount's Bay, passage par Penzance puis mont\u00e9e vers le th\u00e9\u00e2tre de Minack et Land's End. Section c\u00f4ti\u00e8re expos\u00e9e aux \u00e9l\u00e9ments.",
  },
  {
    id: 'north-coast',
    name: 'North Coast',
    kmStart: 88.2,
    kmEnd: 132.0,
    color: '#10b981', // emerald
    description: "De Land's End \u00e0 Lelant, la c\u00f4te nord sauvage. Falaises abruptes, villages miniers abandonn\u00e9s. Souvent de nuit, exposition au vent du nord.",
  },
  {
    id: 'final',
    name: 'Final Push',
    kmStart: 132.0,
    kmEnd: 161.0,
    color: '#06b6d4', // cyan
    description: 'Godrevy, Hell\'s Mouth, Portreath et arriv\u00e9e. Derni\u00e8res falaises avant la ligne. Fatigue terminale mais terrain moins technique.',
  },
]

// Segment analysis between aid stations
export const aoaSegments = [
  {
    from: 'Start',
    to: 'Lizard Point',
    km: 16.9,
    dPlus: 520,
    dMinus: 513,
    terrain: 'Falaises techniques, descentes vers criques, sentier c\u00f4tier \u00e9troit',
    difficulty: 'Mod\u00e9r\u00e9',
  },
  {
    from: 'Lizard Point',
    to: 'Porthleven',
    km: 22.6,
    dPlus: 680,
    dMinus: 704,
    terrain: 'Long segment c\u00f4tier, passages de plages, mont\u00e9es/descentes r\u00e9p\u00e9t\u00e9es',
    difficulty: 'Mod\u00e9r\u00e9',
  },
  {
    from: 'Porthleven',
    to: 'Penzance',
    km: 23.9,
    dPlus: 620,
    dMinus: 621,
    terrain: "Travers\u00e9e Mount's Bay, plages, sentiers c\u00f4tiers roulants",
    difficulty: 'Facile-Mod\u00e9r\u00e9',
  },
  {
    from: 'Penzance',
    to: 'Minack',
    km: 17.4,
    dPlus: 740,
    dMinus: 686,
    terrain: 'Mont\u00e9e vers Minack Theatre, falaises spectaculaires, terrain technique',
    difficulty: 'Difficile',
  },
  {
    from: 'Minack',
    to: "Land's End",
    km: 7.4,
    dPlus: 290,
    dMinus: 285,
    terrain: 'Section courte mais expos\u00e9e, rochers, vent fr\u00e9quent',
    difficulty: 'Mod\u00e9r\u00e9',
  },
  {
    from: "Land's End",
    to: 'Pendeen',
    km: 15.9,
    dPlus: 590,
    dMinus: 583,
    terrain: 'C\u00f4te nord sauvage, anciennes mines, sentiers \u00e9troits',
    difficulty: 'Difficile',
  },
  {
    from: 'Pendeen',
    to: 'Lelant',
    km: 27.9,
    dPlus: 850,
    dMinus: 917,
    terrain: 'Plus long segment, falaises continues, St Ives Bay',
    difficulty: 'Tr\u00e8s difficile',
  },
  {
    from: 'Lelant',
    to: 'Godrevy',
    km: 10.2,
    dPlus: 310,
    dMinus: 309,
    terrain: 'Plages, dunes, terrain plus doux',
    difficulty: 'Facile',
  },
  {
    from: 'Godrevy',
    to: 'Portreath',
    km: 11.7,
    dPlus: 410,
    dMinus: 410,
    terrain: "Hell's Mouth, falaises, derni\u00e8res difficult\u00e9s techniques",
    difficulty: 'Mod\u00e9r\u00e9',
  },
  {
    from: 'Portreath',
    to: 'Finish',
    km: 7.1,
    dPlus: 331,
    dMinus: 237,
    terrain: 'Derni\u00e8re mont\u00e9e vers Portreath, finish en ville',
    difficulty: 'Mod\u00e9r\u00e9',
  },
]

// Key challenges specific to Arc of Attrition
export const aoaChallenges = [
  {
    title: 'M\u00e9t\u00e9o hivernal',
    description: 'Course en f\u00e9vrier : vent, pluie, froid possible. La c\u00f4te des Cornouailles est expos\u00e9e aux temp\u00eates atlantiques.',
    icon: 'Wind',
    color: 'blue',
  },
  {
    title: 'Navigation nocturne',
    description: '2 nuits compl\u00e8tes sur le parcours. Sentiers c\u00f4tiers \u00e9troits avec falaises \u00e0 proximit\u00e9.',
    icon: 'Moon',
    color: 'purple',
  },
  {
    title: 'Terrain technique',
    description: 'Sentiers rocheux, escaliers, passages de plages. Les chevilles sont mises \u00e0 rude \u00e9preuve.',
    icon: 'Mountain',
    color: 'orange',
  },
  {
    title: '5300m D+/D-',
    description: 'Mont\u00e9es et descentes constantes. Pas de longues sections plates. Les jambes ne r\u00e9cup\u00e8rent jamais.',
    icon: 'TrendingDown',
    color: 'red',
  },
]
