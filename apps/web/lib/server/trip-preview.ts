import "server-only"
import { EXPLORE_JOURNEYS } from "@/lib/constants/explore-journeys"
import { tripInstant, visiblePlan, type TripPlan, type TripZone, type DepartureSlot } from "@/lib/trip-plan"
import type { BookingPreview } from "@/lib/booking-preview"
import type { ExploreJourney } from "@/lib/explore-filters"
import { GROUP, GROUP_TRIPS } from "@/lib/constants/group"
import { TRIP_TEAM } from "@/lib/constants/trip"
import type { TripTeamMember } from "@/components/shared/trips/guide-team"
import { reviewPreview } from "@/lib/review-preview"

// Koordinat sintetis untuk mockup, bukan petunjuk navigasi lapangan.
function examplePlan(id: string, duration: number, base?: [number, number], travelMode?: string): TripPlan {
  const bases: Record<string, [number, number]> = { "1": [116.4, -8.4], "2": [106.62, -6.92], "3": [112.62, -7.62], "4": [106.81, -6.13] }
  const [lng, lat] = base ?? bases[id] ?? bases["1"]
  const mode = travelMode ?? (id === "2" ? "Perahu" : "Berjalan kaki")
  const multiDay = duration > 1440
  const activities: TripPlan["activities"] = [
    { id: "a1", title: "Berkumpul di titik temu", description: "Bertemu tim pemandu dan memeriksa kesiapan peserta.", offsetMinutes: 0, durationMinutes: 0, reference: { kind: "pin", id: "start" } },
    { id: "a2", title: "Perjalanan ke pemberhentian pertama", description: "Ikuti segmen rute yang disusun pemandu.", offsetMinutes: 30, durationMinutes: 60, reference: { kind: "segment", id: "first" } },
    { id: "a3", title: "Tiba di pemberhentian pertama", description: "Mengecek kondisi rombongan sebelum melanjutkan.", offsetMinutes: 90, durationMinutes: 0, reference: { kind: "pin", id: "stop" } },
    { id: "a4", title: "Istirahat bersama", description: "Waktu istirahat di lokasi yang sama.", offsetMinutes: 100, durationMinutes: 20, reference: { kind: "pin", id: "stop" } },
    { id: "a5", title: multiDay ? "Bermalam dan kegiatan bebas" : "Penjelasan pemandu", description: "Kegiatan ini tidak merujuk lokasi atau garis peta.", offsetMinutes: multiDay ? 1440 : 120, durationMinutes: multiDay ? 600 : 20, reference: null },
    { id: "a6", title: "Perjalanan ke tujuan", description: "Melanjutkan perjalanan melalui segmen kedua.", offsetMinutes: multiDay ? duration - 360 : 150, durationMinutes: multiDay ? 180 : 60, reference: { kind: "segment", id: "second" } },
    { id: "a7", title: "Menikmati tujuan perjalanan", description: "Waktu menikmati lokasi bersama pemandu.", offsetMinutes: multiDay ? duration - 180 : duration - 30, durationMinutes: 20, reference: { kind: "pin", id: "finish" } },
    { id: "a8", title: "Perjalanan selesai", description: "Akhir rencana kegiatan pada slot ini.", offsetMinutes: duration, durationMinutes: 0, reference: null },
  ]
  return {
    activities,
    pins: [
      { id: "start", name: "Titik temu peserta", description: "Lokasi tepat dibuka untuk peserta dengan booking terkonfirmasi.", category: "start", coordinate: [lng + 0.001237, lat - 0.002349], publicCoordinate: [lng, lat], visibility: "approximate" },
      { id: "stop", name: "Pemberhentian pertama", description: "Lokasi kegiatan tiba dan istirahat bersama.", category: "rest", coordinate: [lng + 0.015, lat + 0.012], visibility: "exact" },
      { id: "finish", name: "Tujuan perjalanan", description: "Tujuan utama pada rencana contoh ini.", category: "destination", coordinate: [lng + 0.032, lat + 0.027], visibility: "exact" },
      { id: "water", name: "Informasi air", description: "Pin informasi mandiri; tidak dihubungkan ke garis rute atau kegiatan.", category: "water", coordinate: [lng - 0.008, lat + 0.015], visibility: "exact" },
    ],
    segments: [
      { id: "first", fromPinId: "start", toPinId: "stop", turns: [[lng + 0.004567, lat + 0.000891], [lng + 0.01, lat + 0.005]], mode, durationMinutes: 60, notes: "Bagian dekat titik temu disamarkan pada tampilan publik." },
      { id: "second", fromPinId: "stop", toPinId: "finish", turns: [[lng + 0.018, lat + 0.019], [lng + 0.029, lat + 0.021]], mode, durationMinutes: multiDay ? 180 : 60, notes: "Bentuk garis mengikuti titik belokan pada rencana pemandu. Bukan rekaman GPS." },
    ],
  }
}

export function getTripPreview(id: string) {
  const journey = EXPLORE_JOURNEYS.find(item => item.id === id)
  if (!journey) return null
  return buildTripPreview(journey)
}

