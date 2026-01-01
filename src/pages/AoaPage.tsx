import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp, Wind, Moon, Mountain, TrendingDown, MapPin } from 'lucide-react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { aoaStats, aoaAidStations, aoaSections, aoaSegments, aoaChallenges, type AoaAidStation } from '../data/aoaData'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || ''

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <p className="kicker">{kicker}</p>
      <h2 className="headline-lg">{title}</h2>
    </div>
  )
}

// Simple elevation profile component for AOA
function AoaElevationProfile({ elevationData }: { elevationData: { distance: number; elevation: number }[] }) {
  if (elevationData.length === 0) return null

  const maxEle = Math.max(...elevationData.map(d => d.elevation))
  const minEle = Math.min(...elevationData.map(d => d.elevation))
  const range = maxEle - minEle || 1

  // Sample every 10th point for performance
  const sampled = elevationData.filter((_, i) => i % 10 === 0)

  const points = sampled.map((d, i) => {
    const x = (i / (sampled.length - 1)) * 100
    const y = 100 - ((d.elevation - minEle) / range) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
      <div className="flex justify-between text-xs text-zinc-500 mb-2">
        <span>0 km</span>
        <span>Profil d'altitude</span>
        <span>{aoaStats.distance_km} km</span>
      </div>
      <div className="relative h-32">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="aoa-ele-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            points={`0,100 ${points} 100,100`}
            fill="url(#aoa-ele-gradient)"
          />
          <polyline
            points={points}
            fill="none"
            stroke="#f97316"
            strokeWidth="0.5"
          />
        </svg>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 text-[10px] text-zinc-500">{maxEle.toFixed(0)}m</div>
        <div className="absolute left-0 bottom-0 text-[10px] text-zinc-500">{minEle.toFixed(0)}m</div>
      </div>
      {/* Section markers */}
      <div className="flex justify-between mt-2">
        {aoaSections.map((section) => (
          <div key={section.id} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: section.color }} />
            <span className="text-[10px] text-zinc-500">{section.name.split(' ')[0]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Map component for AOA
function AoaMap({
  gpxData,
  selectedStation,
  onStationSelect,
}: {
  gpxData: GeoJSON.FeatureCollection | null
  selectedStation: AoaAidStation | null
  onStationSelect: (station: AoaAidStation | null) => void
}) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return

    mapboxgl.accessToken = MAPBOX_TOKEN

    // Cornwall center
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-5.4, 50.1],
      zoom: 9,
      pitch: 45,
      bearing: -10,
      antialias: true,
    })

    map.current.on('load', () => {
      try {
        map.current!.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14,
        })

        map.current!.setTerrain({
          source: 'mapbox-dem',
          exaggeration: 2,
        })

        map.current!.addLayer({
          id: 'sky',
          type: 'sky',
          paint: {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 90.0],
            'sky-atmosphere-sun-intensity': 15,
          },
        } as mapboxgl.AnyLayer)
      } catch (error) {
        console.warn('3D terrain not supported:', error)
      }

      setMapLoaded(true)
    })

    map.current.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      'top-right'
    )

    return () => {
      map.current?.remove()
    }
  }, [])

  // Add GPX track
  useEffect(() => {
    if (!map.current || !mapLoaded || !gpxData) return

    const coordinates = (gpxData.features[0]?.geometry as GeoJSON.LineString)?.coordinates || []
    const totalKm = aoaStats.distance_km

    // Add sections
    aoaSections.forEach((section) => {
      const sourceId = `route-${section.id}`
      const layerId = `route-line-${section.id}`

      if (map.current!.getLayer(layerId)) map.current!.removeLayer(layerId)
      if (map.current!.getSource(sourceId)) map.current!.removeSource(sourceId)

      const startRatio = section.kmStart / totalKm
      const endRatio = section.kmEnd / totalKm
      const startIdx = Math.floor(startRatio * coordinates.length)
      const endIdx = Math.ceil(endRatio * coordinates.length)

      const sectionCoords = coordinates.slice(startIdx, endIdx + 1)

      map.current!.addSource(sourceId, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { section: section.id },
          geometry: {
            type: 'LineString',
            coordinates: sectionCoords,
          },
        },
      })

      map.current!.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': section.color,
          'line-width': 4,
          'line-opacity': 1,
        },
      })
    })
  }, [gpxData, mapLoaded])

  // Add aid station markers
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    aoaAidStations.forEach((station) => {
      const section = aoaSections.find(s => station.km >= s.kmStart && station.km <= s.kmEnd)
      const color = section?.color || '#f97316'

      const wrapper = document.createElement('div')
      wrapper.style.cssText = `
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      `

      const dot = document.createElement('div')
      dot.style.cssText = `
        width: 12px;
        height: 12px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.5);
        transition: all 0.15s ease;
      `
      wrapper.appendChild(dot)

      wrapper.addEventListener('mouseenter', () => {
        dot.style.width = '16px'
        dot.style.height = '16px'
      })

      wrapper.addEventListener('mouseleave', () => {
        dot.style.width = '12px'
        dot.style.height = '12px'
      })

      wrapper.addEventListener('click', (e) => {
        e.stopPropagation()
        onStationSelect(station)
      })

      const marker = new mapboxgl.Marker({ element: wrapper, anchor: 'center' })
        .setLngLat([station.lon, station.lat])
        .addTo(map.current!)

      markersRef.current.push(marker)
    })
  }, [mapLoaded, onStationSelect])

  // Zoom to selected station
  useEffect(() => {
    if (!map.current || !selectedStation) return

    map.current.flyTo({
      center: [selectedStation.lon, selectedStation.lat],
      zoom: 12,
      duration: 1000,
    })
  }, [selectedStation])

  if (!MAPBOX_TOKEN || !MAPBOX_TOKEN.startsWith('pk.')) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="text-center p-8">
          <p className="text-zinc-400 mb-4">Token Mapbox requis</p>
          <code className="block mt-2 p-2 bg-zinc-800 rounded text-xs text-orange-400">
            VITE_MAPBOX_TOKEN=pk.votre_token
          </code>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full">
      <div ref={mapContainer} className="h-full rounded-xl overflow-hidden" />

      {/* Section legend */}
      <div className="absolute top-4 left-4 bg-zinc-900/90 backdrop-blur-sm rounded-lg p-3 border border-zinc-700">
        <div className="text-xs text-zinc-400 mb-2 font-semibold uppercase tracking-wider">Sections</div>
        <div className="space-y-1.5">
          {aoaSections.map((section) => (
            <div key={section.id} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: section.color }} />
              <span className="text-xs text-zinc-400">{section.name}</span>
              <span className="text-[10px] text-zinc-500 ml-auto">{section.kmStart}-{section.kmEnd}km</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reset button */}
      {selectedStation && (
        <button
          onClick={() => {
            onStationSelect(null)
            map.current?.flyTo({
              center: [-5.4, 50.1],
              zoom: 9,
              pitch: 45,
              bearing: -10,
              duration: 1000,
            })
          }}
          className="absolute top-4 right-16 bg-zinc-900/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-zinc-700 text-xs text-zinc-300 hover:bg-zinc-800 transition-colors"
        >
          Vue globale
        </button>
      )}
    </div>
  )
}

