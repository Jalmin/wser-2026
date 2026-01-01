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
  segmentKm?: number
  segmentDplus?: number
  segmentDminus?: number
  // Terrain breakdown per segment (estimated from D+ and segment length)
  segmentUpKm?: number
  segmentFlatKm?: number
  segmentDownKm?: number
}

// Course stats from GPX analysis
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
  ratio: 0.99,
}

// Aid stations with segment data (from → to this station)
// Terrain breakdown calculated from D+/D- ratios
export const aoaAidStations: AoaAidStation[] = [
  { num: 1, name: 'Start - Coverack', km: 0, ele: 24, lat: 50.0262892, lon: -5.0991247 },
  { num: 2, name: 'Lizard Point', km: 16.9, ele: 31, lat: 49.9598117, lon: -5.20679, cutoff: '4h00', segmentKm: 16.9, segmentDplus: 520, segmentDminus: 513, segmentUpKm: 5.2, segmentFlatKm: 6.6, segmentDownKm: 5.1 },
  { num: 3, name: 'Porthleven', km: 39.5, ele: 7, lat: 50.0855884, lon: -5.3172296, cutoff: '9h30', segmentKm: 22.6, segmentDplus: 680, segmentDminus: 704, segmentUpKm: 6.8, segmentFlatKm: 8.8, segmentDownKm: 7.0 },
  { num: 4, name: 'Penzance', km: 63.4, ele: 6, lat: 50.1133408, lon: -5.5427366, cutoff: '15h00', segmentKm: 23.9, segmentDplus: 620, segmentDminus: 621, segmentUpKm: 6.2, segmentFlatKm: 11.5, segmentDownKm: 6.2 },
  { num: 5, name: 'Minack Theatre', km: 80.8, ele: 60, lat: 50.0410233, lon: -5.6525194, cutoff: '19h00', segmentKm: 17.4, segmentDplus: 740, segmentDminus: 686, segmentUpKm: 5.6, segmentFlatKm: 6.2, segmentDownKm: 5.6 },
  { num: 6, name: "Land's End", km: 88.2, ele: 65, lat: 50.0656303, lon: -5.7143873, cutoff: '21h00', segmentKm: 7.4, segmentDplus: 290, segmentDminus: 285, segmentUpKm: 2.3, segmentFlatKm: 2.8, segmentDownKm: 2.3 },
  { num: 7, name: 'Pendeen', km: 104.1, ele: 72, lat: 50.1620458, lon: -5.6696958, cutoff: '25h00', segmentKm: 15.9, segmentDplus: 590, segmentDminus: 583, segmentUpKm: 4.7, segmentFlatKm: 6.5, segmentDownKm: 4.7 },
  { num: 8, name: 'Lelant', km: 132.0, ele: 5, lat: 50.1794274, lon: -5.4417635, cutoff: '32h00', segmentKm: 27.9, segmentDplus: 850, segmentDminus: 917, segmentUpKm: 8.1, segmentFlatKm: 11.0, segmentDownKm: 8.8 },
  { num: 9, name: 'Godrevy', km: 142.2, ele: 6, lat: 50.2293819, lon: -5.3869164, cutoff: '34h30', segmentKm: 10.2, segmentDplus: 310, segmentDminus: 309, segmentUpKm: 3.1, segmentFlatKm: 4.0, segmentDownKm: 3.1 },
  { num: 10, name: 'Portreath', km: 153.9, ele: 6, lat: 50.2614534, lon: -5.2882417, cutoff: '37h00', segmentKm: 11.7, segmentDplus: 410, segmentDminus: 410, segmentUpKm: 3.5, segmentFlatKm: 4.7, segmentDownKm: 3.5 },
  { num: 11, name: 'Finish - Portreath', km: 161.0, ele: 100, lat: 50.2762997, lon: -5.234803, cutoff: '40h00', segmentKm: 7.1, segmentDplus: 331, segmentDminus: 237, segmentUpKm: 2.5, segmentFlatKm: 2.4, segmentDownKm: 2.2 },
]
