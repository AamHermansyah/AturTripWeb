import type { TripTeamMember } from "@/components/shared/trips/guide-team"

/**
 * Tim pemandu trip biasa — dipakai halaman detail publik maupun trip yang
 * sudah dipesan, karena keduanya menggambarkan perjalanan yang sama.
 *
 * Mock data — ganti dengan data dari API saat integrasi.
 */
export const TRIP_TEAM: TripTeamMember[] = [
  {
    id: "1",
    name: "Tenzing N. Walker",
    tripRole: "Pemandu Utama",
    specialty: "Pemilik layanan · 4.9 (124 ulasan)",
    verified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Raka Putra",
    tripRole: "Asisten Pemandu",
    specialty: "Menemani peserta paling belakang",
    verified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: "3",
    name: "Slamet Riyadi",
    tripRole: "Porter",
    specialty: "Membawa logistik & perlengkapan kemah",
    verified: false,
    imageUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
  },
]
