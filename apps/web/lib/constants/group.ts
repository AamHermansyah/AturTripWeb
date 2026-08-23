import {
  BuildingsIcon,
  CertificateIcon,
  FirstAidKitIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr"
import type { IconProps } from "@phosphor-icons/react"
import type { ComponentType } from "react"
import type { Journey } from "@/components/shared/trips/journey-card"
import type { ReviewProps } from "@/components/shared/trips/review-card"
import type { CarouselImage } from "@/components/shared/image-carousel"
import type { TripTeamMember } from "@/components/shared/trips/guide-team"

export type { TripRole, TripTeamMember } from "@/components/shared/trips/guide-team"

// ─── Tipe ────────────────────────────────────────────────────────────────────

/** Peran di dalam struktur komunitas. */
export type MemberRole = "Ketua" | "Wakil Ketua" | "Bendahara" | "Anggota"

export interface GroupMember {
  id: string
  name: string
  role: MemberRole
  specialty: string
  rating: number
  reviewCount: number
  verified: boolean
  imageUrl: string
}

/** Trip komunitas: satu trip dipandu beberapa anggota sekaligus. */
export type GroupTrip = Journey & {
  /** Gambar lebar untuk hero halaman detail — imageUrl hanya thumbnail kartu. */
  heroImageUrl: string
  team: TripTeamMember[]
}

export interface GroupCredential {
  icon: ComponentType<IconProps>
  label: string
  issuer: string
}

// ─── Mock data — ganti dengan data dari API saat integrasi ───────────────────

export const GROUP = {
  id: "1",
  name: "Nusantara Trekkers",
  category: "Petualangan",
  location: "Malang, Jawa Timur",
  rating: 4.9,
  reviews: 128,
  establishedYear: "2019",
  totalJourneys: 45,
  completedTrips: 312,
  travelersServed: 1240,
  onScheduleRate: 98,
  repeatRate: 42,
  responseTime: "< 1 jam",
  isVerified: true,
  logoUrl:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300",
  description:
    "Nusantara Trekkers adalah komunitas pemandu yang tumbuh dari kelompok pendaki lokal Malang. Kami fokus pada jalur vulkanik Jawa dan Bali, dari Semeru sampai Rinjani, dengan penekanan pada keselamatan rombongan dan ritme pendakian yang manusiawi. Setiap trip dipimpin minimal satu pemandu bersertifikat dan satu sweeper yang menemani peserta paling belakang.",
  tags: ["Pendakian", "Camping", "Gunung", "Sunrise", "Fotografi Alam"],
}

export const GROUP_IMAGES: CarouselImage[] = [
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    alt: "Rombongan Nusantara Trekkers di jalur pendakian",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
    alt: "Kemah tim di dataran tinggi",
  },
  {
    src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=1200&auto=format&fit=crop",
    alt: "Pemandangan puncak saat matahari terbit",
  },
  {
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=1200&auto=format&fit=crop",
    alt: "Danau kawah di jalur Rinjani",
  },
]

export const GROUP_MEMBERS: GroupMember[] = [
  {
    id: "1",
    name: "Budi Santoso",
    role: "Ketua",
    specialty: "Ahli Pendakian Gunung",
    rating: 4.9,
    reviewCount: 128,
    verified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: "2",
    name: "Lina Hapsari",
    role: "Wakil Ketua",
    specialty: "Pemandu Wisata Alam & Navigasi",
    rating: 4.8,
    reviewCount: 94,
    verified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: "3",
    name: "Sari Dewi",
    role: "Bendahara",
    specialty: "Logistik & Perizinan Kawasan",
    rating: 4.7,
    reviewCount: 61,
    verified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: "4",
    name: "Raka Putra",
    role: "Anggota",
    specialty: "Sweeper & Pertolongan Pertama",
    rating: 4.8,
    reviewCount: 51,
    verified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: "5",
    name: "Fani Kurnia",
    role: "Anggota",
    specialty: "Dokumentasi & Fotografi Alam",
    rating: 4.6,
    reviewCount: 38,
    verified: false,
    imageUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: "6",
    name: "Alzahra Putri",
    role: "Anggota",
    specialty: "Pemandu Jalur Pemula",
    rating: 4.7,
    reviewCount: 29,
    verified: false,
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
  },
]

export const GROUP_CREDENTIALS: GroupCredential[] = [
  {
    icon: BuildingsIcon,
    label: "Badan Usaha Terdaftar",
    issuer: "NIB 0220 4512 8891 - Kemenkumham",
  },
  {
    icon: CertificateIcon,
    label: "Sertifikasi Pemandu Gunung",
    issuer: "APGI - Asosiasi Pemandu Gunung Indonesia",
  },
  {
    icon: FirstAidKitIcon,
    label: "Pelatihan P3K & Evakuasi",
    issuer: "Basarnas Wilayah Jawa Timur",
  },
  {
    icon: ShieldCheckIcon,
    label: "Asuransi Perjalanan Peserta",
    issuer: "Menanggung seluruh peserta selama trip berlangsung",
  },
]

