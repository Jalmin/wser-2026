import { useEffect, useRef, useState, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { wserSplits, sections, type SplitData } from '../data/wserSplits'
import { Mountain, Map as MapIcon } from 'lucide-react'

// Token Mapbox - à mettre dans .env
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || ''

interface WSERMapProps {
  onSectionSelect: (section: string | null) => void
  onAidStationSelect: (station: SplitData | null) => void
  onStationHover: (station: SplitData | null) => void
  onSectionHover: (section: string | null) => void
  selectedSection: string | null
  selectedStation: SplitData | null
  hoveredStation: SplitData | null
  hoveredSection: string | null
  gpxData: GeoJSON.FeatureCollection | null
}

export function WSERMap({
  onSectionSelect,
  onAidStationSelect,
  onStationHover,
  onSectionHover,
  selectedSection,
  selectedStation,
  hoveredStation,
  hoveredSection,
  gpxData
}: WSERMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [is3D, setIs3D] = useState(true)

  // Toggle 3D view
  const toggle3D = useCallback(() => {
    if (!map.current) return

    const newIs3D = !is3D
    setIs3D(newIs3D)

    if (newIs3D) {
      map.current.easeTo({
        pitch: 60,
        bearing: -20,
        duration: 1000,
      })
      map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 })
    } else {
      map.current.easeTo({
        pitch: 0,
        bearing: 0,
        duration: 1000,
      })
      map.current.setTerrain(null)
    }
  }, [is3D])

  // Initialize map with 3D terrain
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return

    mapboxgl.accessToken = MAPBOX_TOKEN

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-120.65, 39.05],
      zoom: 10,
      pitch: 60, // Inclinaison pour vue 3D
      bearing: -20, // Rotation légère
      antialias: true,
    })

    map.current.on('load', () => {
      try {
        // Add 3D terrain
        map.current!.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14,
        })

        map.current!.setTerrain({
          source: 'mapbox-dem',
          exaggeration: 1.5,
        })

        // Add sky layer for atmosphere
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

    // Navigation controls with pitch/rotation
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    )

    return () => {
      map.current?.remove()
    }
  }, [])

  // Add GPX track when data is loaded
  useEffect(() => {
    if (!map.current || !mapLoaded || !gpxData) return

    // Remove existing layers if any
    if (map.current.getLayer('route-line')) {
      map.current.removeLayer('route-line')
    }
    if (map.current.getSource('route')) {
      map.current.removeSource('route')
    }

    const coordinates = (gpxData.features[0]?.geometry as GeoJSON.LineString)?.coordinates || []

    // Create segments for each section
    sections.forEach((section) => {
      const sourceId = `route-${section.id}`
      const layerId = `route-line-${section.id}`

      if (map.current!.getLayer(layerId)) map.current!.removeLayer(layerId)
      if (map.current!.getSource(sourceId)) map.current!.removeSource(sourceId)

      const totalKm = 161.3
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
          'line-width': selectedSection === section.id ? 6 : 4,
          'line-opacity': selectedSection && selectedSection !== section.id ? 0.4 : 1,
        },
      })

      map.current!.on('click', layerId, () => {
        onSectionSelect(section.id)
      })

      map.current!.on('mouseenter', layerId, () => {
        map.current!.getCanvas().style.cursor = 'pointer'
        onSectionHover(section.id)
      })

      map.current!.on('mouseleave', layerId, () => {
        map.current!.getCanvas().style.cursor = ''
        onSectionHover(null)
      })
    })

  }, [gpxData, mapLoaded, selectedSection, onSectionSelect])

  // Add aid station markers
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    wserSplits.forEach((station) => {
      // Create wrapper element (fixed size, no transform)
      const wrapper = document.createElement('div')
      wrapper.className = 'aid-station-wrapper'
      wrapper.style.cssText = `
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      `

      // Create inner dot (this one can scale safely)
      const dot = document.createElement('div')
      dot.className = 'aid-station-dot'
      dot.style.cssText = `
        width: 12px;
        height: 12px;
        background: ${station.sectionColor};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.5);
        transition: all 0.15s ease;
      `
      wrapper.appendChild(dot)

      // Hover effects - shows segment preview
      wrapper.addEventListener('mouseenter', () => {
        dot.style.width = '16px'
        dot.style.height = '16px'
        dot.style.boxShadow = '0 3px 10px rgba(0,0,0,0.7)'
        onStationHover(station)
      })

      wrapper.addEventListener('mouseleave', () => {
        dot.style.width = '12px'
        dot.style.height = '12px'
        dot.style.boxShadow = '0 2px 6px rgba(0,0,0,0.5)'
        onStationHover(null)
      })

      wrapper.addEventListener('click', (e) => {
        e.stopPropagation()
        onAidStationSelect(station)
      })

      const marker = new mapboxgl.Marker({ element: wrapper, anchor: 'center' })
        .setLngLat([station.lon, station.lat])
        .addTo(map.current!)

      markersRef.current.push(marker)
    })

  }, [mapLoaded, onAidStationSelect, onStationHover])

  // Update line styles when selection or hover changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    // When a segment is selected, dim all section lines
    const hasSegmentSelected = !!selectedStation

    sections.forEach((section) => {
      const layerId = `route-line-${section.id}`
      if (map.current!.getLayer(layerId)) {
        // Determine if this section is hovered
        const isHovered = hoveredSection === section.id
        const isSelected = selectedSection === section.id

        // Color: white when hovered, otherwise section color
        map.current!.setPaintProperty(
          layerId,
          'line-color',
          isHovered && !hasSegmentSelected ? '#ffffff' : section.color
        )

        map.current!.setPaintProperty(
          layerId,
          'line-width',
          hasSegmentSelected ? 2 : isHovered ? 7 : isSelected ? 6 : 4
        )
        map.current!.setPaintProperty(
          layerId,
          'line-opacity',
          hasSegmentSelected ? 0.3 : selectedSection && selectedSection !== section.id && !isHovered ? 0.4 : 1
        )
      }
    })
  }, [selectedSection, selectedStation, hoveredSection, mapLoaded])

  // Add/update segment highlight layer
  useEffect(() => {
    if (!map.current || !mapLoaded || !gpxData) return

    const segmentLayerId = 'segment-highlight'
    const segmentSourceId = 'segment-highlight-source'

    // Remove existing segment layer
    if (map.current.getLayer(segmentLayerId)) {
      map.current.removeLayer(segmentLayerId)
    }
    if (map.current.getSource(segmentSourceId)) {
      map.current.removeSource(segmentSourceId)
    }

    if (!selectedStation) return

    // Find segment bounds
    const stationIndex = wserSplits.findIndex(s => s.num === selectedStation.num)
    const prevStation = stationIndex > 0 ? wserSplits[stationIndex - 1] : null

    if (!prevStation) return

    // Extract segment coordinates from GPX
    const coordinates = (gpxData.features[0]?.geometry as GeoJSON.LineString)?.coordinates || []
    const totalKm = 161.3
    const startRatio = prevStation.km / totalKm
    const endRatio = selectedStation.km / totalKm
    const startIdx = Math.floor(startRatio * coordinates.length)
    const endIdx = Math.ceil(endRatio * coordinates.length)

    const segmentCoords = coordinates.slice(startIdx, endIdx + 1)

    // Add segment source and layer
    map.current.addSource(segmentSourceId, {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: segmentCoords,
        },
      },
    })

    map.current.addLayer({
      id: segmentLayerId,
      type: 'line',
      source: segmentSourceId,
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': selectedStation.sectionColor,
        'line-width': 8,
        'line-opacity': 1,
      },
    })
  }, [selectedStation, gpxData, mapLoaded])

  // Add/update segment HOVER preview layer (lighter style than selection)
  useEffect(() => {
    if (!map.current || !mapLoaded || !gpxData) return

    const hoverLayerId = 'segment-hover-preview'
    const hoverSourceId = 'segment-hover-source'

    // Remove existing hover layer
    if (map.current.getLayer(hoverLayerId)) {
      map.current.removeLayer(hoverLayerId)
    }
    if (map.current.getSource(hoverSourceId)) {
      map.current.removeSource(hoverSourceId)
    }

    // Don't show hover if already selected or no hover
    if (!hoveredStation || selectedStation?.num === hoveredStation.num) return

    // Find segment bounds
    const stationIndex = wserSplits.findIndex(s => s.num === hoveredStation.num)
    const prevStation = stationIndex > 0 ? wserSplits[stationIndex - 1] : null

    if (!prevStation) return

    // Extract segment coordinates from GPX
    const coordinates = (gpxData.features[0]?.geometry as GeoJSON.LineString)?.coordinates || []
    const totalKm = 161.3
    const startRatio = prevStation.km / totalKm
    const endRatio = hoveredStation.km / totalKm
    const startIdx = Math.floor(startRatio * coordinates.length)
    const endIdx = Math.ceil(endRatio * coordinates.length)

    const segmentCoords = coordinates.slice(startIdx, endIdx + 1)

    // Add hover preview source and layer
    map.current.addSource(hoverSourceId, {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: segmentCoords,
        },
      },
    })

    map.current.addLayer({
      id: hoverLayerId,
      type: 'line',
      source: hoverSourceId,
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': hoveredStation.sectionColor,
        'line-width': 6,
        'line-opacity': 0.6,
      },
    })
  }, [hoveredStation, selectedStation, gpxData, mapLoaded])

  // Zoom to section when selected (niveau 1)
  useEffect(() => {
    if (!map.current || !selectedSection || selectedStation) return

    const section = sections.find(s => s.id === selectedSection)
    if (!section) return

    const stationsInSection = wserSplits.filter(s => s.section === selectedSection)
    if (stationsInSection.length < 2) return

    const bounds = new mapboxgl.LngLatBounds()
    stationsInSection.forEach(station => {
      bounds.extend([station.lon, station.lat])
    })

    map.current.fitBounds(bounds, {
      padding: 80,
      duration: 1000,
    })
  }, [selectedSection, selectedStation])

  // Zoom to segment when station selected (niveau 2)
  useEffect(() => {
    if (!map.current || !selectedStation) return

    // Find current station index
    const stationIndex = wserSplits.findIndex(s => s.num === selectedStation.num)
    if (stationIndex === -1) return

    // Get previous station for segment view
    const prevStation = stationIndex > 0 ? wserSplits[stationIndex - 1] : null

    if (prevStation) {
      // Zoom to show the segment between prev and current station
      const bounds = new mapboxgl.LngLatBounds()
      bounds.extend([prevStation.lon, prevStation.lat])
      bounds.extend([selectedStation.lon, selectedStation.lat])

      map.current.fitBounds(bounds, {
        padding: 100,
        duration: 1000,
      })
    } else {
      // First station - just zoom to it
      map.current.flyTo({
        center: [selectedStation.lon, selectedStation.lat],
        zoom: 13,
        duration: 1000,
      })
    }
  }, [selectedStation])

  // Check for missing or invalid token
  const isSecretToken = MAPBOX_TOKEN.startsWith('sk.')
  const isValidToken = MAPBOX_TOKEN.startsWith('pk.')

  if (!MAPBOX_TOKEN || isSecretToken || !isValidToken) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="text-center p-8 max-w-md">
          {isSecretToken ? (
            <>
              <p className="text-red-400 mb-4 font-semibold">Token secret détecté (sk.*)</p>
              <p className="text-sm text-zinc-400 mb-4">
                Mapbox GL JS nécessite un <strong className="text-orange-400">token public (pk.*)</strong>, pas un token secret.
              </p>
              <ol className="text-left text-xs text-zinc-400 space-y-1 mb-4">
                <li>1. Allez sur <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">account.mapbox.com/access-tokens</a></li>
                <li>2. Cliquez sur "Create a token"</li>
                <li>3. Copiez le token qui commence par <code className="text-orange-400">pk.</code></li>
              </ol>
            </>
          ) : (
            <>
              <p className="text-zinc-400 mb-4">Token Mapbox requis</p>
              <code className="block mt-2 p-2 bg-zinc-800 rounded text-xs text-orange-400">
                VITE_MAPBOX_TOKEN=pk.votre_token
              </code>
            </>
          )}
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
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                onAidStationSelect(null) // Clear station selection
                onSectionSelect(selectedSection === section.id ? null : section.id)
              }}
              className={`flex items-center gap-2 w-full px-2 py-1 rounded text-left transition-all ${
                selectedSection === section.id
                  ? 'bg-zinc-700'
                  : 'hover:bg-zinc-800'
              }`}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: section.color }}
              />
              <span className={`text-xs ${selectedSection === section.id ? 'text-white' : 'text-zinc-400'}`}>
                {section.name}
              </span>
              <span className="text-[10px] text-zinc-500 ml-auto">
                {section.kmStart}-{section.kmEnd}km
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3D Toggle button */}
      <button
        onClick={toggle3D}
        className="absolute top-4 right-4 bg-zinc-900/90 backdrop-blur-sm rounded-lg p-2 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
        title={is3D ? 'Vue 2D' : 'Vue 3D'}
      >
        {is3D ? <MapIcon className="w-4 h-4" /> : <Mountain className="w-4 h-4" />}
      </button>

      {/* Reset view button */}
      {(selectedSection || selectedStation) && (
        <button
          onClick={() => {
            onSectionSelect(null)
            onAidStationSelect(null)
            map.current?.flyTo({
              center: [-120.65, 39.05],
              zoom: 9,
              pitch: is3D ? 60 : 0,
              bearing: is3D ? -20 : 0,
              duration: 1000,
            })
          }}
          className="absolute top-4 right-16 bg-zinc-900/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-zinc-700 text-xs text-zinc-300 hover:bg-zinc-800 transition-colors"
        >
          Vue globale
        </button>
      )}

      {/* Current segment indicator - shows both start and end stations */}
      {selectedStation && (() => {
        const stationIndex = wserSplits.findIndex(s => s.num === selectedStation.num)
        const prevStation = stationIndex > 0 ? wserSplits[stationIndex - 1] : null

        return (
          <div className="absolute bottom-4 left-4 bg-zinc-900/90 backdrop-blur-sm rounded-lg p-3 border border-zinc-700">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">Segment sélectionné</div>
            <div className="flex items-center gap-3">
              {/* Start station */}
              {prevStation && (
                <>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-3 h-3 rounded-full border-2 border-white"
                      style={{ backgroundColor: prevStation.sectionColor }}
                    />
                    <div>
                      <div className="text-xs text-zinc-300">{prevStation.name}</div>
                      <div className="text-[10px] text-zinc-500">km {prevStation.km}</div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="text-zinc-500">→</div>
                </>
              )}

              {/* End station */}
              <div className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-full border-2 border-white"
                  style={{ backgroundColor: selectedStation.sectionColor }}
                />
                <div>
                  <div className="text-xs text-white font-medium">{selectedStation.name}</div>
                  <div className="text-[10px] text-zinc-500">km {selectedStation.km}</div>
                </div>
              </div>

              {/* Segment stats */}
              {prevStation && selectedStation.sectionKm && (
                <div className="ml-2 pl-3 border-l border-zinc-700 text-center">
                  <div className="font-mono text-sm text-white">{selectedStation.sectionKm} km</div>
                  <div className="text-[10px] text-zinc-500">
                    <span className="text-emerald-400">+{selectedStation.dPlus}m</span>
                    {' / '}
                    <span className="text-red-400">-{selectedStation.dMinus}m</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })()}
    </div>
  )
}

// GPX Parser utility
export async function parseGPX(url: string): Promise<{
  track: GeoJSON.FeatureCollection,
  elevationData: { lat: number; lon: number; ele: number }[]
}> {
  const response = await fetch(url)
  const gpxText = await response.text()
  const parser = new DOMParser()
  const gpx = parser.parseFromString(gpxText, 'text/xml')

  const trackPoints = gpx.querySelectorAll('trkpt')
  const coordinates: [number, number, number][] = []
  const elevationData: { lat: number; lon: number; ele: number }[] = []

  trackPoints.forEach((pt) => {
    const lat = parseFloat(pt.getAttribute('lat') || '0')
    const lon = parseFloat(pt.getAttribute('lon') || '0')
    const eleNode = pt.querySelector('ele')
    const ele = eleNode ? parseFloat(eleNode.textContent || '0') : 0

    coordinates.push([lon, lat, ele])
    elevationData.push({ lat, lon, ele })
  })

  const track: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates,
        },
      },
    ],
  }

  return { track, elevationData }
}
