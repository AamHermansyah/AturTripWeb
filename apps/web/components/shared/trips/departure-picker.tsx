"use client"

import { useId } from "react"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { tripMoment, type DepartureSlot, type TripZone } from "@/lib/trip-plan"

export function DeparturePicker({ slots, zone, value, onChange, allowUnavailable = false }: {
  slots: DepartureSlot[]; zone: TripZone; value: string; onChange: (id: string) => void; allowUnavailable?: boolean
}) {
  const fieldId = useId()
  const slot = slots.find(slot => slot.id === value)
  return (
    <Field>
      <FieldLabel htmlFor={fieldId}>Pilih keberangkatan</FieldLabel>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={fieldId} className="w-full"><SelectValue placeholder="Pilih slot yang tersedia" /></SelectTrigger>
        <SelectContent><SelectGroup>{slots.map(slot => <SelectItem key={slot.id} value={slot.id} disabled={!allowUnavailable && (slot.status !== "available" || slot.remaining <= 0)}>{tripMoment(Date.parse(slot.startsAt), zone).full}{slot.status === "closed" ? " · Ditutup" : slot.status === "full" || slot.remaining <= 0 ? " · Penuh" : ""}</SelectItem>)}</SelectGroup></SelectContent>
      </Select>
      <FieldDescription>Zona waktu lokasi trip: {zone}. Waktu kegiatan mengikuti slot ini.{allowUnavailable ? " Slot penuh atau ditutup dapat ditinjau, tetapi tidak dapat dipesan." : ""}</FieldDescription>
      {slot && <Card size="sm"><CardHeader><CardTitle>Jadwal perjalanan</CardTitle></CardHeader><CardContent><dl className="flex flex-col gap-3 text-sm">
        <div><dt className="text-muted-foreground">Mulai</dt><dd className="font-semibold">{tripMoment(Date.parse(slot.startsAt), zone).full}</dd></div>
        <div><dt className="text-muted-foreground">Selesai</dt><dd className="font-semibold">{tripMoment(Date.parse(slot.startsAt) + slot.durationMinutes * 60000, zone).full}</dd></div>
      </dl></CardContent></Card>}
    </Field>
  )
}
