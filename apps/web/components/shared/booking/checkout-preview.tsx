"use client"

import { useEffect, useId, useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowLeftIcon, CheckCircleIcon, QrCodeIcon, ClockIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PriceSummary } from "./price-summary"
import { CancellationTerms } from "./cancellation-terms"
import { currency, CHECKOUT_HOLD_MS, dpAvailable, dpDeadline, holdSeconds, paymentOutcome, previewPrice, validatePreviewBooking, type BookingPreview, type PreviewPaymentStatus } from "@/lib/booking-preview"
import { tripMoment, type DepartureSlot } from "@/lib/trip-plan"
import { normalizeIdentity } from "@/lib/auth-preview"
import { PageHeading } from "@/components/shared/page-heading"
import { PreviewNotice } from "@/components/shared/preview-notice"

export function CheckoutPreview({ booking, slot, participants, addonIds, initialPayment, detailHref }: {
  booking: BookingPreview; slot: DepartureSlot; participants: number; addonIds: string[]; initialPayment: "full" | "dp"; detailHref: string
}) {
  const id = useId()
  const [people, setPeople] = useState(() => Array.from({ length: participants }, () => ({ name: "", phone: "" })))
  const [notes, setNotes] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [payment, setPayment] = useState(initialPayment)
  const [now, setNow] = useState(() => Date.now())
  const [holdUntil, setHoldUntil] = useState<number | null>(null)
  const [status, setStatus] = useState<PreviewPaymentStatus>("pending")
  const [error, setError] = useState<string | null>(null)
  const [unavailable, setUnavailable] = useState(false)
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer) }, [])
  const canDp = dpAvailable(slot, booking, now)
  // Rincian harga contoh tetap setelah pembayaran dimulai.
  const effectivePayment = holdUntil !== null ? payment : payment === "dp" && canDp ? "dp" : "full"
  const prices = previewPrice(booking, participants, addonIds, effectivePayment)
  const seconds = holdUntil === null ? 900 : holdSeconds(holdUntil, now)
  const displayedStatus = status === "pending" && holdUntil !== null && seconds === 0 ? "expired" : status
  const start = Date.parse(slot.startsAt)
  const detailParams = new URLSearchParams({ trip: booking.id, slot: slot.id, participants: String(participants), payment: effectivePayment })
  if (addonIds.length) detailParams.set("addons", addonIds.join(","))

  function beginPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (unavailable) { setError("Slot berubah menjadi penuh. Pilih keberangkatan lain sebelum melanjutkan."); return }
    const problem = validatePreviewBooking(booking, slot, participants)
    if (problem) { setError(problem); return }
    const badIndex = people.findIndex(person => !person.name.trim() || !normalizeIdentity("traveler", person.phone))
    if (badIndex !== -1) { setError(`Lengkapi nama dan nomor HP Indonesia yang valid untuk peserta ke-${badIndex + 1}.`); return }
    if (!agreed) { setError("Setujui rincian dan ketentuan pembatalan sebelum melanjutkan."); return }
    const instant = Date.now()
    const nextPayment = payment === "dp" && dpAvailable(slot, booking, instant) ? "dp" : "full"
    if (nextPayment !== effectivePayment) { setNow(instant); setPayment(nextPayment); setError("Pilihan DP baru saja berakhir. Tinjau pembayaran penuh sebelum melanjutkan."); return }
    setPayment(nextPayment); setNow(instant); setHoldUntil(instant + CHECKOUT_HOLD_MS); setStatus("pending"); setError(null)
  }
  function simulatePayment(event: "paid" | "failed") {
    if (holdUntil === null) return
    const instant = Date.now(); setNow(instant); setStatus(paymentOutcome(holdUntil, instant, event))
  }
  function restart() { setHoldUntil(null); setStatus("pending"); setError(null); setAgreed(false); setNow(Date.now()) }

  return <main className="flex flex-col gap-7 px-5 py-6 pb-12">
    <Button asChild variant="ghost" className="w-fit"><Link href={`${detailHref}?slot=${slot.id}`}><ArrowLeftIcon data-icon="inline-start" />Kembali ke trip</Link></Button>
    <PageHeading title={holdUntil === null ? "Data peserta" : displayedStatus === "pending" ? "Pembayaran QRIS" : "Hasil pemesanan"} description={<>{booking.title}<span className="mt-1 block">{participants} peserta · {booking.listingType}</span></>} />
    <PreviewNotice>Seluruh alur di halaman ini adalah simulasi. Data peserta hanya berada di halaman ini dan hilang saat dimuat ulang. Gunakan data contoh untuk review.</PreviewNotice>
    <Card size="sm"><CardHeader><CardTitle>Jadwal pilihan</CardTitle><CardDescription>Tipe {booking.listingType} ditetapkan penyedia.</CardDescription></CardHeader><CardContent><dl className="flex flex-col gap-3 text-sm"><div><dt className="text-muted-foreground">Mulai</dt><dd className="font-semibold">{tripMoment(start, booking.zone).full}</dd></div><div><dt className="text-muted-foreground">Selesai</dt><dd className="font-semibold">{tripMoment(start + slot.durationMinutes * 60000, booking.zone).full}</dd></div></dl></CardContent></Card>
    {holdUntil === null ? <form onSubmit={beginPayment} className="flex flex-col gap-5">
      <FieldGroup>{people.map((person, index) => <Card key={index} variant="plain" size="sm"><CardHeader><CardTitle>Peserta ke-{index + 1}</CardTitle></CardHeader><CardContent><FieldGroup><Field><FieldLabel htmlFor={`${id}-name-${index}`}>Nama lengkap</FieldLabel><Input id={`${id}-name-${index}`} value={person.name} maxLength={100} required autoComplete="off" onChange={event => setPeople(current => current.map((item, i) => i === index ? { ...item, name: event.target.value } : item))} /></Field><Field><FieldLabel htmlFor={`${id}-phone-${index}`}>Nomor HP</FieldLabel><Input id={`${id}-phone-${index}`} type="tel" inputMode="tel" value={person.phone} required maxLength={20} autoComplete="off" placeholder="Contoh: 081234567890" onChange={event => setPeople(current => current.map((item, i) => i === index ? { ...item, phone: event.target.value } : item))} /></Field></FieldGroup></CardContent></Card>)}
        <Field><FieldLabel htmlFor={`${id}-notes`}>Catatan untuk pemandu (opsional)</FieldLabel><Textarea id={`${id}-notes`} value={notes} onChange={event => setNotes(event.target.value)} maxLength={500} placeholder="Kebutuhan atau informasi untuk persiapan perjalanan" /></Field>
        <Field><FieldLabel>Opsi pembayaran</FieldLabel><RadioGroup value={effectivePayment} onValueChange={value => setPayment(value as "full" | "dp")}><Field orientation="horizontal"><RadioGroupItem id={`${id}-full`} value="full" /><FieldLabel htmlFor={`${id}-full`}>Bayar penuh</FieldLabel></Field>{canDp && <Field orientation="horizontal"><RadioGroupItem id={`${id}-dp`} value="dp" /><FieldLabel htmlFor={`${id}-dp`}>DP {Math.round((booking.dpRate ?? 0) * 100)}%</FieldLabel></Field>}</RadioGroup><FieldDescription>{canDp ? "Seluruh biaya layanan dibayar pada DP pertama." : "DP tidak tersedia. Waktu menuju tenggat pelunasan harus sedikitnya 24 jam."}</FieldDescription></Field>
      </FieldGroup>
      <PriceSummary booking={booking} participants={participants} prices={prices} payment={effectivePayment} />
      {effectivePayment === "dp" && <Alert variant="warning"><AlertDescription>Sisa {currency(prices.remaining)} harus dilunasi di platform sebelum {tripMoment(dpDeadline(slot, booking), booking.zone).full}. Booking otomatis batal bila belum lunas; refund mengikuti template yang berlaku saat pemesanan.</AlertDescription></Alert>}
      <CancellationTerms template={booking.cancellation} />
      <Field orientation="horizontal"><Checkbox id={`${id}-terms`} checked={agreed} onCheckedChange={value => setAgreed(value === true)} /><FieldLabel htmlFor={`${id}-terms`}>Saya menyetujui rincian dan ketentuan pembatalan di atas.</FieldLabel></Field>
      {unavailable && <Alert variant="warning"><AlertTitle>Slot contoh sudah penuh</AlertTitle><AlertDescription>Pilih keberangkatan lain. Pemesanan belum dibuat.</AlertDescription></Alert>}
      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
      <Button type="submit" disabled={unavailable}>Lanjut ke QRIS · {currency(prices.dueNow)}</Button>
      <Button type="button" variant="outline" onClick={() => setUnavailable(current => !current)}>{unavailable ? "Pulihkan slot contoh" : "Simulasikan slot berubah penuh"}</Button>
      <p className="text-xs leading-relaxed text-muted-foreground">Pada alur final, kapasitas ditahan 15 menit setelah checkout dibuat. Tahanan slot di server belum terhubung pada mockup ini.</p>
    </form> : <>
      {displayedStatus === "pending" ? <>
        <Card size="sm"><CardHeader><CardTitle>Bayar dengan QRIS</CardTitle><CardDescription>Masa tahan pembayaran 15 menit.</CardDescription></CardHeader><CardContent className="flex flex-col items-center gap-4"><div className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 font-semibold tabular-nums text-primary" role="timer" aria-label="Sisa masa tahan pembayaran"><ClockIcon />{String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}</div><QrCodeIcon className="size-32 text-muted-foreground" aria-hidden="true" /><p className="text-center text-sm text-muted-foreground">Ilustrasi QRIS contoh.<br />Tidak dapat digunakan untuk pembayaran.</p><p className="font-heading text-xl font-extrabold text-primary">{currency(prices.dueNow)}</p><p className="text-center text-xs text-muted-foreground">Batas contoh: {tripMoment(holdUntil, booking.zone).full}</p></CardContent></Card>
        <Button onClick={() => simulatePayment("paid")}>Simulasikan pembayaran berhasil</Button><Button variant="outline" onClick={() => simulatePayment("failed")}>Simulasikan pembayaran gagal</Button><Button variant="ghost" onClick={() => { const instant = Date.now(); setHoldUntil(instant); setNow(instant) }}>Simulasikan masa tahan habis</Button>
      </> : <>
        <Alert variant={displayedStatus === "confirmed" ? "success" : "warning"}>{displayedStatus === "confirmed" && <CheckCircleIcon />}<AlertTitle>{displayedStatus === "confirmed" ? "Booking contoh terkonfirmasi" : displayedStatus === "failed" ? "Pembayaran contoh gagal" : displayedStatus === "late-refund" ? "Pembayaran terlambat · refund penuh" : "Masa tahan pembayaran habis"}</AlertTitle><AlertDescription>{displayedStatus === "confirmed" ? "Pembayaran wajib berhasil dalam masa tahan. Pada alur final, konfirmasi berlangsung otomatis tanpa persetujuan manual pemandu." : displayedStatus === "late-refund" ? `Booking tetap tidak terkonfirmasi. Seluruh ${currency(prices.dueNow)}, termasuk biaya layanan, masuk simulasi refund otomatis.` : "Booking tidak terkonfirmasi. Pada alur final, kapasitas yang ditahan dilepas kembali."}</AlertDescription></Alert>
        {displayedStatus === "confirmed" && effectivePayment === "dp" && <Alert variant="warning"><AlertTitle>Pelunasan DP masih diperlukan</AlertTitle><AlertDescription>Sisa {currency(prices.remaining)} melalui QRIS di platform sebelum {tripMoment(dpDeadline(slot, booking), booking.zone).full}. Status ini adalah contoh dan belum tersimpan sebagai booking.</AlertDescription></Alert>}
        {displayedStatus === "confirmed" && <Button asChild><Link href={`/booking/preview?${detailParams}`}>Buka detail booking contoh</Link></Button>}
        <PriceSummary booking={booking} participants={participants} prices={prices} payment={effectivePayment} />
        {displayedStatus === "expired" && <Button variant="outline" onClick={() => simulatePayment("paid")}>Simulasikan pembayaran setelah tenggat</Button>}
        <Button variant="outline" onClick={restart}>Ulangi pratinjau dari data peserta</Button>
        <Button asChild><Link href={detailHref}>Kembali ke perjalanan</Link></Button>
      </>}
    </>}
  </main>
}
