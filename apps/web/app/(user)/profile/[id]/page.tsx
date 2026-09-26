'use client'

import {
  MapTrifoldIcon,
  StarIcon,
  MountainsIcon,
  TrophyIcon,
  MedalIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react"
import { Separator } from "@/components/ui/separator"
import { ProfileStats, type ProfileStat } from "@/components/shared/profile/profile-stats"
import { InterestTags } from "@/components/shared/profile/interest-tags"
import type { Interest } from "@/lib/constants/personalize"
import { PublicProfileHeader } from "./_components/public-profile-header"
import { TravelerBadges, type TravelerBadge } from "./_components/traveler-badges"
import { TravelerReviews, type TravelerReview } from "./_components/traveler-reviews"

// Mock data — ganti dengan data dari API saat integrasi
const TRAVELER = {
  name: "Aam Hermansyah",
  initials: "AH",
  imageUrl:
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&q=80",
  location: "Tasikmalaya, Jawa Barat",
  joinedYear: "2024",
  bio: "Suka jalan kaki jauh, kopi pahit, dan pulang dengan sepatu berlumpur.",
  verified: true,
  interests: ["hiking", "camping", "culture"] as Interest[],
}

const STATS: ProfileStat[] = [
  { icon: MapTrifoldIcon, label: "Trip", value: "12" },
  { icon: StarIcon, label: "Ulasan", value: "9" },
  { icon: MountainsIcon, label: "Puncak", value: "5" },
]

const BADGES: TravelerBadge[] = [
  {
    icon: TrophyIcon,
    label: "Pendaki Aktif",
    description: "Menyelesaikan 10+ trip pendakian bersama pemandu terverifikasi.",
    tone: "bg-warning/15 text-warning",
  },
  {
    icon: MedalIcon,
    label: "Pengulas Tepercaya",
    description: "Menulis 9 ulasan yang membantu wisatawan lain memilih pemandu.",
    tone: "bg-info/15 text-info",
  },
  {
    icon: ShieldCheckIcon,
    label: "Identitas Terverifikasi",
    description: "Data diri sudah dicocokkan dengan dokumen resmi.",
    tone: "bg-success/15 text-success",
  },
]

const REVIEWS: TravelerReview[] = [
  {
    id: "1",
    tripTitle: "Pendakian Gunung Rinjani dan Danau Segara Anak",
    tripHref: "/trips/1",
    guideName: "Budi Santoso",
    rating: 5,
    date: "2 minggu lalu",
    content:
      "Persiapannya rapi dari awal. Ritme pendakian disesuaikan dengan kondisi rombongan, dan pemandunya sabar menunggu yang tertinggal.",
  },
  {
    id: "2",
    tripTitle: "Jelajah Warisan Kota Tua",
    tripHref: "/trips/1",
    guideName: "Sari Dewi",
    rating: 4,
    date: "1 bulan lalu",
    content:
      "Ceritanya hidup dan tidak terasa seperti menghafal buku sejarah. Sayang durasinya agak mepet untuk sesi foto.",
  },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="font-heading text-sm font-semibold text-muted-foreground">
        {title}
      </h2>
      {children}
    </div>
  )
}

export default function PublicProfilePage() {
  return (
    <div className="px-5 space-y-6">
      <PublicProfileHeader
        name={TRAVELER.name}
        initials={TRAVELER.initials}
        imageUrl={TRAVELER.imageUrl}
        location={TRAVELER.location}
        joinedYear={TRAVELER.joinedYear}
        bio={TRAVELER.bio}
        verified={TRAVELER.verified}
      />

      <ProfileStats stats={STATS} />

      <Separator />

      <Section title="Minat perjalanan">
        <InterestTags interests={TRAVELER.interests} />
      </Section>

      <Separator />

      <Section title="Pencapaian">
        <TravelerBadges badges={BADGES} />
      </Section>

      <Separator />

      <Section title="Ulasan yang ditulis">
        <TravelerReviews reviews={REVIEWS} />
      </Section>
    </div>
  )
}
