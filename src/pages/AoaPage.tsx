import { useState, useEffect, useRef, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { aoaStats, aoaAidStations, type AoaAidStation } from '../data/aoaData'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || ''

interface ElevationPoint {
  distance: number
  elevation: number
  lon: number
  lat: number
}

interface CursorPoint {
  distance: number
  elevation: number
  lon: number
  lat: number
  gradient?: number // slope in %
}

// Elevation profile with cursor sync
function AoaElevationProfile({
  elevationData,
  aidStations,
  cursorPoint,
  onCursorMove,
  onCursorLeave,
  onSegmentClick,
  activeSegment,
}: {
  elevationData: ElevationPoint[]
  aidStations: AoaAidStation[]
  cursorPoint: CursorPoint | null
  onCursorMove: (point: CursorPoint) => void
  onCursorLeave: () => void
  onSegmentClick: (startKm: number, endKm: number) => void
  activeSegment: { startKm: number; endKm: number } | null
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const totalDistance = aoaStats.distance_km

  // Find closest point on mouse move - hook must be before any conditional returns
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || elevationData.length === 0) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - 40 // account for Y-axis labels
    const width = rect.width - 40
    const ratio = Math.max(0, Math.min(1, x / width))
    const targetDist = ratio * totalDistance

    // Find closest point
    let closest = elevationData[0]
    let minDiff = Math.abs(elevationData[0].distance - targetDist)

    for (const point of elevationData) {
      const diff = Math.abs(point.distance - targetDist)
      if (diff < minDiff) {
        minDiff = diff
        closest = point
      }
    }

    // Calculate gradient (slope)
    const idx = elevationData.indexOf(closest)
    let gradient = 0
    if (idx > 0 && idx < elevationData.length - 1) {
      const prev = elevationData[idx - 10] || elevationData[0]
      const next = elevationData[idx + 10] || elevationData[elevationData.length - 1]
      const distDiff = (next.distance - prev.distance) * 1000 // m
      const eleDiff = next.elevation - prev.elevation
      if (distDiff > 0) gradient = (eleDiff / distDiff) * 100
    }

    onCursorMove({
      distance: closest.distance,
      elevation: closest.elevation,
      lon: closest.lon,
      lat: closest.lat,
      gradient,
    })
  }, [elevationData, totalDistance, onCursorMove])

  // Early return AFTER hooks
  if (elevationData.length === 0) return null

  const maxEle = Math.max(...elevationData.map(d => d.elevation))
  const minEle = Math.min(...elevationData.map(d => d.elevation))
  const padding = 10
  const effectiveMin = Math.max(0, minEle - padding)
  const effectiveMax = maxEle + padding
  const range = effectiveMax - effectiveMin

  const sampled = elevationData.filter((_, i) => i % 3 === 0)

  const getY = (ele: number) => 100 - ((ele - effectiveMin) / range) * 100
  const getX = (dist: number) => (dist / totalDistance) * 100

  const pathPoints = sampled.map(d => `${getX(d.distance)},${getY(d.elevation)}`).join(' ')

  // Get terrain type from gradient
  const getTerrainType = (gradient: number) => {
    if (gradient > 3) return { label: 'Montée', color: 'text-blue-400', icon: '↗' }
    if (gradient < -3) return { label: 'Descente', color: 'text-orange-400', icon: '↘' }
    return { label: 'Plat', color: 'text-zinc-400', icon: '→' }
  }

  return (
    <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-zinc-300">Profil altimétrique</span>
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span>{aoaStats.distance_km} km</span>
          <span className="text-emerald-400">+{aoaStats.ascent_m}m</span>
          <span className="text-red-400">-{aoaStats.descent_m}m</span>
        </div>
      </div>

      {/* Cursor info bar */}
      {cursorPoint && (
        <div className="flex items-center gap-6 mb-3 px-2 py-2 bg-zinc-800/50 rounded-lg text-xs">
          <div>
            <span className="text-zinc-500">Km </span>
            <span className="font-mono text-white">{cursorPoint.distance.toFixed(1)}</span>
          </div>
          <div>
            <span className="text-zinc-500">Alt </span>
            <span className="font-mono text-white">{cursorPoint.elevation.toFixed(0)}m</span>
          </div>
          <div>
            <span className="text-zinc-500">Pente </span>
            <span className={`font-mono ${cursorPoint.gradient && cursorPoint.gradient > 3 ? 'text-blue-400' : cursorPoint.gradient && cursorPoint.gradient < -3 ? 'text-orange-400' : 'text-zinc-400'}`}>
              {cursorPoint.gradient ? `${cursorPoint.gradient > 0 ? '+' : ''}${cursorPoint.gradient.toFixed(1)}%` : '—'}
            </span>
          </div>
          {cursorPoint.gradient !== undefined && (
            <div className={getTerrainType(cursorPoint.gradient).color}>
              {getTerrainType(cursorPoint.gradient).icon} {getTerrainType(cursorPoint.gradient).label}
            </div>
          )}
        </div>
      )}

      <div
        ref={containerRef}
        className="relative h-40 cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={onCursorLeave}
      >
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-[10px] text-zinc-500 pr-2 pointer-events-none">
          <span>{effectiveMax.toFixed(0)}m</span>
          <span>{((effectiveMax + effectiveMin) / 2).toFixed(0)}m</span>
          <span>{effectiveMin.toFixed(0)}m</span>
        </div>

        {/* Chart area */}
        <div className="ml-10 h-full relative">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            {/* Grid lines */}
            <line x1="0" y1="25" x2="100" y2="25" stroke="#27272a" strokeWidth="0.2" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#27272a" strokeWidth="0.2" />
            <line x1="0" y1="75" x2="100" y2="75" stroke="#27272a" strokeWidth="0.2" />

            {/* Aid station vertical lines */}
            {aidStations.slice(1).map((station) => (
              <line
                key={station.num}
                x1={getX(station.km)}
                y1="0"
                x2={getX(station.km)}
                y2="100"
                stroke="#3f3f46"
                strokeWidth="0.3"
                strokeDasharray="2,2"
              />
            ))}

            {/* Active segment highlight */}
            {activeSegment && (
              <rect
                x={getX(activeSegment.startKm)}
                y="0"
                width={getX(activeSegment.endKm) - getX(activeSegment.startKm)}
                height="100"
                fill="#f97316"
                fillOpacity="0.15"
              />
            )}

            {/* Elevation fill */}
            <defs>
              <linearGradient id="aoa-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon
              points={`0,100 ${pathPoints} 100,100`}
              fill="url(#aoa-gradient)"
            />

            {/* Elevation line */}
            <polyline
              points={pathPoints}
              fill="none"
              stroke="#f97316"
              strokeWidth="0.3"
            />

            {/* Cursor vertical line */}
            {cursorPoint && (
              <>
                <line
                  x1={getX(cursorPoint.distance)}
                  y1="0"
                  x2={getX(cursorPoint.distance)}
                  y2="100"
                  stroke="#fff"
                  strokeWidth="0.3"
                  strokeDasharray="1,1"
                />
                <circle
                  cx={getX(cursorPoint.distance)}
                  cy={getY(cursorPoint.elevation)}
                  r="1.5"
                  fill="#fff"
                  stroke="#f97316"
                  strokeWidth="0.5"
                />
              </>
            )}

            {/* Aid station dots */}
            {aidStations.map((station) => (
              <circle
                key={station.num}
                cx={getX(station.km)}
                cy={getY(station.ele)}
                r="0.8"
                fill="#fff"
                stroke="#f97316"
                strokeWidth="0.3"
              />
            ))}
          </svg>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full pt-1 pointer-events-none">
            {aidStations.filter((_, i) => i % 2 === 0 || i === aidStations.length - 1).map((station) => (
              <span
                key={station.num}
                className="text-[9px] text-zinc-500 absolute"
                style={{ left: `${getX(station.km)}%`, transform: 'translateX(-50%)' }}
              >
                {station.km.toFixed(1)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Clickable segment zones for zooming */}
      <div className="mt-4 ml-10 flex">
        {aidStations.slice(1).map((station, i) => {
          const prevKm = aidStations[i].km
          const width = ((station.km - prevKm) / totalDistance) * 100
          const isActive = activeSegment && activeSegment.startKm === prevKm && activeSegment.endKm === station.km
          return (
            <button
              key={station.num}
              className={`text-center border-r border-zinc-800 last:border-r-0 py-2 transition-colors cursor-pointer group ${
                isActive ? 'bg-orange-500/20' : 'hover:bg-zinc-800/50'
              }`}
              style={{ width: `${width}%` }}
              onClick={() => onSegmentClick(prevKm, station.km)}
              title={`Zoom sur ${aidStations[i].name.split(' ').pop()} → ${station.name.split(' ').pop()}`}
            >
              <div className={`text-[8px] truncate px-0.5 transition-colors ${
                isActive ? 'text-orange-400 font-semibold' : 'text-zinc-600 group-hover:text-orange-400'
              }`}>
                {station.name.replace('Start - ', '').replace('Finish - ', '').split(' ')[0]}
              </div>
            </button>
          )
        })}
      </div>
      <div className="ml-10 mt-1 text-[9px] text-zinc-600 text-center">
        Cliquez sur un segment pour zoomer
      </div>
    </div>
  )
}

// Map component with cursor sync
function AoaMap({
  gpxData,
  elevationData,
  cursorPoint,
  onCursorMove,
  onCursorLeave,
  zoomToSegment,
  onMapClick,
}: {
  gpxData: GeoJSON.FeatureCollection | null
  elevationData: ElevationPoint[]
  cursorPoint: CursorPoint | null
  onCursorMove: (point: CursorPoint) => void
  onCursorLeave: () => void
  zoomToSegment: { startKm: number; endKm: number } | null
  onMapClick: (km: number) => void
}) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const cursorMarkerRef = useRef<mapboxgl.Marker | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return

    mapboxgl.accessToken = MAPBOX_TOKEN

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-5.4, 50.1],
      zoom: 9,
      pitch: 30,
      bearing: 0,
    })

    map.current.on('load', () => {
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

    if (map.current.getLayer('route-line')) map.current.removeLayer('route-line')
    if (map.current.getSource('route')) map.current.removeSource('route')

    map.current.addSource('route', {
      type: 'geojson',
      data: gpxData.features[0],
    })

    map.current.addLayer({
      id: 'route-line',
      type: 'line',
      source: 'route',
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: {
        'line-color': '#f97316',
        'line-width': 3,
        'line-opacity': 0.9,
      },
    })
  }, [gpxData, mapLoaded])

  // Handle mouse move on map to find closest point
  useEffect(() => {
    if (!map.current || !mapLoaded || elevationData.length === 0) return

    const findClosestPoint = (lng: number, lat: number) => {
      let closest = elevationData[0]
      let minDist = Infinity

      for (const point of elevationData) {
        const dist = Math.sqrt(
          Math.pow(point.lon - lng, 2) + Math.pow(point.lat - lat, 2)
        )
        if (dist < minDist) {
          minDist = dist
          closest = point
        }
      }
      return closest
    }

    const handleMapMove = (e: mapboxgl.MapMouseEvent) => {
      const { lng, lat } = e.lngLat
      const closest = findClosestPoint(lng, lat)

      // Calculate gradient
      const idx = elevationData.indexOf(closest)
      let gradient = 0
      if (idx > 0 && idx < elevationData.length - 1) {
        const prev = elevationData[Math.max(0, idx - 10)]
        const next = elevationData[Math.min(elevationData.length - 1, idx + 10)]
        const distDiff = (next.distance - prev.distance) * 1000
        const eleDiff = next.elevation - prev.elevation
        if (distDiff > 0) gradient = (eleDiff / distDiff) * 100
      }

      onCursorMove({
        distance: closest.distance,
        elevation: closest.elevation,
        lon: closest.lon,
        lat: closest.lat,
        gradient,
      })
    }

    const handleMapLeave = () => {
      onCursorLeave()
    }

    const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
      const { lng, lat } = e.lngLat
      const closest = findClosestPoint(lng, lat)
      onMapClick(closest.distance)
    }

    map.current.on('mousemove', handleMapMove)
    map.current.on('mouseleave', handleMapLeave)
    map.current.on('click', handleMapClick)

    return () => {
      map.current?.off('mousemove', handleMapMove)
      map.current?.off('mouseleave', handleMapLeave)
      map.current?.off('click', handleMapClick)
    }
  }, [mapLoaded, elevationData, onCursorMove, onCursorLeave, onMapClick])

  // Update cursor marker position
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    if (cursorPoint) {
      if (!cursorMarkerRef.current) {
        // Create cursor marker
        const el = document.createElement('div')
        el.style.cssText = `
          width: 16px;
          height: 16px;
          background: #fff;
          border: 3px solid #f97316;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          pointer-events: none;
        `
        cursorMarkerRef.current = new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat([cursorPoint.lon, cursorPoint.lat])
          .addTo(map.current)
      } else {
        cursorMarkerRef.current.setLngLat([cursorPoint.lon, cursorPoint.lat])
      }
    } else {
      // Remove cursor marker
      if (cursorMarkerRef.current) {
        cursorMarkerRef.current.remove()
        cursorMarkerRef.current = null
      }
    }
  }, [cursorPoint, mapLoaded])

  // Zoom to segment when requested
  useEffect(() => {
    if (!map.current || !mapLoaded || !zoomToSegment || elevationData.length === 0) return

    // Find points in this segment
    const segmentPoints = elevationData.filter(
      p => p.distance >= zoomToSegment.startKm && p.distance <= zoomToSegment.endKm
    )

    if (segmentPoints.length === 0) return

    // Calculate bounds
    const lngs = segmentPoints.map(p => p.lon)
    const lats = segmentPoints.map(p => p.lat)
    const bounds = new mapboxgl.LngLatBounds(
      [Math.min(...lngs), Math.min(...lats)],
      [Math.max(...lngs), Math.max(...lats)]
    )

    map.current.fitBounds(bounds, {
      padding: 60,
      duration: 1000,
    })
  }, [zoomToSegment, mapLoaded, elevationData])

  // Add aid station markers
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    aoaAidStations.forEach((station) => {
      const el = document.createElement('div')
      el.style.cssText = `
        width: 20px;
        height: 20px;
        background: ${station.num === 1 ? '#22c55e' : station.num === 11 ? '#ef4444' : '#f97316'};
        border: 2px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 9px;
        font-weight: bold;
        color: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      `
      el.textContent = station.num.toString()

      const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
        .setLngLat([station.lon, station.lat])
        .addTo(map.current!)

      markersRef.current.push(marker)
    })
  }, [mapLoaded])

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

  return <div ref={mapContainer} className="h-full rounded-xl overflow-hidden" />
}

