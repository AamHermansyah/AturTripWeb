"use client"

import { useState } from "react"
import { CalendarBlankIcon, UsersIcon, LockKeyIcon, TrendUpIcon } from "@phosphor-icons/react"
import { HeroSection } from "./hero-section"
import { TripStats } from "./trip-stats"
import { TripGallery } from "./trip-gallery"
import { ReviewsSection } from "./reviews-section"
import { GuideTeam } from "./guide-team"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DeparturePicker } from "./departure-picker"
import { InteractiveItinerary } from "./interactive-itinerary"
import FloatingBooking from "@/components/shared/booking/floating-booking"
import { CancellationTerms } from "@/components/shared/booking/cancellation-terms"
import type { PublicTripPreview } from "@/lib/server/trip-preview"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function PublicTripDetail({ trip, initialSlot, initialTab }: { trip: PublicTripPreview; initialSlot?: string; initialTab?: string }) {
  const [slotId, setSlotId] = useState(trip.slots.find(slot => slot.id === initialSlot)?.id ?? trip.slots.find(slot => slot.status === "available")?.id ?? trip.slots[0]?.id ?? "")
  const [tab, setTab] = useState(initialTab === "linimasa" || initialTab === "persiapan" ? initialTab : "ringkasan")
  const slot = trip.slots.find(slot => slot.id === slotId)
  const { journey } = trip
  const stats = [
    { icon: CalendarBlankIcon, label: "Durasi", value: `${journey.duration.value} ${journey.duration.type === "day" ? "hari" : "jam"}` },
    { icon: UsersIcon, label: "Kapasitas", value: `${trip.booking.maximumParticipants} orang` },
    { icon: LockKeyIcon, label: "Tipe", value: trip.booking.listingType },
    { icon: TrendUpIcon, label: "Kesulitan", value: journey.level },
  ]
  function chooseSlot(id: string) { setSlotId(id); const url = new URL(window.location.href); url.searchParams.set("slot", id); window.history.replaceState(null, "", url) }
  function chooseTab(value: string) { setTab(value); const url = new URL(window.location.href); url.searchParams.set("tab", value); window.history.replaceState(null, "", url) }
  return (
    <main className="relative h-dvh overflow-y-auto pb-24">
      <HeroSection backButton backHref={trip.group ? `${trip.group.href}/trips` : "/explore"} title={journey.title} location={journey.location} imageUrl={journey.imageUrl} savedTrip={{ href: trip.detailHref, journey }} subtitle={trip.group ? `oleh ${trip.group.name}` : undefined} badge={<Badge variant="secondary">{trip.group ? "Trip grup contoh" : "Trip contoh"}</Badge>} />
      <div className="flex flex-col gap-6 px-5 py-5">
        <TripStats stats={stats} />
        <GuideTeam members={trip.team} group={trip.group ?? undefined} description="Tim pemandu contoh untuk peninjauan tampilan; data penugasan dan verifikasi akun belum terhubung." />
        {trip.bookingNotice && <Alert variant="warning"><AlertDescription>{trip.bookingNotice}</AlertDescription></Alert>}
        <DeparturePicker slots={trip.slots} zone={trip.zone} value={slotId} onChange={chooseSlot} allowUnavailable />
        <Tabs value={tab} onValueChange={chooseTab}>
          <TabsList className="grid h-12 w-full grid-cols-3"><TabsTrigger value="ringkasan">Ringkasan</TabsTrigger><TabsTrigger value="linimasa">Linimasa</TabsTrigger><TabsTrigger value="persiapan">Persiapan</TabsTrigger></TabsList>
          <TabsContent value="ringkasan" className="mt-4 flex flex-col gap-5">
            <Card size="sm"><CardHeader><CardTitle>Tentang perjalanan</CardTitle></CardHeader><CardContent><p className="text-sm leading-relaxed text-muted-foreground">{trip.summary}</p></CardContent></Card>
            <Card size="sm"><CardHeader><CardTitle>Fasilitas termasuk</CardTitle><CardDescription>Contoh fasilitas dari penyedia.</CardDescription></CardHeader><CardContent><ul className="flex list-disc flex-col gap-2 pl-4">{trip.included.map(item => <li key={item}>{item}</li>)}</ul></CardContent></Card>
            <CancellationTerms template={trip.booking.cancellation} />
            <TripGallery href={trip.galleryHref} images={trip.images} caption="Foto ilustrasi contoh, bukan dokumentasi lokasi yang telah diverifikasi." />
          </TabsContent>
          <TabsContent value="linimasa" className="mt-4">{slot && <InteractiveItinerary plan={trip.itinerary} slot={slot} zone={trip.zone} />}</TabsContent>
          <TabsContent value="persiapan" className="mt-4 flex flex-col gap-5">
            <Card size="sm"><CardHeader><CardTitle>Persiapan perjalanan</CardTitle><CardDescription>Daftar contoh; konfirmasi persiapan sesuai informasi listing final.</CardDescription></CardHeader><CardContent><ul className="flex list-disc flex-col gap-2 pl-4">{trip.gear.map(item => <li key={item}>{item}</li>)}</ul></CardContent></Card>
          </TabsContent>
        </Tabs>
        <ReviewsSection tripId={journey.id} rating={journey.rating} reviewCount={journey.reviews} allReviewsHref={trip.reviewHref} reviews={trip.reviews} />
      </div>
      <FloatingBooking price={journey.price} packageType={journey.packageType} booking={trip.booking} selectedSlotId={slotId} onSlotChange={chooseSlot} />
    </main>
  )
}
