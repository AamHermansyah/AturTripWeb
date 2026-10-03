import Link from "next/link"
import { bookingPreviewInput } from "@/lib/server/booking-preview-input"
import { BookingLifecyclePreview } from "@/components/shared/booking/booking-lifecycle-preview"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default async function BookingPreviewPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const result = bookingPreviewInput({ trip: "1", slot: "evening", participants: "2", payment: "dp", ...await searchParams })
  if (!result.ok) return <main className="flex flex-col gap-5 px-5 py-6"><Alert variant="warning"><AlertTitle>Detail contoh belum tersedia</AlertTitle><AlertDescription>{result.error}</AlertDescription></Alert><Button asChild><Link href={result.trip?.detailHref ?? "/explore"}>Pilih trip kembali</Link></Button></main>
  const { trip, slot, participants, addons, payment } = result
  return <BookingLifecyclePreview key={`${trip.booking.id}-${slot.id}-${participants}-${payment}-${addons.join(",")}`} booking={trip.booking} initialSlot={slot} participants={participants} addonIds={addons} initialPayment={payment} detailHref={trip.detailHref} />
}
