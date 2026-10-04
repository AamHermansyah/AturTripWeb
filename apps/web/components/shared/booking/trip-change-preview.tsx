"use client"

import { useId, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { InteractiveItinerary } from "@/components/shared/trips/interactive-itinerary"
import { currency } from "@/lib/booking-preview"
import { initialChangeState, transitionTripChange, type ChangeAction } from "@/lib/trip-change-preview"
import { tripMoment } from "@/lib/trip-plan"
import type { TripChangePreview as Preview } from "@/lib/server/trip-change-preview"
import { formatDuration } from "@/lib/utils"
import { PageHeading } from "@/components/shared/page-heading"
import { PreviewNotice } from "@/components/shared/preview-notice"

const statusLabels = { draft: "Draf usulan", pending: "Menunggu jawaban", applied: "Versi baru berlaku", "kept-old": "Versi lama dijalankan", refunded: "Booking batal · refund penuh" }

export function TripChangePreview({ preview, initialRole }: { preview: Preview; initialRole: "guide" | "traveler" }) {
  const id = useId()
  const [role, setRole] = useState(initialRole)
  const [scenarioId, setScenarioId] = useState("duration")
  const scenario = preview.scenarios.find(item => item.id === scenarioId)!
  const [state, setState] = useState(() => initialRole === "traveler" ? transitionTripChange(initialChangeState(), "submit", "important", preview.paidBase, preview.serviceFee) : initialChangeState())
  const [reason, setReason] = useState(scenario.reason)
  const [view, setView] = useState("old")
  const [confirm, setConfirm] = useState<"accept" | "reject" | "cancel" | null>(null)
  const [notice, setNotice] = useState("")
  const important = scenario.classification.kind === "important"
  function act(action: ChangeAction) {
    if (action === "submit" && !reason.trim()) { setNotice("Isi alasan perubahan sebelum mengirim usulan."); return }
    setState(current => transitionTripChange(current, action, scenario.classification.kind, preview.paidBase, preview.serviceFee))
    setConfirm(null)
    setNotice(action === "no-response" ? "Tidak ada jawaban: versi lama tetap berlaku. Tidak ada persetujuan otomatis." : "")
  }
  function reset(nextId = scenarioId) {
    const next = preview.scenarios.find(item => item.id === nextId)!
    setScenarioId(nextId); setState(initialChangeState()); setReason(next.reason); setView("old"); setConfirm(null); setNotice("")
  }
  const inspected = view === "old" ? preview.old : scenario.proposed
  return <main className="flex flex-col gap-7 px-5 py-6 pb-12">
    <Button asChild variant="ghost" className="w-fit"><Link href={initialRole === "guide" ? "/guide-mode" : "/booking/preview"}>{initialRole === "guide" ? "Kembali ke mode pemandu" : "Kembali ke booking contoh"}</Link></Button>
    <PageHeading title="Tinjau perubahan trip" description={<>{preview.title}<span className="mt-1 block">{tripMoment(Date.parse(preview.slot.startsAt), preview.zone).full}</span></>} />
    <PreviewNotice>Bandingkan versi yang dipesan dengan usulan pemandu. Semua data, persetujuan, dan refund di sini adalah simulasi lokal. Muat ulang akan mengembalikan contoh awal.</PreviewNotice>
    <Card size="sm"><CardHeader><CardTitle>Contoh yang ingin ditinjau</CardTitle><CardDescription>Pilihan contoh mengulang booking simulasi. Beralih tampilan mempertahankan jawaban pada contoh yang sama.</CardDescription></CardHeader><CardContent className="flex flex-col gap-4">
      <Field><FieldLabel htmlFor={`${id}-case`}>Jenis perubahan</FieldLabel><Select value={scenarioId} onValueChange={reset}><SelectTrigger id={`${id}-case`}><SelectValue /></SelectTrigger><SelectContent><SelectGroup>{preview.scenarios.map(item => <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>)}</SelectGroup></SelectContent></Select></Field>
      <ToggleGroup type="single" variant="outline" value={role} onValueChange={value => { if (value === "guide" || value === "traveler") setRole(value) }} aria-label="Tampilan peran contoh"><ToggleGroupItem value="guide">Pemandu</ToggleGroupItem><ToggleGroupItem value="traveler">Wisatawan</ToggleGroupItem></ToggleGroup>
    </CardContent></Card>
    <div className="rounded-3xl border bg-card p-4" aria-live="polite"><div className="flex flex-wrap gap-2"><Badge variant={important ? "warning" : "secondary"}>{important ? "Perubahan penting" : "Koreksi kecil"}</Badge><Badge variant="outline">{statusLabels[state.status]}</Badge></div><p className="mt-3 text-sm font-semibold">Versi booking berlaku: {state.activeVersion === "old" ? "Versi 1" : "Versi 2"}</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{state.status === "refunded" ? "Booking dibatalkan; versi lama tetap tersimpan sebagai riwayat. Refund mencakup seluruh pembayaran dan biaya layanan." : important ? "Usulan hanya berlaku setelah wisatawan setuju. Tanpa jawaban, pemandu menjalankan versi lama atau membatalkan dengan refund penuh." : "Koreksi kecil cukup diberitahukan dalam aplikasi. Versi lama tetap tersimpan."}</p></div>
    {notice && <p role="status" className="rounded-2xl bg-muted p-4 text-sm">{notice}</p>}
    <section className="flex flex-col gap-3" aria-labelledby={`${id}-comparison`}><h2 id={`${id}-comparison`} className="font-heading text-lg font-extrabold">Apa yang berubah?</h2>
      {[preview.old, scenario.proposed].map((snapshot, index) => <Card key={snapshot.version} variant="plain" size="sm"><CardHeader><CardTitle>{snapshot.version}</CardTitle><CardDescription>{state.status !== "refunded" && (state.activeVersion === "old" ? index === 0 : index === 1) ? "Berlaku untuk booking ini" : index === 1 ? "Usulan untuk dibandingkan" : "Tersimpan sebagai riwayat"}</CardDescription></CardHeader><CardContent><dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">{[
        ["Jarak garis rencana", `${(snapshot.routeMeters / 1000).toFixed(2)} km`], ["Estimasi waktu rute", formatDuration(snapshot.routeMinutes)], ["Durasi trip", formatDuration(snapshot.durationMinutes)], ["Kesulitan", snapshot.difficulty], ["Titik temu", snapshot.meeting], ["Tujuan", snapshot.destination], ["Moda", snapshot.modes.join(", ")], ["Medan", snapshot.terrain], ["Risiko", snapshot.risk], ["Kegiatan inti", snapshot.coreActivities.join(", ")],
      ].map(([label, value]) => <div key={label}><dt className="text-xs text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div>)}</dl></CardContent></Card>)}
      <p className="text-xs leading-relaxed text-muted-foreground">Jarak dihitung dari garis rencana sintetis di server, bukan GPS. Peta di bawah menyamarkan titik temu dan segmen terkait; panjang garis yang terlihat dapat berbeda.</p>
      <p className="text-sm">Perubahan jarak: {scenario.classification.distancePercent?.toFixed(2) ?? "Rute baru"}% · waktu rute: {scenario.classification.durationPercent?.toFixed(2) ?? "Rute baru"}%</p>
      {important ? <ul className="list-disc space-y-2 pl-5 text-sm">{scenario.classification.reasons.map(reason => <li key={reason}>{reason}</li>)}</ul> : <p className="text-sm text-muted-foreground">Jarak dan waktu rute berubah kurang dari 20%; substansi, risiko, dan titik temu tetap sama.</p>}
    </section>
    <Card><CardHeader><CardTitle>{role === "guide" ? "Tindakan pemandu" : "Jawaban wisatawan"}</CardTitle><CardDescription>Persetujuan untuk booking ini terpisah dari review staf terhadap listing publik.</CardDescription></CardHeader><CardContent className="flex flex-col gap-4">
      {role === "guide" && state.status === "draft" && <><Field><FieldLabel htmlFor={`${id}-reason`}>Alasan perubahan</FieldLabel><Textarea id={`${id}-reason`} value={reason} onChange={event => setReason(event.target.value)} maxLength={1000} /><FieldDescription>Gunakan keterangan contoh tanpa data pribadi.</FieldDescription></Field><Button onClick={() => act("submit")}>{important ? "Simulasikan kirim usulan" : "Simpan koreksi dan beri tahu"}</Button></>}
      {state.status !== "draft" && <p className="text-sm leading-relaxed"><span className="font-semibold">Alasan pemandu: </span>{reason}</p>}
      {state.status === "pending" && (role === "traveler" ? <><Button onClick={() => setConfirm("accept")}>Setujui versi usulan</Button><Button variant="outline" onClick={() => setConfirm("reject")}>Tolak dan minta refund penuh</Button><Button variant="ghost" onClick={() => act("no-response")}>Simulasikan belum menjawab</Button></> : <><p className="text-sm text-muted-foreground">Wisatawan belum memberi jawaban. Beralih ke tampilan wisatawan untuk mencoba persetujuan atau penolakan.</p><Button variant="outline" onClick={() => act("keep-old")}>Tarik usulan, jalankan versi lama</Button><Button variant="outline" onClick={() => setConfirm("cancel")}>Tidak dapat menjalankan versi lama</Button></>)}
      {role === "traveler" && state.status === "draft" && <p className="text-sm text-muted-foreground">Belum ada usulan. Beralih ke tampilan pemandu untuk mengirim contoh perubahan.</p>}
      {state.status === "refunded" && <dl className="space-y-2 text-sm"><div className="flex justify-between gap-3"><dt>Trip + add-on sudah dibayar</dt><dd>{currency(preview.paidBase)}</dd></div><div className="flex justify-between gap-3"><dt>Biaya layanan dikembalikan</dt><dd>{currency(preview.serviceFee)}</dd></div><div className="flex justify-between gap-3 font-bold"><dt>Total refund contoh</dt><dd>{currency(state.refund)}</dd></div><p className="text-muted-foreground">Status: simulasi hak refund, belum ada transaksi atau transfer dana.</p></dl>}
      <Button asChild variant="outline"><Link href="/booking/guide-reschedule">Lihat usulan perubahan jam mulai</Link></Button>
    </CardContent></Card>
    {state.events.length > 0 && <Card size="sm"><CardHeader><CardTitle>Pemberitahuan contoh</CardTitle><CardDescription>Riwayat hanya untuk simulasi ini. WhatsApp belum dikirim.</CardDescription></CardHeader><CardContent><ol className="space-y-4 text-sm">{state.events.map((event, index) => <li key={index}><p>{event.message}</p><p className="mt-1 text-xs text-muted-foreground">Kanal contoh: {event.channels.join(" + ")}</p></li>)}</ol></CardContent></Card>}
    <section className="flex flex-col gap-4"><h2 className="font-heading text-lg font-extrabold">Peta dan linimasa tiap versi</h2><ToggleGroup type="single" variant="outline" value={view} onValueChange={value => { if (value) setView(value) }} aria-label="Versi rencana yang dilihat"><ToggleGroupItem value="old">Versi lama</ToggleGroupItem><ToggleGroupItem value="proposed">Usulan</ToggleGroupItem></ToggleGroup><InteractiveItinerary key={scenarioId + view} plan={inspected.plan} slot={preview.slot} zone={preview.zone} /></section>
    <Button variant="ghost" onClick={() => reset()}>Ulangi contoh perubahan</Button>
    <Dialog open={confirm !== null} onOpenChange={open => { if (!open) setConfirm(null) }}><DialogContent><DialogHeader><DialogTitle>{confirm === "accept" ? "Setujui versi baru?" : "Batalkan dengan refund penuh?"}</DialogTitle><DialogDescription>{confirm === "accept" ? "Versi 2 akan menjadi rencana yang berlaku untuk booking contoh ini. Versi 1 tetap tersimpan." : `Booking contoh akan batal. Seluruh jumlah yang telah dibayar (${currency(preview.paidBase + preview.serviceFee)}) termasuk biaya layanan dikembalikan dalam simulasi.`}</DialogDescription></DialogHeader><Button onClick={() => { if (confirm) act(confirm) }}>{confirm === "accept" ? "Ya, setujui usulan" : "Ya, simulasikan refund penuh"}</Button><Button variant="outline" onClick={() => setConfirm(null)}>Kembali meninjau</Button></DialogContent></Dialog>
  </main>
}
