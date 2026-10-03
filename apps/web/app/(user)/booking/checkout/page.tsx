import Link from "next/link"
import { bookingPreviewInput } from "@/lib/server/booking-preview-input"
import { CheckoutPreview } from "@/components/shared/booking/checkout-preview"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const result = bookingPreviewInput(await searchParams)
  if (!result.ok) return <main className="flex flex-col gap-5 px-5 py-6"><Alert variant="warning"><AlertTitle>Pemesanan belum dapat dilanjutkan</AlertTitle><AlertDescription>{result.error}</AlertDescription></Alert><Button asChild><Link href={result.trip?.detailHref ?? "/explore"}>Pilih perjalanan kembali</Link></Button></main>
  const { trip, slot, participants, addons, payment } = result
  return <CheckoutPreview key={`${trip.booking.id}-${slot.id}-${participants}-${payment}-${addons.join(",")}`} booking={trip.booking} slot={slot} participants={participants} addonIds={addons} initialPayment={payment} detailHref={trip.detailHref} />
}