export function AoaPage() {
  const [gpxData, setGpxData] = useState<GeoJSON.FeatureCollection | null>(null)
  const [elevationData, setElevationData] = useState<ElevationPoint[]>([])
  const [cursorPoint, setCursorPoint] = useState<CursorPoint | null>(null)
  const [zoomToSegment, setZoomToSegment] = useState<{ startKm: number; endKm: number } | null>(null)

  const handleCursorMove = useCallback((point: CursorPoint) => {
    setCursorPoint(point)
  }, [])

  const handleCursorLeave = useCallback(() => {
    setCursorPoint(null)
  }, [])

  const handleSegmentClick = useCallback((startKm: number, endKm: number) => {
    setZoomToSegment({ startKm, endKm })
  }, [])

  // Find which segment a km belongs to
  const handleMapClick = useCallback((km: number) => {
    // Find the segment that contains this km
    for (let i = 1; i < aoaAidStations.length; i++) {
      const prevKm = aoaAidStations[i - 1].km
      const currKm = aoaAidStations[i].km
      if (km >= prevKm && km <= currKm) {
        setZoomToSegment({ startKm: prevKm, endKm: currKm })
        return
      }
    }
  }, [])

  // Load GPX
  useEffect(() => {
    async function loadGpx() {
      try {
        const response = await fetch('/AOA_2026.gpx')
        const gpxText = await response.text()
        const parser = new DOMParser()
        const gpx = parser.parseFromString(gpxText, 'text/xml')

        const trackPoints = gpx.querySelectorAll('trkpt')
        const coordinates: [number, number, number][] = []
        const eleData: ElevationPoint[] = []

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
          eleData.push({ distance: cumulativeDistance, elevation: ele, lon, lat })
        })

        const track: GeoJSON.FeatureCollection = {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: { type: 'LineString', coordinates },
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <p className="text-xs uppercase tracking-wider text-orange-500 font-semibold">Course prépa</p>
        <h1 className="text-3xl font-bold text-white mt-1">Arc of Attrition 2026</h1>
        <p className="text-zinc-400 mt-2">25-26 janvier · 161 km · Cornwall, UK</p>
      </header>

      {/* Stats bar */}
      <div className="grid grid-cols-6 gap-2">
        {[
          { value: aoaStats.distance_km, unit: 'km', label: 'Distance' },
          { value: aoaStats.ascent_m, unit: 'm', label: 'D+' },
          { value: aoaStats.descent_m, unit: 'm', label: 'D-' },
          { value: aoaStats.ratio.toFixed(2), unit: '', label: 'Ratio' },
          { value: aoaStats.max_ele_m, unit: 'm', label: 'Alt max' },
          { value: '40h', unit: '', label: 'Barrière' },
        ].map((stat) => (
          <div key={stat.label} className="bg-zinc-900/50 rounded-lg p-3 text-center border border-zinc-800">
            <div className="font-mono text-lg font-bold text-white">
              {stat.value}{stat.unit && <span className="text-xs text-zinc-500 ml-0.5">{stat.unit}</span>}
            </div>
            <div className="text-[10px] text-zinc-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="h-[400px] rounded-xl overflow-hidden border border-zinc-800">
        <AoaMap
          gpxData={gpxData}
          elevationData={elevationData}
          cursorPoint={cursorPoint}
          onCursorMove={handleCursorMove}
          onCursorLeave={handleCursorLeave}
          zoomToSegment={zoomToSegment}
          onMapClick={handleMapClick}
        />
      </div>

      {/* Elevation Profile */}
      <AoaElevationProfile
        elevationData={elevationData}
        aidStations={aoaAidStations}
        cursorPoint={cursorPoint}
        onCursorMove={handleCursorMove}
        onCursorLeave={handleCursorLeave}
        onSegmentClick={handleSegmentClick}
        activeSegment={zoomToSegment}
      />

      {/* Aid Stations Table */}
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-900/50">
              <th className="text-left py-3 px-4 font-semibold text-zinc-400 w-8">#</th>
              <th className="text-left py-3 px-4 font-semibold text-zinc-400">Ravito</th>
              <th className="text-right py-3 px-4 font-semibold text-zinc-400">Km</th>
              <th className="text-right py-3 px-4 font-semibold text-zinc-400">Alt</th>
              <th className="text-right py-3 px-4 font-semibold text-zinc-400 border-l border-zinc-800">Segment</th>
              <th className="text-right py-3 px-4 font-semibold text-zinc-400">D+</th>
              <th className="text-right py-3 px-4 font-semibold text-zinc-400">D-</th>
              <th className="text-right py-3 px-4 font-semibold text-blue-400">Mont.</th>
              <th className="text-right py-3 px-4 font-semibold text-zinc-400">Plat</th>
              <th className="text-right py-3 px-4 font-semibold text-orange-400">Desc.</th>
            </tr>
          </thead>
          <tbody>
            {aoaAidStations.map((station) => (
              <tr
                key={station.num}
                className={`border-t border-zinc-800/50 hover:bg-zinc-800/30 ${
                  station.num === 6 ? 'bg-orange-500/5' : ''
                }`}
              >
                <td className="py-3 px-4 font-mono text-zinc-500">{station.num}</td>
                <td className="py-3 px-4">
                  <span className={station.num === 6 ? 'font-semibold text-orange-400' : 'text-zinc-200'}>
                    {station.name.replace('Start - ', '').replace('Finish - ', '')}
                  </span>
                  {station.num === 6 && <span className="ml-2 text-[10px] text-orange-500">MI-COURSE</span>}
                </td>
                <td className="py-3 px-4 text-right font-mono text-zinc-300">{station.km.toFixed(1)}</td>
                <td className="py-3 px-4 text-right font-mono text-zinc-500">{station.ele}m</td>
                <td className="py-3 px-4 text-right font-mono text-zinc-400 border-l border-zinc-800">
                  {station.segmentKm ? `${station.segmentKm.toFixed(1)} km` : '—'}
                </td>
                <td className="py-3 px-4 text-right font-mono text-emerald-400">
                  {station.segmentDplus ? `+${station.segmentDplus}` : '—'}
                </td>
                <td className="py-3 px-4 text-right font-mono text-red-400">
                  {station.segmentDminus ? `-${station.segmentDminus}` : '—'}
                </td>
                <td className="py-3 px-4 text-right font-mono text-blue-400">
                  {station.segmentUpKm ? `${station.segmentUpKm}` : '—'}
                </td>
                <td className="py-3 px-4 text-right font-mono text-zinc-400">
                  {station.segmentFlatKm ? `${station.segmentFlatKm}` : '—'}
                </td>
                <td className="py-3 px-4 text-right font-mono text-orange-400">
                  {station.segmentDownKm ? `${station.segmentDownKm}` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-zinc-700 bg-zinc-900/50">
              <td className="py-3 px-4" colSpan={2}>
                <span className="font-semibold text-zinc-300">TOTAL</span>
              </td>
              <td className="py-3 px-4 text-right font-mono font-semibold text-white">{aoaStats.distance_km}</td>
              <td className="py-3 px-4 text-right font-mono text-zinc-500">—</td>
              <td className="py-3 px-4 border-l border-zinc-800"></td>
              <td className="py-3 px-4 text-right font-mono text-emerald-400 font-semibold">+{aoaStats.ascent_m}m</td>
              <td className="py-3 px-4 text-right font-mono text-red-400 font-semibold">-{aoaStats.descent_m}m</td>
              <td className="py-3 px-4 text-right font-mono text-blue-400 font-semibold">{aoaStats.uphill_km}</td>
              <td className="py-3 px-4 text-right font-mono text-zinc-400 font-semibold">{aoaStats.flat_km}</td>
              <td className="py-3 px-4 text-right font-mono text-orange-400 font-semibold">{aoaStats.downhill_km}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Terrain breakdown */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded bg-blue-500" />
            <span className="text-zinc-400 text-sm">Montée (&gt;3%)</span>
          </div>
          <div className="font-mono text-2xl font-bold text-white">{aoaStats.uphill_pct}%</div>
          <div className="text-xs text-zinc-500 mt-1">{aoaStats.uphill_km} km</div>
        </div>
        <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded bg-zinc-500" />
            <span className="text-zinc-400 text-sm">Plat (±3%)</span>
          </div>
          <div className="font-mono text-2xl font-bold text-white">{aoaStats.flat_pct}%</div>
          <div className="text-xs text-zinc-500 mt-1">{aoaStats.flat_km} km</div>
        </div>
        <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded bg-orange-500" />
            <span className="text-zinc-400 text-sm">Descente (&lt;-3%)</span>
          </div>
          <div className="font-mono text-2xl font-bold text-white">{aoaStats.downhill_pct}%</div>
          <div className="text-xs text-zinc-500 mt-1">{aoaStats.downhill_km} km</div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-zinc-600 pt-4 border-t border-zinc-800">
        Page cachée · Survolez la carte ou le profil pour explorer
      </div>
    </div>
  )
}
