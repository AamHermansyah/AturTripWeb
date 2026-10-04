import "server-only"
import { classifyTripChange, type VersionFacts } from "@/lib/trip-change-preview"
import { visiblePlan, type TripPlan, type VisiblePlan } from "@/lib/trip-plan"
import { getEditorPlanPreview, getTripPreview } from "./trip-preview"
import { previewPrice } from "@/lib/booking-preview"

type Snapshot = {
  version: string; plan: VisiblePlan; routeMeters: number; routeMinutes: number;
  durationMinutes: number; meeting: string; destination: string; difficulty: string;
  terrain: string; risk: string; coreActivities: string[]; modes: string[];
}
function facts(plan: TripPlan, startsAt: string, extras: Partial<VersionFacts> = {}): VersionFacts {
  const exact = visiblePlan(plan, "confirmed")
  return { meeting: JSON.stringify(plan.pins.find(pin => pin.category === "start")?.coordinate), destination: JSON.stringify(plan.pins.find(pin => pin.category === "destination")?.coordinate), coreActivities: ["Pendakian dan bermalam"], modes: [...new Set(plan.segments.map(segment => segment.mode))], durationMinutes: 4320, difficulty: "Sulit", region: "Lombok", terrain: "Jalur pendakian", risk: 1, routeMeters: exact.segments.reduce((sum, segment) => sum + segment.distanceMeters, 0), routeMinutes: plan.segments.reduce((sum, segment) => sum + segment.durationMinutes, 0), startsAt, ...extras }
}
function snapshot(plan: TripPlan, value: VersionFacts, version: string): Snapshot {
  // Kunci perbandingan koordinat dan geometri tepat tidak ikut payload browser.
  return { version, plan: visiblePlan(plan, "public"), routeMeters: value.routeMeters, routeMinutes: value.routeMinutes, durationMinutes: value.durationMinutes,
    meeting: plan.pins.find(pin => pin.category === "start")!.name, destination: plan.pins.find(pin => pin.category === "destination")!.name,
    difficulty: value.difficulty, terrain: value.terrain, risk: value.risk > 1 ? "Meningkat" : "Dasar", coreActivities: value.coreActivities, modes: value.modes }
}
export function getTripChangePreview() {
  const trip = getTripPreview("1")!
  const slot = trip.slots.find(slot => slot.id === "evening")!
  const old = getEditorPlanPreview().plan
  const oldFacts = facts(old, slot.startsAt)
  const cases = [
    { id: "minor", label: "Koreksi kecil", reason: "Memperjelas catatan jalur tanpa mengubah kegiatan inti.", edit: (plan: TripPlan) => { plan.segments[1].notes = "Ikuti jalur yang sama; tambahan penjelasan mengenai papan penunjuk."; plan.segments[1].turns[0][0] += 0.0001 }, extras: {} },
    { id: "duration", label: "Waktu rute +20%", reason: "Perjalanan antar-pos membutuhkan waktu lebih panjang; waktu bebas disesuaikan.", edit: (plan: TripPlan) => { plan.segments[1].durationMinutes = 228; plan.activities[5].durationMinutes = 228; plan.activities[6].offsetMinutes += 48 }, extras: {} },
    { id: "distance", label: "Rute memutar ≥20%", reason: "Mengusulkan jalur memutar dengan jarak rencana yang lebih panjang.", edit: (plan: TripPlan) => { plan.segments[1].turns = [[116.46, -8.36], [116.455, -8.37]]; plan.segments[1].notes = "Usulan memutar melalui jalur alternatif." }, extras: {} },
    { id: "risk", label: "Risiko meningkat", reason: "Medan utama menjadi berbatu dan meningkatkan risiko perjalanan.", edit: (plan: TripPlan) => { plan.segments[1].notes = "Usulan melalui medan berbatu; risiko meningkat meskipun jaraknya tetap." }, extras: { terrain: "Medan berbatu", risk: 2 } },
    { id: "meeting", label: "Titik temu baru", reason: "Mengusulkan lokasi berkumpul yang berbeda dari booking awal.", edit: (plan: TripPlan) => { plan.pins[0].name = "Titik temu alternatif"; plan.pins[0].coordinate = [116.411237, -8.412349]; plan.pins[0].publicCoordinate = [116.41, -8.41] }, extras: {} },
    { id: "core", label: "Kegiatan inti baru", reason: "Mengganti kegiatan utama pendakian dengan perjalanan perahu.", edit: (plan: TripPlan) => { for (const segment of plan.segments) segment.mode = "Perahu"; plan.activities[4].title = "Kegiatan perahu dan istirahat" }, extras: { coreActivities: ["Perjalanan perahu dan istirahat"] } },
  ]
  const prices = previewPrice(trip.booking, 2, ["photo"], "dp")
  return { title: trip.journey.title, slot, zone: trip.zone, old: snapshot(old, oldFacts, "Versi 1"), paidBase: prices.dueNow - prices.serviceFee, serviceFee: prices.serviceFee,
    scenarios: cases.map(item => {
      const proposed = structuredClone(old)
      item.edit(proposed)
      const proposedFacts = facts(proposed, slot.startsAt, item.extras)
      return { id: item.id, label: item.label, reason: item.reason, classification: classifyTripChange(oldFacts, proposedFacts), proposed: snapshot(proposed, proposedFacts, "Versi 2 · usulan") }
    }) }
}
export type TripChangePreview = ReturnType<typeof getTripChangePreview>
