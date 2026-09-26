import {
  CalendarBlankIcon,
  UsersIcon,
  UsersThreeIcon,
  TrendUpIcon,
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/dist/ssr"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TripStats } from "@/components/shared/trips/trip-stats"
import { GuideTeam } from "@/components/shared/trips/guide-team"
import { TripParticipantsCount } from "@/components/shared/trips/trip-participants-count"
import { ExpeditionSummary } from "@/components/shared/trips/expedition-summary"
import { ExpeditionTimeline } from "@/components/shared/trips/expedition-timeline"
import { IncludedFacilities } from "@/components/shared/trips/included-facilities"
import { RouteOverview } from "@/components/shared/trips/route-overview"
import { RequiredGear } from "@/components/shared/trips/required-gear"
import { PhysicalPreparation } from "@/components/shared/trips/physical-preparation"
import { RequiredDocuments } from "@/components/shared/trips/required-documents"
import { TripGallery } from "@/components/shared/trips/trip-gallery"
import { ReviewsSection } from "@/components/shared/trips/reviews-section"
import FloatingBooking from "@/components/shared/booking/floating-booking"
import { GROUP, GROUP_TRIPS } from "@/lib/constants/group"
import { HeroSection } from "@/components/shared/trips/hero-section"

// Mock: trip pertama dipakai sebagai contoh sampai data API tersambung
const TRIP = GROUP_TRIPS[0]

const TRIP_STATS = [
  {
    icon: CalendarBlankIcon,
    label: "Durasi",
    value: `${TRIP.duration.value} ${TRIP.duration.type === "day" ? "Hari" : "Jam"}`,
  },
  { icon: UsersIcon, label: "Kapasitas", value: "15 Orang" },
  { icon: UsersThreeIcon, label: "Tipe", value: "Terbuka" },
  {
    icon: TrendUpIcon,
    label: "Kesulitan",
    value: TRIP.level,
    iconWeight: "bold" as const,
  },
  {
    icon: ArrowDownLeftIcon,
    label: "Min. Umur",
    value: "15 Tahun",
    iconWeight: "bold" as const,
  },
  {
    icon: ArrowUpRightIcon,
    label: "Maks. Umur",
    value: "50 Tahun",
    iconWeight: "bold" as const,
  },
]

export default function CommunityTripDetailPage() {
  return (
    <div className="relative h-dvh w-full overflow-y-auto pb-16">
      <HeroSection
        backButton
        title={TRIP.title}
        location={TRIP.location}
        imageUrl={TRIP.heroImageUrl}
        subtitle={`oleh ${GROUP.name}`}
        badge={
          <div className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-white/10 bg-primary/90 px-3 py-1 backdrop-blur-md">
            <UsersThreeIcon weight="fill" className="size-3.5 text-primary-foreground" />
            <span className="text-xs font-semibold text-primary-foreground">
              Trip komunitas
            </span>
          </div>
        }
      />

      <div className="relative space-y-6 px-5 pt-5">
        <TripParticipantsCount count={9} />
        <TripStats stats={TRIP_STATS} />

        <GuideTeam
          members={TRIP.team}
          group={{ name: GROUP.name, href: `/groups/${GROUP.id}` }}
        />

        <Tabs defaultValue="ringkasan" className="mt-4 w-full">
          <TabsList className="mb-2 grid h-12 w-full grid-cols-3 rounded-2xl bg-muted/60 p-1 dark:bg-secondary">
            <TabsTrigger value="ringkasan" className="h-full rounded-xl text-sm">
              Ringkasan
            </TabsTrigger>
            <TabsTrigger value="linimasa" className="h-full rounded-xl text-sm">
              Linimasa
            </TabsTrigger>
            <TabsTrigger value="persiapan" className="h-full rounded-xl text-sm">
              Persiapan
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="ringkasan"
            className="mt-0 space-y-6 animate-in fade-in-50 duration-500"
          >
            <ExpeditionSummary />
            <IncludedFacilities />
          </TabsContent>

          <TabsContent
            value="linimasa"
            className="mt-0 space-y-6 animate-in fade-in-50 duration-500"
          >
            <RouteOverview />
            <ExpeditionTimeline />
          </TabsContent>

          <TabsContent
            value="persiapan"
            className="mt-0 space-y-6 animate-in fade-in-50 duration-500"
          >
            <RequiredGear />
            <PhysicalPreparation />
            <RequiredDocuments />
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-6 p-5">
        <TripGallery href={`/groups/${GROUP.id}/trips/${TRIP.id}/gallery`} />
        <ReviewsSection tripId={TRIP.id} />
      </div>

      <FloatingBooking price={TRIP.price} packageType={TRIP.packageType} />
    </div>
  )
}
