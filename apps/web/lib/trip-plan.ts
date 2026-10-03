export type Coordinate = [number, number]
export type TripZone = "WIB" | "WITA" | "WIT"
export const TRIP_ZONES: Record<TripZone, { timeZone: string; offsetHours: number }> = {
  WIB: { timeZone: "Asia/Jakarta", offsetHours: 7 },
  WITA: { timeZone: "Asia/Makassar", offsetHours: 8 },
  WIT: { timeZone: "Asia/Jayapura", offsetHours: 9 },
}
export const PIN_CATEGORIES = {
  start: "Titik temu / mulai", destination: "Tujuan", checkpoint: "Pos",
  rest: "Istirahat", water: "Air", facility: "Fasilitas", attraction: "Tempat menarik",
  attention: "Perhatian", other: "Lainnya",
} as const
export type PinCategory = keyof typeof PIN_CATEGORIES
export type MapReference = { kind: "pin" | "segment"; id: string }
export type PlanActivity = { id: string; title: string; description: string; offsetMinutes: number; durationMinutes: number; reference: MapReference | null }
export type PlanPin = { id: string; name: string; description: string; category: PinCategory; coordinate: Coordinate; visibility: "exact" | "approximate"; publicCoordinate?: Coordinate }
export type PlanSegment = { id: string; fromPinId: string; toPinId: string; turns: Coordinate[]; mode: string; durationMinutes: number; notes: string }
export type TripPlan = { activities: PlanActivity[]; pins: PlanPin[]; segments: PlanSegment[] }
export type VisiblePin = Omit<PlanPin, "visibility" | "publicCoordinate"> & { approximate: boolean }
export type VisibleSegment = Omit<PlanSegment, "turns"> & { coordinates: Coordinate[]; approximate: boolean; distanceMeters: number }
export type VisiblePlan = { activities: PlanActivity[]; pins: VisiblePin[]; segments: VisibleSegment[] }
export type PlanSelection = { kind: "activity" | "pin" | "segment"; id: string } | null
export type DepartureSlot = { id: string; startsAt: string; durationMinutes: number; capacity: number; remaining: number; status: "available" | "full" | "closed" }

export function lineDistanceMeters(coordinates: Coordinate[]): number {
  const radians = (value: number) => value * Math.PI / 180
  let distance = 0
  for (let i = 1; i < coordinates.length; i++) {
    const [lng1, lat1] = coordinates[i - 1]
    const [lng2, lat2] = coordinates[i]
    const dLat = radians(lat2 - lat1), dLng = radians(lng2 - lng1)
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * Math.sin(dLng / 2) ** 2
    distance += 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)))
  }
  return Math.round(distance)
}

/** Jalankan di server sebelum mengirim rencana publik ke browser. */
export function visiblePlan(plan: TripPlan, audience: "public" | "confirmed"): VisiblePlan {
  const pins: VisiblePin[] = plan.pins.map(pin => {
    const approximate = audience === "public" && pin.visibility === "approximate"
    // Sumber data harus menyediakan lokasi perkiraan secara eksplisit.
    if (approximate && (!pin.publicCoordinate || pin.publicCoordinate.every((value, index) => value === pin.coordinate[index]))) throw new Error(`Lokasi perkiraan belum tersedia atau sama dengan lokasi tepat: ${pin.id}`)
    return { id: pin.id, name: pin.name, description: pin.description, category: pin.category,
      coordinate: [...(approximate ? pin.publicCoordinate! : pin.coordinate)], approximate }
  })
  const segments: VisibleSegment[] = plan.segments.map(segment => {
    const from = pins.find(pin => pin.id === segment.fromPinId)
    const to = pins.find(pin => pin.id === segment.toPinId)
    if (!from || !to) throw new Error(`Pin segmen tidak ditemukan: ${segment.id}`)
    const approximate = from.approximate || to.approximate
    // Ganti seluruh geometri privat segmen yang menyentuh pin tersamar.
    const coordinates: Coordinate[] = approximate
      ? [[...from.coordinate], [...to.coordinate]]
      : [[...from.coordinate], ...segment.turns.map(point => [...point] as Coordinate), [...to.coordinate]]
    return { id: segment.id, fromPinId: segment.fromPinId, toPinId: segment.toPinId, mode: segment.mode,
      durationMinutes: segment.durationMinutes, notes: segment.notes, coordinates,
      approximate, distanceMeters: lineDistanceMeters(coordinates) }
  })
  return { activities: plan.activities.map(activity => ({ id: activity.id, title: activity.title, description: activity.description, offsetMinutes: activity.offsetMinutes, durationMinutes: activity.durationMinutes, reference: activity.reference ? { kind: activity.reference.kind, id: activity.reference.id } : null })), pins, segments }
}

export function selectionReference(plan: VisiblePlan, selection: PlanSelection): MapReference | null {
  if (!selection) return null
  if (selection.kind === "activity") return plan.activities.find(activity => activity.id === selection.id)?.reference ?? null
  return { kind: selection.kind, id: selection.id }
}

