"use client"

import { useId, useState } from "react"
import Link from "next/link"
import { PreviewNotice } from "@/components/shared/preview-notice"
import { ArrowDownIcon, ArrowUpIcon, ArrowCounterClockwiseIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { PlanMap } from "@/components/shared/trips/plan-map"
import { InteractiveItinerary } from "@/components/shared/trips/interactive-itinerary"
import { DeparturePicker } from "@/components/shared/trips/departure-picker"
import { moveListItem, removePlanPin, removePlanSegment } from "@/lib/plan-editor"
import { PIN_CATEGORIES, tripInstant, validCoordinate, validateTripPlan, visiblePlan, type Coordinate, type DepartureSlot, type PlanActivity, type PlanPin, type PlanSegment, type PlanSelection, type TripPlan, type TripZone } from "@/lib/trip-plan"

function TextField({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  const id = useId()
  return <Field><FieldLabel htmlFor={id}>{label}</FieldLabel>{multiline ? <Textarea id={id} value={value} maxLength={1000} onChange={event => onChange(event.target.value)} /> : <Input id={id} value={value} maxLength={120} onChange={event => onChange(event.target.value)} />}</Field>
}
function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  const id = useId()
  return <Field><FieldLabel htmlFor={id}>{label}</FieldLabel><Input id={id} type="number" min={0} step={1} value={value} onChange={event => onChange(Number(event.target.value))} /></Field>
}
function ChoiceField({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (value: string) => void }) {
  const id = useId()
  return <Field><FieldLabel htmlFor={id}>{label}</FieldLabel><Select value={value} onValueChange={onChange}><SelectTrigger id={id} className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectGroup>{options.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectGroup></SelectContent></Select></Field>
}
function CoordinateFields({ coordinate, onApply }: { coordinate: Coordinate; onApply: (point: Coordinate) => void }) {
  const id = useId()
  const [lng, setLng] = useState(String(coordinate[0]))
  const [lat, setLat] = useState(String(coordinate[1]))
  const point: Coordinate = [Number(lng), Number(lat)]
  const valid = lng.trim() !== "" && lat.trim() !== "" && validCoordinate(point)
  return <FieldGroup><div className="grid grid-cols-2 gap-3"><Field><FieldLabel htmlFor={`${id}-lng`}>Bujur</FieldLabel><Input id={`${id}-lng`} type="number" step="any" min={-180} max={180} value={lng} onChange={event => setLng(event.target.value)} /></Field><Field><FieldLabel htmlFor={`${id}-lat`}>Lintang</FieldLabel><Input id={`${id}-lat`} type="number" step="any" min={-90} max={90} value={lat} onChange={event => setLat(event.target.value)} /></Field></div><Button variant="outline" size="sm" disabled={!valid} onClick={() => onApply(point)}>Terapkan koordinat</Button>{!valid && <p className="text-xs text-destructive">Bujur −180 sampai 180; lintang −90 sampai 90.</p>}</FieldGroup>
}

export function PlanEditor({ initial, onApply }: { initial: { plan: TripPlan; durationMinutes: number; zone: TripZone }; onApply?: (plan: TripPlan) => void }) {
  const [plan, setPlan] = useState(initial.plan)
  const [history, setHistory] = useState<TripPlan[]>([])
  const [selection, setSelection] = useState<PlanSelection>({ kind: "pin", id: initial.plan.pins[0]?.id ?? "" })
  const [tab, setTab] = useState("pins")
  const [view, setView] = useState("edit")
  const [audience, setAudience] = useState<"public" | "confirmed">("public")
  const [placement, setPlacement] = useState<"pin" | "public" | "turn" | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [reviewed, setReviewed] = useState(false)
  const [slotId, setSlotId] = useState("morning")
  const slots: DepartureSlot[] = [
    { id: "morning", startsAt: new Date(tripInstant("2026-10-10", "05:00", initial.zone)).toISOString(), durationMinutes: initial.durationMinutes, capacity: 10, remaining: 10, status: "available" },
    { id: "evening", startsAt: new Date(tripInstant("2026-10-17", "20:00", initial.zone)).toISOString(), durationMinutes: initial.durationMinutes, capacity: 10, remaining: 10, status: "available" },
  ]
  const errors = validateTripPlan(plan, initial.durationMinutes)
  const pin = selection?.kind === "pin" ? plan.pins.find(pin => pin.id === selection.id) : undefined
  const segment = selection?.kind === "segment" ? plan.segments.find(segment => segment.id === selection.id) : undefined
  const exactPlan = visiblePlan(plan, "confirmed")

  function commit(next: TripPlan) { setHistory(current => [...current.slice(-39), plan]); setPlan(next); setMessage(null); setReviewed(false) }
  function updatePin(id: string, update: Partial<PlanPin>) { commit({ ...plan, pins: plan.pins.map(pin => pin.id === id ? { ...pin, ...update } : pin) }) }
  function updateSegment(id: string, update: Partial<PlanSegment>) { commit({ ...plan, segments: plan.segments.map(segment => segment.id === id ? { ...segment, ...update } : segment) }) }
  function updateActivity(id: string, update: Partial<PlanActivity>) { commit({ ...plan, activities: plan.activities.map(activity => activity.id === id ? { ...activity, ...update } : activity) }) }
  function chooseMap(selection: PlanSelection) { setSelection(selection); setPlacement(null); if (selection?.kind === "pin") setTab("pins"); else if (selection?.kind === "segment") setTab("segments") }
  function newPin(point: Coordinate) {
    const id = `pin-${crypto.randomUUID()}`
    commit({ ...plan, pins: [...plan.pins, { id, name: "Pin baru", description: "", category: "other", coordinate: point, visibility: "exact" }] })
    setSelection({ kind: "pin", id }); setTab("pins"); setPlacement(null)
  }
  function placePoint(point: Coordinate) {
    if (placement === "pin") newPin(point)
    if (placement === "public" && pin) { updatePin(pin.id, { publicCoordinate: point }); setPlacement(null) }
    if (placement === "turn" && segment) { updateSegment(segment.id, { turns: [...segment.turns, point] }); setPlacement(null) }
  }
  function addSegment() {
    if (plan.pins.length < 2) return
    const id = `segment-${crypto.randomUUID()}`
    commit({ ...plan, segments: [...plan.segments, { id, fromPinId: plan.pins[0].id, toPinId: plan.pins[1].id, turns: [], mode: "Berjalan kaki", durationMinutes: 0, notes: "" }] })
    setSelection({ kind: "segment", id }); setPlacement(null)
  }
  function addActivity() {
    const id = `activity-${crypto.randomUUID()}`
    commit({ ...plan, activities: [...plan.activities, { id, title: "Kegiatan baru", description: "", offsetMinutes: plan.activities.at(-1)?.offsetMinutes ?? 0, durationMinutes: 0, reference: null }] })
  }
  function undo() {
    const previous = history.at(-1)
    if (!previous) return
    setPlan(previous); setHistory(current => current.slice(0, -1)); setReviewed(false); setMessage("Perubahan terakhir dibatalkan."); setPlacement(null)
  }
  function submitReview() {
    if (errors.length) { setMessage("Perbaiki validasi rencana sebelum mengirim review contoh."); return }
    setReviewed(true); setMessage("Draf contoh memenuhi validasi rencana dan masuk simulasi menunggu review. Listing belum terbit; verifikasi identitas dan persetujuan staf tetap diperlukan.")
  }

  const Container = onApply ? "section" : "main"
  const Heading = onApply ? "h2" : "h1"
  return <Container className={onApply ? "flex flex-col gap-5" : "flex flex-col gap-7 px-5 py-6 pb-12"}>
    {!onApply && <Button asChild variant="ghost" className="w-fit"><Link href="/guide-mode">Kembali ke mode pemandu</Link></Button>}
    <div className="flex flex-col gap-2"><Badge variant={reviewed ? "warning" : "secondary"} className="w-fit">{reviewed ? "Simulasi menunggu review" : "Draf rencana contoh"}</Badge><Heading className="font-heading text-[1.75rem] font-bold leading-[1.2]">Rencana kegiatan</Heading><p className="text-sm text-muted-foreground">Durasi contoh {initial.durationMinutes.toLocaleString("id-ID")} menit · {initial.zone}</p></div>
    <PreviewNotice>Editor memakai koordinat sintetis. Perubahan hanya berada di halaman ini dan hilang saat dimuat ulang. Pratinjau peserta tidak memberikan akses ke booking nyata.</PreviewNotice>
    <div className="flex flex-wrap items-center justify-between gap-2"><ToggleGroup type="single" variant="outline" value={view} onValueChange={value => { if (value) { setView(value); setPlacement(null) } }} aria-label="Mode editor"><ToggleGroupItem value="edit">Susun rencana</ToggleGroupItem><ToggleGroupItem value="preview">Pratinjau</ToggleGroupItem></ToggleGroup><Button variant="outline" size="icon" disabled={!history.length} onClick={undo} aria-label="Batalkan perubahan terakhir"><ArrowCounterClockwiseIcon /></Button></div>
    {view === "edit" ? <>
      <PlanMap plan={exactPlan} selection={selection} onSelect={chooseMap} onMovePin={(id, coordinate) => updatePin(id, { coordinate })} onMoveTurn={(id, index, coordinate) => { const target = plan.segments.find(item => item.id === id); if (target) updateSegment(id, { turns: target.turns.map((point, i) => i === index ? coordinate : point) }) }} onPlace={placement ? placePoint : undefined} editableTurns={segment?.turns.map((coordinate, index) => ({ segmentId: segment.id, index, coordinate }))} />
      <p className="text-xs leading-relaxed text-muted-foreground">Geser pin atau belokan pada peta, atau isi koordinat lewat form. Mode skema mendukung pilihan; pengubahan koordinat dilakukan lewat form.</p>
      {placement && <Alert variant="info"><AlertTitle>{placement === "pin" ? "Pilih lokasi pin baru" : placement === "public" ? "Pilih lokasi perkiraan publik" : "Pilih lokasi belokan baru"}</AlertTitle><AlertDescription>Ketuk area kosong pada peta. <Button variant="link" size="sm" onClick={() => setPlacement(null)}>Batal memilih lokasi</Button></AlertDescription></Alert>}
      <Tabs value={tab} onValueChange={value => { setTab(value); setPlacement(null) }}><TabsList className="grid h-12 w-full grid-cols-3"><TabsTrigger value="pins">Pin ({plan.pins.length})</TabsTrigger><TabsTrigger value="segments">Segmen ({plan.segments.length})</TabsTrigger><TabsTrigger value="activities">Kegiatan ({plan.activities.length})</TabsTrigger></TabsList>
        <TabsContent value="pins" className="mt-4 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">{plan.pins.map(item => <Button key={item.id} size="sm" variant={pin?.id === item.id ? "default" : "outline"} onClick={() => chooseMap({ kind: "pin", id: item.id })}>{item.name || "Pin tanpa nama"}</Button>)}</div>
          <div className="grid grid-cols-2 gap-2"><Button variant="outline" onClick={() => setPlacement("pin")}><PlusIcon />Pin dari peta</Button><Button variant="outline" onClick={() => newPin(plan.pins[0]?.coordinate ?? [116.4, -8.4])}>Pin lewat form</Button></div>
          {pin && <Card size="sm"><CardHeader><CardTitle>Detail pin</CardTitle><CardDescription>Pin informasi dapat berdiri sendiri tanpa kegiatan atau garis.</CardDescription></CardHeader><CardContent className="flex flex-col gap-5"><FieldGroup>
            <TextField label="Nama pin" value={pin.name} onChange={name => updatePin(pin.id, { name })} />
            <ChoiceField label="Kategori" value={pin.category} options={Object.entries(PIN_CATEGORIES).map(([value, label]) => ({ value, label }))} onChange={category => updatePin(pin.id, { category: category as PlanPin["category"] })} />
            <TextField label="Keterangan" multiline value={pin.description} onChange={description => updatePin(pin.id, { description })} />
            <CoordinateFields key={`${pin.id}-${pin.coordinate.join(",")}`} coordinate={pin.coordinate} onApply={coordinate => updatePin(pin.id, { coordinate })} />
            <ChoiceField label="Tampilan publik sebelum booking" value={pin.visibility} options={[{ value: "exact", label: "Koordinat tepat" }, { value: "approximate", label: "Lokasi perkiraan" }]} onChange={visibility => updatePin(pin.id, { visibility: visibility as PlanPin["visibility"] })} />
            {pin.visibility === "approximate" && <><FieldDescription>Peserta terkonfirmasi melihat lokasi tepat sesuai izin API. Tentukan lokasi umum untuk publik; garis terkait turut disamarkan.</FieldDescription><Button variant="outline" onClick={() => setPlacement("public")}>Pilih lokasi perkiraan di peta</Button><CoordinateFields key={`${pin.id}-public-${pin.publicCoordinate?.join(",")}`} coordinate={pin.publicCoordinate ?? pin.coordinate} onApply={publicCoordinate => updatePin(pin.id, { publicCoordinate })} />{!pin.publicCoordinate && <p className="text-xs text-destructive">Lokasi perkiraan belum diterapkan. Pilih atau terapkan koordinat publik terlebih dahulu.</p>}</>}
          </FieldGroup><Button variant="destructive" onClick={() => { commit(removePlanPin(plan, pin.id)); setSelection(null); setPlacement(null); setMessage("Pin dan segmen yang terhubung dihapus. Kegiatan terkait tetap ada, kini tanpa referensi peta. Gunakan urungkan untuk memulihkan.") }}><TrashIcon />Hapus pin dan segmen terkait</Button></CardContent></Card>}
        </TabsContent>
        <TabsContent value="segments" className="mt-4 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">{plan.segments.map((item, index) => <Button key={item.id} size="sm" variant={segment?.id === item.id ? "default" : "outline"} onClick={() => chooseMap({ kind: "segment", id: item.id })}>Segmen {index + 1}</Button>)}</div><Button variant="outline" disabled={plan.pins.length < 2} onClick={addSegment}><PlusIcon />Hubungkan dua pin</Button>
          {!plan.segments.length && <p className="text-sm text-muted-foreground">Garis rute tidak wajib. Tambahkan hanya bila pin memang dihubungkan pada rencana perjalanan.</p>}
          {segment && <Card size="sm"><CardHeader><CardTitle>Detail segmen</CardTitle><CardDescription>Jarak perkiraan: {((exactPlan.segments.find(item => item.id === segment.id)?.distanceMeters ?? 0) / 1000).toLocaleString("id-ID", { maximumFractionDigits: 2 })} km.</CardDescription></CardHeader><CardContent className="flex flex-col gap-5"><FieldGroup>
            <ChoiceField label="Pin asal" value={segment.fromPinId} options={plan.pins.filter(pin => pin.id !== segment.toPinId).map(pin => ({ value: pin.id, label: pin.name || "Pin tanpa nama" }))} onChange={fromPinId => updateSegment(segment.id, { fromPinId })} />
            <ChoiceField label="Pin tujuan" value={segment.toPinId} options={plan.pins.filter(pin => pin.id !== segment.fromPinId).map(pin => ({ value: pin.id, label: pin.name || "Pin tanpa nama" }))} onChange={toPinId => updateSegment(segment.id, { toPinId })} />
            <TextField label="Moda perjalanan" value={segment.mode} onChange={mode => updateSegment(segment.id, { mode })} />
            <NumberField label="Estimasi durasi (menit)" value={segment.durationMinutes} onChange={durationMinutes => updateSegment(segment.id, { durationMinutes })} />
            <TextField label="Catatan pemandu" multiline value={segment.notes} onChange={notes => updateSegment(segment.id, { notes })} />
          </FieldGroup><h3 className="font-heading text-sm font-bold">Titik belokan</h3>{segment.turns.map((point, index) => <div key={index} className="flex flex-col gap-3 border-t pt-4"><p className="text-sm font-semibold">Belokan {index + 1}</p><CoordinateFields key={point.join(",")} coordinate={point} onApply={coordinate => updateSegment(segment.id, { turns: segment.turns.map((item, i) => i === index ? coordinate : item) })} /><div className="flex gap-2"><Button variant="outline" size="icon" disabled={index === 0} aria-label={`Majukan belokan ${index + 1}`} onClick={() => updateSegment(segment.id, { turns: moveListItem(segment.turns, index, -1) })}><ArrowUpIcon /></Button><Button variant="outline" size="icon" disabled={index === segment.turns.length - 1} aria-label={`Mundurkan belokan ${index + 1}`} onClick={() => updateSegment(segment.id, { turns: moveListItem(segment.turns, index, 1) })}><ArrowDownIcon /></Button><Button variant="outline" onClick={() => updateSegment(segment.id, { turns: segment.turns.filter((_, i) => i !== index) })}><TrashIcon />Hapus belokan</Button></div></div>)}<div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => setPlacement("turn")}>Belokan dari peta</Button><Button variant="outline" onClick={() => { const from = plan.pins.find(pin => pin.id === segment.fromPinId)!.coordinate; const to = plan.pins.find(pin => pin.id === segment.toPinId)!.coordinate; updateSegment(segment.id, { turns: [...segment.turns, [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2]] }) }}>Belokan lewat form</Button></div><Button variant="destructive" onClick={() => { commit(removePlanSegment(plan, segment.id)); setSelection(null); setPlacement(null) }}><TrashIcon />Hapus segmen</Button></CardContent></Card>}
        </TabsContent>
        <TabsContent value="activities" className="mt-4 flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-muted-foreground">Selisih mulai dihitung dari awal trip. Beberapa kegiatan boleh memakai pin yang sama; kegiatan sesaat berdurasi 0 menit.</p>
          {plan.activities.map((activity, index) => <details key={activity.id} open={index === 0} className="border-t border-border"><summary className="cursor-pointer py-4 text-sm font-semibold">{activity.title || `Kegiatan ${index + 1}`}</summary><Card variant="plain" size="sm" className="border-t-0 pt-0"><CardHeader className="sr-only"><CardTitle>Kegiatan {index + 1}</CardTitle></CardHeader><CardContent className="flex flex-col gap-4"><FieldGroup><TextField label="Judul kegiatan" value={activity.title} onChange={title => updateActivity(activity.id, { title })} /><TextField label="Keterangan kegiatan" multiline value={activity.description} onChange={description => updateActivity(activity.id, { description })} /><div className="grid grid-cols-2 gap-3"><NumberField label="Mulai setelah (menit)" value={activity.offsetMinutes} onChange={offsetMinutes => updateActivity(activity.id, { offsetMinutes })} /><NumberField label="Durasi (menit)" value={activity.durationMinutes} onChange={durationMinutes => updateActivity(activity.id, { durationMinutes })} /></div><ChoiceField label="Referensi peta" value={activity.reference ? `${activity.reference.kind}:${activity.reference.id}` : "none"} options={[{ value: "none", label: "Tanpa referensi peta" }, ...plan.pins.map(pin => ({ value: `pin:${pin.id}`, label: `Pin · ${pin.name}` })), ...plan.segments.map((segment, index) => ({ value: `segment:${segment.id}`, label: `Segmen ${index + 1}` }))]} onChange={value => { const colon = value.indexOf(":"); updateActivity(activity.id, { reference: value === "none" ? null : { kind: value.slice(0, colon) as "pin" | "segment", id: value.slice(colon + 1) } }) }} /></FieldGroup><div className="flex gap-2"><Button variant="outline" size="icon" disabled={index === 0} aria-label={`Majukan kegiatan ${index + 1}`} onClick={() => commit({ ...plan, activities: moveListItem(plan.activities, index, -1) })}><ArrowUpIcon /></Button><Button variant="outline" size="icon" disabled={index === plan.activities.length - 1} aria-label={`Mundurkan kegiatan ${index + 1}`} onClick={() => commit({ ...plan, activities: moveListItem(plan.activities, index, 1) })}><ArrowDownIcon /></Button><Button variant="outline" onClick={() => commit({ ...plan, activities: plan.activities.filter(item => item.id !== activity.id) })}><TrashIcon />Hapus kegiatan</Button></div></CardContent></Card></details>)}
          <Button variant="outline" onClick={addActivity}><PlusIcon />Tambah kegiatan</Button>
        </TabsContent>
      </Tabs>
    </> : <>
      <ToggleGroup type="single" variant="outline" value={audience} onValueChange={value => { if (value) setAudience(value as "public" | "confirmed") }} aria-label="Pratinjau penerima"><ToggleGroupItem value="public">Publik</ToggleGroupItem><ToggleGroupItem value="confirmed">Peserta</ToggleGroupItem></ToggleGroup>
      <p className="text-sm text-muted-foreground">{audience === "public" ? "Pin perkiraan dan seluruh geometri segmen terkait disamarkan pada hasil data pratinjau." : "Contoh tampilan lokasi tepat untuk peserta terkonfirmasi. Izin server pada booking nyata belum terhubung."}</p>
      <DeparturePicker slots={slots} zone={initial.zone} value={slotId} onChange={setSlotId} />
      {!errors.length && <InteractiveItinerary key={audience} plan={visiblePlan(plan, audience)} slot={slots.find(slot => slot.id === slotId)!} zone={initial.zone} />}
    </>}
    {errors.length > 0 && <Alert variant="destructive"><AlertTitle>Rencana perlu diperbaiki</AlertTitle><AlertDescription><ul className="flex list-disc flex-col gap-2 pl-4">{errors.map(error => <li key={error}>{error}</li>)}</ul></AlertDescription></Alert>}
    {message && <Alert variant={reviewed ? "success" : "info"}><AlertDescription>{message}</AlertDescription></Alert>}
    <Button disabled={errors.length > 0 || reviewed} onClick={() => onApply ? onApply(plan) : submitReview()}>{onApply ? "Gunakan rencana dan lanjutkan" : reviewed ? "Menunggu review contoh" : "Simulasikan kirim untuk review"}</Button>
    <p className="text-xs leading-relaxed text-muted-foreground">Validasi minimum: linimasa berurutan, waktu valid, dan pin titik temu. Listing belum dapat terbit sebelum identitas penyedia dan review listing disetujui staf.</p>
  </Container>
}
