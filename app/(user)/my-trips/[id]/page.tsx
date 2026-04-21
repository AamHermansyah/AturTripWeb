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
import { TripParticipants } from "@/components/shared/trips/trip-participants"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarBlankIcon, UsersIcon, LockKeyIcon, TrendUpIcon } from "@phosphor-icons/react/dist/ssr"
import { TripGallery } from "@/components/shared/trips/trip-gallery"

const MY_TRIP_STATS = [
  { icon: CalendarBlankIcon, label: "Durasi", value: "12 Hari" },
  { icon: UsersIcon, label: "Peserta", value: "4 Orang" },
  { icon: LockKeyIcon, label: "Tipe", value: "Privat" },
  { icon: TrendUpIcon, label: "Kesulitan", value: "Lanjutan", iconWeight: "bold" as const },
]

function TripDetailPage() {
  return (
    <div className="relative">
      <HeroSection />

      <div className="px-5 pt-6 space-y-6 relative">
        <TripStats stats={MY_TRIP_STATS} />
        <YourGuide />

        <Tabs defaultValue="ringkasan" className="w-full mt-6">
          <TabsList className="mb-2 w-full">
            <TabsTrigger value="ringkasan" className="rounded-full font-bold h-full text-xs">Ringkasan</TabsTrigger>
            <TabsTrigger value="linimasa" className="rounded-full font-bold h-full text-xs">Linimasa</TabsTrigger>
            <TabsTrigger value="persiapan" className="rounded-full font-bold h-full text-xs">Persiapan</TabsTrigger>
          </TabsList>

          {/* TAB 1: Ringkasan */}
          <TabsContent value="ringkasan" className="space-y-6 animate-in fade-in-50 duration-500 mt-0">
            <ExpeditionSummary />
            <TripParticipants />
            <IncludedFacilities />
            <TripGallery href="/my-trips/1/gallery" />
          </TabsContent>

          {/* TAB 2: Linimasa */}
          <TabsContent value="linimasa" className="space-y-6 animate-in fade-in-50 duration-500 mt-0">
            <RouteOverview />
            <ExpeditionTimeline />
          </TabsContent>

          {/* TAB 3: Persiapan */}
          <TabsContent value="persiapan" className="space-y-6 animate-in fade-in-50 duration-500 mt-0">
            <RequiredGear />
            <PhysicalPreparation />
            <RequiredDocuments />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default TripDetailPage