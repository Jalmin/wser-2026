import { useMemo, useCallback } from 'react'
import { sections, wserSplits, type SplitData } from '../data/wserSplits'

interface ElevationPoint {
  lat: number
  lon: number
  ele: number
}

interface ElevationProfileProps {
  elevationData: ElevationPoint[]
  selectedSection: string | null
  selectedStation: SplitData | null
  hoveredStation: SplitData | null
  hoveredSection: string | null
  onSectionSelect?: (section: string | null) => void
  onStationSelect?: (station: SplitData | null) => void
  onStationHover?: (station: SplitData | null) => void
  onSectionHover?: (section: string | null) => void
}

export function ElevationProfile({
  elevationData,
  selectedSection,
  selectedStation,
  hoveredStation,
  hoveredSection,
  onSectionSelect,
  onStationSelect,
  onStationHover,
  onSectionHover
}: ElevationProfileProps) {

  // Calculate base data and scales
  const { normalizedDistances, minEle, maxEle, eleRange } = useMemo(() => {
    if (!elevationData.length) return { normalizedDistances: [], minEle: 0, maxEle: 0, eleRange: 1 }

    // Calculate total distance
    let totalDistance = 0
    const distances: number[] = [0]

    for (let i = 1; i < elevationData.length; i++) {
      const prev = elevationData[i - 1]
      const curr = elevationData[i]
      const dLat = curr.lat - prev.lat
      const dLon = curr.lon - prev.lon
      const d = Math.sqrt(dLat * dLat + dLon * dLon) * 111
      totalDistance += d
      distances.push(totalDistance)
    }

    const scaleFactor = 161.3 / totalDistance
    const normalizedDistances = distances.map(d => d * scaleFactor)

    const elevations = elevationData.map(p => p.ele)
    const minEle = Math.min(...elevations)
    const maxEle = Math.max(...elevations)

    return { normalizedDistances, minEle, maxEle, eleRange: maxEle - minEle }
  }, [elevationData])

  // Determine view range based on selection
  const viewRange = useMemo(() => {
    // If a station is selected, zoom to segment
    if (selectedStation) {
      const stationIndex = wserSplits.findIndex(s => s.num === selectedStation.num)
      const prevStation = stationIndex > 0 ? wserSplits[stationIndex - 1] : null

      if (prevStation) {
        // Add padding (5km on each side)
        const kmStart = Math.max(0, prevStation.km - 5)
        const kmEnd = Math.min(161.3, selectedStation.km + 5)
        return { kmStart, kmEnd, isZoomed: true }
      } else {
        // First station - show from 0 to km + 5
        return { kmStart: 0, kmEnd: Math.min(161.3, selectedStation.km + 10), isZoomed: true }
      }
    }

    // If a section is selected, zoom to section
    if (selectedSection) {
      const section = sections.find(s => s.id === selectedSection)
      if (section) {
        const padding = (section.kmEnd - section.kmStart) * 0.1
        return {
          kmStart: Math.max(0, section.kmStart - padding),
          kmEnd: Math.min(161.3, section.kmEnd + padding),
          isZoomed: true
        }
      }
    }

    // Default: full view
    return { kmStart: 0, kmEnd: 161.3, isZoomed: false }
  }, [selectedSection, selectedStation])

  // Calculate paths for current view
  const { sectionPaths, stats, viewBox, segmentHighlight } = useMemo(() => {
    if (!elevationData.length) return { sectionPaths: [], stats: null, viewBox: '0 0 800 200', segmentHighlight: null }

    const width = 800
    const height = 200
    const padding = { top: 20, right: 20, bottom: 30, left: 50 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    const { kmStart, kmEnd } = viewRange
    const kmRange = kmEnd - kmStart

    // Scale functions for current view
    const xScale = (km: number) => padding.left + ((km - kmStart) / kmRange) * chartWidth
    const yScale = (ele: number) => padding.top + chartHeight - ((ele - minEle) / eleRange) * chartHeight

    // Generate points
    const points = elevationData.map((p, i) => ({
      x: xScale(normalizedDistances[i]),
      y: yScale(p.ele),
      km: normalizedDistances[i],
      ele: p.ele,
    })).filter(p => p.km >= kmStart - 5 && p.km <= kmEnd + 5)

    // Generate colored section paths
    const sectionPaths = sections.map(section => {
      const sectionPoints = points.filter(p => p.km >= section.kmStart && p.km <= section.kmEnd)
      if (sectionPoints.length < 2) return null

      const linePath = `M ${sectionPoints.map(p => `${p.x},${p.y}`).join(' L ')}`
      const areaPath = `${linePath} L ${sectionPoints[sectionPoints.length - 1].x},${padding.top + chartHeight} L ${sectionPoints[0].x},${padding.top + chartHeight} Z`

      return {
        id: section.id,
        color: section.color,
        linePath,
        areaPath,
        startX: sectionPoints[0].x,
        endX: sectionPoints[sectionPoints.length - 1].x,
      }
    }).filter(Boolean)

    // Calculate segment highlight if station selected
    let segmentHighlight = null
    if (selectedStation) {
      const stationIndex = wserSplits.findIndex(s => s.num === selectedStation.num)
      const prevStation = stationIndex > 0 ? wserSplits[stationIndex - 1] : null

      if (prevStation) {
        const segmentPoints = points.filter(p => p.km >= prevStation.km && p.km <= selectedStation.km)
        if (segmentPoints.length >= 2) {
          const linePath = `M ${segmentPoints.map(p => `${p.x},${p.y}`).join(' L ')}`
          const areaPath = `${linePath} L ${segmentPoints[segmentPoints.length - 1].x},${padding.top + chartHeight} L ${segmentPoints[0].x},${padding.top + chartHeight} Z`
          segmentHighlight = {
            linePath,
            areaPath,
            startX: xScale(prevStation.km),
            endX: xScale(selectedStation.km),
            startStation: prevStation,
            endStation: selectedStation,
          }
        }
      }
    }

    const stats = {
      minEle: Math.round(minEle),
      maxEle: Math.round(maxEle),
      chartWidth,
      chartHeight,
      padding,
      xScale,
      yScale,
      kmStart,
      kmEnd,
    }

    return { sectionPaths, stats, viewBox: `0 0 ${width} ${height}`, segmentHighlight, points }
  }, [elevationData, normalizedDistances, minEle, maxEle, eleRange, viewRange, selectedStation])

  // Calculate hover segment preview
  const hoverSegmentPreview = useMemo(() => {
    if (!stats || !hoveredStation || selectedStation?.num === hoveredStation.num) return null

    const stationIndex = wserSplits.findIndex(s => s.num === hoveredStation.num)
    const prevStation = stationIndex > 0 ? wserSplits[stationIndex - 1] : null

    if (!prevStation) return null

    // Use the points from the main calculation
    const { padding, chartHeight, xScale, yScale, kmStart, kmEnd } = stats

    // Generate points for hover segment
    const segmentPoints = elevationData
      .map((p, i) => ({
        x: xScale(normalizedDistances[i]),
        y: yScale(p.ele),
        km: normalizedDistances[i],
      }))
      .filter(p => p.km >= prevStation.km && p.km <= hoveredStation.km && p.km >= kmStart - 5 && p.km <= kmEnd + 5)

    if (segmentPoints.length < 2) return null

    const linePath = `M ${segmentPoints.map(p => `${p.x},${p.y}`).join(' L ')}`
    const areaPath = `${linePath} L ${segmentPoints[segmentPoints.length - 1].x},${padding.top + chartHeight} L ${segmentPoints[0].x},${padding.top + chartHeight} Z`

    return {
      linePath,
      areaPath,
      startX: xScale(prevStation.km),
      endX: xScale(hoveredStation.km),
      color: hoveredStation.sectionColor,
      startStation: prevStation,
      endStation: hoveredStation,
    }
  }, [hoveredStation, selectedStation, stats, elevationData, normalizedDistances])

  // Aid station markers positions
  const aidStationMarkers = useMemo(() => {
    if (!stats) return []

    return wserSplits
      .filter(station => station.km >= stats.kmStart - 2 && station.km <= stats.kmEnd + 2)
      .map(station => ({
        ...station,
        x: stats.xScale(station.km),
        y: stats.yScale(station.altitude),
      }))
  }, [stats])

  // Click handler for segments
  const handleStationClick = useCallback((station: SplitData) => {
    if (selectedStation?.num === station.num) {
      // Deselect
      onStationSelect?.(null)
    } else {
      onStationSelect?.(station)
    }
  }, [selectedStation, onStationSelect])

  if (!elevationData.length) {
    return (
      <div className="h-[200px] flex items-center justify-center bg-zinc-900/50 rounded-xl border border-zinc-800">
        <p className="text-zinc-500 text-sm">Chargement du profil altimétrique...</p>
      </div>
    )
  }

  // Get prev station for segment info display
  const prevStation = selectedStation
    ? wserSplits[wserSplits.findIndex(s => s.num === selectedStation.num) - 1]
    : null

  return (
    <div className="relative bg-zinc-900/50 rounded-xl border border-zinc-800 p-2">
      {/* Zoom indicator + reset button */}
      {viewRange.isZoomed && (
        <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
          <span className="text-xs text-zinc-500">
            {viewRange.kmStart.toFixed(0)} - {viewRange.kmEnd.toFixed(0)} km
          </span>
          <button
            onClick={() => {
              onSectionSelect?.(null)
              onStationSelect?.(null)
            }}
            className="px-2 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-300 transition-colors"
          >
            Vue complète
          </button>
        </div>
      )}

      {/* Segment label */}
      {selectedStation && prevStation && (
        <div className="absolute top-2 left-2 z-10">
          <div
            className="px-2 py-1 rounded text-xs font-medium"
            style={{
              backgroundColor: `${selectedStation.sectionColor}20`,
              color: selectedStation.sectionColor,
              border: `1px solid ${selectedStation.sectionColor}40`
            }}
          >
            Segment : {prevStation.name} → {selectedStation.name}
          </div>
        </div>
      )}

      <svg viewBox={viewBox} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {/* Background */}
        <rect x="0" y="0" width="800" height="200" fill="transparent" />

        {/* Grid lines */}
        {stats && [0, 500, 1000, 1500, 2000, 2500].map(ele => {
          if (ele < stats.minEle || ele > stats.maxEle) return null
          const y = stats.yScale(ele)
          return (
            <g key={ele}>
              <line
                x1={stats.padding.left}
                y1={y}
                x2={stats.padding.left + stats.chartWidth}
                y2={y}
                stroke="#27272a"
                strokeDasharray="4,4"
              />
              <text x={stats.padding.left - 8} y={y + 4} textAnchor="end" className="text-[10px] fill-zinc-500">
                {ele}m
              </text>
            </g>
          )
        })}

        {/* Distance markers - adapt to zoom level */}
        {stats && (() => {
          const kmRange = stats.kmEnd - stats.kmStart
          const step = kmRange <= 20 ? 2 : kmRange <= 50 ? 5 : kmRange <= 100 ? 10 : 25
          const marks = []
          for (let km = Math.ceil(stats.kmStart / step) * step; km <= stats.kmEnd; km += step) {
            marks.push(km)
          }
          return marks.map(km => {
            const x = stats.xScale(km)
            return (
              <g key={km}>
                <line
                  x1={x}
                  y1={stats.padding.top}
                  x2={x}
                  y2={stats.padding.top + stats.chartHeight}
                  stroke="#27272a"
                  strokeDasharray="4,4"
                />
                <text x={x} y={stats.padding.top + stats.chartHeight + 15} textAnchor="middle" className="text-[10px] fill-zinc-500">
                  {km}km
                </text>
              </g>
            )
          })
        })()}

        {/* Section areas (colored) - dimmed when segment selected */}
        {sectionPaths.map(section => {
          if (!section) return null
          const isHovered = hoveredSection === section.id
          const isSelected = selectedSection === section.id
          // White color when hovered (and no segment selected)
          const displayColor = isHovered && !selectedStation ? '#ffffff' : section.color

          return (
            <g
              key={section.id}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (!selectedStation) {
                  onSectionSelect?.(selectedSection === section.id ? null : section.id)
                }
              }}
              onMouseEnter={() => onSectionHover?.(section.id)}
              onMouseLeave={() => onSectionHover?.(null)}
            >
              <path
                d={section.areaPath}
                fill={displayColor}
                fillOpacity={
                  selectedStation ? 0.1 :
                  isHovered ? 0.35 :
                  isSelected ? 0.4 :
                  selectedSection ? 0.1 : 0.2
                }
                stroke="none"
              />
              <path
                d={section.linePath}
                fill="none"
                stroke={displayColor}
                strokeWidth={selectedStation ? 1 : isHovered ? 4 : isSelected ? 3 : 2}
                strokeOpacity={selectedStation ? 0.3 : selectedSection && !isSelected && !isHovered ? 0.5 : 1}
              />
            </g>
          )
        })}

        {/* Hover segment preview (lighter) */}
        {hoverSegmentPreview && (
          <g>
            <path
              d={hoverSegmentPreview.areaPath}
              fill={hoverSegmentPreview.color}
              fillOpacity={0.25}
              stroke="none"
            />
            <path
              d={hoverSegmentPreview.linePath}
              fill="none"
              stroke={hoverSegmentPreview.color}
              strokeWidth={3}
              strokeOpacity={0.7}
            />
            {/* Vertical markers at hover segment boundaries */}
            {stats && (
              <>
                <line
                  x1={hoverSegmentPreview.startX}
                  y1={stats.padding.top}
                  x2={hoverSegmentPreview.startX}
                  y2={stats.padding.top + stats.chartHeight}
                  stroke={hoverSegmentPreview.color}
                  strokeWidth={1}
                  strokeDasharray="3,3"
                  opacity={0.5}
                />
                <line
                  x1={hoverSegmentPreview.endX}
                  y1={stats.padding.top}
                  x2={hoverSegmentPreview.endX}
                  y2={stats.padding.top + stats.chartHeight}
                  stroke={hoverSegmentPreview.color}
                  strokeWidth={1}
                  strokeDasharray="3,3"
                  opacity={0.5}
                />
              </>
            )}
          </g>
        )}

        {/* Segment highlight overlay (selected - stronger) */}
        {segmentHighlight && (
          <g>
            {/* Highlighted segment area */}
            <path
              d={segmentHighlight.areaPath}
              fill={selectedStation?.sectionColor}
              fillOpacity={0.4}
              stroke="none"
            />
            {/* Highlighted segment line */}
            <path
              d={segmentHighlight.linePath}
              fill="none"
              stroke={selectedStation?.sectionColor}
              strokeWidth={4}
            />
            {/* Vertical markers at segment boundaries */}
            {stats && (
              <>
                <line
                  x1={segmentHighlight.startX}
                  y1={stats.padding.top}
                  x2={segmentHighlight.startX}
                  y2={stats.padding.top + stats.chartHeight}
                  stroke={selectedStation?.sectionColor}
                  strokeWidth={2}
                  strokeDasharray="4,2"
                  opacity={0.7}
                />
                <line
                  x1={segmentHighlight.endX}
                  y1={stats.padding.top}
                  x2={segmentHighlight.endX}
                  y2={stats.padding.top + stats.chartHeight}
                  stroke={selectedStation?.sectionColor}
                  strokeWidth={2}
                  strokeDasharray="4,2"
                  opacity={0.7}
                />
              </>
            )}
          </g>
        )}

        {/* Aid station markers - clickable to select segment */}
        {aidStationMarkers.map(station => {
          const isSelected = selectedStation?.num === station.num
          const isPrevStation = prevStation?.num === station.num
          const isHovered = hoveredStation?.num === station.num
          const isHoveredPrev = hoveredStation && wserSplits.findIndex(s => s.num === hoveredStation.num) > 0
            ? wserSplits[wserSplits.findIndex(s => s.num === hoveredStation.num) - 1]?.num === station.num
            : false

          return (
            <g
              key={station.num}
              style={{ cursor: 'pointer' }}
              onClick={() => handleStationClick(station)}
              onMouseEnter={() => onStationHover?.(station)}
              onMouseLeave={() => onStationHover?.(null)}
            >
              {/* Clickable area (larger) */}
              <circle
                cx={station.x}
                cy={station.y}
                r={12}
                fill="transparent"
              />
              {/* Visual marker */}
              <circle
                cx={station.x}
                cy={station.y}
                r={isSelected || isPrevStation ? 6 : (isHovered || isHoveredPrev) ? 5 : 4}
                fill={isSelected || isPrevStation ? station.sectionColor : (isHovered || isHoveredPrev) ? station.sectionColor : '#27272a'}
                stroke={station.sectionColor}
                strokeWidth={isSelected || isPrevStation ? 3 : (isHovered || isHoveredPrev) ? 2.5 : 2}
                fillOpacity={isSelected || isPrevStation ? 1 : (isHovered || isHoveredPrev) ? 0.7 : 1}
              />
              {/* Label - show more when zoomed or hovered */}
              {(viewRange.isZoomed || isHovered || isHoveredPrev || isSelected || isPrevStation || [0, 5, 11, 12, 16, 18, 22].includes(station.num)) && (
                <text
                  x={station.x}
                  y={station.y - 10}
                  textAnchor="middle"
                  className={`text-[9px] ${isSelected || isPrevStation ? 'fill-white font-medium' : 'fill-zinc-400'}`}
                  style={{ pointerEvents: 'none' }}
                >
                  {station.name.length > 12 ? station.name.split(' ')[0] : station.name}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Section labels below - only show when not zoomed on segment */}
      {!selectedStation && (
        <div className="flex mt-2 px-12">
          {sections.map(section => {
            const widthPercent = ((section.kmEnd - section.kmStart) / 161.3) * 100
            const isHovered = hoveredSection === section.id
            const isSelected = selectedSection === section.id
            return (
              <button
                key={section.id}
                onClick={() => onSectionSelect?.(selectedSection === section.id ? null : section.id)}
                onMouseEnter={() => onSectionHover?.(section.id)}
                onMouseLeave={() => onSectionHover?.(null)}
                className={`text-center transition-all ${
                  selectedSection && !isSelected && !isHovered ? 'opacity-40' : ''
                }`}
                style={{ width: `${widthPercent}%` }}
              >
                <div
                  className="h-1 rounded-full mb-1 transition-colors"
                  style={{ backgroundColor: isHovered ? '#ffffff' : section.color }}
                />
                <span className={`text-[10px] transition-colors ${isHovered ? 'text-white' : 'text-zinc-400'}`}>
                  {section.name}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Segment navigation when zoomed */}
      {selectedStation && (
        <div className="flex justify-center gap-4 mt-2">
          {prevStation && wserSplits.findIndex(s => s.num === selectedStation.num) > 1 && (
            <button
              onClick={() => onStationSelect?.(prevStation)}
              className="px-3 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-300 transition-colors"
            >
              ← Segment précédent
            </button>
          )}
          {wserSplits.findIndex(s => s.num === selectedStation.num) < wserSplits.length - 1 && (
            <button
              onClick={() => {
                const nextStation = wserSplits[wserSplits.findIndex(s => s.num === selectedStation.num) + 1]
                onStationSelect?.(nextStation)
              }}
              className="px-3 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-300 transition-colors"
            >
              Segment suivant →
            </button>
          )}
        </div>
      )}
    </div>
  )
}
