// Data extracted from WSER_Splits_Complet.xlsx
export interface SplitData {
  num: number
  name: string
  km: number
  sectionKm: number | null
  altitude: number
  dPlus: number | null
  dMinus: number | null
  upKm: number | null
  upPercent: string | null
  flatKm: number | null
  downKm: number | null
  downPercent: string | null
  jeffSplit: string | null
  jeffPace: string | null
  johannaSplit: string | null
  johannaPace: string | null
  jeremieSplit: string | null
  jeremiePace: string | null
  chrisSplit: string | null
  chrisPace: string | null
  nancySplit: string | null
  nancyPace: string | null
  // GPS coordinates from GPX
  lat: number
  lon: number
  // Section info
  section: 'high-country' | 'canyons' | 'california-loop' | 'final-push'
  sectionColor: string
}

export const wserSplits: SplitData[] = [
  {
    num: 0, name: 'Start (Olympic Valley)', km: 0, sectionKm: null, altitude: 1943,
    dPlus: null, dMinus: null, upKm: null, upPercent: null, flatKm: null, downKm: null, downPercent: null,
    jeffSplit: null, jeffPace: null, johannaSplit: null, johannaPace: null,
    jeremieSplit: null, jeremiePace: null, chrisSplit: null, chrisPace: null, nancySplit: null, nancyPace: null,
    lat: 39.19563, lon: -120.23647, section: 'high-country', sectionColor: '#3b82f6'
  },
  {
    num: 1, name: 'Escarpment', km: 6.4, sectionKm: 6.4, altitude: 2555,
    dPlus: 706, dMinus: 98, upKm: 5.2, upPercent: '+14%', flatKm: 0.2, downKm: 0.9, downPercent: '-10%',
    jeffSplit: '0:48:15', jeffPace: '7:32', johannaSplit: '0:49:32', johannaPace: '7:44',
    jeremieSplit: '0:45:28', jeremiePace: '7:06', chrisSplit: '0:50:08', chrisPace: '7:50', nancySplit: '0:50:22', nancyPace: '7:52',
    lat: 39.1924333, lon: -120.2726903, section: 'high-country', sectionColor: '#3b82f6'
  },
  {
    num: 2, name: 'Lyon Ridge', km: 16.6, sectionKm: 10.2, altitude: 2123,
    dPlus: 116, dMinus: 548, upKm: 1.0, upPercent: '+10%', flatKm: 2.5, downKm: 6.7, downPercent: '-8%',
    jeffSplit: '1:09:44', jeffPace: '6:50', johannaSplit: '1:03:38', johannaPace: '6:14',
    jeremieSplit: '1:02:41', jeremiePace: '6:08', chrisSplit: '1:09:41', chrisPace: '6:49', nancySplit: '1:11:43', nancyPace: '7:01',
    lat: 39.22384, lon: -120.3535, section: 'high-country', sectionColor: '#3b82f6'
  },
  {
    num: 3, name: 'Red Star Ridge', km: 25.4, sectionKm: 8.8, altitude: 2239,
    dPlus: 362, dMinus: 246, upKm: 3.8, upPercent: '+9%', flatKm: 2.0, downKm: 3.0, downPercent: '-7%',
    jeffSplit: '1:01:22', jeffPace: '6:58', johannaSplit: '0:58:31', johannaPace: '6:39',
    jeremieSplit: '0:55:41', jeremiePace: '6:19', chrisSplit: '1:00:38', chrisPace: '6:53', nancySplit: '1:01:05', nancyPace: '6:56',
    lat: 39.18797, lon: -120.41667, section: 'high-country', sectionColor: '#3b82f6'
  },
  {
    num: 4, name: 'Duncan Canyon', km: 39.3, sectionKm: 13.9, altitude: 1790,
    dPlus: 209, dMinus: 654, upKm: 3.0, upPercent: '+6%', flatKm: 2.5, downKm: 8.4, downPercent: '-7%',
    jeffSplit: '1:21:46', jeffPace: '5:53', johannaSplit: '1:15:18', johannaPace: '5:25',
    jeremieSplit: '1:15:59', jeremiePace: '5:27', chrisSplit: '1:24:12', chrisPace: '6:03', nancySplit: '1:22:59', nancyPace: '5:58',
    lat: 39.11917, lon: -120.48068, section: 'high-country', sectionColor: '#3b82f6'
  },
  {
    num: 5, name: 'Robinson Flat', km: 48.8, sectionKm: 9.5, altitude: 2057,
    dPlus: 503, dMinus: 240, upKm: 5.5, upPercent: '+9%', flatKm: 1.4, downKm: 2.5, downPercent: '-8%',
    jeffSplit: '1:13:11', jeffPace: '7:42', johannaSplit: '1:08:43', johannaPace: '7:14',
    jeremieSplit: '1:17:05', jeremiePace: '8:06', chrisSplit: '1:18:40', chrisPace: '8:16', nancySplit: '1:16:41', nancyPace: '8:04',
    lat: 39.15582, lon: -120.503, section: 'high-country', sectionColor: '#3b82f6'
  },
  {
    num: 6, name: "Miller's Defeat", km: 55.4, sectionKm: 6.6, altitude: 1909,
    dPlus: 109, dMinus: 256, upKm: 1.2, upPercent: '+7%', flatKm: 1.9, downKm: 3.5, downPercent: '-7%',
    jeffSplit: '0:42:14', jeffPace: '6:23', johannaSplit: '0:36:56', johannaPace: '5:35',
    jeremieSplit: '0:37:53', jeremiePace: '5:44', chrisSplit: '0:41:45', chrisPace: '6:19', nancySplit: '0:39:54', nancyPace: '6:02',
    lat: 39.11709, lon: -120.52576, section: 'canyons', sectionColor: '#f97316'
  },
  {
    num: 7, name: 'Dusty Corners', km: 61.2, sectionKm: 5.8, altitude: 1652,
    dPlus: 25, dMinus: 283, upKm: 0.4, upPercent: '+6%', flatKm: 2.0, downKm: 3.5, downPercent: '-7%',
    jeffSplit: '0:30:55', jeffPace: '5:19', johannaSplit: '0:29:41', johannaPace: '5:07',
    jeremieSplit: '0:31:37', jeremiePace: '5:27', chrisSplit: '0:32:49', chrisPace: '5:39', nancySplit: '0:31:32', nancyPace: '5:26',
    lat: 39.0979, lon: -120.58, section: 'canyons', sectionColor: '#f97316'
  },
  {
    num: 8, name: 'Last Chance', km: 69.7, sectionKm: 8.5, altitude: 1402,
    dPlus: 19, dMinus: 270, upKm: 0.3, upPercent: '+4%', flatKm: 5.3, downKm: 3.0, downPercent: '-8%',
    jeffSplit: '0:47:30', jeffPace: '5:35', johannaSplit: '0:44:37', johannaPace: '5:15',
    jeremieSplit: '0:48:33', jeremiePace: '5:42', chrisSplit: '0:45:03', chrisPace: '5:18', nancySplit: '0:49:40', nancyPace: '5:50',
    lat: 39.11021, lon: -120.62634, section: 'canyons', sectionColor: '#f97316'
  },
  {
    num: 9, name: "Devil's Thumb", km: 76.9, sectionKm: 7.2, altitude: 1277,
    dPlus: 440, dMinus: 564, upKm: 2.5, upPercent: '+18%', flatKm: 0.4, downKm: 4.2, downPercent: '-13%',
    jeffSplit: '1:04:45', jeffPace: '8:59', johannaSplit: '1:05:51', johannaPace: '9:08',
    jeremieSplit: '1:03:41', jeremiePace: '8:50', chrisSplit: '1:08:51', chrisPace: '9:33', nancySplit: '1:07:57', nancyPace: '9:26',
    lat: 39.09595, lon: -120.66461, section: 'canyons', sectionColor: '#f97316'
  },
  {
    num: 10, name: 'El Dorado Creek', km: 85.1, sectionKm: 8.2, altitude: 625,
    dPlus: 95, dMinus: 746, upKm: 0.7, upPercent: '+11%', flatKm: 1.2, downKm: 6.3, downPercent: '-12%',
    jeffSplit: '0:49:27', jeffPace: '6:01', johannaSplit: '0:49:22', johannaPace: '6:01',
    jeremieSplit: '0:59:07', jeremiePace: '7:12', chrisSplit: '0:58:17', chrisPace: '7:06', nancySplit: '0:53:52', nancyPace: '6:34',
    lat: 39.05022, lon: -120.70925, section: 'canyons', sectionColor: '#f97316'
  },
  {
    num: 11, name: 'Michigan Bluff', km: 89.7, sectionKm: 4.6, altitude: 1080,
    dPlus: 518, dMinus: 67, upKm: 4.1, upPercent: '+13%', flatKm: 0.2, downKm: 0.4, downPercent: '-16%',
    jeffSplit: '0:48:53', jeffPace: '10:37', johannaSplit: '0:46:32', johannaPace: '10:07',
    jeremieSplit: '1:02:46', jeremiePace: '13:38', chrisSplit: '0:57:48', chrisPace: '12:33', nancySplit: '0:49:16', nancyPace: '10:42',
    lat: 39.04097, lon: -120.73503, section: 'canyons', sectionColor: '#f97316'
  },
  {
    num: 12, name: 'Foresthill', km: 99.8, sectionKm: 10.1, altitude: 1004,
    dPlus: 360, dMinus: 431, upKm: 3.8, upPercent: '+9%', flatKm: 2.4, downKm: 3.9, downPercent: '-10%',
    jeffSplit: '1:16:30', jeffPace: '7:34', johannaSplit: '1:10:40', johannaPace: '6:59',
    jeremieSplit: '1:18:22', jeremiePace: '7:45', chrisSplit: '1:23:45', chrisPace: '8:17', nancySplit: '1:20:16', nancyPace: '7:56',
    lat: 39.02094, lon: -120.81297, section: 'canyons', sectionColor: '#f97316'
  },
  {
    num: 13, name: 'Cal-1 (Dardanelles)', km: 105.7, sectionKm: 5.9, altitude: 582,
    dPlus: 7, dMinus: 427, upKm: null, upPercent: null, flatKm: 1.8, downKm: 4.1, downPercent: '-10%',
    jeffSplit: '0:39:15', jeffPace: '6:39', johannaSplit: '0:33:37', johannaPace: '5:42',
    jeremieSplit: '0:47:08', jeremiePace: '7:59', chrisSplit: '0:38:45', chrisPace: '6:34', nancySplit: '0:38:52', nancyPace: '6:35',
    lat: 38.99474, lon: -120.82975, section: 'california-loop', sectionColor: '#06b6d4'
  },
  {
    num: 14, name: 'Cal-2 (Peachstone)', km: 113.8, sectionKm: 8.1, altitude: 506,
    dPlus: 172, dMinus: 249, upKm: 1.7, upPercent: '+9%', flatKm: 4.3, downKm: 2.1, downPercent: '-10%',
    jeffSplit: '0:54:37', jeffPace: '6:44', johannaSplit: '0:56:39', johannaPace: '6:59',
    jeremieSplit: '1:01:00', jeremiePace: '7:31', chrisSplit: '1:05:24', chrisPace: '8:04', nancySplit: '1:00:51', nancyPace: '7:30',
    lat: 38.97452, lon: -120.86057, section: 'california-loop', sectionColor: '#06b6d4'
  },
  {
    num: 15, name: "Cal-3 (Ford's Bar)", km: 117.5, sectionKm: 3.7, altitude: 364,
    dPlus: 86, dMinus: 226, upKm: 0.6, upPercent: '+14%', flatKm: 0.7, downKm: 2.3, downPercent: '-8%',
    jeffSplit: '0:42:29', jeffPace: '11:28', johannaSplit: '0:31:15', johannaPace: '8:26',
    jeremieSplit: '0:35:52', jeremiePace: '9:41', chrisSplit: '0:32:07', chrisPace: '8:40', nancySplit: '0:34:52', nancyPace: '9:25',
    lat: 38.95443, lon: -120.85949, section: 'california-loop', sectionColor: '#06b6d4'
  },
  {
    num: 16, name: 'Rucky Chucky', km: 125.5, sectionKm: 8.0, altitude: 236,
    dPlus: 128, dMinus: 254, upKm: 1.7, upPercent: '+7%', flatKm: 3.5, downKm: 2.8, downPercent: '-8%',
    jeffSplit: '0:45:15', jeffPace: '5:39', johannaSplit: '0:53:38', johannaPace: '6:42',
    jeremieSplit: '0:52:07', jeremiePace: '6:30', chrisSplit: '0:49:06', chrisPace: '6:08', nancySplit: '0:52:51', nancyPace: '6:36',
    lat: 38.96264, lon: -120.93066, section: 'california-loop', sectionColor: '#06b6d4'
  },
  {
    num: 17, name: 'Green Gate', km: 128.4, sectionKm: 2.9, altitude: 434,
    dPlus: 202, dMinus: 10, upKm: 2.7, upPercent: '+7%', flatKm: 0.1, downKm: 0.2, downPercent: '-7%',
    jeffSplit: '0:25:45', jeffPace: '8:52', johannaSplit: '0:30:21', johannaPace: '10:27',
    jeremieSplit: '0:36:52', jeremiePace: '12:42', chrisSplit: '0:30:53', chrisPace: '10:39', nancySplit: '0:28:08', nancyPace: '9:42',
    lat: 38.9509, lon: -120.93078, section: 'california-loop', sectionColor: '#06b6d4'
  },
  {
    num: 18, name: 'Auburn Lake Trails', km: 137.1, sectionKm: 8.7, altitude: 443,
    dPlus: 190, dMinus: 180, upKm: 2.3, upPercent: '+7%', flatKm: 4.3, downKm: 2.1, downPercent: '-7%',
    jeffSplit: '0:55:37', jeffPace: '6:23', johannaSplit: '1:08:10', johannaPace: '7:50',
    jeremieSplit: '1:04:54', jeremiePace: '7:27', chrisSplit: '1:15:05', chrisPace: '8:37', nancySplit: '1:10:31', nancyPace: '8:06',
    lat: 38.92682, lon: -120.95053, section: 'final-push', sectionColor: '#10b981'
  },
  {
    num: 19, name: 'Quarry Road', km: 146.0, sectionKm: 8.9, altitude: 244,
    dPlus: 54, dMinus: 250, upKm: 0.5, upPercent: '+6%', flatKm: 5.3, downKm: 3.0, downPercent: '-6%',
    jeffSplit: '0:56:06', jeffPace: '6:18', johannaSplit: '1:11:49', johannaPace: '8:04',
    jeremieSplit: '1:06:33', jeremiePace: '7:28', chrisSplit: '1:03:23', chrisPace: '7:07', nancySplit: '1:11:00', nancyPace: '7:58',
    lat: 38.9262, lon: -120.98814, section: 'final-push', sectionColor: '#10b981'
  },
  {
    num: 20, name: 'Pointed Rocks', km: 151.8, sectionKm: 5.8, altitude: 486,
    dPlus: 297, dMinus: 58, upKm: 3.7, upPercent: '+8%', flatKm: 1.5, downKm: 0.6, downPercent: '-8%',
    jeffSplit: '0:55:04', jeffPace: '9:29', johannaSplit: '1:00:32', johannaPace: '10:26',
    jeremieSplit: '0:52:33', jeremiePace: '9:03', chrisSplit: '0:52:10', chrisPace: '8:59', nancySplit: '1:01:51', nancyPace: '10:39',
    lat: 38.89522, lon: -121.02357, section: 'final-push', sectionColor: '#10b981'
  },
  {
    num: 21, name: 'Robie Point', km: 159.2, sectionKm: 7.4, altitude: 334,
    dPlus: 150, dMinus: 303, upKm: 1.3, upPercent: '+9%', flatKm: 2.1, downKm: 3.9, downPercent: '-7%',
    jeffSplit: '1:08:53', jeffPace: '9:18', johannaSplit: '1:11:06', johannaPace: '9:36',
    jeremieSplit: '0:56:49', jeremiePace: '7:40', chrisSplit: '0:51:30', chrisPace: '6:57', nancySplit: '1:08:19', nancyPace: '9:14',
    lat: 38.89241, lon: -121.05387, section: 'final-push', sectionColor: '#10b981'
  },
  {
    num: 22, name: 'Finish (Auburn)', km: 161.3, sectionKm: 2.1, altitude: 404,
    dPlus: 99, dMinus: 27, upKm: 1.0, upPercent: '+9%', flatKm: 0.7, downKm: 0.4, downPercent: '-6%',
    jeffSplit: '0:15:15', jeffPace: '7:16', johannaSplit: '0:16:36', johannaPace: '7:54',
    jeremieSplit: '0:14:32', jeremiePace: '6:55', chrisSplit: '0:15:40', chrisPace: '7:28', nancySplit: '0:14:41', nancyPace: '6:59',
    lat: 38.89472, lon: -121.0678, section: 'final-push', sectionColor: '#10b981'
  },
]

export const sections = [
  { id: 'high-country', name: 'High Country', kmStart: 0, kmEnd: 55.4, color: '#3b82f6' },
  { id: 'canyons', name: 'The Canyons', kmStart: 55.4, kmEnd: 99.8, color: '#f97316' },
  { id: 'california-loop', name: 'California Loop', kmStart: 99.8, kmEnd: 128.4, color: '#06b6d4' },
  { id: 'final-push', name: 'Final Push', kmStart: 128.4, kmEnd: 161.3, color: '#10b981' },
]

export const totals = {
  km: 163.4, // Official distance
  dPlus: 6004,
  dMinus: 7536,
  upKm: 47,
  flatKm: 46.3,
  downKm: 67.8,
  jeffTotal: '19:12:58',
  johannaTotal: '19:13:16',
  jeremieTotal: '19:47:24',
  chrisTotal: '20:05:51',
  nancyTotal: '20:17:24',
}
