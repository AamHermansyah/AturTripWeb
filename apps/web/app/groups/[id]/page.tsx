import Link from "next/link"
import {
  UsersThreeIcon,
  MapTrifoldIcon,
  CalendarCheckIcon,
  ChatCircleTextIcon,
  CheckCircleIcon,
  CompassIcon,
} from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ProfileStats, type ProfileStat } from "@/components/shared/profile/profile-stats"
import {
  GROUP,
  GROUP_CREDENTIALS,
  GROUP_IMAGES,
  GROUP_MEMBERS,
  GROUP_REVIEWS,
  GROUP_TRIPS,
  toJourneyCard,
} from "@/lib/constants/group"
import { GroupHero } from "./_components/group-hero"
import { GroupAbout } from "./_components/group-about"
import { GroupCredentials } from "./_components/group-credentials"
import { GroupMembers } from "./_components/group-members"
import { GroupJourneys } from "./_components/group-journeys"
import { GroupReviews } from "./_components/group-reviews"

const STATS: ProfileStat[] = [
  { icon: CheckCircleIcon, label: "Trip Selesai", value: `${GROUP.completedTrips}` },
  {
    icon: UsersThreeIcon,
    label: "Wisatawan",
    value: GROUP.travelersServed.toLocaleString("id-ID"),
  },
  { icon: ChatCircleTextIcon, label: "Balas Pesan", value: GROUP.responseTime },
  { icon: CompassIcon, label: "Pemandu", value: `${GROUP_MEMBERS.length}` },
  { icon: MapTrifoldIcon, label: "Trip Aktif", value: `${GROUP.totalJourneys}` },
  { icon: CalendarCheckIcon, label: "Sejak", value: GROUP.establishedYear },
]

export default function GroupDetailPage() {
  return (
    <div className="relative h-dvh w-full overflow-y-auto pb-6">
      <GroupHero
        name={GROUP.name}
        category={GROUP.category}
        location={GROUP.location}
        rating={GROUP.rating}
        reviews={GROUP.reviews}
        images={GROUP_IMAGES}
        logoUrl={GROUP.logoUrl}
        isVerified={GROUP.isVerified}
      />

      <div className="space-y-6 px-5 pt-5">
        <ProfileStats stats={STATS} />

        <div className="flex items-center gap-2">
          <Button asChild className="flex-1">
            <Link href="/conversations">
              <ChatCircleTextIcon weight="fill" data-icon="inline-start" />
              Hubungi Komunitas
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/groups/${GROUP.id}/trips`}>Lihat Trip</Link>
          </Button>
        </div>

        <Separator />

        <GroupAbout
          description={GROUP.description}
          establishedYear={GROUP.establishedYear}
          tags={GROUP.tags}
        />

        <Separator />

        <GroupMembers members={GROUP_MEMBERS} />

        <Separator />

        <GroupCredentials credentials={GROUP_CREDENTIALS} />
      </div>

      <div className="py-6">
        <GroupJourneys
          groupId={GROUP.id}
          journeys={GROUP_TRIPS.map(toJourneyCard)}
          totalJourneys={GROUP.totalJourneys}
        />
      </div>

      <div className="px-5">
        <GroupReviews
          rating={GROUP.rating}
          totalReviews={GROUP.reviews}
          reviews={GROUP_REVIEWS}
        />
      </div>
    </div>
  )
}