export function AoaPage() {
  const [gpxData, setGpxData] = useState<GeoJSON.FeatureCollection | null>(null)
  const [elevationData, setElevationData] = useState<{ distance: number; elevation: number; lat: number; lon: number }[]>([])
  const [selectedStation, setSelectedStation] = useState<AoaAidStation | null>(null)
  const [expandedSection, setExpandedSection] = useState<number | null>(null)

  // Load GPX data
  useEffect(() => {
    async function loadGpx() {
      try {
        const response = await fetch('/AOA_2026.gpx')
        const gpxText = await response.text()
        const parser = new DOMParser()
        const gpx = parser.parseFromString(gpxText, 'text/xml')

        const trackPoints = gpx.querySelectorAll('trkpt')
        const coordinates: [number, number, number][] = []
        const eleData: { distance: number; elevation: number; lat: number; lon: number }[] = []

        let cumulativeDistance = 0

        trackPoints.forEach((pt, i) => {
          const lat = parseFloat(pt.getAttribute('lat') || '0')
          const lon = parseFloat(pt.getAttribute('lon') || '0')
          const eleNode = pt.querySelector('ele')
          const ele = eleNode ? parseFloat(eleNode.textContent || '0') : 0

          if (i > 0) {
            const prevLat = coordinates[i - 1][1]
            const prevLon = coordinates[i - 1][0]
            const R = 6371000
            const phi1 = prevLat * Math.PI / 180
            const phi2 = lat * Math.PI / 180
            const deltaPhi = (lat - prevLat) * Math.PI / 180
            const deltaLambda = (lon - prevLon) * Math.PI / 180

            const a = Math.sin(deltaPhi / 2) ** 2 + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
            cumulativeDistance += R * c / 1000
          }

          coordinates.push([lon, lat, ele])
          eleData.push({ distance: cumulativeDistance, elevation: ele, lat, lon })
        })

        const track: GeoJSON.FeatureCollection = {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates,
            },
          }],
        }

        setGpxData(track)
        setElevationData(eleData)
      } catch (err) {
        console.error('Error loading GPX:', err)
      }
    }

    loadGpx()
  }, [])

  const getChallengeIcon = (icon: string) => {
    switch (icon) {
      case 'Wind': return <Wind className="w-8 h-8 text-blue-500" />
      case 'Moon': return <Moon className="w-8 h-8 text-purple-500" />
      case 'Mountain': return <Mountain className="w-8 h-8 text-orange-500" />
      case 'TrendingDown': return <TrendingDown className="w-8 h-8 text-red-500" />
      default: return <MapPin className="w-8 h-8 text-zinc-500" />
    }
  }

  return (
    <div className="space-y-12">
      {/* Hero with Map */}
      <header className="relative -mx-4 md:-mx-6 -mt-6">
        <div className="relative h-[500px] md:h-[600px]">
          <AoaMap
            gpxData={gpxData}
            selectedStation={selectedStation}
            onStationSelect={setSelectedStation}
          />
        </div>

        {/* Elevation Profile */}
        <div className="mt-4 px-4 md:px-6">
          <AoaElevationProfile elevationData={elevationData} />
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          {[
            { value: aoaStats.distance_km.toFixed(0), unit: 'km', label: 'Distance' },
            { value: aoaStats.ascent_m.toFixed(0), unit: 'm', label: 'D+' },
            { value: aoaStats.descent_m.toFixed(0), unit: 'm', label: 'D-' },
            { value: aoaStats.ratio.toFixed(2), unit: '', label: 'Ratio D-/D+' },
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

      {/* Vue d'ensemble */}
      <section>
        <SectionHeader kicker="Vue d'ensemble" title="Arc of Attrition 2026" />

        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 mt-6">
          <p className="text-base-lg text-zinc-300 leading-relaxed">
            <strong className="text-orange-400">161 km de sentier côtier</strong> autour de la pointe des Cornouailles.
            Course d'hiver (février) avec météo imprévisible, 2 nuits complètes et terrain technique constant.
          </p>
          <p className="text-sm text-zinc-400 mt-4">
            Contrairement à WSER où le D- domine, l'AoA est équilibrée (ratio 0.99).
            La difficulté vient du terrain technique, de l'exposition aux éléments et de la gestion de la fatigue sur 2 nuits.
          </p>
        </div>

        {/* Stats détaillées */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <h4 className="font-semibold text-zinc-200 mb-4">Stats principales</h4>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Distance', value: `${aoaStats.distance_km} km (100 miles)` },
                { label: 'D+', value: `${aoaStats.ascent_m} m` },
                { label: 'D-', value: `${aoaStats.descent_m} m` },
                { label: 'Ratio D-/D+', value: aoaStats.ratio.toFixed(2) },
                { label: 'Altitude min', value: `${aoaStats.min_ele_m} m (niveau mer)` },
                { label: 'Altitude max', value: `${aoaStats.max_ele_m} m` },
                { label: 'Barrière horaire', value: '40h00' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-zinc-400">{item.label}</span>
                  <span className="font-mono text-zinc-200">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-6">
            <h4 className="font-semibold text-zinc-200 mb-4">Répartition terrain</h4>

            <div className="flex h-4 rounded-full overflow-hidden mb-4">
              <div className="bg-blue-500" style={{ width: `${aoaStats.uphill_pct}%` }} />
              <div className="bg-zinc-600" style={{ width: `${aoaStats.flat_pct}%` }} />
              <div className="bg-orange-500" style={{ width: `${aoaStats.downhill_pct}%` }} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded bg-blue-500" />
                  <span className="font-display font-bold text-xl text-white">{aoaStats.uphill_pct}%</span>
                </div>
                <div className="text-sm text-zinc-400">Montée ↑</div>
                <div className="text-xs text-zinc-600">{aoaStats.uphill_km} km</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded bg-zinc-600" />
                  <span className="font-display font-bold text-xl text-white">{aoaStats.flat_pct}%</span>
                </div>
                <div className="text-sm text-zinc-400">Plat →</div>
                <div className="text-xs text-zinc-600">{aoaStats.flat_km} km</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded bg-orange-500" />
                  <span className="font-display font-bold text-xl text-white">{aoaStats.downhill_pct}%</span>
                </div>
                <div className="text-sm text-zinc-400">Descente ↓</div>
                <div className="text-xs text-zinc-600">{aoaStats.downhill_km} km</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Les 4 sections */}
      <section>
        <SectionHeader kicker="Anatomie" title="Les 4 grandes sections" />

        <div className="space-y-4 mt-6">
          {aoaSections.map((section, idx) => (
            <div key={section.id} className={`data-card overflow-hidden border-l-4`} style={{ borderLeftColor: section.color }}>
              <button
                onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
                className="w-full p-5 text-left flex items-start gap-4 cursor-pointer"
              >
                <span className="font-display text-4xl font-bold text-zinc-800">{String(idx + 1).padStart(2, '0')}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-xl text-white">{section.name}</h3>
                      <span className="text-sm" style={{ color: section.color }}>{section.kmStart}-{section.kmEnd} km</span>
                    </div>
                    {expandedSection === idx ? (
                      <ChevronUp className="w-5 h-5 text-zinc-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-500" />
                    )}
                  </div>
                </div>
              </button>

              {expandedSection === idx && (
                <div className="px-5 pb-5 pt-0">
                  <div className="ml-14 border-t border-zinc-800 pt-4">
                    <p className="text-sm text-zinc-400">{section.description}</p>

                    {/* Segments in this section */}
                    <div className="mt-4 space-y-2">
                      {aoaSegments
                        .filter(seg => {
                          const fromStation = aoaAidStations.find(s => s.name.includes(seg.from) || seg.from === 'Start')
                          const toStation = aoaAidStations.find(s => s.name.includes(seg.to) || seg.to === 'Finish')
                          if (!fromStation || !toStation) return false
                          return toStation.km >= section.kmStart && fromStation.km < section.kmEnd
                        })
                        .map((seg) => (
                          <div key={seg.from + seg.to} className="flex items-center justify-between p-2 bg-zinc-800/30 rounded text-xs">
                            <span className="text-zinc-300">{seg.from} → {seg.to}</span>
                            <div className="flex items-center gap-3 text-zinc-500">
                              <span>{seg.km} km</span>
                              <span className="text-emerald-400">+{seg.dPlus}m</span>
                              <span className="text-red-400">-{seg.dMinus}m</span>
                              <span className={
                                seg.difficulty === 'Très difficile' ? 'text-red-400 font-semibold' :
                                seg.difficulty === 'Difficile' ? 'text-orange-400' :
                                'text-zinc-400'
                              }>{seg.difficulty}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Ravitaillements */}
      <section>
        <SectionHeader kicker="Ravitaillements" title="Les 11 postes" />

        <div className="overflow-x-auto mt-6">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-2 font-semibold text-zinc-400">#</th>
                <th className="text-left py-3 px-2 font-semibold text-zinc-400">Ravito</th>
                <th className="text-left py-3 px-2 font-semibold text-zinc-400">Km</th>
                <th className="text-left py-3 px-2 font-semibold text-zinc-400 hidden sm:table-cell">Alt.</th>
                <th className="text-left py-3 px-2 font-semibold text-zinc-400">Cutoff</th>
                <th className="text-left py-3 px-2 font-semibold text-zinc-400 hidden lg:table-cell">Services</th>
              </tr>
            </thead>
            <tbody>
              {aoaAidStations.map((station) => (
                <tr
                  key={station.num}
                  className={`border-b border-zinc-800/50 hover:bg-zinc-800/20 cursor-pointer ${
                    station.name.includes("Land's End") ? 'bg-orange-500/5' : ''
                  }`}
                  onClick={() => setSelectedStation(station)}
                >
                  <td className="py-3 px-2 font-mono text-zinc-500">{station.num}</td>
                  <td className="py-3 px-2">
                    <span className={station.name.includes("Land's End") ? 'font-semibold text-orange-400' : 'text-zinc-200'}>
                      {station.name}
                    </span>
                  </td>
                  <td className="py-3 px-2 font-mono text-zinc-300">{station.km.toFixed(1)}</td>
                  <td className="py-3 px-2 font-mono text-zinc-500 hidden sm:table-cell">{station.ele}m</td>
                  <td className="py-3 px-2">
                    {station.cutoff ? (
                      <span className="font-mono text-red-400 font-semibold">{station.cutoff}</span>
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-zinc-500 text-xs hidden lg:table-cell">{station.services}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Défis spécifiques */}
      <section>
        <SectionHeader kicker="Les défis" title="Ce qui rend l'AoA unique" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {aoaChallenges.map((challenge) => (
            <div key={challenge.title} className={`data-card p-5 border-${challenge.color}-500/30`}>
              {getChallengeIcon(challenge.icon)}
              <h3 className={`font-display font-bold text-lg text-${challenge.color}-400 mt-4 mb-2`}>
                {challenge.title}
              </h3>
              <p className="text-sm text-zinc-400">{challenge.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Segments détaillés */}
      <section>
        <SectionHeader kicker="Roadbook" title="Analyse segment par segment" />

        <div className="overflow-x-auto mt-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-3 font-semibold text-zinc-400">Segment</th>
                <th className="text-left py-3 px-3 font-semibold text-zinc-400">Km</th>
                <th className="text-left py-3 px-3 font-semibold text-zinc-400">D+</th>
                <th className="text-left py-3 px-3 font-semibold text-zinc-400">D-</th>
                <th className="text-left py-3 px-3 font-semibold text-zinc-400 hidden md:table-cell">Terrain</th>
                <th className="text-left py-3 px-3 font-semibold text-zinc-400">Difficulté</th>
              </tr>
            </thead>
            <tbody>
              {aoaSegments.map((seg) => (
                <tr key={seg.from + seg.to} className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                  <td className="py-3 px-3 text-zinc-200">{seg.from} → {seg.to}</td>
                  <td className="py-3 px-3 font-mono text-zinc-300">{seg.km}</td>
                  <td className="py-3 px-3 font-mono text-emerald-400">+{seg.dPlus}</td>
                  <td className="py-3 px-3 font-mono text-red-400">-{seg.dMinus}</td>
                  <td className="py-3 px-3 text-zinc-400 text-xs hidden md:table-cell">{seg.terrain}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      seg.difficulty === 'Très difficile' ? 'bg-red-500/20 text-red-400' :
                      seg.difficulty === 'Difficile' ? 'bg-orange-500/20 text-orange-400' :
                      seg.difficulty === 'Facile' ? 'bg-emerald-500/20 text-emerald-400' :
                      'bg-zinc-700 text-zinc-300'
                    }`}>
                      {seg.difficulty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer note */}
      <div className="text-center text-xs text-zinc-600 py-4">
        Page cachée — Arc of Attrition 2026, 25-26 janvier
      </div>
    </div>
  )
}
