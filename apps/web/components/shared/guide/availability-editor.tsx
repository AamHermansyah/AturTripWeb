"use client"

import { useId, useState } from "react"
import Link from "next/link"
import { PreviewNotice } from "@/components/shared/preview-notice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AVAILABILITY_PATTERNS, generateAvailability, validateAvailability, type AvailabilityConfig, type AvailabilityPattern } from "@/lib/availability-preview"
import { tripInstant, tripMoment, type DepartureSlot, type TripZone } from "@/lib/trip-plan"
import { formatDuration } from "@/lib/utils"

const INITIAL: AvailabilityConfig = {
  pattern: "time-repeat", zone: "WIB", durationMinutes: 360, capacity: 10, listingType: "Sharing", bookingCutoffMinutes: 1440,
  startDate: "2026-10-10", endDate: "2026-10-31", weekdays: [6], excludedDates: ["2026-10-24"], dayStartTime: "05:00",
  customDates: ["2026-10-10", "2026-10-17", "2026-10-31"], repeatedTimes: ["08:00", "20:00"],
  customStarts: [{ date: "2026-10-10", time: "20:00" }, { date: "2026-10-17", time: "14:00" }],
}
const DAYS = [{ value: "1", label: "Sen" }, { value: "2", label: "Sel" }, { value: "3", label: "Rab" }, { value: "4", label: "Kam" }, { value: "5", label: "Jum" }, { value: "6", label: "Sab" }, { value: "0", label: "Min" }]

