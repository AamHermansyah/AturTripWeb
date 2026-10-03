"use client"

import { useEffect, useId, useState } from "react"
import Link from "next/link"
import { QrCodeIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DeparturePicker } from "@/components/shared/trips/departure-picker"
import { CancellationTerms } from "./cancellation-terms"
import { PriceSummary } from "./price-summary"
import { currency, dpDeadline, holdSeconds, previewPrice, validatePreviewBooking, type BookingPreview } from "@/lib/booking-preview"
import { cancellationAmount, canOpenDispute, disputeDeadline, settlementOutcome, travelerReschedule } from "@/lib/booking-lifecycle-preview"
import { tripMoment, type DepartureSlot } from "@/lib/trip-plan"

type Cancellation = { by: "traveler" | "guide" | "dp"; at: number }
type RefundState = "pending" | "verification" | "verified" | "transferred" | "failed"

export function BookingLifecyclePreview({ booking, initialSlot, participants, addonIds, initialPayment, detailHref }: {
  booking: BookingPreview; initialSlot: DepartureSlot; participants: number; addonIds: string[]; initialPayment: "full" | "dp"; detailHref: string
}) {
  const id = useId()
  const prices = previewPrice(booking, participants, addonIds, initialPayment)
  const [slot, setSlot] = useState(initialSlot)
  const [deadline, setDeadline] = useState(() => dpDeadline(initialSlot, booking))
  const [refundCeiling, setRefundCeiling] = useState(100)
  const [balancePaid, setBalancePaid] = useState(false)
  const [now, setNow] = useState(() => Date.now())
  const [simulationTime, setSimulationTime] = useState<number | null>(null)
  const [canceled, setCanceled] = useState<Cancellation | null>(() => initialPayment === "dp" && Date.now() >= dpDeadline(initialSlot, booking) ? { by: "dp", at: dpDeadline(initialSlot, booking) } : null)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [paymentUntil, setPaymentUntil] = useState<number | null>(null)
  const [paymentResult, setPaymentResult] = useState<string | null>(null)
  const [lateRefund, setLateRefund] = useState(0)
  const [cancelOpen, setCancelOpen] = useState(false)
  const [cancelReason, setCancelReason] = useState("")
  const [rescheduleOpen, setRescheduleOpen] = useState(false)
  const [requestedSlotId, setRequestedSlotId] = useState(booking.slots.find(item => item.id !== initialSlot.id && item.status === "available")?.id ?? "")
  const [rescheduleReason, setRescheduleReason] = useState("")
  const [requestStatus, setRequestStatus] = useState<"none" | "pending" | "approved" | "declined">("none")
  const [disputeOpen, setDisputeOpen] = useState(false)
  const [disputeText, setDisputeText] = useState("")
  const [disputePending, setDisputePending] = useState(false)
  const [noShow, setNoShow] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const [refundFallback, setRefundFallback] = useState(false)
  const [refundState, setRefundState] = useState<RefundState>("pending")
  const [destinationType, setDestinationType] = useState("bank")
  const [destinationProvider, setDestinationProvider] = useState("")
  const [destinationOwner, setDestinationOwner] = useState("")
  const [destinationNumber, setDestinationNumber] = useState("")
  const [ownsDestination, setOwnsDestination] = useState(false)
  const start = Date.parse(slot.startsAt)
  const end = start + slot.durationMinutes * 60000
  const clock = simulationTime ?? now
  const hasRemaining = prices.remaining > 0 && !balancePaid
  const paidBase = prices.dueNow - prices.serviceFee + (balancePaid ? prices.remaining : 0)
  const currentRefund = cancellationAmount(booking, slot, paidBase, prices.serviceFee, canceled?.at ?? clock, canceled?.by ?? "traveler", refundCeiling)
  const seconds = paymentUntil ? holdSeconds(paymentUntil, clock) : 0
  const nextSlots = booking.slots.filter(item => item.id !== slot.id)
  const requestedSlot = booking.slots.find(item => item.id === requestedSlotId)

  useEffect(() => {
    if (simulationTime !== null) return
    const timer = setInterval(() => {
      const instant = Date.now(); setNow(instant)
      if (!canceled && hasRemaining && instant >= deadline) setCanceled({ by: "dp", at: deadline })
    }, 1000)
    return () => clearInterval(timer)
  }, [simulationTime, canceled, hasRemaining, deadline])

  function advanceClock(instant: number) {
    setSimulationTime(instant)
    if (!canceled && hasRemaining && instant >= deadline) setCanceled({ by: "dp", at: deadline })
  }
  function startSettlement(instant: number) {
    if (canceled || !hasRemaining) return
    if (instant >= deadline) { advanceClock(instant); setNotice("Tenggat pelunasan telah lewat; booking otomatis batal."); return }
    setPaymentUntil(Math.min(deadline, instant + 15 * 60000)); setPaymentResult(null); setPaymentOpen(true)
  }
  function simulateSettlement(instant: number) {
    if (!paymentUntil) return
    const outcome = settlementOutcome(deadline, paymentUntil, instant)
    if (outcome === "settled" && !canceled) { setBalancePaid(true); setPaymentResult("Pelunasan contoh berhasil. Tidak ada biaya layanan kedua.") }
    else if (outcome === "late-refund" || canceled) { setLateRefund(prices.remaining); if (!canceled) setCanceled({ by: "dp", at: deadline }); setPaymentResult("Pelunasan terlambat dikembalikan penuh. Booking tetap batal; refund DP awal dihitung terpisah.") }
    else setPaymentResult("Instruksi pembayaran contoh kedaluwarsa. Pelunasan belum berhasil; buat instruksi baru sebelum tenggat DP.")
  }
  function cancelByGuide(instant: number) { setCanceled({ by: "guide", at: instant }); setRefundState("pending"); setNotice("Pemandu membatalkan pada simulasi. Seluruh pembayaran, termasuk biaya layanan, dikembalikan.") }
  function requestReschedule(instant: number) {
    const error = validatePreviewBooking(booking, requestedSlot, participants, instant)
    if (error || !rescheduleReason.trim()) { setNotice(error ?? "Isi alasan permintaan jadwal baru."); return }
    setRequestStatus("pending"); setRescheduleOpen(false); setNotice("Permintaan contoh menunggu pemandu. Jadwal lama masih berlaku.")
  }
  function acceptReschedule(instant: number) {
    const error = validatePreviewBooking(booking, requestedSlot, participants, instant)
    if (error || !requestedSlot) { setNotice(error); return }
    const result = travelerReschedule(booking, slot, requestedSlot, deadline, refundCeiling, instant, hasRemaining)
    if (result.requiresSettlement) { setNotice("Tenggat DP hasil reschedule sudah lewat. Lunasi sisa melalui platform sebelum jadwal baru dapat berlaku."); return }
    setSlot(requestedSlot); setDeadline(result.nextDeadline); setRefundCeiling(result.nextRefundCeiling); setRequestStatus("approved"); setNotice("Jadwal baru disetujui pada simulasi. Batas refund dibekukan dan tenggat DP memakai yang lebih awal.")
  }
  function cancelByTraveler(instant: number) {
    if (!cancelReason.trim()) { setNotice("Isi alasan pembatalan contoh."); return }
    if (instant >= start || canceled) { setNotice("Pembatalan biasa tidak tersedia setelah mulai atau setelah booking batal."); return }
    setCanceled({ by: "traveler", at: instant }); setRefundState("pending"); setCancelOpen(false)
  }
  function submitDestination() {
    if (!destinationProvider.trim() || !destinationOwner.trim() || !/^\d{6,20}$/.test(destinationNumber) || !ownsDestination) { setNotice("Lengkapi penyedia, nama pemilik, nomor tujuan 6–20 digit, dan pernyataan kepemilikan. Gunakan data contoh."); return }
    setRefundState("verification"); setNotice("Tujuan refund contoh menunggu verifikasi kepemilikan. Belum ada data yang dikirim.")
  }
  function resetPreview(instant: number) {
    const initialDeadline = dpDeadline(initialSlot, booking)
    setSlot(initialSlot); setDeadline(initialDeadline); setRefundCeiling(100); setBalancePaid(false); setSimulationTime(null); setNow(instant)
    setCanceled(initialPayment === "dp" && instant >= initialDeadline ? { by: "dp", at: initialDeadline } : null)
    setRequestStatus("none"); setRequestedSlotId(booking.slots.find(item => item.id !== initialSlot.id && item.status === "available")?.id ?? "")
    setNoShow(false); setDisputePending(false); setRefundFallback(false); setRefundState("pending"); setLateRefund(0); setNotice(null)
    setPaymentOpen(false); setPaymentUntil(null); setPaymentResult(null); setCancelOpen(false); setCancelReason(""); setRescheduleOpen(false); setRescheduleReason("")
    setDisputeOpen(false); setDisputeText(""); setDestinationType("bank"); setDestinationProvider(""); setDestinationOwner(""); setDestinationNumber(""); setOwnsDestination(false)
  }

  return <main className="flex flex-col gap-5 px-5 py-6 pb-28">
    <Button asChild variant="ghost" className="w-fit"><Link href={detailHref}>Kembali ke trip</Link></Button><Badge variant="secondary" className="w-fit">Detail booking contoh</Badge><div><h1 className="font-heading text-2xl font-extrabold">{booking.title}</h1><p className="mt-2 text-sm text-muted-foreground">{participants} peserta · {booking.listingType}</p></div>
    <Alert><AlertDescription>Pratinjau ini membuat ulang booking sintetis dari pilihan perjalanan. Data peserta dari checkout tidak dipindahkan. Seluruh aksi adalah simulasi lokal dan hilang saat dimuat ulang.</AlertDescription></Alert>
    <Alert variant={canceled ? "warning" : "success"}><AlertTitle>{canceled ? canceled.by === "dp" ? "Booking contoh batal otomatis" : "Booking contoh dibatalkan" : noShow ? "Contoh peserta tidak hadir" : hasRemaining ? "Terkonfirmasi · menunggu pelunasan" : "Terkonfirmasi · lunas"}</AlertTitle><AlertDescription>{canceled ? `${canceled.by === "dp" ? "Sisa DP tidak lunas pada tenggat. " : ""}Status refund contoh: ${refundState === "transferred" ? "selesai" : refundState === "failed" ? "transfer gagal, perlu tindak lanjut" : refundState === "verification" ? "menunggu verifikasi tujuan" : refundState === "verified" ? "tujuan terverifikasi, menunggu transfer" : "menunggu proses"}.` : noShow ? "Refund biasa tidak tersedia. Jalur sengketa tetap mengikuti batas waktu dan kelayakan API." : "Konfirmasi pembayaran contoh berlangsung otomatis; tidak menunggu persetujuan manual pemandu."}</AlertDescription></Alert>
    <Card size="sm"><CardHeader><CardTitle>Jadwal yang berlaku</CardTitle><CardDescription>Jadwal tetap memakai versi lama selama permintaan reschedule menunggu.</CardDescription></CardHeader><CardContent><dl className="flex flex-col gap-3 text-sm"><div><dt className="text-muted-foreground">Mulai</dt><dd className="font-semibold">{tripMoment(start, booking.zone).full}</dd></div><div><dt className="text-muted-foreground">Selesai</dt><dd className="font-semibold">{tripMoment(end, booking.zone).full}</dd></div>{initialPayment === "dp" && <div><dt className="text-muted-foreground">Tenggat pelunasan</dt><dd className="font-semibold">{tripMoment(deadline, booking.zone).full}</dd></div>}<div><dt className="text-muted-foreground">Batas refund setelah reschedule</dt><dd>Maksimal {refundCeiling}% dari harga trip/add-on yang sudah dibayar; batas ini tidak dapat naik.</dd></div></dl></CardContent></Card>
    <PriceSummary booking={booking} participants={participants} prices={prices} payment={initialPayment} mode="snapshot" />
    <Card size="sm"><CardHeader><CardTitle>Status pembayaran contoh</CardTitle></CardHeader><CardContent><dl className="flex flex-col gap-3 text-sm"><div className="flex justify-between gap-3"><dt>Sudah dibayar</dt><dd className="font-semibold tabular-nums">{currency(paidBase + prices.serviceFee)}</dd></div><div className="flex justify-between gap-3"><dt>{canceled ? "Tagihan sisa dibatalkan" : "Sisa tagihan"}</dt><dd className="font-semibold tabular-nums">{currency(canceled ? 0 : hasRemaining ? prices.remaining : 0)}</dd></div></dl>{hasRemaining && !canceled && <Button className="mt-4 w-full" onClick={() => startSettlement(simulationTime ?? Date.now())}>Lunasi melalui QRIS · {currency(prices.remaining)}</Button>}</CardContent></Card>
    <CancellationTerms template={booking.cancellation} />
    {canceled && <Card size="sm"><CardHeader><CardTitle>Rincian refund contoh</CardTitle><CardDescription>{canceled.by === "guide" ? "Pemandu membatalkan: seluruh pembayaran dikembalikan." : "Satu template berlaku untuk trip dan add-on yang sudah dibayar."}</CardDescription></CardHeader><CardContent className="flex flex-col gap-3 text-sm"><dl className="flex flex-col gap-3"><div className="flex justify-between gap-3"><dt>Persentase refund trip/add-on</dt><dd>{currentRefund.percent}%</dd></div><div className="flex justify-between gap-3"><dt>Biaya layanan dikembalikan</dt><dd>{currency(currentRefund.returnedServiceFee)}</dd></div><div className="flex justify-between gap-3 font-semibold text-primary"><dt>Total refund</dt><dd>{currency(currentRefund.amount)}</dd></div></dl>{lateRefund > 0 && <Alert><AlertDescription>Refund tambahan pelunasan terlambat: {currency(lateRefund)} penuh. Nilai ini terpisah dari refund DP awal di atas dan tidak menghidupkan kembali booking.</AlertDescription></Alert>}
      {currentRefund.amount > 0 && <><Button variant="outline" onClick={() => { setRefundFallback(true); setRefundState("pending") }} disabled={refundFallback || refundState === "transferred"}>Simulasikan refund QRIS asli tidak tersedia</Button>{!refundFallback && <Button variant="outline" disabled={refundState === "transferred"} onClick={() => setRefundState("transferred")}>Simulasikan refund QRIS selesai</Button>}</>}
    </CardContent></Card>}
    {canceled && refundFallback && currentRefund.amount > 0 && <Card size="sm"><CardHeader><CardTitle>Tujuan refund cadangan</CardTitle><CardDescription>Rekening atau e-wallet harus milik wisatawan dan diverifikasi. Biaya transfer ditanggung AturTrip.</CardDescription></CardHeader><CardContent className="flex flex-col gap-4">{refundState === "pending" ? <><FieldGroup><Field><FieldLabel htmlFor={`${id}-destination-type`}>Jenis tujuan</FieldLabel><Select value={destinationType} onValueChange={setDestinationType}><SelectTrigger id={`${id}-destination-type`} className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectGroup><SelectItem value="bank">Rekening bank</SelectItem><SelectItem value="wallet">E-wallet</SelectItem></SelectGroup></SelectContent></Select></Field><Field><FieldLabel htmlFor={`${id}-provider`}>{destinationType === "bank" ? "Nama bank contoh" : "Nama e-wallet contoh"}</FieldLabel><Input id={`${id}-provider`} value={destinationProvider} onChange={event => setDestinationProvider(event.target.value)} maxLength={60} /></Field><Field><FieldLabel htmlFor={`${id}-owner`}>Nama pemilik contoh</FieldLabel><Input id={`${id}-owner`} value={destinationOwner} onChange={event => setDestinationOwner(event.target.value)} maxLength={100} autoComplete="off" /></Field><Field><FieldLabel htmlFor={`${id}-number`}>Nomor tujuan contoh</FieldLabel><Input id={`${id}-number`} inputMode="numeric" value={destinationNumber} onChange={event => setDestinationNumber(event.target.value)} maxLength={20} autoComplete="off" /></Field><Field orientation="horizontal"><Checkbox id={`${id}-owns`} checked={ownsDestination} onCheckedChange={value => setOwnsDestination(value === true)} /><FieldLabel htmlFor={`${id}-owns`}>Tujuan ini milik saya. Saya memakai data contoh untuk review.</FieldLabel></Field></FieldGroup><Button onClick={submitDestination}>Kirim tujuan refund contoh</Button></> : <><p className="text-sm text-muted-foreground">{destinationProvider} · tujuan berakhiran {destinationNumber.slice(-3)} · {refundState === "verification" ? "menunggu verifikasi" : refundState === "verified" ? "terverifikasi, menunggu transfer" : refundState === "failed" ? "transfer gagal" : "transfer selesai"}</p>{refundState === "verification" && <Button variant="outline" onClick={() => setRefundState("verified")}>Simulasikan kepemilikan terverifikasi</Button>}{(refundState === "verified" || refundState === "failed") && <><Button variant="outline" onClick={() => setRefundState("transferred")}>Simulasikan transfer refund berhasil</Button><Button variant="outline" onClick={() => setRefundState("failed")}>Simulasikan transfer refund gagal</Button></>}{refundState === "failed" && <Alert variant="warning"><AlertDescription>Hak refund tetap {currency(currentRefund.amount)}. Kegagalan contoh menunggu tindak lanjut; jangan membuat refund kedua.</AlertDescription></Alert>}</>}</CardContent></Card>}
    {!canceled && <div className="grid grid-cols-2 gap-3"><Button variant="outline" disabled={clock >= start || requestStatus === "pending"} onClick={() => { setRescheduleOpen(true); setNotice(null) }}>Minta jadwal baru</Button><Button variant="outline" disabled={clock >= start} onClick={() => { setCancelOpen(true); setNotice(null) }}>Batalkan booking</Button></div>}
    {requestStatus !== "none" && <Alert><AlertTitle>{requestStatus === "pending" ? "Permintaan menunggu pemandu" : requestStatus === "approved" ? "Jadwal baru berlaku" : "Permintaan ditolak"}</AlertTitle><AlertDescription>{requestStatus === "declined" ? "Jadwal lama tetap berlaku; syarat refund mengikuti snapshot booking." : requestedSlot ? `Jadwal yang diminta: ${tripMoment(Date.parse(requestedSlot.startsAt), booking.zone).full}.` : ""}</AlertDescription></Alert>}
    {requestStatus === "pending" && !canceled && <div className="flex flex-col gap-2"><p className="text-xs text-muted-foreground">Simulasi respons pemandu untuk review</p><Button variant="outline" onClick={() => acceptReschedule(simulationTime ?? Date.now())}>Simulasikan pemandu menyetujui</Button><Button variant="outline" onClick={() => { setRequestStatus("declined"); setNotice("Permintaan ditolak pada simulasi. Jadwal lama tidak berubah.") }}>Simulasikan pemandu menolak</Button></div>}
    <Card size="sm"><CardHeader><CardTitle>Sengketa booking</CardTitle><CardDescription>Pengajuan biasa hingga 48 jam setelah waktu selesai trip final.</CardDescription></CardHeader><CardContent className="flex flex-col gap-3"><p className="text-sm text-muted-foreground">Batas: {tripMoment(disputeDeadline(slot), booking.zone).full}</p>{disputePending ? <Alert variant="warning"><AlertDescription>Sengketa contoh menunggu peninjauan. Dalam alur final, sengketa aktif menahan dana; keputusan dan kelayakan berasal dari API.</AlertDescription></Alert> : <><Button variant="outline" disabled={!canOpenDispute(slot, clock)} onClick={() => setDisputeOpen(true)}>Ajukan sengketa contoh</Button>{!canOpenDispute(slot, clock) && <p className="text-xs text-muted-foreground">Batas pengajuan biasa telah lewat. Form sengketa biasa tidak tersedia.</p>}</>}</CardContent></Card>
    {notice && <Alert variant="info"><AlertDescription>{notice}</AlertDescription></Alert>}
    <Card size="sm"><CardHeader><CardTitle>Kontrol simulasi</CardTitle><CardDescription>Untuk peninjauan keadaan UI; bukan aksi transaksi nyata.</CardDescription></CardHeader><CardContent className="flex flex-col gap-3"><p className="text-xs text-muted-foreground">Waktu pratinjau: {tripMoment(clock, booking.zone).full}{simulationTime !== null ? " · waktu simulasi" : ""}</p>{hasRemaining && !canceled && <Button variant="outline" onClick={() => advanceClock(deadline)}>Simulasikan tenggat DP lewat</Button>}{!canceled && <Button variant="outline" onClick={() => cancelByGuide(simulationTime ?? Date.now())}>Simulasikan pemandu membatalkan</Button>}{!canceled && !hasRemaining && <Button variant="outline" onClick={() => { advanceClock(start); setNoShow(true) }}>Simulasikan peserta tidak hadir</Button>}<Button variant="outline" onClick={() => advanceClock(disputeDeadline(slot))}>Tepat batas sengketa 48 jam</Button><Button variant="outline" onClick={() => advanceClock(disputeDeadline(slot) + 1)}>Lewati batas sengketa</Button>{canceled?.by === "dp" && prices.remaining > 0 && <Button variant="outline" onClick={() => { setLateRefund(prices.remaining); setNotice("Pelunasan setelah pembatalan contoh dikembalikan penuh. Booking tetap batal.") }}>Simulasikan pelunasan masuk setelah batal</Button>}<Button variant="ghost" onClick={() => resetPreview(Date.now())}>Ulangi seluruh pratinjau</Button></CardContent></Card>
    <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}><DialogContent><DialogHeader><DialogTitle>Pelunasan QRIS contoh</DialogTitle><DialogDescription>Sisa trip/add-on tanpa biaya layanan kedua. Ilustrasi tidak dapat dipakai membayar.</DialogDescription></DialogHeader><div className="flex flex-col items-center gap-3"><QrCodeIcon className="size-24 text-muted-foreground" /><p className="font-heading text-xl font-extrabold text-primary">{currency(prices.remaining)}</p><p className="font-semibold tabular-nums" role="timer">{String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}</p></div>{paymentResult ? <Alert><AlertDescription>{paymentResult}</AlertDescription></Alert> : <><Button onClick={() => simulateSettlement(simulationTime ?? Date.now())}>Simulasikan pelunasan berhasil</Button><Button variant="outline" onClick={() => setPaymentResult("Pelunasan contoh gagal; sisa tagihan masih ada. Coba lagi sebelum tenggat.")}>Simulasikan pelunasan gagal</Button><Button variant="outline" onClick={() => { advanceClock(deadline); simulateSettlement(deadline) }}>Simulasikan pelunasan setelah tenggat DP</Button></>}</DialogContent></Dialog>
    <Dialog open={cancelOpen} onOpenChange={setCancelOpen}><DialogContent><DialogHeader><DialogTitle>Pembatalan wisatawan contoh</DialogTitle><DialogDescription>Periksa nilai sebelum membatalkan; biaya layanan tidak dikembalikan.</DialogDescription></DialogHeader><p className="text-sm">Refund saat ini: {currentRefund.percent}% dari trip/add-on yang sudah dibayar, sebesar <strong>{currency(currentRefund.amount)}</strong>.</p><Field><FieldLabel htmlFor={`${id}-cancel`}>Alasan pembatalan</FieldLabel><Textarea id={`${id}-cancel`} value={cancelReason} onChange={event => setCancelReason(event.target.value)} maxLength={500} /></Field>{notice && <Alert variant="warning"><AlertDescription>{notice}</AlertDescription></Alert>}<Button variant="destructive" onClick={() => cancelByTraveler(simulationTime ?? Date.now())}>Simulasikan pembatalan</Button></DialogContent></Dialog>
    <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}><DialogContent className="max-h-[90dvh] overflow-y-auto"><DialogHeader><DialogTitle>Permintaan jadwal baru</DialogTitle><DialogDescription>Jadwal lama tetap berlaku sampai pemandu menyetujui dan slot baru tersedia.</DialogDescription></DialogHeader><DeparturePicker slots={nextSlots} zone={booking.zone} value={requestedSlotId} onChange={setRequestedSlotId} /><Field><FieldLabel htmlFor={`${id}-reschedule`}>Alasan permintaan</FieldLabel><Textarea id={`${id}-reschedule`} value={rescheduleReason} onChange={event => setRescheduleReason(event.target.value)} maxLength={500} /></Field><p className="text-xs text-muted-foreground">Saat disetujui, batas refund memakai jadwal lama. Tenggat DP memakai yang lebih awal antara jadwal lama dan baru.</p>{notice && <Alert variant="warning"><AlertDescription>{notice}</AlertDescription></Alert>}<Button disabled={!requestedSlotId} onClick={() => requestReschedule(simulationTime ?? Date.now())}>Kirim permintaan contoh</Button></DialogContent></Dialog>
    <Dialog open={disputeOpen} onOpenChange={setDisputeOpen}><DialogContent><DialogHeader><DialogTitle>Sengketa booking contoh</DialogTitle><DialogDescription>Jelaskan masalah transaksi/trip untuk peninjauan. Gunakan data contoh.</DialogDescription></DialogHeader><Field><FieldLabel htmlFor={`${id}-dispute`}>Keterangan sengketa</FieldLabel><Textarea id={`${id}-dispute`} value={disputeText} onChange={event => setDisputeText(event.target.value)} maxLength={1000} /></Field><Button disabled={!disputeText.trim() || !canOpenDispute(slot, clock)} onClick={() => { const instant = simulationTime ?? Date.now(); if (!canOpenDispute(slot, instant)) { setNotice("Batas pengajuan sengketa biasa telah lewat."); return } setDisputePending(true); setDisputeOpen(false) }}>Simulasikan pengajuan sengketa</Button></DialogContent></Dialog>
  </main>
}
