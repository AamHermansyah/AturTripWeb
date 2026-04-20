import { HeroSection } from "./_components/hero-section"
import { TripStats } from "./_components/trip-stats"
import { RouteOverview } from "./_components/route-overview"
import { ExpeditionSummary } from "./_components/expedition-summary"
import { ExpeditionTimeline } from "./_components/expedition-timeline"
import { IncludedFacilities } from "./_components/included-facilities"
import { RequiredGear } from "./_components/required-gear"
import { PhysicalPreparation } from "./_components/physical-preparation"
import { RequiredDocuments } from "./_components/required-documents"
import { YourGuide } from "./_components/your-guide"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function TripDetailPage() {
  return (
    <div className="relative overflow-x-clip">
      <HeroSection />

      <div className="px-5 pt-6 space-y-6 relative">
        <TripStats />

        <Tabs defaultValue="ringkasan" className="w-full mt-6">
          <TabsList className="mb-2 w-full">
            <TabsTrigger value="ringkasan" className="rounded-full font-bold h-full text-xs">Ringkasan</TabsTrigger>
            <TabsTrigger value="linimasa" className="rounded-full font-bold h-full text-xs">Linimasa</TabsTrigger>
            <TabsTrigger value="persiapan" className="rounded-full font-bold h-full text-xs">Persiapan</TabsTrigger>
          </TabsList>

          {/* TAB 1: Ringkasan */}
          <TabsContent value="ringkasan" className="space-y-6 animate-in fade-in-50 duration-500 mt-0">
            <RouteOverview />
            <ExpeditionSummary />
            <IncludedFacilities />
          </TabsContent>

          {/* TAB 2: Linimasa */}
          <TabsContent value="linimasa" className="animate-in fade-in-50 duration-500 mt-0">
            <ExpeditionTimeline />
          </TabsContent>

          {/* TAB 3: Persiapan */}
          <TabsContent value="persiapan" className="space-y-6 animate-in fade-in-50 duration-500 mt-0">
            <RequiredGear />
            <PhysicalPreparation />
            <RequiredDocuments />
          </TabsContent>
        </Tabs>
        <YourGuide />
      </div>
    </div>
  )
}

export default TripDetailPage