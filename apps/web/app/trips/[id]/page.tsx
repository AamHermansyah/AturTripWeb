import { HeroSection } from "@/components/shared/trips/hero-section"
import { TripStats } from "@/components/shared/trips/trip-stats"
import { RouteOverview } from "@/components/shared/trips/route-overview"
import { ExpeditionSummary } from "@/components/shared/trips/expedition-summary"
import { ExpeditionTimeline } from "@/components/shared/trips/expedition-timeline"
import { IncludedFacilities } from "@/components/shared/trips/included-facilities"
import { RequiredGear } from "@/components/shared/trips/required-gear"
import { PhysicalPreparation } from "@/components/shared/trips/physical-preparation"
import { RequiredDocuments } from "@/components/shared/trips/required-documents"
import { YourGuide } from "@/components/shared/trips/your-guide"
import { TripParticipantsCount } from "@/components/shared/trips/trip-participants-count"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarBlankIcon,
  UsersIcon,
  LockKeyIcon,
  TrendUpIcon,
  ArrowDownLeftIcon,
  ArrowUpRightIcon
} from "@phosphor-icons/react/dist/ssr"
import FloatingBooking from "../_components/floating-booking"
import { ReviewsSection } from "@/components/shared/trips/reviews-section"
import { TripGallery } from "@/components/shared/trips/trip-gallery"

const PUBLIC_TRIP_STATS = [
  { icon: CalendarBlankIcon, label: "Durasi", value: "12 Hari" },
  { icon: UsersIcon, label: "Kapasitas", value: "10 Orang" },
  { icon: LockKeyIcon, label: "Tipe", value: "Privat" },
  { icon: TrendUpIcon, label: "Kesulitan", value: "Lanjutan", iconWeight: "bold" as const },
  { icon: ArrowDownLeftIcon, label: "Min. Umur", value: "15 Tahun", iconWeight: "bold" as const },
  { icon: ArrowUpRightIcon, label: "Maks. Umur", value: "50 Tahun", iconWeight: "bold" as const },
]

function PublicTripDetailPage() {
  return (
    <div className="relative h-dvh w-full overflow-y-auto pb-16">
      <HeroSection backButton />

      <div className="px-5 pt-5 space-y-6 relative">
        <TripParticipantsCount count={6} />
        <TripStats stats={PUBLIC_TRIP_STATS} />
        <YourGuide />

        <Tabs defaultValue="ringkasan" className="w-full mt-4">
          <TabsList className="mb-2 w-full bg-muted/60 dark:bg-zinc-900 rounded-full p-1 h-12 grid grid-cols-3">
            <TabsTrigger value="ringkasan" className="rounded-full font-bold h-full text-xs">Ringkasan</TabsTrigger>
            <TabsTrigger value="linimasa" className="rounded-full font-bold h-full text-xs">Linimasa</TabsTrigger>
            <TabsTrigger value="persiapan" className="rounded-full font-bold h-full text-xs">Persiapan</TabsTrigger>
          </TabsList>

          <TabsContent value="ringkasan" className="space-y-6 animate-in fade-in-50 duration-500 mt-0">
            <ExpeditionSummary />
            <IncludedFacilities />
          </TabsContent>

          <TabsContent value="linimasa" className="space-y-6 animate-in fade-in-50 duration-500 mt-0">
            <RouteOverview />
            <ExpeditionTimeline />
          </TabsContent>

          <TabsContent value="persiapan" className="space-y-6 animate-in fade-in-50 duration-500 mt-0">
            <RequiredGear />
            <PhysicalPreparation />
            <RequiredDocuments />
          </TabsContent>
        </Tabs>
      </div>

      <div className="p-5 space-y-6">
        <TripGallery href="/trips/1/gallery" />
        <ReviewsSection tripId="1" />
      </div>

      {/* Floating Footer */}
      <FloatingBooking />
    </div>
  )
}

export default PublicTripDetailPage