export function relatedActivities(plan: VisiblePlan, reference: MapReference | null): PlanActivity[] {
  if (!reference) return []
  return plan.activities.filter(activity => activity.reference?.kind === reference.kind && activity.reference.id === reference.id)
}

export function tripInstant(date: string, time: string, zone: TripZone): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new Error("Tanggal atau jam tidak valid")
  const naive = Date.parse(`${date}T${time}:00Z`)
  if (!Number.isFinite(naive) || new Date(naive).toISOString().slice(0, 10) !== date) throw new Error("Tanggal tidak valid")
  return naive - TRIP_ZONES[zone].offsetHours * 3600000
}

export function tripMoment(instant: number, zone: TripZone): { date: string; time: string; dateKey: string; full: string } {
  const timeZone = TRIP_ZONES[zone].timeZone
  const date = new Intl.DateTimeFormat("id-ID", { timeZone, day: "numeric", month: "short", year: "numeric" }).format(instant)
  const time = new Intl.DateTimeFormat("id-ID", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(instant).replace(":", ".")
  const local = new Date(instant + TRIP_ZONES[zone].offsetHours * 3600000)
  return { date, time, dateKey: local.toISOString().slice(0, 10), full: `${date}, ${time} ${zone}` }
}

export function activityTimes(activity: PlanActivity, slot: DepartureSlot, zone: TripZone) {
  const start = Date.parse(slot.startsAt) + activity.offsetMinutes * 60000
  return { start: tripMoment(start, zone), end: tripMoment(start + activity.durationMinutes * 60000, zone) }
}

export function validateTripPlan(plan: TripPlan, durationMinutes: number): string[] {
  const errors: string[] = []
  if (!Number.isInteger(durationMinutes) || durationMinutes <= 0) errors.push("Durasi trip harus lebih dari 0 menit.")
  if (!plan.activities.length) errors.push("Tambahkan setidaknya satu kegiatan.")
  if (!plan.pins.some(pin => pin.category === "start")) errors.push("Tambahkan pin titik temu / mulai.")
  for (const [name, items] of [["kegiatan", plan.activities], ["pin", plan.pins], ["segmen", plan.segments]] as const) {
    if (new Set(items.map(item => item.id)).size !== items.length) errors.push(`ID ${name} harus unik.`)
  }
  for (const pin of plan.pins) {
    if (!pin.name.trim()) errors.push("Nama pin wajib diisi.")
    for (const coordinate of [pin.coordinate, ...(pin.publicCoordinate ? [pin.publicCoordinate] : [])]) {
      if (!validCoordinate(coordinate)) errors.push(`Koordinat pin ${pin.name || pin.id} tidak valid.`)
    }
    if (pin.visibility === "approximate" && !pin.publicCoordinate) errors.push(`Tentukan lokasi perkiraan untuk ${pin.name || pin.id}.`)
    if (pin.visibility === "approximate" && pin.publicCoordinate?.every((value, index) => value === pin.coordinate[index])) errors.push(`Lokasi perkiraan ${pin.name || pin.id} harus berbeda dari koordinat tepat.`)
  }
  let previousOffset = -1
  for (const activity of plan.activities) {
    if (!activity.title.trim()) errors.push("Judul kegiatan wajib diisi.")
    if (!Number.isInteger(activity.offsetMinutes) || activity.offsetMinutes < 0 || activity.offsetMinutes < previousOffset) errors.push("Selisih mulai kegiatan harus berurutan dan tidak negatif.")
    previousOffset = activity.offsetMinutes
    if (!Number.isInteger(activity.durationMinutes) || activity.durationMinutes < 0) errors.push("Durasi kegiatan tidak boleh negatif.")
    if (activity.offsetMinutes + activity.durationMinutes > durationMinutes) errors.push(`Kegiatan ${activity.title || activity.id} melewati waktu selesai trip.`)
    const ref = activity.reference
    if (ref && !(ref.kind === "pin" ? plan.pins : plan.segments).some(item => item.id === ref.id)) errors.push(`Referensi kegiatan ${activity.title || activity.id} tidak ditemukan.`)
  }
  for (const segment of plan.segments) {
    if (segment.fromPinId === segment.toPinId || !plan.pins.some(pin => pin.id === segment.fromPinId) || !plan.pins.some(pin => pin.id === segment.toPinId)) errors.push("Segmen harus menghubungkan dua pin berbeda yang tersedia.")
    if (!Number.isInteger(segment.durationMinutes) || segment.durationMinutes < 0) errors.push("Estimasi durasi segmen tidak valid.")
    if (!segment.mode.trim()) errors.push("Moda perjalanan segmen wajib diisi.")
    if (segment.turns.some(point => !validCoordinate(point))) errors.push("Koordinat titik belokan tidak valid.")
  }
  return [...new Set(errors)]
}

export function validCoordinate(point: Coordinate): boolean {
  return point.length === 2 && Number.isFinite(point[0]) && Number.isFinite(point[1]) && Math.abs(point[0]) <= 180 && Math.abs(point[1]) <= 90
}
