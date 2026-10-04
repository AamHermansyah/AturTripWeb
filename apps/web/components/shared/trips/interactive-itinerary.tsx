"use client"

import { useState } from "react"
import { ClockIcon, MapPinIcon, PathIcon } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn, formatDuration } from "@/lib/utils"
import { activityTimes, PIN_CATEGORIES, relatedActivities, selectionReference, type DepartureSlot, type PlanSelection, type TripZone, type VisiblePlan } from "@/lib/trip-plan"
import { PlanMap } from "./plan-map"

export function InteractiveItinerary({ plan, slot, zone }: { plan: VisiblePlan; slot: DepartureSlot; zone: TripZone }) {
  const [selection, setSelection] = useState<PlanSelection>(null)
  const reference = selectionReference(plan, selection)
  const pin = reference?.kind === "pin" ? plan.pins.find(pin => pin.id === reference.id) : null
  const segment = reference?.kind === "segment" ? plan.segments.find(segment => segment.id === reference.id) : null
  const related = relatedActivities(plan, reference)
  const selectedActivity = selection?.kind === "activity" ? plan.activities.find(activity => activity.id === selection.id) : null

  return (
    <section className="flex flex-col gap-5" aria-label="Linimasa dan peta kegiatan">
      <PlanMap plan={plan} selection={selection} onSelect={setSelection} />
      <div className="flex flex-wrap gap-2" aria-label="Daftar pin peta">
        {plan.pins.map((pin, index) => <Button key={pin.id} size="sm" variant={reference?.kind === "pin" && reference.id === pin.id ? "default" : "outline"} aria-pressed={reference?.kind === "pin" && reference.id === pin.id} onClick={() => setSelection({ kind: "pin", id: pin.id })}>{index + 1}. {pin.name}</Button>)}
      </div>
      <div className="flex flex-wrap gap-2" aria-label="Daftar segmen rute">
        {plan.segments.map(segment => <Button key={segment.id} size="sm" className="h-auto max-w-full whitespace-normal py-2 text-left" variant={reference?.kind === "segment" && reference.id === segment.id ? "default" : "outline"} aria-pressed={reference?.kind === "segment" && reference.id === segment.id} onClick={() => setSelection({ kind: "segment", id: segment.id })}><PathIcon data-icon="inline-start" />{plan.pins.find(pin => pin.id === segment.fromPinId)?.name} → {plan.pins.find(pin => pin.id === segment.toPinId)?.name}</Button>)}
      </div>
      {(pin || segment || selectedActivity) && <Card size="sm" role="region" aria-label="Detail pilihan linimasa dan peta">
        <CardHeader>
          <CardTitle>{pin ? pin.name : segment ? "Rincian segmen rute" : selectedActivity?.title}</CardTitle>
          <CardDescription>{pin ? pin.description : segment ? segment.notes : selectedActivity?.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {pin && <div className="flex flex-wrap gap-2"><Badge variant="secondary">{PIN_CATEGORIES[pin.category]}</Badge><Badge variant={pin.approximate ? "warning" : "outline"}>{pin.approximate ? "Lokasi perkiraan" : "Lokasi tepat"}</Badge></div>}
          {segment && <dl className="grid grid-cols-2 gap-3 text-sm">
            <div><dt className="text-muted-foreground">Dari</dt><dd>{plan.pins.find(pin => pin.id === segment.fromPinId)?.name}</dd></div>
            <div><dt className="text-muted-foreground">Ke</dt><dd>{plan.pins.find(pin => pin.id === segment.toPinId)?.name}</dd></div>
            <div><dt className="text-muted-foreground">Jarak perkiraan</dt><dd>{(segment.distanceMeters / 1000).toLocaleString("id-ID", { maximumFractionDigits: 2 })} km{segment.approximate ? " · garis disamarkan" : ""}</dd></div>
            <div><dt className="text-muted-foreground">Moda</dt><dd>{segment.mode}</dd></div>
            <div><dt className="text-muted-foreground">Estimasi durasi</dt><dd>{formatDuration(segment.durationMinutes)}</dd></div>
          </dl>}
          {reference && <>
            <Separator />
            <p className="text-xs text-muted-foreground">{related.length ? "Kegiatan terkait" : reference.kind === "pin" ? "Pin informasi mandiri; tidak terhubung ke kegiatan." : "Segmen ini tidak terhubung ke kegiatan."}</p>
            {related.map(activity => <Button key={activity.id} variant="outline" className="h-auto justify-start whitespace-normal py-2 text-left" onClick={() => setSelection({ kind: "activity", id: activity.id })}>{activity.title}</Button>)}
          </>}
          {selectedActivity && !reference && <p className="text-sm text-muted-foreground">Kegiatan tanpa referensi peta. Fokus peta tetap pada posisi sebelumnya.</p>}
        </CardContent>
      </Card>}
      <div className="flex items-center justify-between gap-3"><h2 className="font-heading text-lg font-extrabold">Linimasa kegiatan</h2><Badge variant="secondary">{zone}</Badge></div>
      <ol className="flex flex-col gap-1">
        {plan.activities.map((activity, index) => {
          const times = activityTimes(activity, slot, zone)
          const active = selection?.kind === "activity" ? selection.id === activity.id : related.some(item => item.id === activity.id)
          return <li key={activity.id}>
            <button type="button" aria-pressed={active} onClick={() => setSelection({ kind: "activity", id: activity.id })} className={cn("flex w-full gap-3 rounded-xl border-l-2 px-3 py-4 text-left transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none", active ? "border-primary bg-primary/5" : "border-border bg-transparent hover:bg-secondary/60")}>
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">{index + 1}</span>
              <span className="flex min-w-0 flex-1 flex-col gap-2">
                <span className="text-xs font-semibold text-primary">{times.start.full}{activity.durationMinutes > 0 && <span className="block text-muted-foreground">hingga {times.end.full}</span>}</span>
                <span className="font-heading text-sm font-bold">{activity.title}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{activity.description}</span>
                <span className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"><ClockIcon />{activity.durationMinutes ? formatDuration(activity.durationMinutes) : "Kegiatan sesaat"}{activity.reference ? <><MapPinIcon />{activity.reference.kind === "pin" ? "Lihat pin" : "Lihat segmen"}</> : " · Tanpa lokasi"}</span>
              </span>
            </button>
          </li>
        })}
      </ol>
    </section>
  )
}
