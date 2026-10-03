"use client"

import { Component, useCallback, useEffect, useState, type ReactNode } from "react"
import { MapPinIcon } from "@phosphor-icons/react"
import { Map, MapMarker, MapRoute, MarkerContent, MarkerTooltip, useMap } from "@/components/ui/map"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import { selectionReference, type Coordinate, type PlanSelection, type VisiblePlan } from "@/lib/trip-plan"

function bounds(points: Coordinate[]): [[number, number], [number, number]] {
  return [[Math.min(...points.map(point => point[0])), Math.min(...points.map(point => point[1]))],
    [Math.max(...points.map(point => point[0])), Math.max(...points.map(point => point[1]))]]
}

function MapPlacement({ onPlace }: { onPlace?: (coordinate: Coordinate) => void }) {
  const { map } = useMap()
  useEffect(() => {
    if (!map || !onPlace) return
    const place = (event: import("maplibre-gl").MapMouseEvent) => {
      if ((event.originalEvent.target as Element | null)?.closest("button")) return
      onPlace([Number(event.lngLat.lng.toFixed(6)), Number(event.lngLat.lat.toFixed(6))])
    }
    map.on("click", place)
    return () => { map.off("click", place) }
  }, [map, onPlace])
  return null
}

function MapFocus({ plan, selection, onFailure }: { plan: VisiblePlan; selection: PlanSelection; onFailure: () => void }) {
  const { map, isLoaded } = useMap()
  useEffect(() => {
    if (!map || isLoaded) return
    const timer = setTimeout(onFailure, 8000)
    const fail = () => onFailure()
    map.on("error", fail)
    return () => { clearTimeout(timer); map.off("error", fail) }
  }, [map, isLoaded, onFailure])
  useEffect(() => {
    if (!map || !isLoaded || !plan.pins.length) return
    const reference = selectionReference(plan, selection)
    if (selection?.kind === "activity" && !reference) return
    if (reference?.kind === "pin") {
      const pin = plan.pins.find(pin => pin.id === reference.id)
      if (pin) map.easeTo({ center: pin.coordinate, zoom: Math.max(map.getZoom(), 14), duration: 350 })
    } else {
      const points = reference?.kind === "segment"
        ? plan.segments.find(segment => segment.id === reference.id)?.coordinates
        : plan.pins.map(pin => pin.coordinate)
      if (points?.length) map.fitBounds(bounds(points), { padding: 44, maxZoom: 15, duration: selection ? 350 : 0 })
    }
  }, [map, isLoaded, plan, selection])
  return null
}

class MapBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onFailure() }
  render() { return this.state.failed ? null : this.props.children }
}

export function PlanDiagram({ plan, selection, onSelect }: { plan: VisiblePlan; selection: PlanSelection; onSelect: (selection: PlanSelection) => void }) {
  const reference = selectionReference(plan, selection)
  const points = [...plan.pins.map(pin => pin.coordinate), ...plan.segments.flatMap(segment => segment.coordinates)]
  if (!points.length) return <p className="p-6 text-sm text-muted-foreground">Belum ada pin pada rencana ini.</p>
  const [[minLng, minLat], [maxLng, maxLat]] = bounds(points)
  const x = (lng: number) => 30 + (lng - minLng) / (maxLng - minLng || 1) * 280
  const y = (lat: number) => 205 - (lat - minLat) / (maxLat - minLat || 1) * 160
  return (
    <svg viewBox="0 0 340 240" className="h-full w-full bg-muted/30" role="group" aria-label="Skema pin dan segmen rencana perjalanan">
      {[50, 100, 150, 200].map(y => <line key={`y${y}`} x1="0" y1={y} x2="340" y2={y} className="stroke-border" />)}
      {[50, 100, 150, 200, 250, 300].map(x => <line key={`x${x}`} x1={x} y1="0" x2={x} y2="240" className="stroke-border" />)}
      {plan.segments.map(segment => {
        const selected = reference?.kind === "segment" && reference.id === segment.id
        const geometry = segment.coordinates.map(([lng, lat]) => `${x(lng)},${y(lat)}`).join(" ")
        return <g key={segment.id} role="button" tabIndex={0} aria-label={`Pilih segmen ${segment.id}`} aria-pressed={selected} onClick={() => onSelect({ kind: "segment", id: segment.id })} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect({ kind: "segment", id: segment.id }) } }} className="cursor-pointer outline-none focus:opacity-60">
          <polyline points={geometry} fill="none" stroke="transparent" strokeWidth="24" />
          <polyline points={geometry} fill="none" strokeWidth={selected ? 6 : 3} strokeDasharray={segment.approximate ? "7 6" : undefined} className={selected ? "stroke-primary" : "stroke-muted-foreground"} />
        </g>
      })}
      {plan.pins.map((pin, index) => {
        const selected = reference?.kind === "pin" && reference.id === pin.id
        return <g key={pin.id} transform={`translate(${x(pin.coordinate[0])},${y(pin.coordinate[1])})`} role="button" tabIndex={0} aria-label={`Pilih ${pin.name}${pin.approximate ? ", lokasi perkiraan" : ""}`} aria-pressed={selected} onClick={() => onSelect({ kind: "pin", id: pin.id })} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect({ kind: "pin", id: pin.id }) } }} className="cursor-pointer outline-none focus:opacity-60">
          {pin.approximate && <circle r="24" className="fill-primary/10 stroke-primary/40" strokeDasharray="4 3" />}
          <circle r="16" className={selected ? "fill-primary stroke-primary" : "fill-background stroke-muted-foreground"} strokeWidth="2" />
          <text textAnchor="middle" dy="5" className={cn("text-[12px] font-semibold", selected ? "fill-primary-foreground" : "fill-foreground")}>{index + 1}</text>
        </g>
      })}
      <text x="12" y="230" className="fill-muted-foreground text-[10px]">Skema rencana · bukan peta navigasi</text>
    </svg>
  )
}

