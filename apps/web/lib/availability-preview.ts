import type { DepartureSlot, TripZone } from "./trip-plan"
import { tripInstant } from "./trip-plan.ts"

export const AVAILABILITY_PATTERNS = {
  "day-repeat": "By day · Repeat",
  "day-custom": "By day · Custom",
  "time-repeat": "By time · Repeat hari + waktu",
  "time-custom-repeat": "By time · Custom hari + Repeat waktu",
  "time-custom": "By time · Custom hari + Custom waktu",
} as const
export type AvailabilityPattern = keyof typeof AVAILABILITY_PATTERNS
export type AvailabilityConfig = {
  pattern: AvailabilityPattern; zone: TripZone; durationMinutes: number; capacity: number;
  listingType: "Privat" | "Sharing"; bookingCutoffMinutes: 15 | 1440 | 4320 | 10080;
  startDate: string; endDate: string; weekdays: number[]; excludedDates: string[];
  dayStartTime: string; customDates: string[]; repeatedTimes: string[];
  customStarts: { date: string; time: string }[]
}
export type PreviewDeparture = DepartureSlot & { conflict: boolean; cutoffAt: string }
export type BusyInterval = { startsAt: string; durationMinutes: number; label: string }

export function intervalsOverlap(aStart: number, aDuration: number, bStart: number, bDuration: number): boolean {
  return aStart < bStart + bDuration * 60000 && bStart < aStart + aDuration * 60000
}

function validStart(date: string, time: string, zone: TripZone): boolean {
  try { tripInstant(date, time, zone); return true } catch { return false }
}

export function validateAvailability(config: AvailabilityConfig): string[] {
  const errors: string[] = []
  const byDay = config.pattern.startsWith("day-")
  const repeatDays = config.pattern === "day-repeat" || config.pattern === "time-repeat"
  if (!Number.isInteger(config.durationMinutes) || config.durationMinutes <= 0) errors.push("Durasi harus berupa menit utuh lebih dari 0.")
  if (byDay && config.durationMinutes < 1440) errors.push("By day memerlukan durasi sedikitnya 24 jam.")
  if (!byDay && config.durationMinutes > 1440) errors.push("By time memerlukan durasi maksimal 24 jam.")
  if (!Number.isInteger(config.capacity) || config.capacity < 1) errors.push("Kapasitas harus berupa jumlah orang, sedikitnya 1.")
  if (!Object.hasOwn(AVAILABILITY_PATTERNS, config.pattern)) errors.push("Pola ketersediaan tidak valid.")
  if (![15, 1440, 4320, 10080].includes(config.bookingCutoffMinutes)) errors.push("Batas booking tidak valid.")
  if (repeatDays) {
    if (!validStart(config.startDate, "00:00", config.zone) || !validStart(config.endDate, "00:00", config.zone)) errors.push("Tanggal mulai dan akhir Repeat harus valid.")
    else if (config.endDate < config.startDate) errors.push("Tanggal akhir Repeat tidak boleh sebelum tanggal mulai.")
    if (!config.weekdays.length || config.weekdays.some(day => !Number.isInteger(day) || day < 0 || day > 6)) errors.push("Pilih setidaknya satu hari pekan yang valid.")
    if (config.excludedDates.some(date => !validStart(date, "00:00", config.zone))) errors.push("Tanggal pengecualian tidak valid.")
  }
  if (byDay && !validStart("2026-01-01", config.dayStartTime, config.zone)) errors.push("Jam mulai listing By day tidak valid.")
  if (config.pattern === "day-custom" || config.pattern === "time-custom-repeat") {
    if (!config.customDates.length || config.customDates.some(date => !validStart(date, "00:00", config.zone))) errors.push("Isi setidaknya satu tanggal Custom yang valid.")
  }
  if (config.pattern === "time-repeat" || config.pattern === "time-custom-repeat") {
    if (!config.repeatedTimes.length || config.repeatedTimes.some(time => !validStart("2026-01-01", time, config.zone))) errors.push("Isi setidaknya satu jam keberangkatan berulang yang valid.")
  }
  if (config.pattern === "time-custom" && (!config.customStarts.length || config.customStarts.some(slot => !validStart(slot.date, slot.time, config.zone)))) errors.push("Isi pasangan tanggal dan jam Custom yang valid.")
  return [...new Set(errors)]
}

/** Batas jendela pratinjau berlaku pada UI contoh, bukan aturan jadwal produksi. */
export function generateAvailability(config: AvailabilityConfig, now: number, busy: BusyInterval[] = [], previewDays = 60): { errors: string[]; slots: PreviewDeparture[]; limited: boolean } {
  const errors = validateAvailability(config)
  if (errors.length) return { errors, slots: [], limited: false }
  const byDay = config.pattern.startsWith("day-")
  const repeatDays = config.pattern === "day-repeat" || config.pattern === "time-repeat"
  let dates = config.customDates
  let limited = false
  if (repeatDays) {
    const start = Date.parse(`${config.startDate}T00:00:00Z`), end = Date.parse(`${config.endDate}T00:00:00Z`)
    const previewEnd = Math.min(end, start + (Math.max(1, previewDays) - 1) * 86400000)
    limited = previewEnd < end
    dates = []
    for (let day = start; day <= previewEnd; day += 86400000) {
      const date = new Date(day)
      const key = date.toISOString().slice(0, 10)
      if (config.weekdays.includes(date.getUTCDay()) && !config.excludedDates.includes(key)) dates.push(key)
    }
  }
  const pairs = config.pattern === "time-custom" ? config.customStarts : dates.flatMap(date => (byDay ? [config.dayStartTime] : config.repeatedTimes).map(time => ({ date, time })))
  const starts = [...new Set(pairs.map(pair => tripInstant(pair.date, pair.time, config.zone)))].sort((a, b) => a - b)
  const slots = starts.map((start, index): PreviewDeparture => {
    const conflict = busy.some(interval => intervalsOverlap(start, config.durationMinutes, Date.parse(interval.startsAt), interval.durationMinutes)) || starts.some((other, otherIndex) => otherIndex !== index && intervalsOverlap(start, config.durationMinutes, other, config.durationMinutes))
    const cutoff = start - config.bookingCutoffMinutes * 60000
    const available = !conflict && cutoff > now
    return { id: new Date(start).toISOString(), startsAt: new Date(start).toISOString(), durationMinutes: config.durationMinutes,
      capacity: config.capacity, remaining: available ? config.capacity : 0, status: available ? "available" : "closed", conflict, cutoffAt: new Date(cutoff).toISOString() }
  })
  return { errors: [], slots, limited }
}