export function AvailabilityEditor({ initial = INITIAL, onApply }: { initial?: AvailabilityConfig; onApply?: (config: AvailabilityConfig, slots: DepartureSlot[]) => void }) {
  const id = useId()
  const [config, setConfig] = useState(initial)
  const [result, setResult] = useState<ReturnType<typeof generateAvailability> | null>(null)
  const [snapshot, setSnapshot] = useState<AvailabilityConfig | null>(null)
  const [closed, setClosed] = useState<string[]>([])
  const [showBooking, setShowBooking] = useState(false)
  const [simulateBusy, setSimulateBusy] = useState(true)
  const [customDateText, setCustomDateText] = useState(initial.customDates.join("\n"))
  const [timesText, setTimesText] = useState(initial.repeatedTimes.join(", "))
  const [excludeText, setExcludeText] = useState(initial.excludedDates.join("\n"))
  const [startsText, setStartsText] = useState(initial.customStarts.map(slot => `${slot.date} ${slot.time}`).join("\n"))
  const byDay = config.pattern.startsWith("day-")
  const repeatDays = config.pattern === "day-repeat" || config.pattern === "time-repeat"
  const repeatedTimes = config.pattern === "time-repeat" || config.pattern === "time-custom-repeat"
  const customDates = config.pattern === "day-custom" || config.pattern === "time-custom-repeat"
  const lines = (text: string) => text.split(/[\n,]/).map(value => value.trim()).filter(Boolean)
  const draft = { ...config, customDates: lines(customDateText), repeatedTimes: lines(timesText), excludedDates: lines(excludeText), customStarts: lines(startsText).map(text => { const [date, time, extra] = text.split(/\s+/); return { date, time: extra ? "invalid" : time ?? "" } }) }
  const errors = validateAvailability(draft)
  const exampleBookingId = showBooking ? result?.slots.find(slot => slot.status === "available")?.id : undefined
  const bookedPeople = snapshot ? Math.min(2, snapshot.capacity) : 0
  function update(update: Partial<AvailabilityConfig>) { setConfig(current => ({ ...current, ...update })) }
  function createPreview() {
    const busy = simulateBusy ? [{ startsAt: new Date(tripInstant("2026-10-11", "01:00", draft.zone)).toISOString(), durationMinutes: 120, label: "Keberangkatan lain contoh" }] : []
    const preview = generateAvailability(draft, Date.now(), busy)
    setResult(preview); setSnapshot(draft); setClosed([]); setShowBooking(false)
  }
  const Container = onApply ? "section" : "main"
  const Heading = onApply ? "h2" : "h1"
  return <Container className={onApply ? "flex flex-col gap-5" : "flex flex-col gap-7 px-5 py-6 pb-12"}>
    {!onApply && <Button asChild variant="ghost" className="w-fit"><Link href="/guide-mode">Kembali ke mode pemandu</Link></Button>}<Badge variant="secondary" className="w-fit">Draf jadwal contoh</Badge><div><Heading className="font-heading text-[1.75rem] font-bold leading-[1.2]">Ketersediaan trip</Heading><p className="mt-2 text-sm text-muted-foreground">Susun aturan, lalu tinjau tanggal dan jam keberangkatan yang dihasilkan.</p></div>
    <PreviewNotice>Perubahan hanya di halaman ini. Tidak ada slot nyata, penugasan pemandu, atau perubahan booking yang dikirim ke API.</PreviewNotice>
    <FieldGroup>
      <Field><FieldLabel htmlFor={`${id}-pattern`}>Pola ketersediaan</FieldLabel><Select value={config.pattern} onValueChange={value => update({ pattern: value as AvailabilityPattern, durationMinutes: value.startsWith("day-") ? Math.max(1440, config.durationMinutes) : Math.min(1440, config.durationMinutes) })}><SelectTrigger id={`${id}-pattern`} className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectGroup>{Object.entries(AVAILABILITY_PATTERNS).map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}</SelectGroup></SelectContent></Select><FieldDescription>{byDay ? "Wisatawan memilih tanggal mulai. Waktu selesai dihitung dari durasi listing." : "Wisatawan memilih tanggal dan jam mulai. Tanggal selalu merujuk awal trip."}</FieldDescription></Field>
      <Field><FieldLabel htmlFor={`${id}-zone`}>Zona waktu lokasi trip</FieldLabel><Select value={config.zone} onValueChange={value => update({ zone: value as TripZone })}><SelectTrigger id={`${id}-zone`} className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectGroup>{["WIB", "WITA", "WIT"].map(zone => <SelectItem key={zone} value={zone}>{zone}</SelectItem>)}</SelectGroup></SelectContent></Select><FieldDescription>Lokasi contoh di Jawa memakai WIB. Koreksi zona untuk lokasi trip lain sebelum listing diajukan.</FieldDescription></Field>
      <Field><FieldLabel htmlFor={`${id}-duration`}>Durasi trip (menit)</FieldLabel><Input id={`${id}-duration`} type="number" min={byDay ? 1440 : 1} max={byDay ? undefined : 1440} step={1} value={config.durationMinutes} onChange={event => update({ durationMinutes: Number(event.target.value) })} /><FieldDescription>{Number.isFinite(config.durationMinutes) ? formatDuration(config.durationMinutes) : "Isi durasi valid"}. Tepat 1.440 menit (24 jam) boleh memakai By day maupun By time.</FieldDescription></Field>
      <div className="grid grid-cols-2 gap-3"><Field><FieldLabel htmlFor={`${id}-type`}>Tipe listing</FieldLabel><Select value={config.listingType} onValueChange={value => update({ listingType: value as "Privat" | "Sharing" })}><SelectTrigger id={`${id}-type`} className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectGroup><SelectItem value="Privat">Privat</SelectItem><SelectItem value="Sharing">Sharing</SelectItem></SelectGroup></SelectContent></Select></Field><Field><FieldLabel htmlFor={`${id}-capacity`}>Kapasitas (orang)</FieldLabel><Input id={`${id}-capacity`} type="number" min={1} step={1} value={config.capacity} onChange={event => update({ capacity: Number(event.target.value) })} /></Field></div>
      <p className="text-xs leading-relaxed text-muted-foreground">{config.listingType === "Privat" ? "Satu booking rombongan memakai seluruh keberangkatan secara eksklusif." : "Beberapa booking dapat mengisi keberangkatan yang sama hingga kapasitas habis."} Wisatawan tidak memilih ulang tipe saat checkout.</p>
      <Field><FieldLabel htmlFor={`${id}-cutoff`}>Batas booking baru sebelum mulai</FieldLabel><Select value={String(config.bookingCutoffMinutes)} onValueChange={value => update({ bookingCutoffMinutes: Number(value) as AvailabilityConfig["bookingCutoffMinutes"] })}><SelectTrigger id={`${id}-cutoff`} className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectGroup>{[{ value: 15, label: "15 menit" }, { value: 1440, label: "24 jam" }, { value: 4320, label: "3 hari" }, { value: 10080, label: "7 hari" }].map(option => <SelectItem key={option.value} value={String(option.value)}>{option.label}</SelectItem>)}</SelectGroup></SelectContent></Select></Field>
      {repeatDays && <>
        <div className="grid grid-cols-2 gap-3"><Field><FieldLabel htmlFor={`${id}-start`}>Mulai berlaku</FieldLabel><Input id={`${id}-start`} type="date" value={config.startDate} onChange={event => update({ startDate: event.target.value })} /></Field><Field><FieldLabel htmlFor={`${id}-end`}>Akhir berlaku</FieldLabel><Input id={`${id}-end`} type="date" value={config.endDate} onChange={event => update({ endDate: event.target.value })} /></Field></div>
        <Field><FieldLabel>Hari dalam pekan</FieldLabel><ToggleGroup type="multiple" variant="outline" className="flex flex-wrap" value={config.weekdays.map(String)} onValueChange={values => update({ weekdays: values.map(Number) })} aria-label="Hari berulang">{DAYS.map(day => <ToggleGroupItem key={day.value} value={day.value}>{day.label}</ToggleGroupItem>)}</ToggleGroup></Field>
        <Field><FieldLabel htmlFor={`${id}-excluded`}>Pengecualian tanggal (opsional)</FieldLabel><Textarea id={`${id}-excluded`} maxLength={2000} value={excludeText} onChange={event => setExcludeText(event.target.value)} placeholder="2026-10-24" /><FieldDescription>Satu tanggal YYYY-MM-DD per baris. Penutupan untuk penjualan baru tidak membatalkan booking terkonfirmasi.</FieldDescription></Field>
      </>}
      {customDates && <Field><FieldLabel htmlFor={`${id}-dates`}>Tanggal mulai Custom</FieldLabel><Textarea id={`${id}-dates`} maxLength={2000} value={customDateText} onChange={event => setCustomDateText(event.target.value)} placeholder={"2026-10-10\n2026-10-17"} /><FieldDescription>Satu tanggal YYYY-MM-DD per baris.</FieldDescription></Field>}
      {byDay && <Field><FieldLabel htmlFor={`${id}-daytime`}>Jam mulai listing</FieldLabel><Input id={`${id}-daytime`} type="time" value={config.dayStartTime} onChange={event => update({ dayStartTime: event.target.value })} /><FieldDescription>Jam ini berlaku pada tanggal yang dipilih wisatawan.</FieldDescription></Field>}
      {repeatedTimes && <Field><FieldLabel htmlFor={`${id}-times`}>Jam keberangkatan berulang</FieldLabel><Input id={`${id}-times`} maxLength={300} value={timesText} onChange={event => setTimesText(event.target.value)} placeholder="08:00, 20:00" /><FieldDescription>Pisahkan dengan koma. Jam mengacu pada zona {config.zone}.</FieldDescription></Field>}
      {config.pattern === "time-custom" && <Field><FieldLabel htmlFor={`${id}-starts`}>Tanggal dan jam mulai Custom</FieldLabel><Textarea id={`${id}-starts`} maxLength={3000} value={startsText} onChange={event => setStartsText(event.target.value)} placeholder={"2026-10-10 20:00\n2026-10-17 14:00"} /><FieldDescription>Satu pasangan YYYY-MM-DD HH:mm per baris. Setiap tanggal boleh memiliki jam berbeda.</FieldDescription></Field>}
      <Field orientation="horizontal"><Checkbox id={`${id}-busy`} checked={simulateBusy} onCheckedChange={value => setSimulateBusy(value === true)} /><FieldLabel htmlFor={`${id}-busy`}>Tambahkan jadwal pemandu lain contoh: 11 Oktober, 01.00–03.00 {config.zone}.</FieldLabel></Field>
    </FieldGroup>
    {errors.length > 0 && <Alert variant="destructive"><AlertTitle>Konfigurasi perlu diperbaiki</AlertTitle><AlertDescription><ul className="list-disc space-y-2 pl-4">{errors.map(error => <li key={error}>{error}</li>)}</ul></AlertDescription></Alert>}
    <Button disabled={errors.length > 0} onClick={createPreview}>Buat pratinjau slot</Button>
    {result && snapshot && <section className="flex flex-col gap-4" aria-label="Pratinjau keberangkatan"><div><h2 className="font-heading text-lg font-extrabold">{result.slots.length} keberangkatan contoh</h2><p className="mt-1 text-xs text-muted-foreground">{AVAILABILITY_PATTERNS[snapshot.pattern]} · {snapshot.listingType} · {snapshot.zone}. Perubahan form diterapkan setelah membuat ulang pratinjau.</p></div>
      {result.limited && <Alert><AlertDescription>Pratinjau Repeat dibatasi 60 hari pertama dari aturan. Ini batas tampilan contoh, bukan batas jadwal produksi.</AlertDescription></Alert>}
      {!result.slots.length && <Alert><AlertTitle>Belum ada keberangkatan</AlertTitle><AlertDescription>Periksa rentang tanggal, hari pekan, dan pengecualian.</AlertDescription></Alert>}
      {result.slots.some(slot => slot.status === "available") && <Field orientation="horizontal"><Checkbox id={`${id}-booking`} checked={showBooking} onCheckedChange={value => setShowBooking(value === true)} /><FieldLabel htmlFor={`${id}-booking`}>Tampilkan satu booking terkonfirmasi contoh pada slot pertama yang tersedia.</FieldLabel></Field>}
      {result.slots.map(slot => {
        const isClosed = closed.includes(slot.id)
        const hasBooking = exampleBookingId === slot.id
        const remaining = hasBooking ? snapshot.listingType === "Privat" ? 0 : slot.capacity - bookedPeople : slot.remaining
        return <Card key={slot.id} variant="plain" size="sm"><CardHeader><div className="flex flex-wrap items-start justify-between gap-2"><CardTitle className="text-sm">{tripMoment(Date.parse(slot.startsAt), snapshot.zone).full}</CardTitle><Badge variant={slot.conflict || isClosed ? "warning" : remaining <= 0 ? "secondary" : "outline"}>{slot.conflict ? "Bentrok jadwal" : isClosed ? "Penjualan ditutup" : slot.status === "closed" ? "Batas booking lewat" : remaining <= 0 ? "Penuh / terpesan" : "Tersedia"}</Badge></div></CardHeader><CardContent className="flex flex-col gap-3"><dl className="flex flex-col gap-2 text-sm"><div><dt className="text-muted-foreground">Selesai</dt><dd>{tripMoment(Date.parse(slot.startsAt) + slot.durationMinutes * 60000, snapshot.zone).full}</dd></div><div><dt className="text-muted-foreground">Batas booking baru</dt><dd>{tripMoment(Date.parse(slot.cutoffAt), snapshot.zone).full}</dd></div><div><dt className="text-muted-foreground">Kapasitas / sisa penjualan</dt><dd>{slot.capacity} orang / {isClosed ? 0 : remaining} tempat</dd></div></dl>{hasBooking && <Alert variant="success"><AlertDescription>1 booking terkonfirmasi contoh ({bookedPeople} orang) tetap berlaku{isClosed ? " meskipun penjualan baru ditutup" : ""}. Jika tidak dapat menjalankan trip, ajukan reschedule atau pembatalan dengan refund penuh.</AlertDescription></Alert>}{slot.conflict && <p className="text-xs leading-relaxed text-warning">Seluruh interval mulai–selesai tumpang tindih dengan keberangkatan berbeda. Periksa jadwal hari berikutnya juga.</p>}<Button variant="outline" disabled={slot.status !== "available"} onClick={() => setClosed(current => isClosed ? current.filter(id => id !== slot.id) : [...current, slot.id])}>{isClosed ? "Buka kembali penjualan baru" : "Tutup penjualan baru"}</Button></CardContent></Card>
      })}
      <p className="text-xs leading-relaxed text-muted-foreground">Pratinjau memeriksa bentrok pada seluruh interval, termasuk antar-slot hasil aturan ini. Penahanan kapasitas atomik dan pemeriksaan lintas listing tetap tugas API.</p>
      {onApply && <Button disabled={!result.slots.some(slot => slot.status === "available" && !closed.includes(slot.id))} onClick={() => onApply(snapshot, result.slots.map(slot => closed.includes(slot.id) ? { ...slot, status: "closed", remaining: 0 } : slot))}>Gunakan jadwal dan lanjutkan</Button>}
    </section>}
  </Container>
}