export const GROUP_TRIPS: GroupTrip[] = [
  {
    id: "1",
    title: "Pendakian Gunung Rinjani dan Danau Segara Anak",
    heroImageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    category: "Petualangan Alam",
    location: "Lombok, NTB",
    rating: 4.9,
    reviews: 124,
    price: 1750000,
    duration: { type: "day", value: 3 },
    type: "Shared",
    level: "Sulit",
    packageType: "per person",
    isWishlist: false,
    isFamilyFriendly: false,
    isVerified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=400",
    team: [
      {
        id: "1",
        name: "Budi Santoso",
        tripRole: "Pemandu Utama",
        memberRole: "Ketua",
        specialty: "Ahli Pendakian Gunung",
        verified: true,
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
      },
      {
        id: "4",
        name: "Raka Putra",
        tripRole: "Sweeper",
        memberRole: "Anggota",
        specialty: "Menemani peserta paling belakang",
        verified: true,
        imageUrl:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150",
      },
      {
        id: "2",
        name: "Lina Hapsari",
        tripRole: "Medis",
        memberRole: "Wakil Ketua",
        specialty: "Bersertifikat P3K lapangan",
        verified: true,
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
      },
      {
        id: "5",
        name: "Fani Kurnia",
        tripRole: "Dokumentasi",
        memberRole: "Anggota",
        specialty: "Foto perjalanan dibagikan gratis",
        verified: false,
        imageUrl:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
      },
    ],
  },
  {
    id: "2",
    title: "Sunrise Bromo dan Bukit Teletubbies",
    heroImageUrl:
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=1200&auto=format&fit=crop",
    category: "Pendakian",
    location: "Probolinggo, Jatim",
    rating: 4.8,
    reviews: 96,
    price: 450000,
    duration: { type: "hour", value: 8 },
    type: "Shared",
    level: "Mudah",
    packageType: "per group",
    minPersons: 4,
    maxPersons: 8,
    isWishlist: false,
    isFamilyFriendly: true,
    isVerified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=400",
    team: [
      {
        id: "6",
        name: "Alzahra Putri",
        tripRole: "Pemandu Utama",
        memberRole: "Anggota",
        specialty: "Pemandu Jalur Pemula",
        verified: false,
        imageUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
      },
      {
        id: "3",
        name: "Sari Dewi",
        tripRole: "Logistik",
        memberRole: "Bendahara",
        specialty: "Transport jeep & perizinan kawasan",
        verified: true,
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      },
    ],
  },
  {
    id: "3",
    title: "Ekspedisi Semeru dan Ranu Kumbolo",
    heroImageUrl:
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=1200&auto=format&fit=crop",
    category: "Pendakian",
    location: "Lumajang, Jatim",
    rating: 4.9,
    reviews: 73,
    price: 1250000,
    duration: { type: "day", value: 4 },
    type: "Shared",
    level: "Sulit",
    packageType: "per person",
    isWishlist: true,
    isFamilyFriendly: false,
    isVerified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400",
    team: [
      {
        id: "2",
        name: "Lina Hapsari",
        tripRole: "Pemandu Utama",
        memberRole: "Wakil Ketua",
        specialty: "Pemandu Wisata Alam & Navigasi",
        verified: true,
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
      },
      {
        id: "4",
        name: "Raka Putra",
        tripRole: "Sweeper",
        memberRole: "Anggota",
        specialty: "Menemani peserta paling belakang",
        verified: true,
        imageUrl:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150",
      },
      {
        id: "1",
        name: "Budi Santoso",
        tripRole: "Medis",
        memberRole: "Ketua",
        specialty: "Bersertifikat P3K lapangan",
        verified: true,
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
      },
    ],
  },
  {
    id: "4",
    title: "Camping Santai Ranu Regulo",
    heroImageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
    category: "Berkemah",
    location: "Lumajang, Jatim",
    rating: 4.7,
    reviews: 42,
    price: 320000,
    duration: { type: "day", value: 2 },
    type: "Shared",
    level: "Mudah",
    packageType: "per person",
    isWishlist: false,
    isFamilyFriendly: true,
    isVerified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    team: [
      {
        id: "5",
        name: "Fani Kurnia",
        tripRole: "Pemandu Utama",
        memberRole: "Anggota",
        specialty: "Dokumentasi & Fotografi Alam",
        verified: false,
        imageUrl:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
      },
      {
        id: "3",
        name: "Sari Dewi",
        tripRole: "Logistik",
        memberRole: "Bendahara",
        specialty: "Perlengkapan kemah & konsumsi",
        verified: true,
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      },
    ],
  },
]

export const GROUP_REVIEWS: ReviewProps[] = [
  {
    id: "1",
    author: {
      name: "Sarah Jenkins",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      location: "Wisatawan dari Kanada",
      verified: true,
    },
    date: "2 minggu lalu",
    rating: 5,
    title: "Koordinasinya rapi sekali",
    content:
      "Briefing sebelum berangkat jelas, perlengkapan dicek satu per satu, dan ada sweeper yang benar-benar menunggu peserta paling belakang. Baru kali ini ikut rombongan yang tidak membuat saya merasa tertinggal.",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=200&q=80",
    ],
    response: {
      author: {
        name: "Nusantara Trekkers",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
      },
      content:
        "Terima kasih, Sarah! Sweeper memang selalu kami siapkan di setiap trip. Sampai jumpa di jalur berikutnya.",
    },
  },
  {
    id: "2",
    author: {
      name: "Rangga Pratama",
      initials: "RP",
      location: "Wisatawan dari Jakarta",
      verified: false,
    },
    date: "1 bulan lalu",
    rating: 4,
    title: "Pemandunya berpengalaman",
    content:
      "Jalur dan waktu istirahat diatur dengan baik. Hanya saja titik kumpul awal agak sulit dicari, mungkin bisa dikasih patokan yang lebih jelas.",
  },
]

/** Menyiapkan data trip komunitas untuk dipakai JourneyCard. */
export function toJourneyCard(trip: GroupTrip): Journey {
  return {
    ...trip,
    guides: trip.team.map(({ id, name, imageUrl }) => ({ id, name, imageUrl })),
  }
}