export function PlanMap({ plan, selection, onSelect, onMovePin, onMoveTurn, onPlace, editableTurns = [] }: {
  plan: VisiblePlan; selection: PlanSelection; onSelect: (selection: PlanSelection) => void;
  onMovePin?: (id: string, coordinate: Coordinate) => void;
  onMoveTurn?: (segmentId: string, index: number, coordinate: Coordinate) => void;
  onPlace?: (coordinate: Coordinate) => void;
  editableTurns?: { segmentId: string; index: number; coordinate: Coordinate }[]
}) {
  const [mode, setMode] = useState("map")
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const fail = useCallback(() => setFailed(true), [])
  const reference = selectionReference(plan, selection)
  const schematic = mode === "diagram" || failed
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-heading text-base font-bold">Peta rencana</h3>
        <ToggleGroup type="single" variant="outline" size="sm" value={mode} onValueChange={value => { if (value) setMode(value) }} aria-label="Tampilan peta rencana">
          <ToggleGroupItem value="map">Peta</ToggleGroupItem><ToggleGroupItem value="diagram">Skema</ToggleGroupItem>
        </ToggleGroup>
      </div>
      {failed && mode === "map" && <Alert><AlertTitle>Peta belum dapat dimuat</AlertTitle><AlertDescription>Skema rencana tetap dapat dipilih. <Button variant="link" size="sm" onClick={() => { setFailed(false); setAttempt(value => value + 1) }}>Coba muat peta</Button></AlertDescription></Alert>}
      <div className="h-64 overflow-hidden rounded-4xl border">
        {schematic ? <PlanDiagram plan={plan} selection={selection} onSelect={onSelect} /> : <MapBoundary key={attempt} onFailure={fail}>
          <Map center={plan.pins[0]?.coordinate ?? [118, -2]} zoom={11} scrollZoom={false}>
            <MapFocus plan={plan} selection={selection} onFailure={fail} />
            <MapPlacement onPlace={onPlace} />
            {plan.segments.map(segment => <MapRoute key={segment.id} id={segment.id} coordinates={segment.coordinates} color={reference?.kind === "segment" && reference.id === segment.id ? "#28776b" : "#8c8177"} width={reference?.kind === "segment" && reference.id === segment.id ? 6 : 3} dashArray={segment.approximate ? [3, 2] : undefined} onClick={() => onSelect({ kind: "segment", id: segment.id })} />)}
            {plan.pins.map((pin, index) => <MapMarker key={pin.id} longitude={pin.coordinate[0]} latitude={pin.coordinate[1]} draggable={!!onMovePin} onDragEnd={point => onMovePin?.(pin.id, [point.lng, point.lat])}>
              <MarkerContent><Button size="icon" variant={reference?.kind === "pin" && reference.id === pin.id ? "default" : "outline"} aria-label={`Pilih ${pin.name}${pin.approximate ? ", lokasi perkiraan" : ""}`} aria-pressed={reference?.kind === "pin" && reference.id === pin.id} onClick={() => onSelect({ kind: "pin", id: pin.id })}>{index + 1}</Button></MarkerContent>
              <MarkerTooltip>{pin.name}{pin.approximate ? " · perkiraan" : ""}</MarkerTooltip>
            </MapMarker>)}
            {editableTurns.map(turn => <MapMarker key={`${turn.segmentId}-${turn.index}`} longitude={turn.coordinate[0]} latitude={turn.coordinate[1]} draggable={!!onMoveTurn} onDragEnd={point => onMoveTurn?.(turn.segmentId, turn.index, [point.lng, point.lat])}><MarkerContent><span className="flex size-7 items-center justify-center rounded-lg border-2 border-primary bg-background text-xs font-bold text-primary" aria-label={`Belokan ${turn.index + 1}, dapat digeser`}>B{turn.index + 1}</span></MarkerContent></MapMarker>)}
          </Map>
        </MapBoundary>}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><MapPinIcon />Pin kegiatan / informasi</span>
        <span>Garis putus-putus: lokasi / rute perkiraan</span>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">Rencana contoh yang disusun pemandu. Bukan GPS langsung atau panduan navigasi. Pilih pin atau segmen untuk melihat keterangannya.</p>
    </div>
  )
}