function buildTripPreview(journey: ExploreJourney, options?: { key: string; detailHref: string; team: TripTeamMember[]; group: { name: string; href: string }; base: [number, number]; travelMode?: string }) {
  const id = journey.id
  const durationMinutes = journey.duration.value * (journey.duration.type === "day" ? 1440 : 60)
  const zone: TripZone = id === "1" ? "WITA" : "WIB"
  const capacity = journey.maxPersons ?? 10
  const minimum = journey.minPersons ?? 1
  const slots: DepartureSlot[] = [
    { id: "morning", startsAt: new Date(tripInstant("2026-10-10", "05:00", zone)).toISOString(), durationMinutes, capacity, remaining: journey.type === "Private" ? capacity : Math.max(minimum, capacity - 2), status: "available" },
    { id: "evening", startsAt: new Date(tripInstant("2026-10-17", "20:00", zone)).toISOString(), durationMinutes, capacity, remaining: capacity, status: "available" },
    { id: "full", startsAt: new Date(tripInstant("2026-10-24", "05:00", zone)).toISOString(), durationMinutes, capacity, remaining: 0, status: "full" },
  ]
  const team = options?.team ?? TRIP_TEAM.slice(0, journey.duration.type === "day" ? 3 : 1)
  const bookingNotice = options && !team.some(member => member.tripRole === "Pemandu Utama" && member.verified) ? "Slot belum dapat dijual: pemandu anggota yang memimpin harus ditetapkan dan terverifikasi terlebih dahulu." : null
  if (bookingNotice) for (const slot of slots) { slot.status = "closed"; slot.remaining = 0 }
  const itinerary = examplePlan(id, durationMinutes, options?.base, options?.travelMode)
  const booking: BookingPreview = { id: options?.key ?? id, title: journey.title, price: journey.price, packageType: journey.packageType,
    listingType: journey.type === "Private" ? "Privat" : "Sharing", zone, slots,
    minimumParticipants: journey.minPersons ?? 1, maximumParticipants: journey.maxPersons ?? 10,
    dpRate: 0.5, dpDeadlineHours: id === "1" ? 168 : 24, cancellation: id === "1" ? "moderate" : "flexible",
    addons: [{ id: "photo", name: "Dokumentasi foto rombongan", price: 150000 }] }
  const detailHref = options?.detailHref ?? `/trips/${id}`
  return { journey, zone, durationMinutes, slots, booking, itinerary: visiblePlan(itinerary, "public"),
    detailHref, galleryHref: `${detailHref}/gallery`, reviewHref: `${detailHref}/review`, team, group: options?.group ?? null, bookingNotice,
    reviews: reviewPreview(journey.title, journey.imageUrl, options?.group.name),
    images: [journey.imageUrl, journey.imageUrl.replace("w=400", "w=800")].map((src, index) => ({ src, alt: `Foto ilustrasi ${journey.title}${index ? " · detail" : ""}` })),
    summary: `${journey.title} bersama pemandu lokal di ${journey.location}. Pilih slot untuk melihat waktu kegiatan dan rencana perjalanan. Seluruh rute dan kegiatan pada halaman ini adalah contoh untuk peninjauan mockup.`,
    included: ["Pendampingan pemandu", "Penjelasan rencana kegiatan", "Koordinasi peserta"],
    gear: journey.duration.type === "day" ? ["Perlengkapan pribadi", "Sepatu yang sesuai kegiatan", "Pakaian dan bekal sesuai durasi trip"] : ["Perlengkapan pribadi", "Pakaian yang sesuai kegiatan", "Air minum"],
  }
}

export function getGroupTripPreview(groupId: string, tripId: string) {
  if (groupId !== GROUP.id) return null
  const source = GROUP_TRIPS.find(trip => trip.id === tripId)
  if (!source) return null
  const bases: Record<string, [number, number]> = { "1": [116.4, -8.4], "2": [112.95, -7.9], "3": [112.92, -8.1], "4": [112.94, -8.01] }
  const journey: ExploreJourney = { ...source, imageUrl: source.heroImageUrl, categoryIds: source.category === "Berkemah" ? ["camping"] : ["mountains"] }
  return buildTripPreview(journey, { key: `group-${groupId}-${tripId}`, detailHref: `/groups/${groupId}/trips/${tripId}`, team: source.team, group: { name: GROUP.name, href: `/groups/${groupId}` }, base: bases[tripId], travelMode: tripId === "2" ? "Jeep" : "Berjalan kaki" })
}

export function getBookingTripPreview(key: string) {
  const match = /^group-(\d+)-(\d+)$/.exec(key)
  return match ? getGroupTripPreview(match[1], match[2]) : getTripPreview(key)
}

export type PublicTripPreview = NonNullable<ReturnType<typeof getTripPreview>>

/** Data sintetis editor; tidak memberikan akses ke booking nyata. */
export function getEditorPlanPreview() {
  return { plan: examplePlan("1", 4320), durationMinutes: 4320, zone: "WITA" as TripZone }
}
