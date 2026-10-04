"use client"

import { useEffect, useId, useState } from "react"
import Link from "next/link"
import { QrCodeIcon } from "@phosphor-icons/react"
import { PageHeading } from "@/components/shared/page-heading"
import { PreviewNotice } from "@/components/shared/preview-notice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { DeparturePicker } from "@/components/shared/trips/departure-picker"
import { guideProposalTransition, initialGuideProposal, type GuideProposalAction } from "@/lib/guide-reschedule-preview"
import { guideReschedule } from "@/lib/booking-lifecycle-preview"
import { currency, dpDeadline, holdSeconds, previewPrice, type BookingPreview } from "@/lib/booking-preview"
import { tripMoment, type DepartureSlot } from "@/lib/trip-plan"

export function GuideReschedulePreview({ booking, oldSlot, nextSlots, initialNow }: { booking: BookingPreview; oldSlot: DepartureSlot; nextSlots: DepartureSlot[]; initialNow: number }) {
  const id = useId()
  const [now, setNow] = useState(initialNow)
  const [time, setTime] = useState<number | null>(null)
  const clock = time ?? now
  const [role, setRole] = useState("guide")
  const [slotId, setSlotId] = useState(nextSlots[0].id)
  const slot = nextSlots.find(item => item.id === slotId)!
  const [state, setState] = useState(initialGuideProposal)
  const [reason, setReason] = useState("Tim pemandu tidak dapat menjalankan jadwal lama. Kami mengusulkan keberangkatan pengganti.")
  const [notice, setNotice] = useState<string | null>(null)
  const [confirm, setConfirm] = useState<"accept" | "refund" | null>(null)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [unavailable, setUnavailable] = useState(false)
  const prices = previewPrice(booking, 2, ["photo"], "dp")
  const hasRemaining = !state.settled && prices.remaining > 0
  const oldDeadlineExpired = state.status !== "accepted" && state.status !== "refunded" && hasRemaining && clock >= dpDeadline(oldSlot, booking)
  const terms = guideReschedule(booking, slot, clock, hasRemaining)
  const finalSlot = state.status === "accepted" ? slot : oldSlot
  const finalDeadline = state.status === "accepted" ? terms.nextDeadline : dpDeadline(oldSlot, booking)
  const finished = state.status === "accepted" || state.status === "refunded"
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer) }, [])
  function act(action: GuideProposalAction) {
    if (action === "submit" && !reason.trim()) { setNotice("Isi alasan usulan jadwal baru."); return }
    const instant = clock
    const result = guideProposalTransition(state, action, { booking, oldSlot, newSlot: unavailable ? { ...slot, remaining: 0, status: "full" } : slot, participants: 2, now: instant, paidBase: prices.dueNow - prices.serviceFee, serviceFee: prices.serviceFee, remaining: prices.remaining })
    setState(result.state); setNotice(result.error); setConfirm(null)
    if (!result.error && action === "start-payment") setPaymentOpen(true)
    if (action === "paid" || action === "failed") { setPaymentOpen(false); if (!result.error) setNotice(action === "failed" ? "Pelunasan contoh gagal. Jadwal lama tetap berlaku dan sisa masih ditagih." : result.state.settled ? "Sisa lunas dalam simulasi. Tinjau dan setujui jadwal baru untuk menerapkannya." : "Pembayaran terlambat dikembalikan penuh. Jadwal baru belum berlaku.") }
  }
  function reset() { setState(initialGuideProposal()); setTime(null); setNotice(null); setConfirm(null); setPaymentOpen(false); setUnavailable(false) }
  return <main className="flex flex-col gap-7 px-5 py-6 pb-12">
    <Button asChild variant="ghost" className="w-fit px-0"><Link href="/booking/preview">Kembali ke booking contoh</Link></Button>
    <PageHeading title="Usulan jadwal baru" description={booking.title} />
    <PreviewNotice>Satu booking DP sintetis untuk 2 peserta dan add-on foto. Beralih tampilan mempertahankan state contoh. Tidak ada pesan, perubahan kapasitas, pembayaran, atau refund API.</PreviewNotice>
    <ToggleGroup type="single" variant="outline" value={role} onValueChange={value => { if (value) setRole(value) }} aria-label="Tampilan peran reschedule"><ToggleGroupItem value="guide">Pemandu</ToggleGroupItem><ToggleGroupItem value="traveler">Wisatawan</ToggleGroupItem></ToggleGroup>
    {oldDeadlineExpired && <Alert variant="warning"><AlertDescription>Waktu contoh sudah melewati tenggat DP lama. Usulan belum diterima sehingga tidak memperpanjang tenggat. Persetujuan/pelunasan tidak tersedia; pembatalan DP otomatis dapat ditinjau di detail booking. Ulangi simulasi untuk kembali ke waktu sekarang.</AlertDescription></Alert>}
    <section className="border-y border-border py-5"><Badge variant={state.status === "refunded" ? "warning" : "secondary"}>{state.status === "draft" ? "Belum dikirim" : state.status === "pending" ? "Menunggu wisatawan" : state.status === "accepted" ? "Jadwal baru disetujui" : "Batal · refund penuh"}</Badge><h2 className="mt-4 text-base font-semibold">Jadwal yang berlaku</h2><p className="mt-2 text-sm">{tripMoment(Date.parse(finalSlot.startsAt), booking.zone).full}</p><p className="mt-1 text-sm text-muted-foreground">Selesai {tripMoment(Date.parse(finalSlot.startsAt) + finalSlot.durationMinutes * 60000, booking.zone).full}</p><p className="mt-3 text-sm text-muted-foreground">{state.status === "refunded" ? "Tersimpan sebagai riwayat; trip tidak dilanjutkan." : state.status === "accepted" ? "Versi usulan berlaku setelah persetujuan wisatawan." : "Versi lama tetap berlaku sampai wisatawan menyetujui usulan."}</p></section>
    <DeparturePicker slots={nextSlots} zone={booking.zone} value={slotId} disabled={state.status !== "draft"} onChange={value => { if (state.status === "draft") { setSlotId(value); setNotice(null) } }} />
    {state.status !== "draft" && <p className="text-xs text-muted-foreground">Pilihan usulan dikunci setelah dikirim. Ulangi simulasi untuk mengusulkan slot lain.</p>}
    <section className="flex flex-col gap-3"><h2 className="font-heading text-base font-semibold">Pembayaran dan tenggat</h2><dl className="space-y-3 text-sm"><div className="flex justify-between gap-4"><dt>Sudah dibayar</dt><dd className="shrink-0 font-semibold tabular-nums">{currency(prices.dueNow + (state.settled ? prices.remaining : 0))}</dd></div><div className="flex justify-between gap-4"><dt>Sisa tagihan</dt><dd className="shrink-0 font-semibold tabular-nums">{currency(finished && state.status === "refunded" ? 0 : hasRemaining ? prices.remaining : 0)}</dd></div><div><dt className="text-muted-foreground">Tenggat booking berlaku</dt><dd className="mt-1">{tripMoment(finalDeadline, booking.zone).full}</dd></div><div><dt className="text-muted-foreground">Tenggat dari usulan</dt><dd className="mt-1">{tripMoment(terms.nextDeadline, booking.zone).full}</dd></div></dl><p className="text-sm leading-relaxed text-muted-foreground">{terms.requiresSettlement ? "Tenggat usulan kurang dari 24 jam atau sudah lewat. Lunasi sisa melalui platform sebelum jadwal ini dapat disetujui." : "Jika disetujui, tenggat memakai jadwal baru. DP dapat dilunasi kemudian bila tenggat masih sedikitnya 24 jam."} Biaya layanan tidak ditagih ulang.</p></section>
    {role === "guide" && state.status === "draft" && <><Field><FieldLabel htmlFor={id}>Alasan usulan</FieldLabel><Textarea id={id} value={reason} onChange={event => setReason(event.target.value)} maxLength={1000} /></Field><Button disabled={oldDeadlineExpired} onClick={() => act("submit")}>Kirim usulan contoh</Button></>}
    {state.status !== "draft" && <p className="text-sm leading-relaxed"><strong>Alasan pemandu: </strong>{reason}</p>}
    {state.status === "pending" && <><p className="text-sm leading-relaxed text-muted-foreground">Pemberitahuan contoh: aplikasi dan WhatsApp wisatawan; email pemandu. Belum dikirim. Tanpa jawaban, jadwal lama tetap berlaku.</p>{role === "traveler" ? <>{hasRemaining && terms.requiresSettlement && <Button disabled={oldDeadlineExpired} onClick={() => act("start-payment")}>Lunasi sisa lewat QRIS</Button>}<Button disabled={terms.requiresSettlement || oldDeadlineExpired} onClick={() => setConfirm("accept")}>Setujui jadwal baru</Button><Button variant="outline" onClick={() => setConfirm("refund")}>Minta refund penuh</Button></> : <><p className="text-sm text-muted-foreground">Beralih ke tampilan wisatawan untuk menjawab.</p><Button variant="outline" onClick={() => setConfirm("refund")}>Batalkan dari pemandu</Button></>}</>}
    {state.status === "accepted" && <Alert><AlertDescription>Jadwal baru berlaku pada contoh ini. Waktu selesai serta tenggat pelunasan mengikuti slot baru. Hak refund dan syarat booking berasal dari snapshot contoh.</AlertDescription></Alert>}
    {state.status === "refunded" && <section className="rounded-2xl bg-secondary/60 p-5"><h2 className="font-heading text-lg font-semibold">Refund penuh contoh</h2><p className="mt-3 text-2xl font-bold tabular-nums">{currency(state.refund)}</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Seluruh pembayaran termasuk biaya layanan dikembalikan. Tagihan sisa dibatalkan. Belum ada transfer dana.</p></section>}
    {state.lateRefund > 0 && <Alert><AlertDescription>Refund terpisah pelunasan terlambat: {currency(state.lateRefund)}. Pembayaran ini tidak menerapkan jadwal baru.</AlertDescription></Alert>}
    {notice && <Alert variant="warning"><AlertDescription>{notice}</AlertDescription></Alert>}
    <details className="border-t border-border pt-4"><summary className="cursor-pointer text-sm font-semibold">Kontrol simulasi</summary><div className="mt-4 flex flex-col gap-3"><p className="text-xs text-muted-foreground">Waktu contoh {tripMoment(clock, booking.zone).full}</p>{!finished && <><Button variant="outline" onClick={() => setTime(terms.nextDeadline - 24 * 3600000)}>Tepat 24 jam sebelum tenggat baru</Button><Button variant="outline" onClick={() => setTime(terms.nextDeadline - 24 * 3600000 + 1)}>Kurang dari 24 jam</Button><Button variant="outline" onClick={() => setTime(terms.nextDeadline + 1)}>Tenggat baru sudah lewat</Button><Button variant="outline" onClick={() => setUnavailable(value => !value)}>{unavailable ? "Pulihkan kapasitas usulan" : "Simulasikan slot usulan penuh"}</Button></>}<Button variant="ghost" onClick={reset}>Ulangi contoh reschedule</Button><Button asChild variant="ghost"><Link href="/guide-mode">Kembali ke mode pemandu</Link></Button></div></details>
    <Dialog open={confirm !== null} onOpenChange={open => { if (!open) setConfirm(null) }}><DialogContent><DialogHeader><DialogTitle>{confirm === "accept" ? "Setujui jadwal usulan?" : "Batalkan dan refund penuh?"}</DialogTitle><DialogDescription>{confirm === "accept" ? `Jadwal berubah menjadi ${tripMoment(Date.parse(slot.startsAt), booking.zone).full}.` : "Seluruh pembayaran yang telah diterima termasuk biaya layanan akan dikembalikan dalam simulasi."}</DialogDescription></DialogHeader><Button onClick={() => { if (confirm) act(confirm) }}>Konfirmasi contoh</Button><Button variant="outline" onClick={() => setConfirm(null)}>Kembali meninjau</Button></DialogContent></Dialog>
    <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}><DialogContent><DialogHeader><DialogTitle>Pelunasan QRIS contoh</DialogTitle><DialogDescription>Ilustrasi ini tidak dapat dipakai membayar. Instruksi aktif maksimal 15 menit.</DialogDescription></DialogHeader><div className="flex flex-col items-center gap-3"><QrCodeIcon className="size-24 text-muted-foreground" /><p className="text-xl font-bold tabular-nums">{currency(prices.remaining)}</p><p role="timer" className="text-sm tabular-nums">{Math.floor(holdSeconds(state.holdUntil ?? 0, clock) / 60)} menit {holdSeconds(state.holdUntil ?? 0, clock) % 60} detik</p></div><Button onClick={() => act("paid")}>Simulasikan pelunasan berhasil</Button><Button variant="outline" onClick={() => act("failed")}>Simulasikan pembayaran gagal</Button><Button variant="ghost" onClick={() => { if (state.holdUntil) setTime(state.holdUntil) }}>Lewati masa tahan pembayaran</Button></DialogContent></Dialog>
  </main>
}
