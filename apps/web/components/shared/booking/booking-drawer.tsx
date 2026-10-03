"use client"

import { useEffect, useId, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MinusIcon, PlusIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DeparturePicker } from "@/components/shared/trips/departure-picker"
import { CancellationTerms } from "./cancellation-terms"
import { PriceSummary } from "./price-summary"
import { currency, dpAvailable, dpDeadline, previewPrice, validatePreviewBooking, type BookingPreview } from "@/lib/booking-preview"
import { tripMoment } from "@/lib/trip-plan"

export function BookingDrawer({ open, onOpenChange, booking, selectedSlotId, onSlotChange }: {
  open: boolean; onOpenChange: (open: boolean) => void; booking?: BookingPreview;
  selectedSlotId?: string; onSlotChange?: (id: string) => void
}) {
  return <Drawer open={open} onOpenChange={onOpenChange}>
    <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[90dvh]">
      <DrawerHeader className="text-left"><DrawerTitle>Pilih perjalanan</DrawerTitle><DrawerDescription>{booking ? `${booking.title} · ${booking.listingType}` : "Pemesanan trip grup masih menunggu penyesuaian data contoh."}</DrawerDescription></DrawerHeader>
      {booking ? <BookingChoices key={booking.id} booking={booking} selectedSlotId={selectedSlotId} onSlotChange={onSlotChange} /> : <DrawerFooter><Button asChild><Link href="/explore">Pilih trip di Explore</Link></Button></DrawerFooter>}
    </DrawerContent>
  </Drawer>
}

function BookingChoices({ booking, selectedSlotId, onSlotChange }: { booking: BookingPreview; selectedSlotId?: string; onSlotChange?: (id: string) => void }) {
  const router = useRouter()
  const fieldId = useId()
  const [localSlot, setLocalSlot] = useState(booking.slots.find(slot => slot.status === "available")?.id ?? "")
  const [quantity, setQuantity] = useState(booking.minimumParticipants)
  const [payment, setPayment] = useState<"full" | "dp">("full")
  const [addons, setAddons] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer) }, [])
  const slotId = selectedSlotId ?? localSlot
  const slot = booking.slots.find(slot => slot.id === slotId)
  const canDp = slot ? dpAvailable(slot, booking, now) : false
  const effectivePayment = payment === "dp" && canDp ? "dp" : "full"
  const prices = previewPrice(booking, quantity, addons, effectivePayment)
  const maximum = Math.min(booking.maximumParticipants, slot ? booking.listingType === "Sharing" ? slot.remaining : slot.capacity : booking.maximumParticipants)
  const bookingError = validatePreviewBooking(booking, slot, quantity, now)

  function continueBooking(instant: number) {
    const problem = validatePreviewBooking(booking, slot, quantity, instant)
    if (problem) { setError(problem); return }
    const nextPayment = payment === "dp" && slot && dpAvailable(slot, booking, instant) ? "dp" : "full"
    const params = new URLSearchParams({ trip: booking.id, slot: slotId, participants: String(quantity), payment: nextPayment })
    if (addons.length) params.set("addons", addons.join(","))
    router.push(`/booking/checkout?${params}`)
  }

  return <div className="flex flex-col gap-5 overflow-y-auto px-4 pb-5">
    <Alert><AlertDescription>Pratinjau pemesanan dengan data contoh. Pilihan belum menahan slot atau membuat transaksi.</AlertDescription></Alert>
    <DeparturePicker slots={booking.slots} zone={booking.zone} value={slotId} onChange={id => { setLocalSlot(id); onSlotChange?.(id); setError(null) }} />
    <FieldGroup>
      <Field><FieldLabel>Jumlah peserta</FieldLabel><div className="flex items-center justify-between gap-3 rounded-2xl border p-3"><div><p className="text-sm font-semibold">{quantity} orang</p><p className="text-xs text-muted-foreground">{booking.listingType === "Sharing" ? `Sisa ${slot?.remaining ?? 0} tempat` : "Satu rombongan memakai seluruh slot"}</p></div><div className="flex gap-2"><Button variant="outline" size="icon" aria-label="Kurangi peserta" disabled={quantity <= booking.minimumParticipants} onClick={() => setQuantity(quantity - 1)}><MinusIcon /></Button><Button size="icon" aria-label="Tambah peserta" disabled={quantity >= maximum} onClick={() => setQuantity(quantity + 1)}><PlusIcon /></Button></div></div><FieldDescription>Ketentuan peserta: {booking.minimumParticipants}–{booking.maximumParticipants} orang. Tipe {booking.listingType} ditetapkan penyedia.</FieldDescription></Field>
      {booking.addons.map(addon => <Field key={addon.id} orientation="horizontal"><Checkbox id={`${fieldId}-${addon.id}`} checked={addons.includes(addon.id)} onCheckedChange={checked => setAddons(current => checked === true ? [...current, addon.id] : current.filter(id => id !== addon.id))} /><FieldLabel htmlFor={`${fieldId}-${addon.id}`} className="flex-1 flex-col items-start">{addon.name}<span className="text-xs font-normal text-muted-foreground">{currency(addon.price)} per rombongan · opsional</span></FieldLabel></Field>)}
      <Field><FieldLabel>Opsi pembayaran</FieldLabel><RadioGroup value={effectivePayment} onValueChange={value => setPayment(value as "full" | "dp")}><Field orientation="horizontal"><RadioGroupItem value="full" id={`${fieldId}-full`} /><FieldLabel htmlFor={`${fieldId}-full`}>Bayar penuh</FieldLabel></Field>{canDp && <Field orientation="horizontal"><RadioGroupItem value="dp" id={`${fieldId}-dp`} /><FieldLabel htmlFor={`${fieldId}-dp`}>DP {Math.round((booking.dpRate ?? 0) * 100)}%</FieldLabel></Field>}</RadioGroup><FieldDescription>{canDp ? "Seluruh biaya layanan dibayar bersama DP pertama." : "DP tidak tersedia karena tenggat pelunasan berjarak kurang dari 24 jam, atau DP tidak ditawarkan."}</FieldDescription></Field>
    </FieldGroup>
    <PriceSummary booking={booking} participants={quantity} prices={prices} payment={effectivePayment} />
    {effectivePayment === "dp" && slot && <Alert variant="warning"><AlertDescription>Lunasi sisa {currency(prices.remaining)} melalui QRIS di platform sebelum {tripMoment(dpDeadline(slot, booking), booking.zone).full}. Jika belum lunas, booking otomatis batal dan refund mengikuti template saat pemesanan.</AlertDescription></Alert>}
    <CancellationTerms template={booking.cancellation} />
    {(error || bookingError) && <Alert variant="destructive"><AlertDescription>{error || bookingError}</AlertDescription></Alert>}
    <DrawerFooter className="p-0"><Button disabled={!!bookingError} onClick={() => continueBooking(Date.now())}>Lanjut ke data peserta</Button></DrawerFooter>
  </div>
}
